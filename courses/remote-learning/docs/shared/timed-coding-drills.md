# Timed coding drills

Run these with screen recording and spoken reasoning. Do not read the solution notes first. The goal is a clear contract, correct core, useful tests, and an honest production follow-up.

Each drill names its playgrounds. Default shared sitting: `apps/angular` and one React playground. Next.js App Router and TanStack Start are a second React sitting only when the drill says they diverge.

## Drill 1: latest quote reducer

Time: 25 minutes.

Scope: `apps/angular` and one of `apps/react-next` or `apps/react-vite`. This is a TypeScript reducer. Next.js and TanStack Start are the same sitting.

Implement:

```typescript
interface QuoteUpdate {
  readonly symbol: string;
  readonly bid: number;
  readonly ask: number;
  readonly sequence: number;
}

function getLatestQuotes(
  updates: readonly QuoteUpdate[],
): ReadonlyMap<string, QuoteUpdate>;
```

Rules:

- Keep the highest sequence for each symbol.
- Ignore a duplicate or older sequence.
- Reject non-finite prices.
- Reject bid greater than ask.
- Do not mutate input.

Before coding, answer:

- Is sequence global or per symbol?
- Should one malformed update reject all output or be reported separately?
- Can two different updates have the same sequence?

Minimum tests:

```text
empty input
one symbol
interleaved symbols
duplicate sequence
late sequence
bid greater than ask
NaN
zero bid
```

Target complexity: O(n) time and O(s) space for `s` symbols.

Senior follow-up:

- Parse socket payloads from `unknown`.
- Track gap metrics, not only old events.
- A delta stream may require snapshot synchronization.

## Drill 2: rolling statistics

Time: 30 minutes.

Scope: `apps/angular` and one of `apps/react-next` or `apps/react-vite`. This is a one-pass numeric function. Next.js and TanStack Start are the same sitting.

Implement one-pass mean and sample standard deviation:

```typescript
interface Statistics {
  readonly count: number;
  readonly mean: number | null;
  readonly sampleStandardDeviation: number | null;
}

function calculateStatistics(values: readonly number[]): Statistics;
```

Constraints:

- O(n) time.
- O(1) extra space.
- Reject non-finite values.
- Return `null` standard deviation for fewer than two values.

Trap: the direct formula `E[x²] - E[x]²` can lose precision when values are large and close together. Use Welford's algorithm.

## Drill 3: candle aggregation

Time: 40 minutes.

Scope: `apps/angular` and one of `apps/react-next` or `apps/react-vite`. This is event-time aggregation. Next.js and TanStack Start are the same sitting.

Aggregate ordered trade ticks into one-minute OHLCV candles. See [finance algorithms](finance-algorithms.md) only after finishing.

Clarify:

- Event-time or arrival-time buckets?
- UTC or exchange-local session?
- What happens to empty minutes?
- What happens to late ticks?
- Can quantity be zero?

Stretch work:

- Implement a maximum lateness window.
- Return late events separately instead of silently discarding them.
- Make the aggregator incremental.

## Drill 4: order-book reducer

Time: 45 minutes.

Scope: `apps/angular` and one of `apps/react-next` or `apps/react-vite`. This is a sequenced book reducer. Next.js and TanStack Start are the same sitting.

Given a snapshot and sequential deltas, return top five bids and asks.

Rules:

- quantity zero removes a level
- bids sort descending
- asks sort ascending
- sequence must increment by one
- a gap makes the book stale

Start with `Map<bigint, bigint>` and sorting. State that this costs O(m log m) when extracting levels. Do not build a balanced tree unless asked.

Stretch work:

- Buffer deltas while loading a snapshot.
- Model `loading`, `live`, and `stale` as a discriminated union.
- Design a resynchronization callback.

## Drill 5: instrument search

Time: 45 minutes.

Scope: `apps/angular` and one of `apps/react-next` or `apps/react-vite`. The stack split is RxJS versus React effects. URL and server loading belong to the React-only search drill, not a second shared React sitting.

Build an instrument search UI with:

- a labeled search control
- 250 ms debounce
- duplicate-query suppression
- old-request cancellation
- explicit loading, results, empty, and error states
- accessible result list
- cleanup for timers, requests, and subscriptions

State why latest-request cancellation is correct for search. Keep one failure from breaking future searches.

Questions to expect:

- What if the backend cannot cancel work?
- Why can an initial empty array hide loading state?
- What owns request and timer cleanup?
- How do you test cancellation?
- How would you implement this in your interview framework?

## Drill 6: order ticket

Time: 60 minutes.

Scope: `apps/angular` and one of `apps/react-next` or `apps/react-vite`. The stack split is Angular forms versus React form state. Server Actions versus TanStack server functions are stretch work, not a required second React playground.

Build an order ticket for a CFD position.

Inputs:

