import './index.css';
import './App.css';
import { useState, useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCustomCursor } from './hooks/useCustomCursor';

import LogoIntro from './components/LogoIntro/LogoIntro';
import Header from './components/Header/Header';
import CinematicHero from './components/CinematicHero/CinematicHero';
import GoldTunnel from './components/Common/GoldTunnel';
import About from './components/About/About';
import Services from './components/Services/Services';
import Technology from './components/Technology/Technology';
import WhyDominova from './components/WhyDominova/WhyDominova';
import Internship from './components/Internship/Internship';
import Stats from './components/Stats/Stats';
import Process from './components/Process/Process';
import Work from './components/Work/Work';
import CTA from './components/CTA/CTA';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import InternshipModal from './components/InternshipModal/InternshipModal';

export default function App() {
  useCustomCursor();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState('');

  const handleOpenInternshipModal = (domain?: string) => {
    if (domain) setSelectedDomain(domain);
    setModalOpen(true);
  };

  useEffect(() => {
    const handleLoad = () => ScrollTrigger.refresh();
    if (document.readyState === 'complete') {
      ScrollTrigger.refresh();
    } else {
      window.addEventListener('load', handleLoad, { once: true });
    }
    return () => window.removeEventListener('load', handleLoad);
  }, []);

  return (
    <div className="app" id="app">
      {/* 1. Page-Load Logo Intro */}
      <LogoIntro />

      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* 2. Header */}
      <Header onOpenInternshipModal={() => handleOpenInternshipModal()} />

      <main id="main-content">
        {/* 3. Hero */}
        <CinematicHero onOpenInternshipModal={() => handleOpenInternshipModal()} />

        {/* Spatial Tunnel Transition */}
        <GoldTunnel videoSrc="/videos/now_create_a_video.mp4" />

        {/* 4. About */}
        <About />

        {/* 5. Services Showcase */}
        <Services />

        {/* Spatial Tunnel Transition */}
        <GoldTunnel label="INFRASTRUCTURE ECOSYSTEM" />

        {/* 6. Technology Capabilities */}
        <Technology />

        {/* 7. Why Dominova */}
        <WhyDominova />

        {/* 8. Internship Program */}
        <Internship onApplyDomain={(domain) => handleOpenInternshipModal(domain)} />

        {/* 9. Animated Stats */}
        <Stats />

        {/* 10. Process Tunnel */}
        <Process />

        {/* Spatial Tunnel Transition */}
        <GoldTunnel label="FEATURED PROJECT SHOWCASE" />

        {/* 11. Spatial Portfolio */}
        <Work />

        {/* 12. Final CTA */}
        <CTA onOpenInternshipModal={() => handleOpenInternshipModal()} />

        {/* 13. Contact Form */}
        <Contact initialDomain={selectedDomain} />
      </main>

      {/* 14. Footer */}
      <Footer />

      {/* 15. Internship Modal */}
      <InternshipModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultDomain={selectedDomain}
      />
    </div>
  );
}
