import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const r2Client = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

const BUCKET = process.env.R2_BUCKET_NAME || 'atom-assets';
const PUBLIC_URL = process.env.R2_PUBLIC_URL;

export async function uploadToR2(key: string, body: Buffer | Uint8Array | string, contentType: string) {
  await r2Client.send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: body,
      ContentType: contentType,
    })
  );
  return PUBLIC_URL ? `${PUBLIC_URL}/${key}` : `https://${BUCKET}.${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com/${key}`;
}

export async function getSignedR2Url(key: string, expiresIn = 3600) {
  return getSignedUrl(
    r2Client,
    new GetObjectCommand({ Bucket: BUCKET, Key: key }),
    { expiresIn }
  );
}
