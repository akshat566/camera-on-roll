'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Reveal } from '@/components/Reveal';
import { motion, AnimatePresence } from 'framer-motion';

const E = [0.22, 0.58, 0.32, 1] as const;

const STATS = [
  { v:'8+',   l:'Years of Work' },
  { v:'250+', l:'Projects Delivered' },
  { v:'40+',  l:'Brand Partners' },
  { v:'20+',  l:'Artists Collaborated' },
];

const VALUES = [
  { n:'Cinematic First',          d:'Every project — regardless of budget — is treated like a film production. We think in frames, not clips.' },
  { n:'Intelligence as Tool',     d:'AI is not a replacement for creativity. It is the sharpest tool in our kit, used with intention and purpose.' },
  { n:'Partnership, Not Vendor',  d:'We embed ourselves in your brand story. We are not executing briefs — we are building visual legacies.' },
  { n:'Quality Without Compromise',d:'We would rather decline a project than deliver something we are not proud of. Every frame is a signature.' },
];

const CLIENTS = ["L'Or\u00e9al Paris",'Sony Liv','Maybelline','Engage \u00b7 ITC','Flipkart','Matrix','Tresemm\u00e9','Lavie World','Artize','Cornetto','Breezer','Sofy','Lotto','Bombay Times'];

export default function AboutPage() {
  const [expandedValue, setExpandedValue] = useState<number | null>(null);
  const [expandedMission, setExpandedMission] = useState(false);

  return (
    <>
      {/* ══ HERO ═══════════════════════════════════════ */}
      <section style={{ position:'relative', minHeight:'100svh', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden', background:'var(--black)' }}>
        {/* Background image with overlay */}
        <div style={{ position:'absolute', inset:0, zIndex:0 }}>
          <img src="https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1920&q=80" alt="Cinematic production" loading="eager" style={{ width:'100%', height:'100%', objectFit:'cover', filter:'brightness(0.4) saturate(0.8)' }} />
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, var(--black) 0%, transparent 40%, var(--black) 100%)' }} />
          <div style={{ position:'absolute', top:'30%', right:'-15%', width:'50vw', height:'50vw', borderRadius:'50%', background:'radial-gradient(circle, rgba(232,23,106,0.12) 0%, transparent 70%)', filter:'blur(80px)' }} />
        </div>

        <div className="cx" style={{ position:'relative', zIndex:10, textAlign:'center', paddingTop:'var(--nav-h)' }}>
          <motion.p initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.9, ease:E }}
            style={{ fontFamily:'var(--font-body)', fontSize:'10px', fontWeight:600, letterSpacing:'0.44em', textTransform:'uppercase', color:'var(--accent)', marginBottom:'20px' }}>
            About Us
          </motion.p>
          <motion.h1 initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ duration:1.05, delay:0.1, ease:E }}
            style={{ fontFamily:'var(--font-display)', fontSize:'clamp(56px,10vw,140px)', textTransform:'uppercase', lineHeight:0.85, letterSpacing:'-0.04em', color:'var(--white)', marginBottom:'24px' }}>
            Camera On Roll
          </motion.h1>
          <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.85, delay:0.25, ease:E }}
            style={{ fontFamily:'var(--font-body)', fontSize:'clamp(14px,1.8vw,18px)', fontWeight:400, lineHeight:1.85, color:'var(--white-70)', maxWidth:'560px', margin:'0 auto 40px' }}>
            A production studio built at the intersection of cinema, creativity, and intelligence.
          </motion.p>
          <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7, delay:0.4, ease:E }}
            style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'12px' }}>
            <a href="#founders" style={{
              fontFamily:'var(--font-body)', fontSize:'11px', fontWeight:700,
              letterSpacing:'0.18em', textTransform:'uppercase',
              padding:'14px 32px', background:'var(--accent)', color:'#ffffff',
              display:'inline-flex', transition:'opacity var(--t-base)',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity='0.85')}
            onMouseLeave={e => (e.currentTarget.style.opacity='1')}
            >Meet the Founders</a>
          </motion.div>
        </div>

        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.2, duration:0.8 }}
          style={{ position:'absolute', bottom:'40px', left:'50%', transform:'translateX(-50%)', zIndex:10, display:'flex', flexDirection:'column', alignItems:'center', gap:'10px' }}>
          <span style={{ fontFamily:'var(--font-body)', fontSize:'8px', fontWeight:500, letterSpacing:'0.44em', textTransform:'uppercase', color:'var(--white-20)' }}>Scroll</span>
          <div className="scroll-line" />
        </motion.div>
      </section>

      {/* ══ FOUNDERS ═════════════════════════════════ */}
      <section id="founders" className="section-pad" style={{ borderTop:'1px solid var(--white-08)', background:'var(--black)' }}>
        <div className="cx">
          <Reveal>
            <p style={{ fontFamily:'var(--font-body)', fontSize:'10px', fontWeight:600, letterSpacing:'0.38em', textTransform:'uppercase', color:'var(--accent)', marginBottom:'16px' }}>Leadership</p>
            <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(36px,5vw,72px)', textTransform:'uppercase', lineHeight:0.92, letterSpacing:'-0.02em', color:'var(--white)', marginBottom:'clamp(48px,7vw,88px)' }}>
              The Founders
            </h2>
          </Reveal>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,360px),1fr))', gap:'clamp(40px,6vw,88px)' }}>
            {/* Akshat */}
            <Reveal delay={0.1}>
              <div style={{ position:'relative' }}>
                <div style={{ aspectRatio:'3/4', overflow:'hidden', background:'var(--surface)', marginBottom:'24px' }}>
                  <img src="https://pub-4d3cad9469854486ab973729b0a3541b.r2.dev/founders/akshat.jpg" alt="Akshat Bhardwaj"
                    loading="lazy" style={{ width:'100%', height:'100%', objectFit:'cover', filter:'grayscale(10%)', transition:'transform 600ms' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform='scale(1.05)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform='scale(1)'; }}
                  />
                </div>
                <p style={{ fontFamily:'var(--font-body)', fontSize:'9px', fontWeight:600, letterSpacing:'0.32em', textTransform:'uppercase', color:'var(--accent)', marginBottom:'8px' }}>Founder & Director</p>
                <h3 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(22px,2.8vw,36px)', textTransform:'uppercase', color:'var(--white)', marginBottom:'16px', lineHeight:1 }}>Akshat Bhardwaj</h3>
                <p style={{ fontFamily:'var(--font-body)', fontSize:'14px', lineHeight:1.85, color:'var(--white-70)' }}>
                  Akshat Bhardwaj is the Founder, CEO and Producer at Camera On Roll Production. With experience across advertising and production, he has worked with multiple agencies and leading brands across campaigns, branded content, travel, fashion, automotive, and commercial productions. A videographer and producer by profession, he heads Camera On Roll Production and oversees projects across creative direction, filmmaking, production management, cinematography, drone operations, and end to end execution from concept to delivery.
                </p>
              </div>
            </Reveal>

            {/* Ashna */}
            <Reveal delay={0.2}>
              <div style={{ position:'relative' }}>
                <div style={{ aspectRatio:'3/4', overflow:'hidden', background:'var(--surface)', marginBottom:'24px' }}>
                  <img src="https://pub-4d3cad9469854486ab973729b0a3541b.r2.dev/founders/ashna.jpg" alt="Ashna Chhabra"
                    loading="lazy" style={{ width:'100%', height:'100%', objectFit:'cover', filter:'grayscale(10%)', transition:'transform 600ms' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform='scale(1.05)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform='scale(1)'; }}
                  />
                </div>
                <p style={{ fontFamily:'var(--font-body)', fontSize:'9px', fontWeight:600, letterSpacing:'0.32em', textTransform:'uppercase', color:'var(--accent)', marginBottom:'8px' }}>Co-Founder & Creative Director</p>
                <h3 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(22px,2.8vw,36px)', textTransform:'uppercase', color:'var(--white)', marginBottom:'16px', lineHeight:1 }}>Ashna Chhabra</h3>
                <p style={{ fontFamily:'var(--font-body)', fontSize:'14px', lineHeight:1.85, color:'var(--white-70)' }}>
                  Ashna is the Co-Founder and Creative Director at Camera On Roll Production, bringing together a strategy-first mindset shaped by her consulting background at KPMG and 7+ years of experience across production and advertising. She leads projects with a strong focus on cinematic storytelling, brand thinking, and impactful execution. Her expertise spans creative direction, campaign curation, styling, budget allocation, and end-to-end production, overseeing projects from concept to final delivery.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ MISSION (Expandable) ═══════════════════════ */}
      <section className="section-pad" style={{ borderTop:'1px solid var(--white-08)', background:'var(--surface)' }}>
        <div className="cx">
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,380px),1fr))', gap:'clamp(40px,6vw,72px)', alignItems:'start' }}>
            <Reveal>
              <div>
                <p style={{ fontFamily:'var(--font-body)', fontSize:'10px', fontWeight:600, letterSpacing:'0.38em', textTransform:'uppercase', color:'var(--accent)', marginBottom:'16px' }}>Our Purpose</p>
                <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(28px,3.5vw,52px)', textTransform:'uppercase', lineHeight:0.92, color:'var(--white)', marginBottom:'24px' }}>
                  Mission
                </h2>
                <p style={{ fontFamily:'var(--font-body)', fontSize:'14px', lineHeight:1.85, color:'var(--white-70)', marginBottom:'20px' }}>
                  To elevate visual storytelling through cinematic craft and intelligent technology — creating work that moves culture and builds lasting brand legacies.
                </p>
                <button onClick={() => setExpandedMission(!expandedMission)}
                  style={{
                    fontFamily:'var(--font-body)', fontSize:'10px', fontWeight:600,
                    letterSpacing:'0.18em', textTransform:'uppercase',
                    padding:'10px 24px', background:'transparent', color:'var(--accent)',
                    border:'1px solid var(--accent)', cursor:'pointer',
                    display:'inline-flex', alignItems:'center', gap:'8px',
                    transition:'all var(--t-base)',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background='var(--accent-soft)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background='transparent'; }}
                >
                  {expandedMission ? 'Hide' : 'Read More'}
                  <svg width="10" height="10" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ transition:'transform 300ms', transform: expandedMission ? 'rotate(180deg)' : 'rotate(0deg)' }}><path d="M2 5l5 5 5-5"/></svg>
                </button>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <AnimatePresence>
                {expandedMission && (
                  <motion.div initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:'auto' }} exit={{ opacity:0, height:0 }} transition={{ duration:0.4, ease:E }}>
                    <div style={{ paddingTop:'20px', borderTop:'1px solid var(--white-08)' }}>
                      <p style={{ fontFamily:'var(--font-body)', fontSize:'14px', lineHeight:1.85, color:'var(--white-70)', marginBottom:'16px' }}>
                        Camera On Roll Production was built from a simple but profound belief: that visual storytelling is the most powerful force in culture. Every brand, every artist, every vision deserves to be told with the craft of cinema.
                      </p>
                      <p style={{ fontFamily:'var(--font-body)', fontSize:'14px', lineHeight:1.85, color:'var(--white-70)', marginBottom:'16px' }}>
                        We founded COR in Mumbai with a focus on cinematic quality for commercial work — applying the discipline, patience, and intention of filmmaking to every ad, every music video, every product film.
                      </p>
                      <p style={{ fontFamily:'var(--font-body)', fontSize:'14px', lineHeight:1.85, color:'var(--white-70)' }}>
                        Today, COR merges that foundation with the power of AI — creating a new category of studio operating at the intersection of art, technology, and intelligence.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ STATS (Visual) ═════════════════════════════ */}
      <div style={{ borderBottom:'1px solid var(--white-08)' }}>
        <div className="cx">
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'1px', background:'var(--white-08)' }}>
            {STATS.map((s, i) => (
              <Reveal key={s.l} delay={i*0.07}>
                <div style={{ background:'var(--black)', padding:'clamp(32px,4vw,56px) clamp(16px,2vw,32px)', textAlign:'center', position:'relative', overflow:'hidden' }}>
                  <div style={{ position:'absolute', top:'0', left:'0', right:'0', height:'1px', background:'linear-gradient(to right, transparent, var(--accent), transparent)', opacity:0.3 }} />
                  <div style={{ fontFamily:'var(--font-display)', fontSize:'clamp(36px,5vw,64px)', textTransform:'uppercase', color:'var(--white)', lineHeight:1, marginBottom:'8px', letterSpacing:'-0.02em' }}>{s.v}</div>
                  <div style={{ fontFamily:'var(--font-body)', fontSize:'9px', fontWeight:500, letterSpacing:'0.32em', textTransform:'uppercase', color:'var(--white-70)' }}>{s.l}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ══ VALUES (Expandable Cards) ═════════════════ */}
      <section className="section-pad" style={{ borderTop:'1px solid var(--white-08)', background:'var(--black)' }}>
        <div className="cx">
          <Reveal>
            <p style={{ fontFamily:'var(--font-body)', fontSize:'10px', fontWeight:600, letterSpacing:'0.38em', textTransform:'uppercase', color:'var(--accent)', marginBottom:'16px' }}>What We Believe</p>
            <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(28px,3.5vw,52px)', textTransform:'uppercase', lineHeight:0.92, color:'var(--white)', marginBottom:'clamp(40px,6vw,72px)' }}>Our Values.</h2>
          </Reveal>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(min(100%,300px),1fr))', gap:'1px', background:'var(--white-08)' }}>
            {VALUES.map((v, i) => (
              <Reveal key={v.n} delay={i*0.08}>
                <div style={{ background:'var(--surface)', padding:'clamp(24px,3vw,40px)', height:'100%', cursor:'pointer', transition:'background var(--t-base)' }}
                  onClick={() => setExpandedValue(expandedValue === i ? null : i)}
                  onMouseEnter={e => { if (expandedValue !== i) ((e.currentTarget as HTMLElement).style.background='var(--surface-2)'); }}
                  onMouseLeave={e => { if (expandedValue !== i) ((e.currentTarget as HTMLElement).style.background='var(--surface)'); }}
                >
                  <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:'16px' }}>
                    <p style={{ fontFamily:'var(--font-body)', fontSize:'9px', fontWeight:600, letterSpacing:'0.3em', textTransform:'uppercase', color:'var(--accent)' }}>0{i+1}</p>
                    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="var(--white-40)" strokeWidth="1.5" style={{ transition:'transform 300ms', transform: expandedValue === i ? 'rotate(180deg)' : 'rotate(0deg)' }}><path d="M2 5l5 5 5-5"/></svg>
                  </div>
                  <h3 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(14px,1.5vw,19px)', textTransform:'uppercase', color:'var(--white)', marginBottom:'12px', lineHeight:1.1 }}>{v.n}</h3>
                  <AnimatePresence>
                    {expandedValue === i && (
                      <motion.p initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:'auto' }} exit={{ opacity:0, height:0 }} transition={{ duration:0.3, ease:E }}
                        style={{ fontFamily:'var(--font-body)', fontSize:'13px', lineHeight:1.85, color:'var(--white-70)' }}
                      >
                        {v.d}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CLIENTS MARQUEE ═════════════════════════ */}
      <div style={{ borderBottom:'1px solid var(--white-08)', overflow:'hidden', padding:'clamp(32px,4vw,56px) 0' }}>
        <div className="cx" style={{ display:'flex', alignItems:'center', gap:'32px' }}>
          <span style={{ fontFamily:'var(--font-body)', fontSize:'8px', fontWeight:500, letterSpacing:'0.38em', textTransform:'uppercase', color:'var(--accent)', flexShrink:0 }}>Trusted By</span>
          <div style={{ overflow:'hidden', flex:1, minWidth:0 }}>
            <div className="marquee">
              {[...CLIENTS,...CLIENTS].map((c,i) => (
                <span key={i} style={{ fontFamily:'var(--font-body)', fontSize:'11px', fontWeight:500, letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--white-40)', padding:'0 28px', flexShrink:0 }}>{c}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ══ CTA ═══════════════════════════════════════ */}
      <section className="section-pad" style={{ borderTop:'1px solid var(--white-08)', textAlign:'center', background:'var(--black)' }}>
        <div className="cx-narrow">
          <Reveal>
            <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(36px,5.5vw,78px)', textTransform:'uppercase', lineHeight:0.88, letterSpacing:'-0.02em', color:'var(--white)', marginBottom:'40px' }}>
              {"Ready to Create Together?"}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Link href="/contact" style={{
              fontFamily:'var(--font-body)', fontSize:'11px', fontWeight:700,
              letterSpacing:'0.18em', textTransform:'uppercase',
              padding:'14px 32px', background:'var(--accent)', color:'#fff',
              display:'inline-flex', alignItems:'center', gap:'8px',
              transition:'box-shadow 400ms',
            }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow='0 0 50px rgba(232,23,106,0.4)'; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow='none'; }}
            >Get in Touch →</Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
