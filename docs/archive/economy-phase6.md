# Phase 6 — cân bằng kinh tế (2026-07-29)

Cập nhật: 2026-07-29 — sell Phase 6 / soft-launch nerf trên `Ores.yml`.  
**2026-08-01:** EconomyShopGUI `enable-sell-multipliers: false`; multiplier bán chỉ Bang Hội; `gang/config.yml` `sell-prices` đồng bộ giá base `Ores.yml` — xem [`DOCS_HE_THONG_PRISON.md`](../../DOCS_HE_THONG_PRISON.md).

## Vấn đề trước khi chỉnh

| Hiện tượng | Chi tiết |
| --- | --- |
| Rank 6→9 quá dễ | Cost chỉ ×1.3–1.5 trong khi mỏ full emerald/debris → ~5k block/rank |
| Prestige cliff | 3B money ≈ 47× cost rank 9 → ~100h+ sell thuần |
| GOLD_NUGGET lệch | Sell **750** > RAW_GOLD **500** → mỏ nether-gold (rank 6) overpay |
| Docs cũ | `xprison-config-notes` / `pickaxe-upgrade-notes` lệch số live |

## Thay đổi đã áp dụng

### 1. Sell prices — `plugins/EconomyShopGUI/shops/Ores.yml`

| Material | Cũ | Mới |
| --- | ---: | ---: |
| GOLD_NUGGET | 750 | **60** |
| RAW_GOLD | 500 | **400** |
| GOLD_INGOT | 1,000 | **800** |
| GOLD_BLOCK | 9,000 | **7,200** |
| DIAMOND | 5,000 | **3,200** |
| DIAMOND_BLOCK | 45,000 | **28,800** |
| EMERALD | 8,000 | **4,500** |
| EMERALD_BLOCK | 72,000 | **40,500** |
| ANCIENT_DEBRIS | 10,000 | **5,500** |
| NETHERITE_INGOT | 44,000 | **28,000** |
| NETHERITE_BLOCK | 396,000 | **252,000** |

Early (cobble/coal/iron/lapis/redstone) **không đổi**.

### 2. Rank costs — `plugins/X-Prison/ranks.yml`

| Rank | Cost cũ | Cost mới |
| ---: | ---: | ---: |
| 1–6 | giữ nguyên | 0 / 85k / 290k / 1.075M / 5.4M / 21.7M |
| 7 Quản Ngục | 32M | **55M** |
| 8 Bá Chủ | 43.5M | **125M** |
| 9 Vượt Ngục | 64.5M | **300M** |

### 3. Prestige — `plugins/X-Prison/prestiges.yml`

| | Cũ | Mới |
| --- | ---: | ---: |
| First prestige cost | 3,000,000,000 | **750,000,000** |
| Increase | ×1.3 / prestige | giữ |

### 4. Point rankup — `plugins/Skript/scripts/prison/level_gate.sk`

Đồng bộ ≈ money / 10,000 cho rank 7–9: **5500 / 12500 / 30000**.

## Mục tiêu cảm giác (ước lượng, không fortune, ~2k block/h)

- Early–mid (1→6): ~1–4h / rank (giữ)
- Late (6→9): ~4–10h / rank (trước đó ~2–3h)
- Prestige 1: ~20–40h sell grind (trước đó ~100h+)

### 5. Refinery — `plugins/MMOItems/crafting-stations/refinery-*.yml` (2026-07-30)

Cân bằng lại block→NÊN và NÊN→ĐÁ theo rank; bổ sung Gold Ingot (rank 6 / nether gold), Ancient Debris (rank 8–9). Rank 9: `NEN_DOI`×6 → `NEN_BA`, `NEN_BA`×4 → ĐÁ (= **24** NÊN/ĐÁ, trước đó 72). Bảng chi tiết: [`README.md`](../README.md) § Recipe Tinh Luyện.

**Forge** (chi phí ĐÁ/NÊN nâng cúp–giáp–vũ khí) **chưa đụng** — chỉ sink qua tinh luyện.

## Reload in-game

```
/mi reload
/sreload
/xprison reload
sk reload prison/level_gate.sk
```

(hoặc `sk reload prison/`)

Test bằng tài khoản **không OP** (OP bị multiplier LEGEND x3).

## Soft-launch follow-up — nerf late sell (2026-07-30)

Chỉ chỉnh diamond / emerald / debris / netherite (~30–35%). Early–mid không đổi.

| Material | Phase 6 | Mới |
| --- | ---: | ---: |
| DIAMOND | 3,200 | **2,200** |
| DIAMOND_BLOCK | 28,800 | **19,800** |
| EMERALD | 4,500 | **3,000** |
| EMERALD_BLOCK | 40,500 | **27,000** |
| ANCIENT_DEBRIS | 5,500 | **3,800** |
| NETHERITE_INGOT | 28,000 | **12,000** (×2 hạ — multiplier rank/VIP) |
| NETHERITE_BLOCK | 252,000 | **108,000** |

Reload: `/sreload`

## Chưa làm (vòng sau nếu cần)

- Thêm filler stone vào mỏ mid/late (`plugins/X-Prison/mines/*.json`)
- Chỉnh % ore composition
- Nerf/buff recipe **forge** (ĐÁ/NÊN / success-rate)
- Spawn NPC `armor-forge-jailbreak` nếu còn thiếu
- Cập nhật số trong `xprison.md` nếu còn bảng cost cũ
