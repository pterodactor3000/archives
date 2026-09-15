"""index — regenerate entry-level INDEX.md + hostable docs/ pages."""

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


# --- minimal markdown → HTML (no extra deps) ---------------------------------


def _inline_md(text: str) -> str:
    """Escape then apply a few inline patterns."""
    s = html.escape(text)
    # code
    s = re.sub(r"`([^`]+)`", r"<code>\1</code>", s)
    # bold / italic (order matters)
    s = re.sub(r"\*\*([^*]+)\*\*", r"<strong>\1</strong>", s)
    s = re.sub(r"(?<!\*)\*([^*]+)\*(?!\*)", r"<em>\1</em>", s)
    # links [text](url)
    s = re.sub(
        r"\[([^\]]+)\]\(([^)]+)\)",
        r'<a href="\2">\1</a>',
        s,
    )
    return s


def md_to_html(md: str) -> str:
    lines = md.splitlines()
    out: list[str] = []
    i = 0
    in_ul = False
    in_ol = False
    in_p = False

    def close_lists() -> None:
        nonlocal in_ul, in_ol
        if in_ul:
            out.append("</ul>")
            in_ul = False
        if in_ol:
            out.append("</ol>")
            in_ol = False

    def close_p() -> None:
        nonlocal in_p
        if in_p:
            out.append("</p>")
            in_p = False

    while i < len(lines):
        line = lines[i]
        # fenced code
        if line.strip().startswith("```"):
            close_p()
            close_lists()
            lang = line.strip()[3:].strip()
            i += 1
            code_lines: list[str] = []
            while i < len(lines) and not lines[i].strip().startswith("```"):
                code_lines.append(lines[i])
                i += 1
            if i < len(lines):
                i += 1
            cls = f' class="language-{html.escape(lang)}"' if lang else ""
            out.append(f"<pre><code{cls}>{html.escape(chr(10).join(code_lines))}</code></pre>")
            continue

        stripped = line.strip()
        if not stripped:
            close_p()
            close_lists()
            i += 1
            continue

        heading = re.match(r"^(#{1,6})\s+(.*)$", stripped)
        if heading:
            close_p()
            close_lists()
            level = len(heading.group(1))
            out.append(f"<h{level}>{_inline_md(heading.group(2))}</h{level}>")
            i += 1
            continue

        if re.match(r"^[-*]\s+", stripped):
            close_p()
            if in_ol:
                out.append("</ol>")
                in_ol = False
            if not in_ul:
                out.append("<ul>")
                in_ul = True
            item = re.sub(r"^[-*]\s+", "", stripped)
            out.append(f"<li>{_inline_md(item)}</li>")
            i += 1
            continue

        if re.match(r"^\d+\.\s+", stripped):
            close_p()
            if in_ul:
                out.append("</ul>")
                in_ul = False
            if not in_ol:
                out.append("<ol>")
                in_ol = True
            item = re.sub(r"^\d+\.\s+", "", stripped)
            out.append(f"<li>{_inline_md(item)}</li>")
            i += 1
            continue

        if stripped.startswith("> "):
            close_p()
            close_lists()
            out.append(f"<blockquote><p>{_inline_md(stripped[2:])}</p></blockquote>")
            i += 1
            continue

        if re.match(r"^---+$", stripped) or re.match(r"^\*\*\*+$", stripped):
            close_p()
            close_lists()
            out.append("<hr>")
            i += 1
            continue

        close_lists()
        if not in_p:
            out.append("<p>")
            in_p = True
            out.append(_inline_md(stripped))
        else:
            out.append(" " + _inline_md(stripped))
        i += 1

    close_p()
    close_lists()
    return "\n".join(out)


# --- HTML chrome -------------------------------------------------------------

