import './CTA.css';

interface CTAProps {
  onOpenInternshipModal?: () => void;
}

export default function CTA({ onOpenInternshipModal }: CTAProps) {
  const scrollToContact = () => {
    const el = document.querySelector('#contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="section cta">
      <div className="cta__bg-glow" aria-hidden="true" />

      <div className="container cta__container">
        <span className="cta__tag">COLLABORATION & GROWTH</span>

        <h2 className="display-md cta__title">
          HAVE A DIGITAL IDEA? <br />
          <span className="cta__title-gold">LET'S BUILD IT.</span>
        </h2>

        <div className="cta__actions">
          <button onClick={scrollToContact} className="btn-gold cta__btn">
            <span>Start a Project</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>

          {onOpenInternshipModal && (
            <button onClick={onOpenInternshipModal} className="btn-white cta__btn">
              <span>Apply for Internship</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
