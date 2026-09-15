"""ingest — copy from configured sources (owned copies; subtract before add)."""

from __future__ import annotations

import json
import shutil
import subprocess
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

from .config import deferred_sources, enabled_sources, load_config


def _now_iso() -> str:
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat()


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
    return (f"cloned {url} -> {dest.relative_to(dest.parent.parent) if False else dest.name}: {summary}", r.returncode)


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
        print(f"\n[{name}] type={stype}")

        if stype == "git":
            dest_rel = src.get("dest") or f"ingest/{name}"
            dest = repo_root / dest_rel
            # Staging under ingest/ is vault-owned; ok to replace.
            # Never delete remote source repos — we only clone into our tree.
            msg, code = _git_clone_or_update(src["url"], dest, dry_run)
            print(f"  {msg}")
            if code != 0:
                overall = 1
            results.append({"name": name, "type": stype, "ok": code == 0, "detail": msg})

        elif stype == "local":
            path = Path(src["path"]).expanduser()
            dest_rel = src.get("dest") or f"ingest/{name}"
            dest = repo_root / dest_rel
            msg, code = _copy_local(path, dest, dry_run, subtract)
            print(f"  {msg}")
            if code != 0:
                overall = 1
            results.append({"name": name, "type": stype, "ok": code == 0, "detail": msg})

        elif stype == "cursor-codebase":
            print(f"  deferred/manual type — skipped even if enabled (id={src.get('id')})")
            results.append(
                {
                    "name": name,
                    "type": stype,
                    "ok": True,
                    "detail": "manual ingest required",
                }
            )
        else:
            print(f"  unknown type {stype!r} — skipped")
            overall = 1
            results.append({"name": name, "type": stype, "ok": False, "detail": "unknown type"})

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
