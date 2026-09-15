# archives

Local **learning vault** for programming / software-engineering study materials.

Owned copies only. No clever sync magic. Subtract before add. Source repos are never deleted.

## Layout

```
README.md
archives.yaml          # sources + vault policy
bin/archives           # single CLI entrypoint
archives_lib/          # small Python package behind the CLI
notes/                 # owned notes / markdown
cheatsheets/
courses/               # course dumps
drills/                # drills / katas
ingest/                # staging copies from sources (gitignored contents)
.github/workflows/     # optional minimal CI smoke
```

## Quick start

```bash
# from vault root
./bin/archives setup
./bin/archives status
./bin/archives ingest --dry-run
./bin/archives ingest
./bin/archives organize
```

Requires Python 3.10+ and `PyYAML` (`pip install pyyaml`). Git + `gh` for HTTPS clones when ingesting remote sources.

## CLI

| Command | Purpose |
|---------|---------|
| `archives setup` | Ensure material dirs + `.archives/`; validate `archives.yaml` |
| `archives ingest [--dry-run]` | Clone/update enabled git sources into `ingest/`; copy enabled local paths. Deferred sources stay skipped. |
| `archives organize [--dry-run]` | Light normalize (e.g. trailing whitespace on `.md`) under material dirs |
| `archives status` | Config validity, file counts, enabled/deferred sources, last ingest state |

Always:

```bash
./bin/archives --help
```

## Sources (`archives.yaml`)

**Enabled (ingested automatically):**

- https://github.com/pterodactor3000/learning
- https://github.com/pterodactor3000/remote-learning
- https://github.com/pterodactor3000/stack-notes

**Deferred / manual** (`enabled: false` until you flip them):

- Cursor codebases: `pterodactor/node-sql-refresher`, `pterodactor/agent-atlas`
- Local: `/home/pterodactorius/.cursor/projects/empty-window/canvases/`

Ingest writes vault-owned copies under `ingest/`. It never deletes the upstream repos. Staging under `ingest/` may be replaced (subtract-before-add). Promote content into `notes/`, `cheatsheets/`, `courses/`, or `drills/` by hand (or extend organize later) so the vault stays deliberate.

## Policy

1. **Owned copies** — the vault holds its own trees; sources remain authoritative elsewhere.
2. **Subtract before add** — when refreshing a staging destination, remove the previous vault-owned copy first, then copy/clone again.
3. **Do not delete source originals** — only paths inside this repo (especially `ingest/`) are mutable by the CLI.
4. **Materials** — notes, markdown, cheatsheets, course dumps, drills/katas.

## State

Last successful (non-dry-run) ingest is recorded in `.archives/last_ingest.json` (gitignored).

## Development

Minimal CI runs `./bin/archives --help`, `setup`, and `status` on push/PR.
