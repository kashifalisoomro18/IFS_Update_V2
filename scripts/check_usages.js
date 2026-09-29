import fs from 'fs';
import path from 'path';

const content = fs.readFileSync('src/components/GalleryView.tsx', 'utf8');
const match = content.match(/const galleryItems = \[([\s\S]*?)\];/);
const itemsText = match[1];
const regex = /\{\s*id:\s*"([^"]+)",\s*src:\s*"([^"]+)",\s*alt:\s*"([^"]*)",\s*title:\s*"([^"]*)",\s*category:\s*"([^"]+)",\s*size:\s*"([^"]+)"\s*\}/g;

let m;
const items = [];
while ((m = regex.exec(itemsText)) !== null) {
  items.push({
    id: m[1],
    src: m[2],
    alt: m[3],
    title: m[4],
    category: m[5],
    size: m[6]
  });
}

// Find all files in src
const srcFiles = [];
function walk(dir) {
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, f.name);
    if (f.isDirectory()) walk(p);
    else if (/\.(tsx?|jsx?|astro|html|css|json)$/.test(f.name)) srcFiles.push(p);
  }
}
walk('src');

const otherUsages = {};
for (const item of items) {
  const filename = path.basename(item.src);
  for (const sf of srcFiles) {
    if (sf.endsWith('GalleryView.tsx')) continue;
    const txt = fs.readFileSync(sf, 'utf8');
    if (txt.includes(item.src) || txt.includes(filename)) {
      if (!otherUsages[item.src]) otherUsages[item.src] = [];
      otherUsages[item.src].push(sf);
    }
  }
}

console.log('Images also used in other files:', Object.keys(otherUsages).length);
for (const [img, files] of Object.entries(otherUsages)) {
  console.log(`- ${img} used in:`, files);
}
