# Last-minute cheat sheet

## Start every coding problem

```text
Goal:
Inputs and units:
Output:
Invariants:
Edge cases:
Scale:
```

Then say:

> I will build the simplest correct version first, test its boundaries, then discuss what changes at production scale.

## TypeScript

- Types disappear at runtime.
- Parse network and storage data from `unknown`.
- Use discriminated unions for valid states.
- Use `never` for exhaustive switches.
- `readonly` is shallow.
- `satisfies` checks without losing useful inference.
- `as` is trust, not validation.
- Default `sort` is lexicographic and mutates.
- `forEach` does not await async callbacks.
- `Promise.all` rejects early but does not cancel remaining work.
- Zero is not missing.
- `NaN` has type `number`.
- `number` is unsafe for exact decimal accounting.
- `bigint` does not serialize to JSON by default.

## Angular

- Signals fit synchronous state and derivation.
- RxJS fits cancellation, ordering, retries, and time.
- Keep `computed` pure.
- Use `effect` for imperative external synchronization.
- `toSignal` subscribes immediately. Create it once.
- Template-only streams use `AsyncPipe`. Side effects use `takeUntilDestroyed`. Non-RxJS handles use `DestroyRef.onDestroy`.
- Types do not free memory. Closures, injectors, timers, and sockets do.
- `WeakMap` keys are objects. Quote IDs need a `Map` with eviction.
- OnPush runs after input identity changes, subtree events, signal updates, `AsyncPipe`, or explicit marks.
- Track lists by stable domain ID.
- Provider scope controls state lifetime.
- Route guards do not enforce server authorization.
- Do not render every market tick.

## RxJS

```text
switchMap: latest wins
concatMap: queue all in order
mergeMap: concurrent
exhaustMap: ignore repeats while active
```

- Search usually uses `switchMap`.
- Order submission should not blindly use `switchMap`.
- Put inner request recovery inside the flattening operator when the outer stream must survive.
- `combineLatest` waits for all sources.
- `forkJoin` waits for completion.
- Unbounded `shareReplay` can retain too much.
- A Subject is hot and multicast. `unsubscribe` drops one observer. `complete` and `error` kill the stream.
- Do not `error()` a shared quote bus. Do not expose `Subject` on a public API. Use `asObservable()`.
- `auditTime` often fits visual market updates.
- Unsubscription does not prove server rollback.

## Trading

```text
mid = (bid + ask) / 2
spread = ask - bid

notional = price × quantity × contractMultiplier
margin = notional × marginRate

longProfitAndLoss = (bid - entry) × quantity × multiplier
shortProfitAndLoss = (entry - ask) × quantity × multiplier
```

- Order is intent. Fill is execution. Position is exposure.
- Market order favors execution, not exact price.
- Limit order favors price, not guaranteed execution.
- Standard stop may slip.
- Timeout means unknown outcome, not rejection.
- Retry one intent with the same idempotency key.
- Use snapshot plus sequential deltas.
- Mark data stale during reconnect.
- Carry instrument scale, tick size, quantity step, and currency.
- Label gross versus net P&L.

## Algorithms

- SMA: rolling sum, O(n).
- EMA: recursive weighted average, name seed policy.
- OHLC: ordered event-time aggregation, name late-data policy.
- VWAP: divide total notional by total quantity.
- Volatility: Welford for one-pass stable variance.
- Drawdown: track highest prior value.
- Order book: bids descending, asks ascending, zero quantity removes.

## Discussion answer

```text
Position:
Constraints:
Decision:
Main tradeoff:
How I would prove it:
```

## If stuck

> The unclear part is ordering. I will solve ordered input first and isolate the late-event policy.

> This array solution is simpler and correct at current scale. If measurements show update cost is too high, I can replace the data structure behind the same contract.

> I do not remember the exact API name. The behavior I need is cancellation of prior work when a newer query arrives.

## Production follow-up

Name only relevant work:

- runtime validation
- decimal and rounding policy
- cancellation and idempotency
- stale and unknown states
- safe telemetry
- accessibility
- load and reconnect tests

Finish with contract, correctness, complexity, tradeoff, and next production risk.
