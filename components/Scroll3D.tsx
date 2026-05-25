'use client';

import { useRef, type ReactNode } from 'react';
import { motion, useScroll, useTransform, useReducedMotion, type MotionStyle } from 'framer-motion';

/**
 * Wraps content with scroll-driven 3D depth + parallax.
 * - As the element enters the viewport, it tilts in from rotateX:6°, scale:0.94, opacity:0.4
 * - Smoothly settles when centered, then gently parallaxes out (y:-20) on exit
 *
 * Use this around major sections to add the cinematic "scrolling experience".
 *
 * @example
 * <Scroll3D>
 *   <section>...</section>
 * </Scroll3D>
 */
export function Scroll3D({
  children,
  intensity = 1,
  style,
}: {
  children: ReactNode;
  /** 0 = no effect, 1 = default, 2 = strong. Default 1. */
  intensity?: number;
  style?: MotionStyle;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const k = intensity;
  const opacity   = useTransform(scrollYProgress, [0, 0.18, 0.82, 1], [0.35, 1, 1, 0.6]);
  const scale     = useTransform(scrollYProgress, [0, 0.18, 0.82, 1], [1 - 0.06 * k, 1, 1, 1 - 0.03 * k]);
  const rotateX   = useTransform(scrollYProgress, [0, 0.18, 0.82, 1], [6 * k, 0, 0, -2 * k]);
  const y         = useTransform(scrollYProgress, [0, 0.18, 0.82, 1], [40 * k, 0, 0, -20 * k]);

  if (prefersReducedMotion) {
    return <div ref={ref}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      style={{
        opacity, scale, rotateX, y,
        transformPerspective: 1200,
        transformStyle: 'preserve-3d',
        willChange: 'transform, opacity',
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
}
