import './Technology.css';

const techNodes = [
  { name: 'FRONTEND', tag: 'React / Next.js / TypeScript', icon: '⚛️' },
  { name: 'BACKEND', tag: 'Node.js / Python / Microservices', icon: '🟢' },
  { name: 'DATABASE', tag: 'PostgreSQL / MongoDB / Redis', icon: '🛢️' },
  { name: 'CLOUD', tag: 'AWS / Azure / Kubernetes', icon: '☁️' },
  { name: 'SECURITY', tag: 'OWASP / SIEM / Encryption', icon: '🛡️' },
  { name: 'MOBILE', tag: 'Flutter / React Native', icon: '📱' },
];

export default function Technology() {
  return (
    <section id="technology" className="section technology">
      <div className="container">
        <div className="section-label">HOW WE BUILD</div>
        <h2 className="display-sm technology__title">Visual Infrastructure Ecosystem</h2>

        {/* Visual Showcase Card with Connected Infrastructure Nodes */}
        <div className="technology__showcase-card">
          <div className="technology__image-wrap">
            <img
              src="/images/showcase/technology.png"
              alt="Dominova Tech Infrastructure Node Ecosystem"
              className="technology__image"
              loading="lazy"
            />
            <div className="technology__image-overlay" />
          </div>

          <div className="technology__nodes-overlay">
            <div className="technology__nodes-grid">
              {techNodes.map((node) => (
                <div key={node.name} className="technology__node">
                  <span className="technology__node-icon">{node.icon}</span>
                  <div>
                    <h3 className="technology__node-name">{node.name}</h3>
                    <p className="technology__node-tag">{node.tag}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
