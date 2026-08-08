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

