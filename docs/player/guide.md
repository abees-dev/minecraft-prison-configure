# Cẩm nang chơi AetherMine Prison-RPG

> Trạng thái: **Hướng dẫn người chơi — tính năng đang hoạt động**  
> Cập nhật: 2026-08-08 · Hướng dẫn Bang Hội chi tiết: [`gangs.md`](gangs.md)

Chào mừng đến với AetherMine. Mục tiêu của bạn là đào khoáng, tăng cấp, nâng trang bị và vượt qua 9 cấp bậc nhà tù. Bạn có thể tự phát triển nhân vật hoặc tham gia Bang Hội để cùng đồng đội làm nhiệm vụ, nâng kinh tế và tranh Mỏ VIP.

---

## 1. Bắt đầu trong 10 phút

1. Chọn class phù hợp với lối đánh của bạn.
2. Nhận và trang bị **Cúp Tân Binh I**.
3. Mở `/warp`, đến khu Prison và vào mỏ **Tân Binh**.
4. Đào khoáng tại mỏ đúng cấp bậc.
5. Dùng `/sellgui` để bán khoáng và nhận tiền cá nhân.
6. Mở `/dailyquest` và `/checkin` để nhận nhiệm vụ, điểm danh.
7. Mở `/rank` để xem điều kiện của cấp bậc tiếp theo.
8. Tìm NPC **Tinh Luyện** và **Lò Rèn Cúp** để bắt đầu nâng cuốc.

Nếu chưa biết làm gì tiếp theo, hãy nhớ vòng lặp chính:

```text
Đào khoáng → Bán khoáng → Nâng cuốc → Tăng level → Rankup
                    └→ Dungeon → Trang bị → Ngọc/Cường hóa
```

---

## 2. Ba hướng phát triển

| Hướng | Bạn cần làm gì? | Kết quả |
| --- | --- | --- |
| **Sức đào** | Đào, tinh luyện, nâng cuốc và rankup | Mỏ tốt hơn, thu nhập cao hơn |
| **Sức chiến** | Tăng level, đi dungeon, nâng vũ khí và giáp | Đánh quái, boss và event mạnh hơn |
| **Bang Hội** | Nạp kho, làm quest bang, nâng buff và chiếm KOTH | Phát triển nhanh hơn cùng đồng đội |

Bạn không cần chọn duy nhất một hướng. Ba hướng bổ trợ cho nhau trong suốt quá trình chơi.

---

## 3. Đào, bán và lên rank

### Bán khoáng cá nhân

Dùng `/sellgui` để bán khoáng theo giá cơ bản. Kênh này đưa tiền thẳng vào tài khoản cá nhân và **không có hệ số nhân của Bang Hội**.

Tiền cá nhân thường được dùng để:

- Lên rank.
- Tinh luyện và nâng cấp trang bị.
- Tạo Bang Hội hoặc tham gia một số hoạt động khác.

### Hệ thống 9 rank

| # | Rank | Khoáng đại diện | Level MMOCore cần để lên rank kế |
| ---: | --- | --- | ---: |
| 1 | Tân Binh | Đá cuội | 10 |
| 2 | Tù Nhân | Than | 20 |
| 3 | Lao Công | Đồng | 30 |
| 4 | Thợ Đào | Sắt | 45 |
| 5 | Đội Trưởng | Vàng | 60 |
| 6 | Phó Quản Ngục | Redstone | 75 |
| 7 | Quản Ngục | Lapis | 90 |
| 8 | Bá Chủ Ngục Tù | Kim cương | 100 |
| 9 | Vượt Ngục | Ngọc lục bảo | Endgame |

Mở `/rank` để xem điều kiện hiện tại. Khi đủ tiền và level, dùng `/rankup` hoặc `/xrankup`. Nếu muốn thanh toán bằng Point, dùng `/xrankuppoint`.

> Tiền và Point là hai loại tài nguyên khác nhau. Hãy kiểm tra kỹ phương thức trước khi xác nhận rankup.

---

## 4. Nâng cuốc và tinh luyện

Mỗi rank có bộ Cúp từ **I đến V**. Nâng cuốc giúp tăng tốc độ và hiệu suất khai thác.

Quy trình cơ bản:

1. Đào và giữ lại khoáng cần thiết.
2. Đến NPC **Tinh Luyện** của đúng rank.
3. Đổi khoáng thành nguyên liệu nén.
4. Đổi nguyên liệu nén thành Đá Nâng Cấp.
5. Đến NPC **Lò Rèn Cúp**.
6. Nâng Cúp I → II → III → IV → V.

