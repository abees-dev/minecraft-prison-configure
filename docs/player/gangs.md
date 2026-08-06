# Hướng dẫn chơi Bang Hội

Cập nhật: 2026-08-05 · Lối chơi tổng: [`gameplay.md`](gameplay.md) · Config/ops: [`plugins/CorePlugin/gang/README.md`](../README.md)

**Lệnh chính:** `/gang` (alias `/banghoi`, `/bang`)

> **Bang Chiến** đang phát triển tiếp — lịch, luật cơ bản đã có; spawn mob / điểm lính / cân bằng có thể đổi. Xem §8.

---

## 1. Bang Hội là gì?

Bang Hội là hệ **nhóm** của server: kho quặng chung, ngân hàng chung, nâng cấp buff bán/đào/PvP, quest nhóm, tranh **Mỏ VIP (KOTH)**, và sự kiện **Bang Chiến**.

| Việc cá nhân | Việc qua bang |
| --- | --- |
| `/sellgui` — bán quặng **giá cố định** (không nhân) | Nạp vault → **Bán Tất Cả** → tiền vào **bank bang** (có nhân Sell / buff / paragon) |
| `/dailyquest` — quest ngày cá nhân | `/gang quest` / `/gang personal` / `/gang weekly` |

**Quy tắc vàng:** muốn kiếm nhiều hơn từ bán quặng → vào bang, nạp kho, nâng **Sell**, rồi Sell All.

---

## 2. Bắt đầu

### Tạo bang

```
/gang create <tên> <prefix>
```

- Tên tối đa 30 ký tự; prefix (tag) tối đa 6 ký tự hiển thị.
- Phí tạo tăng theo số bang đã có trên server: **100k → 250k → 500k → 1M** (Vault cá nhân).
- Mặc định: **5** slot thành viên, sức chứa kho **256**.

Hoặc mở `/gang` → Duyệt bang → tạo qua chat prompt.

### Vào bang có sẵn

1. Được mời: `/gang accept` hoặc `/gang deny` (mời hết hạn ~5 phút).
2. Xin vào: menu Duyệt bang → gửi đơn → Leader/Co duyệt trong GUI.

### Role

| Role | Làm được gì (tóm tắt) |
| --- | --- |
| **LEADER** | Full quyền; giải tán; mua mạng Bang Chiến; mở quest shared tới Lv3 |
| **CO_LEADER** | Invite, Sell All vault, upgrade, set home, mở quest shared tới Lv1 |
| **MEMBER** | Nạp vault/bank, làm quest, join war, toggle nạp kho (khi Bang Lv ≥ 3) |

Leader **không** leave được — phải `/gang promote` rồi leave, hoặc `/gang disband` (mất bank + kho).

---

## 3. Vòng chơi mỗi ngày (nên làm)

1. Đào mỏ theo rank → giữ quặng whitelist (xem §4).
2. `/gang` → **Kho** → bỏ quặng vào (hoặc bật auto-nạp nếu đủ Bang Lv).
3. Leader/Co: **Bán Tất Cả** → tiền + danh vọng phục vụ nâng cấp.
4. `/gang personal` — 2 quest cá nhân/ngày → `/gang personal claim` (+5k tiền, +20 danh vọng bang).
5. Leader/Co mở `/gang quest` shared nếu còn lượt ngày.
6. Check `/gang koth` — tranh Mỏ VIP khi bang online.
7. (Tối) Bang Chiến **20:00** VN — `/gang war join` hoặc `/bangchien` (đang phát triển, §8).

---

## 4. Kho (Vault) & Ngân hàng (Bank)

### Kho quặng

