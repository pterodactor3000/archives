# Twenty technical questions

Run this as a 60-minute mock. Spend about 90 seconds on your first answer, then take follow-ups. Lead with the mechanism. Add a financial example only when it proves you can apply the mechanism.

## 1. What causes a React component to render?

Short answer:

> React can render a component when its state changes, its parent renders, consumed context changes, or an external store subscription publishes a changed snapshot. A render calls the component to produce a new element tree. It does not imply that React will replace DOM.

Add depth:

- React reconciles the new tree against the previous tree.
- Component type, position, and key control preserved identity.
- `memo` may skip a parent-driven render when props compare equal.
- Changes to a component's own state or consumed context can still cause it to render.
- Development Strict Mode may call the component extra times.

Trap:

> "A component rerenders only when its props change."

Finance application:

One context value containing every quote can render hundreds of unrelated rows. Subscribe by instrument ID through selectors or an external store.

## 2. Why does `setCount(count + 1)` three times often add one?

Short answer:

> State belongs to a render snapshot. Each call reads the same `count`. React batches the queued updates after the handler. Updater functions receive the latest queued value, so three `setCount(current => current + 1)` calls add three.

Add depth:

- The setter schedules a future render.
- It does not mutate the local variable.
- Event handlers close over the snapshot that created them.
- Replacement values and updater functions have different queue behavior.

Trap:

Reading state immediately after its setter and expecting the new value.

Follow-up:

For an order button, do not infer server state from a local setter. Send one idempotent command and model pending, confirmed, rejected, and unknown outcomes.

## 3. What belongs in `useEffect`?

Short answer:

> An effect synchronizes committed React state with an external system such as a socket, timer, browser API, or imperative widget. Derived values belong in render. Work caused by a click belongs in the event handler.

Add depth:

- Cleanup runs before changed setup and on unmount.
- Strict Mode runs an extra development setup and cleanup cycle.
- Every reactive value read by setup belongs in dependencies.
- Split effects by independent synchronization contract.
- Data fetching in a framework or query layer can avoid waterfalls and duplicate requests.

Trap:

```tsx
useEffect(() => {
  setFullName(`${firstName} ${lastName}`);
}, [firstName, lastName]);
```

`fullName` is derived during render. The effect creates a stale intermediate render.

Finance application:

A quote subscription belongs in an effect or external store. Order submission belongs in the submit handler, not an effect that watches `shouldSubmit`.

## 4. How do stale closures happen, and how do you fix them?

Short answer:

> A callback retains bindings from the render that created it. If a timer, promise, listener, or effect runs later, it may read old props or state. Fix ownership and dependencies, use updater functions, cancel obsolete work, or read the latest value through a deliberate ref or Effect Event.

Add depth:

- Do not suppress `exhaustive-deps`.
- Move unstable objects inside an effect when they are effect details.
- Use request IDs or `AbortController` for latest-only requests.
- A ref avoids rerender and therefore must not hold visible state.

Trap:

Adding an empty dependency array to make an effect "run once" while it reads changing values.

Finance application:

An old instrument search response must not replace results for the current query. A submitted order must not be treated as canceled because its component unmounted.

## 5. When should you use `memo`, `useMemo`, or `useCallback`?

Short answer:

> Use them when measurement shows repeated work and stable identity lets React skip it. `memo` may skip parent-driven rendering when old and new props compare equal. `useMemo` caches a calculated value. `useCallback` caches a function identity. None fixes impure code or broad context updates.

Add depth:

- A fresh object prop defeats shallow comparison.
- Comparison and cache management have a cost.
- Cached values are performance hints, not durable storage.
- React Compiler can add memoization to compatible compiled code.
- Check whether the project uses the compiler before assuming manual memoization is redundant.

Trap:

Wrapping every function in `useCallback`.

Better diagnostic:

1. identify why the child renders
2. measure its render cost
3. fix state ownership or broad subscriptions
4. memoize only if the remaining render is expensive

## 6. Why can Context hurt performance?

Short answer:

> When a provider value changes, React schedules every consumer of that context. A fresh object has new identity. One context that combines theme, user, and high-rate quotes can spread every tick across the tree.

Add depth:

