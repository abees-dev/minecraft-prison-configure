# Nhật ký cập nhật

> Cập nhật: 2026-08-08 · Dành cho người chơi

## Cân bằng Combat, Trang Bị và Ngọc Khảm

### Trang bị và cường hóa

- Tăng **5% chỉ số combat cơ bản** cho toàn bộ trang bị để sức mạnh món đồ
  theo kịp máu và sát thương của quái theo rank.
- Mở rộng sức mạnh cường hóa đến cấp cao: mỗi cấp vũ khí cộng thêm `1 Sát
  Thương Cơ Bản` và `0.4 Sát Thương Vật Lý`.
- Mỗi cấp cường hóa trên một món giáp cộng `5 Máu`, `1.75 Phòng Thủ`
  và `0.35 Kháng Xuyên Giáp`.
- Cường hóa giáp không tiếp tục cộng `Armor`; bộ giáp vẫn giữ trần 30 Armor
  và phát triển sức chống chịu bằng Máu, Defense và Toughness. Nhờ vậy chỉ số
  nâng cấp vẫn có ý nghĩa khi đã mặc đủ bộ.
- Đồng bộ lại máu và sát thương Normal Mob, Elite và Boss Prison theo trang bị
  Tier III cùng mức nâng cấp khuyến nghị của từng rank.

### Set bonus và giới hạn chỉ số

- Set bonus giờ cộng theo **phần tăng thêm của từng mốc**, không cộng lại toàn
  bộ tổng của các mốc trước. Điều này loại bỏ tình trạng tốc độ đánh, hút máu
  và sát thương tăng vượt thiết kế khi mặc đủ set.
- Chia lại vai trò giữa các set: sát thương cơ bản, phép, vật lý, chí mạng,
  cơ động và chống chịu thay vì mọi set cùng dồn một nhóm chỉ số mạnh nhất.
- Giảm lượng hút máu trên các set; đặt trần **Hút Máu** và **Hút Máu Phép** ở
  `15%` để PvP không rơi vào trạng thái hai bên không thể hạ nhau.
- Giới hạn Giảm Sát Thương chung, PvE và PvP ở `50%`; Tỷ Lệ Chí Mạng và Sức
  Mạnh Chí Mạng cộng thêm ở `80%`.

### Ngọc khảm

- Cân bằng lại toàn bộ **100 viên ngọc**, gồm 10 loại và 10 cấp.
- Chỉ số mỗi viên được random trong khoảng **±10%** khi viên ngọc được tạo.
  Giá trị đã roll được giữ nguyên khi tháo ra, không thể tháo/lắp để roll lại.
- Hoàng Ngọc chuyển từ Armor sang **Phòng Thủ**, nên vẫn hữu ích khi
  người chơi đã đạt trần Armor.
- Giảm chỉ số Hồi Máu và Tốc Độ Di Chuyển từ gem để tránh build hồi phục hoặc
  cơ động vượt kiểm soát.
- Đổi tên `Armor Toughness` thành **Kháng Xuyên Giáp** trong nội dung hiển thị
  để dễ hiểu hơn.

### Hiển thị chỉ số

- Bổ sung menu xem tổng quan combat của nhân vật bằng `/stats` hoặc `/chiso`.
- Menu tách rõ chỉ số dùng chung, PvE và PvP để người chơi kiểm tra build mà
  không cần lệnh kỹ thuật.
- Chuẩn hóa tên và mô tả stat trên trang bị, set và giao diện chỉ số.
- Công thức sát thương, Defense và bảng ngọc chi tiết được ghi tại
  [`gems-combat-damage.md`](../reference/gems-combat-damage.md).

### Sửa lỗi Máu sau Chuyển Sinh

- Sửa perk **Bất Hoại** chỉ giảm sát thương nhưng không cộng Máu như lore:
  mỗi cấp nay cộng đúng `+50 Máu Tối Đa`; ví dụ cấp 3 cộng `+150 HP`. Bonus
  được áp lại sau khi đăng nhập hoặc reload mà không cộng chồng.
- Hoàn thiện các perk trước đây chỉ có lore: **Thần Phong** cộng tốc độ chạy và
  tốc độ đánh; **Học Giả** cộng EXP MMOCore; **May Mắn Thần Thánh** có cơ hội
  nhân đôi Đá Cường Hóa thực sự rơi từ quái.
