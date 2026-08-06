# Engagement Expansion — Pity, Collection và Dungeon Biến Dị

Cập nhật: 2026-08-06. Trạng thái: **Live/CorePlugin** — item, drop, station và
module Java `engagement` đã triển khai; không dùng Skript.

## 1. Boss Pity — Mảnh Linh Hồn

Mỗi boss Prison luôn rơi token, tách theo năm nhóm sức mạnh:

| Boss | Token chắc chắn |
| --- | --- |
| Rank 1–2 | `MANH_LINH_HON_SO_CAP` x1 |
| Rank 3–4 | `MANH_LINH_HON_TRUNG_CAP` x1 |
| Rank 5–6 | `MANH_LINH_HON_CAO_CAP` x1 |
| Rank 7–8 | `MANH_LINH_HON_SIEU_CAP` x1 |
| Rank 9 | `MANH_LINH_HON_HUYEN_THOAI` x1 |
| Ma Vương | `MANH_LINH_HON_HUYEN_THOAI` x2 |

CorePlugin mở station `soul-exchange` qua `/linhhon`. Người chơi tự chọn đá vũ khí, đá giáp,
đá đục lỗ hoặc item tiện ích; đây là đường bảo hiểm song song với drop RNG,
không thay bảng drop cũ.

## 2. Item tiện ích

- `VE_DUNGEON_BIEN_DI`: boss kế tiếp tiêu thụ một vé và thưởng thêm một Mảnh
  Linh Hồn đúng nhóm rank.
- `RUONG_CHON_NGUYEN_LIEU`: dùng trong `/linhhon` để chọn đá vũ khí, giáp hoặc
  mũi khoan; không roll ngẫu nhiên.
- `HUY_CHUONG_MUA_BANG`: cosmetic currency dành cho Top mùa, không có combat stat.

Đá Thiên Mệnh hiện đã là lựa chọn cường hóa bảo đảm 100%, nên không tạo thêm
“Bùa Bảo Hộ” trùng vai trò. Gỡ ngọc/reroll stat chưa được giả lập bằng Skript vì
có nguy cơ làm mất NBT MMOItems; chỉ triển khai khi CorePlugin có transaction API.

## 3. Collection và Thành tựu — CorePlugin

Lệnh `/collection` (`/thanhtuu`) hiển thị:

- Tổng ore đào trong `world_prison`.
- Tổng quái Dungeon đã hạ.
- Tổng boss và số boss theo từng rank.

Mốc live ban đầu:

| Mốc | Thưởng |
| --- | --- |
| 1.000 ore | 5 Point |
| 10.000 ore | 20 Point |
| 10 boss | 1 Vé Dungeon Biến Dị |
| 50 boss | 50 Point + Rương Chọn Nguyên Liệu |

Mỗi mốc có cờ claim vĩnh viễn trong database CorePlugin, không thể nhận lặp.

## 4. Dungeon Biến Dị tuần — CorePlugin

CorePlugin cung cấp `/dungeonbiendi`. Affix xoay tuần tự theo ISO week để tránh việc
restart server reroll lấy affix dễ:

1. **Kiên Cố:** Elite/Boss có Resistance I.
2. **Cuồng Nộ:** Elite/Boss có Strength I + Speed I.
3. **Độc Tố:** đòn Elite/Boss có 20% gây Poison I trong 3 giây.
4. **Bất Ổn:** Elite/Boss tạo vụ nổ an toàn khi chết.

Chỉ áp dụng tại `world_dungeon`, `world_dungeon_2` và `world_magadungeon`.

## 5. Season Bang Hội

Không tạo season mới. CorePlugin đã có season 28 ngày, điểm từ shared quest,
weekly, KOTH và Bang Chiến; top 1–3 đã nhận bank tự động. Huy Chương Mùa là lớp
cosmetic bổ sung và không thay reward bank/danh vọng hiện tại.

## 6. Reload và smoke-test

```text
/mi reload
/mm reload
```

Checklist:

1. Hạ một boss rank 1 và xác nhận có đúng 1 Mảnh Sơ Cấp, `/collection` +1 boss.
2. `/linhhon`, kiểm tra từng recipe và số token bị trừ.
3. Give Vé Biến Dị, hạ boss và xác nhận vé bị trừ, nhận thêm đúng một mảnh.
4. Spawn Elite/Boss trong từng dungeon world và kiểm tra affix hiện tại.
5. Restart một lần, xác nhận Collection và affix tuần không bị reset.

CorePlugin nghe MythicMobs API trực tiếp để xác định internal mob ID và killer;
không gọi command ẩn từ drop table, không dựa vào display name.
