import './Internship.css';

interface InternshipProps {
  onApplyDomain?: (domainTitle?: string) => void;
}

export default function Internship({ onApplyDomain }: InternshipProps) {
  return (
    <section id="internship" className="section internship">
      <div className="container">
        <div className="section-label">HOW PEOPLE GROW WITH US</div>

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
              Hands-on engineering internships in Web, Mobile, Data Science, Cybersecurity & Cloud with senior mentorship.
            </p>

            <button
              onClick={() => {
                if (onApplyDomain) onApplyDomain();
              }}
              className="btn-gold internship__btn"
            >
              <span>Explore Internship</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
