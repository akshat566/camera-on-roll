'use client';
import { useRef } from 'react';
import Link from 'next/link';
import { Reveal } from '@/components/Reveal';

const CAPABILITIES = [
  { n:'AI Films',                  d:'Cinematic brand films and campaigns built with AI — from concept to final cut.' },
  { n:'AI UGC Content',            d:'Performance-driven ad variants generated for every audience segment at scale.' },
  { n:'AI Music Videos',           d:'Visual narratives for music powered by generative AI — cinematic, fast, scalable.' },
  { n:'AI Product Commercials',    d:'Studio-quality product films and 3D renders without a physical shoot.' },
  { n:'AI Human Character Training', d:'Photorealistic AI spokespeople and brand ambassadors trained for your brand.' },
  { n:'AI Consistency, VFX & More',  d:'Visual consistency pipelines, VFX, sound design, and post — all powered by AI.' },
];

const SHOWCASE_VIDEOS = [
  { src:'https://pub-4d3cad9469854486ab973729b0a3541b.r2.dev/akshat/vertical/default__13__1.mp4', poster:'https://pub-4d3cad9469854486ab973729b0a3541b.r2.dev/akshat/vertical/default__13__1.mp4.jpg', title:'AI Film', cat:'Cinematic' },
  { src:'https://pub-4d3cad9469854486ab973729b0a3541b.r2.dev/akshat/vertical/default__133134253456_.mp4', poster:'https://pub-4d3cad9469854486ab973729b0a3541b.r2.dev/akshat/vertical/default__133134253456_.mp4.jpg', title:'AI Visual', cat:'Brand' },
  { src:'https://pub-4d3cad9469854486ab973729b0a3541b.r2.dev/akshat/vertical/default__136_.mp4', poster:'https://pub-4d3cad9469854486ab973729b0a3541b.r2.dev/akshat/vertical/default__136_.mp4.jpg', title:'AI Motion', cat:'Product' },
  { src:'https://pub-4d3cad9469854486ab973729b0a3541b.r2.dev/akshat/vertical/default__1433_.mp4', poster:'https://pub-4d3cad9469854486ab973729b0a3541b.r2.dev/akshat/vertical/default__1433_.mp4.jpg', title:'AI Campaign', cat:'Social' },
  { src:'https://pub-4d3cad9469854486ab973729b0a3541b.r2.dev/akshat/vertical/default__1gsdfh_fdggh_hg3_.mp4', poster:'https://pub-4d3cad9469854486ab973729b0a3541b.r2.dev/akshat/vertical/default__1gsdfh_fdggh_hg3_.mp4.jpg', title:'AI Generated', cat:'UGC' },
  { src:'https://pub-4d3cad9469854486ab973729b0a3541b.r2.dev/akshat/vertical/default__1qerqer3_.mp4', poster:'https://pub-4d3cad9469854486ab973729b0a3541b.r2.dev/akshat/vertical/default__1qerqer3_.mp4.jpg', title:'AI Production', cat:'Music' },
];

function VideoCard({ video, delay }: { video: typeof SHOWCASE_VIDEOS[0]; delay: number }) {
  const vidRef = useRef<HTMLVideoElement>(null);
  const playPromise = useRef<Promise<void> | null>(null);

  const handleEnter = () => {
    const v = vidRef.current;
    if (!v) return;
    playPromise.current = v.play().catch(() => {});
  };

  const handleLeave = () => {
    const v = vidRef.current;
    if (!v) return;
    if (playPromise.current) {
      playPromise.current.then(() => { v.pause(); }).catch(() => { v.pause(); });
      playPromise.current = null;
    } else {
      v.pause();
    }
  };

  return (
    <Reveal delay={delay}>
      <div style={{ position:'relative', overflow:'hidden', aspectRatio:'3/4', background:'var(--surface)', cursor:'pointer' }}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        <video ref={vidRef} src={video.src} poster={video.poster} muted loop playsInline preload="metadata"
          style={{ width:'100%', height:'100%', objectFit:'cover', display:'block', transition:'transform 600ms ease' }}
          onMouseEnter={e => { (e.currentTarget as HTMLVideoElement).style.transform='scale(1.04)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLVideoElement).style.transform='scale(1)'; }}
        />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(9,9,8,0.5) 0%, transparent 50%)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:'16px', left:'16px', right:'16px', pointerEvents:'none' }}>
          <p style={{ fontFamily:'var(--font-body)', fontSize:'8px', fontWeight:600, letterSpacing:'0.24em', textTransform:'uppercase', color:'var(--accent)', margin:'0 0 6px' }}>{video.cat}</p>
          <p style={{ fontFamily:'var(--font-display)', fontSize:'clamp(14px,1.4vw,18px)', textTransform:'uppercase', color:'var(--white)', margin:0, lineHeight:1.1 }}>{video.title}</p>
        </div>
      </div>
    </Reveal>
  );
}

