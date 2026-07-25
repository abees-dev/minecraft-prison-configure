const fs = require('fs');
const path = require('path');

const itemDir = 'd:/server-minecraft/plugins/MMOItems/item';
const files = fs.readdirSync(itemDir).filter(f => f.endsWith('.yml'));

files.forEach(file => {
  const filePath = path.join(itemDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  const hasUpgrade = content.includes('upgrade:');
  const hasReference = content.includes('reference:');
  const lines = content.split('\n');
  let itemCount = 0;
  let upgradeCount = 0;
  let refCount = 0;

  lines.forEach(line => {
    if (line.match(/^[A-Z0-9_-]+:\s*$/)) itemCount++;
    if (line.match(/^\s{4}upgrade:\s*$/)) upgradeCount++;
    if (line.match(/^\s*reference:/)) refCount++;
  });

  console.log(`${file.padEnd(20)} | Items: ${String(itemCount).padStart(3)} | Upgrade blocks: ${String(upgradeCount).padStart(3)} | Ref lines: ${String(refCount).padStart(3)}`);
});
