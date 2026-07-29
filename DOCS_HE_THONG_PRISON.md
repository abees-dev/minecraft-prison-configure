# 📘 TÀI LIỆU CẤU HÌNH HỆ THỐNG MULTIPLIERS, SHOP & MULTI-RANK (PRISON + VIP)

Tài liệu vận hành **EconomyShopGUI sell-multipliers**, tích hợp **LuckPerms**, và ghi chú module X-Prison liên quan bán/đào.

**Nguồn lối chơi:** [`docs/loi-choi.md`](docs/loi-choi.md) · **Mục lục docs:** [`docs/INDEX.md`](docs/INDEX.md)

Cập nhật: 2026-07-29 — khớp config sống: bán qua EconomyShopGUI; X-Prison `enchants` / `autosell` = **false**.

---

## 1. Tổng quan multipliers (EconomyShopGUI)

Hệ thống bán quặng/tài nguyên do **EconomyShopGUI** quản lý. Hệ số nhân tăng theo **Rank Prison (1 → 9)** rồi tiếp **VIP Donor (1 → 6)**.

* **File:** `plugins/EconomyShopGUI/config.yml`
* **Trạng thái:** `enable-sell-multipliers: true`
* **Chế độ bán:** Chỉ qua `/sellgui`. `commands.sellall: false`. Lệnh `/sell` và `/sellall` điều hướng mở `/sellgui`.

### Bảng multipliers chuẩn

| Nhóm Rank | Group LuckPerms | Bonus% | Hệ số |
| :--- | :--- | :---: | :---: |
| Prison Rank 1 (Tân Binh) | `xprison_rank_1` | +0% | x1.00 |
| Prison Rank 2 (Tù Nhân) | `xprison_rank_2` | +5% | x1.05 |
| Prison Rank 3 (Lao Công) | `xprison_rank_3` | +10% | x1.10 |
| Prison Rank 4 (Thợ Đào) | `xprison_rank_4` | +15% | x1.15 |
| Prison Rank 5 (Đội Trưởng) | `xprison_rank_5` | +20% | x1.20 |
| Prison Rank 6 (Phó Quản Ngục) | `xprison_rank_6` | +30% | x1.30 |
| Prison Rank 7 (Quản Ngục) | `xprison_rank_7` | +40% | x1.40 |
| Prison Rank 8 (Bá Chủ Ngục Tù) | `xprison_rank_8` | +50% | x1.50 |
| Prison Rank 9 (Vượt Ngục) | `xprison_rank_9` | +60% | x1.60 |
| VIP 1 (VIP) | `vip` | +75% | x1.75 |
| VIP 2 (VIP+) | `vipplus` | +90% | x1.90 |
| VIP 3 (MVP) | `mvp` | +110% | x2.10 |
| VIP 4 (MVP+) | `mvpplus` | +135% | x2.35 |
| VIP 5 (ELITE) | `elite` | +165% | x2.65 |
| VIP 6 (LEGEND) | `legend` | +200% | x3.00 |

VIP là lớp donor **sau** Rank 9 — tăng tốc earn, không thay progression free. Chi tiết journey: [`docs/loi-choi.md`](docs/loi-choi.md).

---

## 2. Tích hợp LuckPerms

Permission `sell-multipliers` / `sell-multiplier` gắn qua:

1. Skript admin: `plugins/Skript/scripts/admin/setup_luckperms_ranks.sk` — lệnh in-game `/setuplpranks`
2. Script console: `plugins/LuckPerms/setup-all-ranks.txt`

---

## 3. X-Prison enchants / autosell — trạng thái design

**Hiện tại (chuẩn lối chơi):** trong `plugins/X-Prison/config.yml`:

* `enchants: false`
* `autosell: false`

Người chơi **không** dùng `/enchant` Nuke/Layer của X-Prison làm core. Sức đào đến từ **cuốc MMOItems** (NPC lò rèn) + bán qua **`/sellgui`**.

### Nếu sau này bật lại enchants (không phải soft-launch)

Giữ ghi chú kỹ thuật để khỏi mất ngữ cảnh:

* `supported-pickaxes` cần gồm đủ material cúp MMOItems (WOODEN → NETHERITE).
* File enchant: `plugins/X-Prison/enchants/nuke.json`, `layer.json`, `explosive.json`, `fortune.json` — nên `countBlocksBroken: true` nếu muốn `/blocks` đếm đúng.
* Trước khi bật: đối chiếu lại [`docs/loi-choi.md`](docs/loi-choi.md) §6.4 (cố ý không dùng Nuke làm core) và Vulcan `fastbreak`.

---

## 4. Lệnh vận hành

| Lệnh | Mục đích |
| :--- | :--- |
| `/setuplpranks` | Cấp multipliers cho 9 rank Prison + 6 VIP |
| `/sreload` | Reload EconomyShopGUI |
| `/xprison reload` | Reload X-Prison (mines, ranks, prestiges…) |
| `/sellgui` | Bán đồ (có hiện multiplier) |
| `/sell` / `/sellall` | Mở `/sellgui` (không bán thẳng all) |

---

## Testing note

* Tài khoản **OP** thường có permission `*` → EconomyShopGUI lấy hệ số cao nhất (LEGEND x3.0).
* Test đúng rank: `/deop` hoặc tài khoản phụ không OP.
