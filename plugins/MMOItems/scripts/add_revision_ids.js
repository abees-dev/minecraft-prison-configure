const fs = require('fs');
const path = require('path');

function processFile(filePath) {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');
    let lines = content.split(/\r?\n/);
    let newLines = [];
    let updatedCount = 0;

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        newLines.push(line);
        if (line.match(/^  base:\s*$/)) {
            // Check if next line is already revision-id
            if (i + 1 < lines.length && lines[i + 1].includes('revision-id:')) {
                continue;
            }
            newLines.push('    revision-id: 1');
            updatedCount++;
        }
    }

    fs.writeFileSync(filePath, newLines.join('\n'), 'utf8');
    if (updatedCount > 0) {
        console.log(`Updated ${updatedCount} items in ${path.basename(filePath)}`);
    }
}

const itemDir = 'd:/server-minecraft/plugins/MMOItems/item';
const files = fs.readdirSync(itemDir);
files.forEach(file => {
    if (file.endsWith('.yml')) {
        processFile(path.join(itemDir, file));
    }
});
