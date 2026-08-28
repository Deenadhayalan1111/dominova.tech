import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCustomCursor } from './hooks/useCustomCursor';

import LogoIntro from './components/LogoIntro/LogoIntro';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import InternshipModal from './components/InternshipModal/InternshipModal';

// Pages
import HomePage from './components/HomePage/HomePage';
import BlogPage from './components/Blog/BlogPage';
import ArticlePage from './components/Blog/ArticlePage';

export default function PublicSite() {
  useCustomCursor();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState('');
  const location = useLocation();

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
  }, [location.pathname]);

  return (
    <div className="app" id="app">
      {/* 1. Page-Load Logo Intro */}
      <LogoIntro />

      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* 2. Header */}
      <Header onOpenInternshipModal={() => handleOpenInternshipModal()} />

      {/* 3. Nested Public Routes */}
      <Routes>
        <Route 
          path="/" 
          element={
            <HomePage 
              onOpenInternshipModal={handleOpenInternshipModal} 
              selectedDomain={selectedDomain} 
            />
          } 
        />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<ArticlePage />} />
      </Routes>

      {/* 4. Footer */}
      <Footer />

      {/* 5. Internship Modal */}
      <InternshipModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultDomain={selectedDomain}
      />
    </div>
  );
}
