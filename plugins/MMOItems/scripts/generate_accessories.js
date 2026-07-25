const fs = require('fs');
const path = require('path');

// 5 Archetypes Lối Chơi Chí Mạng (Equally Balanced Stat Budget Templates ~100 pts)
const archetypeTemplates = [
  // 0: Chí Mạng Vật Lý (Hỏa Long, Chiến Long, Thanh Long Linh)
  {
    ring: { 'critical-strike-power': 45.0, 'physical-damage': 25.0 },
    amulet: { 'critical-strike-chance': 18.0, 'max-health': 120.0 },
    bracelet: { 'lifesteal': 10.0, 'physical-damage': 25.0 },
    gloves: { 'attack-speed': 25.0, 'critical-strike-power': 20.0 }
  },
  // 1: Chí Mạng Phép Thuật (Hắc Long, Thần Long, Xích Long Linh)
  {
    ring: { 'critical-strike-power': 45.0, 'magic-damage': 40.0 },
    amulet: { 'critical-strike-chance': 18.0, 'max-mana': 250.0, 'max-health': 60.0 },
    bracelet: { 'cooldown-reduction': 12.0, 'magic-damage': 35.0 },
    gloves: { 'attack-speed': 20.0, 'magic-damage': 30.0 }
  },
  // 2: Chí Mạng Tốc Đánh & Hút Máu (Lôi Long, Hoàng Long, Kim Long Linh)
  {
    ring: { 'critical-strike-power': 30.0, 'attack-speed': 20.0, 'physical-damage': 15.0 },
    amulet: { 'critical-strike-chance': 14.0, 'lifesteal': 8.0, 'max-health': 100.0 },
    bracelet: { 'lifesteal': 12.0, 'attack-speed': 15.0 },
    gloves: { 'attack-speed': 35.0, 'lifesteal': 8.0 }
  },
  // 3: Chí Mạng Xuyên Giáp & Né Tránh (Phong Long, Đế Long, Thiên Long Linh)
  {
    ring: { 'critical-strike-power': 45.0, 'armor-penetration': 12.0 },
    amulet: { 'critical-strike-chance': 14.0, 'dodge-rating': 15.0, 'max-health': 80.0 },
    bracelet: { 'cooldown-reduction': 10.0, 'dodge-rating': 12.0 },
    gloves: { 'attack-speed': 25.0, 'dodge-rating': 15.0 }
  },
  // 4: Chí Mạng Phản Pháo & Tank (Băng Long, Hộ Long, Bạch Long Linh)
  {
    ring: { 'critical-strike-power': 30.0, 'max-health': 160.0, 'defense': 12.0 },
    amulet: { 'max-health': 220.0, 'defense': 20.0, 'damage-reduction': 8.0 },
    bracelet: { 'lifesteal': 8.0, 'max-health': 150.0, 'defense': 10.0 },
    gloves: { 'attack-speed': 15.0, 'defense': 15.0, 'max-health': 100.0 }
  }
];

