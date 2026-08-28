import './WhyDominova.css';

const reasons = [
  {
    icon: '⚡',
    title: 'Industry Mentorship',
    desc: 'Learn directly from experienced software engineers working on real client codebases.',
  },
  {
    icon: '🛡️',
    title: 'Production-Grade Quality',
    desc: 'Every application and internship assignment adheres to enterprise coding standards.',
  },
  {
    icon: '🚀',
    title: 'Fast & Reliable Delivery',
    desc: 'Agile development workflows that keep business projects on schedule and within scope.',
  },
  {
    icon: '📐',
    title: 'Secure & Scalable',
    desc: 'Cloud-first architecture built with zero-trust security and auto-scaling mechanisms.',
  },
  {
    icon: '💻',
    title: '100% Hands-on Projects',
    desc: 'No theoretical dummy work—students and engineers build production-ready applications.',
  },
  {
    icon: '🎓',
    title: 'Career Advancement',
    desc: 'Verified completion certificates, portfolio reviews, and targeted interview preparation.',
  },
];

export default function WhyDominova() {
  return (
    <section className="section why-dominova">
      <div className="container">
        <div className="section-label">WHY DOMINOVA</div>
        <h2 className="display-sm why-dominova__title">
          Built for Excellence, Driven by Real Results
        </h2>

        <div className="why-dominova__grid">
          {reasons.map((item, idx) => (
            <div key={idx} className="why-dominova__card">
              <div className="why-dominova__icon-wrap">{item.icon}</div>
              <h3 className="why-dominova__card-title">{item.title}</h3>
              <p className="why-dominova__card-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
