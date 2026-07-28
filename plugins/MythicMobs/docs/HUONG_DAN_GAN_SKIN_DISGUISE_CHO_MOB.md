# Hướng dẫn gắn skin custom (LibsDisguises) cho mob MythicMobs

Đúc kết từ phiên troubleshooting thực tế khi gắn skin cho `VAMPIRE_LORD_BOSS`
(2026-07-27). Lần sau cần gắn skin custom cho mob/boss khác, làm theo đúng thứ
tự dưới đây để đỡ mất công dò lại từ đầu.

## 0. Điều kiện tiên quyết

- Server đang chạy **LibsDisguises bản FREE** (không phải premium) — xem
  `plugins/LibsDisguises/configs/premium.yml`, mọi cờ `SaveDisguises` đều
  `false`. Hệ quả quan trọng: **KHÔNG được `setSkin <file>` ngay trong 1 dòng
  lệnh `/disguise` trực tiếp** — plugin sẽ từ chối kèm log:
  `Using a skin file inline with a player disguise is a Lib's Disguises
  premium feature...`. Phải lưu skin thành "saved disguise" trước bằng lệnh
  riêng rồi mới gọi lại theo tên.

## 1. Chuẩn bị file skin

- Đặt file `.png` (64x64, đúng chuẩn skin Minecraft) vào:
  `plugins/LibsDisguises/Skins/<ten_file>.png`
- Không cần thêm gì khác, thư mục này chỉ dùng làm nguồn cho `/grabskin`,
  `/saveskin`, `/savedisguise ... setskin`.

## 2. Lưu skin thành named disguise (chạy trong game, admin/OP)

Cú pháp đã xác nhận **hoạt động đúng**:

```
/savedisguise <ten_disguise> player <inherit> setskin <ten_file>.png setDynamicName
```

Ví dụ thực tế đã dùng cho boss Vampire Lord:

```
/savedisguise vampirelordboss player <inherit> setskin VAMPIRE_LORD_BOSS_SKIN.png setDynamicName
```

Giải thích từng phần:
- `<ten_disguise>`: tên định danh để tái sử dụng sau này (xem mục 4 — LUÔN
  dùng **chữ thường toàn bộ**).
- `player <inherit>`: disguise kiểu player, `<inherit>` = giữ nguyên tên hiển
  thị hiện tại của entity/mob thay vì gán 1 tên giả cố định.
- `setskin <ten_file>.png`: trỏ tới file trong `Skins/` (chỉ cần tên file).
- `setDynamicName`: đồng bộ tên hiển thị theo entity một cách động.

Lệnh này tự ghi 1 entry mới vào
`plugins/LibsDisguises/configs/disguises.yml` dưới khóa `Disguises:`, kèm
theo data texture đã ký (signed) do LibsDisguises upload hộ qua dịch vụ
MineSkin. **Không tự sửa tay** khối JSON đó trong `disguises.yml` — luôn dùng
lại lệnh `/savedisguise` nếu cần đổi skin.

## 3. Test riêng trước khi gắn vào mob

```
/disguise player <ten_disguise>
```

Xác nhận da hiện đúng lên nhân vật của chính mình trước, rồi mới đụng tới
config mob.

## 4. Gắn vào mob (MythicMobs)

Dùng field **native** `Disguise:` ở cấp mob (ngang hàng `Type`, `Health`,
`Damage`) — **không cần** thêm skill `disguise{d="..."}` nữa (cách gọi qua
skill từng bị chặn bởi giới hạn bản free ở bước setSkin inline):

```yaml
VAMPIRE_LORD_BOSS:
  Type: WITHER_SKELETON
  Disguise: vampirelordboss
  ...
```

Reload nếu cần rồi spawn thử:

```
/libsdisguises reload
/mm mobs spawn <MOB_ID>
```

## 5. Bẫy thường gặp

- **Phân biệt hoa/thường**: LibsDisguises có vẻ khớp tên saved-disguise theo
  đúng case cuối cùng được dùng để lưu (test thực tế: lưu bằng chữ thường thì
  gọi lại bằng chữ hoa sẽ không khớp, rớt về da mặc định). Luôn dùng **chữ
  thường toàn bộ, nhất quán** ở cả 3 chỗ: tên khi `/savedisguise`, khi test
  `/disguise player <tên>`, và trong field `Disguise:` của mob.
- **`profileName` lạ trong JSON texture (vd: "_Vex_TV") là BÌNH THƯỜNG** —
  đó là tài khoản trung gian mà LibsDisguises/MineSkin dùng để upload hộ da
  custom lên Mojang, không phải dấu hiệu da bị lưu sai hay bị "cướp" da
  người khác. Muốn xác minh da đã upload đúng chưa: giải mã base64 field
  `value` trong JSON để lấy `url` (dạng `textures.minecraft.net/texture/...`)
  rồi tải ảnh về xem trực tiếp — đáng tin hơn là suy đoán qua `profileName`.
- **Không disguise tràn lan cho mob thường** — xem ghi chú ở
  `plugins/MythicMobs/mobs/prison_rank_mobs.yml` (dòng ~20): bộ mob rank
  X-Prison đã CHỦ Ý bỏ disguise, chỉ dùng texture vanilla theo `Type`. Chỉ
  gắn `Disguise:` cho boss/mob đặc biệt được yêu cầu riêng.

## 6. Tham khảo thực tế trong repo

- Mob: `plugins/MythicMobs/mobs/vampire_lord_boss.yml` (`VAMPIRE_LORD_BOSS`)
- Named disguise: `plugins/LibsDisguises/configs/disguises.yml` → khóa
  `vampirelordboss`
- File skin gốc: `plugins/LibsDisguises/Skins/VAMPIRE_LORD_BOSS_SKIN.png`
