'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Reveal } from '@/components/Reveal';

const E = [0.22, 0.58, 0.32, 1] as const;
const POP_EASE = [0.34, 1.56, 0.64, 1] as const;

// 8 service categories — source of truth across home + services page
const SERVICES = [
  {
    n: 'Brand & Influencer Reels', num: '01',
    d: 'Platform-native reels and influencer content engineered for scroll-stopping engagement and on-brand storytelling.',
    img: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=800&q=80',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/>
      </svg>
    ),
  },
  {
    n: 'Product / Commercials', num: '02',
    d: 'High-production product films and commercials built for brand impact across digital, retail, and broadcast.',
    img: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&q=80',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
      </svg>
    ),
  },
  {
    n: 'Podcast', num: '03',
    d: 'Studio-grade podcast production with cinematic visual storytelling, multi-cam direction, and end-to-end post.',
    img: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&q=80',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 1v22M19 10v2a7 7 0 0 1-14 0v-2"/><rect x="9" y="1" width="6" height="14" rx="3"/>
      </svg>
    ),
  },
  {
    n: 'TVC / DVC', num: '04',
    d: 'Television and digital video commercials engineered for mass reach, premium placement, and brand recall.',
    img: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
      </svg>
    ),
  },
  {
    n: '2D / 3D Motion Graphic', num: '05',
    d: 'Motion design, kinetic typography, and 3D visualization that adds dimension and depth to brand communication.',
    img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/>
      </svg>
    ),
  },
  {
    n: 'Ecommerce', num: '06',
    d: 'Conversion-driven product imagery, lifestyle content, and shoppable video tailored for online retail funnels.',
    img: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&q=80',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0"/>
      </svg>
    ),
  },
  {
    n: 'Drone Cinematography', num: '07',
    d: 'Licensed aerial filming delivering scale, movement, and perspective unavailable at ground level.',
    img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="2"/><path d="M4.5 4.5l3 3M19.5 4.5l-3 3M4.5 19.5l3-3M19.5 19.5l-3-3"/><circle cx="4" cy="4" r="2"/><circle cx="20" cy="4" r="2"/><circle cx="4" cy="20" r="2"/><circle cx="20" cy="20" r="2"/>
      </svg>
    ),
  },
  {
    n: 'AI Visual Content', num: '08',
    d: 'AI-enabled visual storytelling and generative production that pushes creative boundaries while staying on-brand.',
    img: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&q=80',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l1.5 3 3.5.5-2.5 2.5.5 3.5L12 10l-3 1.5.5-3.5L7 5.5 10.5 5z"/><circle cx="12" cy="16" r="4"/><path d="M12 12v0"/>
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
              <h1 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(44px,7vw,96px)', textTransform:'uppercase', lineHeight:0.85, letterSpacing:'-0.02em', color:'var(--white)' }}>
                Our Services
              </h1>
            </Reveal>
          </div>
          {/* Divider */}
          <div style={{ background:'var(--white-08)', height:'100px', alignSelf:'center' }} />
          {/* Right */}
          <div style={{ paddingLeft:'clamp(24px,4vw,64px)' }}>
            <Reveal delay={0.15}>
              <p style={{ fontFamily:'var(--font-body)', fontSize:'14px', fontWeight:400, lineHeight:1.9, color:'var(--white-70)', maxWidth:'380px' }}>
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
              whileHover={{ y:-10, scale:1.035, zIndex:5, transition:{ duration:0.4, ease:POP_EASE } }}
              style={{ background:'var(--black)', position:'relative', overflow:'hidden', cursor:'pointer', transition:'box-shadow 400ms' }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.boxShadow = '0 30px 80px rgba(232,23,106,0.45), inset 0 0 0 1.5px rgba(232,23,106,0.7), 0 0 60px rgba(232,23,106,0.2)';
                const img = el.querySelector('.svc-img'); if (img) { (img as HTMLElement).style.opacity='0.65'; (img as HTMLElement).style.transform='scale(1.08)'; }
                const num = el.querySelector('.svc-num') as HTMLElement | null; if (num) num.style.color='var(--accent)';
                const icon = el.querySelector('.svc-icon') as HTMLElement | null; if (icon) icon.style.transform='scale(1.15) rotate(-3deg)';
                const desc = el.querySelector('.svc-desc') as HTMLElement | null; if (desc) { desc.style.opacity='1'; desc.style.transform='translateY(0)'; }
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.boxShadow = 'none';
                const img = el.querySelector('.svc-img'); if (img) { (img as HTMLElement).style.opacity='0.45'; (img as HTMLElement).style.transform='scale(1)'; }
                const num = el.querySelector('.svc-num') as HTMLElement | null; if (num) num.style.color='var(--white-20)';
                const icon = el.querySelector('.svc-icon') as HTMLElement | null; if (icon) icon.style.transform='scale(1) rotate(0)';
                const desc = el.querySelector('.svc-desc') as HTMLElement | null; if (desc) { desc.style.opacity='0'; desc.style.transform='translateY(8px)'; }
              }}
            >
              {/* Background image — bright, no grayscale */}
              <div style={{ position:'absolute', inset:0, zIndex:0 }}>
                <img
                  src={s.img} alt={s.n} loading="lazy"
                  className="svc-img"
                  style={{ width:'100%', height:'100%', objectFit:'cover', opacity:0.45, transition:'opacity 500ms, transform 700ms var(--ease-expo)' }}
                />
                <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(9,9,8,0.92) 30%, rgba(9,9,8,0.55) 100%)' }} />
              </div>

              {/* Card content */}
              <div style={{ position:'relative', zIndex:1, padding:'24px', minHeight:'240px', display:'flex', flexDirection:'column', justifyContent:'space-between' }}>
                {/* Top row: icon + number */}
                <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between' }}>
                  <span className="svc-icon" style={{ color:'var(--accent)', opacity:0.95, display:'inline-flex', transition:'transform 350ms var(--ease-expo)' }}>{s.icon}</span>
                  <span className="svc-num" style={{ fontFamily:'var(--font-body)', fontSize:'11px', fontWeight:500, letterSpacing:'0.15em', color:'var(--white-20)', transition:'color 300ms' }}>{s.num}</span>
                </div>

                {/* Bottom: title always visible, description hidden until hover */}
                <div>
                  <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(13px,1.3vw,17px)', textTransform:'uppercase', color:'var(--white)', letterSpacing:'0.02em', marginBottom:'10px', lineHeight:1.1 }}>
                    {s.n}
                  </h2>
                  <p className="svc-desc" style={{ fontFamily:'var(--font-body)', fontSize:'12px', fontWeight:400, lineHeight:1.75, color:'var(--white-70)', margin:0, opacity:0, transform:'translateY(8px)', transition:'opacity 350ms, transform 350ms var(--ease-expo)' }}>
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
