/**
 * Script tự động khởi tạo và tính toán chỉ số CÂN BẰNG cho Vũ khí MMOItems (Kiếm, Rìu Chiến, Trượng Phép)
 * Tích hợp sẵn số Ô Khảm (Gem Sockets) theo Rank:
 * - Tân Binh, Tù Nhân: 0 ô
 * - Lao Công: 1 ô
 * - Thợ Đào: 2 ô
 * - Đội Trưởng: 3 ô
 * - Phó Quản Ngục, Quản Ngục: 4 ô
 * - Bá Chủ Ngục Tù, Vượt Ngục: 5 ô (MAX)
 * Run: node scripts/generate_weapons.js
 */

const fs = require('fs');
const path = require('path');

const ranks = [
  { id: 'TAN_BINH', name: 'Tân Binh', color: '&f', tier: 'TRASH', durability: 500, swordMat: 'WOODEN_SWORD', axeMat: 'WOODEN_AXE', staffMat: 'STICK' },
  { id: 'TU_NHAN', name: 'Tù Nhân', color: '&a', tier: 'COMMON', durability: 1000, swordMat: 'STONE_SWORD', axeMat: 'STONE_AXE', staffMat: 'STICK' },
  { id: 'LAO_CONG', name: 'Lao Công', color: '&b', tier: 'UNCOMMON', durability: 2000, swordMat: 'IRON_SWORD', axeMat: 'IRON_AXE', staffMat: 'BONE' },
  { id: 'THO_DAO', name: 'Thợ Đào', color: '&e', tier: 'RARE', durability: 3000, swordMat: 'IRON_SWORD', axeMat: 'IRON_AXE', staffMat: 'BONE' },
  { id: 'DOI_TRUONG', name: 'Đội Trưởng', color: '&6', tier: 'VERY_RARE', durability: 4500, swordMat: 'DIAMOND_SWORD', axeMat: 'DIAMOND_AXE', staffMat: 'BLAZE_ROD' },
  { id: 'PHO_QUAN_NGUC', name: 'Phó Quản Ngục', color: '&c', tier: 'LEGENDARY', durability: 6000, swordMat: 'DIAMOND_SWORD', axeMat: 'DIAMOND_AXE', staffMat: 'BLAZE_ROD' },
  { id: 'QUAN_NGUC', name: 'Quản Ngục', color: '&d', tier: 'MYTHICAL', durability: 8000, swordMat: 'NETHERITE_SWORD', axeMat: 'NETHERITE_AXE', staffMat: 'END_ROD' },
  { id: 'BA_CHU_NGUC_TU', name: 'Bá Chủ Ngục Tù', color: '&5', tier: 'EPIC', durability: 10000, swordMat: 'NETHERITE_SWORD', axeMat: 'NETHERITE_AXE', staffMat: 'END_ROD' },
  { id: 'VUOT_NGUC', name: 'Vượt Ngục', color: '&4', tier: 'UNIQUE', durability: 15000, swordMat: 'NETHERITE_SWORD', axeMat: 'NETHERITE_AXE', staffMat: 'END_ROD' },
];

const romanMap = ['I', 'II', 'III', 'IV', 'V'];

function getSocketsYAML(rIdx) {
  const socketCounts = [0, 0, 1, 2, 3, 4, 4, 5, 5];
  const count = socketCounts[rIdx] || 0;
  if (count === 0) return '';
  let res = '    gem-sockets:\n';
  for (let i = 0; i < count; i++) {
    res += '      - Uncolored\n';
  }
  return res;
}

