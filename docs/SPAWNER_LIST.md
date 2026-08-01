# Danh sách Spawner Mob — Prison Dungeon (theo thứ tự rank)

> Lối chơi / gap spawner: [`loi-choi.md`](loi-choi.md) P0.2 · Hướng dẫn set vị trí: [`SPAWNER_POSITION_GUIDE.md`](SPAWNER_POSITION_GUIDE.md) · Mục lục: [`INDEX.md`](INDEX.md)

Nguồn dữ liệu: `plugins/MythicMobs/spawners/*.yml` (vị trí, cooldown, số lượng)
và `plugins/MythicMobs/mobs/prison_rank_mobs.yml` (chỉ số mob, drop, skill).

Tất cả spawner đều ở world `world_dungeon`, `Radius: 5.0`, `MaxMobs: 8`,
`MobsPerSpawn: 2`, `Cooldown: 5` (trừ khi ghi chú khác).

> ⚠️ Các spawner **chưa set toạ độ thật** (còn `World: world_dungeon, X:0 Y:64 Z:0`
> kèm `# TODO`) được đánh dấu **[CHƯA SET VỊ TRÍ]** bên dưới — xem
> `SPAWNER_POSITION_GUIDE.md` để set. Chỉ rank Tân Binh (Normal/Elite/Boss) đã có
> toạ độ thật.

---

## Rank 1 — Tân Binh (vũ khí tương ứng: WOODEN_SWORD)

| Spawner                          | Mob                       | Loại                | HP  | DMG | Level | Toạ độ (X,Y,Z)                         |
| -------------------------------- | ------------------------- | ------------------- | --- | --- | ----- | -------------------------------------- |
| `SPAWNER_PRISON_TAN_BINH_NORMAL` | Tân Binh Nổi Loạn         | ZOMBIE              | 34  | 18  | 1     | -1, 61, -48                            |
| `SPAWNER_PRISON_TAN_BINH_ELITE`  | Tân Binh Cuồng Nộ [Elite] | ZOMBIE (Scale 1.15) | 68  | 27  | 1     | -56, 64, -43                           |
| `TanBinhBoss`                    | [BOSS] Đầu Sỏ Tân Binh    | ZOMBIE (Scale 1.4)  | 285 | 40  | 10    | -56, 61, 21 (MaxMobs 1, Cooldown 900s) |

## Rank 2 — Tù Nhân (STONE_SWORD)

| Spawner                         | Mob                      | Loại                | HP  | DMG | Toạ độ                                           |
| ------------------------------- | ------------------------ | ------------------- | --- | --- | ------------------------------------------------ |
| `SPAWNER_PRISON_TU_NHAN_NORMAL` | Tù Nhân Lang Thang       | ZOMBIE              | 54  | 20  | **[CHƯA SET VỊ TRÍ]**                            |
| `SPAWNER_PRISON_TU_NHAN_ELITE`  | Tù Nhân Hung Hãn [Elite] | ZOMBIE (Scale 1.15) | 108 | 32  | **[CHƯA SET VỊ TRÍ]**                            |
| `TuNhanBoss`                    | [BOSS] Trùm Tù Nhân      | HUSK (Scale 1.4)    | 450 | 46  | **[CHƯA SET VỊ TRÍ]** (MaxMobs 1, Cooldown 900s) |

## Rank 3 — Lao Công (IRON_SWORD)

| Spawner                          | Mob                        | Loại              | HP  | DMG | Toạ độ                                           |
| -------------------------------- | -------------------------- | ----------------- | --- | --- | ------------------------------------------------ |
| `SPAWNER_PRISON_LAO_CONG_NORMAL` | Lao Công Kiệt Sức          | HUSK              | 79  | 25  | **[CHƯA SET VỊ TRÍ]**                            |
| `SPAWNER_PRISON_LAO_CONG_ELITE`  | Lao Công Điên Loạn [Elite] | HUSK (Scale 1.15) | 158 | 40  | **[CHƯA SET VỊ TRÍ]**                            |
| `LaoCongBoss`                    | [BOSS] Đốc Công Lao Công   | HUSK (Scale 1.4)  | 660 | 58  | **[CHƯA SET VỊ TRÍ]** (MaxMobs 1, Cooldown 900s) |

