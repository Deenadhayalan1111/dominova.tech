import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../../lib/data/auth';
import { useAdmin } from '../../context/AdminContext';
import DominovaLogo from '../../../components/Common/DominovaLogo';
import './AdminLogin.css';

export default function AdminLogin() {
  const navigate = useNavigate();
  const { setSession, showToast } = useAdmin();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const session = await login(email.trim(), password);
      if (session) {
        setSession(session);
        showToast('success', `Welcome back, ${session.name}!`);
        navigate('/admin');
      } else {
        setError('Invalid email or password. Please try again.');
      }
    } catch {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="adm-login">
      {/* Background glow */}
      <div className="adm-login__glow" />

      <div className="adm-login__card">
        {/* Brand */}
        <div className="adm-login__brand">
          <DominovaLogo height={36} showText={true} />
          <span className="adm-login__brand-badge">Admin Panel</span>
        </div>

        <div className="adm-login__header">
          <h1 className="adm-login__title">Welcome back</h1>
          <p className="adm-login__subtitle">Sign in to the Dominova Admin Panel</p>
        </div>

        {/* Error */}
        {error && (
          <div className="adm-login__error" role="alert">
            <span>⚠</span> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="adm-login__form">
          {/* Email */}
          <div className="adm-form-group">
            <label htmlFor="adm-email" className="adm-form-label">
              Email Address
            </label>
            <input
              id="adm-email"
              type="email"
              className="adm-form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@dominova.tech"
              required
              autoComplete="email"
              autoFocus
            />
          </div>

          {/* Password */}
          <div className="adm-form-group">
            <label htmlFor="adm-password" className="adm-form-label">
              Password
            </label>
            <div className="adm-login__password-wrap">
              <input
                id="adm-password"
                type={showPassword ? 'text' : 'password'}
                className="adm-form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your admin password"
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                className="adm-login__password-toggle"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? '👁' : '👁‍🗨'}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="adm-btn adm-btn-primary adm-btn-lg adm-login__submit"
            id="adm-login-submit"
          >
            {loading ? (
              <>
                <span className="adm-spinner" style={{ width: 16, height: 16 }} />
                Signing in...
              </>
            ) : (
              'Sign In to Admin'
            )}
          </button>
        </form>

        {/* Footer note */}
        <p className="adm-login__footer-note">
          Change your password after first login from{' '}
          <strong>Settings → Security</strong>
        </p>
      </div>
    </div>
  );
}
