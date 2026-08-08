# Ngọc khảm và công thức sát thương

> Trạng thái: **Live / Reference** · Cập nhật: 2026-08-08  
> Nguồn config: `plugins/MMOItems/item/gem_stone.yml`,
> `plugins/MythicLib/config.yml`, `plugins/MythicLib/stats.yml` và
> `scripts/balance_prison_combat.js`.

## 1. Cơ chế random của ngọc

Mỗi ngọc chỉ cho **một loại chỉ số**. Khi MMOItems tạo viên ngọc, giá trị được
roll đều trong khoảng `min`–`max` đã khai báo và được giữ trên item đó.

```yml
attack-damage:
  min: 8.1
  max: 9.9
```

Khoảng roll hiện hành là **±10% quanh giá trị chuẩn**:

```text
min = giá_trị_chuẩn × 0.90
max = giá_trị_chuẩn × 1.10
```

Ví dụ Hồng Ngọc X có giá trị chuẩn `9`:

```text
min = 9 × 0.90 = 8.1
max = 9 × 1.10 = 9.9
```

`regenerate-gems-when-unsocketed: false`, vì vậy tháo ngọc không roll lại chỉ
số. Quy tắc này ngăn người chơi tháo/lắp liên tục để săn giá trị tối đa.

## 2. Bảng ngọc đang dùng

Các ô dưới đây là khoảng `min–max`, không phải một giá trị cố định.

| Ngọc | Chỉ số | Cấp I | Cấp V | Cấp X |
| --- | --- | ---: | ---: | ---: |
| Hồng | Sát Thương Cơ Bản (`attack-damage`) | 0.9–1.1 | 3.24–3.96 | 8.1–9.9 |
| Lam | Mana Tối Đa (`max-mana`) | 9–11 | 49.5–60.5 | 144–176 |
| Lục | Máu Tối Đa (`max-health`) | 7.2–8.8 | 40.5–49.5 | 130.5–159.5 |
| Hoàng | Phòng Thủ (`defense`) | 1.8–2.2 | 11.7–14.3 | 43.2–52.8 |
| Tử | Sát Thương Phép (`magic-damage`) | 1.35–1.65 | 4.95–6.05 | 9.9–12.1 |
| Lam Ngọc Lục | Tỷ Lệ Chí Mạng (`critical-strike-chance`) | 0.72–0.88% | 2.25–2.75% | 4.5–5.5% |
| Hắc | Sức Mạnh Chí Mạng (`critical-strike-power`) | 1.8–2.2% | 5.4–6.6% | 10.8–13.2% |
| Bạch | Hồi Máu (`health-regeneration`) | 0.18–0.22 | 0.54–0.66 | 1.08–1.32 |
| Thổ | Kháng Xuyên Giáp (`armor-toughness`) | 0.45–0.55 | 1.71–2.09 | 3.6–4.4 |
| Cam | Tốc Độ Di Chuyển (`movement-speed`) | 0.0036–0.0044 | 0.0108–0.0132 | 0.0225–0.0275 |

Hoàng Ngọc dùng `defense`, không cộng `armor`. Nhờ vậy ngọc vẫn có ý nghĩa khi
người chơi đã đạt trần 30 giáp Minecraft.

## 3. Định nghĩa sức mạnh của một món đồ

Không dùng riêng con số `attack-damage` để kết luận món đồ mạnh hay yếu. Một
món đồ combat được định nghĩa bằng tổng các lớp sau:

```text
Chỉ số món sau cùng
= Base sau đợt cân bằng 5%
+ Chỉ số cường hóa theo UpgradeLevel
+ Chỉ số gem đã roll
+ Phần set bonus đang mở khóa
+ Enchant, class và buff đang có hiệu lực
```

### 3.1. Vũ khí

Với vũ khí đang dùng template cường hóa chuẩn:

