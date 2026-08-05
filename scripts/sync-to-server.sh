#!/usr/bin/env bash
# Sync local Minecraft config → remote via SFTP (rclone).
# UltraServers (và nhiều host panel) chỉ cho SFTP, không có SSH shell → rsync không dùng được.
#
# ⚠️  AI AGENT KHÔNG ĐƯỢC TỰ CHẠY VỚI --apply (xem .cursor/rules/no-apply-sync.mdc).
#     Chỉ user tự deploy thật. Agent chỉ chạy dry-run để preview.
#
# Usage:
#   ./scripts/sync-to-server.sh                       # dry-run toàn bộ
#   ./scripts/sync-to-server.sh --apply               # sync thật
#   ./scripts/sync-to-server.sh --apply plugins/MMOItems
#   ./scripts/sync-to-server.sh --apply --delete plugins/DeluxeMenus
#   ./scripts/sync-to-server.sh --pull                # kéo từ server (dry-run)
#   ./scripts/sync-to-server.sh --pull --apply
#
# Credentials: .env ở root repo
#   SFTP_HOST, SFTP_PORT, SFTP_USER, SFTP_PASSWORD, SFTP_PATH

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ENV_FILE="$ROOT/.env"
RCLONE_CONF="$(mktemp -t sync-rclone.XXXXXX.conf)"

APPLY=0
DELETE=0
PULL=0
PATHS=()

die() { echo "ERROR: $*" >&2; exit 1; }
info() { echo "→ $*"; }

usage() {
  cat <<'EOF'
Sync local Minecraft config → remote via SFTP (rclone).

Usage:
  ./scripts/sync-to-server.sh                       # dry-run toàn bộ
  ./scripts/sync-to-server.sh --apply               # sync thật
  ./scripts/sync-to-server.sh --apply plugins/MMOItems
  ./scripts/sync-to-server.sh --apply --delete plugins/DeluxeMenus
  ./scripts/sync-to-server.sh --pull                # kéo từ server (dry-run)
  ./scripts/sync-to-server.sh --pull --apply

Flags: --apply|-a  --delete|-d  --pull|-p  --help|-h
Credentials: .env (SFTP_HOST, SFTP_PORT, SFTP_USER, SFTP_PASSWORD, SFTP_PATH)
EOF
  exit 0
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --apply|-a) APPLY=1; shift ;;
    --delete|-d) DELETE=1; shift ;;
    --pull|-p) PULL=1; shift ;;
    --help|-h) usage ;;
    --) shift; PATHS+=("$@"); break ;;
    -*) die "Unknown option: $1 (try --help)" ;;
    *) PATHS+=("$1"); shift ;;
  esac
done

command -v rclone >/dev/null 2>&1 || die "rclone chưa cài. Chạy: brew install rclone"
[[ -f "$ENV_FILE" ]] || die "Missing $ENV_FILE"

# Disable history expansion so passwords with '!' survive sourcing
set +H
set -a
# shellcheck disable=SC1090
source "$ENV_FILE"
set +a

: "${SFTP_HOST:?SFTP_HOST missing in .env}"
: "${SFTP_USER:?SFTP_USER missing in .env}"
: "${SFTP_PORT:=22}"
: "${SFTP_PATH:=/}"
: "${SFTP_PASSWORD:?SFTP_PASSWORD missing in .env}"

# Normalize remote path: empty / ~ → /
REMOTE_ROOT="${SFTP_PATH}"
[[ "$REMOTE_ROOT" == "~" || "$REMOTE_ROOT" == "~/" || -z "$REMOTE_ROOT" ]] && REMOTE_ROOT="/"
REMOTE_ROOT="/${REMOTE_ROOT#/}"
REMOTE_ROOT="${REMOTE_ROOT%/}"
[[ -z "$REMOTE_ROOT" ]] && REMOTE_ROOT="/"

cleanup() { rm -f "$RCLONE_CONF"; }
trap cleanup EXIT

# Temp rclone remote (password never written to disk in repo)
cat > "$RCLONE_CONF" <<EOF
[mc]
type = sftp
host = ${SFTP_HOST}
user = ${SFTP_USER}
port = ${SFTP_PORT}
pass = $(rclone obscure "$SFTP_PASSWORD")
shell_type = none
md5sum_command = none
sha1sum_command = none
known_hosts_file = none
EOF

