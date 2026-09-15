"""ingest — stage from sources, then promote owned copies into materials."""

from __future__ import annotations

import json
import shutil
import subprocess
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

from .config import deferred_sources, enabled_sources, load_config

# Paths/names skipped when promoting staging -> materials (owned copies, no .git).
PROMOTE_IGNORE_NAMES = frozenset(
    {
        ".git",
        "node_modules",
        ".next",
        "dist",
        "build",
        ".turbo",
        "coverage",
        "__pycache__",
        ".DS_Store",
        ".venv",
        "venv",
        ".cache",
        ".pytest_cache",
        ".mypy_cache",
        ".ruff_cache",
        ".parcel-cache",
        ".svelte-kit",
        "out",
        ".output",
    }
)

PROMOTE_IGNORE_DIR_SUFFIXES = (".egg-info",)


def _now_iso() -> str:
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat()


def _promote_ignore(_dir: str, names: list[str]) -> set[str]:
    ignored: set[str] = set()
    for name in names:
        if name in PROMOTE_IGNORE_NAMES:
            ignored.add(name)
            continue
        if any(name.endswith(suf) for suf in PROMOTE_IGNORE_DIR_SUFFIXES):
            ignored.add(name)
    return ignored


def _git_clone_or_update(url: str, dest: Path, dry_run: bool) -> tuple[str, int]:
    """Clone into dest or pull if already a git repo. Returns (message, exit)."""
    if dry_run:
        action = "update" if dest.exists() else "clone"
        return (f"dry-run: would {action} {url} -> {dest}", 0)

    dest.parent.mkdir(parents=True, exist_ok=True)
    if dest.exists() and (dest / ".git").is_dir():
        r = subprocess.run(
            ["git", "-C", str(dest), "pull", "--ff-only"],
            capture_output=True,
            text=True,
        )
        msg = (r.stdout or r.stderr or "").strip() or "pulled"
        return (f"updated {dest.name}: {msg.splitlines()[-1]}", r.returncode)

    if dest.exists():
        # Non-git leftover — remove vault-owned staging only, never source
        shutil.rmtree(dest)

    r = subprocess.run(
        ["git", "clone", "--depth", "1", url, str(dest)],
        capture_output=True,
        text=True,
    )
    msg = (r.stderr or r.stdout or "").strip().splitlines()
    summary = msg[-1] if msg else ("ok" if r.returncode == 0 else "failed")
    return (f"cloned {url} -> {dest.name}: {summary}", r.returncode)


def _copy_local(src: Path, dest: Path, dry_run: bool, subtract: bool) -> tuple[str, int]:
    if not src.exists():
        return (f"skip local (missing): {src}", 1)
    if dry_run:
        return (f"dry-run: would copy {src} -> {dest}", 0)

    dest.parent.mkdir(parents=True, exist_ok=True)
    if subtract and dest.exists():
        shutil.rmtree(dest)
    if src.is_dir():
        shutil.copytree(src, dest, dirs_exist_ok=not subtract)
    else:
        shutil.copy2(src, dest)
    return (f"copied local {src} -> {dest}", 0)


def _count_promoted_files(root: Path) -> int:
    if not root.is_dir():
        return 0
    return sum(1 for p in root.rglob("*") if p.is_file())


def promote_to_material(
    repo_root: Path,
    src: dict[str, Any],
    staging: Path,
    *,
    dry_run: bool,
    subtract: bool,
) -> tuple[str, int]:
    """Copy staging tree into {material}/{name}/ as an owned copy (no .git)."""
    material = src.get("material")
    name = src["name"]
    if not material:
        return (f"promote skipped (no material: for {name})", 0)

    dest = repo_root / material / name
    rel = dest.relative_to(repo_root)

    if dry_run:
        if not staging.exists():
            return (
                f"dry-run: would promote staging -> {rel} "
                f"(staging missing until live ingest)",
                0,
            )
        action = "replace then copy" if (subtract and dest.exists()) else "copy"
        return (f"dry-run: would {action} {staging.name}/ -> {rel}/ (strip .git + junk)", 0)

    if not staging.is_dir():
        return (f"promote failed: staging missing {staging}", 1)

    dest.parent.mkdir(parents=True, exist_ok=True)
    if subtract and dest.exists():
        shutil.rmtree(dest)

    if dest.exists():
        # Without subtract, refuse to merge blindly into existing owned tree
        return (
            f"promote refused: {rel} exists and subtract_before_add=false",
            1,
        )

    shutil.copytree(staging, dest, ignore=_promote_ignore)
    n = _count_promoted_files(dest)
    # Ensure no .git slipped through
    git_dir = dest / ".git"
    if git_dir.exists():
        shutil.rmtree(git_dir)
    return (f"promoted -> {rel}/ ({n} files, owned copy)", 0)


