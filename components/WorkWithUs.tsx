'use client';

import { useState } from 'react';
import { Reveal } from '@/components/Reveal';

/**
 * Two-column "Work With Us" block — title + contact info on the LEFT,
 * inquiry form on the RIGHT. Used on the home page and on /contact.
 */
export function WorkWithUs() {
  const [sent, setSent] = useState(false);

  return (
    <div className="cx" style={{ position: 'relative', padding: 'clamp(48px,6vw,80px) 0 clamp(56px,6vw,80px)' }}>
      {/* Two-column body */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
          gap: 'clamp(40px, 6vw, 96px)',
          alignItems: 'start',
        }}
        className="wwu-grid"
      >
        {/* ── LEFT: title + contact info ───────────── */}
        <div style={{ paddingRight: 'clamp(0px,1vw,16px)' }}>
          <Reveal>
            <h2 style={{
              fontFamily: 'var(--font-display)', textTransform: 'uppercase',
              fontSize: 'clamp(52px,8.5vw,128px)', lineHeight: 0.86, letterSpacing: '-0.03em',
              color: 'var(--accent)', margin: '0 0 clamp(28px,3vw,40px)',
              textShadow: '0 0 60px rgba(232,23,106,0.22)',
            }}>
              Work<br/>with Us
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: '14px', lineHeight: 1.85,
              color: 'var(--white-70)', maxWidth: '440px', margin: '0 0 clamp(32px,3.5vw,44px)',
            }}>
              Tell us about your project. We&rsquo;ll get back within 24 hours with ideas, references, and next steps.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(20px,2.5vw,28px)' }}>
              <div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '9px', fontWeight: 700, letterSpacing: '0.36em', textTransform: 'uppercase', color: 'var(--accent)', margin: '0 0 8px' }}>Akshat — Phone</p>
                <a href="tel:+917791048704"
                  style={{ fontFamily: 'var(--font-body)', fontSize: '15px', fontWeight: 400, color: 'var(--white-70)', transition: 'color 200ms' }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'var(--white-70)'; }}
                >+91 77910 48704</a>
              </div>
              <div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '9px', fontWeight: 700, letterSpacing: '0.36em', textTransform: 'uppercase', color: 'var(--accent)', margin: '0 0 8px' }}>Akshat — Email</p>
                <a href="mailto:akshat@cameraonrollproduction.com"
                  style={{ fontFamily: 'var(--font-body)', fontSize: '15px', fontWeight: 400, color: 'var(--white-70)', wordBreak: 'break-all', transition: 'color 200ms' }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'var(--white-70)'; }}
                >akshat@cameraonrollproduction.com</a>
              </div>
              <div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '9px', fontWeight: 700, letterSpacing: '0.36em', textTransform: 'uppercase', color: 'var(--accent)', margin: '0 0 8px' }}>Ashna — Phone</p>
                <a href="tel:+919876543210"
                  style={{ fontFamily: 'var(--font-body)', fontSize: '15px', fontWeight: 400, color: 'var(--white-70)', transition: 'color 200ms' }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'var(--white-70)'; }}
                >+91 98765 43210</a>
              </div>
              <div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '9px', fontWeight: 700, letterSpacing: '0.36em', textTransform: 'uppercase', color: 'var(--accent)', margin: '0 0 8px' }}>Ashna — Email</p>
                <a href="mailto:ashna@cameraonrollproduction.com"
                  style={{ fontFamily: 'var(--font-body)', fontSize: '15px', fontWeight: 400, color: 'var(--white-70)', wordBreak: 'break-all', transition: 'color 200ms' }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'var(--white-70)'; }}
                >ashna@cameraonrollproduction.com</a>
              </div>
              <div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '9px', fontWeight: 700, letterSpacing: '0.36em', textTransform: 'uppercase', color: 'var(--accent)', margin: '0 0 8px' }}>Instagram</p>
                <a href="https://instagram.com/cameraonrollproduction" target="_blank" rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '12px',
                    fontFamily: 'var(--font-body)', fontSize: '15px', fontWeight: 400,
                    color: 'var(--white-70)', transition: 'color 200ms',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = 'var(--accent)';
                    const svg = e.currentTarget.querySelector('svg') as SVGElement | null;
                    if (svg) (svg as unknown as HTMLElement).style.transform = 'scale(1.12) rotate(-4deg)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = 'var(--white-70)';
                    const svg = e.currentTarget.querySelector('svg') as SVGElement | null;
                    if (svg) (svg as unknown as HTMLElement).style.transform = 'scale(1) rotate(0)';
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ flexShrink: 0, transition: 'transform 250ms' }}>
                    <rect x="3" y="3" width="18" height="18" rx="5"/>
                    <circle cx="12" cy="12" r="4"/>
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
                  </svg>
                  @cameraonrollproduction
                </a>
              </div>
              <div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '9px', fontWeight: 700, letterSpacing: '0.36em', textTransform: 'uppercase', color: 'var(--accent)', margin: '0 0 8px' }}>Based In</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', fontWeight: 400, color: 'var(--white-70)', margin: 0 }}>Mumbai, India &mdash; Serving PAN India</p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* ── RIGHT: inquiry form ──────────────────── */}
        <Reveal delay={0.18}>
          <div style={{
            border: '1px solid var(--white-08)',
            padding: 'clamp(24px,3vw,40px)',
            background: 'rgba(255,255,255,0.015)',
          }}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.4em', textTransform: 'uppercase', color: 'var(--accent)', margin: '0 0 6px' }}>Inquiry Form</p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', lineHeight: 1.7, color: 'var(--white-70)', margin: '0 0 clamp(20px,2.5vw,28px)' }}>
              All fields marked with <span style={{ color: 'var(--accent)' }}>*</span> are required.
            </p>

            {sent ? (
              <div style={{ padding: '24px 0' }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '9px', fontWeight: 700, letterSpacing: '0.38em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '14px' }}>Message Received</p>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px,2.6vw,36px)', textTransform: 'uppercase', color: 'var(--white)', margin: '0 0 14px', lineHeight: 1 }}>Thank You.</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', lineHeight: 1.85, color: 'var(--white-70)', margin: 0 }}>
                  We&rsquo;ll review your message and reply within 24 hours.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => { e.preventDefault(); setSent(true); }}
                style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}
              >
                {[
                  { name: 'name',    placeholder: 'Your Name *',        type: 'text',  span: 1, req: true  },
                  { name: 'company', placeholder: 'Company / Brand',     type: 'text',  span: 1, req: false },
                  { name: 'email',   placeholder: 'Email Address *',     type: 'email', span: 1, req: true  },
                  { name: 'phone',   placeholder: 'Phone Number *',      type: 'tel',   span: 1, req: true  },
                  { name: 'budget',  placeholder: 'Project Budget (optional)', type: 'text', span: 2, req: false },
                ].map((f) => (
                  <input key={f.name} name={f.name} type={f.type} placeholder={f.placeholder} required={f.req}
                    style={{
                      gridColumn: `span ${f.span}`,
                      background: 'transparent', border: '1px solid var(--white-20)',
                      fontFamily: 'var(--font-body)', fontSize: '12px', letterSpacing: '0.04em',
                      color: 'var(--white)', padding: '14px 16px', outline: 'none',
                      transition: 'border-color 200ms',
                    }}
                    onFocus={e => { e.currentTarget.style.borderColor = 'var(--accent)'; }}
                    onBlur={e => { e.currentTarget.style.borderColor = 'var(--white-20)'; }}
                  />
                ))}
                <textarea name="message" placeholder="Tell us about your project… *" required rows={5}
                  style={{
                    gridColumn: 'span 2',
                    background: 'transparent', border: '1px solid var(--white-20)',
                    fontFamily: 'var(--font-body)', fontSize: '12px', letterSpacing: '0.04em',
                    color: 'var(--white)', padding: '14px 16px', outline: 'none', resize: 'vertical',
                    transition: 'border-color 200ms',
                  }}
                  onFocus={e => { e.currentTarget.style.borderColor = 'var(--accent)'; }}
                  onBlur={e => { e.currentTarget.style.borderColor = 'var(--white-20)'; }}
                />
                <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'flex-start', marginTop: '6px' }}>
                  <button type="submit" style={{
                    fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 700,
                    letterSpacing: '0.28em', textTransform: 'uppercase',
                    padding: '16px 44px', background: 'var(--accent)', color: '#fff',
                    border: 'none', cursor: 'pointer',
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    transition: 'box-shadow 400ms, opacity 300ms',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 50px rgba(232,23,106,0.4)'; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; }}
                  >Send Inquiry →</button>
                </div>
              </form>
            )}
          </div>
        </Reveal>
      </div>

      {/* Mobile: collapse to single column */}
      <style jsx>{`
        @media (max-width: 860px) {
          :global(.wwu-grid) {
            grid-template-columns: 1fr !important;
            gap: clamp(40px, 6vw, 56px) !important;
          }
        }
      `}</style>
    </div>
  );
}
