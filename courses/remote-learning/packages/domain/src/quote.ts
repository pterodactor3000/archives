// sequence is per-symbol
// malformed input reported separately
// different update = different sequence, if exact same sequence is received again, it's ignored

export interface Quote {
  readonly symbol: string
  readonly bid: number
  readonly ask: number
  readonly sequence: number
  readonly decimalPlaces: number
}

export interface QuoteRow {
  readonly symbol: string
  readonly bid: string
  readonly ask: string
  readonly spread: string
}

export const SAMPLE_QUOTES: readonly Quote[] = [
  {
    symbol: 'EURUSD',
    bid: 1.08421,
    ask: 1.08429,
    sequence: 101,
    decimalPlaces: 5,
  },
  {
    symbol: 'GBPUSD',
    bid: 1.2654,
    ask: 1.2657,
    sequence: 88,
    decimalPlaces: 4,
  },
  {
    symbol: 'XAUUSD',
    bid: 2345.12,
    ask: 2345.28,
    sequence: 44,
    decimalPlaces: 2,
  },
]

interface MalformedQuote extends Quote {
  reason: string
}

let _malformedQuotes: Array<MalformedQuote> = []

export const getMalformedQuotes = () => _malformedQuotes

export const clearMalformedQuotes = () => {
  _malformedQuotes = []
}

export function formatQuotePrice(value: number, decimalPlaces: number): string {
  if (!Number.isFinite(value)) {
    throw new Error(
      `formatQuotePrice failed: value is not finite (${String(value)})`,
    )
  }

  if (!Number.isInteger(decimalPlaces) || decimalPlaces < 0) {
    throw new Error(
      `formatQuotePrice failed: decimalPlaces must be a non-negative integer (${String(decimalPlaces)})`,
    )
  }

  return value.toFixed(decimalPlaces)
}

export function getQuoteSpread(quote: Quote): number {
  return quote.ask - quote.bid
}

export function getQuoteRows(
  quotes: readonly Quote[] = SAMPLE_QUOTES,
): readonly QuoteRow[] {
  return getLatestQuotes(quotes).map((quote) => ({
    symbol: quote.symbol,
    bid: formatQuotePrice(quote.bid, quote.decimalPlaces),
    ask: formatQuotePrice(quote.ask, quote.decimalPlaces),
    spread: formatQuotePrice(getQuoteSpread(quote), quote.decimalPlaces),
  }))
}

export const getLatestQuotes = (quotes: readonly Quote[]): readonly Quote[] => {
  const quotesMap = new Map<string, Quote>()
  if (quotes.length === 0) {
    return []
  }

  for (let quote of quotes) {
    quoteReducer(quotesMap, quote)
  }

  return Array.from(quotesMap, ([symbol, quote]) => quote)
}

export const quoteReducer = (
  quotesMap: Map<string, Quote>,
  quote: Quote,
): void => {
  if (Number.isNaN(quote.ask)) {
    _malformedQuotes.push({
      ...quote,
      reason: `'ask' property is not a number: ${quote.ask}`,
    })
    return
  }

  if (Number.isNaN(quote.bid)) {
    _malformedQuotes.push({
      ...quote,
      reason: `'bid' property is not a number: ${quote.bid}`,
    })
    return
  }

  if (quote.ask < quote.bid) {
    _malformedQuotes.push({
      ...quote,
      reason: `'bid' property is higher than 'ask': ${quote.bid} > ${quote.ask}`,
    })
    return
  }

  if (quote.bid <= 0) {
    _malformedQuotes.push({
      ...quote,
      reason: `'bid' property is missing: ${quote.bid}`,
    })
    return
  }

  const mapped = quotesMap.get(quote.symbol)

  if (mapped === undefined) {
    quotesMap.set(quote.symbol, quote)
    return
  }

  if (mapped.sequence >= quote.sequence) {
    _malformedQuotes.push({
      ...quote,
      reason: `Sequence misaligned: existing ${mapped.sequence} & incoming ${quote.sequence}`,
    })
    return
  }

  return
}