- Split contexts by ownership and update rate.
- Keep provider values stable when content is unchanged.
- Put providers near their consumers.
- Use a selector-based store for high-rate granular state.
- `memo` does not block a context update consumed inside the component.

External store contract:

`useSyncExternalStore` gives React a subscribe function and stable snapshot. It supports concurrent rendering without tearing when implemented correctly.

Finance application:

Each quote row should read the snapshot for its instrument. A EUR/USD update should not render the BTC/USD row.

## 7. Controlled or uncontrolled form inputs?

Short answer:

> A controlled input takes its value from React and updates it through `onChange`. An uncontrolled input keeps current value in the DOM and is read through a ref or form submission. Use controlled state when validation and dependent UI need every change. Use uncontrolled state when the DOM contract is enough.

Add depth:

- Do not switch one input between controlled and uncontrolled.
- A controlled input needs a synchronous `onChange` update.
- Keep incomplete numeric text such as `"1."` until the user finishes.
- Parse, normalize, and validate at named boundaries.
- File inputs are normally uncontrolled.

Finance application:

Client validation gives fast feedback. The server still controls margin, permissions, market status, and execution price. Button disabling reduces duplicate clicks but idempotency provides the business guarantee.

## 8. How do Suspense, transitions, Actions, Activity, and error boundaries differ?

Short answer:

> Suspense coordinates a fallback for supported suspended work. A transition marks an update as non-urgent. An Action coordinates an async mutation. Activity preserves hidden UI state while cleaning up its Effects. An error boundary replaces a descendant subtree that throws during rendering.

Add depth:

- Fetching in an effect does not automatically activate Suspense.
- A transition does not move CPU work off the main thread.
- `useActionState`, `useFormStatus`, and `useOptimistic` support Action UI.
- Optimistic UI must match the cost of showing an outcome that is not final.
- Hidden Activity content keeps DOM and state, renders at lower priority, and restores Effects when visible.
- Keep fallbacks close in dimensions to loaded content.
- Error boundaries do not catch event-handler errors or most asynchronous callbacks.
- Handle command rejection as domain state.

Trap:

Using one full-screen Suspense boundary for every update.

Finance application:

Instrument education content may suspend. A failed order is not a render crash and should not go to a generic error boundary.

## 9. What is the difference between a Server Component and a Client Component?

Short answer:

> In the Next.js App Router, components are server components by default. They can read server data and keep server-only code out of the browser, but cannot use state, effects, browser APIs, or event handlers. `"use client"` starts a client module boundary for interactive code.

Add depth:

- Imports below the client boundary enter the client graph.
- Client Components still receive initial server-rendered HTML and then hydrate.
- Props crossing the boundary must be serializable.
- A Server Component can pass rendered content into a Client Component slot.
- Push client boundaries down instead of marking the whole layout.

Trap:

> "Client Component means client-only rendering."

Finance application:

Load an authorized initial account snapshot on the server. Pass a safe serializable snapshot to a small client watchlist that owns live updates.

## 10. How does current Next.js caching work?

Short answer:

> Current App Router `fetch` calls are not cached by default. Make reuse explicit with revalidation options or the Next.js 16 Cache Components model. Never put account-specific data in a shared cache without a correct ownership key and policy.

Add depth:

- `next: { revalidate, tags }` adds time and tag policy to `fetch`.
- `cacheComponents: true` enables the current Cache Components model.
- `"use cache"` marks reusable work.
- `cacheLife` defines freshness and `cacheTag` supports invalidation.
- Request-specific APIs such as cookies must stay outside shared cached scopes.
- `updateTag` can provide read-your-own-writes behavior in Server Actions.

Trap:

> "Next.js automatically caches every server fetch."

Version note:

This answer changed across Next.js versions. Ask which version and router the project uses.

## 11. Why must a Server Action authenticate and authorize again?

Short answer:

> A Server Action is a server endpoint. A caller can invoke it without navigating through the expected UI. Authenticate inside it, authorize the exact resource, validate all input, and enforce transaction rules on the server.

Add depth:

- Hidden buttons do not enforce permission.
- TypeScript types do not validate `FormData`.
- Bind user identity from the verified session, not submitted fields.
- Use idempotency for retried financial commands.
- Return safe errors and log a correlation ID.
- Rate-limit abuse.

Trap:

