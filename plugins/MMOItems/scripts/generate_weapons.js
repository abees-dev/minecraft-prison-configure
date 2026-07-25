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
    swordContent += `    upgrade:
      template: weapon-upgrade-template
      max: 100
    will-break: false
    unbreakable: false

`;
  }
});

swordContent += `GACHA_SWORD_AMETHYST:
  itemsadder-item: "fantasy_weapons:amethyst_greatblade"
  base:
    material: IRON_SWORD
    custom-model-data: 10000
    name: "&5&lThạch Anh Tím Đại Kiếm"
    max-durability: 20000
    tier: UNIQUE
    hide-enchants: true
    lore-format: weapon-lore
    lore:
      - "&b&l✦ Vật Phẩm Độc Quyền"
      - "&7 &5●&7 Đại kiếm rèn từ tinh thể thạch anh tím cổ xưa"
      - "&7 &5●&7 Tỷ lệ chí mạng & sát thương bộc phát cực mạnh"
    attack-damage: 53.0
    attack-speed: 1.6
    critical-strike-chance: 26.0
    physical-damage: 22.0
    ability:
      ability-1:
        type: CIRCULAR_SLASH
        mode: RIGHT_CLICK
        cooldown: 6.0
        damage: 20.0
    gem-sockets:
      - Uncolored
      - Uncolored
      - Uncolored
      - Uncolored
      - Uncolored
    will-break: false
    unbreakable: false

GACHA_SWORD_PHANTOMGUARD:
  itemsadder-item: "fantasy_weapons:phantomguard_greatsword"
  base:
    material: IRON_SWORD
    custom-model-data: 10001
    name: "&b&lU Hồn Vệ Kiếm"
    max-durability: 20000
    tier: UNIQUE
    hide-enchants: true
    lore-format: weapon-lore
    lore:
      - "&b&l✦ Vật Phẩm Độc Quyền"
      - "&7 &b●&7 Đại kiếm linh hồn bảo hộ chủ nhân khỏi hiểm nguy"
      - "&7 &b●&7 Gia tăng lượng lớn máu tối đa và chỉ số phòng thủ"
    attack-damage: 52.0
    attack-speed: 1.6
    defense: 9.0
    max-health: 12.0
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

GACHA_SWORD_VALHAKYRA:
  itemsadder-item: "fantasy_weapons:valhakyra"
  base:
    material: IRON_SWORD
    custom-model-data: 10003
    name: "&e&lThần Kiếm Valhakyra"
    max-durability: 20000
    tier: UNIQUE
    hide-enchants: true
    lore-format: weapon-lore
    lore:
      - "&b&l✦ Vật Phẩm Độc Quyền"
      - "&7 &e●&7 Thánh kiếm huyền thoại của tộc chiến thần"
      - "&7 &e●&7 Tốc độ vung kiếm xé gió và khả năng xuyên giáp"
    attack-damage: 53.5
    attack-speed: 1.8
    critical-strike-chance: 24.0
    armor-penetration: 14.0
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

GACHA_SWORD_CRYSTAL_FROST:
  itemsadder-item: "fantasy_weapons:crystal_frostblade"
  base:
    material: IRON_SWORD
    custom-model-data: 10008
    name: "&3&lBăng Tinh Thần Kiếm"
    max-durability: 20000
    tier: UNIQUE
    hide-enchants: true
    lore-format: weapon-lore
    lore:
      - "&b&l✦ Vật Phẩm Độc Quyền"
      - "&7 &3●&7 Kiếm tinh thể hàn băng tỏa hơi lạnh ngàn năm"
      - "&7 &3●&7 Đột phá sát thương vật lý bộc phát"
    attack-damage: 54.0
    attack-speed: 1.6
    critical-strike-chance: 22.0
    physical-damage: 24.0
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

GACHA_SWORD_DEMONS_BLOOD:
  itemsadder-item: "fantasy_weapons:demons_blood_blade"
  base:
    material: IRON_SWORD
    custom-model-data: 10016
    name: "&c&lHuyết Ma Diệt Thần Kiếm"
    max-durability: 20000
    tier: UNIQUE
    hide-enchants: true
    lore-format: weapon-lore
    lore:
      - "&b&l✦ Vật Phẩm Độc Quyền"
      - "&7 &c●&7 Ma kiếm tôi luyện trong máu quỷ dữ"
      - "&7 &c●&7 Gia tăng sát thương nguyên tố Hỏa bộc phá"
    attack-damage: 54.5
    attack-speed: 1.6
    critical-strike-chance: 25.0
    element-fire-damage: 12.0
    ability:
      ability-1:
        type: FIREBALL
        mode: RIGHT_CLICK
        cooldown: 6.0
        damage: 20.0
    gem-sockets:
      - Uncolored
      - Uncolored
      - Uncolored
      - Uncolored
      - Uncolored
    will-break: false
    unbreakable: false

GACHA_SWORD_MOONLIGHT:
  itemsadder-item: "fantasy_weapons:moonlight"
  base:
    material: IRON_SWORD
    custom-model-data: 10018
    name: "&9&lMinh Nguyệt Quang Kiếm"
    max-durability: 20000
    tier: UNIQUE
    hide-enchants: true
    lore-format: weapon-lore
    lore:
      - "&b&l✦ Vật Phẩm Độc Quyền"
      - "&7 &9●&7 Kiếm tỏa ánh trăng rực rỡ huyền ảo"
      - "&7 &9●&7 Tỷ lệ chí mạng & nhát chém chí mạng bạo phát"
    attack-damage: 52.5
    attack-speed: 1.7
    critical-strike-chance: 28.0
    critical-strike-power: 32.0
    ability:
      ability-1:
        type: ARCANE_RIFT
        mode: RIGHT_CLICK
        cooldown: 8.0
        damage: 18.0
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
    axeContent += `    upgrade:
      template: weapon-upgrade-template
      max: 100
    will-break: false
    unbreakable: false

