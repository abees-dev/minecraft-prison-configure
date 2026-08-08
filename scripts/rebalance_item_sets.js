/**
 * Convert MMOItems set thresholds to incremental bonuses.
 * MMOItems stacks every unlocked threshold, while lore displays cumulative
 * totals. Keeping those two concepts separate prevents runaway mixed stats.
 *
 * Run from the repository root:
 *   node scripts/rebalance_item_sets.js
 */

const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'plugins', 'MMOItems', 'item-sets.yml');
let source = fs.readFileSync(file, 'utf8');

const profiles = {
  warrior: `    "2":
      attack-damage: 15
      critical-strike-chance: 5
    "3":
      attack-damage: 10
      critical-strike-chance: 3
      critical-strike-power: 15
    "4":
      attack-damage: 15
      critical-strike-chance: 4
      critical-strike-power: 15
      potion-speed: 1`,
  mage: `    "2":
      magic-damage: 15
      max-mana: 150
    "3":
      magic-damage: 10
      max-mana: 100
      cooldown-reduction: 8
    "4":
      magic-damage: 15
      max-mana: 150
      cooldown-reduction: 7
      potion-regeneration: 1`,
  speed: `    "2":
      attack-speed: 0.10
      lifesteal: 2
    "3":
      attack-speed: 0.10
      lifesteal: 2
      attack-damage: 18
    "4":
      attack-speed: 0.15
      lifesteal: 2
      attack-damage: 12
      potion-speed: 2`,
  physical: `    "2":
      physical-damage: 8
      dodge-rating: 8
    "3":
      physical-damage: 6
      dodge-rating: 6
      critical-strike-power: 20
    "4":
      physical-damage: 8
      dodge-rating: 6
      critical-strike-power: 15
      potion-speed: 2`,
  tank: `    "2":
      max-health: 150
      defense: 12
    "3":
      max-health: 150
      defense: 10
      damage-reduction: 10
    "4":
      max-health: 200
      defense: 13
      damage-reduction: 8
      potion-damage_resistance: 1`,
};

const setProfiles = {
  HOA_LONG_SET: 'warrior',
  HAC_LONG_SET: 'mage',
  LOI_LONG_SET: 'speed',
  PHONG_LONG_SET: 'physical',
  BANG_LONG_SET: 'tank',
  LONG_CHIEN_SET: 'warrior',
  LONG_THAN_SET: 'mage',
  LONG_HOANG_SET: 'speed',
  LONG_DE_SET: 'physical',
  LONG_VE_SET: 'tank',
  THANH_LONG_SET: 'warrior',
  XICH_LONG_SET: 'mage',
  KIM_LONG_SET: 'speed',
  THIEN_LONG_SET: 'physical',
  BAC_LONG_SET: 'tank',
};

function replaceBonuses(setId, content) {
  const pattern = new RegExp(`(${setId}:[\\s\\S]*?  bonuses:\\n)[\\s\\S]*?(?=  lore-tag:)`);
  if (!pattern.test(source)) throw new Error(`Set not found: ${setId}`);
  source = source.replace(pattern, `$1${content}\n`);
}

for (const [setId, profile] of Object.entries(setProfiles)) {
  replaceBonuses(setId, profiles[profile]);
}

replaceBonuses('LONG_VUONG_SET', `    "2":
      attack-damage: 15
      critical-strike-chance: 5
    "3":
      attack-damage: 15
      critical-strike-chance: 5
    "4":
      attack-damage: 15
      critical-strike-chance: 5
      critical-strike-power: 20
      lifesteal: 2
    "5":
      attack-damage: 15
      critical-strike-chance: 3
      critical-strike-power: 15
      lifesteal: 3
      potion-increase_damage: 2`);

replaceBonuses('BANG_TINH_SET', `    "2":
      max-health: 150
      damage-reduction: 5
    "3":
      max-health: 150
      damage-reduction: 3
    "4":
      max-health: 200
      damage-reduction: 4
      armor-toughness: 15
    "5":
      max-health: 300
      damage-reduction: 6
      armor-toughness: 20
      potion-speed: 2
      potion-damage_resistance: 1`);

replaceBonuses('HAC_AM_SET', `    "2":
      magic-damage: 10
      max-mana: 100
    "3":
      magic-damage: 10
      max-mana: 100
    "4":
      magic-damage: 15
      max-mana: 150
      lifesteal: 2
    "5":
      magic-damage: 15
      max-mana: 150
      lifesteal: 3
      cooldown-reduction: 15`);

replaceBonuses('LOI_THAN_SET', `    "2":
      movement-speed: 0.02
      attack-speed: 0.10
    "3":
      movement-speed: 0.02
      attack-speed: 0.10
    "4":
      movement-speed: 0.02
      attack-speed: 0.07
      dodge-rating: 5
    "5":
      movement-speed: 0.04
      attack-speed: 0.08
      dodge-rating: 10
      potion-speed: 3`);

replaceBonuses('HOANG_GIA_SET', `    "2":
      physical-damage: 10
      max-health: 100
    "3":
      physical-damage: 10
      max-health: 100
    "4":
      physical-damage: 10
      max-health: 150
      magic-damage: 10
      lifesteal: 2
    "5":
      physical-damage: 10
      magic-damage: 15
      max-health: 150
      max-mana: 300
      lifesteal: 3
      potion-regeneration: 2`);

// Lore always shows the cumulative total at each unlocked milestone.
source = source
  .replaceAll('+12% Tốc Độ Đánh &7| &c+5% Hút Máu', '+0.10 Tốc Độ Đánh &7| &c+2% Hút Máu')
  .replaceAll('+22% Tốc Độ Đánh &7| &c+8% Hút Máu', '+0.20 Tốc Độ Đánh &7| &c+4% Hút Máu')
  .replaceAll('+35% Tốc Độ Đánh &7| &c+12% Hút Máu', '+0.35 Tốc Độ Đánh &7| &c+6% Hút Máu')
  .replace('&8[4] &c+45 Sát Thương Cơ Bản &7| &6+15% Tỷ Lệ Chí Mạng &7| &6+25% Sát Thương Chí Mạng',
    '&8[4] &c+45 Sát Thương Cơ Bản &7| &6+15% Tỷ Lệ Chí Mạng &7| &6+20% Sát Thương Chí Mạng &7| &c+2% Hút Máu')
  .replace('&8[5] &c+75 Sát Thương Cơ Bản &7| &6+25% Tỷ Lệ Chí Mạng &7| &6+50% Sát Thương Chí Mạng &7| &c+15% Hút Máu',
    '&8[5] &c+60 Sát Thương Cơ Bản &7| &6+18% Tỷ Lệ Chí Mạng &7| &6+35% Sát Thương Chí Mạng &7| &c+5% Hút Máu');

fs.writeFileSync(file, source, 'utf8');
console.log(`Rebalanced ${Object.keys(setProfiles).length + 5} item sets with incremental thresholds.`);
