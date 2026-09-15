# Valid Parentheses notes

## Stack invariant

Before each iteration:

Stack includes each opening bracket in order, during thew iteration we check if top element (opening) and currently checked element (closing) are a pair.
If yes, we pop the top element clearing a pair.

## Complexity

- Time: O(n)
- Worst-case space: O(n)
- Why: because we do not create another loop for complexity - loop goes in O(n) and inside checks, pops, pushes are O(1)

## Edge cases

- Empty input: true
- Wrong closing order: false
- Unfinished opening groups: false
- Unexpected characters: false