- side
- quantity
- optional limit price
- account ID
- instrument metadata

Required behavior:

- typed validation for minimum, maximum, and quantity step
- estimated notional and margin
- pending state prevents accidental duplicate submission
- server remains authoritative
- timeout creates an unknown outcome, not an automatic rejection
- retry uses the same idempotency key for the same intent

Discuss whether repeated intent should be ignored, queued, or rejected. Latest-request cancellation is dangerous because a new click can stop client observation without proving server cancellation.

Do not include market price as a hidden synchronous global. Pass a quote snapshot with timestamp and show when it is stale.

## Drill 7: real-time watchlist

Time: 60 minutes.

Scope: `apps/angular` and one of `apps/react-next` or `apps/react-vite`. Store, pacing, and virtualization are this sitting. Session-scoped connection across navigations differs between Next.js layouts and TanStack Router. That split belongs to the React high-rate watchlist drill, not a second shared React sitting.

Design and partially implement a screen showing 500 instruments while receiving 10,000 updates per second.

Expected reasoning:

1. Validate and sequence messages outside components.
2. Maintain latest quote by symbol.
3. Drop intermediate visual updates, not business events.
4. Render at a measured cadence.
5. Track rows by instrument ID.
6. Virtualize the visible list.
7. Scope connection state to authenticated session.
8. Show stale state during reconnect.

Do not begin with forced rendering calls. Explain how the selected framework learns that row state changed.

Metrics to name:

- ingress messages per second
- accepted and dropped sequence counts
- sequence gaps
- parse failures
- socket reconnects
- message-to-render latency
- long tasks and frame rate

## Drill 8: bug hunt

Time: 20 minutes.

Scope: one playground. Review the snippet once. Do not repeat it per stack.

Review this code aloud:

```typescript
interface Price {
  readonly symbol: string;
  readonly value: number;
}

async function enrichPrices(
  prices: Price[],
): Promise<Price[]> {
  const result: Price[] = [];

  prices.sort((left, right) => left.value - right.value);

  prices.forEach(async (price) => {
    const converted = await convertPrice(price);
    result.push(converted);
  });

  return result;
}

declare function convertPrice(price: Price): Promise<Price>;
```

Find at least six concerns:

1. `sort` mutates caller-owned input.
2. `forEach` does not await callbacks.
3. Function returns before conversion completes.
4. Result order follows completion timing, not sorted input.
5. Concurrency is unbounded.
6. Failure handling is missing.
7. Numeric validity and currency units are unstated.
8. Stable ordering for equal prices is not discussed.

A reasonable concurrent rewrite:

```typescript
async function enrichPricesSafely(
  prices: readonly Price[],
): Promise<Price[]> {
  const sorted = [...prices].sort(
    (left, right) => left.value - right.value,
  );

  try {
    return await Promise.all(sorted.map((price) => convertPrice(price)));
  } catch (error: unknown) {
    throw new Error(
      `Failed to enrich ${prices.length} prices`,
      { cause: error },
    );
  }
}
```

This still needs a concurrency limit for large input. `Promise.all` preserves input order, even when tasks complete in another order.

## Drill 9: async policy choice

Time: 15 minutes.

Scope: one playground. Fill the table once. Naming an Angular or React implementation is spoken follow-up, not a second required sitting.

Choose product semantics first. Then name one possible implementation:

| Scenario | Product semantics | Possible implementation |
| --- | --- | --- |
| Search as user types | latest request wins | abort plus request ID |
| Prevent repeat submit while active | ignore duplicates | pending guard |
| Save edits in exact order | queue | promise queue |
| Load independent instrument details | bounded concurrency | task pool |
| Show latest quote every frame | publish latest on a cadence | animation-frame scheduler |
| Wait for user to stop typing | run after silence | resettable timer |

Then name one case where each answer would change. Product semantics outrank library recipes.

## Drill 10: state-machine refactor

Time: 25 minutes.

Scope: `apps/angular` and one of `apps/react-next` or `apps/react-vite`. The union is TypeScript. The exhaustive render is Angular `@switch` versus a React switch. Next.js and TanStack Start are the same React sitting.

Replace this ambiguous state:

```typescript
interface OrderView {
  readonly isLoading: boolean;
  readonly orderId?: string;
  readonly error?: string;
}
```

Problems:

- loading and error can both be true
- an order ID and error can coexist
- no distinction between rejection and unknown timeout
- every consumer repeats interpretation

Use a discriminated union:

```typescript
interface DraftOrderView {
  readonly state: "draft";
}

interface SubmittingOrderView {
  readonly state: "submitting";
  readonly clientOrderId: string;
}

interface AcceptedOrderView {
  readonly state: "accepted";
  readonly clientOrderId: string;
  readonly orderId: string;
}

interface RejectedOrderView {
  readonly state: "rejected";
  readonly clientOrderId: string;
  readonly reason: string;
}

interface UnknownOrderView {
  readonly state: "unknown";
  readonly clientOrderId: string;
}

type OrderView =
  | DraftOrderView
  | SubmittingOrderView
  | AcceptedOrderView
  | RejectedOrderView
  | UnknownOrderView;
```

