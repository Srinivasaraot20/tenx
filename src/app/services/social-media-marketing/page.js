"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { openWhatsAppQuote } from "@/lib/whatsappQuote";
import PricingTable from "@/components/services/PricingTable";
import "./social-media-marketing.css";

// Reusable Animated Counter component
function MetricCounter({ value, duration = 1500 }) {
  const [count, setCount] = useState(0);
  const numericPart = parseInt(value.replace(/[^0-9]/g, ""), 10) || 0;
  const suffix = value.replace(/[0-9]/g, "");

  useEffect(() => {
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
  }, [value, numericPart, duration]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export default function SocialMediaMarketingPage() {
  // Scroll reveal Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
          }
        });
      },
      { threshold: 0.1 }
    );
    const elements = document.querySelectorAll(".reveal-element");
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // FAQs State
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const toggleFaq = (idx) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };


  const services = [
    {
      title: "Instagram Marketing",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" className="animate-spin-path"/>
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
        </svg>
      ),
      color: "#fdf2f8",
      text: "#db2777",
      desc: "Grow organic followers, compile viral Reels, optimize stories, and build visual brand loyalty."
    },
    {
      title: "Facebook Marketing",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" className="animate-pulse-path"/>
        </svg>
      ),
      color: "#eff6ff",
      text: "#2563eb",
      desc: "Build active local communities, configure professional business pages, and drive referral reviews."
    },
    {
      title: "LinkedIn Marketing",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" className="animate-pulse-path"/>
          <rect width="4" height="12" x="2" y="9"/>
          <circle cx="4" cy="4" r="2"/>
        </svg>
      ),
      color: "#f0f9ff",
      text: "#0284c7",
      desc: "Generate quality B2B corporate leads, position executives as industry authorities, and run newsletter hubs."
    },
    {
      title: "YouTube Marketing",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
          <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor"/>
        </svg>
      ),
      color: "#fef2f2",
      text: "#dc2626",
      desc: "Optimize video descriptions, build engaging Shorts, structure keywords, and coordinate banner systems."
    },
    {
      title: "Twitter/X Marketing",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4l11.733 16h4.267l-11.733 -16z"/>
          <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/>
        </svg>
      ),
      color: "#f8fafc",
      text: "#0f172a",
      desc: "Coordinate fast-moving industry threads, build real-time authority, and engage key brand accounts."
    },
    {
      title: "Pinterest Marketing",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19" className="animate-draw-path"/>
          <path d="M5 12h14"/>
          <circle cx="12" cy="12" r="9"/>
        </svg>
      ),
      color: "#fff1f2",
      text: "#e11d48",
      desc: "Create visual inspiration boards, pin product listings, and drive targeted shopping traffic."
    },
    {
      title: "TikTok Marketing",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18V5l12-2v13"/>
          <circle cx="6" cy="18" r="3"/>
          <circle cx="18" cy="16" r="3"/>
        </svg>
      ),
      color: "#f5f3ff",
      text: "#7c3aed",
      desc: "Design trend-jacking shorts, target younger demographics, and deploy user-generated content strategies."
    },
    {
      title: "Community Management",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      ),
      color: "#f0fdf4",
      text: "#15803d",
      desc: "Moderate user comments, reply to direct messages instantly, and host interactive polls to keep fans engaged."
    },
    {
      title: "Creative Design",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"/>
          <circle cx="7.5" cy="10.5" r="1.5" fill="currentColor"/>
          <circle cx="11.5" cy="7.5" r="1.5" fill="currentColor"/>
          <circle cx="16.5" cy="9.5" r="1.5" fill="currentColor"/>
        </svg>
      ),
      color: "#fff7ed",
      text: "#ea580c",
      desc: "Design bespoke social media grids, visual carousels, infographics, templates, and banners."
    },
    {
      title: "Content Planning",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
          <line x1="16" x2="16" y1="2" y2="6"/>
          <line x1="8" x2="8" y1="2" y2="6"/>
          <line x1="3" x2="21" y1="10" y2="10"/>
        </svg>
      ),
      color: "#faf5ff",
      text: "#9333ea",
      desc: "Map strategic monthly content calendars tailored to your specific brand pillars and marketing funnel."
    },
    {
      title: "Influencer Marketing",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
      color: "#fff1f2",
      text: "#f43f5e",
      desc: "Source relevant local influencers, negotiate promotional terms, and structure cross-collaborative reviews."
    },
    {
      title: "Paid Social Ads",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" x2="12" y1="1" y2="23"/>
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
        </svg>
      ),
      color: "#ecfdf5",
      text: "#059669",
      desc: "Run Facebook Ads, Instagram conversion ads, LinkedIn lead gen forms, and remarketing audiences."
    }
  ];

  const platforms = [
    { name: "Instagram", icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#db2777" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
      </svg>
    )},
    { name: "Facebook", icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    )},
    { name: "LinkedIn", icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect width="4" height="12" x="2" y="9"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    )},
    { name: "YouTube", icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor"/>
      </svg>
    )},
    { name: "TikTok", icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18V5l12-2v13"/>
        <circle cx="6" cy="18" r="3"/>
        <circle cx="18" cy="16" r="3"/>
      </svg>
    )},
    { name: "Pinterest", icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e11d48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="5" x2="12" y2="19"/>
        <path d="M5 12h14"/>
        <circle cx="12" cy="12" r="9"/>
      </svg>
    )},
    { name: "Twitter", icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4l11.733 16h4.267l-11.733 -16z"/>
      </svg>
    )},
    { name: "Threads", icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9333ea" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9"/>
        <path d="M12 8a4 4 0 1 0 4 4"/>
      </svg>
    )},
    { name: "WhatsApp", icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#15803d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
      </svg>
    )},
    { name: "Google Business", icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="12" x="3" y="9" rx="2"/>
        <path d="M3 22h18"/>
        <path d="M10 9V5a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v4"/>
      </svg>
    )}
  ];





  const industries = [
    {
      name: "Healthcare",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
        </svg>
      )
    },
    {
      name: "Real Estate",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      )
    },
    {
      name: "Education",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
          <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/>
        </svg>
      )
    },
    {
      name: "Finance",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" x2="12" y1="1" y2="23"/>
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
        </svg>
      )
    },
    {
      name: "Technology",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="14" x="2" y="3" rx="2"/>
          <line x1="8" x2="16" y1="21" y2="21"/>
          <line x1="12" x2="12" y1="17" y2="21"/>
        </svg>
      )
    },
    {
      name: "E-Commerce",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="21" r="1"/>
          <circle cx="20" cy="21" r="1"/>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
        </svg>
      )
    },
    {
      name: "Restaurants",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5"/>
        </svg>
      )
    },
    {
      name: "Construction",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="18" height="18" x="3" y="3" rx="2"/>
          <line x1="9" x2="15" y1="9" y2="15"/>
          <line x1="15" x2="9" y1="9" y2="15"/>
        </svg>
      )
    },
    {
      name: "Travel",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 2L11 13M22 2l-7 20-4-9-9-4z"/>
        </svg>
      )
    },
    {
      name: "Automotive",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="18" height="10" x="3" y="11" rx="2"/>
          <circle cx="7" cy="21" r="2"/>
          <circle cx="17" cy="21" r="2"/>
          <path d="M5 11V6a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v5"/>
        </svg>
      )
    }
  ];

  const benefits = [
    { title: "Increase Followers", desc: "Attract a dedicated, targeted fan base interested in your service niche." },
    { title: "Higher Engagement", desc: "Get more likes, shares, comments, and direct message queries." },
    { title: "More Website Traffic", desc: "Drive high-intent social media clickers directly to your landing pages." },
    { title: "Brand Recognition", desc: "Familiarize local audiences with your company color, voice, and values." },
    { title: "Quality Leads", desc: "Capture user contact details using interactive bios and ad-forms." },
    { title: "Higher Sales Conversion", desc: "Nurture social traffic into sales using product retargeting ads." },
    { title: "Customer Loyalty", desc: "Engage post-purchase users to build repeat customers." },
    { title: "Maximum ROI", desc: "Optimize ad spend using custom conversion targeting options." }
  ];

  const whyChooseUs = [
    { title: "Certified Social Media Experts", desc: "Our experienced strategists manage campaigns using proven social media marketing techniques that deliver measurable business growth." },
    { title: "Creative Content Studio", desc: "From graphics and Reels to videos and ad creatives, we produce engaging content that captures attention and drives engagement." },
    { title: "Performance-Focused Strategy", desc: "Every campaign is built around clear business goals, focusing on leads, sales, engagement, and return on investment." },
    { title: "Transparent Reporting", desc: "Receive detailed monthly reports with insights into reach, engagement, conversions, and campaign performance." },
    { title: "Dedicated Account Manager", desc: "Work with a dedicated expert who manages your campaigns, provides regular updates, and ensures smooth communication." },
    { title: "Flexible Pricing Plans", desc: "Choose scalable social media marketing packages with transparent pricing and no hidden costs." },
    { title: "AI-Powered Optimization", desc: "We use AI tools and real-time analytics to optimize content, audience targeting, and campaign performance." },
    { title: "Stay Ahead of Trends", desc: "We continuously adapt your strategy to the latest platform updates, content trends, and algorithm changes to maximize results." }
  ];

  const faqs = [
    { q: "How long does social media marketing take to show results?", a: "Organic growth and brand authority typically show noticeable momentum in 3 to 6 months. However, paid social media advertising campaigns (like Meta Ads or LinkedIn Ads) can drive immediate traffic, leads, and sales within the first week of launch." },
    { q: "Which social media platform is best for my business?", a: "It depends on your audience. B2B companies find LinkedIn and Twitter/X highly effective. B2C brands, retail, and local services thrive on Instagram, Facebook, and TikTok. We perform a competitor analysis to identify where your customers are most active." },
    { q: "Do you create the content for our posts?", a: "Yes, we handle the entire content creation workflow: content calendar planning, custom graphic design, copywriting, Reels/Shorts video editing, and caption writing. Everything is sent to you for approval before scheduling." },
    { q: "How much do your social media marketing packages cost?", a: "Our pricing is transparent and depends on the scope of management (number of platforms, posting frequency, creative types) and ad budget. We customize our packages to deliver the highest ROI for your startup or enterprise. Contact us for a free strategy proposal." },
    { q: "Can social media marketing help with lead generation?", a: "Absolutely. Through organic click-funnels, lead magnets, bio optimizations, and highly targeted lead generation ads (with Meta instant forms or custom landing pages), we capture high-quality leads directly from social feeds." },
    { q: "Do you run paid social media advertising campaigns?", a: "Yes, we structure and optimize campaigns across Meta (Facebook & Instagram Ads), LinkedIn Ads, YouTube Ads, and TikTok Ads. We handle audience targeting, graphic assets, copywriting, and bid management." },
    { q: "Do you provide monthly analytics reports?", a: "Yes, we send comprehensive monthly reports detailing follower growth, reach, impressions, engagement rates, click-through rates, lead conversions, and ad return metrics. We also host a monthly review call to review the next steps." },
    { q: "How often will you post on our accounts?", a: "It varies by package, typically ranging from 3 posts a week up to daily updates, depending on the platform and package scope. We balance consistency with quality to keep the algorithm happy." },
    { q: "Do we need to sign a long-term contract?", a: "We work on a month-to-month retainer basis. You can pause or adjust your package scope at any time with a 30-day notice. We believe in earning your partnership every month through solid performance." },
    { q: "Can you help set up our social media pages from scratch?", a: "Yes. If you are launching a new startup or brand, we will set up and design your profiles, write optimized bios, configure buttons, and set up tracking links to get you started." }
  ];

  return (
    <div className="smm-container">
      <Header />

      {/* 1. HERO SECTION */}
      <section className="smm-hero">
        {/* LEFT: content */}
        <div className="smm-hero-content">
          <div className="smm-hero-badge">
            ⚡ Social Media Management &amp; Ads
          </div>
          <h1>
            Social Media Marketing<br />
            Services in Hyderabad<br />
            That <span style={{ color: "var(--smm-orange)" }}>Grow Brands</span><br />
            &amp; Generate Leads
          </h1>
          <p>
            Grow your business with data-driven Social Media Marketing Services in Hyderabad. We create high-performing Instagram, Facebook, LinkedIn, and paid social campaigns that increase brand awareness, engagement, leads, and sales.
          </p>
          <div className="smm-hero-btns">
            <button className="btn-brand-primary" onClick={() => window.dispatchEvent(new CustomEvent("trigger-consultation-modal", { detail: { service: "Social Media Marketing" } }))}>
              📅 Book Free Consultation
            </button>
            <button className="btn-brand-outline" onClick={() => openWhatsAppQuote("Social Media Marketing")}>
              📄 Request Proposal
            </button>
          </div>

          {/* Mini trust badges */}
          <div className="smm-hero-trust-row">
            <div className="smm-hero-trust-item">
              <div className="smm-hero-trust-icon" style={{ background: "rgba(124,58,237,0.08)" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              </div>
              <div>
                <div className="smm-trust-item-title">Targeted Audience</div>
                <div className="smm-trust-item-desc">Reach the right people</div>
              </div>
            </div>
            <div className="smm-hero-trust-item">
              <div className="smm-hero-trust-icon" style={{ background: "rgba(236,72,153,0.08)" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#be185d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
              </div>
              <div>
                <div className="smm-trust-item-title">Higher Engagement</div>
                <div className="smm-trust-item-desc">Increase likes, shares &amp; comments</div>
              </div>
            </div>
            <div className="smm-hero-trust-item">
              <div className="smm-hero-trust-icon" style={{ background: "rgba(255,107,0,0.08)" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff5722" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 9 11 13 15 22 22 3"/></svg>
              </div>
              <div>
                <div className="smm-trust-item-title">Lead Generation</div>
                <div className="smm-trust-item-desc">Convert followers into customers</div>
              </div>
            </div>
            <div className="smm-hero-trust-item">
              <div className="smm-hero-trust-icon" style={{ background: "rgba(16,185,129,0.08)" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
              </div>
              <div>
                <div className="smm-trust-item-title">Brand Growth</div>
                <div className="smm-trust-item-desc">Build authority &amp; grow your brand</div>
              </div>
            </div>
          </div>


        </div>

        {/* RIGHT: premium visual */}
        <div className="smm-hero-visual" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', position: 'relative', alignSelf: 'flex-start' }}>
          <Image
            src="/smm-hero.webp"
            alt="Social Media Marketing in Hyderabad"
            width={450}
            height={450}
            priority
            style={{ width: '100%', height: 'auto', maxWidth: '450px', zIndex: 2, position: 'relative' }}
          />
        </div>
      </section>

      {/* 3. WHY SMM */}
      <section className="smm-section">
        <div className="smm-sec-header reveal-element">
          <span className="eyebrow">WHY CHOOSE SOCIAL MEDIA MARKETING?</span>
          <h2>Why Your Business Needs Social Media Marketing</h2>
          <p>Build a strong online presence, connect with your target audience, and generate qualified leads through strategic social media marketing. From brand awareness to customer engagement, social media helps businesses grow faster and stay ahead of the competition.</p>
        </div>
        <div className="smm-why-grid reveal-element">
          <div className="glass-card smm-why-card">
            <div className="smm-why-icon">📢</div>
            <h3>Increase Brand Awareness</h3>
            <p>Grow your brand visibility across Facebook, Instagram, LinkedIn, and other platforms with consistent, engaging content that keeps your business top of mind.</p>
          </div>
          <div className="glass-card smm-why-card">
            <div className="smm-why-icon">🎯</div>
            <h3>Generate Quality Leads</h3>
            <p>Reach the right audience with targeted campaigns and convert interested users into qualified leads through optimized social media strategies.</p>
          </div>
          <div className="glass-card smm-why-card">
            <div className="smm-why-icon">🤝</div>
            <h3>Build Customer Trust</h3>
            <p>Build credibility by sharing valuable content, responding to customer queries, and maintaining an active, professional social media presence.</p>
          </div>
          <div className="glass-card smm-why-card">
            <div className="smm-why-icon">⚡</div>
            <h3>Improve Engagement</h3>
            <p>Increase likes, comments, shares, and conversations with engaging content that encourages your audience to interact with your brand.</p>
          </div>
          <div className="glass-card smm-why-card">
            <div className="smm-why-icon">🌐</div>
            <h3>Drive Website Traffic</h3>
            <p>Direct social media users to your website, landing pages, or online store to increase traffic, inquiries, and conversions.</p>
          </div>
          <div className="glass-card smm-why-card">
            <div className="smm-why-icon">🛒</div>
            <h3>Boost Sales &amp; Conversions</h3>
            <p>Turn followers into customers with strategic campaigns, retargeting ads, and conversion-focused content that drives measurable business growth.</p>
          </div>
        </div>
      </section>

      {/* 4. SERVICES WE OFFER & INTERACTIVE ICONS */}
      <section className="smm-section" style={{ backgroundColor: "#ffffff" }}>
        <div className="smm-sec-header reveal-element">
          <span className="eyebrow">Services Catalog</span>
          <h2>Our Social Media Marketing Services</h2>
          <p>We deploy full-scope campaign management to cover all organic scheduling and advertising needs.</p>
        </div>
        <div className="smm-services-grid reveal-element">
          {services.map((svc, idx) => (
            <div key={idx} className="glass-card smm-svc-card">
              <div className="smm-svc-header">
                <div className="smm-svc-icon-box" style={{ backgroundColor: svc.color, color: svc.text }}>
                  {svc.icon}
                </div>
                <h3>{svc.title}</h3>
              </div>
              <p>{svc.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. PLATFORMS WE MANAGE */}
      <section className="smm-section">
        <div className="smm-sec-header reveal-element">
          <span className="eyebrow">Platforms</span>
          <h2>Social Platforms We Manage</h2>
          <p>We configure profiles, visual grids, and custom ad campaigns on all major social networks.</p>
        </div>
        <div className="smm-plat-grid reveal-element">
          {platforms.map((plat, idx) => (
            <div key={idx} className="glass-card smm-plat-card">
              <div className="smm-plat-logo-circle">
                {plat.icon}
              </div>
              <span>{plat.name}</span>
            </div>
          ))}
        </div>
      </section>


      {/* 9. INDUSTRIES SERVED */}
      <section className="smm-section">
        <div className="smm-sec-header reveal-element">
          <span className="eyebrow">Industries</span>
          <h2>Industries We Serve</h2>
          <p>We create customized social media marketing strategies for businesses across multiple industries to increase brand awareness, engagement, and qualified leads.</p>
        </div>
        <div className="smm-ind-grid reveal-element">
          {industries.map((ind, idx) => (
            <div key={idx} className="glass-card smm-ind-card">
              <div className="smm-ind-icon-box">{ind.icon}</div>
              <span>{ind.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 10. BENEFITS & RESULTS */}
      <section className="smm-section" style={{ backgroundColor: "#ffffff" }}>
        <div className="smm-sec-header reveal-element">
          <span className="eyebrow">The Benefits</span>
          <h2>Key Growth Benefits of SMM</h2>
          <p>By building consistent touchpoints across feeds, we grow your bottom-line metrics.</p>
        </div>
        <div className="smm-benefits-grid reveal-element">
          {benefits.map((item, idx) => (
            <div key={idx} className="glass-card smm-benefits-card">
              <div className="smm-benefits-icon-box">✓</div>
              <h3>{item.title}</h3>
              <p style={{ fontSize: "13.5px", color: "#64748b", margin: "8px 0 0 0" }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>



      {/* 14. WHY CHOOSE US */}
      <section className="smm-section">
        <div className="smm-sec-header reveal-element">
          <span className="eyebrow">WHY CHOOSE TENX</span>
          <h2>Why Businesses Choose Digital Marketing TenX</h2>
          <p>We combine creative content, paid advertising, and data-driven strategies to help businesses build stronger brands, generate qualified leads, and achieve measurable social media growth.</p>
        </div>
        <div className="smm-why-us-grid reveal-element">
          {whyChooseUs.map((item, idx) => (
            <div key={idx} className="glass-card smm-why-us-card">
              <div className="smm-why-us-icon-box">✓</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <PricingTable 
        title="Social Media Marketing Packages"
        subtitle="Build your brand, engage your audience, and generate more opportunities with professionally managed social media campaigns."
        serviceName="Social Media Marketing"
        serviceId="social-media"
        packages={[
          { id: "basic", name: "Basic", price: "₹6,000", period: "/month" },
          { id: "growth", name: "Growth", price: "₹12,000", period: "/month", popular: true },
          { id: "premium", name: "Premium", price: "₹20,000+", period: "/month" }
        ]}
      />

      {/* 15. FAQS ACCORDION */}
      <section className="smm-section smm-faq-section">
        <div className="smm-sec-header reveal-element">
          <span className="eyebrow">FAQs</span>
          <h2>Frequently Asked Questions</h2>
          <p>Find answers to the most common questions about our social media marketing services, pricing, strategy, and campaign management.</p>
        </div>
        <div className="smm-faq-wrap reveal-element">
          {faqs.map((faq, idx) => (
            <div key={idx} className={`smm-faq-card ${openFaqIndex === idx ? "open" : ""}`}>
              <button className={`smm-faq-trigger ${openFaqIndex === idx ? "open" : ""}`} onClick={() => toggleFaq(idx)}>
                <span>{faq.q}</span>
                <svg className={`smm-faq-chevron ${openFaqIndex === idx ? "rotated" : ""}`} width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <div className={`smm-faq-answer ${openFaqIndex === idx ? "expanded" : ""}`}>
                {faq.a}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 16. FINAL CTA */}
      <section className="cta-section" style={{ padding: "40px 60px 80px 60px", background: "#ffffff" }}>
        <div className="cta-card-wrapper">
          <div className="cta-grid-bg"></div>
          
            
          <div className="cta-card-content">
            <h2>Ready to Grow Your Business with Social Media Marketing?</h2>
            <p>
              Let's create a data-driven social media marketing strategy to increase brand awareness, engagement, qualified leads, and business growth.
            </p>
            <div className="cta-card-buttons">
              <button className="btn-primary" onClick={() => window.dispatchEvent(new CustomEvent("trigger-consultation-modal"))}>
                📅 Book Free Consultation
              </button>
              <a href="/contact" className="btn-outline">▶ Get a Free Proposal</a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}

