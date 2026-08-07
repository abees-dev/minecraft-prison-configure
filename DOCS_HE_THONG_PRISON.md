# 📘 TÀI LIỆU CẤU HÌNH HỆ THỐNG MULTIPLIERS, SHOP & MULTI-RANK (PRISON + VIP)

Tài liệu vận hành **bán quặng** (EconomyShopGUI + Bang Hội), tích hợp **LuckPerms**, và ghi chú module X-Prison liên quan bán/đào.

**Nguồn lối chơi:** [`docs/player/gameplay.md`](docs/player/gameplay.md) · **Kinh tế live:** [`docs/systems/economy-balance.md`](docs/systems/economy-balance.md) · **Mục lục docs:** [`docs/INDEX.md`](docs/INDEX.md)

Cập nhật: 2026-08-07 — `/sellgui` **không** còn sell-multiplier; hai kênh dùng cùng giá base và multiplier bán chỉ qua **Bang Hội**.

---

## 1. Hai kênh bán quặng

| Kênh | Plugin | Giá | Multiplier | Tiền vào |
| --- | --- | --- | --- | --- |
| **Cá nhân** `/sellgui` | EconomyShopGUI | Base `shops/Ores.yml` | **Không** (`enable-sell-multipliers: false`) | Vault player |
| **Bang** Sell All `/gang vault` | CorePlugin gang | Cùng base (`gang/config.yml` → `sell-prices`) | **Có** — upgrade Sell (+10%/lv) + buff shop + paragon | Bank bang |

File giá cá nhân: `plugins/EconomyShopGUI/shops/Ores.yml`  
File giá bang: `plugins/CorePlugin/gang/config.yml` (`sell-prices`)  
Chế độ bán cá nhân: chỉ `/sellgui`. `commands.sellall: false`. `/sell` và `/sellall` mở `/sellgui`.

### Bảng giá hai kênh (mẫu chính)

| Material | Cá nhân `/sellgui` | Gang Sell |
| --- | ---: | ---: |
| STONE | 10 | 10 |
| COBBLESTONE | 20 | 20 |
| COAL / COAL_ORE | 80 | 80 |
| RAW_IRON / IRON_ORE | 100 | 100 |
| IRON_INGOT | 200 | 200 |
| RAW_GOLD / GOLD_ORE | 200 | 200 |
| GOLD_NUGGET | 30 | 30 |
| GOLD_INGOT | 400 | 400 |
| REDSTONE / REDSTONE_ORE | 150 | 150 |
| LAPIS_LAZULI / LAPIS_ORE | 80 | 80 |
| QUARTZ / NETHER_QUARTZ_ORE | 20 | 20 |
| DIAMOND / DIAMOND_ORE | 1 000 | 1 000 |
| EMERALD / EMERALD_ORE | 1 500 | 1 500 |
| ANCIENT_DEBRIS / NETHERITE_SCRAP | 2 000 | 2 000 |

Khi sửa giá phải đồng bộ cả hai file. Chạy reload EconomyShopGUI và `/gang reload` sau thay đổi.

---

## 2. Multiplier chỉ ở Bang Hội

Nguồn nhân (CorePlugin gang, không phải EconomyShopGUI):

| Nguồn | Hiệu ứng (tóm tắt) |
| --- | --- |
| Upgrade **Sell** | `multiplier-per-level: 0.1` (tối đa 5 level) |
| Shop buff **buff-sell-2x** (timed) | Nhân tạm theo config |
| **Paragon Sell** | Thêm % khi Bang Level max |
| Weekly quest reward sell buff | Timed theo `quests` / season |

**Không** dùng permission `EconomyShopGUI.sell-multipliers.*` cho earn bán quặng nữa.

### Lịch sử (deprecated)

Trước 2026-08-01, ESG có sell-multiplier rank/VIP (tới LEGEND x3.0). Block trong `config.yml` có thể còn nhưng **không hiệu lực** khi `enable-sell-multipliers: false`. Setup LP mới **không** cấp node đó — clear DB rồi `/setuplpranks` là đủ.

---

## 3. X-Prison enchants / autosell — trạng thái design

**Hiện tại:** trong `plugins/X-Prison/config.yml`:

* `enchants: false`
* `autosell: false`

Người chơi **không** dùng Nuke/Layer làm core. Sức đào = cuốc MMOItems + bán `/sellgui` hoặc vault bang.

### Nếu sau này bật lại enchants (không soft-launch)

* `supported-pickaxes` đủ material cúp MMOItems.
* Enchant `countBlocksBroken: true` nếu cần `/blocks` đúng.
* Đối chiếu [`docs/player/gameplay.md`](docs/player/gameplay.md) §6.4 + Vulcan `fastbreak`.

---

## 4. Lệnh vận hành

| Lệnh | Mục đích |
| :--- | :--- |
| `/setuplpranks` | Áp command bonus Prison + VIP (Skript) |
| `/sreload` | Reload EconomyShopGUI |
| `/ess reload` | Reload Essentials (homes) |
| `/gang reload` | Reload YAML bang |
| `/xprison reload` | Reload X-Prison |
| `/sellgui` | Bán cá nhân (giá base) |
| `/gang vault` | Kho quặng bang + Sell All → bank |

---

## 5. Command bonus theo rank (LuckPerms)

Nguồn: `plugins/Skript/scripts/admin/setup_luckperms_ranks.sk` · `plugins/LuckPerms/setup-all-ranks.txt`  
Home: `plugins/Essentials/config.yml` → `sethome-multiple` (`rank1`/`rank3`/`rank5`/`rank7`/`rank9`, VIP).

**Prison** — group cao **parent** group thấp → giữ lệnh đã mở:

| Rank | Mở thêm (cộng dồn) |
| ---: | --- |
| 1 Tân Binh | `/pv`×1, 2 home |
| 2 Tù Nhân | `/workbench` |
| 3 Lao Công | `/pv`×2, 3 home, `/feed` |
| 4 Thợ Đào | `/anvil` |
| 5 Đội Trưởng | `/pv`×3, 4 home, `/enderchest` |
| 6 Phó Quản Ngục | `/heal` |
| 7 Quản Ngục | `/pv`×4, 5 home, `/craft`, `/recipe` |
| 8 Bá Chủ | `/pweather` |
| 9 Vượt Ngục | `/pv`×5, 6 home, `/ptime`, `/kit rank9` |

**VIP** (donor): kho/home/lệnh theo menu `/rank` — **không** nhân `/sellgui`. **`/fly` (+ KeepFly) chỉ LEGEND.**

Áp dụng: `/setuplpranks` → `/ess reload`.

---

## Testing note

* `/sellgui`: mọi rank/VIP/OP cùng giá base.
* Sell All bang: base × Sell upgrade / buff / paragon → bank bang.
* Rank cao vẫn dùng lệnh rank thấp (vd rank 5: `/workbench` + `/feed`).
* Home: rank3=3, rank9=6; VIP legend=25.
