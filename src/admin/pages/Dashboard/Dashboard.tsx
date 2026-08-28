import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { internships, applications, services, projects, messages as messagesDb } from '../../../lib/data/db';
import './Dashboard.css';

interface Stats {
  totalApplications: number;
  newApplications: number;
  activeInternships: number;
  publishedServices: number;
  totalProjects: number;
  unreadMessages: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats>({
    totalApplications: 0,
    newApplications: 0,
    activeInternships: 0,
    publishedServices: 0,
    totalProjects: 0,
    unreadMessages: 0,
  });

  const [recentApplications, setRecentApplications] = useState(
    applications.findAll().slice(0, 5)
  );
  const [recentMessages, setRecentMessages] = useState(
    messagesDb.findAll().slice(0, 5)
  );

  useEffect(() => {
    setStats({
      totalApplications: applications.findAll().length,
      newApplications: applications.countByStatus('new'),
      activeInternships: internships.findPublished().length,
      publishedServices: services.findPublished().length,
      totalProjects: projects.findPublished().length,
      unreadMessages: messagesDb.countUnread(),
    });
    setRecentApplications(applications.findAll().slice(0, 5));
    setRecentMessages(messagesDb.findAll().slice(0, 5));
  }, []);

  const statCards = [
    { label: 'Total Applications', value: stats.totalApplications, icon: '📋', href: '/admin/applications', accent: 'blue' },
    { label: 'New Applications', value: stats.newApplications, icon: '🔔', href: '/admin/applications', accent: 'gold' },
    { label: 'Active Internships', value: stats.activeInternships, icon: '🎓', href: '/admin/internships', accent: 'green' },
    { label: 'Published Services', value: stats.publishedServices, icon: '⚡', href: '/admin/services', accent: 'purple' },
    { label: 'Projects', value: stats.totalProjects, icon: '📁', href: '/admin/projects', accent: 'green' },
    { label: 'Unread Messages', value: stats.unreadMessages, icon: '✉', href: '/admin/messages', accent: 'red' },
  ];

  const quickActions = [
    { label: 'Add Internship', href: '/admin/internships/new', icon: '🎓' },
    { label: 'View Applications', href: '/admin/applications', icon: '📋' },
    { label: 'Add Project', href: '/admin/projects/new', icon: '📁' },
    { label: 'Add Service', href: '/admin/services/new', icon: '⚡' },
    { label: 'Add Blog Post', href: '/admin/blog/new', icon: '✍' },
    { label: 'View Messages', href: '/admin/messages', icon: '✉' },
  ];

  return (
    <div className="adm-dashboard">
      {/* Welcome */}
      <div className="adm-dashboard__welcome">
        <div>
          <h2 className="adm-page-title">Dashboard</h2>
          <p className="adm-dashboard__subtitle">Dominova Enterprise CMS Overview</p>
        </div>
        <Link to="/admin/internships/new" className="adm-btn adm-btn-primary">
          + Add Content
        </Link>
      </div>

      {/* Stat Cards */}
      <div className="adm-dashboard__stats">
        {statCards.map((card) => (
          <Link key={card.label} to={card.href} className={`adm-stat-card adm-stat-card--${card.accent}`}>
            <div className="adm-stat-card__icon">{card.icon}</div>
            <div className="adm-stat-card__body">
              <span className="adm-stat-card__value">{card.value}</span>
              <span className="adm-stat-card__label">{card.label}</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Grid: Recent Activity + Quick Actions */}
      <div className="adm-dashboard__grid">
        {/* Recent Applications */}
        <div className="adm-card adm-dashboard__panel">
          <div className="adm-dashboard__panel-header">
            <h3 className="adm-section-title">Recent Applications</h3>
            <Link to="/admin/applications" className="adm-btn adm-btn-ghost adm-btn-sm">View all</Link>
          </div>
          {recentApplications.length === 0 ? (
            <div className="adm-state" style={{ padding: '30px 20px' }}>
              <span className="adm-state-icon">📋</span>
              <p className="adm-state-desc">No applications yet.</p>
            </div>
          ) : (
            <div className="adm-dashboard__list">
              {recentApplications.map((app) => (
                <div key={app.id} className="adm-dashboard__list-item">
                  <div className="adm-dashboard__list-avatar">
                    {app.applicantName[0]?.toUpperCase()}
                  </div>
                  <div className="adm-dashboard__list-body">
                    <strong>{app.applicantName}</strong>
                    <span>{app.internshipTitle}</span>
                  </div>
                  <span className={`adm-badge adm-badge-${app.status}`}>{app.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Messages */}
        <div className="adm-card adm-dashboard__panel">
          <div className="adm-dashboard__panel-header">
            <h3 className="adm-section-title">Recent Messages</h3>
            <Link to="/admin/messages" className="adm-btn adm-btn-ghost adm-btn-sm">View all</Link>
          </div>
          {recentMessages.length === 0 ? (
            <div className="adm-state" style={{ padding: '30px 20px' }}>
              <span className="adm-state-icon">✉</span>
              <p className="adm-state-desc">No messages yet.</p>
            </div>
          ) : (
            <div className="adm-dashboard__list">
              {recentMessages.map((msg) => (
                <div key={msg.id} className={`adm-dashboard__list-item ${!msg.read ? 'adm-dashboard__list-item--unread' : ''}`}>
                  <div className="adm-dashboard__list-avatar">
                    {msg.name[0]?.toUpperCase()}
                  </div>
                  <div className="adm-dashboard__list-body">
                    <strong>{msg.name}</strong>
                    <span>{msg.serviceDomain || msg.inquiryType}</span>
                  </div>
                  {!msg.read && <span className="adm-badge adm-badge-unread">New</span>}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="adm-card adm-dashboard__panel">
          <h3 className="adm-section-title" style={{ marginBottom: 16 }}>Quick Actions</h3>
          <div className="adm-dashboard__quick-actions">
            {quickActions.map((action) => (
              <Link key={action.label} to={action.href} className="adm-dashboard__quick-btn">
                <span className="adm-dashboard__quick-icon">{action.icon}</span>
                <span>{action.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
