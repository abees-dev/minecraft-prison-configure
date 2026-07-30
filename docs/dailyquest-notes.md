# DailyQuest (CorePlugin) — audit & gap

Cập nhật: 2026-07-31. Lối chơi: [`loi-choi.md`](loi-choi.md) §6.2 A · Config runtime: `plugins/CorePlugin/dailyquest/`.

## Đã có (code + config)

| Phần | Trạng thái |
| --- | --- |
| Daily / weekly quest + claim GUI | OK |
| Check-in + streak + calendar GUI | OK |
| Clear-all bonus **daily + weekly** | OK |
| Objective: `LOGIN`, `CHECKIN`, `BREAK_BLOCK`, `KILL_MOB`, `CRAFT_ITEM`, `CUSTOM` | OK |
| `KILL_MOB` filter Mythic internal name | OK |
| `worlds:` gate trên từng quest | OK |
| Reward: `vault-money`, `mmoitem`, `mmocore-exp`, `crate`, `crate-key`, `player-points`, `command` | OK |
| `DailyQuestAPI.addProgress` + `/dailyquest admin progress` | OK |
| SQLite / MySQL + TZ `Asia/Ho_Chi_Minh` | OK |
| PAPI `%core_dailyquest_*%` | OK |

**Không làm `SELL`:** đã chốt — daily = login / điểm danh / đào / giết.

## Config hiện tại (2026-07-31)

| File | Nội dung chính |
| --- | --- |
| `quests/daily.yml` | Login · checkin · đào 800 (`world_prison`) · giết 25 (`world_dungeon` + `world_magadungeon`). Clear-all: chìa trang sức free + Point + đá CH |
| `quests/weekly.yml` | Đào 8k · giết 120 · giết 200. Clear-all: **chìa Long Tộc** (+ Point) |
| `checkin.yml` | Streak 3/7/14/30 — `crate-key` / `player-points` / đá thật |
| `config.yml` | `integrations.playerpoints: true` |
| `gui.yml` | Clear-all slot daily **và** weekly = 47 |
| `messages.yml` | Clear-all theo `%period%` + admin progress |

Reload: `/dailyquest reload` (đổi `storage.type` vẫn cần restart).

## Ghi chú vận hành

- `crate-key` dùng `key:` (chìa); `crate` dùng `crate:` (hòm) — server này thưởng chìa.
- `CRAFT_ITEM` vẫn chỉ vanilla — đừng config cho NPC MMOItems.
- Quest kill chỉ đếm trong dungeon worlds — giết mob ngoài (hub/farm lẻ) không tính.
- Muốn quest boss cụ thể: `filter: PRISON_TAN_BINH_BOSS` (hoặc id Mythic khác).

## Smoke test

1. Join → LOGIN claim.  
2. `/checkin` → streak + CHECKIN progress.  
3. Đào `world_prison` → MINE; đào ngoài mỏ → **không** tăng.  
4. Giết mob `world_dungeon` → KILL; hub → không.  
5. Clear-all daily → chìa `chia_khoa_trang_suc_free`.  
6. Claim hết weekly → clear-all → chìa `chia_khoa_long_toc`.