Render it with an exhaustive switch or exhaustive template structure.

## Drill 11: count-up timer

Time: 20 minutes.

Scope: `apps/angular` and one of `apps/react-next` or `apps/react-vite`. Scheduler ownership and teardown differ between Angular and React. Next.js `"use client"` is a spoken check, not a second React sitting.

Build a timer UI that counts up from 0 while running.

Controls:

- start / resume
- pause
- restart

Rules:

- Display elapsed time from 0 with 100 ms resolution.
- While running, the displayed value advances every 100 ms.
- Pause freezes the displayed value and stops the scheduler.
- Resume continues from the paused value. It does not jump as if the clock kept running in the background.
- Restart sets elapsed time to 0. If the timer was running, it keeps running from 0. If it was paused or idle, it stays stopped at 0.
- Do not let the UI tick after the component is destroyed.
- Derive elapsed time from a start timestamp plus accumulated paused duration, or equivalent. Do not add 100 on each callback. `setInterval(..., 100)` drifts.

Model status as a discriminated union, not a pile of booleans:

```typescript
type CountUpStatus = "idle" | "running" | "paused";

interface CountUpTimerView {
  readonly status: CountUpStatus;
  readonly elapsedMs: number;
}
```

Before coding, answer:

- What is idle versus paused at 0?
- Which buttons are enabled in each status?
- What owns the interval, RxJS subscription, or animation-frame loop, and where is it torn down?

Minimum tests:

```text
starts at 0 idle
running advances elapsed time
pause freezes elapsed time
resume continues from the paused value
restart from running returns to 0 and keeps running
restart from paused returns to 0 and stays stopped
no tick after destroy
```

Senior follow-up:

- Background tabs throttle `setInterval`. Say what that does to a count-up timer and whether `performance.now()` still helps.
- In zoneless Angular, who notifies the view after a tick?
- In React, what breaks if the interval closure captures a stale elapsed value?

## Drill 12: countdown timer

Time: 25 minutes.

Scope: `apps/angular` and one of `apps/react-next` or `apps/react-vite`. Same stack split as the count-up timer. Next.js client-component placement is a spoken check, not a second React sitting.

Build a countdown UI. The user enters a duration. The timer counts from that value to 0.

Controls:

- numeric duration input
- start / resume
- pause
- restart

Rules:

- Input unit is seconds. Display remaining time with 100 ms resolution.
- Reject non-finite, negative, and empty input. Do not start on invalid input.
- While running, remaining time decreases every 100 ms.
- Pause freezes remaining time and stops the scheduler.
- Resume continues from the paused remaining time.
- Restart restores remaining time to the last duration that successfully started, not to whatever is currently typed unless that value was committed by start or restart.
- Changing the input during a run does not alter the active countdown until restart with a newly committed duration.
- At 0, enter a completed status. Do not go negative. Stop the scheduler.
- Pause is a no-op when completed. Restart from completed uses the committed duration and starts a new run, or returns to idle at that duration. Pick one and say it aloud.
- Derive remaining time from timestamps. Do not subtract 100 per callback.
- Tear down the scheduler on destroy.

```typescript
type CountdownStatus = "idle" | "running" | "paused" | "completed";

interface CountdownTimerView {
  readonly status: CountdownStatus;
  readonly remainingMs: number;
  readonly durationMs: number;
}
```

Before coding, answer:

- When is the typed input committed?
- What happens if the user edits the input while paused?
- Is completed different from idle at 0?

Minimum tests:

```text
idle until a valid duration starts
reject negative, NaN, and empty input
running decreases remaining time
pause freezes remaining time
resume continues from the paused remaining time
does not go below 0
completed stops the scheduler
restart restores the committed duration
input edits during a run do not change remaining time
no tick after destroy
```

Senior follow-up:

- Say whether 0 is a valid duration.
- Name one product choice: auto-restart, ring once, or sit on completed.
- In Next.js, why must this timer stay a client component?

## Self-scoring rubric

Score each item from 0 to 2:

- clarified contract before coding
- stated units and precision
- modeled valid states
- handled empty and boundary input
- handled ordering and duplicates
- chose product-correct async semantics
- avoided hidden mutation
- tested failure paths
- stated time and space complexity
- separated correct core from production work
- communicated while coding
- finished a working slice

Interpretation:

- 20 to 24: strong senior signal
- 15 to 19: solid, review weak categories
- below 15: repeat the drill with a smaller first implementation

Do not give yourself points for naming patterns without showing why they fit.
