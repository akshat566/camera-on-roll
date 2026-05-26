/* One-shot refactor: rewrite app/work/page.tsx to use lib/work-data.ts */
const fs = require('fs');
const p = 'app/work/page.tsx';
let s = fs.readFileSync(p, 'utf8').replace(/\r\n/g, '\n');

// 1) Replace header: imports + remove old helpers + add CATS from CATEGORIES
const headerOld = `'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal } from '@/components/Reveal';

const E = [0.22, 0.58, 0.32, 1] as const;
/** Bounce-out easing for hover pop. */
const POP_EASE = [0.34, 1.56, 0.64, 1] as const;

/**
 * YouTube thumbnail. \`maxresdefault.jpg\` is true 16:9 (1280×720) when available;
 * \`hqdefault.jpg\` is 4:3 (480×360) so it letterboxes inside 16:9 containers.
 * We prefer maxres and use \`mqdefault.jpg\` (always exists, 16:9) as a runtime fallback via onError.
 */
function ytThumb(id: string) {
  return \`https://i.ytimg.com/vi/\${id}/maxresdefault.jpg\`;
}
function ytFallbackThumb(id: string) {
  return \`https://i.ytimg.com/vi/\${id}/mqdefault.jpg\`;
}

/** Extract a YouTube video ID from any common URL shape. */
function ytId(link: string): string | null {
  const m = link.match(/(?:youtu\\.be\\/|v=|\\/embed\\/)([\\w-]{6,})/);
  return m ? m[1] : null;
}
/** Extract an Instagram post / reel shortcode from a URL. */
function igShortcode(link: string): string | null {
  const m = link.match(/instagram\\.com\\/(?:p|reel|tv)\\/([\\w-]+)/);
  return m ? m[1] : null;
}
/** Build an autoplay embed URL for a project link. */
function getEmbed(link: string, platform: 'youtube' | 'instagram' | 'r2'): string | null {
  if (platform === 'youtube') {
    const id = ytId(link);
    return id ? \`https://www.youtube.com/embed/\${id}?autoplay=1&rel=0&modestbranding=1\` : null;
  }
  if (platform === 'instagram') {
    const sc = igShortcode(link);
    return sc ? \`https://www.instagram.com/p/\${sc}/embed/\` : null;
  }
  return null; // r2: handled directly via <video>
}

const CATS = ['All', 'Fashion', 'Product', 'Cinematography', 'Brand Reels', 'Podcasts', 'AI Driven'];

type Project = {
  id: number;
  cat: string;
  title: string;
  client: string;
  link: string;
  thumb: string;
  platform: 'youtube' | 'instagram' | 'r2';
  /** v = portrait 9:16 (reels), h = landscape 16:9 (yt) */
  orientation: 'v' | 'h';
};

const R2 = 'https://pub-4d3cad9469854486ab973729b0a3541b.r2.dev/work';
`;

const headerNew = `'use client';
import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal } from '@/components/Reveal';
import { ALL_PROJECTS, CATEGORIES, OWNERS, getEmbedUrl, type Project } from '@/lib/work-data';

const E = [0.22, 0.58, 0.32, 1] as const;
/** Bounce-out easing for hover pop. */
const POP_EASE = [0.34, 1.56, 0.64, 1] as const;

function ytFallbackThumb(id: string) {
  return \`https://i.ytimg.com/vi/\${id}/mqdefault.jpg\`;
}

function ytId(link: string): string | null {
  const m = link.match(/(?:youtu\\.be\\/|v=|\\/embed\\/)([\\w-]{6,})/);
  return m ? m[1] : null;
}

const CATS = [...CATEGORIES, 'AI Driven'] as const;
`;

if (!s.includes(headerOld)) throw new Error('header anchor not found');
s = s.replace(headerOld, headerNew);

