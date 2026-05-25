'use client';
import Link from 'next/link';
import { Reveal } from '@/components/Reveal';
import { motion } from 'framer-motion';

const E = [0.22, 0.58, 0.32, 1] as const;

const CAPABILITIES = [
  { n:'AI Films',                  d:'Cinematic brand films and campaigns built with AI — from concept to final cut.' },
  { n:'AI UGC Content',            d:'Performance-driven ad variants generated for every audience segment at scale.' },
  { n:'AI Music Videos',           d:'Visual narratives for music powered by generative AI — cinematic, fast, scalable.' },
  { n:'AI Product Commercials',    d:'Studio-quality product films and 3D renders without a physical shoot.' },
  { n:'AI Human Character Training', d:'Photorealistic AI spokespeople and brand ambassadors trained for your brand.' },
  { n:'AI Consistency, VFX & More',  d:'Visual consistency pipelines, VFX, sound design, and post — all powered by AI.' },
];

export default function AtomPage() {
  return (
    <>
      {/* ══ HERO ══════════════════════════════════ */}
      <section style={{ position:'relative', minHeight:'100svh', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden', background:'var(--black)' }}>
        <div style={{ position:'absolute', inset:0, opacity:0.05, backgroundImage:'radial-gradient(circle at 50% 50%, var(--accent) 1px, transparent 1px)', backgroundSize:'60px 60px' }} />
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(232,23,106,0.07) 0%, transparent 70%)' }} />

        <div className="cx" style={{ position:'relative', zIndex:10, textAlign:'center', paddingTop:'var(--nav-h)' }}>
          <motion.p initial={{ opacity:0, y:6 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.9, ease:E }}
            style={{ fontFamily:'var(--font-body)', fontSize:'10px', fontWeight:600, letterSpacing:'0.44em', textTransform:'uppercase', color:'var(--accent)', marginBottom:'16px' }}>
            AI Division — Camera On Roll
          </motion.p>
          <motion.div initial={{ opacity:0, y:32 }} animate={{ opacity:1, y:0 }} transition={{ duration:1.05, delay:0.1, ease:E }}
            style={{ fontFamily:'var(--font-display)', fontSize:'clamp(88px,19vw,220px)', textTransform:'uppercase', lineHeight:0.85, letterSpacing:'-0.04em', color:'var(--white)' }}>
            ATOM
          </motion.div>
          <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.8, delay:0.28, ease:E }}
            style={{ fontFamily:'var(--font-body)', fontSize:'10px', fontWeight:500, letterSpacing:'0.36em', textTransform:'uppercase', color:'var(--white-40)', marginTop:'16px', marginBottom:'16px' }}>
            Powered by O.N.E — One Neural Entertainment
          </motion.p>
          <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.85, delay:0.38, ease:E }}
            style={{ fontFamily:'var(--font-body)', fontSize:'15px', fontWeight:400, lineHeight:1.88, color:'var(--white-70)', maxWidth:'520px', margin:'0 auto 40px' }}>
            Your virtual brain. ATOM knows everything about creative production and can do anything you imagine — from concept to final cut, at the speed of thought.
          </motion.p>
          <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7, delay:0.5, ease:E }}
            style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'14px', flexWrap:'wrap' }}>
            <Link href="/contact" style={{
              fontFamily:'var(--font-body)', fontSize:'11px', fontWeight:700,
              letterSpacing:'0.18em', textTransform:'uppercase',
              padding:'14px 32px', background:'var(--accent)', color:'#ffffff',
              display:'inline-flex', transition:'opacity var(--t-base)',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity='0.85')}
            onMouseLeave={e => (e.currentTarget.style.opacity='1')}
            >Work with ATOM</Link>
            <a href="#showcase" style={{
              fontFamily:'var(--font-body)', fontSize:'11px', fontWeight:500,
              letterSpacing:'0.18em', textTransform:'uppercase',
              padding:'14px 32px', border:'1px solid var(--white-20)', color:'var(--white-70)',
              display:'inline-flex', transition:'border-color var(--t-base), color var(--t-base)',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor='var(--accent-dim)'; e.currentTarget.style.color='var(--accent)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor='var(--white-20)'; e.currentTarget.style.color='var(--white-70)'; }}
            >View Showcase</a>
          </motion.div>
        </div>

        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.4, duration:0.8 }}
          style={{ position:'absolute', bottom:'40px', left:'50%', transform:'translateX(-50%)', zIndex:10, display:'flex', flexDirection:'column', alignItems:'center', gap:'10px' }}>
          <span style={{ fontFamily:'var(--font-body)', fontSize:'8px', fontWeight:500, letterSpacing:'0.44em', textTransform:'uppercase', color:'var(--white-20)' }}>Scroll</span>
          <div className="scroll-line" />
        </motion.div>
      </section>

      {/* ══ OUR AI ENGINE ═════════════════════════════ */}
      <section className="section-pad" style={{ borderTop:'1px solid var(--white-08)', background:'var(--black)', minHeight:'100svh', display:'flex', alignItems:'center' }}>
        <div className="cx" style={{ width:'100%' }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'clamp(32px,5vw,72px)', alignItems:'center' }}>
            {/* Left — copy + capability grid */}
            <div>
              <Reveal>
                <p style={{ fontFamily:'var(--font-body)', fontSize:'9px', fontWeight:600, letterSpacing:'0.38em', textTransform:'uppercase', color:'var(--accent)', marginBottom:'16px' }}>Proprietary Tech</p>
              </Reveal>
              <Reveal delay={0.06}>
                <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(36px,5vw,72px)', textTransform:'uppercase', lineHeight:0.92, letterSpacing:'-0.02em', color:'var(--white)', margin:'0 0 24px' }}>
                  Our <span style={{ color:'var(--accent)' }}>AI</span> Engine
                </h2>
              </Reveal>
              <Reveal delay={0.12}>
                <p style={{ fontFamily:'var(--font-body)', fontSize:'14px', fontWeight:400, lineHeight:1.85, color:'var(--white-70)', margin:'0 0 20px', maxWidth:'480px' }}>
                  We&apos;ve built our own in-house generative AI platform for photo and video production — giving brands access to creative capabilities that didn&apos;t exist before. From photorealistic AI imagery to AI-enhanced video post-production, our technology accelerates timelines and expands creative possibilities.
                </p>
              </Reveal>
              <Reveal delay={0.18}>
                <p style={{ fontFamily:'var(--font-body)', fontSize:'14px', fontWeight:400, lineHeight:1.85, color:'var(--white-70)', margin:'0 0 32px', maxWidth:'480px' }}>
                  Trained on thousands of brand visuals and refined through real production cycles, our models understand aesthetics — not just pixels. This is AI that actually understands creative intent.
                </p>
              </Reveal>

              {/* Capability cards */}
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1px', background:'var(--white-08)' }}>
                {[
                  { icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
                  ), title:'AI Photo Gen', desc:'Photorealistic product and lifestyle imagery generated at scale, in-brand.' },
                  { icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5"><path d="M5 3l14 9-14 9V3z"/></svg>
                  ), title:'AI Video Enhance', desc:'Frame interpolation, upscaling, and AI-driven color grading for any footage.' },
                  { icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><path d="M4.93 4.93l4.24 4.24M14.83 14.83l4.24 4.24M4.93 19.07l4.24-4.24M14.83 9.17l4.24-4.24"/></svg>
                  ), title:'Style Transfer', desc:'Apply any visual aesthetic or brand style consistently across entire content libraries.' },
                  { icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                  ), title:'Generative Video', desc:'Text-to-video and image-to-video pipelines for campaign concepts and storyboards.' },
                ].map((c, i) => (
                  <Reveal key={c.title} delay={0.22 + i*0.05}>
                    <div style={{ background:'var(--black)', padding:'clamp(20px,2.5vw,32px)', height:'100%', transition:'background var(--t-base)' }}
                      onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background='var(--surface-2)')}
                      onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background='var(--black)')}
                    >
                      <div style={{ marginBottom:'14px', display:'flex', alignItems:'center', justifyContent:'center', width:'36px', height:'36px', border:'1px solid var(--white-08)' }}>
                        {c.icon}
                      </div>
                      <h3 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(12px,1.1vw,15px)', textTransform:'uppercase', color:'var(--white)', margin:'0 0 8px', lineHeight:1.1 }}>{c.title}</h3>
                      <p style={{ fontFamily:'var(--font-body)', fontSize:'12px', lineHeight:1.75, color:'var(--white-40)', margin:0 }}>{c.desc}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            {/* Right — image gallery */}
            <div style={{ display:'flex', flexDirection:'column', gap:'4px' }}>
              <Reveal delay={0.1}>
                <div style={{ position:'relative', overflow:'hidden', aspectRatio:'16/10' }}>
                  <img src="https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=1200&q=80" alt="AI Photo Fashion" loading="lazy" style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }} />
                  <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(9,9,8,0.35), transparent 60%)' }} />
                  <span style={{ position:'absolute', top:'12px', right:'12px', fontFamily:'var(--font-body)', fontSize:'8px', fontWeight:700, letterSpacing:'0.24em', textTransform:'uppercase', padding:'6px 12px', background:'var(--accent)', color:'#fff' }}>Powered by COR AI</span>
                  <span style={{ position:'absolute', bottom:'12px', left:'12px', fontFamily:'var(--font-body)', fontSize:'8px', fontWeight:700, letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--white)', background:'rgba(9,9,8,0.6)', padding:'4px 8px' }}>AI Photo · Fashion</span>
                </div>
              </Reveal>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'4px' }}>
                <Reveal delay={0.2}>
                  <div style={{ position:'relative', overflow:'hidden', aspectRatio:'1/1' }}>
                    <img src="https://images.unsplash.com/photo-1635776062764-e025521e3df3?w=800&q=80" alt="Generative Art" loading="lazy" style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }} />
                    <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(9,9,8,0.35), transparent 60%)' }} />
                    <span style={{ position:'absolute', bottom:'12px', left:'12px', fontFamily:'var(--font-body)', fontSize:'8px', fontWeight:700, letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--white)', background:'rgba(9,9,8,0.6)', padding:'4px 8px' }}>Generative Art</span>
                  </div>
                </Reveal>
                <Reveal delay={0.3}>
                  <div style={{ position:'relative', overflow:'hidden', aspectRatio:'1/1' }}>
                    <img src="https://images.unsplash.com/photo-1574169208507-84376144848b?w=800&q=80" alt="AI Video Frame" loading="lazy" style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }} />
                    <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(9,9,8,0.35), transparent 60%)' }} />
                    <span style={{ position:'absolute', bottom:'12px', left:'12px', fontFamily:'var(--font-body)', fontSize:'8px', fontWeight:700, letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--white)', background:'rgba(9,9,8,0.6)', padding:'4px 8px' }}>AI Video Frame</span>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ CAPABILITIES ════════════════════════════ */}
      <section className="section-pad" style={{ borderTop:'1px solid var(--white-08)', background:'var(--surface)' }}>
        <div className="cx">
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,380px),1fr))', gap:'clamp(32px,5vw,72px)', alignItems:'start', marginBottom:'clamp(48px,7vw,80px)' }}>
            <Reveal>
              <p style={{ fontFamily:'var(--font-body)', fontSize:'10px', fontWeight:600, letterSpacing:'0.38em', textTransform:'uppercase', color:'var(--accent)', marginBottom:'16px' }}>What ATOM Does</p>
              <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(28px,3.5vw,52px)', textTransform:'uppercase', lineHeight:0.92, color:'var(--white)' }}>AI Capabilities</h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p style={{ fontFamily:'var(--font-body)', fontSize:'15px', fontWeight:400, lineHeight:1.9, color:'var(--white-70)' }}>
                ATOM integrates cutting-edge generative AI into every phase of production — not as a gimmick, but as the core engine. We have engineered pipelines that merge AI generation with human creative direction to produce results that are both intelligent and emotionally powerful.
              </p>
            </Reveal>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:'1px', background:'var(--white-08)' }}>
            {CAPABILITIES.map((s,i) => (
              <Reveal key={s.n} delay={i*0.06}>
                <div style={{ background:'var(--black)', padding:'clamp(24px,3vw,40px)', height:'100%', transition:'background var(--t-base)' }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background='var(--surface-2)')}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background='var(--black)')}
                >
                  <p style={{ fontFamily:'var(--font-body)', fontSize:'9px', fontWeight:600, letterSpacing:'0.3em', textTransform:'uppercase', color:'var(--accent)', marginBottom:'18px' }}>0{i+1}</p>
                  <h3 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(14px,1.5vw,19px)', textTransform:'uppercase', color:'var(--white)', marginBottom:'12px', lineHeight:1.1 }}>{s.n}</h3>
                  <p style={{ fontFamily:'var(--font-body)', fontSize:'13px', lineHeight:1.85, color:'var(--white-40)' }}>{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SHOWCASE ══════════════════════════════════ */}
      <section id="showcase" className="section-pad" style={{ borderTop:'1px solid var(--white-08)', background:'var(--black)' }}>
        <div className="cx" style={{ textAlign:'center' }}>
          <Reveal>
            <p style={{ fontFamily:'var(--font-body)', fontSize:'10px', fontWeight:600, letterSpacing:'0.38em', textTransform:'uppercase', color:'var(--accent)', marginBottom:'16px' }}>Showreel</p>
            <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(28px,3.5vw,52px)', textTransform:'uppercase', lineHeight:0.92, color:'var(--white)', marginBottom:'clamp(36px,5vw,64px)' }}>
              Showcase
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div style={{ position:'relative', width:'100%', aspectRatio:'16/9', background:'var(--surface)', border:'1px solid var(--white-08)', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <p style={{ fontFamily:'var(--font-body)', fontSize:'14px', color:'var(--white-40)' }}>Showcase videos coming soon</p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
