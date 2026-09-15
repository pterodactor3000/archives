export interface GapRepair {
  readonly gap: string;
  readonly evidence: string;
  readonly repair: string;
  readonly verification: string;
}

export const gapRepairs: readonly [GapRepair, GapRepair] = [
  {
    gap: 'TODO: Highest-value gap',
    evidence: 'TODO: Quote the mock evidence.',
    repair: 'TODO: Implement a tiny correction.',
    verification: 'TODO: State the test or explanation that now passes.',
  },
  {
    gap: 'TODO: Second gap',
    evidence: 'TODO: Quote the mock evidence.',
    repair: 'TODO: Implement a tiny correction.',
    verification: 'TODO: State the test or explanation that now passes.',
  },
];

export function runGapRepairDemo(): readonly string[] {
  return gapRepairs.flatMap((repair, index) => [
    `Gap ${index + 1}: ${repair.gap}`,
    `Evidence: ${repair.evidence}`,
    `Repair: ${repair.repair}`,
    `Verification: ${repair.verification}`,
  ]);
}
