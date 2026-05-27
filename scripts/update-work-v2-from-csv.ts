/**
 * Update work-v2-data.ts from CSV:
 * - Rename titles per CSV
 * - Remove duplicates (duplicacy = yes)
 * - Set thumbnail timestamps
 */
import fs from 'fs';

const CSV_PATH = 'c:/Users/admin/Downloads/Label+ Thumbnail _Website - Sheet1.csv';
const DATA_PATH = 'c:/camera-on-roll/lib/work-v2-data.ts';

// Parse CSV
function parseCSV(path: string) {
  const text = fs.readFileSync(path, 'utf-8');
  const lines = text.split('\n').filter(l => l.trim());
  const headers = lines[0].split(',');
  const rows: { original: string; rename: string; duplicacy: string; thumbNote: string }[] = [];
  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(',');
    rows.push({
      original: cols[0]?.trim() || '',
      rename: cols[1]?.trim() || '',
      duplicacy: cols[2]?.trim().toLowerCase() || '',
      thumbNote: cols[3]?.trim() || '',
    });
  }
  return rows;
}

const csvRows = parseCSV(CSV_PATH);
console.log(`Parsed ${csvRows.length} CSV rows`);

// Read current data file
let dataText = fs.readFileSync(DATA_PATH, 'utf-8');

// Extract all project objects using regex
const projectRegex = /\{\s*id:\s*(\d+),[\s\S]*?\},?/g;
let match;
const projects: { id: number; text: string; cat: string; title: string; link: string; poster: string; orientation: string }[] = [];

while ((match = projectRegex.exec(dataText)) !== null) {
  const block = match[0];
  const id = parseInt(match[1]);
  const cat = block.match(/cat:\s*"([^"]*)"/)?.[1] || '';
  const title = block.match(/title:\s*"([^"]*)"/)?.[1] || '';
  const link = block.match(/link:\s*"([^"]*)"/)?.[1] || '';
  const poster = block.match(/poster:\s*"([^"]*)"/)?.[1] || '';
  const orientation = block.match(/orientation:\s*"([^"]*)"/)?.[1] || '';
  projects.push({ id, text: block, cat, title, link, poster, orientation });
}

console.log(`Found ${projects.length} projects in data file`);

// Build mapping: the CSV has 58 rows, we need to map them to projects
// First 10 rows map to ids 0-9
// Remaining rows map to ids 100+ in order

const mapping: { projectId: number; csvRow: number; rename: string; isDup: boolean; thumbNote: string }[] = [];

// Map first 10 CSV rows to ids 0-9
for (let i = 0; i < Math.min(10, csvRows.length); i++) {
  mapping.push({
    projectId: i,
    csvRow: i,
    rename: csvRows[i].rename,
    isDup: csvRows[i].duplicacy === 'yes',
    thumbNote: csvRows[i].thumbNote,
  });
}

// Map remaining CSV rows to ids 100+
let projIdx = 100;
for (let i = 10; i < csvRows.length && projIdx <= 173; i++) {
  const proj = projects.find(p => p.id === projIdx);
  if (proj) {
    mapping.push({
      projectId: projIdx,
      csvRow: i,
      rename: csvRows[i].rename,
      isDup: csvRows[i].duplicacy === 'yes',
      thumbNote: csvRows[i].thumbNote,
    });
  }
  projIdx++;
}

console.log(`Mapped ${mapping.length} projects to CSV rows`);

// Find duplicates: akshat/vertical duplicates of work/vertical
const dupAkshatIds: number[] = [];
const workVerticals = projects.filter(p => p.link.includes('/work/vertical/'));
const akshatVerticals = projects.filter(p => p.link.includes('/akshat/vertical/') && p.id >= 140);

for (const akshat of akshatVerticals) {
  const akshatName = akshat.link.split('/').pop()?.replace(/\.mp4$/, '');
  const workMatch = workVerticals.find(w => {
    const workName = w.link.split('/').pop()?.replace(/\.mp4$/, '');
    return workName === akshatName;
  });
  if (workMatch) {
    dupAkshatIds.push(akshat.id);
  }
}

console.log(`Found ${dupAkshatIds.length} akshat/vertical duplicates of work/vertical`);

// Now update the data file
let newData = dataText;

// 1. Remove duplicates
const idsToRemove = new Set<number>();

// CSV-marked duplicates
for (const m of mapping) {
  if (m.isDup) {
    idsToRemove.add(m.projectId);
  }
}