// 2) Remove the entire PROJECTS array (between 'const PROJECTS: Project[] = [' and the matching '];')
const startMarker = '/** Build an R2 video URL with a poster-frame fragment. */\nfunction r2Vid';
const stopMarker = 'const YT_PLAYLISTS = [';
const startIdx = s.indexOf(startMarker);
const stopIdx = s.indexOf(stopMarker);
if (startIdx === -1 || stopIdx === -1) throw new Error('markers not found');
s = s.slice(0, startIdx) + '/* PROJECTS data is centralised in lib/work-data.ts */\nconst PROJECTS = ALL_PROJECTS;\n\n' + s.slice(stopIdx);

// 3) Update the WorkPage state & filter
const stateOld = `export default function WorkPage() {
  const [active, setActive] = useState('All');
  const [modal, setModal] = useState<Project | null>(null);
  const filtered = active === 'All' ? PROJECTS : PROJECTS.filter(p => p.cat === active);`;
const stateNew = `export default function WorkPage() {
  const [active, setActive] = useState<string>('All');
  const [owner, setOwner] = useState<string>('All');
  const [modal, setModal] = useState<Project | null>(null);
  const filtered = useMemo(() => {
    const ownerMap: Record<string, string> = { 'Ashna': 'ashna', 'Akshat': 'akshat', 'External': 'external' };
    return PROJECTS.filter(p => {
      if (active !== 'All' && active !== 'AI Driven' && p.cat !== active) return false;
      if (owner !== 'All' && p.owner !== ownerMap[owner]) return false;
      return true;
    });
  }, [active, owner]);`;
if (!s.includes(stateOld)) throw new Error('state anchor not found');
s = s.replace(stateOld, stateNew);

// 4) Add the OWNER filter UI right after the category filter list
const filterOld = `                <div style={{ display:'flex', flexDirection:'column', gap:'4px' }}>
                  {CATS.map(c => {`;
// We will inject the Director section after the closing of the CATS map's container.
// Use a unique close marker: '</button>\n                    );\n                  })}\n                </div>\n              </div>\n            </Reveal>'
const filterCloseOld = `                      </button>
                    );
                  })}
                </div>
              </div>
            </Reveal>`;
const filterCloseNew = `                      </button>
                    );
                  })}
                </div>
                {/* Owner filter — segregation by director */}
                <p style={{ fontFamily:'var(--font-body)', fontSize:'9px', fontWeight:700, letterSpacing:'0.36em', textTransform:'uppercase', color:'var(--white-40)', margin:'22px 0 12px' }}>
                  Director
                </p>
                <div style={{ display:'flex', flexDirection:'column', gap:'4px' }}>
                  {OWNERS.map(o => {
                    const isActive = owner === o;
                    return (
                      <button key={o} onClick={() => setOwner(o)}
                        style={{
                          display:'flex', alignItems:'center', justifyContent:'flex-start',
                          fontFamily:'var(--font-body)', fontSize:'10px', fontWeight:700,
                          letterSpacing:'0.22em', textTransform:'uppercase',
                          padding:'10px 14px',
                          border: isActive ? '1px solid var(--accent)' : '1px solid var(--white-08)',
                          background: isActive ? 'var(--accent)' : 'transparent',
                          color: isActive ? '#fff' : 'var(--white-70)',
                          cursor:'pointer',
                          boxShadow: isActive ? '0 0 22px rgba(232,23,106,0.3)' : 'none',
                          transition:'all 220ms',
                          textAlign:'left',
                        }}
                        onMouseEnter={e => { if (!isActive) { e.currentTarget.style.borderColor='var(--white-40)'; e.currentTarget.style.color='var(--white)'; }}}
                        onMouseLeave={e => { if (!isActive) { e.currentTarget.style.borderColor='var(--white-08)'; e.currentTarget.style.color='var(--white-70)'; }}}
                      >
                        <span>{o === 'All' ? 'All Directors' : \`\${o}'s Work\`}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </Reveal>`;
