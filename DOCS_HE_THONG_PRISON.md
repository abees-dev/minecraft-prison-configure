# 📘 TÀI LIỆU CẤU HÌNH HỆ THỐNG MULTIPLIERS, SHOP & MULTI-RANK (PRISON + VIP)

Tài liệu này tổng hợp chi tiết toàn bộ cấu hình hệ số nhân giá bán (**EconomyShopGUI Multipliers**), tích hợp **LuckPerms**, tính năng đào quặng (**X-Prison Enchants Nuke / Layer / Explosive**), và hướng dẫn vận hành server.

---

## 1. ⚙️ Tổng Quan Cấu Hình Multipliers Trong EconomyShopGUI

Hệ thống bán quặng và tài nguyên trên server hiện tại được quản lý hoàn toàn bởi **EconomyShopGUI** với các hệ số nhân tăng theo cấp độ **Rank Prison (1 ➔ 9)** và tiếp tục nâng cấp nối tiếp lên các **Rank VIP Donor (1 ➔ 6)**.

*   **File Cấu Hình:** `plugins/EconomyShopGUI/config.yml`
*   **Trạng thái:** `enable-sell-multipliers: true`
*   **Chế độ bán:** Tắt lệnh bán tự động `/sellall` (`commands.sellall: false`). Chỉ cho phép bán qua giao diện `/sellgui` (`commands.sellgui: true`). Các lệnh `/sell` và `/sellall` đều được điều hướng mở trực tiếp giao diện `/sellgui`. Mẫu Lore giao diện `sellgui-nav-bar` được nâng cấp hiển thị tiếng Việt và thông tin Multipliers.

### Bảng Tỉ Lệ Multipliers Cấu Hình Chuẩn Hiện Tại:

| Nhóm Rank | Tên Group LuckPerms | Bonus% Giá Bán | Hệ Số Nhân Tương Ứng |
| :--- | :--- | :---: | :---: |
| **Prison Rank 1** (Tân Binh) | `xprison_rank_1` | **+0%** | **x1.00** |
| **Prison Rank 2** (Tù Nhân) | `xprison_rank_2` | **+5%** | **x1.05** |
| **Prison Rank 3** (Lao Công) | `xprison_rank_3` | **+10%** | **x1.10** |
| **Prison Rank 4** (Thợ Đào) | `xprison_rank_4` | **+15%** | **x1.15** |
| **Prison Rank 5** (Đội Trưởng) | `xprison_rank_5` | **+20%** | **x1.20** |
| **Prison Rank 6** (Phó Quản Ngục) | `xprison_rank_6` | **+30%** | **x1.30** |
| **Prison Rank 7** (Quản Ngục) | `xprison_rank_7` | **+40%** | **x1.40** |
| **Prison Rank 8** (Bá Chủ Ngục Tù) | `xprison_rank_8` | **+50%** | **x1.50** |
| **Prison Rank 9** (Vượt Ngục - Max Prison) | `xprison_rank_9` | **+60%** | **x1.60** |
| --- *(Bắt đầu nâng cấp lên VIP)* --- | --- | --- | --- |
| **VIP 1** (VIP) | `vip` | **+75%** | **x1.75** |
| **VIP 2** (VIP+) | `vipplus` | **+90%** | **x1.90** |
| **VIP 3** (MVP) | `mvp` | **+110%** | **x2.10** |
| **VIP 4** (MVP+) | `mvpplus` | **+135%** | **x2.35** |
| **VIP 5** (ELITE) | `elite` | **+165%** | **x2.65** |
| **VIP 6** (LEGEND - Max VIP) | `legend` | **+200%** | **x3.00** |

> [!NOTE]
> VIP Ranks được thiết kế là cấp nâng cấp tiếp theo sau **Rank 9 (Vượt Ngục)**, do đó tỉ lệ Multipliers tăng tịnh tiến từ **+75% đến +200%** (gấp x3.0 giá bán quặng ban đầu).

---

## 2. 🔑 Tích Hợp Tự Động Với LuckPerms

