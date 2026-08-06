# Hologram hướng dẫn người chơi (DecentHolograms)

Cập nhật: 2026-08-05. Lối chơi: [`gameplay.md`](../player/gameplay.md) · Bang: [`gangs.md`](../player/gangs.md).

## File

| ID | World | Nội dung | Location mặc định (gần spawn MV) |
| --- | --- | --- | --- |
| `GuideHub` | `world` (spawn) | Vòng tân thủ + menu/lệnh + tip Bang Hội / Bang Chiến | Spawn hub |
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
