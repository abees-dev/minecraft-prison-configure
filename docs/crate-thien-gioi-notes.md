# Hòm Thiên Giới — Point shop + pity + NPC đổi

Cập nhật: 2026-07-30 (refactor weight). Give nhanh: [`give-thien-gioi.md`](give-thien-gioi.md) · Mục lục: [`INDEX.md`](INDEX.md).

## Tóm tắt

| | |
| --- | --- |
| Crate / key | `ruong_thien_gioi` / `chia_khoa_thien_gioi` |
| Shop | `/shopdonate` · `/thiengioi` · `/shopthien` |
| Giá | **21 Point** / chìa · gói **Mua 1 Tặng 1** = 21P → **2 chìa** |
| Pool | Giáp + vũ khí only + NL (CH / đục / chìa ngọc / mảnh boss / Đá CS) |
| Pity | Mỗi **10** quay → `MANH_THIEN_GIOI` → `/doithiengioi` (NPC) đổi 1 món **Hộ Long** |

## Weight (total **615**, số nguyên)

| Nhóm | w / món | # | Share |
| --- | ---: | ---: | ---: |
| Trade Hỏa / Băng / Hắc | 10 | 15 | ~24% |
| Prison rank 7 / 8 / 9 | 12 / 8 / 5 | 7 mỗi | ~14% / 9% / 6% |
| Donate Hộ Long | 6 | 5 | ~5% |
| Donate Chiến Long | 3 | 5 | ~2% |
| Đá CH sơ→huyền (VK+Giáp) | 30 / 18 / 8 / 3 / 1 | 2/bậc | ~20% |
| Đục lỗ ô 1→7 | 28→1 | 7 | ~13% |
| Chìa Rương Ngọc | 16 | 1 | ~3% |
| Mảnh Huy Hiệu / Long Tộc | 14 / 12 | 2 | ~4% |
| Đá Chuyển Sinh | 1 | 1 | ~0.2% |

1 chìa ước lượng: **~40% NL** · **~29% prison** · **~24% trade** · **~7% donate**.

**Không** trang sức · **không** Thần/Đế/Hoàng. Trade 3 bộ mặc định Hỏa/Băng/Hắc.

## Đổi mảnh (player)

| | |
| --- | --- |
| Lệnh | `/doithiengioi` · alias `/doimanhthien` · `/doithien` |
| Cost | `1x MANH_THIEN_GIOI` |
| Pool | 1 trong 5 món **Hộ Long**: kiếm / mũ / giáp / quần / giày |

## Setup admin

```
excellentcrates reload
mi reload
dm reload
# command mới trong exchange.yml cần restart server (hoặc reload CorePlugin utility nếu hỗ trợ)

npc create &b&l✦ Sứ Giả Thiên Giới --type PLAYER
npc skin Merchant
npc command add -p doithiengioi
npc lookclose
npc hidename
npc hologram add &b&l✦ Sứ Giả Thiên Giới
```

Đặt khối hòm rồi chỉnh editor ExcellentCrates. Station MMOItems `doi-thien-gioi` vẫn giữ dự phòng.

## File

| File | Vai trò |
| --- | --- |
| `ExcellentCrates/crates/ruong_thien_gioi.yml` | Crate + milestone 10 |
| `ExcellentCrates/keys/chia_khoa_thien_gioi.yml` | Key |
| `DeluxeMenus/gui_menus/shop_donate.yml` | Shop Point |
| `MMOItems/item/material.yml` → `MANH_THIEN_GIOI` | NL pity |
| `CorePlugin/utility/exchange.yml` → `doithiengioi` | GUI đổi mảnh → Hộ Long |
| `MMOItems/crafting-stations/doi-thien-gioi.yml` | Station dự phòng (cùng pool) |

## Còn lại

- Tọa độ hòm thật · preview item · link hub menu nếu cần
- Plan crate khác: [`crates-refactor-plan.md`](crates-refactor-plan.md)
