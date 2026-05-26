const fs = require('fs');
const results = JSON.parse(fs.readFileSync('scripts/upload-results.json', 'utf8'));

let id = 100;
const seen = new Set();
const oldProjects = [];

results.forEach(r => {
  if (seen.has(r.url)) return;
  seen.add(r.url);

  const filename = r.key.split('/').pop().replace(/\.mp4$/, '');
  const title = filename
    .replace(/_/g, ' ')
    .replace(/^\d+\.mp4\s*-\s*/i, '')
    .replace(/\s+/g, ' ')
    .trim();

  const owner = r.key.startsWith('akshat/') ? 'akshat' : r.key.startsWith('ashna/') ? 'ashna' : 'akshat';

  let cat = 'Portfolio';
  const lower = r.key.toLowerCase();
  if (lower.includes('default')) cat = 'AI Videos';
  else if (lower.includes('fashion')) cat = 'Fashion';
  else if (lower.includes('product')) cat = 'Product';
  else if (lower.includes('podcast')) cat = 'Podcasts';
  else if (lower.includes('event')) cat = 'Events';
  else if (lower.includes('interior')) cat = 'Interiors';
  else if (lower.includes('outdoor')) cat = 'Outdoor';
  else if (lower.includes('mood')) cat = 'Moodshots';
  else if (lower.includes('ad') || lower.includes('digital')) cat = 'Brand Reels';
  else if (lower.includes('bubble') || lower.includes('drink') || lower.includes('balloon')) cat = 'Product';
  else if (lower.includes('snap') || lower.includes('vidssave')) cat = 'Brand Reels';

  oldProjects.push({
    id: id++,
    owner,
    cat,
    title: title || 'Untitled',
    client: 'Camera On Roll',
    link: r.url,
    poster: r.posterUrl,
    platform: 'r2',
    orientation: r.orientation,
    tags: '',
  });
});

const lines = [];
lines.push('/* ALL PROJECTS for Work V2 — includes CSV projects + all legacy uploads */');
lines.push('import type { Project } from "./work-data";');
lines.push('');
lines.push('export const ALL_V2_PROJECTS: Project[] = [');

// Showreel
lines.push('  {');
lines.push('    id: 0,');
lines.push('    owner: "akshat",');
lines.push('    cat: "Showreel",');
lines.push('    title: "Camera On Roll — Showreel V3",');
lines.push('    client: "Camera On Roll",');
lines.push('    link: "https://pub-4d3cad9469854486ab973729b0a3541b.r2.dev/videos/showreel.mp4",');
lines.push('    poster: "https://pub-4d3cad9469854486ab973729b0a3541b.r2.dev/videos/showreel.mp4.jpg",');
lines.push('    platform: "r2",');
lines.push('    orientation: "h",');
lines.push('    tags: "",');
lines.push('  },');

