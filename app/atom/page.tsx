'use client';
import Link from 'next/link';
import { Reveal } from '@/components/Reveal';
import { Scroll3D } from '@/components/Scroll3D';
import { LazyVideo } from '@/components/LazyVideo';

const CAPABILITIES = [
  { n:'AI Films',                  d:'Cinematic brand films and campaigns built with AI — from concept to final cut.' },
  { n:'AI UGC Content',            d:'Performance-driven ad variants generated for every audience segment at scale.' },
  { n:'AI Music Videos',           d:'Visual narratives for music powered by generative AI — cinematic, fast, scalable.' },
  { n:'AI Product Commercials',    d:'Studio-quality product films and 3D renders without a physical shoot.' },
  { n:'AI Human Character Training', d:'Photorealistic AI spokespeople and brand ambassadors trained for your brand.' },
  { n:'AI Consistency, VFX & More',  d:'Visual consistency pipelines, VFX, sound design, and post — all powered by AI.' },
];

const SHOWCASE_VIDEOS = [
  { src:'https://pub-4d3cad9469854486ab973729b0a3541b.r2.dev/videos/cadbury-dairymilk.mp4', poster:'https://pub-4d3cad9469854486ab973729b0a3541b.r2.dev/videos/cadbury-dairymilk.mp4.jpg', title:'Cadbury Dairy Milk', cat:'Brand' },
  { src:'https://pub-4d3cad9469854486ab973729b0a3541b.r2.dev/videos/ysl.mp4', poster:'https://pub-4d3cad9469854486ab973729b0a3541b.r2.dev/videos/ysl.mp4.jpg', title:'YSL', cat:'Beauty' },
  { src:'https://pub-4d3cad9469854486ab973729b0a3541b.r2.dev/videos/simple.mp4', poster:'https://pub-4d3cad9469854486ab973729b0a3541b.r2.dev/videos/simple.mp4.jpg', title:'Simple', cat:'Skincare' },
  { src:'https://pub-4d3cad9469854486ab973729b0a3541b.r2.dev/akshat/vertical/default__13__1.mp4', poster:'https://pub-4d3cad9469854486ab973729b0a3541b.r2.dev/akshat/vertical/default__13__1.mp4.jpg', title:'AI Film', cat:'Cinematic' },
  { src:'https://pub-4d3cad9469854486ab973729b0a3541b.r2.dev/akshat/vertical/default__133134253456_.mp4', poster:'https://pub-4d3cad9469854486ab973729b0a3541b.r2.dev/akshat/vertical/default__133134253456_.mp4.jpg', title:'AI Visual', cat:'Brand' },
  { src:'https://pub-4d3cad9469854486ab973729b0a3541b.r2.dev/akshat/vertical/default__136_.mp4', poster:'https://pub-4d3cad9469854486ab973729b0a3541b.r2.dev/akshat/vertical/default__136_.mp4.jpg', title:'AI Motion', cat:'Product' },
  { src:'https://pub-4d3cad9469854486ab973729b0a3541b.r2.dev/akshat/vertical/default__1433_.mp4', poster:'https://pub-4d3cad9469854486ab973729b0a3541b.r2.dev/akshat/vertical/default__1433_.mp4.jpg', title:'AI Campaign', cat:'Social' },
  { src:'https://pub-4d3cad9469854486ab973729b0a3541b.r2.dev/akshat/vertical/default__1gsdfh_fdggh_hg3_.mp4', poster:'https://pub-4d3cad9469854486ab973729b0a3541b.r2.dev/akshat/vertical/default__1gsdfh_fdggh_hg3_.mp4.jpg', title:'AI Generated', cat:'UGC' },
  { src:'https://pub-4d3cad9469854486ab973729b0a3541b.r2.dev/akshat/vertical/default__1qerqer3_.mp4', poster:'https://pub-4d3cad9469854486ab973729b0a3541b.r2.dev/akshat/vertical/default__1qerqer3_.mp4.jpg', title:'AI Production', cat:'Music' },
];

