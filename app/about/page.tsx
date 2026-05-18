'use client';
import Link from 'next/link';
import { Reveal } from '@/components/Reveal';

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
  return (
    <>
      {/* Header */}
      <section style={{ paddingTop:'var(--nav-h)', borderBottom:'1px solid var(--white-08)' }}>
        <div className="cx" style={{ paddingTop:'clamp(48px,6vw,88px)', paddingBottom:'clamp(40px,5vw,72px)' }}>
          <Reveal>
            <p style={{ fontFamily:'var(--font-body)', fontSize:'10px', fontWeight:500, letterSpacing:'0.38em', textTransform:'uppercase', color:'var(--gold)', marginBottom:'16px' }}>Who We Are</p>
            <h1 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(34px,5.5vw,80px)', textTransform:'uppercase', lineHeight:0.88, letterSpacing:'-0.02em', color:'var(--white)', maxWidth:'760px' }}>
              Built to Create.<br />Driven to Elevate.
            </h1>
          </Reveal>
        </div>
      </section>

      {/* Founder */}
      <section className="section-pad" style={{ borderBottom:'1px solid var(--white-08)' }}>
        <div className="cx">
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,380px),1fr))', gap:'clamp(40px,6vw,88px)', alignItems:'start' }}>
            <Reveal>
              <div style={{ aspectRatio:'3/4', overflow:'hidden', background:'var(--surface)' }}>
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=85" alt="Akshat Bhardwaj"
                  loading="lazy" style={{ width:'100%', height:'100%', objectFit:'cover', filter:'grayscale(10%)' }} />
              </div>
            </Reveal>
            <Reveal delay={0.14}>
              <div style={{ paddingTop:'clamp(0px,2vw,32px)' }}>
                <p style={{ fontFamily:'var(--font-body)', fontSize:'10px', fontWeight:500, letterSpacing:'0.38em', textTransform:'uppercase', color:'var(--gold)', marginBottom:'20px' }}>Founder</p>
                <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(22px,2.8vw,40px)', textTransform:'uppercase', color:'var(--white)', marginBottom:'28px', lineHeight:1 }}>Akshat Bhardwaj</h2>
                <p style={{ fontFamily:'var(--font-body)', fontSize:'15px', lineHeight:1.9, color:'var(--white-70)', marginBottom:'20px' }}>
                  Camera On Roll Production was built from a simple but profound belief: that visual storytelling is the most powerful force in culture. Every brand, every artist, every vision deserves to be told with the craft of cinema.
                </p>
                <p style={{ fontFamily:'var(--font-body)', fontSize:'15px', lineHeight:1.9, color:'var(--white-70)', marginBottom:'20px' }}>
                  Akshat founded COR in Mumbai with a focus on cinematic quality for commercial work — applying the discipline, patience, and intention of filmmaking to every ad, every music video, every product film.
                </p>
                <p style={{ fontFamily:'var(--font-body)', fontSize:'15px', lineHeight:1.9, color:'var(--white-70)' }}>
                  Today, COR merges that foundation with the power of AI through ATOM — creating a new category of studio operating at the intersection of art, technology, and intelligence.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div style={{ borderBottom:'1px solid var(--white-08)' }}>
        <div className="cx">
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'1px', background:'var(--white-08)' }}>
            {STATS.map((s, i) => (
              <Reveal key={s.l} delay={i*0.07}>
                <div style={{ background:'var(--black)', padding:'clamp(24px,3.5vw,48px) clamp(16px,2vw,32px)', textAlign:'center' }}>
                  <div style={{ fontFamily:'var(--font-display)', fontSize:'clamp(32px,4vw,56px)', textTransform:'uppercase', color:'var(--white)', lineHeight:1, marginBottom:'8px' }}>{s.v}</div>
                  <div style={{ fontFamily:'var(--font-body)', fontSize:'9px', fontWeight:500, letterSpacing:'0.32em', textTransform:'uppercase', color:'var(--white-40)' }}>{s.l}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* Values */}
      <section className="section-pad" style={{ background:'var(--surface)', borderBottom:'1px solid var(--white-08)' }}>
        <div className="cx">
          <Reveal>
            <p style={{ fontFamily:'var(--font-body)', fontSize:'10px', fontWeight:500, letterSpacing:'0.38em', textTransform:'uppercase', color:'var(--gold)', marginBottom:'16px' }}>What We Believe</p>
            <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(28px,3.5vw,52px)', textTransform:'uppercase', lineHeight:0.92, color:'var(--white)', marginBottom:'clamp(40px,6vw,72px)' }}>Our Values.</h2>
          </Reveal>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(min(100%,320px),1fr))', gap:'1px', background:'var(--white-08)' }}>
            {VALUES.map((v, i) => (
              <Reveal key={v.n} delay={i*0.08}>
                <div style={{ background:'var(--surface)', padding:'clamp(28px,3.5vw,44px)', height:'100%' }}>
                  <p style={{ fontFamily:'var(--font-body)', fontSize:'9px', fontWeight:500, letterSpacing:'0.3em', textTransform:'uppercase', color:'var(--gold)', marginBottom:'20px' }}>0{i+1}</p>
                  <h3 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(15px,1.6vw,21px)', textTransform:'uppercase', color:'var(--white)', marginBottom:'14px', lineHeight:1.1 }}>{v.n}</h3>
                  <p style={{ fontFamily:'var(--font-body)', fontSize:'13px', lineHeight:1.85, color:'var(--white-40)' }}>{v.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Clients marquee */}
      <div style={{ borderBottom:'1px solid var(--white-08)', overflow:'hidden', padding:'clamp(24px,3.5vw,40px) 0' }}>
        <div className="cx" style={{ display:'flex', alignItems:'center', gap:'32px' }}>
          <span style={{ fontFamily:'var(--font-body)', fontSize:'8px', fontWeight:500, letterSpacing:'0.38em', textTransform:'uppercase', color:'var(--white-20)', flexShrink:0 }}>Brands</span>
          <div style={{ overflow:'hidden', flex:1, minWidth:0 }}>
            <div className="marquee">
              {[...CLIENTS,...CLIENTS].map((c,i) => (
                <span key={i} style={{ fontFamily:'var(--font-body)', fontSize:'11px', fontWeight:500, letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--white-40)', padding:'0 28px', flexShrink:0 }}>{c}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <section className="section-pad" style={{ textAlign:'center' }}>
        <div className="cx-narrow">
          <Reveal>
            <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(32px,5vw,72px)', textTransform:'uppercase', lineHeight:0.9, letterSpacing:'-0.02em', color:'var(--white)', marginBottom:'40px' }}>
              {"Ready to Create Together?"}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Link href="/contact" style={{
              fontFamily:'var(--font-body)', fontSize:'10px', fontWeight:600,
              letterSpacing:'0.2em', textTransform:'uppercase',
              padding:'14px 32px', background:'var(--white)', color:'var(--black)',
              display:'inline-flex', transition:'background var(--t-base)',
            }}
            onMouseEnter={e => (e.currentTarget.style.background='var(--gold)')}
            onMouseLeave={e => (e.currentTarget.style.background='var(--white)')}
            >Get in Touch</Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