Nên ưu tiên nâng cuốc khi tốc độ đào bắt đầu chậm. Không cần giữ một chiếc cuốc rank thấp quá lâu sau khi đã mở rank mới.

---

## 5. Class, level và dungeon

Level MMOCore vừa tăng sức mạnh nhân vật, vừa là điều kiện bắt buộc để lên rank. Bạn có thể nhận kinh nghiệm từ nhiệm vụ và chiến đấu trong dungeon.

Khi vào dungeon:

- Chọn khu quái phù hợp với rank và sức mạnh hiện tại.
- Mang đủ vũ khí, giáp và vật phẩm hồi phục.
- Đi cùng đồng đội nếu đánh Elite hoặc Boss khó.
- Dungeon thường và dungeon cấp cao có khu vực riêng; mở `/warp` để xem điểm đến đang có.

Vũ khí chính gồm:

- **Kiếm:** lối đánh cận chiến ổn định.
- **Rìu:** đòn đánh nặng, phù hợp build cận chiến.
- **Trượng:** dành cho hướng kỹ năng/phép thuật.

Hãy chọn vũ khí phù hợp với class thay vì chỉ nhìn độ hiếm của món đồ.

---

## 6. Trang bị, ngọc và cường hóa

Trang bị có hệ thống theo rank và cấp I–V. Khi đã có món đồ phù hợp, bạn có thể tiếp tục phát triển bằng các hệ thống sau:

1. Rèn hoặc kiếm vũ khí, giáp đúng rank.
2. Dùng `/duclo` để tạo ô khảm.
3. Gắn Ngọc phù hợp với chỉ số cần xây dựng.
4. Dùng `/cuonghoa` để tăng cấp trang bị.

Trang bị rank càng cao thì việc cường hóa càng khó và tốn nhiều nguyên liệu hơn. Với món đồ quan trọng, nên chuẩn bị vật phẩm hỗ trợ tỷ lệ trước khi nâng.

### Phân rã trang sức

Dùng `/phanra` (alias `/disassemble`) để phân rã trang sức dư. Đặt trang sức vào ô giữa GUI rồi xác nhận.

- Áp dụng cho nhẫn, bùa, vòng tay, găng và phụ kiện trang sức.
- Item bị phá hủy và đổi thành **Đá Cường Hóa Trang Sức** theo độ hiếm.
- Sơ Cấp / Trung Cấp / Cao Cấp / Siêu Cấp / Huyền Thoại tương ứng các bậc hiếm từ thường đến Epic.

Hành động không hoàn tác — kiểm tra kỹ trước khi xác nhận.

Ưu tiên thực tế:

1. Có đủ bộ trang bị đúng rank.
2. Nâng các món chính lên mức ổn định.
3. Đục lỗ và gắn ngọc.
4. Tối ưu cường hóa và chỉ số endgame.
5. Phân rã trang sức dư để lấy đá cường hóa trang sức.

---

## 7. Nhiệm vụ cá nhân

### Daily và Weekly

Mở `/dailyquest` để xem nhiệm vụ cá nhân. Nhiệm vụ hiện có gồm đăng nhập, điểm danh, đào block và tiêu diệt quái.

- Nhiệm vụ đào chỉ tính trong `world_prison`.
- Nhiệm vụ giết quái chỉ tính trong các world dungeon hợp lệ.
- Hãy nhận thưởng từng nhiệm vụ sau khi hoàn thành.
- Hoàn thành toàn bộ nhiệm vụ ngày/tuần để nhận thưởng tổng.

Phần thưởng có thể gồm tiền, Point, kinh nghiệm MMOCore, đá cường hóa và chìa khóa hòm.

### Điểm danh

Dùng `/checkin` mỗi ngày. Chuỗi điểm danh dài có thêm phần thưởng tại các mốc 3, 7, 14 và 30 ngày.

> `/dailyquest` là nhiệm vụ cá nhân của server; `/gang quest` là nhiệm vụ chung của Bang Hội. Đây là hai hệ thống độc lập.

---

## 8. Chơi cùng Bang Hội

Mở `/gang` hoặc dùng alias `/bang`, `/banghoi`.

Bạn có thể:

- Tạo bang bằng `/gang create <tên> <prefix>`.
- Nhận lời mời bằng `/gang accept`.
- Nạp khoáng vào kho chung.
- Làm nhiệm vụ cá nhân và nhiệm vụ chung của bang.
- Nâng cấp kinh tế, khai thác và chiến đấu.
- Tranh Mỏ VIP KOTH.
- Tham gia mùa giải bang.

### Kho và ngân hàng khác nhau thế nào?