## Rank 4 — Thợ Đào (IRON_SWORD)

| Spawner                         | Mob                        | Loại                | HP  | DMG | Toạ độ                                           |
| ------------------------------- | -------------------------- | ------------------- | --- | --- | ------------------------------------------------ |
| `SPAWNER_PRISON_THO_DAO_NORMAL` | Thợ Đào Lạc Lối            | HUSK                | 108 | 31  | **[CHƯA SET VỊ TRÍ]**                            |
| `SPAWNER_PRISON_THO_DAO_ELITE`  | Thợ Đào Cuồng Đá [Elite]   | HUSK (Scale 1.15)   | 216 | 47  | **[CHƯA SET VỊ TRÍ]**                            |
| `ThoDaoBoss`                    | [BOSS] Trưởng Nhóm Thợ Đào | DROWNED (Scale 1.4) | 900 | 68  | **[CHƯA SET VỊ TRÍ]** (MaxMobs 1, Cooldown 900s) |

## Rank 5 — Đội Trưởng (DIAMOND_SWORD)

| Spawner                            | Mob                          | Loại                    | HP   | DMG | Toạ độ                                           |
| ---------------------------------- | ---------------------------- | ----------------------- | ---- | --- | ------------------------------------------------ |
| `SPAWNER_PRISON_DOI_TRUONG_NORMAL` | Đội Trưởng Phản Loạn         | VINDICATOR              | 144  | 32  | **[CHƯA SET VỊ TRÍ]**                            |
| `SPAWNER_PRISON_DOI_TRUONG_ELITE`  | Đội Trưởng Tinh Nhuệ [Elite] | VINDICATOR (Scale 1.15) | 288  | 52  | **[CHƯA SET VỊ TRÍ]**                            |
| `DoiTruongBoss`                    | [BOSS] Đại Đội Trưởng        | VINDICATOR (Scale 1.4)  | 1200 | 76  | **[CHƯA SET VỊ TRÍ]** (MaxMobs 1, Cooldown 900s) |

## Rank 6 — Phó Quản Ngục (DIAMOND_SWORD)

| Spawner                               | Mob                          | Loại                    | HP   | DMG | Toạ độ                                           |
| ------------------------------------- | ---------------------------- | ----------------------- | ---- | --- | ------------------------------------------------ |
| `SPAWNER_PRISON_PHO_QUAN_NGUC_NORMAL` | Lính Canh Phó Quản Ngục      | PILLAGER                | 189  | 38  | **[CHƯA SET VỊ TRÍ]**                            |
| `SPAWNER_PRISON_PHO_QUAN_NGUC_ELITE`  | Cận Vệ Phó Quản Ngục [Elite] | VINDICATOR (Scale 1.2)  | 378  | 59  | **[CHƯA SET VỊ TRÍ]**                            |
| `PhoQuanNgucBoss`                     | [BOSS] Phó Quản Ngục         | VINDICATOR (Scale 1.45) | 1575 | 86  | **[CHƯA SET VỊ TRÍ]** (MaxMobs 1, Cooldown 900s) |

## Rank 7 — Quản Ngục (NETHERITE_SWORD)

| Spawner                           | Mob                      | Loại                        | HP   | DMG | Toạ độ                                           |
| --------------------------------- | ------------------------ | --------------------------- | ---- | --- | ------------------------------------------------ |
| `SPAWNER_PRISON_QUAN_NGUC_NORMAL` | Lính Canh Quản Ngục      | WITHER_SKELETON             | 243  | 43  | **[CHƯA SET VỊ TRÍ]**                            |
| `SPAWNER_PRISON_QUAN_NGUC_ELITE`  | Cận Vệ Quản Ngục [Elite] | WITHER_SKELETON (Scale 1.2) | 486  | 67  | **[CHƯA SET VỊ TRÍ]**                            |
| `QuanNgucBoss`                    | [BOSS] Quản Ngục Tối Cao | WITHER_SKELETON (Scale 1.5) | 2025 | 96  | **[CHƯA SET VỊ TRÍ]** (MaxMobs 1, Cooldown 900s) |

## Rank 8 — Bá Chủ Ngục Tù (NETHERITE_SWORD)

