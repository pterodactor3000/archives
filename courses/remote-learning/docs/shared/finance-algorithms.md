# Finance algorithms in TypeScript

These are useful interview algorithms for a trading frontend. They test rolling state, ordering, precision, and edge cases. They are not a broker's full pricing or risk engine.

Examples use `number` so the algorithm stays visible. Production cash, fees, prices, and quantities need the product's decimal representation and rounding policy.

## Priority order

Learn these first:

1. rolling average
2. OHLC candle aggregation
3. VWAP
4. executable-side P&L
5. order-book updates
6. returns and online volatility
7. maximum drawdown
8. RSI

Do not spend frontend preparation time memorizing Black-Scholes or Monte Carlo simulation unless the role description names options pricing or quantitative development.

## Shared validation

```typescript
function assertFiniteNumber(value: number, name: string): void {
  if (!Number.isFinite(value)) {
    throw new Error(`${name} must be finite, received ${value}`);
  }
}

function assertPositiveInteger(value: number, name: string): void {
  if (!Number.isInteger(value) || value <= 0) {
    throw new Error(`${name} must be a positive integer, received ${value}`);
  }
}
```

In a timed interview, validate assumptions explicitly even if you do not build a complete validation layer.

## Simple moving average

For each full window:

```text
SMA = sum(window values) / window size
```

A naive implementation sums every window in O(n × window). Keep a rolling sum for O(n) time.

```typescript
function calculateSimpleMovingAverage(
  values: readonly number[],
  windowSize: number,
): number[] {
  assertPositiveInteger(windowSize, "windowSize");

  if (windowSize > values.length) {
    return [];
  }

  let windowSum = 0;
  for (let index = 0; index < windowSize; index += 1) {
    const value = values[index];
    if (value === undefined) {
      throw new Error(
        `Cannot calculate SMA: missing value at index ${index}`,
      );
    }
    assertFiniteNumber(value, `values[${index}]`);
    windowSum += value;
  }

  const averages = [windowSum / windowSize];

  for (let index = windowSize; index < values.length; index += 1) {
    const incoming = values[index];
    const outgoing = values[index - windowSize];
    if (incoming === undefined || outgoing === undefined) {
      throw new Error(
        `Cannot calculate SMA: missing rolling value at index ${index}`,
      );
    }
    assertFiniteNumber(incoming, `values[${index}]`);
    windowSum += incoming - outgoing;
    averages.push(windowSum / windowSize);
  }

  return averages;
}
```

Complexity is O(n) time and O(n - window + 1) output space. Streaming input needs only O(window) retained values, often through a ring buffer.

Interview traps:

- window zero or negative
- window larger than input
- recomputing every sum
- rounding each intermediate value
- unclear behavior before a full window exists

## Exponential moving average

```text
alpha = 2 / (period + 1)
EMA[t] = alpha × value[t] + (1 - alpha) × EMA[t - 1]
```

```typescript
function calculateExponentialMovingAverage(
  values: readonly number[],
  period: number,
): number[] {
  assertPositiveInteger(period, "period");

  const first = values[0];
  if (first === undefined) {
    return [];
  }
  assertFiniteNumber(first, "values[0]");

  const alpha = 2 / (period + 1);
  const averages = [first];

  for (let index = 1; index < values.length; index += 1) {
    const value = values[index];
    const previous = averages[index - 1];
    if (value === undefined || previous === undefined) {
      throw new Error(
        `Cannot calculate EMA: missing input at index ${index}`,
      );
    }
    assertFiniteNumber(value, `values[${index}]`);
    averages.push(alpha * value + (1 - alpha) * previous);
  }

  return averages;
}
```

This seeds with the first observation. Another common convention seeds with an initial SMA. State the convention because outputs differ.

## OHLC candle aggregation

One candle contains:

- open: first price in interval
- high: maximum price
- low: minimum price
- close: last price
- volume: summed quantity

