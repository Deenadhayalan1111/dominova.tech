// ============================================================
// DOMINOVA ADMIN — Seed Data
//
// Populates the data store on first run with content that
// matches the existing hardcoded website content.
// This ensures the public website continues to look exactly
// the same after CMS integration.
// ============================================================

import { storage } from './storage';
import { initAdminAccount } from './auth';
import { services, projects, internships, blogPosts } from './db';
import type { Service, Project, Internship, BlogPost } from './types';

const defaultServices: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    num: '01',
    title: 'WEB DEVELOPMENT',
    sub: 'Polished responsive website interfaces, React & Next.js web applications.',
    description:
      'We build performant, scalable web applications using modern frameworks like React, Next.js, and Node.js. From landing pages to full SaaS platforms.',
    image: '/images/showcase/web_dev.png',
    tags: ['React', 'Next.js', 'Node.js', 'PWA'],
    features: ['Custom Web Apps', 'E-commerce', 'SaaS Platforms', 'SEO-Optimized'],
    cta: 'Inquire Project',
    featured: true,
    status: 'published',
    sortOrder: 0,
  },
  {
    num: '02',
    title: 'APP DEVELOPMENT',
    sub: 'Fluid cross-platform mobile apps for iOS and Android with custom UI.',
    description:
      'Fluid cross-platform mobile applications built with Flutter and React Native. Native performance, beautiful interfaces, and seamless backend integration.',
    image: '/images/showcase/app_dev.png',
    tags: ['Flutter', 'React Native', 'iOS', 'Android'],
    features: ['Cross-Platform', 'Native Performance', 'Custom UI', 'App Store Ready'],
    cta: 'Inquire Project',
    featured: true,
    status: 'published',
    sortOrder: 1,
  },
  {
    num: '03',
    title: 'UI / UX DESIGN',
    sub: 'Design systems, wireframes, interface component libraries, and interactive prototypes.',
    description:
      'Human-centered design that converts. We create design systems, high-fidelity prototypes, and component libraries that your team can actually build from.',
    image: '/images/showcase/ui_ux.png',
    tags: ['Design Systems', 'Figma', 'Prototyping'],
    features: ['Design Systems', 'Wireframing', 'Prototypes', 'User Research'],
    cta: 'Inquire Project',
    featured: false,
    status: 'published',
    sortOrder: 2,
  },
  {
    num: '04',
    title: 'CUSTOM SOFTWARE',
    sub: 'Enterprise SaaS automation, operational dashboards, and custom business workflows.',
    description:
      'Enterprise-grade custom software solutions — from workflow automation and operational dashboards to bespoke SaaS platforms built for your exact business needs.',
    image: '/images/showcase/portfolio.png',
    tags: ['Microservices', 'Python', 'PostgreSQL', 'Docker'],
    features: ['SaaS Automation', 'Dashboards', 'Microservices', 'API Integration'],
    cta: 'Inquire Project',
    featured: true,
    status: 'published',
    sortOrder: 3,
  },
  {
    num: '05',
    title: 'AI & DATA ANALYTICS',
    sub: 'Business intelligence dashboards, predictive data models, and automated analytics.',
    description:
      'Turn your data into competitive advantage. We build BI dashboards, predictive models, and automated analytics pipelines using Python, Pandas, and Power BI.',
    image: '/images/showcase/ai_data.png',
    tags: ['Python', 'Pandas', 'Predictive Models', 'PowerBI'],
    features: ['BI Dashboards', 'Predictive Models', 'Data Pipelines', 'Reporting'],
    cta: 'Inquire Project',
    featured: false,
    status: 'published',
    sortOrder: 4,
  },
  {
    num: '06',
    title: 'CLOUD & CYBERSECURITY',
    sub: 'AWS cloud deployment, CI/CD pipeline automation, and threat monitoring dashboards.',
    description:
      'Secure and scalable cloud infrastructure on AWS, with CI/CD pipeline automation, penetration testing, and real-time threat monitoring.',
    image: '/images/showcase/cybersecurity.png',
    tags: ['AWS', 'DevOps', 'Penetration Testing', 'SIEM'],
    features: ['Cloud Infra', 'CI/CD Pipelines', 'Pen Testing', 'Threat Monitoring'],
    cta: 'Inquire Project',
    featured: false,
    status: 'published',
    sortOrder: 5,
  },
];

