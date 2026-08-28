import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { testimonials } from '../../../lib/data/db';
import type { Testimonial } from '../../../lib/data/types';
import { useAdmin } from '../../context/AdminContext';
import ConfirmDialog from '../../components/ConfirmDialog';

const PAGE_SIZE = 10;

export function TestimonialForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showToast } = useAdmin();
  const isEdit = !!id;
  const all = testimonials.findAll();

  const [form, setForm] = useState<Omit<Testimonial, 'id' | 'createdAt' | 'updatedAt'>>({
    name: '', role: '', company: '', profileImage: '', testimonial: '',
    rating: 5, featured: false, status: 'draft', sortOrder: all.length,
  });

  useEffect(() => {
    if (id) {
      const item = testimonials.findById(id);
      if (item) { const { id: _id, createdAt: _c, updatedAt: _u, ...rest } = item; setForm(rest); }
      else navigate('/admin/testimonials');
    }
  }, [id, navigate]);

  const h = (field: keyof typeof form, val: unknown) => setForm((p) => ({ ...p, [field]: val }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEdit) { testimonials.update(id!, form); showToast('success', 'Testimonial updated.'); }
      else { testimonials.create(form); showToast('success', 'Testimonial added.'); }
      navigate('/admin/testimonials');
    } catch { showToast('error', 'Failed to save.'); }
  };

  return (
    <div>
      <div className="adm-page-header"><div className="adm-page-header-left"><Link to="/admin/testimonials" className="adm-breadcrumb">← Testimonials</Link><h2 className="adm-page-title">{isEdit ? 'Edit' : 'Add'} Testimonial</h2></div></div>
      <form onSubmit={handleSubmit} className="adm-form-layout">
        <div className="adm-form-main">
          <div className="adm-card">
            <h3 className="adm-section-title" style={{ marginBottom: 20 }}>Testimonial Details</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="adm-form-row">
                <div className="adm-form-group"><label className="adm-form-label">Name <span className="required">*</span></label><input className="adm-form-input" required value={form.name} onChange={(e) => h('name', e.target.value)} placeholder="Priya Sundaram" /></div>
                <div className="adm-form-group"><label className="adm-form-label">Role</label><input className="adm-form-input" value={form.role} onChange={(e) => h('role', e.target.value)} placeholder="Software Engineer" /></div>
              </div>
              <div className="adm-form-row">
                <div className="adm-form-group"><label className="adm-form-label">Company</label><input className="adm-form-input" value={form.company} onChange={(e) => h('company', e.target.value)} placeholder="TechCorp" /></div>
                <div className="adm-form-group"><label className="adm-form-label">Rating (1-5)</label><input className="adm-form-input" type="number" min={1} max={5} value={form.rating} onChange={(e) => h('rating', Number(e.target.value))} /></div>
              </div>
              <div className="adm-form-group"><label className="adm-form-label">Profile Image URL</label><input className="adm-form-input" value={form.profileImage} onChange={(e) => h('profileImage', e.target.value)} placeholder="https://..." /></div>
              <div className="adm-form-group"><label className="adm-form-label">Testimonial <span className="required">*</span></label><textarea className="adm-form-textarea" required value={form.testimonial} onChange={(e) => h('testimonial', e.target.value)} rows={5} placeholder="What they said about Dominova..." /></div>
            </div>
          </div>
        </div>
        <div className="adm-form-sidebar">
          <div className="adm-card">
            <h3 className="adm-section-title" style={{ marginBottom: 16 }}>Publish</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div className="adm-form-group"><label className="adm-form-label">Status</label><select className="adm-form-select" value={form.status} onChange={(e) => h('status', e.target.value)}><option value="draft">Draft</option><option value="published">Published</option></select></div>
              <label className="adm-toggle"><input type="checkbox" checked={form.featured} onChange={(e) => h('featured', e.target.checked)} /><span className="adm-toggle-track" /><span style={{ fontSize: 13 }}>Featured</span></label>
              <button type="submit" className="adm-btn adm-btn-primary" style={{ width: '100%', justifyContent: 'center' }}>{isEdit ? 'Update' : 'Add'} Testimonial</button>
              <button type="button" className="adm-btn adm-btn-secondary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => navigate('/admin/testimonials')}>Cancel</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default function TestimonialsPage() {
  const navigate = useNavigate();
  const { showToast } = useAdmin();
  const [items, setItems] = useState(testimonials.findAll());
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const filtered = items.filter((i) => i.name.toLowerCase().includes(search.toLowerCase()) || i.company.toLowerCase().includes(search.toLowerCase()));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);


  const handleDelete = (id: string) => { testimonials.remove(id); setItems(testimonials.findAll()); showToast('success', 'Testimonial deleted.'); setConfirmDelete(null); };
  const toggle = (id: string, cur: string) => { testimonials.update(id, { status: (cur === 'published' ? 'draft' : 'published') as 'published' | 'draft' }); setItems(testimonials.findAll()); showToast('success', 'Status updated.'); };

  return (
    <div>
      <div className="adm-page-header">
        <div className="adm-page-header-left"><span className="adm-label">Content</span><h2 className="adm-page-title">Testimonials</h2></div>
        <Link to="/admin/testimonials/new" className="adm-btn adm-btn-primary">+ Add Testimonial</Link>
      </div>
      <div className="adm-card" style={{ padding: 0 }}>
        <div className="adm-toolbar"><div className="adm-search"><svg className="adm-search-icon" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"/></svg><input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} placeholder="Search testimonials..." /></div></div>
        {paginated.length === 0 ? (
          <div className="adm-state"><span className="adm-state-icon">★</span><p className="adm-state-title">No testimonials yet</p><Link to="/admin/testimonials/new" className="adm-btn adm-btn-primary adm-btn-sm">+ Add Testimonial</Link></div>
        ) : (
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead><tr><th>Person</th><th>Company</th><th>Rating</th><th>Status</th><th>Featured</th><th>Actions</th></tr></thead>
              <tbody>
                {paginated.map((item) => (
                  <tr key={item.id}>
                    <td><strong style={{ color: 'var(--adm-text)', display: 'block' }}>{item.name}</strong><span style={{ fontSize: 11, color: 'var(--adm-text-muted)' }}>{item.role}</span></td>
                    <td style={{ color: 'var(--adm-text-muted)' }}>{item.company || '—'}</td>
                    <td>{'★'.repeat(item.rating)}</td>
                    <td><span className={`adm-badge adm-badge-${item.status}`}>{item.status}</span></td>
                    <td>{item.featured ? '⭐' : '—'}</td>
                    <td><div className="adm-table-actions"><button className="adm-btn adm-btn-ghost adm-btn-sm" onClick={() => navigate(`/admin/testimonials/${item.id}`)}>Edit</button><button className="adm-btn adm-btn-ghost adm-btn-sm" onClick={() => toggle(item.id, item.status)}>{item.status === 'published' ? 'Unpublish' : 'Publish'}</button><button className="adm-btn adm-btn-danger adm-btn-sm" onClick={() => setConfirmDelete(item.id)}>Delete</button></div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <ConfirmDialog isOpen={!!confirmDelete} title="Delete Testimonial" message="Delete this testimonial?" confirmLabel="Delete" danger onConfirm={() => confirmDelete && handleDelete(confirmDelete)} onCancel={() => setConfirmDelete(null)} />
    </div>
  );
}
