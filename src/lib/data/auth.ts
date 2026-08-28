// ============================================================
// DOMINOVA ADMIN — Authentication
//
// Handles admin login, session management, and password hashing.
// Uses Web Crypto API (SubtleCrypto) for SHA-256 password hashing.
// Passwords are NEVER stored in plain text.
//
// To migrate to Supabase Auth:
//   - Replace hashPassword() with supabase.auth.signInWithPassword()
//   - Replace session logic with supabase session tokens
//   - Keep the same exported function signatures
// ============================================================

import { storage } from './storage';
import type { AdminUser, AdminSession } from './types';

const ADMIN_KEY = 'admin_user';
const SESSION_KEY = 'admin_session';
const SESSION_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours

/**
 * SHA-256 hash using the browser's Web Crypto API.
 * Returns a lowercase hex string.
 */
export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + 'dominova_salt_2025');
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Generate a random session token.
 */
function generateToken(): string {
  return crypto.randomUUID();
}

/**
 * Generate a UUID for new records.
 */
export function generateId(): string {
  return crypto.randomUUID();
}

/**
 * Initialize the admin account on first run.
 * Called once from seeds.ts. Uses the initial password hash.
 * The admin should change their password from Settings after first login.
 */
export async function initAdminAccount(): Promise<void> {
  if (storage.isAdminInitialized()) return;

  const initialPasswordHash = await hashPassword('CHANGE_THIS_TO_MY_PASSWORD');

  const adminUser: AdminUser = {
    id: generateId(),
    email: 'admin@dominova.tech',
    passwordHash: initialPasswordHash,
    name: 'Admin',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  storage.set<AdminUser>(ADMIN_KEY, adminUser);
  storage.markAdminInitialized();
}

/**
 * Attempt to log in with email + password.
 * Returns the session on success, null on failure.
 */
export async function login(
  email: string,
  password: string
): Promise<AdminSession | null> {
  const adminUser = storage.get<AdminUser>(ADMIN_KEY);
  if (!adminUser) return null;

  if (adminUser.email.toLowerCase() !== email.toLowerCase()) return null;

  const inputHash = await hashPassword(password);
  if (inputHash !== adminUser.passwordHash) return null;

  const session: AdminSession = {
    userId: adminUser.id,
    email: adminUser.email,
    name: adminUser.name,
    token: generateToken(),
    expiresAt: new Date(Date.now() + SESSION_DURATION_MS).toISOString(),
  };

  storage.set<AdminSession>(SESSION_KEY, session);
  return session;
}

/**
 * Log out — clears the current session.
 */
export function logout(): void {
  storage.remove(SESSION_KEY);
}

/**
 * Return the current session if it is valid (not expired).
 */
export function getSession(): AdminSession | null {
  const session = storage.get<AdminSession>(SESSION_KEY);
  if (!session) return null;

  if (new Date(session.expiresAt) < new Date()) {
    storage.remove(SESSION_KEY);
    return null;
  }

  return session;
}

/**
 * Returns true if the user is currently authenticated.
 */
export function isAuthenticated(): boolean {
  return getSession() !== null;
}

/**
 * Change the admin password.
 * Validates the old password before accepting the new one.
 */
export async function changePassword(
  oldPassword: string,
  newPassword: string
): Promise<{ success: boolean; error?: string }> {
  const adminUser = storage.get<AdminUser>(ADMIN_KEY);
  if (!adminUser) return { success: false, error: 'Admin account not found.' };

  const oldHash = await hashPassword(oldPassword);
  if (oldHash !== adminUser.passwordHash) {
    return { success: false, error: 'Current password is incorrect.' };
  }

  if (newPassword.length < 8) {
    return { success: false, error: 'New password must be at least 8 characters.' };
  }

  const newHash = await hashPassword(newPassword);
  const updated: AdminUser = {
    ...adminUser,
    passwordHash: newHash,
    updatedAt: new Date().toISOString(),
  };

  storage.set<AdminUser>(ADMIN_KEY, updated);
  return { success: true };
}

/**
 * Update the admin profile (name, email).
 */
export async function updateAdminProfile(
  updates: Partial<Pick<AdminUser, 'name' | 'email'>>
): Promise<void> {
  const adminUser = storage.get<AdminUser>(ADMIN_KEY);
  if (!adminUser) return;

  const updated: AdminUser = {
    ...adminUser,
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  storage.set<AdminUser>(ADMIN_KEY, updated);

  // Refresh session with new name/email
  const session = getSession();
  if (session) {
    const updatedSession: AdminSession = {
      ...session,
      email: updates.email ?? session.email,
      name: updates.name ?? session.name,
    };
    storage.set<AdminSession>(SESSION_KEY, updatedSession);
  }
}

/**
 * Get the stored admin user (without the password hash).
 */
export function getAdminUser(): Omit<AdminUser, 'passwordHash'> | null {
  const adminUser = storage.get<AdminUser>(ADMIN_KEY);
  if (!adminUser) return null;
  const { passwordHash: _, ...safeUser } = adminUser;
  return safeUser;
}
