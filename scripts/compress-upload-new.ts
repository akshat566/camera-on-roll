/**
 * One-shot: compress the newly-added source videos in /public to web-optimized
 * H.264 (faststart) and upload them to R2 with auto-generated posters.
 *
 *   npx tsx scripts/compress-upload-new.ts
 *
 * Source files stay local (git-ignored); only the compressed web versions are
 * uploaded to the CDN.
 */
import fs from 'fs';
import path from 'path';
import os from 'os';
import { execFileSync } from 'child_process';
import { run } from './upload-and-poster';

const PUBLIC = path.join(process.cwd(), 'public');

type Item = {
  file: string;        // file name in /public
  r2Key: string;       // destination key in R2
  vertical: boolean;   // 9:16 vs 16:9
  keepAudio: boolean;  // hero showreel keeps audio (used in modal); loops are muted
};

const ITEMS: Item[] = [
  { file: 'CAM ON PRODUCTION SHOWREEL FINAL V2.mp4', r2Key: 'videos/showreel-v2.mp4',       vertical: false, keepAudio: true },
  { file: 'rizzedit10801stcutDAIRYMILK.mp4',          r2Key: 'videos/cadbury-dairymilk.mp4', vertical: true,  keepAudio: false },
  { file: 'rizzedit1080ysl.mp4',                      r2Key: 'videos/ysl.mp4',               vertical: true,  keepAudio: false },
  { file: 'SIMPLE 1080.mp4',                          r2Key: 'videos/simple.mp4',            vertical: true,  keepAudio: false },
];

function compress(src: string, out: string, item: Item) {
  const scale = item.vertical ? 'scale=1080:-2' : 'scale=-2:1080';
  const audio = item.keepAudio ? ['-c:a', 'aac', '-b:a', '128k'] : ['-an'];
  execFileSync('ffmpeg', [
    '-y', '-i', src,
    '-vf', scale,
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '24',
    '-pix_fmt', 'yuv420p',
    ...audio,
    '-movflags', '+faststart',
    out,
  ], { stdio: 'inherit' });
}

async function main() {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'cor-web-'));
  const jobs: { localPath: string; r2Key: string }[] = [];

  for (const item of ITEMS) {
    const src = path.join(PUBLIC, item.file);
    if (!fs.existsSync(src)) { console.warn(`! missing ${item.file}, skipping`); continue; }
    const out = path.join(tmp, path.basename(item.r2Key));
    const beforeMB = (fs.statSync(src).size / 1024 / 1024).toFixed(1);
    console.log(`\nCompressing ${item.file} (${beforeMB} MB) -> ${item.r2Key}`);
    compress(src, out, item);
    const afterMB = (fs.statSync(out).size / 1024 / 1024).toFixed(1);
    console.log(`  done: ${afterMB} MB`);
    jobs.push({ localPath: out, r2Key: item.r2Key });
  }

  console.log(`\nUploading ${jobs.length} web videos + posters to R2...\n`);
  const results = await run(jobs);
  console.log('\nDone:');
  results.forEach(r => console.log(`  ${r.url}  (${r.sizeMB} MB, poster: ${r.posterUrl})`));
}

main().catch(e => { console.error(e); process.exit(1); });
