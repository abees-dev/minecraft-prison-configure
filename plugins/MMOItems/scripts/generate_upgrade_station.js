const fs = require('fs');
const path = require('path');

const ranks = [
  { id: 'TAN_BINH', name: 'Tân Binh', rate: 85, safeRate: 100, stone: 1, crystal: 1, talisman: 'BUA_MAY_MAN_SO_CAP', talismanName: 'Bùa May Mắn Sơ Cấp' },
  { id: 'TU_NHAN', name: 'Tù Nhân', rate: 85, safeRate: 100, stone: 1, crystal: 1, talisman: 'BUA_MAY_MAN_SO_CAP', talismanName: 'Bùa May Mắn Sơ Cấp' },
  { id: 'LAO_CONG', name: 'Lao Công', rate: 70, safeRate: 95, stone: 2, crystal: 2, talisman: 'BUA_MAY_MAN_TRUNG_CAP', talismanName: 'Bùa May Mắn Trung Cấp' },
  { id: 'THO_DAO', name: 'Thợ Đào', rate: 70, safeRate: 95, stone: 2, crystal: 2, talisman: 'BUA_MAY_MAN_TRUNG_CAP', talismanName: 'Bùa May Mắn Trung Cấp' },
  { id: 'DOI_TRUONG', name: 'Đội Trưởng', rate: 50, safeRate: 85, stone: 4, crystal: 4, talisman: 'BUA_MAY_MAN_CAO_CAP', talismanName: 'Bùa May Mắn Cao Cấp' },
  { id: 'PHO_QUAN_NGUC', name: 'Phó Quản Ngục', rate: 50, safeRate: 85, stone: 4, crystal: 4, talisman: 'BUA_MAY_MAN_CAO_CAP', talismanName: 'Bùa May Mắn Cao Cấp' },
  { id: 'QUAN_NGUC', name: 'Quản Ngục', rate: 30, safeRate: 80, stone: 8, crystal: 8, talisman: 'DA_CUONG_HOA_THIEN_MENH', talismanName: 'Đá Thiên Mệnh' },
  { id: 'BA_CHU_NGUC_TU', name: 'Bá Chủ Ngục Tù', rate: 30, safeRate: 80, stone: 8, crystal: 8, talisman: 'DA_CUONG_HOA_THIEN_MENH', talismanName: 'Đá Thiên Mệnh' },
  { id: 'VUOT_NGUC', name: 'Vượt Ngục', rate: 15, safeRate: 70, stone: 16, crystal: 16, talisman: 'DA_CUONG_HOA_THIEN_MENH', talismanName: 'Đá Thiên Mệnh' },
];

let yaml = `name: '&8[&c✦&8] &c&lBÀN CƯỜNG HÓA TRANG BỊ (#page#/#max#)'
max-queue-size: 10
sound: BLOCK_ANVIL_USE
layout: default

items:
    fill:
        material: AIR
    no-recipe:
        material: GRAY_STAINED_GLASS_PANE
        name: '&aChưa Chọn Trang Bị'
    no-queue-item:
        material: GRAY_STAINED_GLASS_PANE
        name: '&aHàng Chờ Trống'

recipes:
`;

// Helper for weapon upgrade recipes
function addWeaponRecipe(type, id, r) {
  yaml += `    upgrade-${id.toLowerCase()}:
        item:
            type: ${type}
            id: ${id}
        crafting-time: 0
        options:
            success-rate: ${r.rate}
        ingredients:
        - mmoitem{type=CONSUMABLE,id=DA_CUONG_HOA_VU_KHI,amount=${r.stone},display="Đá Cường Hóa Vũ Khí"}
        - mmoitem{type=MATERIAL,id=TINHTHE_CUONGHOA_VUKHI,amount=${r.crystal},display="Tinh Thể Cường Hóa Vũ Khí"}

    upgrade-${id.toLowerCase()}-safe:
        item:
            type: ${type}
            id: ${id}
        crafting-time: 0
        options:
            success-rate: ${r.safeRate}
        ingredients:
        - mmoitem{type=CONSUMABLE,id=DA_CUONG_HOA_VU_KHI,amount=${r.stone},display="Đá Cường Hóa Vũ Khí"}
        - mmoitem{type=MATERIAL,id=TINHTHE_CUONGHOA_VUKHI,amount=${r.crystal},display="Tinh Thể Cường Hóa Vũ Khí"}
        - mmoitem{type=CONSUMABLE,id=${r.talisman},amount=1,display="${r.talismanName}"}

`;
}

// Helper for armor upgrade recipes
function addArmorRecipe(type, id, r) {
  yaml += `    upgrade-${id.toLowerCase()}:
        item:
            type: ${type}
            id: ${id}
        crafting-time: 0
        options:
            success-rate: ${r.rate}
        ingredients:
        - mmoitem{type=CONSUMABLE,id=DA_CUONG_HOA_GIAP,amount=${r.stone},display="Đá Cường Hóa Giáp"}
        - mmoitem{type=MATERIAL,id=TINHTHE_CUONGHOA_GIAP,amount=${r.crystal},display="Tinh Thể Cường Hóa Giáp"}

    upgrade-${id.toLowerCase()}-safe:
        item:
            type: ${type}
            id: ${id}
        crafting-time: 0
        options:
            success-rate: ${r.safeRate}
        ingredients:
        - mmoitem{type=CONSUMABLE,id=DA_CUONG_HOA_GIAP,amount=${r.stone},display="Đá Cường Hóa Giáp"}
        - mmoitem{type=MATERIAL,id=TINHTHE_CUONGHOA_GIAP,amount=${r.crystal},display="Tinh Thể Cường Hóa Giáp"}
        - mmoitem{type=CONSUMABLE,id=${r.talisman},amount=1,display="${r.talismanName}"}

`;
}

// Generate for all ranks
ranks.forEach(r => {
  for (let t = 1; t <= 5; t++) {
    addWeaponRecipe('SWORD', `SWORD_${r.id}_${t}`, r);
    addWeaponRecipe('AXE', `AXE_${r.id}_${t}`, r);
    addWeaponRecipe('STAFF', `STAFF_${r.id}_${t}`, r);
    addArmorRecipe('ARMOR', `HELMET_${r.id}_${t}`, r);
    addArmorRecipe('ARMOR', `CHESTPLATE_${r.id}_${t}`, r);
    addArmorRecipe('ARMOR', `LEGGINGS_${r.id}_${t}`, r);
    addArmorRecipe('ARMOR', `BOOTS_${r.id}_${t}`, r);
  }
});

// Gacha Weapons
const gachaRank = ranks[8]; // Vượt Ngục stats
addWeaponRecipe('SWORD', 'GACHA_SWORD_DEMON_SLAYER', gachaRank);
addWeaponRecipe('SWORD', 'GACHA_SWORD_DARK_SOUL_KATANA', gachaRank);
addWeaponRecipe('SWORD', 'GACHA_SWORD_AZURE_FROST', gachaRank);
addWeaponRecipe('SWORD', 'GACHA_SWORD_PHANTOM_PARTISAN', gachaRank);

const stationPath = 'd:/server-minecraft/plugins/MMOItems/crafting-stations/equipment-upgrade-station.yml';
fs.writeFileSync(stationPath, yaml, 'utf8');
console.log('✅ Đã khởi tạo xong GUI Bàn Cường Hóa Trang Bị (item: upgrade recipes)!');
