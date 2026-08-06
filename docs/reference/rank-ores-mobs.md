# Prison Rank — Ore & Mob Reference (DailyQuest)

> Nguồn: `docs/systems/xprison.md` §7 (mine composition), `plugins/CorePlugin/prison/config.yml`, `plugins/MythicMobs/mobs/prison_rank_mobs.yml`, `plugins/MMOItems/crafting-stations/refinery-*.yml`, `docs/reference/spawners.md`.
>
> Dùng để thiết kế DailyQuest theo rank player.
> **Ore quest phải khớp block trong X-Prison mine** — không dùng bảng theme cũ (copper/deepslate…).

---

## 1. 9 Rank Prison

| # | Slug | Display | WG region | World mỏ | LuckPerms |
| ---: | --- | --- | --- | --- | --- |
| 1 | `TAN_BINH` | Tân Binh | `tan_binh` | `world_prison` | `xprison_rank_1` |
| 2 | `TU_NHAN` | Tù Nhân | `tu_nhan` | `world_prison` | `xprison_rank_2` |
| 3 | `LAO_CONG` | Lao Công | `lao_cong` | `world_prison` | `xprison_rank_3` |
| 4 | `THO_DAO` | Thợ Đào | `tho_dao` | `world_prison` | `xprison_rank_4` |
| 5 | `DOI_TRUONG` | Đội Trưởng | `doi_truong` | `world_prison` | `xprison_rank_5` |
| 6 | `PHO_QUAN_NGUC` | Phó Quản Ngục | `pho_quan_nguc` | `world_prison` | `xprison_rank_6` |
| 7 | `QUAN_NGUC` | Quản Ngục | `quan_nguc` | `world_prison` | `xprison_rank_7` |
| 8 | `BA_CHU_NGUC_TU` | Bá Chủ Ngục Tù | `ba_chu_nguc_tu` | `world_prison` | `xprison_rank_8` |
| 9 | `VUOT_NGUC` | Vượt Ngục | `vuot_nguc` | `world_prison` | `xprison_rank_9` |

### Item ID theo rank

| Rank | Đá nâng cấp (`DA_NANG_CAP`) | Quặng tinh luyện (`NEN_DOI`) |
| ---: | --- | --- |
| 1 | `DA_NANG_CAP_TAN_BINH` | `NEN_DOI_TAN_BINH` |
| 2 | `DA_NANG_CAP_TU_NHAN` | `NEN_DOI_TU_NHAN` |
| 3 | `DA_NANG_CAP_LAO_CONG` | `NEN_DOI_LAO_CONG` |
| 4 | `DA_NANG_CAP_THO_DAO` | `NEN_DOI_THO_DAO` |
| 5 | `DA_NANG_CAP_DOI_TRUONG` | `NEN_DOI_DOI_TRUONG` |
| 6 | `DA_NANG_CAP_PHO_QUAN_NGUC` | `NEN_DOI_PHO_QUAN_NGUC` |
| 7 | `DA_NANG_CAP_QUAN_NGUC` | `NEN_DOI_QUAN_NGUC` |
| 8 | `DA_NANG_CAP_BA_CHU_NGUC_TU` | `NEN_DOI_BA_CHU_NGUC_TU` |
| 9 | `DA_NANG_CAP_VUOT_NGUC` | `NEN_DOI_VUOT_NGUC` + `NEN_BA_VUOT_NGUC` |

---

## 2. Ore / Block theo rank (X-Prison mine — nguồn đúng)

Composition live từ `docs/systems/xprison.md` §7. Dùng làm `BREAK_BLOCK` `filter:` + `worlds: [world_prison]`.

