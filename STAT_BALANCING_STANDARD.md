# ⚖️ QUY CHUẨN CÂN BẰNG CHỈ SỐ (STAT BALANCING STANDARD)

> Lối chơi: [`docs/player/gameplay.md`](docs/player/gameplay.md) · Trần donate/gacha: [`docs/reference/stat-balancing-donate.md`](docs/reference/stat-balancing-donate.md) · Mục lục: [`docs/INDEX.md`](docs/INDEX.md)

> Bảng ngọc và công thức sát thương hiện hành:
> [`docs/reference/gems-combat-damage.md`](docs/reference/gems-combat-damage.md).

Tài liệu này quy định tiêu chuẩn cân bằng chỉ số cho hệ thống Vật Phẩm (MMOItems), Trang Bị, Kỹ Năng (MMOCore Skills), Ngọc Khảm (Gem Stones) và Ô Khảm (Gem Sockets) cho server.

---

## 🎯 1. NGUYÊN TẮC CỐT LÕI (CORE PRINCIPLES)

1. **1 Ngọc = 1 Chỉ Số (Single Stat Per Gem)**: Mỗi viên ngọc chỉ tăng duy nhất 1 chỉ số để người chơi dễ định hình build nhân vật.
2. **Kiểm Soát Chỉ Số Tối Đa (Stat Cap Control)**: Tránh tình trạng 1-hit kill hoặc tanker không thể bị hạ gục. Thời gian combat tiêu chuẩn giữa 2 người chơi cùng rank là **4 – 7 hit**.
3. **Rủi Ro Tương Tác Sức Mạnh (Risk vs Reward)**: Tỉ lệ nâng cấp ngọc thành công giảm dần theo cấp độ (Cấp I: `95%` ➔ Cấp X: `3%`).
4. **Phân Cấp Số Ô Khảm Theo Rank (Socket Progression)**: Trang bị rank càng cao càng có nhiều ô khảm trống (tối đa 5 ô).
5. **Cân Bằng Skill Theo Tỉ Lệ Tăng Trưởng (Skill Scaling Standard)**: Skill tuân thủ cấu trúc `base` + `per-level` với trần/sàn `min` / `max` khống chế nghiêm ngặt.

---

## ⚔️ 2. QUY CHUẨN CÂN BẰNG TRANG BỊ & VŨ KHÍ (EQUIPMENT BALANCING)

### 🗡️ A. Vũ Khí Cận Chiến & Phép Thuật

| Loại Vũ Khí | Tốc Đánh | Sát Thương Gốc (Rank 1 ➔ 9) | Chỉ Số Đặc Thù Theo Rank | Vai Trò & Thiết Kế |
|-------------|----------|-----------------------------|--------------------------|-------------------|
| **Kiếm (Sword)** | `1.6` (Nhanh) | `3.0` ➔ `48.0` | Crit Chance: `1%` ➔ `22%`<br>Lifesteal: `0%` ➔ `10%` | Dùng ổn định, dồn sát thương cận chiến, hồi phục khi chém |
| **Rìu Chiến (Axe)** | `1.0` (Chậm) | `4.0` ➔ `58.0` (+20% Dame) | Knockback: `0.2` ➔ `2.2`<br>Crit Power: `0%` ➔ `35%` | Dame bộc phát mạnh, phá giáp, đẩy lùi đối thủ |
| **Trượng Phép (Staff)** | `1.2` (Vừa) | Physical: `2.5` ➔ `40.0`<br>Magic: `5.0` ➔ `140.0` | Mana Cost: `3` ➔ `16`<br>Spell Vamp: `0%` ➔ `9.5%` | Sát thương Phép từ xa, tốn Mana, hút máu phép |

---

### 🛡️ B. Trang Bị Giáp (Armor Set)

| Món Giáp | Giáp Gốc (`armor`) | Máu Tối Đa (`max-health`) | Kháng / Phòng Thủ (`defense`) | Chỉ Số Phụ |
|----------|-------------------|--------------------------|--------------------------------|------------|
| **Nón (Helmet)** | `1.0` ➔ `15.0` | `+1.0` ➔ `+35.0` | Armor Toughness: `1.0` ➔ `10.0` | Tỉ lệ né tránh (Dodge) |
| **Áo (Chestplate)** | `2.0` ➔ `25.0` | `+2.0` ➔ `+60.0` | Defense: `1.0` ➔ `20.0` | Kháng đẩy lùi: `5%` ➔ `30%` |
| **Quần (Leggings)** | `1.5` ➔ `20.0` | `+1.5` ➔ `+45.0` | Defense: `1.0` ➔ `15.0` | Giảm sát thương vật lý |
| **Giày (Boots)** | `1.0` ➔ `12.0` | `+1.0` ➔ `+30.0` | Defense: `0.5` ➔ `10.0` | Tốc độ di chuyển: `+0.005` ➔ `+0.05` |

