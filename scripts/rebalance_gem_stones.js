/**
 * Balance all 100 MMOItems gems and give every gem a controlled ±10% roll.
 * Uses MMOItems' official numeric min/max format. Idempotent by version marker.
 *
 * Run from the repository root:
 *   node scripts/rebalance_gem_stones.js
 */

const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'plugins', 'MMOItems', 'item', 'gem_stone.yml');
const marker = '# balanced-random-gems: 1';
let source = fs.readFileSync(file, 'utf8').replace(/^# balanced-random-gems: \d+\n/, '');

if (fs.readFileSync(file, 'utf8').startsWith(marker)) {
  console.log('Gem stones already use balanced random ranges.');
  process.exit(0);
}

const families = {
  RED_GEM: {
    stat: 'attack-damage',
    values: [1, 1.5, 2.1, 2.8, 3.6, 4.5, 5.5, 6.6, 7.8, 9],
  },
  BLUE_GEM: {
    stat: 'max-mana',
    values: [10, 18, 28, 40, 55, 72, 90, 110, 135, 160],
  },
  GREEN_GEM: {
    stat: 'max-health',
    values: [8, 14, 22, 32, 45, 60, 78, 98, 120, 145],
  },
  YELLOW_GEM: {
    stat: 'defense',
    oldStat: 'armor',
    values: [2, 4, 6, 9, 13, 18, 24, 31, 39, 48],
  },
  PURPLE_GEM: {
    stat: 'magic-damage',
    values: [1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5, 11],
  },
  CYAN_GEM: {
    stat: 'critical-strike-chance',
    values: [0.8, 1.2, 1.6, 2, 2.5, 3, 3.5, 4, 4.5, 5],
  },
  BLACK_GEM: {
    stat: 'critical-strike-power',
    values: [2, 3, 4, 5, 6, 7, 8, 9, 10, 12],
  },
  WHITE_GEM: {
    stat: 'health-regeneration',
    values: [0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1, 1.2],
  },
  BROWN_GEM: {
    stat: 'armor-toughness',
    values: [0.5, 0.8, 1.1, 1.5, 1.9, 2.3, 2.7, 3.1, 3.5, 4],
  },
  ORANGE_GEM: {
    stat: 'movement-speed',
    values: [0.004, 0.006, 0.008, 0.010, 0.012, 0.014, 0.016, 0.018, 0.020, 0.025],
  },
};

function format(value) {
  return Number(value.toFixed(4)).toString();
}

let changed = 0;
for (const [family, config] of Object.entries(families)) {
  for (let level = 1; level <= 10; level += 1) {
    const id = `${family}_LV${level}`;
    const blockPattern = new RegExp(
      `(^${id}:\\n[\\s\\S]*?)(?=^[A-Z0-9_-]+:\\s*$|(?![\\s\\S]))`,
      'm',
    );
    const blockMatch = source.match(blockPattern);
    if (!blockMatch) throw new Error(`Missing gem: ${id}`);

    const average = config.values[level - 1];
    const min = format(average * 0.9);
    const max = format(average * 1.1);
    const oldStat = config.oldStat || config.stat;
    let block = blockMatch[1];
    const statPattern = new RegExp(`^    ${oldStat}: [0-9.]+\\s*$`, 'm');
    if (!statPattern.test(block)) throw new Error(`Missing ${oldStat} on ${id}`);
    block = block.replace(
      statPattern,
      `    ${config.stat}:\n      min: ${min}\n      max: ${max}`,
    );

    block = block.replace(
      /(      - "&7Kéo thả[^\n]+"\n)/,
      `$1      - "&8Chỉ số được tạo ngẫu nhiên khi nhận đá."\n`,
    );
    block = block.replace('để tăng Giáp.', 'để tăng Phòng Thủ Bổ Sung.');
    block = block.replace(
      'để tăng Độ Bền Sắt (Armor Toughness).',
      'để tăng Kháng Xuyên Giáp.',
    );
    block = block.replace(
      /^(    revision-id: )(\d+)$/m,
      (_, prefix, revision) => `${prefix}${Number(revision) + 1}`,
    );

    source = source.replace(blockPattern, block);
    changed += 1;
  }
}

fs.writeFileSync(file, `${marker}\n${source}`, 'utf8');
console.log(`Balanced ${changed} gems with controlled ±10% random stat rolls.`);
