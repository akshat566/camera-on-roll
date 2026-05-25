'use client';
import { Reveal } from '@/components/Reveal';

const STATS = [
  { v:'8+',   l:'years of experience' },
  { v:'150+', l:'Projects Delivered' },
  { v:'40+',  l:'Brand Partners' },
  { v:'20+',  l:'Artists Collaborated' },
];

const CLIENTS = ["L'Or\u00e9al Paris",'Sony Liv','Maybelline','Engage \u00b7 ITC','Flipkart','Matrix','Tresemm\u00e9','Lavie World','Artize','Cornetto','Breezer','Sofy','Lotto','Bombay Times'];

export default function AboutPage() {
  return (
    <>
      {/* ══ FOUNDERS ═════════════════════════════════ */}
      <section id="founders" className="section-pad" style={{ borderTop:'1px solid var(--white-08)', background:'var(--black)', paddingTop:'calc(var(--nav-h) + var(--section))' }}>
        <div className="cx">
          <Reveal>
            <p style={{ fontFamily:'var(--font-body)', fontSize:'10px', fontWeight:600, letterSpacing:'0.38em', textTransform:'uppercase', color:'var(--accent)', marginBottom:'16px' }}>Leadership</p>
            <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(36px,5vw,72px)', textTransform:'uppercase', lineHeight:0.92, letterSpacing:'-0.02em', color:'var(--white)', marginBottom:'clamp(48px,7vw,88px)' }}>
              The Founders
            </h2>
          </Reveal>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,280px),1fr))', gap:'clamp(40px,6vw,88px)' }}>
            {/* Akshat */}
            <Reveal delay={0.1}>
              <div style={{ position:'relative' }}>
                <div style={{ aspectRatio:'4/5', maxWidth:'320px', overflow:'hidden', background:'var(--surface)', marginBottom:'20px' }}>
                  <img src="https://pub-4d3cad9469854486ab973729b0a3541b.r2.dev/founders/akshat.jpg" alt="Akshat Bhardwaj"
                    loading="lazy" style={{ width:'100%', height:'100%', objectFit:'cover', filter:'grayscale(10%)', transition:'transform 600ms' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform='scale(1.05)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform='scale(1)'; }}
                  />
                </div>
                <h3 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(20px,2.4vw,32px)', textTransform:'uppercase', color:'var(--white)', marginBottom:'6px', lineHeight:1 }}>Akshat Bhardwaj</h3>
                <p style={{ fontFamily:'var(--font-body)', fontSize:'9px', fontWeight:600, letterSpacing:'0.32em', textTransform:'uppercase', color:'var(--accent)', marginBottom:'14px' }}>Founder & Producer</p>
                <p style={{ fontFamily:'var(--font-body)', fontSize:'14px', lineHeight:1.85, color:'var(--white-70)' }}>
                  Akshat Bhardwaj is the Founder, CEO and Producer at Camera On Roll Production. With experience across advertising and production, he has worked with multiple agencies and leading brands across campaigns, branded content, travel, fashion, automotive, and commercial productions. A videographer and producer by profession, he heads Camera On Roll Production and oversees projects across creative direction, filmmaking, production management, cinematography, drone operations, and end to end execution from concept to delivery.
                </p>
              </div>
            </Reveal>

            {/* Ashna */}
            <Reveal delay={0.2}>
              <div style={{ position:'relative' }}>
                <div style={{ aspectRatio:'4/5', maxWidth:'320px', overflow:'hidden', background:'var(--surface)', marginBottom:'20px' }}>
                  <img src="https://pub-4d3cad9469854486ab973729b0a3541b.r2.dev/founders/ashna.jpg" alt="Ashna Chhabra"
                    loading="lazy" style={{ width:'100%', height:'100%', objectFit:'cover', filter:'grayscale(10%)', transition:'transform 600ms' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform='scale(1.05)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform='scale(1)'; }}
                  />
                </div>
                <h3 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(20px,2.4vw,32px)', textTransform:'uppercase', color:'var(--white)', marginBottom:'6px', lineHeight:1 }}>Ashna Chhabra</h3>
                <p style={{ fontFamily:'var(--font-body)', fontSize:'9px', fontWeight:600, letterSpacing:'0.32em', textTransform:'uppercase', color:'var(--accent)', marginBottom:'14px' }}>Co-Founder & Creative Director</p>
                <p style={{ fontFamily:'var(--font-body)', fontSize:'14px', lineHeight:1.85, color:'var(--white-70)' }}>
                  Ashna is the Co-Founder and Creative Director at Camera On Roll Production, bringing together a strategy-first mindset shaped by her consulting background at KPMG and 7+ years of experience across production and advertising. She leads projects with a strong focus on cinematic storytelling, brand thinking, and impactful execution. Her expertise spans creative direction, campaign curation, styling, budget allocation, and end-to-end production, overseeing projects from concept to final delivery.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ STATS ═════════════════════════════ */}
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

    </>
  );
}
