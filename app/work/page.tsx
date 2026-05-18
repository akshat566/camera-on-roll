'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal } from '@/components/Reveal';

const E = [0.22, 0.58, 0.32, 1] as const;

function ytThumb(id: string) {
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
}

const CATS = ['All', 'Brand Reels', 'Podcasts', 'Product', 'AI Driven'];

type Project = {
  id: number;
  cat: string;
  title: string;
  client: string;
  link: string;
  thumb: string;
  platform: 'youtube' | 'instagram';
};

const PROJECTS: Project[] = [
  { id:1,  cat:'Brand Reels', client:'Samay Raina',     title:'Brand Reel',         link:'https://www.instagram.com/p/DLzwCLPCRzS/', thumb:'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=800&q=80', platform:'instagram' },
  { id:2,  cat:'Brand Reels', client:'Uorfi Javed',     title:'Brand Reel 1',       link:'https://www.instagram.com/p/DF1v6VrtsAY/', thumb:'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&q=80', platform:'instagram' },
  { id:3,  cat:'Brand Reels', client:'Uorfi Javed',     title:'Brand Reel 2',       link:'https://www.instagram.com/p/DJmKjLWNf28/', thumb:'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80', platform:'instagram' },
  { id:4,  cat:'Brand Reels', client:'Uorfi Javed',     title:'Brand Reel 3',       link:'https://www.instagram.com/p/DKZpF8ONbpx/', thumb:'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80', platform:'instagram' },
  { id:5,  cat:'Brand Reels', client:'Uorfi Javed',     title:'Brand Reel 4',       link:'https://www.instagram.com/p/DMxYfwFNqJK/', thumb:'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80', platform:'instagram' },
  { id:6,  cat:'Brand Reels', client:'Uorfi Javed',     title:'Brand Reel 5',       link:'https://www.instagram.com/p/DNVhSG6S3M-/', thumb:'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=800&q=80', platform:'instagram' },
  { id:7,  cat:'Brand Reels', client:'Uorfi Javed',     title:'Brand Reel 6',       link:'https://www.instagram.com/p/DNnXdKEtIea/', thumb:'https://images.unsplash.com/photo-1574169208507-84376144848b?w=800&q=80', platform:'instagram' },
  { id:8,  cat:'Brand Reels', client:'Uorfi Javed',     title:'Brand Reel 7',       link:'https://www.instagram.com/p/DOij00UEu03/', thumb:'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80', platform:'instagram' },
  { id:9,  cat:'Brand Reels', client:'Santanu Hazarika', title:'Brand Reel 1',      link:'https://www.instagram.com/p/DGVWzIwI4Ns/', thumb:'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80', platform:'instagram' },
  { id:10, cat:'Brand Reels', client:'Santanu Hazarika', title:'Brand Reel 2',      link:'https://www.instagram.com/p/DGe1Bk6IZYO/?img_index=1', thumb:'https://images.unsplash.com/photo-1536240478700-b869ad10e128?w=800&q=80', platform:'instagram' },
  { id:11, cat:'Brand Reels', client:'Santanu Hazarika', title:'Brand Reel 3',      link:'https://www.instagram.com/p/DOakmKEksgJ/', thumb:'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80', platform:'instagram' },
  { id:12, cat:'Brand Reels', client:'Santanu Hazarika', title:'Brand Reel 4',      link:'https://www.instagram.com/p/DPGvEcyEh8y/', thumb:'https://images.unsplash.com/photo-1574169208507-84376144848b?w=800&q=80', platform:'instagram' },
  { id:13, cat:'Podcasts',    client:'NPCI',             title:'Podcast Episode 1', link:'https://youtu.be/KHl8rzSUGWk', thumb:ytThumb('KHl8rzSUGWk'), platform:'youtube' },
  { id:14, cat:'Podcasts',    client:'NPCI',             title:'Podcast Episode 2', link:'https://youtu.be/lwl5v5K_Vco', thumb:ytThumb('lwl5v5K_Vco'), platform:'youtube' },
  { id:15, cat:'Podcasts',    client:'NPCI',             title:'Podcast Episode 3', link:'https://youtu.be/osuR5mV8QGI', thumb:ytThumb('osuR5mV8QGI'), platform:'youtube' },
  { id:16, cat:'Podcasts',    client:'NPCI',             title:'Podcast Episode 4', link:'https://youtu.be/iqIlbXxfV5g', thumb:ytThumb('iqIlbXxfV5g'), platform:'youtube' },
  { id:17, cat:'Podcasts',    client:'TATA AIA',         title:'Podcast Episode 1', link:'https://youtu.be/pXotTJIzbXw', thumb:ytThumb('pXotTJIzbXw'), platform:'youtube' },
  { id:18, cat:'Podcasts',    client:'TATA AIA',         title:'Podcast Episode 2', link:'https://youtu.be/5ORdSPEHvjI', thumb:ytThumb('5ORdSPEHvjI'), platform:'youtube' },
  { id:19, cat:'Podcasts',    client:'TATA AIA',         title:'Podcast Episode 3', link:'https://youtu.be/EW76GrxnQU4', thumb:ytThumb('EW76GrxnQU4'), platform:'youtube' },
  { id:20, cat:'Product',     client:'Parachute',        title:'Influencer Holi Reel', link:'https://youtu.be/ECkslerq9Rk', thumb:ytThumb('ECkslerq9Rk'), platform:'youtube' },
  { id:21, cat:'Product',     client:'Complan',          title:'Product Commercial', link:'https://www.youtube.com/watch?v=df9Pco1Xuow', thumb:ytThumb('df9Pco1Xuow'), platform:'youtube' },
];

