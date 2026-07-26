const fs = require('fs');
const path = require('path');

const cratesDir = path.join(__dirname, '..', 'crates');
if (!fs.existsSync(cratesDir)) {
  fs.mkdirSync(cratesDir, { recursive: true });
}

const keysDir = path.join(__dirname, '..', 'keys');
if (!fs.existsSync(keysDir)) {
  fs.mkdirSync(keysDir, { recursive: true });
}

const romanMap = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

const levelWeights = [
  { lv: 1, weight: 45.0, rarity: "common", broadcast: false },
  { lv: 2, weight: 25.0, rarity: "common", broadcast: false },
  { lv: 3, weight: 12.0, rarity: "common", broadcast: false },
  { lv: 4, weight: 7.0, rarity: "common", broadcast: false },
  { lv: 5, weight: 5.0, rarity: "common", broadcast: false },
  { lv: 6, weight: 3.0, rarity: "common", broadcast: false },
  { lv: 7, weight: 1.8, rarity: "common", broadcast: false },
  { lv: 8, weight: 0.8, rarity: "common", broadcast: true },
  { lv: 9, weight: 0.3, rarity: "common", broadcast: true },
  { lv: 10, weight: 0.1, rarity: "common", broadcast: true },
];

const gemTypes = [
  {
    file: "ruong_hong_ngoc.yml",
    prefix: "RED_GEM",
    name: "Hồng Ngọc",
    color: "&c&l",
    starColor: "&c",
    particle: "FLAME",
    statName: "Sát Thương Vật Lý",
  },
  {
    file: "ruong_lam_ngoc.yml",
    prefix: "BLUE_GEM",
    name: "Lam Ngọc",
    color: "&9&l",
    starColor: "&9",
    particle: "DRIP_WATER",
    statName: "Năng Lượng Tối Đa",
  },
  {
    file: "ruong_luc_ngoc.yml",
    prefix: "GREEN_GEM",
    name: "Lục Ngọc",
    color: "&a&l",
    starColor: "&a",
    particle: "HAPPY_VILLAGER",
    statName: "Máu Tối Đa",
  },
  {
    file: "ruong_hoang_ngoc.yml",
    prefix: "YELLOW_GEM",
    name: "Hoàng Ngọc",
    color: "&e&l",
    starColor: "&e",
    particle: "CRIT",
    statName: "Giáp Phòng Thủ",
  },
  {
    file: "ruong_tu_ngoc.yml",
    prefix: "PURPLE_GEM",
    name: "Tử Ngọc",
    color: "&5&l",
    starColor: "&5",
    particle: "SPELL_WITCH",
    statName: "Sát Thương Phép",
  },
  {
    file: "ruong_bang_ngoc.yml",
    prefix: "CYAN_GEM",
    name: "Băng Ngọc",
    color: "&b&l",
    starColor: "&b",
    particle: "SNOWFLAKE",
    statName: "Tỷ Lệ Bạo Kích",
  },
  {
    file: "ruong_hac_ngoc.yml",
    prefix: "BLACK_GEM",
    name: "Hắc Ngọc",
    color: "&8&l",
    starColor: "&8",
    particle: "SMOKE_LARGE",
    statName: "Sát Thương Bạo Kích",
  },
  {
    file: "ruong_bach_ngoc.yml",
    prefix: "WHITE_GEM",
    name: "Bạch Ngọc",
    color: "&f&l",
    starColor: "&f",
    particle: "END_ROD",
    statName: "Tốc Độ Hồi Máu",
  },
  {
    file: "ruong_tho_ngoc.yml",
    prefix: "BROWN_GEM",
    name: "Thổ Ngọc",
    color: "&6&l",
    starColor: "&6",
    particle: "REDSTONE",
    statName: "Sức Bền Giáp (Toughness)",
  },
  {
    file: "ruong_cam_ngoc.yml",
    prefix: "ORANGE_GEM",
    name: "Cam Ngọc",
    color: "&6&l",
    starColor: "&e",
    particle: "LAVA",
    statName: "Tốc Độ Di Chuyển",
  }
];

