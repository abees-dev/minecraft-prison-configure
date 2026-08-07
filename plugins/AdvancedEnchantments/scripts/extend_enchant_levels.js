/**
 * Extend the curated enchant pool to the server rarity level caps.
 *
 * The script is idempotent: it only appends missing levels. New levels inherit
 * the strongest configured effect, increase proc chance conservatively and
 * reduce cooldown every two appended levels. Binary enchants intentionally
 * remain level I because extra levels would be cosmetic only.
 *
 * Run from plugins/AdvancedEnchantments:
 *   node scripts/extend_enchant_levels.js
 */

const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'enchantments.yml');
const caps = {
  SIMPLE: 5,
  UNIQUE: 5,
  ELITE: 6,
  ULTIMATE: 7,
  LEGENDARY: 8,
  FABLED: 10,
};

// Per-enchant caps override the rarity cap for deliberately shorter upgrade
// paths. Smelting reaches 100% at level III, so V is sufficient even as a
// LEGENDARY reward.
const customCaps = {
  smelting: 5,
};

// These effects are binary/passive. Duplicating their level does not improve
// gameplay and only dilutes the book pool.
const fixedLevel = new Set([
  'glowing',
  'aquatic',
  'obsidianshield',
  'lavawalker',
  'waterwalker',
]);

const source = fs.readFileSync(file, 'utf8').replace(/^\uFEFF/, '');
const blocks = source.split(/(?=^[a-z0-9_-]+:\s*$)/m);
let enchantmentsChanged = 0;
let levelsAdded = 0;

function scalar(chunk, key) {
  const match = chunk.match(new RegExp(`^\\s{6}${key}:\\s*([0-9.]+)\\s*$`, 'm'));
  return match ? Number(match[1]) : null;
}

function formatNumber(value) {
  return Number.isInteger(value) ? String(value) : value.toFixed(1);
}

function tuneLevel(chunk, level, previousLevel, appendIndex) {
  let tuned = chunk.replace(/^\s{4}'\d+':\s*$/m, `    '${level}':`);
  const currentChance = scalar(chunk, 'chance');
  const previousChance = previousLevel ? scalar(previousLevel, 'chance') : null;

  if (currentChance !== null) {
    const observedStep = previousChance === null ? 2 : currentChance - previousChance;
    const safeStep = Math.max(1, Math.min(5, observedStep || 2));
    const chance = Math.min(100, currentChance + safeStep * appendIndex);
    tuned = tuned.replace(
      /^(\s{6}chance:\s*)[0-9.]+\s*$/m,
      `$1${formatNumber(chance)}`,
    );
  }

  const currentCooldown = scalar(chunk, 'cooldown');
  if (currentCooldown !== null) {
    const cooldown = Math.max(1, currentCooldown - Math.floor((appendIndex + 1) / 2));
    tuned = tuned.replace(
      /^(\s{6}cooldown:\s*)[0-9.]+\s*$/m,
      `$1${formatNumber(cooldown)}`,
    );
  }

  return tuned;
}

const output = blocks.map((block) => {
  const idMatch = block.match(/^([a-z0-9_-]+):\s*$/m);
  if (!idMatch || fixedLevel.has(idMatch[1])) return block;

  const groupMatch = block.match(/^\s{2}group:\s*([A-Z_]+)\s*$/m);
  if (!groupMatch || !caps[groupMatch[1]]) return block;

  const levelMatches = [...block.matchAll(/^\s{4}'(\d+)':\s*$/gm)];
  if (levelMatches.length === 0) return block;

  const currentMax = Math.max(...levelMatches.map((match) => Number(match[1])));
  const target = customCaps[idMatch[1]] || caps[groupMatch[1]];
  if (currentMax >= target) return block;

  const lastMatchIndex = levelMatches.findIndex((match) => Number(match[1]) === currentMax);
  const lastMatch = levelMatches[lastMatchIndex];
  const lastStart = lastMatch.index;
  const lastChunk = block.slice(lastStart).replace(/\s+$/, '');
  const previousMatch = levelMatches[lastMatchIndex - 1];
  const previousChunk = previousMatch
    ? block.slice(previousMatch.index, lastStart).replace(/\s+$/, '')
    : null;

  let appended = '';
  for (let level = currentMax + 1; level <= target; level += 1) {
    const appendIndex = level - currentMax;
    appended += `\n${tuneLevel(lastChunk, level, previousChunk, appendIndex)}\n`;
    levelsAdded += 1;
  }

  enchantmentsChanged += 1;
  return `${block.replace(/\s+$/, '')}\n${appended}`;
});

fs.writeFileSync(file, output.join('').replace(/\n{3,}/g, '\n\n'), 'utf8');
console.log(`Extended ${enchantmentsChanged} enchantments with ${levelsAdded} new levels.`);