- Chỉ nhận vật liệu trong whitelist (quặng/ingot từ mỏ prison — stone, coal, iron, gold, diamond, emerald, debris…).
- Mỗi item nạp → **+1 danh vọng** bang.
- **Bang Level ≥ 3:** mỗi member tự bật/tắt nạp kho của mình trong GUI.
- Có thể lấy quặng ra; **cùng lúc chỉ 1 người mở kho** (chống dupe).
- **Bán Tất Cả** (Leader/Co): tiền vào **bank bang**, nhân bởi:
  - Upgrade **Sell** (+10%/cấp, tối đa 5)
  - Buff shop Sell ×2 (1 giờ)
  - **Paragon Sell** (sau khi Bang Level max)

### Ngân hàng

```
/gang bank nap <số>
/gang bank rut <số>
```

(Menu có nút số sẵn + nhập chat.)

- **Thuế nạp bank: 30%** — nạp 100k thì bank nhận ~70k. Ưu tiên nạp **quặng vào kho** rồi Sell All thay vì nạp tiền thô khi có thể.
- Tiền bank dùng: Bang Level, upgrade, shop, phí mở quest, mua mạng war (Leader).

---

## 5. Bang Level, Upgrade & Shop

### Bang Level (tối đa 10)

Trả **danh vọng + tiền bank**. Mỗi level:

- +**50** sức chứa kho
- Mở khóa tier upgrade cao hơn

### Upgrade vĩnh viễn (ưu tiên gợi ý)

| Ưu tiên sớm | Hiệu ứng |
| --- | --- |
| **Sell** | Nhân tiền Sell All |
| **Magnet** | +% quặng khi nạp vault (+5%/cấp) |
| Quest Capacity / Efficiency / Mastery | Nhiều lượt / rẻ hơn / thưởng quest hơn |

| Ưu tiên mid–late | Hiệu ứng |
| --- | --- |
| **Warlord** | +% sát thương PvP vs bang khác (cap 20%) |
| **Protection** | −% sát thương nhận từ bang khác (cap 40%) |
| **KOTH Control** | Chiếm nhanh hơn / defense lâu hơn |

Cùng bang: **không** áp Warlord/Protection (friendly fire vẫn full ngoài war).

### Shop (chỉ trừ bank)

- Mở rộng slot / sức chứa kho (vĩnh viễn)
- Buff tạm: Sell ×2, Haste, EXP MMOCore ×1.25 (mỗi buff ~1 giờ)

### Paragon Sell

Khi Bang Level đã max: mua thêm % Sell (tối đa 20 cấp, +1%/cấp).

---

## 6. Quest Bang

| Loại | Lệnh | Ghi chú |
| --- | --- | --- |
| **Shared** | `/gang quest` (GUI) · `/gang quest info` | Leader/Co mở; Member làm chung |
| **Personal** | `/gang personal` · `claim` | 2 quest/ngày/người |
| **Weekly** | `/gang weekly` | 4 quest/bang/tuần (reset Thứ 2) |

### Shared (board chung)

- Mặc định **1** lần mở/ngày (+ Quest Capacity + **Phiếu Quest Bang**).
- 3 cấp: càng cao càng cần nhiều member/online, phí cao, thời gian 60/90/120 phút.
- Phải **làm hết** bộ nhiệm vụ trong thời gian → thưởng danh vọng (+ Mastery) + điểm mùa.
- Mở / reset / dùng phiếu: **chỉ trong GUI** (không có lệnh mở).

Khác `/dailyquest` — hai hệ độc lập.

---

## 7. KOTH — Mỏ VIP

- Đứng trong vùng Mỏ VIP **không bị tranh** đủ ~60 giây → bang chiếm.
- Thành viên bang chủ: đào được nhân mạnh (`owner-multiplier`).
- Người bang khác đào: một phần thu nhập vào **bank** bang chủ (tax).
- Sau chiếm có cửa sổ **defense** (không bị cướp ngay).
- Upgrade **KOTH Control** giúp chiếm nhanh / giữ lâu hơn.
- `/gang koth` — xem trạng thái.

---

## 8. Bang Chiến (đang phát triển tiếp)