const YT_PLAYLISTS = [
  { label:'All AI Videos', href:'https://youtube.com/playlist?list=PLG-syaA8JTVSuD4tT7jowF09G74Hrhhbt&si=_AEGU_Ndq0CAnlDF' },
  { label:'UGC',           href:'https://youtube.com/playlist?list=PLG-syaA8JTVQ8X0BgkggPsSmK_gORhMh7&si=KAp_n920rllE_o1o' },
  { label:'Music Videos',  href:'https://youtube.com/playlist?list=PLG-syaA8JTVSVgpPzfRmvVwRyRNTb-nud&si=gEvluH0BhEwKaTNg' },
  { label:'Trailers',      href:'https://youtube.com/playlist?list=PLG-syaA8JTVSVcKe2yOz4RZzSO1uU5B-u&si=n9G0j8W9bWuus8xw' },
  { label:'Ads',           href:'https://youtube.com/playlist?list=PLG-syaA8JTVRcHscxlQSDw8mnTNnURXz_&si=brVIFPIS0LjNfJk1' },
];

function ArrowIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M2 12L12 2M12 2H5M12 2V9"/>
    </svg>
  );
}

export default function WorkPage() {
  const [active, setActive] = useState('All');
  const filtered = active === 'All' ? PROJECTS : PROJECTS.filter(p => p.cat === active);
  const cols = (active === 'Podcasts' || active === 'Product') ? 4 : 3;

  return (
    <>
      {/* ── HERO HEADER ─────────────────────────────── */}
      <section style={{
        position:'relative', paddingTop:'var(--nav-h)',
        overflow:'hidden', borderBottom:'1px solid var(--white-08)',
      }}>
        {/* hero bg image */}
        <div style={{ position:'absolute', inset:0, zIndex:0 }}>
          <img
            src="https://images.unsplash.com/photo-1601506521793-dc748fc80b67?w=1600&q=85"
            alt=""
            style={{ width:'100%', height:'100%', objectFit:'cover', opacity:0.18, filter:'grayscale(40%)' }}
          />
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(90deg, var(--black) 50%, transparent 100%)' }} />
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, var(--black) 0%, transparent 60%)' }} />
        </div>

        <div className="cx" style={{ position:'relative', zIndex:1, display:'grid', gridTemplateColumns:'1fr 1fr', alignItems:'center', gap:'40px', paddingTop:'48px', paddingBottom:'48px', minHeight:'300px' }}>
          <div>
            <Reveal>
              <p style={{ fontFamily:'var(--font-body)', fontSize:'10px', fontWeight:600, letterSpacing:'0.4em', textTransform:'uppercase', color:'var(--accent)', marginBottom:'12px' }}>Portfolio</p>
              <h1 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(52px,8vw,108px)', textTransform:'uppercase', lineHeight:0.85, letterSpacing:'-0.02em', color:'var(--white)', marginBottom:'20px' }}>
                Our Work.
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p style={{ fontFamily:'var(--font-body)', fontSize:'13px', fontWeight:400, lineHeight:1.8, color:'var(--white-40)', maxWidth:'380px', marginBottom:'24px' }}>
                A collection of films, campaigns, and stories we&apos;ve crafted for brands, artists, and visionaries.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <a href="#grid" style={{
                fontFamily:'var(--font-body)', fontSize:'9px', fontWeight:600,
                letterSpacing:'0.28em', textTransform:'uppercase',
                padding:'11px 24px', border:'1px solid var(--white-20)', color:'var(--white-40)',
                display:'inline-flex', alignItems:'center', gap:'8px',
                transition:'border-color 300ms, color 300ms',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor='var(--accent)'; e.currentTarget.style.color='var(--white)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor='var(--white-20)'; e.currentTarget.style.color='var(--white-40)'; }}
              >
                Scroll to Explore
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 1v8M1 5l4 4 4-4"/></svg>
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── FILTER BAR + GRID ───────────────────────── */}
      <section id="grid" style={{ paddingTop:'0' }}>
        <div className="cx">
          {/* Filter bar */}
          <div style={{
            display:'flex', alignItems:'center', justifyContent:'space-between',
            padding:'14px 0', borderBottom:'1px solid var(--white-08)',
            flexWrap:'wrap', gap:'8px',
          }}>
            <div style={{ display:'flex', gap:'4px', flexWrap:'wrap' }}>
              {CATS.map(c => (
                <button key={c} onClick={() => setActive(c)}
                  style={{
                    fontFamily:'var(--font-body)', fontSize:'9px', fontWeight:600,
                    letterSpacing:'0.22em', textTransform:'uppercase',
                    padding:'7px 16px',
                    border: 'none',
                    background: active === c ? 'var(--accent)' : 'transparent',
                    color: active === c ? '#fff' : 'var(--white-40)',
                    cursor:'pointer',
                    transition:'background 200ms, color 200ms',
                  }}>
                  {c}
                </button>
              ))}
            </div>
            <div style={{ fontFamily:'var(--font-body)', fontSize:'9px', fontWeight:500, letterSpacing:'0.22em', textTransform:'uppercase', color:'var(--white-20)', display:'flex', alignItems:'center', gap:'6px' }}>
              Sort By: <span style={{ color:'var(--white-60)' }}>Latest ▾</span>
            </div>
          </div>

          {/* Grid */}
          <AnimatePresence mode="wait">
            <motion.div key={active}
              initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}
              transition={{ duration:0.35, ease:E }}
              style={{
                display:'grid',
                gridTemplateColumns:`repeat(${cols}, 1fr)`,
                gap:'2px',
                paddingTop:'2px',
              }}
            >
              {filtered.map((p, i) => (
                <motion.div key={p.id}
                  initial={{ opacity:0 }} animate={{ opacity:1 }}
                  transition={{ duration:0.4, delay:i*0.03, ease:E }}
                >
                  <a href={p.link} target="_blank" rel="noopener noreferrer"
                    style={{ display:'block', textDecoration:'none', position:'relative', background:'var(--surface)' }}
                  >
                    {/* Thumbnail */}
                    <div style={{ position:'relative', aspectRatio:'16/9', overflow:'hidden' }}>
                      <img src={p.thumb} alt={p.title} loading="lazy"
                        style={{ width:'100%', height:'100%', objectFit:'cover', display:'block', transition:'transform 600ms var(--ease-expo), filter 400ms', filter:'brightness(0.9)' }}
                        onMouseEnter={e => { const el = e.currentTarget as HTMLImageElement; el.style.transform='scale(1.05)'; el.style.filter='brightness(1)'; }}
                        onMouseLeave={e => { const el = e.currentTarget as HTMLImageElement; el.style.transform='scale(1)'; el.style.filter='brightness(0.9)'; }}
                      />
                      {/* Category label — top left */}
                      <span style={{
                        position:'absolute', top:'10px', left:'10px',
                        fontFamily:'var(--font-body)', fontSize:'7px', fontWeight:700,
                        letterSpacing:'0.24em', textTransform:'uppercase',
                        padding:'3px 8px', background:'rgba(9,9,8,0.75)', color:'var(--accent)',
                      }}>
                        {p.cat}
                      </span>
                      {/* Arrow — bottom right */}
                      <span style={{
                        position:'absolute', bottom:'10px', right:'10px',
                        width:'28px', height:'28px', display:'flex', alignItems:'center', justifyContent:'center',
                        background:'rgba(9,9,8,0.75)', color:'var(--white-60)',
                        transition:'background 250ms, color 250ms',
                      }}
                      onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background='var(--accent)'; el.style.color='#fff'; }}
                      onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background='rgba(9,9,8,0.75)'; el.style.color='var(--white-60)'; }}
                      >
                        <ArrowIcon />
                      </span>
                    </div>
                    {/* Card meta */}
                    <div style={{ padding:'10px 12px 12px' }}>
                      <p style={{ fontFamily:'var(--font-body)', fontSize:'10px', fontWeight:600, textTransform:'uppercase', color:'var(--white)', margin:'0 0 2px', letterSpacing:'0.02em' }}>{p.title}</p>
                      <p style={{ fontFamily:'var(--font-body)', fontSize:'9px', fontWeight:400, letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--white-40)', margin:0 }}>{p.client}</p>
                    </div>
                  </a>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────── */}
      <section style={{ padding:'80px 0', textAlign:'center', position:'relative', overflow:'hidden', borderTop:'1px solid var(--white-08)' }}>
        <div style={{ position:'absolute', bottom:0, left:'50%', transform:'translateX(-50%)', width:'600px', height:'300px', background:'radial-gradient(ellipse at bottom, rgba(232,23,106,0.12) 0%, transparent 70%)', pointerEvents:'none' }} />
        <div className="cx-narrow" style={{ position:'relative' }}>
          <Reveal>
            <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(36px,6vw,80px)', textTransform:'uppercase', lineHeight:0.88, letterSpacing:'-0.02em', color:'var(--white)', marginBottom:'32px' }}>
              Have a Project<br />in Mind?
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <a href="/contact" style={{
              fontFamily:'var(--font-body)', fontSize:'10px', fontWeight:700,
              letterSpacing:'0.22em', textTransform:'uppercase',
              padding:'14px 36px', background:'var(--accent)', color:'#ffffff',
              display:'inline-flex', alignItems:'center', gap:'10px',
              transition:'opacity 300ms, box-shadow 400ms',
            }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow='0 0 60px rgba(232,23,106,0.4)'; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow='none'; }}
            >Start a Conversation →</a>
          </Reveal>
        </div>
      </section>

      {/* ── WATCH ON YOUTUBE ────────────────────────── */}
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
    </>
  );
}
