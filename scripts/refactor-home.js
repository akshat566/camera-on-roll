/* Refactor app/page.tsx: replace local FEATURED with FEATURED_HOME from lib/work-data,
   and switch tile thumbs from <video> to <img src={p.poster}>. */
const fs = require('fs');
const p = 'app/page.tsx';
let s = fs.readFileSync(p, 'utf8');
const eol = s.includes('\r\n') ? '\r\n' : '\n';
const orig = s;
s = s.replace(/\r\n/g, '\n');

// 1) Replace the FEATURED IIFE + FEATURED_HOME block with a derivation from ALL_PROJECTS / FEATURED_HOME.
const featStart = s.indexOf('const FEATURED: FeaturedProject[] = (() => {');
const featEnd = s.indexOf('// Home page: show only 8 featured items');
const featBlockEnd = s.indexOf('\n', s.indexOf('const FEATURED_HOME = FEATURED.slice(0, 8);')) + 1;
if (featStart < 0 || featEnd < 0 || featBlockEnd < 0) throw new Error('FEATURED block not found');

const replacement = `// Featured 8 projects — sourced from the central catalog in lib/work-data.ts.
// Layout spans (c × r) are picked here per item to keep the bento maze visually rhythmic.
const HOME_LAYOUT: Array<{ c: number; r: number }> = [
  { c:2, r:3 }, // 1: hero V
  { c:4, r:2 }, // 2: wide H
  { c:2, r:2 }, // 3: V
  { c:4, r:2 }, // 4: wide H
  { c:2, r:3 }, // 5: hero V
  { c:4, r:2 }, // 6: wide H
  { c:2, r:2 }, // 7: V
  { c:4, r:2 }, // 8: wide H
];
const FEATURED: FeaturedProject[] = FEATURED_HOME_DATA.map((proj, i) => ({
  cat: proj.cat,
  client: proj.client,
  title: proj.title,
  link: proj.link,
  img: proj.poster,
  orientation: proj.orientation,
  c: HOME_LAYOUT[i]?.c ?? 2,
  r: HOME_LAYOUT[i]?.r ?? 2,
}));

const FEATURED_HOME = FEATURED.slice(0, 8);
`;

s = s.slice(0, featStart) + replacement + s.slice(featBlockEnd);

// 2) Add the import for FEATURED_HOME (renamed) from lib/work-data after existing imports.
//    Insert after the first 'import { Reveal } from ...' line.
const importAnchor = `import { Reveal } from '@/components/Reveal';`;
if (!s.includes(importAnchor)) throw new Error('import anchor not found');
s = s.replace(importAnchor, importAnchor + `\nimport { FEATURED_HOME as FEATURED_HOME_DATA, getEmbedUrl } from '@/lib/work-data';`);

// 3) Replace the two <video>/<img> conditionals on the home page tiles with simple <img src={p.img}>.
//    Grid tile:
const gridOld = `                      {inferPlatform(p.link) === 'r2' ? (
                        <video src={p.link} preload="metadata" muted playsInline
                          onLoadedMetadata={e => { const el = e.currentTarget as HTMLVideoElement; try { el.currentTime = 0.5; } catch {} }}
                          style={{ width:'100%', height:'100%', objectFit:'cover', display:'block', transition:'transform 600ms, filter 400ms', filter:'brightness(0.85)' }}`;
if (s.includes(gridOld)) {
  // find the matching closing ')}' for this conditional and replace the entire ternary
  const gIdx = s.indexOf(gridOld);
  // Locate end pattern (closing of the ternary): unique text right after the false branch image element ends
  const gEndAnchor = "loading=\"lazy\"\n                          onError={(e) => {\n                            if (ytId_ && !e.currentTarget.dataset.fallback) {";
  // Rather than parse, just replace the whole conditional block by anchors that bookend it.
}

// Simpler/safer: do a direct multi-line regex replacement for both occurrences (grid + list)
// Each looks like: `{inferPlatform(p.link) === 'r2' ? ( <video ... /> ) : ( <img ... /> )}`
const condRegex = /\{inferPlatform\(p\.link\) === 'r2' \? \([\s\S]*?\}\s*\}\)\s*\}\)/;

// Actually we already see two occurrences. Let me just do simple text replacement using known unique starts/ends.

function replaceConditional(input, startAfter) {
  const open = input.indexOf("{inferPlatform(p.link) === 'r2' ? (", startAfter);
  if (open < 0) return { out: input, end: -1 };
  // find the matching closing for the JSX expression: count braces
  let depth = 0;
  let i = open;
  for (; i < input.length; i++) {
    const ch = input[i];
    if (ch === '{') depth++;
    else if (ch === '}') {
      depth--;
      if (depth === 0) break;
    }
  }
  if (i >= input.length) return { out: input, end: -1 };
  const close = i + 1;
  const replacement = `<img src={p.img} alt={p.title} loading="lazy"
                          onError={(e) => {
                            if (ytId_ && !e.currentTarget.dataset.fallback) {
                              e.currentTarget.dataset.fallback = '1';
                              e.currentTarget.src = ytFallbackThumb(ytId_);
                            }
                          }}
                          style={{ width:'100%', height:'100%', objectFit:'cover', display:'block', transition:'transform 600ms, filter 400ms', filter:'brightness(0.85)' }}
                        />`;
  return { out: input.slice(0, open) + replacement + input.slice(close), end: open + replacement.length };
}

let r = replaceConditional(s, 0);
if (r.end < 0) throw new Error('first conditional not found');
s = r.out;
r = replaceConditional(s, r.end);
if (r.end < 0) throw new Error('second conditional not found');
s = r.out;

// 4) Modal: replace getEmbed with getEmbedUrl
s = s.replace(
  `const platform = inferPlatform(project.link);\n  const embed = getEmbed(project.link, platform);`,
  `const platform = inferPlatform(project.link);\n  const embed = getEmbedUrl({ ...project, platform, owner: 'akshat', id: '_', poster: project.img } as any);`
);

// Restore CRLF if needed
if (eol === '\r\n') s = s.replace(/\n/g, '\r\n');

fs.writeFileSync(p, s, 'utf8');
console.log('OK. delta:', s.length - orig.length, 'chars');
