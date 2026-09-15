---
name: hour-start
description: Create the Hour branch on GitHub and check it out.
disable-model-invocation: true
---

# Hour start

Workbook words live in `README.md`. Tracker steps live in `docs/agents/issue-tracker.md`. Change application or package code only when the user asks for that change by name.

Completion: a GitHub branch is linked to the Hour issue, and the working tree is on that branch. Reply with the branch name and the issue URL.

1. Resolve the Hour issue number from the user message. Ask if missing.
2. Fetch the issue (`gh issue view <n>`). Stop if it lacks the `hour` label.
3. If the working tree has uncommitted changes, stop. Name the dirty files.
4. If a linked branch already exists (`gh issue develop <n> --list`), check it out. Fetch first when it exists only on the remote.
5. Otherwise create and check out the branch with `gh issue develop <n> --name hour/<n>-<slug> --checkout`. Build `<slug>` from the issue title. Drop a leading `Hour:`. Lowercase. Hyphens for spaces. Drop other punctuation.
6. Reply with the branch name and the issue URL. Say that `/hour` review needs a PR from this branch.
