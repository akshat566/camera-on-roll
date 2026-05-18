'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Reveal } from '@/components/Reveal';

const E = [0.22, 0.58, 0.32, 1] as const;

const WORK = [
  { id:1, cat:'Commercial Film', title:"ITC \u00d7 Cosmopolitan",       img:'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=900&q=80' },
  { id:2, cat:'Fashion Film',    title:'Bombay Times Fashion Week', img:'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=900&q=80' },
  { id:3, cat:'Event Coverage',  title:'Iconic Gold Awards',        img:'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&q=80' },
  { id:4, cat:'Aerial',          title:'Drone Showreel',            img:'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=80' },
  { id:5, cat:'Product Film',    title:"Coco Noir \u00d7 Matrix",        img:'https://images.unsplash.com/photo-1574169208507-84376144848b?w=900&q=80' },
  { id:6, cat:'Music Video',     title:'Afterglow',                 img:'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=900&q=80' },
];


export default function Home() {
  return (
    <>

      {/* ══ 1. HERO ══════════════════════════════════ */}
      <section style={{
        position: 'relative', minHeight: '100svh', overflow: 'hidden',
        background: 'var(--black)', display: 'flex', alignItems: 'center',
      }}>
        {/* Subtle left border accent */}
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: '3px',
          background: 'linear-gradient(to bottom, transparent, var(--accent), transparent)',
          opacity: 0.7,
        }} />

        <div className="cx" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(32px,5vw,80px)',
          alignItems: 'center',
          paddingTop: 'var(--nav-h)',
          minHeight: '100svh',
        }}>

          {/* Left — text */}
          <div>
            <motion.p
              initial={{ opacity:0, x:-16 }} animate={{ opacity:1, x:0 }}
              transition={{ duration:0.7, ease:E }}
              style={{ fontFamily:'var(--font-body)', fontSize:'10px', fontWeight:600, letterSpacing:'0.44em', textTransform:'uppercase', color:'var(--accent)', marginBottom:'24px' }}
            >
              An AI-powered creative video studio built for modern brands. Built to take brands from ideation to execution.
            </motion.p>

            <motion.h1
              initial={{ opacity:0, x:-24 }} animate={{ opacity:1, x:0 }}
              transition={{ duration:0.9, delay:0.08, ease:E }}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(42px, 6.5vw, 96px)',
                textTransform: 'uppercase',
                lineHeight: 0.9,
                letterSpacing: '-0.01em',
                color: 'var(--white)',
                marginBottom: '28px',
              }}
            >
              Welcome to<br />Camera On Roll<br />Production
            </motion.h1>

            <motion.p
              initial={{ opacity:0 }} animate={{ opacity:1 }}
              transition={{ duration:0.8, delay:0.28, ease:E }}
              style={{ fontFamily:'var(--font-body)', fontSize:'14px', fontWeight:400, lineHeight:1.85, color:'var(--white-40)', maxWidth:'400px', marginBottom:'44px' }}
            >
              We work at the intersection of creative direction, cinematic production, and strategic thinking to craft imagery that elevates how brands are perceived. From premium photography to narrative-driven films and AI-enabled visual storytelling, every project is approached with precision, intention, and a deep understanding of brand presence.
            </motion.p>

            <motion.div
              initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }}
              transition={{ duration:0.6, delay:0.44, ease:E }}
              style={{ display:'flex', gap:'14px', flexWrap:'wrap' }}
            >
              <Link href="/contact" style={{
                fontFamily:'var(--font-body)', fontSize:'11px', fontWeight:700,
                letterSpacing:'0.18em', textTransform:'uppercase',
                padding:'16px 36px', background:'var(--accent)', color:'#ffffff',
                display:'inline-flex', alignItems:'center',
                transition:'opacity var(--t-base)',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity='0.85')}
              onMouseLeave={e => (e.currentTarget.style.opacity='1')}
              >
                Start a Project
              </Link>
              <Link href="/work" style={{
                fontFamily:'var(--font-body)', fontSize:'11px', fontWeight:500,
                letterSpacing:'0.18em', textTransform:'uppercase',
                padding:'16px 36px', background:'transparent',
                border:'1px solid var(--white-20)', color:'var(--white-70)',
                display:'inline-flex', alignItems:'center',
                transition:'border-color var(--t-base), color var(--t-base)',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor='var(--accent-dim)'; e.currentTarget.style.color='var(--white)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor='var(--white-20)'; e.currentTarget.style.color='var(--white-70)'; }}
              >
                View Work
              </Link>
            </motion.div>
          </div>

          {/* Right — cinematic image */}
          <motion.div
            initial={{ opacity:0, scale:0.96 }} animate={{ opacity:1, scale:1 }}
            transition={{ duration:1.1, delay:0.18, ease:E }}
            style={{ position:'relative', aspectRatio:'4/5', overflow:'hidden' }}
          >
            <img
              src="https://images.unsplash.com/photo-1536240478700-b869ad10e128?w=1200&q=85"
              alt="Cinematic production"
              loading="eager"
              decoding="async"
              style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center' }}
            />
            {/* Pink tint overlay */}
            <div style={{
              position:'absolute', inset:0,
              background:'linear-gradient(135deg, rgba(232,23,106,0.14) 0%, transparent 60%)',
            }} />
            {/* Bottom fade to black */}
            <div style={{
              position:'absolute', bottom:0, left:0, right:0, height:'40%',
              background:'linear-gradient(to top, var(--black), transparent)',
            }} />
            {/* Accent frame lines */}
            <div style={{ position:'absolute', top:'16px', right:'16px', width:'48px', height:'48px', borderTop:'2px solid var(--accent)', borderRight:'2px solid var(--accent)', opacity:0.6 }} />
            <div style={{ position:'absolute', bottom:'16px', left:'16px', width:'48px', height:'48px', borderBottom:'2px solid var(--accent)', borderLeft:'2px solid var(--accent)', opacity:0.6 }} />
          </motion.div>

        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity:0 }} animate={{ opacity:1 }}
          transition={{ delay:1.4, duration:0.8 }}
          style={{ position:'absolute', bottom:'36px', left:'50%', transform:'translateX(-50%)', display:'flex', flexDirection:'column', alignItems:'center', gap:'10px' }}
        >
          <span style={{ fontFamily:'var(--font-body)', fontSize:'8px', fontWeight:500, letterSpacing:'0.44em', textTransform:'uppercase', color:'var(--white-20)' }}>Scroll</span>
          <div className="scroll-line" />
        </motion.div>
      </section>

      {/* ══ 2. SELECTED WORK ════════════════════════════ */}
      <section className="section-pad" style={{ borderTop:'1px solid var(--white-08)' }}>
        <div className="cx">
          <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', marginBottom:'clamp(36px,5vw,60px)' }}>
            <Reveal>
              <p style={{ fontFamily:'var(--font-body)', fontSize:'10px', fontWeight:500, letterSpacing:'0.38em', textTransform:'uppercase', color:'var(--white-40)', marginBottom:'8px' }}>Selected Work</p>
              <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(22px,2.5vw,36px)', textTransform:'uppercase', color:'var(--white)', lineHeight:0.95 }}>Portfolio</h2>
            </Reveal>
            <Reveal>
              <Link href="/work" style={{ fontFamily:'var(--font-body)', fontSize:'10px', fontWeight:600, letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--accent)', transition:'opacity var(--t-fast)' }}
                onMouseEnter={e => (e.currentTarget.style.opacity='0.6')}
                onMouseLeave={e => (e.currentTarget.style.opacity='1')}
              >View All →</Link>
            </Reveal>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(min(100%,320px),1fr))', gap:'clamp(20px,3vw,36px)' }}>
            {WORK.map((p,i) => (
              <Reveal key={p.id} delay={i*0.07}>
                <Link href="/work" style={{ display:'block' }}>
                  <div style={{ aspectRatio:'4/3', overflow:'hidden', marginBottom:'14px', background:'var(--surface)' }}>
                    <img src={p.img} alt={p.title} loading="lazy"
                      style={{ width:'100%', height:'100%', objectFit:'cover', filter:'grayscale(15%)', transition:'transform 700ms var(--ease-expo), filter 500ms' }}
                      onMouseEnter={e => { const el = e.currentTarget as HTMLImageElement; el.style.transform='scale(1.05)'; el.style.filter='grayscale(0%)'; }}
                      onMouseLeave={e => { const el = e.currentTarget as HTMLImageElement; el.style.transform='scale(1)'; el.style.filter='grayscale(15%)'; }}
                    />
                  </div>
                  <p style={{ fontFamily:'var(--font-body)', fontSize:'9px', fontWeight:500, letterSpacing:'0.3em', textTransform:'uppercase', color:'var(--white-40)', marginBottom:'6px' }}>{p.cat}</p>
                  <h3 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(13px,1.4vw,17px)', textTransform:'uppercase', color:'var(--white)', transition:'color var(--t-fast)' }}
                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color='var(--accent)')}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color='var(--white)')}
                  >{p.title}</h3>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 4. AI + CINEMA ══════════════════════════════ */}
      <section className="section-pad" style={{ background:'var(--surface)', borderTop:'1px solid var(--white-08)' }}>
        <div className="cx">
          <div className="cx-narrow" style={{ padding:0 }}>
            <Reveal>
              <p style={{ fontFamily:'var(--font-body)', fontSize:'10px', fontWeight:600, letterSpacing:'0.38em', textTransform:'uppercase', color:'var(--accent)', marginBottom:'24px' }}>AI × Cinema</p>
              <h2 style={{ fontFamily:'var(--font-display)', textTransform:'uppercase', fontSize:'clamp(32px,5vw,72px)', lineHeight:0.9, letterSpacing:'-0.02em', color:'var(--white)', marginBottom:'24px' }}>
                Where Cinema Meets Intelligence.
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p style={{ fontFamily:'var(--font-body)', fontSize:'15px', fontWeight:400, lineHeight:1.88, color:'var(--white-70)', marginBottom:'36px' }}>
                We combine filmmaking with proprietary AI workflows to build the next generation of visual storytelling — faster, smarter, and more powerful than anything traditional production alone can create.
              </p>
              <Link href="/atom" style={{
                fontFamily:'var(--font-body)', fontSize:'11px', fontWeight:600,
                letterSpacing:'0.18em', textTransform:'uppercase',
                padding:'14px 32px', border:'1px solid var(--accent-dim)', color:'var(--accent)',
                display:'inline-flex', alignItems:'center',
                transition:'background var(--t-base), color var(--t-base)',
              }}
              onMouseEnter={e => { e.currentTarget.style.background='var(--accent)'; e.currentTarget.style.color='#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='var(--accent)'; }}
              >Explore Atom →</Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ 4. ATOM TEASER ══════════════════════════════ */}
      <section className="section-pad" style={{ textAlign:'center' }}>
        <div className="cx">
          <Reveal>
            <p style={{ fontFamily:'var(--font-body)', fontSize:'10px', fontWeight:600, letterSpacing:'0.38em', textTransform:'uppercase', color:'var(--accent)', marginBottom:'20px' }}>AI Division</p>
            <div style={{ fontFamily:'var(--font-display)', fontSize:'clamp(80px,18vw,220px)', textTransform:'uppercase', lineHeight:0.85, letterSpacing:'-0.04em', color:'var(--white)', marginBottom:'16px' }}>
              ATOM
            </div>
            <p style={{ fontFamily:'var(--font-body)', fontSize:'10px', fontWeight:500, letterSpacing:'0.32em', textTransform:'uppercase', color:'var(--white-40)', marginBottom:'28px' }}>
              Powered by The Social Twin
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <p style={{ fontFamily:'var(--font-body)', fontSize:'15px', fontWeight:400, lineHeight:1.88, color:'var(--white-70)', maxWidth:'460px', margin:'0 auto 36px' }}>
              An AI-powered creative ecosystem engineered to generate films, ads, digital humans, and scalable campaigns at the speed of thought.
            </p>
            <Link href="/atom" style={{
              fontFamily:'var(--font-body)', fontSize:'11px', fontWeight:600,
              letterSpacing:'0.18em', textTransform:'uppercase',
              padding:'14px 32px', border:'1px solid var(--white-20)', color:'var(--white-70)',
              display:'inline-flex', alignItems:'center',
              transition:'border-color var(--t-base), color var(--t-base)',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor='var(--accent-dim)'; e.currentTarget.style.color='var(--accent)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor='var(--white-20)'; e.currentTarget.style.color='var(--white-70)'; }}
            >Enter Atom →</Link>
          </Reveal>
        </div>
      </section>

      {/* ══ 7. CONTACT CTA ══════════════════════════════ */}
      <section className="section-pad" style={{ borderTop:'1px solid var(--white-08)', textAlign:'center' }}>
        <div className="cx-narrow">
          <Reveal>
            <h2 style={{ fontFamily:'var(--font-display)', textTransform:'uppercase', fontSize:'clamp(36px,6vw,88px)', lineHeight:0.88, letterSpacing:'-0.02em', color:'var(--white)', marginBottom:'44px' }}>
              {"Let's Build the Future Together."}
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <Link href="/contact" style={{
              fontFamily:'var(--font-body)', fontSize:'11px', fontWeight:700,
              letterSpacing:'0.18em', textTransform:'uppercase',
              padding:'16px 40px', background:'var(--accent)', color:'#ffffff',
              display:'inline-flex', alignItems:'center',
              transition:'opacity var(--t-base)',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity='0.85')}
            onMouseLeave={e => (e.currentTarget.style.opacity='1')}
            >Start a Project</Link>
          </Reveal>
        </div>
      </section>

    </>
  );
}
