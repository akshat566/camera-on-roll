'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Reveal } from '@/components/Reveal';

const EASE = [0.76, 0, 0.24, 1] as const;

export default function Home() {
  return (
    <>

      {/* ══ HERO — CINEMATIC OPENING ══════════════════ */}
      <section style={{
        position: 'relative', height: '100svh', overflow: 'hidden',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {/* Fullscreen background video */}
        <div style={{ position:'absolute', inset:0, zIndex:0 }}>
          <video
            autoPlay muted loop playsInline
            className="slow-zoom"
            style={{ width:'100%', height:'100%', objectFit:'cover', opacity:0.4 }}
            poster="https://images.unsplash.com/photo-1536240478700-b869ad10e128?w=1920&q=85"
          >
            <source src="https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4" type="video/mp4" />
          </video>
          {/* Dark overlay */}
          <div style={{ position:'absolute', inset:0, background:'rgba(9,9,8,0.65)' }} />
          {/* Bottom gradient */}
          <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'50%', background:'linear-gradient(to top, var(--black), transparent)' }} />
          {/* Accent light leak */}
          <div style={{ position:'absolute', top:'20%', right:'-10%', width:'40vw', height:'40vw', borderRadius:'50%', background:'radial-gradient(circle, rgba(232,23,106,0.08) 0%, transparent 70%)', filter:'blur(60px)' }} />
        </div>

        {/* Stacked typography */}
        <div style={{ position:'relative', zIndex:1, textAlign:'center', padding:'0 var(--pad-x)' }}>
          <motion.p
            initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:1, delay:0.2, ease:EASE }}
            style={{ fontFamily:'var(--font-body)', fontSize:'10px', fontWeight:500, letterSpacing:'0.5em', textTransform:'uppercase', color:'var(--accent)', marginBottom:'clamp(24px,4vw,48px)' }}
          >
            Cinema • AI • Future Visual Systems
          </motion.p>

          <motion.h1
            initial={{ opacity:0, y:40 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:1.2, delay:0.4, ease:EASE }}
            className="text-glow"
            style={{
              fontFamily:'var(--font-display)',
              fontSize:'clamp(48px, 12vw, 180px)',
              textTransform:'uppercase',
              lineHeight:0.85,
              letterSpacing:'-0.03em',
              color:'var(--white)',
              marginBottom:'clamp(24px,4vw,48px)',
            }}
          >
            Camera<br />On<br />Roll
          </motion.h1>

          <motion.p
            initial={{ opacity:0 }} animate={{ opacity:1 }}
            transition={{ duration:1, delay:1, ease:EASE }}
            style={{ fontFamily:'var(--font-body)', fontSize:'12px', fontWeight:400, letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--white-40)', marginBottom:'clamp(36px,5vw,64px)' }}
          >
            A creative tech studio built for modern brands
          </motion.p>

          <motion.div
            initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:0.8, delay:1.3, ease:EASE }}
          >
            <Link href="/work" style={{
              fontFamily:'var(--font-body)', fontSize:'10px', fontWeight:600,
              letterSpacing:'0.3em', textTransform:'uppercase',
              padding:'18px 48px',
              border:'1px solid var(--white-20)', color:'var(--white-70)',
              display:'inline-flex', alignItems:'center',
              transition:'border-color 400ms, color 400ms, box-shadow 400ms',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor='var(--accent)'; e.currentTarget.style.color='var(--white)'; e.currentTarget.style.boxShadow='0 0 40px rgba(232,23,106,0.2)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor='var(--white-20)'; e.currentTarget.style.color='var(--white-70)'; e.currentTarget.style.boxShadow='none'; }}
            >
              Enter
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity:0 }} animate={{ opacity:1 }}
          transition={{ delay:2, duration:1 }}
          style={{ position:'absolute', bottom:'36px', left:'50%', transform:'translateX(-50%)', display:'flex', flexDirection:'column', alignItems:'center', gap:'10px' }}
        >
          <div className="scroll-line" />
        </motion.div>
      </section>

      {/* ══ AI × CINEMA ══════════════════════════════════ */}
      <section style={{ padding:'clamp(120px,16vw,240px) 0', borderTop:'1px solid var(--white-08)' }}>
        <div className="cx" style={{ maxWidth:'860px' }}>
          <Reveal>
            <p style={{ fontFamily:'var(--font-body)', fontSize:'9px', fontWeight:500, letterSpacing:'0.5em', textTransform:'uppercase', color:'var(--accent)', marginBottom:'32px' }}>AI × Cinema</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 style={{
              fontFamily:'var(--font-display)', textTransform:'uppercase',
              fontSize:'clamp(36px,6vw,88px)', lineHeight:0.88,
              letterSpacing:'-0.02em', color:'var(--white)', marginBottom:'32px',
            }}>
              Where Cinema<br />Meets Intelligence.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p style={{ fontFamily:'var(--font-body)', fontSize:'15px', fontWeight:400, lineHeight:1.9, color:'var(--white-40)', maxWidth:'560px', marginBottom:'48px' }}>
              We combine filmmaking with proprietary AI workflows to build the next generation of visual storytelling — faster, smarter, and more powerful than anything traditional production alone can create.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <Link href="/atom" style={{
              fontFamily:'var(--font-body)', fontSize:'10px', fontWeight:600,
              letterSpacing:'0.28em', textTransform:'uppercase',
              padding:'16px 40px', border:'1px solid var(--accent-dim)', color:'var(--accent)',
              display:'inline-flex', alignItems:'center',
              transition:'background 400ms, color 400ms, box-shadow 400ms',
            }}
            onMouseEnter={e => { e.currentTarget.style.background='var(--accent)'; e.currentTarget.style.color='#fff'; e.currentTarget.style.boxShadow='0 0 60px rgba(232,23,106,0.3)'; }}
            onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='var(--accent)'; e.currentTarget.style.boxShadow='none'; }}
            >Explore Atom →</Link>
          </Reveal>
        </div>
      </section>

      {/* ══ ATOM — MASSIVE TEASER ════════════════════════ */}
      <section style={{ padding:'clamp(100px,14vw,200px) 0', textAlign:'center', position:'relative', overflow:'hidden' }}>
        {/* Ambient glow */}
        <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:'60vw', height:'60vw', borderRadius:'50%', background:'radial-gradient(circle, rgba(232,23,106,0.06) 0%, transparent 70%)', filter:'blur(80px)', pointerEvents:'none' }} />

        <div className="cx" style={{ position:'relative' }}>
          <Reveal>
            <p style={{ fontFamily:'var(--font-body)', fontSize:'9px', fontWeight:500, letterSpacing:'0.5em', textTransform:'uppercase', color:'var(--accent)', marginBottom:'24px' }}>AI Division</p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="text-glow" style={{
              fontFamily:'var(--font-display)',
              fontSize:'clamp(100px, 22vw, 280px)',
              textTransform:'uppercase', lineHeight:0.8,
              letterSpacing:'-0.04em', color:'var(--white)',
              marginBottom:'24px',
            }}>
              ATOM
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <p style={{ fontFamily:'var(--font-body)', fontSize:'14px', fontWeight:400, lineHeight:1.85, color:'var(--white-40)', maxWidth:'420px', margin:'0 auto 40px' }}>
              An AI-powered creative ecosystem engineered to generate films, ads, and scalable campaigns at the speed of thought.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <Link href="/atom" style={{
              fontFamily:'var(--font-body)', fontSize:'10px', fontWeight:600,
              letterSpacing:'0.28em', textTransform:'uppercase',
              padding:'16px 40px', border:'1px solid var(--white-20)', color:'var(--white-70)',
              display:'inline-flex', alignItems:'center',
              transition:'border-color 400ms, color 400ms, box-shadow 400ms',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor='var(--accent)'; e.currentTarget.style.color='var(--accent)'; e.currentTarget.style.boxShadow='0 0 40px rgba(232,23,106,0.15)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor='var(--white-20)'; e.currentTarget.style.color='var(--white-70)'; e.currentTarget.style.boxShadow='none'; }}
            >Enter Atom →</Link>
          </Reveal>
        </div>
      </section>

      {/* ══ CONTACT CTA ════════════════════════════════════ */}
      <section style={{ padding:'clamp(100px,14vw,200px) 0', borderTop:'1px solid var(--white-08)', textAlign:'center' }}>
        <div className="cx-narrow">
          <Reveal>
            <h2 style={{
              fontFamily:'var(--font-display)', textTransform:'uppercase',
              fontSize:'clamp(40px,7vw,100px)', lineHeight:0.85,
              letterSpacing:'-0.02em', color:'var(--white)', marginBottom:'48px',
            }}>
              {"Let\u2019s Build the Future."}
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <Link href="/contact" style={{
              fontFamily:'var(--font-body)', fontSize:'10px', fontWeight:700,
              letterSpacing:'0.28em', textTransform:'uppercase',
              padding:'18px 48px', background:'var(--accent)', color:'#ffffff',
              display:'inline-flex', alignItems:'center',
              transition:'opacity 300ms, box-shadow 400ms',
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity='0.9'; e.currentTarget.style.boxShadow='0 0 60px rgba(232,23,106,0.4)'; }}
            onMouseLeave={e => { e.currentTarget.style.opacity='1'; e.currentTarget.style.boxShadow='none'; }}
            >Start a Project</Link>
          </Reveal>
        </div>
      </section>

    </>
  );
}
