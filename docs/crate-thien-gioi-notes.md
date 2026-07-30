# Hòm Thiên Giới — Point shop + pity + NPC đổi

Cập nhật: 2026-07-30. Lối chơi donate phụ: [`loi-choi.md`](loi-choi.md) · Mục lục: [`INDEX.md`](INDEX.md).

## Tóm tắt

| Thành phần | Chi tiết |
| --- | --- |
| **Crate** | `ruong_thien_gioi` — Hòm Thiên Giới |
| **Key** | `chia_khoa_thien_gioi` |
| **Shop Point** | `/shopdonate` · `/thiengioi` · `/shopthien` |
| **Giá** | 1 chìa = **21 Point** · Gói **Mua 1 Tặng 1** = **21 Point → 2 chìa** |
| **Pool** | **Giáp + vũ khí only** — Trade **Hỏa/Băng/Hắc** · Donate **Hộ/Chiến Long** · Prison rank **7–9** (I) |
| **Pity** | Mỗi **10** lần quay → `MANH_THIEN_GIOI` ×1 |
| **Đổi NL** | Station `doi-thien-gioi` — 1 mảnh → chọn 1 món **Hộ Long** (kiếm/giáp) |

## Pool crate (chỉ giáp + vũ khí)

| Nhóm | Nội dung | Weight |
| --- | --- | ---: |
| **Trade ×3** | Hỏa / Băng / Hắc — 4 giáp + kiếm mỗi set | ~10 |
| **Prison 7–9** | Quản Ngục / Bá Chủ / Vượt Ngục — 4 giáp I + kiếm/rìu/trượng I | 7 / 6 / 5 |
| **Donate ×2** | Hộ Long (`LONG_VE`) · Chiến Long (`LONG_CHIEN`) — 4 giáp + kiếm | 3.0 / 1.5 |
| **Đá cường hóa** | VK/Giáp sơ→huyền | 14 → 1.5 |
| **Đá đục lỗ** | Ô 1→7 | 12 → 1.5 |
| **Rương ngọc** | `chia_khoa_ruong_ngoc` ×1 | 8 |
| **Mảnh boss** | `MANH_HUY_HIEU_TRIEU_HOI` · `MANH_LONG_TOC` | 9 / 7 |
| **Chuyển sinh** | `DA_CHUYEN_SINH` | 2.0 |

**Không** có nhẫn / vòng tay / găng / dây chuyền / pet trong hòm này.  
**Không** ra Thần / Đế / Hoàng.  
Trade: nếu muốn đổi 3 bộ (vd. thay Hắc → Phong/Lôi) — nói để sửa.

## Setup in-game (admin)

```
# Reload
/excellentcrates reload
/mi reload
/dm reload

# Đặt khối hòm (đứng đúng chỗ)
# rồi chỉnh Positions trong ruong_thien_gioi.yml hoặc dùng editor ExcellentCrates

# NPC đổi mảnh → Hộ Long
/npc create &b&l✦ Sứ Giả Thiên Giới --type PLAYER
/npc skin Merchant
/npc cmd add mi stations open doi-thien-gioi <p>
/npc lookclose
```

Test key:
```
/points give <player> 50
/shopdonate
# hoặc
/crates key give <player> chia_khoa_thien_gioi 10
```

## File

| File | Vai trò |
| --- | --- |
| `plugins/ExcellentCrates/crates/ruong_thien_gioi.yml` | Crate + milestone 10 |
| `plugins/ExcellentCrates/keys/chia_khoa_thien_gioi.yml` | Key |
| `plugins/DeluxeMenus/gui_menus/shop_donate.yml` | Shop Point |
| `plugins/MMOItems/item/material.yml` → `MANH_THIEN_GIOI` | NL pity |
| `plugins/MMOItems/crafting-stations/doi-thien-gioi.yml` | Đổi NL |

## Chưa làm / tuỳ chọn sau

- Gắn tọa độ thật khối hòm (hiện placeholder `0,64,0,world`)
- Preview item trong ExcellentCrates (mở hòm 1 lần / editor để gen preview)
- Cân lại weight sau khi playtest
- Link `/shopdonate` vào menu hub nếu cần
