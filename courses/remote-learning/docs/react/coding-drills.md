# React coding drills

Use the shared finance drills for pure TypeScript and algorithms. These drills test React, Next.js, browser behavior, accessibility, and performance.

Angular is out of scope. Each drill names whether one React playground is enough or whether Next.js App Router and TanStack Start both need a sitting.

## Drill 1: review a broken quote component

Time: 20 minutes.

Scope: one of `apps/react-next` or `apps/react-vite`. This is a React render-purity review. Next.js and TanStack Start do not change the findings.

Find at least ten problems:

```tsx
interface Quote {
  readonly symbol: string;
  readonly price: number;
}

function QuoteList({ quotes }: { quotes: Quote[] }) {
  const [sortedQuotes, setSortedQuotes] = useState<Quote[]>([]);

  quotes.sort((left, right) => left.price - right.price);

  useEffect(() => {
    setSortedQuotes(quotes);
  }, []);

  return (
    <div>
      {sortedQuotes.map((quote, index) => (
        <div key={index} onClick={() => selectQuote(quote.symbol)}>
          {quote.symbol}: {quote.price.toFixed(2)}
        </div>
      ))}
    </div>
  );
}
```

Expected findings:

1. `quotes` is mutable in the type.
2. `sort` mutates a prop during render.
3. Render is impure.
4. Derived data is copied into state.
5. The effect has missing dependencies.
6. Users see an unnecessary stale render.
7. Index is an unstable key after sorting.
8. Clickable div lacks button semantics and keyboard behavior.
9. The price has no currency or instrument precision.
10. `toFixed` does not solve arithmetic precision.
11. Every row recreates a closure, which is usually fine and should not distract from correctness.
12. No empty or stale-data state exists.

Rewrite with a non-mutating calculation, stable key, semantic control, and explicit price-formatting contract.

## Drill 2: cancellable instrument search

Time: 45 minutes.

Scope: `apps/react-next` and `apps/react-vite`. Debounce, abort, and stale-result traps are the same React. The URL and data-loading boundary is not. Do both playgrounds.

Build:

- a labeled search input
- a 250 millisecond debounce
- minimum query length
- old-request cancellation
- loading, results, empty, and error states
- keyboard-operable results
- no stale response overwrite

Clarify before coding:

- Should whitespace and case be normalized?
- Does selecting a result navigate or run an action?
- Can the API cancel server work?
- Should prior results remain while a new request loads?
- How will the URL represent the query?

React traps:

- an effect dependency object created during render
- a timer without cleanup
- abort errors shown as failures
- stale results committed after the query changes
- a transition used as a substitute for debouncing

Do this in both React playgrounds:

- `apps/react-next`: App Router `searchParams`, and when the result list can load in a Server Component.
- `apps/react-vite`: TanStack Router search params (`validateSearch` or equivalent) and a loader. There is no Server Component split here. Name the loader versus client-fetch line.

## Drill 3: accessible order ticket

Time: 60 minutes.

Scope: one of `apps/react-next` or `apps/react-vite`. Labels, focus, and form state are DOM and React. Server Actions versus TanStack server functions are stretch work, not a required second playground.

Build a market or limit order form with:

- buy or sell selection
- quantity text input
- optional limit price
- estimated notional and margin
- review step
- pending, confirmed, rejected, and unknown states
- field and form-level errors
- focus management after submission

Rules:

- preserve incomplete numeric input
- parse decimal values through an explicit domain boundary
- disable accidental repeat clicks
- reuse one idempotency key for a retry of the same intent
- treat timeout as unknown outcome
- show quote timestamp and stale status
- keep the server authoritative

Accessibility checks:

- every control has a visible label
- buy or sell controls form one named group
- error text is associated with its control
- profit, loss, buy, and sell do not depend on color alone
- focus moves to the error summary or confirmation heading when helpful
- pending state is announced once

Follow-up:

Explain why unmounting or aborting the request does not prove server cancellation.

## Drill 4: high-rate watchlist

Time: 60 minutes.

Scope: one of `apps/react-next` or `apps/react-vite` for the store, `useSyncExternalStore`, and virtualization. Do both playgrounds only if the sitting includes session-scoped connection across navigations: Next.js keeps the socket in a Client Component under a layout; TanStack Start keeps it in router context or a client-only module. That second sitting is optional.

Design and partially implement a watchlist with 500 instruments and 10,000 incoming updates per second.

Required reasoning:

1. one connection per authenticated session
2. runtime payload validation
3. snapshot and sequence protocol
4. latest quote store keyed by instrument ID
5. per-row subscription
6. visual update pacing
7. stable keys
8. virtualization
9. stale and reconnecting state
10. accessible table semantics

