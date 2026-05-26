import type { CSSProperties } from 'react';

/**
 * Camera On Roll Production — director's chair brand mark.
 * Renders the user-supplied chair PNG from `/public/favicon.png`.
 * The `style.color` prop is no longer respected (PNG is fixed-colour);
 * use a white-on-dark version of the asset for dark backgrounds.
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
      src="/favicon.png"
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
