'use client';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { Reveal } from '@/components/Reveal';
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
/** Build an autoplay embed URL for a project link. */
function getEmbed(link: string, platform: 'youtube' | 'instagram'): string | null {
  if (platform === 'youtube') {
    const id = ytId(link);
    return id ? `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1` : null;
  }
  const sc = igShortcode(link);
  return sc ? `https://www.instagram.com/p/${sc}/embed/` : null;
}
/** Infer platform from URL. */
function inferPlatform(link: string): 'youtube' | 'instagram' {
  return link.includes('youtube.com') || link.includes('youtu.be') ? 'youtube' : 'instagram';
}

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

const FEATURED: FeaturedProject[] = [
  // Pair 1 — hero vertical + hero horizontal
  { cat:'Brand Reels', client:'Samay Raina',      title:'Brand Reel',                   link:'https://www.instagram.com/p/DLzwCLPCRzS/', img:'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=800&q=80', orientation:'v' as const, c:2, r:3 }, // hero V
  { cat:'Podcasts',    client:'NPCI',             title:'Innovators Playground · Ep 1', link:'https://youtu.be/KHl8rzSUGWk',              img:ytThumb('KHl8rzSUGWk'), orientation:'h' as const, c:4, r:2 }, // hero H
  { cat:'Brand Reels', client:'Uorfi Javed',      title:'Brand Reel 1',                 link:'https://www.instagram.com/p/DF1v6VrtsAY/', img:'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&q=80', orientation:'v' as const, c:2, r:2 },
  { cat:'Podcasts',    client:'NPCI',             title:'Innovators Playground · Ep 2', link:'https://youtu.be/lwl5v5K_Vco',              img:ytThumb('lwl5v5K_Vco'), orientation:'h' as const, c:2, r:2 },
  // Pair 2
  { cat:'Brand Reels', client:'Santanu Hazarika', title:'Brand Reel 1',                 link:'https://www.instagram.com/p/DGVWzIwI4Ns/', img:'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80', orientation:'v' as const, c:2, r:3 }, // tall V
  { cat:'Product',     client:'Parachute',        title:'Influencer Holi Reel',         link:'https://youtu.be/ECkslerq9Rk',              img:ytThumb('ECkslerq9Rk'), orientation:'h' as const, c:4, r:2 }, // wide H
  { cat:'Brand Reels', client:'Uorfi Javed',      title:'Brand Reel 2',                 link:'https://www.instagram.com/p/DJmKjLWNf28/', img:'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80', orientation:'v' as const, c:2, r:2 },
  { cat:'Podcasts',    client:'NPCI',             title:'Innovators Playground · Ep 3', link:'https://youtu.be/osuR5mV8QGI',              img:ytThumb('osuR5mV8QGI'), orientation:'h' as const, c:4, r:2 }, // wide H
  // Pair 3
  { cat:'Brand Reels', client:'Santanu Hazarika', title:'Brand Reel 2',                 link:'https://www.instagram.com/p/DGe1Bk6IZYO/', img:'https://images.unsplash.com/photo-1536240478700-b869ad10e128?w=800&q=80', orientation:'v' as const, c:2, r:3 }, // tall V
  { cat:'Product',     client:'Complan',          title:'Product Commercial',           link:'https://www.youtube.com/watch?v=df9Pco1Xuow', img:ytThumb('df9Pco1Xuow'), orientation:'h' as const, c:2, r:2 },
  { cat:'Brand Reels', client:'Uorfi Javed',      title:'Brand Reel 3',                 link:'https://www.instagram.com/p/DKZpF8ONbpx/', img:'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80', orientation:'v' as const, c:2, r:2 },
  { cat:'Podcasts',    client:'TATA AIA',         title:'Podcast Episode 1',            link:'https://youtu.be/pXotTJIzbXw',              img:ytThumb('pXotTJIzbXw'), orientation:'h' as const, c:4, r:2 }, // wide H
];

// Home page: show only 7 featured items
const FEATURED_HOME = FEATURED.slice(0, 7);

