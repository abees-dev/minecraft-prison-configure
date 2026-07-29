# 📘 HƯỚNG DẪN VẬN HÀNH HỆ THỐNG TINH LUYỆN & NÂNG CẤP CÚP (MMOITEMS 9 RANK)

> Lối chơi tổng: [`loi-choi.md`](loi-choi.md) · Mục lục docs: [`INDEX.md`](INDEX.md) · Bảng số cuốc: [`pickaxe-upgrade-notes.md`](pickaxe-upgrade-notes.md)

Tài liệu hướng dẫn chi tiết cấu trúc item, trạm rèn, tỷ lệ xịt/thành công, công thức cấp số nhân và cách gán NPC cho hệ thống Prison.

---

## 🛠️ 1. Lệnh Lấy Vật Phẩm Để Test (Admin Commands)

### ⛏️ Lấy Cúp (TOOL):
Lệnh tổng quát: `/mi give TOOL <ITEM_ID> [player] [amount]`
* **Item ID mẫu**: `PICKAXE_TAN_BINH_1` đến `PICKAXE_VUOT_NGUC_5`

### 🗡️ Lấy Kiếm (SWORD):
Lệnh tổng quát: `/mi give SWORD <ITEM_ID> [player] [amount]`
* **Item ID mẫu**: `SWORD_TAN_BINH_1` đến `SWORD_VUOT_NGUC_5`

### 🪓 Lấy Rìu Chiến Cận Chiến (AXE):
Lệnh tổng quát: `/mi give AXE <ITEM_ID> [player] [amount]`
* **Item ID mẫu**: `AXE_TAN_BINH_1` đến `AXE_VUOT_NGUC_5`

### 🪄 Lấy Trượng Phép (STAFF):
Lệnh tổng quát: `/mi give STAFF <ITEM_ID> [player] [amount]`
* **Item ID mẫu**: `STAFF_TAN_BINH_1` đến `STAFF_VUOT_NGUC_5`

---

### 💎 Lấy Nguyên Liệu Tinh Luyện & Đá Nâng Cấp (MATERIAL):
Lệnh tổng quát: `/mi give MATERIAL <ITEM_ID> [player] [amount]`

| Rank | Quặng Tinh Luyện (Dạng BLOCK) | Cường Hóa Thạch (Dạng GEM/INGOT) |
| :--- | :--- | :--- |
| **Rank 1: Tân Binh** | `NEN_DOI_TAN_BINH` | `DA_NANG_CAP_TAN_BINH` |
| **Rank 2: Tù Nhân** | `NEN_DOI_TU_NHAN` | `DA_NANG_CAP_TU_NHAN` |
| **Rank 3: Lao Công** | `NEN_DOI_LAO_CONG` | `DA_NANG_CAP_LAO_CONG` |
| **Rank 4: Thợ Đào** | `NEN_DOI_THO_DAO` | `DA_NANG_CAP_THO_DAO` |
| **Rank 5: Đội Trưởng** | `NEN_DOI_DOI_TRUONG` | `DA_NANG_CAP_DOI_TRUONG` |
| **Rank 6: Phó Quản Ngục** | `NEN_DOI_PHO_QUAN_NGUC` | `DA_NANG_CAP_PHO_QUAN_NGUC` |
| **Rank 7: Quản Ngục** | `NEN_DOI_QUAN_NGUC` | `DA_NANG_CAP_QUAN_NGUC` |
| **Rank 8: Bá Chủ Ngục Tù** | `NEN_DOI_BA_CHU_NGUC_TU` | `DA_NANG_CAP_BA_CHU_NGUC_TU` |
| **Rank 9: Vượt Ngục** | `NEN_DOI_VUOT_NGUC` & `NEN_BA_VUOT_NGUC` | `DA_NANG_CAP_VUOT_NGUC` |

---

## 🏛️ 2. Cấu Hình & Quản Lý NPC Mở Trạm GUI (Crafting Stations)

Hệ thống được tách thành 3 loại NPC cho mỗi Rank để người chơi tương tác rõ ràng.

### 🤖 A. Hướng Dẫn Tạo & Lệnh Quản Lý NPC (Citizens & CommandNPC)

#### 1. Tạo & Cài Đặt NPC:
* **Tạo NPC mới**: `/npc create <Tên NPC> --type PLAYER` (Ví dụ: `/npc create &f&l✦ Luyện Tân Binh --type PLAYER`)
* **Đổi skin cho NPC**: `/npc skin <tên_player_hoặc_skin>`
  * *Skin Tinh Luyện (Merchant/Quản đốc)*: `Merchant`, `Alchemist`, `Worker`, `Trader`
  * *Skin Lò Rèn Cúp (Thợ Đào Mỏ)*: `Miner`, `Dwarf`, `Diggy`, `Blacksmith`
  * *Skin Lò Rèn Giáp (Vệ Binh/Quản Ngục)*: `Guard`, `Warden`, `Knight`, `Armor`
