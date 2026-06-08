'use client';

import { useState } from 'react';
import { CLIENTS, type Client } from '@/lib/clients-data';

export function ClientBadge({ name, logo, domain }: Client) {
  const [imgError, setImgError] = useState(false);
  // Only hit Clearbit if domain is provided; empty string means "skip".
  const src = logo && !imgError
    ? logo
    : domain && !imgError
      ? `https://logo.clearbit.com/${domain}?size=200`
      : null;
  return (
    <div className="client-badge"
      style={{
        flexShrink: 0,
        width: 'clamp(64px, 5.5vw, 80px)',
        height: 'clamp(64px, 5.5vw, 80px)',
        borderRadius: '50%',
        background: '#fff',
        border: '1.5px solid var(--white-08)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '10px', overflow: 'hidden',
        transition: 'transform 300ms, box-shadow 350ms, border-color 350ms',
      }}
    >
      {src ? (
        <img
          src={src}
          alt={name}
          loading="lazy"
          decoding="async"
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
    </div>
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
