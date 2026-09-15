# Interview operating system

The interviewer is judging how you reduce uncertainty. A finished solution with hidden assumptions is weaker than a smaller correct solution whose limits you can explain.

## The first five minutes

Write these headings before coding:

```text
Goal:
Inputs and units:
Output:
Invariants:
Edge cases:
Scale:
```

Ask questions that can change the implementation:

- Are prices decimal strings, scaled integers, or JavaScript numbers?
- Is quantity allowed to be fractional?
- Can events be duplicated or arrive out of order?
- Are timestamps event time or arrival time?
- Must output preserve input order?
- What should happen with malformed values, empty input, and division by zero?
- What input size and update rate should the code handle?
- Is this a pure function, UI component, or production service?

If the interviewer withholds an answer, state a decision and continue:

> I will treat timestamps as event time and reject duplicate sequence numbers. I will isolate that assumption so we can change it later.

## A senior reasoning loop

Use this loop aloud.

1. Model the domain before choosing an algorithm.
2. State invariants and units.
3. Build the simplest correct path.
4. Check failure cases with concrete examples.
5. Measure time and space complexity.
6. Separate interview scope from production hardening.

Useful sentence:

> I want correctness first. Once tests pin down behavior, I can replace the data structure without changing the contract.

## Model with types

Do not pass anonymous numbers through finance code.

```typescript
type Brand<TValue, TName extends string> = TValue & {
  readonly __brand: TName;
};

type PriceTicks = Brand<bigint, "PriceTicks">;
type QuantityUnits = Brand<bigint, "QuantityUnits">;
type EpochMilliseconds = Brand<number, "EpochMilliseconds">;

interface Quote {
  readonly bid: PriceTicks;
  readonly ask: PriceTicks;
  readonly observedAt: EpochMilliseconds;
}
```

Brands help at compile time. They do not validate runtime data. Say that.

## Work from examples

For each problem, write:

- one normal case
- empty input
- one boundary value
- one invalid value
- one ordering or duplication case if events are involved

For a moving average with window 3:

```text
[1, 2, 3, 4] gives [2, 3]
[] gives []
window <= 0 is invalid
window > length gives []
```

This often exposes contract mistakes before code exists.

## The 60-minute coding clock

### Minutes 0 to 5

- Restate problem.
- Ask high-value questions.
- Define types and examples.
- Name assumptions.

### Minutes 5 to 15

- Write function signature.
- Choose simplest data structure.
- Explain complexity target.
- Add first test or table of examples.

### Minutes 15 to 40

- Implement correct core.
- Keep I/O separate from calculation.
- Use descriptive names.
- Handle stated edge cases.
- Run or mentally trace examples.

### Minutes 40 to 50

- Test boundaries and malformed input.
- Check mutation, numeric precision, ordering, and async behavior.
- State complexity.

### Minutes 50 to 60

- Refactor only where it makes reasoning easier.
- Explain production gaps such as validation, cancellation, logging, metrics, accessibility, and load testing.
- Summarize the main tradeoff.

If behind at minute 35, stop adding abstractions. Finish one correct path.

## Common traps and how to expose them

### Ambiguous money representation

Ask for precision and rounding policy. `number` is unsafe for exact decimal accounting because binary floating-point cannot represent many decimal fractions exactly.

### Hidden mutation

`Array.prototype.sort`, `reverse`, and `splice` mutate. Copy first when the input is readonly.

```typescript
const sorted = [...prices].sort((left, right) => left - right);
```

### Async work that is not awaited

`forEach` ignores returned promises.

```typescript
try {
  await Promise.all(items.map((item) => processItem(item)));
} catch (error: unknown) {
  throw new Error(
    `Failed to process ${items.length} items concurrently`,
    { cause: error },
  );
}
```

This runs concurrently. If order or rate limits matter, use `for...of` and await each operation.

### Stale responses

For a search UI, a slow old response can overwrite a newer one. Abort obsolete requests or compare request IDs before committing results. Latest-only cancellation is wrong for commands that must all complete, such as order submissions.

### Accidental quadratic work

Look for `find`, `filter`, or `includes` inside a loop. A `Map` or `Set` often reduces repeated scans.

### Missing initial source values

A calculation that combines several asynchronous sources may wait until each has a value. Add explicit initial state when appropriate. Do not hide missing state with arbitrary defaults.

### Truthiness

Zero is a valid financial value.

```typescript
if (price === undefined) {
  // Missing.
}
```

Do not use `if (!price)` when zero and missing mean different things.

## What to say when stuck

Do not go silent. Narrow the problem.

> The uncertainty is event ordering. I will first solve ordered input, then add an insertion strategy for late events.

> I see two implementations. The array version is simpler and O(n) per update. A heap or tree improves updates, but I would only pay that cost if the expected scale needs it.

> I do not remember the exact API name. The behavior I need is cancellation of the previous subscription when a newer value arrives.

## How to disagree well

Use evidence and conditions:

> That works if updates are ordered and unique. The prompt allows duplicates, so I would keep the sequence check.

> I would not use latest-request cancellation for order submission because stopping client observation does not cancel server work. A pending guard can block duplicate clicks, while a queue preserves every intent. Product semantics decide between them.

## End with a compact summary

Use this structure:

```text
Contract:
Correctness:
Complexity:
Main tradeoff:
Production follow-up:
```

Example:

> The function aggregates ordered ticks into one-minute candles using event time. It is O(n) time and O(k) space for k candles. It rejects invalid prices and sorts late events outside the core path. In production I would add decimal-safe parsing, sequence-based deduplication, metrics for late data, and property-based tests.
