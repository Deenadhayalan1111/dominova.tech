import DominovaLogo from '../Common/DominovaLogo';
import './Footer.css';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        {/* Main Footer Layout */}
        <div className="footer__grid">
          {/* Brand Col */}
          <div className="footer__brand">
            <DominovaLogo height={36} showText={true} />
            <p className="footer__desc">
              Dominova is a Chennai-based technology solutions company specializing in enterprise software development,
              web and mobile applications, cloud engineering, cybersecurity, and industry-oriented technology programs.
            </p>
            <p className="footer__founder">
              Founder & Director: <strong className="gold">B. Deepak</strong>
            </p>
          </div>

          {/* Quick Navigation */}
          <div className="footer__col">
            <h4 className="footer__heading">Navigation</h4>
            <ul className="footer__links">
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About Dominova</a></li>
              <li><a href="#services">Services Catalog</a></li>
              <li><a href="#technology">Tech Stack</a></li>
              <li><a href="#internship">Student Internships</a></li>
              <li><a href="#portfolio">Featured Work</a></li>
              <li><a href="#contact">Contact Us</a></li>
            </ul>
          </div>

          {/* Core Services */}
          <div className="footer__col">
            <h4 className="footer__heading">Services</h4>
            <ul className="footer__links">
              <li><a href="#services">Web Development</a></li>
              <li><a href="#services">Mobile App Development</a></li>
              <li><a href="#services">Custom Software Engineering</a></li>
              <li><a href="#services">UI/UX Interface Design</a></li>
              <li><a href="#services">Data Science & Analytics</a></li>
              <li><a href="#services">Cloud & DevOps Infrastructure</a></li>
              <li><a href="#services">Cybersecurity Auditing</a></li>
            </ul>
          </div>

          {/* Internship Programs */}
          <div className="footer__col">
            <h4 className="footer__heading">Internship Domains</h4>
            <ul className="footer__links">
              <li><a href="#internship">Web Engineering</a></li>
              <li><a href="#internship">Mobile Development</a></li>
              <li><a href="#internship">Data Science & Machine Learning</a></li>
              <li><a href="#internship">Cybersecurity & Ethical Hacking</a></li>
              <li><a href="#internship">UI/UX Design Strategy</a></li>
              <li><a href="#internship">Cloud & DevOps</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer__bottom">
          <p className="footer__copyright">
            &copy; {new Date().getFullYear()} Dominova Technology Solutions. All Rights Reserved. Built in Chennai, Tamil Nadu, India.
          </p>

          <button onClick={scrollToTop} className="footer__back-top" aria-label="Back to Top">
            <span>Back to Top</span> &uarr;
          </button>
        </div>
      </div>
    </footer>
  );
}
