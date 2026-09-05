import { useState } from 'react';
import './About.css';

const pillars = [
  { num: '01', title: 'BUILD', desc: 'Production-grade engineering using modern React, Node.js, and Cloud backends.' },
  { num: '02', title: 'LEARN', desc: 'Industry-aligned curriculum focused on 2026 enterprise software standards.' },
  { num: '03', title: 'INNOVATE', desc: 'Integrating intelligent automation, AI pipelines, and responsive UX architectures.' },
  { num: '04', title: 'GROW', desc: 'Verifiable credentials, portfolio code reviews, and structured career readiness.' },
];

export default function About() {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <section id="about" className="section about">
      <div className="container">
        <div className="section-label">WHO WE ARE</div>

        {/* Visual Showcase Card */}
        <div className="about__showcase-card">
          <div className="about__image-wrap">
            <img
              src="/images/showcase/about.png"
              alt="Dominova Architectural Technology Showcase"
              className="about__image"
              loading="lazy"
            />
            <div className="about__image-overlay" />
          </div>

          <div className="about__content-overlay">
            <span className="about__tag">BUILT TO CREATE &bull; CHENNAI</span>
            <h2 className="display-sm about__heading">
              Digital Products. <br />
              <span className="gold">Real-World Impact.</span>
            </h2>

            <p className="body-md about__summary">
              Dominova bridges high-scale enterprise software solutions with an immersive, hands-on software development internship ecosystem.
            </p>

            <button onClick={() => setShowDetails(!showDetails)} className="btn-gold about__btn">
              <span>{showDetails ? 'Close Details' : 'Explore About & Values'}</span>
            </button>
          </div>
        </div>

        {/* Expandable Details Drawer */}
        {showDetails && (
          <div className="about__drawer">
            <div className="about__drawer-grid">
              <div>
                <h3 className="heading-lg gold">Founded 2024 &bull; Chennai, India</h3>
                <p className="body-md text-muted" style={{ marginTop: '8px' }}>
                  Dominova was founded by <strong>B. Deepak</strong> to pioneer a dual mission: engineering high-scale custom software for modern enterprises, and mentoring the next generation of engineers through hands-on internships.
                </p>

                {/* 4 Pillars Grid */}
                <div className="about__pillars-grid">
                  {pillars.map((p) => (
                    <div key={p.num} className="about__pillar-item">
                      <span className="about__pillar-num">{p.num}</span>
                      <div>
                        <h4 className="about__pillar-title">{p.title}</h4>
                        <p className="about__pillar-desc">{p.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="about__drawer-stats">
                <div className="about__drawer-stat">
                  <span className="gold display-sm">60%</span>
                  <span className="text-muted label">Enterprise Software</span>
                </div>
                <div className="about__drawer-stat">
                  <span className="gold display-sm">40%</span>
                  <span className="text-muted label">Talent Ecosystem</span>
                </div>
                <div className="about__drawer-stat">
                  <span className="gold display-sm">Chennai</span>
                  <span className="text-muted label">Tamil Nadu, India</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
