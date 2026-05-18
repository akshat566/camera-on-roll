'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, useRef } from 'react';
import { Reveal } from '@/components/Reveal';

const EASE = [0.76, 0, 0.24, 1] as const;

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

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
            ref={videoRef}
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
        <div style={{ position:'relative', zIndex:1, textAlign:'center', padding:'0 var(--pad-x)', maxWidth:'900px' }}>
          <motion.p
            initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:1, delay:0.2, ease:EASE }}
            style={{ fontFamily:'var(--font-body)', fontSize:'10px', fontWeight:500, letterSpacing:'0.5em', textTransform:'uppercase', color:'var(--accent)', marginBottom:'clamp(16px,3vw,32px)' }}
          >
            Cinema • AI • Future Visual Systems
          </motion.p>

          <motion.h1
            initial={{ opacity:0, y:40 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:1.2, delay:0.4, ease:EASE }}
            className="text-glow"
            style={{
              fontFamily:'var(--font-display)',
              fontSize:'clamp(28px, 5.5vw, 72px)',
              textTransform:'uppercase',
              lineHeight:0.9,
              letterSpacing:'-0.02em',
              color:'var(--white)',
              marginBottom:'clamp(16px,2vw,28px)',
              whiteSpace:'nowrap',
            }}
          >
            Camera On Roll Production
          </motion.h1>

          <motion.p
            initial={{ opacity:0 }} animate={{ opacity:1 }}
            transition={{ duration:1, delay:0.9, ease:EASE }}
            style={{ fontFamily:'var(--font-body)', fontSize:'12px', fontWeight:400, letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--white-40)', marginBottom:'clamp(24px,3vw,40px)' }}
          >
            A creative tech studio built for modern brands
          </motion.p>

          <motion.p
            initial={{ opacity:0 }} animate={{ opacity:1 }}
            transition={{ duration:1, delay:1.1, ease:EASE }}
            style={{ fontFamily:'var(--font-body)', fontSize:'14px', fontWeight:400, lineHeight:1.85, color:'var(--white-40)', maxWidth:'640px', margin:'0 auto clamp(32px,4vw,56px)' }}
          >
            We work at the intersection of creative direction, cinematic production, and strategic thinking to craft imagery that elevates how brands are perceived. From premium photography to narrative driven films and AI enabled visual storytelling, every project is approached with precision, intention, and a deep understanding of brand presence.
          </motion.p>

          <motion.div
            initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:0.8, delay:1.3, ease:EASE }}
            style={{ display:'flex', gap:'clamp(8px,1.5vw,16px)', justifyContent:'center', flexWrap:'wrap' }}
          >
            {/* Intro — toggle video sound */}
            <button onClick={toggleMute} style={{
              fontFamily:'var(--font-body)', fontSize:'10px', fontWeight:600,
              letterSpacing:'0.28em', textTransform:'uppercase',
              padding:'16px 40px',
              border:'1px solid var(--white-20)', color:'var(--white-70)',
              background:'transparent', cursor:'pointer',
              display:'inline-flex', alignItems:'center', gap:'10px',
              transition:'border-color 400ms, color 400ms, box-shadow 400ms',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor='var(--accent)'; e.currentTarget.style.color='var(--white)'; e.currentTarget.style.boxShadow='0 0 40px rgba(232,23,106,0.2)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor='var(--white-20)'; e.currentTarget.style.color='var(--white-70)'; e.currentTarget.style.boxShadow='none'; }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {isMuted ? (
                  <><path d="M11 5L6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></>
                ) : (
                  <><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></>
                )}
              </svg>
              {isMuted ? 'Unmute' : 'Sound On'}
            </button>

            {/* Work */}
            <Link href="/work" style={{
              fontFamily:'var(--font-body)', fontSize:'10px', fontWeight:600,
              letterSpacing:'0.28em', textTransform:'uppercase',
              padding:'16px 40px',
              border:'1px solid var(--accent-dim)', color:'var(--accent)',
              display:'inline-flex', alignItems:'center',
              transition:'background 400ms, color 400ms, box-shadow 400ms',
            }}
            onMouseEnter={e => { e.currentTarget.style.background='var(--accent)'; e.currentTarget.style.color='#fff'; e.currentTarget.style.boxShadow='0 0 60px rgba(232,23,106,0.3)'; }}
            onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='var(--accent)'; e.currentTarget.style.boxShadow='none'; }}
            >
              Work
            </Link>

            {/* Connect */}
            <Link href="/contact" style={{
              fontFamily:'var(--font-body)', fontSize:'10px', fontWeight:600,
              letterSpacing:'0.28em', textTransform:'uppercase',
              padding:'16px 40px',
              border:'1px solid var(--white-20)', color:'var(--white-70)',
              display:'inline-flex', alignItems:'center',
              transition:'border-color 400ms, color 400ms, box-shadow 400ms',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor='var(--accent)'; e.currentTarget.style.color='var(--white)'; e.currentTarget.style.boxShadow='0 0 40px rgba(232,23,106,0.2)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor='var(--white-20)'; e.currentTarget.style.color='var(--white-70)'; e.currentTarget.style.boxShadow='none'; }}
            >
              Connect
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity:0 }} animate={{ opacity:1 }}
          transition={{ delay:2, duration:1 }}
          style={{ position:'absolute', bottom:'40px', left:'50%', transform:'translateX(-50%)', display:'flex', flexDirection:'column', alignItems:'center', gap:'12px' }}
        >
          <span style={{ fontFamily:'var(--font-body)', fontSize:'8px', fontWeight:500, letterSpacing:'0.44em', textTransform:'uppercase', color:'var(--white-20)' }}>Scroll</span>
          <div style={{ width:'1px', height:'40px', background:'linear-gradient(to bottom, var(--white-20), transparent)', position:'relative' }}>
            <motion.div
              animate={{ y: [0, 40, 0] }}
              transition={{ duration:2, repeat:Infinity, ease:'easeInOut' }}
              style={{ position:'absolute', top:0, left:'-2px', width:'5px', height:'5px', borderRadius:'50%', background:'var(--accent)', boxShadow:'0 0 8px var(--accent)' }}
            />
          </div>
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
