'use client';
import { useState } from 'react';
import { Reveal } from '@/components/Reveal';
import { WorkWithUs } from '@/components/WorkWithUs';
import { motion, AnimatePresence } from 'framer-motion';

const E = [0.22, 0.58, 0.32, 1] as const;

const CONTACT_INFO = [
  { icon: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="M22 6l-10 7L2 6"/></svg>
  ), label:'Email', value:'hello@cameraonroll.com' },
  { icon: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
  ), label:'Phone', value:'+91 98765 43210' },
  { icon: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
  ), label:'Location', value:'Mumbai, India' },
];

const FAQ = [
  { q:'What services do you offer?', a:'We offer end-to-end production services including brand films, commercials, music videos, product photography, AI-generated content, digital human creation, and more.' },
  { q:'How do I get a quote?', a:'Fill out the form below or email us at hello@cameraonroll.com with your project brief. We typically respond within 24-48 hours with a customized quote.' },
  { q:'Do you work with international clients?', a:'Yes, we work with brands and artists globally. Our team is equipped to handle remote productions and deliver assets in any format or region.' },
  { q:'What is your typical timeline?', a:'Timelines vary by project scope. A simple brand film can be delivered in 2-3 weeks, while larger campaigns may take 6-8 weeks. We provide detailed timelines during our initial discussion.' },
];

