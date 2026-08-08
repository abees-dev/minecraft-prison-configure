/**
 * Apply a one-time 5% multiplier to beneficial base combat stats on every
 * MMOItems equipment file. A marker makes the operation idempotent.
 *
 * Run from the repository root:
 *   node scripts/increase_equipment_base_stats.js
 */

const fs = require('fs');
const path = require('path');

const multiplier = 1.05;
const marker = '# base-combat-stats-multiplier: 1.05';
const itemDir = path.join(__dirname, '..', 'plugins', 'MMOItems', 'item');

const nonEquipmentFiles = new Set([
  'block.yml',
  'consumable.yml',
  'gem_stone.yml',
  'material.yml',
  'miscellaneous.yml',
  'pet.yml',
]);

const scalableStats = new Set([
  'additional-dexterity',
  'additional-intelligence',
  'additional-strength',
  'armor',
  'armor-toughness',
  'attack-damage',
  'attack-speed',
  'block-power',
  'block-rating',
  'cooldown-reduction',
  'critical-strike-chance',
  'critical-strike-power',
  'damage-reduction',
  'defense',
  'dodge-rating',
  'fall-damage-reduction',
  'fire-damage-reduction',
  'health-regeneration',
  'knockback',
  'knockback-resistance',
  'lifesteal',
  'magic-damage',
  'magic-damage-reduction',
  'mana-regeneration',
  'max-health',
  'max-mana',
  'max-stamina',
  'movement-speed',
  'parry-rating',
  'physical-damage',
  'physical-damage-reduction',
  'projectile-damage',
  'projectile-damage-reduction',
  'pve-damage',
  'pve-damage-reduction',
  'pvp-damage-reduction',
  'skill-damage',
  'spell-vampirism',
  'stamina-regeneration',
  'weapon-damage',
]);

function format(value) {
  return Number(value.toFixed(3)).toString();
}

let filesChanged = 0;
let statsChanged = 0;

for (const file of fs.readdirSync(itemDir).filter((name) => name.endsWith('.yml')).sort()) {
  if (nonEquipmentFiles.has(file)) continue;
  const filePath = path.join(itemDir, file);
  const source = fs.readFileSync(filePath, 'utf8');
  if (source.startsWith(marker)) continue;

  let changedInFile = 0;
  const output = source.replace(
    /^(    )([a-z0-9-]+): (-?[0-9]+(?:\.[0-9]+)?)\s*$/gm,
    (line, indent, key, rawValue) => {
      if (!scalableStats.has(key)) return line;
      changedInFile += 1;
      return `${indent}${key}: ${format(Number(rawValue) * multiplier)}`;
    },
  );

  if (changedInFile === 0) continue;
  fs.writeFileSync(filePath, `${marker}\n${output}`, 'utf8');
  filesChanged += 1;
  statsChanged += changedInFile;
  console.log(`${file}: ${changedInFile} stats`);
}

console.log(`Applied +5% base combat stats to ${statsChanged} stats across ${filesChanged} equipment files.`);
