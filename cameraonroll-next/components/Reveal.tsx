'use client';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: 'up' | 'fade';
}

export function Reveal({ children, delay = 0, className = '', direction = 'up' }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: direction === 'up' ? 24 : 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-48px' }}
      transition={{ duration: 0.88, delay, ease: [0.22, 0.58, 0.32, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
