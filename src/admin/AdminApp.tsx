// ============================================================
// DOMINOVA ADMIN — App Router
// All /admin/* routes. Auth guard via RequireAuth wrapper.
// Pages NOT using lazy() use direct imports (forms are small).
// ============================================================

import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { AdminProvider } from './context/AdminContext';
import { isAuthenticated } from '../lib/data/auth';
import '../index.css';
import './admin.css';

// Layout
import AdminLayout from './layouts/AdminLayout';

// Import form components and their associated list pages directly
// (they share the same module — lazy() can't split them)
import InternshipsPage, { InternshipForm } from './pages/Internships/InternshipsPage';
import ServicesPage, { ServiceForm } from './pages/Services/ServicesPage';
import ProjectsPage, { ProjectForm } from './pages/Projects/ProjectsPage';
import TestimonialsPage, { TestimonialForm } from './pages/Testimonials/TestimonialsPage';
import BlogPage, { BlogForm } from './pages/Blog/BlogPage';
import TeamPage, { TeamMemberForm } from './pages/Team/TeamPage';

// Lazy-loaded standalone pages (no shared form components)
const AdminLogin    = lazy(() => import('./pages/Login/AdminLogin'));
const Dashboard     = lazy(() => import('./pages/Dashboard/Dashboard'));
const ApplicationsPage = lazy(() => import('./pages/Applications/ApplicationsPage'));
const MessagesPage  = lazy(() => import('./pages/Messages/MessagesPage'));
const SettingsPage  = lazy(() => import('./pages/Settings/SettingsPage'));

const PageLoader = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 300 }}>
    <div className="adm-spinner" />
  </div>
);

function RequireAuth({ children }: { children: React.ReactNode }) {
  if (!isAuthenticated()) return <Navigate to="/admin/login" replace />;
  return <>{children}</>;
}

function GuestOnly({ children }: { children: React.ReactNode }) {
  if (isAuthenticated()) return <Navigate to="/admin" replace />;
  return <>{children}</>;
}

export default function AdminApp() {
  return (
    <AdminProvider>
      <div className="admin-root">
        <Routes>
          {/* Login */}
          <Route
            path="login"
            element={
              <GuestOnly>
                <Suspense fallback={<PageLoader />}>
                  <AdminLogin />
                </Suspense>
              </GuestOnly>
            }
          />

          {/* Protected admin shell with sidebar + topbar */}
          <Route
            path="/"
            element={
              <RequireAuth>
                <AdminLayout />
              </RequireAuth>
            }
          >
            <Route index element={<Suspense fallback={<PageLoader />}><Dashboard /></Suspense>} />

            {/* Internships */}
            <Route path="internships" element={<InternshipsPage />} />
            <Route path="internships/new" element={<InternshipForm />} />
            <Route path="internships/:id" element={<InternshipForm />} />

            {/* Applications */}
            <Route path="applications" element={<Suspense fallback={<PageLoader />}><ApplicationsPage /></Suspense>} />

            {/* Services */}
            <Route path="services" element={<Suspense fallback={<PageLoader />}><ServicesPage /></Suspense>} />
            <Route path="services/new" element={<ServiceForm />} />
            <Route path="services/:id" element={<ServiceForm />} />

            {/* Projects */}
            <Route path="projects" element={<Suspense fallback={<PageLoader />}><ProjectsPage /></Suspense>} />
            <Route path="projects/new" element={<ProjectForm />} />
            <Route path="projects/:id" element={<ProjectForm />} />

            {/* Testimonials */}
            <Route path="testimonials" element={<Suspense fallback={<PageLoader />}><TestimonialsPage /></Suspense>} />
            <Route path="testimonials/new" element={<TestimonialForm />} />
            <Route path="testimonials/:id" element={<TestimonialForm />} />

            {/* Blog */}
            <Route path="blog" element={<Suspense fallback={<PageLoader />}><BlogPage /></Suspense>} />
            <Route path="blog/new" element={<BlogForm />} />
            <Route path="blog/:id" element={<BlogForm />} />

            {/* Messages */}
            <Route path="messages" element={<Suspense fallback={<PageLoader />}><MessagesPage /></Suspense>} />

            {/* Team */}
            <Route path="team" element={<Suspense fallback={<PageLoader />}><TeamPage /></Suspense>} />
            <Route path="team/new" element={<TeamMemberForm />} />
            <Route path="team/:id" element={<TeamMemberForm />} />

            {/* Settings */}
            <Route path="settings" element={<Suspense fallback={<PageLoader />}><SettingsPage /></Suspense>} />

            {/* Catch-all */}
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Route>
        </Routes>
      </div>
    </AdminProvider>
  );
}
