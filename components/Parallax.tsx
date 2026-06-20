'use client';

import { useRef, type ReactNode, type CSSProperties } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

/**
 * Lightweight, compositor-friendly parallax wrapper.
 *
 * Translates its children vertically as the element scrolls through the
 * viewport. Uses ONLY transform (the GPU compositor handles it), so it stays
 * smooth even on the video-heavy pages where Lenis smooth-scroll was disabled.
 *
 * @param speed   Strength of the drift. ~0.15 = subtle, 0.4 = strong.
 *                Positive drifts the layer "up" (background feel).
 * @param range   Max travel in px at progress extremes. Default 90.
 *
 * NOTE: when used on a hero background that fills `inset:0`, scale the inner
 * media up (~1.15) so the drift never reveals empty edges.
 */
export function Parallax({
  children,
  speed = 0.2,
  range = 90,
  className,
  style,
}: {
  children: ReactNode;
  speed?: number;
  range?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const d = range * speed;
  const y = useTransform(scrollYProgress, [0, 1], [-d, d]);

  if (prefersReducedMotion) {
    return (
      <div ref={ref} className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ y, willChange: 'transform', ...style }}
    >
      {children}
    </motion.div>
  );
}