// Helper to extract existing Preview strings & Block positions from a crate yml file
function parseExistingCrateData(filePath) {
  const data = { previews: {}, positions: [] };
  if (!fs.existsSync(filePath)) return data;

  const lines = fs.readFileSync(filePath, 'utf8').split(/\r?\n/);
  let currentKey = null;
  let inPositions = false;
  let inRewards = false;

  for (let line of lines) {
    if (line.includes('Positions:')) {
      inPositions = true;
      continue;
    }
    if (inPositions) {
      if (line.trim().startsWith('- ')) {
        data.positions.push(line.trim().replace(/^-\s*/, ''));
        continue;
      } else if (line.trim() !== '' && !line.startsWith(' ')) {
        inPositions = false;
      }
    }

    if (line.trim() === 'Rewards:' || line.trim() === 'List:') {
      inRewards = true;
      continue;
    }

    if (line.startsWith('Item:') || line.startsWith('Block:')) {
      inRewards = false;
      currentKey = null;
    }

    const keyMatch = line.match(/^ {4}([a-zA-Z0-9_]+):\s*$/);
    if (keyMatch && inRewards) {
      currentKey = keyMatch[1];
    } else if (currentKey) {
      const previewMatch = line.match(/^\s+Preview:\s*(.+)$/);
      if (previewMatch) {
        data.previews[currentKey] = previewMatch[1].trim();
      }
    }
  }

  return data;
}

