'use client';
import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getEmbedUrl, type Project } from '@/lib/work-data';
import { ALL_V2_PROJECTS, V2_CATEGORIES } from '@/lib/work-v2-data';

const E = [0.22, 0.58, 0.32, 1] as const;

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
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(18px,2vw,26px)', textTransform: 'uppercase', color: 'var(--white)', margin: '0 0 2px', lineHeight: 1.05, letterSpacing: '0.01em' }}>{project.title}</h3>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--white-70)', margin: 0 }}>{project.client}</p>
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
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeCat, setActiveCat] = useState<string>('All');
  const listRef = useRef<HTMLDivElement>(null);

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

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <>
      <section
        onMouseMove={handleMouseMove}
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
            Case Studies
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
            {filtered.length} of {ALL_V2_PROJECTS.length} projects — select a project to view
          </motion.p>

          {/* Category filters */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: E }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '20px' }}
          >
            {['All', ...V2_CATEGORIES].map(cat => {
              const isActive = activeCat === cat;
              const count = cat === 'All' ? ALL_V2_PROJECTS.length : ALL_V2_PROJECTS.filter(p => p.cat === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCat(cat)}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '10px',
                    fontWeight: 600,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    padding: '6px 14px',
                    border: isActive ? '1px solid var(--accent)' : '1px solid var(--white-12)',
                    background: isActive ? 'rgba(232,23,106,0.08)' : 'transparent',
                    color: isActive ? 'var(--accent)' : 'var(--white-50)',
                    cursor: 'pointer',
                    transition: 'all 200ms ease',
                  }}
                  onMouseEnter={e => { if (!isActive) { e.currentTarget.style.borderColor = 'var(--white-30)'; e.currentTarget.style.color = 'var(--white-80)'; }}}
                  onMouseLeave={e => { if (!isActive) { e.currentTarget.style.borderColor = 'var(--white-12)'; e.currentTarget.style.color = 'var(--white-50)'; }}}
                >
                  {cat} <span style={{ opacity: 0.5, marginLeft: '4px' }}>{count}</span>
                </button>
              );
            })}
          </motion.div>
        </div>

        {/* Project list — Animal editorial style */}
        <div ref={listRef} style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', marginTop: 'clamp(24px,3vw,40px)' }}>
          <AnimatePresence mode="wait">
            {filtered.map((project, i) => {
            const isHovered = hoveredId === project.id;
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: E }}
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => setModal(project)}
                style={{
                  position: 'relative',
                  cursor: 'pointer',
                  borderBottom: '1px solid var(--white-08)',
                  padding: 'clamp(20px,2.5vw,32px) 0',
                  transition: 'background 300ms ease',
                  background: isHovered ? 'rgba(232,23,106,0.03)' : 'transparent',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
                  {/* Left: title */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h2
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(22px,3.2vw,42px)',
                        textTransform: 'uppercase',
                        color: isHovered ? 'var(--accent)' : 'var(--white)',
                        margin: 0,
                        lineHeight: 1.1,
                        letterSpacing: '0.01em',
                        transition: 'color 300ms ease',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {project.title}
                    </h2>
                  </div>

                  {/* Right: category + arrow */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexShrink: 0 }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '10px',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: 'var(--white-40)',
                        transition: 'color 300ms ease',
                      }}
                    >
                      {project.cat}
                    </span>
                    <motion.div
                      animate={{ x: isHovered ? 4 : 0, opacity: isHovered ? 1 : 0.4 }}
                      transition={{ duration: 0.25, ease: E }}
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: isHovered ? 'var(--accent)' : 'var(--white-40)' }}>
                        <path d="M2 12L12 2M12 2H5M12 2V9"/>
                      </svg>
                    </motion.div>
                  </div>
                </div>

                {/* Subtle index number */}
                <span
                  style={{
                    position: 'absolute',
                    left: '0',
                    top: '50%',
                    transform: 'translate(-100%, -50%) translateX(-16px)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '10px',
                    letterSpacing: '0.15em',
                    color: 'var(--white-20)',
                    display: 'none', // hidden on mobile, shown via CSS
                  }}
                  className="case-index"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
              </motion.div>
            );
          })}
          </AnimatePresence>
        </div>
      </section>

      {/* Floating hover thumbnail — follows cursor */}
      <AnimatePresence>
        {hoveredId !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.2, ease: E }}
            style={{
              position: 'fixed',
              left: Math.min(mousePos.x + 24, typeof window !== 'undefined' ? window.innerWidth - 320 : mousePos.x + 24),
              top: mousePos.y - 100,
              width: '280px',
              height: '180px',
              zIndex: 50,
              pointerEvents: 'none',
              borderRadius: '4px',
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(232,23,106,0.15)',
            }}
          >
            {(() => {
              const p = ALL_V2_PROJECTS.find(item => item.id === hoveredId);
              if (!p) return null;
              return (
                <img
                  src={p.poster}
                  alt={p.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal */}
      <AnimatePresence>
        {modal && (
          <ProjectModal project={modal} onClose={() => setModal(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