// 1. Công thức Kiếm (Sword)
function getSwordStats(rIdx, tIdx) {
  const baseDmg = [3.0, 5.0, 7.5, 10.5, 14.0, 18.5, 24.0, 31.0, 39.0][rIdx];
  const stepDmg = [0.375, 0.5, 0.625, 0.75, 1.0, 1.25, 1.5, 1.75, 2.25][rIdx];
  const dmg = baseDmg + (stepDmg * tIdx);
  
  const baseCrit = [1, 3, 5, 8, 10, 12, 15, 18, 20][rIdx];
  const crit = baseCrit + (tIdx * 0.5);

  const basePhysDmg = [0, 0, 0, 0, 3.0, 6.0, 9.0, 12.0, 15.0][rIdx];
  const stepPhysDmg = [0, 0, 0, 0, 0.5, 0.5, 0.5, 0.5, 1.0][rIdx];
  const physicalDamage = basePhysDmg > 0 ? basePhysDmg + (stepPhysDmg * tIdx) : 0;

  return { dmg, speed: 1.6, crit, physicalDamage };
}

// 2. Công thức Rìu Chiến (Combat Axe)
function getAxeStats(rIdx, tIdx) {
  const baseDmg = [4.0, 6.5, 9.5, 13.0, 17.5, 23.0, 29.0, 37.0, 46.0][rIdx];
  const stepDmg = [0.5, 0.625, 0.75, 0.875, 1.125, 1.375, 1.75, 2.0, 2.5][rIdx];
  const dmg = baseDmg + (stepDmg * tIdx);
  
  const baseKnockback = [0.2, 0.4, 0.6, 0.8, 1.0, 1.2, 1.5, 1.8, 2.0][rIdx];
  const knockback = baseKnockback + (tIdx * 0.05);

  const baseCritPwr = [0, 0, 0, 0, 10, 15, 20, 25, 30][rIdx];
  const critPwr = baseCritPwr > 0 ? baseCritPwr + (tIdx * 1) : 0;

  return { dmg, speed: 1.0, knockback, critPwr };
}

// 3. Công thức Trượng Phép (Staff)
function getStaffStats(rIdx, tIdx) {
  const baseDmg = [2.5, 4.5, 7.0, 10.0, 13.5, 18.0, 23.5, 30.0, 38.0][rIdx];
  const stepDmg = [0.375, 0.5, 0.625, 0.75, 1.0, 1.25, 1.5, 1.75, 2.0][rIdx];
  const dmg = baseDmg + (stepDmg * tIdx);
  
  const baseMagic = [5, 10, 18, 28, 40, 55, 75, 100, 130][rIdx];
  const magic = baseMagic + (tIdx * 2);

  const manaCost = [3, 4, 5, 6, 8, 10, 12, 14, 16][rIdx];

  const baseSpellVamp = [0, 0, 0, 0, 1.5, 3.0, 4.5, 6.0, 8.0][rIdx];
  const spellVamp = baseSpellVamp > 0 ? baseSpellVamp + (tIdx * 0.3) : 0;

  return { dmg, magic, manaCost, spellVamp };
}

const baseDir = path.join(__dirname, '..');

// Generate sword.yml
let swordContent = '';
ranks.forEach((r, rIdx) => {
  for (let t = 0; t < 5; t++) {
    const tierNum = romanMap[t];
    const id = `SWORD_${r.id}_${t + 1}`;
    const stats = getSwordStats(rIdx, t);
    
    swordContent += `${id}:
  base:
    material: ${r.swordMat}
    name: "${r.color}Kiếm ${r.name} &e&l${tierNum}"
    max-durability: ${r.durability}
    tier: ${r.tier}
    hide-enchants: true
    lore-format: weapon-lore
    lore:
      - "&b&l✦ Tiểu Sử"
      - "&7 &b●&7 Vũ khí cận chiến sắc bén của ${r.name}"
      - "&7 &b●&7 Nâng cấp tại Lò Rèn để tăng sát thương"
    attack-damage: ${stats.dmg.toFixed(1)}
    attack-speed: ${stats.speed}
    critical-strike-chance: ${stats.crit.toFixed(1)}
`;
    if (stats.physicalDamage > 0) {
      swordContent += `    physical-damage: ${stats.physicalDamage.toFixed(1)}\n`;
    }
    swordContent += getSocketsYAML(rIdx);
    swordContent += `    will-break: false
    unbreakable: false

`;
  }
});

