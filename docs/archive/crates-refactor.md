# Kế hoạch refactor ExcellentCrates

Cập nhật: 2026-07-30. Chuẩn TG: [`crate-thien-gioi.md`](../systems/crate-thien-gioi.md).

## Quyết định Phase A (đã chốt)

| # | Quyết định |
| --- | --- |
| 1 | Long Tộc — giữ pool, chỉ tỷ lệ |
| 2 | `ruong_da_quy_tong_hop` — **gộp vào hòm ngọc** (đã archive) |
| 3 | Pity Long Tộc — giữ MS 25/90 |

## Tiến độ — **HOÀN THÀNH**

| Crate | Docs |
| --- | --- |
| `ruong_thien_gioi` | [`crate-thien-gioi.md`](../systems/crate-thien-gioi.md) |
| `ruong_long_toc` | [`crate-long-toc.md`](../systems/crate-long-toc.md) |
| `ruong_trang_suc_free` | [`crate-trang-suc-free.md`](../systems/crate-trang-suc-free.md) |
| Hòm ngọc ×10 + hub | [`crate-ngoc.md`](../systems/crate-ngoc.md) |
| `ruong_da_quy_tong_hop` | Archived `_backup/…yml.bak` · bỏ khỏi `ruong_quay_ngoc` |

## Chuẩn weight đã áp

- Số nguyên · cùng bậc cùng w · docs total + %.
- Ngọc Lv: `450/250/120/70/50/30/18/8/3/1` (curve cũ ×10).
