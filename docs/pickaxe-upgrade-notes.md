# Note: Tỷ lệ đổi & chỉ số cuốc Prison

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

## 2. Tỷ lệ đổi tại Lò Rèn (`forge-1..9.yml`)

Mỗi mỏ có 1 trạm craft riêng (`forge-1`=A..`forge-9`=I), gồm 2 loại recipe:

### 2a. Chế Đá Nâng Cấp (quy đổi block đã nén → 1 Đá Nâng Cấp cùng rank)

| Rank (mine) | Nguyên liệu / lần chế | Số lượng | Crafting time |
|---|---|---|---|
| A Tân Binh | Cobblestone | 48 | 0s |
| B Tù Nhân | Coal Block | 4 | 0s |
| C Lao Công | Copper Block | 4 | 0s |
| D Thợ Đào | Iron Block | 4 | 0s |
| E Đội Trưởng | Gold Block | 4 | 0s |
| F Phó Quản Ngục | Redstone Block | 4 | 0s |
| G Quản Ngục | Lapis Block | 4 | 0s |
| H Bá Chủ Ngục Tù | Diamond Block | 4 | 0s |
| I Vượt Ngục | Emerald Block | 4 | 0s |

Lưu ý: trừ Tân Binh (Cobblestone không có dạng nén khác), 8 rank còn lại bắt buộc player phải tự vanilla-craft 9 nguyên liệu thô (coal/raw copper/raw iron/raw gold/redstone/lapis lazuli/diamond/emerald) thành 1 block trước, rồi mới đem 4 block đó chế thành 1 Đá Nâng Cấp — không thể dùng thẳng nguyên liệu thô để chế.

**Cập nhật 2026-07-21 (lần 2)**: tăng gấp đôi so với bản đầu (24→48 cobblestone, 2→4 block) — lý do: chỉ số Efficiency/Fortune cao (tới 16) khiến tốc độ đào và số lượng quặng rơi ra quá nhiều so với yêu cầu craft ban đầu, cần nâng ngưỡng để việc nâng cấp vẫn có ý nghĩa tốn công.

### 2b. Nâng cấp cuốc (cấp N → N+1)

Ingredient mỗi lần nâng cấp = 1 cuốc cấp hiện tại + X Đá Nâng Cấp cùng rank (X tăng theo cấp số nhân ×2, không phụ thuộc rank — áp dụng đồng nhất cho cả 9 rank). **Đã tăng gấp đôi cùng đợt 2026-07-21 (lần 2)** so với bản đầu (4/8/16/32 → 8/16/32/64):

| Bước | Đá Nâng Cấp cần |
|---|---|
| I → II | 8 |
| II → III | 16 |
| III → IV | 32 |
| IV → V | 64 |

Tổng Đá Nâng Cấp để lên full cấp V (từ cấp I) của 1 rank: **120 đá** = 8+16+32+64. Quy đổi ra block đã nén (4 block/đá): **480 block**, tương đương **4,320 nguyên liệu thô** (9 nguyên liệu/block) cho toàn bộ hành trình 1 rank (riêng Tân Binh: mỗi đá = 48 cobblestone → 120 đá = 5,760 cobblestone).

## Chưa cân bằng / cần rà lại

- Số Đá Nâng Cấp mỗi bước (8/16/32/64) áp dụng **đồng nhất cho mọi rank**, chưa tính tới chênh lệch độ khan hiếm tài nguyên giữa các rank (đào emerald ở rank I khó hơn hẳn cobblestone ở rank A, nhưng chi phí nâng cấp X Đá hiện đang bằng nhau về SỐ LƯỢNG đá — độ khó thực tế đã tự nhiên cao hơn ở rank cao vì tốn nhiều nguyên liệu thô hơn/đá hiếm hơn, không cần nhân thêm hệ số theo rank).
- Chưa đối chiếu với giá rank-up Prison (`cost` trong `rank_<id>.json`: 0 / 10k / 25k / 60k / 150k / 350k / 800k / 1.8M / 4M) để xem tổng "chi phí quy đổi ra thời gian đào" có hợp lý theo tiến trình rank hay không — cần rà ở Phase 6 (cân bằng kinh tế) theo `prison-rpg-plan.md`.
- Chưa test thực tế trong game xem tốc độ đào (dựa `pickaxe-power`/hiệu suất) có đủ để gom đủ nguyên liệu trong thời gian hợp lý hay không.
