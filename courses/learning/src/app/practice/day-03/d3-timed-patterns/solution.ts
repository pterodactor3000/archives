export function longestUniqueSubstring(input: string): number {
  // TODO: Sliding window, 30 minutes.
  return input.length === 0 ? 0 : 1;
}

export function binarySearch(numbers: readonly number[], target: number): number {
  // TODO: Binary search, 30 minutes. Return -1 when absent.
  void numbers;
  void target;
  return -1;
}

export interface TreeNode {
  readonly value: number;
  readonly left: TreeNode | null;
  readonly right: TreeNode | null;
}

export function maximumTreeDepth(root: TreeNode | null): number {
  // TODO: DFS or BFS, 30 minutes.
  return root === null ? 0 : 1;
}

interface TimedAttemptRecord {
  readonly problem: string;
  readonly boundaryTrace: string;
  readonly missedClue: string;
}

export const timedAttemptRecords: readonly [
  TimedAttemptRecord,
  TimedAttemptRecord,
  TimedAttemptRecord,
] = [
  {
    problem: 'Longest Substring',
    boundaryTrace: 'TODO: Trace empty input or a repeated character.',
    missedClue: 'TODO: Record the sliding-window clue missed under time pressure.',
  },
  {
    problem: 'Binary Search',
    boundaryTrace: 'TODO: Trace an absent target at one array boundary.',
    missedClue: 'TODO: Record the binary-search clue missed under time pressure.',
  },
  {
    problem: 'Maximum Tree Depth',
    boundaryTrace: 'TODO: Trace a null root or a one-sided tree.',
    missedClue: 'TODO: Record the traversal clue missed under time pressure.',
  },
];

export function runTimedPatternsDemo(): readonly string[] {
  const tree: TreeNode = {
    value: 1,
    left: { value: 2, left: null, right: null },
    right: { value: 3, left: null, right: null },
  };
  const results = [
    `Longest unique substring: ${longestUniqueSubstring('abcabcbb')}`,
    `Binary search index: ${binarySearch([1, 3, 5, 7, 9], 7)}`,
    `Maximum tree depth: ${maximumTreeDepth(tree)}`,
  ];
  const evidence = timedAttemptRecords.flatMap((attempt) => [
    `${attempt.problem} trace: ${attempt.boundaryTrace}`,
    `${attempt.problem} missed clue: ${attempt.missedClue}`,
  ]);

  return [...results, ...evidence];
}
