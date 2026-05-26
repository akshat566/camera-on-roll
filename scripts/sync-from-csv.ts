/* Sync work-data.ts from the user's CSV export.
   Reads: c:\Users\admin\Downloads\website docs camera on roll - Sheet1.csv
   Writes: lib/work-data.ts
*/
import fs from 'fs';
import path from 'path';

const R2_BASE = 'https://pub-4d3cad9469854486ab973729b0a3541b.r2.dev/work';

// CSV path from user
const CSV_PATH = 'c:\\Users\\admin\\Downloads\\website docs camera on roll - Sheet1.csv';
const OUTPUT_PATH = 'lib/work-data.ts';

// Column indices (0-based) based on the user's CSV header
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
        // Escaped quote inside quoted field
        currentField += '"';
        i++; // skip next quote
      } else {
        // Toggle quote mode
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      // Field separator
      currentRow.push(currentField.trim());
      currentField = '';
    } else if ((char === '\r' || char === '\n') && !inQuotes) {
      // Row separator
      if (currentField || currentRow.length > 0) {
        currentRow.push(currentField.trim());
      }
      if (currentRow.length > 0) {
        rows.push(currentRow);
      }
      currentRow = [];
      currentField = '';
      // Skip \n after \r
      if (char === '\r' && nextChar === '\n') {
        i++;
      }
    } else {
      currentField += char;
    }
  }
  
  // Add last field/row if exists
  if (currentField || currentRow.length > 0) {
    currentRow.push(currentField.trim());
  }
  if (currentRow.length > 0) {
    rows.push(currentRow);
  }
  
  return rows;
}

function inferOwnerFromPath(videoLink: string): 'ashna' | 'akshat' | 'external' {
  const lower = videoLink.toLowerCase();
  if (lower.includes('ashna')) return 'ashna';
  if (lower.includes('akshat')) return 'akshat';
  return 'external';
}

function inferPlatform(link: string): 'youtube' | 'instagram' | 'r2' {
  if (link.includes('youtube.com') || link.includes('youtu.be')) return 'youtube';
  if (link.includes('instagram.com')) return 'instagram';
  return 'r2';
}

function extractYouTubeId(link: string): string | null {
  const m = link.match(/(?:youtu\.be\/|v=|\/embed\/)([\w-]{6,})/);
  return m ? m[1] : null;
}

function extractInstagramShortcode(link: string): string | null {
  const m = link.match(/instagram\.com\/(?:p|reel|tv)\/([\w-]+)/);
  return m ? m[1] : null;
}

function posterUrl(link: string, platform: 'youtube' | 'instagram' | 'r2', customThumb: string | null): string {
  if (customThumb && customThumb.trim() && customThumb !== 'extract thumbnail from the video') {
    // If it's a local path, we'd need to upload it. For now, assume it's a URL or skip.
    // If it starts with http, use it; otherwise, we'll need to handle uploads separately.
    if (customThumb.startsWith('http')) return customThumb;
  }
  if (platform === 'youtube') {
    const id = extractYouTubeId(link);
    return id ? `https://i.ytimg.com/vi/${id}/maxresdefault.jpg` : '';
  }
  if (platform === 'instagram') {
    // Instagram thumbnails are harder; we'll use a placeholder or skip
    return '';
  }
  // R2: use .jpg convention
  return link + '.jpg';
}

function mapAspectRatio(ratio: string): 'h' | 'v' {
  const r = ratio.replace(':', '/').toLowerCase();
  if (r.includes('9/16') || r.includes('09/16')) return 'v';
  if (r.includes('16/9')) return 'h';
  if (r.includes('1/1')) return 'h'; // square treated as horizontal for grid
  return 'h'; // default
}

function normalizeCategory(cat: string): string {
  const c = cat.trim().toLowerCase();
  if (c.includes('brand') || c.includes('reel')) return 'Brand Reels';
  if (c.includes('fashion')) return 'Fashion';
  if (c.includes('product')) return 'Product';
  if (c.includes('cinematography') || c.includes('cinema')) return 'Cinematography';
  if (c.includes('podcast')) return 'Podcasts';
  return cat; // return as-is if unknown
}

function cleanTitle(title: string): string {
  return title.replace(/"/g, '').trim();
}

function cleanFileName(fileName: string): string {
  return fileName.replace(/"/g, '').trim();
}

function r2PathFromLocal(localPath: string, owner: 'ashna' | 'akshat'): string {
  // Map local folder structure to R2 structure
  // Ashna: ashna/horizontal/ or ashna/vertical/
  // Akshat: akshat/horizontal/ or akshat/vertical/
  const fileName = path.basename(localPath);
  const orientation = localPath.toLowerCase().includes('vertical') || localPath.toLowerCase().includes('insta') ? 'vertical' : 'horizontal';
  return `${R2_BASE}/${owner}/${orientation}/${fileName}`;
}

function main() {
  const csvText = fs.readFileSync(CSV_PATH, 'utf8');
  const rows = parseCSV(csvText);

  const projects: any[] = [];
  const featured: any[] = [];

  // Skip header row (index 0)
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    if (row.length < 5) continue; // skip malformed rows

    const folderPath = row[COL.VIDEO_LINK];
    const title = cleanTitle(row[COL.TITLE]);
    const fileName = cleanFileName(row[COL.FILE_NAME]);
    const thumbnail = row[COL.THUMBNAIL]?.trim();
    const thumbnailFile = row[COL.THUMBNAIL_FILE_NAME]?.trim();
    const categoryRaw = row[COL.CATEGORY];
    const aspectRatio = row[COL.ASPECT_RATIO];
    const homepageOrder = row[COL.HOMEPAGE_ORDER];
    const tags = row[COL.TAGS];

    if (!fileName || !title) continue;

    const owner = inferOwnerFromPath(folderPath);
    const platform = inferPlatform(fileName); // Check if filename is a URL
    const orientation = mapAspectRatio(aspectRatio);
    const category = normalizeCategory(categoryRaw);

    // Determine the actual link URL
    let link: string;
    if (platform === 'r2' && (owner === 'ashna' || owner === 'akshat')) {
      link = r2PathFromLocal(folderPath, owner);
    } else {
      link = fileName; // assume it's already a URL for YT/IG or external
    }

    // Determine poster URL
    const poster = posterUrl(link, platform, thumbnailFile || thumbnail);

    const project = {
      id: projects.length + 1,
      owner,
      cat: category,
      title,
      client: owner === 'external' ? 'External' : 'Camera On Roll',
      link,
      poster,
      platform,
      orientation,
      tags: tags || '',
    };

    projects.push(project);

    // Mark as featured if homepage order indicates it
    if (homepageOrder && homepageOrder.toLowerCase().includes('home')) {
      featured.push(project);
    }
  }

  // Generate TypeScript file
  const tsContent = `/* AUTO-GENERATED from CSV. DO NOT EDIT MANUALLY.
   Run: npx tsx scripts/sync-from-csv.ts
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
  return null; // r2: handled directly via <video>
}
`;

  fs.writeFileSync(OUTPUT_PATH, tsContent, 'utf8');
  console.log(`✓ Generated ${OUTPUT_PATH}`);
  console.log(`  - ${projects.length} total projects`);
  console.log(`  - ${featured.length} featured projects`);
}

main();
