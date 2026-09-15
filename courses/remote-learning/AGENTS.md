# remote-learning

Interview workbook for senior frontend roles. Not a shipped product.

Workbook words live in `README.md`. Vertical language lives in `CONTEXT-MAP.md`.

## Where to change code

- Angular playground: `apps/angular`
- React playground on disk: `apps/react`
- Intended React playgrounds: Next.js App Router and TanStack Start
- Shared rules for a vertical: `packages/domain/<vertical>`. Fintech is first. That code still lives in `packages/domain/src`.
- Study notes: `docs/shared`, `docs/angular`, `docs/react`

Commands, URLs, and the interview clock live in `README.md`.

After TypeScript changes in `packages/domain`, wait for the domain watcher, then refresh the playgrounds.

## When to write code

Change application or package code only when the user asks for that change by name. Playground UI is how the user learns a stack. Shared rules are how the user learns a vertical. A drill, feature, or missing playground stays untouched until they ask you to write it.

## Agent skills

### Issue tracker

GitHub Issues via `gh`. See `docs/agents/issue-tracker.md`.

### Hour

Create an Hour issue with `/hour`. Start a sitting with `/hour-start` (GitHub branch and checkout). Review with `/hour` after the Hour is a pull request. One GitHub issue per Hour, label `hour`. Never apply `ready-for-agent`. See `.cursor/skills/hour/SKILL.md`.

### Triage labels

`needs-triage`, `needs-info`, `ready-for-human`, `wontfix`. This repo does not use `ready-for-agent`. See `docs/agents/triage-labels.md`.

### Domain docs

Multi-context by vertical. See `docs/agents/domain.md`.
