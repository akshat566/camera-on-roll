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
  // Samay Raina — Brand Reels
  { id:1,  cat:'Brand Reels', client:'Samay Raina', title:'Brand Reel',                    link:'https://www.instagram.com/p/DLzwCLPCRzS/', thumb:'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=600&q=80', platform:'instagram' },
  // Uorfi Javed — Brand Reels
  { id:2,  cat:'Brand Reels', client:'Uorfi Javed', title:'Brand Reel 1',                  link:'https://www.instagram.com/p/DF1v6VrtsAY/', thumb:'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&q=80', platform:'instagram' },
  { id:3,  cat:'Brand Reels', client:'Uorfi Javed', title:'Brand Reel 2',                  link:'https://www.instagram.com/p/DJmKjLWNf28/', thumb:'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&q=80', platform:'instagram' },
  { id:4,  cat:'Brand Reels', client:'Uorfi Javed', title:'Brand Reel 3',                  link:'https://www.instagram.com/p/DKZpF8ONbpx/', thumb:'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&q=80', platform:'instagram' },
  { id:5,  cat:'Brand Reels', client:'Uorfi Javed', title:'Brand Reel 4',                  link:'https://www.instagram.com/p/DMxYfwFNqJK/', thumb:'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&q=80', platform:'instagram' },
  { id:6,  cat:'Brand Reels', client:'Uorfi Javed', title:'Brand Reel 5',                  link:'https://www.instagram.com/p/DNVhSG6S3M-/', thumb:'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=600&q=80', platform:'instagram' },
  { id:7,  cat:'Brand Reels', client:'Uorfi Javed', title:'Brand Reel 6',                  link:'https://www.instagram.com/p/DNnXdKEtIea/', thumb:'https://images.unsplash.com/photo-1574169208507-84376144848b?w=600&q=80', platform:'instagram' },
  { id:8,  cat:'Brand Reels', client:'Uorfi Javed', title:'Brand Reel 7',                  link:'https://www.instagram.com/p/DOij00UEu03/', thumb:'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80', platform:'instagram' },
  // Santanu Hazarika — Brand Reels
  { id:9,  cat:'Brand Reels', client:'Santanu Hazarika', title:'Brand Reel 1',             link:'https://www.instagram.com/p/DGVWzIwI4Ns/', thumb:'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80', platform:'instagram' },
  { id:10, cat:'Brand Reels', client:'Santanu Hazarika', title:'Brand Reel 2',             link:'https://www.instagram.com/p/DGe1Bk6IZYO/?img_index=1', thumb:'https://images.unsplash.com/photo-1536240478700-b869ad10e128?w=600&q=80', platform:'instagram' },
  { id:11, cat:'Brand Reels', client:'Santanu Hazarika', title:'Brand Reel 3',             link:'https://www.instagram.com/p/DOakmKEksgJ/', thumb:'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80', platform:'instagram' },
  { id:12, cat:'Brand Reels', client:'Santanu Hazarika', title:'Brand Reel 4',             link:'https://www.instagram.com/p/DPGvEcyEh8y/', thumb:'https://images.unsplash.com/photo-1574169208507-84376144848b?w=600&q=80', platform:'instagram' },
  // NPCI — Podcasts
  { id:13, cat:'Podcasts', client:'NPCI', title:'Podcast Episode 1',                        link:'https://youtu.be/KHl8rzSUGWk', thumb:ytThumb('KHl8rzSUGWk'), platform:'youtube' },
  { id:14, cat:'Podcasts', client:'NPCI', title:'Podcast Episode 2',                        link:'https://youtu.be/lwl5v5K_Vco', thumb:ytThumb('lwl5v5K_Vco'), platform:'youtube' },
  { id:15, cat:'Podcasts', client:'NPCI', title:'Podcast Episode 3',                        link:'https://youtu.be/osuR5mV8QGI', thumb:ytThumb('osuR5mV8QGI'), platform:'youtube' },
  { id:16, cat:'Podcasts', client:'NPCI', title:'Podcast Episode 4',                        link:'https://youtu.be/iqIlbXxfV5g', thumb:ytThumb('iqIlbXxfV5g'), platform:'youtube' },
  // TATA AIA — Podcasts
  { id:17, cat:'Podcasts', client:'TATA AIA', title:'Podcast Episode 1',                    link:'https://youtu.be/pXotTJIzbXw', thumb:ytThumb('pXotTJIzbXw'), platform:'youtube' },
  { id:18, cat:'Podcasts', client:'TATA AIA', title:'Podcast Episode 2',                    link:'https://youtu.be/5ORdSPEHvjI', thumb:ytThumb('5ORdSPEHvjI'), platform:'youtube' },
  { id:19, cat:'Podcasts', client:'TATA AIA', title:'Podcast Episode 3',                    link:'https://youtu.be/EW76GrxnQU4', thumb:ytThumb('EW76GrxnQU4'), platform:'youtube' },
  // Parachute — Product
  { id:20, cat:'Product', client:'Parachute', title:'Influencer Holi Reel',                 link:'https://youtu.be/ECkslerq9Rk', thumb:ytThumb('ECkslerq9Rk'), platform:'youtube' },
  // Complan — Product
  { id:21, cat:'Product', client:'Complan', title:'Product Commercial',                     link:'https://www.youtube.com/watch?v=df9Pco1Xuow', thumb:ytThumb('df9Pco1Xuow'), platform:'youtube' },
];

