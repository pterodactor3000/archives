# ECMAScript 2027 Stage 4 features

Checked on 31 August 2026. ECMAScript 2027 is still a draft. TC39's finished-proposal list currently assigns four Stage 4 proposals to the 2027 publication year:

1. Explicit Resource Management
2. `Atomics.pause`
3. Joint Iteration
4. Temporal

Stage 4 means TC39 considers the proposal finished and ready for inclusion in the specification. The integration change may not have merged into the main draft yet. It does not mean every browser, server runtime, TypeScript version, or build tool supports it.

Official references:

- [TC39 finished proposals](https://github.com/tc39/proposals/blob/main/finished-proposals.md)
- [ECMAScript 2027 draft](https://tc39.es/ecma262/)
- [Explicit Resource Management](https://tc39.es/proposal-explicit-resource-management/)
- [`Atomics.pause`](https://tc39.es/proposal-atomics-microwait/)
- [Joint Iteration](https://tc39.es/proposal-joint-iteration/)
- [Temporal](https://tc39.es/proposal-temporal/)

## Explicit Resource Management

This proposal makes lexical cleanup part of the language.

It adds:

- `using` and `await using` declarations
- `Symbol.dispose` and `Symbol.asyncDispose`
- `DisposableStack` and `AsyncDisposableStack`
- `SuppressedError`
- disposal methods on built-in iterator prototypes

### Scope-based cleanup

```typescript
class DisposableSocket {
  readonly socket: WebSocket;

  constructor(url: string) {
    this.socket = new WebSocket(url);
  }

  [Symbol.dispose](): void {
    this.socket.close();
  }
}

{
  using quoteSocket = new DisposableSocket("wss://example.test/quotes");
  quoteSocket.socket.addEventListener("message", handleQuoteMessage);
}
```

Leaving the block invokes the disposer captured when the `using` declaration initialized. Replacing the method later does not replace the captured disposer. Cleanup also runs for `return`, `throw`, `break`, and other abrupt exits. Resources dispose in last-in, first-out order.

Built-in synchronous and asynchronous iterators implement the corresponding disposal symbol. Disposal calls their `return` method when one exists.

`await using` awaits asynchronous cleanup:

```typescript
async function loadSnapshotText(): Promise<string> {
  try {
    await using snapshotFile = await openSnapshotFile();
    return await snapshotFile.readText();
  } catch (error: unknown) {
    throw new Error("Failed to load the market snapshot file", {
      cause: error,
    });
  }
}
```

### Disposable stacks

`DisposableStack` collects cleanup work when resources do not naturally share one lexical declaration.

Key methods:

- `use(value)` registers an object that implements `Symbol.dispose`
- `adopt(value, callback)` registers a value with its cleanup callback
- `defer(callback)` registers cleanup without a value
- `move()` transfers pending cleanup to a new stack
- `dispose()` performs cleanup
- `disposed` reports whether the stack is no longer pending or usable

`AsyncDisposableStack` has async equivalents and `disposeAsync()`.

### Resource-management traps

- `using` does not make an ordinary object disposable. The value must be `null`, `undefined`, or expose a callable disposal symbol.
- `await using` belongs in an async context and waits for cleanup before the surrounding async operation settles.
- A cleanup failure can replace a successful block result.
- If the block and cleanup both throw, `SuppressedError` preserves the newer `error` and the earlier `suppressed` value.
- Cleanup does not replace transaction rollback, idempotency, or recovery after process termination.

Deterministic cleanup helps finance code manage file handles, locks, subscriptions, tracing spans, and test resources. Do not assume browser `WebSocket` implements `Symbol.dispose`; wrap it when needed.

## `Atomics.pause`

`Atomics.pause()` gives the runtime or CPU a hint that code is inside a spin-wait loop.

```javascript
const LOCKED = 1;

while (Atomics.load(lockState, 0) === LOCKED) {
  Atomics.pause();
}
```

The function takes no arguments and returns `undefined`. It has no observable behavior other than timing.

### Spin-wait traps

- It is not a timer, Promise yield, scheduler API, or sleep function.
- It does not make a busy loop safe on the browser main thread. The loop still blocks rendering and input.
- It is useful in low-level shared-memory synchronization, usually in a worker.
- Use `Atomics.wait` or `Atomics.waitAsync` when the algorithm should wait instead of spin, subject to environment restrictions.

In a frontend interview, explain what it does and why it rarely belongs in application UI code.

## Joint Iteration

Joint Iteration adds `Iterator.zip` and `Iterator.zipKeyed`.

### `Iterator.zip`

```javascript
const orderRows = Iterator.zip([prices, quantities], {
  mode: "strict",
});

for (const [price, quantity] of orderRows) {
  console.log({ price, quantity });
}
```

Modes:

- `"shortest"` is the default and stops when any input ends
- `"longest"` continues until every input ends and uses `undefined` or supplied padding
- `"strict"` requires all inputs to end together and otherwise throws `TypeError`

Use `"strict"` when mismatched lengths signal corrupt or incomplete data. Do not accept silent truncation for aligned financial series.

### `Iterator.zipKeyed`

```javascript
const quoteRows = Iterator.zipKeyed(
  {
    instrumentId: instrumentIds,
    bid: bidPrices,
    ask: askPrices,
  },
  { mode: "strict" },
);

for (const quoteRow of quoteRows) {
  console.log(quoteRow.instrumentId, quoteRow.bid, quoteRow.ask);
}
```

`zipKeyed` reads own enumerable string and symbol keys whose values are not `undefined`. It yields null-prototype objects with those included keys.

### Joint-iteration traps

- Both APIs return lazy iterators, not arrays.
- Creating the zip obtains the input iterators. Consumption advances them.
- Early completion, errors, and consumer termination close remaining iterators.
- `"longest"` reads padding by input position for `zip` and by included key for `zipKeyed`. Missing padding becomes `undefined`; extra padding is ignored.
- A null-prototype `zipKeyed` result has no inherited `toString` or `hasOwnProperty`.
- These APIs combine synchronous iterables. They do not zip asynchronous streams or provide backpressure.

## Temporal

Temporal replaces most error-prone `Date` work with separate immutable types for distinct concepts.

Main types:

- `Temporal.Instant` is an exact point on the timeline
- `Temporal.ZonedDateTime` combines an instant, time zone, and calendar
- `Temporal.PlainDate`, `PlainTime`, and `PlainDateTime` have no time zone
- `Temporal.Duration` represents an amount of time
- `Temporal.PlainYearMonth` and `PlainMonthDay` model partial calendar values
- `Temporal.Now` reads the current time

```javascript
const executionInstant = Temporal.Instant.from(
  "2026-08-31T11:42:17.123456789Z",
);

const londonExecution = executionInstant.toZonedDateTimeISO(
  "Europe/London",
);

const settlementDate = Temporal.PlainDate.from("2026-09-02");

console.log({
  executionInstant: executionInstant.toString(),
  localTime: londonExecution.toPlainTime().toString(),
  settlementDate: settlementDate.toString(),
});
```

### Pick the type from the domain

| Domain fact | Type |
| --- | --- |
| Exchange event timestamp | `Temporal.Instant` |
| User-visible time in a named zone | `Temporal.ZonedDateTime` |
| Contract expiry date without a time | `Temporal.PlainDate` |
| Daily market-open wall time | `Temporal.PlainTime` |
| Elapsed nanoseconds | `Temporal.Duration` |

### Temporal traps

- A `PlainDateTime` is not an instant. It cannot identify one point in time without a time zone and disambiguation rule.
- Daylight-saving transitions can make local times ambiguous or nonexistent.
- Calendar units are not fixed durations. Adding one month is not adding a fixed number of milliseconds.
- Duration comparison or rounding may need a `relativeTo` value when calendar or zoned units matter.
- Temporal objects are immutable. Methods return new values.
- Temporal handles time zones and calendars. It does not know exchange holidays, settlement calendars, trading sessions, or product cutoff rules.
- Store event time as an instant. Convert to a named zone for display. Do not persist a locale-formatted string as the source of truth.

Temporal removes many parsing, time-zone, daylight-saving, and precision errors from finance code. Business-calendar rules still need a tested domain service.

## Adoption checklist

Before using any ECMAScript 2027 feature:

1. check the production runtime support matrix
2. check parser, bundler, linter, and TypeScript support
3. decide whether a transform or polyfill preserves the required semantics
4. test error and cleanup paths, not only syntax
5. avoid shipping a large polyfill for one minor convenience

## Questions to answer aloud

1. Why is Stage 4 different from universal runtime support?
2. When does `using` dispose a resource?
3. What does `SuppressedError` preserve?
4. Why should `Atomics.pause` stay off the UI thread?
5. Which `Iterator.zip` mode detects unequal lengths?
6. Why can `zipKeyed` results break `hasOwnProperty` calls?
7. When should financial code use `Instant` instead of `ZonedDateTime`?
8. Which market-time rules remain outside Temporal?
