import { TaskReview } from '../../task.model';

const OPTIMAL_SOLUTION = `function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function parseTrade(payload: unknown): Trade | null {
  if (!isRecord(payload)) return null;
  if (payload.kind === 'equity' && typeof payload.symbol === 'string'
      && typeof payload.quantity === 'number' && Number.isFinite(payload.quantity)) {
    return { kind: 'equity', symbol: payload.symbol, quantity: payload.quantity };
  }
  if (payload.kind === 'bond' && typeof payload.isin === 'string'
      && typeof payload.faceValue === 'number' && Number.isFinite(payload.faceValue)) {
    return { kind: 'bond', isin: payload.isin, faceValue: payload.faceValue };
  }
  return null;
}

function describeTrade(payload: unknown): string {
  const trade = parseTrade(payload);
  if (trade === null) return 'Invalid trade payload';
  switch (trade.kind) {
    case 'equity': return \`\${trade.symbol}: \${trade.quantity}\`;
    case 'bond': return \`\${trade.isin}: \${trade.faceValue}\`;
    default: {
      const unhandledTrade: never = trade;
      throw new Error(\`Unhandled trade: \${JSON.stringify(unhandledTrade)}\`);
    }
  }
}`;

export const tradeBoundaryReview: TaskReview = {
  status: 'reviewed',
  score: 3,
  criticism:
    'All required behavior is present. External data remains unknown until every variant-specific field is validated, malformed data has a clear result, and assertNever now makes the switch exhaustive at compile time.',
  improvements: [
    'Prefer dot access such as trade.symbol after validation because Trade is trusted domain data.',
    'An early return when payload is not a record would reduce one nesting level in parseTrade.',
  ],
  optimalSolution: OPTIMAL_SOLUTION,
};
