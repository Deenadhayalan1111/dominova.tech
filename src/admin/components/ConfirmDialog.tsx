interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  danger?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  danger = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="adm-modal-overlay" role="dialog" aria-modal="true">
      <div className="adm-modal" style={{ maxWidth: 400 }}>
        <div className="adm-modal-header">
          <span className="adm-modal-title">{title}</span>
          <button className="adm-modal-close" onClick={onCancel} aria-label="Close">×</button>
        </div>
        <div className="adm-modal-body">
          <p style={{ fontSize: 14, color: 'var(--adm-text-muted)', lineHeight: 1.6 }}>{message}</p>
        </div>
        <div className="adm-modal-footer">
          <button className="adm-btn adm-btn-secondary" onClick={onCancel}>
            {cancelLabel}
          </button>
          <button
            className={`adm-btn ${danger ? 'adm-btn-danger' : 'adm-btn-primary'}`}
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
