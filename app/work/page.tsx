'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal } from '@/components/Reveal';

const E = [0.22, 0.58, 0.32, 1] as const;

const CATS = ['All', 'Commercial', 'Fashion', 'Product', 'Music Video', 'Event', 'Aerial', 'AI'];

const PROJECTS = [
  { id:1, cat:'Commercial',  title:'ITC \u00d7 Cosmopolitan',        year:'2024', img:'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=800&q=80' },
  { id:2, cat:'Fashion',     title:'Bombay Times Fashion Week',  year:'2024', img:'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80' },
  { id:3, cat:'Event',       title:'Iconic Gold Awards',         year:'2023', img:'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80' },
  { id:4, cat:'Aerial',      title:'Drone Showreel',             year:'2024', img:'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80' },
  { id:5, cat:'Product',     title:'Coco Noir \u00d7 Matrix',         year:'2023', img:'https://images.unsplash.com/photo-1574169208507-84376144848b?w=800&q=80' },
  { id:6, cat:'Music Video', title:'Afterglow',                  year:'2024', img:'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&q=80' },
  { id:7, cat:'Fashion',     title:'Lavie World Campaign',       year:'2024', img:'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80' },
  { id:8, cat:'Commercial',  title:'Engage \u00d7 ITC',               year:'2023', img:'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80' },
  { id:9, cat:'AI',          title:'ATOM \u2014 AI Brand Film',        year:'2024', img:'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80' },
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

      {/* YouTube Playlists */}
      <section style={{ borderBottom:'1px solid var(--white-08)' }}>
        <div className="cx" style={{ paddingTop:'clamp(28px,4vw,48px)', paddingBottom:'clamp(28px,4vw,48px)' }}>
          <Reveal>
            <p style={{ fontFamily:'var(--font-body)', fontSize:'9px', fontWeight:600, letterSpacing:'0.32em', textTransform:'uppercase', color:'var(--white-40)', marginBottom:'20px' }}>Watch on YouTube</p>
          </Reveal>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(min(100%,200px),1fr))', gap:'10px' }}>
            {YT_PLAYLISTS.map((pl, i) => (
              <Reveal key={pl.label} delay={i*0.05}>
                <a href={pl.href} target="_blank" rel="noopener noreferrer"
                  style={{
                    display:'flex', flexDirection:'column', gap:'8px',
                    padding:'16px 20px',
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
                  <span style={{ fontFamily:'var(--font-body)', fontSize:'13px', fontWeight:500, color:'var(--white)' }}>{pl.label}</span>
                  <span style={{ fontFamily:'var(--font-body)', fontSize:'10px', color:'var(--white-40)', marginTop:'4px' }}>View Playlist →</span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Filter + Grid */}
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
              style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(min(100%, 320px), 1fr))', gap:'clamp(20px,3vw,40px) clamp(16px,2vw,24px)' }}
            >
              {filtered.map((p, i) => (
                <motion.div key={p.id}
                  initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
                  transition={{ duration:0.55, delay:i*0.06, ease:E }}
                >
                  <div style={{ cursor:'pointer' }}>
                    <div style={{ aspectRatio:'4/3', overflow:'hidden', marginBottom:'14px', background:'var(--surface)' }}>
                      <img src={p.img} alt={p.title} loading="lazy"
                        style={{ width:'100%', height:'100%', objectFit:'cover', filter:'grayscale(15%)', transition:'transform 700ms var(--ease-expo), filter 500ms' }}
                        onMouseEnter={e => { const el = e.currentTarget as HTMLImageElement; el.style.transform='scale(1.05)'; el.style.filter='grayscale(0%)'; }}
                        onMouseLeave={e => { const el = e.currentTarget as HTMLImageElement; el.style.transform='scale(1)'; el.style.filter='grayscale(15%)'; }}
                      />
                    </div>
                    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'6px' }}>
                      <span style={{ fontFamily:'var(--font-body)', fontSize:'9px', fontWeight:500, letterSpacing:'0.3em', textTransform:'uppercase', color:'var(--white-40)' }}>{p.cat}</span>
                      <span style={{ fontFamily:'var(--font-body)', fontSize:'9px', color:'var(--white-40)' }}>{p.year}</span>
                    </div>
                    <h3 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(13px,1.4vw,17px)', textTransform:'uppercase', color:'var(--white)', transition:'color var(--t-fast)' }}
                      onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color='var(--accent)')}
                      onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color='var(--white)')}
                    >{p.title}</h3>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
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