- `/stats` hiển thị riêng các bonus Chuyển Sinh và Máu tối đa thực tế sau
  modifier Bất Hoại.
- Sửa node **Sinh Lực Tối Đa** trong cây kỹ năng chung: trước đây node bị cấu
  hình nhầm thành `+5 Hút Máu`; nay cộng đúng `+5 Máu Tối Đa`.
- Điểm thuộc tính **Sức Mạnh** nhận từ Chuyển Sinh giờ cộng cố định `+2 HP`
  (`1 tim`) mỗi điểm, thay cho `+1%` quá nhỏ và không khớp nội dung GUI.
- Chỉ số Máu mới được áp qua MMOCore; người chơi cần cộng điểm Sức Mạnh hoặc
  mở node Sinh Lực, không tự cộng ngay khi chỉ mới nhận điểm chưa sử dụng.

## Đại cập nhật Kinh tế và Bang Hội

### Cân bằng tiền tệ Prison

- Đồng bộ giá bán khoáng giữa `/sellgui` và **Bán Tất Cả** trong Kho Bang.
- Điều chỉnh toàn bộ giá item đào được, ore, thỏi và block nén theo cùng một
  mặt bằng, tránh chế tạo hoặc nung khoáng để bán chênh lệch giá.
- Nâng thang tiền bán khoáng và đồng thời tăng các khoản tiêu tiền quan trọng
  như Rank, Prestige, nâng cuốc, nâng Bang, Quest Bang và đục lỗ trang bị.
- Cuốc max tại mine gần cuối được cân bằng quanh mốc thu nhập nền khoảng
  **5 triệu/phút** khi Bang chưa có Sell Upgrade.
- Bổ sung phí tiền cho mỗi lần **Cường Hóa** và **Đục Lỗ**; thất bại vẫn tiêu
  hao tiền và nguyên liệu. Phí tăng dần theo cấp trang bị hoặc số ô đã mở.

### Cân bằng Shop Bang

- Buff Sell được chỉnh từ `x2 trong 60 phút` thành **x1,5 trong 30 phút**, giá
  **100 triệu** từ Bank Bang.
- Buff Haste được chỉnh còn **Haste I trong 30 phút**, giá **50 triệu**.
- Buff EXP được chỉnh còn **x1,15 trong 30 phút**, giá **75 triệu**.
- Buff Sell từ Weekly Quest còn **x1,25 trong 30 phút**.
- Giá mở rộng kho, slot thành viên và các nâng cấp vĩnh viễn đã tăng để phù
  hợp với lượng tiền mới; riêng Sell Upgrade cấp 5 cần tổng cộng **350 triệu**.
- GUI Shop Bang giờ hiển thị buff đang hoạt động, nguồn buff, hiệu ứng thực tế,
  thời gian còn lại và tổng multiplier Sell hiện tại.
- Mua thêm buff khi buff cũ đang chạy sẽ cập nhật trạng thái và thời gian ngay
  trong GUI.

### Nâng cấp Bang mở rộng

- GUI Nâng Cấp Bang được chia thành **2 trang** và giữ nguyên trang hiện tại
  sau khi mua.
- Bổ sung năm hướng nâng cấp mới:
  - **Vitality:** tăng máu tối đa cho thành viên Bang.
  - **PvE Power:** tăng sát thương gây ra cho quái.
  - **PvE Resilience:** giảm sát thương nhận từ quái.
  - **Buff Mastery:** kéo dài thời gian buff mua tại Shop Bang.
  - **Boss Hunter:** tăng sát thương lên các boss được chỉ định.
- PvE Power và Boss Hunter có giới hạn tổng để tránh sát thương boss tăng quá
  mạnh; các chỉ số PvE không tác động lên PvP.
- Mọi nâng cấp mới đều yêu cầu đồng thời **Bang Level, danh vọng và tiền Bank**.

### Danh vọng chỉ nhận từ nhiệm vụ

- Sửa lỗi đào hoặc tự nạp khoáng vào Kho Bang vẫn được cộng danh vọng.
- Bán khoáng, KOTH, Bang Chiến và giết quái ngoài nhiệm vụ không còn trao danh
  vọng.
