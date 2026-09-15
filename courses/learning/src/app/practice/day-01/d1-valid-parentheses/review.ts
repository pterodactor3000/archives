import { TaskReview } from '../../task.model';

const OPTIMAL_SOLUTION = `type OpeningBracket = '(' | '[' | '{';

export function hasValidParentheses(input: string): boolean {
  const stack: OpeningBracket[] = [];

  for (const character of input) {
    switch (character) {
      case '(':
      case '[':
      case '{':
        stack.push(character);
        break;
      case ')':
        if (stack.pop() !== '(') return false;
        break;
      case ']':
        if (stack.pop() !== '[') return false;
        break;
      case '}':
        if (stack.pop() !== '{') return false;
        break;
      default:
        return false;
    }
  }

  return stack.length === 0;
}`;

export const validParenthesesReview: TaskReview = {
  status: 'reviewed',
  score: 3,
  criticism:
    'All required bracket cases now work, including empty input, wrong order, unfinished groups, and nested groups. The stack invariant and O(n) time with O(n) worst-case space are recorded correctly.',
  improvements: [
    'Remove the regular-expression guard because LeetCode guarantees bracket-only input.',
    'If unexpected characters must be rejected, return false from a final else branch so mixed input such as a() is handled consistently.',
    'Tighten the invariant wording and correct the typo during review.',
  ],
  optimalSolution: OPTIMAL_SOLUTION,
};
