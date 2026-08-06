/**
 * Option B+2: keep vanilla armor ≤ slot share of hard-cap 30; tank scaling lives in defense.
 *
 * Slot shares (sum = 30):
 *   HELMET/BOOTS 20% → 6 | CHESTPLATE 35% → 10.5 | LEGGINGS 25% → 7.5
 *
 * Step 1 (excess → defense): defense += max(0, armor - share)   [already applied once]
 * Step 2 (clamp armor):      armor = min(armor, share)
 *
 * This script only does Step 2 (idempotent). Do NOT re-run Step 1 on migrated files.
 *
 * Run: node scripts/migrate_armor_excess_to_defense.js
 */
const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'item', 'armor.yml');
const SLOT_SHARE = { HELMET: 6.0, CHESTPLATE: 10.5, LEGGINGS: 7.5, BOOTS: 6.0 };

const text = fs.readFileSync(file, 'utf8').replace(/^\uFEFF/, '');
const parts = text.split(/(?=^[A-Z0-9_]+:\s*$)/m);
let clamped = 0;

const out = parts.map((part) => {
  const idMatch = part.match(/^([A-Z0-9_]+):\s*$/m);
  if (!idMatch) return part;
  const itemId = idMatch[1];
  let slot = Object.keys(SLOT_SHARE).find((s) => itemId.includes(s));
  if (!slot) {
    const mat = part.match(/^\s+material:\s*(\S+)/m);
    if (mat) {
      const upper = mat[1].toUpperCase();
      slot = Object.keys(SLOT_SHARE).find((s) => upper.endsWith(s));
    }
  }
  if (!slot) return part;

  const armorMatch = part.match(/^(\s+armor:\s*)([\d.]+)(\s*)$/m);
  if (!armorMatch) return part;
  const armor = parseFloat(armorMatch[2]);
  const share = SLOT_SHARE[slot];
  if (armor <= share) return part;

  clamped += 1;
  const newArmor = share.toFixed(1);
  return part.replace(armorMatch[0], `${armorMatch[1]}${newArmor}${armorMatch[3]}`);
});

fs.writeFileSync(file, out.join(''), 'utf8');
console.log(`Clamped armor on ${clamped} pieces to slot share (full set ≤ 30).`);

// Bump revision-id so existing inventory items refresh on /mi update / join.
let revBumped = 0;
const after = fs.readFileSync(file, 'utf8');
const withRev = after.replace(/^(\s+revision-id:\s*)([\d.]+)\s*$/gm, (_, prefix, val) => {
  revBumped += 1;
  return `${prefix}${parseInt(val, 10) + 1}`;
});
if (clamped > 0) {
  fs.writeFileSync(file, withRev, 'utf8');
  console.log(`Bumped revision-id on ${revBumped} items (+1).`);
} else {
  console.log('No armor clamp → skipped revision-id bump.');
}
