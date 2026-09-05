import { useState, useEffect } from 'react';
import { services as servicesDb } from '../../lib/data/db';
import type { Service } from '../../lib/data/types';
import './Services.css';

// Static fallback data (used if admin hasn't published any services yet)
const staticServicesData = [
  { 
    id: 'web', 
    num: '01', 
    title: 'WEB DEVELOPMENT', 
    sub: 'Polished responsive website interfaces, React & Next.js web applications with high-concurrency API integrations.', 
    image: '/images/showcase/web_dev.png', 
    tags: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'PWA'],
    details: 'Custom scalable web platforms engineered for performance, SEO optimization, responsive accessibility, and real-time backend synchronization.',
    capabilities: ['Single-Page & SSR Applications', 'API & Microservice Integration', 'Performance Tuning & Core Web Vitals', 'Role-Based Access Control']
  },
  { 
    id: 'app', 
    num: '02', 
    title: 'APP DEVELOPMENT', 
    sub: 'Fluid cross-platform mobile apps for iOS and Android with native performance and custom micro-interactions.', 
    image: '/images/showcase/app_dev.png', 
    tags: ['Flutter', 'React Native', 'iOS', 'Android', 'Firebase'],
    details: 'Native-feel mobile apps built with Flutter and React Native, featuring offline-first storage, push notification triggers, and store deployments.',
    capabilities: ['Cross-Platform iOS & Android', 'Offline Synchronization', 'Biometric Authentication', 'App Store Publishing']
  },
  { 
    id: 'uiux', 
    num: '03', 
    title: 'UI / UX DESIGN', 
    sub: 'Design systems, wireframes, interface component libraries, and interactive high-fidelity prototypes.', 
    image: '/images/showcase/ui_ux.png', 
    tags: ['Design Systems', 'Figma', 'Prototyping', 'User Research'],
    details: 'User-centric product design workflows from preliminary user journeys and wireframing to production-ready design tokens and interactive Figma prototypes.',
    capabilities: ['Modular Design Systems', 'Interactive Prototyping', 'Usability Audits', 'Developer Handoff Specs']
  },
  { 
    id: 'software', 
    num: '04', 
    title: 'CUSTOM SOFTWARE', 
    sub: 'Enterprise SaaS automation, operational dashboards, and custom business workflows.', 
    image: '/images/showcase/portfolio.png', 
    tags: ['Microservices', 'Python', 'PostgreSQL', 'Docker', 'REST APIs'],
    details: 'Bespoke enterprise backend systems, relational database modeling, automated data pipelines, and internal company management portals.',
    capabilities: ['Internal Operations Portals', 'Automated Business Logic', 'Database Migration & Indexing', 'High-Throughput Microservices']
  },
  { 
    id: 'data', 
    num: '05', 
    title: 'AI & DATA ANALYTICS', 
    sub: 'Business intelligence dashboards, predictive data models, and automated analytics.', 
    image: '/images/showcase/ai_data.png', 
    tags: ['Python', 'Pandas', 'Predictive Models', 'FastAPI', 'PowerBI'],
    details: 'Applied artificial intelligence, automated text and document parsing pipelines, data cleansing, and interactive business intelligence charts.',
    capabilities: ['Predictive Forecasting Models', 'Automated Document Extraction', 'FastAPI Data Endpoints', 'Interactive BI Dashboards']
  },
  { 
    id: 'security', 
    num: '06', 
    title: 'CLOUD & CYBERSECURITY', 
    sub: 'AWS cloud deployment, CI/CD pipeline automation, and threat monitoring dashboards.', 
    image: '/images/showcase/cybersecurity.png', 
    tags: ['AWS', 'DevOps', 'Penetration Testing', 'SIEM', 'Docker'],
    details: 'Containerized infrastructure on AWS and GCP, continuous integration/continuous deployment pipelines, and proactive security vulnerability audits.',
    capabilities: ['Automated CI/CD Pipelines', 'Docker & Container Hosting', 'Security & OWASP Auditing', 'Zero-Downtime Releases']
  },
];

interface DisplayService {
  id: string;
  num: string;
  title: string;
  sub: string;
  image: string;
  tags: string[];
  details?: string;
  capabilities?: string[];
}

function toDisplay(s: Service): DisplayService {
  return { 
    id: s.id, 
    num: s.num, 
    title: s.title, 
    sub: s.sub, 
    image: s.image || '/images/showcase/services.png', 
    tags: s.tags || [],
    details: s.description,
    capabilities: s.features || []
  };
}

export default function Services() {
  const [servicesData, setServicesData] = useState<DisplayService[]>(staticServicesData);
  const [activeIdx, setActiveIdx] = useState(0);
  const [modalService, setModalService] = useState<DisplayService | null>(null);

  useEffect(() => {
    // Try to load published services from admin CMS
    const published = servicesDb.findPublished();
    if (published.length > 0) {
      setServicesData(published.map(toDisplay));
    }
  }, []);

  const current = servicesData[activeIdx] ?? servicesData[0];
  if (!current) return null;

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

              <div className="services__actions-row">
                <button
                  onClick={() => setModalService(current)}
                  className="btn-gold services__visual-btn"
                >
                  <span>Explore Specifications</span>
                </button>
                <a href="#contact" className="btn-white services__visual-btn">
                  <span>Inquire Project</span>
                </a>
              </div>
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

        {/* Inner-Layer Service Specification Modal */}
        {modalService && (
          <div className="service-modal" role="dialog" aria-modal="true">
            <div className="service-modal__backdrop" onClick={() => setModalService(null)} />
            <div className="service-modal__card">
              <button
                onClick={() => setModalService(null)}
                className="service-modal__close"
                aria-label="Close specifications"
              >
                &times;
              </button>

              <div className="service-modal__header">
                <span className="services__tag">{modalService.num} &bull; SERVICE SPECIFICATION</span>
                <h3 className="display-sm gold" style={{ marginTop: '8px' }}>{modalService.title}</h3>
                <p className="body-md text-secondary" style={{ marginTop: '12px' }}>
                  {modalService.details || modalService.sub}
                </p>
              </div>

              <div className="service-modal__body">
                {modalService.capabilities && modalService.capabilities.length > 0 && (
                  <div className="service-modal__section">
                    <h4 className="heading-sm gold" style={{ marginBottom: '12px' }}>Core Capabilities</h4>
                    <ul className="service-modal__list">
                      {modalService.capabilities.map((cap, i) => (
                        <li key={i} className="service-modal__list-item">
                          <span className="service-modal__bullet">&bull;</span>
                          <span>{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="service-modal__section" style={{ marginTop: '20px' }}>
                  <h4 className="heading-sm gold" style={{ marginBottom: '12px' }}>Technologies</h4>
                  <div className="services__visual-tags">
                    {modalService.tags.map((t) => (
                      <span key={t} className="services__tag">{t}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="service-modal__footer">
                <a
                  href="#contact"
                  onClick={() => setModalService(null)}
                  className="btn-gold"
                >
                  <span>Request Proposal / Consultation</span>
                </a>
                <button
                  onClick={() => setModalService(null)}
                  className="btn-white"
                >
                  <span>Close Window</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
