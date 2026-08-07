"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import ServiceHero from "@/components/ServiceHero";
import PricingTable from "@/components/services/PricingTable";

import "./seo-services.css";

// Reusable Animated Counter component
function MetricCounter({ value, duration = 1500 }) {
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

function IconCheck({ size = 16, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function IconGoogleBadge() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" style={{ display: "inline-block", verticalAlign: "middle" }}>
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.08H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.92l2.85-2.22.81-.6z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.08l3.66 2.84c.87-2.6 3.3-4.54 6.16-4.54z" />
    </svg>
  );
}

function IconShield() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline-block", verticalAlign: "middle" }}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function IconChip() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline-block", verticalAlign: "middle" }}>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3" />
    </svg>
  );
}

function IconDocument() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline-block", verticalAlign: "middle" }}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

function IconCampaigns() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ff5722" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function IconHappyClients() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <line x1="9" y1="9" x2="9.01" y2="9" />
      <line x1="15" y1="9" x2="15.01" y2="9" />
    </svg>
  );
}

function IconRetention() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function IconGrowth() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1d4ed8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );
}

function IconKeywords() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ff8c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
      <line x1="8" y1="11" x2="14" y2="11" />
      <line x1="11" y1="8" x2="11" y2="14" />
    </svg>
  );
}

function IconVisitors() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#be185d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

function IconCalendar() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function IconRankingsMatters() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="13" width="4" height="7" rx="1" fill="#e0f2fe" />
      <rect x="10" y="9" width="4" height="11" rx="1" fill="#e0f2fe" />
      <rect x="17" y="5" width="4" height="15" rx="1" fill="#ffedd5" stroke="#ff5722" strokeWidth="2.2" />
      <path d="M 2,17 L 8,11 L 13,13 L 20,4" />
      <polyline points="15 4 20 4 20 9" />
    </svg>
  );
}

function IconTrafficMatters() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M 5,2 A 10,10 0 0 0 2,5" />
      <path d="M 19,2 A 10,10 0 0 1 22,5" />
      <path d="M 5,22 A 10,10 0 0 1 2,19" />
      <path d="M 19,22 A 10,10 0 0 0 22,19" />
      <circle cx="12" cy="12" r="7" fill="#e0f2fe" />
      <circle cx="12" cy="12" r="3" fill="#1d4ed8" stroke="#1d4ed8" />
      <line x1="21" y1="3" x2="14" y2="10" stroke="#1e293b" strokeWidth="2.2" />
      <line x1="19" y1="2" x2="21" y2="4" stroke="#1e293b" strokeWidth="2.2" />
      <line x1="20" y1="1" x2="22" y2="3" stroke="#1e293b" strokeWidth="2.2" />
      <circle cx="12" cy="12" r="1.2" fill="#ef4444" stroke="#ef4444" strokeWidth="1" />
    </svg>
  );
}

function IconVisibilityMatters() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="6,8 12,3 18,8 12,21" fill="#e0f2fe" />
      <polyline points="6,8 18,8" />
      <line x1="12" y1="3" x2="12" y2="21" />
      <line x1="6" y1="8" x2="12" y2="3" />
      <line x1="18" y1="8" x2="12" y2="3" />
      <line x1="6" y1="8" x2="12" y2="21" stroke="#1d4ed8" />
      <line x1="18" y1="8" x2="12" y2="21" stroke="#1d4ed8" />
      <line x1="12" y1="0" x2="12" y2="1.5" />
      <line x1="5" y1="2" x2="7" y2="4" />
      <line x1="19" y1="2" x2="17" y2="4" />
    </svg>
  );
}

function IconSalesMatters() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="6,12 18,12 14,17 14,22 10,22 10,17" fill="#fff7ed" stroke="#1e293b" strokeWidth="2.2" />
      <circle cx="7" cy="6" r="4.5" fill="#ffedd5" stroke="#ff5722" strokeWidth="2.2" />
      <path d="M 7,4.5 C 6.5,4.5 6,5 6,5.5 C 6,6.5 8,6.5 8,7.5 C 8,8 7.5,8.5 7,8.5" stroke="#ff5722" strokeWidth="1.5" />
      <line x1="7" y1="3.5" x2="7" y2="8.5" stroke="#ff5722" strokeWidth="1.5" />
      <path d="M 13,9 L 17,5 L 21,5" stroke="#1e293b" strokeWidth="2.2" />
      <polyline points="18,3 21,5 19,8" stroke="#1e293b" strokeWidth="2.2" />
    </svg>
  );
}

function IconCACMatters() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="#e0f2fe" />
      <path d="M 7,8 L 11,8 L 17,14" stroke="#2563eb" strokeWidth="2.2" />
      <polyline points="13,14 17,14 17,10" stroke="#2563eb" strokeWidth="2.2" />
    </svg>
  );
}

function IconGrowthMatters() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12,22 L12,14" stroke="#1e293b" strokeWidth="2.2" />
      <path d="M12,17 Q8,15 7,12" stroke="#1e293b" strokeWidth="1.5" />
      <path d="M12,15 Q16,13 17,11" stroke="#1e293b" strokeWidth="1.5" />
      <circle cx="7" cy="11" r="2.2" fill="#e0f2fe" />
      <circle cx="17" cy="10" r="2.2" fill="#e0f2fe" />
      <circle cx="12" cy="11" r="2.5" fill="#e0f2fe" />
      <circle cx="12" cy="7" r="2.2" fill="#e0f2fe" />
      <path d="M 6,19 L 11,15 L 18,11" stroke="#2563eb" strokeWidth="2.2" />
      <polyline points="15,11 18,11 18,14" stroke="#2563eb" strokeWidth="2.2" />
    </svg>
  );
}

