import type { CSSProperties } from 'react';

/**
 * Camera On Roll Production — director's chair brand mark.
 * Renders as an inline SVG, inherits `color` from parent (uses `currentColor`),
 * and scales cleanly at any size. Use `style` or `className` to size + color it.
 */
export function ChairLogo({
  size = 24,
  style,
  className,
  'aria-label': ariaLabel = "Camera On Roll Production",
}: {
  size?: number | string;
  style?: CSSProperties;
  className?: string;
  'aria-label'?: string;
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      role="img"
      aria-label={ariaLabel}
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      style={{ display: 'block', flexShrink: 0, ...style }}
      className={className}
    >
      {/* Backrest (top canvas panel) */}
      <rect x="20" y="9" width="24" height="6.5" rx="0.6" />

      {/* Side posts — verticals from backrest level down past seat */}
      <rect x="14" y="9" width="3.4" height="22" rx="0.4" />
      <rect x="46.6" y="9" width="3.4" height="22" rx="0.4" />

      {/* Arm rests (short horizontals connecting posts to backrest area) */}
      <rect x="17.4" y="17.5" width="4" height="2.2" rx="0.3" />
      <rect x="42.6" y="17.5" width="4" height="2.2" rx="0.3" />

      {/* Seat top bar */}
      <rect x="14" y="28" width="36" height="3.4" rx="0.4" />

      {/* Sagging canvas seat — subtle curve below the seat bar */}
      <path d="M14 31.4 C 24 35.6, 40 35.6, 50 31.4 L 50 33.4 C 40 37.4, 24 37.4, 14 33.4 Z" />

      {/* X cross-legs */}
      <path d="M15.8 33.4 L 49 56.4 L 46.4 58.2 L 13.2 35.2 Z" />
      <path d="M48.2 33.4 L 15 56.4 L 17.6 58.2 L 50.8 35.2 Z" />
    </svg>
  );
}
