interface RawPosition {
  readonly instrument: string;
  readonly lots: readonly number[];
}

export interface PositionSummary {
  readonly instrument: string;
  readonly quantity: number;
}

export function summarizePositions(positions: readonly RawPosition[]): readonly PositionSummary[] {
  // TODO: Produce one summary per position without mutating positions or lots.
  void positions;
  return [];
}

export function runTypeScriptQualityDemo(): readonly string[] {
  const positions: readonly RawPosition[] = [
    { instrument: 'ACME', lots: [10, -2, 5] },
    { instrument: 'BOND-1', lots: [] },
  ];
  const result = summarizePositions(positions);
  return [
    `Input positions: ${positions.length}`,
    `Output summaries: ${result.length}`,
    `Empty input summaries: ${summarizePositions([]).length}`,
    'Expected after completion: ACME 13, BOND-1 0, and empty input stays empty.',
  ];
}
