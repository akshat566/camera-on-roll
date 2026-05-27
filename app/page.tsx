'use client';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { Reveal } from '@/components/Reveal';
import { FEATURED_HOME as FEATURED_HOME_DATA, getEmbedUrl } from '@/lib/work-data';
import { WorkWithUs } from '@/components/WorkWithUs';

const EASE = [0.76, 0, 0.24, 1] as const;
const POP_EASE = [0.34, 1.56, 0.64, 1] as const;

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

function Tilt({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 16;
    const y = ((e.clientY - r.top) / r.height - 0.5) * 16;
    el.style.transform = `perspective(900px) rotateY(${x}deg) rotateX(${-y}deg) scale3d(1.02,1.02,1.02)`;
    el.style.zIndex = '2';
  };
  const onLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)';
    ref.current.style.zIndex = '1';
  };
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
      style={{ transition:'transform 200ms ease', transformStyle:'preserve-3d', position:'relative', ...style }}>
      {children}
    </div>
  );
}

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

const SERVICES_DATA = [
  { n:'Brand & Influencer Reels', num:'01', img:'/Brand & Influencer thumbnail.JPG', d:'Platform-native reels and influencer content engineered for scroll-stopping engagement.' },
  { n:'Product / Commercials',    num:'02', img:'/Product or commercials.JPG', d:'High-production product films and commercials built for brand impact.' },
  { n:'Podcast',                  num:'03', img:'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=600&q=80', d:'Studio-grade podcast production with cinematic visual storytelling.' },
  { n:'TVC / DVC',                num:'04', img:'/TVC OR DVC.jpeg', d:'Television and digital video commercials engineered for mass reach.' },
  { n:'2D / 3D Motion Graphic',   num:'05', img:'/Motion Graphics.jpeg', d:'Motion design that adds dimension and depth to brand communication.' },
  { n:'Ecommerce',                num:'06', img:'https://pub-4d3cad9469854486ab973729b0a3541b.r2.dev/posters/ecommerce.jpg', d:'Conversion-driven product imagery and lifestyle content for online retail.' },
  { n:'Drone Cinematography',     num:'07', img:'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80', d:'Licensed aerial filming delivering scale, movement, and perspective.' },
  { n:'AI Visual Content',        num:'08', img:'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=600&q=80', d:'AI-enabled storytelling and generative visuals that push creative boundaries.' },
];

// Client logos — local files in public/logos/, fallback to wordmark text
const CLIENTS: { name: string; logo: string | null }[] = [
  { name:'Engage',                    logo:null },
  { name:'Maybelline',                logo:'/logos/Maybelline.png' },
  { name:'Artize',                    logo:'/logos/Artize.png' },
  { name:'Cornetto',                  logo:null },
  { name:'Homegrown',                 logo:'/logos/Homegrown.png' },
  { name:'Renée',                     logo:null },
  { name:'Sony LIV',                  logo:'/logos/Sony_LIV.png' },
  { name:'Flipkart',                  logo:'/logos/Flipkart.png' },
  { name:"L'Oréal Paris",             logo:'/logos/L_Or_al_Paris.png' },
  { name:'Breezer',                   logo:'/logos/Breezer.png' },
  { name:'Sofy',                      logo:'/logos/Sofy.png' },
  { name:'Lotto',                     logo:'/logos/Lotto.png' },
  { name:'Matrix',                    logo:'/logos/Matrix.png' },
  { name:'TRESemmé',                  logo:'/logos/TRESemm_.png' },
  { name:'Lavie',                     logo:'/logos/Lavie.png' },
  { name:'Bombay Times Fashion Week', logo:null },
  { name:'Emaar India',               logo:null },
  { name:'Deconstruct',               logo:'/logos/Deconstruct.png' },
  { name:'Savlon',                    logo:'/logos/Savlon.png' },
  { name:'Nimyle',                    logo:'/logos/Nimyle.png' },
  { name:'NPCI',                      logo:'/logos/NPCI.png' },
  { name:'Tata AIA',                  logo:'/logos/Tata_AIA.png' },
  { name:'Pillsbury',                 logo:'/logos/Pillsbury.png' },
  { name:'Ghar',                      logo:null },
];

