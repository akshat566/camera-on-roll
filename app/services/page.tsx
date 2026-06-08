'use client';
import Link from 'next/link';
import { Reveal } from '@/components/Reveal';
import { ServicesGrid } from '@/components/ServicesGrid';

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
          <div style={{ position:'absolute', top:'10%', right:'10%', width:'40vw', height:'40vw', borderRadius:'50%', background:'radial-gradient(circle, rgba(232,23,106,0.1) 0%, transparent 70%)', filter:'blur(60px)' }} />
        </div>

        <div className="cx split-hero" style={{ position:'relative', zIndex:1, display:'grid', alignItems:'center', paddingTop:'clamp(40px,6vw,52px)', paddingBottom:'clamp(40px,6vw,52px)', minHeight:'260px' }}>
          <div style={{ paddingRight:'clamp(0px,4vw,64px)' }}>
            <Reveal>
              <h1 style={{ fontFamily:'var(--font-display)', fontSize:'var(--fs-display)', textTransform:'uppercase', lineHeight:0.85, letterSpacing:'-0.02em', color:'var(--white)' }}>
                Our Services
              </h1>
            </Reveal>
          </div>
          <div className="split-divider" style={{ background:'var(--white-08)', height:'100px', alignSelf:'center' }} />
          <div style={{ paddingLeft:'clamp(0px,4vw,64px)' }}>
            <Reveal delay={0.15}>
              <p style={{ fontFamily:'var(--font-body)', fontSize:'14px', fontWeight:400, lineHeight:1.9, color:'var(--white-70)', maxWidth:'380px' }}>
                End-to-end creative production powered by technology, imagination, and storytelling. From concept to final frame, we bring ideas to life with precision and purpose.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── SERVICE CARDS GRID (shared with homepage) ───────────────────── */}
      <section style={{ background:'var(--black)' }}>
        <ServicesGrid />
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
            <Link href="/contact" className="btn btn-primary">{"Let\u2019s Work Together \u2192"}</Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
