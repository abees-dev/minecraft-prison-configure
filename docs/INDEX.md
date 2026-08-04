# Mục lục tài liệu server (docs)

Cập nhật: 2026-08-04 (Chunky pregen).

Đọc **lối chơi trước**, rồi mới docs vận hành/kỹ thuật theo từng hệ.

---

## Nguồn chuẩn (đọc trước)

| File | Vai trò |
| --- | --- |
| [`loi-choi.md`](loi-choi.md) | **Lối chơi người chơi** — journey, 3 trục đào/chiến/bang, KOTH+PvP bang, endgame, engagement, roadmap P0–P2 |
| [`../plugins/CorePlugin/gang/README.md`](../plugins/CorePlugin/gang/README.md) | Bang Hội — lệnh, vault/bank, upgrade, quest, KOTH, config |
| [`prison-rpg-plan.md`](prison-rpg-plan.md) | Roadmap kỹ thuật / phase plugin (lịch sử dựng server) |
| [`../DOCS_HE_THONG_PRISON.md`](../DOCS_HE_THONG_PRISON.md) | Sell multipliers EconomyShopGUI + VIP + trạng thái X-Prison enchants |
| [`../STAT_BALANCING_STANDARD.md`](../STAT_BALANCING_STANDARD.md) | Quy chuẩn cân bằng chỉ số F2P (vũ khí/giáp/ngọc/skill) |

---

## Prison / kinh tế / cuốc

| File | Vai trò |
| --- | --- |
| [`nguyet-huyet-notes.md`](nguyet-huyet-notes.md) | Đêm Nguyệt Huyết — lịch T7 + boss Bá Tước |
| [`dailyquest-notes.md`](dailyquest-notes.md) | Daily/Weekly quest **cá nhân** CorePlugin — tách quest bang |
| [`hologram-guide-notes.md`](hologram-guide-notes.md) | Hologram hướng dẫn member — GuideHub / GuidePrison |
| [`battlepass-daily-notes.md`](battlepass-daily-notes.md) | BattlePass daily — thử nghiệm cũ; thay bằng CorePlugin DailyQuest |
| [`economy-phase6-notes.md`](economy-phase6-notes.md) | Phase 6 cân bằng sell / rank / prestige (2026-07-29) |
| [`xprison-config-notes.md`](xprison-config-notes.md) | Ghi chú chuyển Prison → X-Prison, modules, việc in-game |
| [`pickaxe-upgrade-notes.md`](pickaxe-upgrade-notes.md) | Bảng số cuốc + tỷ lệ forge (NPC station = chuẩn UX) |
| [`README.md`](README.md) | Ops MMOItems: lệnh give, NPC trạm tinh luyện/rèn, tỷ lệ nâng cấp |
| [`chunky-pregen-notes.md`](chunky-pregen-notes.md) | Chunky 1.3.146 — pregen world / prison / dungeon (radius + lệnh ops) |

---

## Combat / dungeon / boss

| File | Vai trò |
| --- | --- |
| [`SPAWNER_LIST.md`](SPAWNER_LIST.md) | Danh sách spawner theo rank + trạng thái tọa độ |
| [`SPAWNER_POSITION_GUIDE.md`](SPAWNER_POSITION_GUIDE.md) | Cách set vị trí spawner |
| [`HUONG_DAN_DROPS_VA_EXP_NHATU.md`](HUONG_DAN_DROPS_VA_EXP_NHATU.md) | Drop & EXP nhà tù |
| [`HUONG_DAN_GAN_SKIN_DISGUISE_CHO_MOB.md`](HUONG_DAN_GAN_SKIN_DISGUISE_CHO_MOB.md) | Skin/disguise MythicMobs |
| [`npc-huy-hieu-trieu-hoi-notes.md`](npc-huy-hieu-trieu-hoi-notes.md) | NPC chế Huy Hiệu → Ma Vương |
| [`USED_SKINS_DOCS.md`](USED_SKINS_DOCS.md) | Skin đã dùng |

---

## Trang bị / craft / NPC

| File | Vai trò |
| --- | --- |
| [`npc-duclo-cuonghoa-notes.md`](npc-duclo-cuonghoa-notes.md) | NPC Đục lỗ & Cường hóa |
| [`npc-equipment-upgrade-station-notes.md`](npc-equipment-upgrade-station-notes.md) | Trạm đá cường hóa |
| [`npc-trade-donate-stations-notes.md`](npc-trade-donate-stations-notes.md) | Trade / donate Long Tộc |
| [`crate-thien-gioi-notes.md`](crate-thien-gioi-notes.md) | Hòm Thiên Giới — Point shop, weight 615, pity 10→NL |
| [`give-thien-gioi.md`](give-thien-gioi.md) | Lệnh give pool Hòm Thiên Giới (không `/`) |
| [`crate-long-toc-notes.md`](crate-long-toc-notes.md) | Hòm Long Tộc — weight 270, giữ pool + MS 25/90 |
| [`crate-trang-suc-free-notes.md`](crate-trang-suc-free-notes.md) | Hòm Trang Sức Free — weight 175, giữ pool + MS 10/30 |
| [`crate-ngoc-notes.md`](crate-ngoc-notes.md) | Hệ hòm ngọc — hub + 10 màu, weight Lv integer, gộp tong_hop |
| [`crates-refactor-plan.md`](crates-refactor-plan.md) | Plan crates — **xong** TG / Long Tộc / Free / Ngọc |
| [`npc-weapon-forge-stations-notes.md`](npc-weapon-forge-stations-notes.md) | Lò rèn vũ khí theo mine (station + lệnh NPC, chưa đặt) |
| [`ITEM_CLASSIFICATION_GUIDE.md`](ITEM_CLASSIFICATION_GUIDE.md) | Phân loại item |
| [`pet-system-notes.md`](pet-system-notes.md) | Pet TRADE/DONATE — catalog chỉ số; phụ trợ đào TODO CorePlugin |
| [`STAT_ABBREVIATIONS.md`](STAT_ABBREVIATIONS.md) | Viết tắt chỉ số trên lore |
| [`STAT_BALANCING_GUIDE.md`](STAT_BALANCING_GUIDE.md) | Trần chỉ số item donate / gacha (Non-P2W) |

---

## Quy ước nguồn sự thật

1. **Lối chơi / ưu tiên làm gì:** `loi-choi.md` (+ Bang Hội: `plugins/CorePlugin/gang/README.md`)
2. **Sell & multiplier:** `DOCS_HE_THONG_PRISON.md` + EconomyShopGUI config (không phải X-Prison autosell); Sell All bang = CorePlugin vault
3. **Chỉ số F2P:** `STAT_BALANCING_STANDARD.md`
4. **Trần donate:** `STAT_BALANCING_GUIDE.md`
5. **Stack prison sống:** **X-Prison** — `plugins/Prison/` là legacy, không phải lối chơi; **không** dùng X-Prison gangs

Khi docs mâu thuẫn config sống, **sửa docs** (hoặc ghi rõ “deprecated”) — không để ops làm theo số liệu cũ.
