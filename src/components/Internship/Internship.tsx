import { useState } from 'react';
import './Internship.css';

interface InternshipProgram {
  id: string;
  title: string;
  duration: string;
  mode: string;
  skills: string[];
  description: string;
  modules: string[];
  capstone: string;
  deliverables: string[];
}

const programsList: InternshipProgram[] = [
  {
    id: 'web',
    title: 'Full-Stack Web Development',
    duration: '1 – 3 Months',
    mode: 'Hybrid / Remote (Chennai)',
    skills: ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
    description: 'Master frontend components, backend RESTful APIs, database indexing, and cloud hosting through real software development cycles.',
    modules: [
      'Component Architecture & State with React and TypeScript',
      'Backend API Development with Node.js & Express',
      'Database Schema Design & Query Optimization (PostgreSQL)',
      'Git Workflow, Code Reviews & Production Deployment'
    ],
    capstone: 'Enterprise Customer Portal with Real-Time Data Sync & Role-Based Access',
    deliverables: [
      'Verifiable Dominova Certificate with Credential ID',
      'Production-Ready GitHub Repository for Portfolio',
      'Official Experience & Recommendation Letter',
      '1-on-1 Code Review with Working Developers'
    ]
  },
  {
    id: 'mobile',
    title: 'Mobile App Engineering',
    duration: '1 – 3 Months',
    mode: 'Hybrid / Remote (Chennai)',
    skills: ['Flutter', 'Dart', 'React Native', 'Firebase', 'REST APIs', 'App Stores'],
    description: 'Build native-performance cross-platform iOS and Android applications with offline caching and real-time backend synchronization.',
    modules: [
      'Cross-Platform UI Layouts & Widget State Trees',
      'State Management & Native Device Integration',
      'Offline Storage & Cloud Database Synchronization',
      'Store Publishing & Release Pipelines'
    ],
    capstone: 'Cross-Platform Social Commerce or Service Booking App',
    deliverables: [
      'Verifiable Dominova Certificate with Credential ID',
      'Deployable Mobile App Codebase for Portfolio',
      'Official Experience & Recommendation Letter',
      'App Architecture Mentorship Sessions'
    ]
  },
  {
    id: 'ai',
    title: 'Data Science & Machine Learning',
    duration: '1 – 3 Months',
    mode: 'Hybrid / Remote (Chennai)',
    skills: ['Python', 'Pandas', 'NumPy', 'Scikit-Learn', 'FastAPI', 'Matplotlib'],
    description: 'Master data cleaning, exploratory data analysis, predictive statistical models, and ML API deployment in Python.',
    modules: [
      'Data Wrangling & Feature Engineering with Pandas',
      'Supervised & Unsupervised Machine Learning Models',
      'Model Evaluation, Tuning & Error Metrics',
      'Deploying Prediction Microservices with FastAPI'
    ],
    capstone: 'Predictive Business Analytics Engine with Interactive Visualizations',
    deliverables: [
      'Verifiable Dominova Certificate with Credential ID',
      'End-to-End ML Pipeline & Jupyter Notebooks',
      'Official Experience & Recommendation Letter',
      'Data Architecture & Strategy Mentorship'
    ]
  },
  {
    id: 'cyber',
    title: 'Cybersecurity & Network Defense',
    duration: '1 – 3 Months',
    mode: 'Hybrid / Remote (Chennai)',
    skills: ['Network Security', 'OWASP Top 10', 'Wireshark', 'Burp Suite', 'Linux CLI'],
    description: 'Learn vulnerability analysis, web application security testing, network defense principles, and threat mitigation methodologies.',
    modules: [
      'Network Protocols & Traffic Packet Inspection',
      'OWASP Top 10 Web Vulnerability Audits',
      'Penetration Testing Tools & Lab Exercises',
      'Security Incident Mitigation & Compliance Reporting'
    ],
    capstone: 'Comprehensive Security Assessment & Remediation Blueprint',
    deliverables: [
      'Verifiable Dominova Certificate with Credential ID',
      'Security Audit & Remediation Portfolio Report',
      'Official Experience & Recommendation Letter',
      'Hands-on Lab Guidance'
    ]
  },
  {
    id: 'uiux',
    title: 'UI/UX Design & Product Strategy',
    duration: '1 – 3 Months',
    mode: 'Hybrid / Remote (Chennai)',
    skills: ['Figma', 'Design Systems', 'Wireframing', 'Prototyping', 'User Research'],
    description: 'Structure intuitive user journeys, component-driven Figma design systems, and clickable high-fidelity prototypes ready for engineering handoff.',
    modules: [
      'User Research & Empathy Journey Mapping',
      'Information Architecture & Low-Fidelity Wireframes',
      'Design Systems & Responsive Component Libraries',
      'Interactive Micro-Animations & Developer Handoff'
    ],
    capstone: 'Complete SaaS Platform or Consumer App Design System & Prototype',
    deliverables: [
      'Verifiable Dominova Certificate with Credential ID',
      'Comprehensive Figma Case Study for Portfolio',
      'Official Experience & Recommendation Letter',
      'Design Critique & Feedback Sessions'
    ]
  },
  {
    id: 'cloud',
    title: 'Cloud Computing & DevOps',
    duration: '1 – 3 Months',
    mode: 'Hybrid / Remote (Chennai)',
    skills: ['AWS / GCP', 'Docker', 'Kubernetes', 'GitHub Actions', 'CI/CD', 'Linux'],
    description: 'Master containerization, cloud infrastructure provisioning, and automated continuous integration/continuous deployment pipelines.',
    modules: [
      'Cloud Architecture Fundamentals (Compute & Storage)',
      'Multi-Stage Docker Container Builds',
      'Automated CI/CD Pipelines with GitHub Actions',
      'Load Balancing, Reverse Proxies & Monitoring'
    ],
    capstone: 'Automated Multi-Environment CI/CD Cloud Pipeline',
    deliverables: [
      'Verifiable Dominova Certificate with Credential ID',
      'Live Cloud Infrastructure & Pipeline Repo',
      'Official Experience & Recommendation Letter',
      'DevOps Architecture Mentorship'
    ]
  }
];

