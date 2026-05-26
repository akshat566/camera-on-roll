'use client';
import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal } from '@/components/Reveal';
import { ALL_PROJECTS, CATEGORIES, OWNERS, getEmbedUrl, type Project } from '@/lib/work-data';

const E = [0.22, 0.58, 0.32, 1] as const;
/** Bounce-out easing for hover pop. */
const POP_EASE = [0.34, 1.56, 0.64, 1] as const;

function ytFallbackThumb(id: string) {
  return `https://i.ytimg.com/vi/${id}/mqdefault.jpg`;
}

function ytId(link: string): string | null {
  const m = link.match(/(?:youtu\.be\/|v=|\/embed\/)([\w-]{6,})/);
  return m ? m[1] : null;
}

const CATS = [...CATEGORIES, 'AI Driven'] as const;

/* PROJECTS data is centralised in lib/work-data.ts */
const PROJECTS = ALL_PROJECTS;

const YT_PLAYLISTS = [
  { label:'All AI Videos', count:'Full Archive', img:'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80', href:'https://youtube.com/playlist?list=PLG-syaA8JTVSuD4tT7jowF09G74Hrhhbt&si=_AEGU_Ndq0CAnlDF' },
  { label:'UGC',           count:'Performance', img:'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80', href:'https://youtube.com/playlist?list=PLG-syaA8JTVQ8X0BgkggPsSmK_gORhMh7&si=KAp_n920rllE_o1o' },
  { label:'Music Videos',  count:'Narrative',   img:'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=800&q=80', href:'https://youtube.com/playlist?list=PLG-syaA8JTVSVgpPzfRmvVwRyRNTb-nud&si=gEvluH0BhEwKaTNg' },
  { label:'Trailers',      count:'Cinematic',   img:'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&q=80', href:'https://youtube.com/playlist?list=PLG-syaA8JTVSVcKe2yOz4RZzSO1uU5B-u&si=n9G0j8W9bWuus8xw' },
  { label:'Ads',           count:'Commercial',  img:'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80', href:'https://youtube.com/playlist?list=PLG-syaA8JTVRcHscxlQSDw8mnTNnURXz_&si=brVIFPIS0LjNfJk1' },
];

function ArrowIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M2 12L12 2M12 2H5M12 2V9"/>
    </svg>
  );
}