| # | Mine slug | Rank | Block (tỉ lệ %) | Filter quest gợi ý (top 2) |
| ---: | --- | --- | --- | --- |
| 1 | `tan_binh` | Tân Binh | `STONE` 60, `COBBLESTONE` 30, `COAL_ORE` 10 | `STONE`, `COBBLESTONE` |
| 2 | `tu_nhan` | Tù Nhân | `STONE` 50, `COAL_ORE` 30, `IRON_ORE` 20 | `STONE`, `COAL_ORE` |
| 3 | `lao_cong` | Lao Công | `IRON_ORE` 40, `COAL_ORE` 30, `GOLD_ORE` 20, `LAPIS_ORE` 10 | `IRON_ORE`, `COAL_ORE` |
| 4 | `tho_dao` | Thợ Đào | `GOLD_ORE` 35, `LAPIS_ORE` 25, `REDSTONE_ORE` 25, `DIAMOND_ORE` 15 | `GOLD_ORE`, `LAPIS_ORE` |
| 5 | `doi_truong` | Đội Trưởng | `REDSTONE_ORE` 30, `DIAMOND_ORE` 30, `EMERALD_ORE` 25, `IRON_ORE` 15 | `REDSTONE_ORE`, `DIAMOND_ORE` |
| 6 | `pho_quan_nguc` | Phó Quản Ngục | `DIAMOND_ORE` 35, `EMERALD_ORE` 35, `GOLD_ORE` 20, `NETHER_GOLD_ORE` 10 | `DIAMOND_ORE`, `EMERALD_ORE` |
| 7 | `quan_nguc` | Quản Ngục | `EMERALD_ORE` 35, `DIAMOND_ORE` 30, `NETHER_QUARTZ_ORE` 20, `ANCIENT_DEBRIS` 15 | `EMERALD_ORE`, `DIAMOND_ORE` |
| 8 | `ba_chu_nguc_tu` | Bá Chủ Ngục Tù | `ANCIENT_DEBRIS` 35, `EMERALD_ORE` 35, `DIAMOND_ORE` 30 | `ANCIENT_DEBRIS`, `EMERALD_ORE` |
| 9 | `vuot_nguc` | Vượt Ngục | `ANCIENT_DEBRIS` 50, `EMERALD_ORE` 25, `DIAMOND_ORE` 25 | `ANCIENT_DEBRIS`, `EMERALD_ORE` |

> **Không dùng** deepslate / copper theme cũ — mine X-Prison không có các block đó.

### Block tinh luyện (`refinery-*.yml`) — sink craft, không phải block trong mỏ

| Rank | Station | Block → 1 `NEN_DOI` |
| ---: | --- | --- |
| 1 | `refinery-rookie` | `SMOOTH_STONE`×6 / `COBBLESTONE`×24 / `COAL_BLOCK`×3 |
| 2 | `refinery-prisoner` | `SMOOTH_STONE`×10 / `COAL_BLOCK`×5 / `IRON_BLOCK`×4 |
| 3 | `refinery-worker` | `IRON_BLOCK`×5 / `COAL_BLOCK`×6 / `GOLD_BLOCK`×4 / `LAPIS_BLOCK`×4 |
| 4 | `refinery-miner` | `GOLD_BLOCK`×5 / `LAPIS_BLOCK`×6 / `REDSTONE_BLOCK`×5 / `DIAMOND_BLOCK`×4 |
| 5 | `refinery-captain` | `REDSTONE_BLOCK`×6 / `DIAMOND_BLOCK`×5 / `EMERALD_BLOCK`×4 / `IRON_BLOCK`×10 |
| 6 | `refinery-vice-warden` | `DIAMOND_BLOCK`×6 / `EMERALD_BLOCK`×6 / `GOLD_BLOCK`×10 / `GOLD_INGOT`×36 |
| 7 | `refinery-warden` | `EMERALD_BLOCK`×7 / `DIAMOND_BLOCK`×7 / `QUARTZ_BLOCK`×10 / `ANCIENT_DEBRIS`×5 |
| 8 | `refinery-overlord` | `NETHERITE_BLOCK`×3 / `EMERALD_BLOCK`×10 / `DIAMOND_BLOCK`×10 / `ANCIENT_DEBRIS`×8 |
| 9 | `refinery-jailbreak` | `NETHERITE_BLOCK`×4 / `EMERALD_BLOCK`×12 / `DIAMOND_BLOCK`×12 / `ANCIENT_DEBRIS`×6 |

---

## 3. Mob Mythic theo rank

