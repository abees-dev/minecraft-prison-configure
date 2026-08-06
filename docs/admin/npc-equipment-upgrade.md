# NPC cho bàn ghép đá cường hóa

Station: `plugins/MMOItems/crafting-stations/equipment-upgrade-station.yml` (sinh bởi
`plugins/MMOItems/scripts/generate_upgrade_station.js`) — 1 station duy nhất, không tách theo
tier như trade/donate, dùng `layout: default` (có phân trang vì rất nhiều recipe).

## Lệnh tạo NPC

```
/npc create &c&l✪ Ghép Đá --type player
/npc command add mi stations open equipment-upgrade-station <p>
/npc lookclose
/npc hidename
/npc hologram add &c&l✪ Ghép Đá
```

Ghi chú:
- Bỏ phần `(#page#/#max#)` khi đặt tên NPC/hologram — đó chỉ là placeholder hiển thị số trang
  trong tiêu đề GUI, không dùng cho tên NPC.
- Station ID dùng trong lệnh `mi stations open` = tên file yml không có đuôi
  (`equipment-upgrade-station`).
