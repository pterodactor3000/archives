# React interview plan for tomorrow

The interview has twenty technical questions. Retrieval matters more than another long reading pass.

## First pass: map the gaps

Time: 45 minutes.

Open [twenty technical questions](20-technical-questions.md).

For each question:

1. answer aloud for 60 seconds without notes
2. mark it green, yellow, or red
3. write one missing mechanism, not a full answer

Do not study during this pass. Finish all twenty so the weak areas are real.

## Block 1: React runtime

Time: 90 minutes.

Read these sections in [senior React](senior-react.md):

- render model
- state snapshots and batching
- effects and stale closures
- identity and keys
- memoization
- context and external stores
- Suspense, transitions, and errors
- Actions, `use`, and Effect Events

Answer questions 1 through 8 again.

Build or explain:

- three queued state updates
- an effect with cleanup
- an obsolete request race
- a row-level `useSyncExternalStore` subscription

Target:

Explain each mechanism without saying "React is smart" or "React optimizes it."

## Block 2: Next.js

Time: 75 minutes.

Read [senior Next.js](senior-nextjs.md).

Focus on:

- Server and Client Component boundary
- what `"use client"` pulls into the client graph
- streaming and Suspense
- current fetch caching default
- Cache Components
- Server Action authorization
- hydration mismatch causes

Answer questions 9 through 12.

Target:

Say this accurately:

> In current App Router versions, fetch is not cached by default. Next.js 16 can opt into Cache Components. I would still check the project's version because this changed.

## Block 3: platform

Time: 75 minutes.

Read:

- [JavaScript and browser traps](../shared/javascript-browser-traps.md)
- [ECMAScript 2027 Stage 4 features](../shared/ecmascript-2027-stage-4.md)
- [HTML, CSS, and accessibility](../shared/html-css-accessibility.md)
- [Core Web Vitals](../shared/core-web-vitals.md)
- [React and Next.js web-platform integration](web-platform-in-react-nextjs.md)

Answer questions 13 through 19.

Write from memory:

```text
A, D, C, B event-loop result
LCP <= 2.5 s
INP <= 200 ms
CLS <= 0.1
p75 mobile and desktop
```

Target:

Give one mechanism and one debugging tool for each performance answer.

For ECMAScript 2027, remember the four finished proposals and one practical use or trap for each. Do not spend this block memorizing the full Temporal API.

## Block 4: finance application

Time: 60 minutes.

Read:

- [trading and finance domain](../shared/trading-finance-domain.md)
- [finance algorithms](../shared/finance-algorithms.md)
- question 20 in [twenty technical questions](20-technical-questions.md)

Review:

- bid, ask, spread, and executable-side profit and loss
- order, fill, and position
- snapshot plus sequence deltas
- timeout as unknown outcome
- idempotency
- numeric representation and rounding
- stale quote behavior

Target:

Apply frontend knowledge to financial risk without claiming the browser is authoritative.

## Block 5: one coding drill

Time: 60 minutes.

Choose one:

- [cancellable instrument search](coding-drills.md#drill-2-cancellable-instrument-search)
- [accessible order ticket](coding-drills.md#drill-3-accessible-order-ticket)
- [high-rate watchlist](coding-drills.md#drill-4-high-rate-watchlist)

Use this clock:

```text
0-5 min: clarify contract and states
5-10 min: types and examples
10-40 min: correct working path
40-50 min: errors, races, accessibility
50-60 min: complexity, production gaps, summary
```

Record the screen and your voice. Review silent periods, hidden assumptions, and unfinished core logic.

## Block 6: final twenty

Time: 60 minutes.

Answer all twenty in one sitting. Limit the opening answer to 60 seconds.

For each answer use:

```text
Mechanism:
Common trap:
How I would verify it:
```

Repeat red questions once. Do not repeat green questions.

## Four-hour compressed plan

If time is short:

1. 60 minutes on questions 1 through 8.
2. 45 minutes on questions 9 through 12.
3. 60 minutes on questions 13 through 19.
4. 30 minutes on question 20 and finance terms.
5. 45 minutes on one search or bug-hunt drill.

Cut:

- advanced indicator algorithms
- obscure CSS syntax
- detailed Next.js cache invalidation APIs
- manual memoization edge cases

Keep:

- React render and effect model
- Server and Client Component boundary
- current caching default
- event loop and async races
- semantic controls and forms
- WCAG keyboard and focus
- CWV names and thresholds
- precision, sequencing, stale state, and idempotency

## Final hour

- Read [React last-minute cheat sheet](last-minute-cheat-sheet.md).
- Answer only the questions still marked red.
- Prepare two measured engineering stories.
- Prepare three questions for the interviewer.
- Stop adding new subjects.

Ask the interviewer:

- Which React and Next.js versions does the main product use?
- Which frontend correctness failure carries the most user risk?
- How does the UI recover market data after a sequence gap?
- How do you measure interaction and message-to-screen latency?
- What would a strong first six months look like?

Sleep is worth more than a final hour of passive reading.
