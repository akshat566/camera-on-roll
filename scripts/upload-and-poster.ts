/**
 * Generic uploader: for each (localPath, r2Key), optionally upload the video,
 * always extract a poster JPG at ~1s via ffmpeg and upload it as `${r2Key}.jpg`.
 * Skips work that already exists in R2 unless --force is given.
 */
import { PutObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3';
import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';
import os from 'os';
import { r2Client, R2_BUCKET as BUCKET, R2_PUBLIC_URL as PUBLIC_URL } from './r2-client';

const FORCE = process.argv.includes('--force');
const SKIP_VIDEO = process.argv.includes('--posters-only');

async function exists(key: string) {
  try {
    await r2Client.send(new HeadObjectCommand({ Bucket: BUCKET, Key: key }));
    return true;
  } catch { return false; }
}

async function putFile(key: string, localPath: string, contentType: string) {
  const body = fs.readFileSync(localPath);
  await r2Client.send(new PutObjectCommand({
    Bucket: BUCKET, Key: key, Body: body, ContentType: contentType,
    CacheControl: 'public, max-age=31536000, immutable',
  }));
}

function makePoster(videoPath: string, outPath: string, atSeconds = 1.0) {
  // Extract a single frame at `atSeconds`. Scale down to max width 1280 keeping aspect.
  execFileSync('ffmpeg', [
    '-y', '-ss', String(atSeconds), '-i', videoPath,
    '-vframes', '1',
    '-vf', "scale='min(1280,iw)':'-2'",
    '-q:v', '4',
    outPath,
  ], { stdio: 'pipe' });
}

async function probeOrientation(videoPath: string): Promise<'h' | 'v'> {
  try {
    const out = execFileSync('ffprobe', [
      '-v', 'error', '-select_streams', 'v:0',
      '-show_entries', 'stream=width,height',
      '-of', 'csv=p=0:s=x', videoPath,
    ], { stdio: ['ignore', 'pipe', 'pipe'] }).toString().trim();
    const [w, h] = out.split('x').map(Number);
    return w >= h ? 'h' : 'v';
  } catch { return 'h'; }
}

export type Job = {
  localPath: string;
  r2Key: string;          // e.g. "akshat/vertical/foo.mp4"
  uploadVideo?: boolean;  // default: true (false to only do posters)
};

export async function run(jobs: Job[]) {
  const results: { key: string; url: string; posterUrl: string; orientation: 'h'|'v'; sizeMB: number }[] = [];
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'cor-poster-'));
  let i = 0;
  for (const job of jobs) {
    i++;
    const { localPath, r2Key } = job;
    const posterKey = `${r2Key}.jpg`;
    const wantUpload = job.uploadVideo !== false && !SKIP_VIDEO;
    const sizeMB = +(fs.statSync(localPath).size / 1024 / 1024).toFixed(1);
    const orientation = await probeOrientation(localPath);
    console.log(`[${i}/${jobs.length}] (${orientation}, ${sizeMB} MB) ${r2Key}`);

    // Video upload
    if (wantUpload) {
      if (!FORCE && await exists(r2Key)) {
        console.log(`   ↪ video exists, skip`);
      } else {
        console.log(`   ↪ uploading video…`);
        await putFile(r2Key, localPath, 'video/mp4');
      }
    }

    // Poster
    if (!FORCE && await exists(posterKey)) {
      console.log(`   ↪ poster exists, skip`);
    } else {
      const tmpPoster = path.join(tmp, `${i}.jpg`);
      try {
        makePoster(localPath, tmpPoster, 1.0);
      } catch (e) {
        // try at 0.2s if 1s failed (very short clips)
        try { makePoster(localPath, tmpPoster, 0.2); } catch {}
      }
      if (fs.existsSync(tmpPoster)) {
        console.log(`   ↪ uploading poster…`);
        await putFile(posterKey, tmpPoster, 'image/jpeg');
      } else {
        console.warn(`   ⚠ poster failed`);
      }
    }

    results.push({
      key: r2Key,
      url: `${PUBLIC_URL}/${r2Key}`,
      posterUrl: `${PUBLIC_URL}/${posterKey}`,
      orientation,
      sizeMB,
    });
  }
  return results;
}
