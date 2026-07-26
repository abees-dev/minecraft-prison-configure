# Note: NPC cho Bàn Tiến Hóa Long Tộc (Trade) & Thiên Giới Long Tộc (Donate)

Ghi lại lệnh tạo NPC dẫn tới 10 station MMOItems đã tách từ `trade-upgrade-station.yml` và
`donate-upgrade-station.yml` (mỗi tier 1 station riêng, xem `plugins/MMOItems/crafting-stations/`).
NPC chỉ đơn giản chạy `mi stations open <station-id> <p>` khi player click phải (mặc định
console-side, không cần cờ `-p` như NPC `/duclo`, `/cuonghoa`).

## Thứ tự lệnh chuẩn

Đứng đúng vị trí muốn spawn NPC trước khi chạy `/npc create`.

```
/npc create <ten_npc_co_mau> --type player
/npc command add mi stations open <station-id> <p>
/npc lookclose
/npc hidename
/npc hologram add <ten_npc_co_mau>
```

- `mi stations open <id> <p>` không có dấu `/` ở đầu (Citizens tự thêm) và không cần `--hand`/`-r`
  vì right-click là mặc định.
- `/npc lookclose` = bản rút gọn của `/trait lookclose` (namespace `npc` thay vì `trait`), cùng
  tác dụng: bật trait quay đầu nhìn player khi đứng gần.
- `/npc hidename` ẩn tag tên vanilla; `/npc hologram add <text>` add dòng hologram thay thế —
  **phải dùng đúng text màu đã đặt ở `/npc create`**, không dùng placeholder chung chung (xem thêm
  `docs/npc-duclo-cuonghoa-notes.md` phần margin nếu cần chỉnh độ cao dòng hologram).

## Trade — Bàn Tiến Hóa Long Tộc

| Station ID | Tên NPC / hologram |
|---|---|
| `trade-hoa-long` | `&6&lTIẾN HÓA &8• &6&lHỎA LONG` |
| `trade-bang-long` | `&3&lTIẾN HÓA &8• &3&lBĂNG LONG` |
| `trade-hac-long` | `&5&lTIẾN HÓA &8• &5&lHẮC LONG` |
| `trade-phong-long` | `&2&lTIẾN HÓA &8• &2&lPHONG LONG` |
| `trade-loi-long` | `&e&lTIẾN HÓA &8• &e&lLÔI LONG` |

Ví dụ đầy đủ (Hỏa Long):
```
/npc create &6&lTIẾN HÓA &8• &6&lHỎA LONG --type player
/npc command add mi stations open trade-hoa-long <p>
/npc lookclose
/npc hidename
/npc hologram add &6&lTIẾN HÓA &8• &6&lHỎA LONG
```

## Donate — Bàn Thiên Giới Long Tộc

| Station ID | Tên NPC / hologram |
|---|---|
| `donate-ho-long` | `&a&lTHIÊN GIỚI &8• &a&lHỘ LONG` |
| `donate-chien-long` | `&e&lTHIÊN GIỚI &8• &e&lCHIẾN LONG` |
| `donate-than-long` | `&b&lTHIÊN GIỚI &8• &b&lTHẦN LONG` |
| `donate-de-long` | `&4&lTHIÊN GIỚI &8• &4&lĐẾ LONG` |
| `donate-hoang-long` | `&c&lTHIÊN GIỚI &8• &c&lHOÀNG LONG` |

Ví dụ đầy đủ (Hộ Long):
```
/npc create &a&lTHIÊN GIỚI &8• &a&lHỘ LONG --type player
/npc command add mi stations open donate-ho-long <p>
/npc lookclose
/npc hidename
/npc hologram add &a&lTHIÊN GIỚI &8• &a&lHỘ LONG
```

## File gốc (đã tách, giữ dự phòng)

- `plugins/MMOItems/crafting-stations/_backup/trade-upgrade-station.yml.bak`
- `plugins/MMOItems/crafting-stations/_backup/donate-upgrade-station.yml.bak`
- Layout dùng chung cho cả 10 station: `plugins/MMOItems/layouts/trade-tier.yml`
