#!/usr/bin/env python3
"""Run Chunky pregen tasks sequentially via RCON (maintenance)."""
from __future__ import annotations

import re
import socket
import struct
import sys
import time
from pathlib import Path

HOST = "127.0.0.1"
PORT = 25575
ROOT = Path(__file__).resolve().parents[1]
PROPS = ROOT / "server.properties"

TASKS = [
    ("world_dungeon", 500),
    ("world_dungeon_2", 500),
    ("world", 1000),
    ("world_prison", 1000),
]


def load_password() -> str:
    for line in PROPS.read_text(encoding="utf-8").splitlines():
        if line.startswith("rcon.password="):
            return line.split("=", 1)[1].strip()
    raise SystemExit("rcon.password missing in server.properties")


def rcon_cmd(command: str, password: str, host: str = HOST, port: int = PORT, retries: int = 5) -> str:
    """One command per TCP connection — Paper may close long-lived RCON sockets."""
    last_err: Exception | None = None
    for attempt in range(1, retries + 1):
        sock = None
        try:
            sock = socket.create_connection((host, port), timeout=60)
            sock.settimeout(60)
            req_id = 0

            def send(rid: int, typ: int, payload: str) -> None:
                body = struct.pack("<ii", rid, typ) + payload.encode("utf-8") + b"\x00\x00"
                sock.sendall(struct.pack("<i", len(body)) + body)

            def recv() -> tuple[int, int, str]:
                def exact(n: int) -> bytes:
                    buf = b""
                    while len(buf) < n:
                        chunk = sock.recv(n - len(buf))
                        if not chunk:
                            raise ConnectionError("RCON connection closed")
                        buf += chunk
                    return buf

                length = struct.unpack("<i", exact(4))[0]
                data = exact(length)
                rid, typ = struct.unpack("<ii", data[:8])
                payload = data[8:-2].decode("utf-8", errors="replace")
                return rid, typ, payload

            req_id += 1
            send(req_id, 3, password)
            rid, _, _ = recv()
            if rid == -1:
                raise SystemExit("RCON auth failed")

            req_id += 1
            cmd_id = req_id
            send(cmd_id, 2, command)
            req_id += 1
            end_id = req_id
            send(end_id, 0, "")
            parts: list[str] = []
            while True:
                rid, _, payload = recv()
                if rid == end_id:
                    break
                if rid == cmd_id and payload:
                    parts.append(payload)
            return "\n".join(parts)
        except (ConnectionError, OSError, TimeoutError, struct.error) as exc:
            last_err = exc
            time.sleep(min(2 * attempt, 8))
        finally:
            if sock is not None:
                try:
                    sock.close()
                except OSError:
                    pass
    raise ConnectionError(f"RCON failed after {retries} tries: {last_err}")


def strip_colors(text: str) -> str:
    text = re.sub(r"§.", "", text)
    text = re.sub(r"&[0-9a-fk-or]", "", text, flags=re.I)
    return text


def start_task(password: str, world: str, radius: int) -> None:
    cmds = [
        f"chunky world {world}",
        "chunky shape square",
        "chunky spawn",
        f"chunky radius {radius}",
        "chunky silent",
        "chunky start",
    ]
    for c in cmds:
        out = strip_colors(rcon_cmd(c, password))
        print(f"> {c}", flush=True)
        if out.strip():
            print(out.strip(), flush=True)


def wait_complete(password: str, world: str, poll_s: float = 10.0) -> None:
    print(f"\n=== Waiting for {world} ===", flush=True)
    idle_rounds = 0
    while True:
        text = strip_colors(rcon_cmd("chunky progress", password))
        print(time.strftime("%H:%M:%S"), text.replace("\n", " | ")[:400], flush=True)
        low = text.lower()
        if "no task" in low or "there are no" in low or not text.strip():
            idle_rounds += 1
            if idle_rounds >= 2:
                print(f"{world}: complete (no active tasks)", flush=True)
                return
        else:
            idle_rounds = 0
            if re.search(r"100([.,]00)?%", text) and ("finished" in low or "complete" in low):
                time.sleep(2)
                raw2 = strip_colors(rcon_cmd("chunky progress", password)).lower()
                if (
                    "no task" in raw2
                    or "there are no" in raw2
                    or not raw2.strip()
                    or "running" not in raw2
                ):
                    print(f"{world}: complete", flush=True)
                    return
        time.sleep(poll_s)


def main() -> int:
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    password = load_password()
    skip = set(sys.argv[1:])
    for world, radius in TASKS:
        if world in skip:
            print(f"skip {world}", flush=True)
            continue
        print(f"\n######## START {world} r{radius} ########", flush=True)
        start_task(password, world, radius)
        wait_complete(password, world)
    print("\nAll worlds done.", flush=True)
    print(strip_colors(rcon_cmd("chunky progress", password)), flush=True)
    print(strip_colors(rcon_cmd("tps", password)), flush=True)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
