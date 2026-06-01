'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CLIENTS, type Client } from '@/lib/clients-data';

const EASE = [0.76, 0, 0.24, 1] as const;

export function ClientBadge({ name, logo }: Client) {
  const [imgError, setImgError] = useState(false);
  return (
    <motion.div
      whileHover={{ scale: 1.04, y: -2 }}
      transition={{ duration: 0.3, ease: EASE }}
      style={{
        flexShrink: 0,
        width: 'clamp(44px, 4.5vw, 64px)',
        height: 'clamp(44px, 4.5vw, 64px)',
        borderRadius: '50%',
        background: '#fff',
        border: '1px solid var(--white-08)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '7px', overflow: 'hidden',
        boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
        transition: 'box-shadow 350ms, border-color 350ms',
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 18px rgba(232,23,106,0.18)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)'; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 12px rgba(0,0,0,0.25)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--white-08)'; }}
    >
      {logo && !imgError ? (
        <img
          src={logo}
          alt={name}
          loading="lazy"
          onError={() => setImgError(true)}
          style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', display: 'block' }}
        />
      ) : (
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(7px, 0.6vw, 10px)',
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
          <ClientBadge key={`${c.name}-${i}`} name={c.name} logo={c.logo} />
        ))}
      </div>
    </div>
  );
}
