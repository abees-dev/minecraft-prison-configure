# HƯỚNG DẪN CHI TIẾT CẤU HÌNH DROP RATES & EXP QUÁI VẬT NHÀ TÙ (PRISON)

Tài liệu này tổng hợp toàn bộ cấu hình **Tỷ Lệ Rơi Đồ (Drop Rates)** và **Kinh Nghiệm MMOCore (EXP)** cho 9 Rank Quái Vật Nhà Tù và Boss Ma Vương Ngục Tù trên server.

---

## I. HỆ THỐNG TỶ LỆ RƠI ĐỒ (DROP TABLES)

Toàn bộ tỷ lệ rơi đồ của quái Nhà Tù đã được tách riêng vào file cấu hình tập trung để dễ quản lý.

- **File cấu hình DropTables:** `plugins/MythicMobs/droptables/prison_rank_drops.yml`
- **File quái vật liên kết:** `plugins/MythicMobs/mobs/prison_rank_mobs.yml`
- **Skill rớt chìa khóa rương:** `plugins/MythicMobs/skills/prison_rank_skills.yml`

### 1. Danh Sách Vật Phẩm (MMOItems - Type: MATERIAL)
- **Đá Cường Hóa Sơ Cấp (Rank 1-2):** `DA_CUONG_HOA_VU_KHI_SO_CAP`, `DA_CUONG_HOA_GIAP_SO_CAP`
- **Đá Cường Hóa Trung Cấp (Rank 3-4):** `DA_CUONG_HOA_VU_KHI_TRUNG_CAP`, `DA_CUONG_HOA_GIAP_TRUNG_CAP`
- **Đá Cường Hóa Cao Cấp (Rank 5-6):** `DA_CUONG_HOA_VU_KHI_CAO_CAP`, `DA_CUONG_HOA_GIAP_CAO_CAP`
- **Đá Cường Hóa Siêu Cấp (Rank 7-8):** `DA_CUONG_HOA_VU_KHI_SIEU_CAP`, `DA_CUONG_HOA_GIAP_SIEU_CAP`
- **Đá Huyền Thoại & Thiên Mệnh (Rank 9 / Ma Vương):** `DA_CUONG_HOA_VU_KHI_HUYEN_THOAI`, `DA_CUONG_HOA_GIAP_HUYEN_THOAI`, `DA_CUONG_HOA_THIEN_MENH`
- **Tinh thể rèn (mọi rank):** `TINHTHE_CUONGHOA_VUKHI`, `TINHTHE_CUONGHOA_GIAP` — dùng tại Lò Rèn vũ khí/giáp
- **Đá đục lỗ (Elite/Boss):** `DA_DUC_LO_1`…`5`, Boss R9 thêm `DA_DUC_LO_THIEN_MENH`
- **Mảnh Huy Hiệu Triệu Hồi (Boss Rank 1-9):** `MANH_HUY_HIEU_TRIEU_HOI`
- **Mảnh Long Tộc (Boss Rank 1-9):** `MANH_LONG_TOC`
- **Tinh Thể Hủy Diệt (Ma Vương):** `TINHTHE_HUY_DIET` — đổi tại Bàn Chế Huy Hiệu → Đá Thiên Mệnh / Đục lỗ TM
- **Chìa:** `chia_khoa_trang_suc_free` (droptable), `chia_khoa_ruong_ngoc` (skill 50%)

### 2. Bảng Tỷ Lệ Drop (cập nhật 2026-07-30)

#### Đá cường hóa (mỗi dòng vũ khí / giáp)

| Band | Normal | Elite | Boss |
| :--- | ---: | ---: | ---: |
| Rank 1–2 | 5% | 10% | 18% |
| Rank 3–4 | 4% | 8% | 15% |
| Rank 5–6 | 3.5% | 7% | 14% |
| Rank 7–8 | 3% | 6% | 12% |
| Rank 9 HT | 3% | 6% | 10% |
| Rank 9 Thiên Mệnh | 0.5% | 1.5% | 4% |

#### Tinh thể rèn (mọi rank)

| Tier | VUKHI | GIAP |
| :--- | ---: | ---: |
| Normal | 2% | 2% |
| Elite | 5% | 5% |
| Boss | 10% | 10% |

#### Đá đục lỗ (Elite + Boss)

| Rank | Item | Elite | Boss |
| ---: | :--- | ---: | ---: |
| 1–2 | `DA_DUC_LO_1` | 2% | 6% |
| 3–4 | `DA_DUC_LO_2` | 2% | 5% |
| 5–6 | `DA_DUC_LO_3` | 1.5% | 4% |
| 7–8 | `DA_DUC_LO_4` | 1.5% | 4% |
| 9 | `DA_DUC_LO_5` | 1% | 3% |
| 9 | `DA_DUC_LO_THIEN_MENH` | — | 1% |

#### Boss extras + chìa