```text
LiveBaseAttack = BaseAttackGốc × 1.05
ItemAttack = LiveBaseAttack + UpgradeLevel × 1.0 + tổng Attack từ gem

LiveBasePhysical = BasePhysicalGốc × 1.05
ItemPhysical = LiveBasePhysical + UpgradeLevel × 0.4
             + tổng Physical từ nguồn khác
```

Trong đó:

- `attack-damage`: sát thương gốc trực tiếp của đòn đánh.
- `physical-damage`: hệ số tăng sát thương vật lý theo phần trăm khi engine
  tính hit thực tế.
- `magic-damage`: hệ số tăng cho skill được định nghĩa là sát thương phép.
- `critical-strike-chance`: xác suất hit trở thành chí mạng.
- `critical-strike-power`: phần sát thương cộng thêm khi đã chí mạng.
- `attack-speed`: số lần có thể tấn công theo thời gian; tăng DPS nhưng không
  tăng damage hiển thị của một hit.

### 3.2. Giáp

Mỗi món giáp dùng template chuẩn được tính:

```text
LiveBaseHP = BaseHPGốc × 1.05
ItemHP = LiveBaseHP + UpgradeLevel × 5 + tổng HP từ gem

LiveBaseDefense = BaseDefenseGốc × 1.05
ItemDefense = LiveBaseDefense + UpgradeLevel × 1.75
            + tổng Defense từ gem

LiveBaseToughness = BaseToughnessGốc × 1.05
ItemToughness = LiveBaseToughness + UpgradeLevel × 0.35
```

Các số `Base` đang thấy trong file MMOItems đã là `LiveBase` sau khi tăng 5%; 
không nhân thêm `1.05` lần nữa khi tính trực tiếp từ config hiện tại.

`armor` là giáp Minecraft và không tăng theo cường hóa. Full set đạt trần
Armor vẫn tiếp tục mạnh lên nhờ `max-health`, `defense` và
`armor-toughness` (**Kháng Xuyên Giáp**).

### 3.3. Set bonus

Các mốc set là bonus tăng thêm và được cộng dồn:

```text
Tổng bonus đủ 4 món = bonus mốc 2 + bonus mốc 3 + bonus mốc 4
```

Vì vậy file `item-sets.yml` phải ghi **phần tăng thêm tại từng mốc**, còn lore
có thể hiển thị tổng tích lũy. Không được chép tổng tích lũy vào mọi mốc, nếu
không tốc độ đánh, hút máu và damage sẽ bị cộng lặp.

### 3.4. Damage mỗi hit và DPS

Hai món có damage mỗi hit giống nhau vẫn có thể khác sức mạnh do tốc độ đánh:

```text
DamagePerHit = công thức tại mục 4 trước khi áp Defense
DPS lý thuyết = DamagePerHit × AttackSpeed
```

Khi so sánh đồ phải xem cả `DamagePerHit`, `DPS`, khả năng sống sót và các trần
chỉ số; không cộng HP/Defense vào damage để tạo một điểm sức mạnh giả.

## 4. Công thức sát thương

### 4.1. Đòn đánh thường trước phòng thủ

Công thức ước tính để so sánh build vật lý:

```text
D0 = AttackDamage × (1 + PhysicalDamage / 100)
```

Nếu mục tiêu là quái hoặc người chơi, áp thêm hệ số đúng ngữ cảnh:

```text
PvE: D1 = D0 × (1 + PvEDamage / 100)
PvP: D1 = D0
```

Nếu đòn đánh chí mạng:

```text
Dcrit = D1 × (2 + CriticalStrikePower / 100)
```

MythicLib đang đặt hệ số chí mạng vũ khí cơ bản là `2`, tức đòn chí mạng chưa
có Crit Power gây 200% sát thương. Tỷ lệ xảy ra chí mạng dùng
`CriticalStrikeChance` và bị chặn tối đa ở 80%.

### 4.2. Kỹ năng và sát thương phép

Với kỹ năng có lượng sát thương cơ bản `SkillBase`, dùng công thức ước tính:

