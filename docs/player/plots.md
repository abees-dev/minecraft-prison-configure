# Khu đất cá nhân — world_plot

Trạng thái: **Live**  
Nguồn chuẩn: `plugins/PlotSquared/config/worlds.yml`, `plugins/Multiverse-Core/worlds.yml`, `plugins/Multiverse-Inventories/groups.yml`, WorldGuard và LuckPerms.

## Dành cho người chơi

`world_plot` là world PlotSquared dùng generator riêng. Người chơi có gói quyền PlotSquared cơ bản và mặc định tối đa một plot.

Các thao tác thông dụng dùng `/plot` hoặc `/p`; xem trợ giúp trong game bằng `/plot help`. Quyền bay chỉ được cấp trong `world_plot`.

## Hành vi đang cấu hình

- Kích thước plot: 64 block; đường rộng 5 block.
- Plot dùng biome Forest và nền Grass/Dirt.
- Flight được bật ở road và plot.
- Natural mob spawning và mob spawner spawning bị tắt trong PlotSquared.
- Giá claim/merge/sell có giá trị cấu hình nhưng economy của PlotSquared đang tắt.
- `world_plot` hiện nằm trong group inventory `default`, vì vậy chia sẻ toàn bộ inventory với các world gameplay khác.

## Lưu ý cho admin

- Multiverse ghi world là `SURVIVAL`, trong khi PlotSquared đặt gamemode plot là `CREATIVE`. Cần test thực tế khi vào/rời world trước khi đổi một trong hai nguồn.
- Không sửa thủ công group Multiverse-Inventories khi có thể dùng `/mvinv group`.
- Quyền mặc định nằm trong `plugins/LuckPerms/setup-all-ranks.txt`: `plots.permpack.basic`, `plots.plot.1`, `essentials.fly` và `xprison.fly.keep` theo context `world_plot`.
- Sau thay đổi, test claim, teleport, build, flight, inventory, gamemode và rời world.