* **Bật/Tắt chế độ NPC xoay đầu nhìn người chơi khi đi qua**: `/npc look` (hoặc `/npc lookclose`)
* **Chỉnh độ cao của tên bay trên đầu NPC**: `/npc height 2.5` (nâng cao lên 2.5 cho đẹp)

#### 2. Gán Lệnh Mở GUI Cho NPC (Fix lỗi "Please specify a valid player"):
> ⚠️ **Lý do lỗi:** Mặc định Citizens chạy lệnh dưới quyền Console, nên cần truyền thêm tên người chơi `<p>`.
* **Cách 1: Chạy dưới quyền Console (Khuyên dùng - tự động bypass quyền & có tham số `<p>`):**
  `/npc cmd add mi stations open <STATION_ID> <p>`
* **Cách 2: Chạy dưới quyền OP (`-o` flag):**
  `/npc cmd add -o mi stations open <STATION_ID>`
* **Cách 3: Chạy dưới quyền Người Chơi thường (`-p` flag):**
  `/npc cmd add -p mi stations open <STATION_ID>` *(Yêu cầu người chơi có quyền `mmoitems.station.<STATION_ID>`)*

#### 3. Xóa / Tìm Lại NPC Khi Bị Mất Vị Trí:
* **Xóa NPC trực tiếp theo ID/Tên (không cần tìm đến tận nơi):**
  `/npc remove <ID>` hoặc `/npc remove <Tên_NPC>`
* **Xem danh sách tất cả NPC (kèm ID & thế giới):**
  `/npc list` (hoặc `/npc list 2`, `/npc list 3`)
* **Chọn NPC theo ID:**
  `/npc select <ID>`
* **Kéo NPC bị mất về vị trí bạn đang đứng:**
  `/npc tphere`
* **Dịch chuyển bạn đến tận vị trí NPC:**
  `/npc tp`

---

### 📜 B. Danh Sách Lệnh Tạo & Gán NPC Nhóm Theo 9 Rank (Dùng Skin Chuẩn Đã Kiểm Tra)

#### ⚪ Rank 1: Tân Binh (Rookie)
```bash
# 1. Trạm Tinh Luyện
/npc create &f&l✦ Luyện Tân Binh --type PLAYER
/npc skin Merchant
/npc cmd add mi stations open refinery-rookie <p>

# 2. Lò Rèn Cúp
/npc create &f&l⚔ Rèn Tân Binh --type PLAYER
/npc skin Steve
/npc cmd add mi stations open forge-rookie <p>

# 3. Lò Rèn Giáp
/npc create &f&l◆ Giáp Tân Binh --type PLAYER
/npc skin Guard
/npc cmd add mi stations open armor-forge-rookie <p>
```

#### 🟢 Rank 2: Tù Nhân (Prisoner)
```bash
# 1. Trạm Tinh Luyện
/npc create &a&l✦ Luyện Tù Nhân --type PLAYER
/npc skin Trader
/npc cmd add mi stations open refinery-prisoner <p>

# 2. Lò Rèn Cúp
/npc create &a&l⚔ Rèn Tù Nhân --type PLAYER
/npc skin Miner
/npc cmd add mi stations open forge-prisoner <p>

# 3. Lò Rèn Giáp
/npc create &a&l◆ Giáp Tù Nhân --type PLAYER
/npc skin Knight
/npc cmd add mi stations open armor-forge-prisoner <p>
```

#### 🔵 Rank 3: Lao Công (Worker)
```bash
# 1. Trạm Tinh Luyện
/npc create &b&l✦ Luyện Lao Công --type PLAYER
/npc skin Alchemist
/npc cmd add mi stations open refinery-worker <p>

# 2. Lò Rèn Cúp
/npc create &b&l⚔ Rèn Lao Công --type PLAYER
/npc skin Dwarf
/npc cmd add mi stations open forge-worker <p>

# 3. Lò Rèn Giáp
/npc create &b&l◆ Giáp Lao Công --type PLAYER
/npc skin Captain
/npc cmd add mi stations open armor-forge-worker <p>
```

