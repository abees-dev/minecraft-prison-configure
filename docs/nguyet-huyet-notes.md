# Đêm Nguyệt Huyết

Cập nhật: 2026-07-29. Lối chơi: [`loi-choi.md`](loi-choi.md) §6.2 C · Mục lục: [`INDEX.md`](INDEX.md).

## Design

| | |
| --- | --- |
| **Lịch** | Thứ 7 **20:00 → 22:00** (giờ server) |
| **Boss** | `VAMPIRE_LORD_BOSS` — Bá Tước Huyết Nguyệt |
| **VFX** | `plugins/MythicMobs/mobs/bloodmoon_vampire_mobs.yml` |
| **Boss def** | `plugins/MythicMobs/mobs/vampire_lord_boss.yml` |
| **Skript** | `plugins/Skript/scripts/bloodmoon/` |

19:50 Thứ 7: broadcast cảnh báo trước 10 phút.

## Setup lần đầu (bắt buộc)

1. Đứng đúng chỗ muốn spawn boss (khuyên: khu event / dungeon):
```
/nguyethuyet setspawn
```
2. Nạp script:
```
sk reload bloodmoon/
```
Nếu lỗi cũ về `%get_bm_*%` / `day of week` — đã fix (dùng biến local + `Calendar` cho Thứ 7).
3. Test:
```
/nguyethuyet start
/nguyethuyet status
/nguyethuyet stop
```

Mặc định spawn tạm: `world_dungeon -56 61 21` (gần boss Tân Binh) — **đổi bằng setspawn**.

## Lệnh admin (OP)

| Lệnh | Việc |
| --- | --- |
| `/nguyethuyet start` | Bắt đầu ngay + spawn boss + announce |
| `/nguyethuyet stop` | Kết thúc + kill boss |
| `/nguyethuyet setspawn` | Lưu vị trí đứng làm điểm spawn |
| `/nguyethuyet spawn` | Spawn boss tại điểm đã lưu (không bật event) |
| `/nguyethuyet status` | Xem active / lịch / tọa độ |

Aliases: `/bloodmoon`, `/nguyet`.

## Player

Khi event start: broadcast + title. Vào `world_dungeon` (hoặc warp dungeon nếu có) để đánh boss.

## Reload sau restart

`00_system_loader.sk` đã thêm `sk reload bloodmoon/`.
