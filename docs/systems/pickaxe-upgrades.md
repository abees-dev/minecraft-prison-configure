# Tỷ lệ đổi và chỉ số cuốc Prison

> **UX chuẩn (2026-07-29):** người chơi nâng cúp qua **NPC crafting station** (`forge-*`), không qua Skript `/nangcapcuoc` trùng lặp — xem [`gameplay.md`](../player/gameplay.md) P0.4. Mục lục: [`INDEX.md`](../INDEX.md).

Ghi lại nhanh 2 bảng số liệu đang áp dụng (tính tới 2026-07-21), tách riêng khỏi `prison-rpg-plan.md` để dễ tra cứu/so sánh khi cân bằng lại. Nguồn dữ liệu: `plugins/MMOItems/item/tool.yml` (chỉ số cuốc) và `plugins/MMOItems/crafting-stations/forge-1..9.yml` (tỷ lệ đổi).

## 1. Chỉ số cuốc theo rank/cấp (`tool.yml`)

Rule chung: 3 chỉ số **luân phiên tăng mỗi cấp** (không cấp nào đứng yên cả 3): Hiệu Suất (Efficiency) → Gia Tài (Fortune) → Bền Bỉ (Unbreaking) → lặp lại chu kỳ. `pickaxe-power` tăng tuyến tính 1→45 theo tổng bước (rank×5 + cấp). Vật liệu (`material`)/độ bền tối đa (`max-durability`)/tier cố định theo rank, không đổi theo cấp con.

| Rank (mine) | Material | Max Durability | Tier | Cấp | Efficiency | Fortune | Unbreaking | Pickaxe Power | Autosmelt |
|---|---|---|---|---|---|---|---|---|---|
| A Tân Binh | WOODEN_PICKAXE | 500 | TRASH | I | 1 | 1 | 1 | 1 | ❌ |
| | | | | II | 2 | 1 | 1 | 2 | ❌ |
| | | | | III | 2 | 2 | 1 | 3 | ❌ |
| | | | | IV | 2 | 2 | 2 | 4 | ❌ |
| | | | | V | 3 | 2 | 2 | 5 | ❌ |
| B Tù Nhân | STONE_PICKAXE | 1000 | COMMON | I | 3 | 3 | 2 | 6 | ❌ |
| | | | | II | 3 | 3 | 3 | 7 | ❌ |
| | | | | III | 4 | 3 | 3 | 8 | ❌ |
| | | | | IV | 4 | 4 | 3 | 9 | ❌ |
| | | | | V | 4 | 4 | 4 | 10 | ❌ |
| C Lao Công | IRON_PICKAXE | 2000 | UNCOMMON | I | 5 | 4 | 4 | 11 | ❌ |
| | | | | II | 5 | 5 | 4 | 12 | ❌ |
| | | | | III | 5 | 5 | 5 | 13 | ❌ |
| | | | | IV | 6 | 5 | 5 | 14 | ❌ |
| | | | | V | 6 | 6 | 5 | 15 | ❌ |
| D Thợ Đào | IRON_PICKAXE | 3000 | RARE | I | 6 | 6 | 6 | 16 | ❌ |
| | | | | II | 7 | 6 | 6 | 17 | ❌ |
| | | | | III | 7 | 7 | 6 | 18 | ❌ |
| | | | | IV | 7 | 7 | 7 | 19 | ❌ |
| | | | | V | 8 | 7 | 7 | 20 | ❌ |
| E Đội Trưởng | DIAMOND_PICKAXE | 4500 | VERY_RARE | I | 8 | 8 | 7 | 21 | ❌ |
| | | | | II | 8 | 8 | 8 | 22 | ❌ |
| | | | | III | 9 | 8 | 8 | 23 | ❌ |
| | | | | IV | 9 | 9 | 8 | 24 | ❌ |
| | | | | V | 9 | 9 | 9 | 25 | ❌ |
| F Phó Quản Ngục | DIAMOND_PICKAXE | 6000 | LEGENDARY | I | 10 | 9 | 9 | 26 | ❌ |
| | | | | II | 10 | 10 | 9 | 27 | ❌ |
| | | | | III | 10 | 10 | 10 | 28 | ❌ |
| | | | | IV | 11 | 10 | 10 | 29 | ❌ |
| | | | | V | 11 | 11 | 10 | 30 | ❌ |
| G Quản Ngục | NETHERITE_PICKAXE | 8000 | MYTHICAL | I | 11 | 11 | 11 | 31 | ❌ |
| | | | | II | 12 | 11 | 11 | 32 | ❌ |
| | | | | III | 12 | 12 | 11 | 33 | ❌ |
| | | | | IV | 12 | 12 | 12 | 34 | ❌ |
| | | | | V | 13 | 12 | 12 | 35 | ❌ |
| H Bá Chủ Ngục Tù | NETHERITE_PICKAXE | 10000 | EPIC | I | 13 | 13 | 12 | 36 | ✅ |
| | | | | II | 13 | 13 | 13 | 37 | ✅ |
| | | | | III | 14 | 13 | 13 | 38 | ✅ |
| | | | | IV | 14 | 14 | 13 | 39 | ✅ |
| | | | | V | 14 | 14 | 14 | 40 | ✅ |
| I Vượt Ngục | NETHERITE_PICKAXE | 15000 | UNIQUE | I | 15 | 14 | 14 | 41 | ✅ |
| | | | | II | 15 | 15 | 14 | 42 | ✅ |
| | | | | III | 15 | 15 | 15 | 43 | ✅ |
| | | | | IV | 16 | 15 | 15 | 44 | ✅ |
| | | | | V | 16 | 16 | 15 | 45 | ✅ |

Autosmelt chỉ bật ở 2 rank cao nhất (H, I) — tự động nấu quặng thô (raw iron/copper/gold) thành ingot khi đào, không có tác dụng bổ sung với quặng đã ra thẳng dạng cuối (coal/diamond/emerald/redstone/lapis).

## 2. Tinh luyện & Lò Rèn (live)

**Chuẩn UX:** NPC `refinery-*` (tinh luyện) + `forge-*` (nâng cúp). File cũ `forge-1..9` / bảng cobble×48 **đã lỗi thời**.

### 2a. Chế Cường Hóa Thạch (`refinery-*.yml`)

Block vanilla → `NEN_DOI_<RANK>` → `DA_NANG_CAP_<RANK>`. Bảng số block / NÊN mỗi Đá: [`README.md`](../README.md) § Recipe Tinh Luyện (cập nhật 2026-07-30). Rank 9 thêm bước `NEN_BA_VUOT_NGUC`.

### 2b. Nâng cấp cuốc (`forge-*.yml` theo rank)

Mỗi bước = cuốc cấp trước + **cùng số** `DA_NANG_CAP` + `NEN_DOI` (không còn flat 8/16/32/64 cho mọi rank). Ví dụ Tân Binh (`forge-rookie`): I→II **2/2**, II→III **4/4**, III→IV **8/8**, IV→V **16/16** (success 85→55%). Rank cao hơn: xem file `forge-<rank>.yml` tương ứng.

## Chưa cân bằng / cần rà lại

- Forge ĐÁ/NÊN theo rank đã scale (xem `forge-*.yml`); refinery đã cân 2026-07-30 — còn có thể chỉnh success-rate hoặc forge cost sau khi chơi thử late game.
- Đối chiếu thời gian đào thực tế vs rank-up cost (Phase 6 money đã chỉnh; prestige/refinery sink mới cần playtest).
- Test in-game tốc độ đào (Efficiency/Fortune) có khớp mục tiêu ~1–4h early / ~4–10h late hay không.