| Band | Mảnh Huy Hiệu | Mảnh Long Tộc | Chìa trang sức free | Chìa ngọc (skill) |
| :--- | ---: | ---: | ---: | ---: |
| Rank 1–2 | 30% | 12% | 8% | 50% |
| Rank 3–4 | 35% | 15% | 9% | 50% |
| Rank 5–6 | 40% | 18% | 10% | 50% |
| Rank 7–8 | 45% | 22% | 12% | 50% |
| Rank 9 | 50% | 25% | 12% | 50% |

#### Ma Vương

| Item | Tỉ lệ |
| :--- | ---: |
| `TINHTHE_HUY_DIET` | 25% |
| `DA_CUONG_HOA_THIEN_MENH` | 15% |
| `TINHTHE_CUONGHOA_VUKHI` / `GIAP` | 20% mỗi loại |
| Chìa trang sức free | 15% |
| Chìa ngọc (skill) | 50% |

Sink: `TINHTHE_HUY_DIET` ×1 → `DA_CUONG_HOA_THIEN_MENH` ×2 **hoặc** `DA_DUC_LO_THIEN_MENH` ×1 tại station `huy-hieu-trieu-hoi`.

---

## II. HỆ THỐNG KINH NGHIỆM MMOCORE (EXP SYSTEM)

Kinh nghiệm cày cấp MMOCore đã được thiết lập độc quyền cho quái Nhà Tù. Quái Vanilla (Zombie, Enderman...) **không còn cộng EXP**.

- **File nguồn EXP:** `plugins/MMOCore/exp-sources.yml` (Nguồn: `prison_mobs_exp`)
- **File bảng EXP 100 Cấp:** `plugins/MMOCore/expcurves/levels.txt`
- **File Lớp Nhân Vật (Classes):** `plugins/MMOCore/classes/*.yml` (Tất cả 9 Class)

### 1. Bảng Điểm EXP Nhận Được Khi Giết Quái (EXP Rewards)

| Rank Ngục Tù | Quái Thường (Normal) | Quái Tinh Nhuệ (Elite) | Boss Rank |
| :--- | :--- | :--- | :--- |
| **Rank 1: Tân Binh** | **+100 EXP** | **+250 EXP** | **+600 EXP** |
| **Rank 2: Tù Nhân** | **+180 EXP** | **+400 EXP** | **+1,000 EXP** |
| **Rank 3: Lao Công** | **+300 EXP** | **+650 EXP** | **+1,500 EXP** |
| **Rank 4: Thợ Đào** | **+450 EXP** | **+1,000 EXP** | **+2,200 EXP** |
| **Rank 5: Đội Trưởng** | **+650 EXP** | **+1,400 EXP** | **+3,200 EXP** |
| **Rank 6: Phó Quản Ngục** | **+900 EXP** | **+2,000 EXP** | **+4,500 EXP** |
| **Rank 7: Quản Ngục** | **+1,200 EXP** | **+2,600 EXP** | **+6,000 EXP** |
| **Rank 8: Bá Chủ Ngục Tù** | **+1,600 EXP** | **+3,500 EXP** | **+8,000 EXP** |
| **Rank 9: Vượt Ngục** | **+2,000 EXP** | **+4,500 EXP** | **+10,000 EXP** |
| **Trùm Cuối (Ma Vương)**| - | - | **+25,000 EXP** |

### 2. Cấu Trúc Bảng Base Cấp Độ (`expcurves/levels.txt`)
File `levels.txt` gồm 100 dòng cho 100 Cấp Độ (Max Level 100) đã được tăng nhẹ độ khó:
- **Cấp 1 ➔ 2:** `3,500 EXP` (~35 quái Rank 1 Thường hoặc ~14 quái Rank 1 Elite)
- **Cấp 10:** `35,000 EXP`
- **Cấp 20:** `70,000 EXP`
- **Cấp 50:** `355,000 EXP`
- **Cấp 100:** `1,500,000 EXP`

---

## III. HƯỚNG DẪN QUẢN LÝ & CHỈNH SỬA

### 1. Muốn thay đổi Tỷ Lệ Rơi Đồ:
1. Mở file `plugins/MythicMobs/droptables/prison_rank_drops.yml`.
2. Chỉnh sửa số ở cuối mỗi dòng item (Ví dụ: `0.04` = 4%, `0.15` = 15%).
3. Thực hiện lệnh nạp lại ingame/console:
   ```bash
   /mm reload
   ```

### 2. Muốn thay đổi Số Điểm EXP Nhận Được Từ Quái:
1. Mở file `plugins/MMOCore/exp-sources.yml`.
2. Chỉnh sửa thông số `amount=XXXX` tại mục `prison_mobs_exp`.
3. Thực hiện lệnh nạp lại ingame/console:
   ```bash
   /mmocore reload
   ```

### 3. Muốn thay đổi Điểm Base Lên Cấp Độ:
1. Mở file `plugins/MMOCore/expcurves/levels.txt`.
2. Chỉnh sửa con số ở dòng tương ứng với Cấp độ cần sửa (Dòng 1 = Level 1->2).
3. Thực hiện lệnh nạp lại ingame/console:
   ```bash
   /mmocore reload
   ```
