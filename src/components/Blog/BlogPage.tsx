import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { blogPosts } from '../../lib/data/db';
import type { BlogPost } from '../../lib/data/types';
import './Blog.css';

const CATEGORIES = [
  'All',
  'Career Tips',
  'Skills',
  'Industry Insights',
  'Web Development',
  'Data Science',
  'Cybersecurity',
];

export default function BlogPage() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Load published posts and sort by publish date
    const published = blogPosts.findPublished().sort(
      (a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
    );
    setPosts(published);
  }, []);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchCat = activeCategory === 'All' || post.tags.includes(activeCategory);
      const query = searchQuery.toLowerCase();
      const matchSearch =
        query === '' ||
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.tags.some(t => t.toLowerCase().includes(query));
      return matchCat && matchSearch;
    });
  }, [posts, activeCategory, searchQuery]);

  const featuredPost = filteredPosts.length > 0 ? filteredPosts[0] : null;
  const gridPosts = filteredPosts.length > 0 ? filteredPosts.slice(1) : [];

  const handlePostClick = (slug: string) => {
    navigate(`/blog/${slug}`);
  };

  const calculateReadTime = (content: string) => {
    const words = content.split(/\s+/).length;
    return Math.max(1, Math.ceil(words / 200));
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <main className="blog-page" id="main-content">
      {/* Hero Section */}
      <section className="blog-hero">
        <div className="container">
          <span className="blog-hero__eyebrow">DOMINOVA INSIGHTS</span>
          <h1 className="blog-hero__title">Ideas, Insights & Career Knowledge</h1>
          <p className="blog-hero__subtitle">
            Practical technology insights, internship guidance and career resources built to help students and businesses move forward.
          </p>
        </div>
      </section>

      <section className="blog-content">
        <div className="container">
          {/* Controls: Search & Filter */}
          <div className="blog-controls">
            <div className="blog-categories">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  className={`blog-category-btn ${activeCategory === cat ? 'is-active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="blog-search">
              <svg className="blog-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="blog-search-input"
              />
            </div>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="blog-empty">
              <h3>No articles found</h3>
              <p>Try another keyword or browse all categories.</p>
              <button className="btn-gold" onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}>
                <span>Clear Filters</span>
              </button>
            </div>
          ) : (
            <>
              {/* Featured Post */}
              {featuredPost && (
                <article
                  className="blog-featured-card"
                  onClick={() => handlePostClick(featuredPost.slug)}
                >
                  <div className="blog-featured-image-wrap">
                    <img src={featuredPost.coverImage} alt={featuredPost.title} className="blog-featured-image" />
                  </div>
                  <div className="blog-featured-content">
                    <span className="blog-card-category">{featuredPost.tags[0] || 'Uncategorized'}</span>
                    <h2 className="blog-featured-title">{featuredPost.title}</h2>
                    <p className="blog-featured-excerpt">{featuredPost.excerpt}</p>
                    <div className="blog-card-meta">
                      <span>{formatDate(featuredPost.publishDate)}</span>
                      <span className="blog-card-dot">•</span>
                      <span>{calculateReadTime(featuredPost.content)} min read</span>
                    </div>
                    <span className="blog-read-cta">Read Article →</span>
                  </div>
                </article>
              )}

              {/* Grid Posts */}
              {gridPosts.length > 0 && (
                <div className="blog-grid">
                  {gridPosts.map((post) => (
                    <article
                      key={post.id}
                      className="blog-card"
                      onClick={() => handlePostClick(post.slug)}
                    >
                      <div className="blog-card-image-wrap">
                        <img src={post.coverImage} alt={post.title} className="blog-card-image" />
                      </div>
                      <div className="blog-card-content">
                        <span className="blog-card-category">{post.tags[0] || 'Uncategorized'}</span>
                        <h3 className="blog-card-title">{post.title}</h3>
                        <p className="blog-card-excerpt">{post.excerpt}</p>
                        <div className="blog-card-meta">
                          <span>{formatDate(post.publishDate)}</span>
                          <span className="blog-card-dot">•</span>
                          <span>{calculateReadTime(post.content)} min read</span>
                        </div>
                        <span className="blog-read-cta">Read Article →</span>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Newsletter (UI Only) */}
      <section className="blog-newsletter">
        <div className="container">
          <div className="blog-newsletter-inner">
            <h3 className="blog-newsletter-title">Stay Ahead of the Curve</h3>
            <p className="blog-newsletter-desc">
              Get practical technology insights, internship opportunities and career resources from Dominova.
            </p>
            <form className="blog-newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Enter your email" required disabled title="Newsletter functionality coming soon" />
              <button type="button" className="btn-gold" disabled title="Newsletter functionality coming soon">
                <span>Subscribe</span>
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
