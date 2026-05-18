'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';
import { useSafeAuth } from '@/hooks/useSafeAuth';

const LINKS = [
  { href: '/',         label: 'Home',        exact: true  },
  { href: '/work',     label: 'Work',        exact: false },
  { href: '/services', label: 'Our Services', exact: false },
  { href: '/about',    label: 'About Us',    exact: false },
  { href: '/atom',     label: 'Atom',        exact: false },
  { href: '/contact',  label: 'Contact',     exact: false },
];

const CLERK_KEY = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

export function Navbar() {
  const path = usePathname();
  const { isSignedIn } = useSafeAuth();
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

        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0, textDecoration: 'none' }}>
          {/* Asterisk mark */}
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="14" y1="2" x2="14" y2="26" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round"/>
            <line x1="2" y1="14" x2="26" y2="14" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round"/>
            <line x1="5.1" y1="5.1" x2="22.9" y2="22.9" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round"/>
            <line x1="22.9" y1="5.1" x2="5.1" y2="22.9" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
          <span style={{
            fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600,
            letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--white)',
          }}>
            Camera On Roll Production
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

        {/* Auth — Desktop */}
        {CLERK_KEY && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginLeft: '16px' }}
            className="hidden-mobile">
            {!isSignedIn && (
              <>
                <SignInButton mode="modal">
                  <button style={{
                    fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 600,
                    letterSpacing: '0.14em', textTransform: 'uppercase',
                    padding: '10px 18px', background: 'transparent',
                    border: '1px solid var(--white-20)', color: 'var(--white-70)',
                    cursor: 'pointer', transition: 'border-color 200ms, color 200ms',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent-dim)'; e.currentTarget.style.color = 'var(--accent)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--white-20)'; e.currentTarget.style.color = 'var(--white-70)'; }}
                  >Sign In</button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button style={{
                    fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 600,
                    letterSpacing: '0.14em', textTransform: 'uppercase',
                    padding: '10px 18px', background: 'var(--accent)', color: '#fff',
                    border: 'none', cursor: 'pointer', transition: 'opacity 200ms',
                  }}
                  onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.opacity = '0.85'}
                  onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.opacity = '1'}
                  >Sign Up</button>
                </SignUpButton>
              </>
            )}
            {isSignedIn && (
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox: { width: '32px', height: '32px' },
                    userButtonPopoverCard: { background: 'var(--charcoal)', border: '1px solid var(--white-08)' },
                  },
                }}
              />
            )}
          </div>
        )}

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

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            style={{ background: 'rgba(9,9,8,0.97)', borderBottom: '1px solid var(--white-08)', backdropFilter: 'blur(20px)', overflow: 'hidden' }}
          >
            <div className="cx" style={{ paddingTop: '24px', paddingBottom: '32px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {LINKS.map(l => (
                <Link key={l.href} href={l.href}
                  style={{
                    fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 500,
                    letterSpacing: '0.14em', textTransform: 'uppercase',
                    color: isActive(l) ? 'var(--white)' : 'var(--white-40)',
                    padding: '14px 0', borderBottom: '1px solid var(--white-08)',
                  }}>
                  {l.label}
                </Link>
              ))}
              {/* Mobile auth */}
              {CLERK_KEY && (
                <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                  {!isSignedIn && (
                    <>
                      <SignInButton mode="modal">
                        <button style={{
                          flex: 1, padding: '14px',
                          fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 600,
                          letterSpacing: '0.14em', textTransform: 'uppercase',
                          background: 'transparent', border: '1px solid var(--white-20)', color: 'var(--white-70)',
                        }}>Sign In</button>
                      </SignInButton>
                      <SignUpButton mode="modal">
                        <button style={{
                          flex: 1, padding: '14px',
                          fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 600,
                          letterSpacing: '0.14em', textTransform: 'uppercase',
                          background: 'var(--accent)', color: '#fff', border: 'none',
                        }}>Sign Up</button>
                      </SignUpButton>
                    </>
                  )}
                  {isSignedIn && (
                    <div style={{ padding: '14px', textAlign: 'center' }}>
                      <UserButton />
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
