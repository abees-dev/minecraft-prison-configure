/**
 * Script tự động khởi tạo và tính toán chỉ số CÂN BẰNG cho Cúp Đào (Pickaxes MMOItems)
 * Tích hợp Ô Khảm (Gem Sockets), Độ Bền, Nâng cấp theo Rank:
 * Run: node scripts/generate_tools.js
 */

const fs = require('fs');
const path = require('path');

const ranks = [
  { id: 'TAN_BINH', name: 'Tân Binh', color: '&f', tier: 'TRASH', durability: 500, mat: 'WOODEN_PICKAXE', template: 'pickaxe-tan-binh-template' },
  { id: 'TU_NHAN', name: 'Tù Nhân', color: '&a', tier: 'COMMON', durability: 1000, mat: 'STONE_PICKAXE', template: 'pickaxe-tu-nhan-template' },
  { id: 'LAO_CONG', name: 'Lao Công', color: '&b', tier: 'UNCOMMON', durability: 2000, mat: 'IRON_PICKAXE', template: 'pickaxe-lao-cong-template' },
  { id: 'THO_DAO', name: 'Thợ Đào', color: '&e', tier: 'RARE', durability: 3500, mat: 'IRON_PICKAXE', template: 'pickaxe-tho-dao-template' },
  { id: 'DOI_TRUONG', name: 'Đội Trưởng', color: '&6', tier: 'VERY_RARE', durability: 5000, mat: 'DIAMOND_PICKAXE', template: 'pickaxe-doi-truong-template' },
  { id: 'PHO_QUAN_NGUC', name: 'Phó Quản Ngục', color: '&c', tier: 'LEGENDARY', durability: 7000, mat: 'DIAMOND_PICKAXE', template: 'pickaxe-pho-quan-nguc-template' },
  { id: 'QUAN_NGUC', name: 'Quản Ngục', color: '&d', tier: 'MYTHICAL', durability: 9500, mat: 'NETHERITE_PICKAXE', template: 'pickaxe-quan-nguc-template' },
  { id: 'BA_CHU_NGUC_TU', name: 'Bá Chủ Ngục Tù', color: '&5', tier: 'EPIC', durability: 12500, mat: 'NETHERITE_PICKAXE', template: 'pickaxe-ba-chu-nguc-tu-template' },
  { id: 'VUOT_NGUC', name: 'Vượt Ngục', color: '&4', tier: 'UNIQUE', durability: 16000, mat: 'NETHERITE_PICKAXE', template: 'pickaxe-vuot-nguc-template' },
];

const romanMap = ['I', 'II', 'III', 'IV', 'V'];

function getSocketsYAML(rIdx) {
  const socketCounts = [0, 0, 1, 2, 3, 4, 4, 5, 5];
  const count = socketCounts[rIdx] || 0;
  if (count === 0) return '';
  let res = '    gem-sockets:\n';
  for (let i = 0; i < count; i++) {
    res += '      - Uncolored\n';
  }
  return res;
}

function getPickaxeStats(rIdx, tIdx) {
  const eff = (1 + rIdx * 1.5 + tIdx * 0.3);
  const fort = Math.floor(1 + rIdx * 0.75 + tIdx * 0.25);
  const unbr = Math.floor(1 + rIdx * 0.75 + tIdx * 0.25);
  const power = rIdx + 1;

  return { eff, fort, unbr, power };
}

let toolContent = '';

ranks.forEach((r, rIdx) => {
  for (let t = 0; t < 5; t++) {
    const tierNum = romanMap[t];
    const id = `PICKAXE_${r.id}_${t + 1}`;
    const stats = getPickaxeStats(rIdx, t);

    toolContent += `${id}:
  base:
    material: ${r.mat}
    name: "${r.color}Cúp ${r.name} &e&l${tierNum}"
    max-durability: ${r.durability}
    tier: ${r.tier}
    hide-enchants: true
    lore-format: tool-lore
    lore:
      - "&b&l✦ Tiểu Sử"
      - "&7 &b●&7 Dụng cụ đào khoáng chuyên dụng của ${r.name}"
      - "&7 &b●&7 Nâng cấp tại Lò Rèn để tăng cấp & hiệu suất đào"
    enchants:
      efficiency: ${stats.eff.toFixed(1)}
      fortune: ${stats.fort}
      unbreaking: ${stats.unbr}
    pickaxe-power: ${stats.power}
    custom-miningefficiency: ${stats.eff.toFixed(1)}
    custom-miningfortune: ${stats.fort}
    custom-miningunbreaking: ${stats.unbr}
`;

    toolContent += getSocketsYAML(rIdx);
    toolContent += `    upgrade:
      template: ${r.template}
      reference: weapon-upgrade-template
      max: 100
    will-break: false
    unbreakable: false

`;
  }
});

const baseDir = path.join(__dirname, '..');
fs.writeFileSync(path.join(baseDir, 'item', 'tool.yml'), toolContent, 'utf8');
console.log('✅ Đã khởi tạo và cân bằng lại toàn bộ Cúp Đào (tool.yml) cho 9 Rank x 5 Tier!');
