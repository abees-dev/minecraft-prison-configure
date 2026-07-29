# 📘 HƯỚNG DẪN CÂN BẰNG CHỈ SỐ & QUY CHUẨN THIẾT KẾ ITEM DONATE / GACHA

Tài liệu này quy định **nguyên tắc cân bằng chỉ số**, **trần chỉ số (Stat Ceilings)** và **công thức tính điểm ngân sách (Stat Budget)** dành cho Ban Quản Trị / Coder khi thiết kế các trang bị mới, trang bị sự kiện (Event) hoặc **Item Donate / Gacha**, nhằm đảm bảo **không phá vỡ cân bằng game (Non-P2W)** và **không chênh lệch quá 15%** so với trang bị cày chay (F2P End-Game).

---

## 🎯 1. NGUYÊN TẮC VÀNG TRONG CÂN BẰNG ITEM DONATE

1. **Ưu tiên Tính Năng & Ngoại Hình hơn Chỉ Số Gốc**:
   - Item Donate nên thu hút người chơi nhờ **Custom Model Data đẹp (ItemsAdder)**, **Hiệu ứng hạt (Particle FX)**, **Kỹ năng kích hoạt thú vị (Ability)** hoặc **Tiện ích (Utility)** thay vì dồn chỉ số quá ảo.
2. **Trần Chỉ Số Tối Đa (Hard Cap Ceiling)**:
   - Sát thương / Phòng thủ / Máu của Item Donate **tối đa chỉ được vượt quá trang bị cày chay mốc cao nhất (Rank 9 Tier V - Vượt Ngục) từ 10% đến 15%**.
3. **Giới Hạn Ô Khảm (Gem Sockets)**:
   - Tối đa **5 Ô Khảm (Uncolored)**. Tuyệt đối **không** tạo trang bị có từ 6 Ô Khảm trở lên.
4. **Giới Hạn Tỷ Lệ Bạo Kích & Khả Năng Khống Chế**:
   - Tỷ lệ bạo kích tối đa trên 1 món vũ khí Donate: **28% - 30%**.
   - Cooldown của Ability tối thiểu **5.0 giây**, sát thương kỹ năng tối đa **25.0 - 30.0 dmg**.

---

## 📊 2. BẢNG MỐC CHỈ SỐ CHUẨN KHI THIẾT KẾ ITEM

Dưới đây là bảng mốc so sánh từ **Rank 1 (Tân Binh)** đến **Rank 9 (Vượt Ngục)** và **Mốc Donate Cho Phép**:

### 🗡️ 2.1 Vũ Khí Cận Chiến & Phép Thuật (Weapons)

| Mốc Tiến Trình | Kiếm (Dmg / Crit%) | Rìu (Dmg / Crit Pwr) | Trượng Phép (Magic Dmg / Vamp) | Gem Sockets |
| :--- | :--- | :--- | :--- | :--- |
| **Rank 1 (Tân Binh)** | 3.0 - 4.5 dmg / 1-3% | 4.0 - 6.0 dmg / 0% | 4.0 - 7.0 magic / 0% | 0 ô |
| **Rank 3 (Lao Công)** | 7.5 - 10.0 dmg / 5-7% | 9.5 - 12.5 dmg / 0% | 18.0 - 23.0 magic / 0% | 1 ô |
| **Rank 5 (Đội Trưởng)** | 14.0 - 18.0 dmg / 10-12% | 17.5 - 22.0 dmg / 10-14% | 40.0 - 48.0 magic / 1-2% | 3 ô |
| **Rank 7 (Quản Ngục)** | 24.0 - 30.0 dmg / 15-17% | 29.0 - 36.0 dmg / 20-24% | 75.0 - 87.0 magic / 4-5% | 4 ô |
| **Rank 9 Tier V (Vượt Ngục MAX)** | **48.0 dmg** / 22% crit | **56.0 dmg** / 34% pwr | **146.0 magic** / 9.2% | **5 ô (Max F2P)** |
| 🌟 **DONATE / GACHA TIER** | **52.0 - 55.0 dmg** | **60.0 - 65.0 dmg** | **155.0 - 165.0 magic** | **5 ô (Max)** |

> ⚠️ **CẢNH BÁO**: Vũ khí Donate **KHÔNG ĐƯỢC** có Sát thương Kiếm > **55.0**, Sát thương Rìu > **65.0**, hoặc Sát thương Trượng > **165.0**.

---

### 🛡️ 2.2 Bộ Giáp (Full Armor Set - 4 Món)

| Mốc Tiến Trình | Tổng Giáp (Armor) | Tổng Máu (Max Health) | Tổng Phòng Thủ (Defense) | Gem Sockets / Món |
| :--- | :--- | :--- | :--- | :--- |
| **Rank 1 (Tân Binh)** | 4.0 - 6.0 | 4.0 - 6.0 HP | 0 | 0 ô |
| **Rank 5 (Đội Trưởng)** | 32.0 - 38.0 | 40.0 - 50.0 HP | 5.0 - 7.0 | 3 ô |
| **Rank 9 Tier V (Vượt Ngục MAX)** | **107.0 Armor** | **174.0 HP** | **34.0 Defense** | **5 ô / món** |
| 🌟 **DONATE / GACHA TIER** | **115.0 - 120.0 Armor** | **190.0 - 200.0 HP** | **36.0 - 40.0 Defense** | **5 ô / món** |

