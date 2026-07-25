const fs = require('fs');
const path = require('path');

const itemDir = 'd:/server-minecraft/plugins/MMOItems/item';

// --- 1. Fix consumable.yml ---
const consumablePath = path.join(itemDir, 'consumable.yml');
let consumableContent = fs.readFileSync(consumablePath, 'utf8');

const weaponStones = [
  { id: 'DA_CUONG_HOA_VU_KHI_SO_CAP', rate: 85.0, max: 20 },
  { id: 'DA_CUONG_HOA_VU_KHI_TRUNG_CAP', rate: 65.0, max: 40 },
  { id: 'DA_CUONG_HOA_VU_KHI_CAO_CAP', rate: 45.0, max: 60 },
  { id: 'DA_CUONG_HOA_VU_KHI_SIEU_CAP', rate: 25.0, max: 80 },
  { id: 'DA_CUONG_HOA_VU_KHI_HUYEN_THOAI', rate: 10.0, max: 100 },
];

const armorStones = [
  { id: 'DA_CUONG_HOA_GIAP_SO_CAP', rate: 85.0, max: 20 },
  { id: 'DA_CUONG_HOA_GIAP_TRUNG_CAP', rate: 65.0, max: 40 },
  { id: 'DA_CUONG_HOA_GIAP_CAO_CAP', rate: 45.0, max: 60 },
  { id: 'DA_CUONG_HOA_GIAP_SIEU_CAP', rate: 25.0, max: 80 },
  { id: 'DA_CUONG_HOA_GIAP_HUYEN_THOAI', rate: 10.0, max: 100 },
];

function updateConsumableUpgradeBlock(content, itemId, ref, rate, max) {
  const blockRegex = new RegExp(`(${itemId}:[\\s\\S]*?upgrade:)([\\s\\S]*?)(?=\\n\\n|\\n[A-Z0-9_-]+:|$)`);
  const newUpgradeBlock = `\n      reference: ${ref}\n      template: ${ref}\n      success-rate: ${rate.toFixed(1)}\n      success: ${rate.toFixed(1)}\n      max: ${max}\n      destroy-on-fail: false`;

  if (blockRegex.test(content)) {
    content = content.replace(blockRegex, `$1${newUpgradeBlock}`);
  }
  return content;
}

weaponStones.forEach(s => {
  consumableContent = updateConsumableUpgradeBlock(consumableContent, s.id, 'weapon-upgrade-template', s.rate, s.max);
});

armorStones.forEach(s => {
  consumableContent = updateConsumableUpgradeBlock(consumableContent, s.id, 'armor-upgrade-template', s.rate, s.max);
});

const thienMenhRegex = /(DA_CUONG_HOA_THIEN_MENH:[\s\S]*?upgrade:)([\s\S]*?)(?=\n\n|\n[A-Z0-9_-]+:|$)/;
if (thienMenhRegex.test(consumableContent)) {
  consumableContent = consumableContent.replace(thienMenhRegex, `$1\n      reference: all\n      template: weapon-upgrade-template\n      success-rate: 100.0\n      success: 100.0\n      max: 100\n      destroy-on-fail: false`);
}

fs.writeFileSync(consumablePath, consumableContent, 'utf8');
console.log('✅ Updated consumable.yml');

// --- 2. Robust Gear Item Fixer ---
function fixGearFile(fileName, defaultRef, defaultTemplate) {
  const filePath = path.join(itemDir, fileName);
  if (!fs.existsSync(filePath)) return;

  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const itemBlocks = [];
  let current = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.match(/^[A-Za-z0-9_-]+:\s*$/) && !line.startsWith(' ')) {
      if (current.length > 0) itemBlocks.push(current);
      current = [line];
    } else {
      current.push(line);
    }
  }
  if (current.length > 0) itemBlocks.push(current);

  const processed = itemBlocks.map(blockLines => {
    const text = blockLines.join('\n');
    if (!text.includes('base:')) return text;

    if (text.includes('    upgrade:')) {
      // Ensure reference is inside upgrade:
      let newLines = [];
      for (let i = 0; i < blockLines.length; i++) {
        newLines.push(blockLines[i]);
        if (blockLines[i].match(/^\s{4}upgrade:\s*$/)) {
          let hasRef = false;
          for (let j = i + 1; j < blockLines.length; j++) {
            if (blockLines[j].match(/^\s{4}[a-z]/) || blockLines[j].match(/^[A-Za-z0-9_-]+:/)) break;
            if (blockLines[j].includes('reference:')) {
              hasRef = true;
              break;
            }
          }
          if (!hasRef) {
            newLines.push(`      reference: ${defaultRef}`);
          }
        }
      }
      return newLines.join('\n');
    } else {
      // Add missing upgrade: block
      let templateToUse = defaultTemplate;
      const upgradeSnippet = `    upgrade:\n      template: ${templateToUse}\n      reference: ${defaultRef}\n      max: 100`;

      let inserted = false;
      let newLines = [];
      for (let i = 0; i < blockLines.length; i++) {
        if (!inserted && (blockLines[i].includes('will-break:') || blockLines[i].includes('unbreakable:'))) {
          newLines.push(upgradeSnippet);
          inserted = true;
        }
        newLines.push(blockLines[i]);
      }
      if (!inserted) {
        let lastNonEmpty = newLines.length - 1;
        while (lastNonEmpty >= 0 && newLines[lastNonEmpty].trim() === '') lastNonEmpty--;
        newLines.splice(lastNonEmpty + 1, 0, upgradeSnippet);
      }
      return newLines.join('\n');
    }
  });

  fs.writeFileSync(filePath, processed.join('\n'), 'utf8');
  console.log(`✅ Fully fixed ${fileName}`);
}

const weaponFiles = ['sword.yml', 'staff.yml', 'axe.yml', 'dagger.yml', 'tool.yml'];
const armorFiles = ['armor.yml', 'ring.yml', 'amulet.yml', 'bracelet.yml', 'gloves.yml', 'accessory.yml'];

weaponFiles.forEach(f => fixGearFile(f, 'weapon-upgrade-template', 'weapon-upgrade-template'));
armorFiles.forEach(f => fixGearFile(f, 'armor-upgrade-template', 'armor-upgrade-template'));

