export function hasValidParentheses(input: string): boolean {
  if (!input.match(/[\(\)\[\]\{\}]/) && input !== '') {
    return false;
  }

  const stack: ('(' | '[' | '{')[] = [];

  for (const element of input) {
    if (element === '(' || element === '[' || element === '{') {
      stack.push(element);
    } else if (element === ')' || element === ']' || element === '}') {
      if (stack.length === 0) {
        return false;
      }

      const top = stack[stack.length - 1];

      if (
        (element === ')' && top !== '(') ||
        (element === ']' && top !== '[') ||
        (element === '}' && top !== '{')
      ) {
        return false;
      }

      stack.pop();
    }
  }

  return stack.length === 0;
}

export function runValidParenthesesDemo(): readonly string[] {
  return ['()', '()[]{}', '(]', '([)]', '{[]}', '', 'Let me live'].map((input) => {
    return `${input}: ${hasValidParentheses(input)}`;
  });
}
