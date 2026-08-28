import { NavLink, useLocation } from 'react-router-dom';
import DominovaLogo from '../../components/Common/DominovaLogo';
import { useAdmin } from '../context/AdminContext';

interface NavItem {
  label: string;
  path: string;
  icon: string;
  badge?: number;
}

interface NavGroup {
  groupLabel: string;
  items: NavItem[];
}

export default function AdminSidebar({
  collapsed,
  onClose,
}: {
  collapsed: boolean;
  onClose?: () => void;
}) {
  const { logout, unreadCount } = useAdmin();
  const location = useLocation();

  const navGroups: NavGroup[] = [
    {
      groupLabel: 'Overview',
      items: [{ label: 'Dashboard', path: '/admin', icon: '⊞' }],
    },
    {
      groupLabel: 'Content',
      items: [
        { label: 'Internships', path: '/admin/internships', icon: '🎓' },
        { label: 'Services', path: '/admin/services', icon: '⚡' },
        { label: 'Projects', path: '/admin/projects', icon: '📁' },
        { label: 'Testimonials', path: '/admin/testimonials', icon: '★' },
        { label: 'Blog', path: '/admin/blog', icon: '✍' },
        { label: 'Team', path: '/admin/team', icon: '👥' },
      ],
    },
    {
      groupLabel: 'Inbox',
      items: [
        { label: 'Applications', path: '/admin/applications', icon: '📋' },
        { label: 'Messages', path: '/admin/messages', icon: '✉', badge: unreadCount },
      ],
    },
    {
      groupLabel: 'System',
      items: [{ label: 'Settings', path: '/admin/settings', icon: '⚙' }],
    },
  ];

  const isExactActive = (path: string) => {
    if (path === '/admin') return location.pathname === '/admin' || location.pathname === '/admin/';
    return location.pathname.startsWith(path);
  };

  return (
    <aside className={`adm-sidebar ${collapsed ? 'adm-sidebar--collapsed' : ''}`}>
      {/* Logo */}
      <div className="adm-sidebar__logo">
        <DominovaLogo height={28} showText={!collapsed} />
        {!collapsed && <span className="adm-sidebar__logo-badge">Admin</span>}
      </div>

      {/* Navigation */}
      <nav className="adm-sidebar__nav">
        {navGroups.map((group) => (
          <div key={group.groupLabel} className="adm-sidebar__group">
            {!collapsed && (
              <span className="adm-sidebar__group-label">{group.groupLabel}</span>
            )}
            {group.items.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/admin'}
                className={`adm-sidebar__link ${isExactActive(item.path) ? 'adm-sidebar__link--active' : ''}`}
                onClick={onClose}
                title={collapsed ? item.label : undefined}
              >
                <span className="adm-sidebar__link-icon">{item.icon}</span>
                {!collapsed && (
                  <span className="adm-sidebar__link-label">{item.label}</span>
                )}
                {!collapsed && item.badge != null && item.badge > 0 && (
                  <span className="adm-sidebar__badge">{item.badge}</span>
                )}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      {/* Bottom Actions */}
      <div className="adm-sidebar__bottom">
        <a
          href="/"
          className="adm-sidebar__link"
          target="_blank"
          rel="noopener noreferrer"
          title={collapsed ? 'View Site' : undefined}
        >
          <span className="adm-sidebar__link-icon">↗</span>
          {!collapsed && <span className="adm-sidebar__link-label">View Site</span>}
        </a>
        <button
          className="adm-sidebar__link adm-sidebar__logout"
          onClick={logout}
          title={collapsed ? 'Logout' : undefined}
        >
          <span className="adm-sidebar__link-icon">⇥</span>
          {!collapsed && <span className="adm-sidebar__link-label">Logout</span>}
        </button>
      </div>
    </aside>
  );
}
