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
  SFTP_HOST=sftp.example.com
  SFTP_PORT=22
  SFTP_USER="your-user"
  SFTP_PASSWORD='your-password'
  SFTP_PATH='/path-on-server'
  ```
  - `SFTP_PASSWORD` nên đặt trong nháy đơn `'...'` vì có ký tự đặc biệt (`!`).
  - Lấy host/user/path thật từ nơi quản lý secret của đội, không ghi vào docs hoặc commit.
  - `SFTP_PATH` phải trỏ đúng thư mục server Minecraft trên remote.

## Cách dùng

```bash
# Dry-run TOÀN BỘ (preview, không đẩy gì) — mặc định
./scripts/sync-to-server.sh

# Dry-run một phần
./scripts/sync-to-server.sh plugins/MMOItems

# Deploy THẬT — chỉ USER tự chạy, agent KHÔNG được chạy
./scripts/sync-to-server.sh --apply
./scripts/sync-to-server.sh --apply plugins/MMOItems

# Đẩy *.jar lần đầu — script TÁCH RIÊNG (sync-to-server.sh exclude *.jar)
./scripts/sync-jars-to-server.sh              # dry-run
./scripts/sync-jars-to-server.sh --apply      # đẩy thật
./scripts/sync-jars-to-server.sh --apply plugins

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
- Loại trừ (exclude) đồng bộ với `.gitignore`: world data, `*.jar`, `*.db`, logs, cache, userdata, resourcepack, `plugins/ItemsAdder/contents_disabled`, docs/note nội bộ… (xem mảng `EXCLUDE_PATTERNS` trong script).
- Pattern exclude được viết **tương đối repo root**. Vì rclone so filter theo thư mục sync, script tự re-anchor pattern khi bạn sync subpath (`build_filters`) — nên `./sync-to-server.sh plugins/ItemsAdder` vẫn bỏ qua `contents_disabled`.
- Khi chỉ định **một file** cụ thể, script dùng `rclone copyto` (không nhận filter) → file đó luôn được đẩy.
- Mật khẩu **không** ghi ra đĩa trong repo: script tạo file config `rclone` tạm (`mktemp`), obscure mật khẩu, và xóa khi kết thúc (`trap cleanup EXIT`).
- Chạy `set +H` để mật khẩu có `!` không bị history expansion khi `source .env`.

## Troubleshooting

**`partial file rename failed: MoveRename failed: sftp: "failure" (SSH_FX_FAILURE)`**

Mặc định rclone upload ra file `.partial` rồi rename đè lên file đích. SFTP của panel
không cho rename đè file đã tồn tại → lỗi. Script đã bật `--inplace` (ghi thẳng vào file
đích, bỏ bước `.partial`) nên không còn gặp.

Đánh đổi: nếu kết nối đứt giữa chừng, file trên server có thể bị ghi dở. Chạy lại lệnh
sync là file được ghi đè hoàn chỉnh.

**`NOTICE: Skipped set directory modification time`**

Panel SFTP không cho set modtime cho thư mục. Đã tắt bằng `--no-update-dir-modtime`.

## Ghi chú

- Lần đầu remote có thể chưa có `plugins/` — sync full sẽ tạo mới. Kiểm tra đúng server trước khi deploy toàn bộ.
- Nếu thấy `NOTICE: No host key validation` → đã tắt bằng `known_hosts_file = none` trong config tạm.
