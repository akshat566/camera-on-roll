'use client';
import Link from 'next/link';
import { Reveal } from '@/components/Reveal';

const SERVICES = [
  { n:'Creative Direction',   sub:'Concepts that define brands and shape culture.',        d:'We develop the creative strategy, visual language, and conceptual framework for your brand. From mood boards to full pre-production decks — every project starts with intention.', tags:['Brand Strategy','Visual Identity','Concept Development'] },
  { n:'Commercial Films',     sub:'High-production stories built for impact and recall.',   d:'End-to-end production of commercials, brand films, and campaign videos. Casting, location, direction, crew, and post — cinematic brand stories at every budget level.', tags:['Ad Films','Brand Films','Campaign Spots'] },
  { n:'Music Video Production',sub:'Visual narratives that amplify the music.',             d:'We collaborate with artists and labels to produce music videos that feel like short films — narrative, performance, or abstract, matched to the sound.', tags:['Narrative Videos','Performance Shoots','Concept Reels'] },
  { n:'Event Coverage',       sub:'Premium documentation of your most important moments.', d:'Multi-camera event coverage for award shows, product launches, fashion weeks, and live performances. Cinematic editing that turns documentation into storytelling.', tags:['Award Shows','Fashion Events','Live Coverage'] },
  { n:'Aerial Cinematography',sub:'Scale, perspective, and dimension from above.',          d:'Licensed drone operations providing sweeping aerial footage for films, commercials, real estate, and events. Expert pilots with cinematic-grade equipment.', tags:['Licensed Drone Ops','Cinematic Aerials','Location Surveys'] },
  { n:'AI Visual Content',    sub:'Machine intelligence pushing the limits of creation.',   d:'Through ATOM, our AI division, we generate films, UGC content, digital humans, product shots, and scalable campaigns using the most advanced generative AI pipelines available.', tags:['AI Films','Digital Humans','Scalable UGC'] },
  { n:'Post Production',      sub:'Every cut, grade, and sound crafted to perfection.',     d:'Full-service post: editing, color grading (DaVinci Resolve), sound design, motion graphics, and VFX. We also offer standalone post services for external productions.', tags:['Color Grading','Sound Design','VFX & Motion'] },
  { n:'Photo & Product Shoots',sub:'Still imagery at the same cinematic standard.',         d:'Brand, product, and editorial photography with direction, lighting, and retouching that matches the quality of our video work. Studio and location.', tags:['Product Photography','Editorial Stills','E-commerce Imagery'] },
];

export default function ServicesPage() {
  return (
    <>
      {/* Header */}
      <section style={{ paddingTop:'var(--nav-h)', borderBottom:'1px solid var(--white-08)' }}>
        <div className="cx" style={{ paddingTop:'clamp(48px,6vw,88px)', paddingBottom:'clamp(40px,5vw,72px)' }}>
          <Reveal>
            <p style={{ fontFamily:'var(--font-body)', fontSize:'10px', fontWeight:500, letterSpacing:'0.38em', textTransform:'uppercase', color:'var(--gold)', marginBottom:'16px' }}>What We Offer</p>
            <h1 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(44px,7vw,96px)', textTransform:'uppercase', lineHeight:0.88, letterSpacing:'-0.02em', color:'var(--white)' }}>
              Services.
            </h1>
          </Reveal>
        </div>
      </section>

      {/* List */}
      <section>
        <div className="cx">
          {SERVICES.map((s, i) => (
            <Reveal key={s.n} delay={0.04}>
              <div style={{
                display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,320px),1fr))',
                gap:'clamp(16px,3vw,56px)', padding:'clamp(28px,4vw,52px) 0',
                borderBottom:'1px solid var(--white-08)', alignItems:'start',
              }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'var(--surface)'; el.style.marginLeft='-var(--pad-x)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
              >
                <div>
                  <p style={{ fontFamily:'var(--font-body)', fontSize:'9px', fontWeight:500, letterSpacing:'0.3em', textTransform:'uppercase', color:'var(--gold)', marginBottom:'16px' }}>0{i+1}</p>
                  <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(16px,2vw,26px)', textTransform:'uppercase', color:'var(--white)', lineHeight:1.05, marginBottom:'8px' }}>{s.n}</h2>
                  <p style={{ fontFamily:'var(--font-body)', fontSize:'11px', color:'var(--white-40)', fontWeight:400 }}>{s.sub}</p>
                </div>
                <div>
                  <p style={{ fontFamily:'var(--font-body)', fontSize:'14px', lineHeight:1.9, color:'var(--white-70)', marginBottom:'24px' }}>{s.d}</p>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:'8px' }}>
                    {s.tags.map(t => (
                      <span key={t} style={{ fontFamily:'var(--font-body)', fontSize:'8.5px', fontWeight:500, letterSpacing:'0.22em', textTransform:'uppercase', padding:'6px 14px', border:'1px solid var(--white-08)', color:'var(--white-40)' }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad" style={{ textAlign:'center' }}>
        <div className="cx-narrow">
          <Reveal>
            <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(32px,5vw,72px)', textTransform:'uppercase', lineHeight:0.9, letterSpacing:'-0.02em', color:'var(--white)', marginBottom:'40px' }}>
              {"Let's Build Something Memorable."}
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
            >Start a Project</Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
