import fs from 'fs';
import path from 'path';
import { run, type Job } from './upload-and-poster';

const ASHNA_H = 'C:\\Users\\admin\\Downloads\\ashna videos\\HIGH RES -20260525T095426Z-3-001\\HIGH RES';
const ASHNA_V = 'C:\\Users\\admin\\Downloads\\ashna videos\\Instagram download-20260525T095704Z-3-001\\Instagram download';
const AKSHAT_INSTA = 'C:\\Users\\admin\\Downloads\\akshats videos\\INSTA DOWNLOAD-20260526T055130Z-3-001\\INSTA DOWNLOAD';
const AKSHAT_HIGH = 'C:\\Users\\admin\\Downloads\\akshats videos\\HIGH RES-20260526T055135Z-3-001\\HIGH RES';

// Filename normalizer that matches the prior R2 keys created by upload-videos.ts
const norm = (n: string) => n.replace(/[^a-zA-Z0-9.-]/g, '_');

function listMp4(dir: string) {
  return fs.readdirSync(dir).filter(f => f.toLowerCase().endsWith('.mp4'));
}

const jobs: Job[] = [];

// 1) Ashna's existing videos — already at work/horizontal & work/vertical.
//    Generate posters only (videos already uploaded).
for (const f of listMp4(ASHNA_H)) {
  jobs.push({ localPath: path.join(ASHNA_H, f), r2Key: `work/horizontal/${norm(f)}`, uploadVideo: false });
}
for (const f of listMp4(ASHNA_V)) {
  jobs.push({ localPath: path.join(ASHNA_V, f), r2Key: `work/vertical/${norm(f)}`, uploadVideo: false });
}

// 2) Akshat's INSTA folder — vertical 9:16 reels.
for (const f of listMp4(AKSHAT_INSTA)) {
  jobs.push({ localPath: path.join(AKSHAT_INSTA, f), r2Key: `akshat/vertical/${norm(f)}` });
}

// 3) Akshat's HIGH RES — only the 3 horizontal priority videos.
const HIGH_PRIORITY = new Set([
  'vidssave.com COMPLAN kesar badam 1080P.mp4',
  'HSBCv2.mp4',
  'Bombay 99 Mixers.mp4',
]);
for (const f of listMp4(AKSHAT_HIGH)) {
  if (!HIGH_PRIORITY.has(f)) continue;
  jobs.push({ localPath: path.join(AKSHAT_HIGH, f), r2Key: `akshat/horizontal/${norm(f)}` });
}

console.log(`Total jobs: ${jobs.length}`);

run(jobs).then(results => {
  fs.writeFileSync('scripts/upload-results.json', JSON.stringify(results, null, 2));
  console.log(`\nDone. Wrote scripts/upload-results.json`);
}).catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