| Spawner                                | Mob                   | Loại                         | HP   | DMG | Toạ độ                                           |
| -------------------------------------- | --------------------- | ---------------------------- | ---- | --- | ------------------------------------------------ |
| `SPAWNER_PRISON_BA_CHU_NGUC_TU_NORMAL` | Thủ Hạ Bá Chủ         | WITHER_SKELETON              | 311  | 45  | **[CHƯA SET VỊ TRÍ]**                            |
| `SPAWNER_PRISON_BA_CHU_NGUC_TU_ELITE`  | Cận Vệ Bá Chủ [Elite] | WITHER_SKELETON (Scale 1.25) | 621  | 72  | **[CHƯA SET VỊ TRÍ]**                            |
| `BaChuNgucTuBoss`                      | [BOSS] Bá Chủ Ngục Tù | PIGLIN_BRUTE (Scale 1.55)    | 2590 | 104 | **[CHƯA SET VỊ TRÍ]** (MaxMobs 1, Cooldown 900s) |

## Rank 9 — Vượt Ngục (NETHERITE_SWORD) — rank cao nhất

| Spawner                           | Mob                              | Loại                     | HP   | DMG | Toạ độ                                           |
| --------------------------------- | -------------------------------- | ------------------------ | ---- | --- | ------------------------------------------------ |
| `SPAWNER_PRISON_VUOT_NGUC_NORMAL` | Kẻ Vượt Ngục                     | PIGLIN_BRUTE             | 392  | 50  | **[CHƯA SET VỊ TRÍ]**                            |
| `SPAWNER_PRISON_VUOT_NGUC_ELITE`  | Kẻ Vượt Ngục Liều Lĩnh [Elite]   | PIGLIN_BRUTE (Scale 1.3) | 784  | 79  | **[CHƯA SET VỊ TRÍ]**                            |
| `VuotNgucBoss`                    | [BOSS] Trùm Vượt Ngục Tối Thượng | RAVAGER (Scale 1.6)      | 3260 | 114 | **[CHƯA SET VỊ TRÍ]** (MaxMobs 1, Cooldown 900s) |

## Boss trùm cuối — Ma Vương Ngục Tù (ngoài 9 rank)

Cơ chế triệu hồi đã đổi sang **bàn thờ tương tác** (ARMOR_STAND vô hình) thay vì spawner tự kích hoạt theo điều kiện đứng gần — đáng tin cậy hơn vì trừ đúng người, đúng số lượng.

| Thành phần  | File                                                                              | Mô tả                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ----------- | --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Bàn thờ     | `spawners/MaVuongAltar.yml` → mob `mobs/altar_mobs.yml` (`PRISON_MA_VUONG_ALTAR`) | ARMOR_STAND vô hình (không `Marker`), đặt tại world_magadungeon X:-2 Y:80 Z:86 (đã hạ 1 block cho dễ click). Là mục tiêu click trực tiếp.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| Logic click | `Skript/scripts/mavuong_altar.sk`                                                 | `on right click on armor stand:` + check tên hiển thị chứa "Bàn Thờ Triệu Hồi Ma Vương". Đếm `HUY_HIEU_TRIEU_HOI` (huy hiệu thật) qua NBT (`MMOITEMS_ITEM_ID`) → đủ **1** cái thì `mmoitems take` trừ item, chờ **3 giây** (delay kịch tính), rồi `mm mobs spawn` gọi boss; thiếu thì báo ngay. Cooldown 30 phút chống spam, đếm bằng số nguyên giây `{mavuong_altar_cooldown_left}` (không dùng Date/timespan vì gặp lỗi "Can't understand this expression: {\_x} in seconds"). **Đã thử đổi sang click khối SCULK_SHRIEKER nhưng Skript không bắt được event trên block đó (không rõ nguyên nhân) → quay lại ARMOR_STAND vì cách này đã xác nhận hoạt động.** |
| Boss        | `mobs/prison_rank_mobs.yml` (`PRISON_MA_VUONG_BOSS`)                              | RAVAGER (Scale 1.9), HP 5500, DMG 140. Được spawn qua lệnh console `mm mobs spawn PRISON_MA_VUONG_BOSS:10 1 world_magadungeon,-2,81,86` từ Skript (sau 3s delay).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| Hologram    | `DecentHolograms/holograms/MaVuongTimer.yml`                                      | Dòng 1 tĩnh "Bàn Thờ Triệu Hồi Ma Vương". Dòng 2 **tự động cập nhật mỗi 5 giây** bởi Skript (`every 5 seconds` trong `mavuong_altar.sk`) — hiện "Sẵn sàng - Click để triệu hồi!" hoặc "Có thể triệu hồi lại sau: X phút Y giây". Chưa export qua PlaceholderAPI vì server không có addon Skript-PAPI (SkBee, skript-placeholders...) — cách đẩy trực tiếp qua `/dh line set` hiện tại vẫn nhẹ, không cần thêm plugin.                                                                                                                                                                                                                                           |