const YT_PLAYLISTS = [
  { label:'All AI Videos',   href:'https://youtube.com/playlist?list=PLG-syaA8JTVSuD4tT7jowF09G74Hrhhbt&si=_AEGU_Ndq0CAnlDF', cat:'AI' },
  { label:'UGC',              href:'https://youtube.com/playlist?list=PLG-syaA8JTVQ8X0BgkggPsSmK_gORhMh7&si=KAp_n920rllE_o1o', cat:'AI' },
  { label:'Music Videos',     href:'https://youtube.com/playlist?list=PLG-syaA8JTVSVgpPzfRmvVwRyRNTb-nud&si=gEvluH0BhEwKaTNg', cat:'Music Video' },
  { label:'Trailers',         href:'https://youtube.com/playlist?list=PLG-syaA8JTVSVcKe2yOz4RZzSO1uU5B-u&si=n9G0j8W9bWuus8xw', cat:'AI' },
  { label:'Ads',              href:'https://youtube.com/playlist?list=PLG-syaA8JTVRcHscxlQSDw8mnTNnURXz_&si=brVIFPIS0LjNfJk1', cat:'AI' },
];

export default function WorkPage() {
  const [active, setActive] = useState('All');
  const filtered = active === 'All' ? PROJECTS : PROJECTS.filter(p => p.cat === active);

  return (
    <>
      {/* Header */}
      <section style={{ paddingTop:'var(--nav-h)', borderBottom:'1px solid var(--white-08)' }}>
        <div className="cx" style={{ paddingTop:'clamp(48px,6vw,88px)', paddingBottom:'clamp(40px,5vw,72px)' }}>
          <Reveal>
            <p style={{ fontFamily:'var(--font-body)', fontSize:'10px', fontWeight:600, letterSpacing:'0.38em', textTransform:'uppercase', color:'var(--accent)', marginBottom:'16px' }}>Portfolio</p>
            <h1 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(44px,7vw,96px)', textTransform:'uppercase', lineHeight:0.88, letterSpacing:'-0.02em', color:'var(--white)' }}>
              Our Work.
            </h1>
          </Reveal>
        </div>
      </section>

      {/* Category Filters + Grid */}
      <section className="section-pad">
        <div className="cx">
          <Reveal>
            <div style={{ display:'flex', flexWrap:'wrap', gap:'8px', marginBottom:'clamp(40px,5vw,64px)', paddingBottom:'clamp(24px,3vw,40px)', borderBottom:'1px solid var(--white-08)' }}>
              {CATS.map(c => (
                <button key={c} onClick={() => setActive(c)}
                  style={{
                    fontFamily:'var(--font-body)', fontSize:'9px', fontWeight:500,
                    letterSpacing:'0.22em', textTransform:'uppercase',
                    padding:'9px 18px',
                    border: active === c ? '1px solid var(--accent-dim)' : '1px solid var(--white-08)',
                    color: active === c ? 'var(--accent)' : 'var(--white-40)',
                    background:'transparent', cursor:'pointer',
                    transition:'border-color var(--t-fast), color var(--t-fast)',
                  }}>
                  {c}
                </button>
              ))}
            </div>
          </Reveal>

          <AnimatePresence mode="wait">
            <motion.div key={active}
              initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}
              transition={{ duration:0.4, ease:E }}
              style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:'clamp(16px,2vw,28px)' }}
            >
              {filtered.map((p, i) => (
                <motion.div key={p.id}
                  initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
                  transition={{ duration:0.55, delay:i*0.04, ease:E }}
                >
                  <a href={p.link} target="_blank" rel="noopener noreferrer" style={{ display:'block', textDecoration:'none', cursor:'pointer' }}>
                    <div style={{ position:'relative', aspectRatio:'16/9', overflow:'hidden', marginBottom:'12px', background:'var(--surface)' }}>
                      <img src={p.thumb} alt={p.title} loading="lazy"
                        style={{ width:'100%', height:'100%', objectFit:'cover', filter:'grayscale(15%)', transition:'transform 700ms var(--ease-expo), filter 500ms' }}
                        onMouseEnter={e => { const el = e.currentTarget as HTMLImageElement; el.style.transform='scale(1.05)'; el.style.filter='grayscale(0%)'; }}
                        onMouseLeave={e => { const el = e.currentTarget as HTMLImageElement; el.style.transform='scale(1)'; el.style.filter='grayscale(15%)'; }}
                      />
                      {/* Play icon overlay */}
                      <div style={{
                        position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center',
                        background:'rgba(0,0,0,0.2)', opacity:0, transition:'opacity 300ms',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.opacity='1')}
                      onMouseLeave={e => (e.currentTarget.style.opacity='0')}
                      >
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>
                      </div>
                      {/* Platform badge */}
                      <span style={{
                        position:'absolute', top:'8px', right:'8px',
                        fontFamily:'var(--font-body)', fontSize:'8px', fontWeight:600,
                        letterSpacing:'0.16em', textTransform:'uppercase',
                        padding:'3px 8px', background:'rgba(0,0,0,0.7)', color:'var(--white-70)',
                        borderRadius:'2px',
                      }}>
                        {p.platform === 'youtube' ? 'YT' : 'IG'}
                      </span>
                    </div>
                    <span style={{ fontFamily:'var(--font-body)', fontSize:'9px', fontWeight:500, letterSpacing:'0.3em', textTransform:'uppercase', color:'var(--white-40)', display:'block', marginBottom:'4px' }}>{p.client}</span>
                    <h3 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(12px,1.2vw,15px)', textTransform:'uppercase', color:'var(--white)', transition:'color var(--t-fast)', margin:0 }}
                      onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color='var(--accent)')}
                      onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color='var(--white)')}
                    >{p.title}</h3>
                    <span style={{ fontFamily:'var(--font-body)', fontSize:'9px', letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--accent)', opacity:0.6 }}>{p.cat}</span>
                  </a>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* AI Driven Videos — YouTube Playlists */}
      <section style={{ borderTop:'1px solid var(--white-08)' }}>
        <div className="cx" style={{ paddingTop:'clamp(48px,6vw,72px)', paddingBottom:'clamp(48px,6vw,72px)' }}>
          <Reveal>
            <p style={{ fontFamily:'var(--font-body)', fontSize:'10px', fontWeight:600, letterSpacing:'0.38em', textTransform:'uppercase', color:'var(--accent)', marginBottom:'16px' }}>AI Driven Videos</p>
            <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(28px,4vw,52px)', textTransform:'uppercase', lineHeight:0.92, color:'var(--white)', marginBottom:'clamp(28px,4vw,48px)' }}>
              Watch on YouTube
            </h2>
          </Reveal>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(min(100%,200px),1fr))', gap:'10px' }}>
            {YT_PLAYLISTS.map((pl, i) => (
              <Reveal key={pl.label} delay={i*0.05}>
                <a href={pl.href} target="_blank" rel="noopener noreferrer"
                  style={{
                    display:'flex', flexDirection:'column', gap:'8px',
                    padding:'20px 24px',
                    border:'1px solid var(--white-08)',
                    fontFamily:'var(--font-body)', fontSize:'12px', fontWeight:500,
                    color:'var(--white-70)',
                    transition:'border-color var(--t-base), color var(--t-base)',
                    textDecoration:'none',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor='var(--accent-dim)'; e.currentTarget.style.color='var(--accent)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor='var(--white-08)'; e.currentTarget.style.color='var(--white-70)'; }}
                >
                  <span style={{ fontFamily:'var(--font-body)', fontSize:'9px', letterSpacing:'0.24em', textTransform:'uppercase', color:'var(--white-20)' }}>{pl.cat}</span>
                  <span style={{ fontFamily:'var(--font-body)', fontSize:'14px', fontWeight:600, color:'var(--white)' }}>{pl.label}</span>
                  <span style={{ fontFamily:'var(--font-body)', fontSize:'10px', color:'var(--white-40)', marginTop:'4px' }}>View Playlist →</span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad" style={{ borderTop:'1px solid var(--white-08)', textAlign:'center' }}>
        <div className="cx-narrow">
          <Reveal>
            <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(32px,5vw,72px)', textTransform:'uppercase', lineHeight:0.9, letterSpacing:'-0.02em', color:'var(--white)', marginBottom:'40px' }}>
              Have a Project<br />in Mind?
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <a href="/contact" style={{
              fontFamily:'var(--font-body)', fontSize:'11px', fontWeight:700,
              letterSpacing:'0.18em', textTransform:'uppercase',
              padding:'14px 32px', background:'var(--accent)', color:'#ffffff',
              display:'inline-flex', transition:'opacity var(--t-base)',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity='0.85')}
            onMouseLeave={e => (e.currentTarget.style.opacity='1')}
            >Start a Conversation</a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
