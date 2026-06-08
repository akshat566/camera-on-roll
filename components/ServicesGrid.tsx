'use client';

import { motion } from 'framer-motion';

const EASE = [0.22, 0.58, 0.32, 1] as const;
const POP_EASE = [0.34, 1.56, 0.64, 1] as const;

export const SERVICES_DATA = [
  { n:'Brand & Influencer Reels', num:'01', img:'/Brand & Influencer thumbnail.JPG', d:'Platform-native reels and influencer content engineered for scroll-stopping engagement.' },
  { n:'Product / Commercials',    num:'02', img:'/Product or commercials.JPG', d:'High-production product films and commercials built for brand impact.' },
  { n:'Podcast',                  num:'03', img:'https://pub-4d3cad9469854486ab973729b0a3541b.r2.dev/akshat/horizontal/vidssave.com Ep_ 4 Future-Ready_ A Playbook for Engineers and Dreamers _ Kunal Shah, Founder, CRED 720P.mp4.jpg', d:'Studio-grade podcast production with cinematic visual storytelling.' },
  { n:'TVC / DVC',                num:'04', img:'/TVC OR DVC.jpeg', d:'Television and digital video commercials engineered for mass reach.' },
  { n:'2D / 3D Motion Graphic',   num:'05', img:'/Motion Graphics.jpeg', d:'Motion design that adds dimension and depth to brand communication.' },
  { n:'Ecommerce',                num:'06', img:'https://pub-4d3cad9469854486ab973729b0a3541b.r2.dev/posters/ecommerce.jpg', d:'Conversion-driven product imagery and lifestyle content for online retail.' },
  { n:'Drone Cinematography',     num:'07', img:'https://pub-4d3cad9469854486ab973729b0a3541b.r2.dev/akshat/horizontal/Emaar Final.mp4.jpg', d:'Licensed aerial filming delivering scale, movement, and perspective.' },
  { n:'AI Visual Content',        num:'08', img:'https://pub-4d3cad9469854486ab973729b0a3541b.r2.dev/akshat/vertical/default__13__1.mp4.jpg', d:'AI-enabled storytelling and generative visuals that push creative boundaries.' },
];

export function ServicesGrid() {
  return (
    <div className="svc-grid">
      {SERVICES_DATA.map((s, i) => (
        <motion.div key={s.n} className="svc-card"
          initial={{ opacity:0, y:12 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, margin:'-30px' }}
          transition={{ duration:0.4, delay:(i%4)*0.07, ease:EASE }}>
          <div className="svc-media">
            <img src={s.img} alt={s.n} loading="lazy" />
            <div className="svc-scrim" />
          </div>
          {/* Arrow affordance */}
          <span className="svc-arrow" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M2 12L12 2M12 2H5M12 2V9"/></svg>
          </span>
          <div className="svc-body">
            <h3 className="svc-title">{s.n}</h3>
            <p className="svc-desc">{s.d}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