const SERVICES_DATA = [
  { n:'Brand & Influencer Reels', num:'01', img:'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=600&q=80', d:'Platform-native reels and influencer content engineered for scroll-stopping engagement.' },
  { n:'Product / Commercials',    num:'02', img:'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&q=80', d:'High-production product films and commercials built for brand impact.' },
  { n:'Podcast',                  num:'03', img:'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=600&q=80', d:'Studio-grade podcast production with cinematic visual storytelling.' },
  { n:'TVC / DVC',                num:'04', img:'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&q=80', d:'Television and digital video commercials engineered for mass reach.' },
  { n:'2D / 3D Motion Graphic',   num:'05', img:'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80', d:'Motion design that adds dimension and depth to brand communication.' },
  { n:'Ecommerce',                num:'06', img:'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&q=80', d:'Conversion-driven product imagery and lifestyle content for online retail.' },
  { n:'Drone Cinematography',     num:'07', img:'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80', d:'Licensed aerial filming delivering scale, movement, and perspective.' },
  { n:'AI Visual Content',        num:'08', img:'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=600&q=80', d:'AI-enabled storytelling and generative visuals that push creative boundaries.' },
];

// Real client list — brand + domain for live logo fetching (Clearbit)
const CLIENTS: { name: string; domain: string }[] = [
  { name:'Engage',                    domain:'engage.itcportal.com' },
  { name:'Maybelline',                domain:'maybelline.com' },
  { name:'Artize',                    domain:'artize.in' },
  { name:'Cornetto',                  domain:'cornetto.com' },
  { name:'Homegrown',                 domain:'homegrown.co.in' },
  { name:'Renée',                     domain:'reneecosmetics.com' },
  { name:'Sony LIV',                  domain:'sonyliv.com' },
  { name:'Flipkart',                  domain:'flipkart.com' },
  { name:"L'Oréal Paris",              domain:'lorealparis.com' },
  { name:'Breezer',                   domain:'bacardi.com' },
  { name:'Sofy',                      domain:'sofy.in' },
  { name:'Lotto',                     domain:'lottosport.com' },
  { name:'Matrix',                    domain:'matrixprofessional.in' },
  { name:'TRESemmé',                  domain:'tresemme.com' },
  { name:'Lavie',                     domain:'lavieworld.com' },
  { name:'Bombay Times Fashion Week', domain:'bombaytimesfashionweek.com' },
  { name:'Emaar India',               domain:'emaar-india.com' },
  { name:'Deconstruct',               domain:'deconstruct.in' },
  { name:'Savlon',                    domain:'savlon.in' },
  { name:'Nimyle',                    domain:'nimyle.com' },
  { name:'NPCI',                      domain:'npci.org.in' },
  { name:'Tata AIA',                  domain:'tataaia.com' },
  { name:'Pillsbury',                 domain:'pillsbury.in' },
  { name:'Ghar',                      domain:'gharsoaps.com' },
];

// Single brand circle that tries to load a real logo and falls back to wordmark text
function ClientBadge({ name, domain }: { name: string; domain: string }) {
  const [imgError, setImgError] = useState(false);
  return (
    <motion.div
      whileHover={{ scale: 1.08, y: -4 }}
      transition={{ duration: 0.3, ease: EASE }}
      style={{
        flexShrink: 0,
        width: 'clamp(86px, 8vw, 116px)',
        height: 'clamp(86px, 8vw, 116px)',
        borderRadius: '50%',
        background: '#fff',
        border: '1.5px solid var(--white-08)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '14px', overflow: 'hidden',
        boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
        transition: 'box-shadow 350ms, border-color 350ms',
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 36px rgba(232,23,106,0.4), 0 0 0 2px var(--accent)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)'; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(0,0,0,0.35)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--white-08)'; }}
    >
      {!imgError ? (
        <img
          src={`https://logo.clearbit.com/${domain}?size=160`}
          alt={name}
          loading="lazy"
          onError={() => setImgError(true)}
          style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', display: 'block' }}
        />
      ) : (
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(10px, 0.95vw, 14px)',
          letterSpacing: '0.02em', lineHeight: 1.05,
          textAlign: 'center', textTransform: 'uppercase',
          color: '#0a0a0a',
        }}>{name}</span>
      )}
    </motion.div>
  );
}

