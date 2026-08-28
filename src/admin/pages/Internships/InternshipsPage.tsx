import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { internships } from '../../../lib/data/db';
import type { Internship } from '../../../lib/data/types';
import { useAdmin } from '../../context/AdminContext';
import TagsInput from '../../components/TagsInput';
import ConfirmDialog from '../../components/ConfirmDialog';
import './InternshipsPage.css';

const CATEGORIES = [
  'Web Development', 'Mobile App Development', 'Data Science & Analytics',
  'Cybersecurity', 'UI/UX Design', 'Cloud Computing & DevOps',
  'Java Development', 'Python Development', 'AI/ML', 'Full Stack Development',
];

// ── Form (Create / Edit) ──────────────────────────────────
export function InternshipForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showToast } = useAdmin();
  const isEdit = !!id;

  const [form, setForm] = useState<Omit<Internship, 'id' | 'createdAt' | 'updatedAt'>>({
    title: '', slug: '', description: '', duration: '3 Months',
    mode: 'Hybrid', location: 'Chennai, India', skills: [],
    eligibility: '', stipend: 'Unpaid (Certificate Provided)',
    applicationDeadline: '', applicationUrl: '', category: 'Web Development',
    bannerImage: '', featured: false, status: 'draft', sortOrder: 0,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      const item = internships.findById(id);
      if (item) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id: _id, createdAt: _c, updatedAt: _u, ...rest } = item;
        setForm(rest);
      } else {
        navigate('/admin/internships');
      }
    }
  }, [id, navigate]);

  const handleChange = (field: keyof typeof form, val: unknown) => {
    setForm((prev) => {
      const next = { ...prev, [field]: val };
      if (field === 'title' && !isEdit) {
        next.slug = (val as string).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      }
      return next;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEdit) {
        internships.update(id!, form);
        showToast('success', 'Internship updated successfully.');
      } else {
        internships.create(form);
        showToast('success', 'Internship created successfully.');
      }
      navigate('/admin/internships');
    } catch {
      showToast('error', 'Failed to save internship.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="adm-intern-form">
      <div className="adm-page-header">
        <div className="adm-page-header-left">
          <Link to="/admin/internships" className="adm-breadcrumb">← Internships</Link>
          <h2 className="adm-page-title">{isEdit ? 'Edit Internship' : 'Add Internship'}</h2>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="adm-form-layout">
        <div className="adm-form-main">
          <div className="adm-card">
            <h3 className="adm-section-title" style={{ marginBottom: 20 }}>Basic Information</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="adm-form-group">
                <label className="adm-form-label">Title <span className="required">*</span></label>
                <input className="adm-form-input" required value={form.title} onChange={(e) => handleChange('title', e.target.value)} placeholder="e.g. Web Development Internship" />
              </div>
              <div className="adm-form-group">
                <label className="adm-form-label">Slug</label>
                <input className="adm-form-input" value={form.slug} onChange={(e) => handleChange('slug', e.target.value)} placeholder="auto-generated-from-title" />
              </div>
              <div className="adm-form-group">
                <label className="adm-form-label">Description <span className="required">*</span></label>
                <textarea className="adm-form-textarea" required value={form.description} onChange={(e) => handleChange('description', e.target.value)} rows={4} placeholder="Describe the internship program..." />
              </div>
              <div className="adm-form-row">
                <div className="adm-form-group">
                  <label className="adm-form-label">Category</label>
                  <select className="adm-form-select" value={form.category} onChange={(e) => handleChange('category', e.target.value)}>
                    {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div className="adm-form-group">
                  <label className="adm-form-label">Duration</label>
                  <input className="adm-form-input" value={form.duration} onChange={(e) => handleChange('duration', e.target.value)} placeholder="3 Months" />
                </div>
              </div>
              <div className="adm-form-row">
                <div className="adm-form-group">
                  <label className="adm-form-label">Mode</label>
                  <select className="adm-form-select" value={form.mode} onChange={(e) => handleChange('mode', e.target.value)}>
                    <option>Hybrid</option><option>Remote</option><option>In-Person</option>
                  </select>
                </div>
                <div className="adm-form-group">
                  <label className="adm-form-label">Location</label>
                  <input className="adm-form-input" value={form.location} onChange={(e) => handleChange('location', e.target.value)} placeholder="Chennai, India" />
                </div>
              </div>
              <div className="adm-form-group">
                <label className="adm-form-label">Skills Required</label>
                <TagsInput value={form.skills} onChange={(tags) => handleChange('skills', tags)} placeholder="Type skill and press Enter" />
              </div>
              <div className="adm-form-row">
                <div className="adm-form-group">
                  <label className="adm-form-label">Stipend</label>
                  <input className="adm-form-input" value={form.stipend} onChange={(e) => handleChange('stipend', e.target.value)} placeholder="Unpaid / ₹5000/month" />
                </div>
                <div className="adm-form-group">
                  <label className="adm-form-label">Application Deadline</label>
                  <input className="adm-form-input" type="date" value={form.applicationDeadline} onChange={(e) => handleChange('applicationDeadline', e.target.value)} />
                </div>
              </div>
              <div className="adm-form-group">
                <label className="adm-form-label">Eligibility</label>
                <input className="adm-form-input" value={form.eligibility} onChange={(e) => handleChange('eligibility', e.target.value)} placeholder="e.g. 3rd year and above engineering students" />
              </div>
              <div className="adm-form-group">
                <label className="adm-form-label">Application URL</label>
                <input className="adm-form-input" type="url" value={form.applicationUrl} onChange={(e) => handleChange('applicationUrl', e.target.value)} placeholder="https://..." />
              </div>
              <div className="adm-form-group">
                <label className="adm-form-label">Banner Image URL</label>
                <input className="adm-form-input" value={form.bannerImage} onChange={(e) => handleChange('bannerImage', e.target.value)} placeholder="/images/showcase/web_dev.png" />
              </div>
            </div>
          </div>
        </div>

        <div className="adm-form-sidebar">
          <div className="adm-card">
            <h3 className="adm-section-title" style={{ marginBottom: 16 }}>Publish</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div className="adm-form-group">
                <label className="adm-form-label">Status</label>
                <select className="adm-form-select" value={form.status} onChange={(e) => handleChange('status', e.target.value)}>
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
              <label className="adm-toggle">
                <input type="checkbox" checked={form.featured} onChange={(e) => handleChange('featured', e.target.checked)} />
                <span className="adm-toggle-track" />
                <span style={{ fontSize: 13 }}>Featured Internship</span>
              </label>
              <button type="submit" disabled={loading} className="adm-btn adm-btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                {loading ? 'Saving...' : isEdit ? 'Update Internship' : 'Create Internship'}
              </button>
              <button type="button" className="adm-btn adm-btn-secondary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => navigate('/admin/internships')}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

// ── List Page ─────────────────────────────────────────────
const PAGE_SIZE = 10;

export default function InternshipsPage() {
  const navigate = useNavigate();
  const { showToast } = useAdmin();
  const [items, setItems] = useState(internships.findAll());
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const filtered = items.filter((i) => {
    const matchSearch = i.title.toLowerCase().includes(search.toLowerCase()) ||
      i.category.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || i.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleDelete = (id: string) => {
    internships.remove(id);
    setItems(internships.findAll());
    showToast('success', 'Internship deleted.');
    setConfirmDelete(null);
  };

  const handleToggleStatus = (id: string, current: string) => {
    const next = current === 'published' ? 'draft' : 'published';
    internships.update(id, { status: next as 'published' | 'draft' });
    setItems(internships.findAll());
    showToast('success', `Internship ${next}.`);
  };

  return (
    <div>
      <div className="adm-page-header">
        <div className="adm-page-header-left">
          <span className="adm-label">Content</span>
          <h2 className="adm-page-title">Internships</h2>
        </div>
        <div className="adm-page-header-actions">
          <Link to="/admin/internships/new" className="adm-btn adm-btn-primary">+ Add Internship</Link>
        </div>
      </div>

      <div className="adm-card" style={{ padding: 0 }}>
        <div className="adm-toolbar">
          <div className="adm-search">
            <svg className="adm-search-icon" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"/></svg>
            <input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} placeholder="Search internships..." />
          </div>
          <select className="adm-form-select" style={{ width: 'auto' }} value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}>
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        {paginated.length === 0 ? (
          <div className="adm-state">
            <span className="adm-state-icon">🎓</span>
            <p className="adm-state-title">No internships found</p>
            <p className="adm-state-desc">{search ? 'Try a different search term.' : 'Create your first internship.'}</p>
            {!search && <Link to="/admin/internships/new" className="adm-btn adm-btn-primary adm-btn-sm">+ Add Internship</Link>}
          </div>
        ) : (
          <>
            <div className="adm-table-wrap">
              <table className="adm-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Mode</th>
                    <th>Status</th>
                    <th>Featured</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.map((item) => (
                    <tr key={item.id}>
                      <td><strong style={{ color: 'var(--adm-text)' }}>{item.title}</strong></td>
                      <td style={{ color: 'var(--adm-text-muted)' }}>{item.category}</td>
                      <td style={{ color: 'var(--adm-text-muted)' }}>{item.mode}</td>
                      <td><span className={`adm-badge adm-badge-${item.status}`}>{item.status}</span></td>
                      <td>{item.featured ? '⭐' : '—'}</td>
                      <td>
                        <div className="adm-table-actions">
                          <button className="adm-btn adm-btn-ghost adm-btn-sm" onClick={() => navigate(`/admin/internships/${item.id}`)}>Edit</button>
                          <button className="adm-btn adm-btn-ghost adm-btn-sm" onClick={() => handleToggleStatus(item.id, item.status)}>
                            {item.status === 'published' ? 'Unpublish' : 'Publish'}
                          </button>
                          <button className="adm-btn adm-btn-danger adm-btn-sm" onClick={() => setConfirmDelete(item.id)}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="adm-pagination">
                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>‹</button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button key={p} onClick={() => setPage(p)} className={p === page ? 'active' : ''}>{p}</button>
                ))}
                <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>›</button>
              </div>
            )}
          </>
        )}
      </div>

      <ConfirmDialog
        isOpen={!!confirmDelete}
        title="Delete Internship"
        message="Are you sure you want to delete this internship? This action cannot be undone."
        confirmLabel="Delete"
        danger
        onConfirm={() => confirmDelete && handleDelete(confirmDelete)}
        onCancel={() => setConfirmDelete(null)}
      />
    </div>
  );
}
