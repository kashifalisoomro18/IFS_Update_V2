import fs from 'fs';
import path from 'path';

// Find all src files
const srcFiles = [];
function walk(dir) {
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, f.name);
    if (f.isDirectory()) walk(p);
    else if (/\.(tsx?|jsx?|astro|html)$/.test(f.name)) srcFiles.push(p);
  }
}
walk('src');

const imageRegex = /["'](\/[^"']+\.(jpe?g|png|gif|svg|webp|JPG|JPEG|PNG))["']/g;
const broken = [];
const allFound = new Set();

for (const file of srcFiles) {
  const content = fs.readFileSync(file, 'utf8');
  let m;
  while ((m = imageRegex.exec(content)) !== null) {
    const imgPath = m[1];
    allFound.add(imgPath);
    // decode url if needed
    const decoded = decodeURIComponent(imgPath);
    const publicPath = path.join('public', decoded.startsWith('/') ? decoded.slice(1) : decoded);
    if (!fs.existsSync(publicPath)) {
      broken.push({ file, imgPath, publicPath });
    }
  }
}

console.log('Total unique image paths found in src:', allFound.size);
console.log('Broken image paths count:', broken.length);
if (broken.length > 0) {
  console.log('Broken images:', broken);
}