# Filters aligned with .gitignore — never push runtime/world/binary junk
FILTERS=(
  --exclude '.git/**'
  --exclude '.env'
  --exclude '.env.*'
  --exclude '.DS_Store'
  --exclude 'Thumbs.db'
  --exclude '.cursor/**'
  --exclude '.agents/**'
  --exclude '.vscode/**'
  --exclude '.claude/**'
  --exclude 'scripts/__pycache__/**'
  --exclude '*.pyc'
  --exclude '*.jar'
  --exclude '*.db'
  --exclude '*.db-shm'
  --exclude '*.db-wal'
  --exclude '*.db-journal'
  --exclude 'cache/**'
  --exclude 'libraries/**'
  --exclude 'logs/**'
  --exclude 'versions/**'
  --exclude 'jre-17/**'
  --exclude 'world/**'
  --exclude 'world_nether/**'
  --exclude 'world_the_end/**'
  --exclude 'world_prison/**'
  --exclude 'world_pvp/**'
  --exclude 'world_dungeon/**'
  --exclude 'world_dungeon_2/**'
  --exclude 'world_magadungeon/**'
  --exclude 'test/**'
  --exclude 'world*/**'
  --exclude 'usercache.json'
  --exclude 'usernamecache.json'
  --exclude 'whitelist.json'
  --exclude 'ops.json'
  --exclude 'banned-ips.json'
  --exclude 'banned-players.json'
  --exclude '.console_history'
  --exclude 'plugins/update/**'
  --exclude 'plugins/Updater/**'
  --exclude 'plugins/bStats/**'
  --exclude 'plugins/pStats/**'
  --exclude 'plugins/PluginMetrics/**'
  --exclude 'plugins/**/userdata/**'
  --exclude 'plugins/**/backups/**'
  --exclude 'plugins/Multiverse-Inventories/players/**'
  --exclude 'plugins/SkinsRestorer/cache/**'
  --exclude 'plugins/SkinsRestorer/skins/**'
  --exclude 'plugins/WorldGuard/cache/**'
  --exclude 'plugins/X-Prison/mines/*.json'
  --exclude 'plugins/FastAsyncWorldEdit/clipboard/**'
  --exclude 'plugins/FastAsyncWorldEdit/history/**'
  --exclude 'plugins/RoseGarden/tmp/**'
  --exclude 'plugins/CorePlugin/altar-data.yml'
  --exclude 'plugins/MMOItems/.jar_extracted/**'
  --exclude '**/resourcepack/**'
  --exclude '**/mmoinv_rp_3/**'
  --exclude 'dailyquest/data/**'
  --exclude 'note.md'
  --exclude 'debug/**'
  --exclude 'docs/**'
  --exclude 'CLAUDE.md'
  --exclude 'DOCS_HE_THONG_PRISON.md'
  --exclude 'STAT_BALANCING_STANDARD.md'
  --exclude 'spritesheet.png'
)

RCLONE_OPTS=(
  --config "$RCLONE_CONF"
  --progress
  --transfers 8
  --checkers 16
  --sftp-idle-timeout 60s
  "${FILTERS[@]}"
)

[[ "$APPLY" -eq 0 ]] && RCLONE_OPTS+=(--dry-run)
# --delete on remote files missing locally (only with explicit --delete)
DELETE_FLAG=()
[[ "$DELETE" -eq 1 ]] && DELETE_FLAG=(--delete-during)

if [[ ${#PATHS[@]} -eq 0 ]]; then
  REL_LABEL="."
else
  REL_LABEL="${PATHS[*]}"
fi

info "Host:     $SFTP_USER@$SFTP_HOST:$SFTP_PORT"
info "Remote:   $REMOTE_ROOT"
info "Paths:    $REL_LABEL"
info "Mode:     $([[ $PULL -eq 1 ]] && echo PULL || echo PUSH) / $([[ $APPLY -eq 1 ]] && echo APPLY || echo DRY-RUN)$([[ $DELETE -eq 1 ]] && echo ' + DELETE')"
info "Backend:  rclone SFTP (host không hỗ trợ SSH/rsync)"
if [[ "$APPLY" -eq 0 ]]; then
  info "Dry-run only. Thêm --apply để sync thật."
fi
echo

remote_uri() {
  local rel="${1#/}"
  if [[ "$REMOTE_ROOT" == "/" ]]; then
    echo "mc:/${rel}"
  else
    echo "mc:${REMOTE_ROOT}/${rel}"
  fi
}

sync_one() {
  local src="$1"
  local dst="$2"
  if [[ "$DELETE" -eq 1 ]]; then
    rclone sync "${RCLONE_OPTS[@]}" "${DELETE_FLAG[@]}" "$src" "$dst"
  else
    # copy: chỉ thêm/ghi đè, không xóa file trên remote
    rclone copy "${RCLONE_OPTS[@]}" "$src" "$dst"
  fi
}

# Base rclone flags without path filters (for single-file copyto)
RCLONE_BASE=(
  --config "$RCLONE_CONF"
  --progress
  --transfers 8
  --checkers 16
  --sftp-idle-timeout 60s
)
[[ "$APPLY" -eq 0 ]] && RCLONE_BASE+=(--dry-run)

copy_file() {
  local src="$1"
  local dst="$2"
  rclone copyto "${RCLONE_BASE[@]}" "$src" "$dst"
}

if [[ "$PULL" -eq 1 ]]; then
  if [[ ${#PATHS[@]} -eq 0 ]]; then
    sync_one "$(remote_uri "")" "$ROOT/"
  else
    for p in "${PATHS[@]}"; do
      rel="${p#/}"
      loc="$ROOT/$rel"
      info "Pull $rel"
      if [[ -d "$loc" || "$p" == */ ]]; then
        mkdir -p "$loc"
        sync_one "$(remote_uri "$rel")" "$loc/"
      else
        mkdir -p "$(dirname "$loc")"
        copy_file "$(remote_uri "$rel")" "$loc"
      fi
    done
  fi
else
  if [[ ${#PATHS[@]} -eq 0 ]]; then
    sync_one "$ROOT/" "$(remote_uri "")"
  else
    for p in "${PATHS[@]}"; do
      local_path="$p"
      [[ "$local_path" != /* ]] && local_path="$ROOT/$local_path"
      [[ -e "$local_path" ]] || die "Path not found: $p"
      rel="${local_path#"$ROOT"/}"
      info "Push $rel"
      if [[ -d "$local_path" ]]; then
        sync_one "${local_path%/}/" "$(remote_uri "$rel")"
      else
        copy_file "$local_path" "$(remote_uri "$rel")"
      fi
    done
  fi
fi

echo
if [[ "$APPLY" -eq 0 ]]; then
  info "Dry-run xong. Chạy lại với --apply khi ổn."
else
  info "Sync hoàn tất."
fi
