#!/usr/bin/env bash
# Sync *.jar lần đầu lên server via SFTP (rclone).
# Tách riêng khỏi sync-to-server.sh (script đó exclude toàn bộ *.jar).
#
# ⚠️  AI AGENT KHÔNG ĐƯỢC TỰ CHẠY VỚI --apply (xem .cursor/rules/no-apply-sync.mdc).
#     Chỉ user tự deploy thật. Agent chỉ chạy dry-run để preview.
#
# Usage:
#   ./scripts/sync-jars-to-server.sh                  # dry-run toàn bộ *.jar
#   ./scripts/sync-jars-to-server.sh --apply          # đẩy thật
#   ./scripts/sync-jars-to-server.sh --apply plugins  # chỉ jar trong plugins/
#   ./scripts/sync-jars-to-server.sh paper.jar        # một file cụ thể
#
# Credentials: .env ở root repo (SFTP_HOST, SFTP_PORT, SFTP_USER, SFTP_PASSWORD, SFTP_PATH)

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ENV_FILE="$ROOT/.env"
RCLONE_CONF="$(mktemp -t sync-jars-rclone.XXXXXX.conf)"

APPLY=0
PATHS=()

die() { echo "ERROR: $*" >&2; exit 1; }
info() { echo "→ $*"; }

usage() {
  cat <<'EOF'
Sync *.jar lần đầu lên server via SFTP (rclone).

Tách riêng khỏi sync-to-server.sh (script config exclude *.jar).

Usage:
  ./scripts/sync-jars-to-server.sh                  # dry-run toàn bộ *.jar
  ./scripts/sync-jars-to-server.sh --apply          # đẩy thật
  ./scripts/sync-jars-to-server.sh --apply plugins  # chỉ jar trong plugins/
  ./scripts/sync-jars-to-server.sh paper.jar        # một file cụ thể

Flags: --apply|-a  --help|-h
Credentials: .env (SFTP_HOST, SFTP_PORT, SFTP_USER, SFTP_PASSWORD, SFTP_PATH)

Chỉ đẩy *.jar. Không xóa jar trên server. Không sync config/world.
EOF
  exit 0
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --apply|-a) APPLY=1; shift ;;
    --help|-h) usage ;;
    --) shift; PATHS+=("$@"); break ;;
    -*) die "Unknown option: $1 (try --help)" ;;
    *) PATHS+=("$1"); shift ;;
  esac
done

command -v rclone >/dev/null 2>&1 || die "rclone chưa cài. Chạy: brew install rclone"
[[ -f "$ENV_FILE" ]] || die "Missing $ENV_FILE"

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

REMOTE_ROOT="${SFTP_PATH}"
[[ "$REMOTE_ROOT" == "~" || "$REMOTE_ROOT" == "~/" || -z "$REMOTE_ROOT" ]] && REMOTE_ROOT="/"
REMOTE_ROOT="/${REMOTE_ROOT#/}"
REMOTE_ROOT="${REMOTE_ROOT%/}"
[[ -z "$REMOTE_ROOT" ]] && REMOTE_ROOT="/"

cleanup() { rm -f "$RCLONE_CONF"; }
trap cleanup EXIT

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

RCLONE_OPTS=(
  --config "$RCLONE_CONF"
  --progress
  --transfers 4
  --checkers 8
  --sftp-idle-timeout 120s
  # Panel SFTP không cho rename đè file đã tồn tại
  --inplace
  --no-update-dir-modtime
  # Chỉ lấy *.jar, bỏ mọi thứ khác
  --include '*.jar'
  --exclude '**'
)

[[ "$APPLY" -eq 0 ]] && RCLONE_OPTS+=(--dry-run)

remote_uri() {
  local rel="${1#/}"
  if [[ "$REMOTE_ROOT" == "/" ]]; then
    echo "mc:/${rel}"
  else
    echo "mc:${REMOTE_ROOT}/${rel}"
  fi
}

count_jars() {
  local dir="$1"
  find "$dir" -type f -name '*.jar' 2>/dev/null | wc -l | tr -d ' '
}

if [[ ${#PATHS[@]} -eq 0 ]]; then
  REL_LABEL="."
else
  REL_LABEL="${PATHS[*]}"
fi

info "Host:     $SFTP_USER@$SFTP_HOST:$SFTP_PORT"
info "Remote:   $REMOTE_ROOT"
info "Paths:    $REL_LABEL"
info "Mode:     JAR PUSH / $([[ $APPLY -eq 1 ]] && echo APPLY || echo DRY-RUN)"
info "Backend:  rclone SFTP (chỉ *.jar)"
if [[ "$APPLY" -eq 0 ]]; then
  info "Dry-run only. Thêm --apply để đẩy jar thật."
fi
echo

push_dir() {
  local local_dir="$1"
  local remote_rel="$2"
  local n
  n="$(count_jars "$local_dir")"
  info "Push jars từ ${remote_rel:-.}/ ($n file *.jar)"
  if [[ "$n" -eq 0 ]]; then
    info "Không có *.jar — bỏ qua."
    return 0
  fi
  rclone copy "${RCLONE_OPTS[@]}" "${local_dir%/}/" "$(remote_uri "$remote_rel")"
}

push_file() {
  local local_file="$1"
  local rel="$2"
  local opts=(--config "$RCLONE_CONF" --progress --inplace --no-update-dir-modtime)
  [[ "$APPLY" -eq 0 ]] && opts+=(--dry-run)
  [[ "$local_file" == *.jar ]] || die "Không phải .jar: $rel"
  info "Push $rel"
  rclone copyto "${opts[@]}" "$local_file" "$(remote_uri "$rel")"
}

if [[ ${#PATHS[@]} -eq 0 ]]; then
  push_dir "$ROOT" ""
else
  for p in "${PATHS[@]}"; do
    local_path="$p"
    [[ "$local_path" != /* ]] && local_path="$ROOT/$local_path"
    [[ -e "$local_path" ]] || die "Path not found: $p"
    rel="${local_path#"$ROOT"/}"
    rel="${rel%/}"
    if [[ -d "$local_path" ]]; then
      push_dir "$local_path" "$rel"
    else
      push_file "$local_path" "$rel"
    fi
  done
fi

echo
if [[ "$APPLY" -eq 0 ]]; then
  info "Dry-run xong. Chạy lại với --apply khi ổn."
else
  info "Sync jars hoàn tất."
fi
