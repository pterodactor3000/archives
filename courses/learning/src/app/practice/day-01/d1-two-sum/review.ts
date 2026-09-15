import { TaskReview } from '../../task.model';

const OPTIMAL_SOLUTION = `/**
 * Invariant: before each iteration, indexByValue contains values only from
 * earlier indices, and no pair exists entirely within those processed values.
 * Time: O(n). Space: O(n).
 */
export function twoSum(numbers: readonly number[], target: number): readonly number[] {
  const indexByValue = new Map<number, number>();

  for (let index = 0; index < numbers.length; index += 1) {
    const value = numbers[index];
    if (value === undefined) {
      continue;
    }

    const complementIndex = indexByValue.get(target - value);
    if (complementIndex !== undefined) {
      return [complementIndex, index];
    }

    indexByValue.set(value, index);
  }

  throw new Error(\`No two-sum solution for target \${target}\`);
}`;

export const twoSumReview: TaskReview = {
  status: 'reviewed',
  score: 2,
  criticism:
    'The map algorithm is correct, returns distinct indices, and handles duplicate and zero cases in O(n) time and O(n) space. The required invariant, complexity statement, negative-value trace, and prediction record are missing from the submitted file.',
  improvements: [
    'Write the loop invariant before the implementation so the lookup order is justified.',
    'Record O(n) time and O(n) space explicitly rather than leaving them implicit in the code.',
    'Add and predict a negative-value case before running the demo.',
    'Remove the stale TODO comment after completing the implementation.',
  ],
  optimalSolution: OPTIMAL_SOLUTION,
};
