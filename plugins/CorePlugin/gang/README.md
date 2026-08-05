# Gang (Bang Hội) — Lối chơi & Config

Tài liệu đi kèm module `gang`. File YAML nằm cạnh docs này trong
`plugins/CorePlugin/gang/` (sau lần enable đầu) hoặc trong jar tại
`gang/`. Reload YAML: `/gang reload` — **không** đổi `storage.type` khi đang
chạy (cần restart).

**Server:** Paper 1.19.4+  
**Soft-depend:** Vault (economy), WorldGuard (KOTH), MMOItems (phiếu quest /
station craft), MythicMobs (kill quest), MMOCore (buff EXP shop).

---

## 1. Lối chơi (tóm tắt)

### 1.1 Tạo bang & thành viên

| Hành động | Ai làm | Ghi chú |
|-----------|--------|---------|
| Tạo bang | Player | Trả phí Vault theo `create.costs` (index = số bang hiện có) |
| Mời / accept / deny | Leader/Co (invite) | Invite hết hạn `invite.timeout-seconds` |
| Kick / promote / demote | Theo `roles` | Leader không leave được — phải disband hoặc promote trước |
| Disband | Leader only | Confirm GUI; mất bank + kho |

Role: `LEADER` · `CO_LEADER` · `MEMBER`. Gate hành động trong `roles:`
(`upgrade`, `shop`, `open-quest`, …).

### 1.2 Bank & Vault

- **Bank:** tiền chung bang (nạp từ player / rút role-gated). Menu có nút số
  sẵn + nhập số chat (`bank.custom-amount-timeout-seconds`).
- **Vault:** kho quặng whitelist (`ore-whitelist` + `sell-prices` khớp
  EconomyShopGUI `Ores.yml` base).
  - Toggle nạp kho **theo member** — cần Bang Lv ≥ `vault.required-level`.
  - `vault.allow-take: true` → lấy quặng ra GUI; cùng lúc chỉ 1 người mở kho
    (anti-dupe).
  - Sell All (role) → tiền vào bank, có nhân Sell upgrade + buff shop/paragon
    (**đây là kênh sell-multiplier duy nhất** — `/sellgui` cá nhân không nhân).

**Danh vọng (reputation):** cộng khi nạp kho (`reputation-per-item`). Dùng
chung với money bank để mua Bang Level / upgrade permanent.

### 1.3 Bang Level & Upgrade permanent

**Bang Level** (GUI Nâng cấp, slot trên cùng): trả rep + bank → tăng level,
mỗi level +`level.vault-capacity-per-level` sức chứa kho, và **mở khóa tier
upgrade** theo `required-bang-levels`.

**Upgrade permanent** (rep + bank, cap `max-level`):

| Upgrade | Hiệu ứng |
|---------|----------|
| Sell | Nhân tiền Sell All |
| Magnet | % quặng thêm khi nạp vault |
| Protection | Giảm damage PvP từ player bang khác |
| Quest Mastery | +% thưởng rep + season points khi clear quest shared |
| Quest Efficiency | −% phí open/reset (money+rep) |
| Quest Capacity | + daily opens shared quest |
| Warlord | +% damage gây ra vs player bang khác |
| KOTH Control | Capture nhanh hơn / defense dài hơn |

Gate: để mua upgrade **Lv N** cần Bang Level ≥ `required-bang-levels[N-1]`.
Thiếu list → fallback 1:1 (Lv N cần Bang Lv N).

**Paragon Sell:** chỉ khi Bang Level max + `paragon.enabled` — cộng thêm %
Sell (stack với Sell upgrade).

### 1.4 Shop (timed / mua một lần)

Trả **chỉ bank** (không rep):

| Item | Loại |
|------|------|
| Expand slots / capacity | Vĩnh viễn |
| Buff Sell xN | Timed |
| Buff Haste | Timed (áp online members) |
| Buff MMOCore EXP | Timed (cần MMOCore) |

### 1.5 Quest

**Shared board (GUI `/gang quest`):**

- Mở / reset / dùng phiếu = **chỉ GUI** (command chỉ `info`).
- Mỗi ngày `quest.daily-opens` (+ Quest Capacity + phiếu).
- Mở cấp 1/2/3: cần member/online tối thiểu, trừ open-cost (đã giảm bởi
  Efficiency), random `pick-count` quest từ `quests.yml`.
- Làm **hết** objective → thưởng rep bang (Mastery tăng thêm) + season points.
- Reset: vài lần free rồi trả `reset-cost` (tối đa `max-paid-resets`).

**Personal** (`/gang personal`): quest cá nhân theo ngày.  
**Weekly:** board tuần, thưởng rep + buff sell tạm.  
Pool: `quests.yml` (`levels` / `personal` / `weekly`).

Loại objective phổ biến:

- `KILL_MOB` — MythicMobs only (`filter` = internal name)
- `BREAK_BLOCK` — Material + **bắt buộc** `worlds`
- `STATION_CRAFT` — MMOItems station (result type/id), không đếm vanilla craft

### 1.6 KOTH (Mỏ VIP)

WorldGuard region (`koth.region` / xoay `koth.regions`). Đứng một mình
trong region đủ giây → chiếm. Owner nhận nhân `owner-multiplier` khi đào;
người khác đóng `tax-rate` vào bank owner. Defense window sau capture.
Upgrade **KOTH Control** rút ngắn capture / kéo dài defense.

