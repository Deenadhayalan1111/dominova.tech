// ============================================================
// DOMINOVA ADMIN — Database Operations (CRUD)
//
// All data operations go through this file.
// The UI never touches localStorage directly.
//
// To migrate to Supabase:
//   1. Replace storage.getCollection / setCollection calls
//      with supabase.from('table').select() / insert() / update() / delete()
//   2. Keep the same exported function signatures
//   3. Update the return types if Supabase adds metadata fields
// ============================================================

import { storage } from './storage';
import { generateId } from './auth';
import type {
  CollectionName,
  CollectionMap,
  Internship,
  Application,
  Service,
  Project,
  Testimonial,
  BlogPost,
  Message,
  TeamMember,
  SiteSettings,
} from './types';

// ── Generic CRUD ──────────────────────────────────────────

function now(): string {
  return new Date().toISOString();
}

/**
 * Read all items from a collection.
 */
export function findAll<K extends CollectionName>(
  collection: K
): CollectionMap[K][] {
  return storage.getCollection<CollectionMap[K]>(collection);
}

/**
 * Find an item by ID.
 */
export function findById<K extends CollectionName>(
  collection: K,
  id: string
): CollectionMap[K] | null {
  const items = findAll(collection);
  return (items.find((item: CollectionMap[K]) => (item as { id: string }).id === id) as CollectionMap[K]) ?? null;
}

/**
 * Create a new item.
 */
export function create<K extends CollectionName>(
  collection: K,
  data: Omit<CollectionMap[K], 'id' | 'createdAt' | 'updatedAt'>
): CollectionMap[K] {
  const items = findAll(collection);
  const newItem = {
    ...data,
    id: generateId(),
    createdAt: now(),
    updatedAt: now(),
  } as CollectionMap[K];
  storage.setCollection(collection, [...items, newItem]);
  return newItem;
}

/**
 * Update an existing item by ID.
 */
export function update<K extends CollectionName>(
  collection: K,
  id: string,
  data: Partial<Omit<CollectionMap[K], 'id' | 'createdAt'>>
): CollectionMap[K] | null {
  const items = findAll(collection);
  let updated: CollectionMap[K] | null = null;
  const newItems = items.map((item: CollectionMap[K]) => {
    if ((item as { id: string }).id === id) {
      updated = { ...item, ...data, updatedAt: now() } as CollectionMap[K];
      return updated;
    }
    return item;
  });
  if (updated) {
    storage.setCollection(collection, newItems);
  }
  return updated;
}

/**
 * Delete an item by ID.
 */
export function remove<K extends CollectionName>(
  collection: K,
  id: string
): boolean {
  const items = findAll(collection);
  const filtered = items.filter((item: CollectionMap[K]) => (item as { id: string }).id !== id);
  if (filtered.length === items.length) return false;
  storage.setCollection(collection, filtered);
  return true;
}

/**
 * Reorder a collection using an array of IDs.
 */
export function reorder<K extends CollectionName>(
  collection: K,
  orderedIds: string[]
): void {
  const items = findAll(collection);
  const reordered = orderedIds
    .map((id, idx) => {
      const item = items.find((i: CollectionMap[K]) => (i as { id: string }).id === id);
      if (!item) return null;
      return { ...item, sortOrder: idx, updatedAt: now() } as CollectionMap[K];
    })
    .filter(Boolean) as CollectionMap[K][];
  storage.setCollection(collection, reordered);
}

// ── Internship-specific ───────────────────────────────────

export const internships = {
  findAll: () => findAll('internships').sort((a, b) => a.sortOrder - b.sortOrder),
  findPublished: () =>
    findAll('internships')
      .filter((i) => i.status === 'published')
      .sort((a, b) => a.sortOrder - b.sortOrder),
  findById: (id: string) => findById('internships', id),
  create: (data: Omit<Internship, 'id' | 'createdAt' | 'updatedAt'>) =>
    create('internships', data),
  update: (id: string, data: Partial<Omit<Internship, 'id' | 'createdAt'>>) =>
    update('internships', id, data),
  remove: (id: string) => remove('internships', id),
};

// ── Application-specific ──────────────────────────────────

export const applications = {
  findAll: () =>
    findAll('applications').sort(
      (a, b) => new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime()
    ),
  findByStatus: (status: Application['status']) =>
    findAll('applications').filter((a) => a.status === status),
  findById: (id: string) => findById('applications', id),
  create: (data: Omit<Application, 'id' | 'createdAt' | 'updatedAt'>) =>
    create('applications', data),
  update: (id: string, data: Partial<Omit<Application, 'id' | 'createdAt'>>) =>
    update('applications', id, data),
  remove: (id: string) => remove('applications', id),
  countByStatus: (status: Application['status']) =>
    findAll('applications').filter((a) => a.status === status).length,
};

// ── Service-specific ──────────────────────────────────────

export const services = {
  findAll: () => findAll('services').sort((a, b) => a.sortOrder - b.sortOrder),
  findPublished: () =>
    findAll('services')
      .filter((s) => s.status === 'published')
      .sort((a, b) => a.sortOrder - b.sortOrder),
  findById: (id: string) => findById('services', id),
  create: (data: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>) =>
    create('services', data),
  update: (id: string, data: Partial<Omit<Service, 'id' | 'createdAt'>>) =>
    update('services', id, data),
  remove: (id: string) => remove('services', id),
};

