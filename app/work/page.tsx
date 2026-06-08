'use client';
import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getEmbedUrl, type Project } from '@/lib/work-data';
import { ALL_V2_PROJECTS, V2_CATEGORIES } from '@/lib/work-v2-data';

const E = [0.22, 0.58, 0.32, 1] as const;
const POP_EASE = [0.34, 1.56, 0.64, 1] as const;

function isImageUrl(url: string): boolean {
  return /\.(jpe?g|png|webp|gif|bmp)(\?.*)?$/i.test(url);
}

/** Fullscreen modal — same pattern as work/page.tsx */
function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const embed = getEmbedUrl(project);
  const playerRef = useRef<HTMLDivElement>(null);
  const isV = project.orientation === 'v';
  const isImage = isImageUrl(project.link);

  const goFullscreen = () => {
    const el = playerRef.current;
    if (!el) return;
    if (document.fullscreenElement) {
      document.exitFullscreen?.();
    } else {
      el.requestFullscreen?.();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 100,
        background: 'rgba(9,9,8,0.94)', backdropFilter: 'blur(16px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 'clamp(16px, 4vw, 64px)',
      }}
    >
      <motion.div
        initial={{ scale: 0.92, y: 24, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, y: 12, opacity: 0 }}
        transition={{ duration: 0.4, ease: E }}
        onClick={e => e.stopPropagation()}
        style={{
          position: 'relative',
          width: isImage ? 'min(1000px, 92vw)' : (isV ? 'min(420px, 100%)' : 'min(1100px, 100%)'),
          maxHeight: '90vh',
          display: 'flex', flexDirection: 'column', gap: '12px',
        }}
      >
        {/* Top bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
          <div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '9px', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--accent)', margin: '0 0 4px' }}>
              {project.cat}{isImage ? ' · Photo' : project.platform === 'youtube' ? ' · YouTube' : project.platform === 'instagram' ? ' · Instagram' : ''}
            </p>
            {project.title && (
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(18px,2vw,26px)', textTransform: 'uppercase', color: 'var(--white)', margin: '0 0 2px', lineHeight: 1.05, letterSpacing: '0.01em' }}>{project.title}</h3>
            )}
            {project.client && project.client !== 'Camera On Roll' && (
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--white-70)', margin: 0 }}>{project.client}</p>
            )}
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {!isImage && (
            <button onClick={goFullscreen} aria-label="Fullscreen"
              style={{ width: '40px', height: '40px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: '1px solid var(--white-20)', color: 'var(--white-70)', cursor: 'pointer', transition: 'all 200ms' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--white-20)'; e.currentTarget.style.color = 'var(--white-70)'; }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9V5a2 2 0 0 1 2-2h4M21 9V5a2 2 0 0 0-2-2h-4M3 15v4a2 2 0 0 0 2 2h4M21 15v4a2 2 0 0 1-2 2h-4"/>
              </svg>
            </button>
            )}
            <a href={project.link} target="_blank" rel="noopener noreferrer" aria-label="Open original"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '0 16px', height: '40px', background: 'transparent', border: '1px solid var(--white-20)', color: 'var(--white-70)', fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', textDecoration: 'none', cursor: 'pointer', transition: 'all 200ms' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--white-20)'; e.currentTarget.style.color = 'var(--white-70)'; }}
            >
              {isImage ? 'View Full Size' : 'Open Original'}
              <svg width="10" height="10" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 12L12 2M12 2H5M12 2V9"/></svg>
            </a>
            <button onClick={onClose} aria-label="Close"
              style={{ width: '40px', height: '40px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'var(--accent)', border: 'none', color: '#fff', cursor: 'pointer', transition: 'box-shadow 200ms' }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 30px rgba(232,23,106,0.4)'; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M18 6L6 18"/></svg>
            </button>
          </div>
        </div>

        {/* Media */}
        {isImage ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1, ease: E }}
            ref={playerRef}
            style={{
              position: 'relative', width: '100%', maxHeight: '78vh',
              background: 'linear-gradient(135deg, #111 0%, #0a0a0a 100%)',
              border: '1px solid var(--white-08)',
              boxShadow: '0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(232,23,106,0.18)',
              overflow: 'hidden', borderRadius: '2px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <img
              src={project.link} alt={project.title} loading="eager"
              style={{ maxWidth: '100%', maxHeight: '78vh', objectFit: 'contain', display: 'block', transition: 'transform 0.6s cubic-bezier(0.22, 0.58, 0.32, 1)' }}
              onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.02)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)'; }}
            />
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', boxShadow: 'inset 0 0 80px rgba(0,0,0,0.3)' }} />
          </motion.div>
        ) : (
        <div ref={playerRef} style={{
          position: 'relative', width: '100%',
          aspectRatio: isV ? '9 / 16' : '16 / 9',
          maxHeight: isV ? 'min(80vh, 720px)' : 'min(72vh, 620px)',
          background: '#000', border: '1px solid var(--white-08)',
          boxShadow: '0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(232,23,106,0.18)',
          overflow: 'hidden',
        }}>
          {project.platform === 'r2' ? (
            <video src={project.link} controls autoPlay playsInline
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', background: '#000' }}
            />
          ) : embed ? (
            <iframe
              src={embed} title={project.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
            />
          ) : (
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--white-70)', fontFamily: 'var(--font-body)', fontSize: '12px', letterSpacing: '0.18em', textTransform: 'uppercase', textAlign: 'center', padding: '24px' }}>
              Preview unavailable.<br/>Use &ldquo;Open Original&rdquo; to watch.
            </div>
          )}
        </div>
        )}

        <p style={{ fontFamily: 'var(--font-body)', fontSize: '9px', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--white-40)', margin: 0, textAlign: 'center' }}>
          Press ESC or click outside to close
        </p>
      </motion.div>
    </motion.div>
  );
}

