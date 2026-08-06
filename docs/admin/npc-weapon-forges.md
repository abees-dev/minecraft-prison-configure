# NPC lò rèn vũ khí theo mine và rank

> Cập nhật: 2026-07-29 · Lối chơi: [`gameplay.md`](../player/gameplay.md) · Ops chung: [`README.md`](../README.md)

NPC **chưa đặt in-game** — chỉ chuẩn bị station + lệnh Citizens để gắn sau.

## Station IDs

| Rank | Station ID | File |
| --- | --- | --- |
| 1 Tân Binh | `weapon-forge-rookie` | `crafting-stations/weapon-forge-rookie.yml` |
| 2 Tù Nhân | `weapon-forge-prisoner` | `weapon-forge-prisoner.yml` |
| 3 Lao Công | `weapon-forge-worker` | `weapon-forge-worker.yml` |
| 4 Thợ Đào | `weapon-forge-miner` | `weapon-forge-miner.yml` |
| 5 Đội Trưởng | `weapon-forge-captain` | `weapon-forge-captain.yml` |
| 6 Phó Quản Ngục | `weapon-forge-vice-warden` | `weapon-forge-vice-warden.yml` |
| 7 Quản Ngục | `weapon-forge-warden` | `weapon-forge-warden.yml` |
| 8 Bá Chủ Ngục Tù | `weapon-forge-overlord` | `weapon-forge-overlord.yml` |
| 9 Vượt Ngục | `weapon-forge-jailbreak` | `weapon-forge-jailbreak.yml` |

Mỗi station: **Kiếm / Rìu Chiến / Trượng Phép** nâng `I→II→III→IV→V` (12 recipe).

**Nguyên liệu:** xem trực tiếp recipe sống trong station tương ứng; hệ Tinh Thể Cường Hóa Vũ Khí/Giáp đã được loại bỏ.

**Tỷ lệ / số đá:** mirror `forge-*` (cúp). Xịt giữ vũ khí, mất nguyên liệu tiêu hao.

## Test nhanh (không cần NPC)

```text
/mi stations open weapon-forge-rookie
/mi give SWORD SWORD_TAN_BINH_1
/mi give MATERIAL DA_NANG_CAP_TAN_BINH 64
/mi give MATERIAL NEN_DOI_TAN_BINH 64
```

Reload sau khi sửa station: `/mi reload all` (hoặc `/mi reload stations`).

## Lệnh tạo NPC (đặt sau)

Pattern giống cúp/giáp — console + `<p>`:

```text
/npc create <Tên> --type PLAYER
/npc skin <skin>
/npc cmd add mi stations open <STATION_ID> <p>
```

### Rank 1 — Tân Binh
```bash
/npc create &f&l⚔ Vũ Khí Tân Binh --type PLAYER
/npc skin Blacksmith
/npc cmd add mi stations open weapon-forge-rookie <p>
```

### Rank 2 — Tù Nhân
```bash
/npc create &a&l⚔ Vũ Khí Tù Nhân --type PLAYER
/npc skin Blacksmith
/npc cmd add mi stations open weapon-forge-prisoner <p>
```

### Rank 3 — Lao Công
```bash
/npc create &2&l⚔ Vũ Khí Lao Công --type PLAYER
/npc skin Blacksmith
/npc cmd add mi stations open weapon-forge-worker <p>
```

### Rank 4 — Thợ Đào
```bash
/npc create &e&l⚔ Vũ Khí Thợ Đào --type PLAYER
/npc skin Blacksmith
/npc cmd add mi stations open weapon-forge-miner <p>
```

### Rank 5 — Đội Trưởng
```bash
/npc create &b&l⚔ Vũ Khí Đội Trưởng --type PLAYER
/npc skin Blacksmith
/npc cmd add mi stations open weapon-forge-captain <p>
```

### Rank 6 — Phó Quản Ngục
```bash
/npc create &9&l⚔ Vũ Khí Phó Quản Ngục --type PLAYER
/npc skin Blacksmith
/npc cmd add mi stations open weapon-forge-vice-warden <p>
```

### Rank 7 — Quản Ngục
```bash
/npc create &d&l⚔ Vũ Khí Quản Ngục --type PLAYER
/npc skin Blacksmith
/npc cmd add mi stations open weapon-forge-warden <p>
```

### Rank 8 — Bá Chủ Ngục Tù
```bash
/npc create &6&l⚔ Vũ Khí Bá Chủ Ngục Tù --type PLAYER
/npc skin Blacksmith
/npc cmd add mi stations open weapon-forge-overlord <p>
```

### Rank 9 — Vượt Ngục
```bash
/npc create &c&l⚔ Vũ Khí Vượt Ngục --type PLAYER
/npc skin Blacksmith
/npc cmd add mi stations open weapon-forge-jailbreak <p>
```

## Gợi ý đặt vị trí

Đặt cạnh NPC **Rèn Cúp** / **Giáp** cùng mine (cùng khu `prison_mineN`), để 1 cụm: Luyện → Cúp → Giáp → Vũ Khí.
