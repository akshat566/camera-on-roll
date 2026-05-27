/**
 * Upload poster images to R2
 */
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import fs from 'fs';
import path from 'path';

const r2Client = new S3Client({
  region: 'auto',
  endpoint: 'https://44dd7b2e5cb6abb4d7b8d649124d1f36.r2.cloudflarestorage.com',
  credentials: {
    accessKeyId: '269c6bd1778e2bbf1360b9f0691f01c5',
    secretAccessKey: 'fe60c58785937539a4640d83261fe95511dcf7d7999b1e897ba87680c379537a',
  },
});
const BUCKET = 'cameraonrollproductiondata';
const PUBLIC_URL = 'https://pub-4d3cad9469854486ab973729b0a3541b.r2.dev';

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