// akshat/vertical duplicates
for (const id of dupAkshatIds) {
  idsToRemove.add(id);
}

console.log(`Removing ${idsToRemove.size} duplicates: ${[...idsToRemove].sort((a,b)=>a-b).join(', ')}`);

// Remove each duplicate project block
for (const id of idsToRemove) {
  const proj = projects.find(p => p.id === id);
  if (!proj) continue;
  
  // Find and remove the project block
  const blockRegex = new RegExp(`\\{\\s*id:\\s*${id}\\b[\\s\\S]*?\\}\\s*,?\\s*\\n`, 'g');
  newData = newData.replace(blockRegex, '');
}

// 2. Update titles
for (const m of mapping) {
  if (m.isDup || !m.rename || m.rename === 'No change needed') continue;
  
  const proj = projects.find(p => p.id === m.projectId);
  if (!proj) continue;
  
  // Replace title in the project block
  const oldTitle = proj.title;
  const newTitle = m.rename;
  
  // Find the project block and replace title
  const blockRegex = new RegExp(`(\\{\\s*id:\\s*${m.projectId}\\b[\\s\\S]*?title:\\s*")${escapeRegex(oldTitle)}("[\\s\\S]*?\\})`);
  newData = newData.replace(blockRegex, `$1${newTitle}$2`);
}

// 3. Update categories based on rename
const catMapping: Record<string, string> = {
  'Showreel': 'Showreel',
  'Knorr x Samay Raina': 'Brand Reels',
  'Tresemme x Uorfi': 'Brand Reels',
  'Claude x Shantanu': 'Brand Reels',
  'Typsy Beauty': 'Product',
  'Engage': 'Product',
  'Bombay 99': 'Product',
  'Fashion Campaign': 'Fashion',
  'Japonico x Event Coverage': 'Events',
  'Ethnic Menswear Campaign': 'Fashion',
  'Ethnic Womenwear Campaign': 'Fashion',
  'Beauty Product Campaign': 'Product',
  'Unlayering Podcast': 'Podcasts',
  'Product Launch Teaser': 'Product',
  'Beauty Product Launch Trailer': 'Product',
  'Typsy Beauty Teaser': 'Product',
  'Product Launch Video': 'Product',
  'Bridal Fashion Campaign': 'Fashion',
  'Kids Fashion Campaign': 'Fashion',
  'New Collection Teaser': 'Fashion',
  'Furniture Showcase': 'Interiors',
  'Engage Event Coverage': 'Events',
  'Behind The Scene x Factory Shoot': 'Behind The Scenes',
  'Kidswear Fashion Campaign': 'Fashion',
  'Uorfi x Fashion': 'Fashion',
  'Cornetto x Shantanu': 'Brand Reels',
  'Renee x Urofi': 'Brand Reels',
  'Maybelline x Uorfi': 'Brand Reels',
  'Artize x Shantanu': 'Brand Reels',
  'Loreal x Uorfi': 'Brand Reels',
  'Lotto x Shantanu': 'Brand Reels',
  'NPCI Podcast x CS Shetty': 'Podcasts',
  'Tata AIA Podcast': 'Podcasts',
  'HSBC': 'Brand Reels',
  'Digital Ad': 'Brand Reels',
};

for (const m of mapping) {
  if (m.isDup) continue;
  
  const newCat = catMapping[m.rename];
  if (!newCat) continue;
  
  const proj = projects.find(p => p.id === m.projectId);
  if (!proj) continue;
  
  // Replace category in the project block
  const blockRegex = new RegExp(`(\\{\\s*id:\\s*${m.projectId}\\b[\\s\\S]*?cat:\\s*")${escapeRegex(proj.cat)}("[\\s\\S]*?\\})`);
  newData = newData.replace(blockRegex, `$1${newCat}$2`);
}

// Helper to escape regex special chars
function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Write updated file
fs.writeFileSync(DATA_PATH, newData);
console.log(`Updated ${DATA_PATH}`);

// Summary
console.log('\n=== SUMMARY ===');
console.log(`Total projects before: ${projects.length}`);
const remainingProjects = (newData.match(/\{\s*id:\s*\d+/g) || []).length;
console.log(`Total projects after: ${remainingProjects}`);
console.log(`Removed: ${projects.length - remainingProjects}`);
console.log(`Updated titles: ${mapping.filter(m => !m.isDup && m.rename && m.rename !== 'No change needed').length}`);
