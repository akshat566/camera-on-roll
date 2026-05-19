'use client';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useState, useRef } from 'react';
import { Reveal } from '@/components/Reveal';

const EASE = [0.76, 0, 0.24, 1] as const;

function Tilt({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 16;
    const y = ((e.clientY - r.top) / r.height - 0.5) * 16;
    el.style.transform = `perspective(900px) rotateY(${x}deg) rotateX(${-y}deg) scale3d(1.02,1.02,1.02)`;
    el.style.zIndex = '2';
  };
  const onLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)';
    ref.current.style.zIndex = '1';
  };
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
      style={{ transition:'transform 200ms ease', transformStyle:'preserve-3d', position:'relative', ...style }}>
      {children}
    </div>
  );
}

const FEATURED = [
  { cat:'Brand Reels', client:'Samay Raina',     title:'Brand Reel',          link:'https://www.instagram.com/p/DLzwCLPCRzS/', img:'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=800&q=80' },
  { cat:'Brand Reels', client:'Uorfi Javed',     title:'Brand Reel 1',         link:'https://www.instagram.com/p/DF1v6VrtsAY/', img:'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&q=80' },
  { cat:'Brand Reels', client:'Santanu Hazarika', title:'Brand Reel 1',        link:'https://www.instagram.com/p/DGVWzIwI4Ns/', img:'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80' },
  { cat:'Podcasts',    client:'NPCI',             title:'Podcast Episode 1',    link:'https://youtu.be/KHl8rzSUGWk',              img:'https://img.youtube.com/vi/KHl8rzSUGWk/hqdefault.jpg' },
  { cat:'Product',     client:'Parachute',        title:'Influencer Holi Reel', link:'https://youtu.be/ECkslerq9Rk',              img:'https://img.youtube.com/vi/ECkslerq9Rk/hqdefault.jpg' },
  { cat:'Product',     client:'Complan',          title:'Product Commercial',   link:'https://www.youtube.com/watch?v=df9Pco1Xuow',img:'https://img.youtube.com/vi/df9Pco1Xuow/hqdefault.jpg' },
];

const SERVICES_DATA = [
  { n:'Brand Films',            num:'01', img:'https://images.unsplash.com/photo-1536240478700-b869ad10e128?w=600&q=80', d:'Cinematic narratives crafted to communicate identity and purpose.' },
  { n:'Commercial & TVC',       num:'02', img:'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&q=80', d:'High-production commercials built for mass reach and premium placement.' },
  { n:'Social & Reels',         num:'03', img:'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=600&q=80', d:'Platform-native content engineered for scroll-stopping engagement.' },
  { n:'Drone Cinematography',   num:'04', img:'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80', d:'Licensed aerial filming delivering scale and movement.' },
  { n:'Motion Graphics & 3D',   num:'05', img:'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80', d:'Motion design that adds dimension and depth to brand communication.' },
  { n:'AI Visual Content',      num:'06', img:'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=600&q=80', d:'AI-enabled storytelling that pushes creative boundaries.' },
  { n:'Sound Design & Music',   num:'07', img:'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=600&q=80', d:'Original scores and sonic branding that elevate emotion.' },
  { n:'Editing & Color Grading',num:'08', img:'https://images.unsplash.com/photo-1574169208507-84376144848b?w=600&q=80', d:'Precision editing and color grading for perfect tone and finish.' },
];

