/**
 * Rewrite describeTrade with no any, no unchecked assertion, and exhaustive handling.
 * Treat input as external data. It may be malformed.
 */

export interface EquityTrade {
  readonly kind: 'equity';
  readonly symbol: string;
  readonly quantity: number;
}

export interface BondTrade {
  readonly kind: 'bond';
  readonly isin: string;
  readonly faceValue: number;
}

export type Trade = EquityTrade | BondTrade;

export function assertNever(x: never): never {
  throw new Error(`Unhandled trade: ${JSON.stringify(x)}`);
}

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null;
};

const parseTrade = (payload: unknown): Trade | null => {
  if (isRecord(payload)) {
    if (
      payload['kind'] === 'equity' &&
      typeof payload['symbol'] === 'string' &&
      typeof payload['quantity'] === 'number' &&
      Number.isFinite(payload['quantity'])
    ) {
      return {
        kind: payload['kind'],
        symbol: payload['symbol'],
        quantity: payload['quantity'],
      };
    }

    if (
      payload['kind'] === 'bond' &&
      typeof payload['isin'] === 'string' &&
      typeof payload['faceValue'] === 'number' &&
      Number.isFinite(payload['faceValue'])
    ) {
      return {
        kind: payload['kind'],
        isin: payload['isin'],
        faceValue: payload['faceValue'],
      };
    }
  }
  return null;
};

export function describeTrade(payload: unknown): string {
  const trade = parseTrade(payload);

  if (trade === null) {
    return 'Invalid trade payload';
  }
  switch (trade.kind) {
    case 'equity':
      return `${trade['symbol']}: ${trade['quantity']}`;
    case 'bond':
      return `${trade['isin']}: ${trade['faceValue']}`;
    default:
      assertNever(trade);
  }
}

export function runTradeBoundaryDemo(): readonly string[] {
  return [
    describeTrade({ kind: 'equity', symbol: 'ACME', quantity: 25 }),
    describeTrade({ kind: 'bond', isin: 'GB00TEST', faceValue: 1000 }),
    describeTrade({ kind: 'equity', symbol: 42, quantity: 'bad' }),
  ];
}
