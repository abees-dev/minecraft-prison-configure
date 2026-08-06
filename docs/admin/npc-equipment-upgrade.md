# NPC cho bàn ghép đá (cường hóa + đục lỗ)

Station: `plugins/MMOItems/crafting-stations/equipment-upgrade-station.yml` — 1 station duy nhất
gồm ghép đá cường hóa vũ khí/giáp, đá Thiên Mệnh, và mũi khoan đục lỗ. Layout `instant`
(nhiều ô công thức, hàng chờ tối thiểu 1 ô vì craft tức thì).

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
- Station `socket-stone-exchange` đã gộp vào đây; NPC Thợ Rèn Đục Lỗ không còn dùng.
