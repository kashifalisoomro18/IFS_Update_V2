import fs from 'fs';
import path from 'path';

const content = fs.readFileSync('src/components/GalleryView.tsx', 'utf8');

// Check 1: Verify key fix
const hasKeyFix = content.includes('key={`${item.id}-${globalIndex}`}');
console.log('1. Unique key fix applied:', hasKeyFix);

// Check 2: galleryItems count
const gallMatch = content.match(/const galleryItems = \[([\s\S]*?)\];/);
const itemsText = gallMatch[1];

// Count items
const itemCount = (itemsText.match(/\{ id:/g) || []).length;
console.log('2. Total gallery items:', itemCount);

// Check 3: No duplicate IDs
const idMap = {};
const idRegex = /id: "([^"]+)"/g;
let m;
while ((m = idRegex.exec(itemsText)) !== null) {
  const id = m[1];
  idMap[id] = (idMap[id] || 0) + 1;
}
const dups = Object.entries(idMap).filter(([, count]) => count > 1);
if (dups.length === 0) {
  console.log('3. Duplicate IDs: None - all unique!');
} else {
  console.log('3. Duplicate IDs found:', dups);
}

// Check 4: All /gallery/* files exist
const srcRegex = /src: "(\/gallery\/[^"]+)"/g;
const missing = [];
let total = 0;
while ((m = srcRegex.exec(itemsText)) !== null) {
  total++;
  const src = m[1];
  const filePath = path.join('public', src.slice(1));
  if (!fs.existsSync(filePath)) {
    missing.push(src);
  }
}
console.log('4. Gallery file references:', total, '| Missing:', missing.length === 0 ? 'None - all exist!' : missing);

// Check 5: Category breakdown
const catMap = {};
const catRegex = /category: "([^"]+)"/g;
while ((m = catRegex.exec(itemsText)) !== null) {
  catMap[m[1]] = (catMap[m[1]] || 0) + 1;
}
console.log('5. Category breakdown:', catMap);

// Check 6: Verify key line in GalleryGrid function
const hasGrid = content.includes('key={`${item.id}-${globalIndex}`}');
console.log('6. GalleryGrid unique key usage:', hasGrid ? 'FIXED' : 'MISSING');
