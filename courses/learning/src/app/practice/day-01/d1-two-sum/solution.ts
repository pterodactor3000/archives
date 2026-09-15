export function twoSum(numbers: readonly number[], target: number): readonly number[] {
  const numbersMap = new Map<number, number>();

  for (let index = 0; index < numbers.length; ++index) {
    const value = numbers[index];
    if (value === undefined) continue;
    const complement = target - value;
    const complementIndex = numbersMap.get(complement);
    if (complementIndex !== undefined) return [complementIndex, index];
    numbersMap.set(value, index);
  }
  throw new Error('No two sum solution for ' + target);
}

export function runTwoSumDemo(): readonly string[] {
  const cases: ReadonlyArray<readonly [readonly number[], number]> = [
    [[2, 7, 11, 15], 9],
    [[3, 3], 6],
    [[0, 4, 3, 0], 0],
  ];

  return cases.map(([numbers, target]) => {
    return `${JSON.stringify(numbers)}, target ${target}: ${JSON.stringify(twoSum(numbers, target))}`;
  });
}
