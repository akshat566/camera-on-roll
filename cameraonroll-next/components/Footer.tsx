import Link from 'next/link';

const NAV = [
  { href: '/work',     label: 'Work' },
  { href: '/atom',     label: 'Atom' },
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
          <Link href="/">
            <span className="block text-[13px] tracking-[0.06em] uppercase" style={{ fontFamily: 'var(--font-display)', color: 'var(--white)', lineHeight: 1 }}>
              Camera <span style={{ color: 'var(--gold)' }}>On Roll</span>
            </span>
            <span className="block mt-[4px] text-[7px] tracking-[0.44em] uppercase" style={{ fontFamily: 'var(--font-body)', color: 'var(--white-40)', lineHeight: 1 }}>
              Production · Mumbai
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

          <a href="https://instagram.com/cameraonrollproduction" target="_blank" rel="noopener noreferrer"
            className="transition-colors duration-200 hover:opacity-70"
            style={{ fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--white-40)' }}>
            @cameraonrollproduction
          </a>
        </div>

        {/* Divider */}
        <div style={{ borderTop: '1px solid var(--white-08)', paddingTop: '32px' }} className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: 'var(--white-40)', letterSpacing: '0.08em' }}>
            © {year} Camera On Roll Production. All rights reserved.
          </p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: 'var(--white-40)', letterSpacing: '0.08em' }}>
            Cinema · AI · Visual Storytelling
          </p>
        </div>

      </div>
    </footer>
  );
}
