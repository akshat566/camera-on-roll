/**
 * Upload poster images to R2
 */
import { PutObjectCommand } from '@aws-sdk/client-s3';
import fs from 'fs';
import { r2Client, R2_BUCKET as BUCKET, R2_PUBLIC_URL as PUBLIC_URL } from './r2-client';

const posters = [
  { local: 'scripts/thumb-downloads/scripts/thumb-downloads/DSC00049-2.jpg', r2Key: 'posters/urfi-thumbnail.jpg' },
  { local: 'scripts/thumb-downloads/scripts/thumb-downloads/brand-reel.jpg', r2Key: 'posters/brand-influencer-reel.jpg' },
  { local: 'scripts/thumb-downloads/scripts/thumb-downloads/product-commercial.jpg', r2Key: 'posters/product-commercial.jpg' },
  { local: 'scripts/thumb-downloads/scripts/thumb-downloads/ecommerce.jpg', r2Key: 'posters/ecommerce.jpg' },
];

async function main() {
  for (const { local, r2Key } of posters) {
    if (!fs.existsSync(local)) {
      console.error(`File not found: ${local}`);
      continue;
    }
    const body = fs.readFileSync(local);
    console.log(`Uploading ${local} → ${r2Key} (${(body.length / 1024 / 1024).toFixed(2)} MB)`);
    await r2Client.send(new PutObjectCommand({
      Bucket: BUCKET,
      Key: r2Key,
      Body: body,
      ContentType: 'image/jpeg',
      CacheControl: 'public, max-age=31536000, immutable',
    }));
    console.log(`  → ${PUBLIC_URL}/${r2Key}`);
  }
}

main().catch(console.error);