Trusting an account ID captured by the page without verifying current session access in the action.

Finance application:

A successful HTTP response can mean "command accepted for processing," not "position opened." Model confirmation separately.

## 12. What causes hydration mismatches?

Short answer:

> Hydration expects the first client render to match server HTML. Time, randomness, browser-only branches, locale differences, invalid HTML, changed data, or CSS-in-JS configuration can produce different trees.

Add depth:

- Render a deterministic initial state.
- Read browser-only state after hydration or through a hydration-safe store.
- Pass server time or formatted text when consistency matters.
- Fix invalid nesting.
- Use `suppressHydrationWarning` only for a narrow unavoidable text difference.

Trap:

```tsx
return <span>{Date.now()}</span>;
```

The server and client produce different text.

Finance application:

Do not render "market open" from two different clocks. Use authoritative session data and update it after hydration.

## 13. Explain the browser event loop and a common promise trap

Short answer:

> The browser runs one task, drains microtasks, and then may render. Promise callbacks are microtasks. Timers and input events are tasks. Long tasks or endless microtasks delay input and paint.

Expected order:

```typescript
console.log("A");
setTimeout(() => console.log("B"), 0);
void Promise.resolve()
  .then(() => console.log("C"))
  .catch((error: unknown) => {
    console.error("Failed to run event-loop example", error);
  });
console.log("D");
// A, D, C, B
```

Promise traps:

- `forEach` does not await callbacks
- `Promise.all` rejects early but does not cancel siblings
- async errors become rejected promises
- a floating promise can become an unhandled rejection

Finance application:

Do not float an order promise. Track it through an explicit command state and reconcile a timeout.

## 14. What remains unsafe after TypeScript compiles?

Short answer:

> TypeScript types disappear at runtime. Network payloads, storage, URL values, form data, and third-party messages remain untrusted. Parse them from `unknown` with runtime checks.

Add depth:

- `any` disables checking and spreads.
- `as` is trust, not validation.
- Discriminated unions model valid states.
- `never` makes state handling exhaustive.
- `readonly` is shallow.
- Structural typing cannot distinguish two plain numbers with different units.

Finance application:

Use branded or wrapped types for price ticks, quantity units, currencies, and timestamps. Constructors validate runtime values.

Trap:

Annotating `await response.json()` as the desired interface without validation.

## 15. Why is JavaScript `number` risky for finance?

Short answer:

> JavaScript numbers use binary floating-point. Many decimal fractions are not exact, and integers stop being exact above `Number.MAX_SAFE_INTEGER`. Exact financial arithmetic needs an explicit representation and rounding policy.

Choices:

- integer minor units for fixed-scale currencies
- scaled integers or `bigint` for fixed tick scales
- decimal arithmetic for variable scales and named rounding

Add depth:

- `bigint` cannot mix with `number`
- JSON needs a string or custom representation for `bigint`
- `NaN` still has type `number`
- normalize negative zero for display
- do not round intermediate values without a business rule

Trap:

Using `toFixed` as the arithmetic fix. It formats and rounds a string result. It does not make prior binary operations exact.

Current-language follow-up:

> As of 31 August 2026, TC39 lists four Stage 4 proposals for ECMAScript 2027: Explicit Resource Management, `Atomics.pause`, Joint Iteration, and Temporal. Stage 4 does not guarantee runtime support.

Strong finance examples:

- `Iterator.zip` with `"strict"` mode catches mismatched aligned series
- `Temporal.Instant` represents an execution timestamp
- `using` gives test resources and subscriptions deterministic cleanup
- `Atomics.pause` is a low-level worker synchronization hint, not a UI-thread tool

Review the [ECMAScript 2027 notes](../shared/ecmascript-2027-stage-4.md) for APIs and traps.

## 16. Why use a native button instead of a clickable div?

Short answer:

> A native button already has focus, keyboard activation, disabled behavior, form behavior, semantics, and an accessibility role. A div has none of that. ARIA changes semantics but does not add behavior.

Add depth:

- Use links for navigation and buttons for actions.
- A button inside a form defaults to submit.
- `disabled` and `aria-disabled` have different behavior.
- Icon-only buttons need an accessible name.
- Test by keyboard and inspect the accessibility tree.

Trap:

