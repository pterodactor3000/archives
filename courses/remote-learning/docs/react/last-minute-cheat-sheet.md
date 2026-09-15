# React last-minute cheat sheet

## React

- Render is a pure function call with a snapshot of props, state, and context.
- A setter schedules another render. It does not mutate the current snapshot.
- Use updater functions when next state depends on queued state.
- Type, position, and key control preserved component identity.
- Stable domain IDs make good keys. Index and random values do not.
- Effects synchronize external systems after commit.
- Derived values and click-driven work usually do not need effects.
- Cleanup runs before changed setup and on unmount.
- Missing dependencies create stale closures.
- Refs persist without rendering. Visible state does not belong in a ref.
- Memoization needs stable identity and measured render cost.
- Context updates consumers when provider value changes.
- Use `useSyncExternalStore` for external mutable stores.
- Suspense, transitions, and error boundaries solve different states.
- Actions coordinate async mutations. They do not provide server authorization or idempotency.
- `use` can read a promise or context during render and may appear conditionally.
- `<Activity>` preserves hidden DOM and state, cleans up Effects, and restores them when visible.
- Strict Mode extra work is development-only and exposes impurity or missing cleanup.

## Next.js

- App Router components are Server Components by default.
- `"use client"` starts a client module boundary.
- Imports below that boundary enter the client graph.
- Client Components still get initial server HTML and hydrate.
- Boundary props must be serializable.
- Push interactive boundaries down.
- Current `fetch` is not cached by default.
- Next.js 16 Cache Components are opt-in.
- Shared cache must not leak account-specific data.
- Server Actions are endpoints. Authenticate, authorize, validate, and rate-limit.
- Route Handlers use Web `Request` and `Response`.
- Time, randomness, browser branches, and invalid HTML can break hydration.

## JavaScript and TypeScript

- Types disappear at runtime. Parse external data from `unknown`.
- `as` is trust, not validation.
- `readonly` and object spread are shallow.
- `sort` mutates and sorts strings by default.
- `0 || fallback` loses valid zero. Use `??` for nullish fallback.
- Promise callbacks are microtasks. Timers are tasks.
- `forEach` does not await promises.
- `Promise.all` rejects early but does not cancel siblings.
- `fetch` normally resolves for HTTP 500. Check `response.ok`.
- Abort stops client waiting. It does not prove server rollback.
- JavaScript `number` is not exact decimal accounting.

## ECMAScript 2027

- Current Stage 4 list: Explicit Resource Management, `Atomics.pause`, Joint Iteration, and Temporal.
- `using` and `await using` perform scope-based cleanup.
- `Iterator.zip(..., { mode: "strict" })` detects unequal input lengths.
- `Atomics.pause()` is a spin-loop hint, not an async yield.
- Use `Temporal.Instant` for event time and a named zone for display.
- Stage 4 does not guarantee support in the interviewer's runtime or toolchain.

## HTML and CSS

- Link navigates. Button acts.
- ARIA adds semantics, not behavior.
- Every input needs an accessible name.
- Use `fieldset` and `legend` for related controls.
- Prefer form `onSubmit` to button click handling.
- `disabled` changes behavior. `aria-disabled` does not.
- DOM order should match reading and focus order.
- Cascade compares origin, importance, layer, specificity, and source order.
- `:where()` has zero specificity.
- `min-inline-size: 0` fixes many flex overflow cases.
- `minmax(0, 1fr)` fixes many grid content-minimum cases.
- `z-index` stays inside its stacking context.
- Container query uses allocated component size.

## Accessibility

- WCAG principles are perceivable, operable, understandable, and robust.
- Common target is WCAG 2.2 Level AA.
- All functionality must work by keyboard.
- Focus must be visible and not entirely obscured.
- Normal text contrast is at least 4.5:1.
- Large text and meaningful UI graphics use at least 3:1.
- Level AA target size is 24 by 24 CSS pixels unless an exception applies.
- Do not encode profit and loss with color alone.
- Do not announce every quote tick.
- Test keyboard, zoom, reflow, accessibility tree, contrast, and critical screen-reader paths.

## Core Web Vitals

```text
LCP <= 2.5 s
INP <= 200 ms
CLS <= 0.1
p75, split mobile and desktop
```

- Field data finds real affected users.
- Lab data reproduces and diagnoses.
- Lighthouse TBT is not INP.
- LCP is server time, load delay, load duration, and render delay.
- INP is input delay, processing, and presentation delay.
- Reserve dimensions for images, banners, and Suspense fallbacks.
- Also measure quote age, message-to-visible latency, dropped frames, and reconnect time.

## Finance

- Order is intent. Fill is execution. Position is exposure.
- Bid is where you can sell. Ask is where you can buy.
- Long positions close against bid. Short positions close against ask.
- Timeout means unknown outcome, not rejection.
- Retry one intent with the same idempotency key.
- Use snapshot plus sequential deltas.
- Mark data stale during reconnect.
- Keep order commands separate from latest-only search cancellation.
- Server controls authorization, margin, execution, and final order state.

## Answer shape

```text
Mechanism:
Common trap:
How I would verify it:
```

If stuck:

> I do not remember the exact API name. The behavior I need is a stable subscription snapshot that cannot tear during concurrent rendering.

> I would first solve ordered, valid messages. Then I would isolate late data, duplicate sequence, and resynchronization policies.

> I would measure whether React render, JavaScript, layout, or paint dominates before choosing an optimization.