export default function AtomPage() {
  return (
    <>
      {/* ══ OUR AI ENGINE ═════════════════════════════ */}
      <section style={{ position:'relative', borderTop:'1px solid var(--white-08)', background:'var(--black)', minHeight:'80vh', display:'flex', alignItems:'center', overflow:'hidden' }}>
        <div className="cx" style={{ width:'100%', paddingTop:'calc(var(--nav-h) + 40px)', paddingBottom:'clamp(40px,5vw,64px)' }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'clamp(32px,5vw,72px)', alignItems:'center' }}>
            {/* Left — copy */}
            <div style={{ maxWidth:'520px' }}>
              <Reveal>
                <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'18px' }}>
                  <span style={{ width:'20px', height:'1px', background:'var(--accent)' }} />
                  <span style={{ fontFamily:'var(--font-body)', fontSize:'9px', fontWeight:600, letterSpacing:'0.35em', textTransform:'uppercase', color:'var(--accent)' }}>AI Cinema Engine</span>
                </div>
              </Reveal>
              <Reveal delay={0.06}>
                <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(32px,4.5vw,64px)', textTransform:'uppercase', lineHeight:0.92, letterSpacing:'-0.02em', color:'var(--white)', margin:'0 0 20px' }}>
                  Our <span style={{ color:'var(--accent)' }}>AI</span> Engine<br />
                  Meets Cinema
                </h2>
              </Reveal>
              <Reveal delay={0.12}>
                <p style={{ fontFamily:'var(--font-body)', fontSize:'13px', fontWeight:400, lineHeight:1.75, color:'var(--white-50)', margin:'0 0 24px' }}>
                  We create AI-powered social twins — content that looks, feels, and performs like organic social media. From UGC-style ads to cinematic brand films, our private engine generates scroll-stopping visuals at the speed of culture.
                </p>
              </Reveal>
              <Reveal delay={0.18}>
                <p style={{ fontFamily:'var(--font-body)', fontSize:'13px', fontWeight:400, lineHeight:1.75, color:'var(--white-50)', margin:'0 0 32px' }}>
                  A creative tech studio with a private audio & video engine. Core developers curating pipelines for brands — AI ads, films, music videos, and social content at scale.
                </p>
              </Reveal>
              <Reveal delay={0.24}>
                <div style={{ display:'flex', gap:'10px', flexWrap:'wrap' }}>
                  <Link href="/contact" style={{
                    fontFamily:'var(--font-body)', fontSize:'10px', fontWeight:700, letterSpacing:'0.22em', textTransform:'uppercase',
                    padding:'12px 28px', background:'var(--accent)', color:'#fff', display:'inline-flex', alignItems:'center', gap:'8px',
                    transition:'all 350ms',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow='0 0 40px rgba(232,23,106,0.3)'; (e.currentTarget as HTMLElement).style.transform='translateY(-1px)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow='none'; (e.currentTarget as HTMLElement).style.transform='translateY(0)'; }}
                  >Get in Touch →</Link>
                  <a href="#showcase" style={{
                    fontFamily:'var(--font-body)', fontSize:'10px', fontWeight:700, letterSpacing:'0.18em', textTransform:'uppercase',
                    padding:'12px 28px', border:'1px solid rgba(242,235,224,0.15)', color:'rgba(242,235,224,0.55)', display:'inline-flex', alignItems:'center', gap:'6px',
                    transition:'all 350ms',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor='var(--accent)'; e.currentTarget.style.color='var(--white)'; e.currentTarget.style.transform='translateY(-1px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(242,235,224,0.15)'; e.currentTarget.style.color='rgba(242,235,224,0.55)'; e.currentTarget.style.transform='translateY(0)'; }}
                  >View Showcase →</a>
                </div>
              </Reveal>
            </div>

            {/* Right — video mosaic with real AI videos */}
            <div style={{ display:'flex', flexDirection:'column', gap:'4px' }}>
              <Reveal delay={0.1}>
                <div style={{ position:'relative', overflow:'hidden', aspectRatio:'16/9', background:'var(--surface)' }}>
                  <video src={SHOWCASE_VIDEOS[0].src} poster={SHOWCASE_VIDEOS[0].poster} muted loop playsInline autoPlay
                    style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}
                  />
                  <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(9,9,8,0.4), transparent 60%)' }} />
                  <span style={{ position:'absolute', top:'12px', right:'12px', fontFamily:'var(--font-body)', fontSize:'8px', fontWeight:700, letterSpacing:'0.24em', textTransform:'uppercase', padding:'6px 12px', background:'var(--accent)', color:'#fff' }}>ATOM AI</span>
                  <span style={{ position:'absolute', bottom:'12px', left:'12px', fontFamily:'var(--font-body)', fontSize:'8px', fontWeight:700, letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--white)', background:'rgba(9,9,8,0.6)', padding:'4px 8px' }}>{SHOWCASE_VIDEOS[0].cat}</span>
                </div>
              </Reveal>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'4px' }}>
                <Reveal delay={0.2}>
                  <div style={{ position:'relative', overflow:'hidden', aspectRatio:'1/1', background:'var(--surface)' }}>
                    <video src={SHOWCASE_VIDEOS[1].src} poster={SHOWCASE_VIDEOS[1].poster} muted loop playsInline autoPlay
                      style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}
                    />
                    <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(9,9,8,0.35), transparent 60%)' }} />
                    <span style={{ position:'absolute', bottom:'12px', left:'12px', fontFamily:'var(--font-body)', fontSize:'8px', fontWeight:700, letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--white)', background:'rgba(9,9,8,0.6)', padding:'4px 8px' }}>{SHOWCASE_VIDEOS[1].cat}</span>
                  </div>
                </Reveal>
                <Reveal delay={0.3}>
                  <div style={{ position:'relative', overflow:'hidden', aspectRatio:'1/1', background:'var(--surface)' }}>
                    <video src={SHOWCASE_VIDEOS[2].src} poster={SHOWCASE_VIDEOS[2].poster} muted loop playsInline autoPlay
                      style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}
                    />
                    <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(9,9,8,0.35), transparent 60%)' }} />
                    <span style={{ position:'absolute', bottom:'12px', left:'12px', fontFamily:'var(--font-body)', fontSize:'8px', fontWeight:700, letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--white)', background:'rgba(9,9,8,0.6)', padding:'4px 8px' }}>{SHOWCASE_VIDEOS[2].cat}</span>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SHOWCASE ══════════════════════════════════ */}
      <section id="showcase" style={{ borderTop:'1px solid var(--white-08)', background:'var(--black)' }}>
        <div className="cx" style={{ paddingTop:'clamp(48px,6vw,80px)', paddingBottom:'clamp(48px,6vw,80px)' }}>
          <Reveal>
            <div style={{ textAlign:'center', marginBottom:'clamp(36px,5vw,56px)' }}>
              <p style={{ fontFamily:'var(--font-body)', fontSize:'9px', fontWeight:600, letterSpacing:'0.38em', textTransform:'uppercase', color:'var(--accent)', marginBottom:'14px' }}>Selected Work</p>
              <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(32px,4vw,56px)', textTransform:'uppercase', lineHeight:0.92, letterSpacing:'-0.02em', color:'var(--white)', margin:0 }}>
                Showcase
              </h2>
            </div>
          </Reveal>

          {/* Full-width video grid */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:'4px', marginBottom:'4px' }}>
            {SHOWCASE_VIDEOS.slice(0,3).map((v,i) => (
              <VideoCard key={v.src} video={v} delay={i*0.08} />
            ))}
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:'4px' }}>
            {SHOWCASE_VIDEOS.slice(3,6).map((v,i) => (
              <VideoCard key={v.src} video={v} delay={0.1 + i*0.08} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ CAPABILITIES ════════════════════════════ */}
      <section style={{ borderTop:'1px solid var(--white-08)', background:'var(--surface)' }}>
        <div className="cx" style={{ paddingTop:'clamp(48px,6vw,80px)', paddingBottom:'clamp(48px,6vw,80px)' }}>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,380px),1fr))', gap:'clamp(32px,5vw,72px)', alignItems:'start', marginBottom:'clamp(40px,5vw,64px)' }}>
            <Reveal>
              <p style={{ fontFamily:'var(--font-body)', fontSize:'9px', fontWeight:600, letterSpacing:'0.38em', textTransform:'uppercase', color:'var(--accent)', marginBottom:'14px' }}>What We Do</p>
              <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(28px,3.5vw,52px)', textTransform:'uppercase', lineHeight:0.92, color:'var(--white)', margin:0 }}>AI Capabilities</h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p style={{ fontFamily:'var(--font-body)', fontSize:'14px', fontWeight:400, lineHeight:1.85, color:'var(--white-50)' }}>
                Our proprietary engine integrates generative AI into every phase of production. From social-first UGC twins to cinematic brand films, we build pipelines that merge AI speed with human creative direction.
              </p>
            </Reveal>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:'1px', background:'var(--white-08)' }}>
            {CAPABILITIES.map((s,i) => (
              <Reveal key={s.n} delay={i*0.06}>
                <div style={{ background:'var(--black)', padding:'clamp(24px,3vw,40px)', height:'100%', transition:'background 350ms' }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background='var(--surface-2)')}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background='var(--black)')}
                >
                  <p style={{ fontFamily:'var(--font-body)', fontSize:'9px', fontWeight:600, letterSpacing:'0.3em', textTransform:'uppercase', color:'var(--accent)', marginBottom:'16px' }}>0{i+1}</p>
                  <h3 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(14px,1.4vw,18px)', textTransform:'uppercase', color:'var(--white)', marginBottom:'10px', lineHeight:1.1 }}>{s.n}</h3>
                  <p style={{ fontFamily:'var(--font-body)', fontSize:'12px', lineHeight:1.75, color:'var(--white-40)' }}>{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