- Danh vọng gameplay giờ chỉ nhận từ **Quest Bang chung, Quest cá nhân và
  Weekly Quest**.
- Chỉ số đóng góp khi đào vẫn được ghi nhận để theo dõi hoạt động thành viên,
  nhưng không thể dùng thay cho danh vọng.

## Sảnh chính mới và kết nối máy chủ

### Map Spawn mới

- Sảnh chính đã được chuyển từ map `world` sang map **`world_spawn`** mới.
- Cập nhật vị trí xuất hiện mặc định và các khu **Rương**, **Chế Tạo**,
  **Ủng Hộ** và **Giao Dịch** theo bố cục của sảnh mới.
- Chuyển toàn bộ **17 NPC** tại sảnh cũ sang các khu tương ứng trong map mới.
- Người chơi tại sảnh được dùng chung túi đồ với các world gameplay hiện tại.
- Sảnh mới đã tắt PvP và được bảo vệ khỏi phá/đặt block, cháy nổ và các hành
  vi phá hoại môi trường.

### Kết nối qua Velocity

- Hệ thống kết nối giữa Hub và các server gameplay đã được chuyển sang
  **Velocity**.
- Đăng nhập và xác thực tài khoản được xử lý tập trung tại Hub; server gameplay
  không còn yêu cầu đăng nhập lại.
- Đã kiểm thử luồng kết nối qua proxy và xác nhận hoạt động ổn định.

## Mở rộng hệ thống Phù Phép

- Nâng cấp toàn bộ pool AdvancedEnchantments lên **72 enchant** với tổng cộng
  **474 cấp độ**, bổ sung **210 level mới** cho vũ khí, giáp và cuốc.
- Cấp tối đa mới theo độ hiếm:
  - **Cơ bản** và **Độc đáo:** cấp V.
  - **Tinh anh:** cấp VI.
  - **Tối thượng:** cấp VII.
  - **Huyền thoại:** cấp VIII.
  - **Thần thoại:** cấp X.
- Level cao tăng tỉ lệ kích hoạt và giảm nhẹ hồi chiêu; tỉ lệ luôn được giới
  hạn tối đa 100%.
- Những enchant có hiệu ứng bật/tắt như Thủy Sinh, Phát Sáng, Khiên Obsidian,
  Đạp Dung Nham và Đạp Nước vẫn giữ cấp I để tránh tạo level không có giá trị.

### Nung Chảy

- Enchant cuốc **Nung Chảy** được nâng từ nhóm Cơ bản lên **Huyền thoại**.
- Cấp tối đa của Nung Chảy được giữ ở **V**.
- Tỉ lệ tự nung lần lượt là **20% / 40% / 60% / 80% / 100%** từ cấp I đến V.
- Nung Chảy chỉ tự xử lý quặng; level cao không nhân thêm sản lượng đào được.
- Fix: khi bật **nạp Kho Bang**, quặng Nung Chảy (vd. sắt/vàng → thỏi) vẫn nạp
  vào kho bang thay vì vào túi cá nhân.

### Lệnh Phù Phép

- Giữ các lệnh người chơi cần dùng: `/enchanter`, `/tinkerer`, `/alchemist`,
  `/enchants` và `/enchant <tên>`.
- Loại bỏ các alias ngắn dễ xung đột với plugin khác.
- Tắt các lệnh GKit, ArmorSet, Soul và `/apply` mặc định vì không thuộc gameplay
  hiện tại của server.

## Tính năng mới — Linh Hồn, Thành Tựu và Dungeon Biến Dị

### Mảnh Linh Hồn và Trạm Đổi

- Boss Prison giờ trao **Mảnh Linh Hồn** theo nhóm rank, tạo một lộ trình tích lũy để người chơi chủ động chọn nguyên liệu cần thiết.
- Bổ sung năm cấp Mảnh Linh Hồn: **Sơ Cấp, Trung Cấp, Cao Cấp, Siêu Cấp** và **Huyền Thoại**.
- Các Mảnh Linh Hồn sử dụng model ItemsAdder riêng, không trùng với nhóm Đá Cường Hóa.
- Trạm Đổi Linh Hồn cho phép đổi mảnh lấy nguyên liệu, Mũi Khoan, Vé Dungeon Biến Dị và các vật phẩm giá trị khác.
- Công thức **Mảnh Long Tộc → Ấn Tín Long Tộc** được gộp vào cùng trạm đổi.
- Bổ sung NPC **Sứ Giả Linh Hồn** để mở trạm đổi trực tiếp.

