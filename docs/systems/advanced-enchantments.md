# Hệ thống phù phép trang bị

> **Trạng thái live — cập nhật 2026-08-07.** Hệ thống này dùng
> **AdvancedEnchantments** cho vũ khí, giáp và hai enchant cuốc được tuyển chọn.
> Đây không phải module enchant của X-Prison; module X-Prison vẫn tắt theo
> [`xprison.md`](xprison.md).

## Tổng quan

- Nguồn cấu hình: `plugins/AdvancedEnchantments/enchantments.yml`.
- Pool hiện tại: **72 enchant**, tổng cộng **474 level**.
- Trang bị hỗ trợ: cuốc, kiếm, rìu, trượng MMOItems dùng `STICK`, cung, nỏ,
  mũ, áo giáp, quần và giày.
- Mỗi vật phẩm có tối đa **9 ô enchant**, có thể tăng đến **13 ô** bằng Slot
  Increaser (`config.yml` → `slots`).
- Sách được mua ngẫu nhiên theo rarity tại Enchanter. Giá hiện tại lần lượt là
  400 / 800 / 2.500 / 5.000 / 25.000 / 40.000 EXP.
- Ghép sách và nâng level có bật tỉ lệ thành công; thất bại không phá trang bị.

## Rarity và cấp mục tiêu

| Group | Tên hiển thị | Cấp mục tiêu | Giá Enchanter |
| --- | --- | ---: | ---: |
| `SIMPLE` | Cơ bản | V | 400 EXP |
| `UNIQUE` | Độc đáo | V | 800 EXP |
| `ELITE` | Tinh anh | VI | 2.500 EXP |
| `ULTIMATE` | Tối thượng | VII | 5.000 EXP |
| `LEGENDARY` | Huyền thoại | VIII | 25.000 EXP |
| `FABLED` | Thần thoại | X | 40.000 EXP |

Đây là trần mục tiêu mặc định khi chạy script mở rộng level, không phải quy tắc
bắt buộc cho mọi enchant. Các ngoại lệ có chủ đích:

- `smelting` — **Nung Chảy**: `LEGENDARY`, tối đa **V**.
- `glowing`, `aquatic`, `obsidianshield`, `lavawalker`, `waterwalker`: tối đa
  **I**, vì đây là hiệu ứng nhị phân; thêm level không tạo khác biệt gameplay.
- `smokebomb`: giữ tối đa **VIII** theo cấu hình đã cân trước đó, dù thuộc
  `ELITE`.

## Nung Chảy

`smelting` là enchant cuốc hiếm, được chuyển từ `SIMPLE` lên `LEGENDARY` để
không xuất hiện quá sớm trong progression.

| Level | Tỉ lệ tự nung |
| --- | ---: |
| I | 33% |
| II | 66% |
| III | 100% |
| IV | 100% |
| V | 100% |

Cấp IV–V giữ 100% thay vì vượt trần. Level cao vẫn có giá trị sưu tầm và ghép
sách, nhưng không nhân thêm sản lượng quặng. Script có khóa riêng `smelting: 5`
để việc regenerate không tự nâng enchant này lên VIII theo group Legendary.

### Tương thích Kho Bang

AdvancedEnchantments xử lý trigger đào ở priority `NORMAL`. Thiết lập này để
effect `SMELT` hoàn tất trước khi CorePlugin Gang thu drop cuối cùng vào Kho
Bang, đồng thời vẫn đứng sau bước kiểm tra quyền đào/rank sớm của Prison.

Kho Bang đã whitelist `IRON_INGOT`, `GOLD_INGOT`, `NETHERITE_SCRAP` và
`NETHERITE_INGOT`. Nếu quặng tự nung vẫn rơi vào túi cá nhân, kiểm tra theo thứ
tự:

1. Người chơi đã bật nạp Kho Bang cho chính mình.
2. Bang đạt `vault.required-level` và kho chưa đầy.
3. Reload AdvancedEnchantments và CorePlugin Gang, hoặc restart server thử.
4. Đào thử `IRON_ORE` và `GOLD_ORE` trong đúng mine WorldGuard.

