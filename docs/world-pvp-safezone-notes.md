# world_pvp — khu an toàn spawn

Cập nhật: 2026-08-05.

## Đã làm (WorldGuard)

| Phần | Chi tiết |
| --- | --- |
| World | `world_pvp` |
| Region | `spawn_safe` |
| Phạm vi | X/Z **-1 → 17** (spawn ≈ 9,9 ± 9 block), Y **-64 → 320** |
| Flags | `pvp: deny`, `invincible: allow` |
| Ngoài region | `__global__` `pvp: allow` |
| File | [`plugins/WorldGuard/worlds/world_pvp/regions.yml`](../plugins/WorldGuard/worlds/world_pvp/regions.yml) |

Title giữa màn hình (WorldGuard native):

- Vào: `&a&l◆ KHU AN TOÀN ◆` / `&7Bạn đang được bảo vệ`
- Ra: `&c&l◆ KHU CHIẾN ĐẤU ◆` / `&7PvP đã được bật`

## Bang Chiến regions (2026-08-05)

Cả 4 selection là cổng nhỏ (Y=-58). `war_arena` = bbox bao quanh + pad 5.

| Region | Map | Min → Max |
| --- | --- | --- |
| `war_arena` | toàn arena | (-145,-64,-158) → (149,0,111) |
| `war_gate_a` | Cổng Đông | (142,-64,-71) → (144,-40,-69) |
| `war_gate_b` | Cổng Tây | (-129,-64,-67) → (-127,-40,-65) |
| `war_gate_c` | Cổng Nam | (7,-64,-149) → (9,-40,-147) |
| `war_gate_d` | Cổng Bắc | (141,-64,85) → (143,-40,87) |

Config `gang/config.yml` `war.gates` đã thêm `gate_d`.

Còn lại ops: `/gang war setspawn` + `/gang war setexit`.

## TODO CorePlugin — cooldown title

WorldGuard **không** hỗ trợ cooldown title. Đi ra/vào liên tục sẽ spam.

| | |
| --- | --- |
| **Event** | Player vào / ra region `spawn_safe` (`world_pvp`) |
| **Điều kiện** | Chưa hiện title cùng loại (enter/leave) trong **X giây** (gợi ý 3–5s) |
| **Hành động** | Hiện title giữa màn hình; còn cooldown thì bỏ qua |
| **Sau khi ship** | Xóa `greeting-title` / `farewell-title` trên region WG (tránh hiện 2 lần) |

**Không** làm bằng Skript — viết vào CorePlugin khi có thời gian.
