# 📘 TÀI LIỆU CẤU HÌNH HỆ THỐNG MULTIPLIERS, SHOP & MULTI-RANK (PRISON + VIP)

Tài liệu vận hành **bán quặng** (EconomyShopGUI + Bang Hội), tích hợp **LuckPerms**, và ghi chú module X-Prison liên quan bán/đào.

**Nguồn lối chơi:** [`docs/loi-choi.md`](docs/loi-choi.md) · **Mục lục docs:** [`docs/INDEX.md`](docs/INDEX.md)

Cập nhật: 2026-08-01 — `/sellgui` **không** còn sell-multiplier; multiplier bán chỉ qua **Bang Hội** (upgrade Sell / buff / paragon). Giá base gang `sell-prices` khớp `shops/Ores.yml`.

---

## 1. Hai kênh bán quặng

| Kênh | Plugin | Giá | Multiplier | Tiền vào |
| --- | --- | --- | --- | --- |
| **Cá nhân** `/sellgui` | EconomyShopGUI | Base `shops/Ores.yml` | **Không** (`enable-sell-multipliers: false`) | Vault player |
| **Bang** Sell All `/gang vault` | CorePlugin gang | Cùng base (`gang/config.yml` → `sell-prices`) | **Có** — upgrade Sell (+10%/lv) + buff shop + paragon | Bank bang |

File giá cá nhân: `plugins/EconomyShopGUI/shops/Ores.yml`  
File giá bang: `plugins/CorePlugin/gang/config.yml` (`sell-prices`)  
Chế độ bán cá nhân: chỉ `/sellgui`. `commands.sellall: false`. `/sell` và `/sellall` mở `/sellgui`.

### Bảng giá base (đồng bộ — mẫu chính)

| Material | Sell `/sellgui` & gang |
| --- | ---: |
| STONE | 10 |
| COBBLESTONE | 25 |
| COAL / COAL_ORE | 150 |
| RAW_IRON / IRON_ORE | 200 |
| IRON_INGOT | 400 |
| RAW_GOLD / GOLD_ORE | 400 |
| GOLD_NUGGET | 60 |
| GOLD_INGOT | 800 |
| REDSTONE / REDSTONE_ORE | 270 |
| LAPIS_LAZULI / LAPIS_ORE | 140 |
| QUARTZ / NETHER_QUARTZ_ORE | 20 |
| DIAMOND / DIAMOND_ORE | 2 200 |
| EMERALD / EMERALD_ORE | 3 000 |
| ANCIENT_DEBRIS / NETHERITE_SCRAP | 3 800 |

Khi sửa giá: **đổi cả hai file** cho khớp, rồi `/sreload` + `/gang reload`.

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

### Lịch sử (deprecated) — bảng rank/VIP từng gắn ESG

Trước 2026-08-01, ESG `enable-sell-multipliers: true` với rank + VIP (tới LEGEND x3.0). Block `sell-multipliers:` trong `config.yml` **có thể còn trên đĩa** nhưng **không hiệu lực** khi flag = false. Không cấp lại permission sell-multiplier cho progression.

LuckPerms setup cũ (`/setuplpranks`, `setup-all-ranks.txt`) vẫn có thể gán node đó — vô hại với ESG đã tắt; dual-check nếu muốn dọn LP.

---

## 3. X-Prison enchants / autosell — trạng thái design

**Hiện tại (chuẩn lối chơi):** trong `plugins/X-Prison/config.yml`:

* `enchants: false`
* `autosell: false`

Người chơi **không** dùng `/enchant` Nuke/Layer của X-Prison làm core. Sức đào đến từ **cuốc MMOItems** (NPC lò rèn) + bán `/sellgui` hoặc vault bang.

### Nếu sau này bật lại enchants (không phải soft-launch)

Giữ ghi chú kỹ thuật để khỏi mất ngữ cảnh:

* `supported-pickaxes` cần gồm đủ material cúp MMOItems (WOODEN → NETHERITE).
* File enchant: `plugins/X-Prison/enchants/nuke.json`, `layer.json`, `explosive.json`, `fortune.json` — nên `countBlocksBroken: true` nếu muốn `/blocks` đếm đúng.
* Trước khi bật: đối chiếu lại [`docs/loi-choi.md`](docs/loi-choi.md) §6.4 (cố ý không dùng Nuke làm core) và Vulcan `fastbreak`.

---

## 4. Lệnh vận hành

| Lệnh | Mục đích |
| :--- | :--- |
| `/sreload` | Reload EconomyShopGUI (giá `/sellgui`) |
| `/gang reload` | Reload YAML bang (gồm `sell-prices`) |
| `/xprison reload` | Reload X-Prison (mines, ranks, prestiges…) |
| `/sellgui` | Bán đồ cá nhân (giá base) |
| `/sell` / `/sellall` | Mở `/sellgui` (không bán thẳng all) |
| `/gang vault` | Kho quặng bang + Sell All → bank |

---

## Testing note

* `/sellgui`: mọi rank/VIP/OP phải thấy **cùng giá base** (không còn LEGEND x3 trên shop).
* Sell All bang: giá base × (1 + Sell upgrade + buff/paragon) → tiền vào **bank bang**, không vào túi player trừ khi rút bank.