_CSS = """\
:root {
  --bg: #0f1419;
  --panel: #1a2332;
  --text: #e7ecf3;
  --muted: #8b9bb4;
  --accent: #6cb6ff;
  --border: #2a3548;
  --chip-repo: #3d5a40;
  --chip-canvas: #4a3d5a;
}
* { box-sizing: border-box; }
body {
  margin: 0;
  font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
  background: var(--bg);
  color: var(--text);
  line-height: 1.55;
}
a { color: var(--accent); text-decoration: none; }
a:hover { text-decoration: underline; }
.wrap { max-width: 920px; margin: 0 auto; padding: 2rem 1.25rem 4rem; }
header h1 { margin: 0 0 0.35rem; font-size: 1.75rem; }
header p { margin: 0; color: var(--muted); }
.meta { margin-top: 0.75rem; color: var(--muted); font-size: 0.9rem; }
.grid {
  display: grid;
  gap: 0.85rem;
  margin-top: 1.75rem;
}
.card {
  display: block;
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 1rem 1.15rem;
  color: inherit;
  transition: border-color 0.15s;
}
.card:hover { border-color: var(--accent); text-decoration: none; }
.card h2 { margin: 0 0 0.35rem; font-size: 1.1rem; }
.card .path { color: var(--muted); font-size: 0.85rem; font-family: ui-monospace, monospace; }
.chip {
  display: inline-block;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  padding: 0.15rem 0.45rem;
  border-radius: 999px;
  margin-bottom: 0.45rem;
  color: #fff;
}
.chip.repo { background: var(--chip-repo); }
.chip.canvas { background: var(--chip-canvas); }
.section-title {
  margin: 2rem 0 0.75rem;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--muted);
}
nav.crumb { margin-bottom: 1.25rem; font-size: 0.9rem; color: var(--muted); }
article {
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 1.25rem 1.4rem;
}
article h1:first-child { margin-top: 0; }
article pre {
  background: #0b1017;
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 0.85rem 1rem;
  overflow-x: auto;
}
article code {
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 0.9em;
}
article :not(pre) > code {
  background: #0b1017;
  padding: 0.1em 0.35em;
  border-radius: 4px;
}
.stub dl { margin: 1rem 0; }
.stub dt { color: var(--muted); font-size: 0.8rem; margin-top: 0.75rem; }
.stub dd { margin: 0.2rem 0 0; font-family: ui-monospace, monospace; font-size: 0.9rem; }
.note {
  margin-top: 1.25rem;
  padding: 0.85rem 1rem;
  background: #0b1017;
  border-left: 3px solid var(--accent);
  color: var(--muted);
  font-size: 0.95rem;
}
.links { margin-top: 1.25rem; }
.links li { margin: 0.35rem 0; }
"""


def _repo_entry_href(name: str) -> str:
    return f"entries/repos/{name}.html"


def _canvas_entry_href(name: str) -> str:
    return f"entries/canvases/{name}.html"


def build_index_markdown(entries: list[Entry]) -> str:
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
        "Hostable front page: [`docs/index.html`](docs/index.html) "
        "(GitHub Pages from `/docs`, or `python3 -m http.server -d docs`).",
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


def build_front_page(entries: list[Entry]) -> str:
    repos = [e for e in entries if isinstance(e, RepoEntry)]
    canvases = [e for e in entries if isinstance(e, CanvasEntry)]
    parts: list[str] = [
        f'<p class="meta">{len(repos)} repos · {len(canvases)} canvases · '
        f"regenerate with <code>./bin/archives index</code></p>",
        '<p class="section-title">Repos</p>',
        '<div class="grid">',
    ]
    for e in repos:
        href = _repo_entry_href(e.name)
        parts.append(
            f'<a class="card" href="{html.escape(href)}">'
            f'<span class="chip repo">repo</span>'
            f"<h2>{html.escape(e.title)}</h2>"
            f'<div class="path">{html.escape(e.vault_path)}</div>'
            f"</a>"
        )
    if not repos:
        parts.append("<p class=\"meta\">No repos yet.</p>")
    parts.append("</div>")
    parts.append('<p class="section-title">Canvases</p>')
    parts.append('<div class="grid">')
    for e in canvases:
        href = _canvas_entry_href(e.name)
        parts.append(
            f'<a class="card" href="{html.escape(href)}">'
            f'<span class="chip canvas">canvas</span>'
            f"<h2>{html.escape(e.title)}</h2>"
            f'<div class="path">{html.escape(e.vault_path)}</div>'
            f"</a>"
        )
    if not canvases:
        parts.append("<p class=\"meta\">No canvases yet.</p>")
    parts.append("</div>")

    body = "\n".join(parts)
    # front page uses a custom header already inside page(); override via full assemble
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>archives vault</title>
<link rel="stylesheet" href="assets/style.css">
</head>
<body>
<main class="wrap">
<header>
<h1>archives vault</h1>
<p>Owned learning materials — repos and canvases.</p>
</header>
{body}
</main>
</body>
</html>
"""


def build_repo_page(repo_root: Path, entry: RepoEntry) -> str:
    landing = repo_root / entry.landing
    md = landing.read_text(encoding="utf-8", errors="replace")
    rendered = md_to_html(md)
    src_line = ""
    if entry.source_url:
        src_line = (
            f'<p class="meta">Upstream: '
            f'<a href="{html.escape(entry.source_url)}">{html.escape(entry.source_url)}</a>'
            f"</p>"
        )
    body = f"""
