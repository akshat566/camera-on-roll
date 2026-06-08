'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

/**
 * Bottom-fixed "Start a Project" CTA — mobile only.
 * Hidden via CSS (.sticky-cta) on >=769px and suppressed on the contact page
 * where the inquiry form already provides the conversion path.
 */
export function StickyCTA() {
  const path = usePathname();
  if (path.startsWith('/contact')) return null;

  return (
    <div className="sticky-cta">
      <Link href="/contact" className="btn btn-primary">
        Start a Project
      </Link>
    </div>
  );
}
