"""organize — light normalize of vault materials."""

from __future__ import annotations

from pathlib import Path

from .config import load_config


def _normalize_md(path: Path) -> bool:
    """Strip trailing whitespace; ensure single trailing newline. Return True if changed."""
    raw = path.read_text(encoding="utf-8", errors="replace")
    lines = [line.rstrip() for line in raw.splitlines()]
    new = "\n".join(lines)
    if new and not new.endswith("\n"):
        new += "\n"
    elif not new:
        new = ""
    if new != raw:
        path.write_text(new, encoding="utf-8")
        return True
    return False


def run_organize(repo_root: Path, dry_run: bool = False) -> int:
    cfg = load_config(repo_root)
    org = cfg.get("organize") or {}
    vault = cfg.get("vault") or {}
    materials = vault.get("materials") or [
        "notes",
        "cheatsheets",
        "courses",
        "drills",
    ]
    normalize_md = bool(org.get("normalize_markdown", True))

    changed = 0
    scanned = 0

    for mat in materials:
        root = repo_root / mat
        if not root.is_dir():
            print(f"organize: missing dir {mat}/ — run setup first")
            continue
        for path in sorted(root.rglob("*")):
            if not path.is_file():
                continue
            if path.name == ".gitkeep":
                continue
            scanned += 1
            if normalize_md and path.suffix.lower() in {".md", ".markdown"}:
                if dry_run:
                    # Peek without writing
                    raw = path.read_text(encoding="utf-8", errors="replace")
                    lines = [line.rstrip() for line in raw.splitlines()]
                    new = "\n".join(lines)
                    if new and not new.endswith("\n"):
                        new += "\n"
                    if new != raw:
                        print(f"  would normalize: {path.relative_to(repo_root)}")
                        changed += 1
                else:
                    if _normalize_md(path):
                        print(f"  normalized: {path.relative_to(repo_root)}")
                        changed += 1

    mode = "dry-run" if dry_run else "live"
    print(f"organize ({mode}): scanned {scanned} files, normalized {changed}")
    return 0
