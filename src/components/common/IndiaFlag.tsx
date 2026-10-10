import React from 'react';

interface IndiaFlagProps {
  className?: string;
  width?: number | string;
  height?: number | string;
  title?: string;
}

/**
 * Authentic Indian National Flag SVG component (Tiranga)
 * Features official proportions:
 * - Top band: Saffron (#FF9933 / Deep Saffron #FF671F)
 * - Middle band: White (#FFFFFF)
 * - Bottom band: India Green (#046A38)
 * - Center: Navy Blue (#000080) Ashoka Chakra with 24 distinct spokes
 */
export const IndiaFlag: React.FC<IndiaFlagProps> = ({
  className = 'rounded-xs shadow-2xs inline-block align-middle',
  width = 24,
  height = 16,
  title = 'National Flag of India',
}) => {
  // Generate 24 spokes for Ashoka Chakra (each spaced 15 degrees apart)
  const spokes = Array.from({ length: 24 }).map((_, i) => {
    const angle = i * 15 * (Math.PI / 180);
    const x2 = 12 + 2.5 * Math.sin(angle);
    const y2 = 8 - 2.5 * Math.cos(angle);
    return (
      <line
        key={i}
        x1="12"
        y1="8"
        x2={x2.toFixed(3)}
        y2={y2.toFixed(3)}
        stroke="#000080"
        strokeWidth="0.25"
      />
    );
  });

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 16"
      width={width}
      height={height}
      className={className}
      role="img"
      aria-label={title}
    >
      <title>{title}</title>
      {/* Saffron Band */}
      <rect x="0" y="0" width="24" height="5.333" fill="#FF9933" />
      {/* White Middle Band */}
      <rect x="0" y="5.333" width="24" height="5.334" fill="#FFFFFF" />
      {/* India Green Band */}
      <rect x="0" y="10.667" width="24" height="5.333" fill="#138808" />

      {/* Ashoka Chakra Outer Ring */}
      <circle cx="12" cy="8" r="2.5" fill="none" stroke="#000080" strokeWidth="0.45" />

      {/* Ashoka Chakra Center Hub */}
      <circle cx="12" cy="8" r="0.65" fill="#000080" />

      {/* 24 Radial Spokes */}
      {spokes}
    </svg>
  );
};
