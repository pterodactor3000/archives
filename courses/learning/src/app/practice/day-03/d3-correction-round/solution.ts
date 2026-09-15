export interface CorrectionRecord {
  readonly failedTaskId: string;
  readonly missedClue: string;
  readonly correctedInvariant: string;
  readonly edgeCases: readonly string[];
  readonly firstAttemptComparison: string;
}

export const correctionRecord: CorrectionRecord = {
  failedTaskId: 'TODO',
  missedClue: 'TODO: Name the clue missed during the timed attempt.',
  correctedInvariant: 'TODO: State the invariant before rewriting code.',
  edgeCases: ['TODO: Add first edge case.', 'TODO: Add second edge case.'],
  firstAttemptComparison: 'TODO: Compare correctness, complexity, and clarity with attempt one.',
};

export function runCorrectedSolution(input: readonly number[]): readonly number[] {
  // TODO: Replace with a clean-room solution to the hardest failed problem.
  return [...input];
}

export function runCorrectionDemo(): readonly string[] {
  return [
    `Task: ${correctionRecord.failedTaskId}`,
    `Missed clue: ${correctionRecord.missedClue}`,
    `Invariant: ${correctionRecord.correctedInvariant}`,
    `Edge cases: ${correctionRecord.edgeCases.join(' | ')}`,
    `First-attempt comparison: ${correctionRecord.firstAttemptComparison}`,
    `Result: ${JSON.stringify(runCorrectedSolution([3, 1, 2]))}`,
  ];
}
