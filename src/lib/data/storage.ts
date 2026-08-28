// ============================================================
// DOMINOVA ADMIN — Storage Adapter
//
// This is the ONLY file that touches localStorage.
// To migrate to Supabase: create supabase-storage.ts with the
// same interface and swap the import in db.ts. No UI changes needed.
// ============================================================

const PREFIX = 'dominova_';

export const storage = {
  /**
   * Read a collection as an array of items.
   * Returns an empty array if the key doesn't exist.
   */
  getCollection<T>(collection: string): T[] {
    try {
      const raw = localStorage.getItem(`${PREFIX}${collection}`);
      if (!raw) return [];
      return JSON.parse(raw) as T[];
    } catch {
      return [];
    }
  },

  /**
   * Write an entire collection back to storage.
   */
  setCollection<T>(collection: string, items: T[]): void {
    try {
      localStorage.setItem(`${PREFIX}${collection}`, JSON.stringify(items));
    } catch (e) {
      console.error(`[Dominova DB] Failed to write collection "${collection}":`, e);
    }
  },

  /**
   * Read a single key-value (for settings, session, etc.)
   */
  get<T>(key: string): T | null {
    try {
      const raw = localStorage.getItem(`${PREFIX}${key}`);
      if (!raw) return null;
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  },

  /**
   * Write a single key-value.
   */
  set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(`${PREFIX}${key}`, JSON.stringify(value));
    } catch (e) {
      console.error(`[Dominova DB] Failed to write key "${key}":`, e);
    }
  },

  /**
   * Remove a key.
   */
  remove(key: string): void {
    localStorage.removeItem(`${PREFIX}${key}`);
  },

  /**
   * Check if the data store has been seeded.
   */
  isSeeded(): boolean {
    return localStorage.getItem(`${PREFIX}__seeded`) === 'true';
  },

  /**
   * Mark as seeded.
   */
  markSeeded(): void {
    localStorage.setItem(`${PREFIX}__seeded`, 'true');
  },

  /**
   * Check if the admin account has been initialized.
   */
  isAdminInitialized(): boolean {
    return localStorage.getItem(`${PREFIX}__admin_init`) === 'true';
  },

  /**
   * Mark admin as initialized.
   */
  markAdminInitialized(): void {
    localStorage.setItem(`${PREFIX}__admin_init`, 'true');
  },
};
