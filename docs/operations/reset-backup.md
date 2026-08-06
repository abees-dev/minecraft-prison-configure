# Runbook reset dữ liệu, backup và restore

Trạng thái: **Live**  
Nguồn chuẩn: `scripts/clear-local-data.py` và `clear-local-data.bat`.

## Phạm vi reset local

Script từ chối chạy khi phát hiện server Java đang hoạt động.

| Mode | Dữ liệu tác động |
| --- | --- |
| `player` | Playerdata, stats, advancements, Essentials userdata, inventory/vault và một số data plugin |
| `cache` | Paper/WorldGuard/SkinsRestorer/FAWE cache và X-Prison mine JSON runtime |
| `logs` | Logs server và plugin |
| `war` | Vị trí Bang Chiến; tạo `war-data.yml.bak` trước khi reset |
| `all` | Player + cache + logs; không bao gồm war |

AuthMe không bị xóa mặc định. `--include-authme` sẽ xóa toàn bộ đăng nhập và chỉ dùng khi đã được phê duyệt rõ ràng.

## Trước khi reset

1. Dừng server và xác nhận đúng server root.
2. Backup world, database và thư mục plugin chứa dữ liệu người chơi.
3. Ghi lại mode, lý do và người phê duyệt.
4. Không dùng `--force` trong lần chạy đầu; đọc danh sách tác động.
5. Với `war`, ghi lại hoặc backup riêng các vị trí spawn/start/exit.

## Sau khi reset

1. Kiểm tra chỉ đúng phạm vi yêu cầu bị xóa.
2. Khởi động server và kiểm tra log migration/schema.
3. Login bằng account test; kiểm tra inventory, rank, quest, gang và rebirth.
4. Với mode war, đặt lại `/gang war setspawn`, `setstart`, `setexit` khi cần.

## Restore

Restore cần cùng phiên bản plugin/schema với backup. Dừng server trước khi chép lại file. Khôi phục database trước runtime cache; không khôi phục cache nếu có thể tái tạo. Sau restore, kiểm tra số lượng player record và test relog/restart.

Nếu không chắc file nào là config hay runtime data, dừng thao tác và đối chiếu script nguồn trước khi xóa.
