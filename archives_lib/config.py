"""Load and validate archives.yaml."""

from __future__ import annotations

from pathlib import Path
from typing import Any

try:
    import yaml
except ImportError:  # pragma: no cover
    yaml = None  # type: ignore


REQUIRED_MATERIAL_DIRS = ("notes", "cheatsheets", "courses", "drills")
REQUIRED_TOP = ("vault", "sources")
VALID_SOURCE_TYPES = ("git", "local", "cursor-codebase")


def find_repo_root(start: Path | None = None) -> Path:
    """Walk up from start (or this file) until archives.yaml is found."""
    here = (start or Path(__file__).resolve()).parent
    for candidate in [here, *here.parents]:
        if (candidate / "archives.yaml").is_file():
            return candidate
    # Fallback: assume package lives one level under repo root
    return Path(__file__).resolve().parent.parent


def load_config(repo_root: Path | None = None) -> dict[str, Any]:
    root = repo_root or find_repo_root()
    path = root / "archives.yaml"
    if not path.is_file():
        raise FileNotFoundError(f"archives.yaml not found at {path}")
    if yaml is None:
        raise RuntimeError(
            "PyYAML is required. Install with: pip install pyyaml"
        )
    with path.open(encoding="utf-8") as fh:
        data = yaml.safe_load(fh) or {}
    if not isinstance(data, dict):
        raise ValueError("archives.yaml must be a mapping at the top level")
    return data


def validate_config(cfg: dict[str, Any], repo_root: Path) -> list[str]:
    """Return a list of validation error strings (empty = ok)."""
    errors: list[str] = []
    for key in REQUIRED_TOP:
        if key not in cfg:
            errors.append(f"missing top-level key: {key}")

    vault = cfg.get("vault") or {}
    if not isinstance(vault, dict):
        errors.append("vault must be a mapping")
    else:
        materials = vault.get("materials") or []
        for name in REQUIRED_MATERIAL_DIRS:
            if name not in materials:
                errors.append(f"vault.materials missing required dir: {name}")
            if not (repo_root / name).exists():
                # Not fatal for validate during setup — setup creates them
                pass

    sources = cfg.get("sources")
    if sources is None:
        errors.append("sources is required")
    elif not isinstance(sources, list):
        errors.append("sources must be a list")
    else:
        for i, src in enumerate(sources):
            if not isinstance(src, dict):
                errors.append(f"sources[{i}] must be a mapping")
                continue
            if "name" not in src:
                errors.append(f"sources[{i}] missing name")
            if "type" not in src:
                errors.append(f"sources[{i}] missing type")
            if "enabled" not in src:
                errors.append(f"sources[{i}] missing enabled")
            material = src.get("material")
            if material is not None and material not in REQUIRED_MATERIAL_DIRS:
                errors.append(
                    f"sources[{i}] ({src.get('name', '?')}) material "
                    f"must be one of {list(REQUIRED_MATERIAL_DIRS)}, got {material!r}"
                )
            # Enabled git/local sources that stage should declare material for promote
            if (
                src.get("enabled")
                and src.get("type") in ("git", "local")
                and material is None
            ):
                errors.append(
                    f"sources[{i}] ({src.get('name', '?')}) enabled "
                    f"{src.get('type')} source missing material"
                )

    return errors


def enabled_sources(cfg: dict[str, Any]) -> list[dict[str, Any]]:
    return [s for s in (cfg.get("sources") or []) if s.get("enabled")]


def deferred_sources(cfg: dict[str, Any]) -> list[dict[str, Any]]:
    return [s for s in (cfg.get("sources") or []) if not s.get("enabled")]
