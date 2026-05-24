'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => { setOpen(false); setSearch(false); }, [path]);

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
      <div className="cx" style={{ height: '100%', display: 'flex', alignItems: 'center', gap: '32px' }}>

        {/* Logo — chair icon + CAMERA ON ROLL wordmark + Production subscript */}
        <Link href="/" aria-label="Camera On Roll Production — Home"
          style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0, textDecoration: 'none', color: 'var(--white)', transition: 'color 250ms' }}
          onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--accent)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--white)'; }}
        >
          <ChairLogo size={28} />
          <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: '15px', letterSpacing: '0.04em',
              textTransform: 'uppercase',
              color: 'inherit',
              lineHeight: 1,
            }}>
              Camera on Roll
            </span>
            <span style={{
              fontFamily: 'var(--font-body)',
              fontSize: '8px', fontWeight: 500,
              letterSpacing: '0.42em',
              textTransform: 'uppercase',
              color: 'var(--white-70)',
              marginTop: '4px',
            }}>
              Production
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '32px', marginLeft: 'auto' }}
          className="hidden-mobile">
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

        {/* Search + Work With Us — Desktop */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginLeft: '16px' }}
          className="hidden-mobile">
          <button
            onClick={() => setSearch(s => !s)}
            aria-label="Search"
            style={{
              width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'transparent', border: '1px solid var(--white-20)', color: 'var(--white-70)',
              cursor: 'pointer', transition: 'border-color 200ms, color 200ms',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent-dim)'; e.currentTarget.style.color = 'var(--accent)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--white-20)'; e.currentTarget.style.color = 'var(--white-70)'; }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
          </button>
          <Link href="/contact" style={{
            fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 600,
            letterSpacing: '0.14em', textTransform: 'uppercase',
            padding: '10px 18px', background: 'var(--accent)', color: '#fff',
            border: 'none', cursor: 'pointer', transition: 'opacity 200ms',
          }}
          onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.opacity = '0.85'}
          onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.opacity = '1'}
          >Work With Us</Link>
        </div>

        {/* Hamburger */}
        <button className="show-mobile" onClick={() => setOpen(!open)} aria-label="Toggle menu"
          style={{ marginLeft: 'auto', display: 'flex', flexDirection: 'column', gap: '5px', padding: '8px', background: 'none', border: 'none', cursor: 'pointer' }}>
          <motion.span animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }} transition={{ duration: 0.22 }}
            style={{ display: 'block', width: '22px', height: '1.5px', background: 'var(--white)' }} />
          <motion.span animate={open ? { opacity: 0 } : { opacity: 1 }} transition={{ duration: 0.16 }}
            style={{ display: 'block', width: '22px', height: '1.5px', background: 'var(--white)' }} />
          <motion.span animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }} transition={{ duration: 0.22 }}
            style={{ display: 'block', width: '22px', height: '1.5px', background: 'var(--white)' }} />
        </button>
      </div>

      {/* Mobile drawer — minimal, compact, premium */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.22, 0.58, 0.32, 1] }}
            style={{
              position: 'absolute', top: '100%', right: 'var(--pad-x)',
              minWidth: '240px',
              background: 'rgba(9,9,8,0.96)', border: '1px solid var(--white-08)',
              backdropFilter: 'blur(20px)', overflow: 'hidden',
              boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
            }}
          >
            <div style={{ padding: '8px 0', display: 'flex', flexDirection: 'column' }}>
              {LINKS.map(l => (
                <Link key={l.href} href={l.href}
                  style={{
                    fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 500,
                    letterSpacing: '0.18em', textTransform: 'uppercase',
                    color: isActive(l) ? 'var(--accent)' : 'var(--white-70)',
                    padding: '12px 20px',
                    transition: 'background 200ms, color 200ms',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.04)'; (e.currentTarget as HTMLAnchorElement).style.color = 'var(--white)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'; (e.currentTarget as HTMLAnchorElement).style.color = isActive(l) ? 'var(--accent)' : 'var(--white-70)'; }}
                >
                  {l.label}
                </Link>
              ))}
              <div style={{ borderTop: '1px solid var(--white-08)', marginTop: '4px', padding: '12px 20px' }}>
                <Link href="/contact" style={{
                  display: 'block', textAlign: 'center',
                  fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 600,
                  letterSpacing: '0.18em', textTransform: 'uppercase',
                  padding: '10px 16px', background: 'var(--accent)', color: '#fff',
                }}>Work With Us</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Search overlay */}
      <AnimatePresence>
        {search && (
          <motion.div
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute', top: '100%', left: 0, right: 0,
              background: 'rgba(9,9,8,0.96)', borderBottom: '1px solid var(--white-08)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <div className="cx" style={{ padding: '20px 0' }}>
              <input
                autoFocus
                type="text"
                placeholder="Search work, services, AI…"
                style={{
                  width: '100%', background: 'transparent', border: 'none',
                  borderBottom: '1px solid var(--white-20)',
                  fontFamily: 'var(--font-body)', fontSize: '14px', letterSpacing: '0.08em',
                  color: 'var(--white)', padding: '10px 0', outline: 'none',
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
