import fs from 'fs';

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

// Remove exact duplicates at indices 9, 28, 183, 184
const deduplicated = items.filter((it, idx) => ![9, 28, 183, 184].includes(idx));
console.log('Original count:', items.length, 'After removing 4 duplicates:', deduplicated.length);

const idMap = new Map();
deduplicated.forEach((it, i) => {
  if (idMap.has(it.id)) {
    console.log(`Duplicate ID still exists: ${it.id} at index ${i} and ${idMap.get(it.id)}`);
  }
  idMap.set(it.id, i);
});
console.log('Unique IDs check complete. Total unique IDs:', idMap.size);