export default function WorkV2Page() {
  const [modal, setModal] = useState<Project | null>(null);
  const [activeCat, setActiveCat] = useState<string>('All');

  const filtered = useMemo(() => {
    if (activeCat === 'All') return ALL_V2_PROJECTS;
    return ALL_V2_PROJECTS.filter(p => p.cat === activeCat);
  }, [activeCat]);

  // ESC to close modal
  useEffect(() => {
    if (!modal) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setModal(null); };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, [modal]);

  return (
    <>
      <section
        style={{ paddingTop: 'calc(var(--nav-h) + 32px)', paddingBottom: '80px', paddingLeft: 'clamp(20px,4vw,64px)', paddingRight: 'clamp(20px,4vw,64px)', minHeight: '100vh' }}
      >
        {/* Page header */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', marginBottom: 'clamp(48px,6vw,80px)' }}>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: E }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(32px,5vw,64px)',
              textTransform: 'uppercase',
              color: 'var(--white)',
              margin: 0,
              lineHeight: 1.05,
              letterSpacing: '-0.01em',
            }}
          >
            Our Work
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: E }}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '11px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--white-50)',
              margin: '12px 0 0',
            }}
          >
            SELECT A PROJECT TO VIEW
          </motion.p>

          {/* Category filters */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: E }}
            style={{ display: 'flex', flexWrap: 'nowrap', gap: '6px', marginTop: '20px', overflowX: 'auto', paddingBottom: '4px' }}
          >
            {['All', ...V2_CATEGORIES].map(cat => {
              const isActive = activeCat === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCat(cat)}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '9px',
                    fontWeight: 600,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    padding: '5px 12px',
                    border: isActive ? '1px solid var(--accent)' : '1px solid var(--white-12)',
                    background: isActive ? 'rgba(232,23,106,0.08)' : 'transparent',
                    color: isActive ? 'var(--accent)' : 'var(--white-50)',
                    cursor: 'pointer',
                    transition: 'all 200ms ease',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                  }}
                  onMouseEnter={e => { if (!isActive) { e.currentTarget.style.borderColor = 'var(--white-30)'; e.currentTarget.style.color = 'var(--white-80)'; }}}
                  onMouseLeave={e => { if (!isActive) { e.currentTarget.style.borderColor = 'var(--white-12)'; e.currentTarget.style.color = 'var(--white-50)'; }}}
                >
                  {cat}
                </button>
              );
            })}
          </motion.div>
        </div>

        {/* Visual grid — masonry style (matches og work page) */}
        <div style={{ maxWidth: '1400px', margin: '0 auto', marginTop: 'clamp(24px,3vw,40px)' }}>
          <div className="wgrid">
            <AnimatePresence>
              {filtered.map((project, i) => {
                const isV = project.orientation === 'v';
                const isH = project.orientation === 'h';
                const tileClass = isV ? 'wtile-v' : (isH ? 'wtile-h' : 'wtile-s');
                return (
                  <motion.div
                    key={project.id}
                    className={`wtile ${tileClass}`}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.4, delay: (i % 4) * 0.05, ease: E }}
                    whileHover={{ y: -6, zIndex: 5, boxShadow: '0 30px 100px rgba(232,23,106,0.55), 0 0 80px rgba(232,23,106,0.25), 0 0 0 1.5px rgba(232,23,106,0.6)', transition: { duration: 0.3, ease: POP_EASE } }}
                  >
                    <button
                      type="button"
                      onClick={() => setModal(project)}
                      aria-label={`Play ${project.title}`}
                      style={{
                        display: 'block', width: '100%', height: '100%', padding: 0, border: 'none',
                        textAlign: 'left', textDecoration: 'none', position: 'relative',
                        background: '#111', cursor: 'pointer',
                      }}
                      onMouseEnter={e => {
                        const el = e.currentTarget as HTMLElement;
                        const play = el.querySelector('.tile-play') as HTMLElement | null;
                        if (play) { play.style.opacity = '1'; play.style.transform = 'translate(-50%,-50%) scale(1)'; }
                        const info = el.querySelector('.tile-info') as HTMLElement | null;
                        if (info) { info.style.opacity = '1'; }
                        const cat = el.querySelector('.tile-cat') as HTMLElement | null;
                        if (cat) { cat.style.opacity = '1'; }
                      }}
                      onMouseLeave={e => {
                        const el = e.currentTarget as HTMLElement;
                        const play = el.querySelector('.tile-play') as HTMLElement | null;
                        if (play) { play.style.opacity = '0'; play.style.transform = 'translate(-50%,-50%) scale(0.6)'; }
                        const info = el.querySelector('.tile-info') as HTMLElement | null;
                        if (info) { info.style.opacity = '0'; }
                        const cat = el.querySelector('.tile-cat') as HTMLElement | null;
                        if (cat) { cat.style.opacity = '0'; }
                      }}
                    >
                      <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', background: 'linear-gradient(135deg, #1a0a10 0%, #0d0d0c 50%, #1a0a10 100%)' }}>
                        <img
                          src={project.poster}
                          alt={project.title}
                          loading="lazy"
                          style={{
                            width: '100%', height: '100%', objectFit: 'cover', display: 'block',
                            transition: 'transform 700ms var(--ease-expo), filter 400ms',
                            filter: 'brightness(0.85)',
                          }}
                          onMouseEnter={e => {
                            const el = e.currentTarget as HTMLImageElement;
                            el.style.transform = 'scale(1.12)';
                            el.style.filter = 'brightness(1.05) saturate(1.1)';
                          }}
                          onMouseLeave={e => {
                            const el = e.currentTarget as HTMLImageElement;
                            el.style.transform = 'scale(1)';
                            el.style.filter = 'brightness(0.85)';
                          }}
                        />
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(9,9,8,0.85) 0%, transparent 45%)' }} />

                        {/* Big play badge */}
                        <div className="tile-play" style={{
                          position: 'absolute', top: '50%', left: '50%',
                          transform: 'translate(-50%,-50%) scale(0.6)',
                          width: '56px', height: '56px', borderRadius: '50%',
                          background: 'var(--accent)', color: '#fff',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          opacity: 0, pointerEvents: 'none',
                          boxShadow: '0 0 40px rgba(232,23,106,0.6)',
                          transition: 'opacity 300ms, transform 400ms var(--ease-expo)',
                        }}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft: '3px' }}><path d="M8 5v14l11-7z"/></svg>
                        </div>

                        {/* Category badge */}
                        <span className="tile-cat" style={{
                          position: 'absolute', top: '10px', left: '10px',
                          fontFamily: 'var(--font-body)', fontSize: '8px', fontWeight: 700,
                          letterSpacing: '0.24em', textTransform: 'uppercase',
                          padding: '4px 9px', background: 'rgba(9,9,8,0.8)', color: 'var(--accent)',
                          opacity: 0, transition: 'opacity 300ms',
                        }}>
                          {project.cat}
                        </span>

                        {/* Arrow icon */}
                        <span style={{
                          position: 'absolute', bottom: '12px', right: '12px',
                          width: '28px', height: '28px',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          background: 'rgba(9,9,8,0.85)', color: 'var(--white)',
                          border: '1px solid var(--accent)', transition: 'all 250ms',
                        }}>
                          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 12L12 2M12 2H5M12 2V9"/></svg>
                        </span>

                        {/* Info overlay */}
                        <div className="tile-info" style={{ position: 'absolute', bottom: '12px', left: '12px', right: '48px', opacity: 0, transition: 'opacity 300ms' }}>
                          {project.title && (
                            <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(12px,1.25vw,16px)', textTransform: 'uppercase', color: 'var(--white)', margin: '0 0 2px', lineHeight: 1.1, letterSpacing: '0.01em' }}>{project.title}</p>
                          )}
                          {project.client && project.client !== 'Camera On Roll' && (
                            <p style={{ fontFamily: 'var(--font-body)', fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--white-70)', margin: 0 }}>{project.client}</p>
                          )}
                        </div>
                      </div>
                    </button>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {modal && (
          <ProjectModal project={modal} onClose={() => setModal(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
