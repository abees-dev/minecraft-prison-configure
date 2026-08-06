# Hệ Hòm Ngọc — weight và gộp tổng hợp

Cập nhật: 2026-07-30. Plan: [`crates-refactor.md`](../archive/crates-refactor.md) · Mục lục: [`INDEX.md`](../INDEX.md).

## Luồng player

1. Có `chia_khoa_ruong_ngoc` → mở **`ruong_quay_ngoc`** (Vòng Quay Đá Quý) tại hub.
2. Quay ra **1 trong 10 hòm màu** (virtual crate).
3. Mở hòm màu → nhận `GEM_STONE` màu đó Lv.I–X.

Key nhận từ: milestone Long Tộc / Trang Sức Free / pool Thiên Giới / drop khác.

## Hub — `ruong_quay_ngoc`

| | |
| --- | --- |
| Key | `chia_khoa_ruong_ngoc` |
| Positions | `34,85,-102,world` |
| Rewards | 10 hòm màu, **w=10** mỗi cái (~10% đều) |

**Đã gộp B4:** bỏ reward `ruong_da_quy_tong_hop`. File gốc archive: `crates/_backup/ruong_da_quy_tong_hop.yml.bak`.

## Hòm màu ×10 — weight Lv (total **1000** / hòm)

| Lv | Weight | Share |
| ---: | ---: | ---: |
| I | **450** | 45% |
| II | **250** | 25% |
| III | **120** | 12% |
| IV | **70** | 7% |
| V | **50** | 5% |
| VI | **30** | 3% |
| VII | **18** | 1.8% |
| VIII | **8** | 0.8% |
| IX | **3** | 0.3% |
| X | **1** | 0.1% |

Cùng tỉ lệ curve cũ (`45…0.1`), scale ×10 → số nguyên. Lv VIII+ broadcast.

| File | Màu / item |
| --- | --- |
| `ruong_hong_ngoc` | Hồng · `RED_GEM_LV*` |
| `ruong_lam_ngoc` | Lam · `BLUE_GEM_LV*` |
| `ruong_luc_ngoc` | Lục · `GREEN_GEM_LV*` |
| `ruong_hoang_ngoc` | Hoàng · `YELLOW_GEM_LV*` |
| `ruong_tu_ngoc` | Tử · `PURPLE_GEM_LV*` (kiểm tra ID trong file) |
| `ruong_bang_ngoc` | Băng |
| `ruong_hac_ngoc` | Hắc |
| `ruong_bach_ngoc` | Bạch |
| `ruong_tho_ngoc` | Thổ |
| `ruong_cam_ngoc` | Cam |

Hòm màu: `Key.Required: false` (mở từ item crate hub phát).

## Admin

```
excellentcrates reload
sk reload admin/give_all_hom.sk
```

`/giveallhom [player] [n]` — phát 10 hòm màu (không còn tổng hợp).

## File đụng

| File | Việc |
| --- | --- |
| `crates/ruong_*_ngoc.yml` ×10 | Weight integer |
| `crates/ruong_quay_ngoc.yml` | Bỏ tong_hop · w=10 |
| `crates/_backup/ruong_da_quy_tong_hop.yml.bak` | Archive |
| `Skript/scripts/admin/give_all_hom.sk` | 10 loại |
