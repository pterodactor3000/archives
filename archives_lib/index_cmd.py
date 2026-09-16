"""index — regenerate entry-level INDEX.md + Jekyll Markdown under docs/ + canvas HTML."""

from __future__ import annotations

import html
import re
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
_DOCS_KEEP_DIRS = frozenset({"_layouts", "_includes", "_sass", "apps"})

# Live in-browser destinations under docs/apps/ (GitHub Pages baseurl /archives).
_REPO_APP_HREF: dict[str, str] = {
    "learning": "apps/learning/",
    "remote-learning": "apps/remote-learning/",
    "stack-notes": "apps/stack-notes/",
}


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


def _repo_app_href(name: str) -> str:
    return _REPO_APP_HREF.get(name, f"entries/repos/{name}.md")


def _canvas_app_href(name: str) -> str:
    return f"apps/canvases/{name}.html"


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
            # Prefer extracted H1 title when present
            src_text = tsx.read_text(encoding="utf-8", errors="replace")
            title = _extract_canvas_title(src_text) or _title_from_canvas_name(stem)
            entries.append(
                CanvasEntry(
                    kind="canvas",
                    name=stem,
                    vault_path=vault_path,
                    title=title,
                    data_json=data_rel,
                )
            )

    return entries


def _strip_jsx_inner(raw: str) -> str:
    """Collapse JSX children to readable plain text."""
    t = re.sub(r"\{`([^`]*)`\}", r"\1", raw)
    t = re.sub(r"\{[^}]+\}", "", t)
    t = re.sub(r"<[^>]+>", " ", t)
    t = re.sub(r"\s+", " ", t).strip()
    return t


def _extract_canvas_title(source: str) -> str | None:
    m = re.search(r"<H1[^>]*>(.*?)</H1>", source, re.S)
    if not m:
        return None
    title = _strip_jsx_inner(m.group(1))
    return title or None


def _extract_canvas_outline(source: str) -> list[tuple[str, str]]:
    """Return (level, text) headings/snippets from canvas source when feasible."""
    outline: list[tuple[str, str]] = []
    for tag, level in (("H1", "h1"), ("H2", "h2"), ("H3", "h3")):
        for m in re.finditer(rf"<{tag}[^>]*>(.*?)</{tag}>", source, re.S):
            text = _strip_jsx_inner(m.group(1))
            if text and "{" not in text:
                outline.append((level, text))
    # Static Text nodes (skip template-heavy)
    for m in re.finditer(r"<Text[^>]*>(.*?)</Text>", source, re.S):
        text = _strip_jsx_inner(m.group(1))
        if text and len(text) > 12 and "{" not in text and "${" not in text:
            outline.append(("p", text[:400]))
            if sum(1 for k, _ in outline if k == "p") >= 12:
                break
    return outline


