const fs = require('fs');
const path = require('path');

const cratesDir = path.join(__dirname, '..', 'crates');
if (!fs.existsSync(cratesDir)) {
    fs.mkdirSync(cratesDir, { recursive: true });
}

const dragonPath = path.join(cratesDir, "ruong_long_toc.yml");

function parseExistingCrateData(filePath) {
    const data = { previews: {}, positions: [], animationConfig: null, lastOpener: null, lastReward: null, customItem: null };
    if (!fs.existsSync(filePath)) return data;

    const content = fs.readFileSync(filePath, 'utf8');

    const cmdGiveMatch = content.match(/^Commands:\s*$/m)
    const lines = content.split(/\r?\n/);
    const result = []

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        if (line.trimStart().startsWith("Commands:")) {
            let cmd = lines[i + 1].trim()

            if (cmd.includes("mmoitems give")) {
                const replaceName = cmd.replace("%player_name%", "ABeess");
                const parseCmd = replaceName.split(' ')[1] + ' ' + replaceName.split(' ')[2] + ' ' + replaceName.split(' ')[3] + ' ' + replaceName.split(' ')[4] + ' ' + replaceName.split(' ')[5]
                result.push(parseCmd)
            }
        }
    }

    return result
}

function writeMDResult(paht, cmds) {
    let md = ""
    md += "# Hòm Long Tộc\n\n"

    md += "```"

    for (const cmd of cmds) {
        md += cmd + "\n"
    }

    md += "```"

    fs.writeFileSync(path.join(paht, "result.md"), md, 'utf-8')

}


const cmds = parseExistingCrateData(dragonPath)

writeMDResult("", cmds)