# X-Prison — Ghi chú cấu hình (chuyển từ plugin Prison cũ)

> **Trạng thái design (2026-07-29):** lối chơi chuẩn xem [`loi-choi.md`](loi-choi.md). Bán quặng = **EconomyShopGUI** `/sellgui`. Trong `plugins/X-Prison/config.yml` hiện `enchants: false`, `autosell: false` (khớp design — không dùng Nuke/Layer làm core). Player-facing endgame = **Prestige** + **Chuyển Sinh** (`/chuyensinh`); không quảng bá X-Prison Rebirths cho người chơi. Mục lục docs: [`INDEX.md`](INDEX.md).

Ghi lại việc đổi plugin Prison (Blue/rockindeveloper) sang **X-Prison** và toàn bộ cấu hình đã dựng lại từ đầu, tính tới 2026-07-22. Bổ sung cho `prison-rpg-plan.md` (mô tả hành trình dựng plugin Prison cũ) — các phần rank/mine kỹ thuật trong file đó (ID `cobblestone`/`coal`/... , `/mines`, `/ranks` của Prison cũ) **không còn áp dụng** kể từ khi đổi sang X-Prison, nhưng phần MMOItems (cuốc/giáp/crafting-station theo rank Tân Binh → Vượt Ngục trong `pickaxe-upgrade-notes.md`) vẫn giữ nguyên và dùng chung với X-Prison vì không phụ thuộc plugin Prison nào cả.

## Bối cảnh & quyết định phạm vi

- Plugin cũ `plugins/Prison/` (rockindeveloper Prison) **giữ nguyên, không đụng tới, không gỡ** — theo yêu cầu người dùng, chỉ để đó không load thêm ý nghĩa gì (không xác nhận nó có đang tắt hẳn trong `plugins.yml`/nội dung server hay không, chỉ biết là data cũ không bị đổi).
- Quyết định: **setup mới hoàn toàn** cho X-Prison (không migrate rank/mine/giá từ Prison cũ sang), config **toàn bộ modules** (không chỉ core) ngay từ đầu.
- Currency: dùng **Money (Vault)** cho rank-up/prestige/rebirth + **Tokens** cho enchant/autominer — theo đúng 3 currency built-in của X-Prison (money/tokens/gems), không đổi tên hay thêm currency mới.
- 9 rank + 9 mine, đặt tên khớp đúng 9 tier cuốc đã có sẵn trong `plugins/MMOItems/item/tool.yml` (ID `PICKAXE_<RANK>_1..5`): Tân Binh, Tù Nhân, Lao Công, Thợ Đào, Đội Trưởng, Phó Quản Ngục, Quản Ngục, Bá Chủ Ngục Tù, Vượt Ngục.

## File nào đã sửa, file nào giữ nguyên default

X-Prison sinh sẵn rất nhiều file cấu hình module (`config.yml` gốc đã bật `modules: { ... : true }` cho tất cả — không cần đổi để "bật hết modules", chỉ cần điền nội dung thật vào các module còn ở dạng stub).

**Đã sửa (cần số liệu thật):**
- `ranks.yml` — 9 rank
- `prestiges.yml` — bật unlimited prestige
- `rebirths.yml` — 3 bậc rebirth
- `multipliers.yml` — rank-multipliers theo group
- `autosell.yml` — bảng giá bán ore
- `pickaxe-levels.yml` — bật formula level cuốc

**Giữ nguyên default** (đã dùng đúng money/tokens/gems, nội dung mẫu sẵn dùng được luôn): `currencies.yml`, `enchants.yml` (+ toàn bộ `enchants/*.json`), `autominer.yml`, `gangs.yml`, `bombs.yml`, `battlepass.yml`, `quests.yml`, `dailyrewards.yml`, `pickaxe-skins.yml`, `history.yml`, `mining-stats.yml`, `blocks.yml`.

**Chưa làm được qua file** — `mines.yml` chỉ chứa settings chung (hologram, WorldGuard region-flags mặc định khi tạo mine), KHÔNG chứa vị trí/block/% của từng mine. Lý do: dữ liệu mine (vùng WorldGuard + danh sách block + % mỗi block) được X-Prison lưu ở nơi khác (qua lệnh, không phải YAML tĩnh) và cần tọa độ thật trong world — không thể tạo bằng cách sửa file. Xem mục "Việc cần làm in-game" bên dưới.

