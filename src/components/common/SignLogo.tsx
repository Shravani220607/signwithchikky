import React from 'react';

export type LogoVariant = 'wordmark' | 'icon' | 'vertical';

interface SignLogoProps {
  className?: string;
  variant?: LogoVariant;
  size?: 'sm' | 'md' | 'lg' | number;
  textColor?: 'dark' | 'light';
  showSubtitle?: boolean;
  onClick?: () => void;
}

/**
 * Minimal ISL-inspired hand icon:
 * - Thumb, index finger, and pinky extended
 * - Middle and ring fingers folded
 * - Clean geometric silhouette in Primary Red (#DC2626)
 */
export const MinimalHandIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 32,
  className = ''
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
      aria-label="Indian Sign Language Hand Icon"
      role="img"
    >
      <defs>
        <mask id="isl-hand-mask">
          <rect width="100" height="100" fill="white" />
          {/* Thumb crease cut */}
          <path d="M38 52 C42 55 46 59 50 63" stroke="black" strokeWidth="3" strokeLinecap="round" />
          {/* Folded middle finger loop */}
          <rect x="48" y="34" width="8.5" height="18" rx="4.25" fill="none" stroke="black" strokeWidth="3.2" />
          {/* Folded ring finger loop */}
          <rect x="58.5" y="34" width="8.5" height="18" rx="4.25" fill="none" stroke="black" strokeWidth="3.2" />
          {/* Lower palm horizontal base line */}
          <path d="M47 56 C53 58 64 58 69 56" stroke="black" strokeWidth="3" strokeLinecap="round" />
          {/* Wrist separation line */}
          <path d="M40 79 C48 81 58 81 67 79" stroke="black" strokeWidth="3" strokeLinecap="round" />
        </mask>
      </defs>
      <g mask="url(#isl-hand-mask)">
        {/* Main Hand Silhouette: Thumb, Index, Pinky extended, Center folded */}
        <path
          d="
            M41.5 76.5
            C33.5 67.5 27.5 57.5 24 50
            C21.5 44.5 25 41.5 29 43.5
            L38 49
            C37.5 44.5 36.5 29.5 35.5 22
            C34.5 15 42.5 14 43.5 21
            L45.5 45.5
            C47 45.5 50 45.5 51.5 45.5
            C52 41.5 53 34.5 53 33.5
            C53.5 28.5 59.5 28.5 60 33.5
            L60.5 45.5
            C61 41.5 62 34.5 62 33.5
            C62.5 28.5 68.5 28.5 69 33.5
            L69.5 47
            L72 29.5
            C73 22.5 81 24 80 31
            C78 41.5 74.5 55.5 71.5 64.5
            C69.5 70.5 67 74.5 65.5 76.5
            Z
          "
          fill="#DC2626"
        />
        {/* Wrist base */}
        <path d="M41.5 81.5 H65.5 V89 C65.5 90.5 64.5 91.5 63 91.5 H44 C42.5 91.5 41.5 90.5 41.5 89 V81.5 Z" fill="#DC2626" />
      </g>
    </svg>
  );
};

export const SignLogo: React.FC<SignLogoProps> = ({
  className = '',
  variant = 'wordmark',
  size = 'md',
  textColor = 'dark',
  showSubtitle = true,
  onClick
}) => {
  const pixelSize = typeof size === 'number' ? size : size === 'sm' ? 28 : size === 'lg' ? 44 : 36;
  const isLightText = textColor === 'light';

  if (variant === 'icon') {
    return (
      <div
        onClick={onClick}
        className={`inline-flex items-center justify-center select-none ${onClick ? 'cursor-pointer' : ''} ${className}`}
        style={{ width: pixelSize, height: pixelSize }}
      >
        <MinimalHandIcon size={pixelSize} />
      </div>
    );
  }

  if (variant === 'vertical') {
    return (
      <div
        onClick={onClick}
        className={`flex flex-col items-center text-center gap-2 select-none ${onClick ? 'cursor-pointer' : ''} ${className}`}
      >
        <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-neutral-200 flex items-center justify-center p-2">
          <MinimalHandIcon size={38} />
        </div>
        <div className="flex flex-col items-center">
          <span className={`font-black tracking-tight text-2xl ${isLightText ? 'text-white' : 'text-[#1A1A1A]'}`}>
            SignWith<span className="text-[#DC2626]">Chikky</span>
          </span>
          {showSubtitle && (
            <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mt-0.5">
              Indian Sign Language
            </span>
          )}
        </div>
      </div>
    );
  }

  // Wordmark
  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-2.5 select-none ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      <div className="w-9 h-9 rounded-xl bg-white border border-neutral-200 shadow-2xs flex items-center justify-center shrink-0">
        <MinimalHandIcon size={24} />
      </div>
      <div className="flex flex-col">
        <span
          className={`font-black tracking-tight leading-none text-lg sm:text-xl ${
            isLightText ? 'text-white' : 'text-[#1A1A1A]'
          }`}
        >
          SignWith<span className="text-[#DC2626]">Chikky</span>
        </span>
        {showSubtitle && (
          <span
            className={`text-[9px] font-bold uppercase tracking-wider mt-0.5 leading-none ${
              isLightText ? 'text-neutral-400' : 'text-neutral-500'
            }`}
          >
            Indian Sign Language
          </span>
        )}
      </div>
    </div>
  );
};
