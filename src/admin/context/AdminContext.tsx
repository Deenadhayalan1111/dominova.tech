import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { AdminSession } from '../../lib/data/types';
import { getSession, logout as authLogout } from '../../lib/data/auth';
import { messages } from '../../lib/data/db';

interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
}

interface AdminContextValue {
  session: AdminSession | null;
  setSession: (s: AdminSession | null) => void;
  logout: () => void;
  toasts: Toast[];
  showToast: (type: Toast['type'], message: string) => void;
  dismissToast: (id: string) => void;
  unreadCount: number;
  refreshUnread: () => void;
}

const AdminContext = createContext<AdminContextValue | null>(null);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<AdminSession | null>(() => getSession());
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const refreshUnread = useCallback(() => {
    setUnreadCount(messages.countUnread());
  }, []);

  useEffect(() => {
    refreshUnread();
    const interval = setInterval(refreshUnread, 30000); // poll every 30s
    return () => clearInterval(interval);
  }, [refreshUnread]);

  const logout = useCallback(() => {
    authLogout();
    setSession(null);
  }, []);

  const showToast = useCallback((type: Toast['type'], message: string) => {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <AdminContext.Provider
      value={{ session, setSession, logout, toasts, showToast, dismissToast, unreadCount, refreshUnread }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin(): AdminContextValue {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error('useAdmin must be used within AdminProvider');
  return ctx;
}
