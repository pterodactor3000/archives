# HTML, CSS, and accessibility

Framework code still produces HTML, CSS, and browser events. A senior frontend answer should explain the platform before reaching for a component library.

Official references:

- [HTML Living Standard](https://html.spec.whatwg.org/)
- [MDN HTML accessibility](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility/HTML)
- [MDN CSS cascade](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascade/Introduction)
- [MDN container queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_queries)
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [How to meet WCAG 2.2](https://www.w3.org/WAI/WCAG22/quickref/)
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)

## Semantic HTML comes first

Use the element whose behavior matches the job.

| Intent | Element |
| --- | --- |
| Navigate to another location | `<a href="...">` |
| Run an action | `<button type="button">` |
| Submit a form | `<button type="submit">` |
| Page navigation | `<nav>` |
| Main content | `<main>` |
| Expand optional content | `<details>` and `<summary>` |
| Tabular data | `<table>` with headers |
| Group related form controls | `<fieldset>` and `<legend>` |

A styled `<div>` with a click handler does not gain keyboard activation, focus behavior, disabled behavior, form behavior, or a button role.

ARIA can add semantics. It does not add behavior. If `role="button"` is unavoidable, code Space and Enter activation, focus, disabled behavior, and state. A native button already has those contracts.

## Buttons and links

Use a link for navigation and a button for an action. Styling does not change semantics.

Inside a form, `<button>` defaults to submit. Set `type="button"` for controls such as "add row" or "show password."

An anchor without `href` is not a normal link. Do not add click navigation to it.

Disabled behavior differs:

- `disabled` prevents interaction, removes many controls from the tab order, and omits form values
- `aria-disabled="true"` communicates state but does not stop clicks or keyboard actions

Use `aria-disabled` when native `disabled` is unavailable or the control must remain discoverable. It communicates state but does not block interaction or decide tab order. Enforce those behaviors in code.

## Forms and validation

Every control needs an accessible name. Prefer an explicit label:

```html
<label for="order-quantity">Quantity</label>
<input
  id="order-quantity"
  name="quantity"
  inputmode="decimal"
  autocomplete="off"
  aria-describedby="quantity-help quantity-error"
  aria-invalid="true"
/>
<p id="quantity-help">Minimum 0.01 units.</p>
<p id="quantity-error">Enter a multiple of 0.01.</p>
```

Placeholder text is not a label. It disappears during input and often has weak contrast.

Use:

- `name` for form submission
- `type` for native semantics and validation
- `inputmode` to suggest a mobile keyboard
- `autocomplete` tokens where stored values help users
- `required` for native required state
- `aria-invalid` and `aria-describedby` for custom error messaging

Do not rely on color alone. Put error text next to the field and provide a summary for long forms.

Use `<fieldset>` and `<legend>` for a related radio group, such as buy or sell.

Native validation improves feedback. The server still validates price, quantity, account permission, and market state.

## Accessible names

The accessible name may come from visible text, a `<label>`, `aria-label`, or `aria-labelledby`. Use visible text when possible.

Do not repeat an accessible name from several competing sources. Test the final name in the browser accessibility tree.

Icon-only controls need a name:

```html
<button type="button" aria-label="Remove EUR/USD from watchlist">
  <svg aria-hidden="true"><!-- decorative icon --></svg>
</button>
```

An image's `alt` describes its purpose in context:

- informative image gets concise equivalent text
- decorative image gets `alt=""`
- linked image describes the destination or action

Do not start with "image of." Screen readers already announce the element type.

## Headings, landmarks, and source order

Headings describe the document outline. Do not choose a heading level for its font size.

Use landmarks such as `header`, `nav`, `main`, `aside`, and `footer` to support navigation. Multiple landmarks of the same kind may need labels.

DOM order should match reading and keyboard order. CSS visual reordering can create a screen that looks right but tabs in a confusing sequence.

Use positive `tabindex` values only as a last resort. Prefer:

- natural focus order
- `tabindex="0"` for a custom interactive element
- `tabindex="-1"` for programmatic focus

## Data tables

A watchlist with row and column relationships is often a table, not a grid of anonymous divs.

Use:

- `<caption>` for the table purpose
- `<th scope="col">` for column headers
- `<th scope="row">` when row headers help
- real buttons or links inside cells

Do not use table markup only for visual layout.

An interactive ARIA grid has a large keyboard contract. Arrow navigation, selection, editing, focus management, and screen-reader behavior all need tests. Use a normal table unless grid interaction is a real requirement.

## Live regions in a market UI

Do not announce every price tick. It overwhelms users and assistive technology.

Announce events that require attention:

- order accepted or rejected
- connection became stale
- validation failed
- authentication expired

`role="status"` is usually polite. `role="alert"` interrupts and should be rare.

Insert or update region text after the region exists. Replacing the entire region and message in one render may not announce consistently across browser and screen-reader combinations.

## Focus management

Move focus only when context changed and the next location would otherwise be unclear.

For a modal:

1. move focus into a meaningful control
2. keep Tab within the modal
3. close on Escape when product policy permits
4. make the rest of the page inert
5. restore focus to the opener

Do not remove the visible focus indicator. Use `:focus-visible` when pointer and keyboard focus need different styling.

Sticky headers, cookie banners, and bottom order bars must not fully hide the focused component. WCAG 2.2 adds Focus Not Obscured at Level AA.

## Browser event traps

Events generally move through capture, target, and bubble phases.

- `preventDefault()` stops a default action, such as form submission or link navigation
- `stopPropagation()` stops further propagation
- neither cancels work already started elsewhere

Native listeners and shadow roots can make event ownership less obvious. Stop propagation only when the interaction contract requires it.

Handle the form's `submit` event instead of only the button's `click` event. It covers keyboard submission and assistive technology.

## The CSS cascade

When declarations compete, reason in this order:

1. relevance
2. origin and importance
3. cascade layer order
4. specificity
5. scoping proximity where CSS scope applies
6. source order

Specificity compares ID, class-like, and type-like columns. It is not one base-10 score.

Useful tools:

- `@layer` controls precedence between groups of styles
- `:where(...)` always has zero specificity
- `:is(...)`, `:not(...)`, and `:has(...)` take specificity from their arguments
- unlayered normal author styles outrank normal author styles in named layers

Do not solve every conflict with `!important`. Important declarations reverse normal layer precedence and make later maintenance harder.

```css
@layer reset, components, utilities;

@layer components {
  :where(.order-ticket) button {
    min-block-size: 2.75rem;
  }
}
```

## Box model

With the default `content-box`, declared width excludes padding and border. Most applications set:

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}
```

Overflow needs a deliberate policy. Clipping a price or quantity can change meaning. Allow wrapping, horizontal scrolling, or responsive column removal according to product rules.

## Flexbox traps

`flex: 1` is shorthand, not "take remaining width" in every case.

Know:

- main axis versus cross axis
- `flex-basis` participates before grow and shrink
- items have an automatic minimum size
- `min-inline-size: 0` often lets a flex child shrink instead of overflowing
- `gap` is spacing between items, not outer margin

```css
.watchlist-row {
  display: flex;
}

