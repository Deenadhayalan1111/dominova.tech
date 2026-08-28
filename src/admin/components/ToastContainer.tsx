import { useAdmin } from '../context/AdminContext';

const icons: Record<string, string> = {
  success: '✓',
  error: '✕',
  warning: '⚠',
  info: 'ℹ',
};

export default function ToastContainer() {
  const { toasts, dismissToast } = useAdmin();

  return (
    <div className="adm-toast-container">
      {toasts.map((t) => (
        <div key={t.id} className={`adm-toast ${t.type}`} role="alert">
          <span className="adm-toast-icon">{icons[t.type]}</span>
          <span className="adm-toast-msg">{t.message}</span>
          <button
            className="adm-toast-close"
            onClick={() => dismissToast(t.id)}
            aria-label="Dismiss notification"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
