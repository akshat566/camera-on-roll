'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ChairLogo } from './ChairLogo';

const LINKS = [
  { href: '/',         label: 'Home',        exact: true  },
  { href: '/work',     label: 'Work',        exact: false },
  { href: '/services', label: 'Our Services', exact: false },
  { href: '/about',    label: 'About Us',    exact: false },
  { href: '/atom',     label: 'AI',          exact: false },
  { href: '/contact',  label: 'Contact',     exact: false },
];

export function Navbar() {
  const path = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const isActive = (l: { href: string; exact: boolean }) =>
    l.exact ? path === l.href : (path.startsWith(l.href) && l.href !== '/');

  return (
    <header
      style={{
        position: 'fixed', insetInline: 0, top: 0, zIndex: 50,
        height: 'var(--nav-h)',
        background: scrolled ? 'rgba(9,9,8,0.92)' : 'var(--black)',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: '1px solid var(--white-08)',
        transition: 'background 600ms, backdrop-filter 600ms',
      }}
    >
      <div className="cx" style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 0, paddingRight: 0 }}>

        {/* Logo — chair icon only */}
        <Link href="/" aria-label="Camera On Roll Production — Home"
          style={{ display: 'flex', alignItems: 'center', flexShrink: 0, textDecoration: 'none', color: 'var(--white)', transition: 'color 250ms' }}
          onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--accent)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--white)'; }}
        >
          <ChairLogo size={28} />
        </Link>

        {/* Right side: nav + CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(16px, 2.5vw, 32px)' }}>
          <nav style={{ display: 'flex', alignItems: 'center', gap: 'clamp(16px, 2vw, 28px)' }}>
            {LINKS.map(l => (
              <Link key={l.href} href={l.href}
                style={{
                  fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 500,
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  color: isActive(l) ? 'var(--white)' : 'var(--white-40)',
                  transition: 'color 200ms',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => { if (!isActive(l)) (e.currentTarget as HTMLElement).style.color = 'var(--white-70)'; }}
                onMouseLeave={e => { if (!isActive(l)) (e.currentTarget as HTMLElement).style.color = 'var(--white-40)'; }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <Link href="/contact" style={{
            fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 600,
            letterSpacing: '0.14em', textTransform: 'uppercase',
            padding: '10px 18px', background: 'transparent', color: 'var(--accent)',
            border: '1.5px solid var(--accent)', cursor: 'pointer', transition: 'all 200ms',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'var(--accent)'; (e.currentTarget as HTMLAnchorElement).style.color = '#fff'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'; (e.currentTarget as HTMLAnchorElement).style.color = 'var(--accent)'; }}
          >Work With Us</Link>
        </div>
      </div>

    </header>
  );
}
