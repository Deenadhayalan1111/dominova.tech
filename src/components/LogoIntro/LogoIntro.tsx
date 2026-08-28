import React, { useEffect, useState, useRef } from 'react';
import './LogoIntro.css';

interface LogoIntroProps {
  onComplete?: () => void;
}

export const LogoIntro: React.FC<LogoIntroProps> = ({ onComplete }) => {
  const [visible, setVisible] = useState(true);
  const [animating, setAnimating] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if intro has already played in this browser session
    const hasSeenIntro = sessionStorage.getItem('dominova_intro_seen');
    const isReload = performance.getEntriesByType('navigation')[0]
      ? (performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming).type === 'reload'
      : true;

    // Show intro if full reload or first visit in session
    if (hasSeenIntro && !isReload) {
      setVisible(false);
      setAnimating(false);
      if (onComplete) onComplete();
      return;
    }

    sessionStorage.setItem('dominova_intro_seen', 'true');

    // Sequence timer: 2.2 seconds total animation
    const timer = setTimeout(() => {
      setAnimating(false);
      setTimeout(() => {
        setVisible(false);
        if (onComplete) onComplete();
      }, 500); // 500ms fade out
    }, 2200);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div
      ref={containerRef}
      className={`logo-intro ${!animating ? 'logo-intro--exit' : ''}`}
      aria-label="Dominova Brand Reveal"
    >
      {/* Background Ambient Gold Light */}
      <div className="logo-intro__glow" />

      {/* Intro Graphic Container */}
      <div className="logo-intro__content">
        {/* 3-Hexagon Triad Emblem */}
        <div className="logo-intro__emblem">
          <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="introGold1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF3B0" />
                <stop offset="30%" stopColor="#E6C766" />
                <stop offset="65%" stopColor="#D4AF37" />
                <stop offset="100%" stopColor="#996515" />
              </linearGradient>
              <linearGradient id="introGold2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFE29F" />
                <stop offset="50%" stopColor="#C9A227" />
                <stop offset="100%" stopColor="#8A5A00" />
              </linearGradient>
              <linearGradient id="introGold3" x1="50%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" stopColor="#FFF7D6" />
                <stop offset="40%" stopColor="#D4AF37" />
                <stop offset="100%" stopColor="#B38728" />
              </linearGradient>

              {/* Metallic Light Sweep Shimmer */}
              <linearGradient id="sweepGradient" x1="-100%" y1="0%" x2="200%" y2="0%">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="40%" stopColor="transparent" />
                <stop offset="50%" stopColor="rgba(255, 255, 255, 0.85)" />
                <stop offset="60%" stopColor="transparent" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>

            {/* Top Hexagon */}
            <path
              className="hex hex--top"
              d="M200 15 L248 42.7 L248 98.3 L200 126 L152 98.3 L152 42.7 Z"
              fill="url(#introGold1)"
              stroke="#FFE699"
              strokeWidth="1.5"
            />

            {/* Bottom Left Hexagon */}
            <path
              className="hex hex--left"
              d="M135 128 L183 155.7 L183 211.3 L135 239 L87 211.3 L87 155.7 Z"
              fill="url(#introGold2)"
              stroke="#FFE699"
              strokeWidth="1.5"
            />

            {/* Bottom Right Hexagon */}
            <path
              className="hex hex--right"
              d="M265 128 L313 155.7 L313 211.3 L265 239 L217 211.3 L217 155.7 Z"
              fill="url(#introGold3)"
              stroke="#FFE699"
              strokeWidth="1.5"
            />
          </svg>
        </div>

        {/* Wordmark Reveal */}
        <h1 className="logo-intro__wordmark">
          DOMINOVA
          <span className="logo-intro__sweep" />
        </h1>

        {/* Tagline */}
        <p className="logo-intro__subtext">TECHNOLOGY &bull; SOLUTIONS &bull; LEARNING</p>
      </div>
    </div>
  );
};

export default LogoIntro;