// CSV projects
const csvProjects = [
  { id: 1, owner: 'akshat', cat: 'Brand Reels', title: 'Samay Raina', link: 'https://pub-4d3cad9469854486ab973729b0a3541b.r2.dev/akshat/vertical/I%20%E2%9D%A4%EF%B8%8F%20Knorr%20Ramen.%20(Poora%20Europe%20trip%20ka%20kharcha%20nikal%20gaya%20doston)%23Knorr%20%23KnorrKoreanRamen%20%23AD%20%23%20(1).mp4', poster: 'https://pub-4d3cad9469854486ab973729b0a3541b.r2.dev/akshat/vertical/I%20%E2%9D%A4%EF%B8%8F%20Knorr%20Ramen.%20(Poora%20Europe%20trip%20ka%20kharcha%20nikal%20gaya%20doston)%23Knorr%20%23KnorrKoreanRamen%20%23AD%20%23%20(1).mp4.jpg', orientation: 'v' },
  { id: 2, owner: 'akshat', cat: 'Brand Reels', title: 'Urfi', link: 'https://pub-4d3cad9469854486ab973729b0a3541b.r2.dev/akshat/vertical/TDWP X TRESEMME UORFI AND ASFI V6.mp4', poster: 'https://pub-4d3cad9469854486ab973729b0a3541b.r2.dev/akshat/vertical/TDWP X TRESEMME UORFI AND ASFI V6.mp4.jpg', orientation: 'v' },
  { id: 3, owner: 'akshat', cat: 'Brand Reels', title: 'Santanu', link: 'https://pub-4d3cad9469854486ab973729b0a3541b.r2.dev/akshat/vertical/SANTANU X CLAUD V5.mp4', poster: 'https://pub-4d3cad9469854486ab973729b0a3541b.r2.dev/akshat/vertical/SANTANU X CLAUD V5.mp4.jpg', orientation: 'v' },
  { id: 4, owner: 'ashna', cat: 'Product', title: 'AASHNAS PINK PRODUCT', link: 'https://pub-4d3cad9469854486ab973729b0a3541b.r2.dev/ashna/horizontal/15.mp4 - pick any product shot in the first 10 seconds, dont need models.mp4', poster: 'https://pub-4d3cad9469854486ab973729b0a3541b.r2.dev/ashna/horizontal/15.mp4 - pick any product shot in the first 10 seconds, dont need models.mp4.jpg', orientation: 'v' },
  { id: 5, owner: 'akshat', cat: 'Cinematography', title: 'EMAAR', link: 'https://pub-4d3cad9469854486ab973729b0a3541b.r2.dev/akshat/horizontal/Emaar Final.mp4', poster: 'https://pub-4d3cad9469854486ab973729b0a3541b.r2.dev/akshat/horizontal/Emaar Final.mp4.jpg', orientation: 'h' },
  { id: 6, owner: 'akshat', cat: 'Product', title: 'Engage Product Shoot', link: 'https://pub-4d3cad9469854486ab973729b0a3541b.r2.dev/akshat/horizontal/IMG_3467.JPG', poster: 'https://pub-4d3cad9469854486ab973729b0a3541b.r2.dev/akshat/horizontal/IMG_3467.JPG', orientation: 'h' },
  { id: 7, owner: 'akshat', cat: 'Podcasts', title: 'NPCI Podcast', link: 'https://pub-4d3cad9469854486ab973729b0a3541b.r2.dev/akshat/horizontal/vidssave.com Ep_ 4 Future-Ready_ A Playbook for Engineers and Dreamers _ Kunal Shah, Founder, CRED 720P.mp4', poster: 'https://pub-4d3cad9469854486ab973729b0a3541b.r2.dev/akshat/horizontal/vidssave.com Ep_ 4 Future-Ready_ A Playbook for Engineers and Dreamers _ Kunal Shah, Founder, CRED 720P.mp4.jpg', orientation: 'h' },
  { id: 8, owner: 'akshat', cat: 'Product', title: 'Complan', link: 'https://pub-4d3cad9469854486ab973729b0a3541b.r2.dev/akshat/horizontal/vidssave.com COMPLAN kesar badam 1080P.mp4', poster: 'https://pub-4d3cad9469854486ab973729b0a3541b.r2.dev/akshat/horizontal/vidssave.com COMPLAN kesar badam 1080P.mp4.jpg', orientation: 'h' },
  { id: 9, owner: 'akshat', cat: 'Product', title: 'Bombay 99 Ad', link: 'https://pub-4d3cad9469854486ab973729b0a3541b.r2.dev/akshat/horizontal/Bombay 99 Mixers.mp4', poster: 'https://pub-4d3cad9469854486ab973729b0a3541b.r2.dev/akshat/horizontal/Bombay 99 Mixers.mp4.jpg', orientation: 'h' },
];

csvProjects.forEach(p => {
  lines.push('  {');
  lines.push(`    id: ${p.id},`);
  lines.push(`    owner: "${p.owner}",`);
  lines.push(`    cat: "${p.cat}",`);
  lines.push(`    title: "${p.title}",`);
  lines.push('    client: "Camera On Roll",');
  lines.push(`    link: "${p.link}",`);
  lines.push(`    poster: "${p.poster}",`);
  lines.push('    platform: "r2",');
  lines.push(`    orientation: "${p.orientation}",`);
  lines.push('    tags: "",');
  lines.push('  },');
});

oldProjects.forEach(p => {
  lines.push('  {');
  lines.push(`    id: ${p.id},`);
  lines.push(`    owner: "${p.owner}",`);
  lines.push(`    cat: "${p.cat}",`);
  lines.push(`    title: ${JSON.stringify(p.title)},`);
  lines.push('    client: "Camera On Roll",');
  lines.push(`    link: "${p.link}",`);
  lines.push(`    poster: "${p.poster}",`);
  lines.push('    platform: "r2",');
  lines.push(`    orientation: "${p.orientation}",`);
  lines.push('    tags: "",');
  lines.push('  },');
});

lines.push('];');
lines.push('');
lines.push('export const V2_CATEGORIES = [...new Set(ALL_V2_PROJECTS.map(p => p.cat))].sort();');

fs.writeFileSync('lib/work-v2-data.ts', lines.join('\n'));
console.log('Generated lib/work-v2-data.ts with', 1 + csvProjects.length + oldProjects.length, 'projects');
