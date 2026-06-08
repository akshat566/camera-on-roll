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

// Fullscreen mobile menu order (per spec): WORK · SERVICES · AI · ABOUT · CONTACT
const MOBILE_LINKS = [
  { href: '/work',     label: 'Work',     exact: false },
  { href: '/services', label: 'Services', exact: false },
  { href: '/atom',     label: 'AI',       exact: false },
  { href: '/about',    label: 'About',    exact: false },
  { href: '/contact',  label: 'Contact',  exact: false },
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
          <img src="/chair.png" alt="Camera On Roll Production"
            style={{ height: 'clamp(28px, 3.4vw, 38px)', width: 'auto', display: 'block', objectFit: 'contain' }}
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
            width: '48px', height: '48px', flexShrink: 0, marginRight: '-12px',
            color: 'var(--white)', background: 'transparent', border: 'none', cursor: 'pointer',
            position: 'relative', zIndex: 51,
          }}
        >
          {menuOpen ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M6 6l12 12M18 6L6 18"/></svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
          )}
        </button>
      </div>

      {/* Fullscreen mobile menu */}
      <div className="nav-fs only-mobile" data-open={menuOpen} aria-hidden={!menuOpen}>
        {MOBILE_LINKS.map(l => (
          <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
            className="nav-fs-link" data-active={isActive(l)}>
            {l.label}
            <span aria-hidden="true" style={{ fontSize: '0.4em', color: 'var(--accent)' }}>→</span>
          </Link>
        ))}
        <Link href="/contact" onClick={() => setMenuOpen(false)}
          className="btn btn-primary" style={{ marginTop: 'auto', width: '100%' }}>
          Start a Project
        </Link>
      </div>

    </header>
  );
}