`;
  }
});

axeContent += `GACHA_AXE_VIRIDIAN:
  itemsadder-item: "fantasy_weapons:viridian_greataxe"
  base:
    material: IRON_AXE
    custom-model-data: 10001
    name: "&a&lLục Bảo Thần Rìu"
    max-durability: 20000
    tier: UNIQUE
    hide-enchants: true
    lore-format: weapon-lore
    lore:
      - "&b&l✦ Vật Phẩm Độc Quyền"
      - "&7 &a●&7 Đại rìu khảm ngọc lục bảo tinh khiết"
      - "&7 &a●&7 Đẩy lùi mạnh mẽ & sát thương bộc phát cực lớn"
    attack-damage: 63.0
    attack-speed: 1.0
    knockback: 2.2
    critical-strike-power: 35.0
    ability:
      ability-1:
        type: MAGMA_FISSURE
        mode: RIGHT_CLICK
        cooldown: 8.0
        damage: 25.0
    gem-sockets:
      - Uncolored
      - Uncolored
      - Uncolored
      - Uncolored
      - Uncolored
    will-break: false
    unbreakable: false

GACHA_AXE_AZURE:
  itemsadder-item: "fantasy_weapons:azure_greataxe"
  base:
    material: DIAMOND_AXE
    custom-model-data: 10000
    name: "&3&lBăng Long Đại Rìu"
    max-durability: 20000
    tier: UNIQUE
    hide-enchants: true
    lore-format: weapon-lore
    lore:
      - "&b&l✦ Vật Phẩm Độc Quyền"
      - "&7 &3●&7 Rìu chiến rèn từ xương rồng băng vĩnh cửu"
      - "&7 &3●&7 Khả năng phá giáp & chí mạng tàn phá"
    attack-damage: 61.5
    attack-speed: 1.0
    knockback: 2.0
    critical-strike-power: 30.0
    armor-penetration: 12.0
    ability:
      ability-1:
        type: MAGMA_FISSURE
        mode: RIGHT_CLICK
        cooldown: 8.0
        damage: 22.0
    gem-sockets:
      - Uncolored
      - Uncolored
      - Uncolored
      - Uncolored
      - Uncolored
    will-break: false
    unbreakable: false

GACHA_AXE_SACRIFICIAL:
  itemsadder-item: "fantasy_weapons:sacrificial_cleaver"
  base:
    material: IRON_AXE
    custom-model-data: 10011
    name: "&c&lTế Sát Thần Đao"
    max-durability: 20000
    tier: UNIQUE
    hide-enchants: true
    lore-format: weapon-lore
    lore:
      - "&b&l✦ Vật Phẩm Độc Quyền"
      - "&7 &c●&7 Đại đao dùng trong các nghi lễ tế thần cổ đại"
      - "&7 &c●&7 Sát thương vật lý bộc phát khủng khiếp"
    attack-damage: 63.5
    attack-speed: 1.0
    knockback: 2.5
    physical-damage: 20.0
    ability:
      ability-1:
        type: MAGMA_FISSURE
        mode: RIGHT_CLICK
        cooldown: 8.0
        damage: 25.0
    gem-sockets:
      - Uncolored
      - Uncolored
      - Uncolored
      - Uncolored
      - Uncolored
    will-break: false
    unbreakable: false
