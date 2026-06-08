'use client';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { Reveal } from '@/components/Reveal';
import { FEATURED_HOME as FEATURED_HOME_DATA, getEmbedUrl } from '@/lib/work-data';
import { WorkWithUs } from '@/components/WorkWithUs';
import { ServicesGrid } from '@/components/ServicesGrid';
import { ClientsMarquee } from '@/components/ClientsMarquee';
import { LazyVideo } from '@/components/LazyVideo';

const EASE = [0.76, 0, 0.24, 1] as const;
const POP_EASE = [0.34, 1.56, 0.64, 1] as const;
const SHOWREEL_URL = 'https://pub-4d3cad9469854486ab973729b0a3541b.r2.dev/videos/showreel-v2.mp4';

/**
 * YouTube thumbnail. `maxresdefault.jpg` is true 16:9 (1280×720) when available;
 * `hqdefault.jpg` is 4:3 (480×360) so it letterboxes inside 16:9 containers.
 * We prefer maxres and use `mqdefault.jpg` (always exists, 16:9) as a runtime fallback via onError.
 */
function ytThumb(id: string) {
  return `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;
}
function ytFallbackThumb(id: string) {
  return `https://i.ytimg.com/vi/${id}/mqdefault.jpg`;
}

/** Extract a YouTube video ID from any common URL shape. */
function ytId(link: string): string | null {
  const m = link.match(/(?:youtu\.be\/|v=|\/embed\/)([\w-]{6,})/);
  return m ? m[1] : null;
}
/** Extract an Instagram post / reel shortcode from a URL. */
function igShortcode(link: string): string | null {
  const m = link.match(/instagram\.com\/(?:p|reel|tv)\/([\w-]+)/);
  return m ? m[1] : null;
}
function isImageUrl(url: string): boolean {
  return /\.(jpe?g|png|webp|gif|bmp)(\?.*)?$/i.test(url);
}
/** Build an autoplay embed URL for a project link. */
function getEmbed(link: string, platform: 'youtube' | 'instagram' | 'r2'): string | null {
  if (platform === 'youtube') {
    const id = ytId(link);
    return id ? `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1` : null;
  }
  if (platform === 'instagram') {
    const sc = igShortcode(link);
    return sc ? `https://www.instagram.com/p/${sc}/embed/` : null;
  }
  return null;
}
/** Infer platform from URL. */
function inferPlatform(link: string): 'youtube' | 'instagram' | 'r2' {
  if (link.includes('r2.dev') || link.includes('r2.cloudflarestorage.com')) return 'r2';
  return link.includes('youtube.com') || link.includes('youtu.be') ? 'youtube' : 'instagram';
}

const R2_BASE = 'https://pub-4d3cad9469854486ab973729b0a3541b.r2.dev/work';
const r2v = (folder: 'horizontal'|'vertical', name: string) => `${R2_BASE}/${folder}/${name}`;

// 12 items with explicit col/row spans → packs into a 6-col bento "maze".
// Verticals (v) get tall portrait spans; horizontals (h) get wide landscape spans.
// One vertical & one horizontal "hero" tile lead each pair for visual rhythm.
type FeaturedProject = {
  cat: string;
  client: string;
  title: string;
  link: string;
  img: string;
  orientation: 'v' | 'h';
  c: number;
  r: number;
};

// Featured 8 projects — sourced from the central catalog in lib/work-data.ts.
// Layout spans adapt dynamically to each video's orientation for proper aspect ratios.
// 4-column grid gives cleaner proportions:
// Vertical (9:16) → 1 col × 3 rows  (portrait ~1:1.7, close to 9:16)
// Horizontal (16:9) → 2 cols × 2 rows (landscape ~2:1, close to 16:9)
function getHomeLayout(orientation: 'v' | 'h', index: number): { c: number; r: number } {
  if (orientation === 'v') {
    return { c: 1, r: 3 };
  }
  return { c: 2, r: 2 };
}
const FEATURED: FeaturedProject[] = FEATURED_HOME_DATA.map((proj, i) => ({
  cat: proj.cat,
  client: proj.client,
  title: proj.title,
  link: proj.link,
  img: proj.poster,
  orientation: proj.orientation,
  ...getHomeLayout(proj.orientation, i),
}));

const FEATURED_HOME = FEATURED.slice(0, 8);