// ── Project-specific ──────────────────────────────────────

export const projects = {
  findAll: () => findAll('projects').sort((a, b) => a.sortOrder - b.sortOrder),
  findPublished: () =>
    findAll('projects')
      .filter((p) => p.status === 'published')
      .sort((a, b) => a.sortOrder - b.sortOrder),
  findById: (id: string) => findById('projects', id),
  create: (data: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) =>
    create('projects', data),
  update: (id: string, data: Partial<Omit<Project, 'id' | 'createdAt'>>) =>
    update('projects', id, data),
  remove: (id: string) => remove('projects', id),
};

// ── Testimonial-specific ──────────────────────────────────

export const testimonials = {
  findAll: () => findAll('testimonials').sort((a, b) => a.sortOrder - b.sortOrder),
  findPublished: () =>
    findAll('testimonials')
      .filter((t) => t.status === 'published')
      .sort((a, b) => a.sortOrder - b.sortOrder),
  findById: (id: string) => findById('testimonials', id),
  create: (data: Omit<Testimonial, 'id' | 'createdAt' | 'updatedAt'>) =>
    create('testimonials', data),
  update: (id: string, data: Partial<Omit<Testimonial, 'id' | 'createdAt'>>) =>
    update('testimonials', id, data),
  remove: (id: string) => remove('testimonials', id),
};

// ── Blog-specific ─────────────────────────────────────────

export const blogPosts = {
  findAll: () =>
    findAll('blog_posts').sort(
      (a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
    ),
  findPublished: () =>
    findAll('blog_posts').filter((p) => p.status === 'published'),
  findBySlug: (slug: string) =>
    findAll('blog_posts').find((p) => p.slug === slug) ?? null,
  findById: (id: string) => findById('blog_posts', id),
  create: (data: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>) =>
    create('blog_posts', data),
  update: (id: string, data: Partial<Omit<BlogPost, 'id' | 'createdAt'>>) =>
    update('blog_posts', id, data),
  remove: (id: string) => remove('blog_posts', id),
};

// ── Messages-specific ─────────────────────────────────────

export const messages = {
  findAll: () =>
    findAll('messages').sort(
      (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
    ),
  findUnread: () => findAll('messages').filter((m) => !m.read),
  findById: (id: string) => findById('messages', id),
  create: (data: Omit<Message, 'id' | 'createdAt' | 'updatedAt'>) =>
    create('messages', data),
  update: (id: string, data: Partial<Omit<Message, 'id' | 'createdAt'>>) =>
    update('messages', id, data),
  remove: (id: string) => remove('messages', id),
  markRead: (id: string) => update('messages', id, { read: true }),
  markUnread: (id: string) => update('messages', id, { read: false }),
  countUnread: () => findAll('messages').filter((m) => !m.read).length,
};

// ── Team-specific ─────────────────────────────────────────

export const teamMembers = {
  findAll: () =>
    findAll('team_members').sort((a, b) => a.sortOrder - b.sortOrder),
  findPublished: () =>
    findAll('team_members')
      .filter((t) => t.status === 'published')
      .sort((a, b) => a.sortOrder - b.sortOrder),
  findById: (id: string) => findById('team_members', id),
  create: (data: Omit<TeamMember, 'id' | 'createdAt' | 'updatedAt'>) =>
    create('team_members', data),
  update: (id: string, data: Partial<Omit<TeamMember, 'id' | 'createdAt'>>) =>
    update('team_members', id, data),
  remove: (id: string) => remove('team_members', id),
};

// ── Site Settings ─────────────────────────────────────────

export const siteSettings = {
  get: (): SiteSettings => {
    const defaults: SiteSettings = {
      companyName: 'Dominova',
      logoUrl: '',
      faviconUrl: '',
      contactEmail: 'admin@dominova.tech',
      phone: '',
      address: 'Chennai, Tamil Nadu, India',
      linkedin: 'https://www.linkedin.com/in/deepak-b-34734b279',
      github: '',
      instagram: 'https://instagram.com/dominova_chennai_',
      youtube: '',
      seoTitle: 'Dominova – Enterprise Technology Solutions & Software Internships',
      seoDescription:
        'Dominova delivers custom web development, mobile apps, custom software engineering, cloud infrastructure, cybersecurity, and industry-oriented software internships in Chennai, India.',
      seoKeywords:
        'Dominova, IT company Chennai, software development Chennai, web development, mobile app development, software internship Chennai',
      whatsapp: '',
      updatedAt: new Date().toISOString(),
    };
    const stored = storage.get<SiteSettings>('site_settings');
    return stored ? { ...defaults, ...stored } : defaults;
  },

  update: (data: Partial<SiteSettings>): SiteSettings => {
    const current = siteSettings.get();
    const updated: SiteSettings = { ...current, ...data, updatedAt: new Date().toISOString() };
    storage.set('site_settings', updated);
    return updated;
  },
};
