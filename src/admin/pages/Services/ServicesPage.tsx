import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { services } from '../../../lib/data/db';
import type { Service } from '../../../lib/data/types';
import { useAdmin } from '../../context/AdminContext';
import TagsInput from '../../components/TagsInput';
import ConfirmDialog from '../../components/ConfirmDialog';

const PAGE_SIZE = 10;

export function ServiceForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showToast } = useAdmin();
  const isEdit = !!id;
  const allServices = services.findAll();

  const [form, setForm] = useState<Omit<Service, 'id' | 'createdAt' | 'updatedAt'>>({
    num: String(allServices.length + 1).padStart(2, '0'),
    title: '', sub: '', description: '', image: '',
    tags: [], features: [], cta: 'Inquire Project',
    featured: false, status: 'draft', sortOrder: allServices.length,
  });

  useEffect(() => {
    if (id) {
      const item = services.findById(id);
      if (item) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id: _id, createdAt: _c, updatedAt: _u, ...rest } = item;
        setForm(rest);
      } else navigate('/admin/services');
    }
  }, [id, navigate]);

  const h = (field: keyof typeof form, val: unknown) => setForm((p) => ({ ...p, [field]: val }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEdit) { services.update(id!, form); showToast('success', 'Service updated.'); }
      else { services.create(form); showToast('success', 'Service created.'); }
      navigate('/admin/services');
    } catch { showToast('error', 'Failed to save.'); }
  };

  return (
    <div>
      <div className="adm-page-header">
        <div className="adm-page-header-left">
          <Link to="/admin/services" className="adm-breadcrumb">← Services</Link>
          <h2 className="adm-page-title">{isEdit ? 'Edit Service' : 'Add Service'}</h2>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="adm-form-layout">
        <div className="adm-form-main">
          <div className="adm-card">
            <h3 className="adm-section-title" style={{ marginBottom: 20 }}>Service Details</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="adm-form-row">
                <div className="adm-form-group">
                  <label className="adm-form-label">Number</label>
                  <input className="adm-form-input" value={form.num} onChange={(e) => h('num', e.target.value)} placeholder="01" />
                </div>
                <div className="adm-form-group">
                  <label className="adm-form-label">Title <span className="required">*</span></label>
                  <input className="adm-form-input" required value={form.title} onChange={(e) => h('title', e.target.value)} placeholder="WEB DEVELOPMENT" />
                </div>
              </div>
              <div className="adm-form-group">
                <label className="adm-form-label">Short Description <span className="required">*</span></label>
                <input className="adm-form-input" required value={form.sub} onChange={(e) => h('sub', e.target.value)} placeholder="Brief one-liner shown in the card" />
              </div>
              <div className="adm-form-group">
                <label className="adm-form-label">Full Description</label>
                <textarea className="adm-form-textarea" value={form.description} onChange={(e) => h('description', e.target.value)} rows={4} />
              </div>
              <div className="adm-form-group">
                <label className="adm-form-label">Image URL</label>
                <input className="adm-form-input" value={form.image} onChange={(e) => h('image', e.target.value)} placeholder="/images/showcase/web_dev.png" />
              </div>
              <div className="adm-form-group">
                <label className="adm-form-label">Tags</label>
                <TagsInput value={form.tags} onChange={(t) => h('tags', t)} placeholder="React, Node.js..." />
              </div>
              <div className="adm-form-group">
                <label className="adm-form-label">Features</label>
                <TagsInput value={form.features} onChange={(f) => h('features', f)} placeholder="Custom Web Apps, SEO-Optimized..." />
              </div>
              <div className="adm-form-group">
                <label className="adm-form-label">CTA Button Text</label>
                <input className="adm-form-input" value={form.cta} onChange={(e) => h('cta', e.target.value)} placeholder="Inquire Project" />
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
                <select className="adm-form-select" value={form.status} onChange={(e) => h('status', e.target.value)}>
                  <option value="draft">Draft</option><option value="published">Published</option><option value="archived">Archived</option>
                </select>
              </div>
              <label className="adm-toggle">
                <input type="checkbox" checked={form.featured} onChange={(e) => h('featured', e.target.checked)} />
                <span className="adm-toggle-track" /><span style={{ fontSize: 13 }}>Featured</span>
              </label>
              <button type="submit" className="adm-btn adm-btn-primary" style={{ width: '100%', justifyContent: 'center' }}>{isEdit ? 'Update' : 'Create'} Service</button>
              <button type="button" className="adm-btn adm-btn-secondary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => navigate('/admin/services')}>Cancel</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default function ServicesPage() {
  const navigate = useNavigate();
  const { showToast } = useAdmin();
  const [items, setItems] = useState(services.findAll());
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const filtered = items.filter((i) => i.title.toLowerCase().includes(search.toLowerCase()));
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleDelete = (id: string) => {
    services.remove(id); setItems(services.findAll()); showToast('success', 'Service deleted.'); setConfirmDelete(null);
  };
  const toggle = (id: string, cur: string) => {
    services.update(id, { status: (cur === 'published' ? 'draft' : 'published') as 'published' | 'draft' });
    setItems(services.findAll()); showToast('success', 'Status updated.');
  };

  return (
    <div>
      <div className="adm-page-header">
        <div className="adm-page-header-left"><span className="adm-label">Content</span><h2 className="adm-page-title">Services</h2></div>
        <Link to="/admin/services/new" className="adm-btn adm-btn-primary">+ Add Service</Link>
      </div>
      <div className="adm-card" style={{ padding: 0 }}>
        <div className="adm-toolbar">
          <div className="adm-search">
            <svg className="adm-search-icon" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"/></svg>
            <input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} placeholder="Search services..." />
          </div>
        </div>
        {paginated.length === 0 ? (
          <div className="adm-state"><span className="adm-state-icon">⚡</span><p className="adm-state-title">No services found</p><Link to="/admin/services/new" className="adm-btn adm-btn-primary adm-btn-sm">+ Add Service</Link></div>
        ) : (
          <>
            <div className="adm-table-wrap">
              <table className="adm-table">
                <thead><tr><th>#</th><th>Title</th><th>Tags</th><th>Status</th><th>Featured</th><th>Actions</th></tr></thead>
                <tbody>
                  {paginated.map((item) => (
                    <tr key={item.id}>
                      <td style={{ color: 'var(--adm-gold)', fontFamily: 'var(--adm-font-display)', fontWeight: 700 }}>{item.num}</td>
                      <td><strong style={{ color: 'var(--adm-text)' }}>{item.title}</strong><br /><span style={{ fontSize: 11, color: 'var(--adm-text-muted)' }}>{item.sub}</span></td>
                      <td><div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>{item.tags.slice(0, 3).map((t) => <span key={t} className="adm-tag-chip">{t}</span>)}</div></td>
                      <td><span className={`adm-badge adm-badge-${item.status}`}>{item.status}</span></td>
                      <td>{item.featured ? '⭐' : '—'}</td>
                      <td><div className="adm-table-actions">
                        <button className="adm-btn adm-btn-ghost adm-btn-sm" onClick={() => navigate(`/admin/services/${item.id}`)}>Edit</button>
                        <button className="adm-btn adm-btn-ghost adm-btn-sm" onClick={() => toggle(item.id, item.status)}>{item.status === 'published' ? 'Unpublish' : 'Publish'}</button>
                        <button className="adm-btn adm-btn-danger adm-btn-sm" onClick={() => setConfirmDelete(item.id)}>Delete</button>
                      </div></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {totalPages > 1 && (
              <div className="adm-pagination">
                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>‹</button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (<button key={p} onClick={() => setPage(p)} className={p === page ? 'active' : ''}>{p}</button>))}
                <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>›</button>
              </div>
            )}
          </>
        )}
      </div>
      <ConfirmDialog isOpen={!!confirmDelete} title="Delete Service" message="Delete this service? This cannot be undone." confirmLabel="Delete" danger onConfirm={() => confirmDelete && handleDelete(confirmDelete)} onCancel={() => setConfirmDelete(null)} />
    </div>
  );
}