if (!s.includes(filterCloseOld)) throw new Error('filter close anchor not found');
s = s.replace(filterCloseOld, filterCloseNew);

// 5) Replace tile inner: use p.poster (image) instead of conditional video/img
const tileOld = `                    <div style={{ position:'relative', width:'100%', height:'100%', overflow:'hidden' }}>
                      {p.platform === 'r2' ? (
                        <video src={p.link} preload="metadata" muted playsInline
                          onLoadedMetadata={e => { const el = e.currentTarget as HTMLVideoElement; try { el.currentTime = 0.5; } catch {} }}
                          style={{ width:'100%', height:'100%', objectFit:'cover', display:'block', transition:'transform 700ms var(--ease-expo), filter 400ms', filter:'brightness(0.85)' }}
                          onMouseEnter={e => { const el = e.currentTarget as HTMLVideoElement; el.style.transform='scale(1.08)'; el.style.filter='brightness(1.0) saturate(1.05)'; el.play().catch(()=>{}); }}
                          onMouseLeave={e => { const el = e.currentTarget as HTMLVideoElement; el.style.transform='scale(1)'; el.style.filter='brightness(0.85)'; el.pause(); el.currentTime = 0.5; }}
                        />
                      ) : (
                        <img src={p.thumb} alt={p.title} loading="lazy"
                          onError={(e) => {
                            const id = p.platform === 'youtube' ? ytId(p.link) : null;
                            if (id && !e.currentTarget.dataset.fallback) {
                              e.currentTarget.dataset.fallback = '1';
                              e.currentTarget.src = ytFallbackThumb(id);
                            }
                          }}
                          style={{ width:'100%', height:'100%', objectFit:'cover', display:'block', transition:'transform 700ms var(--ease-expo), filter 400ms', filter:'brightness(0.85)' }}
                          onMouseEnter={e => { const el = e.currentTarget as HTMLImageElement; el.style.transform='scale(1.12)'; el.style.filter='brightness(1.05) saturate(1.1)'; }}
                          onMouseLeave={e => { const el = e.currentTarget as HTMLImageElement; el.style.transform='scale(1)'; el.style.filter='brightness(0.85)'; }}
                        />
                      )}`;
const tileNew = `                    <div style={{ position:'relative', width:'100%', height:'100%', overflow:'hidden' }}>
                      <img src={p.poster} alt={p.title} loading="lazy"
                        onError={(e) => {
                          const id = p.platform === 'youtube' ? ytId(p.link) : null;
                          if (id && !e.currentTarget.dataset.fallback) {
                            e.currentTarget.dataset.fallback = '1';
                            e.currentTarget.src = ytFallbackThumb(id);
                          }
                        }}
                        style={{ width:'100%', height:'100%', objectFit:'cover', display:'block', transition:'transform 700ms var(--ease-expo), filter 400ms', filter:'brightness(0.85)' }}
                        onMouseEnter={e => { const el = e.currentTarget as HTMLImageElement; el.style.transform='scale(1.12)'; el.style.filter='brightness(1.05) saturate(1.1)'; }}
                        onMouseLeave={e => { const el = e.currentTarget as HTMLImageElement; el.style.transform='scale(1)'; el.style.filter='brightness(0.85)'; }}
                      />`;
if (!s.includes(tileOld)) throw new Error('tile anchor not found');
s = s.replace(tileOld, tileNew);

// 6) Modal: replace getEmbed call
s = s.replace(
  `const embed = getEmbed(project.link, project.platform);`,
  `const embed = getEmbedUrl(project);`
);

// 7) Modal subtitle: don't say 'Instagram' for r2
s = s.replace(
  `{project.cat} · {project.platform === 'youtube' ? 'YouTube' : 'Instagram'}`,
  `{project.cat}{project.platform === 'youtube' ? ' · YouTube' : project.platform === 'instagram' ? ' · Instagram' : ''}`
);

fs.writeFileSync(p, s, 'utf8');
console.log('OK. New length:', s.length);