```typescript
interface TradeTick {
  readonly timestampMilliseconds: number;
  readonly price: number;
  readonly quantity: number;
}

interface Candle {
  readonly startTimeMilliseconds: number;
  readonly open: number;
  readonly high: number;
  readonly low: number;
  readonly close: number;
  readonly volume: number;
}

function aggregateCandles(
  ticks: readonly TradeTick[],
  intervalMilliseconds: number,
): Candle[] {
  assertPositiveInteger(intervalMilliseconds, "intervalMilliseconds");

  const candles: Candle[] = [];
  let currentCandle: Candle | undefined;
  let previousTimestamp = Number.NEGATIVE_INFINITY;

  for (const tick of ticks) {
    validateTradeTick(tick);
    if (tick.timestampMilliseconds < previousTimestamp) {
      throw new Error(
        `Cannot aggregate candles: tick ${tick.timestampMilliseconds} came after ${previousTimestamp}`,
      );
    }
    previousTimestamp = tick.timestampMilliseconds;

    const startTimeMilliseconds =
      Math.floor(tick.timestampMilliseconds / intervalMilliseconds) *
      intervalMilliseconds;

    if (
      currentCandle === undefined ||
      currentCandle.startTimeMilliseconds !== startTimeMilliseconds
    ) {
      currentCandle = {
        startTimeMilliseconds,
        open: tick.price,
        high: tick.price,
        low: tick.price,
        close: tick.price,
        volume: tick.quantity,
      };
      candles.push(currentCandle);
      continue;
    }

    currentCandle = {
      ...currentCandle,
      high: Math.max(currentCandle.high, tick.price),
      low: Math.min(currentCandle.low, tick.price),
      close: tick.price,
      volume: currentCandle.volume + tick.quantity,
    };
    candles[candles.length - 1] = currentCandle;
  }

  return candles;
}

function validateTradeTick(tick: TradeTick): void {
  assertFiniteNumber(
    tick.timestampMilliseconds,
    "tick.timestampMilliseconds",
  );
  assertFiniteNumber(tick.price, "tick.price");
  assertFiniteNumber(tick.quantity, "tick.quantity");

  if (tick.price <= 0 || tick.quantity < 0) {
    throw new Error(
      `Cannot aggregate trade tick at ${tick.timestampMilliseconds}: price ${tick.price} or quantity ${tick.quantity} is out of range`,
    );
  }
}
```

Policy questions:

- Which timezone and epoch define buckets?
- Can ticks be late?
- Do empty intervals produce no candle or a flat candle?
- Are prices trades, mids, bids, or asks?
- Can corrections replace earlier ticks?

This implementation requires ordered input. Production streaming systems usually use event-time windows and a lateness policy.

## Volume-weighted average price

```text
VWAP = Σ(price × quantity) / Σ(quantity)
```

```typescript
interface Execution {
  readonly price: number;
  readonly quantity: number;
}

function calculateVolumeWeightedAveragePrice(
  executions: readonly Execution[],
): number | null {
  let notional = 0;
  let totalQuantity = 0;

  for (const execution of executions) {
    assertFiniteNumber(execution.price, "execution.price");
    assertFiniteNumber(execution.quantity, "execution.quantity");
    if (execution.price <= 0 || execution.quantity <= 0) {
      throw new Error(
        `Cannot calculate VWAP: price ${execution.price}, quantity ${execution.quantity}`,
      );
    }

    notional += execution.price * execution.quantity;
    totalQuantity += execution.quantity;
  }

  return totalQuantity === 0 ? null : notional / totalQuantity;
}
```

Do not average fill prices without weighting by quantity.

Market VWAP often means a session benchmark over market trades. Order VWAP means average execution price for one order. Name which one you calculate.

## Time-weighted average price

For equally spaced observations:

```text
TWAP = arithmetic mean of sampled prices
```

For irregular observations, weight each price by the time it remained active:

```text
TWAP = Σ(price × duration) / total duration
```

