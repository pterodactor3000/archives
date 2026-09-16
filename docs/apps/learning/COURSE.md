# Interview course

One markdown copy of the teaching files in this repo. Open it from the T3 Code file tree on any paired device, or from `/COURSE.md` when the Angular app is running. HTML originals stay under `lessons/` and `reference/`. Practice code stays under `src/app/practice/`.

Source files this compiles:

- `MISSION.md`
- `NOTES.md`
- `RESOURCES.md`
- `learning-records/0001-interview-baseline.md`
- `lessons/0001-adaptive-interview-diagnostic.html`
- `lessons/0002-angular-typescript-principles.html`
- `lessons/0003-rebuild-quote-card.html`
- `reference/0001-four-day-interview-roadmap.html`
- `reference/0002-diagnostic-solution-key.html`
- `reference/angular-typescript-principles.html`

## Contents

1. [Mission](#mission)
2. [Teaching notes](#teaching-notes)
3. [Baseline](#baseline)
4. [Four-day roadmap](#four-day-roadmap)
5. [Lesson 0001. Adaptive interview diagnostic](#lesson-0001-adaptive-interview-diagnostic)
6. [Lesson 0002. Angular and TypeScript principles](#lesson-0002-angular-and-typescript-principles)
7. [Lesson 0003. Rebuild the quote card](#lesson-0003-rebuild-the-quote-card)
8. [Diagnostic solution key](#diagnostic-solution-key)
9. [Angular and TypeScript principles](#angular-and-typescript-principles)
10. [Primary resources](#primary-resources)
11. [Practice catalog](#practice-catalog)

## Mission

Prepare for a finance-firm technical interview in four days. Build retrieval speed and coding fluency so you can explain Angular and TypeScript choices, solve likely interview problems, and name tradeoffs under time pressure.

Success looks like:

- Explain and implement common Angular patterns without notes
- Write strict, readable TypeScript and defend key type-design choices
- Recognize high-yield algorithm patterns and solve representative problems aloud
- Complete a timed mock interview, name gaps, and correct them before interview day

Constraints:

- Four days remain
- Five focused study hours each day
- Diagnostic baseline is 4/15. Knowledge 3/6, TypeScript 1/3, Angular 0/3, algorithms 0/3
- Five years of Angular, last used version 16, ten years of TypeScript
- A few months of LeetCode. Dry-run and edge-case discipline still need work
- Expected format is one hour of live coding and one hour of technical discussion for a high-mid or senior role
- Practice must favor active coding and spoken explanation over passive reading
- LeetCode may be part of the interview

Out of scope:

- Assuming every finance firm asks finance-specific algorithms
- Deep framework internals with little interview value
- Broad backend, cloud, and finance-domain study unless later interview evidence makes it relevant

## Teaching notes

- Interview is in four days and focuses on Angular, TypeScript, best practices, and likely algorithms.
- LeetCode may be used.
- Learner reports five years of Angular, last used version 16, and ten years of TypeScript.
- Learner has a few months of LeetCode and five focused study hours daily.
- Expected format is one hour of live coding and one hour of technical discussion at high-mid or senior level.
- Lesson 0001 diagnostic score was 4/15. Knowledge 3/6, TypeScript 1/3, Angular 0/3, algorithms 0/3.
- Angular syntax and component structure are rusty. Rebuild fluency through blank-file retrieval, not introductory framework tours.
- TypeScript experience is high, but external-data validation and runtime narrowing need retrieval practice.
- Algorithm practice must include a manual trace before execution. Confidence without a trace did not produce a complete solution.
- Favor short retrieval rounds, implementation, debugging, complexity analysis, and spoken tradeoff explanations.
- Compare Angular 16 decorator APIs with current signal-based APIs because the interview version is unknown.

## Baseline

The learner reports five years of Angular, last used version 16, ten years of TypeScript, and a few months of LeetCode. A timed diagnostic scored 4/15. Current retrieval, compile-correct implementation, runtime type narrowing, and manual algorithm tracing need priority over broad introductory coverage.

## Four-day roadmap

Printable reference 0001. Tailored pace is 5 focused hours daily. Use short breaks between blocks. If time is short, do every must block and skip optional work.

### What the diagnostic changed

The 4/15 baseline does not call for beginner theory. Five years of Angular and ten years of TypeScript mean the fastest route is retrieval from a blank file, manual tracing, and precise spoken explanations. Angular 16 knowledge must also be connected to current signal-based component APIs. A finance setting rewards correctness and explicit validation. It does not prove that the firm asks finance-specific algorithms.

### Priority map

Must know:

- Components, templates, bindings, inputs, outputs
- Signals, derived state, dependency injection
- Reactive forms, routing basics, HTTP flow
- Change detection, RxJS ownership, cleanup
- Component and service testing, security defaults
- Strict TypeScript, narrowing, unions, generics, structural typing
- Complexity, hash maps, two pointers, sliding windows, stacks, binary search, tree and graph traversal

Optional if baseline is strong:

- SSR and hydration details
- Custom change-detection profiling
- Advanced RxJS operator design
- Dynamic component rendering
- Dynamic programming, tries, union-find
- Framework source internals

Angular's current official overview centers components, signals, dependency injection, routing, forms, and first-party testing and security guidance. See [Angular overview](https://angular.dev/overview). TypeScript's `strict` option enables a family of checks that improve correctness guarantees. See [TypeScript strict](https://www.typescriptlang.org/tsconfig/strict.html).

### Day 1. Restore implementation fluency

Must, 4 hours 30 minutes:

1. Review the scored lesson 0001 diagnostic, then write the three concrete failure causes, 20 minutes.
2. Complete lesson 0002 principles from memory before opening its reference, 25 minutes.
3. Complete lesson 0003 quote-card rebuild, 35 minutes.
4. TypeScript repair lab, 60 minutes. Parse an `unknown` trade payload into a discriminated union, remove unsafe assertions, and add an exhaustive switch.
5. Two Sum repair, 60 minutes. State the invariant, write a `Map` solution, trace duplicate and zero cases on paper, then run it. Record every mismatch between prediction and execution.
6. Blank-file Angular rebuild, 45 minutes. Recreate the quote card without notes using both Angular 16 decorators and current signal APIs.
7. Retrieval close, 25 minutes. Explain each choice aloud without notes, then write the three weakest points.

Optional, 30 minutes. Solve [Valid Parentheses](https://leetcode.com/problems/valid-parentheses/). State invariant, complexity, and edge cases before coding.

### Day 2. Angular implementation and design

Must, 5 hours:

1. Build a small order-ticket feature, 120 minutes. Use a strictly typed reactive form, validation, a route parameter, and a service boundary. Keep server data typed as `unknown` until validated.
2. Add one service test and two component tests, 45 minutes. Cover a valid submission, invalid input, and failed service call.
3. Debug round, 30 minutes. Fix one stale derived-value bug, one subscription leak, and one unsafe template binding.
4. Interview round, 45 minutes. Explain dependency-injection scope, signals versus observables, change detection, and sanitization.
5. Algorithm round, 60 minutes. Solve one hash-map problem and one two-pointer problem. For each, predict output before execution and explain the invariant aloud.

Optional, 30 minutes. Sketch lazy routing and loading, error, and empty states. Do not spend time polishing CSS.

Angular documents strictly typed reactive forms and their nullability behavior in [typed forms](https://angular.dev/guide/forms/typed-forms). Its [security guide](https://angular.dev/best-practices/security) warns against constructing templates from user input and explains sanitization contexts.

### Day 3. Algorithms under interview conditions

Must, 5 hours:

1. Pattern recall, 20 minutes. For each row below, name its signal, invariant, and target complexity.
2. Three timed problems, 105 minutes. Use 30 minutes each, then 5 minutes to write the missed clue.
3. TypeScript quality pass, 35 minutes. Replace loose objects with clear interfaces, guard empty input, and state mutation choices.
4. Angular recall, 40 minutes. Rebuild yesterday's component API and one test from a blank file.
5. Discussion round, 60 minutes. Answer ten senior-level Angular and TypeScript questions in two minutes each, then repair weak answers from official references.
6. Correction round, 40 minutes. Re-solve the hardest failed problem without looking at the prior code.

| Pattern | Signal in prompt | Representative practice |
| --- | --- | --- |
| Hash map or set | Fast membership, pair lookup, counts | Two Sum |
| Two pointers | Sorted input, pair or in-place scan | Two Sum II |
| Sliding window | Contiguous range with a changing constraint | Longest Substring Without Repeating Characters |
| Stack | Nested structure, matching, next greater value | Valid Parentheses |
| Binary search | Monotonic condition or sorted search space | Binary Search |
| BFS or DFS | Reachability, tree levels, connected regions | Maximum Depth of Binary Tree |
| Intervals | Overlapping ranges, schedules, consolidation | Merge Intervals |

JavaScript `Map` and `Set` provide keyed collections suited to lookup and uniqueness tasks. See [MDN keyed collections](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Keyed_collections). Use the [official LeetCode 75 plan](https://leetcode.com/studyplan/leetcode-75/) as a problem pool, not a four-day completion target.

### Day 4. Simulation, correction, stop

Must, 4 hours:

1. Run a two-hour mock that matches the expected interview. Spend one hour live coding and one hour discussing Angular, TypeScript, testing, architecture, and tradeoffs.
2. Review recording or notes, 30 minutes. Mark only factual gaps, weak explanations, missed cases, and time sinks.
3. Repair the top two gaps with tiny exercises, 45 minutes.
4. Final retrieval sheet, 20 minutes. Write framework, type-system, and algorithm prompts from memory.
5. Environment check and wind-down, 10 minutes. Stop heavy study early enough to sleep.

Optional, 30 minutes. Practice concise questions for the interviewer about Angular version, testing culture, frontend architecture, and correctness requirements.

### Interview loop

1. Restate inputs, outputs, constraints, and ambiguous cases.
2. Give a simple approach before optimizing.
3. Name the invariant and choose data structures.
4. Code in small testable steps while narrating decisions.
5. Test empty, single, duplicate, boundary, and failure cases.
6. State time and space complexity.

Ask follow-up questions whenever a term, tradeoff, or exercise remains unclear.

## Lesson 0001. Adaptive interview diagnostic

45 minutes. Goal: produce an honest Angular, TypeScript, and algorithm baseline that your teacher can use to tune the next three days.

Rules:

- Use a plain editor. Do not search, run code, or read notes.
- Stop each task when its timer ends.
- Say "I do not know" instead of guessing from familiarity.
- This measures retrieval under pressure. It does not certify mastery.

### Part 1. Knowledge check, 7 minutes

Answers sit under each question so you can cover them while you work.

1. An API response enters strict TypeScript as `unknown`. What comes next?
   - a. Check shape before property access
   - b. Cast value before property access
   - c. Use any before property access
   - d. Trust schema before property access
   - Answer: a

2. What best catches an unhandled discriminated-union member?
   - a. Add a never assignment
   - b. Add an object assertion
   - c. Add a fallback return
   - d. Add optional field guards
   - Answer: a

3. In current Angular, a value derives only from other signals. Which tool fits?
   - a. Use a computed signal
   - b. Use a writable signal
   - c. Use a template method
   - d. Use one effect callback
   - Answer: a

4. Which design makes an Angular service dependency easiest to replace in a test?
   - a. Inject through provider configuration
   - b. Create inside each method
   - c. Read from global scope
   - d. Store inside component template
   - Answer: a

5. Which strategy finds a target pair in an unsorted array in expected linear time?
   - a. Track complements in Map
   - b. Compare every possible pair
   - c. Sort after every lookup
   - d. Scan values without storage
   - Answer: a

6. Which pattern often fits a longest contiguous range under a changing constraint?
   - a. Maintain one sliding window
   - b. Maintain one binary heap
   - c. Maintain one recursion stack
   - d. Maintain one sorted tree
   - Answer: a

### Part 2. TypeScript task, 9 minutes

Rewrite `describeTrade` with no `any`, no unchecked assertion, and exhaustive handling. Treat input as external data. It may be malformed.

```ts
interface EquityTrade {
  kind: "equity";
  symbol: string;
  quantity: number;
}

interface BondTrade {
  kind: "bond";
  isin: string;
  faceValue: number;
}

type Trade = EquityTrade | BondTrade;

function describeTrade(payload: any): string {
  const trade = payload as Trade;
  if (trade.kind === "equity") {
    return `${trade.symbol}: ${trade.quantity}`;
  }
  return `${trade.isin}: ${trade.faceValue}`;
}
```

Scoring rubric, open after the timer:

- 0: no working direction
- 1: replaces `any` but still trusts input
- 2: narrows fields safely and returns useful invalid-data behavior
- 3: also models the union cleanly and proves exhaustive handling

### Part 3. Angular task, 9 minutes

Sketch a standalone `QuoteCard` component. It receives a required typed quote, derives spread without duplicated state, emits the selected symbol, and renders all three values. Exact imports count. No service is needed.

```ts
interface Quote {
  symbol: string;
  bid: number;
  ask: number;
}
```

Scoring rubric, open after the timer:

- 0: no coherent component shape
- 1: renders data but uses loose types or duplicated state
- 2: typed input, derived spread, and typed output work together
- 3: modern APIs, valid imports, immutable fields, and clear template binding

### Part 4. Algorithm task, 15 minutes

Solve [Two Sum](https://leetcode.com/problems/two-sum/) in TypeScript. Before coding, say your invariant. After coding, test a duplicate-value case and state time and space complexity.

Scoring rubric, open after the timer:

- 0: no complete approach
- 1: working quadratic solution with some tests
- 2: correct map solution and correct complexity
- 3: also explains invariant, duplicate handling, and edge cases clearly

### Report your baseline, 5 minutes

Fill this in and paste it to your teacher. Include code if you want line-level feedback. The weakest section drives lesson 0002 and days 2 through 4.

```
Diagnostic report
- Knowledge check: __/6
- TypeScript task: __/3. Main difficulty:
- Angular task: __/3. Main difficulty:
- Algorithm task: __/3. Finished in __ minutes. Main difficulty:
- Angular experience and most recent version used:
- TypeScript experience:
- LeetCode experience:
- Daily study time available:
- Interview format, role level, and known topics:
- Code or questions:
```

How to read the score:

- Any section at 0 or 1. Start with fundamentals and one guided implementation.
- Any section at 2. Use targeted repair, retrieval, and a second variation.
- All sections at 3. Raise time pressure and use design and debugging prompts.

After finishing, read only the source for your weakest section.

## Lesson 0002. Angular and TypeScript principles

25 minutes. This lesson trains four interview moves: separate Angular from TypeScript and JavaScript, choose state tools, explain OnPush, and validate API data.

Your four-day goal is retrieval speed under interview pressure. Finish this lesson without opening the reference first. Then use the reference only to repair gaps.

Success check. By the end, you can give a 60-second answer that names the layer, explains why a tool fits, gives an example, and admits one tradeoff.

### Retrieve before reading

Write from memory. Two minutes total. What do Angular, TypeScript, and JavaScript each do?

Check the distinction. Angular is the runtime UI framework. TypeScript checks source code before runtime and emits JavaScript. JavaScript executes in the browser or server. Network data and object mutation are runtime facts, so TypeScript alone cannot validate them.

### Four moves worth rehearsing

1. Draw a component boundary. Inputs carry data in. Outputs report user intent out. Injected services handle shared state or external work. Split a child when it owns behavior, reuse, or a useful test seam. See the [official Angular input guide](https://angular.dev/guide/components/inputs).
2. Match state to time. A signal holds a value available now. A computed signal derives another value. An Observable models values over time and supports cancellation and operator pipelines. See the [official signals guide](https://angular.dev/guide/signals) and the [official RxJS guide](https://rxjs.dev/guide/observable).
3. Explain OnPush with identity. OnPush lets Angular skip eligible subtrees. A new input reference is visible. In-place mutation keeps the same reference and can leave the UI stale. Signals read by a template also notify Angular when they change. See the [official OnPush guide](https://angular.dev/best-practices/skipping-subtrees).
4. Treat API data as unknown. Type annotations disappear during compilation. Parse external data as `unknown`, check its runtime shape, then return a trusted domain type. An `as` assertion does not validate a value. See the [official unknown reference](https://www.typescriptlang.org/docs/handbook/2/functions.html#unknown).

### Concrete example

This component keeps local display state as signals and leaves asynchronous data loading in a service.

```ts
@Component({
  selector: 'app-quote-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button type="button" (click)="refresh()">Refresh {{ symbol() }}</button>
    @if (quote(); as current) {
      <p>{{ current.price | currency }}</p>
    }
  `,
  imports: [CurrencyPipe],
})
export class QuoteCard {
  readonly symbol = input.required<string>();
  readonly refreshed = output<Quote>();
  readonly quote = signal<Quote | null>(null);
  private readonly quotes = inject(QuoteService);

  refresh(): void {
    this.quotes.load(this.symbol())
      .pipe(take(1))
      .subscribe(quote => {
        this.quote.set(quote);
        this.refreshed.emit(quote);
      });
  }
}
```

Say the tradeoff aloud. This imperative subscription is short because the request completes. For repeated or long-lived streams, prefer template consumption with `AsyncPipe` or destruction-aware cleanup such as `takeUntilDestroyed()`.

### Check your choices

1. Which type best prevents data and error states from existing together?
   - a. One interface with several optional fields
   - b. One union with a literal status field
   - c. One class with several public fields
   - Answer: b. A discriminated union models each valid state and supports exhaustive narrowing.

2. Which type is the safest starting point for parsed API data?
   - a. any, because the payload is dynamic
   - b. Quote, because fetch is type-aware
   - c. unknown, because checks are required
   - Answer: c. unknown accepts external values but blocks property access until code narrows or validates them.

3. Which parent update best fits an OnPush child input?
   - a. Replace the object with a copied value
   - b. Mutate the object and keep its value
   - c. Read the object inside its constructor
   - Answer: a. A new object reference makes the input change visible. Mutating the existing object preserves its identity.

4. Which tool best fits live search with debounce and cancellation?
   - a. A plain field with a click handler
   - b. An Observable with switchMap logic
   - c. A readonly type with object spread
   - Answer: b. An Observable fits a changing stream where cancellation and time-based operators matter.

### One-minute interview drill

Prompt. "Would you use a signal or an Observable for a price screen, and how would OnPush affect the design?"

Model answer. I would use an Observable for the incoming price stream because it changes over time and may need reconnection, throttling, or cancellation. I would expose the stream to the template through `AsyncPipe`, or convert it once at a clear boundary if the rest of the component uses signals. With OnPush, the async emission or signal update schedules the view for checking. I would keep input objects immutable so reference changes remain visible. The tradeoff is that mixing signals and RxJS carelessly adds conversion and ownership questions.

### Finish

1. Re-answer every missed quiz item without looking.
2. Open the full principles reference below and repair one weak topic.
3. Ask your teacher a follow-up question about any tradeoff you cannot defend aloud.

Use Angular's official guides and the TypeScript Handbook before blog summaries. They define current APIs and the type system directly. No learning record is created here. Record completion only after you finish the retrieval drill and quiz.

## Lesson 0003. Rebuild the quote card

35 minutes. Restore component syntax you once knew, then connect Angular 16 decorator APIs to current signal-based APIs.

Your target. In 12 minutes, write a valid component with a required typed input, a typed output, derived spread, and working template bindings. Then explain every line without notes.

### Recover the component shape

Angular decorates a class. The class owns state and methods. The template reads class members and binds DOM events to methods. TypeScript interfaces disappear at runtime, but Angular component metadata and emitters do not.

```ts
import { Component, computed, input, output } from '@angular/core';

interface Quote {
  readonly symbol: string;
  readonly bid: number;
  readonly ask: number;
}

@Component({
  selector: 'app-quote-card',
  template: `
    <button type="button" (click)="selectQuote()">
      <strong>{{ quote().symbol }}</strong>
      <span>Bid: {{ quote().bid }}</span>
      <span>Ask: {{ quote().ask }}</span>
      <span>Spread: {{ spread() }}</span>
    </button>
  `,
})
export class QuoteCard {
  readonly quote = input.required<Quote>();
  readonly selected = output<string>();
  readonly spread = computed(() => this.quote().ask - this.quote().bid);

  selectQuote(): void {
    this.selected.emit(this.quote().symbol);
  }
}
```

A signal input is read by calling it. `computed()` derives spread without storing a second writable value. The output emits user intent to the parent.

Primary sources: [Angular input guide](https://angular.dev/guide/components/inputs), [Angular output guide](https://angular.dev/guide/components/outputs), [Angular signals guide](https://angular.dev/guide/signals).

### Bridge Angular 16 to current Angular

| Job | Angular 16 style | Current style |
| --- | --- | --- |
| Required input | `@Input({ required: true }) quote!: Quote` | `quote = input.required<Quote>()` |
| Typed output | `@Output() selected = new EventEmitter<string>()` | `selected = output<string>()` |
| Derived spread | `get spread() { return this.quote.ask - ... }` | `spread = computed(() => this.quote().ask - ...)` |
| Template read | `{{ quote.symbol }}` | `{{ quote().symbol }}` |

In Angular 16, add `standalone: true` when building a standalone component. Current Angular components are standalone by default, so current official examples often omit that property.

### Retrieval task, 12 minutes

1. Hide the examples above.
2. Start from a blank editor without code completion.
3. Rebuild `QuoteCard` using the current APIs and exact imports.
4. Add a parent usage example with input and output binding.
5. Do not run it until you manually check every item below.

Checklist:

- The component is a decorated exported class.
- Every used Angular API has an exact import.
- The required input and output carry precise types.
- Spread is derived, not copied into writable state.
- Interpolation uses double braces and signal reads use calls.
- The click handler emits the current symbol.
- The parent binds `[quote]` and listens to `(selected)`.

Parent usage should have this shape:

```html
<app-quote-card
  [quote]="currentQuote"
  (selected)="openTrade($event)"
/>
```

Score 7/7 only when the component is syntactically coherent before execution. If execution finds an error, record whether the miss was syntax, API recall, data flow, or behavior.

### Interview drill, 6 minutes

Answer aloud in 60 seconds. "Why is spread computed instead of stored, and when would you emit the quote rather than its symbol?"

Check. Computed state has one source of truth and cannot drift from bid or ask. Emit the smallest value that represents the parent action. A symbol fits navigation or selection. The full quote fits a parent that must act on the exact displayed snapshot.

Ask your teacher about any line you cannot explain. Then paste your rebuilt component and your 7-item score for feedback.

## Diagnostic solution key

Printable reference 0002. These are compact interview-quality solutions. Rebuild each one from memory after reading it. Recognition is not retrieval.

### 1. TypeScript. Validate, model, exhaust

External data starts as `unknown`. Runtime checks create a trusted `Trade`. A switch over its discriminant then proves exhaustive formatting.

```ts
interface EquityTrade {
  readonly kind: 'equity';
  readonly symbol: string;
  readonly quantity: number;
}

interface BondTrade {
  readonly kind: 'bond';
  readonly isin: string;
  readonly faceValue: number;
}

type Trade = EquityTrade | BondTrade;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function parseTrade(payload: unknown): Trade | null {
  if (!isRecord(payload)) {
    return null;
  }

  if (
    payload.kind === 'equity' &&
    typeof payload.symbol === 'string' &&
    typeof payload.quantity === 'number' &&
    Number.isFinite(payload.quantity)
  ) {
    return {
      kind: 'equity',
      symbol: payload.symbol,
      quantity: payload.quantity,
    };
  }

  if (
    payload.kind === 'bond' &&
    typeof payload.isin === 'string' &&
    typeof payload.faceValue === 'number' &&
    Number.isFinite(payload.faceValue)
  ) {
    return {
      kind: 'bond',
      isin: payload.isin,
      faceValue: payload.faceValue,
    };
  }

  return null;
}

function assertNever(value: never): never {
  throw new Error(`Unhandled trade variant: ${String(value)}`);
}

function formatTrade(trade: Trade): string {
  switch (trade.kind) {
    case 'equity':
      return `${trade.symbol}: ${trade.quantity}`;
    case 'bond':
      return `${trade.isin}: ${trade.faceValue}`;
    default:
      return assertNever(trade);
  }
}

function describeTrade(payload: unknown): string {
  const trade = parseTrade(payload);
  return trade === null ? 'Invalid trade payload' : formatTrade(trade);
}
```

Why this earns 3/3. It uses no `any` or unchecked assertion. It checks every variant-specific field, returns useful invalid-data behavior, builds a clean discriminated union, and makes an added variant fail the exhaustive check at compile time.

Source: [TypeScript narrowing and exhaustiveness checking](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#exhaustiveness-checking).

### 2. Angular. Class, signals, derived state

This current-style solution uses signal inputs and outputs. The explicit `standalone: true` keeps the answer clear when the interview version is unknown. Current Angular components are standalone by default.

```ts
import { Component, computed, input, output } from '@angular/core';

interface Quote {
  readonly symbol: string;
  readonly bid: number;
  readonly ask: number;
}

@Component({
  selector: 'app-quote-card',
  standalone: true,
  template: `
    <button type="button" (click)="selectQuote()">
      <strong>{{ quote().symbol }}</strong>
      <span>Bid: {{ quote().bid }}</span>
      <span>Ask: {{ quote().ask }}</span>
      <span>Spread: {{ spread() }}</span>
    </button>
  `,
})
export class QuoteCard {
  readonly quote = input.required<Quote>();
  readonly selected = output<string>();
  readonly spread = computed(() => this.quote().ask - this.quote().bid);

  selectQuote(): void {
    this.selected.emit(this.quote().symbol);
  }
}
```

Parent usage:

```html
<app-quote-card
  [quote]="currentQuote"
  (selected)="openTrade($event)"
/>
```

Angular 16 equivalent:

```ts
import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-quote-card',
  standalone: true,
  template: `
    <button type="button" (click)="selectQuote()">
      <strong>{{ quote.symbol }}</strong>
      <span>Bid: {{ quote.bid }}</span>
      <span>Ask: {{ quote.ask }}</span>
      <span>Spread: {{ spread }}</span>
    </button>
  `,
})
export class QuoteCard {
  @Input({ required: true }) readonly quote!: Quote;
  @Output() readonly selected = new EventEmitter<string>();

  get spread(): number {
    return this.quote.ask - this.quote.bid;
  }

  selectQuote(): void {
    this.selected.emit(this.quote.symbol);
  }
}
```

Why this earns 3/3. It has a valid exported component class, exact imports, a required typed input, a typed output, immutable fields, derived state, and working interpolation and event bindings.

Sources: [Angular inputs](https://angular.dev/guide/components/inputs), [Angular outputs](https://angular.dev/guide/components/outputs), [Angular signals](https://angular.dev/guide/signals).

### 3. Two Sum. Remember prior values

Invariant before each iteration. The map contains each value from an earlier index, and no valid pair has been found entirely within those earlier indices.

```ts
function twoSum(nums: number[], target: number): number[] {
  const indexByValue = new Map<number, number>();

  for (let index = 0; index < nums.length; index += 1) {
    const value = nums[index];
    const complement = target - value;
    const complementIndex = indexByValue.get(complement);

    if (complementIndex !== undefined) {
      return [complementIndex, index];
    }

    indexByValue.set(value, index);
  }

  throw new Error(`No two-sum solution for target ${target}`);
}
```

Store the current value only after checking its complement. That prevents one element from pairing with itself and still handles duplicates.

```ts
twoSum([2, 7, 11, 15], 9);  // [0, 1]
twoSum([3, 3], 6);          // [0, 1]
twoSum([0, 4, 3, 0], 0);   // [0, 3]
twoSum([-3, 4, 3, 90], 0); // [0, 2]
```

Why this earns 3/3. It returns indices, handles zero, duplicates, and negative values, and states the invariant. Each element enters and leaves the loop once, so time is O(n). The map can hold n entries, so space is O(n).

Sources: [LeetCode Two Sum](https://leetcode.com/problems/two-sum/) and [MDN Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map).

### How to use this key

1. Read one solution and explain why each line exists.
2. Close the key and rebuild it from a blank file.
3. Trace one normal case and one edge case before execution.
4. Run it and classify each mismatch as syntax, API, or logic.
5. Rebuild the failed part again after at least 30 minutes.

Paste your rebuilt versions to your teacher for a second score. Ask follow-up questions about any line you cannot defend aloud.

## Angular and TypeScript principles

Rapid interview reference. Use this sheet to rehearse decisions, not definitions. For each topic, explain the boundary, name the tradeoff, then give the smallest believable example.

### Start with the right layer

Angular. A runtime framework. It creates components, resolves dependencies, renders templates, reacts to state, and manages navigation and forms.

TypeScript. A compile-time type system and toolchain. It checks source code, then emits JavaScript. Most types do not exist after compilation.

JavaScript. The runtime language. Network data, events, promises, object mutation, and thrown errors happen here. TypeScript cannot validate an API response by itself.

Strong interview answer. "TypeScript can prove how checked code uses a value. At an external boundary I still validate the JavaScript value at runtime."

### Angular principles

#### 1. Put a boundary around one UI responsibility

A component should own one coherent piece of UI and its presentation behavior. Pass data in and report user intent out. Keep API calls and shared business state in injected services when several components need them. Do not split every element into a component. Split when a part has its own behavior, reuse, test seam, or change rate. Angular's style guide recommends focused components. See the [Angular style guide](https://angular.dev/style-guide#keep-components-focused-on-presentation).

```ts
@Component({
  selector: 'app-price-card',
  template: `
    <button type="button" (click)="selected.emit(product().id)">
      {{ product().name }}: {{ product().price | currency }}
    </button>
  `,
  imports: [CurrencyPipe],
})
export class PriceCard {
  readonly product = input.required<Product>();
  readonly selected = output<string>();
}
```

Tradeoff. A smart page can coordinate loading and routing while small child components stay reusable. Too much coordination in children couples them to one screen. Too many tiny children make data flow noisy.

#### 2. Inputs are data; outputs are events

The current function APIs return an input signal and an output emitter. Required inputs move a missing value from a runtime surprise to a template error. Outputs should describe what happened, such as `saved`, rather than command a parent, such as `closeDialogNow`. Decorator APIs `@Input` and `@Output` remain supported, but the current style guide prefers `input()` and `output()`. See [inputs](https://angular.dev/guide/components/inputs), [outputs](https://angular.dev/guide/components/outputs), and [style guidance](https://angular.dev/style-guide#use-signal-inputs-and-outputs).

```ts
readonly accountId = input.required<string>();
readonly limit = input(20);
readonly refreshed = output<number>();

refresh(): void {
  this.refreshed.emit(Date.now());
}
```

Interview trap. An output is not DOM event bubbling. A parent listens on the component element.

#### 3. Dependency injection controls construction and scope

Ask Angular for a dependency instead of constructing it inside the consumer. This separates policy from use, supports alternate implementations, and makes tests easier. Provider placement controls lifetime. A service with `providedIn: 'root'` normally has application-wide scope. Route or component providers create narrower instances. See [dependency injection](https://angular.dev/guide/di) and [hierarchical injectors](https://angular.dev/guide/di/hierarchical-dependency-injection).

```ts
@Injectable({ providedIn: 'root' })
export class ExchangeRateService {
  private readonly http = inject(HttpClient);

  getRate(pair: string): Observable<Rate> {
    return this.http.get<Rate>(`/api/rates/${pair}`);
  }
}

export class QuotePage {
  private readonly rates = inject(ExchangeRateService);
}
```

Tradeoff. Root scope is convenient for stateless infrastructure and truly shared state. Feature scope avoids accidental cross-feature state and releases the instance with its injector.

#### 4. Choose state by shape: signal, Observable, or plain value

Signals fit synchronous state that the UI reads now. Use `computed()` for derived values and `effect()` mainly to synchronize with an external system. Do not use effects to copy state that can be derived. See the [signals guide](https://angular.dev/guide/signals).

```ts
readonly quantity = signal(1);
readonly unitPrice = signal(12.50);
readonly total = computed(() => this.quantity() * this.unitPrice());

increment(): void {
  this.quantity.update(value => value + 1);
}
```

Observables fit values over time, especially HTTP results, router events, user input streams, cancellation, and operator pipelines. A subscription starts an Observable execution and returns a `Subscription` that can cancel it. See the [RxJS Observable guide](https://rxjs.dev/guide/observable) and [subscriptions](https://rxjs.dev/guide/subscription).

```ts
readonly results$ = this.query.valueChanges.pipe(
  debounceTime(250),
  distinctUntilChanged(),
  switchMap(term => this.search.find(term)),
  catchError(() => of([])),
);
```

Tradeoff. Signals make local synchronous state direct. RxJS is better when time, cancellation, errors, or several async sources are part of the problem. Converting everything between both models adds concepts without adding value.

#### 5. OnPush is a checking strategy, not immutability enforcement

`OnPush` lets Angular skip eligible component subtrees. New inputs and events handled in a subtree are common reasons Angular checks it. Reading a signal in an OnPush template also lets Angular track that dependency and mark the component when it changes. Mutating an existing input object keeps the same reference, so Angular may not detect the intended change. Prefer immutable updates. See [skipping component subtrees](https://angular.dev/best-practices/skipping-subtrees) and [signals in OnPush components](https://angular.dev/guide/signals#reading-signals-in-onpush-components).

```ts
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<p>{{ account().name }}</p>`,
})
export class AccountSummary {
  readonly account = input.required<Account>();
}

// Parent: new reference, clear state transition
this.account.update(value => ({ ...value, name: 'Ada' }));
```

Interview trap. OnPush does not mean "render once" and does not make mutable objects safe.

#### 6. Keep templates declarative

Templates bind component state to DOM properties, attributes, classes, styles, and events. Put cheap presentation expressions in the template. Move multi-step decisions into named methods or computed state. Use Angular control flow such as `@if` and `@for`, and give repeated records a stable tracking key. See [templates](https://angular.dev/guide/templates) and [control flow](https://angular.dev/guide/templates/control-flow).

```html
@if (trades().length === 0) {
  <p>No trades yet.</p>
} @else {
  @for (trade of trades(); track trade.id) {
    <app-trade-row [trade]="trade" />
  }
}
```

Tradeoff. A method call in a template is valid, but Angular may call it often. Precompute expensive work and keep getters pure.

#### 7. Pick a form model that matches the job

Reactive forms define the form model in TypeScript. They suit dynamic validation, larger forms, and direct unit tests. Template-driven forms put more form behavior in the template and suit small, simple forms. Angular documents both approaches. See [forms overview](https://angular.dev/guide/forms) and [reactive forms](https://angular.dev/guide/forms/reactive-forms).

```ts
readonly transferForm = new FormGroup({
  amount: new FormControl(0, {
    nonNullable: true,
    validators: [Validators.required, Validators.min(0.01)],
  }),
  reference: new FormControl('', { nonNullable: true }),
});

submit(): void {
  if (this.transferForm.invalid) return;
  this.transfer.create(this.transferForm.getRawValue());
}
```

Tradeoff. Reactive forms cost more setup but make the state model explicit. Template-driven forms are shorter until validation and cross-field behavior grow.

#### 8. Routes map URLs to screen composition

Routes connect a path to a component, redirect, guard, resolver, or lazy-loaded feature. Prefer lazy loading at feature boundaries. Treat guards as navigation controls, not authorization. A user can alter client code, so the server must enforce access. See [routing](https://angular.dev/guide/routing), [route definitions](https://angular.dev/guide/routing/define-routes), and the [guard security warning](https://angular.dev/guide/routing/route-guards#critical-never-rely-on-client-side-guards-as-the-sole-source-of-access-control).

```ts
export const routes: Routes = [
  {
    path: 'portfolio/:id',
    loadComponent: () =>
      import('./portfolio-page').then(module => module.PortfolioPage),
  },
  { path: '', pathMatch: 'full', redirectTo: 'portfolio/main' },
];
```

Tradeoff. A resolver can avoid a half-loaded screen, but it delays navigation. Loading inside the component can show the route sooner, but the component must model loading and failure.

#### 9. Lifecycle hooks are for lifecycle work

Use `ngOnInit` for initialization that depends on Angular-provided inputs. Use `ngOnChanges` when behavior depends on input transitions. Use `afterNextRender` for DOM work after rendering. Keep constructors cheap. See [component lifecycle](https://angular.dev/guide/components/lifecycle).

Prefer template consumption with `AsyncPipe` when practical. It unsubscribes when the component is destroyed. For an imperative subscription, `takeUntilDestroyed()` completes the stream with the current destruction context. See [AsyncPipe](https://angular.dev/api/common/AsyncPipe) and [takeUntilDestroyed](https://angular.dev/api/core/rxjs-interop/takeUntilDestroyed).

```ts
private readonly destroyRef = inject(DestroyRef);

ngOnInit(): void {
  this.prices.liveUpdates()
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe(price => this.latestPrice.set(price));
}
```

Interview trap. Not every Observable needs manual cleanup. Finite streams complete. Template-managed subscriptions and destruction-aware operators remove common leaks.

#### 10. Standalone components make dependencies local

Current Angular components are standalone by default. A component lists the directives, pipes, and child components its template uses in `imports`. Existing NgModule applications remain valid and can adopt standalone code gradually. See [importing and using components](https://angular.dev/guide/components/importing).

```ts
@Component({
  selector: 'app-trade-page',
  imports: [RouterLink, DatePipe, TradeTable],
  templateUrl: './trade-page.html',
})
export class TradePage {}
```

Tradeoff. Local imports make dependencies visible and work well with lazy loading. Shared import arrays can reduce repetition, but broad bundles can hide what a template actually needs.

#### 11. Test behavior at the cheapest useful boundary

Test pure TypeScript logic without Angular. Use `TestBed` when Angular must create components, resolve providers, or render templates. Assert visible behavior and emitted intent, not private fields. Replace network dependencies with Angular's HTTP testing support. See the [testing guide](https://angular.dev/guide/testing) and [HTTP testing](https://angular.dev/guide/http/testing).

```ts
it('emits the selected product id', () => {
  const fixture = TestBed.createComponent(PriceCard);
  fixture.componentRef.setInput('product', PRODUCT);
  const selectedIds: string[] = [];
  fixture.componentInstance.selected.subscribe(id => selectedIds.push(id));

  fixture.detectChanges();
  fixture.nativeElement.querySelector('button').click();

  expect(selectedIds).toEqual([PRODUCT.id]);
});
```

Tradeoff. Unit tests are fast and precise. Integration tests catch template and provider wiring mistakes. A healthy suite uses both, with fewer expensive end-to-end tests for critical journeys.

### TypeScript principles

#### 1. Compatibility is usually structural

If a value has the required shape, it can often be used regardless of its declared name. Extra properties on an existing variable are compatible, while an object literal gets an extra-property check that catches likely mistakes. See [type compatibility](https://www.typescriptlang.org/docs/handbook/type-compatibility.html) and [excess property checks](https://www.typescriptlang.org/docs/handbook/2/objects.html#excess-property-checks).

```ts
interface Named {
  name: string;
}

const account = { name: 'Ada', balance: 100 };
const named: Named = account; // compatible by shape

// const typo: Named = { name: 'Ada', balence: 100 };
// Error: object literal contains an unknown property.
```

Tradeoff. Structural typing makes composition easy. It does not create domain identity. Use branded values or classes with private members when mixing structurally identical IDs would be dangerous.

#### 2. Interface or type alias is mostly about intent

Both can describe object shapes. Interfaces support declaration merging and are natural for extensible object contracts. Type aliases can also name unions, tuples, primitives, mapped types, and intersections. See [interfaces](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#interfaces) and [type aliases](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-aliases).

```ts
interface Account {
  id: string;
  balance: number;
}

type LoadState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'loaded'; account: Account }
  | { status: 'failed'; message: string };
```

Interview answer. Prefer a project convention. Choose interface for an object contract that consumers may extend or merge. Choose a type alias when the model needs a union or type-level composition.

#### 3. Unions model alternatives; narrowing proves which one

A discriminated union puts a shared literal field on each valid state. A switch on that field narrows the rest of the object. This prevents impossible combinations such as an error and loaded data at the same time. See [discriminated unions](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions).

```ts
function renderState(state: LoadState): string {
  switch (state.status) {
    case 'idle': return 'Ready';
    case 'loading': return 'Loading';
    case 'loaded': return `Balance: ${state.account.balance}`;
    case 'failed': return state.message;
    default: return assertNever(state);
  }
}

function assertNever(value: never): never {
  throw new Error(`Unhandled state: ${JSON.stringify(value)}`);
}
```

Tradeoff. Optional fields look shorter but let invalid combinations through. A union takes more lines and gives exhaustive control flow.

#### 4. Generics preserve a relationship between types

A useful generic connects input and output types. A type parameter used once often adds no information. Add constraints only for operations the implementation needs. See [generics](https://www.typescriptlang.org/docs/handbook/2/generics.html).

```ts
interface Page<TItem> {
  items: TItem[];
  nextCursor: string | null;
}

function first<TItem>(page: Page<TItem>): TItem | undefined {
  return page.items[0];
}

function getId<TItem extends { id: string }>(item: TItem): string {
  return item.id;
}
```

Interview trap. Do not reach for a generic when a concrete type or union tells the truth more clearly.

#### 5. Use unknown at untrusted boundaries; avoid any

`any` opts out of type checking and spreads unsafety through callers. `unknown` accepts any value but requires narrowing before use. That makes it a good starting type for caught errors, parsed JSON, storage, and third-party messages. See [unknown](https://www.typescriptlang.org/docs/handbook/2/functions.html#unknown).

```ts
interface Quote {
  symbol: string;
  price: number;
}

function isQuote(value: unknown): value is Quote {
  if (typeof value !== 'object' || value === null) return false;
  const record = value as Record<string, unknown>;
  return typeof record.symbol === 'string'
    && typeof record.price === 'number';
}

async function loadQuote(): Promise<Quote> {
  const response = await fetch('/api/quote');
  if (!response.ok) throw new Error(`Quote request failed: ${response.status}`);
  const data: unknown = await response.json();
  if (!isQuote(data)) throw new Error('Quote response has an invalid shape');
  return data;
}
```

Key distinction. A type assertion such as `data as Quote` performs no runtime check. A guard inspects the JavaScript value.

#### 6. Describe objects precisely

Use named properties for known fields. Use an index signature or `Record` only when keys are genuinely dynamic. Avoid the broad `object` type when callers need known members. Optional means the property may be absent, which differs from a required property whose value can be `undefined`. See [object types](https://www.typescriptlang.org/docs/handbook/2/objects.html).

```ts
interface Position {
  instrumentId: string;
  quantity: number;
  note?: string;
}

const pricesByInstrument: Record<string, number> = {
  AAPL: 210.20,
  MSFT: 505.10,
};
```

#### 7. readonly blocks writes through a type, not runtime mutation

`readonly` catches assignments during type checking. It does not freeze the JavaScript object, and it is shallow unless nested members are also readonly. Use readonly inputs and immutable update patterns to make ownership clear. Use `Object.freeze` only when runtime freezing is required. See [readonly properties](https://www.typescriptlang.org/docs/handbook/2/objects.html#readonly-properties).

```ts
interface Holding {
  readonly id: string;
  readonly lots: readonly number[];
}

function addLot(holding: Holding, quantity: number): Holding {
  return { ...holding, lots: [...holding.lots, quantity] };
}
```

#### 8. Utility types transform an existing contract

Utility types reduce duplicate declarations. Use them when the new type truly follows the source type. Name a separate interface when the API has different semantics or will evolve independently. See [utility types](https://www.typescriptlang.org/docs/handbook/utility-types.html).

```ts
interface User {
  id: string;
  name: string;
  role: 'viewer' | 'trader';
}

type UserPatch = Partial<Pick<User, 'name' | 'role'>>;
type PublicUser = Omit<User, 'role'>;
type UsersById = Record<string, User>;
```

Tradeoff. `Partial<User>` is handy for patch data, but it is often too permissive for creation data because it makes every field optional.

#### 9. Classes carry runtime behavior; access modifiers mostly guide TypeScript

Classes produce JavaScript constructor functions and prototypes. `public`, `protected`, and TypeScript `private` are checked by TypeScript. JavaScript `#private` fields enforce privacy at runtime. `implements` checks the instance contract but does not change emitted behavior. See [classes](https://www.typescriptlang.org/docs/handbook/2/classes.html) and [runtime caveats](https://www.typescriptlang.org/docs/handbook/2/classes.html#caveats).

```ts
class Ledger {
  readonly #entries: number[] = [];

  constructor(public readonly accountId: string) {}

  add(amount: number): void {
    this.#entries.push(amount);
  }

  get balance(): number {
    return this.#entries.reduce((sum, value) => sum + value, 0);
  }
}
```

Tradeoff. Use a class when identity, invariants, encapsulated mutable state, or runtime construction matters. Use plain objects and functions for simple data transformations.

#### 10. Know what survives compilation

Interfaces, type aliases, generic arguments, and most annotations disappear from emitted JavaScript. Classes, enums, imported values, and JavaScript checks can exist at runtime. TypeScript's structural types are erased, so `value instanceof SomeInterface` is impossible. See [erased structural types](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes-oop.html#erased-structural-types).

```ts
interface Payment {
  amount: number;
}

function total(payment: Payment): number {
  return payment.amount;
}

// Emitted JavaScript is effectively:
// function total(payment) { return payment.amount; }
```

### Runtime checks TypeScript cannot replace

- Check HTTP status and handle timeouts, cancellation, and malformed bodies.
- Validate unknown data before assigning it a domain type.
- Enforce authorization and business rules on the server.
- Remember that `readonly` and `private` may be compile-time restrictions only.
- Test Angular rendering and DI wiring because types cannot prove runtime configuration.

### High-yield interview questions

1. Where would you place data loading, shared state, and presentational formatting in an Angular feature? Why?
2. When would you choose a signal over an Observable? Give one case where each is clearly better.
3. What can cause an OnPush component to update, and why can object mutation cause stale UI?
4. How do provider scopes change service lifetime and state sharing?
5. Reactive or template-driven forms for a multi-step transfer form? Defend the choice.
6. What work belongs in a route resolver, and when would component-level loading be better?
7. What subscription cleanup does `AsyncPipe` provide? When would you use `takeUntilDestroyed()`?
8. Why can two unrelated TypeScript types be compatible?
9. When is a type alias required instead of an interface?
10. How does a discriminated union prevent impossible UI states?
11. Why is `unknown` safer than `any` for API data?
12. Which TypeScript features survive at runtime, and how would you prove an API payload is valid?

Fast practice. Pick four questions. Answer each aloud in 60 seconds. Use this shape: decision, reason, example, tradeoff.

Docs checked against current official Angular, TypeScript, and RxJS material on 28 August 2026.

## Primary resources

### Knowledge

- [Angular documentation: Essentials](https://angular.dev/essentials). Official current overview of components, templates, signals, and dependency injection. Use for core Angular explanations and small implementation exercises.
- [Angular documentation: Accepting data with input properties](https://angular.dev/guide/components/inputs). Official guide to required signal inputs and decorator-based inputs. Use for version-aware component API practice.
- [Angular documentation: Custom events with outputs](https://angular.dev/guide/components/outputs). Official guide to typed outputs, event emission, and decorator-based outputs. Use for child-to-parent communication exercises.
- [Angular documentation: Signals](https://angular.dev/guide/signals). Official guide to writable and computed signals, effects, and signal reads in templates. Use for state and change-detection questions.
- [Angular documentation: Dependency injection](https://angular.dev/guide/di). Official guide to providers, injection contexts, and hierarchical dependency injection. Use for service design and testability.
- [Angular documentation: Strictly typed reactive forms](https://angular.dev/guide/forms/typed-forms). Official guide to typed form controls, nullability, and form groups. Use for practical form exercises.
- [Angular documentation: Testing](https://angular.dev/guide/testing). Official testing guide. Use for component and service test design.
- [Angular documentation: Security](https://angular.dev/best-practices/security). Official security guidance on sanitization, trusted values, and cross-site scripting defenses. Use for safe template and DOM questions.
- [TypeScript Handbook: Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html). Official guide to control-flow analysis, type guards, discriminated unions, and exhaustive handling. Use for core type-system practice.
- [TypeScript Handbook: Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html). Official guide to reusable type relationships and generic constraints. Use for API design exercises.
- [TypeScript TSConfig: strict](https://www.typescriptlang.org/tsconfig/strict.html). Official compiler reference for the strict family of checks. Use for explaining production TypeScript defaults.
- [TypeScript Handbook: Type compatibility](https://www.typescriptlang.org/docs/handbook/type-compatibility.html). Official explanation of structural typing. Use for assignability and interface questions.
- [MDN: JavaScript data structures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Data_structures). Maintained JavaScript reference for values, collections, and equality. Use for algorithm implementation choices.
- [MDN: Keyed collections](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Keyed_collections). Maintained guide to `Map`, `Set`, `WeakMap`, and `WeakSet`. Use for lookup, frequency-count, and deduplication patterns.
- [ECMAScript language specification](https://tc39.es/ecma262/). Primary specification for JavaScript behavior. Use for resolving precise language edge cases, not routine study.
- [LeetCode 75 study plan](https://leetcode.com/studyplan/leetcode-75/). Official curated problem set. Use for selecting representative practice after the diagnostic.
- [LeetCode: Two Sum](https://leetcode.com/problems/two-sum/). Official problem for hash-map lookup. Use for baseline coding and complexity explanation.
- [LeetCode: Valid Parentheses](https://leetcode.com/problems/valid-parentheses/). Official problem for stack recognition. Use for baseline coding and edge-case discipline.
- [LeetCode: Best Time to Buy and Sell Stock](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/). Official problem for one-pass invariant reasoning. Use for a realistic finance-flavored prompt without assuming finance-specific algorithms.

### Wisdom

- [Angular community](https://angular.dev/community). Official directory of Angular events, groups, and community channels. Use for checking how practitioners discuss current Angular tradeoffs.
- [TypeScript discussions](https://github.com/microsoft/TypeScript/discussions). Maintainer-hosted technical discussions. Use for nuanced language-design questions that official handbook pages do not settle.

### Gaps

- The Angular version used in the interview is unknown.
- The live-coding environment and whether code execution is available are unknown.
- The firm, team, and finance-domain expectations are unknown.

## Practice catalog

Edit the listed files. Reviews live in each task's `review.ts`.

### Day 1. Restore implementation fluency

Focus. Runtime validation, component API recall, and traced map or stack solutions.

| Task | Kind | Duration | Files |
| --- | --- | --- | --- |
| Validate, model, exhaust | typescript | 60 minutes | `src/app/practice/day-01/d1-trade-boundary/solution.ts` |
| Build a current QuoteCard | angular | 35 minutes | `src/app/practice/day-01/d1-quote-card-signals/solution.ts` |
| Repair Two Sum | algorithm | 60 minutes | `src/app/practice/day-01/d1-two-sum/solution.ts`, `notes.md` |
| Bridge Angular 16 and current APIs | angular | 45 minutes | `src/app/practice/day-01/d1-quote-card-version-bridge/solution.ts` |
| Valid Parentheses, optional | algorithm | 30 minutes | `src/app/practice/day-01/d1-valid-parentheses/solution.ts`, `notes.md` |

### Day 2. Angular implementation and design

Focus. Typed forms, service boundaries, tests, debugging, and route composition.

| Task | Kind | Duration | Files |
| --- | --- | --- | --- |
| Build an order ticket | angular | 120 minutes | `src/app/practice/day-02/d2-order-ticket/` |
| Test the order ticket | testing | 45 minutes | `src/app/practice/day-02/d2-test-suite/` |
| Fix three Angular bugs | typescript | 30 minutes | `src/app/practice/day-02/d2-debug-round/solution.ts` |
| Hash map and two pointers | algorithm | 60 minutes | `src/app/practice/day-02/d2-algorithm-pair/solution.ts` |
| Build lazy routing and view states, optional | angular | 30 minutes | `src/app/practice/day-02/d2-lazy-routing-states/` |

### Day 3. Algorithms under interview conditions

Focus. Timed pattern recognition, TypeScript quality, and clean-room correction.

| Task | Kind | Duration | Files |
| --- | --- | --- | --- |
| Three timed pattern problems | algorithm | 105 minutes | `src/app/practice/day-03/d3-timed-patterns/solution.ts` |
| Run a TypeScript quality pass | typescript | 35 minutes | `src/app/practice/day-03/d3-typescript-quality/solution.ts` |
| Rebuild an Angular API and test | angular | 40 minutes | `src/app/practice/day-03/d3-angular-recall/` |
| Re-solve the hardest failure | algorithm | 40 minutes | `src/app/practice/day-03/d3-correction-round/solution.ts` |

### Day 4. Simulation, correction, stop

Focus. One realistic mock, evidence-based repairs, and no late cramming.

| Task | Kind | Duration | Files |
| --- | --- | --- | --- |
| Run the live-coding mock | angular | 60 minutes | `src/app/practice/day-04/d4-mock-live-coding/` |
| Repair the top two gaps | typescript | 45 minutes | `src/app/practice/day-04/d4-gap-repairs/solution.ts` |