Adding `role="button"` and `tabIndex={0}` but forgetting Space activation and disabled behavior.

Finance application:

Order actions must work without a pointer and keep visible focus during validation and confirmation.

## 17. How does the CSS cascade decide which rule wins?

Short answer:

> The cascade compares relevance, origin and importance, layer order, specificity, scoping proximity where relevant, then source order. Specificity matters only after earlier criteria tie.

Add depth:

- IDs outrank class-like selectors, which outrank type selectors.
- `:where()` has zero specificity.
- `:is()`, `:not()`, and `:has()` take specificity from their arguments.
- Unlayered normal author rules outrank normal rules in named layers.
- `!important` changes origin and layer precedence.

Trap:

Treating specificity as one base-10 number or assuming a later rule always wins.

Practical answer:

Use `@layer` for library, component, and utility precedence. Keep selectors low-specificity. Inspect computed styles before adding `!important`.

## 18. What are common Flexbox, Grid, and responsive layout traps?

Short answer:

> Flexbox handles one-dimensional distribution and Grid handles two-dimensional tracks. Both honor content minimums, which can cause overflow. Responsive components should react to their available container when viewport width is not the real constraint.

Add depth:

- `min-inline-size: 0` lets a flex child shrink below min-content size.
- `flex-basis` participates before grow and shrink.
- `minmax(0, 1fr)` prevents content minimums from stretching a grid track.
- A high `z-index` cannot escape an ancestor stacking context.
- Container queries adapt a reusable card to its allocated width.
- DOM order must stay logical when CSS reorders content.

Trap:

Fixing overflow with `overflow: hidden` and clipping a quantity or account value.

## 19. What are the Core Web Vitals?

Short answer:

> LCP measures loading and should be at most 2.5 seconds. INP measures interaction responsiveness and should be at most 200 milliseconds. CLS measures visual stability and should be at most 0.1. Judge them at the 75th percentile, split by mobile and desktop.

Add depth:

- Field data represents real users.
- Lab data helps reproduce and debug.
- Lighthouse TBT is not INP.
- LCP includes server time, resource delay, resource load, and render delay.
- INP includes input delay, handler work, and presentation delay.
- Reserve dimensions and stable fallbacks to reduce CLS.

Trap:

Calling First Input Delay a current Core Web Vital.

Finance application:

Also measure quote age, message-to-visible latency, dropped frames, reconnect duration, and order acknowledgement. CWV does not cover those.

## 20. Design a real-time financial watchlist

Short answer:

> I would keep one managed connection per authenticated session, parse messages from `unknown`, validate sequence and units, normalize latest quotes by stable instrument ID, and expose per-instrument subscriptions. I would separate business ingestion from visual cadence, model stale and reconnecting states, and measure message-to-visible latency.

Data path:

```text
WebSocket
  -> runtime parser
  -> snapshot and sequence validation
  -> latest quote store by instrument ID
  -> row selector
  -> frame-paced React publication
```

State to model:

- connecting
- synchronizing snapshot
- live
- stale
- unauthorized
- failed

Recovery:

1. mark displayed data stale
2. reconnect with capped backoff and jitter
3. reauthenticate
4. load a snapshot
5. apply deltas after the snapshot sequence
6. resynchronize after a gap

Rendering:

- stable keys
- row-level subscriptions
- virtualization for large lists
- controlled visual update cadence
- no screen-reader announcement for every tick

Commands:

Keep order submission separate from the latest-value quote stream. Use idempotency keys and reconcile unknown outcomes.

Proof:

- malformed and duplicate message tests
- gap and reconnect tests
- production-rate load test
- React and browser performance trace
- keyboard and screen-reader test
- metrics for gaps, quote age, dropped frames, and reconnects

Trap:

Opening one socket per row or putting the whole quote map in one fast-changing context.

## Scoring

Give each answer 0 to 2:

- 0: slogan or incorrect mechanism
- 1: correct mechanism without a concrete tradeoff
- 2: correct mechanism, trap, and verification

Interpretation:

- 34 to 40: strong coverage
- 26 to 33: review the lowest categories
- below 26: repeat with 30-second answers before adding depth

Do not memorize paragraphs. Memorize the first sentence, mechanism, trap, and one relevant example.