---

## 1. `ranks.yml`

9 rank, `currency: money` (mặc định module), cost tăng dần, mỗi rank gán LuckPerms group `xprison_rank_<n>` (dùng làm key tra cứu ở `multipliers.yml` vì `use-luckperms-groups: true`):

| # | ID | Prefix | Cost (money) | LuckPerms group gán |
|---|---|---|---:|---|
| 1 | 1 | Tân Binh | 0 | xprison_rank_1 |
| 2 | 2 | Tù Nhân | 50,000 | xprison_rank_2 |
| 3 | 3 | Lao Công | 250,000 | xprison_rank_3 |
| 4 | 4 | Thợ Đào | 1,000,000 | xprison_rank_4 |
| 5 | 5 | Đội Trưởng | 5,000,000 | xprison_rank_5 |
| 6 | 6 | Phó Quản Ngục | 20,000,000 | xprison_rank_6 |
| 7 | 7 | Quản Ngục | 100,000,000 | xprison_rank_7 |
| 8 | 8 | Bá Chủ Ngục Tù | 500,000,000 | xprison_rank_8 |
| 9 | 9 | Vượt Ngục | 2,000,000,000 | xprison_rank_9 (rank cuối, cần đạt để mở Prestige) |

Rank cuối cùng được định nghĩa (ID 9) tự động là "last rank" mà X-Prison yêu cầu để cho phép `/prestige` — không có key riêng đánh dấu "đây là rank cuối".

## 2. `prestiges.yml`

Chuyển từ manual `Prestige:` (chỉ có stub `0`) sang **unlimited prestige**:
- `unlimited_prestiges.enabled: true`, `max_prestige: 100`
- `prestige_cost: 3,000,000,000` (money) — cao hơn cost rank 9 để prestige luôn là bước tốn kém nhất
- `increase_cost_by: 1.3` mỗi lần prestige
- `rewards-per-prestige`: mỗi lần prestige nhận `money give 10,000,000` + `tokens give 5,000`
- Mốc thưởng thêm: prestige 10 → 100 gems, 25 → 300 gems, 50 → 750 gems + 100,000 tokens, 100 → 2,000 gems + 500,000 tokens
- `reset_rank_after_prestige: true` (giữ mặc định) — prestige xong quay lại rank 1, giữ số prestige.

## 3. `rebirths.yml`

3 bậc rebirth (`1`/`2`/`3`), tất cả yêu cầu đạt rank 9 (Vượt Ngục) + ngưỡng prestige + tiền:

| Rebirth | Yêu cầu Rank | Yêu cầu Prestige | Yêu cầu Money | Thưởng |
|---|---|---:|---:|---|
| R1 | 9 | 10 | 5,000,000,000 | permission `xprison.rebirth1` + 500 gems |
| R2 | 9 | 30 | 15,000,000,000 | permission `xprison.rebirth2` + 1,500 gems |
| R3 | 9 | 60 | 50,000,000,000 | permission `xprison.rebirth3` + 5,000 gems |

Rebirth `0` (stub mặc định, không yêu cầu gì) giữ nguyên làm rebirth khởi điểm.

## 4. `multipliers.yml`

`rank-multipliers` (dùng LuckPerms group vì `use-luckperms-groups: true`), khớp với group gán ở `ranks.yml`:

| Group | money | tokens |
|---|---:|---:|
| xprison_rank_1 | 1.0 | 1.0 |
| xprison_rank_2 | 1.05 | 1.05 |
| xprison_rank_3 | 1.1 | 1.1 |
| xprison_rank_4 | 1.15 | 1.1 |
| xprison_rank_5 | 1.2 | 1.15 |
| xprison_rank_6 | 1.3 | 1.2 |
| xprison_rank_7 | 1.4 | 1.25 |
| xprison_rank_8 | 1.5 | 1.3 |
| xprison_rank_9 | 1.6 | 1.4 |

