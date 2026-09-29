import fs from 'fs';
import path from 'path';

const galleryViewPath = 'src/components/GalleryView.tsx';
let content = fs.readFileSync(galleryViewPath, 'utf8');

// Ensure directories exist
const categories = ['academics', 'sports', 'activities', 'campus', 'events'];
categories.forEach(cat => {
  const dir = path.join('public', 'gallery', cat);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log('Created directory:', dir);
  }
});

// Extract galleryItems
const match = content.match(/const galleryItems = \[([\s\S]*?)\];/);
if (!match) {
  console.error('Could not find galleryItems in GalleryView.tsx');
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

console.log('Original items count:', rawItems.length);

// Deduplicate exact duplicate items at indices 9, 28, 183, 184
// (lines 46, 65, 220, 221 which were copy-paste duplicates)
const duplicateIndices = new Set([9, 28, 183, 184]);
const items = rawItems.filter((_, idx) => !duplicateIndices.has(idx));
console.log('Items after removing duplicate entries:', items.length);

// Also verify unique IDs
const seenIds = new Set();
items.forEach(it => {
  if (seenIds.has(it.id)) {
    console.error('STILL DUPLICATE ID:', it.id);
  }
  seenIds.add(it.id);
});

// Now copy files and update paths
const updatedItems = [];
const copiedFiles = new Set();

for (const item of items) {
  const cat = item.category;
  let srcRel = item.src.startsWith('/') ? item.src.slice(1) : item.src;
  
  // Clean filename
  let baseName = path.basename(srcRel);
  if (baseName.includes('(') || baseName.includes(' ') || baseName.includes(')')) {
    baseName = baseName.replace(/\s*\(\s*(\d+)\s*\)/g, '-$1').replace(/\s+/g, '-');
  }

  const srcFull = path.join('public', srcRel);
  const targetDir = path.join('public', 'gallery', cat);
  const targetFull = path.join(targetDir, baseName);
  const newSrc = `/gallery/${cat}/${baseName}`;

  if (!fs.existsSync(srcFull)) {
    console.error(`Source file missing: ${srcFull} for item`, item);
  } else {
    // Copy if not copied yet
    if (!fs.existsSync(targetFull) || !copiedFiles.has(targetFull)) {
      fs.copyFileSync(srcFull, targetFull);
      copiedFiles.add(targetFull);
    }
  }

  updatedItems.push({
    id: item.id,
    src: newSrc,
    alt: item.alt,
    title: item.title,
    category: item.category,
    size: item.size
  });
}

console.log(`Copied ${copiedFiles.size} unique image files into public/gallery/*/`);

// Verify all target files exist
let allExist = true;
updatedItems.forEach(it => {
  const p = path.join('public', it.src.slice(1));
  if (!fs.existsSync(p)) {
    console.error('Target file does not exist:', p);
    allExist = false;
  }
});

if (allExist) {
  console.log('All updated items have valid existing files!');
}
