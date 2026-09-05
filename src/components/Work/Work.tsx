import { useState, useEffect } from 'react';
import { projects as projectsDb } from '../../lib/data/db';
import type { Project } from '../../lib/data/types';
import './Work.css';

interface ShowcaseProject {
  id: string;
  title: string;
  category: string;
  image: string;
  desc?: string;
  techs?: string[];
  architecture?: string;
  features?: string[];
}

// Static fallback data
const staticProjects: ShowcaseProject[] = [
  { 
    id: 'proj-1', 
    title: 'ENTERPRISE SAAS ANALYTICS', 
    category: 'Custom Software Architecture', 
    image: '/images/showcase/portfolio.png',
    desc: 'High-throughput operations portal featuring real-time telemetry, role-based access management, and automated reporting dashboards.',
    techs: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'Redis', 'Docker'],
    architecture: 'Microservices architecture with PostgreSQL clustering and Redis caching layer.',
    features: ['Real-time WebSocket data synchronization', 'Sub-100ms API response times', 'Role-Based Access Control (RBAC)']
  },
  { 
    id: 'proj-2', 
    title: 'RESPONSIVE WEB ECOSYSTEM', 
    category: 'Full-Stack Web Engineering', 
    image: '/images/showcase/web_dev.png',
    desc: 'Bespoke customer platforms engineered for optimal Core Web Vitals, high-speed page loads, and seamless multi-device responsiveness.',
    techs: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Node.js'],
    architecture: 'Server-Side Rendered (SSR) Next.js frontend with decoupled REST API gateway.',
    features: ['High-performance SEO & Core Web Vitals', 'Modular design system components', 'Accessible keyboard navigation']
  },
  { 
    id: 'proj-3', 
    title: 'CROSS-PLATFORM MOBILE APPLICATION', 
    category: 'iOS & Android App Engineering', 
    image: '/images/showcase/app_dev.png',
    desc: 'Native-performance mobile application engineered with Flutter, featuring biometric security, offline caching, and real-time cloud data sync.',
    techs: ['Flutter', 'Dart', 'Firebase', 'GraphQL', 'iOS', 'Android'],
    architecture: 'Bloc state management with offline-first SQLite database and GraphQL synchronization.',
    features: ['Biometric authentication (FaceID / Fingerprint)', 'Offline-first data persistence', 'Real-time push notifications']
  },
];

function toDisplay(p: Project): ShowcaseProject {
  return { 
    id: p.id, 
    title: p.title.toUpperCase(), 
    category: p.category, 
    image: p.image || '/images/showcase/portfolio.png',
    desc: p.description || p.shortDescription,
    techs: p.technologies || [],
    architecture: 'Engineered with clean architectural separation and automated testing.',
    features: ['Production deployment workflow', 'Comprehensive error monitoring']
  };
}

export default function Work() {
  const [portfolioProjects, setPortfolioProjects] = useState<ShowcaseProject[]>(staticProjects);
  const [activeIdx, setActiveIdx] = useState(0);
  const [selectedProject, setSelectedProject] = useState<ShowcaseProject | null>(null);

  useEffect(() => {
    // Load published projects from admin CMS
    const published = projectsDb.findPublished();
    if (published.length > 0) {
      setPortfolioProjects(published.map(toDisplay));
    }
  }, []);

  const project = portfolioProjects[activeIdx] ?? portfolioProjects[0];
  if (!project) return null;

  return (
    <section id="portfolio" className="section work">
      <div className="container">
        <div className="section-label">WHAT WE'VE CREATED</div>
        <h2 className="display-sm work__title">Spatial Project Gallery</h2>

        {/* Purpose-Built Spatial Project Showcase Plane */}
        <div className="work__spatial-stage">
          <div className="work__spatial-plane">
            <img src={project.image} alt={project.title} className="work__spatial-img" />
            <div className="work__spatial-gradient" />

            <div className="work__spatial-overlay">
              <span className="work__spatial-cat">{project.category}</span>
              <h3 className="display-md work__spatial-title">{project.title}</h3>

              <div className="work__actions-row">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="btn-gold work__spatial-btn"
                >
                  <span>View Project Architecture</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
                <a href="#contact" className="btn-white work__spatial-btn">
                  <span>Inquire Similar Project</span>
                </a>
              </div>
            </div>
          </div>

          {/* Project Switcher Bar */}
          <div className="work__switcher">
            {portfolioProjects.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => setActiveIdx(idx)}
                className={`work__switcher-btn ${idx === activeIdx ? 'is-active' : ''}`}
              >
                <span className="work__switcher-num">0{idx + 1}</span>
                <span className="work__switcher-title">{p.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Inner-Layer Project Architecture Modal */}
        {selectedProject && (
          <div className="project-modal" role="dialog" aria-modal="true">
            <div className="project-modal__backdrop" onClick={() => setSelectedProject(null)} />
            <div className="project-modal__card">
              <button
                onClick={() => setSelectedProject(null)}
                className="project-modal__close"
                aria-label="Close architecture details"
              >
                &times;
              </button>

              <div className="project-modal__header">
                <span className="services__tag">{selectedProject.category}</span>
                <h3 className="display-sm gold" style={{ marginTop: '10px' }}>{selectedProject.title}</h3>
                <p className="body-md text-secondary" style={{ marginTop: '12px' }}>
                  {selectedProject.desc}
                </p>
              </div>

              <div className="project-modal__body">
                {selectedProject.architecture && (
                  <div className="project-modal__section">
                    <h4 className="heading-sm gold" style={{ marginBottom: '8px' }}>System Architecture</h4>
                    <p className="body-md text-secondary" style={{ background: 'var(--color-surface-2)', padding: '14px', borderRadius: '4px', border: '1px solid var(--color-border-light)' }}>
                      {selectedProject.architecture}
                    </p>
                  </div>
                )}

                {selectedProject.features && (
                  <div className="project-modal__section" style={{ marginTop: '20px' }}>
                    <h4 className="heading-sm gold" style={{ marginBottom: '10px' }}>Key Engineering Highlights</h4>
                    <ul className="intern-detail-modal__list">
                      {selectedProject.features.map((f, i) => (
                        <li key={i} className="intern-detail-modal__list-item">
                          <span className="gold">&check;</span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedProject.techs && (
                  <div className="project-modal__section" style={{ marginTop: '20px' }}>
                    <h4 className="heading-sm gold" style={{ marginBottom: '10px' }}>Technologies</h4>
                    <div className="services__visual-tags">
                      {selectedProject.techs.map((t) => (
                        <span key={t} className="services__tag">{t}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="project-modal__footer">
                <a
                  href="#contact"
                  onClick={() => setSelectedProject(null)}
                  className="btn-gold"
                >
                  <span>Discuss Engineering Scope</span>
                </a>
                <button
                  onClick={() => setSelectedProject(null)}
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