| Hệ thống | Chứa gì? | Công dụng |
| --- | --- | --- |
| **Vault/Kho** | Khoáng và vật liệu hợp lệ | Leader/Co bán bằng **Bán Tất Cả** |
| **Bank/Ngân hàng** | Tiền chung của bang | Nâng Bang Level, mua upgrade và buff |

Nạp tiền trực tiếp vào bank chịu **thuế 30%**. Trong đa số trường hợp, nạp khoáng vào vault rồi để Leader/Co dùng Sell All sẽ hiệu quả hơn.

### Việc nên làm mỗi ngày

1. Dùng `/gang personal` nhận hai nhiệm vụ cá nhân bang.
2. Đào và nạp khoáng vào `/gang vault`.
3. Leader/Co dùng Sell All để tạo tiền cho bank.
4. Nhận thưởng bằng `/gang personal claim`.
5. Cùng làm nhiệm vụ tại `/gang quest`.
6. Kiểm tra Mỏ VIP bằng `/gang koth`.

### Thứ tự nâng bang đề xuất

1. **Sell** — tăng tiền khi Sell All.
2. **Magnet** — tăng lượng khoáng khi nạp kho.
3. **Quest Capacity, Efficiency và Mastery**.
4. **KOTH Control** khi bang bắt đầu tranh Mỏ VIP.
5. **Warlord và Protection** khi bang tập trung PvP.

Xem toàn bộ quyền Leader/Co/Member, quest, shop và season tại [`gangs.md`](gangs.md).

---

## 9. KOTH — Mỏ VIP

KOTH là khu mỏ đặc biệt dành cho Bang Hội.

- Một bang đứng trong vùng chiếm đóng không bị tranh chấp đủ thời gian sẽ sở hữu mỏ.
- Thành viên bang sở hữu nhận lợi ích khai thác tại mỏ.
- Khi bang khác khai thác, một phần giá trị có thể được chuyển vào bank của bang chủ.
- Sau khi chiếm thành công sẽ có thời gian phòng thủ trước khi bị chiếm lại.
- Upgrade **KOTH Control** giúp bang chiếm nhanh và giữ mỏ tốt hơn.

Đi theo nhóm, thống nhất người chiếm điểm và người bảo vệ. Dùng `/gang koth` để kiểm tra trạng thái trước khi xuất phát.

---

## 10. Boss và sự kiện

### Ma Vương

Ở giai đoạn cuối, người chơi có thể farm **Mảnh Huy Hiệu Triệu Hồi** từ boss theo rank, chế thành Huy Hiệu và sử dụng tại bàn thờ Ma Vương.

- Bàn thờ có thời gian hồi chung.
- Nên tập hợp đội trước khi triệu hồi.
- Chia vai trò gây sát thương, chống chịu và hỗ trợ.
- Kiểm tra trạng thái bàn thờ trước khi dùng Huy Hiệu.

### Đêm Nguyệt Huyết

Sự kiện diễn ra vào **Thứ 7, từ 20:00 đến 22:00** theo giờ server. Khi có thông báo bắt đầu, đến khu dungeon để cùng đánh **Bá Tước Huyết Nguyệt**.

Theo dõi thông báo trong game vì địa điểm hoặc lịch sự kiện có thể được ban quản trị điều chỉnh.

---

## 11. Hòm và chìa khóa

### Hòm Trang Sức Free

Chìa khóa có thể nhận từ phần thưởng hoàn thành toàn bộ Daily Quest. Hòm chứa các bộ trang sức FREE với nhiều cấp độ hiếm khác nhau.

### Hòm Long Tộc

Chìa khóa có thể nhận từ phần thưởng hoàn thành toàn bộ Weekly Quest. Hòm chứa trang sức Trade và một số trang sức Donate hiếm.

### Hòm Ngọc

Chìa Rương Ngọc dùng tại Vòng Quay Đá Quý ở hub. Bạn sẽ nhận một hòm màu, sau đó mở ra Ngọc từ Lv.I đến Lv.X. Ngọc cấp càng cao càng hiếm.

### Hòm Thiên Giới

Mở shop bằng `/shopdonate`, `/thiengioi` hoặc `/shopthien`. Mỗi 10 lượt quay nhận một Mảnh Thiên Giới; dùng `/doithiengioi` để đổi một món Hộ Long.

Hòm là nhánh bổ sung. Người mới nên ưu tiên rank, cuốc và bộ trang bị cơ bản trước.

---

## 12. Plot cá nhân

`world_plot` là khu đất cá nhân để xây dựng và lưu trữ.