`;

fs.writeFileSync(path.join(baseDir, 'item', 'axe.yml'), axeContent, 'utf8');

// Generate staff.yml
let staffContent = '';
const spirits = ['MANA_SPIRIT', 'MANA_SPIRIT', 'NETHER_SPIRIT', 'NETHER_SPIRIT', 'LIGHTNING_SPIRIT', 'LIGHTNING_SPIRIT', 'THUNDER_SPIRIT', 'THUNDER_SPIRIT', 'SUNFIRE_SPIRIT'];

ranks.forEach((r, rIdx) => {
  for (let t = 0; t < 5; t++) {
    const tierNum = romanMap[t];
    const id = `STAFF_${r.id}_${t + 1}`;
    const stats = getStaffStats(rIdx, t);
    const spirit = spirits[rIdx];
    
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
      - "&7 &d●&7 Nâng cấp tại Lò Rèn để tăng sát thương & mở kỹ năng mới"
    attack-damage: ${stats.dmg.toFixed(1)}
    magic-damage: ${stats.magic.toFixed(1)}
    mana-cost: ${stats.manaCost}
    staff-spirit: ${spirit}
`;
    if (stats.spellVamp > 0) {
      staffContent += `    spell-vampirism: ${stats.spellVamp.toFixed(1)}\n`;
    }

    // Tích hợp hệ thống Kỹ Năng Đa Dạng (Multi-Skills) cho Trượng Phép
    const skillDmg1 = (stats.magic * 0.35 + 5).toFixed(1);
    const healVal = (stats.magic * 0.15 + 4).toFixed(1);
    const skillDmg2 = (stats.magic * 0.3 + 8).toFixed(1);

    staffContent += `    ability:\n`;
    staffContent += `      ability-1:\n`;

    if (rIdx <= 1) {
      // Rank 1-2: Cầu Lửa
      staffContent += `        type: FIREBALL\n        mode: RIGHT_CLICK\n        cooldown: 5.0\n        damage: ${skillDmg1}\n`;
    } else if (rIdx <= 4) {
      // Rank 3-5: Cầu Lửa + Hồi Máu
      staffContent += `        type: FIREBALL\n        mode: RIGHT_CLICK\n        cooldown: 5.0\n        damage: ${skillDmg1}\n`;
      staffContent += `      ability-2:\n        type: HEAL\n        mode: SHIFT_RIGHT_CLICK\n        cooldown: 12.0\n        value: ${healVal}\n`;
    } else if (rIdx <= 6) {
      // Rank 6-7: Tia Sấm Sét + Hồi Máu
      staffContent += `        type: LIGHTNING_BEAM\n        mode: RIGHT_CLICK\n        cooldown: 6.0\n        damage: ${skillDmg1}\n`;
      staffContent += `      ability-2:\n        type: HEAL\n        mode: SHIFT_RIGHT_CLICK\n        cooldown: 10.0\n        value: ${healVal}\n`;
    } else {
      // Rank 8-9: Băng Sương + Hồi Máu + Thiên Thạch
      staffContent += `        type: FROST_NOVA\n        mode: RIGHT_CLICK\n        cooldown: 6.0\n        damage: ${skillDmg1}\n`;
      staffContent += `      ability-2:\n        type: HEAL\n        mode: SHIFT_RIGHT_CLICK\n        cooldown: 9.0\n        value: ${healVal}\n`;
      staffContent += `      ability-3:\n        type: METEOR\n        mode: SHIFT_LEFT_CLICK\n        cooldown: 10.0\n        damage: ${skillDmg2}\n`;
    }

    staffContent += getSocketsYAML(rIdx);
    staffContent += `    upgrade:
      template: weapon-upgrade-template
      max: 100
    will-break: false
    unbreakable: false

`;
  }
});

