/**
 * Shared R2 client for maintenance scripts.
 *
 * Credentials are read from the environment (never hardcoded). Standalone
 * scripts run via `tsx` don't auto-load env files the way Next.js does, so we
 * load `.env.local` / `.env` here with a tiny zero-dependency parser.
 *
 * To populate the required vars locally:
 *   vercel env pull .env.local
 */
import { S3Client } from '@aws-sdk/client-s3';
import fs from 'fs';
import path from 'path';

function loadEnvFiles() {
  for (const file of ['.env.local', '.env']) {
    const p = path.join(process.cwd(), file);
    if (!fs.existsSync(p)) continue;
    for (const raw of fs.readFileSync(p, 'utf8').split('\n')) {
      const m = raw.match(/^\s*([A-Za-z0-9_]+)\s*=\s*(.*?)\s*$/);
      if (!m) continue;
      const key = m[1];
      let val = m[2];
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      if (process.env[key] === undefined) process.env[key] = val;
    }
  }
}
loadEnvFiles();

function required(name: string): string {
  const v = process.env[name];
  if (!v) {
    throw new Error(
      `Missing required env var ${name}. Add it to .env.local (e.g. run \`vercel env pull .env.local\`).`,
    );
  }
  return v;
}

export const R2_ACCOUNT_ID = required('R2_ACCOUNT_ID');
export const R2_BUCKET = process.env.R2_BUCKET_NAME || 'cameraonrollproductiondata';
export const R2_PUBLIC_URL =
  process.env.R2_PUBLIC_URL || 'https://pub-4d3cad9469854486ab973729b0a3541b.r2.dev';

export const r2Client = new S3Client({
  region: 'auto',
  endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: required('R2_ACCESS_KEY_ID'),
    secretAccessKey: required('R2_SECRET_ACCESS_KEY'),
  },
});
