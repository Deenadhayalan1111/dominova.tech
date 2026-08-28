import { useState } from 'react';
import './About.css';

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
            <span className="about__tag">BUILT TO CREATE.</span>
            <h2 className="display-sm about__heading">
              Digital Products. <br />
              <span className="gold">Real-World Impact.</span>
            </h2>

            <button onClick={() => setShowDetails(!showDetails)} className="btn-gold about__btn">
              <span>{showDetails ? 'Close Details' : 'Explore About'}</span>
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
              </div>
              <div className="about__drawer-stats">
                <div className="about__drawer-stat">
                  <span className="gold display-sm">50+</span>
                  <span className="text-muted label">Projects Shipped</span>
                </div>
                <div className="about__drawer-stat">
                  <span className="gold display-sm">100+</span>
                  <span className="text-muted label">Engineers Mentored</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
