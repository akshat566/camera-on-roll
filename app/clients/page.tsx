'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Reveal } from '@/components/Reveal';

const EASE = [0.22, 0.58, 0.32, 1] as const;

const CLIENTS: { name: string; domain: string }[] = [
  { name:'Engage',                    domain:'engage.itcportal.com' },
  { name:'Maybelline',                domain:'maybelline.com' },
  { name:'Artize',                    domain:'artize.in' },
  { name:'Cornetto',                  domain:'cornetto.com' },
  { name:'Homegrown',                 domain:'homegrown.co.in' },
  { name:'Renée',                     domain:'reneecosmetics.com' },
  { name:'Sony LIV',                  domain:'sonyliv.com' },
  { name:'Flipkart',                  domain:'flipkart.com' },
  { name:"L'Oréal Paris",              domain:'lorealparis.com' },
  { name:'Breezer',                   domain:'bacardi.com' },
  { name:'Sofy',                      domain:'sofy.in' },
  { name:'Lotto',                     domain:'lottosport.com' },
  { name:'Matrix',                    domain:'matrixprofessional.in' },
  { name:'TRESemmé',                  domain:'tresemme.com' },
  { name:'Lavie',                     domain:'lavieworld.com' },
  { name:'Bombay Times Fashion Week', domain:'bombaytimesfashionweek.com' },
  { name:'Emaar India',               domain:'emaar-india.com' },
  { name:'Deconstruct',               domain:'deconstruct.in' },
  { name:'Savlon',                    domain:'savlon.in' },
  { name:'Nimyle',                    domain:'nimyle.com' },
  { name:'NPCI',                      domain:'npci.org.in' },
  { name:'Tata AIA',                  domain:'tataaia.com' },
  { name:'Pillsbury',                 domain:'pillsbury.in' },
  { name:'Ghar',                      domain:'gharsoaps.com' },
];

const ARTISTS = [
  'Samay Raina', 'Uorfi Javed', 'Santanu Hazarika',
];

function ClientBadge({ name, domain }: { name: string; domain: string }) {
  const [imgError, setImgError] = useState(false);
  return (
    <motion.div
      whileHover={{ scale: 1.08, y: -4 }}
      transition={{ duration: 0.3, ease: EASE }}
      style={{
        flexShrink: 0,
        width: 'clamp(96px, 9vw, 132px)',
        height: 'clamp(96px, 9vw, 132px)',
        borderRadius: '50%',
        background: '#fff',
        border: '1.5px solid var(--white-08)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '16px', overflow: 'hidden',
        boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
        transition: 'box-shadow 350ms, border-color 350ms',
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 36px rgba(232,23,106,0.4), 0 0 0 2px var(--accent)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)'; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(0,0,0,0.35)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--white-08)'; }}
    >
      {!imgError ? (
        <img
          src={`https://logo.clearbit.com/${domain}?size=200`}
          alt={name}
          loading="lazy"
          onError={() => setImgError(true)}
          style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', display: 'block' }}
        />
      ) : (
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(10px, 0.95vw, 14px)',
          letterSpacing: '0.02em', lineHeight: 1.05,
          textAlign: 'center', textTransform: 'uppercase',
          color: '#0a0a0a',
        }}>{name}</span>
      )}
    </motion.div>
  );
}

export default function ClientsPage() {
  return (
    <>
      {/* ── HEADER ─────────────────────────────────── */}
      <section style={{ position:'relative', paddingTop:'calc(var(--nav-h) + clamp(48px,6vw,96px))', paddingBottom:'clamp(48px,5vw,80px)', overflow:'hidden', borderBottom:'1px solid var(--white-08)' }}>
        <div style={{ position:'absolute', top:'15%', right:'-10%', width:'40vw', height:'40vw', borderRadius:'50%', background:'radial-gradient(circle, rgba(232,23,106,0.1) 0%, transparent 70%)', filter:'blur(60px)', pointerEvents:'none' }} />
        <div className="cx" style={{ position:'relative', zIndex:1, textAlign:'center' }}>
          <Reveal>
            <p style={{ fontFamily:'var(--font-body)', fontSize:'10px', fontWeight:600, letterSpacing:'0.4em', textTransform:'uppercase', color:'var(--accent)', marginBottom:'14px' }}>Trusted By</p>
            <h1 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(52px,9vw,140px)', textTransform:'uppercase', lineHeight:0.86, letterSpacing:'-0.02em', color:'var(--white)', margin:'0 0 22px' }}>
              Brands &<br />Collaborators
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p style={{ fontFamily:'var(--font-body)', fontSize:'14px', lineHeight:1.85, color:'var(--white-70)', maxWidth:'560px', margin:'0 auto' }}>
              Iconic brands and creative talent we&rsquo;ve had the privilege of partnering with across cinema, AI, and visual storytelling.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── BRAND MARQUEE — single sliding row ────── */}
      <section style={{ padding:'clamp(40px,5vw,72px) 0', borderBottom:'1px solid var(--white-08)' }}>
        <div style={{ position:'relative', overflow:'hidden', padding:'clamp(16px,2vw,28px) 0' }}>
          <div aria-hidden="true" style={{ position:'absolute', top:0, bottom:0, left:0, width:'clamp(60px,8vw,160px)', background:'linear-gradient(to right, var(--black), transparent)', zIndex:2, pointerEvents:'none' }} />
          <div aria-hidden="true" style={{ position:'absolute', top:0, bottom:0, right:0, width:'clamp(60px,8vw,160px)', background:'linear-gradient(to left, var(--black), transparent)', zIndex:2, pointerEvents:'none' }} />
          <div className="marquee" style={{ gap:'clamp(22px,2.2vw,42px)', paddingLeft:'clamp(20px,2vw,36px)' }}>
            {[...CLIENTS, ...CLIENTS].map((c, i) => (
              <ClientBadge key={`${c.name}-${i}`} name={c.name} domain={c.domain} />
            ))}
          </div>
        </div>
      </section>

      {/* ── ARTISTS & COLLABORATORS ───────────────── */}
      <section style={{ padding:'clamp(64px,7vw,120px) 0', borderBottom:'1px solid var(--white-08)' }}>
        <div className="cx" style={{ textAlign:'center' }}>
          <Reveal>
            <p style={{ fontFamily:'var(--font-body)', fontSize:'9px', fontWeight:600, letterSpacing:'0.4em', textTransform:'uppercase', color:'var(--accent)', marginBottom:'14px' }}>Artists & Collaborators</p>
            <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(32px,5vw,72px)', textTransform:'uppercase', lineHeight:0.88, letterSpacing:'-0.02em', color:'var(--white)', margin:'0 0 36px' }}>
              Visionaries We&rsquo;ve Worked With.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div style={{ display:'flex', flexWrap:'wrap', justifyContent:'center', gap:'10px', maxWidth:'820px', margin:'0 auto' }}>
              {ARTISTS.map((a, i) => (
                <motion.span
                  key={`${a}-${i}`}
                  whileHover={{ y:-3 }}
                  style={{
                    fontFamily:'var(--font-body)', fontSize:'11px', fontWeight:600,
                    letterSpacing:'0.18em', textTransform:'uppercase',
                    color:'var(--white-70)',
                    padding:'12px 22px',
                    border:'1px solid var(--white-20)',
                    cursor:'default',
                    transition:'border-color 250ms, color 250ms, box-shadow 250ms',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)'; (e.currentTarget as HTMLElement).style.color = 'var(--white)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 0 24px rgba(232,23,106,0.25)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--white-20)'; (e.currentTarget as HTMLElement).style.color = 'var(--white-70)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
                >
                  {a}
                </motion.span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
