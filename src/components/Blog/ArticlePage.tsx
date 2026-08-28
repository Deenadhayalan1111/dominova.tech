import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { blogPosts } from '../../lib/data/db';
import type { BlogPost } from '../../lib/data/types';
import './Blog.css';

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!slug) return;

    const foundPost = blogPosts.findBySlug(slug);
    if (!foundPost || foundPost.status !== 'published') {
      navigate('/blog', { replace: true });
      return;
    }
    
    setPost(foundPost);
    document.title = foundPost.seoTitle || `${foundPost.title} | Dominova Blog`;

    // Find related posts (same category/first tag, exclude current)
    const allPublished = blogPosts.findPublished();
    const related = allPublished
      .filter((p) => p.id !== foundPost.id && p.tags.some((t) => foundPost.tags.includes(t)))
      .slice(0, 3);
    
    // If not enough related by tag, just pad with recent ones
    if (related.length < 3) {
      const more = allPublished.filter((p) => p.id !== foundPost.id && !related.find(r => r.id === p.id));
      related.push(...more.slice(0, 3 - related.length));
    }

    setRelatedPosts(related);

    return () => {
      document.title = 'Dominova – Enterprise Technology Solutions & Software Internships';
    };
  }, [slug, navigate]);

  if (!post) return null;

  const calculateReadTime = (content: string) => {
    const words = content.split(/\s+/).length;
    return Math.max(1, Math.ceil(words / 200));
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <main className="article-page" id="main-content">
      {/* Article Header */}
      <header className="article-header">
        <div className="container article-header-container">
          <Link to="/blog" className="article-back-link">
            ← Back to Blog
          </Link>
          <span className="blog-card-category">{post.tags[0] || 'Uncategorized'}</span>
          <h1 className="article-title">{post.title}</h1>
          <p className="article-excerpt">{post.excerpt}</p>
          <div className="blog-card-meta article-meta">
            <span>By {post.author}</span>
            <span className="blog-card-dot">•</span>
            <span>{formatDate(post.publishDate)}</span>
            <span className="blog-card-dot">•</span>
            <span>{calculateReadTime(post.content)} min read</span>
          </div>
        </div>
      </header>

      {/* Hero Image */}
      <div className="article-hero-image-wrap">
        <div className="container">
          <img src={post.coverImage} alt={post.title} className="article-hero-image" />
        </div>
      </div>

      {/* Article Body */}
      <article className="article-body">
        {/* Simple markdown-like rendering for demo. In production, use marked or react-markdown */}
        {post.content.split('\n\n').map((paragraph, idx) => {
          if (paragraph.startsWith('### ')) {
            return <h3 key={idx}>{paragraph.replace('### ', '')}</h3>;
          }
          if (paragraph.startsWith('## ')) {
            return <h2 key={idx}>{paragraph.replace('## ', '')}</h2>;
          }
          if (paragraph.startsWith('- ')) {
            const items = paragraph.split('\n').filter(Boolean);
            return (
              <ul key={idx}>
                {items.map((item, i) => (
                  <li key={i}>{item.replace('- ', '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</li>
                ))}
              </ul>
            );
          }
          const formatted = paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
          return <p key={idx} dangerouslySetInnerHTML={{ __html: formatted }} />;
        })}
      </article>

      {/* Internship CTA */}
      <section className="article-cta">
        <div className="container">
          <div className="article-cta-box">
            <h2>Ready to turn knowledge into experience?</h2>
            <p>Go beyond tutorials. Work on real projects, learn from industry mentors and build a portfolio that gets noticed.</p>
            <div className="article-cta-actions">
              <Link to="/#internship" className="btn-gold">
                <span>Explore Internships →</span>
              </Link>
              <Link to="/#contact" className="btn-white">
                Talk to Dominova →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="article-related">
          <div className="container">
            <h3 className="article-related-title">You may also like</h3>
            <div className="blog-grid">
              {relatedPosts.map((rPost) => (
                <article
                  key={rPost.id}
                  className="blog-card"
                  onClick={() => navigate(`/blog/${rPost.slug}`)}
                >
                  <div className="blog-card-image-wrap">
                    <img src={rPost.coverImage} alt={rPost.title} className="blog-card-image" />
                  </div>
                  <div className="blog-card-content">
                    <span className="blog-card-category">{rPost.tags[0] || 'Uncategorized'}</span>
                    <h3 className="blog-card-title">{rPost.title}</h3>
                    <p className="blog-card-excerpt">{rPost.excerpt}</p>
                    <div className="blog-card-meta">
                      <span>{formatDate(rPost.publishDate)}</span>
                      <span className="blog-card-dot">•</span>
                      <span>{calculateReadTime(rPost.content)} min read</span>
                    </div>
                    <span className="blog-read-cta">Read Article →</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
