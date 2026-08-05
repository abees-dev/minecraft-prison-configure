# sync-to-server.sh — Đồng bộ config lên server (SFTP/rclone)

Đẩy config Minecraft từ máy local lên server qua **SFTP** (dùng `rclone`).
Host UltraServers chỉ mở **SFTP**, không có SSH shell → **không dùng được `rsync`**.

> ⚠️ **QUAN TRỌNG:** AI agent **không được tự chạy `--apply`**. Chỉ user mới chạy deploy thật.
> Xem rule `.cursor/rules/no-apply-sync.mdc`. Agent chỉ chạy dry-run để preview.

## Yêu cầu

- `rclone` (đã cài qua Homebrew):
  ```bash
  brew install rclone
  ```
- File `.env` ở root repo (đã có, bị `.gitignore` bỏ qua vì chứa mật khẩu):
  ```env
  SFTP_HOST=matcha.ultraservers.com
  SFTP_PORT=60002
  SFTP_USER="tqfxnkco.10cbb10b"
  SFTP_PASSWORD='NU9SZrFC6Bs!Dvp'
  SFTP_PATH='/'
  ```
  - `SFTP_PASSWORD` nên đặt trong nháy đơn `'...'` vì có ký tự đặc biệt (`!`).
  - `SFTP_PATH` là thư mục gốc trên server (`/`).

## Cách dùng

```bash
# Dry-run TOÀN BỘ (preview, không đẩy gì) — mặc định
./scripts/sync-to-server.sh

# Dry-run một phần
./scripts/sync-to-server.sh plugins/MMOItems

# Deploy THẬT — chỉ USER tự chạy, agent KHÔNG được chạy
./scripts/sync-to-server.sh --apply
./scripts/sync-to-server.sh --apply plugins/MMOItems

# Kéo file từ server về local (mặc định cũng dry-run)
./scripts/sync-to-server.sh --pull
./scripts/sync-to-server.sh --pull --apply plugins/Essentials

# Deploy có XÓA file thừa trên server (cẩn thận!)
./scripts/sync-to-server.sh --apply --delete plugins/DeluxeMenus
```

### Flags

| Flag | Ý nghĩa |
|------|---------|
| `--apply`, `-a` | Chạy thật. Không có flag này = **dry-run** (chỉ preview). |
| `--delete`, `-d` | Xóa file ở đích nếu local không còn (dùng `rclone sync`). Không có flag = `rclone copy` (chỉ thêm/ghi đè, **không xóa**). |
| `--pull`, `-p` | Đảo chiều: kéo từ server về local. |
| `--help`, `-h` | In hướng dẫn. |

Có thể truyền một hoặc nhiều đường dẫn (tương đối so với root repo) để chỉ sync phần đó. Không truyền = sync toàn bộ repo.

## Hành vi & an toàn

- **Mặc định là dry-run.** Phải thêm `--apply` mới ghi thật.
- Không `--delete` = chỉ **thêm/ghi đè**, không bao giờ xóa file trên server.
- Loại trừ (exclude) đồng bộ với `.gitignore`: world data, `*.jar`, `*.db`, logs, cache, userdata, resourcepack, docs/note nội bộ… (xem danh sách `--exclude` trong script).
- Mật khẩu **không** ghi ra đĩa trong repo: script tạo file config `rclone` tạm (`mktemp`), obscure mật khẩu, và xóa khi kết thúc (`trap cleanup EXIT`).
- Chạy `set +H` để mật khẩu có `!` không bị history expansion khi `source .env`.

## Ghi chú

- Lần đầu remote có thể chưa có `plugins/` — sync full sẽ tạo mới. Kiểm tra đúng server trước khi deploy toàn bộ.
- Nếu thấy `NOTICE: No host key validation` → đã tắt bằng `known_hosts_file = none` trong config tạm.
