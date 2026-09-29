import fs from 'fs';
import path from 'path';

const legacyCopies = [
  { src: 'public/Activity-11.jpg', dest: 'public/classroom4.jpg' },
  { src: 'public/Activity-16.jpg', dest: 'public/g7.jpg' },
  { src: 'public/Activity-15.jpg', dest: 'public/g6.jpg' },
  { src: 'public/ground5.jpg', dest: 'public/play1.jpg' },
  { src: 'public/ground16.jpg', dest: 'public/play2.jpg' },
  { src: 'public/ground3.jpg', dest: 'public/playground4.jpg' },
  { src: 'public/ground4.jpg', dest: 'public/playground5.jpg' },
  { src: 'public/ground1.jpg', dest: 'public/playground1.jpg' },
  { src: 'public/ground2.jpg', dest: 'public/playground3.jpg' },
  { src: 'public/audi10.jpg', dest: 'public/Auditorium.jpeg' },
  { src: 'public/Admission_Poster.jpeg', dest: 'public/AD.png' },
  { src: 'public/gallery/events/pintober1-1.jpeg', dest: 'public/pintober1-1.jpeg' },
];

for (const { src, dest } of legacyCopies) {
  if (fs.existsSync(src) && !fs.existsSync(dest)) {
    fs.copyFileSync(src, dest);
    console.log(`Copied ${src} -> ${dest}`);
  }
}
