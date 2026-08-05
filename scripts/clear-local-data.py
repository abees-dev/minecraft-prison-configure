#!/usr/bin/env python3
"""Clear local Minecraft server runtime data (keeps YAML configs).

Refuses to run while the Paper/Java server process is active.

Modes:
  player  - playerdata / inventories / essentials userdata (default)
  cache   - FAWE history/clipboard, WG cache, SkinsRestorer, Paper cache
  logs    - logs/ and plugin *.log
  war     - reset Bang Chiến spawn/start/exit locations (backs up war-data.yml);
            never included in "all" because these are admin-set, not runtime data
  all     - player + cache + logs

Examples:
  python scripts/clear-local-data.py
  python scripts/clear-local-data.py --mode all
  python scripts/clear-local-data.py --mode war --force
  python scripts/clear-local-data.py --mode player --include-authme
"""
from __future__ import annotations

import argparse
import re
import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
if not (ROOT / "server.properties").is_file():
    ROOT = Path(__file__).resolve().parent


def server_running() -> bool:
    """Return True if a Java process is running THIS server.

    Matches on the server root path or a Paper/Spigot jar so that Minecraft
    client launchers (TLauncher etc.) are not mistaken for the server.
    """
    root_pattern = re.compile(re.escape(str(ROOT)), re.I)
    jar_pattern = re.compile(r"\b(paper|spigot|purpur|craftbukkit)[-\w.]*\.jar\b", re.I)

    if sys.platform == "win32":
        try:
            out = subprocess.check_output(
                [
                    "powershell",
                    "-NoProfile",
                    "-Command",
                    "Get-CimInstance Win32_Process | "
                    "Where-Object { $_.Name -match '^(java|javaw)\\.exe$' } | "
                    "Select-Object -ExpandProperty CommandLine",
                ],
                text=True,
                stderr=subprocess.DEVNULL,
                timeout=15,
            )
        except (subprocess.SubprocessError, OSError):
            return False
        lines = [line for line in out.splitlines() if line.strip()]
    else:
        try:
            out = subprocess.check_output(["ps", "aux"], text=True, stderr=subprocess.DEVNULL)
        except (subprocess.SubprocessError, OSError):
            return False
        lines = [line for line in out.splitlines() if "java" in line.lower()]

    return any(
        root_pattern.search(line) or jar_pattern.search(line)
        for line in lines
    )


def remove_path(path: Path, label: str) -> None:
    if not path.exists():
        print(f"  skip  {label} (missing)")
        return
    try:
        if path.is_dir():
            shutil.rmtree(path)
        else:
            path.unlink()
        print(f"  ok    {label}")
    except OSError as exc:
        print(f"  FAIL  {label} — {exc}")


def clear_children(base: Path, label: str) -> None:
    if not base.is_dir():
        print(f"  skip  {label} (missing)")
        return
    children = list(base.iterdir())
    if not children:
        print(f"  skip  {label} (empty)")
        return
    for child in children:
        remove_path(child, f"{label}/{child.name}")


def clear_player(include_authme: bool) -> None:
    print("\n[player]")
    for world in ROOT.iterdir():
        if not world.is_dir():
            continue
        if not (world.name == "world" or world.name.startswith("world_")):
            continue
        remove_path(world / "playerdata", f"world {world.name}/playerdata")
        remove_path(world / "stats", f"world {world.name}/stats")
        remove_path(world / "advancements", f"world {world.name}/advancements")

    remove_path(ROOT / "plugins" / "Essentials" / "userdata", "Essentials/userdata")
    remove_path(
        ROOT / "plugins" / "Multiverse-Inventories" / "players",
        "MV-Inventories/players",
    )
    remove_path(ROOT / "plugins" / "PlayerVaults" / "playerVaults", "PlayerVaults")
    remove_path(ROOT / "plugins" / "RPGInventory" / "data", "RPGInventory/data")
    remove_path(ROOT / "plugins" / "CorePlugin" / "altar-data.yml", "CorePlugin/altar-data.yml")

    plugins = ROOT / "plugins"
    if plugins.is_dir():
        for userdata in plugins.rglob("userdata"):
            if userdata.is_dir():
                remove_path(userdata, f"plugin/{userdata.parent.name}/userdata")

    mv_inv = ROOT / "plugins" / "Multiverse-Inventories"
    if mv_inv.is_dir():
        for json_file in mv_inv.rglob("*.json"):
            parts = {p.lower() for p in json_file.parts}
            if "groups" in parts or "worlds" in parts:
                remove_path(json_file, f"MV-Inv/{json_file.name}")

    if include_authme:
        remove_path(ROOT / "plugins" / "AuthMe" / "authme.db", "AuthMe/authme.db")
    else:
        print("  keep  AuthMe (pass --include-authme to wipe)")