#### 🟡 Rank 4: Thợ Đào (Miner)
```bash
# 1. Trạm Tinh Luyện
/npc create &e&l✦ Luyện Thợ Đào --type PLAYER
/npc skin Merchant
/npc cmd add mi stations open refinery-miner <p>

# 2. Lò Rèn Cúp
/npc create &e&l⚔ Rèn Thợ Đào --type PLAYER
/npc skin Miner
/npc cmd add mi stations open forge-miner <p>

# 3. Lò Rèn Giáp
/npc create &e&l◆ Giáp Thợ Đào --type PLAYER
/npc skin Knight
/npc cmd add mi stations open armor-forge-miner <p>
```

#### 🟠 Rank 5: Đội Trưởng (Captain)
```bash
# 1. Trạm Tinh Luyện
/npc create &6&l✦ Luyện Đội Trưởng --type PLAYER
/npc skin Trader
/npc cmd add mi stations open refinery-captain <p>

# 2. Lò Rèn Cúp
/npc create &6&l⚔ Rèn Đội Trưởng --type PLAYER
/npc skin Blacksmith
/npc cmd add mi stations open forge-captain <p>

# 3. Lò Rèn Giáp
/npc create &6&l◆ Giáp Đội Trưởng --type PLAYER
/npc skin Captain
/npc cmd add mi stations open armor-forge-captain <p>
```

#### 🔴 Rank 6: Phó Quản Ngục (Vice Warden)
```bash
# 1. Trạm Tinh Luyện
/npc create &c&l✦ Luyện Phó Quản Ngục --type PLAYER
/npc skin Alchemist
/npc cmd add mi stations open refinery-vice-warden <p>

# 2. Lò Rèn Cúp
/npc create &c&l⚔ Rèn Phó Quản Ngục --type PLAYER
/npc skin Dwarf
/npc cmd add mi stations open forge-vice-warden <p>

# 3. Lò Rèn Giáp
/npc create &c&l◆ Giáp Phó Quản Ngục --type PLAYER
/npc skin Guard
/npc cmd add mi stations open armor-forge-vice-warden <p>
```

#### 🟣 Rank 7: Quản Ngục (Warden)
```bash
# 1. Trạm Tinh Luyện
/npc create &d&l✦ Luyện Quản Ngục --type PLAYER
/npc skin King
/npc cmd add mi stations open refinery-warden <p>

# 2. Lò Rèn Cúp
/npc create &d&l⚔ Rèn Quản Ngục --type PLAYER
/npc skin Blacksmith
/npc cmd add mi stations open forge-warden <p>

# 3. Lò Rèn Giáp
/npc create &d&l◆ Giáp Quản Ngục --type PLAYER
/npc skin Warden
/npc cmd add mi stations open armor-forge-warden <p>
```

#### 🔮 Rank 8: Bá Chủ Ngục Tù (Overlord)
```bash
# 1. Trạm Tinh Luyện
/npc create &5&l✦ Luyện Bá Chủ --type PLAYER
/npc skin King
/npc cmd add mi stations open refinery-overlord <p>

# 2. Lò Rèn Cúp
/npc create &5&l⚔ Rèn Bá Chủ --type PLAYER
/npc skin Miner
/npc cmd add mi stations open forge-overlord <p>

# 3. Lò Rèn Giáp
/npc create &5&l◆ Giáp Bá Chủ --type PLAYER
/npc skin Warden
/npc cmd add mi stations open armor-forge-overlord <p>
```

#### 🔥 Rank 9: Vượt Ngục (Jailbreak)
```bash
# 1. Trạm Tinh Luyện
/npc create &4&l✦ Luyện Vượt Ngục --type PLAYER
/npc skin Merchant
/npc cmd add mi stations open refinery-jailbreak <p>

# 2. Lò Rèn Cúp
/npc create &4&l⚔ Rèn Vượt Ngục --type PLAYER
/npc skin Blacksmith
/npc cmd add mi stations open forge-jailbreak <p>

# 3. Lò Rèn Giáp
/npc create &4&l◆ Giáp Vượt Ngục --type PLAYER
/npc skin Knight
/npc cmd add mi stations open armor-forge-jailbreak <p>
```

---

## ⚖️ 3. Cơ Chế Thăng Tiến & Tỷ Lệ Xịt/Thành Công

### 📈 Bảng Cấp Số Nhân Yêu Cầu Nguyên Liệu Nâng Cấp Cúp:

