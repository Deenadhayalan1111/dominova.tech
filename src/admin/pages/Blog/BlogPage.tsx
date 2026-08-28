import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { blogPosts } from '../../../lib/data/db';
import type { BlogPost } from '../../../lib/data/types';
import { useAdmin } from '../../context/AdminContext';
import TagsInput from '../../components/TagsInput';
import ConfirmDialog from '../../components/ConfirmDialog';

const PAGE_SIZE = 10;

export function BlogForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showToast } = useAdmin();
  const isEdit = !!id;

  const [form, setForm] = useState<Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>>({
    title: '', slug: '', excerpt: '', content: '', coverImage: '',
    author: 'Dominova', publishDate: new Date().toISOString().split('T')[0], readingTime: '5',
    seoTitle: '', seoDescription: '', tags: [], featured: false, status: 'draft',
  });

  useEffect(() => {
    if (id) {
      const item = blogPosts.findById(id);
      if (item) { const { id: _id, createdAt: _c, updatedAt: _u, ...rest } = item; setForm(rest); }
      else navigate('/admin/blog');
    }
  }, [id, navigate]);

  const h = (field: keyof typeof form, val: unknown) => setForm((p) => {
    const next = { ...p, [field]: val };
    if (field === 'title' && !isEdit) next.slug = (val as string).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    if (field === 'title' && !next.seoTitle) next.seoTitle = val as string;
    return next;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEdit) { blogPosts.update(id!, form); showToast('success', 'Post updated.'); }
      else { blogPosts.create(form); showToast('success', 'Post created.'); }
      navigate('/admin/blog');
    } catch { showToast('error', 'Failed to save.'); }
  };

  return (
    <div>
      <div className="adm-page-header"><div className="adm-page-header-left"><Link to="/admin/blog" className="adm-breadcrumb">← Blog</Link><h2 className="adm-page-title">{isEdit ? 'Edit Post' : 'New Blog Post'}</h2></div></div>
      <form onSubmit={handleSubmit} className="adm-form-layout">
        <div className="adm-form-main">
          <div className="adm-card">
            <h3 className="adm-section-title" style={{ marginBottom: 20 }}>Post Content</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="adm-form-group"><label className="adm-form-label">Title <span className="required">*</span></label><input className="adm-form-input" required value={form.title} onChange={(e) => h('title', e.target.value)} placeholder="Post title..." /></div>
              <div className="adm-form-group"><label className="adm-form-label">Slug</label><input className="adm-form-input" value={form.slug} onChange={(e) => h('slug', e.target.value)} /></div>
              <div className="adm-form-group"><label className="adm-form-label">Excerpt</label><textarea className="adm-form-textarea" value={form.excerpt} onChange={(e) => h('excerpt', e.target.value)} rows={2} placeholder="Brief summary shown in listings..." /></div>
              <div className="adm-form-group"><label className="adm-form-label">Content <span className="required">*</span></label><textarea className="adm-form-textarea" required value={form.content} onChange={(e) => h('content', e.target.value)} rows={12} placeholder="Full post content (Markdown supported)..." style={{ minHeight: 240 }} /></div>
              <div className="adm-form-group"><label className="adm-form-label">Cover Image URL</label><input className="adm-form-input" value={form.coverImage} onChange={(e) => h('coverImage', e.target.value)} placeholder="https://..." /></div>
              <div className="adm-form-row">
                <div className="adm-form-group"><label className="adm-form-label">Author</label><input className="adm-form-input" value={form.author} onChange={(e) => h('author', e.target.value)} /></div>
                <div className="adm-form-group"><label className="adm-form-label">Publish Date</label><input className="adm-form-input" type="date" value={form.publishDate} onChange={(e) => h('publishDate', e.target.value)} /></div>
                <div className="adm-form-group"><label className="adm-form-label">Read Time (mins)</label><input className="adm-form-input" type="number" min="1" value={form.readingTime} onChange={(e) => h('readingTime', e.target.value)} /></div>
              </div>
              <div className="adm-form-group"><label className="adm-form-label">Tags</label><TagsInput value={form.tags} onChange={(t) => h('tags', t)} placeholder="Technology, Internship..." /></div>
            </div>
          </div>
          <div className="adm-card">
            <h3 className="adm-section-title" style={{ marginBottom: 16 }}>SEO</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="adm-form-group"><label className="adm-form-label">SEO Title</label><input className="adm-form-input" value={form.seoTitle} onChange={(e) => h('seoTitle', e.target.value)} /></div>
              <div className="adm-form-group"><label className="adm-form-label">Meta Description</label><textarea className="adm-form-textarea" value={form.seoDescription} onChange={(e) => h('seoDescription', e.target.value)} rows={2} /></div>
            </div>
          </div>
        </div>
        <div className="adm-form-sidebar">
          <div className="adm-card">
            <h3 className="adm-section-title" style={{ marginBottom: 16 }}>Publish</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div className="adm-form-group"><label className="adm-form-label">Status</label><select className="adm-form-select" value={form.status} onChange={(e) => h('status', e.target.value)}><option value="draft">Draft</option><option value="published">Published</option><option value="archived">Archived</option></select></div>
              <label className="adm-toggle"><input type="checkbox" checked={form.featured} onChange={(e) => h('featured', e.target.checked)} /><span className="adm-toggle-track" /><span style={{ fontSize: 13 }}>Featured Post</span></label>
              <button type="submit" className="adm-btn adm-btn-primary" style={{ width: '100%', justifyContent: 'center' }}>{isEdit ? 'Update' : 'Publish'} Post</button>
              <button type="button" className="adm-btn adm-btn-secondary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => navigate('/admin/blog')}>Cancel</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default function BlogPage() {
  const navigate = useNavigate();
  const { showToast } = useAdmin();
  const [items, setItems] = useState(blogPosts.findAll());
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const filtered = items.filter((i) => i.title.toLowerCase().includes(search.toLowerCase()));
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleDelete = (id: string) => { blogPosts.remove(id); setItems(blogPosts.findAll()); showToast('success', 'Post deleted.'); setConfirmDelete(null); };
  const toggle = (id: string, cur: string) => { blogPosts.update(id, { status: (cur === 'published' ? 'draft' : 'published') as 'published' | 'draft' }); setItems(blogPosts.findAll()); showToast('success', 'Status updated.'); };

  return (
    <div>
      <div className="adm-page-header">
        <div className="adm-page-header-left"><span className="adm-label">Content</span><h2 className="adm-page-title">Blog</h2></div>
        <Link to="/admin/blog/new" className="adm-btn adm-btn-primary">+ New Post</Link>
      </div>
      <div className="adm-card" style={{ padding: 0 }}>
        <div className="adm-toolbar"><div className="adm-search"><svg className="adm-search-icon" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"/></svg><input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} placeholder="Search posts..." /></div></div>
        {paginated.length === 0 ? (
          <div className="adm-state"><span className="adm-state-icon">✍</span><p className="adm-state-title">No posts yet</p><Link to="/admin/blog/new" className="adm-btn adm-btn-primary adm-btn-sm">+ New Post</Link></div>
        ) : (
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead><tr><th>Title</th><th>Author</th><th>Date</th><th>Status</th><th>Actions</th></tr></thead>
              <tbody>
                {paginated.map((item) => (
                  <tr key={item.id}>
                    <td><strong style={{ color: 'var(--adm-text)', display: 'block' }}>{item.title}</strong><span style={{ fontSize: 11, color: 'var(--adm-text-muted)' }}>{item.slug}</span></td>
                    <td style={{ color: 'var(--adm-text-muted)' }}>{item.author}</td>
                    <td style={{ color: 'var(--adm-text-muted)', whiteSpace: 'nowrap' }}>{item.publishDate}</td>
                    <td><span className={`adm-badge adm-badge-${item.status}`}>{item.status}</span></td>
                    <td><div className="adm-table-actions"><button className="adm-btn adm-btn-ghost adm-btn-sm" onClick={() => navigate(`/admin/blog/${item.id}`)}>Edit</button><button className="adm-btn adm-btn-ghost adm-btn-sm" onClick={() => toggle(item.id, item.status)}>{item.status === 'published' ? 'Unpublish' : 'Publish'}</button><button className="adm-btn adm-btn-danger adm-btn-sm" onClick={() => setConfirmDelete(item.id)}>Delete</button></div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {totalPages > 1 && <div className="adm-pagination"><button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>‹</button>{Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (<button key={p} onClick={() => setPage(p)} className={p === page ? 'active' : ''}>{p}</button>))}<button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>›</button></div>}
      </div>
      <ConfirmDialog isOpen={!!confirmDelete} title="Delete Post" message="Delete this blog post?" confirmLabel="Delete" danger onConfirm={() => confirmDelete && handleDelete(confirmDelete)} onCancel={() => setConfirmDelete(null)} />
    </div>
  );
}