### 1.7 Home & Season

- `/gang sethome` · `/gang home` (cooldown `home.warp-cooldown-seconds`).
- Season điểm từ quest clear / KOTH / weekly — hết mùa top nhận thưởng bank
  (`season.top-rewards`).

### 1.8 PvP

- Cùng bang: không áp Warlord/Protection (friendly fire vẫn full).
- Khác bang: Warlord (attacker) rồi Protection (victim).

### 1.9 Bang Chiến — mob tại cổng (TODO CorePlugin)

MythicMobs đã có `TONG_QUAN_NGUC` và `TONG_QUAN_NGUC_LINH`.
Spec scheduler/ưu tiên gate đang giữ/điểm kill/cleanup nằm tại
[`docs/world-pvp-safezone-notes.md`](../../../docs/world-pvp-safezone-notes.md),
mục **“TODO CorePlugin — tự spawn boss và lính war”**.

Tóm tắt yêu cầu: lính ×4 mỗi 30 giây, boss đầu trận + mỗi 5 phút; chọn ngẫu
nhiên một cổng đang được bang giữ; kill lính +3 điểm, boss +100 điểm.

---

## 2. Lệnh

| Lệnh | Mô tả |
|------|--------|
| `/gang` | Menu chính |
| `/gang create <tên> <prefix>` | Tạo bang |
| `/gang invite \| accept \| deny` | Mời / nhận / từ chối |
| `/gang bank nap\|rut <số>` | Bank (hoặc dùng GUI) |
| `/gang vault \| shop \| upgrade \| quest` | Shortcut GUI |
| `/gang quest info` | Quest đang chạy (read-only) |
| `/gang personal [claim]` | Quest cá nhân |
| `/gang weekly \| season \| koth` | Info |
| `/gang sethome \| home` | Home bang |
| `/gang reload` | Admin — reload YAML |
| `/gang givereputation <bang> <n>` | Admin |
| `/gang resetquestopens <bang>` | Admin — reset lượt mở ngày |

Alias: `/banghoi`, `/bang`.

---

## 3. File trong thư mục `gang/`

| File | Vai trò |
|------|---------|
| `config.yml` | Tunables: create, upgrades, quest, koth, shop, roles, season, home, storage |
| `messages.yml` | Chuỗi chat người chơi |
| `gui.yml` | Title GUI, `bank-amounts`, override item lore |
| `gui-templates.yml` | Template item dùng chung |
| `quests.yml` | Pool objective shared / personal / weekly |
| `schema-*.sql` | Schema DB (apply lúc enable) |
| `README.md` | File này |

DB: SQLite mặc định (`storage.sqlite.file`) hoặc MySQL (`storage.type: mysql`).

---

## 4. Config quan trọng (`config.yml`)

### Tạo bang / GUI spam

```yaml
create.costs: [...]          # Phí tạo theo số bang hiện có
gui.click-cooldown-millis    # Anti double-click menu
```

### Upgrade + Bang Level

```yaml
upgrades.<id>.max-level
upgrades.<id>.required-bang-levels: [..]  # Bang Lv tối thiểu từng tier
upgrades.<id>.reputation-costs / money-costs
level.max-level / reputation-costs / money-costs / vault-capacity-per-level
paragon.enabled / max-level / sell-bonus-per-level / costs
```

Ví dụ mặc định: Sell/Magnet/Protection `[1,2,3,4,5]`; Quest `[2,3,4,6,8]`;
Warlord/KOTH `[3,4,6,8,10]`.

### Quest shared

```yaml
quest.daily-opens / reset-hour / free-resets / max-paid-resets
quest.ticket.mmoitems-type / mmoitems-id
quest.levels.<n>.min-members / min-online / pick-count / duration-minutes
quest.levels.<n>.open-cost / reset-cost / reward-reputation
```

### Shop buffs

```yaml
shop.expand-slots / expand-capacity
shop.buff-sell-2x / buff-haste / buff-mmocore-exp
  # cost, duration-seconds, multiplier|amplifier
```

### KOTH / roles / season / home / storage

Xem comment trong `config.yml` tại các block `koth:`, `roles:`, `season:`,
`home:`, `storage:`.

---

## 5. Soft-dep thiếu thì sao?

| Plugin thiếu | Hệ quả |
|--------------|--------|
| Vault | Không tạo bang / bank / sell tiền |
| WorldGuard | KOTH tắt / không capture |
| MMOItems | Không phiếu quest / không STATION_CRAFT |
| MythicMobs | KILL_MOB không tiến triển |
| MMOCore | Buff EXP shop không nhân EXP (log warning) |

---

## 6. Gợi ý cân bằng

1. Tăng `required-bang-levels` PvP/Quest nếu economy quá nhanh.  
2. `quest.daily-opens` + Capacity quyết định nhịp farm danh vọng.  
3. KOTH `tax-rate` / `owner-multiplier` điều chỉnh tranh mỏ.  
4. Sau khi sửa YAML: `/gang reload` — kiểm tra message/GUI; đổi DB → restart.

---

*CorePlugin module `gang` — cập nhật theo code hiện tại (upgrade gates,
shop MMOCore EXP, Warlord/KOTH Control, GUI layout).*
