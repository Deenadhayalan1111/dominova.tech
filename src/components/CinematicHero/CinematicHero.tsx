import { useEffect, useRef } from 'react';
import './CinematicHero.css';

interface CinematicHeroProps {
  onOpenInternshipModal?: () => void;
}

export default function CinematicHero({ onOpenInternshipModal }: CinematicHeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particleCount = Math.min(Math.floor(width / 22), 65);
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 1.5 + 0.8,
      alpha: Math.random() * 0.6 + 0.2,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 55, ${p.alpha})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            const lineAlpha = (1 - dist / 130) * 0.18;
            ctx.strokeStyle = `rgba(212, 175, 55, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero">
      <canvas ref={canvasRef} className="hero__canvas" aria-hidden="true" />
      <div className="hero__ambient-glow" aria-hidden="true" />

      <div className="container hero__container">
        <div className="hero__badge">
          <span className="hero__badge-dot" />
          <span className="hero__badge-text">DOMINOVA &bull; DIGITAL SHOWROOM</span>
        </div>

        {/* Minimal High-Impact Headline */}
        <h1 className="hero__title">
          WE BUILD <br />
          <span className="hero__title-gold">DIGITAL EXPERIENCES</span>
        </h1>

        <p className="hero__subtitle">
          Enterprise software development &bull; High-performance web systems &bull; Industry internships
        </p>

        {/* Primary Action */}
        <div className="hero__actions">
          <button onClick={() => scrollTo('#contact')} className="btn-gold hero__btn">
            <span>Start a Project</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>

          {onOpenInternshipModal && (
            <button onClick={onOpenInternshipModal} className="btn-white hero__btn">
              <span>Apply for Internship</span>
            </button>
          )}
        </div>

        {/* Scroll Indicator */}
        <div className="hero__scroll-indicator">
          <span className="hero__scroll-text">SCROLL TO ENTER</span>
          <div className="hero__scroll-line" />
        </div>
      </div>
    </section>
  );
}
