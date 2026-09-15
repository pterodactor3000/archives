# Discussion and deep-dive prompts

Do not answer architecture questions with a list of tools. Start with user risk and system constraints, then choose mechanisms.

## A five-part answer

Use this structure for most questions:

1. claim
2. constraints and assumptions
3. decision
4. rejected option and tradeoff
5. verification

Example:

> I would keep one managed market-data connection per authenticated session. The screen has many consumers, but duplicate sockets waste bandwidth and can disagree after reconnects. A root service can multiplex instrument subscriptions and expose normalized state. The risk is an oversized global service, so I would keep account, transport, and feature state behind separate contracts. I would verify it with reconnect tests, subscription-count metrics, sequence-gap metrics, and a load test at the expected message rate.

## Short answer, then depth

Start with a 30-second position. Pause. Let the interviewer choose where to go deeper.

```text
Position:
Because:
Main risk:
How I would prove it:
```

This keeps you from giving a five-minute monologue before learning what they care about.

## Design a real-time trading screen

Cover these areas in order.

### Contract

- instrument IDs and metadata
- snapshot and delta messages
- per-stream sequence rules
- timestamps and clock source
- authentication and subscription protocol

### Data path

```text
WebSocket
  -> runtime parsing
  -> sequence and gap handling
  -> normalized latest state
  -> calculated display state
  -> frame-paced rendering
```

### State

Represent `connecting`, `live`, `stale`, `unauthorized`, and `failed` explicitly. Keep last known data if useful, but label it stale.

### Rendering

- normalized state by stable ID
- narrow subscriptions or selectors
- stable row tracking
- virtualization
- sampled visual updates

### Commands

Keep order submission separate from market-data streams. Add idempotency key, pending state, unknown outcome, and reconciliation.

### Proof

- malformed-message tests
- sequence-gap and reconnect tests
- load test above expected peak
- browser long-task and frame metrics
- end-to-end order journey

## WebSocket reconnect

Avoid "retry forever."

1. mark data stale
2. stop order actions that require a live quote if product policy says so
3. reconnect with capped backoff and jitter
4. reauthenticate
5. obtain snapshot
6. apply deltas after snapshot sequence
7. resynchronize on gap
8. expose connection health and metrics

Questions:

- What if the connection returns but one subscription fails?
- What if deltas arrive before snapshot?
- What if token refresh and reconnect race?
- When do you clear old data?
- What does the user see?

## Prevent duplicate orders

UI button disabling is useful but insufficient.

Strong answer:

> I would generate a client order ID for one intent, disable repeated UI submission, and send an idempotency key. A timeout becomes an unknown outcome. The client queries order status by that ID before allowing a fresh intent. Server persistence of the idempotency result provides the business guarantee. A client-side pending guard can block duplicate clicks, but it is not the guarantee.

Discuss the difference between:

- retrying the same intent with the same key
- creating a new intent with a new key
- amending an order
- cancel-replace

## Numeric precision

Strong answer:

> TypeScript's `number` is binary floating-point, so I would not use it for exact money or token accounting. I would first get instrument scale, quantity step, contract multiplier, and rounding policy. Fixed scales can use integers or `bigint`. Variable-scale arithmetic often fits a decimal library. I would serialize exact values as strings at boundaries and round only under named business rules.

Follow-up:

- How does `bigint` reach JSON?
- How do you convert between instrument and account currency?
- Where does rounding occur?
- How do you display negative zero?
- How do you test precision?

## Performance investigation

Do not say "memoize and virtualize" before measuring.

Use this sequence:

1. reproduce with production-like data rate
2. record browser performance trace
3. separate network, calculation, UI update scheduling, layout, paint, and memory
4. identify the largest measured cost
5. change one thing
6. compare the same trace and user metric

Possible fixes:

- coalesce market updates
- move heavy pure calculations off the main thread
- normalize by stable ID
- avoid sorting the full list per tick
- virtualize rows
- reduce DOM depth
- narrow state subscriptions
- fix retained subscriptions or replay buffers

Metrics:

- message-to-visible latency
- long tasks
- dropped frames
- update throughput
- memory after repeated navigation
- active socket and subscription count

## Memory and lifetime

Do not start with `WeakRef` or a garbage-collector setting.

Ask:

- Who owns this object, the component, the route, the root injector, or the window?
- Is the consumer a template, TypeScript, or a side effect?
- Is the source cold HTTP, a shared socket, or a third-party widget?
- What happens on account change and on navigate-away?

