// ============================================================
// DOMINOVA ADMIN — Data Types
// All shared TypeScript interfaces for the CMS data layer.
// Keeping these separate from UI means Supabase migration
// only requires changes in storage.ts and db.ts, never here.
// ============================================================

export type PublishStatus = 'published' | 'draft' | 'archived';
export type ApplicationStatus = 'new' | 'reviewing' | 'shortlisted' | 'accepted' | 'rejected' | 'completed';

// Base entity shared by all records
export interface BaseEntity {
  id: string;
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
}

// ── Admin Auth ────────────────────────────────────────────
export interface AdminUser extends BaseEntity {
  email: string;
  passwordHash: string; // SHA-256 hex, never plain text
  name: string;
}

export interface AdminSession {
  userId: string;
  email: string;
  name: string;
  token: string;
  expiresAt: string; // ISO timestamp
}

// ── Internships ───────────────────────────────────────────
export interface Internship extends BaseEntity {
  title: string;
  slug: string;
  description: string;
  duration: string;        // e.g. "3 Months"
  mode: string;            // "Hybrid" | "Remote" | "In-Person"
  location: string;        // e.g. "Chennai, India"
  skills: string[];
  eligibility: string;
  stipend: string;         // e.g. "Unpaid" | "₹5,000/month"
  applicationDeadline: string; // ISO date
  applicationUrl: string;
  category: string;
  bannerImage: string;
  featured: boolean;
  status: PublishStatus;
  sortOrder: number;
}

// ── Applications ──────────────────────────────────────────
export interface Application extends BaseEntity {
  applicantName: string;
  email: string;
  phone: string;
  college: string;
  yearOfStudy: string;
  internshipId: string;      // reference
  internshipTitle: string;   // denormalized for quick display
  status: ApplicationStatus;
  notes: string;             // internal admin notes
  appliedAt: string;         // ISO timestamp
}

// ── Services ──────────────────────────────────────────────
export interface Service extends BaseEntity {
  num: string;               // display number e.g. "01"
  title: string;
  sub: string;               // short description
  description: string;       // long description
  image: string;
  tags: string[];
  features: string[];
  cta: string;
  featured: boolean;
  status: PublishStatus;
  sortOrder: number;
}

// ── Projects ──────────────────────────────────────────────
export interface Project extends BaseEntity {
  title: string;
  shortDescription: string;
  description: string;
  client: string;
  technologies: string[];
  image: string;
  projectUrl: string;
  githubUrl: string;
  category: string;
  featured: boolean;
  status: PublishStatus;
  sortOrder: number;
}

// ── Testimonials ──────────────────────────────────────────
export interface Testimonial extends BaseEntity {
  name: string;
  role: string;
  company: string;
  profileImage: string;
  testimonial: string;
  rating: number; // 1-5
  featured: boolean;
  status: PublishStatus;
  sortOrder: number;
}

// ── Blog Posts ────────────────────────────────────────────
export interface BlogPost extends BaseEntity {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  publishDate: string;
  readingTime: string;
  seoTitle: string;
  seoDescription: string;
  tags: string[];
  featured: boolean;
  status: PublishStatus;
}

// ── Messages (Contact Form) ───────────────────────────────
export interface Message extends BaseEntity {
  name: string;
  email: string;
  phone: string;
  organization: string;
  inquiryType: string;
  serviceDomain: string;
  message: string;
  read: boolean;
  submittedAt: string; // ISO timestamp
}

// ── Team Members ──────────────────────────────────────────
export interface TeamMember extends BaseEntity {
  name: string;
  position: string;
  bio: string;
  profileImage: string;
  skills: string[];
  linkedin: string;
  github: string;
  email: string;
  status: PublishStatus;
  sortOrder: number;
}

// ── Site Settings ─────────────────────────────────────────
export interface SiteSettings {
  // General
  companyName: string;
  logoUrl: string;
  faviconUrl: string;
  contactEmail: string;
  phone: string;
  address: string;
  // Social
  linkedin: string;
  github: string;
  instagram: string;
  youtube: string;
  // SEO
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  // Contact
  whatsapp: string;
  updatedAt: string;
}

// ── DB Collection Map ─────────────────────────────────────
// Maps collection names to their types — useful for generic operations
export interface CollectionMap {
  internships: Internship;
  applications: Application;
  services: Service;
  projects: Project;
  testimonials: Testimonial;
  blog_posts: BlogPost;
  messages: Message;
  team_members: TeamMember;
}

export type CollectionName = keyof CollectionMap;
