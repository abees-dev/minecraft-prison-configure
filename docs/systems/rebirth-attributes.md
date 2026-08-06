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

## Tiến hóa class (theo từng base class)

Cấu hình động dưới `class-evolution.paths.<base-class>` — mỗi base class một path riêng (to-class, skill kế thừa/mới, lần CS, message). Hiện có sẵn:

| Base | Evolved | Lần CS |
| --- | --- | ---: |
| `warrior` | `dragon_warrior` | 1 |

Khi Chuyển Sinh khớp `required-rebirth` của path và class hiện tại trùng key:

- Đổi sang `to-class` (ẩn `/class` qua `options.display: false` trong MMOCore).
- Giữ cấp `inherited-skills`, mở `new-skills` ở `new-skill-level`.
- Ghi `evolved-class` vào `rebirth-data.yml` — relog/CS sau không chạy lại.
- Class không có path: giữ nguyên, không thông báo tiến hóa.
- Đổi class chạy **trước** khi trừ tiền/đá; thất bại thì hủy toàn bộ.

Thêm class mới: thêm block dưới `paths:` (ví dụ `mage:`) + class/skill MMOCore tương ứng — không cần sửa code.

Cấu hình: `plugins/CorePlugin/rebirth/config.yml` → `class-evolution.paths`.
Message: `success-message` trên path, hoặc `messages.yml` → `success.evolutions.<from>` / `success.evolution`.
Class YAML ví dụ: `plugins/MMOCore/classes/dragon_warrior.yml`.

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
6. Warrior lv100 Chuyển Sinh lần 1 → `dragon_warrior`, skill cũ giữ cấp, skill mới mở cấp 1.
7. Class khác Chuyển Sinh lần 1 → không đổi class, không thông báo tiến hóa.
8. Chuyển Sinh lần 2 → không đổi class / không reset skill.
9. Giả lập lỗi đổi class → không trừ tiền, đá, không ghi cấp Chuyển Sinh.
