/* Parse CSV, map to local video files, upload to R2 with posters, regenerate work-data.ts */
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const R2_BASE = 'https://pub-4d3cad9469854486ab973729b0a3541b.r2.dev/work';
const CSV_PATH = 'c:\\Users\\admin\\Downloads\\website docs camera on roll - Sheet1.csv';
const OUTPUT_PATH = 'lib/work-data.ts';

// Local folders
const FOLDERS = {
  akshatHigh: 'C:\\Users\\admin\\Downloads\\akshats videos\\HIGH RES-20260526T055135Z-3-001\\HIGH RES',
  akshatContent: 'C:\\Users\\admin\\Downloads\\akshats videos\\content dump-20260526T055140Z-3-001\\content dump',
  ashnaHigh: 'C:\\Users\\admin\\Downloads\\ashna videos\\HIGH RES -20260525T095426Z-3-001\\HIGH RES',
};

// CSV column indices
const COL = {
  VIDEO_LINK: 0,
  TITLE: 1,
  FILE_NAME: 2,
  THUMBNAIL: 3,
  THUMBNAIL_FILE_NAME: 4,
  CATEGORY: 5,
  ASPECT_RATIO: 6,
  HOMEPAGE_ORDER: 7,
  TAGS: 8,
};

type Row = string[];

function parseCSV(text: string): Row[] {
  const rows: Row[] = [];
  let currentRow: string[] = [];
  let currentField = '';
  let inQuotes = false;
  
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];
    
    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        currentField += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      currentRow.push(currentField.trim());
      currentField = '';
    } else if ((char === '\r' || char === '\n') && !inQuotes) {
      if (currentField || currentRow.length > 0) {
        currentRow.push(currentField.trim());
      }
      if (currentRow.length > 0) {
        rows.push(currentRow);
      }
      currentRow = [];
      currentField = '';
      if (char === '\r' && nextChar === '\n') {
        i++;
      }
    } else {
      currentField += char;
    }
  }
  
  if (currentField || currentRow.length > 0) {
    currentRow.push(currentField.trim());
  }
  if (currentRow.length > 0) {
    rows.push(currentRow);
  }
  
  return rows;
}

