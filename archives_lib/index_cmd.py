"""index — regenerate entry-level INDEX.md + Jekyll Markdown under docs/."""

from __future__ import annotations

import shutil
from dataclasses import dataclass
from pathlib import Path
from urllib.parse import quote

from .config import enabled_sources, load_config

INDEX_NAME = "INDEX.md"
DOCS_DIR = "docs"
CANVAS_DIR = Path("notes/empty-window-canvases")
# Folder of canvases is listed as individual canvas entries, not one repo card.
_CANVAS_SOURCE_NAMES = frozenset({"empty-window-canvases"})
GITHUB_BLOB_BASE = "https://github.com/pterodactor3000/archives/blob/main"
# Static Jekyll files kept across regenerations (not wiped).
_DOCS_KEEP = frozenset(
    {
        "_config.yml",
        "Gemfile",
        "Gemfile.lock",
    }
)
_DOCS_KEEP_DIRS = frozenset({"_layouts", "_includes", "_sass"})


@dataclass(frozen=True)
class RepoEntry:
    kind: str  # "repo"
    name: str
    vault_path: str  # e.g. courses/learning
    landing: str  # relative path to README/COURSE
    title: str
    source_url: str | None


@dataclass(frozen=True)
class CanvasEntry:
    kind: str  # "canvas"
    name: str  # stem without .canvas
    vault_path: str  # notes/empty-window-canvases/foo.canvas.tsx
    title: str
    data_json: str | None  # relative path or None


Entry = RepoEntry | CanvasEntry


def _md_href(rel: str) -> str:
    return "/".join(quote(part, safe="") for part in rel.split("/"))


def _md_label(text: str) -> str:
    return text.replace("[", "\\[").replace("]", "\\]")


def _yaml_scalar(text: str) -> str:
    """Quote a YAML double-quoted scalar safely for front matter."""
    escaped = (
        text.replace("\\", "\\\\")
        .replace('"', '\\"')
        .replace("\n", "\\n")
        .replace("\r", "")
    )
    return f'"{escaped}"'


def _front_matter(*, layout: str, title: str, extra: dict[str, str] | None = None) -> str:
    lines = ["---", f"layout: {layout}", f"title: {_yaml_scalar(title)}"]
    if extra:
        for key, value in extra.items():
            lines.append(f"{key}: {_yaml_scalar(value)}")
    lines.append("---")
    lines.append("")
    return "\n".join(lines)


def _title_from_md(text: str, fallback: str) -> str:
    for line in text.splitlines():
        s = line.strip()
        if s.startswith("# "):
            return s[2:].strip() or fallback
    return fallback


def _title_from_canvas_name(stem: str) -> str:
    return stem.replace("-", " ").replace("_", " ").strip().title()


def _pick_landing(repo_dir: Path) -> Path | None:
    for name in ("README.md", "COURSE.md"):
        p = repo_dir / name
        if p.is_file():
            return p
    return None


def _github_blob_url(rel: str) -> str:
    return f"{GITHUB_BLOB_BASE}/{_md_href(rel)}"


def discover_entries(repo_root: Path) -> list[Entry]:
    cfg = load_config(repo_root)
    entries: list[Entry] = []

    for src in enabled_sources(cfg):
        name = src.get("name") or ""
        stype = src.get("type")
        material = src.get("material")
        if stype not in ("git", "local") or not material or not name:
            continue
        if name in _CANVAS_SOURCE_NAMES:
            continue
        vault_rel = f"{material}/{name}"
        repo_dir = repo_root / material / name
        if not repo_dir.is_dir():
            continue
        landing_path = _pick_landing(repo_dir)
        if landing_path is None:
            continue
        landing_rel = landing_path.relative_to(repo_root).as_posix()
        body = landing_path.read_text(encoding="utf-8", errors="replace")
        title = _title_from_md(body, name)
        url = src.get("url") if stype == "git" else None
        entries.append(
            RepoEntry(
                kind="repo",
                name=name,
                vault_path=vault_rel,
                landing=landing_rel,
                title=title,
                source_url=url if isinstance(url, str) else None,
            )
        )

    canvas_root = repo_root / CANVAS_DIR
    if canvas_root.is_dir():
        for tsx in sorted(canvas_root.glob("*.canvas.tsx")):
            stem = tsx.name[: -len(".canvas.tsx")]
            vault_path = tsx.relative_to(repo_root).as_posix()
            data = canvas_root / f"{stem}.canvas.data.json"
            data_rel = (
                data.relative_to(repo_root).as_posix() if data.is_file() else None
            )
            entries.append(
                CanvasEntry(
                    kind="canvas",
                    name=stem,
                    vault_path=vault_path,
                    title=_title_from_canvas_name(stem),
                    data_json=data_rel,
                )
            )

    return entries


