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
          <h1>Digital Marketing <span className="highlight">Blogs<svg className="swoosh" viewBox="0 0 100 20" preserveAspectRatio="none"><path d="M0,15 Q50,0 100,15" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/></svg></span></h1>
          <h2>
            Stay updated with expert SEO, Google Ads, Social Media Marketing, AI, and digital marketing insights to grow your business across India.
          </h2>

          <div className="blog-hero-meta">
            <div className="meta-author">
              <div className="meta-avatar" style={{ padding: 0, overflow: 'hidden', border: 'none' }}>
                <Image src="/logo.webp" alt="Digital Marketing TenX" width={48} height={48} style={{ objectFit: 'contain' }} />
              </div>
              <span className="meta-author-name"><strong>Written By Digital Marketing TenX Team</strong></span>
            </div>

          </div>

          <div className="blog-hero-ctas">
            <button className="btn-primary" onClick={scrollToArticles}>
              Explore Blogs <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </button>
            <button className="btn-outline" onClick={scrollToNewsletter}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg> Subscribe For Updates
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