> 📌 **Tổng Bộ Giáp Rank 9 (Vượt Ngục V)**: Tối đa `72.0` Giáp + `+170` Máu (85 tim) + `55.0` Phòng thủ.

---

### ⛏️ C. Trang Bị Đào Mỏ & Công Cụ (Tools)

| Rank Công Cụ | Sức Mạnh Cúp (`pickaxe-power`) | Hiệu Suất Đào (`efficiency`) | Gia Tài (`fortune`) | Chống Hỏng (`unbreaking`) |
|--------------|------------------------------|-----------------------------|---------------------|---------------------------|
| **Rank 1 - Tân Binh** | `1` | `+0.5` | `+0.25` | `+0.25` |
| **Rank 2 - Tù Nhân** | `2` | `+1.0` | `+0.50` | `+0.50` |
| **Rank 3 - Lao Công** | `3` | `+1.5` | `+0.75` | `+0.75` |
| **Rank 4 - Thợ Đào** | `4` | `+2.0` | `+1.00` | `+1.00` |
| **Rank 5 - Đội Trưởng** | `5` | `+2.5` | `+1.25` | `+1.25` |
| **Rank 6 - Phó Quản Ngục** | `6` | `+3.0` | `+1.50` | `+1.50` |
| **Rank 7 - Quản Ngục** | `7` | `+3.5` | `+1.75` | `+1.75` |
| **Rank 8 - Bá Chủ Ngục Tù** | `8` | `+4.0` | `+2.00` | `+2.00` |
| **Rank 9 - Vượt Ngục** | `9` | `+5.0` | `+2.50` | `+2.50` |

---

## 🔥 3. QUY CHUẨN CÂN BẰNG KỸ NĂNG (MMOCORE SKILL BALANCING)

Mọi kỹ năng trong MMOCore đều quy định theo cấu trúc `base` (cơ bản) và `per-level` (tăng mỗi cấp).

### ⚡ A. Bảng Khung Chỉ Số Kỹ Năng Theo Dạng Skill

| Dạng Kỹ Năng (Skill Type) | Sát Thương (`damage`) | Tiêu Hao (`mana` / `stamina`) | Hồi Chiêu (`cooldown`) | Giới Hạn Hồi Chiêu (`min`) |
|--------------------------|----------------------|-------------------------------|------------------------|---------------------------|
| **Dồn Sát Thương Đơn Mục Tiêu** *(Single Target)* | Base: `6.0` - `12.0`<br>Per-level: `2.0` - `4.0` | Mana Base: `15` - `25`<br>Per-level: `1.0` - `2.0` | Base: `8.0s` - `12.0s`<br>Per-level: `-0.1s` | **Min: `2.0s`** (Không giảm sâu hơn) |
| **Sát Thương Diện Rộng** *(AoE / Storm)* | Base: `3.0` - `7.0`<br>Per-level: `1.0` - `2.5` | Mana Base: `25` - `45`<br>Per-level: `2.0` - `3.5` | Base: `12.0s` - `20.0s`<br>Per-level: `-0.2s` | **Min: `4.0s`** |
| **Hồi Phục & Buff** *(Heal & Support)* | Heal Base: `4.0` - `10.0`<br>Per-level: `1.5` - `3.0` | Mana Base: `20` - `40`<br>Per-level: `2.0` - `3.0` | Base: `15.0s` - `25.0s`<br>Per-level: `-0.2s` | **Min: `6.0s`** |
| **Lướt & Tấn Công Nhanh** *(Dash / Strike)* | Base: `4.0` - `8.0`<br>Per-level: `1.5` - `3.0` | Stamina Base: `5` - `15`<br>Per-level: `0.5` - `1.0` | Base: `5.0s` - `8.0s`<br>Per-level: `-0.1s` | **Min: `1.5s`** |

---

### 🌀 B. Quy Định Khống Chế & Hiệu Ứng Bất Lợi (CC Limits)