def build_canvas_html(entry: CanvasEntry, source: str) -> str:
    """Self-contained dark stand-in HTML for a Cursor canvas."""
    outline = _extract_canvas_outline(source)
    title = html.escape(entry.title)
    vault = html.escape(entry.vault_path)
    body_parts: list[str] = []
    if outline:
        body_parts.append('<section class="outline">')
        body_parts.append("<h2>Extracted structure</h2>")
        for level, text in outline:
            esc = html.escape(text)
            if level == "h1":
                body_parts.append(f"<h1 class='extracted'>{esc}</h1>")
            elif level == "h2":
                body_parts.append(f"<h2 class='extracted'>{esc}</h2>")
            elif level == "h3":
                body_parts.append(f"<h3 class='extracted'>{esc}</h3>")
            else:
                body_parts.append(f"<p class='extracted'>{esc}</p>")
        body_parts.append("</section>")
    else:
        body_parts.append(
            "<p class='muted'>Could not extract a readable outline — "
            "showing source below.</p>"
        )

    src_esc = html.escape(source)
    blob = _github_blob_url(entry.vault_path)

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{title} · canvas</title>
  <style>
    :root {{
      --bg: #0b0f14; --surface: #12181f; --border: #243041;
      --text: #d7e0ea; --muted: #8b9aab; --accent: #5cdb95;
      --code-bg: #0a0e13; --pink: #ff7b72;
    }}
    * {{ box-sizing: border-box; margin: 0; padding: 0; }}
    body {{
      background: var(--bg); color: var(--text);
      font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Helvetica, Arial, sans-serif;
      line-height: 1.55; padding: 1.5rem 1rem 3rem;
    }}
    .wrap {{ max-width: 920px; margin: 0 auto; }}
    nav {{ font-size: .875rem; margin-bottom: 1.25rem; color: var(--muted); }}
    nav a {{ color: var(--accent); text-decoration: none; }}
    nav a:hover {{ text-decoration: underline; }}
    header.card, section.outline, section.source {{
      background: var(--surface); border: 1px solid var(--border);
      border-radius: 12px; padding: 1.25rem 1.35rem; margin-bottom: 1rem;
    }}
    h1.page {{ font-size: 1.45rem; font-weight: 650; letter-spacing: -.02em; }}
    .path {{ margin-top: .4rem; font-size: .8rem; color: var(--muted);
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace; }}
    .badge {{
      display: inline-block; margin-top: .75rem; font-size: .7rem;
      font-family: ui-monospace, Menlo, monospace; color: var(--accent);
      border: 1px solid var(--border); border-radius: 999px; padding: .15rem .5rem;
    }}
    .muted {{ color: var(--muted); font-size: .9rem; }}
    h2 {{ font-size: 1rem; margin-bottom: .75rem; color: var(--muted);
      text-transform: uppercase; letter-spacing: .04em; }}
    h1.extracted {{ font-size: 1.25rem; margin: .4rem 0 .6rem; }}
    h2.extracted {{ font-size: 1.05rem; margin: 1rem 0 .4rem; color: var(--text);
      text-transform: none; letter-spacing: 0; }}
    h3.extracted {{ font-size: .95rem; margin: .75rem 0 .3rem; color: #c9d4e0; }}
    p.extracted {{ color: var(--muted); font-size: .9rem; margin: .35rem 0; }}
    pre {{
      background: var(--code-bg); border: 1px solid var(--border); border-radius: 8px;
      padding: 1rem; overflow: auto; max-height: 70vh; font-size: .78rem;
      line-height: 1.45; color: #c9d1d9;
      font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    }}
    details summary {{
      cursor: pointer; color: var(--accent); font-size: .9rem; margin-bottom: .75rem;
    }}
  </style>
</head>
<body>
  <div class="wrap">
    <nav>
      <a href="/archives/">← vault index</a>
      · <a href="{html.escape(blob)}">GitHub source</a>
    </nav>
    <header class="card">
      <h1 class="page">{title}</h1>
      <p class="path">{vault}</p>
      <span class="badge">canvas stand-in · not Cursor runtime</span>
      <p class="muted" style="margin-top:.85rem">
        Static HTML stand-in for browsing on GitHub Pages. Open the
        <code style="color:var(--pink)">.canvas.tsx</code> in Cursor for the full canvas runtime.
      </p>
    </header>
    {"".join(body_parts)}
    <section class="source">
      <details open>
        <summary>Source (.canvas.tsx)</summary>
        <pre>{src_esc}</pre>
      </details>
    </section>
  </div>
</body>
</html>
"""


def build_index_markdown(entries: list[Entry]) -> str:
    """Root INDEX.md for GitHub browsing (entry-level catalog)."""
    repos = [e for e in entries if isinstance(e, RepoEntry)]
    canvases = [e for e in entries if isinstance(e, CanvasEntry)]
    lines: list[str] = [
        "# Vault index",
        "",
        "Entry-level catalog of owned vault items: each ingested **repo** and each **canvas**.",
        "Front-page destinations are **live in-browser apps** under `docs/apps/` "
        "(not README dumps). Regenerate with `./bin/archives index`.",
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
            app = _repo_app_href(e.name)
            lines.append(
                f"- **[{_md_label(e.title)}]({_md_href('docs/' + app)})** "
                f"(`{e.vault_path}`) — live app [`docs/{app}`]({_md_href('docs/' + app)})"
            )
        lines.append("")

    lines.append("## Canvases")
    lines.append("")

    if not canvases:
        lines.append("_None yet._")
        lines.append("")
    else:
        for e in canvases:
            app = _canvas_app_href(e.name)
            lines.append(
                f"- **[{_md_label(e.title)}]({_md_href('docs/' + app)})** "
                f"(`{e.vault_path}`) — stand-in [`docs/{app}`]({_md_href('docs/' + app)})"
            )
        lines.append("")

    text = "\n".join(lines)
    if not text.endswith("\n"):
        text += "\n"
    return text


def build_docs_index_md(entries: list[Entry]) -> str:
    """Jekyll docs/index.md — site-relative live app links (works with baseurl)."""
    repos = [e for e in entries if isinstance(e, RepoEntry)]
    canvases = [e for e in entries if isinstance(e, CanvasEntry)]
    parts: list[str] = [
        _front_matter(layout="default", title="archives"),
        "Owned learning materials — each link opens a **live in-browser experience** "
        "under `apps/` (not a README).",
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
            href = _repo_app_href(e.name)
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
            href = _canvas_app_href(e.name)
            parts.append(
                f"- **[{_md_label(e.title)}]({href})** — `{e.vault_path}`"
            )
        parts.append("")

    text = "\n".join(parts)
    if not text.endswith("\n"):
        text += "\n"
    return text


def build_repo_page_md(repo_root: Path, entry: RepoEntry) -> str:
    """Thin redirect-style page pointing at the live app (README optional)."""
    app = _repo_app_href(entry.name)
    lines: list[str] = [
        _front_matter(layout="page", title=entry.title).rstrip("\n"),
        "",
        f"**Live app:** [{app}](../../{app})",
        "",
        f"**Vault path:** `{entry.vault_path}` · **landing:** `{entry.landing}`",
        "",
    ]
    if entry.source_url:
        lines.append(f"**Upstream:** [{entry.source_url}]({entry.source_url})")
        lines.append("")
    lines.append("Open the live app above — this entry page is a thin pointer, not the destination.")
    lines.append("")
    lines.append("[← vault index](../../index.md)")
    lines.append("")
    return "\n".join(lines)


def build_canvas_page_md(entry: CanvasEntry) -> str:
    """Thin pointer to the HTML stand-in under apps/canvases/."""
    app = _canvas_app_href(entry.name)
    lines: list[str] = [
        _front_matter(layout="page", title=entry.title).rstrip("\n"),
        "",
        f"**Live stand-in:** [{app}](../../{app})",
        "",
        f"**Canvas** · `{entry.vault_path}`",
        "",
        "Static HTML stand-in for Pages (not the Cursor canvas runtime).",
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
    """Remove prior generated pages; keep Jekyll config, layouts, and docs/apps builds."""
    docs.mkdir(parents=True, exist_ok=True)

    # Drop obsolete custom theme CSS / HTML leftovers.
    assets = docs / "assets"
    if assets.is_dir():
        for p in assets.rglob("*"):
            if p.is_file():
                p.unlink()
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
            shutil.rmtree(path)
            continue
        if path.is_file() and path.suffix in {".html", ".md", ".css"}:
            if path.name.startswith("_"):
                continue
            path.unlink()
        elif path.is_file() and path.name == "index.html":
            path.unlink()

    (docs / "entries" / "repos").mkdir(parents=True, exist_ok=True)
    (docs / "entries" / "canvases").mkdir(parents=True, exist_ok=True)
    (docs / "apps" / "canvases").mkdir(parents=True, exist_ok=True)


def write_canvas_standins(repo_root: Path, entries: list[Entry]) -> int:
    """Write self-contained HTML stand-ins under docs/apps/canvases/."""
    docs_canvases = repo_root / DOCS_DIR / "apps" / "canvases"
    docs_canvases.mkdir(parents=True, exist_ok=True)
    # Remove stale canvas HTML (keep other apps untouched)
    for old in docs_canvases.glob("*.html"):
        old.unlink()

    count = 0
    for e in entries:
        if not isinstance(e, CanvasEntry):
            continue
        src_path = repo_root / e.vault_path
        source = src_path.read_text(encoding="utf-8", errors="replace")
        html_body = build_canvas_html(e, source)
        out = docs_canvases / f"{e.name}.html"
        out.write_text(html_body, encoding="utf-8")
        count += 1
    return count


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
    write_canvas_standins(repo_root, entries)


def run_index(repo_root: Path) -> int:
    entries = discover_entries(repo_root)
    md = build_index_markdown(entries)
    (repo_root / INDEX_NAME).write_text(md, encoding="utf-8")
    write_docs(repo_root, entries)

    repos = sum(1 for e in entries if isinstance(e, RepoEntry))
    canvases = sum(1 for e in entries if isinstance(e, CanvasEntry))
    print(
        f"wrote {INDEX_NAME} + {DOCS_DIR}/ "
        f"({repos} repos, {canvases} canvases, {len(entries)} entries); "
        f"preserved {DOCS_DIR}/apps/ builds; regenerated canvas HTML stand-ins"
    )
    if len(entries) == 0:
        print("warning: no entries discovered")
        return 1
    return 0
