# Plan: Server Minecraft RPG tích hợp Prison (Prison-RPG lai)

## Context

Server Paper 1.19.4-550 tại `D:\server-minecraft` hiện đã cài rất nhiều plugin RPG/tiện ích (MMOCore, MMOItems, MythicMobs, ModelEngine, ItemsAdder, RPGInventory, LuckPerms, Vault, EssentialsX, Multiverse-Core/Inventories, WorldGuard+FastAsyncWorldEdit, PlayerPoints, ExcellentCrates, PlaceholderAPI, DeluxeMenus, TAB, DecentHolograms, Vulcan, Skript, SCore/nightcore, BattlePass, Citizens, LibsDisguises, PlayerVaults, v.v.) nhưng qua khảo sát trực tiếp, **gần như toàn bộ đang ở trạng thái mặc định**:

- MMOCore: chỉ có `config.yml` mặc định, chưa có `classes/`, `professions/`, `attributes/`. Mục `custom-mine-conditions` trỏ tới `example_region`/`example_region2` — đã đọc kỹ config và xác nhận mục này **chỉ điều khiển tính năng block-regen/block-restriction của MMOCore, KHÔNG phải hook cấp EXP nghề nghiệp** (comment gốc trong file: "conditions which must be met for the BLOCK REGEN and BLOCK RESTRICTIONS to apply").
- MMOItems: có bộ item mẫu (demo) đầy đủ nhưng chưa phải nội dung do admin tự tạo. `item-tiers.yml` mới có TRASH/COMMON/UNCOMMON.
- MythicMobs: hoàn toàn mặc định, chưa có `Mobs/` hay `Skills/` nào.
- **Chưa cài plugin Prison nào** — đây là phần hoàn toàn mới (greenfield).
- WorldGuard: chưa có region nào (`regions.yml` không tồn tại ở world nào).
- LuckPerms dùng H2 (embedded DB), chưa có group/track nào được cấu hình sẵn (phải thao tác qua lệnh `/lp`).
- Vault đang được EssentialsX Economy cung cấp làm nhà cung cấp kinh tế duy nhất. PlayerPoints hiện `vault: false` — phù hợp để dùng làm đồng tiền phụ (token/prestige) tách biệt khỏi Vault.
- Vulcan đã bật sẵn các check `fastbreak`, `scaffold`, `autoclicker` (có `hook-mythicmobs: true`) nhưng chưa có miễn trừ/nới lỏng theo khu vực — sẽ xung đột với việc đào nhanh bằng cuốc Prison có enchant tốc độ cao.

**Mục tiêu đã chốt với người dùng:**
1. Mô hình tích hợp: **lai chặt chẽ** — đào mỏ trong Prison là cách chính để lên cấp nhân vật RPG; mob trong mỏ dùng MythicMobs; rank-up Prison gắn với tiến triển class/skill; một luồng kinh tế/tiến triển xuyên suốt.
2. Dùng **plugin Prison mã nguồn mở có sẵn** (ví dụ nhánh prison-team/PrisonMC, tương thích Vault + LuckPerms) thay vì tự viết bằng Skript từ đầu.
3. Server **công khai cho cộng đồng** → cần quan tâm hiệu năng, chống gian lận (Vulcan), cân bằng kinh tế, và lộ trình launch theo từng giai đoạn thay vì làm hết một lúc.

Kết quả mong muốn: một roadmap thực thi theo pha, xác định rõ file/cấu hình cần đụng tới ở mỗi bước, và các điểm kỹ thuật còn chưa chắc chắn cần xác minh trong lúc làm (không giả định bừa API/tên event của Prison khi plugin chưa được cài).

---

## Quyết định nền tảng (chốt trước khi bắt đầu)

1. **World** (đã đổi quyết định ngày 2026-07-20 theo yêu cầu người dùng): `world` chỉ dùng làm **spawn/hub** (không đào được ở đây). Các mỏ Prison sẽ nằm trong 1 world Multiverse **riêng** — `world_prison` — tách biệt hoàn toàn khỏi khu spawn. Lý do đổi: người dùng muốn khu spawn sạch, không lẫn với khu đào mỏ, và dễ wipe/reset riêng world Prison sau này mà không ảnh hưởng spawn/hub.
   - `world_prison` vẫn nên nằm trong cùng group `default` của Multiverse-Inventories (share toàn bộ inventory/stats với `world`) — vì đây là mô hình lai chặt chẽ, nhân vật RPG phải giữ nguyên inventory/level khi di chuyển giữa hub và mỏ, không phải 2 nhân vật tách biệt.
   - MMOCore `custom-mine-conditions` cần thêm `world_prison` vào danh sách `world{name=...}` (hiện tại chỉ có `world,world_nether,world_the_end`).
2. **Kinh tế**: Vault (EssentialsX Economy, đã hook sẵn) = tiền tệ chính duy nhất — dùng cho sellwand/auto-sell của Prison, shop MMOCore, chi phí crafting-station MMOItems. PlayerPoints (đang `vault: false`, giữ nguyên) = tiền tệ phụ **Token/Prestige**, dùng cho prestige, mở khóa tier MMOItems, hoặc skip rank — tách khỏi Vault để tránh cộng dồn nhầm khi các GUI/plugin khác duyệt qua "số dư Vault".
3. **Rank vs Class tách bạch vai trò**: LuckPerms group/track = **chỉ quản lý quyền truy cập** (lệnh, vùng, kit theo rank Prison). MMOCore class/profession = **trạng thái tiến triển riêng của từng người chơi** (level, skill points, attribute), lưu trong dữ liệu riêng của MMOCore — KHÔNG mô hình hóa class thành LuckPerms group. Hai hệ thống nối với nhau một chiều: sự kiện rank-up của Prison → (a) đổi LuckPerms group theo track, và (b) kích hoạt phần glue để cộng EXP nghề/mở khóa tier MMOItems.

---

## Phase 1 — Hạ tầng & Identity Layer

Chuẩn bị world, region, permission track, và chốt kinh tế trước khi cài Prison.