// 1. Generate individual gem crate files
gemTypes.forEach((gt) => {
  const filePath = path.join(cratesDir, gt.file);
  const existing = parseExistingCrateData(filePath);

  let rewardsStr = "";

  levelWeights.forEach((lw) => {
    const roman = romanMap[lw.lv - 1];
    const rewardKey = `${gt.prefix.toLowerCase()}_lv_${lw.lv}`;
    const gemId = `${gt.prefix}_LV${lw.lv}`;
    const previewVal = existing.previews[rewardKey];

    let commandsBlock = `      Commands:
      - mmoitems give GEM_STONE ${gemId} %player_name% 1`;

    if (lw.broadcast) {
      commandsBlock += `
      - broadcast &d&lCRATES &8» &fChúc mừng &b%player_name% &fvừa mở &eHòm ${gt.name} &fnhận được ${gt.color}${gt.name} &e&lLv.${roman}&f!
      - execute as %player_name% at @s run playsound ui.toast.challenge_complete master @s ~ ~ ~ 1 1
      - execute as %player_name% at @s run summon firework_rocket ~ ~ ~ {LifeTime:5,Motion:[0.0,1.2,0.0],FireworksItem:{id:"minecraft:firework_rocket",Count:1,tag:{Fireworks:{Explosions:[{Type:1,Colors:[I;16711680,16776960],FadeColors:[I;255]}]}}}}`;
    } else {
      commandsBlock += `
      - execute as %player_name% at @s run playsound entity.experience_orb.pickup master @s ~ ~ ~ 1 1.2`;
    }

    const previewLine = previewVal ? `\n      Preview: ${previewVal}` : '';

    rewardsStr += `    ${rewardKey}:
      Name: '${gt.color}${gt.name} &e&lLv.${roman}'
      Weight: ${lw.weight.toFixed(1)}
      Rarity: ${lw.rarity}
      Broadcast: ${lw.broadcast}
      Placeholder_Apply: true
      Win_Limit:
        Player:
          Enabled: false
          Amount: -1
          Cooldown: 0
          CooldownStep: 1
        Global:
          Enabled: false
          Amount: -1
          Cooldown: 0
          CooldownStep: 1
      Items: []
${commandsBlock}
      Ignored_For_Permissions: []${previewLine}
`;
  });

  const positionsStr = existing.positions.length > 0 
    ? existing.positions.map(p => `  - ${p}`).join('\n') 
    : '';

  const content = `Name: '${gt.color}Hòm ${gt.name}'
Preview_Config: default
Permission_Required: false
Opening:
  Cooldown: 0
Key:
  Required: false
  Ids: []
Block:
  Positions:
${positionsStr}
  Pushback:
    Enabled: true
  Hologram:
    Enabled: true
    Template: default
    Y_Offset: 0.0
  Effect:
    Model: HELIX
    Particle:
      Name: ${gt.particle}
Milestones:
  Repeatable: false
Rewards:
  List:
${rewardsStr}Item:
  Material: CHEST
  Name: '${gt.color}Hòm ${gt.name}'
  Lore:
  - '&7Mở để nhận ngẫu nhiên ${gt.color}${gt.name} &7từ &f&lLv.I &7đến ${gt.color}Lv.X&7.'
  - '&7Khảm vào trang bị giúp gia tăng ${gt.color}${gt.statName}&7.'
  - ''
  - '&e&l★ PHẦN THƯỞNG NỔI BẬT:'
  - '&f &f▪ ${gt.color}${gt.name} &e&lLv.X&7: &c&l0.1%'
  - '&f &f▪ ${gt.color}${gt.name} &e&lLv.IX&7: &c&l0.3%'
  - '&f &f▪ ${gt.color}${gt.name} &e&lLv.VIII&7: &c&l0.8%'
  - '&f &f▪ ${gt.color}${gt.name} &7(Lv.I - &7Lv.VII)&7: &a&l98.8%'
  - ''
  - '&e▸ Nhấn chuột phải để mở.'
  Item_Flags:
  - HIDE_ENCHANTS
  - HIDE_ATTRIBUTES
  - HIDE_UNBREAKABLE
  - HIDE_DESTROYS
  - HIDE_PLACED_ON
  - HIDE_POTION_EFFECTS
  - HIDE_DYE
  - HIDE_ARMOR_TRIM
`;

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✅ Synced crate config: ${gt.file}`);
});

// 2. Generate Master Gem Crate (ruong_da_quy_tong_hop.yml)
const masterPath = path.join(cratesDir, 'ruong_da_quy_tong_hop.yml');
const masterExisting = parseExistingCrateData(masterPath);

let masterRewardsStr = "";
gemTypes.forEach((gt) => {
  levelWeights.forEach((lw) => {
    const roman = romanMap[lw.lv - 1];
    const rewardKey = `${gt.prefix.toLowerCase()}_lv_${lw.lv}`;
    const gemId = `${gt.prefix}_LV${lw.lv}`;
    const weight = (lw.weight / 10).toFixed(2);
    const previewVal = masterExisting.previews[rewardKey];

    let commandsBlock = `      Commands:
      - mmoitems give GEM_STONE ${gemId} %player_name% 1`;

    if (lw.broadcast) {
      commandsBlock += `
      - broadcast &d&lCRATES &8» &fChúc mừng &b%player_name% &fvừa mở &eHòm ${gt.name} &fnhận được ${gt.color}${gt.name} &e&lLv.${roman}&f!
      - execute as %player_name% at @s run playsound ui.toast.challenge_complete master @s ~ ~ ~ 1 1
      - execute as %player_name% at @s run summon firework_rocket ~ ~ ~ {LifeTime:5,Motion:[0.0,1.2,0.0],FireworksItem:{id:"minecraft:firework_rocket",Count:1,tag:{Fireworks:{Explosions:[{Type:1,Colors:[I;16711680,16776960],FadeColors:[I;255]}]}}}}`;
    } else {
      commandsBlock += `
      - execute as %player_name% at @s run playsound entity.experience_orb.pickup master @s ~ ~ ~ 1 1.2`;
    }

    const previewLine = previewVal ? `\n      Preview: ${previewVal}` : '';

    masterRewardsStr += `    ${rewardKey}:
      Name: '${gt.color}${gt.name} &e&lLv.${roman}'
      Weight: ${weight}
      Rarity: ${lw.rarity}
      Broadcast: ${lw.broadcast}
      Placeholder_Apply: true
      Win_Limit:
        Player:
          Enabled: false
          Amount: -1
          Cooldown: 0
          CooldownStep: 1
        Global:
          Enabled: false
          Amount: -1
          Cooldown: 0
          CooldownStep: 1
      Items: []
${commandsBlock}
      Ignored_For_Permissions: []${previewLine}
`;
  });
});

const masterPositionsStr = masterExisting.positions.length > 0 
  ? masterExisting.positions.map(p => `  - ${p}`).join('\n') 
  : '';

const masterContent = `Name: '&d&lHòm Đá Quý Tổng Hợp'
Preview_Config: default
Permission_Required: false
Opening:
  Cooldown: 0
Key:
  Required: false
  Ids: []
Block:
  Positions:
${masterPositionsStr}
  Pushback:
    Enabled: true
  Hologram:
    Enabled: true
    Template: default
    Y_Offset: 0.0
  Effect:
    Model: HELIX
    Particle:
      Name: SPELL_WITCH
Milestones:
  Repeatable: false
Rewards:
  List:
${masterRewardsStr}Item:
  Material: CHEST
  Name: '&d&lHòm Đá Quý Tổng Hợp'
  Lore:
  - '&7Hòm chứa ngẫu nhiên tất cả &d&l10 Loại Đá Quý &7từ &f&lLv.I &7đến &d&lLv.X&7.'
  - '&7Mở ra có thể nhận Đá Quý của bất kỳ thuộc tính nào!'
  - ''
  - '&e&l★ PHẦN THƯỞNG NỔI BẬT:'
  - '&f &f▪ &dĐá Quý &e&lLv.X &7(Các loại): &c&l0.1%'
  - '&f &f▪ &dĐá Quý &e&lLv.IX &7(Các loại): &c&l0.8%'
  - '&f &f▪ &dĐá Quý &e&lLv.VIII &7(Các loại): &c&l0.8%'
  - '&f &f▪ &dĐá Quý &7(Lv.I - &7Lv.VII)&7: &a&l98.8%'
  - ''
  - '&e▸ Nhấn chuột phải để mở.'
  Item_Flags:
  - HIDE_ENCHANTS
  - HIDE_ATTRIBUTES
  - HIDE_UNBREAKABLE
  - HIDE_DESTROYS
  - HIDE_PLACED_ON
  - HIDE_POTION_EFFECTS
  - HIDE_DYE
  - HIDE_ARMOR_TRIM
`;

fs.writeFileSync(masterPath, masterContent, 'utf8');
console.log('✅ Synced master crate: ruong_da_quy_tong_hop.yml');

// 3. Key Configuration (chia_khoa_ruong_ngoc.yml)
const keyContent = `Name: '&e&lChìa Khóa Rương Ngọc'
Virtual: false
Item:
  Material: TRIPWIRE_HOOK
  Name: '&e&lChìa Khóa Rương Ngọc'
  Lore:
  - '&7Dùng để mở &e&lHòm Rương Ngọc&7.'
  - '&7Quay ngẫu nhiên 1 trong 10 loại &dHòm Ngọc&7 với tỷ lệ bằng nhau.'
  - ''
  - '&e▸ Nhấp vào Hòm Rương Ngọc để quay!'
  Enchantments:
    DURABILITY: 1
  Item_Flags:
  - HIDE_ENCHANTS
`;

fs.writeFileSync(path.join(keysDir, 'chia_khoa_ruong_ngoc.yml'), keyContent, 'utf8');
console.log('✅ Synced key config: chia_khoa_ruong_ngoc.yml');

// 4. Crate Spinner (ruong_quay_ngoc.yml)
const spinnerPath = path.join(cratesDir, 'ruong_quay_ngoc.yml');
const spinnerExisting = parseExistingCrateData(spinnerPath);

let spinnerRewardsStr = "";
let spinnerLoreStr = "";

gemTypes.forEach((gt) => {
  const crateId = gt.file.replace('.yml', '');
  const rewardKey = `${gt.prefix.toLowerCase()}_crate`;
  const previewVal = spinnerExisting.previews[rewardKey];

  const previewLine = previewVal ? `\n      Preview: ${previewVal}` : '';

  spinnerRewardsStr += `    ${rewardKey}:
      Name: '${gt.color}Hòm ${gt.name}'
      Weight: 10.0
      Rarity: common
      Broadcast: false
      Placeholder_Apply: false
      Win_Limit:
        Player:
          Enabled: false
          Amount: -1
          Cooldown: 0
          CooldownStep: 1
        Global:
          Enabled: false
          Amount: -1
          Cooldown: 0
          CooldownStep: 1
      Items: []
      Commands:
      - crates give %player_name% ${crateId} 1
      - execute as %player_name% at @s run playsound entity.experience_orb.pickup master @s ~ ~ ~ 1 1.2
      Ignored_For_Permissions: []${previewLine}
`;

  spinnerLoreStr += `  - '&f &f▪ ${gt.color}Hòm ${gt.name}&7: &a&l9.1%'\n`;
});

// Add Master Gem Crate to Spinner Crate rewards
const masterRewardKey = "master_gem_crate";
const masterPreviewVal = spinnerExisting.previews[masterRewardKey];
const masterPreviewLine = masterPreviewVal ? `\n      Preview: ${masterPreviewVal}` : '';

spinnerRewardsStr += `    ${masterRewardKey}:
      Name: '&d&lHòm Đá Quý Tổng Hợp'
      Weight: 10.0
      Rarity: common
      Broadcast: true
      Placeholder_Apply: false
      Win_Limit:
        Player:
          Enabled: false
          Amount: -1
          Cooldown: 0
          CooldownStep: 1
        Global:
          Enabled: false
          Amount: -1
          Cooldown: 0
          CooldownStep: 1
      Items: []
      Commands:
      - crates give %player_name% ruong_da_quy_tong_hop 1
      - broadcast &d&lCRATES &8» &fChúc mừng &b%player_name% &fvừa quay trúng &d&lHòm Đá Quý Tổng Hợp&f!
      - execute as %player_name% at @s run playsound ui.toast.challenge_complete master @s ~ ~ ~ 1 1
      Ignored_For_Permissions: []${masterPreviewLine}
`;

spinnerLoreStr += `  - '&f &f▪ &d&lHòm Đá Quý Tổng Hợp&7: &a&l9.1%'\n`;

const spinnerPositionsStr = spinnerExisting.positions.length > 0 
  ? spinnerExisting.positions.map(p => `  - ${p}`).join('\n') 
  : '';

const spinnerCrateContent = `Name: '&e&lHòm Rương Ngọc'
Preview_Config: default
Permission_Required: false
Opening:
  Cooldown: 0
Key:
  # Sets whether or not keys are required to open this crate.
  Required: true
  Ids:
  - chia_khoa_ruong_ngoc
Block:
  Positions:
${spinnerPositionsStr}
  Pushback:
    Enabled: true
  Hologram:
    Enabled: true
    Template: default
    Y_Offset: 0.0
  Effect:
    Model: HELIX
    Particle:
      Name: ENCHANTMENT_TABLE
Milestones:
  Repeatable: false
Rewards:
  List:
${spinnerRewardsStr}Item:
  Material: CHEST
  Name: '&e&lHòm Rương Ngọc'
  Lore:
  - '&7Sử dụng &e&lChìa Khóa Rương Ngọc &7để quay.'
  - '&7Quay ngẫu nhiên 1 trong 11 loại &dHòm Ngọc &7(tỷ lệ bằng nhau ~9.1%):'
  - ''
  - '&e&l★ DANH SÁCH HÒM NGỌC (11 Loại):'
${spinnerLoreStr}  - ''
  - '&e▸ Yêu cầu Chìa Khóa Rương Ngọc để mở.'
  Item_Flags:
  - HIDE_ENCHANTS
  - HIDE_ATTRIBUTES
  - HIDE_UNBREAKABLE
  - HIDE_DESTROYS
  - HIDE_PLACED_ON
  - HIDE_POTION_EFFECTS
  - HIDE_DYE
  - HIDE_ARMOR_TRIM
`;

fs.writeFileSync(spinnerPath, spinnerCrateContent, 'utf8');
console.log('✅ Synced spinner crate: ruong_quay_ngoc.yml');
