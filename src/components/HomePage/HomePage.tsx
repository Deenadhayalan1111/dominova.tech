import { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import CinematicHero from '../CinematicHero/CinematicHero';
import GoldTunnel from '../Common/GoldTunnel';
import About from '../About/About';
import Services from '../Services/Services';
import Technology from '../Technology/Technology';
import WhyDominova from '../WhyDominova/WhyDominova';
import Internship from '../Internship/Internship';
import Stats from '../Stats/Stats';
import Process from '../Process/Process';
import Work from '../Work/Work';
import CTA from '../CTA/CTA';
import Contact from '../Contact/Contact';

interface HomePageProps {
  onOpenInternshipModal: (domain?: string) => void;
  selectedDomain: string;
}

export default function HomePage({ onOpenInternshipModal, selectedDomain }: HomePageProps) {
  useEffect(() => {
    // Refresh ScrollTrigger when homepage mounts, in case of dynamic routing
    ScrollTrigger.refresh();
  }, []);

  return (
    <main id="main-content">
      {/* 3. Hero */}
      <CinematicHero onOpenInternshipModal={() => onOpenInternshipModal()} />

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
      <Internship onApplyDomain={(domain) => onOpenInternshipModal(domain)} />

      {/* 9. Animated Stats */}
      <Stats />

      {/* 10. Process Tunnel */}
      <Process />

      {/* Spatial Tunnel Transition */}
      <GoldTunnel label="FEATURED PROJECT SHOWCASE" />

      {/* 11. Spatial Portfolio */}
      <Work />

      {/* 12. Final CTA */}
      <CTA onOpenInternshipModal={() => onOpenInternshipModal()} />

      {/* 13. Contact Form */}
      <Contact initialDomain={selectedDomain} />
    </main>
  );
}
