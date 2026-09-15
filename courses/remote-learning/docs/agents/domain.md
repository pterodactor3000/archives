# Domain docs

How the engineering skills should consume this repo's domain documentation when exploring the codebase.

This repo is multi-context. Contexts are business verticals, not stacks or playgrounds.

## Before exploring, read these

- **`CONTEXT-MAP.md`** at the repo root: it points at one `CONTEXT.md` per vertical. Read each one relevant to the topic.
- **`README.md`**: workbook words (workbook, playground, stack, vertical).
- **`docs/adr/`**: read ADRs that touch the area you're about to work in. Also check `packages/domain/<vertical>/docs/adr/` for vertical-scoped decisions.

If a listed file does not exist, **proceed silently**. Don't flag its absence; don't suggest creating it upfront. The `/domain-modeling` skill (reached via `/grill-with-docs` and `/improve-codebase-architecture`) creates glossaries and ADRs lazily when terms or decisions actually get resolved.

## File structure

```
/
├── CONTEXT-MAP.md
├── README.md
├── docs/
│   └── adr/                                 system-wide decisions
└── packages/
    └── domain/
        ├── fintech/
        │   ├── CONTEXT.md
        │   └── docs/adr/                    fintech-scoped decisions
        └── <vertical>/
            ├── CONTEXT.md
            └── docs/adr/
```

Fintech code still lives in `packages/domain/src` until `packages/domain/fintech` exists.

## Use the glossary's vocabulary

When your output names a workbook word, use `README.md`. When it names a vertical concept (in an issue title, a refactor proposal, a hypothesis, a test name), use that vertical's `CONTEXT.md`. Don't drift to synonyms the glossary explicitly avoids.

If the concept you need isn't in the glossary yet, that's a signal: either you're inventing language the project doesn't use (reconsider) or there's a real gap (note it for `/domain-modeling`).

## Flag ADR conflicts

If your output contradicts an existing ADR, surface it explicitly rather than silently overriding:

> _Contradicts ADR-0007 (event-sourced orders), but worth reopening because…_