## Danh sách enchant theo trang bị

| Trang bị | Enchant (`id`) | Group | Cấp tối đa |
| --- | --- | --- | ---: |
| Cuốc | Nung Chảy (`smelting`) | LEGENDARY | V |
| Cuốc | Kinh Nghiệm (`experience`) | SIMPLE | V |
| Kiếm | Chém Đầu (`decapitation`) | UNIQUE | V |
| Kiếm | Chói Mắt (`blind`), Độc (`poison`), Ma Cà Rồng (`vampire`) | ELITE | VI |
| Kiếm | Gây Rối (`confuse`), Băng Lưỡi (`iceaspect`), Chí Mạng (`critical`), Đỡ Đòn (`block`) | ULTIMATE | VII |
| Kiếm | Hút Máu (`lifesteal`), Đòn Đôi (`doublestrike`), Tò Mò (`inquisitive`) | LEGENDARY | VIII |
| Kiếm | Tước Vũ Khí (`disarm`) | FABLED | X |
| Rìu | Suy Yếu (`diminish`), Địa Ngục (`infernal`) | ELITE | VI |
| Rìu | Chém Quét (`cleave`), Chảy Máu (`bleed`), Nghiền Nát (`shatter`) | ULTIMATE | VII |
| Rìu | Man Rợ (`barbarian`), Thiêu Đốt (`inflame`) | LEGENDARY | VIII |
| Rìu | Lực Nặng (`bluntforce`) | FABLED | X |
| Trượng | Tê Liệt (`paralyze`), Bẫy Phép (`snare`), Virus (`virus`), Hủy Hoại (`perish`), Wither (`wither`) | ELITE | VI |
| Trượng | Hỗn Mang (`chaos`) | LEGENDARY | VIII |
| Cung/Nỏ | Thợ Săn (`hunter`) | UNIQUE | V |
| Cung/Nỏ | Vô Hiệu (`neutralize`) | FABLED | X |
| Cung | Nổ Mũi Tên (`explosive`) | UNIQUE | V |
| Cung | Cung Thủ (`archer`), Xuyên Thấu (`piercing`), Hỏa Ngục (`hellfire`), Cung Dài (`longbow`) | ULTIMATE | VII |
| Cung | Bắn Tỉa (`sniper`), Mưa Tên (`striker`) | FABLED | X |
| Nỏ | Cuồng Xạ (`frenzy`) | UNIQUE | V |
| Nỏ | Xạ Thủ (`marksman`), Tên Lửa (`missile`) | ULTIMATE | VII |
| Mũ | Phát Sáng (`glowing`), Thủy Sinh (`aquatic`) | SIMPLE | I |
| Mũ | Tập Trung (`battlefocus`) | UNIQUE | V |
| Mũ | Màn Ảo (`mindveil`) | ELITE | VI |
| Mũ | Bom Khói (`smokebomb`) | ELITE | VIII |
| Mũ | Cấy Ghép (`implants`) | ULTIMATE | VII |
| Mũ | Tỉnh Táo (`lucid`) | LEGENDARY | VIII |
| Áo giáp | Phản Đòn (`reflect`) | UNIQUE | V |
| Áo giáp | Sóng Xung (`shockwave`) | ELITE | VI |
| Áo giáp | Thiên Thần (`angelic`), Giáp Creeper (`creeperarmor`) | ULTIMATE | VII |
| Áo giáp | Khiên Obsidian (`obsidianshield`) | ULTIMATE | I |
| Áo giáp | Cứng Cáp (`hardened`), Vá Lại (`patch`), Lúng Túng (`fumble`), Dày Dặn (`chunky`) | LEGENDARY | VIII |
| Áo giáp | Hỏa Thân (`innerflame`) | FABLED | X |
| Quần | Nóng Chảy (`molten`) | UNIQUE | V |
| Quần | Gai Lưng (`spineguard`) | ELITE | VI |
| Quần | Bật Lưng (`ragdoll`), Né Tránh (`dodge`), Bảo Hộ (`safeguard`), Ý Chí Sắt (`ironwill`) | ULTIMATE | VII |
| Giày | Lò Xo (`springs`), Tên Lửa Thoát (`rocketescape`) | ELITE | VI |
| Giày | Chân Thạch (`jellylegs`), Aegis (`aegis`) | ULTIMATE | VII |
| Giày | Bánh Răng (`gears`), Thủy Chiến (`aqua`), Co Giật (`convulse`) | LEGENDARY | VIII |
| Giày | Đạp Dung Nham (`lavawalker`), Đạp Nước (`waterwalker`) | LEGENDARY | I |