```typescript
interface TimedPrice {
  readonly timestampMilliseconds: number;
  readonly price: number;
}

function calculateTimeWeightedAveragePrice(
  prices: readonly TimedPrice[],
  endTimeMilliseconds: number,
): number | null {
  const first = prices[0];
  if (first === undefined) {
    return null;
  }
  assertFiniteNumber(
    first.timestampMilliseconds,
    "prices[0].timestampMilliseconds",
  );
  assertFiniteNumber(first.price, "prices[0].price");
  assertFiniteNumber(endTimeMilliseconds, "endTimeMilliseconds");
  if (first.price <= 0) {
    throw new Error(
      `Cannot calculate TWAP: first price ${first.price} must be positive`,
    );
  }
  if (endTimeMilliseconds <= first.timestampMilliseconds) {
    throw new Error(
      `Cannot calculate TWAP: end ${endTimeMilliseconds} must follow start ${first.timestampMilliseconds}`,
    );
  }

  let weightedSum = 0;
  let previous = first;

  for (let index = 1; index < prices.length; index += 1) {
    const current = prices[index];
    if (current === undefined) {
      throw new Error(
        `Cannot calculate TWAP: missing price at index ${index}`,
      );
    }
    assertFiniteNumber(
      current.timestampMilliseconds,
      `prices[${index}].timestampMilliseconds`,
    );
    assertFiniteNumber(current.price, `prices[${index}].price`);
    if (current.timestampMilliseconds < previous.timestampMilliseconds) {
      throw new Error(
        `Cannot calculate TWAP: timestamp ${current.timestampMilliseconds} precedes ${previous.timestampMilliseconds}`,
      );
    }
    if (
      current.timestampMilliseconds > endTimeMilliseconds ||
      current.price <= 0
    ) {
      throw new Error(
        `Cannot calculate TWAP at index ${index}: price ${current.price}, timestamp ${current.timestampMilliseconds}`,
      );
    }

    weightedSum +=
      previous.price *
      (current.timestampMilliseconds - previous.timestampMilliseconds);
    previous = current;
  }

  weightedSum +=
    previous.price *
    (endTimeMilliseconds - previous.timestampMilliseconds);
  return (
    weightedSum /
    (endTimeMilliseconds - first.timestampMilliseconds)
  );
}
```

This assumes piecewise-constant prices and no data gaps. A real benchmark needs session and stale-data rules.

## Executable-side unrealized P&L

```typescript
type PositionSide = "long" | "short";

interface ProfitAndLossInput {
  readonly side: PositionSide;
  readonly entryPrice: number;
  readonly bid: number;
  readonly ask: number;
  readonly quantity: number;
  readonly contractMultiplier: number;
}

function calculateUnrealizedProfitAndLoss(
  input: ProfitAndLossInput,
): number {
  const {
    side,
    entryPrice,
    bid,
    ask,
    quantity,
    contractMultiplier,
  } = input;

  for (const [name, value] of Object.entries({
    entryPrice,
    bid,
    ask,
    quantity,
    contractMultiplier,
  })) {
    assertFiniteNumber(value, name);
  }

  if (bid > ask || quantity < 0 || contractMultiplier <= 0) {
    throw new Error(
      `Cannot calculate P&L: bid ${bid}, ask ${ask}, quantity ${quantity}, multiplier ${contractMultiplier}`,
    );
  }

  const exitPrice = side === "long" ? bid : ask;
  const direction = side === "long" ? 1 : -1;
  const priceChange = direction * (exitPrice - entryPrice);

  return priceChange * quantity * contractMultiplier;
}
```

The result is before fees, financing, and account-currency conversion.

Interview traps:

- marking both sides at mid without naming that choice
- using ask to close a long
- losing contract multiplier
- ignoring account currency
- mixing gross and net P&L

## Order-book updates

This simple model stores aggregated quantity by price level.