- **Drop Ma Vương** (`prison_ma_vuong_boss_drops`, 2026-07-30): `TINHTHE_HUY_DIET` 25%, `DA_CUONG_HOA_THIEN_MENH` 15%, `TINHTHE_CUONGHOA_VUKHI`/`GIAP` 20% mỗi loại, chìa trang sức free 15%, chìa ngọc 50% (skill). Sink: đổi `TINHTHE_HUY_DIET` tại station `huy-hieu-trieu-hoi` → 2× Đá Thiên Mệnh hoặc 1× Đá Đục Lỗ Thiên Mệnh.
- **Chuỗi triệu hồi:** Boss rank 1–9 rớt `MANH_HUY_HIEU_TRIEU_HOI` (30%–50% theo rank) → chế tại `huy-hieu-trieu-hoi` (25 mảnh + $2.5M) → `HUY_HIEU_TRIEU_HOI` → click bàn thờ. Chi tiết drop: [`HUONG_DAN_DROPS_VA_EXP_NHATU.md`](HUONG_DAN_DROPS_VA_EXP_NHATU.md).
- ⚠️ **Lịch sử debug**: bản đầu dùng MythicMobs `SpawnConditions: ownsitemsimple` (condition không tồn tại) → sửa sang `hasitem` (đúng tên nhưng bị bug đã xác nhận trên GitHub/GitLab, issue #2033 "Holding and HasItem conditions always return false" — luôn báo thiếu item dù đủ) → sửa sang bàn thờ ARMOR_STAND với skill onInteract của MythicMobs (`hasitem`/`takeitem`, vẫn dính bug tương tự) → **cuối cùng chuyển hẳn logic kiểm tra/trừ item + gọi spawn boss sang Skript** (`mavuong_altar.sk`, dùng pattern NBT đã chạy ổn định ở `pickaxe-upgrade.sk`) vì MythicMobs hasitem/holding không đáng tin cậy trên bản 5.6.2 đang cài. Cũng từng dính bug `Marker: true` xoá hitbox khiến không click được — đã bỏ Marker.

---

## Ghi chú

- Tổng cộng hiện có **18 file spawner Normal/Elite** (rank 1–9) + **9 spawner Boss**
  — đủ cả 9 rank (`TanBinhBoss`, `TuNhanBoss`, `LaoCongBoss`, `ThoDaoBoss`,
  `DoiTruongBoss`, `PhoQuanNgucBoss`, `QuanNgucBoss`, `BaChuNgucTuBoss`,
  `VuotNgucBoss`), tất cả clone cấu trúc từ `TanBinhBoss.yml`, kèm hologram đếm
  ngược tương ứng (`TanBinhTimer.yml`, `TuNhanTimer.yml`, `LaoCongTimer.yml`,
  `ThoDaoTimer.yml`, `DoiTruongTimer.yml`, `PhoQuanNgucTimer.yml`,
  `QuanNgucTimer.yml`, `BaChuNgucTuTimer.yml`, `VuotNgucTimer.yml`).
- Rank 1–5 dùng world `world_dungeon`; rank 6 trở đi (Phó Quản Ngục, Quản Ngục,
  Bá Chủ Ngục Tù, Vượt Ngục) dùng world `world_magadungeon` — xem toạ độ thật
  của từng spawner trong file tương ứng, một số file rank 6–9 hiện World có thể
  đang không đồng nhất do đang trong quá trình set tay từng cái.
- Phần lớn spawner Normal/Elite/Boss còn lại đang dùng toạ độ placeholder
  `(0, 64, 0)` kèm `# TODO` và cần được set vị trí thật — xem
  `SPAWNER_POSITION_GUIDE.md`.
