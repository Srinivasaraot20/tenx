import Link from "next/link";
import { ARTICLES } from "@/data/articles";
import ArticleCard from "./ArticleCard";
import "../app/blog/blog.css";

export default function RecentBlogs() {
  const recentArticles = [...ARTICLES]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 4);

  return (
    <section className="recent-blogs-section">
      <div className="process-header" style={{ marginBottom: "40px" }}>
        <div className="process-eyebrow">
          <span className="eyebrow-line"></span>
          OUR BLOG
          <span className="eyebrow-line"></span>
        </div>
        <h2 className="process-title">
          Digital Marketing Insights, SEO Guides & Business Growth Strategies
        </h2>
        <p className="process-subtitle">
          Explore practical digital marketing guides, SEO strategies, Google Ads insights, social media tips, and AI-powered marketing trends to help your business grow online.
        </p>
      </div>

      <div className="recent-blogs-grid">
        {recentArticles.map((article) => (
          <ArticleCard key={article.id} article={article} compact={true} />
        ))}
      </div>

      <div className="recent-blogs-cta">
        <Link href="/blog" className="read-all-blogs-btn">
          Explore All Blogs <span className="arrow">→</span>
        </Link>
      </div>
    </section>
  );
}
