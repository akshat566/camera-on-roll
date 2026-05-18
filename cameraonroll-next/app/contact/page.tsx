'use client';
import { useState } from 'react';
import { Reveal } from '@/components/Reveal';

const INPUT = {
  width:'100%', background:'transparent',
  borderBottom:'1px solid var(--white-08)', color:'var(--white)',
  fontFamily:'var(--font-body)', fontSize:'14px', fontWeight:400,
  padding:'14px 0', outline:'none',
  transition:'border-color var(--t-base)',
} as const;

export default function ContactPage() {
  const [form, setForm] = useState({ name:'', email:'', service:'', message:'' });
  const [sent, setSent] = useState(false);

  const handle = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const submit = (e: React.FormEvent) => { e.preventDefault(); setSent(true); };

  return (
    <>
      {/* Header */}
      <section style={{ paddingTop:'var(--nav-h)', borderBottom:'1px solid var(--white-08)' }}>
        <div className="cx" style={{ paddingTop:'clamp(48px,6vw,88px)', paddingBottom:'clamp(40px,5vw,72px)' }}>
          <Reveal>
            <p style={{ fontFamily:'var(--font-body)', fontSize:'10px', fontWeight:500, letterSpacing:'0.38em', textTransform:'uppercase', color:'var(--gold)', marginBottom:'16px' }}>Get In Touch</p>
            <h1 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(44px,7vw,96px)', textTransform:'uppercase', lineHeight:0.88, letterSpacing:'-0.02em', color:'var(--white)' }}>
              {"Let's Talk."}
            </h1>
          </Reveal>
        </div>
      </section>

      {/* Body */}
      <section className="section-pad">
        <div className="cx">
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,360px),1fr))', gap:'clamp(48px,8vw,112px)', alignItems:'start' }}>

            {/* Contact info */}
            <Reveal>
              <div style={{ display:'flex', flexDirection:'column', gap:'40px' }}>
                {[
                  { l:'Phone',     v:'+91 77100 48704',              href:'tel:+917710048704' },
                  { l:'Email',     v:'akshat@cameraonrollproduction.com', href:'mailto:akshat@cameraonrollproduction.com' },
                  { l:'Instagram', v:'@cameraonrollproduction',      href:'https://instagram.com/cameraonrollproduction' },
                  { l:'Based In',  v:'Mumbai, India — Serving PAN India', href:null },
                ].map(item => (
                  <div key={item.l}>
                    <p style={{ fontFamily:'var(--font-body)', fontSize:'9px', fontWeight:500, letterSpacing:'0.38em', textTransform:'uppercase', color:'var(--white-40)', marginBottom:'10px' }}>{item.l}</p>
                    {item.href
                      ? <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                          style={{ fontFamily:'var(--font-body)', fontSize:'15px', color:'var(--white-70)', fontWeight:300, transition:'color var(--t-fast)', wordBreak:'break-all' }}
                          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color='var(--gold)')}
                          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color='var(--white-70)')}
                        >{item.v}</a>
                      : <p style={{ fontFamily:'var(--font-body)', fontSize:'15px', color:'var(--white-70)', fontWeight:300 }}>{item.v}</p>
                    }
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Form */}
            <Reveal delay={0.14}>
              {sent ? (
                <div style={{ paddingTop:'clamp(16px,4vw,48px)' }}>
                  <p style={{ fontFamily:'var(--font-body)', fontSize:'9px', fontWeight:500, letterSpacing:'0.38em', textTransform:'uppercase', color:'var(--gold)', marginBottom:'20px' }}>Message Received</p>
                  <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(24px,3vw,44px)', textTransform:'uppercase', color:'var(--white)', marginBottom:'20px' }}>Thank You.</h2>
                  <p style={{ fontFamily:'var(--font-body)', fontSize:'14px', lineHeight:1.9, color:'var(--white-70)' }}>{"We'll review your message and get back to you within 24 hours."}</p>
                </div>
              ) : (
                <form onSubmit={submit} style={{ display:'flex', flexDirection:'column', gap:'32px' }}>
                  <input name="name" value={form.name} onChange={handle} placeholder="Your Name" required
                    style={INPUT}
                    onFocus={e => (e.currentTarget.style.borderColor='var(--gold-dim)')}
                    onBlur={e => (e.currentTarget.style.borderColor='var(--white-08)')}
                  />
                  <input name="email" type="email" value={form.email} onChange={handle} placeholder="Email Address" required
                    style={INPUT}
                    onFocus={e => (e.currentTarget.style.borderColor='var(--gold-dim)')}
                    onBlur={e => (e.currentTarget.style.borderColor='var(--white-08)')}
                  />
                  <select name="service" value={form.service} onChange={handle}
                    style={{ ...INPUT, cursor:'pointer', appearance:'none' }}
                    onFocus={e => (e.currentTarget.style.borderColor='var(--gold-dim)')}
                    onBlur={e => (e.currentTarget.style.borderColor='var(--white-08)')}
                  >
                    <option value="" disabled style={{ background:'var(--charcoal)' }}>Service of Interest</option>
                    <option value="commercial" style={{ background:'var(--charcoal)' }}>Commercial Film</option>
                    <option value="music" style={{ background:'var(--charcoal)' }}>Music Video</option>
                    <option value="event" style={{ background:'var(--charcoal)' }}>Event Coverage</option>
                    <option value="ai" style={{ background:'var(--charcoal)' }}>AI Content (ATOM)</option>
                    <option value="post" style={{ background:'var(--charcoal)' }}>Post Production</option>
                    <option value="other" style={{ background:'var(--charcoal)' }}>Other</option>
                  </select>
                  <textarea name="message" value={form.message} onChange={handle} placeholder="Tell us about your project" rows={5} required
                    style={{ ...INPUT, resize:'none' }}
                    onFocus={e => (e.currentTarget.style.borderColor='var(--gold-dim)')}
                    onBlur={e => (e.currentTarget.style.borderColor='var(--white-08)')}
                  />
                  <div>
                    <button type="submit" style={{
                      fontFamily:'var(--font-body)', fontSize:'10px', fontWeight:600,
                      letterSpacing:'0.2em', textTransform:'uppercase',
                      padding:'14px 32px', background:'var(--white)', color:'var(--black)',
                      cursor:'pointer', border:'none',
                      transition:'background var(--t-base)',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background='var(--gold)')}
                    onMouseLeave={e => (e.currentTarget.style.background='var(--white)')}
                    >Send Message</button>
                  </div>
                </form>
              )}
            </Reveal>

          </div>
        </div>
      </section>
    </>
  );
}
