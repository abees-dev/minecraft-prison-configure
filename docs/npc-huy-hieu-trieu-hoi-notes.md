# Note: NPC cho Bàn Chế Huy Hiệu Triệu Hồi (huy-hieu-trieu-hoi)

Station: `plugins/MMOItems/crafting-stations/huy-hieu-trieu-hoi.yml` — 1 recipe duy nhất, chế
`HUY_HIEU_TRIEU_HOI` (huy hiệu hoàn chỉnh, dùng ở bàn thờ triệu hồi Ma Vương — xem
`plugins/Skript/scripts/demon_king/main.sk`) từ `MANH_HUY_HIEU_TRIEU_HOI` (mảnh vỡ, rớt 40% từ
boss cả 9 rank tù, xem `plugins/MythicMobs/droptables/prison_rank_drops.yml`).

Công thức: **25x Huy Hiệu Vỡ [Mảnh] + 2.500.000 tiền** → 1x Huy Hiệu Triệu Hồi.
(Điều kiện tiền dùng syntax `money{amount=...}` của MMOItems — trừ qua Vault khi craft.)

## Lệnh tạo NPC

```
/npc create &6&lBÀN CHẾ &8• &6&lHUY HIỆU TRIỆU HỒI --type player
/npc command add mi stations open huy-hieu-trieu-hoi <p>
/npc lookclose
/npc hidename
/npc hologram add &6&lBÀN CHẾ &8• &6&lHUY HIỆU TRIỆU HỒI
```

Gợi ý: nên đặt NPC này gần khu vực bàn thờ triệu hồi (`PRISON_MA_VUONG_ALTAR` trong
`plugins/MythicMobs/mobs/altar_mobs.yml`) để player tiện chế xong rồi triệu hồi luôn.
