# Tài liệu AetherMine Prison-RPG

Đây là điểm bắt đầu duy nhất của bộ tài liệu server. Chọn đúng nhóm bên dưới để tránh dùng nhầm ghi chú lịch sử hoặc cấu hình đã ngừng hoạt động.

> Cập nhật: 2026-08-06 · Mục lục đầy đủ: [`INDEX.md`](INDEX.md)

## Cấu trúc thư mục

| Thư mục | Phạm vi |
| --- | --- |
| `player/` | Hướng dẫn và journey dành cho người chơi |
| `admin/` | Thiết lập NPC, quyền, world và thao tác quản trị |
| `systems/` | Thiết kế và cấu hình nguồn của từng hệ thống |
| `operations/` | Runbook deploy, reset, backup và hiệu năng |
| `reference/` | Bảng tra cứu item, stat, spawner và rank |
| `archive/` | Kế hoạch hoặc hệ thống lịch sử, không dùng để vận hành production |

## Người chơi

1. Bắt đầu với [`gameplay.md`](player/gameplay.md) để hiểu vòng lặp đào, chiến đấu và Bang Hội.
2. Xem [`gangs.md`](player/gangs.md) cho Bang Hội, KOTH và Bang Chiến.
3. Xem [`systems/rebirth-attributes.md`](systems/rebirth-attributes.md) cho Chuyển Sinh và điểm thuộc tính.
4. Xem [`player/plots.md`](player/plots.md) cho khu đất cá nhân.
5. Xem [`player/changelog.md`](player/changelog.md) để theo dõi các thay đổi gameplay mới nhất.

## Admin và vận hành

- [`admin/ranks-permissions-worlds.md`](admin/ranks-permissions-worlds.md): rank, VIP, quyền, world và inventory.
- [`systems/coreplugin-modules.md`](systems/coreplugin-modules.md): bản đồ toàn bộ module CorePlugin, lệnh reload và config nguồn.
- [`systems/equipment-crafting.md`](systems/equipment-crafting.md): MMOItems, trạm tinh luyện/rèn và NPC.
- [`operations/deploy-sync.md`](operations/deploy-sync.md): preview, deploy và kiểm tra sau đồng bộ.
- [`operations/reset-backup.md`](operations/reset-backup.md): reset dữ liệu local, backup và khôi phục.

## Nguồn sự thật

Khi tài liệu và config mâu thuẫn, config đang chạy là nguồn kỹ thuật cuối cùng. Sửa lại tài liệu ngay trong cùng thay đổi.

| Phạm vi | Nguồn chuẩn |
| --- | --- |
| Journey và ưu tiên gameplay | [`gameplay.md`](player/gameplay.md) |
| Prison rank, mine và enchant | `plugins/X-Prison/` |
| Hệ thống gameplay tùy biến | `plugins/CorePlugin/` |
| Trang bị và crafting | `plugins/MMOItems/` |
| Kinh tế bán quặng | [`../DOCS_HE_THONG_PRISON.md`](../DOCS_HE_THONG_PRISON.md) và `plugins/EconomyShopGUI/` |
| Rank/VIP/permission | `plugins/LuckPerms/setup-all-ranks.txt` và `setup-vip-ranks.txt` |
| World và inventory | `plugins/Multiverse-Core/`, `plugins/Multiverse-Inventories/`, `plugins/WorldGuard/` |

## Trạng thái tài liệu

- **Live:** mô tả hệ thống đang dùng; phải khớp config.
- **Draft:** thiết kế hoặc công việc chưa hoàn tất; không dùng làm runbook production.
- **Deprecated:** hệ thống đã thay thế; chỉ giữ để tra lịch sử.
- **Reference:** bảng tra cứu, không phải hướng dẫn triển khai.

Các file có chữ `plan`, `phase`, `notes` hoặc nội dung TODO không tự động được coi là nguồn production. Kiểm tra trạng thái trong [`INDEX.md`](INDEX.md) trước khi thao tác.

## Khi cập nhật docs

1. Ghi trạng thái và nguồn config ở đầu tài liệu mới.
2. Thêm tài liệu vào [`INDEX.md`](INDEX.md).
3. Không dùng đường dẫn tuyệt đối hoặc đưa credential vào Markdown.
4. Chạy `python3 scripts/check-docs.py` trước khi commit để kiểm tra link và coverage.
5. Khi đổi gameplay/config, cập nhật docs liên quan trong cùng commit.
