'use client';
import { WorkWithUs } from '@/components/WorkWithUs';

export default function ContactPage() {
  return (
    <section id="form" style={{ paddingTop:'calc(var(--nav-h) + clamp(40px,5vw,72px))', background:'var(--black)' }}>
      <WorkWithUs />
    </section>
  );
}
