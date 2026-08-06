# Nhật ký cập nhật

> Cập nhật: 2026-08-06 · Dành cho người chơi

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
