import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { teamMembers } from '../../../lib/data/db';
import type { TeamMember } from '../../../lib/data/types';
import { useAdmin } from '../../context/AdminContext';
import TagsInput from '../../components/TagsInput';
import ConfirmDialog from '../../components/ConfirmDialog';

const PAGE_SIZE = 10;

export function TeamMemberForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showToast } = useAdmin();
  const isEdit = !!id;
  const all = teamMembers.findAll();

  const [form, setForm] = useState<Omit<TeamMember, 'id' | 'createdAt' | 'updatedAt'>>({
    name: '', position: '', bio: '', profileImage: '', skills: [],
    linkedin: '', github: '', email: '', status: 'draft', sortOrder: all.length,
  });

  useEffect(() => {
    if (id) {
      const item = teamMembers.findById(id);
      if (item) { const { id: _id, createdAt: _c, updatedAt: _u, ...rest } = item; setForm(rest); }
      else navigate('/admin/team');
    }
  }, [id, navigate]);

  const h = (field: keyof typeof form, val: unknown) => setForm((p) => ({ ...p, [field]: val }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEdit) { teamMembers.update(id!, form); showToast('success', 'Team member updated.'); }
      else { teamMembers.create(form); showToast('success', 'Team member added.'); }
      navigate('/admin/team');
    } catch { showToast('error', 'Failed to save.'); }
  };

  return (
    <div>
      <div className="adm-page-header"><div className="adm-page-header-left"><Link to="/admin/team" className="adm-breadcrumb">← Team</Link><h2 className="adm-page-title">{isEdit ? 'Edit' : 'Add'} Team Member</h2></div></div>
      <form onSubmit={handleSubmit} className="adm-form-layout">
        <div className="adm-form-main">
          <div className="adm-card">
            <h3 className="adm-section-title" style={{ marginBottom: 20 }}>Member Details</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="adm-form-row">
                <div className="adm-form-group"><label className="adm-form-label">Name <span className="required">*</span></label><input className="adm-form-input" required value={form.name} onChange={(e) => h('name', e.target.value)} /></div>
                <div className="adm-form-group"><label className="adm-form-label">Position <span className="required">*</span></label><input className="adm-form-input" required value={form.position} onChange={(e) => h('position', e.target.value)} placeholder="Senior Developer" /></div>
              </div>
              <div className="adm-form-group"><label className="adm-form-label">Bio</label><textarea className="adm-form-textarea" value={form.bio} onChange={(e) => h('bio', e.target.value)} rows={3} /></div>
              <div className="adm-form-group"><label className="adm-form-label">Profile Image URL</label><input className="adm-form-input" value={form.profileImage} onChange={(e) => h('profileImage', e.target.value)} placeholder="https://..." /></div>
              <div className="adm-form-group"><label className="adm-form-label">Skills</label><TagsInput value={form.skills} onChange={(t) => h('skills', t)} placeholder="React, Python..." /></div>
              <div className="adm-form-row">
                <div className="adm-form-group"><label className="adm-form-label">LinkedIn URL</label><input className="adm-form-input" value={form.linkedin} onChange={(e) => h('linkedin', e.target.value)} placeholder="https://linkedin.com/in/..." /></div>
                <div className="adm-form-group"><label className="adm-form-label">GitHub URL</label><input className="adm-form-input" value={form.github} onChange={(e) => h('github', e.target.value)} placeholder="https://github.com/..." /></div>
              </div>
              <div className="adm-form-group"><label className="adm-form-label">Email</label><input className="adm-form-input" type="email" value={form.email} onChange={(e) => h('email', e.target.value)} /></div>
            </div>
          </div>
        </div>
        <div className="adm-form-sidebar">
          <div className="adm-card">
            <h3 className="adm-section-title" style={{ marginBottom: 16 }}>Publish</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div className="adm-form-group"><label className="adm-form-label">Status</label><select className="adm-form-select" value={form.status} onChange={(e) => h('status', e.target.value)}><option value="draft">Draft</option><option value="published">Published</option></select></div>
              <button type="submit" className="adm-btn adm-btn-primary" style={{ width: '100%', justifyContent: 'center' }}>{isEdit ? 'Update' : 'Add'} Member</button>
              <button type="button" className="adm-btn adm-btn-secondary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => navigate('/admin/team')}>Cancel</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default function TeamPage() {
  const navigate = useNavigate();
  const { showToast } = useAdmin();
  const [items, setItems] = useState(teamMembers.findAll());
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const filtered = items.filter((i) => i.name.toLowerCase().includes(search.toLowerCase()) || i.position.toLowerCase().includes(search.toLowerCase()));
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleDelete = (id: string) => { teamMembers.remove(id); setItems(teamMembers.findAll()); showToast('success', 'Member removed.'); setConfirmDelete(null); };
  const toggle = (id: string, cur: string) => { teamMembers.update(id, { status: (cur === 'published' ? 'draft' : 'published') as 'published' | 'draft' }); setItems(teamMembers.findAll()); showToast('success', 'Status updated.'); };

  return (
    <div>
      <div className="adm-page-header">
        <div className="adm-page-header-left"><span className="adm-label">Content</span><h2 className="adm-page-title">Team</h2></div>
        <Link to="/admin/team/new" className="adm-btn adm-btn-primary">+ Add Member</Link>
      </div>
      <div className="adm-card" style={{ padding: 0 }}>
        <div className="adm-toolbar"><div className="adm-search"><svg className="adm-search-icon" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"/></svg><input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} placeholder="Search team..." /></div></div>
        {paginated.length === 0 ? (
          <div className="adm-state"><span className="adm-state-icon">👥</span><p className="adm-state-title">No team members yet</p><Link to="/admin/team/new" className="adm-btn adm-btn-primary adm-btn-sm">+ Add Member</Link></div>
        ) : (
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead><tr><th>Name</th><th>Position</th><th>Skills</th><th>Status</th><th>Actions</th></tr></thead>
              <tbody>
                {paginated.map((item) => (
                  <tr key={item.id}>
                    <td><strong style={{ color: 'var(--adm-text)', display: 'block' }}>{item.name}</strong><span style={{ fontSize: 11, color: 'var(--adm-text-muted)' }}>{item.email}</span></td>
                    <td style={{ color: 'var(--adm-text-muted)' }}>{item.position}</td>
                    <td><div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>{item.skills.slice(0, 2).map((s) => <span key={s} className="adm-tag-chip">{s}</span>)}</div></td>
                    <td><span className={`adm-badge adm-badge-${item.status}`}>{item.status}</span></td>
                    <td><div className="adm-table-actions"><button className="adm-btn adm-btn-ghost adm-btn-sm" onClick={() => navigate(`/admin/team/${item.id}`)}>Edit</button><button className="adm-btn adm-btn-ghost adm-btn-sm" onClick={() => toggle(item.id, item.status)}>{item.status === 'published' ? 'Unpublish' : 'Publish'}</button><button className="adm-btn adm-btn-danger adm-btn-sm" onClick={() => setConfirmDelete(item.id)}>Delete</button></div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {totalPages > 1 && <div className="adm-pagination"><button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>‹</button>{Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (<button key={p} onClick={() => setPage(p)} className={p === page ? 'active' : ''}>{p}</button>))}<button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>›</button></div>}
      </div>
      <ConfirmDialog isOpen={!!confirmDelete} title="Remove Team Member" message="Remove this team member?" confirmLabel="Remove" danger onConfirm={() => confirmDelete && handleDelete(confirmDelete)} onCancel={() => setConfirmDelete(null)} />
    </div>
  );
}