def _repo_entry_href(name: str) -> str:
    return f"entries/repos/{name}.md"


def _canvas_entry_href(name: str) -> str:
    return f"entries/canvases/{name}.md"


def build_index_markdown(entries: list[Entry]) -> str:
    """Root INDEX.md for GitHub browsing (entry-level catalog)."""
    repos = [e for e in entries if isinstance(e, RepoEntry)]
    canvases = [e for e in entries if isinstance(e, CanvasEntry)]
    lines: list[str] = [
        "# Vault index",
        "",
        "Entry-level catalog of owned vault items: each ingested **repo** and each **canvas**.",
        "Not every file — regenerate with `./bin/archives index`.",
        "",
        f"**{len(repos)} repos** · **{len(canvases)} canvases** ({len(entries)} entries).",
        "",
        "Hostable front page: [`docs/index.md`](docs/index.md) "
        "(GitHub Pages from `/docs` with jekyll-theme-hacker).",
        "",
        "## Repos",
        "",
    ]
    if not repos:
        lines.append("_None yet._")
        lines.append("")
    else:
        for e in repos:
            lines.append(
                f"- **[{_md_label(e.title)}]({_md_href(e.landing)})** "
                f"(`{e.vault_path}`) — landing [{e.landing.split('/')[-1]}]({_md_href(e.landing)})"
            )
        lines.append("")

    lines.append("## Canvases")
    lines.append("")

    if not canvases:
        lines.append("_None yet._")
        lines.append("")
    else:
        for e in canvases:
            lines.append(
                f"- **[{_md_label(e.title)}]({_md_href(e.vault_path)})** "
                f"(`{e.vault_path}`)"
            )
        lines.append("")

    text = "\n".join(lines)
    if not text.endswith("\n"):
        text += "\n"
    return text


def build_docs_index_md(entries: list[Entry]) -> str:
    """Jekyll docs/index.md — site-relative entry links (works with baseurl)."""
    repos = [e for e in entries if isinstance(e, RepoEntry)]
    canvases = [e for e in entries if isinstance(e, CanvasEntry)]
    parts: list[str] = [
        _front_matter(layout="default", title="archives"),
        "Owned learning materials — entry-level links to each ingested **repo** and each **canvas**.",
        "",
        f"**{len(repos)} repos** · **{len(canvases)} canvases** · regenerate with `./bin/archives index`",
        "",
        "## Repos",
        "",
    ]
    if not repos:
        parts.append("_None yet._")
        parts.append("")
    else:
        for e in repos:
            href = _repo_entry_href(e.name)
            parts.append(
                f"- **[{_md_label(e.title)}]({href})** — `{e.vault_path}`"
            )
        parts.append("")

    parts.append("## Canvases")
    parts.append("")
    if not canvases:
        parts.append("_None yet._")
        parts.append("")
    else:
        for e in canvases:
            href = _canvas_entry_href(e.name)
            parts.append(
                f"- **[{_md_label(e.title)}]({href})** — `{e.vault_path}`"
            )
        parts.append("")

    text = "\n".join(parts)
    if not text.endswith("\n"):
        text += "\n"
    return text