const sets = [
  // --- DÒNG LONG TỘC TRẦN THẾ (TRADE) ---
  {
    prefix: 'TRADE', id: 'HOA_LONG', setName: 'HOA_LONG_SET', tier: 'UNIQUE', color: '&6&l🔥', nameVi: 'Hỏa Long', archetypeIdx: 0,
    ring1: { cmd: 19201, ia: 'rings_pack:set1_ring_1' }, ring2: { cmd: 19202, ia: 'rings_pack:set1_ring_2' }, amulet: { cmd: 19401, ia: 'rings_pack:set1_necklace_1' }, bracelet: { cmd: 19205, ia: 'rings_pack:set1_ring_5' }, gloves: { cmd: 19537, ia: 'rings_pack:glove_37' }
  },
  {
    prefix: 'TRADE', id: 'HAC_LONG', setName: 'HAC_LONG_SET', tier: 'UNIQUE', color: '&5&l◆', nameVi: 'Hắc Long', archetypeIdx: 1,
    ring1: { cmd: 19220, ia: 'rings_pack:set3_ring_1' }, ring2: { cmd: 19221, ia: 'rings_pack:set3_ring_2' }, amulet: { cmd: 19415, ia: 'rings_pack:set3_necklace_1' }, bracelet: { cmd: 19224, ia: 'rings_pack:set3_ring_5' }, gloves: { cmd: 19502, ia: 'rings_pack:glove_2' }
  },
  {
    prefix: 'TRADE', id: 'LOI_LONG', setName: 'LOI_LONG_SET', tier: 'UNIQUE', color: '&e&l⚡', nameVi: 'Lôi Long', archetypeIdx: 2,
    ring1: { cmd: 19270, ia: 'rings_pack:set8_ring_1' }, ring2: { cmd: 19271, ia: 'rings_pack:set8_ring_2' }, amulet: { cmd: 19431, ia: 'rings_pack:set8_necklace_1' }, bracelet: { cmd: 19274, ia: 'rings_pack:set8_ring_5' }, gloves: { cmd: 19585, ia: 'rings_pack:glove_85' }
  },
  {
    prefix: 'TRADE', id: 'PHONG_LONG', setName: 'PHONG_LONG_SET', tier: 'UNIQUE', color: '&2&l✦', nameVi: 'Phong Long', archetypeIdx: 3,
    ring1: { cmd: 19240, ia: 'rings_pack:set5_ring_1' }, ring2: { cmd: 19241, ia: 'rings_pack:set5_ring_2' }, amulet: { cmd: 19421, ia: 'rings_pack:set5_necklace_1' }, bracelet: { cmd: 19244, ia: 'rings_pack:set5_ring_5' }, gloves: { cmd: 19501, ia: 'rings_pack:glove_1' }
  },
  {
    prefix: 'TRADE', id: 'BANG_LONG', setName: 'BANG_LONG_SET', tier: 'UNIQUE', color: '&3&l✦', nameVi: 'Băng Long', archetypeIdx: 4,
    ring1: { cmd: 19210, ia: 'rings_pack:set2_ring_1' }, ring2: { cmd: 19211, ia: 'rings_pack:set2_ring_2' }, amulet: { cmd: 19413, ia: 'rings_pack:set2_necklace_2' }, bracelet: { cmd: 19214, ia: 'rings_pack:set2_ring_5' }, gloves: { cmd: 19561, ia: 'rings_pack:glove_61' }
  },

  // --- DÒNG LONG TỘC THIÊN GIỚI (DONATE) ---
  {
    prefix: 'DONATE', id: 'LONG_CHIEN', setName: 'LONG_CHIEN_SET', tier: 'UNIQUE', color: '&e&l⚔', nameVi: 'Chiến Long', archetypeIdx: 0,
    ring1: { cmd: 19230, ia: 'rings_pack:set4_ring_1' }, ring2: { cmd: 19231, ia: 'rings_pack:set4_ring_2' }, amulet: { cmd: 19418, ia: 'rings_pack:set4_necklace_1' }, bracelet: { cmd: 19234, ia: 'rings_pack:set4_ring_5' }, gloves: { cmd: 19512, ia: 'rings_pack:glove_12' }
  },
  {
    prefix: 'DONATE', id: 'LONG_THAN', setName: 'LONG_THAN_SET', tier: 'UNIQUE', color: '&b&l✦', nameVi: 'Thần Long', archetypeIdx: 1,
    ring1: { cmd: 19250, ia: 'rings_pack:set6_ring_1' }, ring2: { cmd: 19251, ia: 'rings_pack:set6_ring_2' }, amulet: { cmd: 19424, ia: 'rings_pack:set6_necklace_1' }, bracelet: { cmd: 19254, ia: 'rings_pack:set6_ring_5' }, gloves: { cmd: 19525, ia: 'rings_pack:glove_25' }
  },
  {
    prefix: 'DONATE', id: 'LONG_HOANG', setName: 'LONG_HOANG_SET', tier: 'UNIQUE', color: '&c&l★', nameVi: 'Hoàng Long', archetypeIdx: 2,
    ring1: { cmd: 19280, ia: 'rings_pack:set9_ring_1' }, ring2: { cmd: 19281, ia: 'rings_pack:set9_ring_2' }, amulet: { cmd: 19434, ia: 'rings_pack:set9_necklace_1' }, bracelet: { cmd: 19284, ia: 'rings_pack:set9_ring_5' }, gloves: { cmd: 19599, ia: 'rings_pack:glove_99' }
  },
  {
    prefix: 'DONATE', id: 'LONG_DE', setName: 'LONG_DE_SET', tier: 'UNIQUE', color: '&4&l◆', nameVi: 'Đế Long', archetypeIdx: 3,
    ring1: { cmd: 19260, ia: 'rings_pack:set7_ring_1' }, ring2: { cmd: 19261, ia: 'rings_pack:set7_ring_2' }, amulet: { cmd: 19427, ia: 'rings_pack:set7_necklace_1' }, bracelet: { cmd: 19264, ia: 'rings_pack:set7_ring_5' }, gloves: { cmd: 19540, ia: 'rings_pack:glove_40' }
  },
  {
    prefix: 'DONATE', id: 'LONG_VE', setName: 'LONG_VE_SET', tier: 'UNIQUE', color: '&a&l✦', nameVi: 'Hộ Long', archetypeIdx: 4,
    ring1: { cmd: 19203, ia: 'rings_pack:set1_ring_3' }, ring2: { cmd: 19204, ia: 'rings_pack:set1_ring_4' }, amulet: { cmd: 19402, ia: 'rings_pack:set1_necklace_2' }, bracelet: { cmd: 19206, ia: 'rings_pack:set1_ring_6' }, gloves: { cmd: 19538, ia: 'rings_pack:glove_38' }
  },

  // --- DÒNG LONG TỘC LINH THÚ (QUAY FREE) ---
  {
    prefix: 'FREE', id: 'THANH_LONG', setName: 'THANH_LONG_SET', tier: 'UNIQUE', color: '&b&l⚡', nameVi: 'Thanh Long', archetypeIdx: 0,
    ring1: { cmd: 19004, ia: 'rings_pack:ring_4' }, ring2: { cmd: 19005, ia: 'rings_pack:ring_5' }, amulet: { cmd: 19406, ia: 'rings_pack:set10_necklace_2' }, bracelet: { cmd: 19006, ia: 'rings_pack:ring_6' }, gloves: { cmd: 19504, ia: 'rings_pack:glove_4' }
  },
  {
    prefix: 'FREE', id: 'XICH_LONG', setName: 'XICH_LONG_SET', tier: 'UNIQUE', color: '&c&l🔥', nameVi: 'Xích Long', archetypeIdx: 1,
    ring1: { cmd: 19007, ia: 'rings_pack:ring_7' }, ring2: { cmd: 19008, ia: 'rings_pack:ring_8' }, amulet: { cmd: 19409, ia: 'rings_pack:set11_necklace_1' }, bracelet: { cmd: 19009, ia: 'rings_pack:ring_9' }, gloves: { cmd: 19505, ia: 'rings_pack:glove_5' }
  },
  {
    prefix: 'FREE', id: 'KIM_LONG', setName: 'KIM_LONG_SET', tier: 'UNIQUE', color: '&e&l★', nameVi: 'Kim Long', archetypeIdx: 2,
    ring1: { cmd: 19010, ia: 'rings_pack:ring_10' }, ring2: { cmd: 19221, ia: 'rings_pack:set11_ring_1' }, amulet: { cmd: 19410, ia: 'rings_pack:set11_necklace_2' }, bracelet: { cmd: 19225, ia: 'rings_pack:set11_ring_5' }, gloves: { cmd: 19506, ia: 'rings_pack:glove_6' }
  },
  {
    prefix: 'FREE', id: 'THIEN_LONG', setName: 'THIEN_LONG_SET', tier: 'UNIQUE', color: '&d&l✦', nameVi: 'Thiên Long', archetypeIdx: 3,
    ring1: { cmd: 19222, ia: 'rings_pack:set11_ring_2' }, ring2: { cmd: 19223, ia: 'rings_pack:set11_ring_3' }, amulet: { cmd: 19411, ia: 'rings_pack:set12_necklace_1' }, bracelet: { cmd: 19224, ia: 'rings_pack:set11_ring_4' }, gloves: { cmd: 19507, ia: 'rings_pack:glove_7' }
  },
  {
    prefix: 'FREE', id: 'BAC_LONG', setName: 'BAC_LONG_SET', tier: 'UNIQUE', color: '&f&l✧', nameVi: 'Bạch Long', archetypeIdx: 4,
    ring1: { cmd: 19001, ia: 'rings_pack:ring_1' }, ring2: { cmd: 19002, ia: 'rings_pack:ring_2' }, amulet: { cmd: 19405, ia: 'rings_pack:set10_necklace_1' }, bracelet: { cmd: 19003, ia: 'rings_pack:ring_3' }, gloves: { cmd: 19503, ia: 'rings_pack:glove_3' }
  }
];

