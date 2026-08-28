import { useState, useEffect } from 'react';
import { messages as messagesDb } from '../../../lib/data/db';
import type { Message } from '../../../lib/data/types';
import { useAdmin } from '../../context/AdminContext';
import ConfirmDialog from '../../components/ConfirmDialog';

const PAGE_SIZE = 12;

export default function MessagesPage() {
  const { showToast, refreshUnread } = useAdmin();
  const [items, setItems] = useState<Message[]>([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Message | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const load = () => { setItems(messagesDb.findAll()); refreshUnread(); };
  useEffect(() => { load(); }, []); // eslint-disable-line

  const filtered = items.filter((m) => {
    const q = search.toLowerCase();
    const matchSearch = m.name.toLowerCase().includes(q) || m.email.toLowerCase().includes(q) || m.message.toLowerCase().includes(q);
    const matchFilter = filter === 'all' || (filter === 'unread' ? !m.read : m.read);
    return matchSearch && matchFilter;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const openMsg = (msg: Message) => {
    setSelected(msg);
    if (!msg.read) { messagesDb.markRead(msg.id); load(); }
  };

  const handleDelete = (id: string) => {
    messagesDb.remove(id); load(); showToast('success', 'Message deleted.');
    setConfirmDelete(null); if (selected?.id === id) setSelected(null);
  };

  const toggleRead = (id: string, cur: boolean) => {
    if (cur) messagesDb.markUnread(id); else messagesDb.markRead(id);
    load();
    if (selected?.id === id) setSelected((p) => p ? { ...p, read: !cur } : null);
  };

  return (
    <div>
      <div className="adm-page-header">
        <div className="adm-page-header-left">
          <span className="adm-label">Inbox</span>
          <h2 className="adm-page-title">Messages <span style={{ fontSize: 14, fontWeight: 400, color: 'var(--adm-text-muted)' }}>({items.length})</span></h2>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 400px' : '1fr', gap: 16, alignItems: 'flex-start' }}>
        {/* List */}
        <div className="adm-card" style={{ padding: 0 }}>
          <div className="adm-toolbar">
            <div className="adm-search"><svg className="adm-search-icon" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"/></svg><input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} placeholder="Search messages..." /></div>
            <select className="adm-form-select" style={{ width: 'auto' }} value={filter} onChange={(e) => { setFilter(e.target.value as 'all' | 'unread' | 'read'); setPage(1); }}>
              <option value="all">All</option><option value="unread">Unread</option><option value="read">Read</option>
            </select>
          </div>

          {paginated.length === 0 ? (
            <div className="adm-state"><span className="adm-state-icon">✉</span><p className="adm-state-title">No messages found</p><p className="adm-state-desc">Contact form submissions appear here.</p></div>
          ) : (
            <>
              <div className="adm-table-wrap">
                <table className="adm-table">
                  <thead><tr><th></th><th>Name</th><th>Email</th><th>Domain</th><th>Type</th><th>Date</th><th>Actions</th></tr></thead>
                  <tbody>
                    {paginated.map((msg) => (
                      <tr key={msg.id} style={{ cursor: 'pointer', fontWeight: msg.read ? 400 : 600 }} onClick={() => openMsg(msg)}>
                        <td><span className={`adm-badge ${msg.read ? 'adm-badge-read' : 'adm-badge-unread'}`}>{msg.read ? 'Read' : 'New'}</span></td>
                        <td style={{ color: 'var(--adm-text)' }}>{msg.name}</td>
                        <td style={{ color: 'var(--adm-text-muted)', fontSize: 12 }}>{msg.email}</td>
                        <td style={{ color: 'var(--adm-text-muted)', maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{msg.serviceDomain}</td>
                        <td><span className="adm-badge adm-badge-draft">{msg.inquiryType}</span></td>
                        <td style={{ color: 'var(--adm-text-muted)', whiteSpace: 'nowrap', fontSize: 12 }}>{new Date(msg.submittedAt).toLocaleDateString()}</td>
                        <td onClick={(e) => e.stopPropagation()}>
                          <div className="adm-table-actions">
                            <button className="adm-btn adm-btn-ghost adm-btn-sm" onClick={() => toggleRead(msg.id, msg.read)}>{msg.read ? 'Unread' : 'Read'}</button>
                            <button className="adm-btn adm-btn-danger adm-btn-sm" onClick={() => setConfirmDelete(msg.id)}>Del</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {totalPages > 1 && <div className="adm-pagination"><button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>‹</button>{Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (<button key={p} onClick={() => setPage(p)} className={p === page ? 'active' : ''}>{p}</button>))}<button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>›</button></div>}
            </>
          )}
        </div>

        {/* Detail */}
        {selected && (
          <div className="adm-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 className="adm-section-title">Message Detail</h3>
              <button className="adm-modal-close" onClick={() => setSelected(null)}>×</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                ['From', selected.name],
                ['Email', selected.email],
                ['Phone', selected.phone],
                ['Organization', selected.organization],
                ['Type', selected.inquiryType],
                ['Domain', selected.serviceDomain],
                ['Date', new Date(selected.submittedAt).toLocaleString()],
              ].map(([label, val]) => (
                <div key={label} style={{ borderBottom: '1px solid var(--adm-border)', paddingBottom: 10 }}>
                  <span style={{ fontSize: 11, color: 'var(--adm-text-muted)', display: 'block', marginBottom: 2 }}>{label}</span>
                  <span style={{ fontSize: 13, color: 'var(--adm-text)' }}>{val || '—'}</span>
                </div>
              ))}
              <div>
                <span style={{ fontSize: 11, color: 'var(--adm-text-muted)', display: 'block', marginBottom: 6 }}>Message</span>
                <p style={{ fontSize: 13, color: 'var(--adm-text)', lineHeight: 1.7, background: 'var(--adm-bg-2)', padding: 14, borderRadius: 6, border: '1px solid var(--adm-border)' }}>{selected.message}</p>
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                <button className="adm-btn adm-btn-secondary" style={{ flex: 1, justifyContent: 'center' }} onClick={() => toggleRead(selected.id, selected.read)}>{selected.read ? 'Mark Unread' : 'Mark Read'}</button>
                <button className="adm-btn adm-btn-danger" onClick={() => setConfirmDelete(selected.id)}>Delete</button>
              </div>
            </div>
          </div>
        )}
      </div>

      <ConfirmDialog isOpen={!!confirmDelete} title="Delete Message" message="Delete this message? This cannot be undone." confirmLabel="Delete" danger onConfirm={() => confirmDelete && handleDelete(confirmDelete)} onCancel={() => setConfirmDelete(null)} />
    </div>
  );
}