swordContent += `GACHA_SWORD_DEMON_SLAYER:
  base:
    material: IRON_SWORD
    custom-model-data: 10017
    itemsadder-item: "fantasy_weapons:demonslayers_greatsword"
    name: "&c&lMa Kiếm Thần Long &7[&6&lGACHA&7]"
    max-durability: 20000
    tier: UNIQUE
    hide-enchants: true
    lore-format: weapon-lore
    lore:
      - "&b&l✦ Vật Phẩm Gacha Độc Quyền"
      - "&7 &c●&7 Cổ kiếm diệt rồng chứa sức mạnh ma thuật cổ xưa"
      - "&7 &c●&7 Sát thương bộc phát cực cao & phần trăm sát thương gia tăng"
    attack-damage: 53.0
    attack-speed: 1.6
    critical-strike-chance: 25.0
    physical-damage: 25.0
    pve-damage: 15.0
    ability:
      ability-1:
        type: DRAGON_BREATH
        mode: RIGHT_CLICK
        cooldown: 8.0
        damage: 20.0
    gem-sockets:
      - Uncolored
      - Uncolored
      - Uncolored
      - Uncolored
      - Uncolored
    will-break: false
    unbreakable: false

GACHA_SWORD_DARK_SOUL_KATANA:
  base:
    material: IRON_SWORD
    custom-model-data: 10012
    itemsadder-item: "fantasy_weapons:gloomsteel_katana"
    name: "&5&lĐêm Tối Diệt Vong &7[&6&lGACHA&7]"
    max-durability: 20000
    tier: UNIQUE
    hide-enchants: true
    lore-format: weapon-lore
    lore:
      - "&b&l✦ Vật Phẩm Gacha Độc Quyền"
      - "&7 &5●&7 Thanh Katana rèn từ kim loại bóng tối"
      - "&7 &5●&7 Tốc độ chém cực nhanh và chuyên trảm Boss/PvE"
    attack-damage: 51.5
    attack-speed: 1.8
    critical-strike-chance: 28.0
    critical-strike-power: 30.0
    pve-damage: 20.0
    ability:
      ability-1:
        type: CIRCULAR_SLASH
        mode: RIGHT_CLICK
        cooldown: 6.0
        damage: 18.0
    gem-sockets:
      - Uncolored
      - Uncolored
      - Uncolored
      - Uncolored
      - Uncolored
    will-break: false
    unbreakable: false

GACHA_SWORD_AZURE_FROST:
  base:
    material: DIAMOND_SWORD
    custom-model-data: 10000
    itemsadder-item: "fantasy_weapons:azure_greatsword"
    name: "&3&lÁnh Băng Long Tinh &7[&6&lGACHA&7]"
    max-durability: 20000
    tier: UNIQUE
    hide-enchants: true
    lore-format: weapon-lore
    lore:
      - "&b&l✦ Vật Phẩm Gacha Độc Quyền"
      - "&7 &3●&7 Đại kiếm mang năng lượng hàn băng vĩnh cửu"
      - "&7 &3●&7 Gia tăng lượng lớn máu và khả năng phòng thủ cho chủ nhân"
    attack-damage: 52.5
    attack-speed: 1.6
    defense: 8.0
    max-health: 10.0
    physical-damage: 15.0
    ability:
      ability-1:
        type: FROST_NOVA
        mode: RIGHT_CLICK
        cooldown: 8.0
        damage: 16.0
    gem-sockets:
      - Uncolored
      - Uncolored
      - Uncolored
      - Uncolored
      - Uncolored
    will-break: false
    unbreakable: false

GACHA_SWORD_PHANTOM_PARTISAN:
  base:
    material: IRON_SWORD
    custom-model-data: 10002
    itemsadder-item: "fantasy_weapons:heavenly_partisan"
    name: "&e&lHoàng Kim Diệt Thần Thương &7[&6&lGACHA&7]"
    max-durability: 20000
    tier: UNIQUE
    hide-enchants: true
    lore-format: weapon-lore
    lore:
      - "&b&l✦ Vật Phẩm Gacha Độc Quyền"
      - "&7 &e●&7 Huyễn thương tỏa ánh hào quang thánh thần"
      - "&7 &e●&7 Xuyên thủng mọi loại giáp kiên cố nhất"
    attack-damage: 54.5
    attack-speed: 1.5
    critical-strike-chance: 22.0
    armor-penetration: 15.0
    ability:
      ability-1:
        type: THRUST
        mode: RIGHT_CLICK
        cooldown: 5.0
        damage: 22.0
    gem-sockets:
      - Uncolored
      - Uncolored
      - Uncolored
      - Uncolored
      - Uncolored
    will-break: false
    unbreakable: false
`;

