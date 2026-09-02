import React from 'react';

interface DominovaLogoProps {
  className?: string;
  height?: number | string;
  showText?: boolean;
  animated?: boolean;
}

export const DominovaLogo: React.FC<DominovaLogoProps> = ({
  className = '',
  height = 40,
  showText = true,
  animated = false,
}) => {
  return (
    <div
      className={`dominova-logo-wrap ${animated ? 'dominova-logo-wrap--animated' : ''} ${className}`}
      style={{ display: 'inline-flex', alignItems: 'center', gap: '14px', height: height }}
    >
      <svg
        viewBox="0 0 400 360"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ height: '100%', width: 'auto', maxHeight: '100%' }}
        aria-label="Dominova Logo Emblem"
      >
        <defs>
          {/* Metallic Gold Gradient 1 */}
          <linearGradient id="goldGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF3B0" />
            <stop offset="25%" stopColor="#E6C766" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="75%" stopColor="#996515" />
            <stop offset="100%" stopColor="#F3E5AB" />
          </linearGradient>

          {/* Metallic Gold Gradient 2 */}
          <linearGradient id="goldGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFE29F" />
            <stop offset="40%" stopColor="#C9A227" />
            <stop offset="80%" stopColor="#8A5A00" />
            <stop offset="100%" stopColor="#E6C766" />
          </linearGradient>

          {/* Metallic Gold Gradient 3 */}
          <linearGradient id="goldGradient3" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#FFF7D6" />
            <stop offset="35%" stopColor="#D4AF37" />
            <stop offset="70%" stopColor="#B38728" />
            <stop offset="100%" stopColor="#F3E5AB" />
          </linearGradient>

          {/* Gold Glow Filter */}
          <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 
          DOMINOVA TRIAD EMBLEM:
          Three regular rounded hexagons stacked symmetrically:
          Top Hexagon: Center (200, 75)
          Bottom Left Hexagon: Center (135, 185)
          Bottom Right Hexagon: Center (265, 185)
        */}
        <g className="dominova-logo-mark" filter="url(#goldGlow)">
          {/* Top Hexagon */}
          <path
            d="M200 15 L248 42.7 L248 98.3 L200 126 L152 98.3 L152 42.7 Z"
            fill="url(#goldGradient1)"
            stroke="#FFE699"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />

          {/* Bottom Left Hexagon */}
          <path
            d="M135 128 L183 155.7 L183 211.3 L135 239 L87 211.3 L87 155.7 Z"
            fill="url(#goldGradient2)"
            stroke="#FFE699"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />

          {/* Bottom Right Hexagon */}
          <path
            d="M265 128 L313 155.7 L313 211.3 L265 239 L217 211.3 L217 155.7 Z"
            fill="url(#goldGradient3)"
            stroke="#FFE699"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </g>
      </svg>

      {showText && (
        <span
          className="dominova-wordmark"
          style={{
            fontSize: '1.25rem',
          }}
        >
          DOMINOVA
        </span>
      )}
    </div>
  );
};

export default DominovaLogo;
