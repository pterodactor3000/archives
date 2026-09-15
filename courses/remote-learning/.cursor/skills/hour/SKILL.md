---
name: hour
description: Create an Hour GitHub issue, or review its pull request.
disable-model-invocation: true
---

# Hour

Workbook words live in `README.md`. Tracker steps live in `docs/agents/issue-tracker.md`. Change application or package code only when the user asks for that change by name.

Pick **create**, **start**, or **review** from the user message.

Start: follow `.cursor/skills/hour-start/SKILL.md`.

## Create

Completion: a GitHub issue exists with labels `hour` and `ready-for-human`, a scope checklist, the clock, and the prompt. Reply with the issue URL. Point at `/hour-start` for the sitting.

1. Resolve the prompt. If the user points at a drill heading or file, copy that section into the issue and link it. Otherwise use their freeform prompt. Default vertical is fintech.
2. Infer scope. Prefer the drill's Scope line over the file default.
   - Named `apps/...` paths become checkboxes.
   - "one of `apps/react-next` or `apps/react-vite`" or "one React playground": exactly one React checkbox. Use the playground the user named. Ask if they did not name one.
   - "one playground": exactly one checkbox. Use the playground the user named. Ask if they did not name one.
   - "both optional": do not add a second React checkbox unless the user asked for that sitting.
   - No Scope line: `docs/react/` every `apps/*` whose `package.json` depends on `react`; `docs/angular/` every `apps/*` whose `package.json` depends on `@angular/core`; `docs/shared/` every playground under `apps/`.
   - Freeform: paths the user named
3. Ensure labels `hour`, `ready-for-human`, and `needs-review` exist (`gh label create` if missing). Do not create or apply `ready-for-agent`.
4. Create the issue with `gh issue create`, labels `hour` and `ready-for-human`, body from the template below. One checkbox per in-scope playground. Shared Hours also note `packages/domain` as the shared-rules path, not as a sitting.

## Review

The Hour must be committed as a PR. `/hour` review is a PR review.

If this Hour has no pull request, stop. Tell the user to open a PR from the Hour branch first.

Completion: a review is on that pull request. Close the issue when every in-scope playground checkbox matches work in the PR. If any in-scope playground is missing, leave the issue open and name those playgrounds in the review.

1. Fetch the issue (`gh issue view <n> --comments`). Add `needs-review` if missing.
2. Resolve the PR. Use the number the user named, or `gh issue develop <n> --list` then `gh pr list --head <branch> --state all`. Stop if none.
3. Fetch the PR (`gh pr view <pr> --comments` and `gh pr diff <pr>`). For each in-scope playground, inspect the diff for work that matches the prompt.
4. Submit a teaching PR review (`gh pr review <pr> --comment`): what is weak, what to try, traps from the study notes that apply. Leave the code as the user wrote it.
5. If every in-scope playground has the work, close the issue and point at the PR review. If any in-scope playground is missing, leave the issue open.

## Issue body

```markdown
## Clock

One sitting is 60 minutes on one in-scope playground.

0-5 min: clarify contract, units, and states
5-15 min: define types, examples, and simple design
15-40 min: complete one correct path
40-50 min: test boundaries, failures, and races
50-60 min: explain complexity, tradeoffs, and production gaps

## Scope

- [ ] `apps/<playground>`

Shared rules: `packages/domain` (fintech still under `packages/domain/src`).

## Prompt

<source drill or freeform prompt>

## Source

<path or none>

## Review

The Hour must be committed as a PR. `/hour` review is a PR review.
```
