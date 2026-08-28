import './index.css';
import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { seedDatabase } from './lib/data/seeds';

// Public website components
import PublicSite from './PublicSite';

// Admin panel (lazy-loaded — does NOT affect public bundle)
const AdminApp = lazy(() => import('./admin/AdminApp'));

// Initialize database on first load (runs once, no-op after that)
seedDatabase().catch(console.error);

export default function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  useEffect(() => {
    if (!isAdmin) {
      const handleLoad = () => ScrollTrigger.refresh();
      if (document.readyState === 'complete') {
        ScrollTrigger.refresh();
      } else {
        window.addEventListener('load', handleLoad, { once: true });
      }
      return () => window.removeEventListener('load', handleLoad);
    }
  }, [isAdmin]);

  return (
    <Routes>
      {/* Admin area — lazy loaded, completely isolated */}
      <Route
        path="/admin/*"
        element={
          <Suspense fallback={
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100vh',
              background: '#050505',
              color: '#D4AF37',
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '14px',
              letterSpacing: '0.1em',
            }}>
              Loading Admin Panel...
            </div>
          }>
            <AdminApp />
          </Suspense>
        }
      />

      {/* Public website — all routes fallthrough to single-page app */}
      <Route path="/*" element={<PublicSite />} />
    </Routes>
  );
}
