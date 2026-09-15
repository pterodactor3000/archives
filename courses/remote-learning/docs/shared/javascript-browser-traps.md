# JavaScript and browser traps

Use this as a bug-hunt checklist. Explain the runtime mechanism, then connect it to user behavior.

Official references:

- [ECMAScript language overview](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Language_overview)
- [JavaScript execution model](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Execution_model)
- [Using promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
- [AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController)
- [Memory management](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Memory_management)

## Values and equality

### Truthiness loses domain meaning

These values are falsy:

```text
false
0
-0
0n
""
null
undefined
NaN
```

Zero can be a valid price, quantity, fee, or profit and loss value. Check the state you mean:

```typescript
if (price === undefined) {
  return "Price unavailable";
}
```

### `||` and `??` differ

`||` falls back for any falsy value. `??` falls back only for `null` or `undefined`.

```typescript
const enteredQuantity = 0;

enteredQuantity || 1; // 1
enteredQuantity ?? 1; // 0
```

### Equality has several contracts

- `===` does not coerce
- `Object.is(NaN, NaN)` is true
- `Object.is(0, -0)` is false
- `Map` and `Set` use SameValueZero, where `NaN` equals itself and `0` equals `-0`
- objects compare by identity

Use stable primitive IDs for instruments and accounts.

### Destructuring defaults only handle `undefined`

```typescript
const { quantity = 1 } = { quantity: null };
// quantity is null
```

Validate external values. Defaults do not validate.

## Numbers

### Binary floating-point

```typescript
0.1 + 0.2 !== 0.3;
```

Do not compare calculated decimals with exact equality. For money, use scaled integers, `bigint`, or a decimal library according to scale and rounding rules.

### `NaN` is contagious

`typeof NaN` is `"number"`. Use `Number.isFinite` at boundaries.

Global `isNaN` coerces before checking:

```typescript
isNaN(""); // false because "" becomes 0
Number.isNaN(""); // false without coercion
```

### Parsing is not validation

```typescript
parseFloat("12.5px"); // 12.5
Number("12.5px"); // NaN
parseInt("10", 10); // 10
```

Choose whether trailing text is allowed. An order quantity parser should normally reject it.

### Safe integers and `bigint`

Integers above `Number.MAX_SAFE_INTEGER` may lose identity. `bigint` preserves integers but cannot mix with `number`, truncates division, and needs an explicit JSON representation.

## Objects, arrays, and mutation

### Spread is shallow

```typescript
const nextAccount = { ...account };
nextAccount.positions.push(position);
```

The nested array is still shared. Copy each mutated level or use a data structure with clear ownership.

### Common array methods mutate

Mutating methods include:

- `sort`
- `reverse`
- `splice`
- `push`
- `pop`
- `shift`
- `unshift`

Prefer `toSorted`, `toReversed`, `toSpliced`, or an explicit copy when target support permits it.

Default sorting compares strings:

```typescript
[2, 10, 3].sort(); // [10, 2, 3]
```

### Sparse arrays are strange

An empty slot differs from an explicit `undefined`. Some iteration methods skip empty slots. Avoid sparse arrays in application state.

### Object spread does not preserve every object contract

Spreading a class instance copies enumerable own properties into a plain object. It loses the prototype and methods.

Runtime data should normally be parsed into plain domain records instead of trusted class instances.

## Closures

Functions capture bindings from the scope where they were created.

```typescript
const callbacks: Array<() => number> = [];

for (var index = 0; index < 3; index += 1) {
  callbacks.push(() => index);
}

callbacks.map((callback) => callback()); // [3, 3, 3]
```

`var` creates one function-scoped binding. `let` creates a binding per iteration.

UI stale closures are the same JavaScript rule. A timer or promise callback retains values from the update cycle that created it.

## `this`

An ordinary function receives `this` from how it is called. An arrow function captures `this` lexically.

```typescript
const account = {
  id: "account-1",
  getId() {
    return this.id;
  },
};

const getId = account.getId;
getId(); // `this` is undefined in strict mode
```

Do not detach a method that depends on its receiver without binding or wrapping it.

## Event loop

JavaScript runs one job at a time on the main thread.

Simplified browser order:

```text
run one task
  -> drain microtasks
  -> browser may render
  -> run next task
```

Promise reactions and `queueMicrotask` use microtasks. Timers and DOM events schedule tasks.

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

A zero-millisecond timer means "not before this delay." It does not run immediately.

A long task blocks input, timers, and rendering. A long chain of microtasks can also delay rendering because the browser drains the queue first.

## Promises

### A promise executor runs synchronously

```typescript
console.log("A");

void new Promise<void>((resolve) => {
  console.log("B");
  resolve();
})
  .then(() => console.log("C"))
  .catch((error: unknown) => {
    console.error("Failed to run promise-executor example", error);
  });

console.log("D");
// A, B, D, C
```

### `forEach` ignores returned promises

```typescript
try {
  await Promise.all(items.map((item) => processItem(item)));
} catch (error: unknown) {
  throw new Error(`Failed to process ${items.length} items`, {
    cause: error,
  });
}
```

Use `for...of` for sequential work. Add a concurrency limit when a large collection would overload a service.

### `Promise.all` does not cancel siblings

It rejects when one input rejects. Other operations may continue. Pass an `AbortSignal` or use an operation-specific cancellation contract when needed.

### `finally` can replace an outcome

A value returned from `finally` is usually ignored, but an error thrown there replaces the prior fulfillment or rejection.

Cleanup code should not hide the original failure.

### Floating promises hide failures

If work should outlive the caller, attach an explicit rejection handler and document ownership.

```typescript
void sendTelemetry(event).catch((error: unknown) => {
  reportTelemetryFailure(error);
});
```

Do not float an order command.

## Fetch

`fetch` rejects for network and abort failures. It normally fulfills for HTTP 404 or 500.

```typescript
async function loadQuote(instrumentId: string): Promise<Quote> {
  try {
    const response = await fetch(`/api/quotes/${instrumentId}`);

    if (!response.ok) {
      throw new Error(
        `Failed to load quote ${instrumentId}: HTTP ${response.status}`,
      );
    }

    const payload: unknown = await response.json();
    return parseQuote(payload);
  } catch (error: unknown) {
    throw new Error(
      `Quote request failed for instrument ${instrumentId}`,
      { cause: error },
    );
  }
}
```

A response body can be consumed once. Clone the response only when two consumers truly need it.

Abort means the client stopped waiting. It does not prove the server stopped processing.

## Async races

Two correct requests can finish in the wrong order for current UI state.

Use one of:

- abort the obsolete request
- compare a request ID before committing
- model latest-only work in a query library
- use a stream operator with explicit cancellation semantics

Never apply latest-only cancellation to an order command unless the server contract supports cancellation.

## Dates and time zones

JavaScript `Date` represents an instant as milliseconds since the epoch. Formatting adds a time zone.

Traps:

- date-only strings and local time assumptions
- daylight-saving gaps and repeated times
- parsing non-standard date strings
- using local midnight for an exchange session
- assuming every trading day has 24 hours

Carry timestamps as instants and carry exchange calendar rules separately. Use `Intl.DateTimeFormat` with an explicit time zone for display.

Do not calculate market sessions with fixed millisecond offsets.

## JSON

JSON loses or rejects values:

- object properties with `undefined`, functions, or symbols are omitted
- `NaN` and infinity become `null`
- `bigint` throws without custom conversion
- dates become strings through `toJSON`
- object identity and prototypes disappear
- cyclic structures throw

Parse JSON as `unknown`. Validate before use.

## Optional chaining

Optional chaining stops only along one continuous chain.

```typescript
account?.position?.quantity;
(account?.position).quantity; // Can throw.
```

It can also hide missing data when absence should be an error. Use it for optional domain state, not to suppress every exception.

## Modules

ES module imports are live bindings. Circular imports can expose values before initialization.

Avoid cycles between:

- domain models
- feature components
- shared index barrels
- state stores

Move the shared contract to a lower-level module. Do not hide the cycle with dynamic import unless deferred loading is the actual requirement.

## Memory leaks

Garbage collection cannot free reachable objects. TypeScript types do not participate. They erase before the engine runs.

A leak is a live root that still points at work you thought had ended. Cycles between two objects are collectable once nothing live can reach the cycle.

Common browser leaks:

- event listeners without removal
- timers that retain component state
- socket subscriptions after navigation
- unbounded replay or query caches
- detached DOM retained by a closure
- maps keyed by user or account without eviction

`WeakMap` only helps when the key is an object you do not own and you can accept that the extra data vanishes with that object. Instrument IDs are strings. Cache those in a `Map` with eviction. `WeakRef` is not a price cache. Collection timing is unspecified.

`using` and `DisposableStack` close handles when a scope ends. Framework view teardown still needs the framework lifetime API.

Use heap snapshots after repeated mount and unmount cycles. Check retained paths, not only total heap size.

Angular-specific owners and APIs are in [memory handling](../angular/memory-handling.md).

## Security traps

Frontend frameworks commonly escape text values, but this does not make every sink safe.

Review:

- `dangerouslySetInnerHTML`
- URLs assembled from untrusted input
- DOM APIs such as `innerHTML`
- dynamic script loading
- tokens in browser storage
- sensitive values in logs and error reports

Prevent cross-site scripting with safe rendering, runtime validation, sanitization for allowed HTML, and Content Security Policy. Enforce authorization and transaction rules on the server.

## Questions to answer aloud

1. Why does `0 || defaultValue` lose valid data?
2. How do `===`, `Object.is`, and `Map` equality differ?
3. Why is object spread not a deep copy?
4. In what order do tasks, microtasks, and rendering run?
5. Why does `Promise.all` rejection not mean cancellation?
6. Why does `fetch` need an explicit `response.ok` check?
7. How would you prevent an old search response from replacing a new one?
8. Why is local midnight unsafe for exchange sessions?
9. What happens when JSON serializes `NaN` or `bigint`?
10. Which references commonly keep an unmounted screen in memory?
11. Why is `WeakMap` the wrong cache for quotes keyed by instrument ID?
