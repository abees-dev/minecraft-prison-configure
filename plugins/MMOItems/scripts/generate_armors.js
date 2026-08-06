/**
 * Script tự động khởi tạo và tính toán chỉ số CÂN BẰNG cho Giáp MMOItems (Nón, Áo, Quần, Giày)
 * Tích hợp Ô Khảm (Gem Sockets), Độ Bền, Nâng cấp theo Rank:
 * Run: node scripts/generate_armors.js
 */

const fs = require('fs');
const path = require('path');

const ranks = [
  { id: 'TAN_BINH', name: 'Tân Binh', color: '&f', tier: 'TRASH', durability: 400, matPrefix: 'LEATHER_' },
  { id: 'TU_NHAN', name: 'Tù Nhân', color: '&a', tier: 'COMMON', durability: 800, matPrefix: 'LEATHER_' },
  { id: 'LAO_CONG', name: 'Lao Công', color: '&b', tier: 'UNCOMMON', durability: 1500, matPrefix: 'CHAINMAIL_' },
  { id: 'THO_DAO', name: 'Thợ Đào', color: '&e', tier: 'RARE', durability: 2500, matPrefix: 'IRON_' },
  { id: 'DOI_TRUONG', name: 'Đội Trưởng', color: '&6', tier: 'VERY_RARE', durability: 3800, matPrefix: 'DIAMOND_' },
  { id: 'PHO_QUAN_NGUC', name: 'Phó Quản Ngục', color: '&c', tier: 'LEGENDARY', durability: 5200, matPrefix: 'DIAMOND_' },
  { id: 'QUAN_NGUC', name: 'Quản Ngục', color: '&d', tier: 'MYTHICAL', durability: 7000, matPrefix: 'NETHERITE_' },
  { id: 'BA_CHU_NGUC_TU', name: 'Bá Chủ Ngục Tù', color: '&5', tier: 'EPIC', durability: 9000, matPrefix: 'NETHERITE_' },
  { id: 'VUOT_NGUC', name: 'Vượt Ngục', color: '&4', tier: 'UNIQUE', durability: 12000, matPrefix: 'NETHERITE_' },
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

// Công thức tính tổng chỉ số Bộ Giáp theo Rank & Tier
function getSetStats(rIdx, tIdx) {
  const baseArmor = [4.0, 8.0, 14.0, 22.0, 32.0, 44.0, 58.0, 75.0, 95.0][rIdx];
  const stepArmor = [0.5, 0.75, 1.0, 1.25, 1.5, 1.75, 2.0, 2.5, 3.0][rIdx];
  const armor = baseArmor + (stepArmor * tIdx);

  const baseHealth = [4.0, 8.0, 15.0, 25.0, 40.0, 60.0, 85.0, 115.0, 150.0][rIdx];
  const stepHealth = [0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 4.0, 5.0, 6.0][rIdx];
  const maxHealth = baseHealth + (stepHealth * tIdx);

  const baseToughness = [0, 0, 2.0, 4.0, 7.0, 11.0, 16.0, 22.0, 30.0][rIdx];
  const stepToughness = [0, 0, 0.25, 0.5, 0.5, 0.75, 1.0, 1.25, 1.5][rIdx];
  const toughness = baseToughness > 0 ? baseToughness + (stepToughness * tIdx) : 0;

  const baseDefense = [0, 0, 0, 2.0, 5.0, 9.0, 14.0, 20.0, 28.0][rIdx];
  const stepDefense = [0, 0, 0, 0.25, 0.5, 0.75, 1.0, 1.25, 1.5][rIdx];
  const defense = baseDefense > 0 ? baseDefense + (stepDefense * tIdx) : 0;

  return { armor, maxHealth, toughness, defense };
}

const pieces = [
  { key: 'HELMET', name: 'Nón', matSuffix: 'HELMET', ratio: { armor: 0.20, health: 0.20, toughness: 0.20, defense: 0.20 }, extraStat: 'manaRegen' },
  { key: 'CHESTPLATE', name: 'Áo Giáp', matSuffix: 'CHESTPLATE', ratio: { armor: 0.35, health: 0.35, toughness: 0.35, defense: 0.35 } },
  { key: 'LEGGINGS', name: 'Quần Giáp', matSuffix: 'LEGGINGS', ratio: { armor: 0.25, health: 0.25, toughness: 0.25, defense: 0.25 } },
  { key: 'BOOTS', name: 'Giày', matSuffix: 'BOOTS', ratio: { armor: 0.20, health: 0.20, toughness: 0.20, defense: 0.20 }, extraStat: 'moveSpeed' },
];

let armorContent = `TEST_ARMOR_FULL_STATS:
  base:
    material: NETHERITE_CHESTPLATE
    name: '&c&l🛡 Áo Giáp Thử Nghiệm &e&l[FULL STATS]'
    tier: UNIQUE
    lore-format: armor-lore
    hide-enchants: true
    lore:
      - '&7Vật phẩm dùng để thử nghiệm toàn bộ chỉ số'
      - '&7và giao diện hiển thị Lore của Giáp MMOItems.'
    armor: 25.0
    armor-toughness: 10.0
    max-health: 50.0
    defense: 15.0
    damage-reduction: 10.0
    fall-damage-reduction: 20.0
    fire-damage-reduction: 15.0
    magic-damage-reduction: 15.0
    projectile-damage-reduction: 15.0
    physical-damage-reduction: 15.0
    pve-damage-reduction: 10.0
    pvp-damage-reduction: 10.0
    knockback-resistance: 30.0
    block-power: 25.0
    block-rating: 15.0
    dodge-rating: 10.0
    parry-rating: 10.0
    health-regeneration: 5.0
    max-mana: 100.0
    mana-regeneration: 10.0
    max-stamina: 50.0
    stamina-regeneration: 5.0
    movement-speed: 0.05
    cooldown-reduction: 10.0
    additional-dexterity: 15.0
    additional-strength: 20.0
    additional-intelligence: 15.0
    gem-sockets:
      - UNCOLORED
      - UNCOLORED
    max-durability: 1000
    upgrade:
      template: armor-upgrade-template
      reference: armor-upgrade-template
      max: 100
    will-break: false
    unbreakable: false

`;

pieces.forEach((p) => {
  ranks.forEach((r, rIdx) => {
    for (let t = 0; t < 5; t++) {
      const tierNum = romanMap[t];
      const id = `${p.key}_${r.id}_${t + 1}`;
      const setStats = getSetStats(rIdx, t);

      const rawArmor = setStats.armor * p.ratio.armor;
      const itemHealth = setStats.maxHealth * p.ratio.health;
      const itemToughness = setStats.toughness * p.ratio.toughness;
      // Vanilla generic.armor hard-cap = 30 / full set.
      // Write armor ≤ slot share; fold excess into MythicLib defense (uncapped).
      const VANILLA_ARMOR_CAP = 30;
      const slotArmorShare = VANILLA_ARMOR_CAP * p.ratio.armor;
      const itemArmor = Math.min(rawArmor, slotArmorShare);
      const armorExcess = Math.max(0, rawArmor - slotArmorShare);
      const itemDefense = setStats.defense * p.ratio.defense + armorExcess;

      armorContent += `${id}:
  base:
    material: ${r.matPrefix}${p.matSuffix}
    name: "${r.color}${p.name} ${r.name} &e&l${tierNum}"
    max-durability: ${r.durability}
    tier: ${r.tier}
    hide-enchants: true
    lore-format: armor-lore
    lore:
      - "&b&l✦ Tiểu Sử"
      - "&7 &b●&7 Trang bị phòng thủ kiên cố của ${r.name}"
      - "&7 &b●&7 Nâng cấp tại Lò Rèn để tăng chỉ số phòng thủ"
    armor: ${itemArmor.toFixed(1)}
    max-health: ${itemHealth.toFixed(1)}
`;

      if (itemToughness > 0) {
        armorContent += `    armor-toughness: ${itemToughness.toFixed(1)}\n`;
      }
      if (itemDefense > 0) {
        armorContent += `    defense: ${itemDefense.toFixed(1)}\n`;
      }
      if (p.extraStat === 'moveSpeed' && rIdx >= 4) {
        const moveSpeed = (0.01 + (rIdx - 4) * 0.005 + t * 0.001);
        armorContent += `    movement-speed: ${moveSpeed.toFixed(3)}\n`;
      }
      if (p.extraStat === 'manaRegen' && rIdx >= 2) {
        const manaRegen = (0.5 + rIdx * 0.5 + t * 0.2);
        armorContent += `    mana-regeneration: ${manaRegen.toFixed(1)}\n`;
      }

      armorContent += getSocketsYAML(rIdx);
      armorContent += `    upgrade:
      template: armor-upgrade-template
      max: 100
    will-break: false
    unbreakable: false

`;
    }
  });
});

const baseDir = path.join(__dirname, '..');
fs.writeFileSync(path.join(baseDir, 'item', 'armor.yml'), armorContent, 'utf8');
console.log('✅ Đã khởi tạo và cân bằng lại toàn bộ Giáp (armor.yml) cho 9 Rank x 5 Tier!');
