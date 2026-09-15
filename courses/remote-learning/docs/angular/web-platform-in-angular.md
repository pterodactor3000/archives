# Web platform integration in Angular

Start with the framework-neutral notes:

- [HTML, CSS, and accessibility](../shared/html-css-accessibility.md)
- [Core Web Vitals](../shared/core-web-vitals.md)

WCAG conformance belongs to the rendered page and complete user journey. Angular changes implementation and debugging tools, not the success criteria.

Official references:

- [Angular accessibility](https://angular.dev/best-practices/a11y)
- [Angular template binding](https://angular.dev/guide/templates/binding)
- [Angular Aria](https://angular.dev/guide/aria)
- [Angular image optimization](https://angular.dev/guide/image-optimization)
- [Angular hydration](https://angular.dev/guide/hydration)

## Templates and semantics

Use native elements in templates. A design-system component must preserve the native keyboard, focus, form, and disabled contracts.

Current Angular supports direct bindings to ARIA attributes:

```html
<input
  [aria-describedby]="descriptionId()"
  [aria-invalid]="isInvalid()"
/>
```

`[attr.aria-*]` remains valid when exact attribute presence matters. Angular removes an attribute binding when its value is `null`. Inspect the rendered DOM and accessibility tree instead of assuming the template expression produced the intended state.

Keep DOM order logical when CSS Grid or Flexbox changes visual order. Prefer form submission through `(ngSubmit)` over a click handler attached only to the submit button.

## Focus and complex widgets

Use native controls where possible. Angular Aria and the Component Dev Kit can help implement patterns such as listboxes, menus, tabs, grids, focus traps, and live announcements. They do not choose product semantics or prove WCAG conformance.

For dialogs:

1. give the dialog an accessible name
2. move focus inside
3. keep focus within it
4. restore focus to the opener
5. test Escape and outside-click behavior against the product contract

Do not announce every quote tick. Reserve live announcements for order results, stale connections, and blocking errors.

## Angular performance

- Use `NgOptimizedImage` for optimized loading and reserved dimensions. Provide `sizes` when an image responds to layout width. Mark the actual LCP image `priority`.
- SSR can improve initial HTML delivery. Hydration can still delay interaction if the client bundle or startup work is large.
- Incremental hydration can defer work for parts of the page. Test interaction replay and focus behavior before hydration completes.
- Keep signal and observable dependencies narrow so one market tick does not refresh the whole screen.
- Coalesce visual quote publication when product rules permit it. Process order and audit events without dropping them.

Use Angular DevTools to inspect component work. Use the browser Performance panel for JavaScript tasks, style, layout, and paint. Neither replaces field Core Web Vitals.

## Angular-specific checks

- Render components through Angular's test environment and assert native roles, names, and states.
- Test dynamic ARIA bindings after signal and form-state updates.
- Test Angular Aria and Component Dev Kit widgets against their documented keyboard contracts.
- Run an automated accessibility scanner against rendered routes.
- Use the [shared manual checks](../shared/html-css-accessibility.md#financial-ui-checklist) for complete user journeys.

Unit and component tests cannot prove page-level focus order, visual contrast, reflow, or screen-reader output.

## Interview answer

> I start with semantic HTML and WCAG behavior, then use Angular tools to implement and measure it. Angular DevTools explains component work. Browser traces explain tasks, layout, and paint. Field data decides whether users improved.
