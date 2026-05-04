const fs = require('fs');
const path = require('path');
const https = require('https');

const dir = 'C:/Users/HP/OneDrive/Desktop/binary forster/public/blog';
const generatedSlugs = [
  'rise-of-autonomous-ai-agents',
  'data-streaming-vs-batch-processing',
  'web-performance-core-vitals',
  'zero-trust-cloud-architecture',
  'ai-driven-cybersecurity',
  'why-ai-chatbots-are-the-new-homepage' // hero is generated
];

const allFiles = fs.readdirSync(dir);
const webpFiles = allFiles.filter(f => f.endsWith('.webp') && f !== 'placeholder.webp');

async function downloadImage(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 302 || res.statusCode === 301) {
        // Handle redirect
        downloadImage(res.headers.location, dest).then(resolve).catch(reject);
        return;
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', reject);
  });
}

async function main() {
  const tasks = [];
  for (const file of webpFiles) {
    const isGenerated = generatedSlugs.some(slug => file.includes(slug));
    if (isGenerated && !(file.includes('why-ai-chatbots') && !file.includes('hero'))) {
      continue;
    }
    
    const filePath = path.join(dir, file);
    
    let width = 1200;
    let height = 630;
    if (file.includes('-mid')) { width = 900; height = 500; }
    if (file.includes('-end')) { width = 600; height = 400; }
    
    const seed = file.replace('.webp', '');
    const url = `https://picsum.photos/seed/${seed}/${width}/${height}`;
    
    console.log('Downloading', file);
    tasks.push(downloadImage(url, filePath));
  }
  
  await Promise.all(tasks);
  console.log('Finished downloading all unique placeholder images.');
}

main().catch(console.error);
