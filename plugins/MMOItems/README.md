# 📘 HƯỚNG DẪN VẬN HÀNH HỆ THỐNG TINH LUYỆN & NÂNG CẤP CÚP (MMOITEMS 9 RANK)

Tài liệu hướng dẫn chi tiết cấu trúc item, trạm rèn, tỷ lệ xịt/thành công, công thức cấp số nhân và cách gán NPC cho hệ thống Prison.

---

## 🛠️ 1. Lệnh Lấy Vật Phẩm Để Test (Admin Commands)

### ⛏️ Lấy Cúp (TOOL):
Lệnh tổng quát: `/mi give TOOL <ITEM_ID> [player] [amount]`

* **Rank 1 (Tân Binh)**: `PICKAXE_TAN_BINH_1` đến `PICKAXE_TAN_BINH_5`
* **Rank 2 (Tù Nhân)**: `PICKAXE_TU_NHAN_1` đến `PICKAXE_TU_NHAN_5`
* **Rank 3 (Lao Công)**: `PICKAXE_LAO_CONG_1` đến `PICKAXE_LAO_CONG_5`
* **Rank 4 (Thợ Đào)**: `PICKAXE_THO_DAO_1` đến `PICKAXE_THO_DAO_5`
* **Rank 5 (Đội Trưởng)**: `PICKAXE_DOI_TRUONG_1` đến `PICKAXE_DOI_TRUONG_5`
* **Rank 6 (Phó Quản Ngục)**: `PICKAXE_PHO_QUAN_NGUC_1` đến `PICKAXE_PHO_QUAN_NGUC_5`
* **Rank 7 (Quản Ngục)**: `PICKAXE_QUAN_NGUC_1` đến `PICKAXE_QUAN_NGUC_5`
* **Rank 8 (Bá Chủ Ngục Tù)**: `PICKAXE_BA_CHU_NGUC_TU_1` đến `PICKAXE_BA_CHU_NGUC_TU_5`
* **Rank 9 (Vượt Ngục)**: `PICKAXE_VUOT_NGUC_1` đến `PICKAXE_VUOT_NGUC_5`

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

## 🏛️ 2. Cấu Hình NPC & Các Trạm Mở GUI (Crafting Stations)

Hệ thống được tách thành 2 loại NPC cho mỗi Rank để người chơi tương tác rõ ràng:

### 📦 NPC 1: Trạm Tinh Luyện Nguyên Liệu (Nén Block Mỏ ➔ Quặng TL ➔ Cường Hóa Thạch)
Sử dụng lệnh Citizens (`/npc cmd add mi station open <station_id>`) hoặc CommandNPC:

* **Rank 1 (Tân Binh)**: `/mi stations open refinery-rookie`
* **Rank 2 (Tù Nhân)**: `/mi stations open refinery-prisoner`
* **Rank 3 (Lao Công)**: `/mi stations open refinery-worker`
* **Rank 4 (Thợ Đào)**: `/mi stations open refinery-miner`
* **Rank 5 (Đội Trưởng)**: `/mi stations open refinery-captain`
* **Rank 6 (Phó Quản Ngục)**: `/mi stations open refinery-vice-warden`
* **Rank 7 (Quản Ngục)**: `/mi stations open refinery-warden`
* **Rank 8 (Bá Chủ Ngục Tù)**: `/mi stations open refinery-overlord`
* **Rank 9 (Vượt Ngục)**: `/mi stations open refinery-jailbreak`

---

### 🔨 NPC 2: Lò Rèn Nâng Cấp Cúp (Ghép Cúp Cấp Dưới + Nguyên Liệu)

* **Rank 1 (Tân Binh)**: `/mi stations open forge-rookie`
* **Rank 2 (Tù Nhân)**: `/mi stations open forge-prisoner`
* **Rank 3 (Lao Công)**: `/mi stations open forge-worker`
* **Rank 4 (Thợ Đào)**: `/mi stations open forge-miner`
* **Rank 5 (Đội Trưởng)**: `/mi stations open forge-captain`
* **Rank 6 (Phó Quản Ngục)**: `/mi stations open forge-vice-warden`
* **Rank 7 (Quản Ngục)**: `/mi stations open forge-warden`
* **Rank 8 (Bá Chủ Ngục Tù)**: `/mi stations open forge-overlord`
* **Rank 9 (Vượt Ngục)**: `/mi stations open forge-jailbreak`

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
