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

console.log('Total items in GalleryView:', items.length);

const categories = ['academics', 'sports', 'activities', 'campus', 'events'];
const categoryItems = {
  academics: [],
  sports: [],
  activities: [],
  campus: [],
  events: []
};

const seenTargets = new Map();
const copyPlan = [];

items.forEach((item, index) => {
  const cat = item.category;
  if (!categories.includes(cat)) {
    console.error(`Unknown category: ${cat} for item`, item);
    return;
  }

  // Source path in public
  let srcRel = item.src.startsWith('/') ? item.src.slice(1) : item.src;
  const srcFull = path.join('public', srcRel);

  // Clean filename: e.g. "pintober1 (1).jpeg" -> "pintober1-1.jpeg"
  let baseName = path.basename(srcRel);
  if (baseName.includes('(') || baseName.includes(' ') || baseName.includes(')')) {
    baseName = baseName.replace(/\s*\(\s*(\d+)\s*\)/g, '-$1').replace(/\s+/g, '-');
  }

  const targetRel = path.join('gallery', cat, baseName).replace(/\\/g, '/');
  const targetFull = path.join('public', targetRel);

  copyPlan.push({
    index,
    id: item.id,
    title: item.title,
    category: cat,
    originalSrc: item.src,
    srcFull,
    targetRel: '/' + targetRel,
    targetFull,
    srcExists: fs.existsSync(srcFull)
  });
});

console.log('Copy plan prepared for items:', copyPlan.length);
const missingSources = copyPlan.filter(p => !p.srcExists);
console.log('Missing source files:', missingSources.length);
if (missingSources.length > 0) {
  console.log(missingSources);
}

// Check target filename collisions within the same category
const catTargets = {};
copyPlan.forEach(p => {
  if (!catTargets[p.targetRel]) catTargets[p.targetRel] = [];
  catTargets[p.targetRel].push(p.index);
});

for (const [t, indices] of Object.entries(catTargets)) {
  if (indices.length > 1) {
    console.log(`Multiple items map to target "${t}": indices ${indices.join(', ')}`);
  }
}
