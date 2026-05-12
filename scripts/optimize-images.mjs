import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, extname, basename } from 'path';

const DIRS = ['public/assets', 'public/team', 'public/blog'];
const MAX_WIDTH = 1024;
const TEAM_WIDTH = 256;
const QUALITY = 80;

async function optimizeFile(filePath, maxWidth) {
  const ext = extname(filePath).toLowerCase();
  if (!['.png', '.jpg', '.jpeg'].includes(ext)) return;

  const info = await stat(filePath);
  const sizeKB = info.size / 1024;
  if (sizeKB < 100) return; // skip small files

  const outPath = filePath.replace(ext, '.webp');
  
  try {
    await sharp(filePath)
      .resize(maxWidth, maxWidth, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(outPath);
    
    const newInfo = await stat(outPath);
    const newSizeKB = newInfo.size / 1024;
    console.log(`✅ ${basename(filePath)}: ${sizeKB.toFixed(0)}KB → ${newSizeKB.toFixed(0)}KB (${((1 - newSizeKB/sizeKB) * 100).toFixed(0)}% smaller)`);
  } catch (e) {
    console.error(`❌ ${basename(filePath)}: ${e.message}`);
  }
}

async function processDir(dir, maxWidth) {
  try {
    const files = await readdir(dir);
    for (const file of files) {
      await optimizeFile(join(dir, file), maxWidth);
    }
  } catch (e) {
    console.log(`Skipping ${dir}: ${e.message}`);
  }
}

console.log('🔧 Optimizing images...\n');
await processDir('public/assets', MAX_WIDTH);
await processDir('public/team', TEAM_WIDTH);
await processDir('public/blog', MAX_WIDTH);
console.log('\n✨ Done!');
