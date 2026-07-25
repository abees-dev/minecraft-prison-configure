const fs = require('fs');
const path = require('path');

const stationsDir = 'd:/server-minecraft/plugins/MMOItems/crafting-stations';

const files = fs.readdirSync(stationsDir);

files.forEach(file => {
  if (file.startsWith('forge-') && file.endsWith('.yml')) {
    const filePath = path.join(stationsDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    if (!content.includes('TINHTHE_CUONGHOA_VUKHI')) {
      content = content.replace(/(ingredients:\s*\n(\s*- mmoitem\{[^\n]+\}\s*\n)+)/g, (match) => {
        return match.trimEnd() + '\n        - mmoitem{type=MATERIAL,id=TINHTHE_CUONGHOA_VUKHI,amount=2,display="Tinh Thể Cường Hóa Vũ Khí"}\n';
      });
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated ${file}`);
    }
  } else if (file.startsWith('armor-forge-') && file.endsWith('.yml')) {
    const filePath = path.join(stationsDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    if (!content.includes('TINHTHE_CUONGHOA_GIAP')) {
      content = content.replace(/(ingredients:\s*\n(\s*- mmoitem\{[^\n]+\}\s*\n)+)/g, (match) => {
        return match.trimEnd() + '\n        - mmoitem{type=MATERIAL,id=TINHTHE_CUONGHOA_GIAP,amount=2,display="Tinh Thể Cường Hóa Giáp"}\n';
      });
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated ${file}`);
    }
  }
});

console.log('✅ Đã tích hợp Tinh Thể Cường Hóa vào toàn bộ Lò Rèn Vũ Khí & Giáp!');
