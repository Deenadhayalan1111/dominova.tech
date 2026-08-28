import { useState, useEffect } from 'react';
import { applications } from '../../../lib/data/db';
import type { Application, ApplicationStatus } from '../../../lib/data/types';
import { useAdmin } from '../../context/AdminContext';
import ConfirmDialog from '../../components/ConfirmDialog';

const STATUSES: ApplicationStatus[] = ['new', 'reviewing', 'shortlisted', 'accepted', 'rejected', 'completed'];
const PAGE_SIZE = 12;

export default function ApplicationsPage() {
  const { showToast, refreshUnread } = useAdmin();
  const [items, setItems] = useState<Application[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | ApplicationStatus>('all');
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Application | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [notes, setNotes] = useState('');

  const load = () => setItems(applications.findAll());
  useEffect(() => { load(); }, []);

  const filtered = items.filter((a) => {
    const q = search.toLowerCase();
    const matchSearch = a.applicantName.toLowerCase().includes(q) ||
      a.email.toLowerCase().includes(q) ||
      a.internshipTitle.toLowerCase().includes(q);
    const matchStatus = statusFilter === 'all' || a.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleStatusChange = (id: string, status: ApplicationStatus) => {
    applications.update(id, { status });
    load();
    if (selected?.id === id) setSelected((p) => p ? { ...p, status } : null);
    showToast('success', `Status updated to "${status}".`);
    refreshUnread();
  };

  const handleSaveNotes = () => {
    if (!selected) return;
    applications.update(selected.id, { notes });
    load();
    showToast('success', 'Notes saved.');
  };

  const handleDelete = (id: string) => {
    applications.remove(id);
    load();
    showToast('success', 'Application deleted.');
    setConfirmDelete(null);
    if (selected?.id === id) setSelected(null);
  };

  const openDetail = (app: Application) => {
    setSelected(app);
    setNotes(app.notes || '');
  };

  return (
    <div>
      <div className="adm-page-header">
        <div className="adm-page-header-left">
          <span className="adm-label">Inbox</span>
          <h2 className="adm-page-title">Applications <span style={{ fontSize: 14, fontWeight: 400, color: 'var(--adm-text-muted)' }}>({items.length})</span></h2>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 380px' : '1fr', gap: 16, alignItems: 'flex-start' }}>
        {/* List */}
        <div className="adm-card" style={{ padding: 0 }}>
          <div className="adm-toolbar">
            <div className="adm-search">
              <svg className="adm-search-icon" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"/></svg>
              <input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} placeholder="Search applicants..." />
            </div>
            <select className="adm-form-select" style={{ width: 'auto' }} value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value as 'all' | ApplicationStatus); setPage(1); }}>
              <option value="all">All Status</option>
              {STATUSES.map((s) => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
            </select>
          </div>

          {paginated.length === 0 ? (
            <div className="adm-state">
              <span className="adm-state-icon">📋</span>
              <p className="adm-state-title">No applications found</p>
              <p className="adm-state-desc">Applications submitted through the internship form appear here.</p>
            </div>
          ) : (
            <>
              <div className="adm-table-wrap">
                <table className="adm-table">
                  <thead>
                    <tr>
                      <th>Applicant</th>
                      <th>Internship</th>
                      <th>College</th>
                      <th>Applied</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginated.map((app) => (
                      <tr key={app.id} style={{ cursor: 'pointer' }} onClick={() => openDetail(app)}>
                        <td>
                          <div>
                            <strong style={{ color: 'var(--adm-text)', display: 'block' }}>{app.applicantName}</strong>
                            <span style={{ fontSize: 11, color: 'var(--adm-text-muted)' }}>{app.email}</span>
                          </div>
                        </td>
                        <td style={{ color: 'var(--adm-text-muted)', maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{app.internshipTitle}</td>
                        <td style={{ color: 'var(--adm-text-muted)' }}>{app.college}</td>
                        <td style={{ color: 'var(--adm-text-muted)', whiteSpace: 'nowrap' }}>{new Date(app.appliedAt).toLocaleDateString()}</td>
                        <td onClick={(e) => e.stopPropagation()}>
                          <select
                            className="adm-form-select"
                            style={{ width: 'auto', padding: '3px 28px 3px 8px', fontSize: 12 }}
                            value={app.status}
                            onChange={(e) => handleStatusChange(app.id, e.target.value as ApplicationStatus)}
                          >
                            {STATUSES.map((s) => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                          </select>
                        </td>
                        <td onClick={(e) => e.stopPropagation()}>
                          <button className="adm-btn adm-btn-danger adm-btn-sm" onClick={() => setConfirmDelete(app.id)}>Del</button>
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

        {/* Detail Panel */}
        {selected && (
          <div className="adm-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 className="adm-section-title">Applicant Details</h3>
              <button className="adm-modal-close" onClick={() => setSelected(null)}>×</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                ['Name', selected.applicantName],
                ['Email', selected.email],
                ['Phone', selected.phone],
                ['College', selected.college],
                ['Year', selected.yearOfStudy],
                ['Internship', selected.internshipTitle],
                ['Applied', new Date(selected.appliedAt).toLocaleString()],
              ].map(([label, val]) => (
                <div key={label} style={{ borderBottom: '1px solid var(--adm-border)', paddingBottom: 10 }}>
                  <span style={{ fontSize: 11, color: 'var(--adm-text-muted)', display: 'block', marginBottom: 2 }}>{label}</span>
                  <span style={{ fontSize: 13, color: 'var(--adm-text)' }}>{val || '—'}</span>
                </div>
              ))}

              <div className="adm-form-group" style={{ marginTop: 8 }}>
                <label className="adm-form-label">Status</label>
                <select className="adm-form-select" value={selected.status} onChange={(e) => handleStatusChange(selected.id, e.target.value as ApplicationStatus)}>
                  {STATUSES.map((s) => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                </select>
              </div>

              <div className="adm-form-group">
                <label className="adm-form-label">Internal Notes</label>
                <textarea className="adm-form-textarea" value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} placeholder="Add internal notes..." />
              </div>

              <button className="adm-btn adm-btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={handleSaveNotes}>Save Notes</button>
            </div>
          </div>
        )}
      </div>

      <ConfirmDialog
        isOpen={!!confirmDelete}
        title="Delete Application"
        message="Delete this application? This cannot be undone."
        confirmLabel="Delete"
        danger
        onConfirm={() => confirmDelete && handleDelete(confirmDelete)}
        onCancel={() => setConfirmDelete(null)}
      />
    </div>
  );
}