export default function WorkPage() {
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
  }, [active, owner]);

  // Lock page scroll + ESC-to-close while modal is open
  useEffect(() => {
    if (!modal) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setModal(null); };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [modal]);

  return (
    <>
      {/* ── HEADER + GALLERY: split layout, full-bleed, title sticky on left ── */}
      <section id="grid" style={{ paddingTop:'calc(var(--nav-h) + clamp(16px,2vw,28px))', paddingBottom:'clamp(40px,5vw,72px)', paddingLeft:'clamp(20px,3vw,40px)', paddingRight:'clamp(20px,3vw,40px)' }}>
        <div className="work-split" style={{ display:'grid', gridTemplateColumns:'minmax(200px, 260px) 1fr', gap:'clamp(28px,3.5vw,56px)', alignItems:'start', maxWidth:'100%' }}>

          {/* ── LEFT: title block — sticky so it sits in the centre of the gallery while scrolling ── */}
          <aside style={{
            position:'sticky',
            top:'calc(var(--nav-h) + 24px)',
            alignSelf:'start',
            maxHeight:'calc(100vh - var(--nav-h) - 32px)',
            overflow:'auto',
            paddingRight:'4px',
          }} className="work-aside">
            <Reveal>
              <p style={{ fontFamily:'var(--font-body)', fontSize:'10px', fontWeight:700, letterSpacing:'0.42em', textTransform:'uppercase', color:'var(--accent)', margin:'0 0 14px', display:'inline-flex', alignItems:'center', gap:'12px' }}>
                <span style={{ display:'inline-block', width:'24px', height:'1px', background:'var(--accent)' }} />
                Portfolio
              </p>
            </Reveal>
            <Reveal delay={0.06}>
              <h1 style={{
                fontFamily:'var(--font-display)',
                fontSize:'clamp(40px,4.5vw,68px)',
                textTransform:'uppercase', lineHeight:0.9,
                letterSpacing:'-0.02em',
                color:'var(--white)', margin:'0 0 18px',
              }}>
                Our Work.
              </h1>
            </Reveal>
            {/* Filter — vertical stack of chips */}
            <Reveal delay={0.16}>
              <div style={{ borderTop:'1px solid var(--white-08)', paddingTop:'18px' }}>
                <p style={{ fontFamily:'var(--font-body)', fontSize:'9px', fontWeight:700, letterSpacing:'0.36em', textTransform:'uppercase', color:'var(--white-40)', margin:'0 0 12px' }}>
                  Filter
                </p>
                <div style={{ display:'flex', flexDirection:'column', gap:'4px' }}>
                  {CATS.map(c => {
                    const isActive = active === c;
                    return (
                      <button key={c} onClick={() => setActive(c)}
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
                        <span>{c}</span>
                      </button>
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
                        <span>{o === 'All' ? 'All Directors' : `${o}'s Work`}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          </aside>

          {/* ── RIGHT: gallery ─────────────────────────── */}
          <div style={{ minWidth:0 }}>

          {/* When AI Driven filter is selected → show YouTube playlists inline (no project tiles exist) */}
          <AnimatePresence mode="wait">
            {active === 'AI Driven' ? (
              <motion.div key="ai-driven"
                initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}
                transition={{ duration:0.35, ease:E }}
              >
                {/* Compact inline header strip */}
                <Reveal>
                  <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:'18px', flexWrap:'wrap', marginBottom:'14px' }}>
                    <div>
                      <p style={{ fontFamily:'var(--font-body)', fontSize:'9px', fontWeight:700, letterSpacing:'0.4em', textTransform:'uppercase', color:'var(--accent)', margin:'0 0 4px' }}>Watch on YouTube</p>
                      <p style={{ fontFamily:'var(--font-body)', fontSize:'12px', lineHeight:1.6, color:'var(--white-70)', margin:0 }}>
                        Curated playlists of our AI-driven work — music videos, trailers, ads, UGC.
                      </p>
                    </div>
                    <a href="https://www.youtube.com/@cameraonrollproduction" target="_blank" rel="noopener noreferrer"
                      style={{ display:'inline-flex', alignItems:'center', gap:'8px', padding:'9px 16px', border:'1px solid var(--white-20)', color:'var(--white-70)', fontFamily:'var(--font-body)', fontSize:'9px', fontWeight:700, letterSpacing:'0.22em', textTransform:'uppercase', textDecoration:'none', transition:'all 220ms' }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor='var(--accent)'; e.currentTarget.style.color='var(--accent)'; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor='var(--white-20)'; e.currentTarget.style.color='var(--white-70)'; }}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
                      Subscribe
                    </a>
                  </div>
                </Reveal>

                {/* Playlist cards — full-width grid of the gallery column */}
                <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))', gap:'4px' }}>
                  {YT_PLAYLISTS.map((pl, i) => (
                    <motion.a key={pl.label} href={pl.href} target="_blank" rel="noopener noreferrer"
                      initial={{ opacity:0, y:18, scale:0.97 }} animate={{ opacity:1, y:0, scale:1 }}
                      transition={{ duration:0.5, delay:0.06 + i*0.06, ease:E }}
                      whileHover={{ y:-4 }}
                      style={{
                        position:'relative', display:'block', aspectRatio:'4/5',
                        overflow:'hidden', border:'1px solid var(--white-08)', background:'#0a0a09',
                        textDecoration:'none', transition:'border-color 400ms, box-shadow 400ms',
                      }}
                      onMouseEnter={e => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.borderColor='var(--accent)';
                        el.style.boxShadow='0 24px 60px rgba(232,23,106,0.32)';
                        const img = el.querySelector('.pl-img') as HTMLElement | null; if (img) { img.style.transform='scale(1.08)'; img.style.filter='brightness(0.7)'; }
                        const play = el.querySelector('.pl-play') as HTMLElement | null; if (play) { play.style.transform='translate(-50%,-50%) scale(1.15)'; play.style.boxShadow='0 0 40px rgba(232,23,106,0.6)'; }
                      }}
                      onMouseLeave={e => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.borderColor='var(--white-08)';
                        el.style.boxShadow='none';
                        const img = el.querySelector('.pl-img') as HTMLElement | null; if (img) { img.style.transform='scale(1)'; img.style.filter='brightness(0.55)'; }
                        const play = el.querySelector('.pl-play') as HTMLElement | null; if (play) { play.style.transform='translate(-50%,-50%) scale(1)'; play.style.boxShadow='0 0 20px rgba(232,23,106,0.35)'; }
                      }}
                    >
                      <img src={pl.img} alt="" loading="lazy" className="pl-img"
                        style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', filter:'brightness(0.55)', transition:'transform 700ms var(--ease-expo), filter 400ms' }} />
                      <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(9,9,8,0.92) 0%, rgba(9,9,8,0.4) 45%, rgba(9,9,8,0.15) 100%)' }} />

                      <span style={{ position:'absolute', top:'12px', left:'12px', fontFamily:'var(--font-body)', fontSize:'8px', fontWeight:700, letterSpacing:'0.28em', textTransform:'uppercase', padding:'5px 9px', background:'rgba(232,23,106,0.85)', color:'#fff' }}>
                        {pl.count}
                      </span>
                      <span style={{ position:'absolute', top:'12px', right:'12px', display:'flex', alignItems:'center', gap:'5px', fontFamily:'var(--font-body)', fontSize:'8px', fontWeight:700, letterSpacing:'0.22em', textTransform:'uppercase', padding:'5px 8px', background:'rgba(9,9,8,0.7)', color:'var(--white-70)' }}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
                        YT
                      </span>

                      <div className="pl-play" style={{
                        position:'absolute', top:'45%', left:'50%', transform:'translate(-50%,-50%) scale(1)',
                        width:'54px', height:'54px', borderRadius:'50%',
                        background:'var(--accent)', color:'#fff',
                        display:'flex', alignItems:'center', justifyContent:'center',
                        boxShadow:'0 0 20px rgba(232,23,106,0.35)',
                        transition:'transform 350ms var(--ease-expo), box-shadow 350ms',
                        pointerEvents:'none',
                      }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft:'3px' }}><path d="M8 5v14l11-7z"/></svg>
                      </div>

                      <div style={{ position:'absolute', bottom:'14px', left:'14px', right:'14px' }}>
                        <p style={{ fontFamily:'var(--font-display)', fontSize:'clamp(14px,1.4vw,18px)', textTransform:'uppercase', color:'#fff', lineHeight:1.05, margin:'0 0 6px', letterSpacing:'0.005em', textShadow:'0 2px 12px rgba(0,0,0,0.6)' }}>{pl.label}</p>
                        <p style={{ fontFamily:'var(--font-body)', fontSize:'9px', letterSpacing:'0.24em', textTransform:'uppercase', color:'var(--accent)', margin:0, fontWeight:600 }}>View Playlist →</p>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            ) : (
            <motion.div key={active}
              initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}
              transition={{ duration:0.35, ease:E }}
              style={{
                display:'grid',
                gridTemplateColumns:'repeat(6, 1fr)',
                gridAutoRows:'clamp(100px, 10vw, 160px)',
                gridAutoFlow:'dense',
                gap:'4px',
              }}
            >
              {filtered.map((p, i) => {
                const isV = p.orientation === 'v';
                // Consistent spans based on orientation for clean layout:
                // Vertical (9:16) → 2 cols × 4 rows  (portrait ~0.56, close to 9:16)
                // Horizontal (16:9) → 3 cols × 2 rows (landscape ~1.7, close to 16:9)
                const c = isV ? 2 : 3;
                const r = isV ? 4 : 2;
                return (
                <motion.div key={p.id}
                  initial={{ opacity:0, scale:0.96 }} animate={{ opacity:1, scale:1 }}
                  transition={{ duration:0.45, delay:(i%6)*0.06, ease:E }}
                  whileHover={{ y:-10, scale:1.035, zIndex:5, transition: { duration: 0.4, ease: POP_EASE } }}
                  style={{ gridColumn:`span ${c}`, gridRow:`span ${r}`, position:'relative' }}
                >
                  <button type="button" onClick={() => setModal(p)} aria-label={`Play ${p.title} — ${p.client}`}
                    style={{ display:'block', width:'100%', height:'100%', padding:0, border:'none', textAlign:'left', textDecoration:'none', position:'relative', background:'#111', cursor:'pointer', transition:'box-shadow 350ms' }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.boxShadow = '0 30px 80px rgba(232,23,106,0.45), 0 0 0 1.5px rgba(232,23,106,0.7), 0 0 60px rgba(232,23,106,0.2)';
                      const play = el.querySelector('.tile-play') as HTMLElement | null;
                      if (play) { play.style.opacity = '1'; play.style.transform = 'translate(-50%,-50%) scale(1)'; }
                      const info = el.querySelector('.tile-info') as HTMLElement | null;
                      if (info) { info.style.opacity = '1'; }
                      const cat = el.querySelector('.tile-cat') as HTMLElement | null;
                      if (cat) { cat.style.opacity = '1'; }
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.boxShadow = 'none';
                      const play = el.querySelector('.tile-play') as HTMLElement | null;
                      if (play) { play.style.opacity = '0'; play.style.transform = 'translate(-50%,-50%) scale(0.6)'; }
                      const info = el.querySelector('.tile-info') as HTMLElement | null;
                      if (info) { info.style.opacity = '0'; }
                      const cat = el.querySelector('.tile-cat') as HTMLElement | null;
                      if (cat) { cat.style.opacity = '0'; }
                    }}
                  >
                    <div style={{ position:'relative', width:'100%', height:'100%', overflow:'hidden', background:'linear-gradient(135deg, #1a0a10 0%, #0d0d0c 50%, #1a0a10 100%)' }}>
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
                      />
                      <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(9,9,8,0.85) 0%, transparent 45%)' }} />

                      {/* Big play badge that fades in on hover */}
                      <div className="tile-play" style={{
                        position:'absolute', top:'50%', left:'50%',
                        transform:'translate(-50%,-50%) scale(0.6)',
                        width:'56px', height:'56px', borderRadius:'50%',
                        background:'var(--accent)', color:'#fff',
                        display:'flex', alignItems:'center', justifyContent:'center',
                        opacity:0, pointerEvents:'none',
                        boxShadow:'0 0 40px rgba(232,23,106,0.6)',
                        transition:'opacity 300ms, transform 400ms var(--ease-expo)',
                      }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft:'3px' }}><path d="M8 5v14l11-7z"/></svg>
                      </div>

                      <span className="tile-cat" style={{ position:'absolute', top:'10px', left:'10px', fontFamily:'var(--font-body)', fontSize:'8px', fontWeight:700, letterSpacing:'0.24em', textTransform:'uppercase', padding:'4px 9px', background:'rgba(9,9,8,0.8)', color:'var(--accent)', opacity:0, transition:'opacity 300ms' }}>{p.cat}</span>
                      <span style={{ position:'absolute', bottom:'12px', right:'12px', width:'28px', height:'28px', display:'flex', alignItems:'center', justifyContent:'center', background:'rgba(9,9,8,0.85)', color:'var(--white)', border:'1px solid var(--accent)', transition:'all 250ms' }}>
                        <ArrowIcon />
                      </span>
                      <div className="tile-info" style={{ position:'absolute', bottom:'12px', left:'12px', right:'48px', opacity:0, transition:'opacity 300ms' }}>
                        <p style={{ fontFamily:'var(--font-display)', fontSize:'clamp(12px,1.25vw,16px)', textTransform:'uppercase', color:'var(--white)', margin:'0 0 2px', lineHeight:1.1, letterSpacing:'0.01em' }}>{p.title}</p>
                        <p style={{ fontFamily:'var(--font-body)', fontSize:'9px', letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--white-70)', margin:0 }}>{p.client}</p>
                      </div>
                    </div>
                  </button>
                </motion.div>
              )})}

              {/* Inline CTA tile — always renders at end so the grid is never sparse */}
              <motion.a
                key="cta-tile"
                href="/contact"
                initial={{ opacity:0, scale:0.96 }} animate={{ opacity:1, scale:1 }}
                transition={{ duration:0.45, delay:0.1, ease:E }}
                whileHover={{ y:-10, scale:1.035, zIndex:5, transition:{ duration:0.4, ease:POP_EASE } }}
                style={{
                  gridColumn:'span 2', gridRow:'span 2',
                  position:'relative',
                  display:'flex', flexDirection:'column', justifyContent:'space-between',
                  padding:'clamp(18px,1.8vw,28px)',
                  background:'linear-gradient(135deg, rgba(232,23,106,0.18) 0%, rgba(232,23,106,0.04) 100%)',
                  border:'1px solid var(--accent-dim)',
                  textDecoration:'none',
                  overflow:'hidden',
                  transition:'box-shadow 350ms',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 30px 80px rgba(232,23,106,0.45), inset 0 0 0 1px var(--accent)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
              >
                <div style={{ position:'absolute', top:'-30%', right:'-20%', width:'200px', height:'200px', borderRadius:'50%', background:'radial-gradient(circle, rgba(232,23,106,0.35), transparent 70%)', filter:'blur(20px)', pointerEvents:'none' }} />
                <p style={{ fontFamily:'var(--font-body)', fontSize:'9px', fontWeight:700, letterSpacing:'0.32em', textTransform:'uppercase', color:'var(--accent)', margin:0, position:'relative' }}>
                  Next Project
                </p>
                <div style={{ position:'relative' }}>
                  <p style={{ fontFamily:'var(--font-display)', fontSize:'clamp(18px,1.8vw,26px)', textTransform:'uppercase', color:'#fff', lineHeight:1, margin:'0 0 6px', letterSpacing:'-0.01em' }}>
                    Let&apos;s Make<br/>Yours Next.
                  </p>
                  <p style={{ fontFamily:'var(--font-body)', fontSize:'10px', fontWeight:600, letterSpacing:'0.24em', textTransform:'uppercase', color:'var(--accent)', margin:0, display:'inline-flex', alignItems:'center', gap:'8px' }}>
                    Start a Conversation
                    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M2 12L12 2M12 2H5M12 2V9"/></svg>
                  </p>
                </div>
              </motion.a>
            </motion.div>
            )}
          </AnimatePresence>
          </div>{/* /right column */}
        </div>{/* /cx grid */}
      </section>

      {/* "Have a Project in Mind?" CTA is now inline as a tile at the end of the grid (above) */}

      {/* ── WATCH ON YOUTUBE — hidden on AI Driven (already shown inline) ── */}
      {active !== 'AI Driven' && (
        <section style={{ borderTop:'1px solid var(--white-08)', padding:'40px 0' }}>
          <div className="cx">
            <div style={{ display:'grid', gridTemplateColumns:'auto 1fr', gap:'40px', alignItems:'center' }}>
              <Reveal>
                <div>
                  <p style={{ fontFamily:'var(--font-body)', fontSize:'8px', fontWeight:600, letterSpacing:'0.4em', textTransform:'uppercase', color:'var(--accent)', marginBottom:'6px' }}>AI Driven Videos</p>
                  <div style={{ fontFamily:'var(--font-display)', fontSize:'clamp(22px,3vw,36px)', textTransform:'uppercase', lineHeight:0.9, color:'var(--white)' }}>
                    Watch on<br />YouTube
                  </div>
                </div>
              </Reveal>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(5, 1fr)', gap:'8px' }}>
                {YT_PLAYLISTS.map((pl, i) => (
                  <Reveal key={pl.label} delay={i*0.04}>
                    <a href={pl.href} target="_blank" rel="noopener noreferrer"
                      style={{
                        display:'flex', flexDirection:'column', gap:'6px',
                        padding:'14px 16px',
                        border:'1px solid var(--white-08)',
                        textDecoration:'none',
                        transition:'border-color 300ms',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor='var(--accent-dim)'; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor='var(--white-08)'; }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--accent)" style={{ flexShrink:0 }}><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
                      <span style={{ fontFamily:'var(--font-display)', fontSize:'11px', textTransform:'uppercase', color:'var(--white)', lineHeight:1.2 }}>{pl.label}</span>
                      <span style={{ fontFamily:'var(--font-body)', fontSize:'9px', letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--white-40)' }}>View Playlist →</span>
                    </a>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
      {/* ── VIDEO MODAL ───────────────────────────── */}
      <AnimatePresence>
        {modal && (
          <ProjectModal project={modal} onClose={() => setModal(null)} />
        )}
      </AnimatePresence>
    </>
  );
}

/** Fullscreen-capable inline player modal for YouTube + Instagram links. */
function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const embed = getEmbedUrl(project);
  const playerRef = useRef<HTMLDivElement>(null);
  const isV = project.orientation === 'v';

  const goFullscreen = () => {
    const el = playerRef.current;
    if (!el) return;
    if (document.fullscreenElement) {
      document.exitFullscreen?.();
    } else {
      el.requestFullscreen?.();
    }
  };

  return (
    <motion.div
      initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
      transition={{ duration:0.25 }}
      onClick={onClose}
      style={{
        position:'fixed', inset:0, zIndex:100,
        background:'rgba(9,9,8,0.92)', backdropFilter:'blur(14px)',
        display:'flex', alignItems:'center', justifyContent:'center',
        padding:'clamp(16px, 4vw, 64px)',
      }}
    >
      <motion.div
        initial={{ scale:0.94, y:20, opacity:0 }} animate={{ scale:1, y:0, opacity:1 }} exit={{ scale:0.96, opacity:0 }}
        transition={{ duration:0.35, ease:E }}
        onClick={e => e.stopPropagation()}
        style={{
          position:'relative',
          width: isV ? 'min(420px, 100%)' : 'min(1100px, 100%)',
          maxHeight: '90vh',
          display:'flex', flexDirection:'column', gap:'12px',
        }}
      >
        {/* Top bar: title + actions */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:'12px', flexWrap:'wrap' }}>
          <div>
            <p style={{ fontFamily:'var(--font-body)', fontSize:'9px', fontWeight:700, letterSpacing:'0.3em', textTransform:'uppercase', color:'var(--accent)', margin:'0 0 4px' }}>
              {project.cat}{project.platform === 'youtube' ? ' · YouTube' : project.platform === 'instagram' ? ' · Instagram' : ''}
            </p>
            <h3 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(18px,2vw,26px)', textTransform:'uppercase', color:'var(--white)', margin:'0 0 2px', lineHeight:1.05, letterSpacing:'0.01em' }}>{project.title}</h3>
            <p style={{ fontFamily:'var(--font-body)', fontSize:'10px', letterSpacing:'0.22em', textTransform:'uppercase', color:'var(--white-70)', margin:0 }}>{project.client}</p>
          </div>
          <div style={{ display:'flex', gap:'8px' }}>
            <button onClick={goFullscreen} aria-label="Fullscreen"
              style={{ width:'40px', height:'40px', display:'inline-flex', alignItems:'center', justifyContent:'center', background:'transparent', border:'1px solid var(--white-20)', color:'var(--white-70)', cursor:'pointer', transition:'all 200ms' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor='var(--accent)'; e.currentTarget.style.color='var(--accent)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor='var(--white-20)'; e.currentTarget.style.color='var(--white-70)'; }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9V5a2 2 0 0 1 2-2h4M21 9V5a2 2 0 0 0-2-2h-4M3 15v4a2 2 0 0 0 2 2h4M21 15v4a2 2 0 0 1-2 2h-4"/>
              </svg>
            </button>
            <a href={project.link} target="_blank" rel="noopener noreferrer" aria-label="Open original"
              style={{ display:'inline-flex', alignItems:'center', gap:'8px', padding:'0 16px', height:'40px', background:'transparent', border:'1px solid var(--white-20)', color:'var(--white-70)', fontFamily:'var(--font-body)', fontSize:'10px', fontWeight:700, letterSpacing:'0.22em', textTransform:'uppercase', textDecoration:'none', cursor:'pointer', transition:'all 200ms' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor='var(--accent)'; e.currentTarget.style.color='var(--accent)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor='var(--white-20)'; e.currentTarget.style.color='var(--white-70)'; }}
            >
              Open Original
              <svg width="10" height="10" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 12L12 2M12 2H5M12 2V9"/></svg>
            </a>
            <button onClick={onClose} aria-label="Close"
              style={{ width:'40px', height:'40px', display:'inline-flex', alignItems:'center', justifyContent:'center', background:'var(--accent)', border:'none', color:'#fff', cursor:'pointer', transition:'box-shadow 200ms' }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow='0 0 30px rgba(232,23,106,0.4)'; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow='none'; }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M18 6L6 18"/></svg>
            </button>
          </div>
        </div>

        {/* Player — aspect ratio follows orientation */}
        <div ref={playerRef} style={{
          position:'relative',
          width:'100%',
          aspectRatio: isV ? '9 / 16' : '16 / 9',
          maxHeight: isV ? 'min(80vh, 720px)' : 'min(72vh, 620px)',
          background:'#000',
          border:'1px solid var(--white-08)',
          boxShadow:'0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(232,23,106,0.18)',
          overflow:'hidden',
        }}>
          {project.platform === 'r2' ? (
            <video src={project.link} controls autoPlay playsInline
              style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'contain', background:'#000' }}
            />
          ) : embed ? (
            <iframe
              src={embed}
              title={project.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{ position:'absolute', inset:0, width:'100%', height:'100%', border:'none' }}
            />
          ) : (
            <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', color:'var(--white-70)', fontFamily:'var(--font-body)', fontSize:'12px', letterSpacing:'0.18em', textTransform:'uppercase', textAlign:'center', padding:'24px' }}>
              Preview unavailable.<br/>Use &ldquo;Open Original&rdquo; to watch.
            </div>
          )}
        </div>

        {/* Hint footer */}
        <p style={{ fontFamily:'var(--font-body)', fontSize:'9px', letterSpacing:'0.28em', textTransform:'uppercase', color:'var(--white-40)', margin:0, textAlign:'center' }}>
          Press ESC or click outside to close
        </p>
      </motion.div>
    </motion.div>
  );
}
