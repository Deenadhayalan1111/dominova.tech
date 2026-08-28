import { useState } from 'react';
import './Process.css';

interface Checkpoint {
  num: string;
  title: string;
  tagline: string;
}

const checkpoints: Checkpoint[] = [
  { num: '01', title: 'DISCOVER', tagline: 'Requirements audit & strategic scoping' },
  { num: '02', title: 'PLAN', tagline: 'Architecture blueprint & milestone roadmap' },
  { num: '03', title: 'DESIGN', tagline: 'Figma wireframes & interactive design systems' },
  { num: '04', title: 'DEVELOP', tagline: 'Enterprise clean-code implementation' },
  { num: '05', title: 'TEST', tagline: 'Automated QA & vulnerability security audits' },
  { num: '06', title: 'DEPLOY', tagline: 'Cloud infrastructure setup & launch' },
  { num: '07', title: 'SCALE', tagline: '24/7 post-launch monitoring & expansion' },
];

export default function Process() {
  const [activeIdx, setActiveIdx] = useState(0);
  const current = checkpoints[activeIdx];

  return (
    <section id="process" className="section process">
      <div className="container">
        <div className="section-label">HOW PROJECTS MOVE</div>
        <h2 className="display-sm process__title">Engineering Tunnel &mdash; 7 Checkpoints</h2>

        {/* Visual Tunnel Node Track */}
        <div className="process__track">
          {checkpoints.map((cp, idx) => {
            const isActive = idx === activeIdx;
            return (
              <button
                key={cp.num}
                onClick={() => setActiveIdx(idx)}
                className={`process__node ${isActive ? 'is-active' : ''}`}
              >
                <span className="process__node-num">{cp.num}</span>
                <span className="process__node-title">{cp.title}</span>
              </button>
            );
          })}
        </div>

        {/* Focus Checkpoint Box */}
        <div className="process__checkpoint-box">
          <div className="process__box-num">{current.num}</div>
          <h3 className="display-md process__box-title">{current.title}</h3>
          <p className="body-lg process__box-tagline">{current.tagline}</p>
        </div>
      </div>
    </section>
  );
}
