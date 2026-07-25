const fs = require('fs');
const path = require('path');

const cratesDir = path.join(__dirname, 'crates');
if (!fs.existsSync(cratesDir)) {
  fs.mkdirSync(cratesDir, { recursive: true });
}

const romanMap = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

const levelWeights = [
  { lv: 1, weight: 40.0, rarity: "common", broadcast: false },
  { lv: 2, weight: 25.0, rarity: "common", broadcast: false },
  { lv: 3, weight: 15.0, rarity: "uncommon", broadcast: false },
  { lv: 4, weight: 9.0, rarity: "uncommon", broadcast: false },
  { lv: 5, weight: 5.0, rarity: "rare", broadcast: false },
  { lv: 6, weight: 3.0, rarity: "rare", broadcast: false },
  { lv: 7, weight: 1.8, rarity: "epic", broadcast: false },
  { lv: 8, weight: 0.8, rarity: "epic", broadcast: true },
  { lv: 9, weight: 0.3, rarity: "legendary", broadcast: true },
  { lv: 10, weight: 0.1, rarity: "mythic", broadcast: true },
];

const gemTypes = [
  {
    file: "ruong_hong_ngoc.yml",
    prefix: "RED_GEM",
    name: "Hồng Ngọc",
    color: "&c&l",
    starColor: "&c",
    particle: "FLAME",
    skin: "19370ea0e7bf5decc8a01d5b674191dd060e6c46fc4d580f1c1a47c4fb6a9ac9",
    desc: "Chứa năng lượng nguyên tố Hỏa, tăng Sát Thương Vật Lý."
  },
  {
    file: "ruong_lam_ngoc.yml",
    prefix: "BLUE_GEM",
    name: "Lam Ngọc",
    color: "&9&l",
    starColor: "&9",
    particle: "DRIP_WATER",
    skin: "66453664d4b1a4aa66b579fbbfbfecfaef9ae8b376d498d7950c60ba0df841",
    desc: "Chứa năng lượng nguyên tố Nước, tăng Năng Lượng Tối Đa."
  },
  {
    file: "ruong_luc_ngoc.yml",
    prefix: "GREEN_GEM",
    name: "Lục Ngọc",
    color: "&a&l",
    starColor: "&a",
    particle: "HAPPY_VILLAGER",
    skin: "5610ec88544ab6bb3cfd5dcf5ed16c3e9c5aa811a91e57c631aefcf448ab22",
    desc: "Chứa năng lượng nguyên tố Phong, tăng Máu Tối Đa."
  },
  {
    file: "ruong_hoang_ngoc.yml",
    prefix: "YELLOW_GEM",
    name: "Hoàng Ngọc",
    color: "&e&l",
    starColor: "&e",
    particle: "CRIT",
    skin: "e7742034f59db890c8004156b727c77ca695c4399d8e0da5ce9227cf836bb8e2",
    desc: "Chứa năng lượng nguyên tố Thổ, tăng Phòng Thủ."
  },
  {
    file: "ruong_tu_ngoc.yml",
    prefix: "PURPLE_GEM",
    name: "Tử Ngọc",
    color: "&5&l",
    starColor: "&5",
    particle: "SPELL_WITCH",
    skin: "77334cddfab45d75ad28e1a47bf8cf5017d2f0982f6737da22d4972952510661",
    desc: "Chứa năng lượng Huyền Bí, tăng Sát Thương Phép."
  },
  {
    file: "ruong_bang_ngoc.yml",
    prefix: "CYAN_GEM",
    name: "Băng Ngọc",
    color: "&b&l",
    starColor: "&b",
    particle: "SNOWFLAKE",
    skin: "1c5a8aa8a4c03600a2b5a4eb6beb51d590260b095ee1cdaa976b09bdfe5661c6",
    desc: "Chứa năng lượng Băng Giá, tăng Tỷ Lệ Bạo Kích."
  },
  {
    file: "ruong_hac_ngoc.yml",
    prefix: "BLACK_GEM",
    name: "Hắc Ngọc",
    color: "&8&l",
    starColor: "&8",
    particle: "SMOKE_LARGE",
    skin: "87acb8b99d478ba35053e9f212acb5c55cc144840468fd0242b39f5bd75acb41",
    desc: "Chứa năng lượng Bóng Tối, tăng Sát Thương Bạo Kích."
  },
  {
    file: "ruong_bach_ngoc.yml",
    prefix: "WHITE_GEM",
    name: "Bạch Ngọc",
    color: "&f&l",
    starColor: "&f",
    particle: "END_ROD",
    skin: "f98bc63f05f6378bf29ef10e3d82acb3ceb73a720bf80f30bc576d0ad8c40cfb",
    desc: "Chứa năng lượng Ánh Sáng, tăng Hồi Phục Máu."
  },
  {
    file: "ruong_tho_ngoc.yml",
    prefix: "BROWN_GEM",
    name: "Thổ Ngọc",
    color: "&6&l",
    starColor: "&6",
    particle: "REDSTONE",
    skin: "47e0d63f3eccdb9b70ed1fd40db52c2afe570e00d691b14ee7882964e20835c6",
    desc: "Chứa năng lượng Thổ Nguyên, tăng Độ Bền Giáp."
  },
  {
    file: "ruong_cam_ngoc.yml",
    prefix: "ORANGE_GEM",
    name: "Cam Ngọc",
    color: "&6&l",
    starColor: "&e",
    particle: "LAVA",
    skin: "be9ae7a4be65fcbaee65181389a2f7d47e2e326db59ea3eb789a92c85ea46",
    desc: "Chứa năng lượng Năng Lượng, tăng Tốc Độ Di Chuyển."
  }
];

