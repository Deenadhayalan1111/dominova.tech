import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DominovaLogo from '../Common/DominovaLogo';
import ThemeToggle from '../Common/ThemeToggle';
import './Header.css';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Technology', href: '#technology' },
  { label: 'Internships', href: '#internship' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '#contact' },
];

interface HeaderProps {
  onOpenInternshipModal?: () => void;
}

export default function Header({ onOpenInternshipModal }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  // Handle cross-page scrolling and navigation
  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const el = document.querySelector(location.hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    
    if (href.startsWith('#')) {
      if (location.pathname === '/') {
        // We are already on the homepage, just scroll
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else {
        // Navigate to homepage with hash
        navigate(`/${href}`);
      }
    } else {
      // It's a real path (like /blog)
      navigate(href);
    }
  };

  return (
    <header
      ref={headerRef}
      className={`header ${scrolled ? 'header--scrolled' : ''} ${menuOpen ? 'header--menu-open' : ''}`}
      role="banner"
    >
      <div className="header__inner container">
        {/* Dominova Logo */}
        <a
          href="/"
          className="header__logo"
          aria-label="DOMINOVA — Home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('#home');
          }}
        >
          <DominovaLogo height={34} showText={true} />
        </a>

        {/* Desktop Navigation */}
        <nav className="header__nav" role="navigation" aria-label="Main navigation">
          <ul className="header__nav-list">
            {navLinks.map((link) => (
              <li key={link.href} className="header__nav-item">
                <a
                  href={link.href}
                  className={`header__nav-link ${location.pathname === link.href ? 'is-active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Actions */}
        <div className="header__actions">
          <ThemeToggle />

          {onOpenInternshipModal && (
            <button
              onClick={onOpenInternshipModal}
              className="header__sub-cta"
              aria-label="Apply for Internship Program"
            >
              Internships
            </button>
          )}

          <a
            href="#contact"
            className="header__cta btn-gold"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#contact');
            }}
            aria-label="Start a Project with Dominova"
          >
            <span>Start a Project</span>
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className={`header__hamburger ${menuOpen ? 'is-open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <div
        id="mobile-menu"
        className={`header__mobile ${menuOpen ? 'header__mobile--open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <div className="header__mobile-backdrop" onClick={() => setMenuOpen(false)} />
        <nav className="header__mobile-nav" role="navigation" aria-label="Mobile navigation">
          <ul className="header__mobile-list">
            {navLinks.map((link, i) => (
              <li key={link.href} className="header__mobile-item" style={{ '--i': i } as React.CSSProperties}>
                <a
                  href={link.href}
                  className="header__mobile-link"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  tabIndex={menuOpen ? 0 : -1}
                >
                  <span className="header__mobile-link-num">0{i + 1}</span>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="header__mobile-actions">
            <ThemeToggle showLabel={true} className="theme-toggle--full" />

            <a
              href="#contact"
              className="btn-gold header__mobile-btn"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#contact');
              }}
              tabIndex={menuOpen ? 0 : -1}
            >
              <span>Start a Project</span>
            </a>

            {onOpenInternshipModal && (
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onOpenInternshipModal();
                }}
                className="btn-white header__mobile-btn"
                tabIndex={menuOpen ? 0 : -1}
              >
                Apply for Internship
              </button>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