- Tạo world Multiverse mới `world_prison` (`/mv create world_prison normal`) dành riêng cho các mỏ Prison — world `world` giữ nguyên làm spawn/hub thuần túy, không đào được.
- Thêm `world_prison` vào group `default` của Multiverse-Inventories (share inventory/stats với `world`) — xác nhận qua `groups.yml`, world mới mặc định sẽ ở nhóm `default` khi `first_run`/tạo world mới nếu cấu hình cho phép, cần kiểm tra lại sau khi tạo world.
- Cập nhật `plugins/MMOCore/config.yml` mục `custom-mine-conditions`: thêm `world_prison` vào danh sách `world{name=...}` (hiện tại chỉ có `world,world_nether,world_the_end`).
- Tạo region WorldGuard bảo vệ spawn trong world `world` (chặn build/break ngoài khu quy định) — sẽ tạo mới `plugins/WorldGuard/worlds/world/regions.yml` (hiện chưa tồn tại) qua lệnh `/rg define`. **Hoãn tọa độ/bán kính cụ thể** — dùng tạm vanilla `spawn-protection=16` đã có sẵn, sẽ vẽ region chi tiết sau khi có nhu cầu cụ thể.
- Đặt quy ước đặt tên region cho các mỏ từ sớm (vd. `mine_a`, `mine_b`, `mine_vip`) trong `world_prison`, để cả Prison và mục `custom-mine-conditions` của MMOCore cùng tham chiếu nhất quán. Region thật sẽ vẽ ở Phase 2 khi có tọa độ mỏ.
- Dựng **track `prison_ranks` rỗng** trong LuckPerms (`/lp track create prison_ranks`) + group `default` — theo yêu cầu người dùng, **hoãn việc đặt tên/số lượng rank cụ thể** đến khi cài Prison thật ở Phase 2, để khớp luôn với rank của Prison, tránh làm 2 lần.
- Xác nhận Vault chỉ có 1 nhà cung cấp kinh tế (EssentialsX), PlayerPoints giữ `vault: false` — đã xác nhận qua đọc file, không cần sửa gì thêm.
- Kiểm tra `plugins/Multiverse-Inventories/config.yml` và `groups.yml` — đã xác nhận `world` nằm trong group `default` với `shares: all`.

**Trạng thái thực thi (2026-07-20)**: Đã bật RCON + restart server, hoàn thành các mục sau:
- ✅ Tạo world `world_prison` qua `/mv create world_prison normal` (xác nhận thư mục tồn tại trên đĩa).
- ✅ Thêm `world_prison` vào group `default` của Multiverse-Inventories (sửa trực tiếp `groups.yml` + `/mvinv reload`, vì `/mvinv group` là lệnh dạng hội thoại (conversation) không chạy qua RCON được).
- ✅ Cập nhật `plugins/MMOCore/config.yml` — `custom-mine-conditions` đổi từ `world,world_nether,world_the_end` thành `world_prison` (vì `world` giờ chỉ là hub, không cần block-regen/restriction).
- ✅ Tạo track LuckPerms `prison_ranks` + append group `default` — **lưu ý: `/lp` không thực thi được qua RCON** (LuckPerms dùng Adventure/kyori text nên lệnh gửi qua RCON bị "Command not recognised" hoặc không phản hồi/không persist — đã xác minh bằng `/lp export` cho ra dữ liệu rỗng). Người dùng đã tự chạy 2 lệnh này trực tiếp trong game: `/lp createtrack prison_ranks` và `/lp track prison_ranks append default` (lưu ý cú pháp đúng của bản LuckPerms 5.4.156 là `createtrack`, không phải `track create`). Đã xác minh lại qua `/lp export`: `tracks: {"prison_ranks":{"groups":["default"]}}`.
- ✅ Vault/PlayerPoints, Multiverse-Inventories group `default` (chứa `world`) — xác nhận không cần sửa gì khác.
- ⏸ Region WorldGuard bảo vệ spawn — **hoãn**, dùng tạm vanilla `spawn-protection=16`, sẽ vẽ region chi tiết khi có nhu cầu cụ thể hoặc khi làm Phase 2.
- ⏸ Region mỏ trong `world_prison` — chờ tọa độ thật khi cài Prison ở Phase 2.

**Ghi chú kỹ thuật cho các phase sau**: RCON hoạt động tốt cho lệnh Multiverse/vanilla/Essentials nhưng KHÔNG dùng được cho lệnh LuckPerms (`/lp`) — các thao tác LuckPerms tiếp theo (gán permission theo rank, v.v.) cần người chơi tự chạy trong game, không thể tự động hóa qua RCON.

---

## Phase 2 — Cài đặt & cấu hình plugin Prison

- Cài file jar Prison vào `plugins/Prison/`, khởi động 1 lần để sinh cấu trúc mặc định (dự kiến có `mines/`, `ranks/`, `config.yml`...).
- **Mines**: định nghĩa 2–4 mỏ qua wizard `/mines set`, gắn với các region WorldGuard đã đặt tên ở Phase 1. Kiểm tra cấu hình reset mỏ (interval, % trống thì reset) — chọn giá trị an toàn cho server đông người, tránh reset đồng bộ gây giật (tham khảo FastAsyncWorldEdit nếu Prison hỗ trợ delegate fill).
- **Ranks**: dựng thang rank (`plugins/Prison/ranks/...`), mỗi rank gắn với 1 group LuckPerms qua tính năng tích hợp LuckPerms có sẵn trong Prison — **cần xác minh tên chính xác của tùy chọn tích hợp này khi cài plugin thật** (chưa có file để đọc vì Prison chưa được cài).
- **Sellwand/auto-sell**: cấu hình giá bán ghi thẳng vào Vault (EssentialsX) — không cần thêm plugin kinh tế khác.
- **Enchant cuốc**: bật hệ enchant riêng của Prison (Efficiency/Fortune/token-enchant...) — đây là điểm dễ va chạm với Vulcan (xử lý ở Phase 5).
- **Prestige**: cấu hình thang prestige (reset rank về đầu, giữ bộ đếm prestige) — bộ đếm này là điểm kích hoạt phần thưởng PlayerPoints và/hoặc mở khóa tier MMOCore/MMOItems ở Phase 4.
- **Cầu nối rank-up → RPG**: dùng 2 cơ chế song song:
  - Đơn giản, ổn định: mỗi rank cấp permission node LuckPerms (vd. `mmoitems.tier.uncommon`) để MMOItems/MMOCore kiểm tra trước khi cho trang bị/dùng đồ theo tier — không cần script.
  - Có thưởng EXP/mở skill point khi rank-up: cần 1 listener (Skript hoặc SCore/nightcore) lắng nghe sự kiện rank-up của Prison. **Tên/class chính xác của event này phải xác minh khi Prison đã được cài** (xem mục Uncertainties).

