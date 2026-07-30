# Hòm Trang Sức Free — weight refactor

Cập nhật: 2026-07-30. Plan: [`crates-refactor-plan.md`](crates-refactor-plan.md) · Mục lục: [`INDEX.md`](INDEX.md).

## Tóm tắt

| | |
| --- | --- |
| Crate / key | `ruong_trang_suc_free` / `chia_khoa_trang_suc_free` |
| Pool | **Giữ** — jewelry FREE (Thanh / Xích / Bạc / Kim / Thiên Long) |
| Milestone | **Giữ** 10 → chìa ngọc · 30 → Dây Chuyền Thanh Long |
| Thay đổi | Weight **số nguyên**, cùng set cùng w |

## Weight (total **175**)

| Set | w / món | # | Share |
| --- | ---: | ---: | ---: |
| Thanh Long | **12** | 5 | ~34% |
| Xích Long | **10** | 5 | ~29% |
| Bạc Long | **7** | 5 | ~20% |
| Kim Long | **4** | 5 | ~11% |
| Thiên Long | **2** | 5 | ~6% |

Mỗi set: amulet / ring×2 / bracelet / gloves.

## File

`plugins/ExcellentCrates/crates/ruong_trang_suc_free.yml`

Reload: `excellentcrates reload`
