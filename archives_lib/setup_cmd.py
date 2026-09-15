"""setup — ensure dirs, validate config."""

from __future__ import annotations

from pathlib import Path

from .config import load_config, validate_config


def run_setup(repo_root: Path) -> int:
    cfg = load_config(repo_root)
    vault = cfg.get("vault") or {}
    materials = vault.get("materials") or [
        "notes",
        "cheatsheets",
        "courses",
        "drills",
    ]
    staging = vault.get("staging") or "ingest"

    created: list[str] = []
    for name in [*materials, staging]:
        path = repo_root / name
        if not path.exists():
            path.mkdir(parents=True, exist_ok=True)
            keep = path / ".gitkeep"
            if not keep.exists():
                keep.touch()
            created.append(str(path.relative_to(repo_root)))

    state_dir = repo_root / ".archives"
    state_dir.mkdir(exist_ok=True)

    errors = validate_config(cfg, repo_root)
    if errors:
        print("setup: config validation FAILED")
        for e in errors:
            print(f"  - {e}")
        return 1

    if created:
        print("setup: created missing dirs:")
        for c in created:
            print(f"  + {c}")
    else:
        print("setup: all material dirs present")

    print(f"setup: config OK ({repo_root / 'archives.yaml'})")
    print(f"setup: state dir {state_dir.relative_to(repo_root)}/")
    return 0