def clear_cache() -> None:
    print("\n[cache]")
    remove_path(ROOT / "cache", "Paper/cache")
    remove_path(ROOT / "plugins" / "WorldGuard" / "cache", "WorldGuard/cache")
    remove_path(ROOT / "plugins" / "SkinsRestorer" / "cache", "SkinsRestorer/cache")
    remove_path(ROOT / "plugins" / "FastAsyncWorldEdit" / "clipboard", "FAWE/clipboard")
    remove_path(ROOT / "plugins" / "FastAsyncWorldEdit" / "history", "FAWE/history")
    mines = ROOT / "plugins" / "X-Prison" / "mines"
    if mines.is_dir():
        for json_file in mines.glob("*.json"):
            remove_path(json_file, f"X-Prison mine json/{json_file.name}")
    else:
        print("  skip  X-Prison mine json (missing)")


def clear_logs() -> None:
    print("\n[logs]")
    clear_children(ROOT / "logs", "logs")
    plugins = ROOT / "plugins"
    if plugins.is_dir():
        for log_file in plugins.rglob("*"):
            if log_file.is_file() and (
                log_file.suffix == ".log" or log_file.name.endswith(".log.gz")
            ):
                remove_path(log_file, f"plugin-log/{log_file.name}")


def clear_war() -> None:
    print("\n[war]")
    war_data = ROOT / "plugins" / "CorePlugin" / "gang" / "war-data.yml"
    if not war_data.is_file():
        print("  skip  war-data.yml (missing)")
        return

    backup = war_data.with_suffix(".yml.bak")
    shutil.copy2(war_data, backup)
    war_data.write_text(
        "# Bang Chiến locations — cleared by scripts/clear-local-data.py\n"
        "# Re-set with /gang war setspawn | setstart | setexit\n",
        encoding="utf-8",
    )
    print(f"  ok    CorePlugin/gang/war-data.yml (reset, backup: {backup.name})")


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--mode",
        choices=("player", "cache", "logs", "war", "all"),
        default="player",
    )
    parser.add_argument(
        "--include-authme",
        action="store_true",
        help="Also delete AuthMe authme.db (resets all logins)",
    )
    parser.add_argument(
        "--force",
        action="store_true",
        help="Skip interactive YES confirmation",
    )
    args = parser.parse_args()

    print()
    print("=== clear-local-data ===")
    print(f"Root : {ROOT}")
    print(f"Mode : {args.mode}")
    print()

    if server_running():
        print("ABORT: Minecraft server Java process is running.")
        print("Stop the server first, then re-run this script.")
        return 1

    if not args.force:
        print("This will DELETE local runtime data (configs are kept).")
        if args.include_authme:
            print("WARNING: --include-authme will wipe AuthMe logins.")
        ans = input("Type YES to continue: ").strip()
        if ans != "YES":
            print("Cancelled.")
            return 0

    if args.mode in ("player", "all"):
        clear_player(args.include_authme)
    if args.mode in ("cache", "all"):
        clear_cache()
    if args.mode in ("logs", "all"):
        clear_logs()
    if args.mode == "war":
        clear_war()

    print("\nDone. Start the server when ready.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
