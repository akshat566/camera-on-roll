import type { CSSProperties } from 'react';

/**
 * Camera On Roll Production — director's chair brand mark.
 * Renders the transparent chair PNG from `/public/chair.png` (cropped, no background).
 * The `style.color` prop is not respected (PNG is fixed-colour).
 */
export function ChairLogo({
  size = 24,
  style,
  className,
  'aria-label': ariaLabel = 'Camera On Roll Production',
}: {
  size?: number | string;
  style?: CSSProperties;
  className?: string;
  'aria-label'?: string;
}) {
  return (
    <img
      src="/chair.png"
      alt={ariaLabel}
      width={typeof size === 'number' ? size : undefined}
      height={typeof size === 'number' ? size : undefined}
      style={{
        display: 'block',
        flexShrink: 0,
        width: typeof size === 'string' ? size : `${size}px`,
        height: typeof size === 'string' ? size : `${size}px`,
        objectFit: 'contain',
        ...style,
      }}
      className={className}
    />
  );
}
