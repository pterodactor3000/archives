# Senior TypeScript

Senior TypeScript work starts with one fact: TypeScript checks JavaScript before execution, but its types do not exist at runtime. Network data, storage, URL parameters, and user input remain `unknown` until runtime code validates them.

Official references:

- [TypeScript handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)
- [Type compatibility](https://www.typescriptlang.org/docs/handbook/type-compatibility.html)
- [Strict compiler option](https://www.typescriptlang.org/tsconfig/strict.html)

## Compiler baseline

Know why each option matters:

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitOverride": true,
    "noFallthroughCasesInSwitch": true,
    "useUnknownInCatchVariables": true
  }
}
```

- `strict` enables a family of checks. It is not one check.
- `noUncheckedIndexedAccess` makes `prices[0]` include `undefined`.
- `exactOptionalPropertyTypes` distinguishes a missing property from a present property whose value is `undefined`.
- `useUnknownInCatchVariables` prevents assumptions about thrown values.

Do not claim types make untrusted data safe. They only make checked code internally consistent.

## `unknown`, `any`, and validation

`any` disables type checking and spreads through expressions. `unknown` forces narrowing.

```typescript
interface MarketTick {
  readonly symbol: string;
  readonly bid: number;
  readonly ask: number;
  readonly sequence: number;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function parseMarketTick(value: unknown): MarketTick {
  if (!isRecord(value)) {
    throw new Error("Cannot parse market tick: expected an object");
  }

  const { symbol, bid, ask, sequence } = value;
  if (
    typeof symbol !== "string" ||
    typeof bid !== "number" ||
    !Number.isFinite(bid) ||
    typeof ask !== "number" ||
    !Number.isFinite(ask) ||
    typeof sequence !== "number" ||
    !Number.isSafeInteger(sequence)
  ) {
    throw new Error(`Cannot parse market tick for symbol ${String(symbol)}: invalid fields`);
  }

  if (bid > ask) {
    throw new Error(`Cannot parse market tick for ${symbol}: bid exceeds ask`);
  }

  return { symbol, bid, ask, sequence };
}
```

In production, a schema validation library may reduce repeated code and produce better errors. The boundary still needs validation.

## Discriminated unions and exhaustive checks

Model states that cannot coexist as a union, not as a bag of optional properties.

```typescript
interface IdleOrder {
  readonly state: "idle";
}

interface SubmittingOrder {
  readonly state: "submitting";
  readonly clientOrderId: string;
}

interface AcceptedOrder {
  readonly state: "accepted";
  readonly orderId: string;
}

interface RejectedOrder {
  readonly state: "rejected";
  readonly reason: string;
}

type OrderState =
  | IdleOrder
  | SubmittingOrder
  | AcceptedOrder
  | RejectedOrder;

function assertNever(value: never): never {
  throw new Error(`Unhandled order state: ${JSON.stringify(value)}`);
}

function getOrderLabel(order: OrderState): string {
  switch (order.state) {
    case "idle":
      return "Ready";
    case "submitting":
      return "Submitting";
    case "accepted":
      return `Accepted ${order.orderId}`;
    case "rejected":
      return `Rejected: ${order.reason}`;
    default:
      return assertNever(order);
  }
}
```

When a new state is added, `assertNever` turns every incomplete switch into a compile error.

## Structural typing

TypeScript checks shape, not declared identity.

```typescript
interface HasPrice {
  readonly price: number;
}

const quote = { price: 100, symbol: "AAPL" };
const priced: HasPrice = quote; // Allowed. The shape contains price.
```

Fresh object literals receive excess-property checks:

```typescript
const priced: HasPrice = {
  price: 100,
  symbol: "AAPL", // Compile error on a fresh literal.
};
```

Moving the same object through a variable can bypass that excess-property check. It is not runtime validation and it does not mean the object contains only the named fields.

## `satisfies`, annotations, and assertions

Prefer `satisfies` when you want to check a value without widening away useful literals.

```typescript
const MARKET_STATUS = {
  open: "Trading available",
  closed: "Trading unavailable",
} as const satisfies Record<string, string>;

type MarketStatus = keyof typeof MARKET_STATUS;
```

- Annotation checks and may widen.
- `satisfies` checks while preserving inferred detail.
- `as` tells the compiler to trust you. It does not check runtime data.
- `as unknown as SomeType` is usually a concealed modeling error.

## Branded domain types

Structural typing cannot distinguish two plain numbers with different units. Add a brand when mixing them would be dangerous.

```typescript
declare const PRICE_TICKS: unique symbol;
declare const QUANTITY_UNITS: unique symbol;

type PriceTicks = bigint & { readonly [PRICE_TICKS]: true };
type QuantityUnits = bigint & { readonly [QUANTITY_UNITS]: true };

function createPriceTicks(value: bigint): PriceTicks {
  if (value < 0n) {
    throw new Error(`Cannot create price ticks: ${value} is negative`);
  }

  return value as PriceTicks;
}
```

The constructor validates once. Keep the assertion inside that small trusted function.

## Generics should preserve relationships

A generic is useful when output type depends on input type.

```typescript
function indexBy<TItem, TKey extends PropertyKey>(
  items: readonly TItem[],
  getKey: (item: TItem) => TKey,
): Map<TKey, TItem> {
  const indexedItems = new Map<TKey, TItem>();

  for (const item of items) {
    indexedItems.set(getKey(item), item);
  }

  return indexedItems;
}
```

Do not add a generic that appears once and preserves no relationship. A concrete type is clearer.

## Variance and callbacks

With `strictFunctionTypes`, a callback that accepts a narrower parameter cannot safely stand in for one that may receive a wider parameter.

```typescript
interface Instrument {
  readonly symbol: string;
}

interface Stock extends Instrument {
  readonly exchange: string;
}

declare function visitInstrument(visitor: (instrument: Instrument) => void): void;

const visitStock = (stock: Stock): void => {
  console.log(stock.exchange);
};

visitInstrument(visitStock); // Unsafe. Caller may provide a crypto instrument.
```

Know the reason, not only the word "contravariance." The producer controls what enters the callback.

## `readonly` is shallow

```typescript
interface Portfolio {
  readonly positions: string[];
}

const portfolio: Portfolio = { positions: [] };
portfolio.positions.push("AAPL"); // Allowed.
```

Use `readonly string[]` or `ReadonlyArray<string>` for the nested array. Even deep compile-time readonly does not freeze runtime objects.

## Optional fields are not nullable fields

These states differ:

```typescript
interface OptionalValue {
  value?: number;
}

interface RequiredValueThatMayBeUndefined {
  value: number | undefined;
}
```

`OptionalValue` allows the key to be absent. `RequiredValueThatMayBeUndefined` requires the key. This matters in PATCH requests, serialization, and state updates.

## JavaScript number traps

### Decimal precision

```typescript
0.1 + 0.2 !== 0.3;
```

Use one explicit representation:

- integer minor units for currencies with a fixed minor unit
- scaled integers or `bigint` for prices with a fixed tick scale
- a decimal arithmetic library when scales vary or division and rounding are common

Document rounding mode. Accounting, display, margin, and tax rules may require different modes.

### Safe integer limit

`number` exactly represents integers only through `Number.MAX_SAFE_INTEGER`. Check with `Number.isSafeInteger`.

### `bigint` limits

- It cannot mix directly with `number`.
- `JSON.stringify` does not serialize `bigint` by default.
- Division truncates toward zero.
- Browser and API boundaries need an agreed string representation.

### `NaN` and infinity

`typeof NaN` is `"number"`. Validate external numbers with `Number.isFinite`.

### Negative zero

JavaScript has `-0`. Usually normalize it for financial display. `Object.is(value, -0)` detects it.

## Collection and sorting traps

### Default sort is lexicographic

```typescript
[2, 10, 3].sort(); // [10, 2, 3]
```

Pass a comparator.

### Sort mutates

```typescript
const sorted = [...values].sort((left, right) => left - right);
```

Newer runtimes also have `toSorted`, but confirm target support.

### Object keys are strings or symbols

Use `Map` when keys are objects, numbers, or dynamic external values. `Object.create(null)` avoids inherited keys, but `Map` has clearer intent.

### Map equality uses identity for objects

Two `{ symbol: "BTCUSD" }` objects are different keys. Prefer a stable primitive identifier.

## Async traps

### `forEach` does not await

```typescript
async function processInOrder(items: readonly string[]): Promise<void> {
  try {
    for (const item of items) {
      await processItem(item);
    }
  } catch (error: unknown) {
    throw new Error(
      `Failed to process ${items.length} items in order`,
      { cause: error },
    );
  }
}

declare function processItem(item: string): Promise<void>;
```

Use `Promise.all` for independent concurrent work. Use `Promise.allSettled` when every outcome matters. Add a concurrency limit when the collection can be large.

### `Promise.all` rejects early

Other operations may keep running after the returned promise rejects. Rejection does not automatically cancel fetches or side effects. Pass `AbortSignal` when cancellation matters.

### Async functions always return promises

An exception thrown inside an async function becomes a rejected promise. A surrounding synchronous `try/catch` does not catch it unless the caller awaits.

### Microtasks run before the next task

Promise callbacks use the microtask queue. A long chain can delay timers and rendering. Be able to explain the event loop without memorized trivia.

## Error handling

Thrown values can be anything.

```typescript
function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return String(error);
}
```

Domain failures often work better as data:

```typescript
interface Success<TValue> {
  readonly isSuccess: true;
  readonly value: TValue;
}

interface Failure<TCode extends string> {
  readonly isSuccess: false;
  readonly code: TCode;
  readonly message: string;
}

type Result<TValue, TCode extends string> =
  | Success<TValue>
  | Failure<TCode>;
```

Reserve exceptions for failures the local caller cannot reasonably handle as a normal branch.

## Questions to answer aloud

1. What remains unsafe after TypeScript compiles?
2. Why is `unknown` better than `any` at a network boundary?
3. How does structural typing affect domain units?
4. What does `readonly` guarantee, and what does it not guarantee?
5. When would you use `bigint`, scaled integers, or a decimal library?
6. What happens when one promise in `Promise.all` rejects?
7. Why can an async `forEach` finish before its callbacks?
8. How do you make a state machine exhaustive?
9. When is `satisfies` better than `as`?
10. How would you validate a WebSocket market tick?

## Fast review

- Types disappear at runtime. They do not free objects.
- Closures, live sockets, timers, and DOM listeners keep what they capture.
- Parse `unknown` at boundaries.
- Model valid states with discriminated unions.
- Use `never` for exhaustive handling.
- Treat assertions as trusted escape hatches.
- Keep financial units and rounding explicit.
- Know mutation and ordering behavior.
- Choose async concurrency from product semantics.
