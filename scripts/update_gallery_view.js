import fs from 'fs';
import path from 'path';

const galleryViewPath = 'src/components/GalleryView.tsx';
let content = fs.readFileSync(galleryViewPath, 'utf8');

// Read the updated items generated in reorganize_gallery.js
const match = content.match(/const galleryItems = \[([\s\S]*?)\];/);
if (!match) {
  console.error('Could not find galleryItems');
  process.exit(1);
}

const itemsText = match[1];
const regex = /\{\s*id:\s*"([^"]+)",\s*src:\s*"([^"]+)",\s*alt:\s*"([^"]*)",\s*title:\s*"([^"]*)",\s*category:\s*"([^"]+)",\s*size:\s*"([^"]+)"\s*\}/g;

let m;
const rawItems = [];
while ((m = regex.exec(itemsText)) !== null) {
  rawItems.push({
    id: m[1],
    src: m[2],
    alt: m[3],
    title: m[4],
    category: m[5],
    size: m[6]
  });
}

// Remove the 4 duplicate entries
const duplicateIndices = new Set([9, 28, 183, 184]);
const items = rawItems.filter((_, idx) => !duplicateIndices.has(idx));

const newItemsList = items.map(item => {
  const cat = item.category;
  let srcRel = item.src.startsWith('/') ? item.src.slice(1) : item.src;
  let baseName = path.basename(srcRel);
  if (baseName.includes('(') || baseName.includes(' ') || baseName.includes(')')) {
    baseName = baseName.replace(/\s*\(\s*(\d+)\s*\)/g, '-$1').replace(/\s+/g, '-');
  }
  const newSrc = `/gallery/${cat}/${baseName}`;
  return `  { id: "${item.id}", src: "${newSrc}", alt: ${JSON.stringify(item.alt)}, title: ${JSON.stringify(item.title)}, category: "${item.category}", size: "${item.size}" }`;
});

const newItemsText = `const galleryItems = [\n` + newItemsList.join(',\n') + `\n];`;

let newContent = content.replace(/const galleryItems = \[([\s\S]*?)\];/, newItemsText);

// Also update key in GalleryGrid to be key={`${item.id}-${globalIndex}`}
newContent = newContent.replace(
  /<GalleryCard\s+key=\{item\.id\}/,
  `<GalleryCard\n                key={\`\${item.id}-\${globalIndex}\`}`
);

fs.writeFileSync(galleryViewPath, newContent, 'utf8');
console.log('Successfully updated GalleryView.tsx!');
