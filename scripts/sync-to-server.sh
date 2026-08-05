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

# Exclude patterns relative to repo root, aligned with .gitignore.
# Patterns without '/' (or starting with '**/') match at any depth.
EXCLUDE_PATTERNS=(
  '.git/**'
  '.env'
  '.env.*'
  '.DS_Store'
  'Thumbs.db'
  '.cursor/**'
  '.agents/**'
  '.vscode/**'
  '.claude/**'
  'scripts/__pycache__/**'
  '*.pyc'
  '*.jar'
  '*.db'
  '*.db-shm'
  '*.db-wal'
  '*.db-journal'
  'cache/**'
  'libraries/**'
  'logs/**'
  'versions/**'
  'jre-17/**'
  'world/**'
  'world_nether/**'
  'world_the_end/**'
  'world_prison/**'
  'world_pvp/**'
  'world_dungeon/**'
  'world_dungeon_2/**'
  'world_magadungeon/**'
  'test/**'
  'world*/**'
  'usercache.json'
  'usernamecache.json'
  'whitelist.json'
  'ops.json'
  'banned-ips.json'
  'banned-players.json'
  '.console_history'
  'plugins/update/**'
  'plugins/Updater/**'
  'plugins/bStats/**'
  'plugins/pStats/**'
  'plugins/PluginMetrics/**'
  'plugins/**/userdata/**'
  'plugins/**/backups/**'
  'plugins/Multiverse-Inventories/players/**'
  'plugins/SkinsRestorer/cache/**'
  'plugins/SkinsRestorer/skins/**'
  'plugins/WorldGuard/cache/**'
  'plugins/X-Prison/mines/*.json'
  'plugins/FastAsyncWorldEdit/clipboard/**'
  'plugins/FastAsyncWorldEdit/history/**'
  'plugins/RoseGarden/tmp/**'
  'plugins/CorePlugin/altar-data.yml'
  'plugins/MMOItems/.jar_extracted/**'
  'plugins/ItemsAdder/contents_disabled/**'
  '**/resourcepack/**'
  '**/mmoinv_rp_3/**'
  'dailyquest/data/**'
  'note.md'
  'debug/**'
  'docs/**'
  'CLAUDE.md'
  'DOCS_HE_THONG_PRISON.md'
  'STAT_BALANCING_STANDARD.md'
  'spritesheet.png'
)

# rclone matches filters against paths relative to the sync root, so a pattern
# anchored at repo root must be re-anchored when syncing a sub-directory.
# Prints the remainder of $1 after consuming the segments of $2, or fails when
# the pattern targets an unrelated tree.
rebase_pattern() {
  local pattern="$1" base="$2"
  local -a P B
  IFS='/' read -ra P <<< "$pattern"
  IFS='/' read -ra B <<< "$base"
  local i
  for ((i = 0; i < ${#B[@]}; i++)); do
    [[ -n "${P[i]:-}" ]] || return 1
    if [[ "${P[i]}" == '**' ]]; then
      break
    fi
    # shellcheck disable=SC2053
    [[ "${B[i]}" == ${P[i]} ]] || return 1
  done
  (IFS='/'; printf '%s' "${P[*]:i}")
}

build_filters() {
  local base="${1%/}"
  FILTERS=()
  local p rebased
  for p in "${EXCLUDE_PATTERNS[@]}"; do
    if [[ -z "$base" || "$p" != */* || "$p" == '**/'* ]]; then
      FILTERS+=(--exclude "$p")
    elif rebased="$(rebase_pattern "$p" "$base")" && [[ -n "$rebased" ]]; then
      FILTERS+=(--exclude "$rebased")
    fi
  done
}

RCLONE_OPTS=(
  --config "$RCLONE_CONF"
  --progress
  --transfers 8
  --checkers 16
  --sftp-idle-timeout 60s
  # Panel SFTP không cho rename đè file đã tồn tại → ghi thẳng, bỏ bước .partial
  --inplace
  --no-update-dir-modtime
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

# $3 = đường dẫn (tương đối repo root) của thư mục đang sync, để re-anchor filter
sync_one() {
  local src="$1"
  local dst="$2"
  build_filters "${3:-}"
  if [[ "$DELETE" -eq 1 ]]; then
    rclone sync "${RCLONE_OPTS[@]}" "${FILTERS[@]}" "${DELETE_FLAG[@]}" "$src" "$dst"
  else
    # copy: chỉ thêm/ghi đè, không xóa file trên remote
    rclone copy "${RCLONE_OPTS[@]}" "${FILTERS[@]}" "$src" "$dst"
  fi
}

# copyto không nhận filter — dùng cho file đơn lẻ user chỉ định rõ
copy_file() {
  local src="$1"
  local dst="$2"
  rclone copyto "${RCLONE_OPTS[@]}" "$src" "$dst"
}

if [[ "$PULL" -eq 1 ]]; then
  if [[ ${#PATHS[@]} -eq 0 ]]; then
    sync_one "$(remote_uri "")" "$ROOT/" ""
  else
    for p in "${PATHS[@]}"; do
      rel="${p#/}"
      rel="${rel%/}"
      loc="$ROOT/$rel"
      info "Pull $rel"
      if [[ -d "$loc" || "$p" == */ ]]; then
        mkdir -p "$loc"
        sync_one "$(remote_uri "$rel")" "$loc/" "$rel"
      else
        mkdir -p "$(dirname "$loc")"
        copy_file "$(remote_uri "$rel")" "$loc"
      fi
    done
  fi
else
  if [[ ${#PATHS[@]} -eq 0 ]]; then
    sync_one "$ROOT/" "$(remote_uri "")" ""
  else
    for p in "${PATHS[@]}"; do
      local_path="$p"
      [[ "$local_path" != /* ]] && local_path="$ROOT/$local_path"
      [[ -e "$local_path" ]] || die "Path not found: $p"
      rel="${local_path#"$ROOT"/}"
      rel="${rel%/}"
      info "Push $rel"
      if [[ -d "$local_path" ]]; then
        sync_one "${local_path%/}/" "$(remote_uri "$rel")" "$rel"
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
