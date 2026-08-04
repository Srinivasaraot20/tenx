"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import CTA from "@/components/CTA";
import "./services.css";

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

export default function ServicesPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const toggleFaq = (idx) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  // 6 Core Services data
  const services = [
    {
      id: "website-design",
      icon: "/website-design.webp",
      bgColor: "#eef2ff",
      title: "Website Design",
      desc: "Create fast, responsive, and conversion-focused websites that deliver exceptional user experiences across every device.",
      included: [
        "UI/UX Design",
        "Responsive Design",
        "Landing Pages",
        "Corporate Websites",
        "Portfolio Websites",
        "CMS Integration",
        "Website Redesign",
        "Speed Optimization"
      ],
      benefits: ["Mobile Friendly", "SEO Ready", "Fast Loading", "Conversion Focused"],
      ctaText: "Explore Website Design →",
      ctaLink: "/services/website-design"
    },
    {
      id: "google-ads",
      icon: "/google-ads.webp",
      bgColor: "#fff5ee",
      title: "Google Ads",
      desc: "Reach high-intent customers instantly with data-driven Google Ads campaigns that maximize ROI and generate qualified leads.",
      included: [
        "Search Ads",
        "Display Ads",
        "Performance Max",
        "Shopping Ads",
        "YouTube Ads",
        "Remarketing",
        "Conversion Tracking",
        "Monthly Optimization"
      ],
      benefits: ["Instant Leads", "Better ROAS", "Lower CPC", "Scalable Campaigns"],
      ctaText: "Explore Google Ads →",
      ctaLink: "/services/google-ads"
    },
    {
      id: "seo",
      icon: "/seo.webp",
      bgColor: "#f0fdf4",
      title: "SEO",
      desc: "Increase your organic visibility, attract qualified traffic, and build long-term search engine authority with comprehensive SEO strategies.",
      included: [
        "Technical SEO",
        "Local SEO",
        "On-Page SEO",
        "Off-Page SEO",
        "Keyword Research",
        "Content Optimization",
        "Link Building",
        "SEO Reporting"
      ],
      benefits: ["Higher Rankings", "More Organic Traffic", "Long-Term Growth", "Better Visibility"],
      ctaText: "Explore SEO →",
      ctaLink: "/seo-services"
    },
    {
      id: "social-media",
      icon: "/smm.webp",
      bgColor: "#fdf4ff",
      title: "Social Media Marketing",
      desc: "Build a stronger brand presence, engage your audience, and generate leads through strategic social media campaigns.",
      included: [
        "Instagram Marketing",
        "Facebook Marketing",
        "LinkedIn Marketing",
        "Content Planning",
        "Creative Design",
        "Paid Campaigns",
        "Community Management",
        "Analytics"
      ],
      benefits: ["Brand Awareness", "Higher Engagement", "Lead Generation", "Community Growth"],
      ctaText: "Explore Social Media →",
      ctaLink: "/services/social-media-marketing"
    },
    {
      id: "e-commerce",
      icon: "/e-commerce.webp",
      bgColor: "#f0fdf4",
      title: "E-Commerce Marketing",
      desc: "Grow your online store with performance marketing strategies that increase traffic, improve conversions, and maximize revenue.",
      included: [
        "Shopify Marketing",
        "WooCommerce Marketing",
        "Product Ads",
        "Shopping Campaigns",
        "Conversion Optimization",
        "Email Marketing",
        "Abandoned Cart Recovery",
        "Analytics"
      ],
      benefits: ["More Sales", "Higher Conversion Rate", "Better Customer Retention", "Increased Revenue"],
      ctaText: "Explore E-Commerce →",
      ctaLink: "/services/e-commerce-marketing"
    },
    {
      id: "whatsapp-automation",
      icon: "/whatsapp-automation.webp",
      bgColor: "#f0fff4",
      title: "WhatsApp Automation",
      desc: "Automate customer communication with personalized WhatsApp workflows that improve engagement, nurture leads, and increase conversions.",
      included: [
        "WhatsApp Business API",
        "Lead Automation",
        "Broadcast Campaigns",
        "Automated Replies",
        "Appointment Reminders",
        "CRM Integration",
        "Sales Funnels",
        "Customer Support Automation"
      ],
      benefits: ["Faster Response Time", "Better Customer Experience", "More Qualified Leads", "Higher Conversion Rates"],
      ctaText: "Explore WhatsApp Automation →",
      ctaLink: "/services/whatsapp-automation"
    }
  ];

  // Why Choose Us features
  const features = [
    {
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#6b21a8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <circle cx="12" cy="12" r="6"></circle>
          <circle cx="12" cy="12" r="2"></circle>
          <path d="M22 2l-7.5 7.5"></path>
          <path d="M22 2h-5m5 0v5"></path>
        </svg>
      ),
      iconBg: "#f3e8ff",
      lineColor: "#6b21a8",
      title: "Performance-Driven Strategy",
      desc: "Every campaign is mapped to clear corporate growth objectives, targeting actual customer acquisition metrics."
    },
    {
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 20h13"></path>
          <path d="M5 20v-6h3v6"></path>
          <path d="M10 20V8h3v12"></path>
          <circle cx="17" cy="15" r="3"></circle>
          <path d="M19 17l2.5 2.5"></path>
        </svg>
      ),
      iconBg: "#eff6ff",
      lineColor: "#2563eb",
      title: "Data-Backed Decision Making",
      desc: "We replace guesswork with granular data audits, conversion tracking parameters, and analytics platforms."
    },
    {
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#a13c00" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 2l-8 8"></path>
          <path d="M22 2c-3 0-6.5 2.5-8 4.5L9.5 11l-3 3c-1.5 1.5-2 3.5-2.5 5.5.5 0 2.5-.5 4-2l3-3 4.5-4.5c2-1.5 4.5-5 4.5-8z"></path>
          <path d="M11.5 9.5l3 3"></path>
          <path d="M9 15l-3-3"></path>
        </svg>
      ),
      iconBg: "#fff5ee",
      lineColor: "#a13c00",
      title: "Fast Execution",
      desc: "Our agile workflow ensures campaign setup, landing pages, and integrations are deployed within days, not months."
    },
    {
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#15803d" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
          <rect x="9" y="9" width="6" height="6"></rect>
          <line x1="9" y1="1" x2="9" y2="4"></line>
          <line x1="15" y1="1" x2="15" y2="4"></line>
          <line x1="9" y1="20" x2="9" y2="23"></line>
          <line x1="15" y1="20" x2="15" y2="23"></line>
          <line x1="20" y1="9" x2="23" y2="9"></line>
          <line x1="20" y1="15" x2="23" y2="15"></line>
          <line x1="1" y1="9" x2="4" y2="9"></line>
          <line x1="1" y1="15" x2="4" y2="15"></line>
          <text x="12" y="15" fontSize="7.5" fontWeight="950" textAnchor="middle" fill="#15803d" stroke="none" fontFamily="'Inter', sans-serif">AI</text>
        </svg>
      ),
      iconBg: "#f0fdf4",
      lineColor: "#15803d",
      title: "AI-Powered Automation",
      desc: "We utilize advanced AI utilities for copywriting at scale, lead nurture workflows, and automated communication."
    },
    {
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <path d="M8 12v4"></path>
          <path d="M11 10v6"></path>
          <circle cx="15" cy="14" r="2.5"></circle>
        </svg>
      ),
      iconBg: "#e0f2fe",
      lineColor: "#0ea5e9",
      title: "Transparent Reporting",
      desc: "Gain access to full live dashboards, combined with simplified monthly executive reviews, showing true ROAS."
    },
    {
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#db2777" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="6" cy="16" r="2"></circle>
          <path d="M2 20a4 4 0 0 1 8 0"></path>
          <circle cx="18" cy="16" r="2"></circle>
          <path d="M14 20a4 4 0 0 1 8 0"></path>
          <circle cx="12" cy="12" r="2.5"></circle>
          <path d="M7.5 17a4.5 4.5 0 0 1 9 0"></path>
          <polygon points="12 2 13.5 5 16.5 5.5 14.5 7.5 15 10.5 12 9 9 10.5 9.5 7.5 7.5 5.5 10.5 5"></polygon>
        </svg>
      ),
      iconBg: "#fdf2f8",
      lineColor: "#db2777",
      title: "Dedicated Growth Experts",
      desc: "Work directly with certified marketing consultants, UI designers, and systems architects aligned to your scale."
    }
  ];

  // Process steps
  const processSteps = [
    { num: "01", title: "Discovery", desc: "We identify your business targets, constraints, and current performance metrics." },
    { num: "02", title: "Research", desc: "Comprehensive audits of competitor positioning, ad opportunities, and keyword targets." },
    { num: "03", title: "Strategy", desc: "Creating a customized channels plan, budget allocation strategy, and KPI roadmap." },
    { num: "04", title: "Execution", desc: "Deploying high-converting visual assets, custom code integrations, and targeted ads." },
    { num: "05", title: "Optimization", desc: "Rigorous daily bidding tweaks, A/B landing page iterations, and copy improvements." },
    { num: "06", title: "Scale", desc: "Allocating budget additions to peak channels and launching expansions for continuous growth." }
  ];
  // Industries data
  const industries = [
    {
      name: "Real Estate",
      desc: "Generate high-quality leads and close more property deals consistently.",
      iconBg: "#eff6ff",
      accentColor: "#2563eb",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="2" width="8" height="20" rx="1"></rect>
          <rect x="12" y="8" width="8" height="14" rx="1"></rect>
          <line x1="7" y1="6" x2="9" y2="6"></line>
          <line x1="7" y1="10" x2="9" y2="10"></line>
          <line x1="7" y1="14" x2="9" y2="14"></line>
          <line x1="7" y1="18" x2="9" y2="18"></line>
          <line x1="15" y1="12" x2="17" y2="12"></line>
          <line x1="15" y1="16" x2="17" y2="16"></line>
        </svg>
      )
    },
    {
      name: "Healthcare",
      desc: "Attract more patients and build trust with data-driven digital strategies.",
      iconBg: "#ecfdf5",
      accentColor: "#10b981",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          <path d="M3.5 12h3l2.5-3.5 3 7 2.5-5.5 2 2h3"></path>
        </svg>
      )
    },
    {
      name: "Education",
      desc: "Increase admissions and student engagement with result-oriented marketing.",
      iconBg: "#f3e8ff",
      accentColor: "#7c3aed",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
          <path d="M6 12v5c0 2 2.5 3 6 3s6-1 6-3v-5"></path>
        </svg>
      )
    },
    {
      name: "Retail",
      desc: "Boost footfall, sales, and customer loyalty through smart campaigns.",
      iconBg: "#fff7ed",
      accentColor: "#f97316",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <path d="M16 10a4 4 0 0 1-8 0"></path>
        </svg>
      )
    },
    {
      name: "Restaurants",
      desc: "Drive reservations, online orders, and repeat customers with targeted marketing.",
      iconBg: "#fef2f2",
      accentColor: "#ef4444",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2v7a3 3 0 0 0 3 3v9h1v-9a3 3 0 0 0 3-3V2M8 2v5M10 2v5"></path>
          <path d="M17 2a3 3 0 0 1 3 3v5c0 2-3 3-3 3v8h-1v-8s-3-1-3-3V5a3 3 0 0 1 3-3z"></path>
        </svg>
      )
    },
    {
      name: "Construction",
      desc: "Generate quality leads and grow your construction business pipeline.",
      iconBg: "#fffbeb",
      accentColor: "#d97706",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 22h4M5 22V4l13 3M5 8h10M13 6v14M18 7v4M16 11h4l-2 3h-2v-3z"></path>
        </svg>
      )
    },
    {
      name: "Technology",
      desc: "Reach the right audience and accelerate growth for your tech solutions.",
      iconBg: "#eff6ff",
      accentColor: "#2563eb",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
          <line x1="8" y1="21" x2="16" y2="21"></line>
          <line x1="12" y1="17" x2="12" y2="21"></line>
          <path d="M10 7.5L7.5 10l2.5 2.5M14 7.5l2.5 2.5-2.5 2.5"></path>
        </svg>
      )
    },
    {
      name: "Finance",
      desc: "Build credibility, generate leads, and increase conversions securely.",
      iconBg: "#f0fdf4",
      accentColor: "#0d9488",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 22h18M5 10v10M9 10v10M13 10v10M17 10v10M2 10l10-6 10 6H2z"></path>
        </svg>
      )
    }
  ];

  // FAQs data
  const faqs = [
    {
      q: "Which service is right for my business?",
      a: "The right service depends on your immediate and long-term goals. If you need leads instantly, Google Ads is highly effective. For building a solid, long-term search presence, SEO is essential. We recommend booking a free strategy call so we can audit your business and build a customized recommendations path."
    },
    {
      q: "How long does SEO take?",
      a: "SEO is a compounding organic asset. While minor technical fixes can yield ranking improvements within weeks, substantial keywords visibility improvements and a steady stream of free organic traffic typically require 3 to 6 months of persistent optimization."
    },
    {
      q: "When will I see results from Google Ads?",
      a: "Google Ads can begin driving qualified clicks to your website as soon as the campaign goes live. While leads can start coming in on day one, the first 2-4 weeks are typically used to refine targeting, filter negative keywords, and optimize ad configurations to stabilize your cost per acquisition."
    },
    {
      q: "Can I combine multiple services?",
      a: "Absolutely. In fact, multi-channel marketing delivers the best results. For example, linking Google Ads campaigns to modern, speed-optimized Landing Pages (Website Design) maximizes your conversions, while SEO and Social Media build brand authority in parallel."
    },
    {
      q: "Do you provide monthly reports?",
      a: "Yes, transparency is one of our core pillars. We provide detailed monthly performance updates detailing total spend, cost-per-click, leads/sales generated, and overall ROAS. You will also get access to a live, interactive client dashboard updated daily."
    },
    {
      q: "Do you redesign existing websites?",
      a: "Yes, we handle complete website redesigns. We audit your existing site, design an improved UI/UX, optimize loading speed, ensure the entire structure is conversion-focused, and implement 301 redirects to protect your current search engine rankings."
    },
    {
      q: "Can you manage social media for my business?",
      a: "Yes, our Social Media Marketing service covers everything from content calendar curation, graphic design, copywriting, automated postings, paid conversions campaigns, and community engagement analytics."
    }
  ];

  // Future services
  const futureServices = [
    {
      title: "Web Development",
      tag: "Expansion",
      tagClass: "tag-purple",
      iconBg: "#f3e8ff",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6b21a8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
          <line x1="8" y1="21" x2="16" y2="21"></line>
          <line x1="12" y1="17" x2="12" y2="21"></line>
          <path d="M10 7.5L7.5 10l2.5 2.5M14 7.5l2.5 2.5-2.5 2.5"></path>
        </svg>
      )
    },
    {
      title: "Local SEO",
      tag: "Available",
      tagClass: "tag-green",
      iconBg: "#f0fdf4",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#15803d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
      )
    },
    {
      title: "Meta Ads",
      tag: "Available",
      tagClass: "tag-blue",
      iconBg: "#eff6ff",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 12a5 5 0 0 0 9 3l2-3 2-3a5 5 0 0 1 9 3 5 5 0 0 1-9 3l-2-3-2-3a5 5 0 0 0-9 3z"></path>
        </svg>
      )
    },
    {
      title: "Content Marketing",
      tag: "Expansion",
      tagClass: "tag-orange",
      iconBg: "#fff7ed",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <path d="M10 12h4"></path>
          <path d="M10 16h4"></path>
        </svg>
      )
    },
    {
      title: "Email Marketing",
      tag: "Available",
      tagClass: "tag-pink",
      iconBg: "#fdf2f8",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#db2777" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="16" rx="2"></rect>
          <path d="M22 7l-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
        </svg>
      )
    },
    {
      title: "Branding & Identity",
      tag: "Available",
      tagClass: "tag-yellow",
      iconBg: "#fef3c7",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
          <line x1="7" y1="7" x2="7.01" y2="7"></line>
        </svg>
      )
    },
    {
      title: "Conversion Rate Optimization (CRO)",
      tag: "Available",
      tagClass: "tag-teal",
      iconBg: "#f0fdfa",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
        </svg>
      )
    },
    {
      title: "Marketing Automation",
      tag: "Available",
      tagClass: "tag-purple",
      iconBg: "#ede9fe",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>
      )
    },
    {
      title: "CRM Integration",
      tag: "Available",
      tagClass: "tag-blue",
      iconBg: "#eff6ff",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 12H4v6a2 2 0 0 0 2 2h6v-5a2 2 0 0 1 2-2 2 2 0 0 1 2 2v5h6a2 2 0 0 0 2-2v-6h-5a2 2 0 0 1-2-2 2 2 0 0 1 2-2h5V6a2 2 0 0 0-2-2h-6v5a2 2 0 0 1-2 2 2 2 0 0 1-2-2V4H6a2 2 0 0 0-2 2v6h5a2 2 0 0 1 2 2z"></path>
        </svg>
      )
    },
    {
      title: "Analytics & Reporting",
      tag: "Available",
      tagClass: "tag-green",
      iconBg: "#f0fdf4",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#15803d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10"></line>
          <line x1="12" y1="20" x2="12" y2="4"></line>
          <line x1="6" y1="20" x2="6" y2="14"></line>
          <path d="M3 18l6-6 4 4 8-8"></path>
          <polyline points="17 8 21 8 21 12"></polyline>
        </svg>
      )
    },
    {
      title: "AI Chatbots",
      tag: "Coming Soon",
      tagClass: "tag-purple",
      iconBg: "#ede9fe",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6b21a8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="8" width="14" height="10" rx="2" ry="2"></rect>
          <line x1="10" y1="5" x2="10" y2="8"></line>
          <circle cx="10" cy="4" r="1"></circle>
          <line x1="5" y1="13" x2="7" y2="13"></line>
          <line x1="13" y1="13" x2="15" y2="13"></line>
          <path d="M16 14a4 4 0 0 1 6-3v6l-2-2h-4"></path>
        </svg>
      )
    },

    {
      title: "Marketing Consulting",
      tag: "Available",
      tagClass: "tag-blue",
      iconBg: "#eff6ff",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 9a4 4 0 0 0-6.5-3M16 12a4 4 0 0 0 4-4"></path>
        </svg>
      )
    }
  ];

  return (
    <div className="services-page-container">
      <Header />

      <main>
        {/* SECTION 1: HERO */}
        <section className="services-hero-section">
          <div className="grid-overlay"></div>
          <div className="radial-glow glow-blue-left"></div>
          <div className="radial-glow glow-orange-right"></div>

          <div className="services-hero-grid">
            <div className="services-hero-left">
              <div className="services-hero-content">
                <span className="badge-premium">🚀 Our Digital Marketing Services</span>
                <h1 className="services-hero-title">
                  Digital Marketing Solutions <br className="hide-mobile" />
                  <span className="w-text-orange">That Accelerate</span> <br className="hide-mobile" />
                  <span className="w-text-purple">Business Growth</span>
                </h1>
                <p>
                  Whether you're looking to generate qualified leads, improve search visibility, build a high-performing website, or automate customer engagement, our team delivers tailored digital solutions designed to drive measurable growth and long-term success.
                </p>
                <div className="services-hero-buttons">
                  <button className="btn-primary" onClick={() => window.dispatchEvent(new CustomEvent("trigger-consultation-modal"))}>
                    📅 Book Free Consultation
                  </button>
                  <Link href="/" className="btn-outline">
                    ▶ View Our Portfolio
                  </Link>
                </div>
              </div>

              {/* 3 Strategic Service Highlights */}
              <div className="s-hero-features">
                <div className="s-feat-item">
                  <div className="s-feat-icon-box orange">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <circle cx="12" cy="12" r="6"></circle>
                      <circle cx="12" cy="12" r="2"></circle>
                    </svg>
                  </div>
                  <div className="s-feat-info">
                    <h5>Data-Driven Strategies</h5>
                    <p>Smarter decisions for better results.</p>
                  </div>
                </div>
                <div className="s-feat-item">
                  <div className="s-feat-icon-box purple">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="20" x2="18" y2="10"></line>
                      <line x1="12" y1="20" x2="12" y2="4"></line>
                      <line x1="6" y1="20" x2="6" y2="14"></line>
                    </svg>
                  </div>
                  <div className="s-feat-info">
                    <h5>Measurable Growth</h5>
                    <p>Track, analyze and scale what works.</p>
                  </div>
                </div>
                <div className="s-feat-item">
                  <div className="s-feat-icon-box green">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                    </svg>
                  </div>
                  <div className="s-feat-info">
                    <h5>Customer Focused</h5>
                    <p>Solutions that engage and convert.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="hero-visual-wrap">
              <div className="s-globe-container">
                <Image
                  src="/ser-hero.webp"
                  alt="Digital Marketing TenX Hero"
                  width={600}
                  height={600}
                  className="floating-globe"
                  priority
                />
                <div className="s-globe-glow"></div>
                
                
              </div>

              
            </div>
          </div>
        </section>

        {/* SECTION 2: SERVICES OVERVIEW */}
        <section className="services-section section-light">
          <div className="services-grid-content">
            <div className="sec-title-centered">
              <span className="eyebrow">Services Overview</span>
              <h2>Premium Marketing Solutions Tailored for Scale</h2>
              <p>
                Explore our six core competencies, detailing exactly what we cover, why it matters, and how it drives value.
              </p>
            </div>

            <div className="services-overview-grid">
              {services.map((svc, idx) => (
                <div className="service-card glass-card" key={idx} id={svc.id}>
                  <div className="service-icon-box" style={{ backgroundColor: svc.bgColor }}>
                    <Image src={svc.icon} alt="" width={30} height={30} style={{ objectFit: "contain" }} />
                  </div>
                  <h3>{svc.title}</h3>
                  <p className="service-desc">{svc.desc}</p>
                  
                  <div className="service-divider"></div>

                  <div className="w-full" style={{ textAlign: "left", width: "100%", alignSelf: "flex-start" }}>
                    <h4 className="service-sub-title text-left" style={{ textAlign: "left" }}>What's Included</h4>
                    <ul className="space-y-2 mb-5" style={{ listStyle: "none", padding: 0, margin: "0 0 20px 0" }}>
                      {svc.included.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex items-start gap-2" style={{ fontSize: "13px", color: "var(--text-dark)", fontWeight: "500", textAlign: "left" }}>
                          <span style={{ color: "var(--primary-orange)" }}>•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <h4 className="service-sub-title text-left" style={{ textAlign: "left", marginTop: "10px" }}>Benefits</h4>
                    <ul className="benefits-list" style={{ justifyContent: "flex-start" }}>
                      {svc.benefits.map((benefit, benIdx) => (
                        <li key={benIdx}>✔ {benefit}</li>
                      ))}
                    </ul>
                  </div>

                  <Link href={svc.ctaLink} className="service-card-cta">
                    {svc.ctaText}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 3: WHY CHOOSE OUR SERVICES */}
        <section className="services-section section-white">
          <div className="radial-glow glow-blue-left" style={{ top: "30%" }}></div>
          <div className="services-grid-content">
            <div className="sec-title-centered">
              <span className="eyebrow">Why Choose Us</span>
              <h2>Everything You Need to Scale Your Business</h2>
              <p>
                We merge data-backed marketing processes with software systems to ensure campaigns execute flawlessly and achieve maximum ROI.
              </p>
            </div>

            <div className="features-grid">
              {features.map((feat, idx) => (
                <div className="feature-card glass-card" key={idx}>
                  <div className="feature-card-dots">
                    <svg width="34" height="24" viewBox="0 0 34 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="2" cy="2" r="1.5" fill="#e2e8f0" />
                      <circle cx="10" cy="2" r="1.5" fill="#e2e8f0" />
                      <circle cx="18" cy="2" r="1.5" fill="#e2e8f0" />
                      <circle cx="26" cy="2" r="1.5" fill="#e2e8f0" />
                      <circle cx="34" cy="2" r="1.5" fill="#e2e8f0" />
                      <circle cx="2" cy="10" r="1.5" fill="#e2e8f0" />
                      <circle cx="10" cy="10" r="1.5" fill="#e2e8f0" />
                      <circle cx="18" cy="10" r="1.5" fill="#e2e8f0" />
                      <circle cx="26" cy="10" r="1.5" fill="#e2e8f0" />
                      <circle cx="34" cy="10" r="1.5" fill="#e2e8f0" />
                      <circle cx="2" cy="18" r="1.5" fill="#e2e8f0" />
                      <circle cx="10" cy="18" r="1.5" fill="#e2e8f0" />
                      <circle cx="18" cy="18" r="1.5" fill="#e2e8f0" />
                      <circle cx="26" cy="18" r="1.5" fill="#e2e8f0" />
                      <circle cx="34" cy="18" r="1.5" fill="#e2e8f0" />
                    </svg>
                  </div>
                  
                  <div className="feature-icon-container" style={{ backgroundColor: feat.iconBg }}>
                    {feat.icon}
                  </div>
                  
                  <div className="feature-card-content">
                    <h3>{feat.title}</h3>
                    <div className="feature-underline" style={{ backgroundColor: feat.lineColor }}></div>
                    <p>{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 4: INDUSTRIES WE SERVE */}
        <section className="services-section section-light">
          <div className="services-grid-content">
            <div className="sec-title-centered">
              <span className="eyebrow">🏢 Industries We Serve</span>
              <h2>Proven Results Across Diverse Sectors</h2>
              <p>
                Our growth frameworks are highly flexible and customized to address specific client profiles, sales funnels, and markets.
              </p>
            </div>

            <div className="industries-grid">
              {industries.map((ind, idx) => (
                <div className="industry-card glass-card" key={idx}>
                  {/* Subtle watermark SVG in bottom right */}
                  <div className="industry-watermark">
                    {ind.icon}
                  </div>

                  <div className="industry-icon-container" style={{ backgroundColor: ind.iconBg }}>
                    {ind.icon}
                  </div>

                  <h3>{ind.name}</h3>
                  <p>{ind.desc}</p>
                  

                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 5: OUR PROCESS */}
        <section className="services-section section-white">
          <div className="grid-overlay"></div>
          <div className="services-grid-content">
            <div className="sec-title-centered">
              <span className="eyebrow">Our Methodology</span>
              <h2>How We Deliver 10X Scale</h2>
              <p>
                Our systematic, six-step digital marketing process is structured to guarantee execution quality, transparency, and results.
              </p>
            </div>

            <div className="process-timeline">
              {processSteps.map((step, idx) => (
                <div className="process-step" key={idx}>
                  <div className="step-number">{step.num}</div>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        
        {/* SECTION 8: FUTURE SERVICES TO CONSIDER */}
        <section className="services-section section-light future-services-section">
          <div className="services-grid-content">
            <div className="sec-title-centered">
              <span className="eyebrow">Specialized Competencies</span>
              <h2>Future Services to Consider</h2>
              <p>
                As your agency partner grows, we continuously expand our technical offerings to help you leverage modern channels.
              </p>
            </div>

            <div className="future-services-grid">
              {futureServices.map((svc, idx) => (
                <div className="future-service-card glass-card" key={idx}>
                  <div className="future-icon-box" style={{ backgroundColor: svc.iconBg }}>
                    {svc.icon}
                  </div>
                  <div className="future-card-content">
                    <h3>{svc.title}</h3>
                    <span className={`future-service-tag ${svc.tagClass}`}>{svc.tag}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ */}
        <section className="seo-section" style={{ backgroundColor: "var(--white-section-bg)", padding: "50px 60px" }}>
          <div className="radial-glow glow-orange-right" style={{ top: "20%" }}></div>
          <div className="services-grid-content">
            <div className="sec-title-centered">
              <span className="eyebrow" style={{ display: "inline-block", marginBottom: "16px", color: "var(--primary-orange)", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", fontSize: "12px", background: "rgba(255,107,0,0.08)", padding: "6px 14px", borderRadius: "30px" }}>💡 FAQ</span>
              <h2>Frequently Asked Questions</h2>
              <p>
                Clear, straightforward answers about our marketing models, execution speeds, and setup terms.
              </p>
            </div>

            <div className="seo-faq-accordion" style={{ maxWidth: "800px", margin: "0 auto" }}>
              {faqs.map((faq, idx) => (
                <div className={`seo-faq-item ${openFaqIndex === idx ? "open" : ""}`} key={idx}>
                  <button 
                    className="seo-faq-question-btn" 
                    onClick={() => toggleFaq(idx)}
                    aria-expanded={openFaqIndex === idx}
                  >
                    <span>{faq.q}</span>
                    <svg className="chevron-icon" width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <div className="seo-faq-answer">
                    <p>{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 9: FINAL CTA */}
        <CTA />
        
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