const defaultProjects: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    title: 'ENTERPRISE SAAS ANALYTICS',
    shortDescription: 'Custom Software Architecture',
    description:
      'A full-featured enterprise SaaS analytics platform with real-time dashboards, custom reporting, and multi-tenant architecture built for scale.',
    client: 'Enterprise Client',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Docker', 'AWS'],
    image: '/images/showcase/portfolio.png',
    projectUrl: '',
    githubUrl: '',
    category: 'Custom Software Architecture',
    featured: true,
    status: 'published',
    sortOrder: 0,
  },
  {
    title: 'RESPONSIVE WEB ECOSYSTEM',
    shortDescription: 'Full-Stack Web Engineering',
    description:
      'A comprehensive responsive web ecosystem with micro-frontend architecture, server-side rendering, and optimized performance across all devices.',
    client: 'Tech Startup',
    technologies: ['Next.js', 'TypeScript', 'Tailwind', 'Vercel'],
    image: '/images/showcase/web_dev.png',
    projectUrl: '',
    githubUrl: '',
    category: 'Full-Stack Web Engineering',
    featured: true,
    status: 'published',
    sortOrder: 1,
  },
  {
    title: 'CROSS-PLATFORM MOBILE APPLICATION',
    shortDescription: 'iOS & Android App Engineering',
    description:
      'A cross-platform mobile application delivering native iOS and Android performance with a shared Flutter codebase and seamless backend API integration.',
    client: 'Mobile Commerce Client',
    technologies: ['Flutter', 'Dart', 'Firebase', 'REST API'],
    image: '/images/showcase/app_dev.png',
    projectUrl: '',
    githubUrl: '',
    category: 'iOS & Android App Engineering',
    featured: false,
    status: 'published',
    sortOrder: 2,
  },
];

const defaultInternships: Omit<Internship, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    title: 'Web Development Internship',
    slug: 'web-development-internship',
    description:
      'Hands-on React & Node.js web development internship. Build real-world projects with senior mentorship and industry exposure.',
    duration: '3 Months',
    mode: 'Hybrid',
    location: 'Chennai, India',
    skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js'],
    eligibility: '2nd year and above engineering students',
    stipend: 'Unpaid (Certificate Provided)',
    applicationDeadline: '',
    applicationUrl: '',
    category: 'Web Development',
    bannerImage: '/images/showcase/web_dev.png',
    featured: true,
    status: 'published',
    sortOrder: 0,
  },
  {
    title: 'Mobile App Development Internship',
    slug: 'mobile-app-development-internship',
    description:
      'Flutter & React Native cross-platform mobile development with hands-on project experience.',
    duration: '3 Months',
    mode: 'Hybrid',
    location: 'Chennai, India',
    skills: ['Flutter', 'Dart', 'React Native', 'Mobile UI'],
    eligibility: '2nd year and above engineering students',
    stipend: 'Unpaid (Certificate Provided)',
    applicationDeadline: '',
    applicationUrl: '',
    category: 'Mobile App Development',
    bannerImage: '/images/showcase/app_dev.png',
    featured: false,
    status: 'published',
    sortOrder: 1,
  },
  {
    title: 'Data Science & Analytics Internship',
    slug: 'data-science-analytics-internship',
    description:
      'Machine learning, data analysis, and business intelligence with Python, Pandas, and Power BI.',
    duration: '3 Months',
    mode: 'Remote',
    location: 'Chennai, India (Remote)',
    skills: ['Python', 'Pandas', 'NumPy', 'Machine Learning', 'Power BI'],
    eligibility: '3rd year and above engineering/science students',
    stipend: 'Unpaid (Certificate Provided)',
    applicationDeadline: '',
    applicationUrl: '',
    category: 'Data Science & Analytics',
    bannerImage: '/images/showcase/ai_data.png',
    featured: false,
    status: 'published',
    sortOrder: 2,
  },
  {
    title: 'Cybersecurity Internship',
    slug: 'cybersecurity-internship',
    description:
      'Ethical hacking, penetration testing, and threat monitoring with real-world cybersecurity labs.',
    duration: '3 Months',
    mode: 'Hybrid',
    location: 'Chennai, India',
    skills: ['Ethical Hacking', 'Penetration Testing', 'Kali Linux', 'SIEM'],
    eligibility: '3rd year and above engineering students',
    stipend: 'Unpaid (Certificate Provided)',
    applicationDeadline: '',
    applicationUrl: '',
    category: 'Cybersecurity',
    bannerImage: '/images/showcase/cybersecurity.png',
    featured: false,
    status: 'published',
    sortOrder: 3,
  },
  {
    title: 'UI/UX Design Internship',
    slug: 'ui-ux-design-internship',
    description:
      'Design systems, Figma prototyping, and user experience research with real client briefs.',
    duration: '3 Months',
    mode: 'Remote',
    location: 'Chennai, India (Remote)',
    skills: ['Figma', 'UI Design', 'UX Research', 'Prototyping'],
    eligibility: 'Open to all years',
    stipend: 'Unpaid (Certificate Provided)',
    applicationDeadline: '',
    applicationUrl: '',
    category: 'UI/UX Design',
    bannerImage: '/images/showcase/ui_ux.png',
    featured: false,
    status: 'published',
    sortOrder: 4,
  },
  {
    title: 'Cloud & DevOps Internship',
    slug: 'cloud-devops-internship',
    description:
      'AWS cloud infrastructure, CI/CD pipeline automation, and containerization with Docker & Kubernetes.',
    duration: '3 Months',
    mode: 'Remote',
    location: 'Chennai, India (Remote)',
    skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Linux'],
    eligibility: '3rd year and above engineering students',
    stipend: 'Unpaid (Certificate Provided)',
    applicationDeadline: '',
    applicationUrl: '',
    category: 'Cloud Computing & DevOps',
    bannerImage: '/images/showcase/cybersecurity.png',
    featured: false,
    status: 'published',
    sortOrder: 5,
  },
];

