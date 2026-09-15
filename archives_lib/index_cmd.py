"""index — regenerate root INDEX.md catalog of vault materials."""

from __future__ import annotations

import re

from collections import defaultdict
from pathlib import Path
from urllib.parse import quote

from .config import REQUIRED_MATERIAL_DIRS, load_config

INDEX_NAME = "INDEX.md"

# Tooling / meta noise — still listed and linked, under a collapsed subsection.
_NOISE_EXACT = frozenset(
    {
        ".gitignore",
        ".editorconfig",
        ".prettierignore",
        ".prettierrc",
        "package-lock.json",
        "pnpm-lock.yaml",
        "yarn.lock",
        "bun.lockb",
        "Cargo.lock",
        "Gemfile.lock",
        "composer.lock",
        "poetry.lock",
    }
)


def _is_noise(name: str) -> bool:
    if name in _NOISE_EXACT:
        return True
    if name.startswith(".prettier"):
        return True
    if name.endswith(".ico"):
        return True
    if name.endswith(".lock") or name.endswith("-lock.json") or name.endswith(".lockb"):
        return True
    return False


def _md_href(rel: str) -> str:
    """Percent-encode path segments so GitHub links work ([slug], spaces, etc.)."""
    return "/".join(quote(part, safe="") for part in rel.split("/"))


def _md_label(rel: str) -> str:
    """Readable label; escape brackets so markdown link text stays intact."""
    return rel.replace("[", "\\[").replace("]", "\\]")


def _collect_files(mat_root: Path) -> list[Path]:
    if not mat_root.is_dir():
        return []
    files: list[Path] = []
    for p in mat_root.rglob("*"):
        if p.is_file() and p.name != ".gitkeep":
            files.append(p)
    return sorted(files, key=lambda p: p.as_posix().lower())


def _group_by_source(mat_root: Path, files: list[Path]) -> dict[str, list[Path]]:
    """Group files by immediate child folder name, or '_root' for loose files."""
    groups: dict[str, list[Path]] = defaultdict(list)
    for f in files:
        try:
            rel = f.relative_to(mat_root)
        except ValueError:
            continue
        parts = rel.parts
        if len(parts) == 1:
            groups["_root"].append(f)
        else:
            groups[parts[0]].append(f)
    return dict(groups)


def build_index_markdown(repo_root: Path) -> str:
    cfg = load_config(repo_root)
    vault = cfg.get("vault") or {}
    materials = list(vault.get("materials") or REQUIRED_MATERIAL_DIRS)
    # Keep required order; append any extras from config
    ordered: list[str] = []
    for name in REQUIRED_MATERIAL_DIRS:
        if name in materials and name not in ordered:
            ordered.append(name)
    for name in materials:
        if name not in ordered:
            ordered.append(name)

    # Pre-scan
    by_mat: dict[str, list[Path]] = {}
    total = 0
    for mat in ordered:
        files = _collect_files(repo_root / mat)
        by_mat[mat] = files
        total += len(files)

    lines: list[str] = []
    lines.append("# Vault index")
    lines.append("")
    lines.append(
        "Catalog of owned learning materials under "
        "`notes/`, `cheatsheets/`, `courses/`, and `drills/` "
        "(every tracked file except `.gitkeep`)."
    )
    lines.append("")
    lines.append(
        f"**{total} files** total. Regenerate with `./bin/archives index` "
        "(keeps this catalog honest after ingest)."
    )
    lines.append("")
    lines.append("## Table of contents")
    lines.append("")
    for mat in ordered:
        n = len(by_mat[mat])
        lines.append(f"- [{mat}](#{mat}) ({n} files)")
    lines.append("")

    for mat in ordered:
        mat_root = repo_root / mat
        files = by_mat[mat]
        lines.append(f"## {mat} ({len(files)} files)")
        lines.append("")

        if not files:
            lines.append("_No materials yet._")
            lines.append("")
            continue

        groups = _group_by_source(mat_root, files)
        # Source folders first (alpha), then loose root files
        source_keys = sorted(k for k in groups if k != "_root")
        if "_root" in groups:
            source_keys.append("_root")

        for key in source_keys:
            group_files = groups[key]
            if key == "_root":
                heading = f"### {mat}/ (root)"
            else:
                heading = f"### {mat}/{key}"

            content = [f for f in group_files if not _is_noise(f.name)]
            noise = [f for f in group_files if _is_noise(f.name)]

            lines.append(f"{heading} ({len(group_files)} files)")
            lines.append("")

            for f in content:
                rel = f.relative_to(repo_root).as_posix()
                lines.append(f"- [{_md_label(rel)}]({_md_href(rel)})")

            if noise:
                lines.append("")
                lines.append("<details>")
                lines.append(
                    f"<summary>Tooling / meta ({len(noise)})</summary>"
                )
                lines.append("")
                for f in noise:
                    rel = f.relative_to(repo_root).as_posix()
                    lines.append(f"- [{_md_label(rel)}]({_md_href(rel)})")
                lines.append("")
                lines.append("</details>")

            lines.append("")

    # Trailing newline
    text = "\n".join(lines)
    if not text.endswith("\n"):
        text += "\n"
    return text


def run_index(repo_root: Path) -> int:
    out_path = repo_root / INDEX_NAME
    md = build_index_markdown(repo_root)
    out_path.write_text(md, encoding="utf-8")

    # Count material files vs markdown list-item links (ignore TOC anchors)
    file_count = sum(
        1
        for mat in REQUIRED_MATERIAL_DIRS
        for p in (repo_root / mat).rglob("*")
        if (repo_root / mat).is_dir() and p.is_file() and p.name != ".gitkeep"
    )
    # List-item links whose target is a file path (not TOC #anchors)
    link_count = 0
    for line in md.splitlines():
        if not line.startswith("- ["):
            continue
        m = re.search(r"\]\(([^)]+)\)", line)
        if m and not m.group(1).startswith("#"):
            link_count += 1
    print(f"wrote {out_path.relative_to(repo_root)} ({file_count} files, {link_count} links)")
    if link_count != file_count:
        print(
            f"warning: link count ({link_count}) != file count ({file_count})"
        )
        return 1
    return 0
