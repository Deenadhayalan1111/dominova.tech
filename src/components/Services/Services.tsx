import { useState } from 'react';
import './Services.css';

interface ServiceVisual {
  id: string;
  num: string;
  title: string;
  sub: string;
  image: string;
  tags: string[];
}

const servicesData: ServiceVisual[] = [
  {
    id: 'web',
    num: '01',
    title: 'WEB DEVELOPMENT',
    sub: 'Polished responsive website interfaces, React & Next.js web applications.',
    image: '/images/showcase/web_dev.png',
    tags: ['React', 'Next.js', 'Node.js', 'PWA'],
  },
  {
    id: 'app',
    num: '02',
    title: 'APP DEVELOPMENT',
    sub: 'Fluid cross-platform mobile apps for iOS and Android with custom UI.',
    image: '/images/showcase/app_dev.png',
    tags: ['Flutter', 'React Native', 'iOS', 'Android'],
  },
  {
    id: 'uiux',
    num: '03',
    title: 'UI / UX DESIGN',
    sub: 'Design systems, wireframes, interface component libraries, and interactive prototypes.',
    image: '/images/showcase/ui_ux.png',
    tags: ['Design Systems', 'Figma', 'Prototyping'],
  },
  {
    id: 'software',
    num: '04',
    title: 'CUSTOM SOFTWARE',
    sub: 'Enterprise SaaS automation, operational dashboards, and custom business workflows.',
    image: '/images/showcase/portfolio.png',
    tags: ['Microservices', 'Python', 'PostgreSQL', 'Docker'],
  },
  {
    id: 'data',
    num: '05',
    title: 'AI & DATA ANALYTICS',
    sub: 'Business intelligence dashboards, predictive data models, and automated analytics.',
    image: '/images/showcase/ai_data.png',
    tags: ['Python', 'Pandas', 'Predictive Models', 'PowerBI'],
  },
  {
    id: 'security',
    num: '06',
    title: 'CLOUD & CYBERSECURITY',
    sub: 'AWS cloud deployment, CI/CD pipeline automation, and threat monitoring dashboards.',
    image: '/images/showcase/cybersecurity.png',
    tags: ['AWS', 'DevOps', 'Penetration Testing', 'SIEM'],
  },
];

export default function Services() {
  const [activeIdx, setActiveIdx] = useState(0);
  const current = servicesData[activeIdx];

  return (
    <section id="services" className="section services">
      <div className="container">
        <div className="section-label">WHAT WE BUILD</div>
        <h2 className="display-sm services__title">Capabilities & Digital Solutions</h2>

        {/* Purpose-Built Visual Showcase Deck */}
        <div className="services__showcase">
          <div className="services__visual-pane">
            <img src={current.image} alt={current.title} className="services__visual-img" />
            <div className="services__visual-gradient" />

            <div className="services__visual-overlay">
              <span className="services__visual-num">{current.num}</span>
              <h3 className="display-sm services__visual-title">{current.title}</h3>
              <p className="body-md services__visual-sub">{current.sub}</p>

              <div className="services__visual-tags">
                {current.tags.map((tag) => (
                  <span key={tag} className="services__tag">
                    {tag}
                  </span>
                ))}
              </div>

              <a href="#contact" className="btn-gold services__visual-btn">
                <span>Inquire Project</span>
              </a>
            </div>
          </div>

          {/* Selector Tabs */}
          <div className="services__tabs">
            {servicesData.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setActiveIdx(idx)}
                className={`services__tab-btn ${idx === activeIdx ? 'is-active' : ''}`}
              >
                <span className="services__tab-num">{item.num}</span>
                <span className="services__tab-title">{item.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
