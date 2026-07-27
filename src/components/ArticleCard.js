"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

function getBookmarks() {
  try {
    const raw = localStorage.getItem("dmtenx_bookmarks");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function getLikes() {
  try {
    const raw = localStorage.getItem("dmtenx_likes");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function toggleBookmark(id) {
  const list = getBookmarks();
  const exists = list.includes(id);
  const updated = exists ? list.filter((x) => x !== id) : [...list, id];
  localStorage.setItem("dmtenx_bookmarks", JSON.stringify(updated));
  return !exists;
}

function toggleLike(id) {
  const list = getLikes();
  const exists = list.includes(id);
  const updated = exists ? list.filter((x) => x !== id) : [...list, id];
  localStorage.setItem("dmtenx_likes", JSON.stringify(updated));
  return !exists;
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function ArticleCard({ article, compact = false }) {
  const [bookmarked, setBookmarked] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(article.likes || 0);
  const [shareOpen, setShareOpen] = useState(false);

  useEffect(() => {
    setBookmarked(getBookmarks().includes(article.id));
    const isLikedLocally = getLikes().includes(article.id);
    setLiked(isLikedLocally);
    if (isLikedLocally) {
      setLikeCount(Math.max(article.likes || 0, 1));
    } else {
      setLikeCount(article.likes || 0);
    }
  }, [article.id, article.likes]);

  function onToggleBookmark(e) {
    e.preventDefault();
    e.stopPropagation();
    const now = toggleBookmark(article.id);
    setBookmarked(now);
  }

  function onToggleLike(e) {
    e.preventDefault();
    e.stopPropagation();
    const now = toggleLike(article.id);
    setLiked(now);
    setLikeCount((c) => (now ? c + 1 : Math.max(c - 1, 0)));
  }

  function onShare(e) {
    e.preventDefault();
    e.stopPropagation();
    const url = `${window.location.origin}/blog/${article.slug}`;
    if (navigator.share) {
      navigator.share({ title: article.title, url }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(url);
      setShareOpen(true);
      setTimeout(() => setShareOpen(false), 2000);
    }
  }

  return (
    <article className="article-card-premium" itemScope itemType="https://schema.org/BlogPosting">
      <Link href={`/blog/${article.slug}`} className="article-card-media">
        <div className="image-wrapper">
          {article.image && (
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="article-image"
              sizes="(max-width: 768px) 100vw, (max-width: 1400px) 33vw, 400px"
            />
          )}
        </div>
      </Link>
      <div className="article-card-content">
        <div style={{ marginBottom: '12px' }}>
          <span className="badge-category" style={{ position: 'static', display: 'inline-block', boxShadow: 'none' }}>
            {article.category}
          </span>
        </div>
        <Link href={`/blog/${article.slug}`} className="article-title-link">
          <h3 itemProp="headline">{article.title}</h3>
        </Link>
        <p className="article-description" itemProp="description">
          {article.summary}
        </p>
        <div className="article-meta" style={{ justifyContent: compact ? 'flex-end' : 'space-between' }}>
          {!compact && (
            <div className="meta-author" itemProp="author">
              <strong>{article.author}</strong>
            </div>
          )}
          <time dateTime={article.date} itemProp="datePublished">
            {formatDate(article.date)}
          </time>
        </div>
      </div>
      <div className="article-card-footer">
        <Link href={`/blog/${article.slug}`} className="btn-read-more">
          Read More →
        </Link>
        {!compact && (
          <div className="footer-actions">
            <button type="button" className={`icon-btn ${liked ? 'active' : ''}`} onClick={onToggleLike} aria-label="Like">
              {liked ? "❤️" : "🤍"} {likeCount}
            </button>
            <button type="button" className="icon-btn" onClick={onShare} aria-label="Share">
              {shareOpen ? "✓" : "↗"}
            </button>
            <button type="button" className={`icon-btn ${bookmarked ? 'active' : ''}`} onClick={onToggleBookmark} aria-label="Bookmark">
              {bookmarked ? "★" : "☆"}
            </button>
          </div>
        )}
      </div>
    </article>
  );
}
