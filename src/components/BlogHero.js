"use client";

import Image from "next/image";
import Link from "next/link";

export default function BlogHero() {
  function scrollToArticles() {
    document.getElementById("blog-articles")?.scrollIntoView({ behavior: "smooth" });
  }

  function scrollToNewsletter() {
    document.getElementById("blog-newsletter")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section className="blog-hero">
      <div className="blog-hero-bg">
        <div className="blog-hero-orb blog-hero-orb-1" />
        <div className="blog-hero-orb blog-hero-orb-2" />
      </div>
      <div className="blog-hero-wrap">
        <div className="blog-hero-content">
          <span className="eyebrow">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: 6, verticalAlign: 'middle', marginTop: '-2px'}}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
            DIGITAL MARKETING BLOG
          </span>
          <h1>Digital Marketing <span className="highlight">Blog<svg className="swoosh" viewBox="0 0 100 20" preserveAspectRatio="none"><path d="M0,15 Q50,0 100,15" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/></svg></span></h1>
          <h2>
            Expert Insights on SEO, Google Ads, AI Marketing, Social Media & Business Growth
          </h2>

          <div className="blog-hero-meta">
            <div className="meta-author">
              <div className="meta-avatar">
                <span>DIGITAL<br/>MARKETING<br/>TENX</span>
              </div>
              <span className="meta-author-name"><strong>By Digital Marketing TenX Team</strong></span>
            </div>
            <div className="meta-stats">
              <span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg> June 30, 2026</span>
              <span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg> 8 min read</span>
              <span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg> 4,820 views</span>
              <span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg> Digital Marketing</span>
            </div>
          </div>

          <div className="blog-hero-ctas">
            <button className="btn-primary" onClick={scrollToArticles}>
              Explore Articles <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </button>
            <button className="btn-outline" onClick={scrollToNewsletter}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg> Subscribe Newsletter
            </button>
          </div>
        </div>
        <div className="blog-hero-visual">
          <div className="hero-visual-main">
            <Image
              src="/blog_hero_new.webp"
              alt="Digital marketing tools, analytics, and business growth concepts"
              width={600}
              height={400}
              className="hero-dashboard-img"
              style={{ objectFit: 'contain', width: '100%', height: 'auto', borderRadius: '16px' }}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