- Dùng `/plot` hoặc `/p` để thao tác.
- Dùng `/plot help` để xem danh sách lệnh.
- Mỗi người mặc định có tối đa một plot.
- Có thể bay trong khu plot.
- Mob tự nhiên và mob từ spawner không xuất hiện tại đây.

---

## 13. Endgame

### Prestige

Khi đạt Rank 9 và đủ tiền, bạn có thể Prestige. Prestige đưa tiến trình rank về đầu để bắt đầu một vòng đào dài hạn mới và giữ số Prestige đã đạt.

### Chuyển Sinh

Mở `/chuyensinh` hoặc `/rebirth`. Điều kiện hiện tại:

- Rank 9 — Vượt Ngục.
- MMOCore level 100.
- 100.000.000 tiền.
- Một Đá Chuyển Sinh.

Mỗi lần Chuyển Sinh:

- Nhận 3 điểm perk.
- Nhận 2 điểm thuộc tính MMOCore.
- Nhận thêm 5% EXP MMOCore vĩnh viễn.
- Level MMOCore trở về 1.

Hai hệ thống có mục đích khác nhau: **Prestige** là vòng tiến triển khai thác; **Chuyển Sinh** là tiến triển sức mạnh RPG.

---

## 14. Lộ trình đề xuất

### Chơi cá nhân

1. Hoàn thành daily và check-in.
2. Đào tại mỏ đúng rank.
3. Bán đủ tiền cho mục tiêu gần nhất.
4. Nâng cuốc khi tốc độ đào chậm.
5. Đi dungeon để tăng level và lấy trang bị.
6. Rankup khi đủ tiền/Point và level.
7. Chỉ tối ưu ngọc, cường hóa sau khi có đồ đáng giữ.

### Chơi cùng đồng đội

1. Chia người đào, người dungeon và người quản lý tài nguyên.
2. Cùng hoàn thành quest bang khi đông người online.
3. Nạp khoáng đều để tăng danh vọng và bank.
4. Nâng Sell/Magnet trước để tạo nền kinh tế.
5. Tổ chức đội đánh boss và chiếm KOTH.
6. Dùng bank cho mục tiêu chung, tránh tiêu buff khi ít người online.

---

## 15. Lệnh thường dùng

| Lệnh | Công dụng |
| --- | --- |
| `/warp` | Mở danh sách khu vực |
| `/rank` | Xem tiến trình và điều kiện rank |
| `/rankup`, `/xrankup` | Lên rank bằng tiền |
| `/xrankuppoint` | Lên rank bằng Point |
| `/sellgui` | Bán khoáng cá nhân |
| `/dailyquest` | Nhiệm vụ ngày/tuần cá nhân |
| `/checkin` | Điểm danh |
| `/duclo` | Đục lỗ trang bị |
| `/cuonghoa` | Cường hóa trang bị |
| `/phanra`, `/disassemble` | Phân rã trang sức thành đá cường hóa |
| `/gang` | Menu Bang Hội |
| `/gang personal` | Nhiệm vụ cá nhân bang |
| `/gang quest` | Nhiệm vụ chung của bang |
| `/gang weekly` | Nhiệm vụ tuần của bang |
| `/gang vault` | Kho chung của bang |
| `/gang koth` | Trạng thái Mỏ VIP |
| `/plot`, `/p` | Quản lý plot cá nhân |
| `/chuyensinh`, `/rebirth` | Menu Chuyển Sinh |

---

## 16. Câu hỏi thường gặp

**Tại sao bán bằng `/sellgui` không được nhân tiền?**  
`/sellgui` luôn dùng giá cơ bản. Hệ số bán của Bang Hội chỉ áp dụng khi Leader/Co bán khoáng trong vault bằng Sell All.

**Tại sao đủ tiền nhưng chưa rankup được?**  
Bạn còn phải đạt level MMOCore yêu cầu. Mở `/rank` để kiểm tra cả hai điều kiện.

**Nạp tiền vào bank bị mất một phần?**  
Bank thu thuế 30% khi nạp tiền trực tiếp. Hãy ưu tiên nạp khoáng và dùng Sell All.

**Daily Quest và Gang Quest có giống nhau không?**  
Không. `/dailyquest` là nhiệm vụ cá nhân; `/gang quest` là nhiệm vụ chung của bang.

**Nên nâng cuốc hay trang bị trước?**  
Đầu game ưu tiên cuốc để tạo thu nhập. Khi bắt đầu đi dungeon khó, hãy cân bằng thêm vũ khí và giáp.

**Prestige và Chuyển Sinh có giống nhau không?**  
Không. Prestige phục vụ vòng đào/rank; Chuyển Sinh phát triển nhân vật RPG và reset level MMOCore.