function cleanTitle(title: string): string {
  return title.replace(/"/g, '').trim();
}

function cleanFileName(fileName: string): string {
  return fileName.replace(/"/g, '').trim();
}

function mapAspectRatio(ratio: string): 'h' | 'v' {
  const r = ratio.replace(':', '/').toLowerCase();
  if (r.includes('9/16') || r.includes('09/16')) return 'v';
  if (r.includes('16/9')) return 'h';
  if (r.includes('1/1')) return 'h';
  return 'h';
}

function normalizeCategory(cat: string): string {
  const c = cat.trim().toLowerCase();
  if (c.includes('brand') || c.includes('reel')) return 'Brand Reels';
  if (c.includes('fashion')) return 'Fashion';
  if (c.includes('product')) return 'Product';
  if (c.includes('cinematography') || c.includes('cinema')) return 'Cinematography';
  if (c.includes('podcast')) return 'Podcasts';
  return cat || 'Brand Reels';
}

function inferOwnerFromPath(folderPath: string): 'ashna' | 'akshat' | 'external' {
  const lower = folderPath.toLowerCase();
  if (lower.includes('ashna')) return 'ashna';
  if (lower.includes('akshat')) return 'akshat';
  return 'external';
}

function inferOrientationFromFilename(filename: string): 'h' | 'v' {
  const lower = filename.toLowerCase();
  if (lower.includes('9x16') || lower.includes('reel') || lower.includes('vertical')) return 'v';
  return 'h';
}

// Find video file in local folders based on CSV title/filename
function findVideoFile(title: string, folderPath: string): string | null {
  const folders = [FOLDERS.akshatHigh, FOLDERS.akshatContent, FOLDERS.ashnaHigh];
  
  for (const folder of folders) {
    if (!fs.existsSync(folder)) continue;
    const files = fs.readdirSync(folder);
    
    // Try exact match first
    const exact = files.find(f => f === title || f === title + '.mp4');
    if (exact) return path.join(folder, exact);
    
    // Try partial match (title contains filename or vice versa)
    const partial = files.find(f => 
      f.toLowerCase().includes(title.toLowerCase()) || 
      title.toLowerCase().includes(f.toLowerCase().replace('.mp4', ''))
    );
    if (partial) return path.join(folder, partial);
  }
  
  return null;
}

function generatePoster(videoPath: string): string {
  const posterPath = videoPath + '.jpg';
  if (fs.existsSync(posterPath)) return posterPath;
  
  try {
    execSync(`ffmpeg -i "${videoPath}" -ss 00:00:01 -vframes 1 -q:v 2 "${posterPath}"`, { stdio: 'ignore' });
    return posterPath;
  } catch (e) {
    console.warn(`  ⚠ Failed to generate poster for ${videoPath}`);
    return '';
  }
}

function uploadToR2(localPath: string, r2Key: string): string {
  // Use wrangler or rclone - for now assume we'll use the existing upload script
  // Return the R2 URL
  return `${R2_BASE}/${r2Key}`;
}

function main() {
  const csvText = fs.readFileSync(CSV_PATH, 'utf8');
  const rows = parseCSV(csvText);

  const projects: any[] = [];
  const featured: any[] = [];

  console.log(`\n📋 Processing ${rows.length - 1} CSV rows...\n`);

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    if (row.length < 5) continue;

    const folderPath = row[COL.VIDEO_LINK];
    const title = cleanTitle(row[COL.TITLE]);
    const fileName = cleanFileName(row[COL.FILE_NAME]);
    const categoryRaw = row[COL.CATEGORY];
    const aspectRatio = row[COL.ASPECT_RATIO];
    const homepageOrder = row[COL.HOMEPAGE_ORDER];
    const tags = row[COL.TAGS];

    if (!title) continue;

    const owner = inferOwnerFromPath(folderPath);
    const category = normalizeCategory(categoryRaw);
    const orientation = mapAspectRatio(aspectRatio);

    // Find the actual video file
    const videoPath = findVideoFile(fileName || title, folderPath);
    
    if (!videoPath) {
      console.warn(`⚠ Video not found for: ${title}`);
      continue;
    }

    console.log(`✓ Found: ${title} → ${path.basename(videoPath)}`);

    // Generate poster
    const posterPath = generatePoster(videoPath);
    
    // Determine R2 key
    const videoName = path.basename(videoPath);
    const orientationFolder = orientation === 'v' ? 'vertical' : 'horizontal';
    const r2Key = `${owner}/${orientationFolder}/${videoName}`;
    
    // R2 URL
    const r2Url = `${R2_BASE}/${r2Key}`;
    const posterUrl = r2Url + '.jpg';

    const project = {
      id: projects.length + 1,
      owner,
      cat: category,
      title,
      client: owner === 'external' ? 'External' : 'Camera On Roll',
      link: r2Url,
      poster: posterUrl,
      platform: 'r2' as const,
      orientation,
      tags: tags || '',
    };

    projects.push(project);

    if (homepageOrder && homepageOrder.toLowerCase().includes('home')) {
      featured.push(project);
    }
  }

  // Generate TypeScript file
  const tsContent = `/* AUTO-GENERATED from CSV. DO NOT EDIT MANUALLY.
   Run: npx tsx scripts/sync-csv-upload.ts
*/

import type { Project } from './types';

export const ALL_PROJECTS: Project[] = ${JSON.stringify(projects, null, 2)};

export const FEATURED_HOME: Project[] = ${JSON.stringify(featured.slice(0, 8), null, 2)};

export const CATEGORIES = [...new Set(ALL_PROJECTS.map(p => p.cat))] as const;

export const OWNERS = ['All', 'Ashna', 'Akshat', 'External'] as const;

export function getEmbedUrl(project: Project): string | null {
  const { link, platform } = project;
  if (platform === 'youtube') {
    const id = link.match(/(?:youtu\\.be\\/|v=|\\/embed\\/)([\\w-]{6,})/)?.[1];
    return id ? \`https://www.youtube.com/embed/\${id}?autoplay=1&rel=0&modestbranding=1\` : null;
  }
  if (platform === 'instagram') {
    const sc = link.match(/instagram\\.com\\/(?:p|reel|tv)\\/([\\w-]+)/)?.[1];
    return sc ? \`https://www.instagram.com/p/\${sc}/embed/\` : null;
  }
  return null;
}
`;

  fs.writeFileSync(OUTPUT_PATH, tsContent, 'utf8');
  console.log(`\n✓ Generated ${OUTPUT_PATH}`);
  console.log(`  - ${projects.length} total projects`);
  console.log(`  - ${featured.length} featured projects`);
  console.log(`\n⚠ Note: Videos need to be uploaded to R2 using the upload script.`);
  console.log(`  Run: npx tsx scripts/upload-and-poster.ts with the mapped paths.`);
}

main();
