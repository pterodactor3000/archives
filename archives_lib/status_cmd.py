"""status — config, counts, last ingest."""

from __future__ import annotations

import json
from pathlib import Path

from .config import deferred_sources, enabled_sources, load_config, validate_config


def _count_files(root: Path) -> int:
    if not root.is_dir():
        return 0
    return sum(
        1
        for p in root.rglob("*")
        if p.is_file() and p.name != ".gitkeep"
    )


def run_status(repo_root: Path) -> int:
    cfg_path = repo_root / "archives.yaml"
    print(f"repo:    {repo_root}")
    print(f"config:  {cfg_path} ({'present' if cfg_path.is_file() else 'MISSING'})")

    try:
        cfg = load_config(repo_root)
    except Exception as exc:  # noqa: BLE001
        print(f"status: failed to load config: {exc}")
        return 1

    errors = validate_config(cfg, repo_root)
    print(f"valid:   {'yes' if not errors else 'NO'}")
    for e in errors:
        print(f"  ! {e}")

    vault = cfg.get("vault") or {}
    materials = vault.get("materials") or []
    staging = vault.get("staging") or "ingest"

    print("\nmaterial counts (files, excluding .gitkeep):")
    for mat in materials:
        n = _count_files(repo_root / mat)
        print(f"  {mat:14} {n}")
    print(f"  {staging:14} {_count_files(repo_root / staging)}")

    active = enabled_sources(cfg)
    deferred = deferred_sources(cfg)
    print(f"\nsources: {len(active)} enabled, {len(deferred)} deferred")
    for s in active:
        print(f"  [on]  {s['name']:24} {s.get('type')} {s.get('url') or s.get('path') or s.get('id') or ''}")
    for s in deferred:
        print(f"  [off] {s['name']:24} {s.get('type')} {s.get('note') or s.get('id') or s.get('path') or ''}")

    ingest_cfg = cfg.get("ingest") or {}
    state_file = repo_root / (ingest_cfg.get("state_file") or ".archives/last_ingest.json")
    print(f"\nlast ingest: {state_file.relative_to(repo_root)}")
    if state_file.is_file():
        try:
            state = json.loads(state_file.read_text(encoding="utf-8"))
            print(f"  finished_at: {state.get('finished_at', '?')}")
            for r in state.get("results") or []:
                mark = "ok" if r.get("ok") else "FAIL"
                print(f"  - [{mark}] {r.get('name')}: {r.get('detail', '')[:80]}")
        except json.JSONDecodeError:
            print("  (state file unreadable)")
    else:
        print("  (none yet — run: archives ingest)")

    return 0 if not errors else 1
