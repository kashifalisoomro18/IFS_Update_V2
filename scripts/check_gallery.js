import fs from 'fs';
import path from 'path';

const content = fs.readFileSync('src/components/GalleryView.tsx', 'utf8');

const match = content.match(/const galleryItems = \[([\s\S]*?)\];/);
if (!match) {
  console.error('galleryItems not found');
  process.exit(1);
}

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

console.log('Total gallery items:', items.length);

// Check special chars in paths
const specialPaths = items.filter(it => /[\s\(\)]/.test(it.src));
console.log('Items with spaces or special characters in src:', specialPaths);

// Check all files in public
const allPublicFiles = [];
function walk(dir) {
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, f.name);
    if (f.isDirectory()) walk(p);
    else allPublicFiles.push(p);
  }
}
walk('public');
console.log('Total files in public:', allPublicFiles.length);
const specialFiles = allPublicFiles.filter(f => /[\s\(\)]/.test(path.basename(f)));
console.log('Files in public with spaces or parentheses:', specialFiles);