`currency-multipliers` (global/player max cap cho multiplier item/enchant tạm thời) giữ nguyên default.

## 5. `autosell.yml`

`global-sell-prices` mở rộng từ chỉ có STONE sang đủ item dự kiến rớt ra khi đào 9 mine (xem bảng block đặt trong mine ở mục 7).

> Lưu ý: dòng `per-region-sell-prices` hiện có 9 entry (`tan_binh`..`vuot_nguc`, world: `world_prison`) — **người dùng đã tự tạo 9 mine trong game rồi**, khớp đúng tên slug đã đề xuất. Khi sửa tiếp `autosell.yml` cần giữ nguyên khối đó, không ghi đè.

**Bài học quan trọng (phát hiện 2026-07-23, do người dùng test trực tiếp trong game)**: key của `global-sell-prices` phải là **tên ITEM thực tế rớt ra khi đập block**, không phải tên block đặt trong mine. Phá ore vanilla (không Silk Touch) hầu hết rớt ra item khác tên block hẳn — bản đầu mình dùng nhầm tên block (`IRON_ORE`, `GOLD_ORE`...) làm key nên giá không bao giờ khớp được với item người chơi thực sự nhận. Bảng đã sửa lại:

| Block đặt trong mine | Item thực tế rớt ra (key đúng) | Số lượng rớt/lần đập (trước Fortune) | Giá/đơn vị |
|---|---|---|---:|
| STONE | STONE (chỉ khi Silk Touch, coi như không dùng) | 1 | 50 |
| STONE (không Silk Touch) | COBBLESTONE | 1 | 25 |
| COBBLESTONE | COBBLESTONE | 1 | 25 |
| COAL_ORE | COAL | 1 | 150 |
| IRON_ORE | RAW_IRON | 1 (không bị Fortune ảnh hưởng) | 400 |
| GOLD_ORE | RAW_GOLD | 1 (không bị Fortune ảnh hưởng) | 1,000 |
| LAPIS_ORE | LAPIS_LAZULI | 4-9 | 140 (hạ từ 900 vì rớt nhiều đơn vị/lần) |
| REDSTONE_ORE | REDSTONE | 4-5 | 270 (hạ từ 1,200 vì rớt nhiều đơn vị/lần) |
| DIAMOND_ORE | DIAMOND | 1 | 5,000 |
| EMERALD_ORE | EMERALD | 1 | 8,000 |
| NETHER_GOLD_ORE | GOLD_NUGGET | 2-6 | 750 (hạ từ 3,000 vì rớt nhiều đơn vị/lần) |
| NETHER_QUARTZ_ORE | QUARTZ | 1 | 2,000 |
| ANCIENT_DEBRIS | ANCIENT_DEBRIS (rớt chính nó, miễn nhiễm Fortune) | 1 | 25,000 |

Giá/đơn vị các ore rớt nhiều item (lapis/redstone/nugget) được tính lại theo công thức `giá_per_block_mong_muốn ÷ số_lượng_trung_bình` để tổng giá trị mỗi lần đập 1 block vẫn tương đương ý đồ ban đầu (không tự nhiên đội giá vì rớt nhiều đơn vị). Iron/Gold raw KHÔNG bị Fortune ảnh hưởng (chỉ Silk Touch mới đổi loại item, không tăng số lượng) — khác với coal/diamond/emerald/redstone/lapis/quartz/nugget đều bị Fortune tăng số lượng rớt.

## 6. `pickaxe-levels.yml`

Bật `levels-formula.formula: '500 * (level - 1)^1.6'`, `max-level: 100` thay vì định nghĩa tay từng level. Giữ override thưởng ở các mốc level 1/10/25/50/100 (tokens/gems tăng dần, mốc 100 thêm prefix vàng đậm).

---

## 7. Việc CHƯA làm được qua file — 9 mine phải tạo in-game

`mines.yml` không lưu vị trí/block/%. Xác nhận qua đọc bytecode jar `X-Prison 2026.2.9.0.jar` (`dev/drawethree/xprison/mines/commands/impl/*`) — các subcommand thật sự tồn tại:

