# Context map

Contexts are business verticals. Stacks and playgrounds are not contexts.

Each live vertical has shared rules under `packages/domain/<vertical>/` and a glossary at `packages/domain/<vertical>/CONTEXT.md`. Create that glossary when the first term in that vertical is resolved. Do not pre-create verticals that have no code.

Workbook words live in `README.md`. Do not repeat them here.

## Contexts

- [fintech](./packages/domain/fintech/CONTEXT.md): financial-product rules. Code still lives in `packages/domain/src` until `packages/domain/fintech` exists. No `CONTEXT.md` yet.

## Relationships

Verticals do not share a glossary. The same English word can mean different things in different verticals. Use that vertical's `CONTEXT.md`.
