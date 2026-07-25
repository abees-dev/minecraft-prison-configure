const fs = require('fs');
const path = require('path');

const mobFilePath = 'd:/server-minecraft/plugins/MythicMobs/mobs/prison_rank_mobs.yml';
let content = fs.readFileSync(mobFilePath, 'utf8');

// Configured drop pools by rank
const rankDrops = {
  'TAN_BINH': `  Drops:
  - mmoitem{type=CONSUMABLE;id=DA_CUONG_HOA_VU_KHI_SO_CAP} 1 0.20
  - mmoitem{type=CONSUMABLE;id=DA_CUONG_HOA_GIAP_SO_CAP} 1 0.20`,

  'TU_NHAN': `  Drops:
  - mmoitem{type=CONSUMABLE;id=DA_CUONG_HOA_VU_KHI_SO_CAP} 1 0.25
  - mmoitem{type=CONSUMABLE;id=DA_CUONG_HOA_GIAP_SO_CAP} 1 0.25`,

  'LAO_CONG': `  Drops:
  - mmoitem{type=CONSUMABLE;id=DA_CUONG_HOA_VU_KHI_TRUNG_CAP} 1 0.20
  - mmoitem{type=CONSUMABLE;id=DA_CUONG_HOA_GIAP_TRUNG_CAP} 1 0.20`,

  'THO_DAO': `  Drops:
  - mmoitem{type=CONSUMABLE;id=DA_CUONG_HOA_VU_KHI_TRUNG_CAP} 1 0.25
  - mmoitem{type=CONSUMABLE;id=DA_CUONG_HOA_GIAP_TRUNG_CAP} 1 0.25`,

  'DOI_TRUONG': `  Drops:
  - mmoitem{type=CONSUMABLE;id=DA_CUONG_HOA_VU_KHI_CAO_CAP} 1 0.20
  - mmoitem{type=CONSUMABLE;id=DA_CUONG_HOA_GIAP_CAO_CAP} 1 0.20`,

  'PHO_QUAN_NGUC': `  Drops:
  - mmoitem{type=CONSUMABLE;id=DA_CUONG_HOA_VU_KHI_CAO_CAP} 1 0.25
  - mmoitem{type=CONSUMABLE;id=DA_CUONG_HOA_GIAP_CAO_CAP} 1 0.25`,

  'QUAN_NGUC': `  Drops:
  - mmoitem{type=CONSUMABLE;id=DA_CUONG_HOA_VU_KHI_SIEU_CAP} 1 0.20
  - mmoitem{type=CONSUMABLE;id=DA_CUONG_HOA_GIAP_SIEU_CAP} 1 0.20`,

  'BA_CHU_NGUC_TU': `  Drops:
  - mmoitem{type=CONSUMABLE;id=DA_CUONG_HOA_VU_KHI_SIEU_CAP} 1 0.25
  - mmoitem{type=CONSUMABLE;id=DA_CUONG_HOA_GIAP_SIEU_CAP} 1 0.25`,

  'VUOT_NGUC': `  Drops:
  - mmoitem{type=CONSUMABLE;id=DA_CUONG_HOA_VU_KHI_HUYEN_THOAI} 1 0.15
  - mmoitem{type=CONSUMABLE;id=DA_CUONG_HOA_GIAP_HUYEN_THOAI} 1 0.15
  - mmoitem{type=CONSUMABLE;id=DA_CUONG_HOA_THIEN_MENH} 1 0.05`
};

let lines = content.split('\n');
let newLines = [];
let i = 0;

while (i < lines.length) {
  let line = lines[i];
  if (line.trim().startsWith('Drops:')) {
    while (i < lines.length && lines[i].trim() !== '' && !lines[i].startsWith('  Skills:')) {
      i++;
    }
    continue;
  }
  
  let matchedRank = null;
  for (let rankKey of Object.keys(rankDrops)) {
    if (line.startsWith(`PRISON_${rankKey}_`)) {
      matchedRank = rankKey;
      break;
    }
  }

  if (matchedRank) {
    newLines.push(line);
    while (i + 1 < lines.length && !lines[i + 1].startsWith('  Skills:')) {
      i++;
      if (!lines[i].trim().startsWith('Drops:') && !lines[i].trim().startsWith('- mmoitem')) {
        newLines.push(lines[i]);
      }
    }
    newLines.push(rankDrops[matchedRank]);
  } else {
    newLines.push(line);
  }
  i++;
}

fs.writeFileSync(mobFilePath, newLines.join('\n'), 'utf8');
console.log('✅ Đã cập nhật xong Drops Đá Cường Hóa theo Mốc Rank cho MythicMobs!');
