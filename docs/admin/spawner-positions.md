# Đặt vị trí spawner Prison

Áp dụng cho 18 file trong `plugins/MythicMobs/spawners/SPAWNER_PRISON_*.yml`
(hiện đang để placeholder `World: world_dungeon, X:0 Y:64 Z:0` kèm dòng `# TODO`).

## Field cần set trong mỗi file

```yaml
World: <ten_world>
X: <so_nguyen_hoac_thap_phan>
Y: <so_nguyen_hoac_thap_phan>
Z: <so_nguyen_hoac_thap_phan>
Yaw: <huong_nhin_ngang, -180..180>
Pitch: <huong_nhin_doc, -90..90>
```

## Cách 1 — Sửa trực tiếp file YAML (khuyên dùng cho lần đầu set vị trí)

Vì đây là các file **spawner hoàn toàn mới**, MythicMobs chưa từng load chúng, nên sửa
tay trong file rồi reload là an toàn nhất — không cần đoán đúng cú pháp lệnh in-game.

1. Đứng tại vị trí muốn đặt quái trong world_dungeon (hoặc world khác nếu đổi khu vực).
2. Bật F3 (debug screen) để đọc toạ độ:
   - Dòng `XYZ:` → điền vào `X`, `Y`, `Z`.
   - Dòng `Facing:` kèm góc → điền vào `Yaw`, `Pitch` (F3 hiển thị Yaw/Pitch trực tiếp ở cuối dòng toạ độ, dạng `(Yaw, Pitch)`).
   - Cách nhanh hơn: gõ `/tp @s ~ ~ ~` rồi xem log, hoặc dùng plugin có lệnh in ra toạ độ đứng hiện tại nếu server có (vd Essentials `/tploc`, hoặc chỉ cần F3 là đủ).
3. Mở file `SPAWNER_PRISON_<RANK>_<NORMAL|ELITE>.yml`, sửa `World/X/Y/Z/Yaw/Pitch`, xoá dòng `# TODO`.
4. Lưu file, sau đó trong game gõ:
   ```
   /mm reload
   ```
   (reload toàn bộ MythicMobs, sẽ nạp luôn các spawner mới).
5. Kiểm tra bằng `/mm spawner list` (hoặc `/mm s list`) xem spawner đã xuất hiện đúng world/toạ độ chưa.

## Cách 2 — Set bằng lệnh in-game (dùng khi server đang chạy và spawner đã load rồi,
không muốn sửa file + reload lại)

MythicMobs 5.6.2 có nhóm lệnh `/mm spawner` (viết tắt `/mm s`). Các subcommand thường dùng:

```
/mm spawner list                         -> liệt kê toàn bộ spawner đang load
/mm spawner tp <spawner_name>            -> dịch chuyển tới vị trí spawner để kiểm tra
/mm spawner setloc <spawner_name>        -> đặt vị trí spawner = vị trí bạn đang đứng
/mm spawner set <spawner_name> world <world>   -> đổi world
/mm spawner reload                       -> nạp lại toàn bộ file trong Spawners/
```

> Lưu ý: cú pháp `set <property>` (world, mobtype, radius, maxmobs, moblevel, cooldown...)
> đã xác nhận tồn tại trong MythicMobs, nhưng mình **chưa verify được 100%** tên chính xác
> của subcommand set X/Y/Z riêng lẻ (có thể chỉ có `setloc` gộp cả X/Y/Z/Yaw/Pitch theo vị
> trí đứng, không set số tay được qua lệnh). Gõ `/mm spawner` không kèm tham số trong game
> để xem menu trợ giúp đầy đủ của đúng bản 5.6.2 trước khi dùng, tránh gõ sai lệnh.

## Lưu ý quan trọng

- MythicMobs cảnh báo: **spawner-config file đã từng được server load thì chỉ nên sửa
  bằng lệnh in-game**, không sửa tay file rồi reload nóng — dễ lệch state. Với 18 file
  spawner mới này thì chưa vấn đề gì (chưa từng load), nhưng **sau lần đầu set vị trí và
  reload thành công, nếu muốn đổi vị trí lần sau hãy dùng Cách 2 (lệnh in-game)** thay vì
  sửa tay file nữa.
- Toạ độ 18 spawner nên rải ra các khu vực khác nhau trong `world_dungeon` theo từng rank
  (Tân Binh → Vượt Ngục), tránh đặt trùng toạ độ `X:0 Y:64 Z:0` hiện tại — nếu để vậy quái
  của 18 spawner sẽ chồng lên nhau tại 1 điểm.
- Sau khi set xong toạ độ thật, có thể xoá dòng comment `# TODO` ở đầu mỗi file cho gọn.
