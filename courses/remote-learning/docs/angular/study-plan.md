# Study plan

Reading creates familiarity. Interview performance needs retrieval under time pressure. Spend at least half the time coding or answering aloud.

## Seven-day plan

### Day 1: TypeScript correctness

Read:

- [Senior TypeScript](../shared/senior-typescript-javascript.md)
- numeric precision sections in [trading domain](../shared/trading-finance-domain.md)

Practice:

- latest quote reducer
- state-machine refactor
- async bug hunt

Speak aloud:

- `unknown` versus `any`
- structural typing
- `never`
- `satisfies`
- `number` versus `bigint` versus decimal arithmetic

### Day 2: Angular rendering and state

Read:

- [implementation examples](examples.md)
- signals, OnPush, and zoneless readiness in [senior Angular and RxJS](senior-angular-rxjs.md)
- provider scope
- typed forms
- [memory handling](memory-handling.md)

Build:

- instrument search
- explicit loading, empty, error, and result states

Explain:

- what triggers an OnPush check
- signal and RxJS boundaries
- why repeated `toSignal` calls are wrong
- when you pick `AsyncPipe` versus `takeUntilDestroyed` versus `DestroyRef`

### Day 3: RxJS time semantics

Write one example for:

- `switchMap`
- `concatMap`
- `mergeMap`
- `exhaustMap`
- `auditTime`
- `combineLatest`
- `shareReplay`
- `Subject`, `BehaviorSubject`, `ReplaySubject`, `AsyncSubject`

For each, say what happens on a new value, error, completion, and unsubscription.

Read [implementation examples](examples.md#subject) for which Subject variant to pick.

Build:

- a fake quote stream
- a frame-paced latest quote display
- reconnect with capped retry

### Day 4: trading domain

Read [trading and finance domain](../shared/trading-finance-domain.md).

Derive on paper:

- bid, ask, mid, and spread
- long and short P&L
- notional and simple margin
- equity and margin level
- simple and log return

Explain differences:

- order, fill, and position
- CFD and owning a stock
- crypto spot and crypto CFD
- posted and available bank balance
- timeout and rejection

### Day 5: algorithms

Implement without copying:

- SMA
- OHLC candles
- VWAP
- Welford statistics
- maximum drawdown
- order-book reducer

For each, state contract, edge cases, complexity, and one production limitation.

### Day 6: full mock

Run two uninterrupted hours:

1. Pick one 60-minute coding drill.
2. Record the screen and microphone.
3. Take a five-minute break.
4. Answer five deep-dive prompts for 10 minutes each.

Review recording:

- silent periods longer than 30 seconds
- coding before clarifying
- vague use of "scalable" or "clean"
- claims without constraints
- missing edge cases
- unfinished core caused by early abstraction

Repeat the weakest 20-minute section.

### Day 7: Capital.com and recovery

Read [Capital.com research](capital-com-research.md).

Prepare:

- why this trading product interests you
- one question about market-data correctness
- one question about Angular architecture
- one question about order reliability
- two measured project stories

Do one light drill. Stop heavy preparation early enough to sleep.

## Two-day emergency plan

### Day 1

- 90 minutes TypeScript traps and numeric precision
- 90 minutes Angular signals, OnPush, RxJS operators, and [memory handling](memory-handling.md)
- 60 minutes quote reducer or candle drill
- 60 minutes trading domain
- 30 minutes answer recording

### Day 2

- 60 minutes Capital.com research
- 60-minute coding mock
- 60-minute discussion mock
- 45 minutes review mistakes
- 30 minutes formulas and operator matrix

Cut RSI and advanced indicators first. Keep precision, sequencing, order state, RxJS semantics, and communication.

## Daily retrieval cards

Answer without notes:

1. What can TypeScript not validate?
2. What makes OnPush check a component?
3. Which RxJS operator fits latest-search semantics?
4. Why is that operator unsafe for order submission?
5. How do you mark a long position?
6. What does a network timeout say about order outcome?
7. How do snapshot and delta sequence numbers interact?
8. Why can `number` be unsafe for money?
9. What is O(n) rolling average state?
10. How do you prove a performance fix?
11. When do you pick `AsyncPipe` versus `takeUntilDestroyed` versus `DestroyRef`?

## Formula card

```text
mid = (bid + ask) / 2
spread = ask - bid
spreadBps = spread / mid × 10,000

notional = price × quantity × contractMultiplier
requiredMargin = notional × marginRate

longProfitAndLoss = (bid - entry) × quantity × contractMultiplier
shortProfitAndLoss = (entry - ask) × quantity × contractMultiplier

simpleReturn = current / previous - 1
logReturn = ln(current / previous)

SMA = sum(window) / windowSize
VWAP = Σ(price × quantity) / Σ(quantity)

marginLevelPercent = equity / usedMargin × 100
```

These are simplified formulas. Name fees, financing, currency conversion, and broker-specific rules.

## RxJS card

```text
switchMap: latest wins, previous unsubscribed
concatMap: queue, preserve order
mergeMap: concurrent, completion order
exhaustMap: first wins until complete

debounceTime: wait for silence
auditTime: emit latest after each period
bufferTime: retain a batch
combineLatest: wait for every source to emit
forkJoin: wait for every source to complete

Subject: live events, late subscriber waits
BehaviorSubject: current value on subscribe
ReplaySubject(n): replay n, then live
AsyncSubject: last next() only after complete
unsubscribe one observer: others keep listening
complete or error: stream is dead for everyone
```

## Final-hour checklist

- Have water and a working editor.
- Confirm TypeScript and Angular test commands.
- Turn off unrelated notifications.
- Keep paper for examples and invariants.
- Do not learn a new topic.
- Review operator and formula cards.
- Start interview slowly.

The first five minutes should look deliberate, not fast.