Start with a simple store:

```typescript
interface QuoteStore {
  applyMessage(message: unknown): void;
  subscribeToInstrument(
    instrumentId: string,
    onStoreChange: () => void,
  ): () => void;
  getQuoteSnapshot(instrumentId: string): Quote | null;
}
```

Use `useSyncExternalStore` in a row hook. `getQuoteSnapshot` must preserve identity while the selected quote has not changed.

Do not start with `useMemo` or one Context provider containing the full map.

Metrics:

- input rate
- accepted and rejected sequence counts
- sequence gaps
- quote age
- message-to-visible latency
- long tasks
- dropped frames
- active subscriptions after navigation

## Drill 5: Next.js execution-boundary review

Time: 30 minutes.

Scope: `apps/react-next` only. TanStack Start is out of scope. Loaders, server functions, and isomorphic modules are a different boundary model. Do not mark this Hour done in `apps/react-vite`.

You inherit a page whose root file has `"use client"`. It imports:

- charting library
- database schema types
- server API client
- watchlist
- static legal text
- account summary
- order form

Propose a split.

Expected direction:

- Server Component verifies the session.
- Server data layer returns minimal serializable records.
- Static and account summary UI remain on the server where possible.
- Small Client Components own chart interaction, live watchlist behavior, and order-form state.
- Server Actions or Route Handlers repeat authorization and validation.
- Shared cache excludes account-specific balances and positions.

Then answer:

- What enters the client bundle?
- What creates a request-time route?
- Where can Suspense stream useful content?
- Which content can use `"use cache"`?
- How would you measure the bundle change?

## Drill 6: CSS and accessibility repair

Time: 30 minutes.

Scope: one of `apps/react-next` or `apps/react-vite`. Dialog semantics, focus trap, and stacking contexts are the same. Next.js intercepting routes are stretch work, not a required second playground.

Start with:

```html
<div class="modal">
  <div class="close" onclick="closeModal()">×</div>
  <div class="title">Place order</div>
  <input placeholder="Quantity" />
  <div class="submit" onclick="submitOrder()">Submit</div>
</div>
```

Repair:

- dialog name and semantics
- real buttons
- visible input label
- form submission
- error association
- keyboard focus trap and Escape behavior
- focus restoration
- inert background
- target size
- focus visibility
- zoom and narrow-screen layout

Explain why adding ARIA roles alone is incomplete.

CSS follow-up:

The dialog appears behind a transformed chart even with `z-index: 9999`. Find the ancestor stacking context or render the modal into a deliberate top-level portal.

## Drill 7: Core Web Vitals diagnosis

Time: 25 minutes.

Scope: one of `apps/react-next` or `apps/react-vite`. Prefer `apps/react-next` if the interview is Next.js. TTFB, RSC, and hydration evidence differ on TanStack Start. This is a diagnosis sitting, not a required pair.

Given:

```text
LCP p75: 4.1 s
INP p75: 340 ms
CLS p75: 0.18
TTFB p75: 1.7 s
Lighthouse TBT: 620 ms
```

Do not list generic fixes. Ask for:

- route and device segments
- LCP element and subparts
- slow interaction target and phase breakdown
- layout-shift sources
- third-party script cost
- client bundle and hydration timeline

Likely first investigations:

- TTFB makes a 2.5 second LCP difficult.
- High TBT suggests startup main-thread work that may also affect INP.
- CLS needs a shift trace because the cause may happen after load.

Propose one change at a time and the evidence that would confirm it.

## Drill 8: React and JavaScript race

Time: 20 minutes.

Scope: one of `apps/react-next` or `apps/react-vite`. The race is a React effect. Next.js may move the fetch off the client. Say that aloud. Do not repeat the rewrite in the second playground.

Review:

```tsx
useEffect(() => {
  setLoading(true);

  fetch(`/api/instruments/${instrumentId}`)
    .then((response) => response.json())
    .then((instrument) => {
      setInstrument(instrument);
      setLoading(false);
    });
}, [instrumentId]);
```

Find:

- no HTTP status check
- no runtime payload validation
- no rejection path
- old response can win
- cleanup does not cancel obsolete work
- loading may remain true after failure
- several setters represent one request state poorly

Rewrite with `AbortController` or a query layer and a discriminated request state.

## Self-scoring

Give 0 to 2 for each:

- clarified contract
- modeled valid states
- preserved domain precision
- handled stale and unknown outcomes
- explained React render behavior
- used the correct server and client boundary
- used semantic HTML
- tested keyboard and focus behavior
- measured before optimizing
- finished one working path

A score below 15 means repeat the same drill. Do not switch topics until the weak mechanism is clear.
