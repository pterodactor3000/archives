"""archives CLI — setup | ingest | organize | status | index."""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

from . import __version__
from .config import find_repo_root
from .index_cmd import run_index
from .ingest_cmd import run_ingest
from .organize_cmd import run_organize
from .setup_cmd import run_setup
from .status_cmd import run_status


def build_parser() -> argparse.ArgumentParser:
    p = argparse.ArgumentParser(
        prog="archives",
        description="Boring learning-vault CLI: owned copies of study materials.",
    )
    p.add_argument("--version", action="version", version=f"%(prog)s {__version__}")
    p.add_argument(
        "--root",
        type=Path,
        default=None,
        help="Vault root (default: directory containing archives.yaml)",
    )
    sub = p.add_subparsers(dest="command", required=True)

    sub.add_parser("setup", help="Ensure dirs and validate archives.yaml")

    ing = sub.add_parser(
        "ingest",
        help=(
            "Stage enabled sources into ingest/, then promote owned copies "
            "into material/{name}/ (never deletes upstream sources)"
        ),
    )
    ing.add_argument(
        "--dry-run",
        action="store_true",
        help="Show stage + promote steps without writing",
    )

    org = sub.add_parser("organize", help="Light normalize of material dirs")
    org.add_argument(
        "--dry-run",
        action="store_true",
        help="Show what would be normalized without writing",
    )

    sub.add_parser("status", help="Show config, counts, and last ingest")

    sub.add_parser(
        "index",
        help="Regenerate root INDEX.md catalog of all vault material files",
    )

    return p


def main(argv: list[str] | None = None) -> int:
    parser = build_parser()
    args = parser.parse_args(argv)
    root = (args.root or find_repo_root()).resolve()

    if args.command == "setup":
        return run_setup(root)
    if args.command == "ingest":
        return run_ingest(root, dry_run=args.dry_run)
    if args.command == "organize":
        return run_organize(root, dry_run=args.dry_run)
    if args.command == "status":
        return run_status(root)
    if args.command == "index":
        return run_index(root)

    parser.error(f"unknown command: {args.command}")
    return 2


if __name__ == "__main__":
    sys.exit(main())
