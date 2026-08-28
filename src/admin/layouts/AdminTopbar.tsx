import { useLocation } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';

const pageTitles: Record<string, string> = {
  '/admin': 'Dashboard',
  '/admin/internships': 'Internships',
  '/admin/applications': 'Applications',
  '/admin/services': 'Services',
  '/admin/projects': 'Projects',
  '/admin/testimonials': 'Testimonials',
  '/admin/blog': 'Blog',
  '/admin/messages': 'Messages',
  '/admin/team': 'Team',
  '/admin/settings': 'Settings',
};

function getTitle(pathname: string): string {
  const match = Object.keys(pageTitles)
    .sort((a, b) => b.length - a.length)
    .find((key) => pathname.startsWith(key) && (pathname === key || pathname.startsWith(key + '/')));
  return match ? pageTitles[match] : 'Admin';
}

export default function AdminTopbar({
  onToggleSidebar,
  sidebarCollapsed,
}: {
  onToggleSidebar: () => void;
  sidebarCollapsed: boolean;
}) {
  const { session, logout, unreadCount } = useAdmin();
  const location = useLocation();
  const title = getTitle(location.pathname);

  return (
    <header className="adm-topbar">
      {/* Hamburger / Toggle */}
      <button
        className="adm-topbar__toggle"
        onClick={onToggleSidebar}
        aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        <span />
        <span />
        <span />
      </button>

      {/* Page Title */}
      <h1 className="adm-topbar__title">{title}</h1>

      {/* Right actions */}
      <div className="adm-topbar__right">
        {/* Unread messages indicator */}
        {unreadCount > 0 && (
          <a href="/admin/messages" className="adm-topbar__notif" title={`${unreadCount} unread messages`}>
            <span className="adm-topbar__notif-icon">✉</span>
            <span className="adm-topbar__notif-count">{unreadCount}</span>
          </a>
        )}

        {/* Admin user */}
        <div className="adm-topbar__user">
          <div className="adm-topbar__avatar">
            {(session?.name?.[0] ?? 'A').toUpperCase()}
          </div>
          <div className="adm-topbar__user-info">
            <span className="adm-topbar__user-name">{session?.name ?? 'Admin'}</span>
            <span className="adm-topbar__user-email">{session?.email ?? ''}</span>
          </div>
          <button className="adm-topbar__logout-btn" onClick={logout} title="Logout">
            ⇥
          </button>
        </div>
      </div>
    </header>
  );
}
