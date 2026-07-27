import Link from "next/link";
import Image from "next/image";

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function FeaturedArticle({ article }) {
  if (!article) return null;

  return (
    <article className="featured-article">
      {/* Left: Image */}
      <Link href={`/blog/${article.slug}`} className="featured-media-link">
        <div className="featured-media">
          {article.image && (
            <Image
              src={article.image}
              alt={article.title}
              fill
              sizes="(max-width: 768px) 100vw, 480px"
              className="featured-img"
            />
          )}
          <span className="featured-badge">⭐ FEATURED</span>
        </div>
      </Link>

      {/* Right: Content */}
      <div className="featured-body">
        <div className="featured-meta-top">
          <span className="category-badge">{article.category}</span>
          <span className="meta-dot">{article.readingTime} min read</span>
          <span className="meta-dot">•</span>
          <span className="meta-dot">{formatDate(article.date)}</span>
        </div>

        <h2>
          <Link href={`/blog/${article.slug}`}>{article.title}</Link>
        </h2>

        <p className="featured-summary">{article.summary}</p>

        <div className="featured-footer">
          <div className="featured-author-info">
            <div className="featured-author-avatar">
              {article.author?.charAt(0) || "A"}
            </div>
            <span className="featured-author-name">By {article.author}</span>
          </div>
          <Link href={`/blog/${article.slug}`} className="featured-read-btn">
            Read More <span>→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