function ClientBadge({ name, logo }: { name: string; logo: string | null }) {
  const [imgError, setImgError] = useState(false);
  return (
    <motion.div
      whileHover={{ scale: 1.04, y: -2 }}
      transition={{ duration: 0.3, ease: EASE }}
      style={{
        flexShrink: 0,
        width: 'clamp(44px, 4.5vw, 64px)',
        height: 'clamp(44px, 4.5vw, 64px)',
        borderRadius: '50%',
        background: '#fff',
        border: '1px solid var(--white-08)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '7px', overflow: 'hidden',
        boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
        transition: 'box-shadow 350ms, border-color 350ms',
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 18px rgba(232,23,106,0.18)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)'; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 12px rgba(0,0,0,0.25)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--white-08)'; }}
    >
      {logo && !imgError ? (
        <img
          src={logo}
          alt={name}
          loading="lazy"
          onError={() => setImgError(true)}
          style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', display: 'block' }}
        />
      ) : (
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(7px, 0.6vw, 10px)',
          letterSpacing: '0.02em', lineHeight: 1.05,
          textAlign: 'center', textTransform: 'uppercase',
          color: '#0a0a0a',
        }}>{name}</span>
      )}
    </motion.div>
  );
}

// AI Video Slideshow — actual AI-generated videos from R2
const AI_VIDEOS = [
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

function VideoSlide({ video, isActive }: { video: typeof AI_VIDEOS[0]; isActive: boolean }) {
  const vidRef = useRef<HTMLVideoElement>(null);
  const playPromise = useRef<Promise<void> | null>(null);
  useEffect(() => {
    const v = vidRef.current;
    if (!v) return;
    if (isActive) {
      v.currentTime = 0;
      playPromise.current = v.play().catch(() => {});
    } else {
      if (playPromise.current) {
        playPromise.current.then(() => v.pause()).catch(() => v.pause());
        playPromise.current = null;
      } else {
        v.pause();
      }
    }
  }, [isActive]);
  return (
    <motion.video
      ref={vidRef}
      key={video.src}
      src={video.src}
      poster={video.poster}
      muted
      playsInline
      loop
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

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIdx(i => (i + 1) % AI_VIDEOS.length), 6000);
    return () => clearInterval(t);
  }, [paused]);

  const next = () => setIdx(i => (i + 1) % AI_VIDEOS.length);
  const prev = () => setIdx(i => (i - 1 + AI_VIDEOS.length) % AI_VIDEOS.length);

  return (
    <section
      className="ai-split"
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
        .ai-cap { position:relative; overflow:hidden; cursor:pointer; }
        .ai-cap .cap-d { max-height:0; opacity:0; overflow:hidden; transition: max-height 500ms ease, opacity 400ms ease, margin 400ms ease; }
        .ai-cap:hover .cap-d { max-height:60px; opacity:1; margin-top:6px; }
        .ai-cap::before {
          content:''; position:absolute; left:0; top:0; bottom:0; width:2px;
          background: var(--accent); transform: scaleY(0); transform-origin: top;
          transition: transform 400ms cubic-bezier(0.76,0,0.24,1);
        }
        .ai-cap:hover::before { transform: scaleY(1); }
      `}</style>

      {/* LEFT — Video Slideshow */}
      <div
        style={{ position: 'relative', overflow: 'hidden', background: 'var(--black)' }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {AI_VIDEOS.map((v, i) => (
          <VideoSlide key={v.src} video={v} isActive={i === idx} />
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
          borderRadius:'50%', background:'radial-gradient(circle, rgba(232,23,106,0.06) 0%, transparent 55%)',
          filter:'blur(100px)', pointerEvents:'none',
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
            Private audio & video engine. Core dev team curating pipelines for brands — AI ads, films, music videos, at scale.
          </motion.p>

          {/* Capability cards with hover reveal */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.16, ease: EASE }}
            style={{ display:'flex', flexDirection:'column', gap:'2px', marginBottom:'28px' }}
          >
            {[
              { n:'AI Photo Gen',    d:'Photorealistic brand imagery, generated at scale' },
              { n:'AI Video',        d:'Frame interpolation, upscaling & color grading' },
              { n:'Style Transfer',  d:'Apply any aesthetic across entire libraries' },
              { n:'Generative Film', d:'Text-to-video & image-to-video pipelines' },
            ].map((c, i) => (
              <div key={i} className="ai-cap"
                style={{
                  padding: '12px 16px',
                  background: 'rgba(255,255,255,0.02)',
                  borderBottom: '1px solid rgba(242,235,224,0.06)',
                  transition: 'background 300ms, padding-left 300ms',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(232,23,106,0.04)';
                  (e.currentTarget as HTMLElement).style.paddingLeft = '20px';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)';
                  (e.currentTarget as HTMLElement).style.paddingLeft = '16px';
                }}
              >
                <div style={{
                  display:'flex', alignItems:'center', justifyContent:'space-between',
                  fontFamily:'var(--font-body)', fontSize:'11px', fontWeight:600,
                  letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--white-80)',
                }}>
                  <span>{c.n}</span>
                  <span style={{ color:'var(--accent)', fontSize:'10px', opacity:0.6, transition:'opacity 300ms' }}
                    className="cap-arrow">→</span>
                </div>
                <div className="cap-d" style={{
                  fontFamily:'var(--font-body)', fontSize:'11px', lineHeight:1.6,
                  color:'var(--white-40)',
                }}>
                  {c.d}
                </div>
              </div>
            ))}
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
              <source src="https://pub-4d3cad9469854486ab973729b0a3541b.r2.dev/videos/showreel.mp4" type="video/mp4" />
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
      <section style={{ position:'relative', height:'100svh', overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center' }}>
        {/* Full-bleed showreel video */}
        <div style={{ position:'absolute', inset:0, zIndex:0 }}>
          <video
            autoPlay loop muted playsInline
            style={{ width:'100%', height:'100%', objectFit:'cover' }}
          >
            <source src="https://pub-4d3cad9469854486ab973729b0a3541b.r2.dev/videos/showreel.mp4" type="video/mp4" />
          </video>
          <div style={{ position:'absolute', inset:0, background:'rgba(9,9,8,0.55)' }} />
          <div style={{ position:'absolute', top:0, left:0, right:0, height:'25%', background:'linear-gradient(to bottom, var(--black), transparent)' }} />
          <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'55%', background:'linear-gradient(to top, var(--black), transparent)' }} />
          <div style={{ position:'absolute', top:'20%', right:'-10%', width:'40vw', height:'40vw', borderRadius:'50%', background:'radial-gradient(circle, rgba(232,23,106,0.10) 0%, transparent 70%)', filter:'blur(60px)' }} />
        </div>

        <div style={{ position:'relative', zIndex:1, textAlign:'center', padding:'0 var(--pad-x)', maxWidth:'900px' }}>
          <motion.h1 initial={{ opacity:0, y:40 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:1.2, delay:0.4, ease:EASE }}
            style={{ fontFamily:'var(--font-display)', fontSize:'clamp(32px,6vw,80px)', textTransform:'uppercase', lineHeight:0.9, letterSpacing:'-0.02em', color:'var(--white)', marginBottom:'clamp(12px,1.5vw,20px)', whiteSpace:'nowrap' }}>
            Camera On Roll Production
          </motion.h1>

          <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }}
            transition={{ duration:1, delay:0.7, ease:EASE }}
            style={{ fontFamily:'var(--font-body)', fontSize:'11px', fontWeight:500, letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--white-50)', marginBottom:'clamp(28px,3vw,48px)' }}>
            A creative tech studio built for modern brands
          </motion.p>

          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:0.8, delay:1, ease:EASE }}
            style={{ display:'flex', gap:'clamp(8px,1.5vw,14px)', justifyContent:'center', flexWrap:'wrap' }}>

            {/* Intro Video — opens fullscreen overlay */}
            <button onClick={() => setVideoOpen(true)} style={{ ...BTN_BASE, border:'1px solid var(--white-20)', color:'var(--white-70)', background:'transparent', cursor:'pointer' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor='var(--accent)'; e.currentTarget.style.color='var(--white)'; e.currentTarget.style.boxShadow='0 0 40px rgba(232,23,106,0.2)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor='var(--white-20)'; e.currentTarget.style.color='var(--white-70)'; e.currentTarget.style.boxShadow='none'; }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
              Intro Video
            </button>

            <Link href="/contact" style={{ ...BTN_BASE, border:'1px solid var(--accent-dim)', color:'var(--accent)' }}
              onMouseEnter={e => { e.currentTarget.style.background='var(--accent)'; e.currentTarget.style.color='#fff'; e.currentTarget.style.boxShadow='0 0 60px rgba(232,23,106,0.3)'; }}
              onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='var(--accent)'; e.currentTarget.style.boxShadow='none'; }}>
              Start a Project
            </Link>
          </motion.div>
        </div>

        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:2, duration:1 }}
          style={{ position:'absolute', bottom:'40px', left:'50%', transform:'translateX(-50%)', display:'flex', flexDirection:'column', alignItems:'center', gap:'12px' }}>
          <span style={{ fontFamily:'var(--font-body)', fontSize:'8px', fontWeight:500, letterSpacing:'0.44em', textTransform:'uppercase', color:'var(--white-20)' }}>Scroll</span>
          <div style={{ width:'1px', height:'40px', background:'linear-gradient(to bottom, var(--white-20), transparent)', position:'relative' }}>
            <motion.div animate={{ y:[0,40,0] }} transition={{ duration:2, repeat:Infinity, ease:'easeInOut' }}
              style={{ position:'absolute', top:0, left:'-2px', width:'5px', height:'5px', borderRadius:'50%', background:'var(--accent)', boxShadow:'0 0 8px var(--accent)' }} />
          </div>
        </motion.div>
      </section>

      {/* ══ WORK PREVIEW ═══════════════════════════════ */}
      <section style={{ borderTop:'1px solid var(--white-08)', padding:'clamp(20px,2.5vw,32px) 0 0' }}>
        {/* Header */}
        <div style={{ padding:'0 var(--pad-x)', display:'flex', alignItems:'flex-end', justifyContent:'space-between', marginBottom:'clamp(10px,1.2vw,18px)', flexWrap:'wrap', gap:'12px' }}>
          <Reveal>
            <div>
              <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(28px,4.5vw,56px)', textTransform:'uppercase', lineHeight:0.88, letterSpacing:'-0.02em', color:'var(--white)', margin:0 }}>Our Work.</h2>
            </div>
          </Reveal>
          <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
            {/* Layout toggle */}
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
            <Link href="/work" style={{ fontFamily:'var(--font-body)', fontSize:'10px', fontWeight:700, letterSpacing:'0.24em', textTransform:'uppercase', padding:'12px 28px', background:'transparent', color:'var(--accent)', border:'1px solid var(--accent)', display:'inline-flex', alignItems:'center', gap:'8px', transition:'all 300ms' }}
              onMouseEnter={e => { e.currentTarget.style.background='var(--accent)'; e.currentTarget.style.color='#fff'; e.currentTarget.style.boxShadow='0 0 40px rgba(232,23,106,0.3)'; }}
              onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='var(--accent)'; e.currentTarget.style.boxShadow='none'; }}>
              View All Work →
            </Link>
          </div>
        </div>

        {/* Grid layout — true aspect ratio per tile (9:16, 16:9, 1:1) */}
        <AnimatePresence mode="wait">
          {workLayout === 'grid' ? (
            <motion.div key="grid" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.25 }}
              style={{
                padding:'0 var(--pad-x)',
                display:'grid',
                /* 4-col compact grid — fits all tiles on one page */
                gridTemplateColumns:'repeat(4, 1fr)',
                gridAutoFlow:'dense',
                gap:'3px',
              }}
              className="work-masonry"
            >
              {FEATURED_HOME.map((p, i) => {
                const ytId_ = ytId(p.link);
                const isV = p.orientation === 'v';
                const isH = p.orientation === 'h';
                // Compact spans for one-page fit:
                // Vertical (portrait)  → 1 col × 3/4 aspect (like a photo, not full 9:16)
                // Horizontal (landscape) → 2 col × 2/1 aspect (panoramic, less height)
                const colSpan = isV ? 1 : (isH ? 2 : 1);
                const aspect = isV ? '3/4' : (isH ? '2/1' : '1/1');
                return (
                <motion.div key={i}
                  initial={{ opacity:0, scale:0.96 }} whileInView={{ opacity:1, scale:1 }} viewport={{ once:true, margin:'-40px' }}
                  transition={{ duration:0.5, delay:(i%3)*0.1, ease:EASE }}
                  whileHover={{ y:-8, scale:1.02, zIndex:5, transition:{ duration:0.35, ease:POP_EASE } }}
                  style={{
                    position:'relative',
                    gridColumn: `span ${colSpan}`,
                    aspectRatio: aspect,
                  }}>
                  <button onClick={() => setModal(p)} style={{ display:'block', width:'100%', height:'100%', textDecoration:'none', background:'#111', position:'relative', transition:'box-shadow 350ms', border:'none', padding:0, cursor:'pointer', borderRadius:'2px', overflow:'hidden' }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.boxShadow = '0 20px 60px rgba(232,23,106,0.35), 0 0 0 1px rgba(232,23,106,0.5)';
                      const info = el.querySelector('.tile-info') as HTMLElement | null;
                      if (info) info.style.opacity = '1';
                      const cat = el.querySelector('.tile-cat') as HTMLElement | null;
                      if (cat) cat.style.opacity = '1';
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.boxShadow = 'none';
                      const info = el.querySelector('.tile-info') as HTMLElement | null;
                      if (info) info.style.opacity = '0';
                      const cat = el.querySelector('.tile-cat') as HTMLElement | null;
                      if (cat) cat.style.opacity = '0';
                    }}
                  >
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
                      <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(9,9,8,0.85) 0%, rgba(9,9,8,0.15) 50%, transparent 100%)' }} />
                      <span className="tile-cat" style={{ position:'absolute', top:'10px', left:'10px', fontFamily:'var(--font-body)', fontSize:'8px', fontWeight:700, letterSpacing:'0.24em', textTransform:'uppercase', padding:'4px 10px', background:'rgba(9,9,8,0.85)', color:'var(--accent)', opacity:0, transition:'opacity 300ms', borderRadius:'2px', border:'1px solid rgba(232,23,106,0.3)' }}>{p.cat}</span>
                      <div className="tile-info" style={{ position:'absolute', bottom:'14px', left:'14px', right:'14px', opacity:0, transition:'opacity 300ms' }}>
                        <p style={{ fontFamily:'var(--font-display)', fontSize:'clamp(13px,1.4vw,18px)', textTransform:'uppercase', color:'var(--white)', margin:'0 0 4px', lineHeight:1.1, letterSpacing:'0.01em', textShadow:'0 2px 8px rgba(0,0,0,0.6)' }}>{p.title}</p>
                        <p style={{ fontFamily:'var(--font-body)', fontSize:'9px', letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--white-70)', margin:0 }}>{p.client}</p>
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
                      <p style={{ fontFamily:'var(--font-body)', fontSize:'9px', letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--white-40)', margin:0 }}>{p.client}</p>
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
      </section>

      {/* ══ SERVICES PREVIEW ═══════════════════════════ */}
      <section style={{ padding:'clamp(40px,5vw,60px) 0 0', borderTop:'1px solid var(--white-08)', background:'var(--black)' }}>
        <div style={{ padding:'0 var(--pad-x)', display:'flex', alignItems:'flex-end', justifyContent:'space-between', marginBottom:'clamp(20px,2.5vw,32px)', flexWrap:'wrap', gap:'12px' }}>
          <Reveal>
            <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(28px,4.5vw,56px)', textTransform:'uppercase', lineHeight:0.88, letterSpacing:'-0.02em', color:'var(--white)', margin:0 }}>Our Services.</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Link href="/services" style={{ fontFamily:'var(--font-body)', fontSize:'9px', fontWeight:600, letterSpacing:'0.24em', textTransform:'uppercase', padding:'10px 24px', border:'1px solid var(--white-20)', color:'var(--white-40)', display:'inline-flex', alignItems:'center', gap:'6px', transition:'border-color 300ms, color 300ms' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor='var(--accent)'; e.currentTarget.style.color='var(--white)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor='var(--white-20)'; e.currentTarget.style.color='var(--white-40)'; }}>
              Explore Services →
            </Link>
          </Reveal>
        </div>

        <div style={{ padding:'0 var(--pad-x)', display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:'1px', background:'var(--white-08)' }}>
          {SERVICES_DATA.map((s, i) => (
            <Tilt key={s.n}>
              <motion.div initial={{ opacity:0, y:12 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, margin:'-30px' }}
                transition={{ duration:0.4, delay:(i%4)*0.07, ease:EASE }}
                whileHover={{ y:-10, scale:1.035, zIndex:5, transition:{ duration:0.4, ease:POP_EASE } }}
                style={{ background:'var(--black)', position:'relative', overflow:'hidden', cursor:'pointer', height:'100%', transition:'box-shadow 400ms' }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.boxShadow = '0 30px 80px rgba(232,23,106,0.45), inset 0 0 0 1.5px rgba(232,23,106,0.7), 0 0 60px rgba(232,23,106,0.2)';
                  const img = el.querySelector('img') as HTMLImageElement; if(img){img.style.opacity='0.55';img.style.transform='scale(1.1)';}
                  const desc = el.querySelector('.svc-desc') as HTMLElement; if(desc) desc.style.opacity='1';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.boxShadow = 'none';
                  const img = el.querySelector('img') as HTMLImageElement; if(img){img.style.opacity='0.22';img.style.transform='scale(1)';}
                  const desc = el.querySelector('.svc-desc') as HTMLElement; if(desc) desc.style.opacity='0';
                }}>
                <div style={{ position:'absolute', inset:0, zIndex:0 }}>
                  <img src={s.img} alt={s.n} loading="lazy"
                    style={{ width:'100%', height:'100%', objectFit:'cover', opacity:0.22, transition:'opacity 500ms, transform 600ms' }} />
                  <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(9,9,8,0.94) 35%, rgba(9,9,8,0.35) 100%)' }} />
                </div>
                <div style={{ position:'relative', zIndex:1, padding:'22px', minHeight:'210px', display:'flex', flexDirection:'column', justifyContent:'flex-end' }}>
                  <div>
                    <h3 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(13px,1.25vw,16px)', textTransform:'uppercase', color:'var(--white)', letterSpacing:'0.02em', marginBottom:'10px', lineHeight:1.1 }}>{s.n}</h3>
                    <p className="svc-desc" style={{ fontFamily:'var(--font-body)', fontSize:'12px', lineHeight:1.7, color:'var(--white-70)', margin:0, opacity:0, transition:'opacity 300ms' }}>{s.d}</p>
                  </div>
                </div>
              </motion.div>
            </Tilt>
          ))}
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
        <div style={{ position:'relative', overflow:'hidden', padding:'clamp(6px,0.8vw,10px) 0' }}>
          {/* Edge fades for clean blend with background */}
          <div aria-hidden="true" style={{ position:'absolute', top:0, bottom:0, left:0, width:'clamp(40px,5vw,80px)', background:'linear-gradient(to right, var(--black), transparent)', zIndex:2, pointerEvents:'none' }} />
          <div aria-hidden="true" style={{ position:'absolute', top:0, bottom:0, right:0, width:'clamp(40px,5vw,80px)', background:'linear-gradient(to left, var(--black), transparent)', zIndex:2, pointerEvents:'none' }} />

          <div className="marquee" style={{ gap:'clamp(10px,1vw,16px)', paddingLeft:'clamp(10px,1vw,16px)' }}>
            {[...CLIENTS, ...CLIENTS].map((c, i) => (
              <ClientBadge key={`${c.name}-${i}`} name={c.name} logo={c.logo} />
            ))}
          </div>
        </div>
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
            <p style={{ fontFamily:'var(--font-body)', fontSize:'10px', letterSpacing:'0.22em', textTransform:'uppercase', color:'var(--white-70)', margin:0 }}>{project.client}</p>
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
