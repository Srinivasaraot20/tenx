"use client";

import { useMemo, useState } from "react";
import BlogFilters from "./BlogFilters";
import ArticleCard from "./ArticleCard";
import { filterArticles, getAllTags } from "@/lib/blog";

export default function BlogList({ initialArticles = [] }) {
  const [filters, setFilters] = useState({});
  const [visibleCount, setVisibleCount] = useState(6);

  const categories = useMemo(
    () => [...new Set(initialArticles.map((a) => a.category))],
    [initialArticles]
  );
  const authors = useMemo(
    () => [...new Set(initialArticles.map((a) => a.author))],
    [initialArticles]
  );
  const tags = useMemo(() => getAllTags(), []);

  const list = useMemo(
    () => filterArticles(initialArticles, filters),
    [initialArticles, filters]
  );

  const visibleArticles = list.slice(0, visibleCount);
  const hasMore = visibleCount < list.length;

  function handleLoadMore() {
    setVisibleCount((prev) => prev + 6);
  }

  function handleFilterChange(newFilters) {
    setFilters(newFilters);
    setVisibleCount(6); // Reset pagination on new filter
  }

  return (
    <div className="blog-list-premium">
      <div id="blog-articles" className="articles-section">
        <BlogFilters
          categories={categories}
          authors={authors}
          tags={tags}
          onChange={handleFilterChange}
        />

        <div className="section-header" style={{ textAlign: "center", marginBottom: "32px" }}>
          <h2>Explore Our Articles</h2>
          <p>{list.length} article{list.length !== 1 ? "s" : ""} found</p>
        </div>

        {list.length === 0 ? (
          <div className="no-results">
            <p>No articles match your filters. Try adjusting your search.</p>
          </div>
        ) : (
          <>
            <div className="articles-grid">
              {visibleArticles.map((a) => (
                <ArticleCard key={a.id} article={a} />
              ))}
            </div>
            
            {hasMore && (
              <div className="load-more-container" style={{ textAlign: "center", marginTop: "40px" }}>
                <button className="btn-primary" onClick={handleLoadMore}>
                  Load More Articles
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
