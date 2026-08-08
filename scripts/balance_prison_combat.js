/**
 * Synchronize Prison Normal/Elite/Boss stats with MMOItems rank gear.
 *
 * Baseline: a solo player uses a Tier III sword and a full Tier III armor set
 * at the recommended upgrade level for that rank. Normal mobs take ~5 hits,
 * elites ~18 hits and bosses ~70 non-critical hits before mechanics.
 *
 * Run from the repository root:
 *   node scripts/balance_prison_combat.js
 */

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const mobFile = path.join(root, 'plugins', 'MythicMobs', 'mobs', 'prison_rank_mobs.yml');
const skillFile = path.join(root, 'plugins', 'MythicMobs', 'skills', 'prison_rank_skills.yml');

const upgrade = {
  attackDamage: 1.0,
  physicalDamage: 0.4,
  healthPerPiece: 5,
  defensePerPiece: 1.75,
};
const equipmentBaseMultiplier = 1.05;

const ranks = [
  { id: 'TAN_BINH', skill: 'Tan_Binh', level: 10, attack: 3.75, physical: 0, health: 5, defense: 0 },
  { id: 'TU_NHAN', skill: 'Tu_Nhan', level: 20, attack: 6, physical: 0, health: 10, defense: 0 },
  { id: 'LAO_CONG', skill: 'Lao_Cong', level: 30, attack: 8.75, physical: 0, health: 18, defense: 0 },
  { id: 'THO_DAO', skill: 'Tho_Dao', level: 40, attack: 12, physical: 0, health: 29, defense: 2.5 },
  { id: 'DOI_TRUONG', skill: 'Doi_Truong', level: 50, attack: 16, physical: 4, health: 45, defense: 6 },
  { id: 'PHO_QUAN_NGUC', skill: 'Pho_Quan_Nguc', level: 60, attack: 21, physical: 7, health: 66, defense: 10.5 },
  { id: 'QUAN_NGUC', skill: 'Quan_Nguc', level: 70, attack: 27, physical: 10, health: 93, defense: 16 },
  { id: 'BA_CHU_NGUC_TU', skill: 'Ba_Chu_Nguc_Tu', level: 85, attack: 34.5, physical: 13, health: 125, defense: 22.5 },
  { id: 'VUOT_NGUC', skill: 'Vuot_Nguc', level: 100, attack: 43.5, physical: 17, health: 174, defense: 31 },
];

function rounded(value, step = 5) {
  return Math.max(step, Math.round(value / step) * step);
}

function incomingDamageForTarget(targetDamage, defense) {
  // Inverse of MythicLib's natural defense formula:
  // final = damage * (1 - defense / (2 * damage + defense)).
  return (targetDamage + Math.sqrt(targetDamage ** 2 + 2 * targetDamage * defense)) / 2;
}

function buildStats(rank) {
  const weaponHit = (rank.attack + rank.physical) * equipmentBaseMultiplier
    + rank.level * (upgrade.attackDamage + upgrade.physicalDamage);
  const playerHealth = 20 + rank.health * equipmentBaseMultiplier
    + rank.level * upgrade.healthPerPiece * 4;
  const playerDefense = rank.defense * equipmentBaseMultiplier
    + rank.level * upgrade.defensePerPiece * 4;
  const bossDamage = rounded(incomingDamageForTarget(playerHealth * 0.22, playerDefense));

  return {
    NORMAL: {
      health: rounded(weaponHit * 5),
      damage: rounded(bossDamage * 0.35, 1),
      skillDamage: rounded(bossDamage * 0.25, 1),
    },
    ELITE: {
      health: rounded(weaponHit * 18),
      damage: rounded(bossDamage * 0.65, 1),
      skillDamage: rounded(bossDamage * 0.45, 1),
    },
    BOSS: {
      health: rounded(weaponHit * 70, 10),
      damage: bossDamage,
      skillDamage: rounded(bossDamage * 0.75, 1),
    },
  };
}

const table = new Map();
for (const rank of ranks) {
  const stats = buildStats(rank);
  for (const type of ['NORMAL', 'ELITE', 'BOSS']) {
    table.set(`PRISON_${rank.id}_${type}`, stats[type]);
  }
}

const lastBoss = table.get('PRISON_VUOT_NGUC_BOSS');
table.set('PRISON_MA_VUONG_BOSS', {
  health: rounded(lastBoss.health * 1.5, 100),
  damage: rounded(lastBoss.damage * 1.25),
  skillDamage: rounded(lastBoss.damage * 0.95),
});

function updateMobFile(source) {
  let currentId = null;
  return source.split('\n').map((line) => {
    const id = line.match(/^([A-Z0-9_]+):\s*$/);
    if (id) currentId = id[1];
    const stats = table.get(currentId);
    if (!stats) return line;
    if (/^  Health:/.test(line)) return `  Health: ${stats.health}`;
    if (/^  Damage:/.test(line)) return `  Damage: ${stats.damage}`;
    if (/damage\{amount=[0-9.]+/.test(line)) {
      return line.replace(/damage\{amount=[0-9.]+/, `damage{amount=${stats.skillDamage}`);
    }
    return line;
  }).join('\n');
}

function updateEnrageThresholds(source) {
  let output = source;
  for (const rank of ranks) {
    const boss = table.get(`PRISON_${rank.id}_BOSS`);
    const block = new RegExp(`(Prison_${rank.skill}_Enrage:[\\s\\S]*?health\\{h=<)[0-9.]+`);
    output = output.replace(block, `$1${Math.ceil(boss.health / 2)}`);
  }
  const maVuong = table.get('PRISON_MA_VUONG_BOSS');
  output = output.replace(
    /(Prison_Ma_Vuong_Enrage:[\s\S]*?health\{h=<)[0-9.]+/,
    `$1${Math.ceil(maVuong.health / 2)}`,
  );

  // Ma Vuong's three telegraphed skills scale with the same endgame baseline.
  const skillValues = [
    rounded(maVuong.skillDamage),
    rounded(maVuong.skillDamage * 1.1),
    rounded(maVuong.skillDamage * 0.9),
  ];
  let index = 0;
  return output.replace(/damage\{amount=[0-9.]+/g, (match) => {
    if (index >= skillValues.length) return match;
    return `damage{amount=${skillValues[index++]}`;
  });
}

fs.writeFileSync(mobFile, updateMobFile(fs.readFileSync(mobFile, 'utf8')), 'utf8');
fs.writeFileSync(skillFile, updateEnrageThresholds(fs.readFileSync(skillFile, 'utf8')), 'utf8');

for (const rank of ranks) {
  const stats = buildStats(rank);
  console.log(`${rank.id.padEnd(18)} +${String(rank.level).padEnd(3)} | N ${stats.NORMAL.health}/${stats.NORMAL.damage} | E ${stats.ELITE.health}/${stats.ELITE.damage} | B ${stats.BOSS.health}/${stats.BOSS.damage}`);
}
console.log(`MA_VUONG${' '.repeat(10)}     | B ${table.get('PRISON_MA_VUONG_BOSS').health}/${table.get('PRISON_MA_VUONG_BOSS').damage}`);