```
/mines tool                → lấy công cụ chọn vùng (2 điểm góc)
/mines create <name>       → tạo mine từ vùng đã chọn
/mines addblock <name>     → thêm loại block đang cầm trên tay vào mine
/mines panel <name>        → mở GUI để set % (chance) từng block — KHÔNG có lệnh set % qua console/command
/mines settp <name>        → set điểm teleport (tuỳ chọn)
```

Không có subcommand nào set % block qua lệnh — bắt buộc phải dùng `/mines panel` (GUI) cho bước set %.

Composition đề xuất cho từng mine (khớp bảng giá ở mục 5), tên mine dùng slug không dấu để tránh lỗi lệnh:

| # | Tên mine (slug) | Rank tương ứng | Block (tỉ lệ %) |
|---|---|---|---|
| 1 | tan_binh | Tân Binh | STONE 60, COBBLESTONE 30, COAL_ORE 10 |
| 2 | tu_nhan | Tù Nhân | STONE 50, COAL_ORE 30, IRON_ORE 20 |
| 3 | lao_cong | Lao Công | IRON_ORE 40, COAL_ORE 30, GOLD_ORE 20, LAPIS_ORE 10 |
| 4 | tho_dao | Thợ Đào | GOLD_ORE 35, LAPIS_ORE 25, REDSTONE_ORE 25, DIAMOND_ORE 15 |
| 5 | doi_truong | Đội Trưởng | REDSTONE_ORE 30, DIAMOND_ORE 30, EMERALD_ORE 25, IRON_ORE 15 |
| 6 | pho_quan_nguc | Phó Quản Ngục | DIAMOND_ORE 35, EMERALD_ORE 35, GOLD_ORE 20, NETHER_GOLD_ORE 10 |
| 7 | quan_nguc | Quản Ngục | EMERALD_ORE 35, DIAMOND_ORE 30, NETHER_QUARTZ_ORE 20, ANCIENT_DEBRIS 15 |
| 8 | ba_chu_nguc_tu | Bá Chủ Ngục Tù | ANCIENT_DEBRIS 35, EMERALD_ORE 35, DIAMOND_ORE 30 |
| 9 | vuot_nguc | Vượt Ngục | ANCIENT_DEBRIS 50, EMERALD_ORE 25, DIAMOND_ORE 25 |

**Trạng thái (cập nhật 2026-07-23)**: người dùng đã tự tạo xong cả 9 mine trong game (`per-region-sell-prices` trong `autosell.yml` giờ có đủ 9 entry `tan_binh`..`vuot_nguc`, world `world_prison`) — đã test đập thử và phát hiện lỗi key sai tên item (xem "Bài học quan trọng" ở mục 5), đã sửa xong.

**Lưu ý vận hành phát hiện được**: sau khi tự sửa file `autosell.yml` trực tiếp trên đĩa trong lúc server đang chạy, phải chạy `/xprison reload all` (hoặc `/prison reload all`, alias tương đương) thì thay đổi mới có hiệu lực — X-Prison không tự động theo dõi file thay đổi.

## Chưa cân bằng / cần rà lại sau

- Toàn bộ số tiền/giá/% đều là **judgment call ban đầu** của phiên làm việc này (2026-07-22), chưa test thực tế trong game — cần rà lại thu nhập/giờ theo mine vs. cost rank-up/prestige/rebirth như đã làm ở `prison-rpg-plan.md` Phase 6 cho hệ Prison cũ.
- Chưa gắn permission/WorldGuard entry-flag giới hạn người chơi thấp rank vào mine cao — nếu muốn giới hạn (rank chưa đủ thì không vào được mine cao hơn), cần làm riêng qua WorldGuard flag + permission theo rank, chưa có trong phạm vi đã làm.
- Chưa xác nhận currency/kinh tế của X-Prison có tương tác gì với Vault/EssentialsX Economy đang dùng chung server hay không (X-Prison "money" là balance riêng của nó, lưu trong DB riêng `plugins/X-Prison/playerdata.mv.db`, KHÔNG phải cùng 1 số dư với Vault/EssentialsX) — cần lưu ý nếu có shop/plugin khác đang đọc số dư Vault, sẽ KHÔNG thấy tiền "money" kiếm được trong X-Prison.
