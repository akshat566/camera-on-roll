'use client';

import { motion } from 'framer-motion';

const EASE = [0.22, 0.58, 0.32, 1] as const;
const POP_EASE = [0.34, 1.56, 0.64, 1] as const;

export const SERVICES_DATA = [
  { n:'Brand & Influencer Reels', num:'01', img:'/Brand & Influencer thumbnail.JPG', d:'Platform-native reels and influencer content engineered for scroll-stopping engagement.' },
  { n:'Product / Commercials',    num:'02', img:'/Product or commercials.JPG', d:'High-production product films and commercials built for brand impact.' },
  { n:'Podcast',                  num:'03', img:'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=600&q=80', d:'Studio-grade podcast production with cinematic visual storytelling.' },
  { n:'TVC / DVC',                num:'04', img:'/TVC OR DVC.jpeg', d:'Television and digital video commercials engineered for mass reach.' },
  { n:'2D / 3D Motion Graphic',   num:'05', img:'/Motion Graphics.jpeg', d:'Motion design that adds dimension and depth to brand communication.' },
  { n:'Ecommerce',                num:'06', img:'https://pub-4d3cad9469854486ab973729b0a3541b.r2.dev/posters/ecommerce.jpg', d:'Conversion-driven product imagery and lifestyle content for online retail.' },
  { n:'Drone Cinematography',     num:'07', img:'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80', d:'Licensed aerial filming delivering scale, movement, and perspective.' },
  { n:'AI Visual Content',        num:'08', img:'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=600&q=80', d:'AI-enabled storytelling and generative visuals that push creative boundaries.' },
];

export function ServicesGrid() {
  return (
    <div style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:'1px', background:'var(--white-08)' }}>
      {SERVICES_DATA.map((s, i) => (
        <motion.div key={s.n} initial={{ opacity:0, y:12 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, margin:'-30px' }}
          transition={{ duration:0.4, delay:(i%4)*0.07, ease:EASE }}
          style={{ background:'var(--black)', position:'relative', overflow:'hidden', cursor:'pointer', height:'100%' }}
          onMouseEnter={e => {
            const el = e.currentTarget as HTMLElement;
            el.style.boxShadow = '0 30px 80px rgba(232,23,106,0.35), inset 0 0 0 1.5px rgba(232,23,106,0.6)';
            const img = el.querySelector('img') as HTMLImageElement; if(img){img.style.opacity='0.95';img.style.transform='scale(1.08)';}
            const desc = el.querySelector('.svc-desc') as HTMLElement; if(desc) desc.style.opacity='1';
          }}
          onMouseLeave={e => {
            const el = e.currentTarget as HTMLElement;
            el.style.boxShadow = 'none';
            const img = el.querySelector('img') as HTMLImageElement; if(img){img.style.opacity='0.55';img.style.transform='scale(1)';}
            const desc = el.querySelector('.svc-desc') as HTMLElement; if(desc) desc.style.opacity='0';
          }}>
          <div style={{ position:'absolute', inset:0, zIndex:0 }}>
            <img src={s.img} alt={s.n} loading="lazy"
              style={{ width:'100%', height:'100%', objectFit:'cover', opacity:0.55, transition:'opacity 500ms, transform 600ms' }} />
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(9,9,8,0.82) 25%, rgba(9,9,8,0.15) 75%)' }} />
          </div>
          <div style={{ position:'relative', zIndex:1, padding:'22px', minHeight:'210px', display:'flex', flexDirection:'column', justifyContent:'flex-end' }}>
            <div>
              <h3 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(13px,1.25vw,16px)', textTransform:'uppercase', color:'var(--white)', letterSpacing:'0.02em', marginBottom:'10px', lineHeight:1.1 }}>{s.n}</h3>
              <p className="svc-desc" style={{ fontFamily:'var(--font-body)', fontSize:'12px', lineHeight:1.7, color:'var(--white-70)', margin:0, opacity:0, transition:'opacity 300ms' }}>{s.d}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
