import { TaskReview } from '../../task.model';

const OPTIMAL_SOLUTION = `/**
 * Invariant: seen holds only earlier values. If the complement is among
 * those values, has() finds it before the current value is inserted.
 * Time: O(n). Space: O(n).
 */
export function hasPairWithSum(numbers: readonly number[], target: number): boolean {
  const seen = new Set<number>();

  for (const value of numbers) {
    if (seen.has(target - value)) {
      return true;
    }
    seen.add(value);
  }

  return false;
}

/**
 * Invariant: if a pair exists, both values still sit in [left, right].
 * Sum too small: left must move in. Sum too large: right must move in.
 * Extra space: O(1).
 */
export function findPairInSortedArray(
  numbers: readonly number[],
  target: number,
): readonly [number, number] | null {
  let left = 0;
  let right = numbers.length - 1;

  while (left < right) {
    const leftValue = numbers[left];
    const rightValue = numbers[right];
    if (leftValue === undefined || rightValue === undefined) {
      return null;
    }

    const sum = leftValue + rightValue;
    if (sum === target) {
      return [leftValue, rightValue];
    }
    if (sum < target) {
      left += 1;
    } else {
      right -= 1;
    }
  }

  return null;
}

export function runAlgorithmPairDemo(): readonly string[] {
  // Predict: true, [2, 7]
  return [
    \`Hash map: \${hasPairWithSum([10, 4, 7, 1], 11)}\`,
    \`Two pointers: \${JSON.stringify(findPairInSortedArray([1, 2, 4, 7, 11], 9))}\`,
  ];
}`;

export const algorithmPairReview: TaskReview = {
  status: 'reviewed',
  score: 3,
  criticism:
    'Both algorithms are correct and both invariants are on the functions. hasPairWithSum looks up with has() before add, so a value cannot pair with itself. findPairInSortedArray moves one pointer per miss. Demo predictions true and [2, 7] are in comments. The set pass is O(n). The pointers use O(1) extra space. The set is still named map.',
  improvements: [
    'Rename map to seen. It is a Set, not a Map.',
    'Write O(n) time and O(1) extra space next to the invariants so you can say them in an interview without hunting.',
  ],
  optimalSolution: OPTIMAL_SOLUTION,
};
