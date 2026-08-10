"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SocialShare from "./SocialShare";
import ArticleTags from "./ArticleTags";
import ArticleCTA from "./ArticleCTA";
import Breadcrumbs from "./Breadcrumbs";

function formatDate(dateStr) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function ArticleDetail({ article, author }) {
  const contentRef = useRef(null);
  const [toc, setToc] = useState([]);
  const [progress, setProgress] = useState(0);

  const authorName = author?.name || article.author;

  useEffect(() => {
    if (!contentRef.current) return;
    const nodes = Array.from(contentRef.current.querySelectorAll("h2, h3, h4"));
    const items = nodes.map((n) => {
      if (!n.id) n.id = n.textContent.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-");
      return { id: n.id, text: n.textContent, tag: n.tagName };
    });
    setToc(items);

    let ticking = false;
    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const el = contentRef.current;
          if (!el) {
            ticking = false;
            return;
          }
          const rect = el.getBoundingClientRect();
          const total = el.scrollHeight - window.innerHeight;
          const scrolled = Math.min(Math.max(window.scrollY - el.offsetTop + 200, 0), total);
          const pct = total > 0 ? Math.round((scrolled / total) * 100) : 0;
          setProgress(Math.min(pct, 100));
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [article]);

  useEffect(() => {
    fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event: "view", articleId: article.id }),
    }).catch(() => {});
  }, [article.id]);

  return (
    <article className="article-page">
      <div className="article-page-header">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: article.title },
          ]}
        />
      </div>

      <div className="article-hero">
        <div className="article-hero-content">
          <span className="cat-badge">{article.category}</span>
          <h1>{article.title}</h1>
          <div className="article-hero-meta">
            <div className="meta-row">
              <span>By {authorName}</span>
              <span>·</span>
              <span>Published {formatDate(article.date)}</span>
              {article.updatedAt && article.updatedAt !== article.date && (
                <>
                  <span>·</span>
                  <span>Updated {formatDate(article.updatedAt)}</span>
                </>
              )}
              <span>·</span>
              <span>{article.readingTime} min read</span>
              <span>·</span>
              <span>{article.views?.toLocaleString()} views</span>
            </div>
            <SocialShare
              url={`https://digitalmarketingtenx.com/blog/${article.slug}`}
              title={article.title}
              compact
            />
          </div>
        </div>

        {article.image && (
          <div className="article-hero-image">
            <Image
              src={article.image}
              alt={article.title}
              fill
              priority
              sizes="100vw"
              className="hero-featured-img"
            />
          </div>
        )}
        <div className="reading-progress" style={{ width: `${progress}%` }} />
      </div>

      <div className="article-body-wrap">
        <aside className="article-toc">
          <div className="toc-progress-ring">
            <svg viewBox="0 0 36 36">
              <path
                className="toc-progress-bg"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="toc-progress-fill"
                strokeDasharray={`${progress}, 100`}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className="toc-progress-text">{progress}%</span>
          </div>
          <div className="toc-title">Table of Contents</div>
          <ul>
            {toc.map((t) => (
              <li key={t.id} className={`toc-${t.tag.toLowerCase()}`}>
                <a href={`#${t.id}`}>{t.text}</a>
              </li>
            ))}
          </ul>
        </aside>

        <div className="article-main">
          <div
            className="article-content"
            ref={contentRef}
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
          <ArticleTags tags={article.tags} />
          <ArticleCTA />
        </div>
      </div>
    </article>
  );
}