def build_repo_page_md(repo_root: Path, entry: RepoEntry) -> str:
    """Self-contained README body under docs (no reliance on unpublished ../courses)."""
    landing = repo_root / entry.landing
    body = landing.read_text(encoding="utf-8", errors="replace")
    if not body.endswith("\n"):
        body += "\n"

    lines: list[str] = [
        _front_matter(layout="page", title=entry.title).rstrip("\n"),
        "",
        f"**Vault path:** `{entry.vault_path}` · **landing:** `{entry.landing}`",
        "",
    ]
    if entry.source_url:
        lines.append(f"**Upstream:** [{entry.source_url}]({entry.source_url})")
        lines.append("")
    lines.append("---")
    lines.append("")
    return "\n".join(lines) + "\n" + body


def build_canvas_page_md(entry: CanvasEntry) -> str:
    """Stub page with GitHub blob links (paths outside /docs are not published)."""
    lines: list[str] = [
        _front_matter(layout="page", title=entry.title).rstrip("\n"),
        "",
        f"**Canvas** · `{entry.vault_path}`",
        "",
        "`.canvas.tsx` is Cursor canvas source — open it in Cursor to view/edit.",
        "This page is a stub for remote browsing of the vault catalog.",
        "Source files live outside `/docs`, so GitHub Pages does not publish them;",
        "use the blob links below.",
        "",
        f"- Source: [`{entry.vault_path}`]({_github_blob_url(entry.vault_path)})",
    ]
    if entry.data_json:
        lines.append(
            f"- Data: [`{entry.data_json}`]({_github_blob_url(entry.data_json)})"
        )
    lines.append("")
    lines.append("[← vault index](../../index.md)")
    lines.append("")
    return "\n".join(lines)


def _clear_generated_docs(docs: Path) -> None:
    """Remove prior generated pages/assets; keep Jekyll config and layouts."""
    docs.mkdir(parents=True, exist_ok=True)

    # Drop obsolete custom theme CSS / HTML leftovers.
    assets = docs / "assets"
    if assets.is_dir():
        for p in assets.rglob("*"):
            if p.is_file():
                p.unlink()
        # remove empty dirs bottom-up
        for p in sorted(assets.rglob("*"), reverse=True):
            if p.is_dir():
                try:
                    p.rmdir()
                except OSError:
                    pass
        try:
            assets.rmdir()
        except OSError:
            pass

    for path in docs.iterdir():
        if path.name in _DOCS_KEEP or path.name in _DOCS_KEEP_DIRS:
            continue
        if path.name == "entries" and path.is_dir():
            # wipe entries tree; recreate below
            shutil.rmtree(path)
            continue
        if path.is_file() and path.suffix in {".html", ".md", ".css"}:
            # generated index or stray pages
            if path.name.startswith("_"):
                continue
            path.unlink()
        elif path.is_file() and path.name == "index.html":
            path.unlink()

    (docs / "entries" / "repos").mkdir(parents=True, exist_ok=True)
    (docs / "entries" / "canvases").mkdir(parents=True, exist_ok=True)


def write_docs(repo_root: Path, entries: list[Entry]) -> None:
    docs = repo_root / DOCS_DIR
    _clear_generated_docs(docs)
    (docs / "index.md").write_text(build_docs_index_md(entries), encoding="utf-8")
    for e in entries:
        if isinstance(e, RepoEntry):
            path = docs / "entries" / "repos" / f"{e.name}.md"
            path.write_text(build_repo_page_md(repo_root, e), encoding="utf-8")
        else:
            path = docs / "entries" / "canvases" / f"{e.name}.md"
            path.write_text(build_canvas_page_md(e), encoding="utf-8")


def run_index(repo_root: Path) -> int:
    entries = discover_entries(repo_root)
    md = build_index_markdown(entries)
    (repo_root / INDEX_NAME).write_text(md, encoding="utf-8")
    write_docs(repo_root, entries)

    repos = sum(1 for e in entries if isinstance(e, RepoEntry))
    canvases = sum(1 for e in entries if isinstance(e, CanvasEntry))
    print(
        f"wrote {INDEX_NAME} + {DOCS_DIR}/ "
        f"({repos} repos, {canvases} canvases, {len(entries)} entries)"
    )
    if len(entries) == 0:
        print("warning: no entries discovered")
        return 1
    return 0
