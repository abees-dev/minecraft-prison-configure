# Runbook đồng bộ và triển khai

Trạng thái: **Live**  
Nguồn chuẩn: `scripts/sync-to-server.sh`, `sync-jars-to-server.sh` và [`../../scripts/README-sync.md`](../../scripts/README-sync.md).

## Nguyên tắc

- Mặc định chỉ chạy dry-run để xem trước.
- Chỉ người vận hành có thẩm quyền mới chạy `--apply`.
- Config và JAR dùng hai script riêng.
- Không dùng `--delete` nếu chưa xác nhận chính xác phạm vi và danh sách file sẽ xóa.
- Credential chỉ đặt trong `.env` không commit; không paste credential vào docs/log/chat.

## Quy trình chuẩn

1. Kiểm tra thay đổi Git và giới hạn đúng thư mục cần deploy.
2. Chạy dry-run cho đúng subpath, ví dụ `./scripts/sync-to-server.sh plugins/CorePlugin`.
3. Đọc toàn bộ danh sách add/change; với delete phải có backup.
4. Dừng server nếu module/plugin không hỗ trợ reload an toàn.
5. Người vận hành chạy lại cùng lệnh với `--apply`.
6. Reload đúng module hoặc restart server.
7. Thực hiện smoke test và kiểm tra console/log.
8. Commit/tag lại phiên bản config đã deploy nếu cần truy vết.

## Smoke test tối thiểu

- Server khởi động không có stack trace mới.
- Player thường đăng nhập và dùng được menu/lệnh chính.
- Permission được test bằng tài khoản không OP.
- GUI mở được, item/reward không mất khi inventory đầy.
- Dữ liệu SQL/YAML còn nguyên sau restart.
- Placeholder, scoreboard, chat và resource pack hoạt động.

## Rollback

1. Xác định commit/config tốt gần nhất.
2. Preview chính xác các file rollback bằng dry-run.
3. Backup trạng thái production hiện tại, đặc biệt DB và file runtime.
4. Người vận hành apply bản tốt.
5. Restart/reload theo yêu cầu của module và chạy lại smoke test.

Không rollback file dữ liệu người chơi chỉ bằng cách chép config cũ. Database và runtime data cần quy trình khôi phục riêng.
