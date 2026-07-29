"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import "./e-commerce-marketing.css";

// Reusable Animated Counter component for metrics
function AnimatedCounter({ value, duration = 1500 }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;

    const numericPart = parseInt(value.replace(/[^0-9]/g, ""), 10) || 0;
    if (numericPart === 0) {
      setCount(value);
      return;
    }

    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * numericPart));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [hasAnimated, value, duration]);

  const suffix = value.replace(/[0-9]/g, "");
  return (
    <span ref={elementRef}>
      {count}
      {suffix}
    </span>
  );
}

export default function ECommerceMarketingClient() {
  const [activeFaqIndex, setActiveFaqIndex] = useState(null);
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0);

  const toggleFaq = (index) => {
    setActiveFaqIndex(activeFaqIndex === index ? null : index);
  };

  const triggerModal = (e) => {
    if (e) e.preventDefault();
    window.dispatchEvent(new CustomEvent("trigger-consultation-modal"));
  };

  const nextTestimonial = () => {
    setActiveTestimonialIndex((prev) => (prev + 1) % testimonialsData.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonialIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
  };

  // 16 Detailed FAQs for E-Commerce Marketing
  const faqData = [
    {
      q: "How much do your e-commerce marketing services cost?",
      a: "Our pricing is customized based on your store's current size, monthly ad spend, and growth goals. We offer flexible packages including retainer models, performance-based models, and combined models. Contact us for a custom proposal after we conduct your free store audit."
    },
    {
      q: "Which e-commerce platforms do you support?",
      a: "While we work with Shopify, WooCommerce, Magento, BigCommerce, and custom builds, Shopify is generally the easiest to scale due to its native integrations with Meta, Google Merchant Center, Klaviyo, and major shipping providers. However, we optimize and scale stores on any platform."
    },
    {
      q: "What is ROAS and why is it important?",
      a: "ROAS stands for Return on Ad Spend. It measures the gross revenue generated for every rupee spent on advertising (Revenue / Ad Spend). For example, a 5x ROAS means that for every ₹1,000 spent on ads, your store generates ₹5,000 in sales. It is the primary metric we optimize to ensure your ads are highly profitable."
    },
    {
      q: "What are Performance Max (PMax) campaigns?",
      a: "Performance Max is a goal-based campaign type in Google Ads that allows advertisers to access all Google Ads inventory (Search, YouTube, Display, Discover, Gmail, and Google Maps) from a single campaign. We use advanced audience signals, conversion tracking, and high-quality creative assets to make PMax highly profitable for online stores."
    },
    {
      q: "How long before we start seeing results?",
      a: "Typically, conversion tracking fixes and search/shopping campaign setups yield immediate search visibility improvements within 7-14 days. Performance scaling and consistent ROAS improvements usually require 30 to 90 days as Google's AI and Meta's pixel learn your customer buying patterns."
    },
    {
      q: "Do you manage Shopify marketing and SEO specifically?",
      a: "Yes, we are Shopify growth experts. We manage everything from Shopify SEO (speed optimization, metadata, schema markup, product feed sync) to paid ad setups, app integrations, and custom checkout CRO strategies."
    },
    {
      q: "Do you optimize WooCommerce stores for marketing?",
      a: "Absolutely. WooCommerce stores often require specialized technical SEO and speed optimization to handle high traffic. We set up WP-Rocket, optimize product databases, build XML feeds, and integrate WooCommerce with Klaviyo and GA4."
    },
    {
      q: "Do you create shopping ads and manage product feeds?",
      a: "Yes, product feed management is critical for Google Shopping success. We optimize product titles, descriptions, custom labels, Google product categories, and resolve Google Merchant Center suspensions or disapproved items."
    },
    {
      q: "Can you help improve our store's conversion rate?",
      a: "Yes, driving traffic is only half the battle. We conduct comprehensive Conversion Rate Optimization (CRO) audits, set up heatmaps, optimize checkout flows, design high-converting product pages, and implement cart abandonment recovery systems to turn more visitors into buyers."
    },
    {
      q: "What platforms do you run e-commerce ads on?",
      a: "We run highly profitable campaigns on Google (Shopping, Search, PMax, YouTube), Meta (Facebook & Instagram Shopping), Pinterest, and marketplace networks like Amazon Ads depending on where your target audience searches."
    },
    {
      q: "How does e-commerce email and SMS marketing work?",
      a: "We design and deploy automated retention sequences ('flows') in Klaviyo, Mailchimp, or Omnisend. These include Welcome Series, Abandoned Cart Recovery, Browse Abandonment, Win-back campaigns, and VIP customer loyalty rewards."
    },
    {
      q: "How do you track e-commerce conversions accurately?",
      a: "We implement advanced server-side tracking using Meta Conversions API (CAPI) and Google Tag Manager server-side containers. This bypasses browser ad-blockers and iOS privacy updates to provide 100% accurate data attribution."
    },
    {
      q: "Do you manage Magento marketing campaigns?",
      a: "Yes, we manage enterprise-level Magento (Adobe Commerce) marketing campaigns. Magento stores benefit greatly from our technical SEO audits, custom XML feed builders, and advanced search filters optimization."
    },
    {
      q: "What is AOV and how do you increase it?",
      a: "AOV is Average Order Value. We increase your AOV by implementing smart product bundling, automated cross-sell/upsell widgets at checkout, free shipping thresholds, and volume discounts."
    },
    {
      q: "Do you offer weekly optimization and reporting?",
      a: "Yes, our certified experts optimize your accounts weekly (bids, keywords, negative matches, ad creatives). We provide a live, transparent Looker Studio dashboard so you can monitor sales, spend, and ROAS in real-time, plus we host weekly sync calls."
    },
    {
      q: "Is there a contract or minimum commitment?",
      a: "We work on rolling monthly agreements as we believe in keeping our clients through excellent results, not lock-in contracts. However, we recommend a minimum window of 3 months to fully optimize campaigns and establish a baseline ROAS."
    }
  ];

  // Testimonials Data
  const testimonialsData = [
    {
      author: "Aditya Verma",
      business: "Urban Threads Co.",
      industry: "Fashion & Apparel",
      revenue: "+320% Revenue Increase",
      rating: 5,
      avatar: "AV",
      text: "Digital Marketing TenX completely transformed our Shopify store marketing. Our Meta ad ROAS went from a struggling 1.4x to a consistent 4.8x. The email flows they built in Klaviyo now generate 28% of our total revenue on autopilot!"
    },
    {
      author: "Sneha Reddy",
      business: "Glow organics",
      industry: "Beauty & Cosmetics",
      revenue: "5.4x ROAS Achieved",
      rating: 5,
      avatar: "SR",
      text: "The feed optimization work they did for our Google Merchant Center was a game changer. We went from constant product disapprovals to our entire catalog appearing at the top of Google Shopping search. Our sales have tripled in 4 months."
    },
    {
      author: "Rajesh Kumar",
      business: "NutriFit India",
      industry: "Health & Nutrition Supplements",
      revenue: "₹45L Monthly Sales Added",
      rating: 5,
      avatar: "RK",
      text: "Highly professional team that actually understands conversion numbers, not just vanity clicks. Their technical SEO audit resolved major database speed blocks on our WooCommerce store, and our conversion rate went from 1.1% to 2.4%."
    }
  ];

  return (
    <div className="ecom-page">
      <Header />

      <main>
        {/* ─── 1. HERO SECTION ─── */}
        <section className="ecom-hero">
          <div className="ecom-grid-bg"></div>
          <div className="ecom-wrap">
            <div className="ecom-hero-grid">
              
              {/* Left — Copy */}
              <div className="anim-slide-up">
                <div className="ecom-hero-badge">
                  <span>🚀</span> E-COMMERCE MARKETING EXPERTS
                </div>
                <h1>
                  E-Commerce Marketing Services in Hyderabad That <span className="ecom-text-gradient">Drive Sales</span> & Maximize Revenue
                </h1>
                <p>
                  Grow your Shopify, WooCommerce, Magento, or custom online store with our e-commerce marketing services in Hyderabad. We combine SEO, Google Ads, social media marketing, email automation, and conversion rate optimization (CRO) to increase traffic, boost sales, and maximize your return on investment.
                </p>
                
                <div className="ecom-hero-btns">
                  <button onClick={triggerModal} className="ecom-btn-secondary">
                    📅 Book Free Consultation
                  </button>
                  <a href="/contact" className="ecom-btn-primary">▶ Get Free Store Audit</a>
                </div>
                
                <div className="ecom-hero-features" style={{ marginTop: "24px", display: "flex", flexWrap: "wrap", gap: "12px", fontSize: "14px", fontWeight: "600", color: "#475569" }}>
                  <span>✓ Increase Online Sales</span>
                  <span>✓ Higher ROAS</span>
                  <span>✓ Better Conversion Rates</span>
                  <span>✓ Customer Retention</span>
                </div>


              </div>

              {/* Right — Hero Image */}
              <div className="ecom-hero-visual" style={{ width: "100%", maxWidth: "80%", margin: "0 auto" }}>
                <Image 
                  src="/ecom-hero.webp" 
                  alt="E-Commerce Marketing Services" 
                  width={800} 
                  height={800} 
                  style={{ width: '100%', height: 'auto', borderRadius: '16px', objectFit: 'contain' }} 
                  priority 
                />
              </div>

            </div>
          </div>
        </section>

        {/* ─── 2. CLIENT LOGOS TICKER ─── */}
        <section className="ecom-logos-ticker">
          <div className="ecom-ticker-inner">
            {/* First Set */}
            <div className="ecom-ticker-item"><span className="ecom-logo-icon" style={{ background: "#eef9e6", color: "#95bf47" }}>S</span> Shopify</div>
            <div className="ecom-ticker-item"><span className="ecom-logo-icon" style={{ background: "#f5efff", color: "#7f54b3" }}>W</span> WooCommerce</div>
            <div className="ecom-ticker-item"><span className="ecom-logo-icon" style={{ background: "#fff5ee", color: "#f26322" }}>M</span> Magento</div>
            <div className="ecom-ticker-item"><span className="ecom-logo-icon" style={{ background: "#eef6ff", color: "#006bf6" }}>B</span> BigCommerce</div>
            <div className="ecom-ticker-item"><span className="ecom-logo-icon" style={{ background: "#ffffff", color: "#000000" }}>W</span> Wix eCommerce</div>
            <div className="ecom-ticker-item"><span className="ecom-logo-icon" style={{ background: "#000000", color: "#ffffff" }}>S</span> Squarespace Commerce</div>
            <div className="ecom-ticker-item"><span className="ecom-logo-icon" style={{ background: "#eef2ff", color: "#0064e0" }}>M</span> Meta Ads</div>
            <div className="ecom-ticker-item"><span className="ecom-logo-icon" style={{ background: "#fff5ee", color: "#a13c00" }}>G</span> Google Ads</div>
            <div className="ecom-ticker-item"><span className="ecom-logo-icon" style={{ background: "#fffbeb", color: "#fbbc05" }}>A</span> GA4</div>
            <div className="ecom-ticker-item"><span className="ecom-logo-icon" style={{ background: "#eafaf1", color: "#34a853" }}>M</span> Merchant Center</div>
            <div className="ecom-ticker-item"><span className="ecom-logo-icon" style={{ background: "#ffebee", color: "#ff5a5f" }}>K</span> Klaviyo</div>
            <div className="ecom-ticker-item"><span className="ecom-logo-icon" style={{ background: "#fff3e0", color: "#ffe01b" }}>M</span> Mailchimp</div>

            {/* Duplicate Set for Infinite Scroll */}
            <div className="ecom-ticker-item"><span className="ecom-logo-icon" style={{ background: "#eef9e6", color: "#95bf47" }}>S</span> Shopify</div>
            <div className="ecom-ticker-item"><span className="ecom-logo-icon" style={{ background: "#f5efff", color: "#7f54b3" }}>W</span> WooCommerce</div>
            <div className="ecom-ticker-item"><span className="ecom-logo-icon" style={{ background: "#fff5ee", color: "#f26322" }}>M</span> Magento</div>
            <div className="ecom-ticker-item"><span className="ecom-logo-icon" style={{ background: "#eef6ff", color: "#006bf6" }}>B</span> BigCommerce</div>
            <div className="ecom-ticker-item"><span className="ecom-logo-icon" style={{ background: "#ffffff", color: "#000000" }}>W</span> Wix eCommerce</div>
            <div className="ecom-ticker-item"><span className="ecom-logo-icon" style={{ background: "#000000", color: "#ffffff" }}>S</span> Squarespace Commerce</div>
            <div className="ecom-ticker-item"><span className="ecom-logo-icon" style={{ background: "#eef2ff", color: "#0064e0" }}>M</span> Meta Ads</div>
            <div className="ecom-ticker-item"><span className="ecom-logo-icon" style={{ background: "#fff5ee", color: "#a13c00" }}>G</span> Google Ads</div>
            <div className="ecom-ticker-item"><span className="ecom-logo-icon" style={{ background: "#fffbeb", color: "#fbbc05" }}>A</span> GA4</div>
            <div className="ecom-ticker-item"><span className="ecom-logo-icon" style={{ background: "#eafaf1", color: "#34a853" }}>M</span> Merchant Center</div>
            <div className="ecom-ticker-item"><span className="ecom-logo-icon" style={{ background: "#ffebee", color: "#ff5a5f" }}>K</span> Klaviyo</div>
            <div className="ecom-ticker-item"><span className="ecom-logo-icon" style={{ background: "#fff3e0", color: "#ffe01b" }}>M</span> Mailchimp</div>
          </div>
        </section>

        {/* ─── 3. WHY E-COMMERCE MARKETING MATTERS ─── */}
        <section className="ecom-section ecom-section-light ecom-why-matters-section">
          <div className="ecom-wrap">
            
            {/* Header Layout with Laptop/Mobile Mockups */}
            <div className="ecom-why-header-container">
              {/* Laptop Graphic Mockup */}
              <div className="ecom-header-graphic left-graphic">
                <div className="ecom-laptop-mock">
                  <div className="laptop-screen">
                    <div className="screen-content">
                      <div className="cart-badge-large">🛒</div>
                      <div className="buy-btn-large">BUY</div>
                    </div>
                  </div>
                  <div className="laptop-keyboard"></div>
                </div>
              </div>

              {/* Title Content */}
              <div className="ecom-title-center why-matters-title-block">
                <span className="ecom-eyebrow why-matters-eyebrow">📈 WHY E-COMMERCE MARKETING MATTERS</span>
                <h2>Why Your Business Needs E-Commerce Marketing</h2>
                <p>Grow your online store with data-driven e-commerce marketing strategies that attract high-intent shoppers, increase conversions, improve customer retention, and maximize revenue.</p>
              </div>

              {/* Mobile Graphic Mockup */}
              <div className="ecom-header-graphic right-graphic">
                <div className="ecom-mobile-mock">
                  <div className="mobile-screen">
                    <div className="mobile-card-art">💳</div>
                    <div className="mobile-cart-art">🛒</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 8-Card Grid Layout */}
            <div className="ecom-why-cards-grid">
              
              {/* Card 1: Attract High-Intent Shoppers */}
              <div className="ecom-why-card card-purple">
                <div className="why-card-icon-container">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    <circle cx="11" cy="11" r="3" />
                  </svg>
                </div>
                <div className="why-card-text">
                  <h3>Attract High-Intent Shoppers</h3>
                  <div className="why-card-line"></div>
                  <p>Reach customers who are actively searching for your products through SEO, paid ads, shopping campaigns, and marketplace marketing.</p>
                </div>
              </div>

              {/* Card 2: Improve Conversion Rate */}
              <div className="ecom-why-card card-green">
                <div className="why-card-icon-container">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="3 3 14 3 14 7 21 7 21 21 3 21 3 3" />
                    <line x1="8" y1="12" x2="16" y2="12" />
                    <line x1="8" y1="16" x2="16" y2="16" />
                  </svg>
                </div>
                <div className="why-card-text">
                  <h3>Improve Conversion Rate</h3>
                  <div className="why-card-line"></div>
                  <p>Optimize every step of the buyer journey from landing pages to checkout for higher conversions and more sales.</p>
                </div>
              </div>

              {/* Card 3: Increase Average Order Value */}
              <div className="ecom-why-card card-orange">
                <div className="why-card-icon-container">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="9" cy="21" r="1" />
                    <circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                    <line x1="12" y1="10" x2="12" y2="16" />
                    <line x1="9" y1="13" x2="15" y2="13" />
                  </svg>
                </div>
                <div className="why-card-text">
                  <h3>Increase Average Order Value</h3>
                  <div className="why-card-line"></div>
                  <p>Use upsells, cross-sells, bundles, and smart recommendations to increase the value of every customer purchase.</p>
                </div>
              </div>

              {/* Card 4: Reduce Cart Abandonment */}
              <div className="ecom-why-card card-pink">
                <div className="why-card-icon-container">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <path d="M16 10a4 4 0 0 1-8 0" />
                    <circle cx="12" cy="15" r="3" />
                  </svg>
                </div>
                <div className="why-card-text">
                  <h3>Reduce Cart Abandonment</h3>
                  <div className="why-card-line"></div>
                  <p>Recover lost sales with automated cart recovery emails, SMS, WhatsApp reminders, and retargeting campaigns.</p>
                </div>
              </div>

              {/* Card 5: Build Customer Loyalty */}
              <div className="ecom-why-card card-yellow">
                <div className="why-card-icon-container">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <div className="why-card-text">
                  <h3>Build Customer Loyalty</h3>
                  <div className="why-card-line"></div>
                  <p>Retain customers with personalized offers, loyalty programs, email marketing, and post-purchase engagement.</p>
                </div>
              </div>

              {/* Card 6: Increase Revenue & Profits */}
              <div className="ecom-why-card card-blue">
                <div className="why-card-icon-container">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="20" x2="18" y2="10" />
                    <line x1="12" y1="20" x2="12" y2="4" />
                    <line x1="6" y1="20" x2="6" y2="14" />
                    <line x1="2" y1="20" x2="22" y2="20" />
                  </svg>
                </div>
                <div className="why-card-text">
                  <h3>Increase Revenue & Profits</h3>
                  <div className="why-card-line"></div>
                  <p>Data-driven strategies, campaign optimization, and performance tracking help you scale revenue and maximize profits.</p>
                </div>
              </div>

              {/* Card 7: Data-Driven Decisions */}
              <div className="ecom-why-card card-purple-dark">
                <div className="why-card-icon-container">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div className="why-card-text">
                  <h3>Data-Driven Decisions</h3>
                  <div className="why-card-line"></div>
                  <p>Track every click, impression, conversion, and sale with advanced analytics and real-time performance insights.</p>
                </div>
              </div>

              {/* Card 8: Omnichannel Growth */}
              <div className="ecom-why-card card-teal">
                <div className="why-card-icon-container">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M8 12h8" />
                    <path d="M12 8v8" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                </div>
                <div className="why-card-text">
                  <h3>Omnichannel Growth</h3>
                  <div className="why-card-line"></div>
                  <p>Sell across multiple channels Google, Social Media, Marketplaces, Email, and more for maximum visibility and growth.</p>
                </div>
              </div>

            </div>


          </div>
        </section>

        {/* ─── 4. SERVICES INCLUDED ─── */}
        <section className="ecom-section ecom-section-white">
          <div className="ecom-wrap">
            <div className="ecom-title-center">
              <span className="ecom-eyebrow">🛠️ What We Do</span>
              <h2>Our E-Commerce Marketing Services</h2>
              <p>We provide end-to-end e-commerce marketing services to help online stores increase traffic, improve conversions, maximize revenue, and retain customers across every stage of the buying journey.</p>
            </div>

            <div className="ecom-services-grid">
              
              <div className="ecom-service-card">
                <div className="ecom-service-header">
                  <div className="ecom-service-icon-box" style={{ background: "#eef9e6", color: "#95bf47" }}>🛍️</div>
                  <h3>Shopify Marketing</h3>
                </div>
                <p>Complete growth management for Shopify stores. Includes custom theme CRO adjustments, integration of core marketing pixels, page-speed tuning, and Shopify SEO.</p>
                <div className="ecom-service-list">
                  <div className="ecom-service-item"><span className="ecom-service-check">✓</span> Shopify SEO & Core Web Vitals</div>
                  <div className="ecom-service-item"><span className="ecom-service-check">✓</span> Shopify Meta & Google Pixel setup</div>
                  <div className="ecom-service-item"><span className="ecom-service-check">✓</span> App audit & conversion optimizations</div>
                </div>
              </div>

              <div className="ecom-service-card">
                <div className="ecom-service-header">
                  <div className="ecom-service-icon-box" style={{ background: "#f5efff", color: "#7f54b3" }}>⚙️</div>
                  <h3>WooCommerce Marketing</h3>
                </div>
                <p>We optimize open-source WooCommerce setups. Resolving database drag, speed tuning, setting up robust XML feeds, and establishing server-side CAPI tracking.</p>
                <div className="ecom-service-list">
                  <div className="ecom-service-item"><span className="ecom-service-check">✓</span> Database & image speed caching</div>
                  <div className="ecom-service-item"><span className="ecom-service-check">✓</span> WooCommerce Pixel server integration</div>
                  <div className="ecom-service-item"><span className="ecom-service-check">✓</span> Dynamic XML product feeds</div>
                </div>
              </div>

              <div className="ecom-service-card">
                <div className="ecom-service-header">
                  <div className="ecom-service-icon-box" style={{ background: "#fff5ee", color: "#f26322" }}>🏰</div>
                  <h3>Magento Marketing</h3>
                </div>
                <p>For complex Adobe Commerce stores, we optimize enterprise product schemas, construct clean feed indexing, and run scalable, multi-layered PPC campaigns.</p>
                <div className="ecom-service-list">
                  <div className="ecom-service-item"><span className="ecom-service-check">✓</span> Magento index optimization</div>
                  <div className="ecom-service-item"><span className="ecom-service-check">✓</span> Custom XML data feed exports</div>
                  <div className="ecom-service-item"><span className="ecom-service-check">✓</span> High-volume search marketing</div>
                </div>
              </div>

              <div className="ecom-service-card">
                <div className="ecom-service-header">
                  <div className="ecom-service-icon-box" style={{ background: "rgba(255, 107, 0, 0.1)", color: "#a13c00" }}>🛒</div>
                  <h3>Google Shopping & PMax</h3>
                </div>
                <p>Command high-intent traffic with Google Shopping. We set up, manage, and scale Performance Max campaigns, optimizing negative targets and search assets.</p>
                <div className="ecom-service-list">
                  <div className="ecom-service-item"><span className="ecom-service-check">✓</span> Shopping campaign asset curation</div>
                  <div className="ecom-service-item"><span className="ecom-service-check">✓</span> Smart bidding parameters</div>
                  <div className="ecom-service-item"><span className="ecom-service-check">✓</span> Negative keyword placement filters</div>
                </div>
              </div>

              <div className="ecom-service-card">
                <div className="ecom-service-header">
                  <div className="ecom-service-icon-box" style={{ background: "rgba(29, 78, 216, 0.1)", color: "#1d4ed8" }}>📊</div>
                  <h3>Meta Ads (FB & IG)</h3>
                </div>
                <p>Develop thumb-stopping ad creatives, catalog ads, and lookalike targeting lists to acquire new buyers at highly profitable acquisition costs.</p>
                <div className="ecom-service-list">
                  <div className="ecom-service-item"><span className="ecom-service-check">✓</span> Advantage+ Catalog campaigns</div>
                  <div className="ecom-service-item"><span className="ecom-service-check">✓</span> Conversions API (CAPI) server tags</div>
                  <div className="ecom-service-item"><span className="ecom-service-check">✓</span> High-CTR UGC image/video scripts</div>
                </div>
              </div>

              <div className="ecom-service-card">
                <div className="ecom-service-header">
                  <div className="ecom-service-icon-box" style={{ background: "rgba(14, 165, 233, 0.1)", color: "#0ea5e9" }}>🏷️</div>
                  <h3>Product Feed Optimization</h3>
                </div>
                <p>We ensure your products rank on organic and paid listings by optimizing title keywords, custom tags, prices, availability, and image links in Merchant Center.</p>
                <div className="ecom-service-list">
                  <div className="ecom-service-item"><span className="ecom-service-check">✓</span> Feed title & attribute mapping</div>
                  <div className="ecom-service-item"><span className="ecom-service-check">✓</span> GMC disapproval error repairs</div>
                  <div className="ecom-service-item"><span className="ecom-service-check">✓</span> Custom labels for top margin items</div>
                </div>
              </div>

              <div className="ecom-service-card">
                <div className="ecom-service-header">
                  <div className="ecom-service-icon-box" style={{ background: "rgba(16, 185, 129, 0.1)", color: "#10b981" }}>🎯</div>
                  <h3>Conversion Rate Optimization</h3>
                </div>
                <p>Stop wasting money on traffic that bounces. We design landing pages, improve mobile UI, resolve checkout bugs, and streamline forms to boost conversion rates.</p>
                <div className="ecom-service-list">
                  <div className="ecom-service-item"><span className="ecom-service-check">✓</span> Hotjar heatmap user recordings</div>
                  <div className="ecom-service-item"><span className="ecom-service-check">✓</span> Checkout funnel leak repairs</div>
                  <div className="ecom-service-item"><span className="ecom-service-check">✓</span> Fast mobile landing page coding</div>
                </div>
              </div>

              <div className="ecom-service-card">
                <div className="ecom-service-header">
                  <div className="ecom-service-icon-box" style={{ background: "rgba(225, 29, 72, 0.1)", color: "#e11d48" }}>✉️</div>
                  <h3>Klaviyo Email Automation</h3>
                </div>
                <p>Maximize lifetime customer value with automated email sequences that welcome, recover, upsell, and retain your shoppers without manual work.</p>
                <div className="ecom-service-list">
                  <div className="ecom-service-item"><span className="ecom-service-check">✓</span> Abandoned checkout & cart flows</div>
                  <div className="ecom-service-item"><span className="ecom-service-check">✓</span> Welcome series & post-purchase flows</div>
                  <div className="ecom-service-item"><span className="ecom-service-check">✓</span> VIP rewards & win-back campaigns</div>
                </div>
              </div>



            </div>
          </div>
        </section>

        {/* ─── 5. OUR E-COMMERCE GROWTH PROCESS ─── */}
        <section className="ecom-section ecom-section-light">
          <div className="ecom-wrap">
            <div className="ecom-title-center">
              <span className="ecom-eyebrow">🔄 How We Scale Your Store</span>
              <h2>Our E-Commerce Marketing Process</h2>
              <p>Our proven e-commerce marketing process helps increase traffic, improve conversions, optimize ad performance, and maximize revenue for your online store.</p>
            </div>

            <div className="ecom-process-grid">
              
              {/* Step 1: Store Audit */}
              <div className="ecom-process-card" style={{ "--theme-color": "#7c3aed", "--theme-bg": "#f5f3ff" }}>
                <div className="ecom-process-step-num">01</div>
                <div className="ecom-process-circle">
                  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="var(--theme-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                    <line x1="2" y1="8" x2="22" y2="8" />
                    <circle cx="15" cy="15" r="3" fill="#ffffff" />
                    <path d="M17.5 17.5l3.5 3.5" />
                  </svg>
                </div>
                <h3>Store Audit</h3>
                <div className="ecom-process-card-line"></div>
                <p>We analyze your website loading speed, pixel attribution, GMC feed, checkout leaks, and past ad campaigns to find quick-win opportunities.</p>
              </div>

              {/* Step 2: Competitor Research */}
              <div className="ecom-process-card" style={{ "--theme-color": "#2563eb", "--theme-bg": "#eff6ff" }}>
                <div className="ecom-process-step-num">02</div>
                <div className="ecom-process-circle">
                  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="var(--theme-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <circle cx="10" cy="14" r="2.5" fill="#ffffff" />
                    <line x1="12" y1="16" x2="16" y2="20" />
                  </svg>
                </div>
                <h3>Competitor Research</h3>
                <div className="ecom-process-card-line"></div>
                <p>We analyze competing ads, catalog price models, landing pages, and search keyword gaps to map out an acquisition strategy.</p>
              </div>

              {/* Step 3: Audience Research */}
              <div className="ecom-process-card" style={{ "--theme-color": "#10b981", "--theme-bg": "#ecfdf5" }}>
                <div className="ecom-process-step-num">03</div>
                <div className="ecom-process-circle">
                  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="var(--theme-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" fill="#ffffff" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <h3>Audience Research</h3>
                <div className="ecom-process-card-line"></div>
                <p>We segment your past customers, build lookalikes, study interest groups, and set up dynamic remarketing targets.</p>
              </div>

              {/* Step 4: Feed Optimization */}
              <div className="ecom-process-card" style={{ "--theme-color": "#a13c00", "--theme-bg": "#fff7ed" }}>
                <div className="ecom-process-step-num">04</div>
                <div className="ecom-process-circle">
                  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="var(--theme-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="9" cy="21" r="1" />
                    <circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                    <circle cx="15" cy="11" r="2.5" fill="#ffffff" />
                  </svg>
                </div>
                <h3>Feed Optimization</h3>
                <div className="ecom-process-card-line"></div>
                <p>We restructure product feed metadata to maximize matching with Google Shopping and Performance Max algorithms.</p>
              </div>

              {/* Step 5: Campaign Setup */}
              <div className="ecom-process-card" style={{ "--theme-color": "#be185d", "--theme-bg": "#fdf2f8" }}>
                <div className="ecom-process-step-num">05</div>
                <div className="ecom-process-circle">
                  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="var(--theme-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 5L6 9H2v6h4l5 4V5z" />
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                  </svg>
                </div>
                <h3>Campaign Setup</h3>
                <div className="ecom-process-card-line"></div>
                <p>We deploy clean campaign structures separating cold acquisition from catalog retargeting, utilizing certified parameters.</p>
              </div>

              {/* Step 6: Conversion Tracking */}
              <div className="ecom-process-card" style={{ "--theme-color": "#0d9488", "--theme-bg": "#f0fdfa" }}>
                <div className="ecom-process-step-num">06</div>
                <div className="ecom-process-circle">
                  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="var(--theme-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="#ffffff" />
                  </svg>
                </div>
                <h3>Conversion Tracking</h3>
                <div className="ecom-process-card-line"></div>
                <p>We establish server-side tracking (Meta CAPI & GA4) to guarantee zero loss of conversion data in browser environments.</p>
              </div>

              {/* Step 7: Ad Optimization */}
              <div className="ecom-process-card" style={{ "--theme-color": "#f59e0b", "--theme-bg": "#fef3c7" }}>
                <div className="ecom-process-step-num">07</div>
                <div className="ecom-process-circle">
                  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="var(--theme-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="20" x2="18" y2="10" />
                    <line x1="12" y1="20" x2="12" y2="4" />
                    <line x1="6" y1="20" x2="6" y2="14" />
                    <polyline points="3 10 12 4 21 12" />
                  </svg>
                </div>
                <h3>Ad Optimization</h3>
                <div className="ecom-process-card-line"></div>
                <p>We perform weekly asset, keyword, bid, and budget adjustments to systematically lower CPA and increase ROAS.</p>
              </div>

              {/* Step 8: Scaling & Reporting */}
              <div className="ecom-process-card" style={{ "--theme-color": "#8b5cf6", "--theme-bg": "#f5f3ff" }}>
                <div className="ecom-process-step-num">08</div>
                <div className="ecom-process-circle">
                  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="var(--theme-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                    <circle cx="12" cy="10" r="2.5" fill="#ffffff" />
                  </svg>
                </div>
                <h3>Scaling & Reporting</h3>
                <div className="ecom-process-card-line"></div>
                <p>We allocate more budget to winning campaigns, launch retention flows, and deliver live Looker Studio reporting.</p>
              </div>

            </div>
          </div>
        </section>

        {/* ─── 6. PLATFORMS WE WORK WITH ─── */}
        <section className="ecom-section ecom-section-white">
          <div className="ecom-wrap">
            <div className="ecom-title-center">
              <span className="ecom-eyebrow">🔌 Platform Agnostic</span>
              <h2>E-Commerce Platforms We Optimize</h2>
              <p>We optimize leading e-commerce platforms including Shopify, WooCommerce, Magento, BigCommerce, OpenCart, Wix, Squarespace, and custom-built online stores.</p>
            </div>

            <div className="ecom-platforms-flex">
              <div className="ecom-platform-badge">🛍️ Shopify</div>
              <div className="ecom-platform-badge">⚙️ WooCommerce</div>
              <div className="ecom-platform-badge">🏰 Magento</div>
              <div className="ecom-platform-badge">📦 BigCommerce</div>
              <div className="ecom-platform-badge">🛒 OpenCart</div>
              <div className="ecom-platform-badge">🚀 PrestaShop</div>
              <div className="ecom-platform-badge">💻 Wix Commerce</div>
              <div className="ecom-platform-badge">🎨 Squarespace</div>
              <div className="ecom-platform-badge">⚡ Custom Built Stores</div>
            </div>
          </div>
        </section>

        {/* ─── 7. MARKETING CHANNELS ─── */}
        <section className="ecom-section ecom-section-light">
          <div className="ecom-wrap">
            <div className="ecom-title-center">
              <span className="ecom-eyebrow">📢 OUR MARKETING CHANNELS</span>
              <h2>Multi-Channel E-Commerce Marketing Solutions</h2>
              <p>Reach customers across Google Shopping, Meta Ads, Performance Max, Email, SMS, and social commerce channels with integrated campaigns designed to maximize sales and revenue.</p>
            </div>

            <div className="ecom-channels-grid">
              
              <div className="ecom-channel-card">
                <div className="ecom-channel-icon" style={{ background: "#ffebee", color: "#ea4335" }}>🛒</div>
                <h4>Google Shopping</h4>
              </div>
              
              <div className="ecom-channel-card">
                <div className="ecom-channel-icon" style={{ background: "#eef2ff", color: "#4285f4" }}>🔍</div>
                <h4>Search Ads</h4>
              </div>

              <div className="ecom-channel-card">
                <div className="ecom-channel-icon" style={{ background: "#fff8e1", color: "#fbbc05" }}>⚡</div>
                <h4>Performance Max</h4>
              </div>

              <div className="ecom-channel-card">
                <div className="ecom-channel-icon" style={{ background: "#e8f0fe", color: "#0064e0" }}>👥</div>
                <h4>Meta Ads</h4>
              </div>

              <div className="ecom-channel-card">
                <div className="ecom-channel-icon" style={{ background: "#fdf2f8", color: "#db2777" }}>📸</div>
                <h4>Instagram Shopping</h4>
              </div>

              <div className="ecom-channel-card">
                <div className="ecom-channel-icon" style={{ background: "#eef6ff", color: "#1e3a8a" }}>🛍️</div>
                <h4>Facebook Shops</h4>
              </div>

              <div className="ecom-channel-card">
                <div className="ecom-channel-icon" style={{ background: "#ffebee", color: "#bd081c" }}>📌</div>
                <h4>Pinterest Ads</h4>
              </div>

              <div className="ecom-channel-card">
                <div className="ecom-channel-icon" style={{ background: "#ffebee", color: "#ff0000" }}>🎥</div>
                <h4>YouTube Ads</h4>
              </div>

              <div className="ecom-channel-card">
                <div className="ecom-channel-icon" style={{ background: "rgba(29, 78, 216, 0.08)", color: "#1d4ed8" }}>✉️</div>
                <h4>Email Marketing</h4>
              </div>

              <div className="ecom-channel-card">
                <div className="ecom-channel-icon" style={{ background: "#eafaf1", color: "#10b981" }}>💬</div>
                <h4>SMS Marketing</h4>
              </div>

            </div>
          </div>
        </section>

        {/* ─── 8. BENEFITS ─── */}
        <section className="ecom-section ecom-section-white">
          <div className="ecom-wrap">
            <div className="ecom-title-center">
              <span className="ecom-eyebrow">💎 BUSINESS RESULTS</span>
              <h2>Business Growth Outcomes You Can Expect</h2>
              <p>Our data-driven e-commerce marketing strategies help increase sales, improve ROAS, reduce acquisition costs, and maximize long-term customer value.</p>
            </div>

            <div className="ecom-benefits-grid">
              
              <div className="ecom-benefit-card" style={{ borderLeft: "4px solid #10b981" }}>
                <h3>Increase Sales</h3>
                <p>Systematically increase weekly order volume by acquiring high-intent organic and paid buyers.</p>
              </div>

              <div className="ecom-benefit-card" style={{ borderLeft: "4px solid #1d4ed8" }}>
                <h3>Higher Conversion Rate</h3>
                <p>Banish checkout bugs and high friction layouts to improve conversion rates.</p>
              </div>

              <div className="ecom-benefit-card" style={{ borderLeft: "4px solid #a13c00" }}>
                <h3>Lower CPA</h3>
                <p>Lower your average Cost Per Acquisition using search asset optimization and negative filtering.</p>
              </div>

              <div className="ecom-benefit-card" style={{ borderLeft: "4px solid #0ea5e9" }}>
                <h3>Better ROAS</h3>
                <p>Shift budget dynamically into top performing shopping feeds to maximize ROAS.</p>
              </div>

              <div className="ecom-benefit-card" style={{ borderLeft: "4px solid #e11d48" }}>
                <h3>Higher AOV</h3>
                <p>Increase cart checkouts using cross-sell templates, bundlers, and checkout incentives.</p>
              </div>

              <div className="ecom-benefit-card" style={{ borderLeft: "4px solid #1d4ed8" }}>
                <h3>Customer Retention</h3>
                <p>Ensure customers buy again and again with customized post-purchase winback automations.</p>
              </div>

              <div className="ecom-benefit-card" style={{ borderLeft: "4px solid #a855f7" }}>
                <h3>Revenue Growth</h3>
                <p>Scale your monthly revenues while preserving gross product margins.</p>
              </div>

              <div className="ecom-benefit-card" style={{ borderLeft: "4px solid #06b6d4" }}>
                <h3>Brand Loyalty</h3>
                <p>Turn one-off D2C checkouts into long term brand advocates through structured VIP rewards.</p>
              </div>

            </div>
          </div>
        </section>

        {/* ─── 9. WHY CHOOSE DIGITAL MARKETING TENX ─── */}
        <section className="ecom-section ecom-section-light">
          <div className="ecom-wrap">
            <div className="ecom-title-center">
              <span className="ecom-eyebrow">🛡️ The TenX Advantage</span>
              <h2>Why Partner With Digital Marketing TenX</h2>
              <p>We do not just look at clicks or impression reports. We optimize for actual sales, ROAS, and customer lifetime values.</p>
            </div>

            <div className="ecom-why-us-grid">
              
              <div className="ecom-why-us-item">
                <div className="ecom-why-us-icon">✓</div>
                <div className="ecom-why-us-text">
                  <h3>Certified E-Commerce Experts</h3>
                  <p>Our certified specialists manage Google Shopping, Meta Ads, Performance Max, and e-commerce campaigns using proven growth strategies.</p>
                </div>
              </div>

              <div className="ecom-why-us-item">
                <div className="ecom-why-us-icon">✓</div>
                <div className="ecom-why-us-text">
                  <h3>Data-Driven Strategy</h3>
                  <p>Every campaign is optimized using real-time analytics, customer behavior, and conversion data to maximize performance.</p>
                </div>
              </div>

              <div className="ecom-why-us-item">
                <div className="ecom-why-us-icon">✓</div>
                <div className="ecom-why-us-text">
                  <h3>AI-Powered Automation</h3>
                  <p>Automate customer journeys, email marketing, remarketing, and campaign optimization with AI-powered tools.</p>
                </div>
              </div>

              <div className="ecom-why-us-item">
                <div className="ecom-why-us-icon">✓</div>
                <div className="ecom-why-us-text">
                  <h3>Continuous Campaign Optimization</h3>
                  <p>We continuously optimize ads, audiences, bidding strategies, and creatives to improve ROI and reduce acquisition costs.</p>
                </div>
              </div>

              <div className="ecom-why-us-item">
                <div className="ecom-why-us-icon">✓</div>
                <div className="ecom-why-us-text">
                  <h3>Transparent Performance Reporting</h3>
                  <p>Receive detailed monthly reports covering sales, ROAS, conversions, revenue, and campaign performance.</p>
                </div>
              </div>

              <div className="ecom-why-us-item">
                <div className="ecom-why-us-icon">✓</div>
                <div className="ecom-why-us-text">
                  <h3>Dedicated Account Manager</h3>
                  <p>Work with a dedicated e-commerce marketing expert who provides regular updates, strategic guidance, and ongoing support.</p>
                </div>
              </div>

              <div className="ecom-why-us-item">
                <div className="ecom-why-us-icon">✓</div>
                <div className="ecom-why-us-text">
                  <h3>Conversion-Focused Strategy</h3>
                  <p>Every campaign is built to increase conversions, improve customer acquisition, and maximize customer lifetime value—not just clicks.</p>
                </div>
              </div>

              <div className="ecom-why-us-item">
                <div className="ecom-why-us-icon">✓</div>
                <div className="ecom-why-us-text">
                  <h3>Scalable E-Commerce Growth</h3>
                  <p>Our growth strategies scale with your business, helping you expand revenue across multiple marketing channels.</p>
                </div>
              </div>

            </div>
          </div>
        </section>




        {/* ─── 13. FAQ SECTION ─── */}
        <section className="ecom-section ecom-section-white">
          <div className="ecom-wrap">
            <div className="ecom-title-center">
              <span className="ecom-eyebrow">❓ FAQ</span>
              <h2>Frequently Asked Questions</h2>
              <p>Everything you need to know about our e-commerce growth and advertising management services.</p>
            </div>

            <div className="seo-faq-accordion">
              {faqData.map((faq, index) => (
                <div 
                  key={index} 
                  className={`seo-faq-item ${activeFaqIndex === index ? "open" : ""}`}
                >
                  <button 
                    id={`faq-btn-${index}`}
                    onClick={() => toggleFaq(index)} 
                    className="seo-faq-question-btn"
                    aria-expanded={activeFaqIndex === index}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <span>{faq.q}</span>
                    <svg className="chevron-icon" width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <div 
                    id={`faq-answer-${index}`}
                    className="seo-faq-answer"
                    role="region"
                    aria-labelledby={`faq-btn-${index}`}
                  >
                    <p>{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── 14. FINAL CTA ─── */}
        <section className="cta-section" style={{ background: "transparent", padding: "60px 20px" }}>
          <div className="cta-card-wrapper">
            <div className="cta-grid-bg"></div>
            
            

            <div className="cta-card-content">
              <h2>Ready to Grow Your Online Store with Expert E-Commerce Marketing?</h2>
              <p>Grow your online store with data-driven E-Commerce Marketing Services in Hyderabad. Book a free consultation with our experts and discover strategies to increase traffic, conversions, and revenue.</p>
              <div className="cta-card-buttons">
                <button className="btn-primary" onClick={triggerModal}>
                  📅 Book Free Consultation
                </button>
              </div>
            </div>
          </div>
        </section>



      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
