# Chuyển Sinh và điểm thuộc tính

Trạng thái: **Live**  
Nguồn chuẩn: `plugins/CorePlugin/rebirth/config.yml`, `gui.yml`, `messages.yml` và `rebirth-data.yml`.

## Luồng người chơi

Mở giao diện bằng `/chuyensinh` hoặc `/rebirth`. Điều kiện hiện tại:

- Prison Rank 9 — Vượt Ngục (`group.xprison_rank_9`).
- MMOCore level 100.
- 100.000.000 money.
- Đá Chuyển Sinh `DA_CHUYEN_SINH`.

Mỗi lần Chuyển Sinh:

- Nhận 3 điểm perk.
- Nhận 2 điểm thuộc tính MMOCore.
- Nhận thêm 5% EXP MMOCore vĩnh viễn mỗi cấp Chuyển Sinh.
- Cấp MMOCore được reset về 1.
- Cập nhật suffix Chuyển Sinh qua LuckPerms.

Cấp Chuyển Sinh tối đa là 20.

## Perk

Có sáu nhánh, tối đa 10 cấp mỗi nhánh: tốc độ, sát thương, phòng thủ, hút máu, tiền và drop. Hiện CorePlugin trực tiếp áp dụng sát thương, phòng thủ và hút máu. Tiền/drop là dữ liệu cho hệ thống khác đọc; không được mô tả như buff hoạt động nếu chưa xác minh consumer.

Hiệu lực mỗi cấp đang cấu hình:

| Perk | Mỗi cấp |
| --- | ---: |
| Sát thương | +4% |
| Phòng thủ | +3% |
| Hút máu | +1,5% |

Aura có thể bật/tắt trong GUI; tier hình ảnh đổi tại cấp 5 và 10.

## Admin và reload

- `/chuyensinh reload`: reload config, cần `coreplugin.rebirth.admin`.
- `/givedachuyensinh`, `/setcs`, `/resetcs`, `/csaura`: lệnh quản trị của module.
- Không chỉnh `rebirth-data.yml` khi server đang chạy; plugin tự ghi dữ liệu người chơi vào đây.
- Thay đổi `config.yml` có hiệu lực sau reload hoặc restart.

## Kiểm tra sau thay đổi

1. Kiểm tra quyền Rank 9 khớp `rank-permission-pattern`.
2. Test thiếu từng điều kiện để xác nhận thông báo đúng.
3. Test một lần Chuyển Sinh bằng tài khoản thử: trừ tiền/đá, reset level, cộng perk và attribute points.
4. Relog và restart để xác nhận dữ liệu còn nguyên.
5. Kiểm tra suffix LuckPerms và EXP bonus sau khi lên cấp.