**Trạng thái thực thi (2026-07-20)**:
- ✅ Đã cài Prison v3.3.1 (báo nội bộ là 3.3.0-alpha.19j — lệch version string nhưng hoạt động bình thường, hook đúng Vault (EssentialsX Economy) + LuckPerms.
- ✅ Map 15 mỏ dựng sẵn (`15Mines-PremiereSetups.schematic`) đã paste vào world riêng `world_prison` qua FAWE (`//schematic load ... mcedit` + `//paste`, lưu ý định dạng `.schematic` cũ cần chỉ định format `mcedit` hoặc dùng đuôi file đầy đủ, WorldEdit mặc định tìm `.schem`).
- ✅ Chỉ dùng **9 trong 15 mỏ** của map, đặt tên rank theo chủ đề "tù nhân → vượt ngục": A=Tân Binh, B=Tù Nhân, C=Lao Công, D=Thợ Đào, E=Đội Trưởng, F=Phó Quản Ngục, G=Quản Ngục, H=Bá Chủ Ngục Tù, I=Vượt Ngục. Giá rank từ 0 → 4,000,000 (Vault).
- ✅ Đã xóa ladder mặc định 26 rank (J-Z) + prestige giữ nguyên 25 rank (P1-P25, chưa đụng tới).
- ✅ 9 mỏ đã gắn tọa độ thật trong `world_prison` qua WorldEdit selection (`//pos1`, `//pos2`) + `/mines set area <tên>`.
- ✅ **Block composition mỗi mỏ — KHÔNG dùng stone** (đã bỏ hẳn theo yêu cầu), chỉ gồm ore theo kiểu cascade 30/70 (30% ore kế thừa từ mỏ liền trước, 70% ore chính của mỏ đó):

  | Mỏ | Rank | Ore kế thừa (30%) | Ore chính (70%) |
  |---|---|---|---|
  | A | Tân Binh | — | Cobblestone 100% |
  | B | Tù Nhân | — | Coal 100% |
  | C | Lao Công | Coal 30% | Copper 70% |
  | D | Thợ Đào | Copper 30% | Iron 70% |
  | E | Đội Trưởng | Iron 30% | Gold 70% |
  | F | Phó Quản Ngục | Gold 30% | Redstone 70% |
  | G | Quản Ngục | Redstone 30% | Lapis 70% |
  | H | Bá Chủ Ngục Tù | Lapis 30% | Diamond 70% |
  | I | Vượt Ngục | Diamond 30% | Emerald 70% |

  Tỷ lệ ore rất cao (không có filler vô giá trị như stone) — **bắt buộc phải rà lại ở Phase 6 (cân bằng kinh tế)**, thu nhập/giờ sẽ cao hơn nhiều so với prison server thông thường (thường ore hiếm chỉ chiếm 5-20%, có filler chiếm phần lớn). Cần cân đối lại giá rank/sellwand hoặc giảm giá trị sellwand từng loại ore để tránh lạm phát kinh tế sớm. Cấu hình qua `/mines block add|remove|setChance <mine> <block> <percent>` (RCON dùng ổn định cho các lệnh này, không gặp bug như `/ranks delete`).
- ✅ **Enchant cuốc — đổi hướng**: Prison KHÔNG có hệ token-enchant built-in (chỉ hỗ trợ enchant vanilla). Đã thử cài `PrisonEnchantsFree` (plugin riêng, free, có custom enchant + token/gems/shards) — load thành công — nhưng **quyết định KHÔNG dùng** (rủi ro xung đột NBT/lore với MMOItems) và đã gỡ hoàn toàn.
- ✅ **Chuyển hướng: dùng MMOItems làm hệ thống trang bị chính** thay vì plugin enchant riêng. Đã xóa sạch toàn bộ item mẫu/demo gốc của MMOItems (32 file `item/*.yml`, ~200 item, không phải nội dung tự tạo).

### Trạng thái cuối cùng (2026-07-21) — Bộ cuốc + giáp MMOItems

**Cuốc — `plugins/MMOItems/item/tool.yml`** (45 item: 9 rank × 5 cấp con, ID `PICKAXE_<RANK>_<1-5>`):
- Mỗi rank có 5 cấp con, đại diện cho việc **trade nâng cấp dần tại NPC** (chưa xây NPC thật, mới chỉ có item tĩnh) — không dùng "+N" để tránh nhầm với cường hóa thật sau này; thay vào đó dùng **số La Mã in đậm màu vàng** (I, II, III, IV, V) làm hậu tố tên item.
- 3 chỉ số **luân phiên tăng mỗi cấp** (không cấp nào đứng yên cả 3): Hiệu Suất (Efficiency) → Gia Tài (Fortune) → Bền Bỉ (Unbreaking) → lặp lại chu kỳ. Bắt đầu từ 1/1/1 (rank A cấp I), kết thúc ở rank I cấp V khoảng 16/16/15 — mức trần thấp hơn nhiều so với thiết kế đầu tiên (từng lên tới 90, bị chê quá cao).
- `pickaxe-power` tăng tuyến tính theo tổng bước (rank×5+cấp, 1→45). 2 rank cao nhất (Bá Chủ Ngục Tù, Vượt Ngục) có `autosmelt: true`.
- Tier/vật liệu/độ bền vẫn theo RANK (không đổi theo cấp con).
- `will-break: false`, `unbreakable: false` — cuốc có hao mòn durability thật (không phải bất tử), người chơi cần tự sửa.
- Lore chỉ còn phần **Tiểu Sử** (header + 2 bullet ngắn); phần **Chỉ Số** hiển thị tự động qua `lore-format: tool-lore` (`plugins/MMOItems/language/lore-formats/tool-lore.yml`) dùng **custom-stat** (`custom-miningefficiency/fortune/unbreaking`, giá trị đồng bộ 1:1 với enchant thật) thay vì viết tay từng dòng.

**Giáp — `plugins/MMOItems/item/armor.yml`** (180 item: 4 mảnh Nón/Áo/Quần/Giày × 9 rank × 5 cấp, ID `<HELMET|CHESTPLATE|LEGGINGS|BOOTS>_<RANK>_<1-5>`):
- Cùng công thức luân phiên tăng: Giáp (armor) → Máu Tối Đa (max-health) → Độ Bền Giáp (armor-toughness) → lặp lại. Cùng mốc 1→~16.
- Type MMOItems chung là `ARMOR` (không có type riêng per-slot — slot đeo do `material` quyết định, vd `IRON_HELMET` vs `IRON_CHESTPLATE`).
- Lore riêng `plugins/MMOItems/language/lore-formats/armor-lore.yml` (icon ◆ cho header, khác cuốc dùng ⛏) hiển thị Giáp/Máu Tối Đa/Độ Bền Giáp qua custom-stat tương ứng.
- **Lưu ý quan trọng cho Phase 4/tương lai**: giáp dùng stat thật của MMOItems (`armor`, `max-health`, `armor-toughness`), khác cuốc dùng enchant vanilla — nghĩa là **giáp CÓ THỂ chuyển sang MMOItems Upgrade Template thật** (1 item/rank + cường hóa qua NBT, không cần 45 item tĩnh/mảnh) nếu sau này muốn làm cường hóa thật cho giáp. Đã bàn với người dùng nhưng **quyết định giữ nguyên 180 item tĩnh** cho hệ thống trade hiện tại, để dành slot "+N"/cường hóa thật cho một lớp nâng cấp khác sau này (chưa xây).

### Phát hiện kỹ thuật quan trọng (áp dụng cho mọi việc chỉnh MMOItems sau này)
1. **MMOItems Upgrade Template KHÔNG áp dụng được lên enchant vanilla** (`efficiency`/`fortune`/`unbreaking` qua mục `enchants:`) — test trực tiếp cho lỗi `Stat 'EFFICIENCY' not found.` Chỉ áp dụng được lên stat thật của MMOItems (`pickaxe-power`, `armor`, `attack-damage`...). Vì vậy cuốc bắt buộc dùng item tĩnh nhiều cấp; giáp thì có lựa chọn dùng Upgrade Template thật.
2. **Custom-stat (`custom-stats.yml`) hoạt động nhưng có 2 cái bẫy**:
   - Tên custom-stat **không được chứa dấu gạch ngang** (vd `mining-efficiency` → lỗi `Stat not found`; phải đổi thành camelCase `MiningEfficiency` mới nhận, tự động thành ID `custom-miningefficiency`).
   - Custom-stat mới thêm vào `custom-stats.yml` **chỉ được đăng ký lúc plugin khởi động (onEnable)** — `/mmoitems reload` (kể cả `reload all`) KHÔNG đủ để nhận custom-stat mới, bắt buộc phải restart server. Sau khi đã đăng ký đúng tên (không gạch ngang), các thay đổi giá trị/gán vào item thì `/mmoitems reload` bình thường là đủ.
3. **File `lore-format` bị xóa nhầm giữa chừng** (`lore-only.yml`, sau đổi tên `tool-lore.yml`) từng làm hỏng lore của **toàn bộ 90 item cùng lúc** (lỗi `Could not find lore format with ID 'lore-only'`) — bài học: file lore-format riêng cần được backup/kiểm tra định kỳ vì bất kỳ ai (kể cả tự tay) xóa nhầm sẽ crash hiển thị hàng loạt item ngay, dù item vẫn "tồn tại" (chỉ lore bị lỗi).
4. **Icon Unicode cao (🛡🦾 — emoji ngoài Basic Multilingual Plane) không hiển thị được trong font Minecraft mặc định** — bị lỗi/không hiện. Bộ icon đã xác nhận AN TOÀN, dùng xuyên suốt: `⛏ ✦ ● ◆ »`.
5. **Sửa cú pháp YAML thiếu dấu `"` đóng có thể làm MMOItems tự tắt hẳn plugin** (không chỉ lỗi reload) — khi đó lệnh `/mi` báo "plugin is disabled", bắt buộc restart server mới khôi phục (không tự phục hồi qua reload vì chính lệnh reload cũng thuộc plugin đang tắt).
- ⏸ Chưa làm: phát trang bị tự động theo rank/cấp (hiện chỉ `/mmoitems give` thủ công), prestige liên kết RPG, cầu nối rank-up → MMOCore/MMOItems tự động (Phase 4).

### NPC trade nâng cấp cuốc bằng vật phẩm (2026-07-21)

Yêu cầu: NPC cho phép đổi cuốc cấp thấp (I→V trong cùng rank) lấy cấp cao hơn, **không dùng tiền Vault** — dùng "Đá Nâng Cấp" chế từ quặng đào được cùng rank.

**Hướng đã thử và bỏ**: ban đầu định dùng Citizens command trait → Skript custom command → Vault balance + `skript-reflect` đọc NBT (`MythicLib NBTItem.getString("MMOITEMS_ITEM_ID")`) để nhận diện cuốc, rồi `remove 1 of {_item} from inventory` để thu cuốc cũ. Đã verify qua RCON: đọc NBT hoạt động tốt, nhưng **hiệu ứng `remove X of {_item} from inventory` của Skript match sai item** khi có 2 cuốc MMOItems cùng material nhưng khác NBT trong túi đồ (xóa nhầm cuốc cấp II thay vì cuốc cấp I đang cầm) — không an toàn để dùng cho việc thu hồi vật phẩm chính xác. Đã bỏ hướng này, xoá hết script test, hoàn tiền/item test cho player.

**Hướng cuối cùng (đã làm)**: dùng thẳng cơ chế **MMOItems Crafting Station** có sẵn (không cần Skript/Vault/reflect gì cả) — an toàn hơn nhiều vì việc match & trừ ingredient do chính MMOItems xử lý (đã kiểm chứng ingredient `mmoitem{...}` hoạt động đúng qua các recipe demo có sẵn).

- ✅ Xác nhận qua `unzip -l` jar MMOItems: crafting-station ingredient chỉ hỗ trợ `mmoitem{...}` và `vanilla{...}` — không có ingredient trả bằng tiền Vault, nên nếu vẫn muốn dùng tiền thật sự phải tự viết Skript (rủi ro như trên). Vì user đổi yêu cầu sang "không dùng tiền", việc này không còn là vấn đề.
- ✅ Xác nhận block thật của 9 mỏ qua `plugins/Prison/data_storage/mines/mines/*.json` → `prisonBlocks`: A=cobblestone (item drop = cobblestone), B=coal_ore (drop coal), C=copper_ore (drop raw copper), D=iron_ore (drop raw iron), E=gold_ore (drop raw gold), F=redstone_ore (drop redstone), G=lapis_ore (drop lapis lazuli), H=diamond_ore (drop diamond), I=emerald_ore (drop emerald) — đúng vanilla drop vì Prison đào là block break event thật (autosmelt của MMOItems ở 2 rank cao nhất cũng xác nhận điều này).
- ✅ Tạo `plugins/MMOItems/item/material.yml`: 9 item MATERIAL mới `DA_NANG_CAP_<RANK>` (Đá Nâng Cấp), icon `AMETHYST_SHARD`, tier TRASH (A-C) / COMMON (D-F) / UNCOMMON (G-I).
- ✅ **Đổi sang 9 trạm craft riêng biệt theo yêu cầu người dùng** ("mine nào chỉ chế đồ mine đó", 2026-07-21) — thay vì 1 trạm chung `pickaxe-forge.yml`, tách thành `plugins/MMOItems/crafting-stations/forge-a.yml` .. `forge-i.yml` (đặt tên theo đúng ký hiệu mỏ A-I trong Prison). Mỗi file chỉ chứa đúng 5 recipe của rank đó:
  - 1 recipe **chế đá**: 16 quặng/vật liệu thô của mỏ đó → 1 Đá Nâng Cấp cùng rank.
  - 4 recipe **nâng cấp cuốc** (bước I→II→III→IV→V): ingredient = 1 cuốc cấp hiện tại (`mmoitem`) + N Đá Nâng Cấp cùng rank (N tăng dần theo bước: 2/3/4/6), output = cuốc cấp kế tiếp.
  - Chưa gắn điều kiện `level{}` (MMOCore profession Miner chưa làm — xem Phase 3) — gating hiện tại chỉ dựa vào nguyên liệu, đủ dùng cho bản đầu.
- ✅ Reload qua RCON (`mi reload all`) — xác nhận "12 Crafting Stations - 45 Recipes" tổng cộng (9 trạm mới × 5 recipe + 3 trạm demo cũ), không có lỗi nào liên quan tới `forge-a..i` trong log (các lỗi "Could not find MMOItem" trong log chỉ thuộc 3 trạm craft demo cũ còn sót lại — `arcane-forge`, `mythical-forge`, `steel-crafting-station` — tham chiếu item mẫu đã xoá, không liên quan việc mới làm; có thể dọn 3 file demo này sau nếu không dùng).
- ⏸ Chưa làm (cần user tự thao tác trong game vì cần vị trí thật + click GUI, không tự động qua RCON được):
  - Đặt 9 NPC Citizens tại từng mỏ, lệnh mẫu (đứng đúng vị trí muốn đặt NPC trong mỏ A rồi chạy, đổi `forge-a` thành `forge-b`..`forge-i` cho các mỏ khác):
    ```
    /npc create Thợ Rèn
    /npc command add -p mi stations open forge-a
    ```
    (Cờ `-p` để lệnh chạy dưới danh nghĩa người chơi tự click, vì `/mi stations open` không nhận tham số người chơi — chỉ tự mở cho chính mình. Mỗi mỏ dùng đúng station id của mỏ đó — NPC ở mỏ A chỉ mở được `forge-a`, không thấy/không craft được đồ mỏ khác.)
  - Test thực tế bằng cách đứng cầm cuốc rank tương ứng + đủ quặng, right-click NPC, chọn recipe trong GUI trạm craft để xác nhận animation/queue/output đúng như mong đợi.
  - Cân bằng lại số lượng quặng/đá nếu thấy quá dễ/khó sau khi chơi thử (hiện tại: 16 quặng/đá, 2-3-4-6 đá mỗi bước nâng cấp — thuần túy là số khởi điểm, chưa test cân bằng thật).

**Đổi tên hiển thị "Đá Nâng Cấp" theo khoáng sản rồi revert lại (2026-07-21)**: thử đổi `name:` trong `material.yml` + `display=` trong recipe từ tên rank (Tân Binh, Lao Công...) sang tên khoáng sản (Đá Cuội, Đồng...) theo yêu cầu ban đầu, nhưng người dùng revert lại ngay sau đó — lý do: **tên hiển thị (player-facing) phải đồng bộ với tên rank đã dùng xuyên suốt cuốc/giáp/rank tag** ("Cuốc Tân Binh I", tag rank `[Tân Binh]`...), tên khoáng sản kiểu ore chỉ nên dùng cho **ID kỹ thuật nội bộ** (xem mục đổi rank ID bên dưới), không phải thứ người chơi nhìn thấy. Đã revert `material.yml` (`name:`) và cả 9 file `forge-*.yml` (`display=`) về đúng tên rank gốc như ban đầu (Đá Nâng Cấp Tân Binh / Tù Nhân / Lao Công / Thợ Đào / Đội Trưởng / Phó Quản Ngục / Quản Ngục / Bá Chủ Ngục Tù / Vượt Ngục). Item ID `DA_NANG_CAP_<RANK>` không đổi trong suốt quá trình này. Đã `mi reload all` xác nhận vẫn 12 Crafting Stations / 45 Recipes, không lỗi.

**Đổi ID rank Prison nội bộ từ chữ cái sang tên khoáng sản (2026-07-21, theo yêu cầu người dùng — "dễ phân biệt")**: chỉ đổi **ID kỹ thuật** dùng trong lệnh admin (`/ranks ...`, liên kết mine↔rank), KHÔNG đổi tag hiển thị (`&7[&fTân Binh&7]` giữ nguyên, vẫn hiện đúng như cũ trong tab/chat/rank list). Bảng đổi: A→`cobblestone`, B→`coal`, C→`copper`, D→`iron`, E→`gold`, F→`redstone`, G→`lapis`, H→`diamond`, I→`emerald`.

- Prison **không có lệnh rename rank** (`/ranks set` chỉ có `cost`/`currency`/`rank` (gán player)/`tag` — không có sub-lệnh đổi tên/ID). Phải sửa tay file + `/ranks reload ranksLaddersAndPlayers` (không cần restart cho phần này).
- Đã backup `rank_A..I.json`, `mines/mines/A..I.json`, `ladder_default.json`, player data của tài khoản test trước khi sửa (lưu trong scratchpad phiên làm việc).
- File đã đổi: `plugins/Prison/data_storage/ranksDb/ranks/rank_A.json` → đổi tên file thành `rank_cobblestone.json` (tương tự cho 8 rank còn lại) + field `"name"` bên trong đổi theo; `plugins/Prison/data_storage/ranksDb/ladders/ladder_default.json` (field `rankName` từng entry); `plugins/Prison/data_storage/mines/mines/A..I.json` (field `"rank": "RANK,<id>,-1,<tag>"` — chỉ phần `<id>` đổi, tag giữ nguyên); player data test (`rankName` đổi theo).
- ✅ Reload qua RCON (`ranks reload ranksLaddersAndPlayers`) — `/ranks list default` hiện đúng 9 rank với ID mới, giá tiền/tag/màu giữ nguyên; `/ranks player ABeess` hiện đúng `emerald` (map từ rank cũ `I`).
- ⚠️ **Phát hiện quan trọng**: Prison **mines** là subsystem riêng, không có lệnh `/mines reload` để nạp lại liên kết rank từ đĩa. Sau khi sửa file + reload ranks/ladders/players, `/mines info A` vẫn hiện `Rank: -1 A` (ID cũ) vì mine đang chạy vẫn giữ liên kết Rank cũ trong bộ nhớ — file trên đĩa đã đúng nhưng cần **restart server** để mines đọc lại đúng liên kết rank mới.
- ✅ **Restart server** (2026-07-21, người dùng tự chạy `run.bat`) — xác nhận qua RCON sau restart: `/mines info A` hiện đúng `Rank: -1 cobblestone`, `/ranks list default` hiện đúng từng rank kèm mine liên kết.
- ✅ **Đổi luôn tên mine theo yêu cầu người dùng** ("mine A → mine cobblestone"): khác với rank, Prison **có sẵn lệnh** `/mines rename [mineName] [newName]` — dùng lệnh này qua RCON cho cả 9 mỏ (A→cobblestone, B→coal, C→copper, D→iron, E→gold, F→redstone, G→lapis, H→diamond, I→emerald), an toàn hơn nhiều so với sửa tay file như rank. Tag hiển thị của mine (`[A]`, `[B]`...) giữ nguyên không đổi, chỉ đổi tên/ID mine. Đã verify `/mines list` + `/ranks list default` — liên kết rank↔mine vẫn đúng, không lỗi trong log.
- Lưu ý: 9 file trạm craft `forge-a.yml`..`forge-i.yml` (tên file, không phải nội dung) **không đổi theo** — đây là ID riêng của MMOItems crafting station, không liên quan tới tên mine/rank của Prison, không cần đồng bộ.

**Bài học RCON quan trọng**: `/ranks delete <rank>` bị lỗi (NullPointerException) khi chạy qua RCON/console — làm hỏng dữ liệu ladder (rank bị rớt khỏi danh sách ladder dù file vẫn còn) khi thử chạy nhiều lệnh liên tiếp. Phải sửa tay file JSON tại `plugins/Prison/data_storage/ranksDb/ranks/rank_*.json` và `plugins/Prison/data_storage/ranksDb/ladders/ladder_default.json` để phục hồi. Các lệnh Prison khác (`/mines`, `/ranks list`, `/ranks set ...`) chạy qua RCON bình thường — chỉ riêng `ranks delete` có bug này, nên tránh dùng qua console, để người chơi tự chạy trong game nếu cần xóa rank sau này. Ngoài ra `/mines delete <mine> confirm` qua RCON có tỷ lệ thất bại ngẫu nhiên (~50%, cần thử lại) dù không phá dữ liệu.

---

## Phase 3 — Xây dựng lớp RPG (nội dung, ít cần code mới)

- **MMOCore — profession "Miner"**: nên làm **profession** (song song, không loại trừ) thay vì class, để người chơi vẫn giữ class chiến đấu (vd. Warrior) song song với nghề đào mỏ. Tạo `plugins/MMOCore/professions/miner.yml` (thư mục này hiện chưa tồn tại). Cấu hình bảng EXP theo loại block bị phá, lọc theo region mỏ (cú pháp `region{name=...}` giống mẫu đã có trong `custom-mine-conditions`) — **xác minh đây là 2 hệ cấu hình riêng**: (a) bảng EXP nghề theo block, và (b) `custom-mine-conditions` chỉ dùng cho block-regen/restriction (đã xác nhận qua đọc file). Sau khi có region mỏ thật, cập nhật `custom-mine-conditions` từ `example_region`/`example_region2` sang tên region thật.
- **MMOItems**: mở rộng `item/tool.yml` (cuốc) theo từng tier/rank (vd. `MINER_PICKAXE_T1..T5`), mở rộng `item-tiers.yml` thêm RARE/EPIC/LEGENDARY cho khớp độ dài thang rank Prison. Mở rộng `item/armor.yml` cho bộ giáp theo class/profession. Cân nhắc dùng `crafting-stations/*.yml` nếu muốn chế tạo thay vì chỉ mua trong shop Prison.
- **MythicMobs**: tạo mới `Mobs/` và `Skills/` (chưa tồn tại), viết mob theo từng tier mỏ, spawn điều kiện theo region mỏ (qua điều kiện world/region của MythicMobs hoặc trigger qua Skript khi phá block). Nội dung dungeon/boss ngoài mỏ có thể để giai đoạn sau, không bắt buộc trong bản đầu.
- **ModelEngine**: model tùy chỉnh cho mob MythicMobs — mang tính thẩm mỹ, có thể làm sau khi cơ chế chính đã ổn định.
- **ItemsAdder**: chỉ cần nếu muốn block/texture ore tùy chỉnh (không chỉ resource pack reskin) — nên làm sau vì kéo theo yêu cầu tải resource pack phía client, tăng ma sát khi người chơi mới join server công khai.

---

## Tính năng bổ sung — Trade đồ ↔ Point & NPC chế tạo khó (mở rộng Phase 2/3)

Bổ sung vào Phase 2 (kinh tế Prison) và Phase 3 (MMOItems/crafting) của plan gốc, thêm vào sau khi đã có thảo luận với người dùng ngày 2026-07-20.

- **Trade đồ = Point**: đồ đào/nhặt được có thể quy đổi ra **Point** (PlayerPoints, đã xác định ở "Quyết định nền tảng #2" là tiền tệ phụ, tách khỏi Vault). Đây là lớp kinh tế song song với sellwand-ra-tiền-Vault đã có trong Phase 2 — không thay thế, mà là thêm 1 đường quy đổi khác dành riêng cho các vật phẩm/nguyên liệu đặc thù (vd. nguyên liệu hiếm từ tầng mỏ sâu) để dồn vào hệ thống craft bên dưới.
- **NPC chế tạo bằng Point (khó hơn)**: dùng Citizens (đã cài sẵn) đặt 1 NPC "thợ chế tạo" cho phép đổi Point lấy vật phẩm (cuốc/trang bị tier cao trong MMOItems). Độ khó nằm ở việc **giá Point cao hơn hẳn so với cách kiếm vật phẩm tương đương qua đường thông thường** (đào/rank-up/shop Vault) — tức đây là một đường chế tạo thay thế, tốn kém hơn, không phải đường tắt rẻ hơn. Mục đích: tạo thêm mục tiêu farm Point dài hạn, không phá cân bằng kinh tế chính (Vault).
- **Gợi ý triển khai kỹ thuật** (xác minh khi làm thật, chưa chốt cứng):
  - Ưu tiên tận dụng khung `crafting-stations/*.yml` có sẵn của MMOItems (`plugins/MMOItems/crafting-stations/`) nếu nó hỗ trợ điều kiện trả bằng PlayerPoints; nếu không hỗ trợ trực tiếp, cần glue qua Skript (tương tự cầu nối rank-up ở Phase 4) để NPC Citizens kiểm tra số dư Point trước khi giao vật phẩm.
  - Giá Point cho từng vật phẩm nên được tính dựa trên: (giá trị quy đổi trung bình của vật phẩm qua sellwand-Vault) × hệ số khó hơn (vd. 3-5 lần), để đảm bảo "khó hơn" là thật chứ không chỉ là khác kênh.
  - Cần rà lại cùng lúc với việc cân bằng kinh tế ở Phase 6 (mục "Kiểm tra cân bằng kinh tế") vì đây là thêm 1 luồng thu nhập/tiêu tiền mới cần đưa vào bảng cân bằng chung.
- **Việc cần làm thêm ở file trọng yếu**: `plugins/Citizens/...` (NPC mới), `plugins/MMOItems/crafting-stations/*.yml` hoặc `plugins/Skript/scripts/point-crafting-npc.sk` (mới, nếu cần glue), `plugins/PlayerPoints/config.yml` (rà lại nếu cần thêm lệnh cộng/trừ point khi trade đồ).

---

## Phase 4 — Lớp glue/tích hợp (phần nhiều rủi ro kỹ thuật nhất)

- **Cầu nối Prison rank-up → MMOCore**: script Skript (hoặc SCore/nightcore) mới, vd. `plugins/Skript/scripts/prison-mmocore-bridge.sk`. Cần xác minh: (a) tên event rank-up thật của Prison, (b) API MMOCore để cộng EXP profession/class hoặc attribute point bằng lệnh/API (kiểm tra wiki MMOCore 1.12 khi triển khai, không đoán trước tên hàm).
- **PlaceholderAPI**: hiện `plugins/PlaceholderAPI/expansions/` đang trống hoàn toàn — cần tải qua `/papi ecloud download` các expansion: MMOCore, Prison, Vault, PlayerPoints, rồi `/papi reload`.
- **TAB / DecentHolograms**: cập nhật để hiển thị rank Prison + level/class MMOCore bằng placeholder mới có ở bước trên.
- **DeluxeMenus**: làm menu xác nhận rank-up/prestige và menu thông tin class/profession, dùng placeholder PAPI.
- **BattlePass** (tùy chọn): nếu muốn quest thưởng tiền Prison/EXP MMOCore, dùng lệnh reward sẵn có của BattlePass để gọi `/mmocore giveexp` hoặc lệnh kinh tế Vault — để giai đoạn hoàn thiện sau, không phải core path.

---

## Phase 5 — Chống gian lận & hiệu năng

- **Tinh chỉnh Vulcan**: các block `fastbreak`, `scaffold` (đã có sẵn, `max-violations` mặc định ở mức nhạy) cần nới lỏng cho khu vực mỏ — kiểm tra xem Vulcan có hỗ trợ miễn trừ theo region hay chỉ theo permission (`/vulcan exempt`); nếu chỉ theo permission thì cần Skript bật/tắt miễn trừ khi vào/ra vùng mỏ. `autoclicker` nên giữ nghiêm ngặt cho combat, có thể cần nới cho việc đào liên tục bằng cuốc enchant.
- **Reset mỏ ở quy mô lớn**: xác nhận cơ chế reset của Prison chạy async/theo batch, không fill đồng bộ trên main thread — tinh chỉnh batch size theo số người chơi đồng thời dự kiến.
- **Bảo vệ region**: đảm bảo cờ `block-break`/`block-place` trong `regions.yml` giới hạn đúng ranh giới mỏ, tránh đào xuyên ra ngoài; kết hợp cơ chế tự bao mỏ của Prison nếu có, thay vì chỉ dựa vào WorldGuard.
- **FastAsyncWorldEdit**: cân nhắc dùng FAWE cho việc fill lại mỏ nếu Prison không có cơ chế reset hiệu quả sẵn.

---

## Phase 6 — Kiểm thử & chuẩn bị launch

- Test tài khoản phụ/staff: đi hết thang rank từ thấp → cao → prestige, xác nhận LuckPerms group đổi đúng + EXP/mở khóa MMOCore kích hoạt đúng, không bị cấp trùng hoặc bỏ sót khi rank-up lúc lag/disconnect.
- Load-test reset mỏ với 5-10 người đào cùng lúc (staff test), theo dõi TPS.
- Test Vulcan false-positive: đào liên tục bằng cuốc enchant tier cao nhất, xác nhận không bị kick/ban oan; đồng thời test 1 macro/auto-clicker thật để xác nhận check vẫn bắt được gian lận thật ngoài ngữ cảnh đào mỏ.
- Kiểm tra cân bằng kinh tế: thu nhập/giờ theo từng rank so với giá sellwand, giá shop MMOCore, giá crafting-station MMOItems — tránh lạm phát ngày đầu mở server.
- Kiểm tra toàn bộ placeholder dùng trong DeluxeMenus/TAB/DecentHolograms đã resolve đúng (không còn `%...%` hiển thị thô).
- Backup trước khi mở công khai: `world/`, `plugins/Prison/`, `plugins/MMOCore/`, `plugins/LuckPerms/luckperms-h2-v2.mv.db`, `regions.yml` của WorldGuard.
- Cân nhắc soft-launch có whitelist/giới hạn số lượng người chơi trong thời gian ngắn để bắt các edge-case về rank-up/EXP (rank-up khi offline, khi đang combat, chia EXP theo party — hiện `profession-exp-split: false` trong MMOCore, cần xem lại khi mining trở thành profession).

---

## Các điểm kỹ thuật chưa chắc chắn — xác minh khi triển khai, không giả định trước

1. Tên/class event rank-up thật của Prison, event bắn trước hay sau khi đổi group LuckPerms, có cancel được không — cần cho phần glue ở Phase 4. Chưa có gì để đọc vì Prison chưa được cài; nên test bằng 1 listener log đơn giản trước khi viết bridge script thật.
2. Đã xác nhận `custom-mine-conditions` trong MMOCore chỉ điều khiển block-regen/restriction, KHÔNG phải EXP nghề — nghĩa là cấu hình EXP nghề theo block phải làm riêng trong file profession, không chỉ sửa 1 key này.
3. Chưa chốt nhánh/phiên bản Prison cụ thể sẽ dùng → chưa biết cơ chế reset mỏ có async/batch mặc định hay không — cần kiểm tra ngay sau khi chọn jar cụ thể.
4. Chưa rõ Vulcan hỗ trợ miễn trừ theo region hay chỉ theo permission từng người chơi — quyết định cách làm Phase 5 (config thuần Vulcan hay cần Skript glue bật/tắt exempt).

---

## File/khu vực trọng yếu cần đụng tới

- `plugins/MMOCore/config.yml` — mục `custom-mine-conditions` (dòng ~48-50) cần trỏ từ `example_region`/`example_region2` sang tên region mỏ thật.
- `plugins/WorldGuard/worlds/world/regions.yml` (sẽ tạo mới) — định nghĩa mỏ + bảo vệ spawn, là điểm tham chiếu chung giữa MMOCore và Prison.
- `plugins/Vulcan/config.yml` — các block `fastbreak` (dòng ~3075), `scaffold` (dòng ~3110), `autoclicker` (dòng ~1296) cần tinh chỉnh cho khu vực đào mỏ.
- `plugins/Prison/` (mới, sau khi cài) — toàn bộ rank/mine/tích hợp LuckPerms sống ở đây.
- `plugins/MMOItems/item-tiers.yml` và `plugins/MMOItems/item/tool.yml` — mở rộng tier + cuốc/trang bị theo rank.
- `plugins/MMOCore/professions/miner.yml` (mới) — bảng EXP nghề đào mỏ.
- `plugins/Skript/scripts/prison-mmocore-bridge.sk` (mới) — cầu nối sự kiện rank-up ↔ EXP/mở khóa RPG.

## Cách kiểm chứng sau khi triển khai từng phần

- Sau Phase 1-2: vào server bằng tài khoản test, đào trong mỏ đã định nghĩa, kiểm tra rank-up đổi group LuckPerms (`/lp user <player> info`), sellwand ghi đúng vào số dư Vault (`/balance`).
- Sau Phase 3-4: kiểm tra `/mmocore` hiển thị EXP profession Miner tăng khi đào trong mỏ, cuốc/trang bị mới hiển thị đúng tier, placeholder trong menu/TAB không còn hiển thị thô.
- Sau Phase 5: đào liên tục bằng cuốc enchant cao nhất trong 2-3 phút không bị Vulcan kick/ban; dùng công cụ auto-click ngoài vùng mỏ vẫn bị Vulcan bắt.
- Trước khi mở public: chạy toàn bộ checklist Phase 6, có backup trước khi bật whitelist/mở cổng.