```typescript
type BookSide = "bid" | "ask";

interface BookUpdate {
  readonly side: BookSide;
  readonly priceTicks: bigint;
  readonly quantityUnits: bigint;
  readonly sequence: bigint;
}

interface OrderBook {
  readonly bids: ReadonlyMap<bigint, bigint>;
  readonly asks: ReadonlyMap<bigint, bigint>;
  readonly sequence: bigint;
}

function applyBookUpdate(
  book: OrderBook,
  update: BookUpdate,
): OrderBook {
  if (update.sequence !== book.sequence + 1n) {
    throw new Error(
      `Order-book sequence gap: expected ${book.sequence + 1n}, received ${update.sequence}`,
    );
  }
  if (update.priceTicks <= 0n || update.quantityUnits < 0n) {
    throw new Error(
      `Cannot apply order-book update: price ${update.priceTicks}, quantity ${update.quantityUnits}`,
    );
  }

  const bids = new Map(book.bids);
  const asks = new Map(book.asks);
  const target = update.side === "bid" ? bids : asks;

  if (update.quantityUnits === 0n) {
    target.delete(update.priceTicks);
  } else {
    target.set(update.priceTicks, update.quantityUnits);
  }

  return {
    bids,
    asks,
    sequence: update.sequence,
  };
}

interface PriceLevel {
  readonly priceTicks: bigint;
  readonly quantityUnits: bigint;
}

function getTopLevels(
  book: OrderBook,
  side: BookSide,
  depth: number,
): PriceLevel[] {
  assertPositiveInteger(depth, "depth");

  const levels = [...(side === "bid" ? book.bids : book.asks)].map(
    ([priceTicks, quantityUnits]) => ({ priceTicks, quantityUnits }),
  );

  levels.sort((left, right) => {
    if (left.priceTicks === right.priceTicks) {
      return 0;
    }
    if (side === "bid") {
      return left.priceTicks > right.priceTicks ? -1 : 1;
    }
    return left.priceTicks < right.priceTicks ? -1 : 1;
  });

  return levels.slice(0, depth);
}
```

Sorting all levels costs O(m log m). That is acceptable for a small interview solution. A production deep book may use a sorted tree, heap plus index, or server-provided top levels.

Snapshot and delta protocol matters more than the container:

1. obtain snapshot at sequence `s`
2. discard deltas at or before `s`
3. apply each later delta without a gap
4. resynchronize on a gap

## Returns

```typescript
function calculateSimpleReturns(prices: readonly number[]): number[] {
  const returns: number[] = [];

  for (let index = 0; index < prices.length; index += 1) {
    const price = prices[index];
    if (price === undefined || !Number.isFinite(price) || price <= 0) {
      throw new Error(
        `Cannot calculate returns: price ${String(price)} at index ${index} must be finite and positive`,
      );
    }
  }

  for (let index = 1; index < prices.length; index += 1) {
    const previous = prices[index - 1];
    const current = prices[index];
    if (previous === undefined || current === undefined) {
      throw new Error(
        `Cannot calculate return: missing pair at index ${index}`,
      );
    }
    returns.push(current / previous - 1);
  }

  return returns;
}

function calculateLogReturns(prices: readonly number[]): number[] {
  return calculateSimpleReturns(prices).map((value) =>
    Math.log1p(value),
  );
}
```

`Math.log1p` is accurate for values near zero. Log returns require positive prices.

## Online mean and volatility

Welford's algorithm updates mean and variance in one pass without retaining every value.

```typescript
interface RunningStatistics {
  readonly count: number;
  readonly mean: number | null;
  readonly sampleVariance: number | null;
  readonly sampleStandardDeviation: number | null;
}

function calculateRunningStatistics(
  values: readonly number[],
): RunningStatistics {
  let count = 0;
  let mean = 0;
  let sumSquaredDifference = 0;

  for (const value of values) {
    assertFiniteNumber(value, "statistics value");
    count += 1;
    const difference = value - mean;
    mean += difference / count;
    const nextDifference = value - mean;
    sumSquaredDifference += difference * nextDifference;
  }

  if (count === 0) {
    return {
      count,
      mean: null,
      sampleVariance: null,
      sampleStandardDeviation: null,
    };
  }

  if (count === 1) {
    return {
      count,
      mean,
      sampleVariance: null,
      sampleStandardDeviation: null,
    };
  }

  const sampleVariance = sumSquaredDifference / (count - 1);
  return {
    count,
    mean,
    sampleVariance,
    sampleStandardDeviation: Math.sqrt(sampleVariance),
  };
}
```

Annualized volatility is periodic standard deviation multiplied by the square root of periods per year. The period and market calendar are part of the contract.

## Maximum drawdown

This version returns drawdown as a positive loss fraction. It requires a positive initial value. A later zero is valid and produces a total drawdown of 1.

