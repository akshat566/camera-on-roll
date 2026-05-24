'use client';
import { Reveal } from '@/components/Reveal';
import { WorkWithUs } from '@/components/WorkWithUs';

export default function ContactPage() {
  return (
    <>
      {/* ── Hero header ────────────────────────────── */}
      <section style={{ position:'relative', paddingTop:'var(--nav-h)', overflow:'hidden', borderBottom:'1px solid var(--white-08)' }}>
        <div style={{ position:'absolute', top:'10%', right:'-10%', width:'40vw', height:'40vw', borderRadius:'50%', background:'radial-gradient(circle, rgba(232,23,106,0.10) 0%, transparent 70%)', filter:'blur(60px)', pointerEvents:'none' }} />
        <div className="cx" style={{ position:'relative', zIndex:1, paddingTop:'clamp(40px,5vw,72px)', paddingBottom:'clamp(20px,3vw,32px)' }}>
          <Reveal>
            <p style={{ fontFamily:'var(--font-body)', fontSize:'10px', fontWeight:600, letterSpacing:'0.4em', textTransform:'uppercase', color:'var(--accent)', marginBottom:'14px' }}>Get In Touch</p>
            <h1 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(36px,5.5vw,80px)', textTransform:'uppercase', lineHeight:0.88, letterSpacing:'-0.02em', color:'var(--white)', margin:0 }}>
              Let&rsquo;s Build Something Memorable.
            </h1>
          </Reveal>
        </div>
      </section>

      {/* ── Shared Work With Us block (two-column) ── */}
      <section style={{ background:'var(--black)', borderBottom:'1px solid var(--white-08)' }}>
        <WorkWithUs />
      </section>
    </>
  );
}
