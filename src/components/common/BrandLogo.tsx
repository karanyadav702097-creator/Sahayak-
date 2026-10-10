import React from 'react';

interface IndianFlagEmblemProps {
  className?: string;
  width?: number | string;
  height?: number | string;
}

/**
 * Professionally designed Indian National Flag emblem (Tiranga)
 * Features accurate 3:2 proportion with:
 * - Top band: Deep Saffron (#FF9933)
 * - Middle band: Pure White (#FFFFFF)
 * - Bottom band: India Green (#138808)
 * - Center: Navy Blue (#000080) Ashoka Chakra with 24 distinct radial spokes and central hub
 */
export const IndianFlagEmblem: React.FC<IndianFlagEmblemProps> = ({
  className = '',
  width = 26,
  height = 17,
}) => {
  // Precompute 24 Ashoka Chakra radial spokes (each exactly 15 degrees apart)
  const spokes = Array.from({ length: 24 }).map((_, i) => {
    const angle = i * 15 * (Math.PI / 180);
    const x2 = 13 + 2.85 * Math.sin(angle);
    const y2 = 8.5 - 2.85 * Math.cos(angle);
    return (
      <line
        key={i}
        x1="13"
        y1="8.5"
        x2={x2.toFixed(3)}
        y2={y2.toFixed(3)}
        stroke="#000080"
        strokeWidth="0.3"
      />
    );
  });

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 26 17"
      width={width}
      height={height}
      className={`rounded-[3px] shadow-sm block ${className}`}
      role="img"
      aria-label="National Flag of India"
    >
      <title>National Flag of India</title>
      
      {/* Saffron Top Band */}
      <rect x="0" y="0" width="26" height="5.667" fill="#FF9933" />

      {/* White Middle Band */}
      <rect x="0" y="5.667" width="26" height="5.666" fill="#FFFFFF" />

      {/* India Green Bottom Band */}
      <rect x="0" y="11.333" width="26" height="5.667" fill="#138808" />

      {/* Ashoka Chakra Outer Ring */}
      <circle
        cx="13"
        cy="8.5"
        r="2.8"
        fill="none"
        stroke="#000080"
        strokeWidth="0.5"
      />

      {/* Ashoka Chakra Center Hub */}
      <circle
        cx="13"
        cy="8.5"
        r="0.75"
        fill="#000080"
      />

      {/* 24 Radial Spokes */}
      {spokes}
    </svg>
  );
};

export interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Reusable SAHAYAK AI Brand Logo Component
 * Encapsulates the Indian National Flag emblem inside the dark navy rounded-square container.
 */
export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8 rounded-lg p-1',
    md: 'w-10 h-10 rounded-xl p-1.5',
    lg: 'w-12 h-12 rounded-2xl p-2',
  }[size];

  const emblemDimensions = {
    sm: { width: 22, height: 14.5 },
    md: { width: 26, height: 17 },
    lg: { width: 32, height: 21 },
  }[size];

  return (
    <div
      className={`bg-gradient-to-tr from-[#060A12] via-[#0B1120] to-[#0F172A] border border-slate-700/80 shadow-md ring-1 ring-emerald-500/25 flex items-center justify-center group-hover:scale-105 group-hover:border-emerald-500/40 transition-all shrink-0 ${sizeClasses} ${className}`}
      aria-hidden="true"
    >
      <IndianFlagEmblem
        width={emblemDimensions.width}
        height={emblemDimensions.height}
      />
    </div>
  );
};