.instrument-name {
  min-inline-size: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

Do not truncate the only visible instrument identifier without another way to read it.

## Grid traps

Grid handles two-dimensional layout. `fr` distributes leftover space, but content minimums can still force overflow.

```css
.dashboard {
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(18rem, 1fr);
  gap: 1rem;
}
```

`minmax(0, 1fr)` allows a track to shrink below its min-content size. Use it when long content would otherwise stretch the grid.

Auto-placement can change visual placement. Preserve a logical DOM order.

## Positioning and stacking contexts

`z-index: 9999` cannot escape every ancestor. A stacking context creates a local ordering system.

Common stacking-context creators include:

- positioned elements with a non-auto `z-index`
- `position: fixed` or `sticky`
- transforms
- opacity below 1
- isolation
- several containment and compositing properties

Inspect ancestors before increasing `z-index`.

`position: sticky` depends on its scrolling ancestor and an inset such as `top`. Overflow on an ancestor often explains why it does not stick where expected.

## Responsive design

Use media queries for viewport and user preferences. Use container queries when a component should adapt to its allocated space.

```css
.quote-card-container {
  container-type: inline-size;
}

@container (width > 30rem) {
  .quote-card {
    grid-template-columns: 1fr auto auto;
  }
}
```

Prefer logical properties such as `margin-inline` and `padding-block`. They work across writing directions.

Test zoom, text enlargement, narrow viewports, long translations, and high precision values. A desktop-width screenshot is not responsive testing.

## User preferences

Respect:

```css
@media (prefers-reduced-motion: reduce) {
  .price-flash {
    animation: none;
  }
}
```

Reduced motion does not mean remove all feedback. Replace motion with a stable visual change.

Use `prefers-color-scheme` only as one input to theme selection. Preserve a user's explicit choice.

## WCAG 2.2 answers

WCAG uses four principles:

- perceivable
- operable
- understandable
- robust

Teams commonly target Level AA. Conformance applies to complete pages and processes, not one isolated component.

High-value thresholds and checks:

- normal text contrast is at least 4.5:1
- large text contrast is at least 3:1
- meaningful non-text UI contrast is at least 3:1
- pointer targets meet 24 by 24 CSS pixels at Level AA unless an exception applies
- all functionality works with a keyboard
- focus remains visible and is not entirely obscured
- errors identify the field and explain correction
- authentication avoids cognitive-function tests unless another method is available, a mechanism assists completion, or the test recognizes objects or user-provided non-text content

Automated scans find only part of the problem. Add keyboard testing, browser accessibility-tree inspection, zoom and reflow checks, contrast checks, and screen-reader testing for critical journeys.

## Financial UI checklist

- Profit and loss uses sign, text, or icon as well as color.
- Price movement animation honors reduced motion.
- Live updates do not steal focus.
- Users can pause, sort, or filter rapid updates where needed.
- Validation preserves entered values after an error.
- Order review states expose instrument, side, quantity, price type, and estimated cost in text.
- Timeout and stale-data warnings remain until resolved.
- Modal order tickets restore focus to the control that opened them.
- Tables retain header relationships after virtualization.
- Session expiry produces an accessible message before redirect when possible.

## Questions to answer aloud

1. Why is a button better than a clickable div?
2. What is the difference between `disabled` and `aria-disabled`?
3. How does an input receive its accessible name?
4. When should a watchlist use a table?
5. What does `preventDefault` do that `stopPropagation` does not?
6. Why can a high `z-index` still appear behind another element?
7. Why does a flex child overflow until `min-inline-size: 0` is added?
8. When is a container query better than a media query?
9. What does WCAG Level AA require for keyboard focus?
10. How should a live price screen work for a screen-reader user?
