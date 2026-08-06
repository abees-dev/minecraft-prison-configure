# Bản đồ hệ thống CorePlugin

Trạng thái: **Live**  
Nguồn chuẩn: các thư mục dưới `plugins/CorePlugin/`. Trang này là bản đồ; config và README chuyên biệt vẫn là nguồn chi tiết.

## Module gameplay

| Module | Người chơi / mục đích | Reload hoặc admin | Nguồn config |
| --- | --- | --- | --- |
| Altar | Bàn thờ/triệu hồi | Theo config module | `altar/` |
| Black Market | `/choden`, `/blackmarket`, `/bm`; mua bán Money/Point | `/choden reload`, `/chodena` | `blackmarket/` |
| DailyQuest | Daily, weekly và check-in | Theo lệnh admin trong messages | `dailyquest/` |
| Disassemble | `/phanra`, `/disassemble`; phân rã trang sức | `/phanra reload` | `disassemble/` |
| Event | Lịch và trạng thái event | Theo config/messages | `event/` và `event-data.yml` |
| Gang | Bang Hội, bank/vault, quest, KOTH, war | Xem README ops | `gang/` |
| Prison | Tích hợp progression Prison | Theo config/messages | `prison/` |
| Rebirth | `/chuyensinh`, `/rebirth` | `/chuyensinh reload` | `rebirth/`, `rebirth-data.yml` |
| Redeem Code | `/code <mã>` | `/codeadmin` | `redeemcode/` |
| Sockets | Đục lỗ/ngọc | Theo config/messages | `sockets/` |
| Support Stats | Magnet, MMOCore EXP và pickup bonus trên MMOItems | `/supportstats reload` | `supportstats/` |
| Upgrade | Cường hóa trang bị | Theo config/messages | `upgrade/` |
| XP Booster | `/xpboost` | `/xpboosta` | `xpbooster/` |

## Black Market

- Tối thiểu 10 Money/Point mỗi listing; tối đa 5 listing/người.
- Thuế người bán 5%.
- Listing hết hạn sau 24 giờ và được nhận lại trong 7 ngày.
- Dữ liệu đang cấu hình dùng SQL; đổi `storage` bắt buộc restart.
- Lệnh player: `/choden`, `sell money|point <giá>`, `cancel <id>`, `my`, `hethan`, `nhan`.
- Admin: `/chodena cancel <id>`, `/chodena purge`.

## Phân rã trang sức

`/phanra` nhận RING, AMULET, BRACELET, GLOVES và ACCESSORY. Reward phụ thuộc tier MMOItems từ RARE đến EPIC. Hành động phá hủy item đầu vào, vì vậy phải test GUI confirm và trường hợp inventory đầy sau khi đổi reward.

## Redeem Code

- Player: `/code <mã>`; cooldown thử mã hiện là 3 giây.
- Admin: `/codeadmin create`, `reward`, `delete`, `enable`, `disable`, `expire`, `list`, `info`, `reload`.
- Reward là console command thay `%player%` lúc redeem.
- Dữ liệu nằm trong SQL; đổi storage cần restart.

Không ghi credential database vào tài liệu. Credential phải nằm trong secret/local environment hoặc config production được kiểm soát riêng.

## Support Stats

CorePlugin đăng ký và đọc ba stat MMOItems:

| Stat | Ý nghĩa |
| --- | --- |
| `MAGNET_RANGE` | Bán kính hút item; 0 là tắt |
| `MMOCORE_EXP_BONUS` | Phần trăm EXP MMOCore cộng thêm |
| `PICKUP_BONUS` | Phần trăm tăng số lượng khi nhặt |

Reload bằng `/supportstats reload`, quyền `core.supportstats.admin`.

## XP Booster

- `/xpboost`: shop booster bằng PlayerPoints.
- `/xpboosta give personal <player> <package>` và `give server <package>`.
- `/xpboosta open <player>`, `status [player]`, `reload`.
- Buff active được lưu trong `xpbooster/active.yml`; boss bar có thể cấu hình.

## Utility

| File | Chức năng |
| --- | --- |
| `utility/broadcast.yml` | Broadcast định kỳ/thông báo |
| `utility/chat-filter.yml` | Cooldown và chống spam lặp |
| `utility/exchange.yml` | GUI đổi item/key/command theo config |
| `utility/item-clear.yml` | Clear item định kỳ; mặc định 300 giây, cảnh báo 60/30/10 giây |
| `utility/join-quit.yml` | Hành vi join/quit |
| `utility/maintenance.yml` | `/maintenance on|off|status` |
| `utility/tps.yml` | Theo dõi/thông báo TPS |

## Checklist khi chỉnh module

1. Đọc comment đầu `config.yml` để biết reload được hay bắt buộc restart.
2. Đồng bộ thay đổi giữa config, GUI và messages.
3. Không sửa file dữ liệu runtime khi server đang chạy.
4. Test quyền player/admin, inventory đầy, relog và restart.
5. Với SQL, test rollback transaction và trạng thái sau reconnect.
6. Cập nhật trang này hoặc docs chuyên biệt trong cùng commit.
