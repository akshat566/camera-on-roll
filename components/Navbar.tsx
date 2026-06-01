'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

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
  const [menuOpen, setMenuOpen] = useState(false);

  // Close mobile menu on route change + lock body scroll while open
  useEffect(() => { setMenuOpen(false); }, [path]);
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  useEffect(() => {
    let ticking = false;
    const fn = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 24);
          ticking = false;
        });
        ticking = true;
      }
    };
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

        {/* Logo — chair mark + full wordmark */}
        <Link href="/" aria-label="Camera On Roll Production — Home"
          style={{ display: 'flex', alignItems: 'center', gap: 'clamp(8px, 1vw, 12px)', flexShrink: 0, textDecoration: 'none' }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.85'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}
        >
          <img src="/favicon.png" alt=""
            style={{ height: 'clamp(28px, 3.4vw, 38px)', width: 'auto', display: 'block', objectFit: 'contain' }}
          />
          <img src="/logo.png" alt="Camera On Roll Production"
            style={{ height: 'clamp(32px, 4vw, 44px)', width: 'auto', display: 'block', objectFit: 'contain' }}
          />
        </Link>

        {/* Right side: desktop nav + CTA */}
        <div className="hidden-mobile" style={{ alignItems: 'center', gap: 'clamp(16px, 2.5vw, 32px)' }}>
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

        {/* Mobile hamburger */}
        <button
          className="show-mobile"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(o => !o)}
          style={{
            display: 'none', alignItems: 'center', justifyContent: 'center',
            width: '40px', height: '40px', flexShrink: 0,
            color: 'var(--white)', background: 'transparent', border: 'none', cursor: 'pointer',
          }}
        >
          {menuOpen ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M6 6l12 12M18 6L6 18"/></svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
          )}
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className="show-mobile"
        style={{
          display: 'none',
          position: 'fixed', insetInline: 0, top: 'var(--nav-h)', bottom: 0, zIndex: 49,
          flexDirection: 'column',
          background: 'rgba(9,9,8,0.98)', backdropFilter: 'blur(20px)',
          padding: 'clamp(24px,6vw,40px) var(--pad-x)',
          gap: '4px',
          transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
          transition: 'transform 380ms cubic-bezier(0.76,0,0.24,1), opacity 300ms',
        }}
      >
        {LINKS.map(l => (
          <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
            style={{
              fontFamily: 'var(--font-display)', fontSize: '26px', textTransform: 'uppercase',
              letterSpacing: '0.01em', padding: '14px 0',
              color: isActive(l) ? 'var(--accent)' : 'var(--white)',
              borderBottom: '1px solid var(--white-08)',
            }}
          >
            {l.label}
          </Link>
        ))}
        <Link href="/contact" onClick={() => setMenuOpen(false)} style={{
          marginTop: '28px',
          fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600,
          letterSpacing: '0.14em', textTransform: 'uppercase', textAlign: 'center',
          padding: '16px 18px', background: 'var(--accent)', color: '#fff',
        }}>Work With Us</Link>
      </div>

    </header>
  );
}
