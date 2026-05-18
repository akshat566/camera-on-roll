'use client';

import { Reveal } from '@/components/Reveal';

const brands = [
  'Engage · ITC', 'Maybelline', "L'Oréal Paris", 'Cornetto', 'Breezer',
  'Sofy', 'Lotto', 'Sony Liv', 'Flipkart', 'Matrix',
  'Tresemmé', 'Lavie World', 'Artize',
];

const artists = [
  'Artist', 'Artist', 'Artist', 'Artist', 'Artist', 'Artist', 'Artist', 'Artist', 'Artist', 'Artist',
  'Artist', 'Artist', 'Artist', 'Artist', 'Artist', 'Artist', 'Artist', 'Artist', 'Artist', 'Artist',
];

export default function ClientsPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* Header */}
      <section className="pt-28 md:pt-40 xl:pt-52 pb-20 md:pb-28 xl:pb-36">
        <div className="max-w-[var(--max-w)] mx-auto px-6 md:px-[52px] xl:px-[80px] text-center">
          <Reveal>
            <p className="text-[10.5px] font-semibold tracking-[0.26em] uppercase text-[var(--accent)] mb-4">Trusted By</p>
            <h1 className="text-[clamp(40px,8vw,120px)] font-black leading-[0.92] tracking-[-0.02em] uppercase text-[var(--cream)]">
              Brands &<br />Collaborators
            </h1>
          </Reveal>
        </div>
      </section>

      {/* Brand Marquee */}
      <section className="py-12 border-y border-[var(--border)]">
        <div className="overflow-hidden">
          <div className="animate-marquee flex gap-14 whitespace-nowrap">
            {[...brands, ...brands].map((brand, i) => (
              <span key={i} className="text-[13px] font-bold tracking-[0.2em] uppercase text-[var(--cream-dim)] flex-shrink-0">{brand}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Artists & Collaborators */}
      <section className="py-20 md:py-28 xl:py-40">
        <div className="max-w-[var(--max-w)] mx-auto px-6 md:px-[52px] xl:px-[80px] text-center">
          <Reveal>
            <p className="text-[10.5px] font-semibold tracking-[0.26em] uppercase text-[var(--cream-faint)] mb-8">Artists & Collaborators</p>
            <div className="flex flex-wrap justify-center gap-3">
              {artists.map((artist, i) => (
                <span
                  key={i}
                  className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[var(--cream-dim)] px-5 py-2.5 border border-[var(--border)] hover:border-[var(--accent)] transition-colors duration-200 cursor-default"
                >
                  🎵 {artist}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
