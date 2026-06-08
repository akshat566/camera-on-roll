'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { frame, cancelFrame } from 'framer-motion';
import 'lenis/dist/lenis.css';

/**
 * Global scroll wrapper.
 *
 * IMPORTANT: On a video-heavy site, JS-driven smooth scroll (Lenis) runs on the
 * MAIN THREAD and competes with video decoding, which causes scroll stutter.
 * Native browser scrolling runs on the COMPOSITOR THREAD and stays buttery
 * smooth even while videos decode. Since nothing here depends on Lenis
 * (the Scroll3D parallax helper is unused), we default to native scrolling.
 *
 * Flip `ENABLE_LENIS` to true to bring the cinematic Lenis glide back.
 */
const ENABLE_LENIS = false;

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (!ENABLE_LENIS) return;
    // Skip on prefers-reduced-motion
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const lenis = new Lenis({
      lerp: 0.12,
      smoothWheel: true,
      wheelMultiplier: 1.1,
      touchMultiplier: 1.5,
      syncTouch: false,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      infinite: false,
    });

    lenisRef.current = lenis;

    function update(data: { timestamp: number }) {
      lenis.raf(data.timestamp);
    }
    frame.update(update, true);

    return () => {
      cancelFrame(update);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