function renderStats(statsObj) {
  return Object.entries(statsObj)
    .map(([key, val]) => `    ${key}: ${val}`)
    .join('\n');
}

let ringYAML = '';
let amuletYAML = '';
let braceletYAML = '';
let glovesYAML = '';

sets.forEach(s => {
  const tmpl = archetypeTemplates[s.archetypeIdx];
  const socketsCount = s.prefix === 'FREE' ? 2 : 5;
  const socketsLines = Array(socketsCount).fill('      - Uncolored').join('\n');

  // --- RINGS ---
  ringYAML += `${s.prefix}_RING_${s.id}_1:
  base:
    revision-id: 1
    material: PAPER
    custom-model-data: ${s.ring1.cmd}
    itemsadder-item: "${s.ring1.ia}"
    name: "${s.color} Nhẫn ${s.nameVi} I"
    tier: ${s.tier}
    set: ${s.setName}
${renderStats(tmpl.ring)}
    gem-sockets:
${socketsLines}
    upgrade:
      template: weapon-upgrade-template
      max: 100

${s.prefix}_RING_${s.id}_2:
  base:
    revision-id: 1
    material: PAPER
    custom-model-data: ${s.ring2.cmd}
    itemsadder-item: "${s.ring2.ia}"
    name: "${s.color} Nhẫn ${s.nameVi} II"
    tier: ${s.tier}
    set: ${s.setName}
${renderStats(tmpl.ring)}
    gem-sockets:
${socketsLines}
    upgrade:
      template: weapon-upgrade-template
      max: 100

`;

  // --- AMULET ---
  amuletYAML += `${s.prefix}_AMULET_${s.id}:
  base:
    revision-id: 1
    material: PAPER
    custom-model-data: ${s.amulet.cmd}
    itemsadder-item: "${s.amulet.ia}"
    name: "${s.color} Dây Chuyền ${s.nameVi}"
    tier: ${s.tier}
    set: ${s.setName}
${renderStats(tmpl.amulet)}
    gem-sockets:
${socketsLines}
    upgrade:
      template: armor-upgrade-template
      max: 100

`;

  // --- BRACELET ---
  braceletYAML += `${s.prefix}_BRACELET_${s.id}:
  base:
    revision-id: 1
    material: PAPER
    custom-model-data: ${s.bracelet.cmd}
    itemsadder-item: "${s.bracelet.ia}"
    name: "${s.color} Vòng Tay ${s.nameVi}"
    tier: ${s.tier}
    set: ${s.setName}
${renderStats(tmpl.bracelet)}
    gem-sockets:
${socketsLines}
    upgrade:
      template: armor-upgrade-template
      max: 100

`;

  // --- GLOVES ---
  glovesYAML += `${s.prefix}_GLOVES_${s.id}:
  base:
    revision-id: 1
    material: PAPER
    custom-model-data: ${s.gloves.cmd}
    itemsadder-item: "${s.gloves.ia}"
    name: "${s.color} Găng Tay ${s.nameVi}"
    tier: ${s.tier}
    set: ${s.setName}
${renderStats(tmpl.gloves)}
    gem-sockets:
${socketsLines}
    upgrade:
      template: armor-upgrade-template
      max: 100

`;
});

const itemDir = 'd:/server-minecraft/plugins/MMOItems/item';

fs.writeFileSync(path.join(itemDir, 'ring.yml'), ringYAML, 'utf8');
fs.writeFileSync(path.join(itemDir, 'amulet.yml'), amuletYAML, 'utf8');
fs.writeFileSync(path.join(itemDir, 'bracelet.yml'), braceletYAML, 'utf8');
fs.writeFileSync(path.join(itemDir, 'gloves.yml'), glovesYAML, 'utf8');

console.log(`Successfully generated ring.yml, amulet.yml, bracelet.yml, gloves.yml for ${sets.length} Long Tộc Sets across 5 Crit Archetypes!`);
