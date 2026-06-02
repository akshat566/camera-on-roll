import { PutObjectCommand } from '@aws-sdk/client-s3';
import fs from 'fs';
import path from 'path';
import { r2Client, R2_BUCKET as BUCKET, R2_PUBLIC_URL as PUBLIC_URL } from './r2-client';

async function uploadToR2(key: string, body: Buffer, contentType: string) {
  await r2Client.send(new PutObjectCommand({
    Bucket: BUCKET, Key: key, Body: body, ContentType: contentType,
  }));
  return `${PUBLIC_URL}/${key}`;
}

async function uploadVideos() {
  const horizontalDir = 'C:/Users/admin/Downloads/HIGH RES -20260525T095426Z-3-001/HIGH RES';
  const verticalDir = 'C:/Users/admin/Downloads/Instagram download-20260525T095704Z-3-001/Instagram download';

  const results: { file: string; url: string }[] = [];

  // Upload horizontal videos
  const horizontalFiles = fs.readdirSync(horizontalDir).filter(f => f.endsWith('.mp4'));
  console.log(`Found ${horizontalFiles.length} horizontal videos`);
  for (const file of horizontalFiles) {
    const filePath = path.join(horizontalDir, file);
    const buffer = fs.readFileSync(filePath);
    const key = `work/horizontal/${file.replace(/\s+/g, '_')}`;
    try {
      const url = await uploadToR2(key, buffer, 'video/mp4');
      results.push({ file: `horizontal/${file}`, url });
      console.log(`Uploaded: ${file} -> ${url}`);
    } catch (err) {
      console.error(`Failed to upload ${file}:`, err);
    }
  }

  // Upload vertical videos
  const verticalFiles = fs.readdirSync(verticalDir).filter(f => f.endsWith('.mp4'));
  console.log(`Found ${verticalFiles.length} vertical videos`);
  for (const file of verticalFiles) {
    const filePath = path.join(verticalDir, file);
    const buffer = fs.readFileSync(filePath);
    const key = `work/vertical/${file.replace(/\s+/g, '_')}`;
    try {
      const url = await uploadToR2(key, buffer, 'video/mp4');
      results.push({ file: `vertical/${file}`, url });
      console.log(`Uploaded: ${file} -> ${url}`);
    } catch (err) {
      console.error(`Failed to upload ${file}:`, err);
    }
  }

  fs.writeFileSync('scripts/uploaded-videos.json', JSON.stringify(results, null, 2));
  console.log('\nAll done. URLs saved to scripts/uploaded-videos.json');
}

uploadVideos().catch(console.error);