// AI Video Slideshow — brand edits + AI-generated videos from R2
const AI_VIDEOS = [
  {
    src: 'https://pub-4d3cad9469854486ab973729b0a3541b.r2.dev/videos/cadbury-dairymilk.mp4',
    poster: 'https://pub-4d3cad9469854486ab973729b0a3541b.r2.dev/videos/cadbury-dairymilk.mp4.jpg',
    title: 'Cadbury Dairy Milk',
  },
  {
    src: 'https://pub-4d3cad9469854486ab973729b0a3541b.r2.dev/videos/ysl.mp4',
    poster: 'https://pub-4d3cad9469854486ab973729b0a3541b.r2.dev/videos/ysl.mp4.jpg',
    title: 'YSL',
  },
  {
    src: 'https://pub-4d3cad9469854486ab973729b0a3541b.r2.dev/videos/simple.mp4',
    poster: 'https://pub-4d3cad9469854486ab973729b0a3541b.r2.dev/videos/simple.mp4.jpg',
    title: 'Simple',
  },
  {
    src: 'https://pub-4d3cad9469854486ab973729b0a3541b.r2.dev/akshat/vertical/default__13__1.mp4',
    poster: 'https://pub-4d3cad9469854486ab973729b0a3541b.r2.dev/akshat/vertical/default__13__1.mp4.jpg',
    title: 'AI Film',
  },
  {
    src: 'https://pub-4d3cad9469854486ab973729b0a3541b.r2.dev/akshat/vertical/default__133134253456_.mp4',
    poster: 'https://pub-4d3cad9469854486ab973729b0a3541b.r2.dev/akshat/vertical/default__133134253456_.mp4.jpg',
    title: 'AI Visual',
  },
  {
    src: 'https://pub-4d3cad9469854486ab973729b0a3541b.r2.dev/akshat/vertical/default__136_.mp4',
    poster: 'https://pub-4d3cad9469854486ab973729b0a3541b.r2.dev/akshat/vertical/default__136_.mp4.jpg',
    title: 'AI Motion',
  },
  {
    src: 'https://pub-4d3cad9469854486ab973729b0a3541b.r2.dev/akshat/vertical/default__1433_.mp4',
    poster: 'https://pub-4d3cad9469854486ab973729b0a3541b.r2.dev/akshat/vertical/default__1433_.mp4.jpg',
    title: 'AI Campaign',
  },
  {
    src: 'https://pub-4d3cad9469854486ab973729b0a3541b.r2.dev/akshat/vertical/default__1gsdfh_fdggh_hg3_.mp4',
    poster: 'https://pub-4d3cad9469854486ab973729b0a3541b.r2.dev/akshat/vertical/default__1gsdfh_fdggh_hg3_.mp4.jpg',
    title: 'AI Generated',
  },
  {
    src: 'https://pub-4d3cad9469854486ab973729b0a3541b.r2.dev/akshat/vertical/default__1qerqer3_.mp4',
    poster: 'https://pub-4d3cad9469854486ab973729b0a3541b.r2.dev/akshat/vertical/default__1qerqer3_.mp4.jpg',
    title: 'AI Production',
  },
];

function VideoSlide({ video, isActive, play, load }: { video: typeof AI_VIDEOS[0]; isActive: boolean; play: boolean; load: boolean }) {
  const vidRef = useRef<HTMLVideoElement>(null);
  const playPromise = useRef<Promise<void> | null>(null);

  // Restart from the top whenever this slide becomes the active one.
  useEffect(() => {
    const v = vidRef.current;
    if (v && isActive && load) v.currentTime = 0;
  }, [isActive, load]);

  // Only decode/play the active slide while the section is on-screen.
  useEffect(() => {
    const v = vidRef.current;
    if (!v || !load) return;
    if (isActive && play) {
      playPromise.current = v.play().catch(() => {});
    } else if (playPromise.current) {
      playPromise.current.then(() => v.pause()).catch(() => v.pause());
      playPromise.current = null;
    } else {
      v.pause();
    }
  }, [isActive, play, load]);

  return (
    <motion.video
      ref={vidRef}
      key={video.src}
      src={load ? video.src : undefined}
      poster={video.poster}
      muted
      playsInline
      loop
      preload="none"
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 1 : 0 }}
      transition={{ duration: 0.8, ease: EASE }}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
      }}
    />
  );
}

