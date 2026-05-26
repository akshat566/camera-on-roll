/* Upload the 9 CSV-mapped videos to R2 with poster generation */
import { run } from './upload-and-poster';

const UPLOADS = [
  {
    localPath: 'C:\\Users\\admin\\Downloads\\akshats videos\\HIGH RES-20260526T055135Z-3-001\\HIGH RES\\I ❤️ Knorr Ramen. (Poora Europe trip ka kharcha nikal gaya doston)#Knorr #KnorrKoreanRamen #AD # (1).mp4',
    r2Key: 'akshat/vertical/I ❤️ Knorr Ramen. (Poora Europe trip ka kharcha nikal gaya doston)#Knorr #KnorrKoreanRamen #AD # (1).mp4',
  },
  {
    localPath: 'C:\\Users\\admin\\Downloads\\akshats videos\\HIGH RES-20260526T055135Z-3-001\\HIGH RES\\TDWP X TRESEMME UORFI AND ASFI V6.mp4',
    r2Key: 'akshat/vertical/TDWP X TRESEMME UORFI AND ASFI V6.mp4',
  },
  {
    localPath: 'C:\\Users\\admin\\Downloads\\akshats videos\\HIGH RES-20260526T055135Z-3-001\\HIGH RES\\SANTANU X CLAUD V5.mp4',
    r2Key: 'akshat/vertical/SANTANU X CLAUD V5.mp4',
  },
  {
    localPath: 'C:\\Users\\admin\\Downloads\\ashna videos\\HIGH RES -20260525T095426Z-3-001\\HIGH RES\\15.mp4 - pick any product shot in the first 10 seconds, dont need models.mp4',
    r2Key: 'ashna/horizontal/15.mp4 - pick any product shot in the first 10 seconds, dont need models.mp4',
  },
  {
    localPath: 'C:\\Users\\admin\\Downloads\\akshats videos\\HIGH RES-20260526T055135Z-3-001\\HIGH RES\\Emaar Final.mp4',
    r2Key: 'akshat/horizontal/Emaar Final.mp4',
  },
  {
    localPath: 'C:\\Users\\admin\\Downloads\\akshats videos\\content dump-20260526T055140Z-3-001\\content dump\\IMG_3467.JPG',
    r2Key: 'akshat/horizontal/IMG_3467.JPG',
  },
  {
    localPath: 'C:\\Users\\admin\\Downloads\\akshats videos\\content dump-20260526T055140Z-3-001\\content dump\\vidssave.com Ep_ 4 Future-Ready_ A Playbook for Engineers and Dreamers _ Kunal Shah, Founder, CRED 720P.mp4',
    r2Key: 'akshat/horizontal/vidssave.com Ep_ 4 Future-Ready_ A Playbook for Engineers and Dreamers _ Kunal Shah, Founder, CRED 720P.mp4',
  },
  {
    localPath: 'C:\\Users\\admin\\Downloads\\akshats videos\\HIGH RES-20260526T055135Z-3-001\\HIGH RES\\vidssave.com COMPLAN kesar badam 1080P.mp4',
    r2Key: 'akshat/horizontal/vidssave.com COMPLAN kesar badam 1080P.mp4',
  },
  {
    localPath: 'C:\\Users\\admin\\Downloads\\akshats videos\\HIGH RES-20260526T055135Z-3-001\\HIGH RES\\Bombay 99 Mixers.mp4',
    r2Key: 'akshat/horizontal/Bombay 99 Mixers.mp4',
  },
];

async function main() {
  console.log(`\n📤 Uploading ${UPLOADS.length} CSV videos to R2...\n`);
  
  const results = await run(UPLOADS);
  
  console.log('\n✓ All CSV videos uploaded!');
  console.log('\nResults:');
  results.forEach(r => console.log(`  ${r.key} → ${r.url}`));
}

main().catch(console.error);