const defaultBlogPosts: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    title: 'How to Prepare for a Software Internship in 2025',
    slug: 'how-to-prepare-for-a-software-internship',
    excerpt: 'A complete guide for students looking to land their first software internship. Learn what skills to build, how to create a portfolio, and tips for cracking technical interviews.',
    content: `Securing a software engineering internship in 2025 requires more than just knowing how to code. As the industry evolves, companies are looking for candidates who can demonstrate practical problem-solving, adaptability, and a strong understanding of modern development workflows.

## 1. Master the Fundamentals
While new frameworks emerge constantly, strong fundamentals in Data Structures, Algorithms, and Object-Oriented Programming (OOP) remain the bedrock of any software engineering interview.

## 2. Build Real-World Projects
Tutorials are great for learning syntax, but building your own projects from scratch demonstrates initiative. Focus on solving real problems, implementing authentication, connecting to databases, and deploying your application.

## 3. Understand Git and Collaboration
In a real engineering team, you will rarely work alone. Understand version control, branching strategies, and how to conduct a proper pull request review.

Prepare early, build consistently, and don't be afraid to apply before you feel "ready."`,
    coverImage: '/images/showcase/portfolio.png',
    author: 'Dominova Team',
    publishDate: '2025-03-01',
    readingTime: '8',
    seoTitle: 'How to Prepare for a Software Internship in 2025',
    seoDescription: 'A complete guide for students looking to land their first software internship.',
    tags: ['Career Tips'],
    featured: true,
    status: 'published',
  },
  {
    title: 'Web Development Internship Tips: A Beginner\'s Roadmap',
    slug: 'web-development-internship-roadmap',
    excerpt: 'Starting a web development internship? Here\'s a step-by-step roadmap covering HTML, CSS, JavaScript, React, and backend technologies to help you succeed from day one.',
    content: `Starting a career in web development can feel overwhelming with the sheer number of frameworks and tools available. Here is a focused roadmap for securing your first web development internship.

**Phase 1: The Core Trio**
Master HTML, CSS, and JavaScript. Do not jump to React before you understand DOM manipulation and vanilla JS concepts.

**Phase 2: Modern Frameworks**
Learn React or Vue. Understand component lifecycles, state management, and routing.

**Phase 3: Backend Basics**
Learn how to create a simple Node.js/Express server and connect it to a database like MongoDB or PostgreSQL.

**Phase 4: Build and Deploy**
Deploy your full-stack applications using Vercel, Netlify, or Render.`,
    coverImage: '/images/showcase/web_dev.png',
    author: 'Dominova Team',
    publishDate: '2025-03-01',
    readingTime: '9',
    seoTitle: 'Web Development Internship Roadmap',
    seoDescription: 'A comprehensive roadmap for beginners looking to secure and excel in a web development internship.',
    tags: ['Web Development'],
    featured: false,
    status: 'published',
  },
  {
    title: 'Top 10 Skills Every IT Intern Needs in 2025',
    slug: 'top-10-skills-every-it-intern-needs',
    excerpt: 'Discover the most in-demand technical and soft skills that companies look for when hiring IT interns. From web development to cloud computing, here\'s what you need to know.',
    content: `The technology landscape is shifting rapidly. Here are the top skills every IT intern must develop this year to stand out from the crowd.

### 1. Cloud Computing Basics
Understanding how to deploy applications on AWS, Azure, or GCP is no longer optional.
### 2. Version Control (Git)
You must know how to collaborate on codebases efficiently.
### 3. API Integration
Connecting frontend interfaces with backend services via REST or GraphQL.
### 4. Problem Solving & Debugging
The ability to read logs and stack traces is crucial.
### 5. Prompt Engineering
Using AI tools effectively to accelerate your development workflow.

(Keep developing these skills to ensure you are ready for a full-time role after graduation.)`,
    coverImage: '/images/showcase/web_dev.png',
    author: 'Dominova Team',
    publishDate: '2025-02-01',
    readingTime: '6',
    seoTitle: 'Top 10 Skills Every IT Intern Needs in 2025',
    seoDescription: 'The technology landscape is shifting. Here are the top 10 technical and soft skills every IT intern must develop this year.',
    tags: ['Skills'],
    featured: false,
    status: 'published',
  },
  {
    title: 'Data Science Career Path: From Intern to Data Scientist',
    slug: 'data-science-career-path',
    excerpt: 'Explore the complete data science career roadmap — from your first internship to landing a full-time role. Learn about essential tools, skills, and industry expectations.',
    content: `Data Science remains one of the most sought-after fields in technology. But how do you get from a student to a full-fledged Data Scientist?

**1. The Foundation (Internship Level)**
Focus on Python, SQL, and basic statistical analysis. Your goal should be data cleaning, exploratory data analysis (EDA), and building simple regression or classification models.

**2. The Junior Level**
You will start putting models into production, working with larger datasets, and utilizing tools like Docker and cloud services.

**3. The Senior Level**
Focus shifts to architecture, mentoring, and solving complex business problems using advanced AI/ML techniques.`,
    coverImage: '/images/showcase/ai_data.png',
    author: 'Dominova Team',
    publishDate: '2025-02-01',
    readingTime: '10',
    seoTitle: 'Data Science Career Path',
    seoDescription: 'Explore the journey of becoming a data scientist, starting from a foundational internship.',
    tags: ['Data Science'],
    featured: false,
    status: 'published',
  },
  {
    title: 'How Real-Time Project Internships Help Students Get Hired',
    slug: 'real-time-project-internships',
    excerpt: 'Learn why hands-on project experience during internships is the biggest differentiator for freshers entering the job market. Companies value practical skills over theory.',
    content: `There is a significant gap between what is taught in academic institutions and what the technology industry requires on day one. Real-time project internships bridge this gap.

When you work on a live project, you experience:
- **Changing Requirements:** Learning how to adapt when a client changes their mind.
- **Production Constraints:** Understanding performance, security, and scalability.
- **Team Dynamics:** Communicating with designers, product managers, and senior engineers.

At Dominova, our internship programs are structured entirely around real-time project delivery, ensuring our interns leave with actual portfolio pieces that impress recruiters.`,
    coverImage: '/images/showcase/app_dev.png',
    author: 'Dominova Team',
    publishDate: '2025-01-01',
    readingTime: '7',
    seoTitle: 'How Real-Time Project Internships Help Students Get Hired',
    seoDescription: 'Why working on real-world industry projects is the most effective way to bridge the gap between academic theory and professional employment.',
    tags: ['Industry Insights'],
    featured: false,
    status: 'published',
  },
  {
    title: 'How to Prepare for a Cybersecurity Internship: Complete Guide',
    slug: 'prepare-cybersecurity-internship',
    excerpt: 'Planning to pursue a cybersecurity internship? Learn the essential skills, certifications, and hands-on practice needed to stand out in this high-demand field.',
    content: `Cybersecurity is a highly specialized field that requires a unique blend of IT networking knowledge and security principles.

### Build Your Lab
Set up a virtual environment using VirtualBox or VMware. Install Kali Linux and practice using tools like Nmap, Wireshark, and Metasploit in a safe, legal environment.

### Learn Networking
You cannot secure what you do not understand. Master the OSI model, TCP/IP, DNS, and HTTP protocols.

### Participate in CTFs
Capture The Flag (CTF) competitions like HackTheBox or TryHackMe are excellent ways to gain practical experience and demonstrate your skills to potential employers.`,
    coverImage: '/images/showcase/cybersecurity.png',
    author: 'Dominova Team',
    publishDate: '2025-01-01',
    readingTime: '8',
    seoTitle: 'Prepare for Cybersecurity Internship',
    seoDescription: 'Everything you need to know to prepare for a cybersecurity internship.',
    tags: ['Cybersecurity'],
    featured: false,
    status: 'published',
  },
  {
    title: 'React vs Angular vs Vue: Which Framework to Learn for Your Internship',
    slug: 'react-vs-angular-vs-vue',
    excerpt: 'Confused about which web framework to learn? Compare React, Angular, and Vue.js to make the right choice for your web development internship and career.',
    content: `When applying for frontend or full-stack internships, you will inevitably need to choose a JavaScript framework to master.

**React (The Industry Leader)**
Created by Meta, React has the largest job market and ecosystem. If your goal is purely employability, React is the safest bet.

**Angular (The Enterprise Choice)**
Maintained by Google, Angular is a heavy, opinionated framework used largely by enterprise companies. It requires learning TypeScript and RxJS.

**Vue (The Developer Favorite)**
Vue offers a gentle learning curve and excellent documentation. While the job market is smaller than React's, it is highly loved by developers and startups.`,
    coverImage: '/images/showcase/web_dev.png',
    author: 'Dominova Team',
    publishDate: '2024-12-01',
    readingTime: '7',
    seoTitle: 'React vs Angular vs Vue: Which to Learn',
    seoDescription: 'A comparison of the top three frontend frameworks to help you decide which one to focus on.',
    tags: ['Web Development'],
    featured: false,
    status: 'published',
  },
  {
    title: 'Essential Data Science Tools Every Beginner Should Learn in 2025',
    slug: 'essential-data-science-tools',
    excerpt: 'From Python and SQL to Power BI and TensorFlow — discover the must-have tools in your data science toolkit and how to get hands-on experience during your internship.',
    content: `If you are starting a data science internship, these are the tools you must be familiar with:

**1. Jupyter Notebooks**
The standard environment for exploratory data analysis and sharing code.

**2. Pandas & NumPy**
The foundational libraries for data manipulation and numerical computing in Python.

**3. Scikit-Learn**
The go-to library for implementing standard machine learning algorithms.

**4. Matplotlib & Seaborn**
Essential for data visualization and communicating your findings effectively.

**5. SQL**
While Python gets all the hype, SQL remains the absolute standard for extracting data from relational databases.`,
    coverImage: '/images/showcase/ai_data.png',
    author: 'Dominova Team',
    publishDate: '2024-12-01',
    readingTime: '8',
    seoTitle: 'Essential Data Science Tools for Beginners',
    seoDescription: 'A breakdown of the must-know tools and libraries for anyone starting in data science.',
    tags: ['Data Science'],
    featured: false,
    status: 'published',
  },
];

/**
 * Run on application first load.
 * Seeds the database with default content matching the
 * existing hardcoded website, so the public site looks
 * exactly the same after CMS integration.
 */
export async function seedDatabase(): Promise<void> {
  // Always ensure admin account exists
  await initAdminAccount();

  // Only seed blog posts if they are completely empty
  if (blogPosts.findAll().length === 0) {
    for (const post of defaultBlogPosts) {
      blogPosts.create(post);
    }
  }

  // Only seed content data once
  if (storage.isSeeded()) return;

  // Seed services
  for (const serviceData of defaultServices) {
    services.create(serviceData);
  }

  // Seed projects
  for (const projectData of defaultProjects) {
    projects.create(projectData);
  }

  // Seed internships
  for (const internshipData of defaultInternships) {
    internships.create(internshipData);
  }



  storage.markSeeded();
}