### Ghép Đá Đục Lỗ

- Bổ sung **Bàn Ghép Đá Đục Lỗ** và NPC **Thợ Rèn Đục Lỗ**.
- Có thể dùng **8 Mũi Khoan cấp dưới** để ghép thành **1 Mũi Khoan cấp trên**, từ ô 1 đến ô 7.
- Mũi Khoan Đục Lỗ Thiên Mệnh không thể ghép theo cách này và vẫn là vật phẩm hiếm.

### Collection và Thành Tựu

- Bổ sung `/collection` và `/thanhtuu` để theo dõi quặng đã đào, quái đã hạ và boss đã tiêu diệt theo từng rank.
- Các mốc thành tựu có phần thưởng nhận một lần và được lưu vĩnh viễn.
- Bổ sung **Rương Chọn Nguyên Liệu**, cho phép người chơi tự chọn phần thưởng thay vì quay ngẫu nhiên.

### Dungeon Biến Dị và phần thưởng mùa

- Bổ sung **Vé Dungeon Biến Dị**; vé được dùng cho lần hạ boss kế tiếp để nhận thêm Mảnh Linh Hồn phù hợp.
- Dungeon có hiệu ứng Biến Dị luân phiên theo tuần: **Kiên Cố, Cuồng Nộ, Độc Tố** hoặc **Bất Ổn**.
- Bổ sung **Huy Chương Mùa Bang** làm phần thưởng cosmetic cho các Bang Hội dẫn đầu mùa.

## Cân bằng Class và Kỹ Năng

Hệ thống class và kỹ năng đã được làm mới để mỗi class có vai trò rõ ràng hơn, kỹ năng tạo ảnh hưởng tốt hơn trong chiến đấu và class chuyển sinh thực sự mạnh hơn class gốc.

### Class cơ bản

- Người chơi mới lựa chọn một trong bốn class: **Chiến Binh**, **Pháp Sư**, **Cung Thủ** hoặc **Tu Sĩ**.
- Bốn class được đặt cân đối ở chính giữa menu chọn class.
- Class chuyển sinh không còn xuất hiện trong menu và chỉ nhận được thông qua hệ thống Chuyển Sinh.
- Cung Thủ nhận thêm hai kỹ năng riêng:
  - **Tiễn Nổ Xuyên Phá:** bắn tên xuyên mục tiêu và phát nổ.
  - **Vũ Tiễn Vạn Tiễn:** gây sát thương liên tục trên diện rộng.

### Class chuyển sinh

Mỗi class cơ bản có một hướng nâng cấp:

| Class cơ bản | Class chuyển sinh |
| ------------ | ----------------- |
| Chiến Binh   | Chiến Binh Rồng   |
| Cung Thủ     | Kỹ Sư Ma Pháp     |
| Pháp Sư      | Tử Linh Pháp Sư   |
| Tu Sĩ        | Đại Tế Thức Tỉnh  |

- Class chuyển sinh giữ lại cấp kỹ năng đã học của class cũ và mở thêm bốn kỹ năng độc quyền.
- Chỉ số nền của class chuyển sinh được tính bằng **toàn bộ chỉ số class gốc tại cấp 100**, sau đó cộng thêm chỉ số nền riêng của class chuyển sinh.
- Sau khi chuyển sinh, class mới vẫn tiếp tục nhận thêm chỉ số khi tăng cấp.

Một số chỉ số nền nổi bật sau chuyển sinh:

| Class chuyển sinh | Máu | Mana | Chỉ số nổi bật                    |
| ----------------- | --: | ---: | --------------------------------- |
| Chiến Binh Rồng   | 102 |  120 | 14.8 sát thương, 13.7 tốc độ đánh |
| Kỹ Sư Ma Pháp     |  37 |  159 | 3.46 hồi Mana                     |
| Tử Linh Pháp Sư   |  40 |  181 | 4.46 hồi Mana, 0.31 hồi máu       |
| Đại Tế Thức Tỉnh  |  59 |  176 | 4.46 hồi Mana, 1.32 hồi máu       |

