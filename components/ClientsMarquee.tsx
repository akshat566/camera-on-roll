'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CLIENTS, type Client } from '@/lib/clients-data';

const EASE = [0.76, 0, 0.24, 1] as const;

export function ClientBadge({ name, logo, domain }: Client) {
  const [imgError, setImgError] = useState(false);
  // Prefer local logo; if missing or broken, fall back to Clearbit
  const src = logo && !imgError ? logo : `https://logo.clearbit.com/${domain}?size=200`;
  return (
    <motion.div
      whileHover={{ scale: 1.06, y: -2 }}
      transition={{ duration: 0.3, ease: EASE }}
      style={{
        flexShrink: 0,
        width: 'clamp(64px, 5.5vw, 80px)',
        height: 'clamp(64px, 5.5vw, 80px)',
        borderRadius: '50%',
        background: '#fff',
        border: '1.5px solid var(--white-08)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '10px', overflow: 'hidden',
        boxShadow: '0 6px 18px rgba(0,0,0,0.30)',
        transition: 'box-shadow 350ms, border-color 350ms',
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 10px 28px rgba(232,23,106,0.25)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)'; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 18px rgba(0,0,0,0.30)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--white-08)'; }}
    >
      {!imgError ? (
        <img
          src={src}
          alt={name}
          loading="lazy"
          onError={() => setImgError(true)}
          style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', display: 'block' }}
        />
      ) : (
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(8px, 0.7vw, 12px)',
          letterSpacing: '0.02em', lineHeight: 1.05,
          textAlign: 'center', textTransform: 'uppercase',
          color: '#0a0a0a',
        }}>{name}</span>
      )}
    </motion.div>
  );
}

/** Edge-to-edge sliding marquee of client logo badges. */
export function ClientsMarquee() {
  return (
    <div style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(6px,0.8vw,10px) 0' }}>
      {/* Edge fades for clean blend with background */}
      <div aria-hidden="true" style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: 'clamp(40px,5vw,80px)', background: 'linear-gradient(to right, var(--black), transparent)', zIndex: 2, pointerEvents: 'none' }} />
      <div aria-hidden="true" style={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: 'clamp(40px,5vw,80px)', background: 'linear-gradient(to left, var(--black), transparent)', zIndex: 2, pointerEvents: 'none' }} />

      <div className="marquee" style={{ gap: 'clamp(10px,1vw,16px)', paddingLeft: 'clamp(10px,1vw,16px)' }}>
        {[...CLIENTS, ...CLIENTS].map((c, i) => (
          <ClientBadge key={`${c.name}-${i}`} name={c.name} logo={c.logo} domain={c.domain} />
        ))}
      </div>
    </div>
  );
}