Tất cả các permission số nhiều (`sell-multipliers`) và số ít (`sell-multiplier`) đã được tích hợp tự động vào kịch bản khởi tạo LuckPerms.

### Các File Đã Cập Nhật:
1.  **Script Admin Skript:** `plugins/Skript/scripts/admin/setup_luckperms_ranks.sk`
    *   Chạy lệnh `/setuplpranks` trong game để tự động cấp toàn bộ quyền Multipliers cho 9 Rank Prison & 6 Rank VIP.
2.  **File Script LuckPerms Dán Console:** `plugins/LuckPerms/setup-all-ranks.txt`
    *   Chứa toàn bộ danh sách lệnh `lp group <name> permission set ...` chuẩn để dán trực tiếp vào cửa sổ Console.

---

## 3. ⛏️ Cấu Hình X-Prison Enchants (Nuke, Layer, Explosive, Fortune)

Để đảm bảo các hiệu ứng nổ và phù phép khi đào quặng tính chính xác vào chỉ số khối đã đào (`/blocks` mined count):

### 1. File Cấu Hình Chính: `plugins/X-Prison/config.yml`
- Module **Enchants:** `enchants: true`
- **Hỗ trợ Cúp MMOItems / Custom Pickaxes:** Đã thêm đầy đủ danh sách chất liệu cúp vào `supported-pickaxes`:
  - `DIAMOND_PICKAXE`, `NETHERITE_PICKAXE`, `GOLDEN_PICKAXE`, `IRON_PICKAXE`, `STONE_PICKAXE`, `WOODEN_PICKAXE`.

### 2. Chi Tiết Phù Phép:
*   💥 **Nuke (`plugins/X-Prison/enchants/nuke.json`):**
    *   `countBlocksBroken: true` *(Mỗi lần Nuke nổ sạch tầng/mỏ quặng, toàn bộ số quặng bị phá hủy đều được cộng trực tiếp vào chỉ số `/blocks`)*.
*   ⚡ **Layer / Jackhammer (`plugins/X-Prison/enchants/layer.json`):**
    *   `countBlocksBroken: true` *(Phá nguyên tầng quặng ➔ Cộng toàn bộ vào chỉ số `/blocks`)*.
*   💣 **Explosive (`plugins/X-Prison/enchants/explosive.json`):**
    *   `countBlocksBroken: true` *(Nổ diện rộng hình cầu ➔ Cộng toàn bộ vào chỉ số `/blocks`)*.
*   🍀 **Fortune (`plugins/X-Prison/enchants/fortune.json`):**
    *   Tăng số lượng khoáng sản thu hoạch khi bán quặng.

---

## 4. 🛠️ Lệnh Quản Trị & Vận Hành Server

| Lệnh | Mục đích |
| :--- | :--- |
| `/setuplpranks` | Running lệnh Skript thiết lập toàn bộ 9 Rank Prison + 6 Rank VIP kèm Multipliers. |
| `/sreload` | Reload lại cấu hình EconomyShopGUI sau khi chỉnh sửa file shop/config. |
| `/xprison reload` | Reload lại cấu hình X-Prison (Enchants, Mines, Prestiges). |
| `/sellgui` | Mở giao diện bán vật phẩm (hiển thị trực tiếp tổng số tiền đã nhân hệ số). |
| `/sellall` hoặc `/sell` | Bán toàn bộ khoáng sản trong túi đồ theo giá đã nhân Multiplier. |
| `/enchant` | Mở menu nâng cấp phù phép Nuke / Layer / Fortune cho Cúp. |

---

## 🧪 Lưu ý khi Kiểm Tra (Testing Note)
*   Tài khoản **OP (Operator)** mặc định nhận quyền `*` của LuckPerms nên EconomyShopGUI sẽ tự động lấy hệ số nhân của **Rank cao nhất (+200% của LEGEND)**.
*   Khi muốn test chính xác số tiền nhận được của một Rank cụ thể (ví dụ Rank 5 +20%), bạn nên dùng lệnh `/deop` hoặc dùng **Tài khoản phụ không có OP** để test.