- **Làm choáng (Stun)**: Tối đa **`2.0s`** (Tránh tình trạng stun-lock vô tận).
- **Làm chậm (Slow)**: Tối đa **`40%`** trong **`3.0s`**.
- **Hóa mù / Câm lặng (Blind / Silence)**: Tối đa **`2.0s`**.
- **Thiêu đốt (Burn / Ignite)**: Tối đa **`3.0s`** (Sát thương thiêu đốt = 30% sát thương đòn đánh).

---

## 💎 4. BẢNG NGUYÊN TẮC 10 NGUYÊN TỐ NGỌC KHẢM

> Bảng cũ bên dưới chỉ còn mang tính thiết kế ban đầu. Số liệu live, cơ chế
> random ±10% và tên chỉ số chuẩn nằm tại
> [`gems-combat-damage.md`](docs/reference/gems-combat-damage.md); không dùng
> bảng này để chỉnh config production.

| Màu Ngọc | Phẩm Cấp | Nguyên Tố | Chỉ Số | Lv.I | Lv.V | Lv.X (Max) | Vai Trò Combat |
|----------|----------|-----------|--------|------|------|------------|----------------|
| 🔴 **Hồng Ngọc** | Red | Hỏa | `attack-damage` | **+0.5** | **+2.8** | **+8.0** | Tăng sát thương vật lý gốc |
| 🔵 **Lam Ngọc** | Blue | Nước | `max-mana` | **+5** | **+34** | **+105** | Tăng bể Mana cho Pháp sư |
| 🟢 **Lục Ngọc** | Green | Phong | `attack-speed` | **+0.02** | **+0.10** | **+0.25** | Tăng tốc độ đánh mượt |
| ⚫ **Hắc Ngọc** | Black | Bóng Tối | `pve-damage` | **+1%** | **+5%** | **+15%** | Tăng % sát thương đánh Mỏ/Boss |
| ⚪ **Bạch Ngọc** | White | Ánh Sáng | `defense` | **+0.5** | **+3.0** | **+10.0** | Giảm sát thương nhận vào |
| 🟡 **Hoàng Ngọc** | Yellow | Kim | `critical-strike-power` | **+2%** | **+12%** | **+38%** | Tăng % dame khi bạo kích |
| 🟤 **Thổ Ngọc** | Brown | Đất | `max-health` | **+1** | **+9** | **+20** | Tăng Máu (10 tim ở Lv.X) |
| 🟠 **Cam Ngọc** | Orange | Năng Lượng | `cooldown-reduction` | **+0.5%** | **+2.8%** | **+8.0%** | Giảm hồi chiêu kỹ năng |
| 🔵 **Băng Ngọc** | Cyan | Băng | `magic-damage` | **+1%** | **+5%** | **+15%** | Tăng % sát thương Phép |
| 🟣 **Tử Ngọc** | Purple | Sấm Sét | `critical-strike-chance` | **+0.5%** | **+2.5%** | **+7.5%** | Tăng tỉ lệ đòn bạo kích |

---

## 🔮 5. BẢNG TỈ LỆ THÀNH CÔNG VÀ NÂNG CẤP (SUCCESS RATES)

| Cấp Ngọc | Tên Cấp | Tỉ Lệ Thành Công | Trạng Thái Thất Bại |
|----------|---------|------------------|---------------------|
| `LV1` | Lv.I | **95%** | Mất ngọc, giữ nguyên Ô Khảm |
| `LV2` | Lv.II | **85%** | Mất ngọc, giữ nguyên Ô Khảm |
| `LV3` | Lv.III | **70%** | Mất ngọc, giữ nguyên Ô Khảm |
| `LV4` | Lv.IV | **55%** | Mất ngọc, giữ nguyên Ô Khảm |
| `LV5` | Lv.V | **40%** | Mất ngọc, giữ nguyên Ô Khảm |
| `LV6` | Lv.VI | **28%** | Mất ngọc, giữ nguyên Ô Khảm |
| `LV7` | Lv.VII | **18%** | Mất ngọc, giữ nguyên Ô Khảm |
| `LV8` | Lv.VIII | **10%** | Mất ngọc, giữ nguyên Ô Khảm |
| `LV9` | Lv.IX | **5%** | Mất ngọc, giữ nguyên Ô Khảm |
| `LV10` | Lv.X | **3%** | Mất ngọc, giữ nguyên Ô Khảm |

---

