import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3';

const r2Client = new S3Client({
  region: 'auto',
  endpoint: 'https://44dd7b2e5cb6abb4d7b8d649124d1f36.r2.cloudflarestorage.com',
  credentials: {
    accessKeyId: '269c6bd1778e2bbf1360b9f0691f01c5',
    secretAccessKey: 'fe60c58785937539a4640d83261fe95511dcf7d7999b1e897ba87680c379537a',
  },
});

async function main() {
  let token: string | undefined;
  const all: string[] = [];
  do {
    const res = await r2Client.send(new ListObjectsV2Command({
      Bucket: 'cameraonrollproductiondata',
      ContinuationToken: token,
    }));
    res.Contents?.forEach(o => o.Key && all.push(`${o.Key}  (${Math.round((o.Size||0)/1024)} KB)`));
    token = res.NextContinuationToken;
  } while (token);
  console.log(all.join('\n'));
  console.log(`\nTotal: ${all.length}`);
}
main();
