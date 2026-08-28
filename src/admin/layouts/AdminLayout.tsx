import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminTopbar from './AdminTopbar';
import ToastContainer from '../components/ToastContainer';
import './AdminLayout.css';

export default function AdminLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) setSidebarCollapsed(false);
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const handleToggle = () => {
    if (isMobile) {
      setMobileSidebarOpen((v) => !v);
    } else {
      setSidebarCollapsed((v) => !v);
    }
  };

  return (
    <div className={`adm-shell ${sidebarCollapsed ? 'adm-shell--collapsed' : ''} ${mobileSidebarOpen ? 'adm-shell--mobile-open' : ''}`}>
      {/* Mobile overlay */}
      {mobileSidebarOpen && (
        <div
          className="adm-sidebar-overlay"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <AdminSidebar
        collapsed={isMobile ? false : sidebarCollapsed}
        onClose={() => setMobileSidebarOpen(false)}
      />

      {/* Main content area */}
      <div className="adm-main">
        <AdminTopbar
          onToggleSidebar={handleToggle}
          sidebarCollapsed={sidebarCollapsed}
        />
        <main className="adm-content">
          <Outlet />
        </main>
      </div>

      {/* Toast notifications */}
      <ToastContainer />
    </div>
  );
}