```text
D0_skill = SkillBase × (1 + SkillDamage / 100)
D0_magic = D0_skill × (1 + MagicDamage / 100)
```

Chỉ áp `MagicDamage` nếu kỹ năng được định nghĩa là sát thương phép. Chí mạng
kỹ năng có hệ số cơ bản `1.5`; modifier riêng trong file skill vẫn có thể thay
đổi kết quả trước khi đi qua phòng thủ.

### 4.3. Defense — công thức đang chạy thật

Với sát thương thường/vật lý:

```text
Final = D × (1 - Defense / (2 × D + Defense))
      = D × (2 × D) / (2 × D + Defense)
```

Với sát thương nguyên tố:

```text
FinalElement = D × (1 - Defense / (5 × D + Defense))
```

Defense có hiệu suất giảm dần và phụ thuộc lượng sát thương của từng hit:

- `Defense = D` → sát thương thường còn khoảng `66.67%`.
- `Defense = 2D` → sát thương thường còn `50%`.
- Vì vậy tăng Defense vẫn có ích, nhưng không thể tạo miễn nhiễm sát thương.

Sau đó các loại giảm sát thương phù hợp như `damage-reduction`,
`pve-damage-reduction` hoặc `pvp-damage-reduction` mới tiếp tục làm giảm kết
quả. Mỗi nhóm hiện bị chặn tối đa ở `50%`; không cộng các phần trăm thành một
mốc miễn nhiễm 100%.

### 4.4. Ví dụ hoàn chỉnh

Player có `100 Attack Damage`, `20% Physical Damage`, đòn chí mạng có thêm
`30% Crit Power`; mục tiêu có `120 Defense`:

```text
D0    = 100 × (1 + 20/100) = 120
Dcrit = 120 × (2 + 30/100) = 276
Final = 276 × (552 / (552 + 120)) ≈ 226.79
```

Nếu mục tiêu còn có `20% PvP Damage Reduction`:

```text
FinalPvP ≈ 226.79 × (1 - 20/100) ≈ 181.43
```

Đây là công thức kiểm tra balance; số thực tế có thể còn chịu modifier của
skill, class, potion, set bonus, block/parry/dodge hoặc mechanic của mob.

## 5. Công thức cân mob và boss Prison

Baseline hiện tại dùng player cùng rank, trang bị Tier III và mức nâng cấp đề
xuất:

```text
WeaponHit = (BaseAttack + BasePhysical) × 1.05
          + UpgradeLevel × (1.0 + 0.4)

PlayerHP = 20 + BaseHP × 1.05 + UpgradeLevel × 5 × 4

PlayerDefense = BaseDefense × 1.05 + UpgradeLevel × 1.75 × 4
```

Máu mục tiêu được đặt theo số hit thường dự kiến:

```text
NormalHP ≈ WeaponHit × 5
EliteHP  ≈ WeaponHit × 18
BossHP   ≈ WeaponHit × 70
```

Sát thương thô của boss được giải ngược từ công thức Defense sao cho một hit
boss sau phòng thủ bằng khoảng `22% PlayerHP`:

```text
Target = PlayerHP × 0.22
BossRawDamage = (Target + √(Target² + 2 × Target × PlayerDefense)) / 2
```

Các con số này là chuẩn thiết kế để đồng bộ rank và boss, không thay thế toàn
bộ pipeline sát thương runtime.

## 6. Trần an toàn liên quan

| Chỉ số | Trần |
| --- | ---: |
| Tỷ Lệ Chí Mạng | 80% |
| Sức Mạnh Chí Mạng cộng thêm | 80% |
| Hút Máu / Hút Máu Phép | 15% |
| Giảm Sát Thương chung | 50% |
| Giảm Sát Thương PvE | 50% |
| Giảm Sát Thương PvP | 50% |
| Tốc Độ Di Chuyển cộng thêm | 0.30 |