fs.writeFileSync(path.join(baseDir, 'item', 'sword.yml'), swordContent, 'utf8');

// Generate axe.yml
let axeContent = '';
ranks.forEach((r, rIdx) => {
  for (let t = 0; t < 5; t++) {
    const tierNum = romanMap[t];
    const id = `AXE_${r.id}_${t + 1}`;
    const stats = getAxeStats(rIdx, t);
    
    axeContent += `${id}:
  base:
    material: ${r.axeMat}
    name: "${r.color}Rìu Chiến ${r.name} &e&l${tierNum}"
    max-durability: ${r.durability}
    tier: ${r.tier}
    hide-enchants: true
    lore-format: weapon-lore
    lore:
      - "&b&l✦ Tiểu Sử"
      - "&7 &c●&7 Rìu chiến hạng nặng - Chuyên cận chiến & phá giáp"
      - "&7 &c●&7 Nâng cấp tại Lò Rèn để tăng sát thương bộc phát"
    attack-damage: ${stats.dmg.toFixed(1)}
    attack-speed: ${stats.speed}
    knockback: ${stats.knockback.toFixed(1)}
`;
    if (stats.critPwr > 0) {
      axeContent += `    critical-strike-power: ${stats.critPwr.toFixed(1)}\n`;
    }
    axeContent += getSocketsYAML(rIdx);
    axeContent += `    will-break: false
    unbreakable: false

`;
  }
});
fs.writeFileSync(path.join(baseDir, 'item', 'axe.yml'), axeContent, 'utf8');

// Generate staff.yml
let staffContent = '';
ranks.forEach((r, rIdx) => {
  for (let t = 0; t < 5; t++) {
    const tierNum = romanMap[t];
    const id = `STAFF_${r.id}_${t + 1}`;
    const stats = getStaffStats(rIdx, t);
    
    staffContent += `${id}:
  base:
    material: ${r.staffMat}
    name: "${r.color}Trượng Phép ${r.name} &e&l${tierNum}"
    max-durability: ${r.durability}
    tier: ${r.tier}
    hide-enchants: true
    lore-format: weapon-lore
    lore:
      - "&b&l✦ Tiểu Sử"
      - "&7 &d●&7 Trượng phép chứa quyền năng ma thuật ngục tù"
      - "&7 &d●&7 Nâng cấp tại Lò Rèn để tăng sát thương phép"
    attack-damage: ${stats.dmg.toFixed(1)}
    magic-damage: ${stats.magic.toFixed(1)}
    mana-cost: ${stats.manaCost}
`;
    if (stats.spellVamp > 0) {
      staffContent += `    spell-vampirism: ${stats.spellVamp.toFixed(1)}\n`;
    }
    staffContent += getSocketsYAML(rIdx);
    staffContent += `    will-break: false
    unbreakable: false

`;
  }
});
fs.writeFileSync(path.join(baseDir, 'item', 'staff.yml'), staffContent, 'utf8');

console.log('✅ Đã cập nhật xong số ô khảm Gem Sockets theo Rank cho toàn bộ Vũ Khí!');
