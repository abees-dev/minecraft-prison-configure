# NPC đục lỗ và cường hóa

> Lối chơi mid (build combat): [`gameplay.md`](../player/gameplay.md) §3.3 · Mục lục: [`INDEX.md`](../INDEX.md)

Ghi lại lệnh tạo NPC dẫn tới 2 hệ thống Skript đã có sẵn: `plugins/Skript/scripts/duclo/` (lệnh `/duclo`) và `plugins/Skript/scripts/cuonghoa/` (lệnh `/cuonghoa`). NPC chỉ đơn giản chạy lệnh tương ứng khi player click.

## Lệnh tạo NPC

Đứng đúng vị trí muốn spawn NPC trước khi chạy `/npc create`.

**NPC Đục Lỗ:**
```
/npc create &b&l◆ Đục Lỗ --type player
/npc skin <ten_skin_hoac_player>
/npc command add -p --hand RIGHT duclo
/trait lookclose
```

**NPC Cường Hóa:**
```
/npc create &c&l⚡ Cường Hóa --type player
/npc skin <ten_skin_hoac_player>
/npc command add -p --hand RIGHT cuonghoa
/trait lookclose
```

Ghi chú:
- `-p` bắt lệnh chạy với ngữ cảnh của người chơi click (bắt buộc — `/duclo`, `/cuonghoa` cần "player" là người click, không phải console).
- `/npc skin <ten>` nhận tên skin Mineskin hoặc tên 1 player thật.

## Config tên NPC nổi cao hơn đầu (hologram name)

Mặc định tag tên Citizens bám sát đầu model (dễ bị dính/che vào đầu skin). Cách xử lý: ẩn tag tên vanilla, thay bằng 1 dòng hologram chứa đúng tên đó — dòng hologram này mới cho phép chỉnh margin/độ cao.

```
/npc hidename
/npc hologram add &c&l⚡ Cường Hóa
```

(Với NPC Đục Lỗ thì thay đúng text đã đặt tên ở bước tạo, ví dụ `&b&l◆ Đục Lỗ`.)

Lưu ý quan trọng: `/npc hologram add` cần **text tên thật** (đúng màu/format đã dùng khi tạo NPC), không phải placeholder `name` chung chung — dùng literal `name` sẽ chỉ hiện chữ "name".

Sau khi đã add, dòng này có index (thường là `0`) nên chỉnh cao thêm được bằng:
```
/npc hologram margintop 0 0.1
```
Tăng dần 0.1 → 0.2... tới khi vừa mắt. (`margintop`/`marginbottom` chỉ áp dụng cho các dòng đã add qua `/npc hologram add`, không áp dụng được cho tag tên vanilla mặc định — đây là lý do ban đầu bị lỗi "invalid line number" khi chưa add dòng nào.)