## 🛡️ 6. QUY ĐỊNH SỐ Ô KHẢM (GEM SOCKETS) THEO RANK

| Tên Rank | Cấp Rank | Số Ô Khảm Gắn Sẵn | Tùy Chọn Đục Lỗ Bằng Đá |
|----------|----------|-------------------|--------------------------|
| **Tân Binh** | Rank 1 | **0 ô** | Không đục được |
| **Tù Nhân** | Rank 2 | **0 ô** | Không đục được |
| **Lao Công** | Rank 3 | **1 ô** | Đục tối đa 1 ô bằng Đá Sơ Cấp (100%) |
| **Thợ Đào** | Rank 4 | **2 ô** | Đục tối đa 2 ô bằng Đá Trung Cấp (70%) |
| **Đội Trưởng** | Rank 5 | **3 ô** | Đục tối đa 3 ô bằng Đá Cao Cấp (40%) |
| **Phó Quản Ngục** | Rank 6 | **4 ô** | Cố định 4 ô |
| **Quản Ngục** | Rank 7 | **4 ô** | Cố định 4 ô |
| **Bá Chủ Ngục Tù** | Rank 8 | **5 ô** | Cố định 5 ô (MAX) |
| **Vượt Ngục** | Rank 9 | **5 ô** | Cố định 5 ô (MAX) |

---

## 🧙‍♂️ 7. GỢI Ý ĐỊNH HƯỚNG BUILD KHẢM NGỌC THEO CLASS MMOCORE

Tùy theo Lớp Nhân Vật (Class) đang chọn trong MMOCore, người chơi nên ưu tiên kết hợp các loại ngọc sau:

| Class MMOCore | Tên Lớp Nhân Vật | Ngọc Ưu Tiên 1 (Tối Thượng) | Ngọc Ưu Tiên 2 (Hỗ Trợ) | Ngọc Ưu Tiên 3 (Sinh Tồn) | Định Hướng Combat |
|---------------|------------------|------------------------------|--------------------------|----------------------------|-------------------|
| **Warrior** | **Chiến Binh** | 🔴 Hồng Ngọc *(Vật Lý)* | 🟢 Lục Ngọc *(Tốc Đánh)* | 🟤 Thổ Ngọc *(Máu)* | Tích lũy Cuồng Nộ, càn quét cận chiến |
| **Mage** | **Pháp Sư** | 🔵 Băng Ngọc *(ST Phép)* | 🔵 Lam Ngọc *(Mana)* | 🟠 Cam Ngọc *(Giảm Hồi Chiêu)* | Xả combo phép thuật từ xa, duy trì mana |
| **Archer** | **Cung Thủ** | 🟣 Tử Ngọc *(Tỉ lệ Crit)* | 🟡 Hoàng Ngọc *(ST Crit)* | 🟢 Lục Ngọc *(Tốc Đánh)* | Bắn rỉa từ xa, chí mạng cực cao |
| **Death Knight**| **Hiệp Sĩ Tử Thần** | 🔴 Hồng Ngọc *(Vật Lý)* | ⚪ Bạch Ngọc *(Phòng Thủ)* | 🟤 Thổ Ngọc *(Máu)* | Tanker hút máu, trụ dẻo dai trong giao tranh |
| **Dragon Warrior**| **Chiến Binh Rồng**| 🔴 Hồng Ngọc *(Vật Lý)* | 🟣 Tử Ngọc *(Tỉ lệ Crit)* | 🟡 Hoàng Ngọc *(ST Crit)* | Dồn sát thương bộc phát lửa cuồng bạo |
| **Cleric** | **Tu Sĩ** | 🔵 Lam Ngọc *(Mana)* | 🟠 Cam Ngọc *(Giảm Hồi Chiêu)* | ⚪ Bạch Ngọc *(Phòng Thủ)* | Hồi máu, buff giáp, duy trì đội hình |
| **Beastmaster** | **Thú Vương** | ⚫ Hắc Ngọc *(Dame PvE)* | 🟢 Lục Ngọc *(Tốc Đánh)* | 🟤 Thổ Ngọc *(Máu)* | Săn Boss, dọn mỏ, phối hợp linh thú |
| **Summoner** | **Triệu Hồi Sư** | 🔵 Băng Ngọc *(ST Phép)* | 🟠 Cam Ngọc *(Giảm Hồi Chiêu)* | 🔵 Lam Ngọc *(Mana)* | Triệu hồi đệ, xả chiêu hỗ trợ liên tục |
