# Hệ thống Pet — ghi chú

Cập nhật: 2026-07-29.

## Trạng thái

| Phần | Trạng thái |
| --- | --- |
| Type MMOItems `PET` + ô RPGInventory slot 14 | Đã có |
| 10 pet TRADE/DONATE (chỉ số) | Đã có — [`plugins/MMOItems/item/pet.yml`](../../plugins/MMOItems/item/pet.yml) |
| `skull-texture` / skin đầu | Chưa — gắn sau |
| Phụ trợ đào (auto-pickup + buff bán) | **TODO CorePlugin** (không làm Skript) |

## Catalog

TRADE = DONATE về chỉ số (~50 pts/món). Không vào item-sets jewelry.

| TRADE | DONATE | Chỉ số |
| --- | --- | --- |
| `TRADE_PET_HOA_LONG` | `DONATE_PET_LONG_CHIEN` | phys-dmg 15, crit chance 5, HP 40 |
| `TRADE_PET_HAC_LONG` | `DONATE_PET_LONG_THAN` | magic-dmg 15, mana 40, HP 40 |
| `TRADE_PET_LOI_LONG` | `DONATE_PET_LONG_HOANG` | attack-speed 15, lifesteal 4, HP 30 |
| `TRADE_PET_PHONG_LONG` | `DONATE_PET_LONG_DE` | dodge 8, phys-dmg 12, HP 30 |
| `TRADE_PET_BANG_LONG` | `DONATE_PET_LONG_VE` | HP 80, defense 8 |

Material: `PLAYER_HEAD`, `custom-maxsockets: 5`, `lore-format: jewelry-lore`.

## Lệnh

```
/mmoitems reload
/mi give PET TRADE_PET_BANG_LONG
/mi give PET DONATE_PET_LONG_VE
```

Gắn vào **Ô Pet** (MMOInventory / RPGInventory, slot 14).

## TODO CorePlugin — PetsModule

Spec phụ trợ (chưa implement):

- Detect: NBT `MMOITEMS_ITEM_TYPE=PET`, ID prefix `TRADE_PET_` / `DONATE_PET_`
- Cache khi `net.Indyuce.inventory.api.event.ItemEquipEvent` (slot `PET`)
- **Auto-pickup**: `BlockBreakEvent` trong mine WG (`tan_binh` … `vuot_nguc`) → đưa drops vào túi
- **Sell bonus cộng thêm** (không dùng ESG sell-multipliers vì lấy max với rank/VIP):
  - TRADE: **+3%**
  - DONATE: **+8%**
  - Hook: `me.gypopo.economyshopgui.api.events.PostTransactionEvent` + Vault `EconomyHook`
- Hook sẵn trong CorePlugin: `MMOItemsHook`, `EconomyHook`

Ngoài scope hiện tại: visual companion, FREE_ pets, NPC/crate drop.
