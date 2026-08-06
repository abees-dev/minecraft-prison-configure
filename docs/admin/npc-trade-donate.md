# NPC cho bàn Trade và Donate Long Tộc

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
  `docs/admin/npc-sockets-upgrades.md` phần margin nếu cần chỉnh độ cao dòng hologram).

## Trade — Bàn Tiến Hóa Long Tộc

| Station ID | Tên NPC / hologram |
|---|---|
| `trade-hoa-long` | `&6&l✦ Hỏa Long` |
| `trade-bang-long` | `&3&l✦ Băng Long` |
| `trade-hac-long` | `&5&l✦ Hắc Long` |
| `trade-phong-long` | `&2&l✦ Phong Long` |
| `trade-loi-long` | `&e&l✦ Lôi Long` |

Ví dụ đầy đủ (Hỏa Long):
```
/npc create &6&l✦ Hỏa Long --type player
/npc command add mi stations open trade-hoa-long <p>
/npc lookclose
/npc hidename
/npc hologram add &6&l✦ Hỏa Long
```

## Donate — Bàn Thiên Giới Long Tộc

| Station ID | Tên NPC / hologram |
|---|---|
| `donate-ho-long` | `&a&l★ Hộ Long` |
| `donate-chien-long` | `&e&l★ Chiến Long` |
| `donate-than-long` | `&b&l★ Thần Long` |
| `donate-de-long` | `&4&l★ Đế Long` |
| `donate-hoang-long` | `&c&l★ Hoàng Long` |

Ví dụ đầy đủ (Hộ Long):
```
/npc create &a&l★ Hộ Long --type player
/npc command add mi stations open donate-ho-long <p>
/npc lookclose
/npc hidename
/npc hologram add &a&l★ Hộ Long
```

## File gốc (đã tách, giữ dự phòng)

- `plugins/MMOItems/crafting-stations/_backup/trade-upgrade-station.yml.bak`
- `plugins/MMOItems/crafting-stations/_backup/donate-upgrade-station.yml.bak`
- Layout dùng chung cho cả 10 station: `plugins/MMOItems/layouts/trade-tier.yml`
