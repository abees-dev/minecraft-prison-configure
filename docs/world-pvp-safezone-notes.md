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

## Boss Tổng Quản Ngục (`TONG_QUAN_NGUC`)

Cập nhật: 2026-08-05.

| | |
| --- | --- |
| Mythic ID | `TONG_QUAN_NGUC` (khớp `war.boss-mob-id`) |
| Lính triệu hồi | `TONG_QUAN_NGUC_LINH` (không drop) |
| File | [`plugins/MythicMobs/mobs/tong_quan_nguc.yml`](../plugins/MythicMobs/mobs/tong_quan_nguc.yml) |
| Skills | [`plugins/MythicMobs/skills/tong_quan_nguc_skills.yml`](../plugins/MythicMobs/skills/tong_quan_nguc_skills.yml) |
| HP / DMG | 9000 / 105 — raid 3 phase |
| Điểm war | CorePlugin `boss-kill-points: 100` khi kill trong trận ACTIVE |
| Drop | Không (tránh farm ngoài trận) |

**Phase:** 1 luôn → 2 dưới 65% HP → 3 dưới 30% HP (telegraph trước đòn mạnh).

### Spawn thủ công (bản hiện tại)

CorePlugin **không** tự spawn boss. Trong trận ACTIVE, đứng trong `war_arena`:

```
/mm mobs spawn TONG_QUAN_NGUC
```

Test / cleanup:

```
/mm reload
/mm mobs info TONG_QUAN_NGUC
/mm mobs kill TONG_QUAN_NGUC
```

Disguise skin (khi có PNG): copy vào `plugins/LibsDisguises/Skins/tongquannguc.png` →  
`/savedisguise tongquannguc player <inherit> setskin tongquannguc.png setDynamicName` →  
bỏ comment `Disguise: tongquannguc` trong mob YAML → `/mm reload`.

### TODO CorePlugin — tự spawn boss và lính war

CorePlugin hiện chỉ nhận kill `TONG_QUAN_NGUC`; chưa tự spawn và chưa cộng
điểm khi giết `TONG_QUAN_NGUC_LINH`. Logic mới phải chạy **chỉ khi phase
Bang Chiến là ACTIVE**.

#### Config đề xuất

```yaml
war:
  mobs:
    gate-selection: RANDOM_HELD
    spawn-offset-y: 1.0
    soldiers:
      enabled: true
      mob-id: TONG_QUAN_NGUC_LINH
      interval-seconds: 30
      amount-per-wave: 4
      kill-points: 3
      max-alive: 24
    boss:
      enabled: true
      mob-id: TONG_QUAN_NGUC
      interval-seconds: 300
      spawn-at-match-start: true
      max-alive: 1
      kill-points: 100
```

`boss-kill-points` / `boss-mob-id` cũ nên được migrate hoặc giữ làm fallback;
không duy trì hai nguồn config có thể mâu thuẫn.

#### Chọn cổng spawn

1. Lấy các gate có **bang đang giữ** (không tính `EMPTY` hoặc `CONTESTED`).
2. Chọn ngẫu nhiên **một** gate trong danh sách (`RANDOM_HELD`).
3. Spawn tại tâm region WorldGuard:
   - `x = (minX + maxX) / 2 + 0.5`
   - `z = (minZ + maxZ) / 2 + 0.5`
   - `y = highest safe block tại x/z + spawn-offset-y`
4. Nếu chưa có gate nào được giữ: **bỏ wave**, không fallback về `war setspawn`.
5. Kiểm tra vị trí không nằm trong block đặc/lava; tìm safe Y gần nhất trước khi
   spawn.

Mỗi tick spawn chọn lại gate. Boss và lính không bắt buộc xuất hiện cùng một
cổng. Nếu cổng đổi chủ sau khi spawn, mob đang sống không teleport theo.

#### Nhịp spawn

| Mob | Khi spawn | Số lượng / giới hạn |
| --- | --- | --- |
| Lính `TONG_QUAN_NGUC_LINH` | Mỗi **30 giây** | 4 con/wave; tối đa 24 lính war sống |
| Boss `TONG_QUAN_NGUC` | Ngay khi ACTIVE và mỗi **5 phút** | Tối đa 1 boss sống |

- Timer bắt đầu khi countdown chuyển sang ACTIVE, không tính thời gian countdown.
- Boss spawn đầu trận cũng phải đợi có gate được giữ. Nếu chưa có, thử lại ở tick
  scheduler kế tiếp thay vì đánh dấu mốc đã hoàn thành.
- Đến mốc boss mới mà boss cũ còn sống: **skip**, không xếp hàng nhiều boss.
- Lính spawn nhanh hơn và nhiều hơn boss; `max-alive` chống tích tụ gây lag.

#### Tính điểm kill

Event: MythicMobs mob death / Bukkit `EntityDeathEvent`, lấy Mythic internal ID
và `LivingEntity#getKiller()`.

| Mythic ID | Điểm |
| --- | --- |
| `TONG_QUAN_NGUC_LINH` | **+3 điểm** cho bang killer |
| `TONG_QUAN_NGUC` | **+100 điểm** cho bang killer |

Chỉ cộng khi:

- Match đang ACTIVE.
- Killer đã join match hiện tại, còn sống, không trong trạng thái respawn/eliminated.
- Mob có metadata/tag chứa `matchId` hiện tại và được scheduler war spawn; mob admin
  spawn thủ công ngoài flow không được tính.
- Sau khi cộng: broadcast/actionbar phù hợp, refresh bossbar và gọi cùng
  `checkWinPoints` như kill player/boss hiện tại.

#### Tracking và cleanup

- Khi spawn, gắn PersistentDataContainer hoặc metadata:
  `gangWarMob=true`, `matchId`, `mobRole=BOSS|SOLDIER`.
- Theo dõi UUID boss/lính theo match; loại UUID khi death/despawn.
- `/gang war stop`, hết giờ, đạt điểm thắng hoặc last-standing:
  cancel scheduler và remove toàn bộ boss/lính có `matchId` của trận đó.
- Reload config giữa trận phải reschedule an toàn, không nhân đôi task.
- Không làm bằng Skript — logic thuộc CorePlugin.

## TODO CorePlugin — cooldown title

WorldGuard **không** hỗ trợ cooldown title. Đi ra/vào liên tục sẽ spam.

| | |
| --- | --- |
| **Event** | Player vào / ra region `spawn_safe` (`world_pvp`) |
| **Điều kiện** | Chưa hiện title cùng loại (enter/leave) trong **X giây** (gợi ý 3–5s) |
| **Hành động** | Hiện title giữa màn hình; còn cooldown thì bỏ qua |
| **Sau khi ship** | Xóa `greeting-title` / `farewell-title` trên region WG (tránh hiện 2 lần) |

**Không** làm bằng Skript — viết vào CorePlugin khi có thời gian.