def run_ingest(repo_root: Path, dry_run: bool = False) -> int:
    cfg = load_config(repo_root)
    ingest_cfg = cfg.get("ingest") or {}
    subtract = bool(ingest_cfg.get("subtract_before_add", True))
    state_file = repo_root / (ingest_cfg.get("state_file") or ".archives/last_ingest.json")

    active = enabled_sources(cfg)
    deferred = deferred_sources(cfg)

    print(f"ingest: {'DRY-RUN' if dry_run else 'live'} | subtract_before_add={subtract}")
    print(f"ingest: {len(active)} enabled, {len(deferred)} deferred")

    results: list[dict[str, Any]] = []
    overall = 0

    for src in active:
        name = src["name"]
        stype = src["type"]
        material = src.get("material")
        print(f"\n[{name}] type={stype} material={material or '(none)'}")

        staging: Path | None = None
        stage_ok = False
        msg = ""
        code = 0

        if stype == "git":
            dest_rel = src.get("dest") or f"ingest/{name}"
            staging = repo_root / dest_rel
            # Staging under ingest/ is vault-owned; ok to replace.
            # Never delete remote source repos — we only clone into our tree.
            msg, code = _git_clone_or_update(src["url"], staging, dry_run)
            print(f"  stage: {msg}")
            stage_ok = code == 0
            if code != 0:
                overall = 1

        elif stype == "local":
            path = Path(src["path"]).expanduser()
            dest_rel = src.get("dest") or f"ingest/{name}"
            staging = repo_root / dest_rel
            msg, code = _copy_local(path, staging, dry_run, subtract)
            print(f"  stage: {msg}")
            stage_ok = code == 0
            if code != 0:
                overall = 1

        elif stype == "cursor-codebase":
            print(f"  deferred/manual type — skipped even if enabled (id={src.get('id')})")
            results.append(
                {
                    "name": name,
                    "type": stype,
                    "ok": True,
                    "detail": "manual ingest required",
                    "promote": None,
                }
            )
            continue
        else:
            print(f"  unknown type {stype!r} — skipped")
            overall = 1
            results.append(
                {
                    "name": name,
                    "type": stype,
                    "ok": False,
                    "detail": "unknown type",
                    "promote": None,
                }
            )
            continue

        promote_detail = None
        if stage_ok and material and staging is not None:
            pmsg, pcode = promote_to_material(
                repo_root, src, staging, dry_run=dry_run, subtract=subtract
            )
            print(f"  promote: {pmsg}")
            promote_detail = pmsg
            if pcode != 0:
                overall = 1
                stage_ok = False
        elif stage_ok and not material:
            print("  promote: skipped (no material configured)")

        results.append(
            {
                "name": name,
                "type": stype,
                "ok": stage_ok,
                "detail": msg,
                "promote": promote_detail,
                "material": material,
            }
        )

    if deferred:
        print("\ndeferred sources (enabled: false):")
        for s in deferred:
            note = s.get("note") or s.get("id") or s.get("path") or ""
            print(f"  - {s['name']} ({s.get('type')}): {note}")

    if not dry_run:
        state_file.parent.mkdir(parents=True, exist_ok=True)
        state = {
            "finished_at": _now_iso(),
            "dry_run": False,
            "results": results,
        }
        state_file.write_text(json.dumps(state, indent=2) + "\n", encoding="utf-8")
        print(f"\ningest: wrote state -> {state_file.relative_to(repo_root)}")
    else:
        print("\ningest: dry-run complete (no state written)")

    return overall