interface InternshipProps {
  onApplyDomain?: (domainTitle?: string) => void;
}

export default function Internship({ onApplyDomain }: InternshipProps) {
  const [selectedProgram, setSelectedProgram] = useState<InternshipProgram | null>(null);

  const handleApply = (title: string) => {
    setSelectedProgram(null);
    if (onApplyDomain) {
      onApplyDomain(title);
    }
  };

  return (
    <section id="internship" className="section internship">
      <div className="container">
        <div className="section-label">HOW PEOPLE GROW WITH US</div>

        {/* Hero Showcase Card */}
        <div className="internship__showcase-card">
          <div className="internship__image-wrap">
            <img
              src="/images/showcase/internship.png"
              alt="Dominova Internship Developer Workspace"
              className="internship__image"
              loading="lazy"
            />
            <div className="internship__image-overlay" />
          </div>

          <div className="internship__content-overlay">
            <span className="internship__tag">CAREER LAUNCHPAD &bull; CHENNAI</span>
            <h2 className="display-lg internship__heading">
              BUILD. LEARN. GROW.
            </h2>
            <p className="body-md internship__sub">
              Hands-on engineering internships in Web, Mobile, Data Science, Cybersecurity & Cloud with senior developer mentorship.
            </p>

            <button
              onClick={() => {
                if (onApplyDomain) onApplyDomain('Full-Stack Web Development');
              }}
              className="btn-gold internship__btn"
            >
              <span>Apply for Internship</span>
            </button>
          </div>
        </div>

        {/* 6 Core Programs Grid */}
        <div className="internship__programs-header">
          <h3 className="display-sm gold" style={{ marginTop: '48px', marginBottom: '12px' }}>
            Internship Engineering Tracks
          </h3>
          <p className="body-md text-muted">
            Select a specialized engineering track to view syllabus, deliverables, and apply.
          </p>
        </div>

        <div className="internship__grid">
          {programsList.map((prog) => (
            <div key={prog.id} className="internship__card">
              <div className="internship__card-meta">
                <span className="internship__card-duration">{prog.duration}</span>
                <span className="internship__card-mode">{prog.mode}</span>
              </div>

              <h4 className="heading-lg internship__card-title">{prog.title}</h4>
              <p className="body-md internship__card-desc">{prog.description}</p>

              <div className="internship__skills-row">
                {prog.skills.slice(0, 4).map((s) => (
                  <span key={s} className="internship__skill-pill">{s}</span>
                ))}
                {prog.skills.length > 4 && (
                  <span className="internship__skill-pill">+{prog.skills.length - 4}</span>
                )}
              </div>

              <div className="internship__card-actions">
                <button
                  onClick={() => setSelectedProgram(prog)}
                  className="btn-white internship__card-btn"
                >
                  <span>View Details</span>
                </button>
                <button
                  onClick={() => handleApply(prog.title)}
                  className="btn-gold internship__card-btn"
                >
                  <span>Apply Now</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Inner-Layer Program Details Modal */}
        {selectedProgram && (
          <div className="intern-detail-modal" role="dialog" aria-modal="true">
            <div className="intern-detail-modal__backdrop" onClick={() => setSelectedProgram(null)} />
            <div className="intern-detail-modal__card">
              <button
                onClick={() => setSelectedProgram(null)}
                className="intern-detail-modal__close"
                aria-label="Close details"
              >
                &times;
              </button>

              <div className="intern-detail-modal__header">
                <div className="intern-detail-modal__tags">
                  <span className="internship__skill-pill">{selectedProgram.duration}</span>
                  <span className="internship__skill-pill">{selectedProgram.mode}</span>
                </div>
                <h3 className="display-sm gold" style={{ marginTop: '12px' }}>{selectedProgram.title}</h3>
                <p className="body-md text-secondary" style={{ marginTop: '8px' }}>
                  {selectedProgram.description}
                </p>
              </div>

              <div className="intern-detail-modal__body">
                <div className="intern-detail-modal__section">
                  <h4 className="heading-sm gold" style={{ marginBottom: '10px' }}>Technologies & Tools</h4>
                  <div className="internship__skills-row">
                    {selectedProgram.skills.map((s) => (
                      <span key={s} className="internship__skill-pill">{s}</span>
                    ))}
                  </div>
                </div>

                <div className="intern-detail-modal__section" style={{ marginTop: '20px' }}>
                  <h4 className="heading-sm gold" style={{ marginBottom: '10px' }}>Development Modules</h4>
                  <ul className="intern-detail-modal__list">
                    {selectedProgram.modules.map((m, i) => (
                      <li key={i} className="intern-detail-modal__list-item">
                        <span className="gold font-display" style={{ fontWeight: 700 }}>0{i + 1}</span>
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="intern-detail-modal__section" style={{ marginTop: '20px' }}>
                  <h4 className="heading-sm gold" style={{ marginBottom: '10px' }}>Capstone Project Deliverable</h4>
                  <p className="body-md text-secondary" style={{ background: 'var(--color-surface-2)', padding: '14px', borderRadius: '4px', border: '1px solid var(--color-border-light)' }}>
                    {selectedProgram.capstone}
                  </p>
                </div>

                <div className="intern-detail-modal__section" style={{ marginTop: '20px' }}>
                  <h4 className="heading-sm gold" style={{ marginBottom: '10px' }}>What You Will Receive</h4>
                  <ul className="intern-detail-modal__list">
                    {selectedProgram.deliverables.map((d, i) => (
                      <li key={i} className="intern-detail-modal__list-item">
                        <span className="gold">&check;</span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="intern-detail-modal__footer">
                <button
                  onClick={() => handleApply(selectedProgram.title)}
                  className="btn-gold"
                >
                  <span>Apply for this Track</span>
                </button>
                <button
                  onClick={() => setSelectedProgram(null)}
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
