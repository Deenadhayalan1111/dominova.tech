import { useState, useEffect } from 'react';
import { siteSettings } from '../../../lib/data/db';
import { changePassword, updateAdminProfile, getAdminUser } from '../../../lib/data/auth';
import { useAdmin } from '../../context/AdminContext';
import type { SiteSettings } from '../../../lib/data/types';

export default function SettingsPage() {
  const { showToast, session } = useAdmin();
  const [settings, setSettings] = useState<SiteSettings>(siteSettings.get());
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'general' | 'social' | 'seo' | 'security'>('general');

  // Password change
  const [oldPw, setOldPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [pwLoading, setPwLoading] = useState(false);

  // Admin profile
  const [adminName, setAdminName] = useState('');
  const [adminEmail, setAdminEmail] = useState('');

  useEffect(() => {
    const user = getAdminUser();
    if (user) { setAdminName(user.name); setAdminEmail(user.email); }
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      siteSettings.update(settings);
      showToast('success', 'Settings saved successfully.');
    } catch { showToast('error', 'Failed to save settings.'); }
    finally { setSaving(false); }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPw !== confirmPw) { showToast('error', 'New passwords do not match.'); return; }
    if (newPw.length < 8) { showToast('error', 'Password must be at least 8 characters.'); return; }
    setPwLoading(true);
    const result = await changePassword(oldPw, newPw);
    if (result.success) {
      showToast('success', 'Password changed successfully. Please log in again if needed.');
      setOldPw(''); setNewPw(''); setConfirmPw('');
    } else {
      showToast('error', result.error ?? 'Failed to change password.');
    }
    setPwLoading(false);
  };

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateAdminProfile({ name: adminName, email: adminEmail });
    showToast('success', 'Profile updated. Refresh to see changes.');
  };

  const h = (key: keyof SiteSettings, val: string) => setSettings((p) => ({ ...p, [key]: val }));

  const tabs: { id: typeof activeTab; label: string }[] = [
    { id: 'general', label: 'General' },
    { id: 'social', label: 'Social' },
    { id: 'seo', label: 'SEO' },
    { id: 'security', label: 'Security' },
  ];

  return (
    <div>
      <div className="adm-page-header">
        <div className="adm-page-header-left"><span className="adm-label">System</span><h2 className="adm-page-title">Settings</h2></div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 2, marginBottom: 24, borderBottom: '1px solid var(--adm-border)', paddingBottom: 0 }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '10px 18px',
              fontSize: 13,
              fontWeight: 500,
              color: activeTab === tab.id ? 'var(--adm-gold)' : 'var(--adm-text-muted)',
              borderBottom: activeTab === tab.id ? '2px solid var(--adm-gold)' : '2px solid transparent',
              background: 'none',
              cursor: 'pointer',
              transition: 'all 0.15s',
              marginBottom: -1,
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* General */}
      {activeTab === 'general' && (
        <form onSubmit={handleSave}>
          <div className="adm-card" style={{ maxWidth: 680 }}>
            <h3 className="adm-section-title" style={{ marginBottom: 20 }}>General Information</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="adm-form-group"><label className="adm-form-label">Company Name</label><input className="adm-form-input" value={settings.companyName} onChange={(e) => h('companyName', e.target.value)} /></div>
              <div className="adm-form-group"><label className="adm-form-label">Contact Email</label><input className="adm-form-input" type="email" value={settings.contactEmail} onChange={(e) => h('contactEmail', e.target.value)} /></div>
              <div className="adm-form-group"><label className="adm-form-label">Phone</label><input className="adm-form-input" value={settings.phone} onChange={(e) => h('phone', e.target.value)} /></div>
              <div className="adm-form-group"><label className="adm-form-label">Address</label><input className="adm-form-input" value={settings.address} onChange={(e) => h('address', e.target.value)} /></div>
              <div className="adm-form-group"><label className="adm-form-label">WhatsApp Number</label><input className="adm-form-input" value={settings.whatsapp} onChange={(e) => h('whatsapp', e.target.value)} placeholder="+91 98765 43210" /></div>
              <button type="submit" disabled={saving} className="adm-btn adm-btn-primary" style={{ width: 'fit-content' }}>{saving ? 'Saving...' : 'Save General Settings'}</button>
            </div>
          </div>
        </form>
      )}

      {/* Social */}
      {activeTab === 'social' && (
        <form onSubmit={handleSave}>
          <div className="adm-card" style={{ maxWidth: 680 }}>
            <h3 className="adm-section-title" style={{ marginBottom: 20 }}>Social Links</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="adm-form-group"><label className="adm-form-label">LinkedIn</label><input className="adm-form-input" type="url" value={settings.linkedin} onChange={(e) => h('linkedin', e.target.value)} placeholder="https://linkedin.com/in/..." /></div>
              <div className="adm-form-group"><label className="adm-form-label">Instagram</label><input className="adm-form-input" type="url" value={settings.instagram} onChange={(e) => h('instagram', e.target.value)} placeholder="https://instagram.com/..." /></div>
              <div className="adm-form-group"><label className="adm-form-label">GitHub</label><input className="adm-form-input" type="url" value={settings.github} onChange={(e) => h('github', e.target.value)} placeholder="https://github.com/..." /></div>
              <div className="adm-form-group"><label className="adm-form-label">YouTube</label><input className="adm-form-input" type="url" value={settings.youtube} onChange={(e) => h('youtube', e.target.value)} placeholder="https://youtube.com/..." /></div>
              <button type="submit" disabled={saving} className="adm-btn adm-btn-primary" style={{ width: 'fit-content' }}>{saving ? 'Saving...' : 'Save Social Links'}</button>
            </div>
          </div>
        </form>
      )}

      {/* SEO */}
      {activeTab === 'seo' && (
        <form onSubmit={handleSave}>
          <div className="adm-card" style={{ maxWidth: 680 }}>
            <h3 className="adm-section-title" style={{ marginBottom: 20 }}>SEO Settings</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="adm-form-group"><label className="adm-form-label">Default SEO Title</label><input className="adm-form-input" value={settings.seoTitle} onChange={(e) => h('seoTitle', e.target.value)} /><p className="adm-form-hint">Recommended: 50-60 characters. Current: {settings.seoTitle.length}</p></div>
              <div className="adm-form-group"><label className="adm-form-label">Meta Description</label><textarea className="adm-form-textarea" value={settings.seoDescription} onChange={(e) => h('seoDescription', e.target.value)} rows={3} /><p className="adm-form-hint">Recommended: 150-160 characters. Current: {settings.seoDescription.length}</p></div>
              <div className="adm-form-group"><label className="adm-form-label">Keywords</label><input className="adm-form-input" value={settings.seoKeywords} onChange={(e) => h('seoKeywords', e.target.value)} placeholder="keyword1, keyword2, ..." /></div>
              <button type="submit" disabled={saving} className="adm-btn adm-btn-primary" style={{ width: 'fit-content' }}>{saving ? 'Saving...' : 'Save SEO Settings'}</button>
            </div>
          </div>
        </form>
      )}

      {/* Security */}
      {activeTab === 'security' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 680 }}>
          {/* Profile */}
          <form className="adm-card" onSubmit={handleProfileSave}>
            <h3 className="adm-section-title" style={{ marginBottom: 20 }}>Admin Profile</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ padding: '10px 14px', background: 'var(--adm-bg-2)', border: '1px solid var(--adm-border)', borderRadius: 'var(--adm-radius)', fontSize: 12, color: 'var(--adm-text-muted)' }}>
                Logged in as: <strong style={{ color: 'var(--adm-text)' }}>{session?.email}</strong>
              </div>
              <div className="adm-form-group"><label className="adm-form-label">Display Name</label><input className="adm-form-input" value={adminName} onChange={(e) => setAdminName(e.target.value)} /></div>
              <div className="adm-form-group"><label className="adm-form-label">Email</label><input className="adm-form-input" type="email" value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} /></div>
              <button type="submit" className="adm-btn adm-btn-primary" style={{ width: 'fit-content' }}>Save Profile</button>
            </div>
          </form>

          {/* Password */}
          <form className="adm-card" onSubmit={handlePasswordChange}>
            <h3 className="adm-section-title" style={{ marginBottom: 4 }}>Change Password</h3>
            <p style={{ fontSize: 12, color: 'var(--adm-text-muted)', marginBottom: 20 }}>Use this to change your admin login password.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="adm-form-group"><label className="adm-form-label">Current Password</label><input className="adm-form-input" type="password" value={oldPw} onChange={(e) => setOldPw(e.target.value)} required /></div>
              <div className="adm-form-group"><label className="adm-form-label">New Password</label><input className="adm-form-input" type="password" value={newPw} onChange={(e) => setNewPw(e.target.value)} required minLength={8} /><p className="adm-form-hint">Minimum 8 characters</p></div>
              <div className="adm-form-group"><label className="adm-form-label">Confirm New Password</label><input className="adm-form-input" type="password" value={confirmPw} onChange={(e) => setConfirmPw(e.target.value)} required /></div>
              <button type="submit" disabled={pwLoading} className="adm-btn adm-btn-primary" style={{ width: 'fit-content' }}>{pwLoading ? 'Changing...' : 'Change Password'}</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