```typescript
interface Drawdown {
  readonly fraction: number;
  readonly peakIndex: number;
  readonly troughIndex: number;
}

function calculateMaximumDrawdown(
  values: readonly number[],
): Drawdown | null {
  const first = values[0];
  if (first === undefined) {
    return null;
  }
  if (!Number.isFinite(first) || first <= 0) {
    throw new Error(
      `Cannot calculate drawdown: initial value ${first} must be finite and positive`,
    );
  }

  let peakValue = first;
  let peakIndex = 0;
  let result: Drawdown = {
    fraction: 0,
    peakIndex: 0,
    troughIndex: 0,
  };

  for (let index = 1; index < values.length; index += 1) {
    const value = values[index];
    if (value === undefined || !Number.isFinite(value) || value < 0) {
      throw new Error(
        `Cannot calculate drawdown: value ${String(value)} at index ${index} must be finite and nonnegative`,
      );
    }

    if (value > peakValue) {
      peakValue = value;
      peakIndex = index;
      continue;
    }

    const fraction = (peakValue - value) / peakValue;
    if (fraction > result.fraction) {
      result = { fraction, peakIndex, troughIndex: index };
    }
  }

  return result;
}
```

Complexity is O(n) time and O(1) extra space.

## Relative strength index

RSI commonly uses Wilder's smoothed average gains and losses.

```text
relativeStrength = averageGain / averageLoss
RSI = 100 - 100 / (1 + relativeStrength)
```

```typescript
interface IndicatorPoint {
  readonly index: number;
  readonly value: number;
}

function calculateRelativeStrengthIndex(
  closes: readonly number[],
  period = 14,
): IndicatorPoint[] {
  assertPositiveInteger(period, "period");
  for (let index = 0; index < closes.length; index += 1) {
    const close = closes[index];
    if (close === undefined || !Number.isFinite(close) || close <= 0) {
      throw new Error(
        `Cannot calculate RSI: close ${String(close)} at index ${index} must be finite and positive`,
      );
    }
  }
  if (closes.length <= period) {
    return [];
  }

  let averageGain = 0;
  let averageLoss = 0;

  for (let index = 1; index <= period; index += 1) {
    const previous = closes[index - 1];
    const current = closes[index];
    if (previous === undefined || current === undefined) {
      throw new Error(
        `Cannot calculate RSI: missing close at index ${index}`,
      );
    }
    const change = current - previous;
    averageGain += Math.max(change, 0);
    averageLoss += Math.max(-change, 0);
  }

  averageGain /= period;
  averageLoss /= period;

  const points: IndicatorPoint[] = [
    {
      index: period,
      value: calculateRelativeStrengthIndexValue(
        averageGain,
        averageLoss,
      ),
    },
  ];

  for (let index = period + 1; index < closes.length; index += 1) {
    const previous = closes[index - 1];
    const current = closes[index];
    if (previous === undefined || current === undefined) {
      throw new Error(
        `Cannot calculate RSI: missing close at index ${index}`,
      );
    }

    const change = current - previous;
    const gain = Math.max(change, 0);
    const loss = Math.max(-change, 0);
    averageGain = (averageGain * (period - 1) + gain) / period;
    averageLoss = (averageLoss * (period - 1) + loss) / period;
    points.push({
      index,
      value: calculateRelativeStrengthIndexValue(
        averageGain,
        averageLoss,
      ),
    });
  }

  return points;
}

function calculateRelativeStrengthIndexValue(
  averageGain: number,
  averageLoss: number,
): number {
  if (averageGain === 0 && averageLoss === 0) {
    return 50;
  }
  if (averageLoss === 0) {
    return 100;
  }

  const relativeStrength = averageGain / averageLoss;
  return 100 - 100 / (1 + relativeStrength);
}
```

Flat-series handling varies. This implementation returns 50. State the policy.

## How to discuss each algorithm

For every implementation, explain:

```text
Input contract:
Numeric representation:
Ordering assumption:
Empty-input behavior:
Time complexity:
Space complexity:
Production limitation:
```

Example:

> Candle aggregation is O(n) for ordered ticks. The hard part is not min and max. It is event time, late data, corrections, session boundaries, and numeric precision. I isolated ordered aggregation first and would put lateness policy at the stream boundary.
