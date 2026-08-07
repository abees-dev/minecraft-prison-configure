# Cân bằng tiền tệ Prison và Bang Hội

Cập nhật: 2026-08-07. Đây là tài liệu **live** cho thang tiền hiện tại.

## Nguyên tắc

- Kênh bán khoáng chính là **Bang Vault → Bán Tất Cả**; `/sellgui` dùng cùng giá base nhưng không có multiplier Bang.
- Server không dùng X-Prison AutoSell để cân bằng thu nhập này.
- Ngày 2026-08-07, toàn bộ giá Gang Sell được nhân `10` để tăng độ lớn số tiền hiển thị.
- Các money sink chính cũng nhân `10`, nên thời gian progression mục tiêu không đổi.
- Phần thưởng tiền cố định không nhân theo đợt này; đây là chủ ý để hạn chế nguồn lạm phát phụ.

## Công thức Gang Sell

```text
tiền nhận = tổng(số lượng item × sell-prices[item]) × hệ số Bang
```

Hệ số Bang gồm:

- Sell Upgrade: `+10%` mỗi cấp, tối đa `+50%`.
- Paragon Sell: `+1%` mỗi cấp, tối đa `+20%`.
- Buff Sell trong shop hoặc thưởng tuần: hệ số cấu hình, hiện là `x2`.

Mốc kiểm thử nền: cuốc max, map gần cuối, Bang chưa nâng Sell đạt khoảng
`5 triệu/phút`. Các multiplier được áp dụng sau mốc nền này.

## Giá khoáng live

| Nhóm | Item | Ore | Block nén |
| --- | ---: | ---: | ---: |
| Stone | 10 | — | — |
| Cobblestone | 20 | — | — |
| Coal | 80 | 80 | 720 |
| Raw Iron | 100 | 100 | 900 |
| Iron Ingot | 200 | — | 1.800 |
| Raw Gold | 200 | 200 | 1.800 |
| Gold Ingot | 400 | — | 3.600 |
| Redstone | 150 | 150 | 1.350 |
| Lapis | 80 | 80 | 720 |
| Quartz | 20 | 20 | 80 (4 Quartz) |
| Diamond | 1.000 | 1.000 | 9.000 |
| Emerald | 1.500 | 1.500 | 13.500 |
| Ancient Debris / Scrap | 2.000 | 2.000 | — |
| Netherite Ingot | 6.000 | — | 54.000 |

Nguồn cấu hình:

- `plugins/CorePlugin/gang/config.yml` → `sell-prices`.
- `plugins/EconomyShopGUI/shops/Ores.yml` → giá `/sellgui`, đồng bộ cùng base.

## Money sink đã tăng ×10

- Rank money: `850K → 3B` cho Rank 2–9.
- Prestige đầu: `7,5B`, sau đó tăng `×1,3` mỗi Prestige.
- Giá nền nâng cuốc theo rank: `50K → 40M`.
- Tạo Bang, nâng Bang và toàn bộ permanent upgrade.
- Mở/reset Quest Bang, mở rộng kho, buff shop và Paragon.
- Mua mạng Bang Chiến, warp Bang và chi phí đục lỗ trang bị.

Điểm, token, gem, danh vọng và chi phí vật phẩm không bị nhân trong đợt này.

## Quy tắc quy đổi và chống lách giá

- Ore có cùng giá với item thô tương ứng.
- Block nén thông thường bằng `9 × item`.
- Quartz Block bằng `4 × Quartz`.
- Netherite Block bằng `9 × Netherite Ingot`.
- Không đặt giá block nén cao hơn tổng nguyên liệu cấu thành.

## Checklist kiểm thử

1. Dùng tài khoản không OP và Bang chưa nâng Sell.
2. Dọn sạch vault, đào đúng 60 giây tại map 8 và map 9.
3. Ghi số lượng từng item trong vault rồi bấm **Bán Tất Cả**.
4. Đối chiếu tiền thực nhận với công thức trong tài liệu này.
5. Lặp lại với Sell cấp 5, Paragon tối đa và buff `x2` riêng biệt.
6. Nếu chỉnh giá bán, đồng bộ cả Gang và EconomyShopGUI.
7. Nếu chỉnh giá bán theo hệ số `k`, chỉnh money sink chính cùng hệ số `k`.

## Reload

Sau khi thay đổi cấu hình Bang dùng `/gang reload`. Rank/Prestige và cấu hình
nâng cuốc cần reload module tương ứng hoặc restart server nếu bản plugin đang chạy
không hỗ trợ hot reload phần đó.
