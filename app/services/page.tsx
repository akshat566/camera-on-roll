'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Reveal } from '@/components/Reveal';

const E = [0.22, 0.58, 0.32, 1] as const;

const SERVICES = [
  {
    n: 'Brand Films', num: '01',
    d: 'Cinematic brand narratives crafted to communicate identity, emotion, and purpose with lasting impact.',
    img: 'https://images.unsplash.com/photo-1536240478700-b869ad10e128?w=800&q=80',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="2"/><path d="M7 2v20M17 2v20M2 12h20M2 7h5M2 17h5M17 7h5M17 17h5"/>
      </svg>
    ),
  },
  {
    n: 'Commercial & TVC', num: '02',
    d: 'High-production television and digital commercials built for mass reach and premium placements.',
    img: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
      </svg>
    ),
  },
  {
    n: 'Social & Reels', num: '03',
    d: 'High-volume, platform-native social content and reels engineered for scroll-stopping engagement.',
    img: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=800&q=80',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/>
      </svg>
    ),
  },
  {
    n: 'Drone Cinematography', num: '04',
    d: 'Licensed aerial filming delivering scale, movement, and perspective unavailable at ground level.',
    img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l2 4h4l-3 3 1 4-4-2-4 2 1-4-3-3h4z"/><circle cx="12" cy="12" r="1"/><path d="M4.5 4.5l3 3M19.5 4.5l-3 3M4.5 19.5l3-3M19.5 19.5l-3-3"/>
      </svg>
    ),
  },
  {
    n: 'Motion Graphics & 3D', num: '05',
    d: 'Motion design and 3D visualization that adds dimension and depth to brand communication.',
    img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
      </svg>
    ),
  },
  {
    n: 'AI Visual Content', num: '06',
    d: 'AI-enabled visual storytelling that pushes creative boundaries while maintaining brand coherence.',
    img: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&q=80',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l1.5 3 3.5.5-2.5 2.5.5 3.5L12 10l-3 1.5.5-3.5L7 5.5 10.5 5z"/><circle cx="12" cy="16" r="4"/><path d="M12 12v0"/>
      </svg>
    ),
  },
  {
    n: 'Sound Design & Music', num: '07',
    d: 'Original scores, sound design, and sonic branding that elevate emotion and memorability.',
    img: 'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=800&q=80',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
      </svg>
    ),
  },
  {
    n: 'Editing & Color Grading', num: '08',
    d: 'Precision editing and cinematic color grading to achieve the perfect tone, pace, and finish.',
    img: 'https://images.unsplash.com/photo-1574169208507-84376144848b?w=800&q=80',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="6" cy="12" r="3"/><circle cx="12" cy="6" r="3"/><circle cx="18" cy="12" r="3"/><circle cx="12" cy="18" r="3"/>
      </svg>
    ),
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* ── HEADER ────────────────────────────────── */}
      <section style={{ position:'relative', paddingTop:'var(--nav-h)', overflow:'hidden', borderBottom:'1px solid var(--white-08)' }}>
        {/* Hero bg */}
        <div style={{ position:'absolute', inset:0, zIndex:0 }}>
          <img
            src="https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1600&q=85"
            alt=""
            style={{ width:'100%', height:'100%', objectFit:'cover', opacity:0.15, filter:'grayscale(30%)' }}
          />
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(90deg, var(--black) 45%, rgba(9,9,8,0.6) 100%)' }} />
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, var(--black) 0%, transparent 70%)' }} />
          {/* accent glow top right */}
          <div style={{ position:'absolute', top:'10%', right:'10%', width:'40vw', height:'40vw', borderRadius:'50%', background:'radial-gradient(circle, rgba(232,23,106,0.1) 0%, transparent 70%)', filter:'blur(60px)' }} />
        </div>

        <div className="cx" style={{ position:'relative', zIndex:1, display:'grid', gridTemplateColumns:'1fr 1px 1fr', gap:'0', alignItems:'center', paddingTop:'52px', paddingBottom:'52px', minHeight:'260px' }}>
          {/* Left */}
          <div style={{ paddingRight:'clamp(24px,4vw,64px)' }}>
            <Reveal>
              <p style={{ fontFamily:'var(--font-body)', fontSize:'10px', fontWeight:600, letterSpacing:'0.4em', textTransform:'uppercase', color:'var(--accent)', marginBottom:'14px' }}>What We Offer</p>
              <h1 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(44px,7vw,96px)', textTransform:'uppercase', lineHeight:0.85, letterSpacing:'-0.02em', color:'var(--white)' }}>
                Our Services.
              </h1>
            </Reveal>
          </div>
          {/* Divider */}
          <div style={{ background:'var(--white-08)', height:'100px', alignSelf:'center' }} />
          {/* Right */}
          <div style={{ paddingLeft:'clamp(24px,4vw,64px)' }}>
            <Reveal delay={0.15}>
              <p style={{ fontFamily:'var(--font-body)', fontSize:'14px', fontWeight:400, lineHeight:1.9, color:'var(--white-40)', maxWidth:'380px' }}>
                End-to-end creative production powered by technology, imagination, and storytelling. From concept to final frame, we bring ideas to life with precision and purpose.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── SERVICE CARDS GRID ───────────────────── */}
      <section style={{ background:'var(--black)' }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:'1px', background:'var(--white-08)' }}>
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true, margin:'-40px' }}
              transition={{ duration:0.5, delay:(i % 4) * 0.07, ease:E }}
              style={{ background:'var(--black)', position:'relative', overflow:'hidden', cursor:'pointer' }}
            >
              {/* Background image */}
              <div style={{ position:'absolute', inset:0, zIndex:0 }}>
                <img
                  src={s.img} alt={s.n} loading="lazy"
                  style={{ width:'100%', height:'100%', objectFit:'cover', opacity:0.25, filter:'grayscale(20%)', transition:'opacity 500ms, transform 600ms' }}
                />
                <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(9,9,8,0.95) 40%, rgba(9,9,8,0.5) 100%)' }} />
              </div>

              {/* Card content */}
              <div style={{ position:'relative', zIndex:1, padding:'24px', minHeight:'240px', display:'flex', flexDirection:'column', justifyContent:'space-between' }}
                onMouseEnter={e => {
                  const img = e.currentTarget.parentElement?.querySelector('img') as HTMLImageElement;
                  if (img) { img.style.opacity='0.4'; img.style.transform='scale(1.05)'; }
                }}
                onMouseLeave={e => {
                  const img = e.currentTarget.parentElement?.querySelector('img') as HTMLImageElement;
                  if (img) { img.style.opacity='0.25'; img.style.transform='scale(1)'; }
                }}
              >
                {/* Top row: icon + number */}
                <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between' }}>
                  <span style={{ color:'var(--accent)', opacity:0.9 }}>{s.icon}</span>
                  <span style={{ fontFamily:'var(--font-body)', fontSize:'11px', fontWeight:400, letterSpacing:'0.15em', color:'var(--white-20)' }}>{s.num}</span>
                </div>

                {/* Bottom: title + description */}
                <div>
                  <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(13px,1.3vw,17px)', textTransform:'uppercase', color:'var(--white)', letterSpacing:'0.02em', marginBottom:'10px', lineHeight:1.1 }}>
                    {s.n}
                  </h2>
                  <p style={{ fontFamily:'var(--font-body)', fontSize:'12px', fontWeight:400, lineHeight:1.75, color:'var(--white-40)', margin:0 }}>
                    {s.d}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── BOTTOM TAGLINE ───────────────────────── */}
      <section style={{ borderTop:'1px solid var(--white-08)', borderBottom:'1px solid var(--white-08)', padding:'18px 0' }}>
        <div className="cx" style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'16px' }}>
          <span style={{ color:'var(--accent)', fontSize:'6px' }}>◆</span>
          <span style={{ fontFamily:'var(--font-body)', fontSize:'9px', fontWeight:500, letterSpacing:'0.44em', textTransform:'uppercase', color:'var(--white-20)' }}>
            Full-Service Production. Limitless Possibilities.
          </span>
          <span style={{ color:'var(--accent)', fontSize:'6px' }}>◆</span>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────── */}
      <section style={{ padding:'80px 0', textAlign:'center' }}>
        <div className="cx-narrow">
          <Reveal>
            <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(32px,5vw,72px)', textTransform:'uppercase', lineHeight:0.9, letterSpacing:'-0.02em', color:'var(--white)', marginBottom:'36px' }}>
              {"Let\u2019s Build Something Memorable."}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Link href="/contact" style={{
              fontFamily:'var(--font-body)', fontSize:'10px', fontWeight:700,
              letterSpacing:'0.24em', textTransform:'uppercase',
              padding:'14px 36px', background:'var(--accent)', color:'#ffffff',
              display:'inline-flex', alignItems:'center', gap:'10px',
              transition:'box-shadow 400ms',
            }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow='0 0 60px rgba(232,23,106,0.4)'; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow='none'; }}
            >{"Let\u2019s Work Together \u2192"}</Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
