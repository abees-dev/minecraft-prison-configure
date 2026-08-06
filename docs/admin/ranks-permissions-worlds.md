# Rank, permission, world và inventory

Trạng thái: **Live**  
Nguồn chuẩn: `plugins/LuckPerms/setup-all-ranks.txt`, `setup-vip-ranks.txt`, Multiverse, WorldGuard và Essentials.

## Mô hình rank

Prison có chín group `xprison_rank_1` đến `xprison_rank_9`, theo thứ tự:

1. Tân Binh
2. Tù Nhân
3. Lao Công
4. Thợ Đào
5. Đội Trưởng
6. Phó Quản Ngục
7. Quản Ngục
8. Bá Chủ Ngục Tù
9. Vượt Ngục

Track hiện có tên `prision_ranks` (giữ nguyên chính tả vì đây là ID đang dùng). Rank sau kế thừa rank trước. VIP là lớp quyền riêng; không thay thế prison rank.

## Cài lại permission

- Nguồn lệnh đầy đủ: `plugins/LuckPerms/setup-all-ranks.txt` và `setup-vip-ranks.txt`.
- Có thể paste vào console sau khi cài mới/clear LuckPerms.
- Skript admin `/setuplpranks` là lựa chọn in-game hiện được ghi trong file setup.
- Sau thay đổi home rank, reload Essentials và test đúng số home.

Không copy từng permission từ tài liệu này: dùng file setup làm nguồn để tránh thiếu các quyền mới như TPA, plot và warp menu.

## World đang quản lý

Các world chính gồm hub `world`, prison, PvP, dungeon, mega dungeon, nether, end và `world_plot`. Nguồn tên/world settings là `plugins/Multiverse-Core/worlds.yml`; region và flag nằm dưới `plugins/WorldGuard/worlds/`.

Multiverse-Inventories hiện có group `default` chia sẻ `all` giữa toàn bộ world đã liệt kê, bao gồm `world_plot`. Đây là quyết định gameplay quan trọng: thay đổi group có thể làm người chơi tưởng mất hoặc nhân đôi đồ.

## Quy trình đổi quyền/world an toàn

1. Ghi rõ group, permission node và world context cần đổi.
2. Sửa nguồn setup LuckPerms để lần cài lại không mất thay đổi.
3. Áp dụng trên tài khoản test không OP.
4. Test cả positive và negative case trong đúng world.
5. Với inventory group, backup dữ liệu người chơi trước khi tách/gộp world.
6. Test teleport vào/ra, chết/respawn, relog và restart.
7. Cập nhật docs player nếu thay đổi lệnh hoặc giới hạn.

## Kiểm tra nhanh

- Người mới mở được menu warp/rank cần thiết.
- Mỗi rank nhận đúng vault, home, kit và command bonus.
- VIP cộng thêm quyền mà không phá prison progression.
- Quyền bay `world_plot` biến mất khi rời world.
- WorldGuard chặn/cho phép đúng vùng.
- Inventory không mất sau chuyển world và restart.
