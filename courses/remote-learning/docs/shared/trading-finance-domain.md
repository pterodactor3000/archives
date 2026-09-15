# Trading and finance domain

Financial frontends can cover leveraged brokers, banks, stock markets, crypto venues, payments, or several of them at once. The same words, such as balance, order, price, and position, can carry different rules in each product.

Do not present formulas as universal business rules. Contract size, margin tiers, currency conversion, fees, close-out logic, and rounding come from the instrument and account specification.

Primary references:

- [FCA explanation of high-risk investments](https://www.fca.org.uk/investsmart/understanding-high-risk-investments)
- [FCA contract for differences](https://www.fca.org.uk/firms/contract-for-differences)
- [SEC guide to order types](https://www.investor.gov/introduction-investing/investing-basics/how-stock-markets-work/types-orders)
- [SEC trade execution](https://www.investor.gov/introduction-investing/investing-basics/how-stock-markets-work/executing-order)
- [Federal Reserve payment, clearing, and settlement systems](https://www.federalreserve.gov/paymentsystems.htm)
- [CFTC virtual-currency trading risks](https://www.cftc.gov/LearnAndProtect/AdvisoriesAndArticles/understand_risks_of_virtual_currency.html)

## Core vocabulary

### Instrument

A tradeable contract with an identifier and rules:

- symbol and venue
- asset class
- quote currency
- price precision and tick size
- quantity step and minimum
- contract multiplier
- market hours
- margin schedule

Never infer all rules from a symbol string.

### Quote

A two-sided price:

- bid: price at which the client can sell
- ask or offer: price at which the client can buy
- mid: `(bid + ask) / 2`
- spread: `ask - bid`
- spread in basis points: `spread / mid * 10_000`

Validate `bid <= ask`, finite values, timestamp, instrument ID, and sequence.

### Order

An instruction to trade under stated conditions.

Common types:

- market order: execute at the best available current price, with no exact price guarantee
- limit order: execute at the limit price or better
- stop order: activate after a trigger, then follow its configured execution rule
- stop-loss: reduce loss by closing at or after a trigger
- take-profit: close after a favorable target
- trailing stop: move the trigger with favorable market movement

Guaranteed stop behavior, availability, distance, and fees are broker-specific.

### Position

Current economic exposure after executions. An order is intent. A fill is an execution. A position is resulting exposure.

One order may receive:

- no fill
- one fill
- partial fills
- fills at different prices
- rejection
- cancellation
- a race between fill and cancellation

The UI needs a state machine, not one `isFilled` boolean.

## CFD model

A contract for difference tracks the price change of an underlying market without transferring ownership of that underlying asset. A long position benefits from a price rise. A short position benefits from a price fall, before costs.

### Notional exposure

Generic form:

```text
notional = price × quantity × contractMultiplier
```

The result is in the instrument's valuation currency before account-currency conversion.

### Initial margin

Simple form:

```text
requiredMargin = notional × marginRate
marginRate = 1 / leverage
```

Real systems may apply tiered rates, different rules by asset class, and regulatory limits. Existing positions, pending orders, currency conversion, and price movement can alter available margin.

### Unrealized P&L

For a long:

```text
unrealizedProfitAndLoss = (exitPrice - entryPrice) × quantity × contractMultiplier
```

For a short:

```text
unrealizedProfitAndLoss = (entryPrice - exitPrice) × quantity × contractMultiplier
```

A conservative close valuation usually uses the executable side:

- long closes by selling at bid
- short closes by buying at ask

Then convert P&L into account currency using the specified FX side and timestamp.

### Equity and margin level

A common model:

```text
equity = cashBalance + unrealizedProfitAndLoss
freeMargin = equity - usedMargin
marginLevelPercent = equity / usedMargin × 100
```

Handle `usedMargin = 0` explicitly. Broker definitions and close-out thresholds are authoritative.

### Costs

Possible costs include:

- bid-ask spread
- commission
- overnight financing
- guaranteed stop premium
- currency conversion
- market-data or exchange fees in some products

Do not mix gross and net P&L. Label both.

## Marking and valuation

One position can have several relevant prices:

- entry price
- current bid
- current ask
- mid price
- last traded price
- official close
- settlement price

Ask which price drives display, margin, P&L, and risk. They need not match.

## Price and quantity precision

Finance code needs three separate ideas:

- storage scale
- calculation precision
- display precision

Tick size controls valid price increments. Quantity step controls valid order sizes. Currency display decimals do not define calculation precision.

Example:

```text
BTCUSD price: 63,000.25
storage scale: 2 decimal places
stored ticks: 6,300,025
```

If the instrument later supports another scale, hard-coded cents fail. Carry scale in instrument metadata.

Define rounding at each boundary:

- reject values not on a tick
- round display only
- round fees by fee policy
- round converted cash by settlement policy

## Market-data correctness

A market tick needs more than price:

```typescript
interface MarketTick {
  readonly instrumentId: string;
  readonly bidTicks: bigint;
  readonly askTicks: bigint;
  readonly sequence: bigint;
  readonly eventTime: number;
  readonly receivedTime: number;
}
```

Sequence and timestamps solve different problems:

- sequence detects gaps, duplicates, and ordering within a stream
- event time says when the source created the event
- received time supports latency measurement

On reconnect:

1. Mark displayed data stale.
2. Reauthenticate if needed.
3. Request a fresh snapshot.
4. Buffer or reject deltas until snapshot sequence is known.
5. Apply later deltas in sequence.
6. Detect gaps and resynchronize.

Never silently show old prices as live.

## Order-state model

One possible client model:

```text
draft
validating
submitting
accepted
partiallyFilled
filled
cancelPending
cancelled
rejected
expired
unknownOutcome
```

`unknownOutcome` matters. A network timeout after submission does not prove rejection. Query by client order ID or idempotency key before letting the user repeat the action.

## Idempotency

Financial commands must tolerate retries.

Client sends a unique idempotency key:

```text
account + action + generated request ID
```

Server stores the result against that key. Repeating the same key returns the original outcome instead of creating a second transfer or order.

The client must not reuse one key for a different payload.

## Banking model

### Ledger before balance

A balance is a derived view over entries. A double-entry ledger records equal debit and credit totals for each transaction.

Useful distinctions:

- posted balance: settled ledger entries
- pending or held amount: authorized but not posted
- available balance: amount available under account policy
- value date: date used for interest or economic effect
- booking date: date recorded by the system

Never "fix" a balance by overwriting it. Post a correcting entry with an audit trail.

### Transfer state

Typical states:

```text
created
authorized
reserved
submitted
settled
failed
reversed
```

A failure after external submission may have an unknown result. Reconciliation is part of correctness.

### Exactly once

Distributed systems rarely provide magical exactly-once execution. Build an effectively-once business outcome from:

- idempotency keys
- durable state transitions
- transactional writes where possible
- outbox or inbox patterns
- reconciliation

## Stock-market model

### Exchange and broker

An exchange matches orders. A broker routes or executes client instructions. A quote provider distributes market data. One company may perform several roles, but keep them conceptually separate.

### Order book

An order book has price levels:

- bids sorted highest first
- asks sorted lowest first
- quantity aggregated at each level

Best bid below best ask is a normal positive spread. A crossed book may indicate an auction, stale data, different venues, or bad normalization.

### Trading sessions

Prices and valid actions depend on market state:

- pre-open
- auction
- continuous trading
- halted
- closed
- after-hours

The UI should consume market status from the backend. A local clock alone cannot know exchange halts or holidays.

### Corporate actions

Splits, dividends, symbol changes, mergers, and delistings affect historical charts and positions. State whether displayed history is raw or adjusted.

### Settlement

Trade execution and legal settlement are different events. Settlement cycles depend on market and product. Do not hard-code one global rule.

## Crypto model

### Spot and derivative are different

Crypto spot trading transfers or credits the asset. A crypto CFD gives price exposure without client ownership of that coin.

### Continuous market

Many crypto venues trade continuously, but the service still has maintenance, outages, instrument suspensions, and venue-specific rules.

### Venue fragmentation

There is no single universal BTC price. Each venue has its own order book. An index or mark price needs a documented source and outlier policy.

### Custody and chain state

For on-chain assets, separate:

- exchange account balance
- wallet balance
- pending deposit
- confirmations
- spendable balance
- withdrawal state

Blockchain confirmation is probabilistic and chain-specific. A transaction ID does not prove final settlement.

### Precision

Token quantities can have many decimal places. JavaScript `number` is unsuitable for exact token accounting.

## Risk measures worth knowing

### Simple return

```text
return = currentPrice / previousPrice - 1
```

### Log return

```text
logReturn = ln(currentPrice / previousPrice)
```

Log returns add across time but require positive prices.

### Volatility

Sample standard deviation of periodic returns:

```text
variance = Σ(return - mean)² / (n - 1)
volatility = sqrt(variance)
annualizedVolatility = periodicVolatility × sqrt(periodsPerYear)
```

The annualization factor depends on data frequency and market calendar. Crypto and equities should not blindly share one constant.

### Maximum drawdown

For portfolio value over time:

```text
drawdown = currentValue / highestPriorValue - 1
maximumDrawdown = most negative drawdown
```

State whether deposits and withdrawals are removed from the performance series.

### Value at Risk

Know the concept, not only a formula. Historical VaR at 95% estimates a loss threshold exceeded in roughly 5% of observations under the chosen historical sample. It is not a maximum possible loss and depends heavily on model and data assumptions.

## Frontend failure modes with financial impact

- duplicate submit creates duplicate exposure
- stale quote appears live
- long P&L uses ask instead of bid without explanation
- zero is treated as missing
- local timezone moves a candle into the wrong session
- decimal rounding changes order size
- old account data survives logout
- a reconnect misses sequence gaps
- optimistic order status remains after server rejection
- logs contain account details or tokens

Senior frontend work includes these correctness risks. It is not only component structure.

## Questions to ask a domain expert

1. What is the source of truth for each displayed price?
2. Which side marks long and short positions?
3. Which timezone defines candles and sessions?
4. How do sequence numbers behave across reconnects?
5. What precision and rounding apply to price, quantity, fees, and FX?
6. What does a timeout after order submission mean?
7. Which order changes are amendments, and which are cancel-replace?
8. How are partial fills represented?
9. What margin rules and tiers apply?
10. When should the UI label data stale or trading unavailable?
