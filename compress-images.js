import sharp from 'sharp';
import { readdir, stat, rename } from 'fs/promises';
import { join, extname } from 'path';

const targetDir = './public';
const validExtensions = ['.jpg', '.jpeg', '.png'];
const skipFolders = ['videos'];

async function processFolder(dir) {
  const items = await readdir(dir);
  for (const item of items) {
    const fullPath = join(dir, item);
    const fileStat = await stat(fullPath);

    if (fileStat.isDirectory()) {
      if (skipFolders.includes(item.toLowerCase())) continue;
      await processFolder(fullPath);
    } else {
      const ext = extname(item).toLowerCase();
      if (validExtensions.includes(ext)) {
        const originalSize = fileStat.size;
        let pipeline = sharp(fullPath).resize({ width: 1600, withoutEnlargement: true });

        if (ext === '.jpg' || ext === '.jpeg') {
          pipeline = pipeline.jpeg({ quality: 75, mozjpeg: true });
        } else if (ext === '.png') {
          pipeline = pipeline.png({ quality: 75, compressionLevel: 9 });
        }

        const buffer = await pipeline.toBuffer();

        if (buffer.length < originalSize) {
          await sharp(buffer).toFile(fullPath + '.tmp');
          await rename(fullPath + '.tmp', fullPath);
          console.log(`${item}: ${(originalSize / 1024 / 1024).toFixed(2)}MB -> ${(buffer.length / 1024 / 1024).toFixed(2)}MB [OK]`);
        } else {
          console.log(`${item}: already small enough, skipped`);
        }
      }
    }
  }
}

processFolder(targetDir).then(() => console.log('Done!'));