const AI_SHOWCASE = [
  'https://images.unsplash.com/photo-1635776062764-e025521e3df3?w=800&q=80',
  'https://images.unsplash.com/photo-1684391961335-5f54123b8f2a?w=800&q=80',
  'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80',
  'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
  'https://images.unsplash.com/photo-1675270714610-11a5cadcc7b3?w=800&q=80',
  'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&q=80',
];

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
            style={{ fontFamily:'var(--font-display)', fontSize:'clamp(28px,5.5vw,72px)', textTransform:'uppercase', lineHeight:0.9, letterSpacing:'-0.02em', color:'var(--white)', marginBottom:'clamp(28px,3vw,48px)', whiteSpace:'nowrap' }}>
            Camera On Roll Production
          </motion.h1>

          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:0.8, delay:0.8, ease:EASE }}
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
      <section style={{ borderTop:'1px solid var(--white-08)', padding:'clamp(40px,5vw,60px) 0 0' }}>
        {/* Header */}
        <div style={{ padding:'0 var(--pad-x)', display:'flex', alignItems:'flex-end', justifyContent:'space-between', marginBottom:'clamp(20px,2.5vw,32px)', flexWrap:'wrap', gap:'12px' }}>
          <Reveal>
            <div>
              <p style={{ fontFamily:'var(--font-body)', fontSize:'9px', fontWeight:600, letterSpacing:'0.4em', textTransform:'uppercase', color:'var(--accent)', marginBottom:'8px' }}>Selected Work</p>
              <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(28px,4.5vw,56px)', textTransform:'uppercase', lineHeight:0.88, letterSpacing:'-0.02em', color:'var(--white)', margin:0 }}>Work That Speaks.</h2>
            </div>
          </Reveal>
          <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
            {/* Layout toggle */}
            <div style={{ display:'flex', border:'1px solid var(--white-08)', overflow:'hidden' }}>
              {(['grid','list'] as const).map(l => (
                <button key={l} onClick={() => setWorkLayout(l)} style={{
                  padding:'8px 14px', background: workLayout===l ? 'var(--accent)' : 'transparent',
                  color: workLayout===l ? '#fff' : 'var(--white-30)', border:'none', cursor:'pointer',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  transition:'background 200ms, color 200ms',
                }}>
                  {l==='grid'
                    ? <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><rect x="0" y="0" width="6" height="6" rx="1"/><rect x="10" y="0" width="6" height="6" rx="1"/><rect x="0" y="10" width="6" height="6" rx="1"/><rect x="10" y="10" width="6" height="6" rx="1"/></svg>
                    : <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><rect x="0" y="1" width="16" height="2" rx="1"/><rect x="0" y="7" width="16" height="2" rx="1"/><rect x="0" y="13" width="16" height="2" rx="1"/></svg>
                  }
                </button>
              ))}
            </div>
            <Link href="/work" style={{ fontFamily:'var(--font-body)', fontSize:'10px', fontWeight:700, letterSpacing:'0.24em', textTransform:'uppercase', padding:'12px 28px', background:'var(--accent)', color:'#fff', display:'inline-flex', alignItems:'center', gap:'8px', transition:'box-shadow 400ms' }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow='0 0 50px rgba(232,23,106,0.4)'; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow='none'; }}>
              View All Work →
            </Link>
          </div>
        </div>

        {/* Grid layout */}
        <AnimatePresence mode="wait">
          {workLayout === 'grid' ? (
            <motion.div key="grid" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.25 }}
              style={{
                padding:'0 var(--pad-x)',
                display:'grid',
                /* 6-col bento maze — each tile uses its own c/r span for variety */
                gridTemplateColumns:'repeat(6, 1fr)',
                gridAutoRows:'clamp(86px, 8.5vw, 130px)',
                gridAutoFlow:'dense',
                gap:'4px',
              }}>
              {FEATURED_HOME.map((p, i) => {
                const isV = p.orientation === 'v';
                const ytId_ = ytId(p.link);
                return (
                <motion.div key={i}
                  initial={{ opacity:0, scale:0.96 }} whileInView={{ opacity:1, scale:1 }} viewport={{ once:true, margin:'-40px' }}
                  transition={{ duration:0.5, delay:(i%4)*0.08, ease:EASE }}
                  whileHover={{ y:-10, scale:1.035, zIndex:5, transition:{ duration:0.4, ease:POP_EASE } }}
                  style={{
                    position:'relative',
                    gridColumn: `span ${p.c}`,
                    gridRow:    `span ${p.r}`,
                  }}>
                  <button onClick={() => setModal(p)} style={{ display:'block', height:'100%', textDecoration:'none', background:'#111', position:'relative', transition:'box-shadow 350ms', border:'none', padding:0, cursor:'pointer', width:'100%' }}
                    onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 30px 80px rgba(232,23,106,0.45), 0 0 0 1.5px rgba(232,23,106,0.7), 0 0 60px rgba(232,23,106,0.2)'; }}
                    onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; }}
                  >
                    <div style={{ position:'relative', width:'100%', height:'100%', overflow:'hidden' }}>
                      <img src={p.img} alt={p.title} loading="lazy"
                        onError={ytId_ ? (e => { (e.currentTarget as HTMLImageElement).src = ytFallbackThumb(ytId_!); }) : undefined}
                        style={{ width:'100%', height:'100%', objectFit:'cover', display:'block', transition:'transform 600ms, filter 400ms', filter:'brightness(0.85)' }}
                        onMouseEnter={e => { const el = e.currentTarget as HTMLImageElement; el.style.transform='scale(1.06)'; el.style.filter='brightness(1)'; }}
                        onMouseLeave={e => { const el = e.currentTarget as HTMLImageElement; el.style.transform='scale(1)'; el.style.filter='brightness(0.85)'; }}
                      />
                      <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(9,9,8,0.85) 0%, transparent 45%)' }} />
                      <span style={{ position:'absolute', top:'10px', left:'10px', fontFamily:'var(--font-body)', fontSize:'8px', fontWeight:700, letterSpacing:'0.24em', textTransform:'uppercase', padding:'4px 9px', background:'rgba(9,9,8,0.8)', color:'var(--accent)' }}>{p.cat}</span>
                      {/* Vertical/Horizontal marker */}
                      <span style={{ position:'absolute', top:'10px', right:'10px', fontFamily:'var(--font-body)', fontSize:'8px', fontWeight:700, letterSpacing:'0.18em', textTransform:'uppercase', padding:'4px 8px', background:'rgba(9,9,8,0.8)', color:'var(--white-70)' }}>{isV ? '9:16' : '16:9'}</span>
                      <span style={{ position:'absolute', bottom:'12px', right:'12px', width:'28px', height:'28px', display:'flex', alignItems:'center', justifyContent:'center', background:'rgba(9,9,8,0.8)', color:'var(--white)' }}>
                        <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 12L12 2M12 2H5M12 2V9"/></svg>
                      </span>
                      <div style={{ position:'absolute', bottom:'12px', left:'12px', right:'48px' }}>
                        <p style={{ fontFamily:'var(--font-display)', fontSize:'clamp(12px,1.3vw,17px)', textTransform:'uppercase', color:'var(--white)', margin:'0 0 2px', lineHeight:1.1, letterSpacing:'0.01em' }}>{p.title}</p>
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
                        onError={ytId_ ? (e => { (e.currentTarget as HTMLImageElement).src = ytFallbackThumb(ytId_!); }) : undefined}
                        style={{ width:'100%', height:'100%', objectFit:'cover', display:'block', transition:'transform 400ms', filter:'brightness(0.8)' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform='scale(1.04)'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform='scale(1)'; }}
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
      <section style={{ padding:'clamp(40px,5vw,60px) 0 0', borderTop:'1px solid var(--white-08)' }}>
        <div style={{ padding:'0 var(--pad-x)', display:'flex', alignItems:'flex-end', justifyContent:'space-between', marginBottom:'clamp(20px,2.5vw,32px)', flexWrap:'wrap', gap:'12px' }}>
          <Reveal>
            <div>
              <p style={{ fontFamily:'var(--font-body)', fontSize:'9px', fontWeight:600, letterSpacing:'0.4em', textTransform:'uppercase', color:'var(--accent)', marginBottom:'8px' }}>What We Offer</p>
              <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(28px,4.5vw,56px)', textTransform:'uppercase', lineHeight:0.88, letterSpacing:'-0.02em', color:'var(--white)', margin:0 }}>Our Services.</h2>
            </div>
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
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 30px 80px rgba(232,23,106,0.45), inset 0 0 0 1.5px rgba(232,23,106,0.7), 0 0 60px rgba(232,23,106,0.2)';
                  const img = (e.currentTarget as HTMLElement).querySelector('img') as HTMLImageElement; if(img){img.style.opacity='0.55';img.style.transform='scale(1.1)';}
                  const num = (e.currentTarget as HTMLElement).querySelector('.svc-num') as HTMLElement; if(num) num.style.color='var(--accent)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                  const img = (e.currentTarget as HTMLElement).querySelector('img') as HTMLImageElement; if(img){img.style.opacity='0.22';img.style.transform='scale(1)';}
                  const num = (e.currentTarget as HTMLElement).querySelector('.svc-num') as HTMLElement; if(num) num.style.color='var(--white-30)';
                }}>
                <div style={{ position:'absolute', inset:0, zIndex:0 }}>
                  <img src={s.img} alt={s.n} loading="lazy"
                    style={{ width:'100%', height:'100%', objectFit:'cover', opacity:0.22, transition:'opacity 500ms, transform 600ms' }} />
                  <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(9,9,8,0.94) 35%, rgba(9,9,8,0.35) 100%)' }} />
                </div>
                <div style={{ position:'relative', zIndex:1, padding:'22px', minHeight:'210px', display:'flex', flexDirection:'column', justifyContent:'space-between' }}>
                  <span className="svc-num" style={{ fontFamily:'var(--font-body)', fontSize:'11px', letterSpacing:'0.12em', color:'var(--white-30)', alignSelf:'flex-end', transition:'color 300ms' }}>{s.num}</span>
                  <div>
                    <h3 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(13px,1.25vw,16px)', textTransform:'uppercase', color:'var(--white)', letterSpacing:'0.02em', marginBottom:'10px', lineHeight:1.1 }}>{s.n}</h3>
                    <p style={{ fontFamily:'var(--font-body)', fontSize:'12px', lineHeight:1.7, color:'var(--white-70)', margin:0 }}>{s.d}</p>
                  </div>
                </div>
              </motion.div>
            </Tilt>
          ))}
        </div>
      </section>

      {/* ══ AI × CINEMA — single compact section (merged with engine teaser) ══ */}
      <section style={{ position:'relative', padding:'clamp(56px,6vw,96px) 0', borderTop:'1px solid var(--white-08)', overflow:'hidden' }}>
        {/* Soft AI mosaic behind */}
        <div aria-hidden="true" style={{ position:'absolute', inset:0, zIndex:0 }}>
          <div style={{ position:'absolute', inset:0, display:'grid', gridTemplateColumns:'repeat(6, 1fr)', gridTemplateRows:'repeat(2, 1fr)', gap:'2px', opacity:0.18 }}>
            {AI_SHOWCASE.map((src, i) => (
              <div key={i} style={{ position:'relative', overflow:'hidden' }}>
                <motion.img src={src} alt="" loading="lazy"
                  animate={{ scale:[1, 1.06, 1] }} transition={{ duration:18 + i, repeat:Infinity, ease:'easeInOut' }}
                  style={{ width:'100%', height:'100%', objectFit:'cover', filter:'brightness(0.7)' }} />
              </div>
            ))}
          </div>
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right, rgba(9,9,8,0.94) 0%, rgba(9,9,8,0.78) 50%, rgba(9,9,8,0.94) 100%)' }} />
          <div style={{ position:'absolute', top:'10%', left:'-15%', width:'45vw', height:'45vw', borderRadius:'50%', background:'radial-gradient(circle, rgba(232,23,106,0.10) 0%, transparent 70%)', filter:'blur(60px)' }} />
        </div>

        <div className="cx" style={{ position:'relative', zIndex:1 }}>
          <div style={{ display:'grid', gridTemplateColumns:'1.1fr 1fr', gap:'clamp(32px,5vw,72px)', alignItems:'center', marginBottom:'clamp(36px,4vw,56px)' }}>
            <Reveal>
              <div>
                <p style={{ fontFamily:'var(--font-body)', fontSize:'9px', fontWeight:600, letterSpacing:'0.4em', textTransform:'uppercase', color:'var(--accent)', marginBottom:'14px' }}>AI × Cinema · Proprietary Tech</p>
                <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(34px,5.5vw,80px)', textTransform:'uppercase', lineHeight:0.88, letterSpacing:'-0.02em', color:'var(--white)', margin:0 }}>
                  Our <span style={{ color:'var(--accent)' }}>AI</span> Engine.<br/>Where Cinema Meets Intelligence.
                </h2>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div>
                <p style={{ fontFamily:'var(--font-body)', fontSize:'13px', fontWeight:400, lineHeight:1.85, color:'var(--white-70)', marginBottom:'24px' }}>
                  An in-house generative platform for photo and video — trained on thousands of brand visuals and refined through real production cycles. Faster timelines, expanded creative possibilities, AI that understands creative intent.
                </p>
                <div style={{ display:'flex', gap:'12px', flexWrap:'wrap' }}>
                  <Link href="/atom" style={{ fontFamily:'var(--font-body)', fontSize:'10px', fontWeight:700, letterSpacing:'0.28em', textTransform:'uppercase', padding:'14px 28px', background:'var(--accent)', color:'#fff', display:'inline-flex', alignItems:'center', gap:'8px', transition:'opacity 300ms, box-shadow 400ms' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.boxShadow='0 0 50px rgba(232,23,106,0.35)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.boxShadow='none'; }}>
                    Explore Our AI →
                  </Link>
                  <Link href="/work" style={{ fontFamily:'var(--font-body)', fontSize:'10px', fontWeight:700, letterSpacing:'0.24em', textTransform:'uppercase', padding:'14px 28px', border:'1px solid var(--white-20)', color:'var(--white-70)', display:'inline-flex', alignItems:'center', gap:'6px', transition:'border-color 300ms, color 300ms' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor='var(--accent)'; e.currentTarget.style.color='var(--white)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor='var(--white-20)'; e.currentTarget.style.color='var(--white-70)'; }}>
                    AI Driven Content →
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>

          {/* 4 capability chips — compact strip */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:'2px', background:'var(--white-08)', border:'1px solid var(--white-08)' }}>
            {[
              { icon:'▶', n:'AI Photo Gen',    d:'Photorealistic product and lifestyle imagery generated at scale, on-brand.' },
              { icon:'◆', n:'AI Video Enhance', d:'Frame interpolation, upscaling, and AI color grading for any footage.' },
              { icon:'▲', n:'Style Transfer',   d:'Apply any visual aesthetic consistently across entire content libraries.' },
              { icon:'✦', n:'Generative Video', d:'Text-to-video and image-to-video pipelines for campaign concepts.' },
            ].map((c, i) => (
              <motion.div key={i}
                initial={{ opacity:0, y:12 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, margin:'-30px' }}
                transition={{ duration:0.4, delay:i*0.08, ease:EASE }}
                whileHover={{ y:-3 }}
                style={{ background:'rgba(9,9,8,0.7)', padding:'22px 20px 24px', cursor:'pointer', transition:'background 250ms' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(232,23,106,0.08)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(9,9,8,0.7)'; }}
              >
                <div style={{ fontSize:'16px', color:'var(--accent)', marginBottom:'12px' }}>{c.icon}</div>
                <p style={{ fontFamily:'var(--font-body)', fontSize:'10px', fontWeight:700, letterSpacing:'0.24em', textTransform:'uppercase', color:'var(--white)', margin:'0 0 8px' }}>{c.n}</p>
                <p style={{ fontFamily:'var(--font-body)', fontSize:'11px', lineHeight:1.7, color:'var(--white-70)', margin:0 }}>{c.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CLIENTS — single sliding marquee with real logos ═══ */}
      <section style={{ padding:'clamp(56px,6vw,88px) 0', borderTop:'1px solid var(--white-08)' }}>
        <div className="cx" style={{ marginBottom:'clamp(32px,3.5vw,48px)' }}>
          <Reveal>
            <p style={{ fontFamily:'var(--font-body)', fontSize:'9px', fontWeight:600, letterSpacing:'0.4em', textTransform:'uppercase', color:'var(--accent)', marginBottom:'10px' }}>Trusted By</p>
            <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(40px,6.5vw,96px)', textTransform:'uppercase', lineHeight:0.86, letterSpacing:'-0.02em', color:'var(--white)', margin:0 }}>Clients</h2>
          </Reveal>
        </div>

        {/* Edge-to-edge marquee — one continuous sliding row */}
        <div style={{ position:'relative', overflow:'hidden', padding:'clamp(16px,2vw,28px) 0' }}>
          {/* Edge fades for clean blend with background */}
          <div aria-hidden="true" style={{ position:'absolute', top:0, bottom:0, left:0, width:'clamp(60px,8vw,160px)', background:'linear-gradient(to right, var(--black), transparent)', zIndex:2, pointerEvents:'none' }} />
          <div aria-hidden="true" style={{ position:'absolute', top:0, bottom:0, right:0, width:'clamp(60px,8vw,160px)', background:'linear-gradient(to left, var(--black), transparent)', zIndex:2, pointerEvents:'none' }} />

          <div className="marquee" style={{ gap:'clamp(20px,2vw,36px)', paddingLeft:'clamp(20px,2vw,36px)' }}>
            {[...CLIENTS, ...CLIENTS].map((c, i) => (
              <ClientBadge key={`${c.name}-${i}`} name={c.name} domain={c.domain} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ WORK WITH US (Image 3 design) ════════════════ */}
      <section style={{ borderTop:'1px solid var(--white-08)', background:'var(--black)' }}>
        {/* Top artwork strip — our own work montage */}
        <div style={{ position:'relative', height:'clamp(180px,22vw,320px)', overflow:'hidden', display:'grid', gridTemplateColumns:`repeat(${FEATURED.length}, 1fr)`, gap:'2px', background:'var(--white-08)' }}>
          {FEATURED.map((f, i) => (
            <motion.div key={i}
              initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }}
              transition={{ duration:0.8, delay:i*0.08, ease:EASE }}
              whileHover={{ scale:1.04 }}
              style={{ position:'relative', overflow:'hidden', background:'var(--black)', cursor:'pointer' }}
            >
              <motion.img src={f.img} alt={f.title} loading="lazy"
                animate={{ scale:[1, 1.06, 1] }} transition={{ duration:14 + i*1.5, repeat:Infinity, ease:'easeInOut' }}
                style={{ width:'100%', height:'100%', objectFit:'cover', filter:'brightness(0.95) saturate(1.05)' }} />
              <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(9,9,8,0.6), transparent 60%)' }} />
              <span style={{ position:'absolute', bottom:'10px', left:'10px', fontFamily:'var(--font-body)', fontSize:'8px', fontWeight:700, letterSpacing:'0.24em', textTransform:'uppercase', color:'var(--white)' }}>{f.client}</span>
            </motion.div>
          ))}
        </div>

        {/* Work With Us — two-column: title+contact LEFT, form RIGHT */}
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

/** Fullscreen-capable inline player modal for YouTube + Instagram links. */
function ProjectModal({ project, onClose }: { project: FeaturedProject; onClose: () => void }) {
  const platform = inferPlatform(project.link);
  const embed = getEmbed(project.link, platform);
  const playerRef = useRef<HTMLDivElement>(null);
  const isV = project.orientation === 'v';

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
      transition={{ duration:0.25 }}
      onClick={onClose}
      style={{
        position:'fixed', inset:0, zIndex:100,
        background:'rgba(9,9,8,0.92)', backdropFilter:'blur(14px)',
        display:'flex', alignItems:'center', justifyContent:'center',
        padding:'clamp(16px, 4vw, 64px)',
      }}
    >
      <motion.div
        initial={{ scale:0.94, y:20, opacity:0 }} animate={{ scale:1, y:0, opacity:1 }} exit={{ scale:0.96, opacity:0 }}
        transition={{ duration:0.35, ease:EASE }}
        onClick={e => e.stopPropagation()}
        style={{
          position:'relative',
          width: isV ? 'min(420px, 100%)' : 'min(1100px, 100%)',
          maxHeight: '90vh',
          display:'flex', flexDirection:'column', gap:'12px',
        }}
      >
        {/* Top bar: title + actions */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:'12px', flexWrap:'wrap' }}>
          <div>
            <p style={{ fontFamily:'var(--font-body)', fontSize:'9px', fontWeight:700, letterSpacing:'0.3em', textTransform:'uppercase', color:'var(--accent)', margin:'0 0 4px' }}>
              {project.cat} · {platform === 'youtube' ? 'YouTube' : 'Instagram'}
            </p>
            <h3 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(18px,2vw,26px)', textTransform:'uppercase', color:'var(--white)', margin:'0 0 2px', lineHeight:1.05, letterSpacing:'0.01em' }}>{project.title}</h3>
            <p style={{ fontFamily:'var(--font-body)', fontSize:'10px', letterSpacing:'0.22em', textTransform:'uppercase', color:'var(--white-70)', margin:0 }}>{project.client}</p>
          </div>
          <div style={{ display:'flex', gap:'8px' }}>
            <button onClick={goFullscreen} aria-label="Fullscreen"
              style={{ width:'40px', height:'40px', display:'inline-flex', alignItems:'center', justifyContent:'center', background:'transparent', border:'1px solid var(--white-20)', color:'var(--white-70)', cursor:'pointer', transition:'all 200ms' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor='var(--accent)'; e.currentTarget.style.color='var(--accent)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor='var(--white-20)'; e.currentTarget.style.color='var(--white-70)'; }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9V5a2 2 0 0 1 2-2h4M21 9V5a2 2 0 0 0-2-2h-4M3 15v4a2 2 0 0 0 2 2h4M21 15v4a2 2 0 0 1-2 2h-4"/>
              </svg>
            </button>
            <a href={project.link} target="_blank" rel="noopener noreferrer" aria-label="Open original"
              style={{ display:'inline-flex', alignItems:'center', gap:'8px', padding:'0 16px', height:'40px', background:'transparent', border:'1px solid var(--white-20)', color:'var(--white-70)', fontFamily:'var(--font-body)', fontSize:'10px', fontWeight:700, letterSpacing:'0.22em', textTransform:'uppercase', textDecoration:'none', cursor:'pointer', transition:'all 200ms' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor='var(--accent)'; e.currentTarget.style.color='var(--accent)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor='var(--white-20)'; e.currentTarget.style.color='var(--white-70)'; }}
            >
              Open Original
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

        {/* Player — aspect ratio follows orientation */}
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
          {embed ? (
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
      </motion.div>
    </motion.div>
  );
}