### Mana và tiêu hao kỹ năng

- Tất cả class và kỹ năng hiện chỉ sử dụng **Mana**.
- Đã loại bỏ hoàn toàn tiêu hao Thể Lực, Tử Khí, Linh Lực, Cuồng Nộ và các tài nguyên phụ khác.
- Skill chủ động có mức Mana cố định; nâng cấp skill không còn làm tăng chi phí thi triển.
- Skill nội tại không tiêu hao Mana.
- Thanh Mana của mọi class sử dụng chung một màu Aqua để dễ nhận biết.

### Kỹ năng và hiệu ứng chiến đấu

- Cân bằng lại sát thương và hồi phục theo cấp để tránh chênh lệch quá lớn ở cấp kỹ năng cao.
- Bổ sung hiệu ứng mới cho các class chuyển sinh:
  - **Chiến Binh Rồng:** tạo hấp thụ, nhận kháng sát thương khi lao tới và khống chế diện rộng.
  - **Kỹ Sư Ma Pháp:** đánh dấu, làm suy yếu, kéo mục tiêu vào vụ nổ và nhận lá chắn/tốc độ.
  - **Tử Linh Pháp Sư:** gây Wither, kiểm soát vùng và hồi sinh lực trong Vùng Đất Chết.
  - **Đại Tế Thức Tỉnh:** hồi máu, tạo lá chắn và tăng kháng sát thương cho đồng đội trong Thiên Địa Trận.
- Các thông số hồi chiêu, phạm vi, sát thương và hồi phục bất thường của skill MMOcore mặc định đã được điều chỉnh.

### Ô Kỹ Năng và Passive

- Giao diện kỹ năng giờ hiển thị sáu ô gắn kỹ năng thành một cột ở mép phải để dễ theo dõi.
- Bốn ô đầu chỉ nhận **kỹ năng chủ động**; dùng **[F] + phím số tương ứng** để thi triển kỹ năng đã gắn.
- Mở thêm hai ô riêng chỉ nhận **kỹ năng passive**.
- Kỹ năng passive chỉ có hiệu lực khi được gắn vào một trong hai ô passive; lore của ô có ghi chú để người chơi dễ nhận biết.
- Kỹ năng chủ động không thể gắn nhầm vào ô passive và kỹ năng passive cũng không thể chiếm ô chủ động.
- Nút kính xanh dùng để nâng cấp kỹ năng được giữ tại vị trí cũ.

### Cây kỹ năng theo Class

- Mỗi class cơ bản và class chuyển sinh giờ có cây kỹ năng phù hợp với vai trò của mình:
  - **Chiến Binh và Chiến Binh Rồng:** sát thương vật lý, chống chịu và cận chiến.
  - **Cung Thủ và Kỹ Sư Ma Pháp:** sát thương tầm xa, chí mạng và cơ động.
  - **Pháp Sư và Tử Linh Pháp Sư:** sát thương phép, Mana và hút máu phép.
  - **Tu Sĩ và Đại Tế Thức Tỉnh:** hồi phục, hỗ trợ, Mana và giảm sát thương.
- Tất cả class đều có thêm cây **Nền Tảng Chung** để nâng các chỉ số sinh tồn và chiến đấu cơ bản.
- Việt hóa tên cây, tên điểm nâng cấp và giao diện cây kỹ năng.
- Giữ nguyên tiến độ các cây kỹ năng cũ của người chơi khi chuyển sang tên và định hướng mới.

## Nhiệm vụ ngày và tuần

- Hoàn thành và nhận toàn bộ nhiệm vụ ngày sẽ nhận thêm:
  - **1 Điểm Kỹ Năng** để nâng kỹ năng class.
  - **1 Điểm Cây Kỹ Năng chung** để sử dụng cho bất kỳ cây kỹ năng nào của class hiện tại.
- Hoàn thành và nhận toàn bộ nhiệm vụ tuần sẽ nhận thêm **3 Điểm Kỹ Năng**.
- Phần thưởng tuần vẫn giữ nguyên **2 Điểm Thuộc Tính** cùng các phần thưởng trước đó.
- Nút **Bonus Clear-All** được đổi thành **Thưởng Hoàn Thành Tất Cả** để dễ hiểu hơn.