function VideoCard({ video, delay }: { video: typeof SHOWCASE_VIDEOS[0]; delay: number }) {
  return (
    <Reveal delay={delay}>
      <LazyVideo
        src={video.src}
        poster={video.poster}
        playMode="hover"
        style={{ aspectRatio:'3/4', background:'var(--surface)', cursor:'pointer' }}
      >
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(9,9,8,0.5) 0%, transparent 50%)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:'16px', left:'16px', right:'16px', pointerEvents:'none' }}>
          <p style={{ fontFamily:'var(--font-body)', fontSize:'8px', fontWeight:600, letterSpacing:'0.24em', textTransform:'uppercase', color:'var(--accent)', margin:'0 0 6px' }}>{video.cat}</p>
          <p style={{ fontFamily:'var(--font-display)', fontSize:'clamp(14px,1.4vw,18px)', textTransform:'uppercase', color:'var(--white)', margin:0, lineHeight:1.1 }}>{video.title}</p>
        </div>
      </LazyVideo>
    </Reveal>
  );
}

export default function AtomPage() {
  return (
    <>
      {/* ══ OUR AI ENGINE ═════════════════════════════ */}
      <section className="cv-section" style={{ position:'relative', borderTop:'1px solid var(--white-08)', background:'var(--black)', minHeight:'80vh', display:'flex', alignItems:'center', overflow:'hidden' }}>
        <div className="cx" style={{ width:'100%', paddingTop:'calc(var(--nav-h) + 40px)', paddingBottom:'clamp(40px,5vw,64px)' }}>
          <div className="grid-2-1" style={{ gap:'clamp(32px,5vw,72px)', alignItems:'center' }}>
            {/* Left — copy */}
            <Scroll3D intensity={0.5}>
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
            </Scroll3D>

            {/* Right — video mosaic with real AI videos */}
            <div style={{ display:'flex', flexDirection:'column', gap:'4px' }}>
              <Reveal delay={0.1}>
                <LazyVideo src={SHOWCASE_VIDEOS[0].src} poster={SHOWCASE_VIDEOS[0].poster} eager
                  style={{ aspectRatio:'16/9', background:'var(--surface)' }}>
                  <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(9,9,8,0.4), transparent 60%)' }} />
                  <span style={{ position:'absolute', top:'12px', right:'12px', fontFamily:'var(--font-body)', fontSize:'8px', fontWeight:700, letterSpacing:'0.24em', textTransform:'uppercase', padding:'6px 12px', background:'var(--accent)', color:'#fff' }}>ATOM AI</span>
                  <span style={{ position:'absolute', bottom:'12px', left:'12px', fontFamily:'var(--font-body)', fontSize:'8px', fontWeight:700, letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--white)', background:'rgba(9,9,8,0.6)', padding:'4px 8px' }}>{SHOWCASE_VIDEOS[0].cat}</span>
                </LazyVideo>
              </Reveal>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'4px' }}>
                <Reveal delay={0.2}>
                  <LazyVideo src={SHOWCASE_VIDEOS[1].src} poster={SHOWCASE_VIDEOS[1].poster}
                    style={{ aspectRatio:'1/1', background:'var(--surface)' }}>
                    <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(9,9,8,0.35), transparent 60%)' }} />
                    <span style={{ position:'absolute', bottom:'12px', left:'12px', fontFamily:'var(--font-body)', fontSize:'8px', fontWeight:700, letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--white)', background:'rgba(9,9,8,0.6)', padding:'4px 8px' }}>{SHOWCASE_VIDEOS[1].cat}</span>
                  </LazyVideo>
                </Reveal>
                <Reveal delay={0.3}>
                  <LazyVideo src={SHOWCASE_VIDEOS[2].src} poster={SHOWCASE_VIDEOS[2].poster}
                    style={{ aspectRatio:'1/1', background:'var(--surface)' }}>
                    <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(9,9,8,0.35), transparent 60%)' }} />
                    <span style={{ position:'absolute', bottom:'12px', left:'12px', fontFamily:'var(--font-body)', fontSize:'8px', fontWeight:700, letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--white)', background:'rgba(9,9,8,0.6)', padding:'4px 8px' }}>{SHOWCASE_VIDEOS[2].cat}</span>
                  </LazyVideo>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SHOWCASE ══════════════════════════════════ */}
      <section id="showcase" className="cv-section" style={{ borderTop:'1px solid var(--white-08)', background:'var(--black)' }}>
        <div className="cx" style={{ paddingTop:'clamp(48px,6vw,80px)', paddingBottom:'clamp(48px,6vw,80px)' }}>
          <Scroll3D intensity={0.5}>
          <Reveal>
            <div style={{ textAlign:'center', marginBottom:'clamp(36px,5vw,56px)' }}>
              <p style={{ fontFamily:'var(--font-body)', fontSize:'9px', fontWeight:600, letterSpacing:'0.38em', textTransform:'uppercase', color:'var(--accent)', marginBottom:'14px' }}>Selected Work</p>
              <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(32px,4vw,56px)', textTransform:'uppercase', lineHeight:0.92, letterSpacing:'-0.02em', color:'var(--white)', margin:0 }}>
                Showcase
              </h2>
            </div>
          </Reveal>

          {/* Full-width video grid */}
          </Scroll3D>
          <div className="grid-vid3" style={{ gap:'4px', marginBottom:'4px' }}>
            {SHOWCASE_VIDEOS.slice(0,3).map((v,i) => (
              <VideoCard key={v.src} video={v} delay={i*0.08} />
            ))}
          </div>
          <div className="grid-vid3" style={{ gap:'4px' }}>
            {SHOWCASE_VIDEOS.slice(3,6).map((v,i) => (
              <VideoCard key={v.src} video={v} delay={0.1 + i*0.08} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ WATCH ON YOUTUBE — playlist cards ═══════ */}
      <section style={{ borderTop:'1px solid var(--white-08)', background:'var(--black)' }}>
        <div className="cx" style={{ paddingTop:'clamp(48px,6vw,80px)', paddingBottom:'clamp(48px,6vw,80px)' }}>
          <Reveal>
            <p style={{ fontFamily:'var(--font-body)', fontSize:'9px', fontWeight:600, letterSpacing:'0.38em', textTransform:'uppercase', color:'var(--accent)', marginBottom:'clamp(28px,3vw,44px)' }}>
              Watch on YouTube
            </p>
          </Reveal>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap:'clamp(12px,1.5vw,20px)' }}>
            {[
              { tag:'AI', title:'All AI Videos', href:'https://youtube.com/playlist?list=PLG-syaA8JTVSuD4tT7jowF09G74Hrhhbt' },
              { tag:'AI', title:'UGC', href:'https://youtube.com/playlist?list=PLG-syaA8JTVQ8X0BgkggPsSmK_gORhMh7' },
              { tag:'MUSIC VIDEO', title:'Music Videos', href:'https://youtube.com/playlist?list=PLG-syaA8JTVSVgpPzfRmvVwRyRNTb-nud' },
              { tag:'AI', title:'Trailers', href:'https://youtube.com/playlist?list=PLG-syaA8JTVSVcKe2yOz4RZzSO1uU5B-u' },
              { tag:'AI', title:'Ads', href:'https://youtube.com/playlist?list=PLG-syaA8JTVRcHscxlQSDw8mnTNnURXz_' },
            ].map((pl, i) => (
              <Reveal key={pl.title} delay={i * 0.06}>
                <a href={pl.href} target="_blank" rel="noopener noreferrer"
                  style={{
                    display:'block',
                    padding:'clamp(20px,2vw,28px)',
                    border:'1px solid var(--white-08)',
                    background:'var(--surface)',
                    transition:'border-color 350ms, box-shadow 350ms',
                    textDecoration:'none',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor='var(--accent)'; e.currentTarget.style.boxShadow='0 0 40px rgba(232,23,106,0.08)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor='var(--white-08)'; e.currentTarget.style.boxShadow='none'; }}
                >
                  <p style={{ fontFamily:'var(--font-body)', fontSize:'8px', fontWeight:600, letterSpacing:'0.3em', textTransform:'uppercase', color:'var(--accent)', margin:'0 0 clamp(12px,1.2vw,18px)' }}>{pl.tag}</p>
                  <h3 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(14px,1.2vw,18px)', textTransform:'uppercase', color:'var(--white)', margin:'0 0 clamp(16px,1.5vw,24px)', lineHeight:1.1 }}>{pl.title}</h3>
                  <span style={{ fontFamily:'var(--font-body)', fontSize:'10px', fontWeight:600, letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--white-40)', transition:'color 350ms' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color='var(--accent)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color='var(--white-40)'; }}>
                    View Playlist →
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CAPABILITIES ════════════════════════════ */}
      <section style={{ borderTop:'1px solid var(--white-08)', background:'var(--surface)' }}>
        <div className="cx" style={{ paddingTop:'clamp(48px,6vw,80px)', paddingBottom:'clamp(48px,6vw,80px)' }}>
          <Scroll3D intensity={0.5}>
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
          <div className="grid-cap3" style={{ gap:'1px', background:'var(--white-08)' }}>
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
          </Scroll3D>
        </div>
      </section>
    </>
  );
}
