const fs = require('fs');
const path = require('path');

const armorPath = 'd:/server-minecraft/plugins/MMOItems/item/armor.yml';
let content = fs.readFileSync(armorPath, 'utf8');

if (!content.includes('armor-upgrade-template')) {
  // Add upgrade block before will-break: false or unbreakable: false
  content = content.replace(/(    will-break: false\s*\n    unbreakable: false)/g, (match) => {
    return `    upgrade:
      template: armor-upgrade-template
      reference: armor-upgrade-template
      max: 100
${match}`;
  });

  fs.writeFileSync(armorPath, content, 'utf8');
  console.log('✅ Đã thêm upgrade block cho toàn bộ Giáp trong armor.yml!');
} else {
  console.log('Armor.yml already updated.');
}