// 1. Generate individual gem crate files
gemTypes.forEach((gt) => {
  let rewardsStr = "";

  levelWeights.forEach((lw) => {
    const roman = romanMap[lw.lv - 1];
    const rewardKey = `${gt.prefix.toLowerCase()}_lv_${lw.lv}`;
    const gemId = `${gt.prefix}_LV${lw.lv}`;

    let commandsBlock = `      Commands:
      - '[CONSOLE] mmoitems give GEM_STONE ${gemId} %player_name% 1'`;

    if (lw.broadcast) {
      commandsBlock += `
      - '[CONSOLE] execute as %player_name% at @s run playsound ui.toast.challenge_complete master @s ~ ~ ~ 1 1'
      - '[CONSOLE] execute as %player_name% at @s run summon firework_rocket ~ ~ ~ {LifeTime:5,Motion:[0.0,1.2,0.0],FireworksItem:{id:"minecraft:firework_rocket",Count:1,tag:{Fireworks:{Explosions:[{Type:1,Colors:[I;16711680,16776960],FadeColors:[I;255]}]}}}}'`;
    } else {
      commandsBlock += `
      - '[CONSOLE] execute as %player_name% at @s run playsound entity.experience_orb.pickup master @s ~ ~ ~ 1 1.2'`;
    }

    rewardsStr += `    ${rewardKey}:
      Name: '${gt.color}${gt.name} &e&lLv.${roman}'
      Weight: ${lw.weight.toFixed(1)}
      Rarity: ${lw.rarity}
      Broadcast: ${lw.broadcast}
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
${commandsBlock}
      Ignored_For_Permissions: []
`;
  });

  const content = `Name: '${gt.color}Hòm ${gt.name}'
Preview_Config: default
Permission_Required: false
Opening:
  Cooldown: 0
Key:
  Required: false
  Ids: []
Block:
  Positions: []
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
  - '&f'
  - '&f${gt.desc}'
  - '&f'
  - '&6Tỉ lệ nhận theo cấp:'
  - ' &7● Cấp Lv.I - Lv.IV: &aCao (89%)'
  - ' &7● Cấp Lv.V - Lv.VII: &eVừa (9.8%)'
  - ' &7● Cấp Lv.VIII - Lv.X: &cHiếm (1.2%)'
  - '&f'
  - '&eNhấn chuột phải để mở.'
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

  fs.writeFileSync(path.join(cratesDir, gt.file), content, 'utf8');
  console.log(`✅ Created crate: ${gt.file}`);
});

// 2. Generate Master Gem Crate (Hòm Đá Quý Tổng Hợp)
let masterRewardsStr = "";
gemTypes.forEach((gt) => {
  levelWeights.forEach((lw) => {
    const roman = romanMap[lw.lv - 1];
    const rewardKey = `${gt.prefix.toLowerCase()}_lv_${lw.lv}`;
    const gemId = `${gt.prefix}_LV${lw.lv}`;
    const weight = (lw.weight / 10).toFixed(2); // Distributed weight among 10 gem types

    let commandsBlock = `      Commands:
      - '[CONSOLE] mmoitems give GEM_STONE ${gemId} %player_name% 1'`;

    if (lw.broadcast) {
      commandsBlock += `
      - '[CONSOLE] execute as %player_name% at @s run playsound ui.toast.challenge_complete master @s ~ ~ ~ 1 1'
      - '[CONSOLE] execute as %player_name% at @s run summon firework_rocket ~ ~ ~ {LifeTime:5,Motion:[0.0,1.2,0.0],FireworksItem:{id:"minecraft:firework_rocket",Count:1,tag:{Fireworks:{Explosions:[{Type:1,Colors:[I;16711680,16776960],FadeColors:[I;255]}]}}}}'`;
    } else {
      commandsBlock += `
      - '[CONSOLE] execute as %player_name% at @s run playsound entity.experience_orb.pickup master @s ~ ~ ~ 1 1.2'`;
    }

    masterRewardsStr += `    ${rewardKey}:
      Name: '${gt.color}${gt.name} &e&lLv.${roman}'
      Weight: ${weight}
      Rarity: ${lw.rarity}
      Broadcast: ${lw.broadcast}
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
${commandsBlock}
      Ignored_For_Permissions: []
`;
  });
});

const masterContent = `Name: '&d&lHòm Đá Quý Tổng Hợp'
Preview_Config: default
Permission_Required: false
Opening:
  Cooldown: 0
Key:
  Required: false
  Ids: []
Block:
  Positions: []
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
  - '&f'
  - '&fMột hòm chứa ngẫu nhiên các loại Đá Quý từ Lv.I đến Lv.X.'
  - '&f'
  - '&6Tỉ lệ nhận theo cấp:'
  - ' &7● Cấp Lv.I - Lv.IV: &aCao (89%)'
  - ' &7● Cấp Lv.V - Lv.VII: &eVừa (9.8%)'
  - ' &7● Cấp Lv.VIII - Lv.X: &cHiếm (1.2%)'
  - '&f'
  - '&eNhấn chuột phải để mở.'
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

fs.writeFileSync(path.join(cratesDir, 'ruong_da_quy_tong_hop.yml'), masterContent, 'utf8');
console.log('✅ Created master crate: ruong_da_quy_tong_hop.yml');