const BTN_BASE: React.CSSProperties = {
  fontFamily:'var(--font-body)', fontSize:'10px', fontWeight:600,
  letterSpacing:'0.28em', textTransform:'uppercase',
  padding:'15px 36px', display:'inline-flex', alignItems:'center', gap:'8px',
  transition:'all 350ms',
};

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoOpen, setVideoOpen] = useState(false);
  const [workLayout, setWorkLayout] = useState<'grid'|'list'>('grid');

  return (
    <>

      {/* ══ FULLSCREEN VIDEO OVERLAY ═══════════════════ */}
      <AnimatePresence>
        {videoOpen && (
          <motion.div
            initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            transition={{ duration:0.35, ease:EASE }}
            style={{ position:'fixed', inset:0, zIndex:9999, background:'#000', display:'flex', alignItems:'center', justifyContent:'center' }}
          >
            <motion.video
              initial={{ scale:0.92 }} animate={{ scale:1 }} exit={{ scale:0.96 }}
              transition={{ duration:0.45, ease:EASE }}
              autoPlay loop playsInline
              style={{ width:'100%', height:'100%', objectFit:'cover' }}
            >
              <source src="https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4" type="video/mp4" />
            </motion.video>
            <button onClick={() => setVideoOpen(false)} style={{
              position:'absolute', top:'28px', right:'28px', zIndex:10000,
              fontFamily:'var(--font-body)', fontSize:'9px', fontWeight:600,
              letterSpacing:'0.28em', textTransform:'uppercase',
              padding:'10px 22px', border:'1px solid rgba(255,255,255,0.25)',
              color:'rgba(255,255,255,0.7)', background:'rgba(0,0,0,0.5)',
              cursor:'pointer', backdropFilter:'blur(12px)',
              transition:'border-color 300ms, color 300ms',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor='var(--accent)'; e.currentTarget.style.color='#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(255,255,255,0.25)'; e.currentTarget.style.color='rgba(255,255,255,0.7)'; }}
            >✕ Close</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══ HERO ═══════════════════════════════════════ */}
      <section style={{ position:'relative', height:'100svh', overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <div style={{ position:'absolute', inset:0, zIndex:0 }}>
          <video ref={videoRef} autoPlay muted loop playsInline className="slow-zoom"
            style={{ width:'100%', height:'100%', objectFit:'cover', opacity:0.4 }}
            poster="https://images.unsplash.com/photo-1536240478700-b869ad10e128?w=1920&q=85">
            <source src="https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4" type="video/mp4" />
          </video>
          <div style={{ position:'absolute', inset:0, background:'rgba(9,9,8,0.65)' }} />
          <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'50%', background:'linear-gradient(to top, var(--black), transparent)' }} />
          <div style={{ position:'absolute', top:'20%', right:'-10%', width:'40vw', height:'40vw', borderRadius:'50%', background:'radial-gradient(circle, rgba(232,23,106,0.08) 0%, transparent 70%)', filter:'blur(60px)' }} />
        </div>

        <div style={{ position:'relative', zIndex:1, textAlign:'center', padding:'0 var(--pad-x)', maxWidth:'900px' }}>
          <motion.p initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:1, delay:0.2, ease:EASE }}
            style={{ fontFamily:'var(--font-body)', fontSize:'10px', fontWeight:500, letterSpacing:'0.5em', textTransform:'uppercase', color:'var(--accent)', marginBottom:'clamp(16px,3vw,32px)' }}>
            Cinema • AI • Future Visual Systems
          </motion.p>

          <motion.h1 initial={{ opacity:0, y:40 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:1.2, delay:0.4, ease:EASE }} className="text-glow"
            style={{ fontFamily:'var(--font-display)', fontSize:'clamp(28px,5.5vw,72px)', textTransform:'uppercase', lineHeight:0.9, letterSpacing:'-0.02em', color:'var(--white)', marginBottom:'clamp(16px,2vw,28px)', whiteSpace:'nowrap' }}>
            Camera On Roll Production
          </motion.h1>

          <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }}
            transition={{ duration:1, delay:0.9, ease:EASE }}
            style={{ fontFamily:'var(--font-body)', fontSize:'12px', fontWeight:400, letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--white-40)', marginBottom:'clamp(24px,3vw,40px)' }}>
            A creative tech studio built for modern brands
          </motion.p>

          <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }}
            transition={{ duration:1, delay:1.1, ease:EASE }}
            style={{ fontFamily:'var(--font-body)', fontSize:'14px', fontWeight:400, lineHeight:1.85, color:'var(--white-40)', maxWidth:'640px', margin:'0 auto clamp(28px,3.5vw,48px)' }}>
            We work at the intersection of creative direction, cinematic production, and strategic thinking to craft imagery that elevates how brands are perceived. From premium photography to narrative driven films and AI enabled visual storytelling, every project is approached with precision, intention, and a deep understanding of brand presence.
          </motion.p>

          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:0.8, delay:1.3, ease:EASE }}
            style={{ display:'flex', gap:'clamp(8px,1.5vw,14px)', justifyContent:'center', flexWrap:'wrap' }}>

            {/* Intro Video — opens fullscreen overlay */}
            <button onClick={() => setVideoOpen(true)} style={{ ...BTN_BASE, border:'1px solid var(--white-20)', color:'var(--white-70)', background:'transparent', cursor:'pointer' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor='var(--accent)'; e.currentTarget.style.color='var(--white)'; e.currentTarget.style.boxShadow='0 0 40px rgba(232,23,106,0.2)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor='var(--white-20)'; e.currentTarget.style.color='var(--white-70)'; e.currentTarget.style.boxShadow='none'; }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
              Intro Video
            </button>

            <Link href="/work" style={{ ...BTN_BASE, border:'1px solid var(--accent-dim)', color:'var(--accent)' }}
              onMouseEnter={e => { e.currentTarget.style.background='var(--accent)'; e.currentTarget.style.color='#fff'; e.currentTarget.style.boxShadow='0 0 60px rgba(232,23,106,0.3)'; }}
              onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='var(--accent)'; e.currentTarget.style.boxShadow='none'; }}>
              Work
            </Link>

            <Link href="/contact" style={{ ...BTN_BASE, border:'1px solid var(--white-20)', color:'var(--white-70)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor='var(--accent)'; e.currentTarget.style.color='var(--white)'; e.currentTarget.style.boxShadow='0 0 40px rgba(232,23,106,0.2)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor='var(--white-20)'; e.currentTarget.style.color='var(--white-70)'; e.currentTarget.style.boxShadow='none'; }}>
              Connect
            </Link>
          </motion.div>
        </div>

        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:2, duration:1 }}
          style={{ position:'absolute', bottom:'40px', left:'50%', transform:'translateX(-50%)', display:'flex', flexDirection:'column', alignItems:'center', gap:'12px' }}>
          <span style={{ fontFamily:'var(--font-body)', fontSize:'8px', fontWeight:500, letterSpacing:'0.44em', textTransform:'uppercase', color:'var(--white-20)' }}>Scroll</span>
          <div style={{ width:'1px', height:'40px', background:'linear-gradient(to bottom, var(--white-20), transparent)', position:'relative' }}>
            <motion.div animate={{ y:[0,40,0] }} transition={{ duration:2, repeat:Infinity, ease:'easeInOut' }}
              style={{ position:'absolute', top:0, left:'-2px', width:'5px', height:'5px', borderRadius:'50%', background:'var(--accent)', boxShadow:'0 0 8px var(--accent)' }} />
          </div>
        </motion.div>
      </section>

      {/* ══ WORK PREVIEW ═══════════════════════════════ */}
      <section style={{ borderTop:'1px solid var(--white-08)', padding:'clamp(40px,5vw,60px) 0 0' }}>
        {/* Header */}
        <div style={{ padding:'0 var(--pad-x)', display:'flex', alignItems:'flex-end', justifyContent:'space-between', marginBottom:'clamp(20px,2.5vw,32px)', flexWrap:'wrap', gap:'12px' }}>
          <Reveal>
            <div>
              <p style={{ fontFamily:'var(--font-body)', fontSize:'9px', fontWeight:600, letterSpacing:'0.4em', textTransform:'uppercase', color:'var(--accent)', marginBottom:'8px' }}>Selected Work</p>
              <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(28px,4.5vw,56px)', textTransform:'uppercase', lineHeight:0.88, letterSpacing:'-0.02em', color:'var(--white)', margin:0 }}>Work That Speaks.</h2>
            </div>
          </Reveal>
          <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
            {/* Layout toggle */}
            <div style={{ display:'flex', border:'1px solid var(--white-08)', overflow:'hidden' }}>
              {(['grid','list'] as const).map(l => (
                <button key={l} onClick={() => setWorkLayout(l)} style={{
                  padding:'8px 14px', background: workLayout===l ? 'var(--accent)' : 'transparent',
                  color: workLayout===l ? '#fff' : 'var(--white-30)', border:'none', cursor:'pointer',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  transition:'background 200ms, color 200ms',
                }}>
                  {l==='grid'
                    ? <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><rect x="0" y="0" width="6" height="6" rx="1"/><rect x="10" y="0" width="6" height="6" rx="1"/><rect x="0" y="10" width="6" height="6" rx="1"/><rect x="10" y="10" width="6" height="6" rx="1"/></svg>
                    : <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><rect x="0" y="1" width="16" height="2" rx="1"/><rect x="0" y="7" width="16" height="2" rx="1"/><rect x="0" y="13" width="16" height="2" rx="1"/></svg>
                  }
                </button>
              ))}
            </div>
            <Link href="/work" style={{ fontFamily:'var(--font-body)', fontSize:'9px', fontWeight:600, letterSpacing:'0.24em', textTransform:'uppercase', padding:'10px 24px', border:'1px solid var(--white-20)', color:'var(--white-40)', display:'inline-flex', alignItems:'center', gap:'6px', transition:'border-color 300ms, color 300ms' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor='var(--accent)'; e.currentTarget.style.color='var(--white)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor='var(--white-20)'; e.currentTarget.style.color='var(--white-40)'; }}>
              View All Work →
            </Link>
          </div>
        </div>

        {/* Grid layout */}
        <AnimatePresence mode="wait">
          {workLayout === 'grid' ? (
            <motion.div key="grid" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.25 }}
              style={{ padding:'0 var(--pad-x)', display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:'2px' }}>
              {FEATURED.map((p, i) => (
                <Tilt key={i}>
                  <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} transition={{ duration:0.4, delay:i*0.05, ease:EASE }}>
                    <a href={p.link} target="_blank" rel="noopener noreferrer" style={{ display:'block', textDecoration:'none', background:'#111' }}>
                      <div style={{ position:'relative', aspectRatio:'16/9', overflow:'hidden' }}>
                        <img src={p.img} alt={p.title} loading="lazy"
                          style={{ width:'100%', height:'100%', objectFit:'cover', display:'block', transition:'transform 600ms, filter 400ms', filter:'brightness(0.85)' }}
                          onMouseEnter={e => { const el = e.currentTarget as HTMLImageElement; el.style.transform='scale(1.05)'; el.style.filter='brightness(1)'; }}
                          onMouseLeave={e => { const el = e.currentTarget as HTMLImageElement; el.style.transform='scale(1)'; el.style.filter='brightness(0.85)'; }}
                        />
                        <span style={{ position:'absolute', top:'10px', left:'10px', fontFamily:'var(--font-body)', fontSize:'7px', fontWeight:700, letterSpacing:'0.24em', textTransform:'uppercase', padding:'3px 8px', background:'rgba(9,9,8,0.8)', color:'var(--accent)' }}>{p.cat}</span>
                        <span style={{ position:'absolute', bottom:'10px', right:'10px', width:'26px', height:'26px', display:'flex', alignItems:'center', justifyContent:'center', background:'rgba(9,9,8,0.8)', color:'var(--white-60)' }}>
                          <svg width="11" height="11" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 12L12 2M12 2H5M12 2V9"/></svg>
                        </span>
                      </div>
                      <div style={{ padding:'10px 12px 12px', borderTop:'1px solid var(--white-08)' }}>
                        <p style={{ fontFamily:'var(--font-body)', fontSize:'10px', fontWeight:600, textTransform:'uppercase', color:'var(--white)', margin:'0 0 2px' }}>{p.title}</p>
                        <p style={{ fontFamily:'var(--font-body)', fontSize:'9px', letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--white-40)', margin:0 }}>{p.client}</p>
                      </div>
                    </a>
                  </motion.div>
                </Tilt>
              ))}
            </motion.div>
          ) : (
            <motion.div key="list" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.25 }}
              style={{ padding:'0 var(--pad-x)', display:'flex', flexDirection:'column', gap:'1px', background:'var(--white-08)' }}>
              {FEATURED.map((p, i) => (
                <motion.div key={i} initial={{ opacity:0, x:-10 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.35, delay:i*0.04, ease:EASE }}>
                  <a href={p.link} target="_blank" rel="noopener noreferrer"
                    style={{ display:'grid', gridTemplateColumns:'220px 1fr auto', alignItems:'center', gap:'0', background:'var(--black)', textDecoration:'none', transition:'background 250ms' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background='#111'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background='var(--black)'; }}>
                    <div style={{ aspectRatio:'16/9', overflow:'hidden' }}>
                      <img src={p.img} alt={p.title} loading="lazy" style={{ width:'100%', height:'100%', objectFit:'cover', display:'block', transition:'transform 400ms', filter:'brightness(0.8)' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform='scale(1.04)'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform='scale(1)'; }}
                      />
                    </div>
                    <div style={{ padding:'0 28px' }}>
                      <span style={{ fontFamily:'var(--font-body)', fontSize:'8px', fontWeight:700, letterSpacing:'0.28em', textTransform:'uppercase', color:'var(--accent)', display:'block', marginBottom:'6px' }}>{p.cat}</span>
                      <p style={{ fontFamily:'var(--font-display)', fontSize:'clamp(14px,1.6vw,20px)', textTransform:'uppercase', color:'var(--white)', margin:'0 0 4px' }}>{p.title}</p>
                      <p style={{ fontFamily:'var(--font-body)', fontSize:'9px', letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--white-40)', margin:0 }}>{p.client}</p>
                    </div>
                    <div style={{ padding:'0 24px', color:'var(--white-30)' }}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 12L12 2M12 2H5M12 2V9"/></svg>
                    </div>
                  </a>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ══ SERVICES PREVIEW ═══════════════════════════ */}
      <section style={{ padding:'clamp(40px,5vw,60px) 0 0', borderTop:'1px solid var(--white-08)' }}>
        <div style={{ padding:'0 var(--pad-x)', display:'flex', alignItems:'flex-end', justifyContent:'space-between', marginBottom:'clamp(20px,2.5vw,32px)', flexWrap:'wrap', gap:'12px' }}>
          <Reveal>
            <div>
              <p style={{ fontFamily:'var(--font-body)', fontSize:'9px', fontWeight:600, letterSpacing:'0.4em', textTransform:'uppercase', color:'var(--accent)', marginBottom:'8px' }}>What We Offer</p>
              <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(28px,4.5vw,56px)', textTransform:'uppercase', lineHeight:0.88, letterSpacing:'-0.02em', color:'var(--white)', margin:0 }}>Our Services.</h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <Link href="/services" style={{ fontFamily:'var(--font-body)', fontSize:'9px', fontWeight:600, letterSpacing:'0.24em', textTransform:'uppercase', padding:'10px 24px', border:'1px solid var(--white-20)', color:'var(--white-40)', display:'inline-flex', alignItems:'center', gap:'6px', transition:'border-color 300ms, color 300ms' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor='var(--accent)'; e.currentTarget.style.color='var(--white)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor='var(--white-20)'; e.currentTarget.style.color='var(--white-40)'; }}>
              Explore Services →
            </Link>
          </Reveal>
        </div>

        <div style={{ padding:'0 var(--pad-x)', display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:'1px', background:'var(--white-08)' }}>
          {SERVICES_DATA.map((s, i) => (
            <Tilt key={s.n}>
              <motion.div initial={{ opacity:0, y:12 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, margin:'-30px' }}
                transition={{ duration:0.4, delay:(i%4)*0.07, ease:EASE }}
                style={{ background:'var(--black)', position:'relative', overflow:'hidden', cursor:'pointer', height:'100%' }}>
                <div style={{ position:'absolute', inset:0, zIndex:0 }}>
                  <img src={s.img} alt={s.n} loading="lazy"
                    style={{ width:'100%', height:'100%', objectFit:'cover', opacity:0.22, transition:'opacity 500ms, transform 600ms' }} />
                  <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(9,9,8,0.96) 35%, rgba(9,9,8,0.4) 100%)' }} />
                </div>
                <div style={{ position:'relative', zIndex:1, padding:'22px', minHeight:'210px', display:'flex', flexDirection:'column', justifyContent:'space-between' }}
                  onMouseEnter={e => { const img = e.currentTarget.parentElement?.querySelector('img') as HTMLImageElement; if(img){img.style.opacity='0.4';img.style.transform='scale(1.06)';} }}
                  onMouseLeave={e => { const img = e.currentTarget.parentElement?.querySelector('img') as HTMLImageElement; if(img){img.style.opacity='0.22';img.style.transform='scale(1)';} }}>
                  <span style={{ fontFamily:'var(--font-body)', fontSize:'11px', letterSpacing:'0.12em', color:'var(--white-20)', alignSelf:'flex-end' }}>{s.num}</span>
                  <div>
                    <h3 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(12px,1.2vw,15px)', textTransform:'uppercase', color:'var(--white)', letterSpacing:'0.02em', marginBottom:'8px', lineHeight:1.1 }}>{s.n}</h3>
                    <p style={{ fontFamily:'var(--font-body)', fontSize:'11px', lineHeight:1.7, color:'var(--white-40)', margin:0 }}>{s.d}</p>
                  </div>
                </div>
              </motion.div>
            </Tilt>
          ))}
        </div>
      </section>

      {/* ══ AI × CINEMA (compact 2-col) ════════════════ */}
      <section style={{ padding:'clamp(48px,5vw,72px) 0', borderTop:'1px solid var(--white-08)' }}>
        <div className="cx">
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'clamp(32px,5vw,80px)', alignItems:'center' }}>
            <Reveal>
              <div>
                <p style={{ fontFamily:'var(--font-body)', fontSize:'9px', fontWeight:600, letterSpacing:'0.4em', textTransform:'uppercase', color:'var(--accent)', marginBottom:'14px' }}>AI × Cinema</p>
                <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(26px,3.5vw,48px)', textTransform:'uppercase', lineHeight:0.9, letterSpacing:'-0.02em', color:'var(--white)', margin:0 }}>
                  Where Cinema<br />Meets Intelligence.
                </h2>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <div>
                <p style={{ fontFamily:'var(--font-body)', fontSize:'13px', fontWeight:400, lineHeight:1.85, color:'var(--white-40)', marginBottom:'28px' }}>
                  We are not just a production house — we are a technology-powered creative company driving scalable content solutions. By combining filmmaking with proprietary AI workflows, we build the next generation of visual storytelling: faster, smarter, and more impactful than traditional production alone.
                </p>
                <div style={{ display:'flex', gap:'12px', flexWrap:'wrap' }}>
                  <Link href="/atom" style={{ fontFamily:'var(--font-body)', fontSize:'9px', fontWeight:600, letterSpacing:'0.24em', textTransform:'uppercase', padding:'12px 24px', border:'1px solid var(--accent-dim)', color:'var(--accent)', display:'inline-flex', alignItems:'center', gap:'6px', transition:'background 350ms, color 350ms, box-shadow 350ms' }}
                    onMouseEnter={e => { e.currentTarget.style.background='var(--accent)'; e.currentTarget.style.color='#fff'; e.currentTarget.style.boxShadow='0 0 40px rgba(232,23,106,0.3)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='var(--accent)'; e.currentTarget.style.boxShadow='none'; }}>
                    Explore Atom →
                  </Link>
                  <Link href="/work" style={{ fontFamily:'var(--font-body)', fontSize:'9px', fontWeight:600, letterSpacing:'0.24em', textTransform:'uppercase', padding:'12px 24px', border:'1px solid var(--white-20)', color:'var(--white-50)', display:'inline-flex', alignItems:'center', gap:'6px', transition:'border-color 300ms, color 300ms' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor='var(--accent)'; e.currentTarget.style.color='var(--white)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor='var(--white-20)'; e.currentTarget.style.color='var(--white-50)'; }}>
                    AI Driven Content →
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ CTA ════════════════════════════════════════ */}
      <section style={{ padding:'clamp(80px,10vw,140px) 0', borderTop:'1px solid var(--white-08)', textAlign:'center' }}>
        <div className="cx-narrow">
          <Reveal>
            <h2 style={{ fontFamily:'var(--font-display)', textTransform:'uppercase', fontSize:'clamp(40px,7vw,100px)', lineHeight:0.85, letterSpacing:'-0.02em', color:'var(--white)', marginBottom:'48px' }}>
              {"Let\u2019s Build the Future."}
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <Link href="/contact" style={{ fontFamily:'var(--font-body)', fontSize:'10px', fontWeight:700, letterSpacing:'0.28em', textTransform:'uppercase', padding:'18px 52px', background:'var(--accent)', color:'#ffffff', display:'inline-flex', alignItems:'center', transition:'opacity 300ms, box-shadow 400ms' }}
              onMouseEnter={e => { e.currentTarget.style.opacity='0.9'; e.currentTarget.style.boxShadow='0 0 60px rgba(232,23,106,0.4)'; }}
              onMouseLeave={e => { e.currentTarget.style.opacity='1'; e.currentTarget.style.boxShadow='none'; }}>
              Start a Project
            </Link>
          </Reveal>
        </div>
      </section>

    </>
  );
}