Sự kiện PvP liên bang tại `world_pvp`. **Có thể thay đổi** khi cân bằng / code spawn mob hoàn thiện.

### Lịch & tham gia

| | |
| --- | --- |
| Giờ | **20:00** (Asia/Ho_Chi_Minh), lịch tự chạy |
| Thời lượng | ~30 phút (+ countdown trước giờ) |
| Join | `/gang war join` hoặc `/bangchien` |
| Leave / xem | `/gang war leave` · `/gang war status` |

Cần **đã vào bang**. Khi war đang chạy, warp PvP thường có thể bị chặn — vào qua lệnh war.

### Luật cơ bản (hiện tại)

- **4 Cổng Xuất** (Đông / Tây / Nam / Bắc): đứng chiếm → +điểm/giây khi giữ độc quyền; tranh chấp thì không ghi điểm.
- Hạ đối thủ: +điểm; diệt boss **Tổng Quản Ngục**: +điểm lớn.
- Mỗi người **2 mạng**; hết mạng = loại. Hồi sinh chờ ~60s.
- Leader có thể **mua thêm mạng** từ bank bang (giới hạn lượt/trận) trong GUI war.
- Trong trận: **tắt friendly fire** giữa cùng bang.
- Thắng khi đạt điểm mục tiêu, hết giờ (top điểm), hoặc last-standing.

### Thưởng thắng (config hiện tại)

Bank bang + danh vọng + điểm mùa (số cụ thể có thể chỉnh khi balance).

### Đang làm tiếp (player cần biết)

- Auto-spawn boss/lính và điểm hạ lính có thể **chưa ổn định** — đừng phụ thuộc farm mob war.
- Arena / spawn / cân bằng điểm có thể chỉnh sau soft-test.
- Theo dõi announce server trước giờ war.

Chi tiết ops/region: [`world-pvp-safezone.md`](../systems/world-pvp-safezone.md).

---

## 9. Season & Home

### Mùa bang (~28 ngày)

Điểm từ: clear quest shared, chiếm KOTH, hoàn thành weekly (+ war khi trao thưởng).

Hết mùa: top 1/2/3 nhận thưởng lớn vào **bank** bang.

`/gang season` — xem hạng.

### Home bang

```
/gang sethome   # Leader / Co
/gang home      # Thành viên — cooldown 120s, phí 1000 Vault
```

---

## 10. Cheat-sheet lệnh

| Lệnh | Mục đích |
| --- | --- |
| `/gang` | Menu chính |
| `/gang create <tên> <prefix>` | Tạo bang |
| `/gang invite <player>` | Mời |
| `/gang accept` / `deny` | Nhận / từ chối lời mời |
| `/gang bank nap\|rut <số>` | Ngân hàng |
| `/gang vault` / `shop` / `upgrade` / `quest` | Phím tắt GUI |
| `/gang personal` / `claim` | Quest cá nhân |
| `/gang weekly` / `season` / `koth` | Tuần / mùa / Mỏ VIP |
| `/gang sethome` / `home` | Home |
| `/gang war join\|leave\|status` | Bang Chiến |
| `/gang help` | Help in-game |

---

## 11. FAQ nhanh

**Sellgui không nhân?** Đúng — nhân chỉ qua Sell All kho bang.  
**Nạp bank bị mất tiền?** Thuế 30% trên nạp tiền; nạp quặng rồi Sell All hiệu quả hơn.  
**Leader leave?** Promote người khác hoặc disband.  
**Dailyquest vs gang quest?** Hai hệ khác nhau.  
**Bang Chiến lỗi / không có boss?** Đang phát triển — báo admin, đừng spam farm.

---

## Bản Discord / in-game

- Paste Discord: [`gangs-discord.md`](gangs-discord.md)
- Tip xoay: `plugins/CorePlugin/utility/broadcast.yml`
- Hologram hub: `plugins/DecentHolograms/holograms/GuideHub.yml`
- Help chat: `/gang help`