## Quy tắc mở rộng level

Script `plugins/AdvancedEnchantments/scripts/extend_enchant_levels.js` dùng để
bổ sung level còn thiếu theo rarity:

1. Chỉ thêm level thiếu, không ghi đè level đã cân tay.
2. Sao chép effect của level mạnh nhất hiện có.
3. Tăng `chance` theo bước quan sát được, giới hạn mỗi bước 1–5 điểm phần trăm
   và không vượt 100%.
4. Giảm `cooldown` một giây sau mỗi hai level mới, không thấp hơn một giây.
5. Bỏ qua enchant nhị phân và áp dụng `customCaps` trước trần rarity.

Chạy từ thư mục `plugins/AdvancedEnchantments`:

```sh
node scripts/extend_enchant_levels.js
```

Script là idempotent: chạy lại trên cấu hình đã đủ level phải báo `0
enchantments` và không tạo diff.

## Checklist khi sửa enchant

1. Sửa `enchantments.yml`; không khôi phục toàn bộ file `.bak` vì đó là pool
   mặc định chưa được tuyển chọn.
2. Đảm bảo `applies` khớp vật liệu MMOItems. Trượng hiện dùng `STICK`.
3. Không cho `chance` vượt 100 hoặc `cooldown` thấp hơn 1 giây.
4. Enchant hồi máu, khống chế, phản sát thương và diện rộng phải được thử cả
   PvE lẫn PvP.
5. Kiểm tra YAML trước khi đưa lên server.
6. Reload AdvancedEnchantments hoặc khởi động lại server thử nghiệm, sau đó thử
   nhận sách, ghép sách và gắn vào từng loại MMOItems.
7. Khi thay đổi rarity/cấp/giá, cập nhật tài liệu này trong cùng commit.

## Lệnh đang sử dụng

| Lệnh | Đối tượng | Chức năng |
| --- | --- | --- |
| `/enchanter` | Người chơi | Mua sách ngẫu nhiên theo rarity |
| `/tinkerer` | Người chơi | Đổi sách không cần dùng |
| `/alchemist` | Người chơi | Ghép sách và Bụi Ma thuật |
| `/enchants` | Người chơi | Xem toàn bộ danh sách enchant |
| `/enchant <tên>` | Người chơi | Xem chi tiết một enchant |
| `/ae ...` | Admin có permission | Give, kiểm tra và reload cấu hình |

Không đăng ký alias ngắn để tránh xung đột với plugin khác. Các lệnh mặc định
`/gkit`, `/gkits`, `/armorsets`, `/previewsets`, `/withdrawsouls`, `/wsouls`,
`/apply` và `/reapply` đang tắt vì không thuộc gameplay live.

## File liên quan

| File | Vai trò |
| --- | --- |
| `plugins/AdvancedEnchantments/enchantments.yml` | Định nghĩa enchant và level |
| `plugins/AdvancedEnchantments/groups.yml` | Màu, tên và vật phẩm theo rarity |
| `plugins/AdvancedEnchantments/menus/enchanter.yml` | Giá EXP và giao diện Enchanter |
| `plugins/AdvancedEnchantments/config.yml` | Slot, ghép sách và luật áp dụng |
| `plugins/AdvancedEnchantments/locale/vi.yml` | Thông báo tiếng Việt |
| `plugins/AdvancedEnchantments/scripts/extend_enchant_levels.js` | Bổ sung level còn thiếu |
