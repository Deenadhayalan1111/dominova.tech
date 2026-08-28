import { useEffect, useRef, useState } from 'react';
import './Stats.css';

interface StatItem {
  id: string;
  target: number;
  suffix: string;
  label: string;
}

const statsData: StatItem[] = [
  { id: 'projects', target: 50, suffix: '+', label: 'Projects Shipped' },
  { id: 'students', target: 100, suffix: '+', label: 'Engineers Mentored' },
  { id: 'satisfaction', target: 98, suffix: '%', label: 'Impact Rate' },
  { id: 'domains', target: 10, suffix: '+', label: 'Tech Domains' },
];

export default function Stats() {
  const [counts, setCounts] = useState<{ [key: string]: number }>({
    projects: 0,
    students: 0,
    satisfaction: 0,
    domains: 0,
  });
  const sectionRef = useRef<HTMLElement>(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !animatedRef.current) {
          animatedRef.current = true;
          const duration = 1500;
          const startTime = performance.now();

          const animate = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3);

            const nextCounts: { [key: string]: number } = {};
            statsData.forEach((stat) => {
              nextCounts[stat.id] = Math.floor(easeProgress * stat.target);
            });

            setCounts(nextCounts);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              const finalCounts: { [key: string]: number } = {};
              statsData.forEach((stat) => {
                finalCounts[stat.id] = stat.target;
              });
              setCounts(finalCounts);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="section stats">
      <div className="container">
        <div className="stats__grid">
          {statsData.map((stat) => (
            <div key={stat.id} className="stats__item">
              <div className="stats__num display-lg">
                {counts[stat.id]}
                <span className="gold">{stat.suffix}</span>
              </div>
              <h3 className="stats__label">{stat.label}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
