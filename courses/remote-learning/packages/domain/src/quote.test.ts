import { beforeEach, describe, expect, it } from 'vitest'
import {
  clearMalformedQuotes,
  formatQuotePrice,
  getLatestQuotes,
  getMalformedQuotes,
  getQuoteRows,
  getQuoteSpread,
  SAMPLE_QUOTES,
  type Quote,
} from './quote.js'
import { registerConsoleShortcuts } from 'vitest/node'

const TEST_QUOTES: Quote[] = [
  {
    symbol: 'XAUUSD',
    bid: 2345.12,
    ask: 2345.28,
    sequence: 12,
    decimalPlaces: 2,
  },
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
    bid: 345.1,
    ask: 23.2,
    sequence: 44,
    decimalPlaces: 2,
  },
  {
    symbol: 'EURUSD',
    bid: 1.08421,
    ask: 1.08429,
    sequence: 99,
    decimalPlaces: 5,
  },
  {
    symbol: 'GBPUSD',
    bid: 1.2654,
    ask: 1.2657,
    sequence: 84,
    decimalPlaces: 4,
  },
  {
    symbol: 'GBPUSD',
    bid: 1.2654,
    ask: NaN,
    sequence: 84,
    decimalPlaces: 4,
  },
  {
    symbol: 'XAUUSD',
    bid: 0,
    ask: 2345.28,
    sequence: 12,
    decimalPlaces: 2,
  },
]

describe('formatQuotePrice', () => {
  it('formats a finite price to the requested decimal places', () => {
    expect(formatQuotePrice(1.08421, 5)).toEqual('1.08421')
  })

  it('rejects a non-finite value', () => {
    expect(() => formatQuotePrice(Number.NaN, 2)).toThrow(
      'formatQuotePrice failed: value is not finite (NaN)',
    )
  })

  it('rejects a negative decimalPlaces value', () => {
    expect(() => formatQuotePrice(1, -1)).toThrow(
      'formatQuotePrice failed: decimalPlaces must be a non-negative integer (-1)',
    )
  })
})

describe('getQuoteSpread', () => {
  it('returns ask minus bid', () => {
    expect(
      getQuoteSpread({
        symbol: 'TEST',
        bid: 100,
        ask: 103,
        sequence: 1,
        decimalPlaces: 0,
      }),
    ).toEqual(3)
  })

  it('keeps three sample instruments for the playground boards', () => {
    expect(SAMPLE_QUOTES.map((quote) => quote.symbol)).toEqual([
      'EURUSD',
      'GBPUSD',
      'XAUUSD',
    ])
  })
})

describe('getQuoteRows', () => {
  it('formats the EURUSD sample bid to five decimal places', () => {
    const euroDollar = getQuoteRows().find((row) => row.symbol === 'EURUSD')
    expect(euroDollar?.bid).toEqual('1.08421')
  })
})

describe('getLatestQuotes', () => {
  beforeEach(() => {
    clearMalformedQuotes()
  })
  it('should handle empty inputs', () => {
    const result = getLatestQuotes([])

    expect(result.length).toBe(0)
  })

  it('should handle one symbol', () => {
    const quote = TEST_QUOTES[0]
    const result = getLatestQuotes([quote!])

    expect(result.length).toBe(1)
  })
  it('should handle interleaved symbols', () => {
    const quotes = TEST_QUOTES.slice(0, 3)
    const result = getLatestQuotes(quotes)

    expect(result.length).toBe(3)
  })
  it('should handle duplicated sequence', () => {
    const quotes = TEST_QUOTES.slice(0, 5)
    const result = getLatestQuotes(quotes)

    expect(result.length).toBe(3)
    expect(getMalformedQuotes().length).toBeTruthy()
  })
  it('should handle late sequence', () => {
    const quotes = TEST_QUOTES.slice(0, 5)
    const result = getLatestQuotes(quotes)

    expect(result.length).toBe(3)
    expect(
      result.find((quote) => quote.symbol === quotes[4]?.symbol)?.sequence,
    ).not.toEqual(quotes[4]?.sequence)
    expect(getMalformedQuotes().length).toBeTruthy()
    expect(getMalformedQuotes()[1]?.reason).toContain(`Sequence misaligned`)
  })
  it('should handle ask smaller than bid', () => {
    const quote = TEST_QUOTES[3]
    const result = getLatestQuotes([quote!])

    expect(result.length).toBe(0)
    expect(getMalformedQuotes().length).toBeTruthy()
    expect(getMalformedQuotes()[0]?.reason).toContain(
      `'bid' property is higher than 'ask'`,
    )
  })
  it('should handle NaN', () => {
    const quote = TEST_QUOTES[6]
    const result = getLatestQuotes([quote!])

    expect(result.length).toBe(0)
    expect(getMalformedQuotes().length).toBeTruthy()
    expect(getMalformedQuotes()[0]?.reason).toContain(
      `property is not a number`,
    )
  })
  it('should handle no bid', () => {
    const quote = TEST_QUOTES[7]
    const result = getLatestQuotes([quote!])

    expect(result.length).toBe(0)
    expect(getMalformedQuotes().length).toBeTruthy()
    expect(getMalformedQuotes()[0]?.reason).toContain(
      `'bid' property is missing:`,
    )
  })
})
