'use client';
import { WorkWithUs } from '@/components/WorkWithUs';
import { Scroll3D } from '@/components/Scroll3D';

export default function ContactPage() {
  return (
    <section id="form" style={{ paddingTop:'calc(var(--nav-h) + clamp(40px,5vw,72px))', background:'var(--black)' }}>
      <Scroll3D intensity={0.4}>
        <WorkWithUs />
      </Scroll3D>
    </section>
  );
}
