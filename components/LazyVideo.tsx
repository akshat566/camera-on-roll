'use client';

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';

export type LazyVideoProps = {
  src: string;
  poster?: string;
  className?: string;
  /** Style for the wrapper element. */
  style?: CSSProperties;
  /** Style merged onto the inner <video>. */
  videoStyle?: CSSProperties;
  /**
   * When the clip should play:
   * - 'inview' (default): plays while scrolled into view, pauses when out of view.
   * - 'hover': plays only while hovered (and in view); shows poster otherwise.
   */
  playMode?: 'inview' | 'hover';
  /** Begin buffering immediately (for above-the-fold hero clips). */
  eager?: boolean;
  /** Overlay nodes rendered above the video (gradients, captions, etc.). */
  children?: ReactNode;
  /** How far outside the viewport to start loading. */
  rootMargin?: string;
  objectFit?: CSSProperties['objectFit'];
};

/**
 * Performance-first video wrapper.
 *
 * - Lazy-loads: the file is only fetched once the element scrolls near the viewport.
 * - Plays only when relevant (in view or on hover) and pauses otherwise, so the
 *   browser isn't decoding off-screen video — the main cause of scroll jank.
 */
export function LazyVideo({
  src,
  poster,
  className,
  style,
  videoStyle,
  playMode = 'inview',
  eager = false,
  children,
  rootMargin = '300px',
  objectFit = 'cover',
}: LazyVideoProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const vidRef = useRef<HTMLVideoElement>(null);
  const playPromise = useRef<Promise<void> | null>(null);
  const [load, setLoad] = useState(eager);
  const [inView, setInView] = useState(false);
  const [hover, setHover] = useState(false);

  // Observe viewport intersection for lazy-load + play gating.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting) setLoad(true);
      },
      { rootMargin, threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  // Play / pause based on visibility and hover intent.
  useEffect(() => {
    const v = vidRef.current;
    if (!v || !load) return;
    const shouldPlay = playMode === 'hover' ? hover && inView : inView;
    if (shouldPlay) {
      playPromise.current = v.play().catch(() => {});
    } else if (playPromise.current) {
      playPromise.current.then(() => v.pause()).catch(() => {});
      playPromise.current = null;
    } else {
      v.pause();
    }
  }, [load, inView, hover, playMode]);

  return (
    <div
      ref={wrapRef}
      className={className}
      style={{ position: 'relative', overflow: 'hidden', ...style }}
      onMouseEnter={playMode === 'hover' ? () => setHover(true) : undefined}
      onMouseLeave={playMode === 'hover' ? () => setHover(false) : undefined}
    >
      <video
        ref={vidRef}
        src={load ? src : undefined}
        poster={poster}
        muted
        loop
        playsInline
        preload={eager ? 'auto' : 'none'}
        style={{ width: '100%', height: '100%', objectFit, display: 'block', ...videoStyle }}
      />
      {children}
    </div>
  );
}
