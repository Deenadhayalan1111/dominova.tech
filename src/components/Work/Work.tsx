import { useState, useEffect } from 'react';
import { projects as projectsDb } from '../../lib/data/db';
import type { Project } from '../../lib/data/types';
import './Work.css';

interface ShowcaseProject {
  id: string;
  title: string;
  category: string;
  image: string;
}

// Static fallback data
const staticProjects: ShowcaseProject[] = [
  { id: 'proj-1', title: 'ENTERPRISE SAAS ANALYTICS', category: 'Custom Software Architecture', image: '/images/showcase/portfolio.png' },
  { id: 'proj-2', title: 'RESPONSIVE WEB ECOSYSTEM', category: 'Full-Stack Web Engineering', image: '/images/showcase/web_dev.png' },
  { id: 'proj-3', title: 'CROSS-PLATFORM MOBILE APPLICATION', category: 'iOS & Android App Engineering', image: '/images/showcase/app_dev.png' },
];

function toDisplay(p: Project): ShowcaseProject {
  return { id: p.id, title: p.title.toUpperCase(), category: p.category, image: p.image || '/images/showcase/portfolio.png' };
}

export default function Work() {
  const [portfolioProjects, setPortfolioProjects] = useState<ShowcaseProject[]>(staticProjects);
  const [activeIdx, setActiveIdx] = useState(0);

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

              <a href="#contact" className="btn-gold work__spatial-btn">
                <span>View Project</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
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
      </div>
    </section>
  );
}
