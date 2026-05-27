'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

/**
 * Global smooth scroll wrapper. Cinematic glide tuned for a
 * "3D scroll" feel that pairs with framer-motion parallax + scale-in
 * effects on sections (see Scroll3D component).
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Skip on prefers-reduced-motion
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const lenis = new Lenis({
      duration: 0.8,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      wheelMultiplier: 1.2,
      touchMultiplier: 1.8,
      lerp: 0.18,
      syncTouch: false,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      infinite: false,
    });

    lenisRef.current = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