File: `plugins/MythicMobs/mobs/prison_rank_mobs.yml`

| Rank | Normal ID | Elite ID | Boss ID | World |
| ---: | --- | --- | --- | --- |
| 1 | `PRISON_TAN_BINH_NORMAL` | `PRISON_TAN_BINH_ELITE` | `PRISON_TAN_BINH_BOSS` | `world_dungeon` |
| 2 | `PRISON_TU_NHAN_NORMAL` | `PRISON_TU_NHAN_ELITE` | `PRISON_TU_NHAN_BOSS` | `world_dungeon` |
| 3 | `PRISON_LAO_CONG_NORMAL` | `PRISON_LAO_CONG_ELITE` | `PRISON_LAO_CONG_BOSS` | `world_dungeon` |
| 4 | `PRISON_THO_DAO_NORMAL` | `PRISON_THO_DAO_ELITE` | `PRISON_THO_DAO_BOSS` | `world_dungeon` |
| 5 | `PRISON_DOI_TRUONG_NORMAL` | `PRISON_DOI_TRUONG_ELITE` | `PRISON_DOI_TRUONG_BOSS` | `world_dungeon` |
| 6 | `PRISON_PHO_QUAN_NGUC_NORMAL` | `PRISON_PHO_QUAN_NGUC_ELITE` | `PRISON_PHO_QUAN_NGUC_BOSS` | `world_magadungeon` |
| 7 | `PRISON_QUAN_NGUC_NORMAL` | `PRISON_QUAN_NGUC_ELITE` | `PRISON_QUAN_NGUC_BOSS` | `world_magadungeon` |
| 8 | `PRISON_BA_CHU_NGUC_TU_NORMAL` | `PRISON_BA_CHU_NGUC_TU_ELITE` | `PRISON_BA_CHU_NGUC_TU_BOSS` | `world_magadungeon` |
| 9 | `PRISON_VUOT_NGUC_NORMAL` | `PRISON_VUOT_NGUC_ELITE` | `PRISON_VUOT_NGUC_BOSS` | `world_magadungeon` |

### Chi tiết Normal / Elite / Boss

| Rank | Tier | Display | Type | HP | DMG |
| ---: | --- | --- | --- | ---: | ---: |
| 1 | Normal | Tân Binh Nổi Loạn | ZOMBIE | 17 | 9 |
| 1 | Elite | Tân Binh Cuồng Nộ [Elite] | ZOMBIE | 34 | 14 |
| 1 | Boss | [BOSS] Đầu Sỏ Tân Binh | ZOMBIE | 143 | 20 |
| 2 | Normal | Tù Nhân Lang Thang | ZOMBIE | 27 | 10 |
| 2 | Elite | Tù Nhân Hung Hãn [Elite] | ZOMBIE | 54 | 16 |
| 2 | Boss | Trùm Tù Nhân [Boss] | HUSK | 225 | 23 |
| 3 | Normal | Lao Công Kiệt Sức | HUSK | 40 | 13 |
| 3 | Elite | Lao Công Điên Loạn [Elite] | HUSK | 79 | 20 |
| 3 | Boss | Đốc Công Lao Công [Boss] | HUSK | 330 | 29 |
| 4 | Normal | Thợ Đào Lạc Lối | HUSK | 54 | 16 |
| 4 | Elite | Thợ Đào Cuồng Đá [Elite] | HUSK | 108 | 24 |
| 4 | Boss | Trưởng Nhóm Thợ Đào [Boss] | DROWNED | 450 | 34 |
| 5 | Normal | Đội Trưởng Phản Loạn | VINDICATOR | 144 | 32 |
| 5 | Elite | Đội Trưởng Tinh Nhuệ [Elite] | VINDICATOR | 288 | 52 |
| 5 | Boss | Đại Đội Trưởng [Boss] | VINDICATOR | 1200 | 76 |
| 6 | Normal | Lính Canh Phó Quản Ngục | PILLAGER | 189 | 38 |
| 6 | Elite | Cận Vệ Phó Quản Ngục [Elite] | VINDICATOR | 378 | 59 |
| 6 | Boss | Phó Quản Ngục [Boss] | VINDICATOR | 1575 | 86 |
| 7 | Normal | Lính Canh Quản Ngục | WITHER_SKELETON | 243 | 43 |
| 7 | Elite | Cận Vệ Quản Ngục [Elite] | WITHER_SKELETON | 486 | 67 |
| 7 | Boss | Quản Ngục Tối Cao [Boss] | WITHER_SKELETON | 2025 | 96 |
| 8 | Normal | Thủ Hạ Bá Chủ | WITHER_SKELETON | 311 | 45 |
| 8 | Elite | Cận Vệ Bá Chủ [Elite] | WITHER_SKELETON | 621 | 72 |
| 8 | Boss | Bá Chủ Ngục Tù [Boss] | PIGLIN_BRUTE | 2590 | 104 |
| 9 | Normal | Kẻ Vượt Ngục | PIGLIN_BRUTE | 392 | 50 |
| 9 | Elite | Kẻ Vượt Ngục Liều Lĩnh [Elite] | PIGLIN_BRUTE | 784 | 79 |
| 9 | Boss | Trùm Vượt Ngục Tối Thượng [Boss] | RAVAGER | 3260 | 114 |

