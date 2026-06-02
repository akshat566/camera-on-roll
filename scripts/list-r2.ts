import { ListObjectsV2Command } from '@aws-sdk/client-s3';
import { r2Client, R2_BUCKET } from './r2-client';

async function main() {
  let token: string | undefined;
  const all: string[] = [];
  do {
    const res = await r2Client.send(new ListObjectsV2Command({
      Bucket: R2_BUCKET,
      ContinuationToken: token,
    }));
    res.Contents?.forEach(o => o.Key && all.push(`${o.Key}  (${Math.round((o.Size||0)/1024)} KB)`));
    token = res.NextContinuationToken;
  } while (token);
  console.log(all.join('\n'));
  console.log(`\nTotal: ${all.length}`);
}
main();
