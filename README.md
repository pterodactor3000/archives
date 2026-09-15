# archives

Local **learning vault** for programming / software-engineering study materials.

Owned copies only. No clever sync magic. Subtract before add. Source repos are never deleted.

**Catalog:** see **[INDEX.md](INDEX.md)** for every vault material file with working links.

## Layout

```
README.md
INDEX.md               # full catalog of vault materials (regenerate: archives index)
archives.yaml          # sources + vault policy
bin/archives           # single CLI entrypoint
archives_lib/          # small Python package behind the CLI
notes/                 # owned notes / markdown
cheatsheets/
courses/               # course dumps
drills/                # drills / katas
ingest/                # staging clones from sources (gitignored contents)
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
./bin/archives index      # regenerate INDEX.md after ingest
```

Requires Python 3.10+ and `PyYAML` (`pip install pyyaml`). Git + `gh` for HTTPS clones when ingesting remote sources.

## CLI

| Command | Purpose |
|---------|---------|
| `archives setup` | Ensure material dirs + `.archives/`; validate `archives.yaml` |
| `archives ingest [--dry-run]` | Clone/update enabled git sources into `ingest/`, then **promote** owned copies into `{material}/{source_name}/`. Deferred sources stay skipped. |
| `archives organize [--dry-run]` | Light normalize (e.g. trailing whitespace on `.md`) under material dirs |
| `archives status` | Config validity, file counts (incl. per-source material subdirs), enabled/deferred sources, last ingest state |
| `archives index` | Regenerate root [`INDEX.md`](INDEX.md) — full catalog with a relative link for every material file |

Always:

```bash
./bin/archives --help
```

## Sources (`archives.yaml`)

**Enabled (ingested + promoted automatically):**

| Source | Staging | Material |
|--------|---------|----------|
| [learning](https://github.com/pterodactor3000/learning) | `ingest/learning` | `courses/learning/` |
| [remote-learning](https://github.com/pterodactor3000/remote-learning) | `ingest/remote-learning` | `courses/remote-learning/` |
| [stack-notes](https://github.com/pterodactor3000/stack-notes) | `ingest/stack-notes` | `notes/stack-notes/` |
| empty-window canvases (local) | `ingest/empty-window-canvases` | `notes/empty-window-canvases/` |

Each enabled `git` / `local` source must set `material:` to one of `notes` \| `cheatsheets` \| `courses` \| `drills`.

Local canvases path (on cogitator): `/home/pterodactorius/.cursor/projects/empty-window/canvases/` — `node_modules` excluded on promote.

**Deferred / manual** (`enabled: false` until you flip them):

- Cursor codebases: `pterodactor/node-sql-refresher`, `pterodactor/agent-atlas`

### Ingest + promote

1. **Stage** — clone/update into `ingest/{name}/` (gitignored; may keep `.git` for pulls).
2. **Promote** — copy the tree into `{material}/{name}/` as a vault-owned copy:
   - strips `.git` (not a nested clone)
   - excludes junk: `node_modules`, `.next`, `dist`, `build`, `.turbo`, `coverage`, `__pycache__`, `.DS_Store`, etc.
   - with `subtract_before_add: true`, removes the previous owned `{material}/{name}/` before copying fresh
3. Upstream source repos are never deleted or modified.

`--dry-run` covers both stage and promote (no writes, no state file).

## Policy

1. **Owned copies** — the vault holds its own trees under material folders; staging stays disposable.
2. **Subtract before add** — when refreshing staging or a material destination, remove the previous vault-owned copy first, then copy/clone again.
3. **Do not delete source originals** — only paths inside this repo (`ingest/`, material subdirs) are mutable by the CLI.
4. **Materials** — notes, markdown, cheatsheets, course dumps, drills/katas — these are tracked by git; `ingest/` is not.
5. **Staging can stay gitignored** — promote is what makes content visible to the vault / VCS.

## State

Last successful (non-dry-run) ingest is recorded in `.archives/last_ingest.json` (gitignored).

## Development

Minimal CI runs `./bin/archives --help`, `setup`, and `status` on push/PR.