function AISection() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [openCap, setOpenCap] = useState<number | null>(0);

  // Gate the slideshow on viewport visibility — no decoding when off-screen.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting) setLoaded(true);
      },
      { rootMargin: '200px', threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (paused || !inView) return;
    const t = setInterval(() => setIdx(i => (i + 1) % AI_VIDEOS.length), 6000);
    return () => clearInterval(t);
  }, [paused, inView]);

  const next = () => setIdx(i => (i + 1) % AI_VIDEOS.length);
  const prev = () => setIdx(i => (i - 1 + AI_VIDEOS.length) % AI_VIDEOS.length);

  return (
    <section
      ref={sectionRef}
      className="ai-split cv-section"
      style={{
        position: 'relative',
        minHeight: '60vh',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        borderTop: '1px solid var(--white-08)',
        overflow: 'hidden',
      }}
    >
      <style>{`
        @media (max-width: 768px) {
          .ai-split { grid-template-columns: 1fr !important; min-height: auto !important; }
          .ai-split > div:first-child { height: 42vh; }
        }
        .ai-cap {
          position:relative; overflow:hidden; cursor:pointer; width:100%; text-align:left;
          border-radius:16px; border:1px solid rgba(242,235,224,0.07);
          background:rgba(255,255,255,0.02); padding:16px 18px;
          transition: background 300ms, box-shadow 400ms, border-color 300ms;
        }
        .ai-cap:hover { border-color: rgba(232,23,106,0.3); }
        .ai-cap[data-open="true"] {
          background: rgba(232,23,106,0.06);
          border-color: rgba(232,23,106,0.35);
          box-shadow: 0 0 0 1px rgba(255,0,102,0.15), 0 12px 50px rgba(255,0,102,0.15);
        }
        .ai-cap .cap-d { max-height:0; opacity:0; overflow:hidden; transition: max-height 500ms ease, opacity 400ms ease, margin 400ms ease; }
        .ai-cap[data-open="true"] .cap-d { max-height:80px; opacity:1; margin-top:8px; }
        .ai-cap .cap-arrow { transition: transform 350ms cubic-bezier(0.76,0,0.24,1); }
        .ai-cap[data-open="true"] .cap-arrow { transform: rotate(90deg); }
      `}</style>

      {/* LEFT — Video Slideshow */}
      <div
        style={{ position: 'relative', overflow: 'hidden', background: 'var(--black)' }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {AI_VIDEOS.map((v, i) => (
          // Only fetch/decode the active slide (poster shows for the rest).
          // Loading all 9 at once caused a heavy network+decode spike — and
          // stutter — the moment this section scrolled into view.
          <VideoSlide key={v.src} video={v} isActive={i === idx} play={inView} load={loaded && i === idx} />
        ))}

        {/* Vignette edges */}
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 90% 80% at 50% 50%, transparent 40%, rgba(9,9,8,0.5))', pointerEvents:'none', zIndex:1 }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right, rgba(9,9,8,0.3) 0%, transparent 30%, transparent 70%, rgba(9,9,8,0.5) 100%)', pointerEvents:'none' }} />

        {/* Minimal arrows */}
        {[
          { side:'left', on:prev },
          { side:'right', on:next },
        ].map(a => (
          <motion.button
            key={a.side}
            onClick={a.on}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            style={{
              position: 'absolute',
              [a.side]: '20px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 3,
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              border: '1px solid rgba(255,255,255,0.15)',
              background: 'rgba(0,0,0,0.25)',
              color: 'rgba(255,255,255,0.7)',
              fontSize: '16px',
              fontFamily: 'var(--font-display)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(6px)',
              transition: 'all 300ms',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(232,23,106,0.5)'; e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.25)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; }}
            aria-label={a.side === 'left' ? 'Previous' : 'Next'}
          >{a.side === 'left' ? '‹' : '›'}</motion.button>
        ))}

        {/* Dots */}
        <div style={{ position:'absolute', bottom:'22px', left:'50%', transform:'translateX(-50%)', display:'flex', gap:'5px', zIndex:2 }}>
          {AI_VIDEOS.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              style={{
                width: i === idx ? '24px' : '5px',
                height: '3px',
                borderRadius: '2px',
                border: 'none',
                background: i === idx ? 'var(--accent)' : 'rgba(255,255,255,0.25)',
                transition: 'all 500ms cubic-bezier(0.76,0,0.24,1)',
                cursor: 'pointer',
              }}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Slide counter */}
        <div style={{
          position:'absolute', bottom:'22px', right:'22px', zIndex:2,
          fontFamily:'var(--font-body)', fontSize:'10px', fontWeight:500,
          letterSpacing:'0.12em', color:'rgba(255,255,255,0.4)',
        }}>
          <span style={{ color:'var(--accent)', fontWeight:700 }}>{String(idx + 1).padStart(2,'0')}</span>
          <span style={{ margin:'0 3px' }}>/</span>
          {String(AI_VIDEOS.length).padStart(2,'0')}
        </div>
      </div>

      {/* RIGHT — Content */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 'clamp(32px, 4vw, 64px) clamp(28px, 3.5vw, 52px)',
          background: 'var(--black)',
          position: 'relative',
        }}
      >
        {/* Soft glow */}
        <div style={{
          position:'absolute', top:'-30%', right:'-20%', width:'55vw', height:'55vw',
          borderRadius:'50%', background:'radial-gradient(circle, rgba(232,23,106,0.06) 0%, transparent 60%)',
          pointerEvents:'none',
        }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth:'460px' }}>
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'18px' }}
          >
            <span style={{ width:'20px', height:'1px', background:'var(--accent)' }} />
            <span style={{
              fontFamily:'var(--font-body)', fontSize:'9px', fontWeight:600,
              letterSpacing:'0.35em', textTransform:'uppercase', color:'var(--accent)',
            }}>AI Cinema Engine</span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.04, ease: EASE }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px, 3.8vw, 52px)',
              textTransform: 'uppercase',
              lineHeight: 0.94,
              letterSpacing: '-0.025em',
              color: 'var(--white)',
              margin: '0 0 16px',
            }}
          >
            Our <span style={{ color: 'var(--accent)' }}>AI</span> Engine<br />
            Meets Cinema
          </motion.h2>

          {/* Short description */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              fontWeight: 400,
              lineHeight: 1.7,
              color: 'var(--white-50)',
              marginBottom: '28px',
            }}
          >
            An In-house built AI workflow pipeline that curates unmatched output quality to help brands with AI Films, Music videos and more at scale.
          </motion.p>

          {/* Capability cards with hover reveal */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.16, ease: EASE }}
            style={{ display:'flex', flexDirection:'column', gap:'10px', marginBottom:'28px' }}
          >
            {[
              { n:'Character Consistency',   d:'Lock identity across every frame, scene and shot' },
              { n:'Visual Style Control',    d:'Direct the look, mood and grade end-to-end' },
              { n:'4K Output at 50fps',      d:'Crisp, high-frame-rate delivery ready for broadcast' },
              { n:'Agentic GenAI Workflows', d:'Autonomous pipelines orchestrating generation at scale' },
            ].map((c, i) => {
              const isOpen = openCap === i;
              return (
              <button key={i} type="button" className="ai-cap" data-open={isOpen}
                aria-expanded={isOpen}
                onClick={() => setOpenCap(isOpen ? null : i)}
              >
                <div style={{
                  display:'flex', alignItems:'center', justifyContent:'space-between',
                  fontFamily:'var(--font-body)', fontSize:'12px', fontWeight:600,
                  letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--white-80)',
                }}>
                  <span>{c.n}</span>
                  <span style={{ color:'var(--accent)', fontSize:'12px' }} className="cap-arrow">→</span>
                </div>
                <div className="cap-d" style={{
                  fontFamily:'var(--font-body)', fontSize:'12px', lineHeight:1.6,
                  color:'var(--white-60)',
                }}>
                  {c.d}
                </div>
              </button>
            )})}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.22, ease: EASE }}
            style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}
          >
            <Link href="/contact"
              style={{
                fontFamily:'var(--font-body)', fontSize:'10px', fontWeight:700,
                letterSpacing:'0.22em', textTransform:'uppercase',
                padding:'12px 28px', background:'var(--accent)', color:'#fff',
                display:'inline-flex', alignItems:'center', gap:'8px',
                transition:'all 350ms',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.boxShadow='0 0 40px rgba(232,23,106,0.3)';
                (e.currentTarget as HTMLElement).style.transform='translateY(-1px)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.boxShadow='none';
                (e.currentTarget as HTMLElement).style.transform='translateY(0)';
              }}
            >
              Get in Touch →
            </Link>
            <Link href="/atom"
              style={{
                fontFamily:'var(--font-body)', fontSize:'10px', fontWeight:700,
                letterSpacing:'0.18em', textTransform:'uppercase',
                padding:'12px 28px', border:'1px solid rgba(242,235,224,0.15)', color:'rgba(242,235,224,0.55)',
                display:'inline-flex', alignItems:'center', gap:'6px',
                transition:'all 350ms',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor='var(--accent)';
                e.currentTarget.style.color='var(--white)';
                e.currentTarget.style.transform='translateY(-1px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor='rgba(242,235,224,0.15)';
                e.currentTarget.style.color='rgba(242,235,224,0.55)';
                e.currentTarget.style.transform='translateY(0)';
              }}
            >
              Explore AI →
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Showreel — ONLY our own work (pulled from FEATURED above so it's a single source of truth)
const SHOWREEL = FEATURED.map(f => ({ img: f.img, client: f.client, cat: f.cat, title: f.title }));

const BTN_BASE: React.CSSProperties = {
  fontFamily:'var(--font-body)', fontSize:'10px', fontWeight:600,
  letterSpacing:'0.28em', textTransform:'uppercase',
  padding:'15px 36px', display:'inline-flex', alignItems:'center', gap:'8px',
  transition:'all 350ms',
};

export default function Home() {
  const [videoOpen, setVideoOpen] = useState(false);
  const [workLayout, setWorkLayout] = useState<'grid'|'list'>('grid');
  const [modal, setModal] = useState<FeaturedProject | null>(null);

  // Modal: ESC key + body scroll lock
  useEffect(() => {
    if (!modal) {
      document.body.style.overflow = '';
      return;
    }
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setModal(null);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onEsc);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onEsc);
    };
  }, [modal]);

  return (
    <>

      {/* ══ FULLSCREEN VIDEO OVERLAY ═══════════════════ */}
      <AnimatePresence>
        {videoOpen && (
          <motion.div
            initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            transition={{ duration:0.35, ease:EASE }}
            style={{ position:'fixed', inset:0, zIndex:9999, background:'#000', display:'flex', alignItems:'center', justifyContent:'center' }}
          >
            <motion.video
              initial={{ scale:0.92 }} animate={{ scale:1 }} exit={{ scale:0.96 }}
              transition={{ duration:0.45, ease:EASE }}
              autoPlay loop playsInline controls
              style={{ width:'100%', height:'100%', objectFit:'contain' }}
            >
              <source src={SHOWREEL_URL} type="video/mp4" />
            </motion.video>
            <button onClick={() => setVideoOpen(false)} style={{
              position:'absolute', top:'28px', right:'28px', zIndex:10000,
              fontFamily:'var(--font-body)', fontSize:'9px', fontWeight:600,
              letterSpacing:'0.28em', textTransform:'uppercase',
              padding:'10px 22px', border:'1px solid rgba(255,255,255,0.25)',
              color:'rgba(255,255,255,0.7)', background:'rgba(0,0,0,0.5)',
              cursor:'pointer', backdropFilter:'blur(12px)',
              transition:'border-color 300ms, color 300ms',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor='var(--accent)'; e.currentTarget.style.color='#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(255,255,255,0.25)'; e.currentTarget.style.color='rgba(255,255,255,0.7)'; }}
            >✕ Close</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══ HERO ═══════════════════════════════════════ */}
      <section className="hero" style={{ position:'relative', minHeight:'100svh', overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center' }}>
        {/* Full-bleed showreel video — buffers eagerly, pauses when scrolled past */}
        <div style={{ position:'absolute', inset:0, zIndex:0 }}>
          <LazyVideo src={SHOWREEL_URL} eager style={{ position:'absolute', inset:0, width:'100%', height:'100%' }} />
          {/* 40% dark overlay for legibility */}
          <div style={{ position:'absolute', inset:0, background:'rgba(9,9,8,0.45)' }} />
          <div style={{ position:'absolute', top:0, left:0, right:0, height:'25%', background:'linear-gradient(to bottom, var(--black), transparent)' }} />
          <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'55%', background:'linear-gradient(to top, var(--black), transparent)' }} />
          <div style={{ position:'absolute', top:'20%', right:'-10%', width:'40vw', height:'40vw', borderRadius:'50%', background:'radial-gradient(circle, rgba(232,23,106,0.10) 0%, transparent 72%)' }} />
        </div>

        <div className="hero-copy" style={{ position:'relative', zIndex:1, textAlign:'center', padding:'0 var(--pad-x)', width:'100%', maxWidth:'min(90%, 900px)', margin:'0 auto' }}>
          <motion.h1 initial={{ opacity:0, y:40 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:1.2, delay:0.4, ease:EASE }}
            style={{ fontFamily:'var(--font-display)', fontSize:'var(--fs-hero)', textTransform:'uppercase', lineHeight:0.92, letterSpacing:'-0.02em', color:'var(--white)', marginBottom:'clamp(16px,1.8vw,22px)' }}>
            Camera On Roll Production
          </motion.h1>

          <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }}
            transition={{ duration:1, delay:0.7, ease:EASE }}
            style={{ fontFamily:'var(--font-body)', fontSize:'var(--fs-body)', fontWeight:400, lineHeight:1.6, color:'var(--white-70)', margin:'0 auto clamp(28px,3vw,44px)', whiteSpace:'nowrap' }}>
            An AI powered creative production studio built for modern brands
          </motion.p>

          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:0.8, delay:1, ease:EASE }}
            className="cta-group hero-cta">

            <Link href="/contact" className="btn btn-primary">
              Start a Project
            </Link>

            {/* Watch Showreel — opens fullscreen overlay */}
            <button onClick={() => setVideoOpen(true)} className="btn btn-ghost">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
              Watch Showreel
            </button>
          </motion.div>
        </div>

        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:2, duration:1 }}
          className="hero-scroll"
          style={{ position:'absolute', bottom:'32px', left:'50%', transform:'translateX(-50%)', display:'flex', flexDirection:'column', alignItems:'center', gap:'12px' }}>
          <span style={{ fontFamily:'var(--font-body)', fontSize:'8px', fontWeight:500, letterSpacing:'0.44em', textTransform:'uppercase', color:'var(--white-40)' }}>Scroll</span>
          <div style={{ width:'1px', height:'40px', background:'linear-gradient(to bottom, var(--white-20), transparent)', position:'relative' }}>
            <motion.div animate={{ y:[0,40,0] }} transition={{ duration:2, repeat:Infinity, ease:'easeInOut' }}
              style={{ position:'absolute', top:0, left:'-2px', width:'5px', height:'5px', borderRadius:'50%', background:'var(--accent)', boxShadow:'0 0 8px var(--accent)' }} />
          </div>
        </motion.div>
      </section>

      {/* ══ WORK PREVIEW ═══════════════════════════════ */}
      <section className="cv-section" style={{ borderTop:'1px solid var(--white-08)', paddingTop:'var(--section-gap)' }}>
        {/* Header */}
        <div className="cx sec-head">
          <Reveal>
            <h2 className="h-section">Our Work</h2>
          </Reveal>
          <div className="only-desktop" style={{ display:'flex', alignItems:'center', gap:'8px' }}>
            {/* Layout toggle (desktop only) */}
            <div style={{ display:'flex', border:'1px solid var(--accent)', overflow:'hidden' }}>
              {(['grid','list'] as const).map(l => (
                <button key={l} onClick={() => setWorkLayout(l)} style={{
                  padding:'8px 14px', background: 'transparent',
                  color: workLayout===l ? 'var(--accent)' : 'var(--white-30)', border:'none', cursor:'pointer',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  transition:'color 200ms',
                }}>
                  {l==='grid'
                    ? <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><rect x="0" y="0" width="6" height="6" rx="1"/><rect x="10" y="0" width="6" height="6" rx="1"/><rect x="0" y="10" width="6" height="6" rx="1"/><rect x="10" y="10" width="6" height="6" rx="1"/></svg>
                    : <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><rect x="0" y="1" width="16" height="2" rx="1"/><rect x="0" y="7" width="16" height="2" rx="1"/><rect x="0" y="13" width="16" height="2" rx="1"/></svg>
                  }
                </button>
              ))}
            </div>
            <Link href="/work" className="btn btn-ghost">View All Work →</Link>
          </div>
        </div>

        {/* Grid layout — immersive single column on mobile, masonry on desktop */}
        <AnimatePresence mode="wait">
          {workLayout === 'grid' ? (
            <motion.div key="grid" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.25 }}
              className="work-grid"
            >
              {FEATURED_HOME.map((p, i) => {
                const ytId_ = ytId(p.link);
                const isV = p.orientation === 'v';
                const isH = p.orientation === 'h';
                const tileClass = isV ? 'tile-v' : (isH ? 'tile-h' : 'tile-s');
                return (
                <motion.div key={i}
                  className={`work-tile ${tileClass}`}
                  initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, margin:'-40px' }}
                  transition={{ duration:0.5, delay:(i%3)*0.08, ease:EASE }}
                  whileHover={{ y:-6, zIndex:5, boxShadow:'0 30px 100px rgba(232,23,106,0.55), 0 0 80px rgba(232,23,106,0.25), 0 0 0 1.5px rgba(232,23,106,0.6)', transition:{ duration:0.3, ease:POP_EASE } }}>
                  <button onClick={() => setModal(p)} style={{ display:'block', width:'100%', height:'100%', textDecoration:'none', background:'#111', position:'relative', border:'none', padding:0, cursor:'pointer', overflow:'hidden' }}>
                    <div style={{ position:'relative', width:'100%', height:'100%', overflow:'hidden', background:'linear-gradient(135deg, #1a0a10 0%, #0d0d0c 50%, #1a0a10 100%)' }}>
                      <img src={p.img} alt={p.title} loading="lazy"
                          onError={(e) => {
                            if (ytId_ && !e.currentTarget.dataset.fallback) {
                              e.currentTarget.dataset.fallback = '1';
                              e.currentTarget.src = ytFallbackThumb(ytId_);
                            }
                          }}
                          style={{ width:'100%', height:'100%', objectFit:'cover', display:'block', transition:'transform 600ms, filter 400ms', filter:'brightness(0.9)' }}
                        />
                      <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(9,9,8,0.9) 0%, rgba(9,9,8,0.2) 55%, transparent 100%)' }} />
                      <span className="tile-cat" style={{ position:'absolute', top:'14px', left:'14px', fontFamily:'var(--font-body)', fontSize:'9px', fontWeight:700, letterSpacing:'0.24em', textTransform:'uppercase', padding:'5px 12px', background:'rgba(9,9,8,0.85)', color:'var(--accent)', borderRadius:'2px', border:'1px solid rgba(232,23,106,0.3)' }}>{p.cat}</span>
                      <div className="tile-info" style={{ position:'absolute', bottom:'18px', left:'18px', right:'18px', textAlign:'left' }}>
                        <p style={{ fontFamily:'var(--font-display)', fontSize:'clamp(18px,1.4vw,22px)', textTransform:'uppercase', color:'var(--white)', margin:'0 0 4px', lineHeight:1.05, letterSpacing:'0.01em', textShadow:'0 2px 8px rgba(0,0,0,0.6)' }}>{p.title}</p>
                        {p.client && p.client !== 'Camera On Roll' && (
                          <p style={{ fontFamily:'var(--font-body)', fontSize:'11px', letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--white-70)', margin:0 }}>{p.client}</p>
                        )}
                        <span className="tile-view">View Project →</span>
                      </div>
                    </div>
                  </button>
                </motion.div>
              )})}
            </motion.div>
          ) : (
            <motion.div key="list" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.25 }}
              style={{ padding:'0 var(--pad-x)', display:'flex', flexDirection:'column', gap:'1px', background:'var(--white-08)' }}>
              {FEATURED_HOME.map((p, i) => {
                const ytId_ = ytId(p.link);
                return (
                <motion.div key={i} initial={{ opacity:0, x:-10 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.35, delay:i*0.04, ease:EASE }}>
                  <button onClick={() => setModal(p)}
                    style={{ display:'grid', gridTemplateColumns:'220px 1fr auto', alignItems:'center', gap:'0', background:'var(--black)', textDecoration:'none', transition:'background 250ms', border:'none', padding:0, cursor:'pointer', width:'100%', textAlign:'left' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background='#111'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background='var(--black)'; }}>
                    <div style={{ aspectRatio:'16/9', overflow:'hidden' }}>
                      <img src={p.img} alt={p.title} loading="lazy"
                          onError={(e) => {
                            if (ytId_ && !e.currentTarget.dataset.fallback) {
                              e.currentTarget.dataset.fallback = '1';
                              e.currentTarget.src = ytFallbackThumb(ytId_);
                            }
                          }}
                          style={{ width:'100%', height:'100%', objectFit:'cover', display:'block', transition:'transform 600ms, filter 400ms', filter:'brightness(0.85)' }}
                        />
                    </div>
                    <div style={{ padding:'0 28px' }}>
                      <span style={{ fontFamily:'var(--font-body)', fontSize:'8px', fontWeight:700, letterSpacing:'0.28em', textTransform:'uppercase', color:'var(--accent)', display:'block', marginBottom:'6px' }}>{p.cat}</span>
                      <p style={{ fontFamily:'var(--font-display)', fontSize:'clamp(14px,1.6vw,20px)', textTransform:'uppercase', color:'var(--white)', margin:'0 0 4px' }}>{p.title}</p>
                      {p.client && p.client !== 'Camera On Roll' && (
                      <p style={{ fontFamily:'var(--font-body)', fontSize:'9px', letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--white-40)', margin:0 }}>{p.client}</p>
                    )}
                    </div>
                    <div style={{ padding:'0 24px', color:'var(--white-30)' }}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 12L12 2M12 2H5M12 2V9"/></svg>
                    </div>
                  </button>
                </motion.div>
              );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile: full-width view-all CTA */}
        <div className="cx only-mobile" style={{ marginTop: '24px' }}>
          <Link href="/work" className="btn btn-ghost btn-block">View All Work →</Link>
        </div>
      </section>

      {/* ══ SERVICES PREVIEW ═══════════════════════════ */}
      <section style={{ paddingTop:'var(--section-gap)', borderTop:'1px solid var(--white-08)', background:'var(--black)' }}>
        <div className="cx sec-head">
          <Reveal>
            <h2 className="h-section">Our Services</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <span className="only-desktop">
              <Link href="/services" className="btn btn-ghost">Explore Services →</Link>
            </span>
          </Reveal>
        </div>

        <ServicesGrid />

        {/* Mobile: full-width explore CTA */}
        <div className="cx only-mobile" style={{ marginTop: '24px' }}>
          <Link href="/services" className="btn btn-ghost btn-block">Explore Services →</Link>
        </div>
      </section>

      {/* ══ AI × CINEMA — split screen: video slideshow left, content right ══ */}
      <AISection />

      {/* ══ CLIENTS — single sliding marquee with real logos ═══ */}
      <section style={{ padding:'clamp(24px,2.5vw,36px) 0', borderTop:'1px solid var(--white-08)' }}>
        <div className="cx" style={{ marginBottom:'clamp(12px,1.2vw,18px)' }}>
          <Reveal>
            <p style={{ fontFamily:'var(--font-body)', fontSize:'8px', fontWeight:600, letterSpacing:'0.3em', textTransform:'uppercase', color:'var(--accent)', marginBottom:'6px' }}>Trusted By</p>
            <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(18px,2.2vw,28px)', textTransform:'uppercase', lineHeight:0.9, letterSpacing:'-0.01em', color:'var(--white)', margin:0 }}>Clients</h2>
          </Reveal>
        </div>

        {/* Edge-to-edge marquee — one continuous sliding row */}
        <ClientsMarquee />
      </section>

      {/* ══ WORK WITH US ════════════════ */}
      <section style={{ borderTop:'1px solid var(--white-08)', background:'var(--black)' }}>
        <WorkWithUs />
      </section>

      {/* ── VIDEO MODAL ───────────────────────────── */}
      <AnimatePresence>
        {modal && (
          <ProjectModal project={modal} onClose={() => setModal(null)} />
        )}
      </AnimatePresence>

    </>
  );
}

/** Fullscreen-capable inline player modal for YouTube + Instagram + Photo links. */
function ProjectModal({ project, onClose }: { project: FeaturedProject; onClose: () => void }) {
  const platform = inferPlatform(project.link);
  const embed = getEmbedUrl({ ...project, platform, owner: 'akshat', id: '_', poster: project.img } as any);
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
      initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
      transition={{ duration:0.3 }}
      onClick={onClose}
      style={{
        position:'fixed', inset:0, zIndex:100,
        background:'rgba(9,9,8,0.94)', backdropFilter:'blur(16px)',
        display:'flex', alignItems:'center', justifyContent:'center',
        padding:'clamp(16px, 4vw, 64px)',
      }}
    >
      <motion.div
        initial={{ scale:0.92, y:24, opacity:0 }}
        animate={{ scale:1, y:0, opacity:1 }}
        exit={{ scale:0.95, y:12, opacity:0 }}
        transition={{ duration:0.4, ease:EASE }}
        onClick={e => e.stopPropagation()}
        style={{
          position:'relative',
          width: isImage ? 'min(1000px, 92vw)' : (isV ? 'min(420px, 100%)' : 'min(1100px, 100%)'),
          maxHeight: '90vh',
          display:'flex', flexDirection:'column', gap:'12px',
        }}
      >
        {/* Top bar: title + actions */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:'12px', flexWrap:'wrap' }}>
          <div>
            <p style={{ fontFamily:'var(--font-body)', fontSize:'9px', fontWeight:700, letterSpacing:'0.3em', textTransform:'uppercase', color:'var(--accent)', margin:'0 0 4px' }}>
              {project.cat}{isImage ? ' · Photo' : platform === 'youtube' ? ' · YouTube' : platform === 'instagram' ? ' · Instagram' : ''}
            </p>
            <h3 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(18px,2vw,26px)', textTransform:'uppercase', color:'var(--white)', margin:'0 0 2px', lineHeight:1.05, letterSpacing:'0.01em' }}>{project.title}</h3>
            {project.client && project.client !== 'Camera On Roll' && (
              <p style={{ fontFamily:'var(--font-body)', fontSize:'10px', letterSpacing:'0.22em', textTransform:'uppercase', color:'var(--white-70)', margin:0 }}>{project.client}</p>
            )}
          </div>
          <div style={{ display:'flex', gap:'8px' }}>
            {!isImage && (
            <button onClick={goFullscreen} aria-label="Fullscreen"
              style={{ width:'40px', height:'40px', display:'inline-flex', alignItems:'center', justifyContent:'center', background:'transparent', border:'1px solid var(--white-20)', color:'var(--white-70)', cursor:'pointer', transition:'all 200ms' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor='var(--accent)'; e.currentTarget.style.color='var(--accent)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor='var(--white-20)'; e.currentTarget.style.color='var(--white-70)'; }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9V5a2 2 0 0 1 2-2h4M21 9V5a2 2 0 0 0-2-2h-4M3 15v4a2 2 0 0 0 2 2h4M21 15v4a2 2 0 0 1-2 2h-4"/>
              </svg>
            </button>
            )}
            <a href={project.link} target="_blank" rel="noopener noreferrer" aria-label="Open original"
              style={{ display:'inline-flex', alignItems:'center', gap:'8px', padding:'0 16px', height:'40px', background:'transparent', border:'1px solid var(--white-20)', color:'var(--white-70)', fontFamily:'var(--font-body)', fontSize:'10px', fontWeight:700, letterSpacing:'0.22em', textTransform:'uppercase', textDecoration:'none', cursor:'pointer', transition:'all 200ms' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor='var(--accent)'; e.currentTarget.style.color='var(--accent)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor='var(--white-20)'; e.currentTarget.style.color='var(--white-70)'; }}
            >
              {isImage ? 'View Full Size' : 'Open Original'}
              <svg width="10" height="10" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 12L12 2M12 2H5M12 2V9"/></svg>
            </a>
            <button onClick={onClose} aria-label="Close"
              style={{ width:'40px', height:'40px', display:'inline-flex', alignItems:'center', justifyContent:'center', background:'var(--accent)', border:'none', color:'#fff', cursor:'pointer', transition:'box-shadow 200ms' }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow='0 0 30px rgba(232,23,106,0.4)'; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow='none'; }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M18 6L6 18"/></svg>
            </button>
          </div>
        </div>

        {/* Media display — video, embed, or photo */}
        {isImage ? (
          <motion.div
            initial={{ opacity:0, scale:0.96 }}
            animate={{ opacity:1, scale:1 }}
            transition={{ duration:0.5, delay:0.1, ease:EASE }}
            ref={playerRef}
            style={{
              position:'relative',
              width:'100%',
              maxHeight:'78vh',
              background:'linear-gradient(135deg, #111 0%, #0a0a0a 100%)',
              border:'1px solid var(--white-08)',
              boxShadow:'0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(232,23,106,0.18)',
              overflow:'hidden',
              borderRadius:'2px',
              display:'flex',
              alignItems:'center',
              justifyContent:'center',
            }}
          >
            <img
              src={project.link}
              alt={project.title}
              loading="eager"
              style={{
                maxWidth:'100%',
                maxHeight:'78vh',
                objectFit:'contain',
                display:'block',
                transition:'transform 0.6s cubic-bezier(0.22, 0.58, 0.32, 1)',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform='scale(1.02)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform='scale(1)'; }}
            />
            {/* Subtle vignette overlay */}
            <div style={{ position:'absolute', inset:0, pointerEvents:'none', boxShadow:'inset 0 0 80px rgba(0,0,0,0.3)' }} />
          </motion.div>
        ) : (
        <div ref={playerRef} style={{
          position:'relative',
          width:'100%',
          aspectRatio: isV ? '9 / 16' : '16 / 9',
          maxHeight: isV ? 'min(80vh, 720px)' : 'min(72vh, 620px)',
          background:'#000',
          border:'1px solid var(--white-08)',
          boxShadow:'0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(232,23,106,0.18)',
          overflow:'hidden',
        }}>
          {platform === 'r2' ? (
            <video src={project.link} controls autoPlay playsInline
              style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'contain', background:'#000' }}
            />
          ) : embed ? (
            <iframe
              src={embed}
              title={project.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{ position:'absolute', inset:0, width:'100%', height:'100%', border:'none' }}
            />
          ) : (
            <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', color:'var(--white-70)', fontFamily:'var(--font-body)', fontSize:'12px', letterSpacing:'0.18em', textTransform:'uppercase', textAlign:'center', padding:'24px' }}>
              Preview unavailable.<br/>Use &ldquo;Open Original&rdquo; to watch.
            </div>
          )}
        </div>
        )}
      </motion.div>
    </motion.div>
  );
}
