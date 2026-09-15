/**
 * the map holds only earlier values
 */
export function hasPairWithSum(numbers: readonly number[], target: number): boolean {
  if (!numbers.length) return false;

  const map = new Set<number>();

  for (const num of numbers) {
    if (map.has(target - num)) {
      return true;
    }

    map.add(num);
  }

  return false;
}

/**
 * if a pair exists, both values still sit between left and right
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
  // Hash - true
  // Pointer - [2, 7]
  return [
    `Hash map: ${hasPairWithSum([10, 4, 7, 1], 11)}`,
    `Two pointers: ${JSON.stringify(findPairInSortedArray([1, 2, 4, 7, 11], 9))}`,
  ];
}
