'use client';

import Link from 'next/link';
import { ChairLogo } from './ChairLogo';

const NAV = [
  { href: '/work',     label: 'Work' },
  { href: '/atom',     label: 'AI' },
  { href: '/services', label: 'Services' },
  { href: '/about',    label: 'About' },
  { href: '/contact',  label: 'Contact' },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{ borderTop: '1px solid var(--white-08)', background: 'var(--black)' }}>
      <div className="cx" style={{ paddingTop: '56px', paddingBottom: '56px' }}>

        {/* Top row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10 md:gap-0" style={{ marginBottom: '48px' }}>
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
            <ChairLogo size={28} style={{ color: 'var(--white)' }} />
            <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '15px', letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--white)', lineHeight: 1 }}>
                Camera <span style={{ color: 'var(--accent)' }}>On Roll</span>
              </span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '8px', fontWeight: 500, letterSpacing: '0.42em', textTransform: 'uppercase', color: 'var(--white-70)', marginTop: '4px' }}>
                Production · Mumbai
              </span>
            </span>
          </Link>

          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {NAV.map((l) => (
              <Link key={l.href} href={l.href} className="transition-colors duration-200 hover:opacity-70"
                style={{ fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--white-40)' }}>
                {l.label}
              </Link>
            ))}
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <a href="https://instagram.com/cameraonrollproduction" target="_blank" rel="noopener noreferrer"
              style={{ color: 'var(--white-40)', transition: 'color 200ms' }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--white-40)'; }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>
            </a>
            <a href="https://youtube.com/@cameraonrollproduction" target="_blank" rel="noopener noreferrer"
              style={{ color: 'var(--white-40)', transition: 'color 200ms' }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--white-40)'; }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
            </a>
            <a href="https://linkedin.com/company/cameraonrollproduction" target="_blank" rel="noopener noreferrer"
              style={{ color: 'var(--white-40)', transition: 'color 200ms' }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--white-40)'; }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <span style={{ fontFamily:'var(--font-body)', fontSize:'9px', fontWeight:500, letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--white-40)' }}>
              @cameraonrollproduction
            </span>
          </div>
        </div>

        {/* Divider */}
        <div style={{ borderTop: '1px solid var(--white-08)', paddingTop: '32px' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: 'var(--white-40)', letterSpacing: '0.08em' }}>
            © {year} Camera On Roll Production. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