export default function ContactPage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  return (
    <>
      {/* ══ HERO ═══════════════════════════════════════ */}
      <section style={{ position:'relative', minHeight:'100svh', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden', background:'var(--black)' }}>
        {/* Background image with overlay */}
        <div style={{ position:'absolute', inset:0, zIndex:0 }}>
          <img src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1920&q=80" alt="Film production" loading="eager" style={{ width:'100%', height:'100%', objectFit:'cover', filter:'brightness(0.35) saturate(0.8)' }} />
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, var(--black) 0%, transparent 40%, var(--black) 100%)' }} />
          <div style={{ position:'absolute', bottom:'20%', left:'-10%', width:'45vw', height:'45vw', borderRadius:'50%', background:'radial-gradient(circle, rgba(232,23,106,0.10) 0%, transparent 70%)', filter:'blur(80px)' }} />
        </div>

        <div className="cx" style={{ position:'relative', zIndex:10, textAlign:'center', paddingTop:'var(--nav-h)' }}>
          <motion.p initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.9, ease:E }}
            style={{ fontFamily:'var(--font-body)', fontSize:'10px', fontWeight:600, letterSpacing:'0.44em', textTransform:'uppercase', color:'var(--accent)', marginBottom:'20px' }}>
            Get In Touch
          </motion.p>
          <motion.h1 initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ duration:1.05, delay:0.1, ease:E }}
            style={{ fontFamily:'var(--font-display)', fontSize:'clamp(48px,8vw,120px)', textTransform:'uppercase', lineHeight:0.85, letterSpacing:'-0.04em', color:'var(--white)', marginBottom:'24px' }}>
            Let's Create
          </motion.h1>
          <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.85, delay:0.25, ease:E }}
            style={{ fontFamily:'var(--font-body)', fontSize:'clamp(14px,1.8vw,18px)', fontWeight:400, lineHeight:1.85, color:'var(--white-70)', maxWidth:'560px', margin:'0 auto 40px' }}>
            Have a project in mind? Let's build something memorable together.
          </motion.p>
          <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7, delay:0.4, ease:E }}
            style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'12px' }}>
            <a href="#form" style={{
              fontFamily:'var(--font-body)', fontSize:'11px', fontWeight:700,
              letterSpacing:'0.18em', textTransform:'uppercase',
              padding:'14px 32px', background:'var(--accent)', color:'#ffffff',
              display:'inline-flex', transition:'opacity var(--t-base)',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity='0.85')}
            onMouseLeave={e => (e.currentTarget.style.opacity='1')}
            >Start a Project</a>
          </motion.div>
        </div>

        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.2, duration:0.8 }}
          style={{ position:'absolute', bottom:'40px', left:'50%', transform:'translateX(-50%)', zIndex:10, display:'flex', flexDirection:'column', alignItems:'center', gap:'10px' }}>
          <span style={{ fontFamily:'var(--font-body)', fontSize:'8px', fontWeight:500, letterSpacing:'0.44em', textTransform:'uppercase', color:'var(--white-20)' }}>Scroll</span>
          <div className="scroll-line" />
        </motion.div>
      </section>

      {/* ══ CONTACT INFO ═════════════════════════════ */}
      <section className="section-pad" style={{ borderTop:'1px solid var(--white-08)', background:'var(--black)' }}>
        <div className="cx">
          <Reveal>
            <p style={{ fontFamily:'var(--font-body)', fontSize:'10px', fontWeight:600, letterSpacing:'0.38em', textTransform:'uppercase', color:'var(--accent)', marginBottom:'16px' }}>Reach Us</p>
            <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(28px,3.5vw,52px)', textTransform:'uppercase', lineHeight:0.92, color:'var(--white)', marginBottom:'clamp(40px,6vw,72px)' }}>
              Contact Information
            </h2>
          </Reveal>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,280px),1fr))', gap:'1px', background:'var(--white-08)' }}>
            {CONTACT_INFO.map((c, i) => (
              <Reveal key={c.label} delay={i*0.08}>
                <div style={{ background:'var(--surface)', padding:'clamp(28px,3.5vw,44px)', display:'flex', alignItems:'center', gap:'16px', transition:'background var(--t-base)' }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background='var(--surface-2)')}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background='var(--surface)')}
                >
                  <div style={{ width:'48px', height:'48px', display:'flex', alignItems:'center', justifyContent:'center', border:'1px solid var(--white-08)', flexShrink:0 }}>
                    {c.icon}
                  </div>
                  <div>
                    <p style={{ fontFamily:'var(--font-body)', fontSize:'9px', fontWeight:600, letterSpacing:'0.32em', textTransform:'uppercase', color:'var(--accent)', marginBottom:'4px' }}>{c.label}</p>
                    <p style={{ fontFamily:'var(--font-body)', fontSize:'14px', color:'var(--white)', margin:0 }}>{c.value}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FAQ (Expandable) ═══════════════════════════ */}
      <section className="section-pad" style={{ borderTop:'1px solid var(--white-08)', background:'var(--surface)' }}>
        <div className="cx">
          <Reveal>
            <p style={{ fontFamily:'var(--font-body)', fontSize:'10px', fontWeight:600, letterSpacing:'0.38em', textTransform:'uppercase', color:'var(--accent)', marginBottom:'16px' }}>Common Questions</p>
            <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(28px,3.5vw,52px)', textTransform:'uppercase', lineHeight:0.92, color:'var(--white)', marginBottom:'clamp(40px,6vw,72px)' }}>
              FAQ
            </h2>
          </Reveal>
          <div style={{ display:'flex', flexDirection:'column', gap:'1px', background:'var(--white-08)' }}>
            {FAQ.map((f, i) => (
              <Reveal key={f.q} delay={i*0.06}>
                <div style={{ background:'var(--black)', cursor:'pointer', transition:'background var(--t-base)' }}
                  onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                  onMouseEnter={e => { if (expandedFaq !== i) ((e.currentTarget as HTMLElement).style.background='var(--surface-2)'); }}
                  onMouseLeave={e => { if (expandedFaq !== i) ((e.currentTarget as HTMLElement).style.background='var(--black)'); }}
                >
                  <div style={{ padding:'clamp(24px,3vw,40px)', display:'flex', alignItems:'center', justifyContent:'space-between', gap:'16px' }}>
                    <h3 style={{ fontFamily:'var(--font-body)', fontSize:'clamp(14px,1.5vw,17px)', fontWeight:500, color:'var(--white)', margin:0, lineHeight:1.4 }}>{f.q}</h3>
                    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="var(--white-40)" strokeWidth="1.5" style={{ flexShrink:0, transition:'transform 300ms', transform: expandedFaq === i ? 'rotate(180deg)' : 'rotate(0deg)' }}><path d="M2 5l5 5 5-5"/></svg>
                  </div>
                  <AnimatePresence>
                    {expandedFaq === i && (
                      <motion.div initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:'auto' }} exit={{ opacity:0, height:0 }} transition={{ duration:0.3, ease:E }}>
                        <div style={{ padding:'0 clamp(24px,3vw,40px) clamp(24px,3vw,40px)' }}>
                          <p style={{ fontFamily:'var(--font-body)', fontSize:'14px', lineHeight:1.85, color:'var(--white-70)', margin:0 }}>{f.a}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ WORK WITH US FORM ═════════════════════════ */}
      <section id="form" style={{ borderTop:'1px solid var(--white-08)', background:'var(--black)' }}>
        <WorkWithUs />
      </section>
    </>
  );
}
