# Web platform integration in React and Next.js

Start with the framework-neutral notes:

- [HTML, CSS, and accessibility](../shared/html-css-accessibility.md)
- [Core Web Vitals](../shared/core-web-vitals.md)

WCAG conformance belongs to the rendered page and complete user journey. React and Next.js change implementation and debugging tools, not the success criteria.

Official references:

- [React DOM components](https://react.dev/reference/react-dom/components)
- [`useId`](https://react.dev/reference/react/useId)
- [React Performance tracks](https://react.dev/reference/dev-tools/react-performance-tracks)
- [Next.js Image](https://nextjs.org/docs/app/api-reference/components/image)
- [Next.js font optimization](https://nextjs.org/docs/app/getting-started/fonts)
- [Next.js analytics](https://nextjs.org/docs/app/guides/analytics)

## Semantic JSX

Render native elements first. Components such as `Button` or `Link` should preserve the native contract instead of returning a clickable `div`.

React differences worth remembering:

- use `htmlFor` on labels and `className` for CSS classes
- ARIA attributes keep their hyphenated lowercase spelling, such as `aria-describedby`
- pass native boolean and enumerated attributes with the value expected by the DOM
- use `useId` to connect labels, descriptions, and errors across reusable component instances
- do not depend on the text format of a generated `useId` value in CSS or tests

Fragments avoid meaningless wrappers. They do not excuse missing landmarks, headings, lists, or table relationships.

## Focus, portals, and live messages

Use refs for deliberate focus changes after a dialog opens, validation fails, or a route change needs a new focus target. Restore focus when a dialog closes.

A portal changes DOM placement, but React events still propagate through the React tree. Test interactions that combine portals with native document listeners.

Keep a live-region node mounted, then update its text. Do not announce every market tick. Announce order results, stale connections, and blocking validation errors.

## React performance traps

### Rendering is not DOM replacement

React may call a component and commit no DOM change. Use React Performance tracks or the Profiler for render causes. Use the browser Performance panel for long tasks, layout, and paint.

React Performance tracks run in development and profiling builds. Production builds disable their instrumentation by default because it adds overhead.

### Memoization is not the first fix

A memoized child still renders when its state changes, consumed context changes, or a prop gets a new identity. Fix state ownership and broad subscriptions before adding comparison work.

A provider that creates `{ quotes, user, theme }` on every tick wakes all consumers. Split context by update rate or use an external store with selectors.

Stable keys prevent needless replacement. They do not make 10,000 DOM rows cheap. Virtualization limits node count, but must preserve focus, table relationships, and screen-reader navigation.

Effects can create request waterfalls. Server data loading or a query layer can start independent work earlier and deduplicate it.

`startTransition` can keep urgent React updates ahead of non-urgent rendering. It cannot interrupt a long JavaScript task or move work off the main thread.

## Next.js performance tools

- Keep `"use client"` boundaries low. Imports beneath the boundary join the client graph.
- Use `next/image` to reserve image space and serve responsive formats. Provide `sizes` for `fill` images and images made responsive by CSS.
- For an LCP image, prefer `loading="eager"` or `fetchPriority="high"` in most cases. Use `preload` selectively. Next.js 16 deprecated `priority`.
- Use `next/font` to self-host fonts and reduce layout shifts from font loading.
- Stream independent slow regions with separate Suspense boundaries.
- Keep fallback dimensions close to loaded content to avoid CLS.
- Use `useReportWebVitals` in a small Client Component and mount it from the root layout.
- Inspect bundle composition. Next.js 16 removed the old `size` and `First Load JS` build output because those numbers were unreliable for Server Component applications.

None of these tools guarantees good field metrics. Check the 75th percentile for mobile and desktop users.

## React-specific checks

- Query component tests by native role and accessible name.
- Check `useId` relationships without asserting the generated ID text.
- Test focus restoration and event propagation through portals.
- Run an automated accessibility scanner against rendered routes.
- Use the [shared manual checks](../shared/html-css-accessibility.md#financial-ui-checklist) for complete user journeys.

Component tests cannot prove page-level focus order, visual contrast, reflow, or screen-reader output.

## Interview answer

> I start with semantic HTML and WCAG behavior, then use React and Next.js tools to implement and measure it. React profiling explains component work. Browser traces explain tasks, layout, and paint. Field data decides whether users improved.
