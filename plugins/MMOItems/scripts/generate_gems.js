/**
 * Script tự động sinh và cân bằng chỉ số cho Đá Quý (Gem Stones MMOItems)
 * Run: node scripts/generate_gems.js
 */

const fs = require("fs");
const path = require("path");

const romanMap = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];
const successRates = [95, 85, 70, 55, 40, 28, 18, 10, 5, 3];

const gemTypes = [
  {
    prefix: "RED_GEM",
    name: "Hồng Ngọc",
    color: "&c&l",
    gemColor: "Red",
    cmd: 15008,
    lore: [
      "&7Đá quý mang năng lượng nguyên tố Hỏa.",
      "&7Kéo thả vào trang bị có ô khảm để tăng sát thương.",
    ],
    statKey: "attack-damage",
    statFormula: (lv) => Number((0.5 + lv * 0.75).toFixed(1)),
  },
  {
    prefix: "BLUE_GEM",
    name: "Lam Ngọc",
    color: "&9&l",
    gemColor: "Blue",
    cmd: 15002,
    lore: [
      "&7Đá quý mang năng lượng nguyên tố Nước.",
      "&7Kéo thả vào trang bị có ô khảm để tăng Năng Lượng.",
    ],
    statKey: "max-mana",
    statFormula: (lv) => Math.floor(5 + lv * 7.5),
  },
  {
    prefix: "GREEN_GEM",
    name: "Lục Ngọc",
    color: "&a&l",
    gemColor: "Green",
    cmd: 15004,
    lore: [
      "&7Đá quý mang năng lượng nguyên tố Phong.",
      "&7Kéo thả vào trang bị có ô khảm để tăng Máu Tối Đa.",
    ],
    statKey: "max-health",
    statFormula: (lv) => Number((2.0 + lv * 2.5).toFixed(1)),
  },
  {
    prefix: "YELLOW_GEM",
    name: "Hoàng Ngọc",
    color: "&e&l",
    gemColor: "Yellow",
    cmd: 15010,
    lore: [
      "&7Đá quý mang năng lượng nguyên tố Thổ.",
      "&7Kéo thả vào trang bị có ô khảm để tăng Phòng Thủ.",
    ],
    statKey: "armor",
    statFormula: (lv) => Number((0.5 + lv * 0.6).toFixed(1)),
  },
  {
    prefix: "PURPLE_GEM",
    name: "Tử Ngọc",
    color: "&5&l",
    gemColor: "Purple",
    cmd: 15006,
    lore: [
      "&7Đá quý mang năng lượng Huyền Bí.",
      "&7Kéo thả vào trang bị có ô khảm để tăng Sát Thương Phép.",
    ],
    statKey: "magic-damage",
    statFormula: (lv) => Number((1.0 + lv * 1.5).toFixed(1)),
  },
  {
    prefix: "CYAN_GEM",
    name: "Băng Ngọc",
    color: "&b&l",
    gemColor: "Cyan",
    cmd: 15000,
    lore: [
      "&7Đá quý mang năng lượng Băng Giá.",
      "&7Kéo thả vào trang bị có ô khảm để tăng Tỷ Lệ Bạo Kích.",
    ],
    statKey: "critical-strike-chance",
    statFormula: (lv) => Number((0.5 + lv * 0.5).toFixed(1)),
  },
];

let gemContent = "";

gemTypes.forEach((gt) => {
  for (let lv = 1; lv <= 10; lv++) {
    const id = `${gt.prefix}_LV${lv}`;
    const roman = romanMap[lv - 1];
    const rate = successRates[lv - 1];
    const val = gt.statFormula(lv);

    gemContent += `${id}:
  base:
    material: PAPER
    custom-model-data: ${gt.cmd}
    name: "${gt.color}${gt.name} &e&lLv.${roman}"
    gem-color: "${gt.gemColor}"
    success-rate: ${rate}
    lore:
      - "${gt.lore[0]}"
      - "${gt.lore[1]}"
    ${gt.statKey}: ${val}
    will-break: false
    unbreakable: false

`;
  }
});

const baseDir = path.join(__dirname, "..");
fs.writeFileSync(
  path.join(baseDir, "item", "gem_stone.yml"),
  gemContent,
  "utf8",
);
console.log(
  "✅ Đã khởi tạo và cân bằng lại toàn bộ Đá Quý (gem_stone.yml) 6 Loại x 10 Cấp Lv!",
);
