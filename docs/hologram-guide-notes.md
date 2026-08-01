# Hologram hướng dẫn member (DecentHolograms)

Cập nhật: 2026-08-01. Lối chơi: [`loi-choi.md`](loi-choi.md).

## File

| ID | World | Nội dung | Location mặc định (gần spawn MV) |
| --- | --- | --- | --- |
| `GuideHub` | `world` (spawn) | Vòng tân thủ + **menu/lệnh GUI** | Spawn hub |
| `GuidePrison` | gần khu mỏ | Chỉ đào + NPC **ở từng khu mỏ**; GUI → xem spawn | Đặt gần cổng/mỏ |

## Reload / chỉnh vị trí

```
/dh reload
/dh teleport GuideHub
/dh move here GuideHub
/dh teleport GuidePrison
/dh move here GuidePrison
```

Tắt tạm: `enabled: false` trong YAML rồi `/dh reload`.