| Rank / Lò Rèn | Cúp I ➔ II | Cúp II ➔ III | Cúp III ➔ IV | Cúp IV ➔ V (Cấp Cuối) |
| :--- | :---: | :---: | :---: | :---: |
| **Rank 1: Tân Binh** | **2x** CHT + **2x** QTL | **4x** CHT + **4x** QTL | **8x** CHT + **8x** QTL | **16x** CHT + **16x** QTL |
| **Rank 2: Tù Nhân** | **3x** CHT + **3x** QTL | **6x** CHT + **6x** QTL | **12x** CHT + **12x** QTL | **24x** CHT + **24x** QTL |
| **Rank 3: Lao Công** | **4x** CHT + **4x** QTL | **8x** CHT + **8x** QTL | **16x** CHT + **16x** QTL | **32x** CHT + **32x** QTL |
| **Rank 4: Thợ Đào** | **5x** CHT + **5x** QTL | **10x** CHT + **10x** QTL | **20x** CHT + **20x** QTL | **40x** CHT + **40x** QTL |
| **Rank 5: Đội Trưởng** | **6x** CHT + **6x** QTL | **12x** CHT + **12x** QTL | **24x** CHT + **24x** QTL | **48x** CHT + **48x** QTL |
| **Rank 6: Phó Quản Ngục** | **7x** CHT + **7x** QTL | **14x** CHT + **14x** QTL | **28x** CHT + **28x** QTL | **56x** CHT + **56x** QTL |
| **Rank 7: Quản Ngục** | **8x** CHT + **8x** QTL | **16x** CHT + **16x** QTL | **32x** CHT + **32x** QTL | **64x** CHT + **64x** QTL |
| **Rank 8: Bá Chủ Ngục Tù** | **10x** CHT + **10x** QTL | **20x** CHT + **20x** QTL | **40x** CHT + **40x** QTL | **64x** CHT + **64x** QTL |
| **Rank 9: Vượt Ngục** | **12x** CHT + **12x** QTL | **24x** CHT + **24x** QTL | **48x** CHT + **48x** QTL | **64x** CHT + **64x** QTL |

---

### 🎲 Bảng Tỷ Lệ Thành Công Nâng Cấp Cúp:

| Rank / Lò Rèn | Cúp I ➔ II | Cúp II ➔ III | Cúp III ➔ IV | Cúp IV ➔ V (Cấp Cuối) |
| :--- | :---: | :---: | :---: | :---: |
| **Rank 1: Tân Binh** | **85%** | **75%** | **65%** | **55%** |
| **Rank 2: Tù Nhân** | **80%** | **70%** | **60%** | **50%** |
| **Rank 3: Lao Công** | **75%** | **65%** | **55%** | **45%** |
| **Rank 4: Thợ Đào** | **70%** | **60%** | **50%** | **40%** |
| **Rank 5: Đội Trưởng** | **65%** | **55%** | **45%** | **35%** |
| **Rank 6: Phó Quản Ngục** | **60%** | **50%** | **40%** | **30%** |
| **Rank 7: Quản Ngục** | **55%** | **45%** | **35%** | **25%** |
| **Rank 8: Bá Chủ Ngục Tù** | **50%** | **40%** | **30%** | **20%** |
| **Rank 9: Vượt Ngục** | **45%** | **35%** | **25%** | **15%** |

### 🛡️ Cơ chế thất bại (Xịt):
- **KHÔNG BỊ MẤT CÚP**: Cúp cấp dưới đặt làm nguyên liệu đầu vào luôn được bảo toàn khi xịt.
- Chỉ bị khấu trừ các nguyên liệu tiêu hao (`Cường Hóa Thạch` & `Quặng Tinh Luyện`) dùng cho lượt ép đó.

---

## ⚡ 4. Lệnh Reload MMOItems
Sau khi chỉnh sửa bất kỳ file config nào trong MMOItems:
* Gõ lệnh in-game: `/mi reload` (yêu cầu quyền OP hoặc `mmoitems.admin`).

---

## ⚙️ 5. Các Script Hỗ Trợ Tự Động (Scripts & Utilities)

Tệp script tự động khởi tạo và cập nhật hàng loạt vũ khí theo 9 Rank được lưu tại:
* 📁 **[scripts/generate_weapons.js](file:///d:/server-minecraft/plugins/MMOItems/scripts/generate_weapons.js)**

### 🚀 Cách sử dụng:
Nếu bạn muốn chỉnh sửa lại công thức tính sát thương / cấp độ vũ khí toàn bộ 135 vật phẩm (Kiếm, Rìu Chiến, Trượng Phép):
1. Mở file [generate_weapons.js](file:///d:/server-minecraft/plugins/MMOItems/scripts/generate_weapons.js) và thay đổi công thức chỉ số trong các hàm `getSwordStats`, `getAxeStats`, `getStaffStats`.
2. Mở Terminal tại thư mục `plugins/MMOItems` và gõ:
   ```bash
   node scripts/generate_weapons.js
   ```
3. Script sẽ tự động ghi đè và tính toán lại 3 file `item/sword.yml`, `item/axe.yml`, `item/staff.yml` lập tức.