### Endgame (ngoài 9 rank)

| ID | Display | Type | World | Ghi chú |
| --- | --- | --- | --- | --- |
| `PRISON_MA_VUONG_BOSS` | Ma Vương Ngục Tù | RAVAGER | `world_magadungeon` | Triệu hồi qua bàn thờ + `HUY_HIEU_TRIEU_HOI` |

---

## 4. STATION_CRAFT (tinh luyện đá tại NPC)

| Rank | `mmoitems-id` | Daily target gợi ý | Weekly target gợi ý |
| ---: | --- | ---: | ---: |
| 1 | `DA_NANG_CAP_TAN_BINH` | 8 | 24 |
| 2 | `DA_NANG_CAP_TU_NHAN` | 8 | 24 |
| 3 | `DA_NANG_CAP_LAO_CONG` | 8 | 28 |
| 4 | `DA_NANG_CAP_THO_DAO` | 10 | 28 |
| 5 | `DA_NANG_CAP_DOI_TRUONG` | 10 | 32 |
| 6 | `DA_NANG_CAP_PHO_QUAN_NGUC` | 10 | 32 |
| 7 | `DA_NANG_CAP_QUAN_NGUC` | 12 | 36 |
| 8 | `DA_NANG_CAP_BA_CHU_NGUC_TU` | 12 | 36 |
| 9 | `DA_NANG_CAP_VUOT_NGUC` | 12 | 40 |

```yaml
type: STATION_CRAFT
target: 8
filter: ''
mmoitems-type: MATERIAL
mmoitems-id: DA_NANG_CAP_TAN_BINH
```

Station: `refinery-*.yml` — đếm item **kết quả** craft tại MMOItems station (không phải vanilla `CRAFT_ITEM`).

---

## 5. Gợi ý filter DailyQuest

```yaml
# Đào theo rank (vd Tân Binh — block có trong mine tan_binh)
type: BREAK_BLOCK
filter: STONE                # hoặc COBBLESTONE / COAL_ORE
worlds:
  - world_prison

# Giết mob theo rank (vd Normal Tân Binh)
type: KILL_MOB
filter: PRISON_TAN_BINH_NORMAL   # Mythic internal name
worlds:
  - world_dungeon                # rank 1–5
  # - world_magadungeon          # rank 6–9

# Giết mọi mob trong dungeon rank (không filter Mythic id)
type: KILL_MOB
filter: ''
worlds:
  - world_dungeon
```

---

## 6. Lưu ý thiết kế quest theo rank

- Assignment theo rank: `rank: N` trên quest + `config.yml` `assignment.*` (pool random theo X-Prison rank).
- Ore filter **phải** nằm trong composition mine tương ứng (`xprison.md` §7).
- PlayerPoints: daily tối đa **5p/ngày**, weekly tối đa **15p/tuần** (quests + clear-all).