<p class="meta">Vault path: <code>{html.escape(entry.vault_path)}</code> ·
landing: <code>{html.escape(entry.landing)}</code></p>
{src_line}
<article>
{rendered}
</article>
<p class="meta" style="margin-top:1.5rem">
<a href="../../{_md_href(entry.landing)}">Open {html.escape(entry.landing.split('/')[-1])} in repo</a>
(relative; works when browsing the tree / serving from repo root)
</p>
"""
    crumb = '<a href="../../index.html">← vault</a>'
    # Fix: page() wraps another h1 — embed title in article only via custom
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{html.escape(entry.title)}</title>
<link rel="stylesheet" href="../../assets/style.css">
</head>
<body>
<main class="wrap">
<nav class="crumb">{crumb}</nav>
<header>
<h1>{html.escape(entry.title)}</h1>
<p>Ingested repo · <code>{html.escape(entry.vault_path)}</code></p>
</header>
{body}
</main>
</body>
</html>
"""


def build_canvas_page(entry: CanvasEntry) -> str:
    # From docs/entries/canvases/X.html → repo root is ../../..
    rel_tsx = f"../../../{entry.vault_path}"
    links = [
        f'<li><a href="{html.escape(rel_tsx)}"><code>{html.escape(entry.vault_path)}</code></a> (Cursor canvas source)</li>'
    ]
    data_block = ""
    if entry.data_json:
        rel_data = f"../../../{entry.data_json}"
        links.append(
            f'<li><a href="{html.escape(rel_data)}"><code>{html.escape(entry.data_json)}</code></a></li>'
        )
        data_block = f"<dt>Data</dt><dd>{html.escape(entry.data_json)}</dd>"

    body = f"""
<div class="stub">
<dl>
<dt>Title</dt><dd>{html.escape(entry.title)}</dd>
<dt>Path</dt><dd>{html.escape(entry.vault_path)}</dd>
{data_block}
</dl>
<div class="note">
<code>.canvas.tsx</code> is Cursor canvas source — open it in Cursor to view/edit the canvas.
This static page is a stub for remote browsing of the vault catalog.
</div>
<ul class="links">
{chr(10).join(links)}
</ul>
</div>
"""
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{html.escape(entry.title)}</title>
<link rel="stylesheet" href="../../assets/style.css">
</head>
<body>
<main class="wrap">
<nav class="crumb"><a href="../../index.html">← vault</a></nav>
<header>
<h1>{html.escape(entry.title)}</h1>
<p>Canvas · <code>{html.escape(entry.vault_path)}</code></p>
</header>
{body}
</main>
</body>
</html>
"""


def _reset_generated_docs(docs: Path) -> None:
    """Idempotent: replace generated site tree under docs/."""
    if docs.exists():
        shutil.rmtree(docs)
    (docs / "assets").mkdir(parents=True)
    (docs / "entries" / "repos").mkdir(parents=True)
    (docs / "entries" / "canvases").mkdir(parents=True)


def write_docs(repo_root: Path, entries: list[Entry]) -> None:
    docs = repo_root / DOCS_DIR
    _reset_generated_docs(docs)
    (docs / "assets" / "style.css").write_text(_CSS, encoding="utf-8")
    (docs / "index.html").write_text(build_front_page(entries), encoding="utf-8")
    for e in entries:
        if isinstance(e, RepoEntry):
            path = docs / "entries" / "repos" / f"{e.name}.html"
            path.write_text(build_repo_page(repo_root, e), encoding="utf-8")
        else:
            path = docs / "entries" / "canvases" / f"{e.name}.html"
            path.write_text(build_canvas_page(e), encoding="utf-8")


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