#### Phân Bộ Tỷ Lệ Chỉ Số Giáp Donate Trên 4 Món:
- **Nón (Helmet)**: 20% Tổng Giáp (~23-24 Armor), 20% Máu (~38-40 HP), +Mana Regen (10-15)
- **Áo (Chestplate)**: 35% Tổng Giáp (~40-42 Armor), 35% Máu (~66-70 HP), +Defense (12-14)
- **Quần (Leggings)**: 25% Tổng Giáp (~28-30 Armor), 25% Máu (~47-50 HP), +Armor Toughness (8-10)
- **Giày (Boots)**: 20% Tổng Giáp (~23-24 Armor), 20% Máu (~38-40 HP), +Movement Speed (0.02 - 0.03)

---

## 🧮 3. CÔNG THỨC QUY ĐỔI ĐIỂM NGÂN SÁCH (STAT BUDGET FORMULA)

Khi tạo 1 item Donate mới, tổng điểm chỉ số của item đó không được vượt quá **100 Điểm Ngân Sách (Stat Budget Points)**.

### Quy đổi điểm:
- `1.0 Attack Damage` = **1.5 điểm**
- `1.0 Magic Damage` = **0.6 điểm**
- `1.0% Critical Chance` = **2.0 điểm**
- `1.0% Critical Power` = **1.0 điểm**
- `1.0 Max Health` = **0.5 điểm**
- `1.0 Armor` = **0.8 điểm**
- `1.0 Defense` = **1.2 điểm**
- `1.0 Gem Socket` = **5.0 điểm**
- `Active Ability (Kỹ năng)` = **10.0 - 15.0 điểm** (Tùy độ mạnh của kỹ năng)

#### Ví dụ Tính Điểm Item Gacha: `GACHA_SWORD_DEMON_SLAYER`
- Attack Damage: 53.0 (53 x 1.5 = 79.5 điểm)
- Crit Chance: 25% (25 x 2 = 50 điểm)
- Physical Damage: 25.0 (25 x 1 = 25 điểm)
- Gem Sockets: 5 (5 x 5 = 25 điểm)
- Ability (Dragon Breath): 15 điểm
- 👉 **Tổng Budget cho phép của Item Donate Độc Quyền cao cấp**: ~180 - 195 điểm.

---

## 🚫 4. DANH SÁCH NHỮNG ĐIỀU TUYỆT ĐỐI CẤM (DON'TS)

❌ **CẤM** tạo item có `unbreakable: true` cho trang bị Rank thường (chỉ dùng `max-durability` cao như 20,000 cho item Donate).
❌ **CẤM** vượt quá **40% Tỷ lệ Bạo Kích** tổng trên nhân vật (gây ra tình trạng chém 100% bốc hỏa chết ngay).
❌ **CẤM** tạo chỉ số `vampirism` hoặc `spell-vampirism` lớn hơn **10%** (khiến người chơi bất tử khi gây sát thương).
❌ **CẤM** cộng quá **0.05 Movement Speed** trên một món trang bị đơn lẻ (gây giật lag đồng bộ vị trí server).
❌ **CẤM** bỏ qua mốc ô khảm: Item Donate phải dùng đúng chuẩn ô khảm `Uncolored` để đồng bộ với hệ thống Ngọc ép.

---

## 🔄 5. QUY TRÌNH THÊM ITEM DONATE / ĐỘC QUYỀN MỚI VÀO SERVER

1. Mở file tương ứng trong `plugins/MMOItems/item/` (ví dụ `sword.yml`, `armor.yml`).
2. **Quy định Tiền Tố (Prefix)**:
   - **Dưới Config Server (Item Key ID)**: Bắt buộc dùng tiền tố `GACHA_` hoặc `DONATE_` trước ID (Ví dụ: `GACHA_SWORD_DARK_SOUL_KATANA`) để phân loại, quản lý file và cấp vật phẩm qua console lệnh `/mi give`.
   - **Tên Hiển Thị Trong Game (`name`)**: **TUYỆT ĐỐI KHÔNG** thêm các tiền tố/thẻ nhãn như `[GACHA]` hay `[DONATE]` vào tên hiển thị cho người chơi. Tên vật phẩm phải nguyên bản và mang phong cách RPG (Ví dụ: `&5&lĐêm Tối Diệt Vong`).
3. Set `tier: UNIQUE` và `lore-format: weapon-lore` hoặc `armor-lore`.
4. Điền thẻ `itemsadder-item: "namespace:item_id"` để kết nối với mô hình 3D custom.
5. Kiểm tra chỉ số đối chiếu với **Bảng 2.1 & 2.2** trong tài liệu này trước khi `/mi reload`.

---

## 📖 6. QUY CHUẨN TỪ VIẾT TẮT CHỈ SỐ (STAT ABBREVIATIONS)
Xem tài liệu hướng dẫn quy chuẩn viết tắt và mã màu hiển thị chi tiết tại: [STAT_ABBREVIATIONS.md](file:///d:/server-minecraft/plugins/MMOItems/docs/STAT_ABBREVIATIONS.md).

---

## 📑 7. PHÂN LOẠI CHI TIẾT ĐỒ DONATE VS FREE VS TRADE
Xem tài liệu phân loại chi tiết 15 bộ trang sức và đồ Donate / Free tại: [ITEM_CLASSIFICATION_GUIDE.md](file:///d:/server-minecraft/plugins/MMOItems/docs/ITEM_CLASSIFICATION_GUIDE.md).


