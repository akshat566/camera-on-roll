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
      duration: 1.8,                                              // longer = more glide, cinematic
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),    // expoOut
      smoothWheel: true,
      wheelMultiplier: 0.85,                                       // gentler wheel pace
      touchMultiplier: 1.4,                                       // crisper touch
      lerp: 0.075,                                                // a bit more inertia
      syncTouch: true,                                            // unified momentum on touch devices
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      infinite: false,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const id = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