A template-only stream belongs to `AsyncPipe` or the React equivalent of a hook that unsubscribes on unmount. A toast or chart teardown is a side effect and needs an explicit destroy callback. A quote cache keyed by instrument ID is a `Map` with eviction, not a `WeakMap`.

Prove it with heap snapshots after repeated navigation. The component class count should return to baseline. Unsubscription is not server rollback.

Framework-specific APIs are in [Angular memory handling](../angular/memory-handling.md).

## State-management choice

Do not answer with a library name first.

Ask:

- Is state local, feature-wide, or app-wide?
- Is it server cache, form draft, transport state, or durable user state?
- Must actions be replayed or audited?
- How many writers exist?
- What debugging problem are we solving?

A feature-local store may be enough. A reducer store helps when many writers, explicit actions, replayable transitions, and tooling justify its cost. Server state and client state need not use the same mechanism.

## Framework upgrade strategy

For a large older application:

1. inventory versions, unsupported dependencies, custom builders, and browser targets
2. establish tests and production telemetry
3. use official migrations or codemods in supported version steps
4. remove deprecated APIs in small changes
5. migrate feature boundaries before leaf syntax churn
6. measure bundle, startup, errors, and key journeys after each step

Do not combine framework upgrade, state rewrite, design-system replacement, and feature delivery in one release.

## Testing a trading frontend

Use a risk-based test pyramid:

- pure unit tests for P&L, margin display, normalization, and reducers
- scheduler tests for cancellation and ordering
- component tests for states and accessibility
- contract tests for wire parsing
- end-to-end tests for login, watchlist, order, timeout, reconciliation, and logout
- load tests for feed bursts

Property-based tests are useful for invariants:

- bid never exceeds ask after validation
- high is at least open, low, and close
- candle volume equals accepted tick quantity
- duplicate sequence does not change state
- drawdown remains between 0 and 1 for positive values

Snapshot tests alone are weak protection for financial behavior.

## Security discussion

Cover:

- runtime input validation
- output encoding and framework escaping
- strict handling of trusted HTML
- Content Security Policy and Trusted Types
- server-side authorization
- short-lived credentials and safe refresh
- account-state cleanup on logout
- no sensitive data in telemetry
- dependency and supply-chain controls

Do not claim route guards secure an endpoint. Do not claim hiding a button removes authorization need.

## Accessibility discussion

Fast financial UIs still need:

- keyboard-operable order forms
- stable focus through live updates
- labels and error association
- color-independent profit and loss indicators
- reduced-motion support
- controlled live-region announcements

Do not announce every quote tick to a screen reader. Announce meaningful state changes such as order accepted, rejected, connection stale, and validation errors.

## Code-review prompt

When shown unfamiliar code, review in this order:

1. What user or business behavior does it implement?
2. What inputs are untrusted?
3. What states are possible?
4. What mutates and who owns it?
5. What happens concurrently?
6. What happens on retry, timeout, or unsubscribe?
7. What are units and precision?
8. What is the complexity at expected scale?
9. What gets logged?
10. Which test would catch the worst failure?

Prioritize correctness and user risk over formatting.

## Senior behavioral prompts

Prepare one real story for each:

- changed your design after new evidence
- found a failure before users did
- handled an incident
- reduced frontend latency with measurement
- disagreed with product or backend constructively
- improved a weak module without stopping delivery
- mentored an engineer through a difficult problem
- owned a mistake

Use:

```text
Context:
Risk:
Your decision:
Evidence:
Result with a number:
What you would change:
```

Do not turn every story into a victory. A precise mistake and changed practice can show more seniority.

## Questions to ask interviewers

Choose three based on conversation:

- What correctness failures worry the frontend team most?
- How do snapshot and delta sequencing work in your market-data path?
- Which parts of order state are optimistic, and which wait for server confirmation?
- How do you measure message-to-screen latency?
- Where does the current frontend architecture create friction?
- How are frontend engineers involved in domain modeling with risk and trading teams?
- What does a strong first six months look like for this role?
- How does the team test disconnects, stale prices, and unknown order outcomes?

These questions expose real engineering work. Generic culture questions can wait.

## Deep-dive rehearsal list

Give a five-minute answer to each, then accept interruptions:

1. Design a real-time watchlist.
2. Design an order ticket that avoids duplicate orders.
3. Explain state ownership and async cancellation in one feature.
4. Diagnose a screen that freezes during volatile markets.
5. Handle WebSocket gaps and reconnects.
6. Represent prices and money safely.
7. Migrate a large frontend application.
8. Test a CFD trading flow.
9. Secure account-specific frontend state.
10. Explain one architecture decision you regret.
11. Explain how you would stop a trading screen from leaking after navigation.