staffContent += `GACHA_STAFF_REVENANT:
  itemsadder-item: "fantasy_weapons:revenants_gravescepter"
  base:
    material: IRON_AXE
    custom-model-data: 10005
    name: "&d&lU Hồn Quyền Trượng"
    max-durability: 20000
    tier: UNIQUE
    hide-enchants: true
    lore-format: weapon-lore
    lore:
      - "&b&l✦ Vật Phẩm Độc Quyền"
      - "&7 &d●&7 Quyền trượng triệu hồi linh hồn cõi âm"
      - "&7 &d●&7 Chuyên trảm Boss: Sát thương phép & Hố đen tàn phá"
    attack-damage: 40.0
    magic-damage: 175.0
    pve-damage: 30.0
    critical-strike-chance: 25.0
    critical-strike-power: 35.0
    mana-cost: 15
    spell-vampirism: 8.5
    staff-spirit: VOID_SPIRIT
    ability:
      ability-1:
        type: BLACK_HOLE
        mode: RIGHT_CLICK
        cooldown: 6.0
        radius: 6.0
      ability-2:
        type: DIVINE_PUNISHMENT
        mode: SHIFT_RIGHT_CLICK
        cooldown: 8.0
        damage: 65.0
        heal: 25.0
      ability-3:
        type: METEOR
        mode: SHIFT_LEFT_CLICK
        cooldown: 7.0
        damage: 75.0
    gem-sockets:
      - Uncolored
      - Uncolored
      - Uncolored
      - Uncolored
      - Uncolored
    will-break: false
    unbreakable: false

GACHA_STAFF_AZURE_SCYTHE:
  itemsadder-item: "fantasy_weapons:azure_scythe"
  base:
    material: IRON_HOE
    custom-model-data: 10000
    name: "&3&lBăng Long Tử Thần Lưỡi Hái"
    max-durability: 20000
    tier: UNIQUE
    hide-enchants: true
    lore-format: weapon-lore
    lore:
      - "&b&l✦ Vật Phẩm Độc Quyền"
      - "&7 &3●&7 Lưỡi hái đóng băng linh hồn kẻ địch"
      - "&7 &3●&7 Chuyên trảm Boss: Bão băng giá & Lôi điện tàn phá"
    attack-damage: 42.0
    magic-damage: 185.0
    pve-damage: 32.0
    critical-strike-chance: 26.0
    critical-strike-power: 38.0
    mana-cost: 16
    spell-vampirism: 9.0
    staff-spirit: MANA_SPIRIT
    ability:
      ability-1:
        type: BLIZZARD
        mode: RIGHT_CLICK
        cooldown: 7.0
        damage: 60.0
      ability-2:
        type: FROST_NOVA
        mode: SHIFT_RIGHT_CLICK
        cooldown: 6.0
        damage: 55.0
      ability-3:
        type: GRAND_HEAL
        mode: SHIFT_LEFT_CLICK
        cooldown: 8.0
        value: 30.0
    gem-sockets:
      - Uncolored
      - Uncolored
      - Uncolored
      - Uncolored
      - Uncolored
    will-break: false
    unbreakable: false

GACHA_STAFF_OCULUS:
  itemsadder-item: "fantasy_weapons:oculus"
  base:
    material: IRON_SWORD
    custom-model-data: 10019
    name: "&b&lMa Nhãn Thần Trượng"
    max-durability: 20000
    tier: UNIQUE
    hide-enchants: true
    lore-format: weapon-lore
    lore:
      - "&b&l✦ Vật Phẩm Độc Quyền"
      - "&7 &b●&7 Trượng phép mang con mắt nhãn giới ma thuật"
      - "&7 &b●&7 Chuyên trảm Boss: Sấm sét bộc phá & Thiên thạch ma nhãn"
    attack-damage: 45.0
    magic-damage: 195.0
    pve-damage: 35.0
    critical-strike-chance: 28.0
    critical-strike-power: 40.0
    mana-cost: 18
    spell-vampirism: 10.0
    staff-spirit: THUNDER_SPIRIT
    ability:
      ability-1:
        type: LIGHTNING_BEAM
        mode: RIGHT_CLICK
        cooldown: 5.0
        damage: 70.0
      ability-2:
        type: METEOR
        mode: SHIFT_RIGHT_CLICK
        cooldown: 7.0
        damage: 80.0
      ability-3:
        type: FIREBALL
        mode: SHIFT_LEFT_CLICK
        cooldown: 4.0
        damage: 60.0
    gem-sockets:
      - Uncolored
      - Uncolored
      - Uncolored
      - Uncolored
      - Uncolored
    will-break: false
    unbreakable: false
`;

fs.writeFileSync(path.join(baseDir, 'item', 'staff.yml'), staffContent, 'utf8');

console.log('✅ Đã tích hợp staff-spirit và kỹ năng chủ động cho toàn bộ Trượng Phép!');