export default function SEOServicesClient() {
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

  // Chart Tab State
  const [activeChartTab, setActiveChartTab] = useState("traffic");

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState(null);

  // Before/After State
  const [activeComparisonTab, setActiveComparisonTab] = useState("ecommerce");

  // Lead Form State
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    website: "",
    businessType: "e-commerce",
    budget: "₹25k-₹50k",
    message: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: name === "phone" ? value.replace(/[^0-9+ ]/g, "") : value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (!formData.name.trim()) errors.name = "Full name is required";
    if (!formData.email.trim()) {
      errors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (formData.phone.length < 10) {
      errors.phone = "Please enter a valid phone number";
    }
    if (!formData.website.trim()) {
      errors.website = "Website URL is required";
    } else if (!/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(formData.website)) {
      errors.website = "Please enter a valid website URL";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    
    // Simulate database write
    setTimeout(() => {
      const generatedId = "LEAD-" + Math.floor(100000 + Math.random() * 900000);
      const existingLeads = JSON.parse(localStorage.getItem("ten_consultation_leads") || "[]");
      const newLead = {
        ...formData,
        leadId: generatedId,
        dateTime: new Date().toLocaleString(),
        status: "New",
        notes: [],
        services: ["SEO Services"],
        projectDescription: formData.message,
        deviceType: /Mobi|Android/i.test(navigator.userAgent) ? "Mobile" : "Desktop",
        browser: navigator.userAgent.split(" ")[0],
        landingPage: window.location.pathname,
        utmSource: "Website",
        utmMedium: "Direct",
        utmCampaign: "SEO Services Page Form"
      };

      localStorage.setItem("ten_consultation_leads", JSON.stringify([...existingLeads, newLead]));

      console.log("=== SEO Lead Captured ===", newLead);
      console.log(`
📧 Mock Admin Notification Email
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚀 New Website SEO Lead [${generatedId}]

Name: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email}
Website: ${formData.website}
Business Type: ${formData.businessType}
Monthly Budget: ${formData.budget}
Message: ${formData.message || "N/A"}

Source: SEO Services Page Form
Date & Time: ${new Date().toLocaleString()}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);

      console.log(`
📱 WhatsApp Business Cloud API Notification (Mock Admin Alert)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
*🚀 New Website SEO Lead*
*ID:* ${generatedId}
*Name:* ${formData.name}
*Phone:* ${formData.phone}
*Website:* ${formData.website}
*Budget:* ${formData.budget}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Please check CRM and follow up immediately.
`);

      setIsSubmitting(false);
      setFormSubmitted(true);
    }, 1200);
  };

  const handleWhatsAppRedirect = () => {
    const whatsappText = `Hello Digital Marketing TenX Team 👋

I just requested a Free SEO Audit from your website. Here are my details:

👤 Name: ${formData.name}
📧 Email: ${formData.email}
📞 Phone: ${formData.phone}
🌐 Website: ${formData.website}
💼 Business: ${formData.businessType}
💰 Budget: ${formData.budget}
📝 Message: ${formData.message || "N/A"}

Please contact me for the audit. Thank you!`;

    const encodedText = encodeURIComponent(whatsappText);
    const whatsappNumber = "919392251739";
    const redirectUrl = `https://wa.me/${whatsappNumber}?text=${encodedText}`;
    window.open(redirectUrl, "_blank");
  };

  // Scroll to lead form helper
  const scrollToForm = () => {
    const target = document.getElementById("seo-audit-form-section");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Open consultation modal dispatcher
  const triggerConsultationModal = () => {
    window.dispatchEvent(
      new CustomEvent("trigger-consultation-modal", { 
        detail: { service: "SEO Services", message: "Hi, I would like to book a free SEO consultation." } 
      })
    );
  };

  // Static Data Arrays
  const trustBadgesList = [
    { text: "Google Best Practices", icon: <IconGoogleBadge /> },
    { text: "White-Hat SEO", icon: <IconShield /> },
    { text: "AI-Powered SEO", icon: <IconChip /> },
    { text: "Transparent Reporting", icon: <IconDocument /> }
  ];

  const heroStats = [
    { value: "500+", label: "SEO Campaigns", icon: <IconCampaigns /> },
    { value: "150+", label: "Happy Clients", icon: <IconHappyClients /> },
    { value: "97%", label: "Client Retention", icon: <IconRetention /> },
    { value: "300%", label: "Avg. Organic Growth", icon: <IconGrowth /> },
    { value: "1M+", label: "Keywords Ranked", icon: <IconKeywords /> },
    { value: "50M+", label: "Organic Visitors", icon: <IconVisitors /> }
  ];

  const benefits = [
    {
      title: "Higher Rankings",
      desc: "Climb to the top of Google search results for terms that drive business. We optimize elements, headings, and structure to push your pages past your competitors.",
      icon: <IconRankingsMatters />,
      bg: "#fff7ed"
    },
    {
      title: "Qualified Organic Traffic",
      desc: "Attract users actively searching for what you offer. By targeting high-intent commercial and transactional terms, we connect you with ready-to-buy customers.",
      icon: <IconTrafficMatters />,
      bg: "#e0f2fe"
    },
    {
      title: "Better Brand Visibility",
      desc: "Establish your brand as an industry leader. Appearing on Page 1 builds instant credibility, authority, and mindshare, converting searchers into loyal advocates.",
      icon: <IconVisibilityMatters />,
      bg: "#fff7ed"
    },
    {
      title: "Increased Leads & Sales",
      desc: "Turn passive searchers into high-quality conversions. We optimize sitemaps, landing page layouts, and copy to maximize lead forms and e-commerce transactions.",
      icon: <IconSalesMatters />,
      bg: "#fff7ed"
    },
    {
      title: "Lower Customer Acquisition Cost",
      desc: "Unlike paid advertising where traffic halts when budgets dry up, organic search delivers a compounding stream of free visits, lowering your blended CAC dramatically.",
      icon: <IconCACMatters />,
      bg: "#e0f2fe"
    },
    {
      title: "Long-Term Business Growth",
      desc: "Build a digital asset that works for you 24/7. High-quality SEO rankings compound over time, providing sustainable lead generation and long-term marketing value.",
      icon: <IconGrowthMatters />,
      bg: "#e0f2fe"
    }
  ];

  const services = [
    {
      title: "Technical SEO",
      bullets: [
        "In-depth site crawl audits",
        "Page speed optimization",
        "Core Web Vitals tuning",
        "Mobile usability fixes",
        "SSL/HTTPS security checks",
        "XML Sitemap & Robots.txt",
        "Schema & structured markup",
        "Canonical tags management"
      ],
      color: "#1d4ed8",
      bg: "rgba(59, 130, 246, 0.08)"
    },
    {
      title: "On-Page SEO",
      bullets: [
        "Heading (H1-H4) structure",
        "Title tag & Meta descriptions",
        "Keyword placement optimization",
        "URL structure formatting",
        "Internal linking architecture",
        "Image Alt text & resizing",
        "LSI & entity optimization",
        "User experience audit"
      ],
      color: "#ff5722",
      bg: "rgba(255, 107, 0, 0.08)"
    },
    {
      title: "Off-Page SEO",
      bullets: [
        "High-authority backlink strategy",
        "Guest posting campaigns",
        "Digital PR & brand mentions",
        "Social bookmarking & syndication",
        "Niche directory citations",
        "Broken link building outreach",
        "Unlinked brand reclamation",
        "Competitive backlink analysis"
      ],
      color: "#a855f7",
      bg: "rgba(168, 85, 247, 0.08)"
    },
    {
      title: "Local SEO",
      bullets: [
        "Google Business Profile setup",
        "Google Maps rankings booster",
        "Local citation building (NAP)",
        "Review generation strategy",
        "Local search keyword targeting",
        "Location-specific landing pages",
        "Structured local business schema",
        "Geo-targeted link building"
      ],
      color: "#10b981",
      bg: "rgba(16, 185, 129, 0.08)"
    },
    {
      title: "Keyword Research",
      bullets: [
        "Search intent analysis",
        "Competitor gap exploration",
        "Long-tail keyword targeting",
        "Keyword difficulty assessment",
        "Search volume auditing",
        "Commercial & buyer intent clustering",
        "Opportunity mapping",
        "Semantic search topic modeling"
      ],
      color: "#be185d",
      bg: "rgba(236, 72, 153, 0.08)"
    },
    {
      title: "Content Optimization",
      bullets: [
        "Content audit & gap analysis",
        "EEAT score improvements",
        "Semantic SEO structuring",
        "AI-assisted topic enrichment",
        "NLP & Google Hummingbird checks",
        "Topic cluster planning",
        "Outdated content refresh",
        "Content readability tuning"
      ],
      color: "#f59e0b",
      bg: "rgba(245, 158, 11, 0.08)"
    },
    {
      title: "Link Building",
      bullets: [
        "Editorial outreach campaigns",
        "Skyscraper technique articles",
        "HARO press opportunities",
        "High-authority resource links",
        "Broken link replacement",
        "PR distribution outreach",
        "Safe white-hat link acquisition",
        "Toxic link disavow management"
      ],
      color: "#6366f1",
      bg: "rgba(99, 102, 241, 0.08)"
    },
    {
      title: "SEO Reporting",
      bullets: [
        "Google Analytics 4 setup",
        "Search Console integration",
        "Keyword ranking trackers",
        "Organic traffic reports",
        "Conversion performance tracking",
        "Competitor share-of-voice",
        "Custom Looker Studio dashboards",
        "Actionable next-month strategy"
      ],
      color: "#14b8a6",
      bg: "rgba(20, 184, 166, 0.08)"
    }
      ,
      {
        title: "Answer Engine Optimization (AEO)",
        bullets: [
          "AI search visibility optimization",
          "Featured Snippet optimization",
          "People Also Ask (PAA) strategy",
          "FAQ content optimization",
          "Voice search optimization",
          "Structured data & Schema Markup",
          "Entity-based SEO implementation",
          "Knowledge Graph optimization",
          "E-E-A-T enhancement",
          "Conversational content optimization",
          "Zero-click search optimization",
          "AI-friendly content architecture"
        ],
        color: "#2563eb",
        bg: "rgba(37, 99, 235, 0.08)"
      },
      {
        title: "Generative Engine Optimization (GEO)",
        bullets: [
          "AI search optimization strategy",
          "ChatGPT visibility optimization",
          "Google AI Overviews optimization",
          "Microsoft Copilot optimization",
          "Perplexity AI optimization",
          "Claude AI optimization",
          "Gemini AI optimization",
          "Entity & semantic optimization",
          "Brand authority development",
          "Citation and source optimization",
          "AI-ready content creation",
          "LLM indexing optimization",
          "Knowledge Graph expansion",
          "Digital PR for AI citations",
          "Topical authority development",
          "AI content performance monitoring"
        ],
        color: "#8b5cf6",
        bg: "rgba(139, 92, 246, 0.08)"
      }
  ];

  const processSteps = [
    { step: 1, title: "SEO Audit", desc: "Detailed technical & structural analysis of your current website." },
    { step: 2, title: "Competitor Analysis", desc: "Evaluate search market share and link profiles of rivals." },
    { step: 3, title: "Keyword Research", desc: "Identify high-value, commercial terms that drive revenue." },
    { step: 4, title: "Technical Fixes", desc: "Optimize Core Web Vitals, site architecture, and indexing issues." },
    { step: 5, title: "Content Strategy", desc: "Build topic clusters and optimize content matching user intent." },
    { step: 6, title: "On-Page SEO", desc: "Perfect meta elements, heading structures, and semantic tags." },
    { step: 7, title: "Link Building", desc: "Acquire high-quality editorial links via white-hat outreach." },
    { step: 8, title: "Monthly Reports", desc: "Detailed tracking, conversion audit, and continuous expansion." }
  ];

  const tools = [
    {
      name: "Google Analytics 4",
      desc: "Track user behavior, conversions, and campaign performance with precision.",
      bg: "rgba(66, 133, 244, 0.08)",
      icon: (
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
          <rect x="6" y="22" width="5" height="8" rx="2" fill="#f9ab00" />
          <rect x="15.5" y="14" width="5" height="16" rx="2" fill="#e37400" />
          <rect x="25" y="6" width="5" height="24" rx="2" fill="#f9ab00" />
        </svg>
      )
    },
    {
      name: "Google Search Console",
      desc: "Monitor indexing, search performance, and fix technical SEO issues.",
      bg: "rgba(66, 133, 244, 0.08)",
      icon: (
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
          <circle cx="15" cy="15" r="8" stroke="#4285f4" strokeWidth="2.5" fill="rgba(66,133,244,0.1)" />
          <line x1="21" y1="21" x2="30" y2="30" stroke="#4285f4" strokeWidth="2.5" strokeLinecap="round" />
          <rect x="12" y="11" width="7" height="2" rx="1" fill="#4285f4" />
          <rect x="12" y="15" width="5" height="2" rx="1" fill="#34a853" />
          <rect x="12" y="19" width="3" height="2" rx="1" fill="#ea4335" />
        </svg>
      )
    },
    {
      name: "Ahrefs",
      desc: "Powerful backlink analysis, keyword research, and competitor insights.",
      bg: "rgba(0, 82, 204, 0.06)",
      icon: (
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
          <circle cx="18" cy="18" r="12" stroke="#ff5722" strokeWidth="2.5" fill="rgba(255,107,0,0.06)" />
          <path d="M12 24 L18 10 L24 24" stroke="#ff5722" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="14" y1="20" x2="22" y2="20" stroke="#ff5722" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
    },
    {
      name: "SEMrush",
      desc: "Complete SEO toolkit for rank tracking, auditing, and competitor analysis.",
      bg: "rgba(255, 100, 45, 0.06)",
      icon: (
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
          <circle cx="18" cy="18" r="12" stroke="#ff642d" strokeWidth="2.5" fill="rgba(255,100,45,0.06)" />
          <path d="M12 22 Q15 14 18 18 Q21 22 24 12" stroke="#ff642d" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <circle cx="24" cy="12" r="2" fill="#ff642d" />
        </svg>
      )
    },
    {
      name: "Screaming Frog",
      desc: "Website crawler to analyze technical SEO and site architecture.",
      bg: "rgba(120, 190, 32, 0.08)",
      icon: (
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
          <path d="M10 20 Q10 28 18 28 Q26 28 26 20" stroke="#78be20" strokeWidth="2.5" fill="rgba(120,190,32,0.08)" strokeLinecap="round" />
          <circle cx="14" cy="14" r="3" fill="#78be20" />
          <circle cx="22" cy="14" r="3" fill="#78be20" />
          <circle cx="14" cy="14" r="1.2" fill="#fff" />
          <circle cx="22" cy="14" r="1.2" fill="#fff" />
          <path d="M8 12 L11 14" stroke="#78be20" strokeWidth="2" strokeLinecap="round" />
          <path d="M28 12 L25 14" stroke="#78be20" strokeWidth="2" strokeLinecap="round" />
          <path d="M15 22 Q18 24 21 22" stroke="#78be20" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        </svg>
      )
    },
    {
      name: "PageSpeed Insights",
      desc: "Analyze performance and improve Core Web Vitals for better rankings.",
      bg: "rgba(66, 133, 244, 0.08)",
      icon: (
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
          <path d="M6 22 A12 12 0 0 1 30 22" stroke="#4285f4" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M6 22 A12 12 0 0 1 18 10" stroke="#34a853" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M18 10 A12 12 0 0 1 26 14" stroke="#f9ab00" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M26 14 A12 12 0 0 1 30 22" stroke="#ea4335" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <line x1="18" y1="22" x2="24" y2="14" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
          <circle cx="18" cy="22" r="2.5" fill="#1e293b" />
        </svg>
      )
    },
    {
      name: "GTmetrix",
      desc: "Test site speed, performance, and get actionable optimization insights.",
      bg: "rgba(0, 71, 187, 0.06)",
      icon: (
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
          <rect x="6" y="8" width="24" height="18" rx="3" stroke="#0047bb" strokeWidth="2.5" fill="rgba(0,71,187,0.05)" />
          <text x="11" y="21" fontFamily="Inter, sans-serif" fontSize="11" fontWeight="900" fill="#0047bb">GT</text>
          <line x1="6" y1="26" x2="30" y2="26" stroke="#0047bb" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
    },
    {
      name: "Bing Webmaster",
      desc: "Improve visibility on Bing with site tools, reports, and SEO recommendations.",
      bg: "rgba(0, 128, 128, 0.06)",
      icon: (
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
          <path d="M10 6 L10 30 L22 24 L14 20 L14 14 L26 18 L22 24 L10 30" fill="none" stroke="#008080" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
          <path d="M10 6 L14 14" stroke="#00b294" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M14 14 L26 18" stroke="#008080" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      )
    },
    {
      name: "Google Tag Manager",
      desc: "Manage tags, events, and tracking without touching your website code.",
      bg: "rgba(36, 110, 237, 0.06)",
      icon: (
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
          <rect x="8" y="8" width="20" height="20" rx="2" transform="rotate(45 18 18)" stroke="#246eed" strokeWidth="2.5" fill="rgba(36,110,237,0.06)" />
          <circle cx="18" cy="18" r="3.5" fill="#246eed" />
          <circle cx="18" cy="18" r="1.5" fill="#fff" />
        </svg>
      )
    },
    {
      name: "Looker Studio",
      desc: "Create custom SEO dashboards and data reports that drive smarter decisions.",
      bg: "rgba(26, 115, 232, 0.06)",
      icon: (
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
          <circle cx="18" cy="18" r="12" stroke="#1a73e8" strokeWidth="2.5" fill="rgba(26,115,232,0.05)" />
          <circle cx="18" cy="18" r="5" stroke="#1a73e8" strokeWidth="2" fill="none" />
          <circle cx="18" cy="18" r="1.5" fill="#1a73e8" />
          <line x1="18" y1="6" x2="18" y2="10" stroke="#1a73e8" strokeWidth="2" strokeLinecap="round" />
          <line x1="18" y1="26" x2="18" y2="30" stroke="#1a73e8" strokeWidth="2" strokeLinecap="round" />
          <line x1="6" y1="18" x2="10" y2="18" stroke="#1a73e8" strokeWidth="2" strokeLinecap="round" />
          <line x1="26" y1="18" x2="30" y2="18" stroke="#1a73e8" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
    },
    {
      name: "Surfer SEO",
      desc: "Optimize content with data-driven recommendations for higher rankings.",
      bg: "rgba(227, 49, 94, 0.06)",
      icon: (
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
          <rect x="7" y="8" width="22" height="20" rx="3" stroke="#e3315e" strokeWidth="2.5" fill="rgba(227,49,94,0.05)" />
          <path d="M12 20 Q15 14 18 17 Q21 20 24 14" stroke="#e3315e" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          <line x1="11" y1="24" x2="25" y2="24" stroke="#e3315e" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )
    },
    {
      name: "AI SEO Tools",
      desc: "Leverage AI for content optimization, clustering, and SERP insights.",
      bg: "rgba(124, 58, 237, 0.06)",
      icon: (
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
          <circle cx="18" cy="16" r="7" stroke="#7c3aed" strokeWidth="2.5" fill="rgba(124,58,237,0.06)" />
          <circle cx="15" cy="14" r="1.3" fill="#7c3aed" />
          <circle cx="21" cy="14" r="1.3" fill="#7c3aed" />
          <path d="M14.5 18 Q18 21 21.5 18" stroke="#7c3aed" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <path d="M12 24 Q18 28 24 24" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" fill="none" />
          <line x1="18" y1="9" x2="18" y2="6" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" />
          <line x1="12" y1="10" x2="10" y2="7" stroke="#7c3aed" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="24" y1="10" x2="26" y2="7" stroke="#7c3aed" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )
    }
  ];

  const industries = [
    { name: "Healthcare", icon: "🏥" },
    { name: "Real Estate", icon: "🏢" },
    { name: "E-Commerce", icon: "🛒" },
    { name: "Education", icon: "🎓" },
    { name: "Finance", icon: "💰" },
    { name: "Technology", icon: "💻" },
    { name: "SaaS", icon: "☁️" },
    { name: "Restaurants", icon: "🍔" },
    { name: "Manufacturing", icon: "🏭" },
    { name: "Legal", icon: "⚖️" },
    { name: "Travel", icon: "✈️" },
    { name: "Construction", icon: "🏗️" }
  ];

  const whyChooseUs = [
    { title: "100% White Hat SEO", desc: "No spam, no risky PBNs. We use safe, long-term techniques approved by Google Webmaster Guidelines." },
    { title: "Experienced SEO Experts", desc: "Your campaign is handled by certified SEO strategists with 7+ years of search marketing experience." },
    { title: "AI-Powered Strategies", desc: "We combine deep human analytics with machine learning tools to cluster terms and analyze content gaps faster." },
    { title: "Transparent Reporting", desc: "Detailed monthly reports via Looker Studio. Monitor your traffic, keyword rankings, and leads in real time." },
    { title: "Data-Driven Decisions", desc: "We audit analytics to discover exactly which organic pages convert, and direct optimization to drive maximum profit." },
    { title: "ROI & Revenue Focused", desc: "We track actual conversion value and leads generated rather than just bragging about ranking improvements." },
    { title: "Custom SEO Plans", desc: "We design bespoke optimization blueprints tailored to your sector, local competition, and commercial targets." },
    { title: "Dedicated Account Manager", desc: "Get direct phone and WhatsApp access to a primary contact who coordinates content, links, and speed audits." }
  ];

  const caseStudies = [
    {
      client: "Urban Living Homes",
      industry: "Real Estate",
      challenges: "High ad spend on portals, low brand visibility, thin local landing pages, slow site loading speeds.",
      strategy: "Optimized Google Business Profile, created location landing pages, resolved index crawl errors, built local citations.",
      results: [
        { val: "+340%", lbl: "Organic Traffic" },
        { val: "Top 3", lbl: "24 Local Keywords" },
        { val: "220+", lbl: "Monthly Direct Calls" }
      ]
    },
    {
      client: "Trendy Closet Store",
      industry: "E-Commerce",
      challenges: "Frequent Shopify structure duplicate issues, product pages not indexing, missing schema, poor mobile scores.",
      strategy: "Implemented product & review schema, optimized product image sizes, solved collection pagination, executed PR link building.",
      results: [
        { val: "+410%", lbl: "Organic Revenue" },
        { val: "1,400+", lbl: "First Page Keywords" },
        { val: "4.2x", lbl: "SEO ROI" }
      ]
    },
    {
      client: "Dr. Reddy's Ortho Clinic",
      industry: "Healthcare",
      challenges: "Intense local doctor competition, poor ranking on maps, reviews not translating to bookings.",
      strategy: "Local schema tags injection, local citation optimization, customized orthopedic content topic clusters, citation audit.",
      results: [
        { val: "+280%", lbl: "Appt Bookings" },
        { val: "Rank #1", lbl: "Ortho Clinic Near Me" },
        { val: "+310%", lbl: "Maps Impressions" }
      ]
    }
  ];

  const beforeAfterData = {
    ecommerce: {
      client: "Trendy Closet Store (E-Commerce)",
      before: [
        { label: "Organic Monthly Traffic", val: "4,200 visits" },
        { label: "Keywords in Top 10", val: "86 keywords" },
        { label: "Domain Authority (DA)", val: "14" },
        { label: "Monthly Web Orders", val: "38 orders" },
        { label: "Google PageSpeed Mobile", val: "41 / 100" }
      ],
      after: [
        { label: "Organic Monthly Traffic", val: "28,500 visits" },
        { label: "Keywords in Top 10", val: "1,140 keywords" },
        { label: "Domain Authority (DA)", val: "32" },
        { label: "Monthly Web Orders", val: "280 orders" },
        { label: "Google PageSpeed Mobile", val: "92 / 100" }
      ]
    },
    local: {
      client: "Dr. Reddy's Ortho Clinic (Local)",
      before: [
        { label: "Google Maps Monthly Views", val: "1,200 views" },
        { label: "Phone Clicks from Search", val: "14 calls" },
        { label: "Website Audit Score", val: "58%" },
        { label: "Ortho Keywords on Page 1", val: "1 keyword" },
        { label: "Monthly Appointment Leads", val: "9 leads" }
      ],
      after: [
        { label: "Google Maps Monthly Views", val: "6,800 views" },
        { label: "Phone Clicks from Search", val: "128 calls" },
        { label: "Website Audit Score", val: "96%" },
        { label: "Ortho Keywords on Page 1", val: "18 keywords" },
        { label: "Monthly Appointment Leads", val: "54 leads" }
      ]
    }
  };

  const faqs = [
    {
      q: "What is SEO and how does it work?",
      a: "SEO stands for Search Engine Optimization. It involves making adjustments to your website's coding, structure, content, and external link profile to align with search engine ranking algorithms. When search engine bots crawl your site, they index it and calculate its relevance and authority for specific searches, determining your position on results pages."
    },
    {
      q: "How long does it take to see results from SEO services?",
      a: "SEO is a progressive process. While basic technical errors and indexing issues can show improvements in rankings within 2 to 4 weeks, significant traffic jumps and page-one rankings for high-competition keywords usually take 3 to 6 months of systematic optimization."
    },
    {
      q: "Is SEO better than Google PPC Ads?",
      a: "They serve different purposes. Google Ads delivers traffic instantly but stops the moment you stop paying. SEO builds a sustainable, compounding asset that generates traffic 24/7 without paying Google for every single click. A combined strategy is usually the best approach: Google Ads for immediate cash flow and SEO for long-term compounding growth."
    },
    {
      q: "How much do your monthly SEO services cost?",
      a: "We offer custom packages based on your website's size, keyword difficulty, and industry competitiveness. Our local SEO packages are highly affordable for small businesses, while our enterprise and e-commerce campaigns are customized to fit larger budgets. Contact us for a customized roadmap and price quote."
    },
    {
      q: "Do you guarantee number 1 rankings on Google?",
      a: "No professional, white-hat agency can guarantee number 1 rankings because Google changes its ranking algorithm hundreds of times a year, and competitors are also continuously optimizing. We do guarantee white-hat, best-practice methodologies, and transparent reporting that regularly achieves measurable growth for our clients."
    },
    {
      q: "What industries do you work with?",
      a: "We have successfully executed campaigns across dozens of industries. Our primary specialties include Healthcare (clinics, hospitals), Real Estate, E-Commerce stores, Education providers, Financial services, Tech startups, SaaS, Local services, and Manufacturing brands."
    },
    {
      q: "How do you measure the success of an SEO campaign?",
      a: "We measure success by tracking actual business metrics: organic traffic increases, keyword ranking improvements (especially keywords with commercial search intent), Google Business Profile calls, direct form conversions, and e-commerce transactions. All of these metrics are available in your custom monthly Looker Studio report."
    },
    {
      q: "Do you provide Local SEO services?",
      a: "Yes! Our Local SEO services focus on dominating Google Maps and local search results. We manage and optimize your Google Business Profile, build local citations, manage reviews, optimize NAP consistency, and create local content that brings customers in your geographic area straight to your doorstep."
    },
    {
      q: "Do you optimize Shopify and e-commerce websites?",
      a: "Absolutely. E-Commerce websites require specialized SEO because of complex site architectures, product variations, duplicate collection pages, and review schema needs. We have extensive experience optimizing Shopify, WooCommerce, Magento, and custom node/next.js stores."
    },
    {
      q: "What SEO tools do you use for auditing and tracking?",
      a: "We use premium industry-standard software: Ahrefs and SEMrush for keyword research and backlink tracking, Screaming Frog for deep technical crawl audits, Google Search Console & Analytics 4 for first-party tracking, GTmetrix & PageSpeed Insights for core web vitals, and Looker Studio for monthly reporting."
    }
  ];

  return (
    <div className="seo-page-container">
      <Header />

      {/* ── 1. HERO SECTION ── */}
      <section className="seo-hero-section">
        <div className="seo-wrap">
          <div className="seo-hero-grid">
            <div className="seo-hero-content reveal-element">
              <div className="seo-hero-pill">
                <span className="seo-hero-pill-orange"><span style={{ marginRight: "4px" }}>🚀</span> #1 SEO COMPANY FOR BUSINESSES</span>
              </div>
              <h1>
                Rank Higher. <br />
                Drive More Traffic. <br />
                <span className="gradient-text">Grow Your Business.</span>
              </h1>
              <p>
                Our data-driven SEO strategies help businesses improve search rankings, increase organic traffic, and generate sustainable long-term growth. Digital Marketing TenX provides performance-focused SEO services in Hyderabad, helping businesses build stronger online visibility and attract more qualified customers.
              </p>

            <div className="seo-hero-ctas">
                <button className="seo-btn seo-btn-primary" onClick={scrollToForm}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: "4px" }}>
                    <line x1="18" y1="20" x2="18" y2="10" />
                    <line x1="12" y1="20" x2="12" y2="4" />
                    <line x1="6" y1="20" x2="6" y2="14" />
                  </svg>
                  Get Free SEO Audit <span style={{ marginLeft: "4px", fontSize: "16px", fontWeight: "bold" }}>→</span>
                </button>
                <button className="seo-btn seo-btn-outline" onClick={triggerConsultationModal}>
                  <IconCalendar />
                  Book SEO Consultation
                </button>
              </div>

            <div className="seo-hero-badges-container">
              {trustBadgesList.map((badge, idx) => (
                <div key={idx} className="seo-trust-badge">
                  <div className="seo-badge-icon-box">{badge.icon}</div>
                  <div className="seo-trust-badge-text">
                    <strong>{badge.text.split(" ")[0]}</strong>
                    <span>{badge.text.split(" ").slice(1).join(" ")}</span>
                  </div>
                </div>
              ))}
            </div>
            </div>
            {/* Hero Image */}
            <div className="seo-hero-visual-container reveal-element delay-200 hero-right">
              <div style={{ position: "relative", width: "100%", filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.12))", display: "flex", justifyContent: "flex-end" }}>
                <Image 
                  src="/seo-hero.webp" 
                  alt="SEO Dashboard Illustration" 
                  width={800} 
                  height={500} 
                  className="hero-image"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      

      {/* ── 4. WHY SEO MATTERS ── */}
      <section className="seo-section seo-section-light">
        <div className="seo-wrap">
          <div className="seo-sec-header reveal-element">
            <span className="eyebrow">📈 Organic Benefits</span>
            <h2>Why SEO Matters for Your Business</h2>
            <p>
              Organic search engine optimization provides sustainable, long-term ROI and complements paid marketing channels by building lasting online visibility and business growth. Here is why investing in SEO is a game-changer.
            </p>
          </div>

          <div className="seo-why-grid">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="seo-why-card reveal-element">
                <div className="seo-why-icon-wrap" style={{ backgroundColor: benefit.bg }}>
                  {benefit.icon}
                </div>
                <h3>{benefit.title}</h3>
                <p>{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. OUR SEO SERVICES ── */}
      <section className="seo-section seo-section-white">
        <div className="seo-wrap">
          <div className="seo-sec-header reveal-element">
            <span className="eyebrow">🛠️ What We Do</span>
            <h2>Our Comprehensive SEO Services</h2>
            <p>
              We execute high-impact strategies across all facets of search engine optimization to drive search presence, click-through-rates, and sales.
            </p>
          </div>

          <div className="seo-services-grid">
            {services.map((service, idx) => (
              <div key={idx} className="seo-service-card reveal-element">
                <div 
                  className="seo-svc-icon-box" 
                  style={{ backgroundColor: service.bg, color: service.color }}
                >
                  🚀
                </div>
                <h3>{service.title}</h3>
                <ul className="seo-svc-bullets">
                  {service.bullets.map((bullet, bIdx) => (
                    <li key={bIdx}>
                      <IconCheck size={14} color={service.color} />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

                  </div>
      </section>

      {/* ── 6. OUR SEO PROCESS ── */}
      <section className="seo-section seo-section-light">
        <div className="seo-wrap">
          <div className="seo-sec-header reveal-element">
            <span className="eyebrow">🗺️ Growth Roadmap</span>
            <h2>Our 8-Step Optimization Process</h2>
            <p>
              We don't guess. We follow a systematic, data-driven roadmap to identify technical issues, optimize content, and build sustainable search visibility. 
            </p>
          </div>

          <div className="seo-roadmap-container">
            <div className="seo-roadmap-line"></div>
            <div className="seo-roadmap-grid">
              {processSteps.map((step, idx) => (
                <div key={idx} className="seo-step-card reveal-element">
                  <div className="seo-step-num">{step.step}</div>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. SEO TOOLS WE USE ── */}
      <section className="seo-section seo-section-light">
        <div className="seo-wrap">
          <div className="seo-sec-header reveal-element">
            <span className="eyebrow">⚙️ Technology Stack</span>
            <h2>Professional SEO Tools We Use</h2>
            <p>
              We leverage industry-leading SEO, analytics, keyword research, technical audit, and performance monitoring tools to deliver measurable rankings, traffic growth, and long-term business success.
            </p>
          </div>

          <div className="seo-tools-grid">
            {tools.map((tool, idx) => (
              <div key={idx} className="seo-tool-card reveal-element">
                <div className="seo-tool-logo" style={{ backgroundColor: "var(--seo-light-bg)" }}>
                  {tool.icon}
                </div>
                <span className="seo-tool-name">{tool.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. WHY CHOOSE DIGITAL MARKETING TENX ── */}
      <section className="seo-section seo-section-light">
        <div className="seo-wrap">
          <div className="seo-sec-header reveal-element">
            <span className="eyebrow">💎 Our Edge</span>
            <h2>Why Choose Digital Marketing TenX</h2>
            <p>
              We are not just another SEO agency. We are a results-focused performance marketing partner focused on organic search revenue.
            </p>
          </div>

          <div className="why-choose-grid">
            {whyChooseUs.map((usp, idx) => (
              <div key={idx} className="why-card reveal-element">
                <div className="seo-why-icon-wrap" style={{ backgroundColor: "rgba(16, 185, 129, 0.08)", color: "var(--seo-success)" }}>
                  <IconCheck size={20} />
                </div>
                <h3>{usp.title}</h3>
                <p>{usp.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>





      {/* ── SERVICE AREAS ── */}
      <section className="seo-section seo-section-light">
        <div className="seo-wrap">
          <div className="seo-sec-header reveal-element">
            <span className="eyebrow">📍 SERVICE AREAS</span>
            <h2>Serving Businesses Across Andhra Pradesh & Telangana</h2>
            <p>
              We help businesses across Andhra Pradesh and Telangana grow with expert SEO services, Google Ads, web design, local SEO, and performance-driven digital marketing solutions.
            </p>
          </div>
          <div className="seo-locations-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            <div className="why-card reveal-element" style={{ alignItems: 'flex-start', padding: '24px', minHeight: 'auto', textAlign: 'left' }}>
              <h3 style={{ marginTop: '0', fontSize: '18px', color: 'var(--seo-dark)' }}>Hyderabad & Telangana</h3>
              <ul style={{ paddingLeft: '20px', color: 'var(--seo-muted)', fontSize: '15px', lineHeight: '1.8', margin: 0, listStyle: 'disc' }}>
                <li>SEO Services in Hyderabad</li>
                <li>Google Ads Management</li>
                <li>Local SEO</li>
                <li>Web Design</li>
                <li>Social Media Marketing</li>
              </ul>
            </div>
            <div className="why-card reveal-element delay-100" style={{ alignItems: 'flex-start', padding: '24px', minHeight: 'auto', textAlign: 'left' }}>
              <h3 style={{ marginTop: '0', fontSize: '18px', color: 'var(--seo-dark)' }}>Visakhapatnam & North Andhra</h3>
              <ul style={{ paddingLeft: '20px', color: 'var(--seo-muted)', fontSize: '15px', lineHeight: '1.8', margin: 0, listStyle: 'disc' }}>
                <li>SEO Services in Visakhapatnam</li>
                <li>Local SEO</li>
                <li>E-commerce SEO</li>
                <li>Digital Marketing</li>
                <li>Business Growth</li>
              </ul>
            </div>
            <div className="why-card reveal-element delay-200" style={{ alignItems: 'flex-start', padding: '24px', minHeight: 'auto', textAlign: 'left' }}>
              <h3 style={{ marginTop: '0', fontSize: '18px', color: 'var(--seo-dark)' }}>Vijayawada & Central Andhra</h3>
              <ul style={{ paddingLeft: '20px', color: 'var(--seo-muted)', fontSize: '15px', lineHeight: '1.8', margin: 0, listStyle: 'disc' }}>
                <li>SEO Services in Vijayawada</li>
                <li>Lead Generation</li>
                <li>PPC Campaigns</li>
                <li>Web Design</li>
                <li>Local Business Marketing</li>
              </ul>
            </div>
            <div className="why-card reveal-element" style={{ alignItems: 'flex-start', padding: '24px', minHeight: 'auto', textAlign: 'left' }}>
              <h3 style={{ marginTop: '0', fontSize: '18px', color: 'var(--seo-dark)' }}>Rayalaseema Region</h3>
              <ul style={{ paddingLeft: '20px', color: 'var(--seo-muted)', fontSize: '15px', lineHeight: '1.8', margin: 0, listStyle: 'disc' }}>
                <li>SEO Services in Nandyal</li>
                <li>Kurnool</li>
                <li>Kadapa</li>
                <li>Anantapur</li>
                <li>Tirupati</li>
              </ul>
            </div>
            <div className="why-card reveal-element delay-100" style={{ alignItems: 'flex-start', padding: '24px', minHeight: 'auto', textAlign: 'left' }}>
              <h3 style={{ marginTop: '0', fontSize: '18px', color: 'var(--seo-dark)' }}>Growing Business Locations</h3>
              <ul style={{ paddingLeft: '20px', color: 'var(--seo-muted)', fontSize: '15px', lineHeight: '1.8', margin: 0, listStyle: 'disc' }}>
                <li>Kakinada</li>
                <li>Nellore</li>
                <li>Guntur</li>
                <li>Rajahmundry</li>
                <li>Warangal</li>
              </ul>
            </div>
            <div className="why-card reveal-element delay-200" style={{ alignItems: 'flex-start', padding: '24px', minHeight: 'auto', textAlign: 'left' }}>
              <h3 style={{ marginTop: '0', fontSize: '18px', color: 'var(--seo-dark)' }}>Industries We Support</h3>
              <ul style={{ paddingLeft: '20px', color: 'var(--seo-muted)', fontSize: '15px', lineHeight: '1.8', margin: 0, listStyle: 'disc' }}>
                <li>Healthcare</li>
                <li>Real Estate</li>
                <li>Education</li>
                <li>E-commerce</li>
                <li>Local Businesses</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── 14. FREQUENTLY ASKED QUESTIONS ── */}
      <section className="seo-section seo-section-white">
        <div className="seo-wrap">
          <div className="seo-sec-header reveal-element">
            <span className="eyebrow">❓ Got Questions?</span>
            <h2>Frequently Asked Questions About SEO Services</h2>
            <p>
              Find answers to common questions about our SEO services, pricing, timelines, reporting, and how we help businesses improve Google rankings and organic traffic.
            </p>
          </div>

          <div className="seo-faq-accordion reveal-element" style={{ maxWidth: "820px", margin: "0 auto" }}>
            {faqs.map((faq, idx) => (
              <div key={idx} className={`seo-faq-item ${openFaq === idx ? "open" : ""}`}>
                <button className="seo-faq-question-btn" onClick={() => setOpenFaq(openFaq === idx ? null : idx)}>
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

      {/* ── 15. LEAD GENERATION SECTION ── */}
      <section className="seo-lead-section" id="seo-audit-form-section">
        <div className="seo-wrap">
          <div className="seo-lead-grid">
            {/* Left Column Information */}
            <div className="seo-lead-info reveal-element">
              <h2>Ready to Rank Higher on Google?</h2>
              <p>
                Get a free SEO audit from our experts. We'll analyze your website, identify technical issues, keyword opportunities, and provide a customized SEO growth strategy.
              </p>
              
              <div className="seo-lead-points">
                <div className="seo-lead-point">
                  <span className="seo-lp-icon">📋</span>
                  <div>
                    <h4>100% Free SEO Audit Report</h4>
                    <p>Receive a detailed report with technical issues and improvement recommendations.</p>
                  </div>
                </div>

                <div className="seo-lead-point">
                  <span className="seo-lp-icon">🎯</span>
                  <div>
                    <h4>Keyword Opportunity Analysis</h4>
                    <p>Discover high-value keywords your business can rank for.</p>
                  </div>
                </div>

                <div className="seo-lead-point">
                  <span className="seo-lp-icon">⚡</span>
                  <div>
                    <h4>Technical SEO Review</h4>
                    <p>Identify crawl errors, Core Web Vitals issues, and indexing problems.</p>
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", gap: "12px" }}>
                <button className="seo-btn seo-btn-primary" onClick={scrollToForm}>
                  Get Free SEO Audit
                </button>
                <button className="seo-btn seo-btn-outline" onClick={triggerConsultationModal}>
                  Book SEO Consultation
                </button>
              </div>
            </div>

            {/* Right Column Form */}
            <div className="seo-lead-card reveal-element delay-100">
              <h3 style={{ fontSize: "18px", fontWeight: "800", marginBottom: "20px", color: "var(--seo-dark)" }}>
                Get Your Free SEO Audit
              </h3>
              
              <form className="seo-form" onSubmit={handleFormSubmit}>
                <div className="seo-form-row">
                  <div className={`seo-form-group ${formErrors.name ? "has-error" : ""}`}>
                    <label htmlFor="form-name">Full Name *</label>
                    <input 
                      id="form-name"
                      type="text" 
                      name="name" 
                      value={formData.name} 
                      onChange={handleInputChange} 
                      placeholder="John Doe"
                    />
                    {formErrors.name && <span className="seo-error-txt">{formErrors.name}</span>}
                  </div>

                  <div className={`seo-form-group ${formErrors.email ? "has-error" : ""}`}>
                    <label htmlFor="form-email">Email Address *</label>
                    <input 
                      id="form-email"
                      type="email" 
                      name="email" 
                      value={formData.email} 
                      onChange={handleInputChange} 
                      placeholder="john@company.com"
                    />
                    {formErrors.email && <span className="seo-error-txt">{formErrors.email}</span>}
                  </div>
                </div>

                <div className="seo-form-row">
                  <div className={`seo-form-group ${formErrors.phone ? "has-error" : ""}`}>
                    <label htmlFor="form-phone">Phone Number *</label>
                    <input 
                      id="form-phone"
                      type="tel" 
                      name="phone" 
                      value={formData.phone} 
                      onChange={handleInputChange} 
                      placeholder="e.g. +91 98765 43210"
                    />
                    {formErrors.phone && <span className="seo-error-txt">{formErrors.phone}</span>}
                  </div>

                  <div className={`seo-form-group ${formErrors.website ? "has-error" : ""}`}>
                    <label htmlFor="form-website">Website URL *</label>
                    <input 
                      id="form-website"
                      type="text" 
                      name="website" 
                      value={formData.website} 
                      onChange={handleInputChange} 
                      placeholder="www.yourcompany.com"
                    />
                    {formErrors.website && <span className="seo-error-txt">{formErrors.website}</span>}
                  </div>
                </div>

                <div className="seo-form-row">
                  <div className="seo-form-group">
                    <label htmlFor="form-biz-type">Business Type</label>
                    <select 
                      id="form-biz-type"
                      name="businessType" 
                      value={formData.businessType} 
                      onChange={handleInputChange}
                    >
                      <option value="e-commerce">E-Commerce Store</option>
                      <option value="healthcare">Healthcare Clinic</option>
                      <option value="real-estate">Real Estate Brand</option>
                      <option value="saas">SaaS / Technology</option>
                      <option value="education">Education Provider</option>
                      <option value="local-services">Local Services Business</option>
                      <option value="other">Other Business Type</option>
                    </select>
                  </div>

                  <div className="seo-form-group">
                    <label htmlFor="form-budget">Monthly Marketing Budget</label>
                    <select 
                      id="form-budget"
                      name="budget" 
                      value={formData.budget} 
                      onChange={handleInputChange}
                    >
                      <option value="₹15k-₹25k">₹15,000 - ₹25,000 /mo</option>
                      <option value="₹25k-₹50k">₹25,000 - ₹50,000 /mo</option>
                      <option value="₹50k-₹1L">₹50,000 - ₹1,00,000 /mo</option>
                      <option value="₹1L+">₹1,00,000+ /mo</option>
                    </select>
                  </div>
                </div>

                <div className="seo-form-group">
                  <label htmlFor="form-message">Message / Specific SEO Goals</label>
                  <textarea 
                    id="form-message"
                    name="message" 
                    value={formData.message} 
                    onChange={handleInputChange} 
                    rows="3" 
                    placeholder="Tell us about your organic search goals or specific crawl errors..."
                  />
                </div>

                <button 
                  type="submit" 
                  className="seo-btn seo-btn-primary" 
                  disabled={isSubmitting}
                  style={{ width: "100%", marginTop: "10px" }}
                >
                  {isSubmitting ? "Processing Audit Details..." : "🚀 Get Free SEO Audit Report"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Success Popup Modal */}
      {formSubmitted && (
        <div className="seo-success-overlay">
          <div className="seo-success-modal">
            <div style={{ fontSize: "50px", color: "var(--seo-success)" }}>✅</div>
            <h3>Free Audit Request Submitted!</h3>
            <p>
              Thank you for trusting Digital Marketing TenX. We have received your details for <strong>{formData.website}</strong>. Our SEO experts are crawling your pages right now and will prepare your report within 24 hours.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <button 
                className="seo-btn seo-btn-primary" 
                onClick={handleWhatsAppRedirect}
                style={{ width: "100%" }}
              >
                💬 Talk to SEO Team on WhatsApp
              </button>
              <button 
                className="seo-btn seo-btn-outline" 
                onClick={() => setFormSubmitted(false)}
                style={{ width: "100%" }}
              >
                Close Success Window
              </button>
            </div>
          </div>
        </div>
      )}

      <PricingTable 
        title="SEO Packages That Grow With Your Business"
        subtitle="Choose the right SEO plan to improve your Google rankings, increase organic traffic, and generate consistent leads."
        serviceName="SEO Services"
        serviceId="seo"
        packages={[
          { id: "basic", name: "Basic", price: "₹8,000", period: "/month" },
          { id: "growth", name: "Growth", price: "₹15,000", period: "/month", popular: true },
          { id: "premium", name: "Premium", price: "₹25,000+", period: "/month" }
        ]}
      />

      <CTA 
        title="Ready to Grow Your Organic Traffic?"
        description="Partner with Digital Marketing TenX and let our SEO experts improve your Google rankings, increase organic traffic, and generate qualified leads with data-driven SEO strategies."
        primaryText="Get Free SEO Audit"
        secondaryText="Book SEO Consultation"
        onPrimaryClick={scrollToForm}
        onSecondaryClick={triggerConsultationModal}
      />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
