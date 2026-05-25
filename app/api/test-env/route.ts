import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    accountId: process.env.R2_ACCOUNT_ID ? 'SET' : 'MISSING',
    accessKey: process.env.R2_ACCESS_KEY_ID ? 'SET' : 'MISSING',
    secretKey: process.env.R2_SECRET_ACCESS_KEY ? 'SET' : 'MISSING',
    bucket: process.env.R2_BUCKET_NAME,
    publicUrl: process.env.R2_PUBLIC_URL,
  });
}
