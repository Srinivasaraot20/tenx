"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { openWhatsAppQuote } from "@/lib/whatsappQuote";
import PricingTable from "@/components/services/PricingTable";
import "./website-design.css";

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

export default function WebsiteDesignPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const toggleFaq = (idx) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  // Section 3: Subtypes data
  const subtypes = [
    {
      title: "Business Websites",
      icon: "🏢",
      desc: "Establish a strong, professional corporate presence that articulates your value proposition, services, and trust factors.",
      timeline: "2-3 Weeks",
      cta: "Get Custom Business Site"
    },
    {
      title: "Corporate Portals",
      icon: "🌐",
      desc: "Comprehensive enterprise portals designed with advanced navigation systems, multi-department layouts, and custom integrations.",
      timeline: "4-5 Weeks",
      cta: "Request Enterprise Portal"
    },
    {
      title: "Landing Pages",
      icon: "🎯",
      desc: "High-impact single-page micro-sites designed with a single marketing focus to capture quality leads or sell a specific product.",
      timeline: "1-2 Weeks",
      cta: "Build Custom Landing Page"
    },
    {
      title: "Portfolio Websites",
      icon: "🎨",
      desc: "Stunning visual showcases tailored for creators, architects, photographers, and agencies to present work in high resolution.",
      timeline: "2 Weeks",
      cta: "Design Creative Portfolio"
    },
    {
      title: "E-Commerce Stores",
      icon: "🛒",
      desc: "Conversion-optimized online shops featuring product filters, cart flows, secure checkout gateways, and management dashboards.",
      timeline: "4 Weeks",
      cta: "Launch E-Commerce Store"
    },
    {
      title: "SaaS Product Sites",
      icon: "⚡",
      desc: "Premium, modern marketing sites for software products, featuring interactive pricing tables, product grids, and CTA funnels.",
      timeline: "3 Weeks",
      cta: "Deploy SaaS Landing Page"
    },
    {
      title: "Startup Pages",
      icon: "🚀",
      desc: "Fast, adaptable, and sleek website layouts that help newly funded startups validate product-market fit and capture emails.",
      timeline: "2 Weeks",
      cta: "Launch Startup Landing Page"
    },
    {
      title: "Custom Web Apps",
      icon: "🛠️",
      desc: "Dynamic, database-driven web platforms built to your custom logic using React, Node.js, and API system connections.",
      timeline: "6-8 Weeks",
      cta: "Scope Custom Web App"
    }
  ];

  // Section 4: What's Included (8 Deliverables)
  const deliverables = [
    {
      title: "Custom Figma UI/UX Design",
      icon: "🎨",
      desc: "We design completely bespoke website mockups in Figma, tailored to your brand identity, colors, and layout requirements, before writing any code."
    },
    {
      title: "Mobile Responsive Layouts",
      icon: "📱",
      desc: "Every layout is built from the ground up to render flawlessly on iPhones, Android devices, tablets, and wide desktop screens."
    },
    {
      title: "CMS Integration Options",
      icon: "⚙️",
      desc: "We integrate powerful, flexible platforms like WordPress, Webflow, or headless options (Sanity, Strapi) so you can update text and posts easily."
    },
    {
      title: "Core Web Vitals & Speed Audit",
      icon: "⚡",
      desc: "We employ deep code optimizations, image compressions, and server-side configurations to achieve sub-second load times."
    },
    {
      title: "Technical SEO Foundation",
      icon: "🔍",
      desc: "We set up proper metadata, schema markups, structured data, semantic HTML tags, and clean sitemaps so search engines index you fast."
    },
    {
      title: "Conversion-Focused Copywriting",
      icon: "✍️",
      desc: "Our copywriters draft engaging headlines, body text, and call-to-actions tailored to speak directly to your target buyer persona."
    },
    {
      title: "Analytics & Event Tracking",
      icon: "📊",
      desc: "We integrate Google Analytics 4, Tag Manager, Facebook Pixel, and Hotjar heatmaps to track every user click and conversion action."
    },
    {
      title: "SSL & Server Hardening",
      icon: "🛡️",
      desc: "We secure your domains, configure free SSL certificates, implement spam-protected forms, and harden server access layers."
    }
  ];

  // Section 5: Timeline Process Steps (6 steps)
  const processSteps = [
    {
      num: "01",
      title: "Discovery & Strategy",
      desc: "We understand your business goals, target audience, and competitors."
    },
    {
      num: "02",
      title: "UI/UX Wireframing",
      desc: "We create user-friendly layouts focused on engagement and conversions."
    },
    {
      num: "03",
      title: "Custom Design",
      desc: "Modern, responsive designs tailored to your brand identity."
    },
    {
      num: "04",
      title: "Development",
      desc: "Fast, secure, SEO-friendly development using the latest technologies."
    },
    {
      num: "05",
      title: "Testing & Optimization",
      desc: "Performance, mobile responsiveness, speed, and browser compatibility."
    },
    {
      num: "06",
      title: "Launch & Support",
      desc: "Website deployment with ongoing maintenance and improvements."
    }
  ];

  // Section 6: Feature Matrix / Checklist
  const featuresChecklist = [
    { text: "Core Web Vitals Passed", emoji: "⚡" },
    { text: "Schema & Metadata Ready", emoji: "🏷️" },
    { text: "HTTPS & SSL Secured", emoji: "🔒" },
    { text: "CDN Edge Cached", emoji: "🌐" },
    { text: "Clean Coding Architecture", emoji: "💻" },
    { text: "Accessible UI (WCAG)", emoji: "👁️" },
    { text: "Automated Backup Systems", emoji: "💾" },
    { text: "Scalable Server Deployments", emoji: "🚀" },
    { text: "Cross-Browser Compatible", emoji: "🖥️" },
    { text: "Spam-Protected Contacts", emoji: "🛡️" }
  ];

  // Section 7: Modern Web Technologies
  const techCategories = [
    {
      title: "CMS & ECOMMERCE",
      icon: "🛒",
      items: [
        { title: "WordPress", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/wordpress/wordpress-plain.svg", desc: "Flexible, SEO-friendly websites that are easy to manage." },
        { title: "WooCommerce", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/woocommerce/woocommerce-original.svg", desc: "Powerful eCommerce solutions for online stores that convert." },
        { title: "Shopify", logo: "https://cdn.worldvectorlogo.com/logos/shopify.svg", desc: "Scalable and secure eCommerce stores that drive sales." }
      ]
    },
    {
      title: "FRONTEND TECHNOLOGIES",
      icon: "🖥️",
      items: [
        { title: "HTML5", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg", desc: "Structured, clean and semantic code." },
        { title: "CSS3", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg", desc: "Modern styling for responsive designs." },
        { title: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg", desc: "Interactive features and dynamic user experiences." },
        { title: "React.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg", desc: "Build fast, interactive and high-performance user interfaces." },
        { title: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg", desc: "SEO-friendly, fast and optimized web applications." }
      ]
    },
    {
      title: "BACKEND DEVELOPMENT",
      icon: "⌨️",
      items: [
        { title: "PHP", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg", desc: "Robust and reliable development for custom web solutions." },
        { title: "Laravel", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg", desc: "Secure, scalable and high-performance PHP framework." },
        { title: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg", desc: "Build scalable and high-performance server-side applications." },
        { title: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg", desc: "Versatile programming language for modern web applications." },
        { title: "Django", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/django/django-plain.svg", desc: "High-level Python framework for rapid development." },
        { title: "Flask", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flask/flask-original.svg", desc: "Lightweight WSGI web application framework." }
      ]
    },
    {
      title: "DATABASE",
      icon: "🗄️",
      items: [
        { title: "MySQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original-wordmark.svg", desc: "Reliable and efficient database management for secure data storage and fast performance." },
        { title: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg", desc: "Advanced open-source relational database." },
        { title: "SQLite", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqlite/sqlite-original.svg", desc: "C-language library that implements a small, fast SQL database engine." }
      ]
    }
  ];

  // Section 8: Comparison Table Metrics (20 metrics)
  const comparisonTable = [
    { metric: "Page Load Speed", before: "3.5s - 5.2s (Slow)", after: "0.4s - 0.9s (Ultra Fast)" },
    { metric: "Mobile Optimization", before: "Broken layouts & tiny text", after: "Fluid, mobile-first responsiveness" },
    { metric: "Core Web Vitals Status", before: "Failed (Poor Cumulative Layout Shift)", after: "Passed (Perfect Core Web Vitals)" },
    { metric: "Bounce Rate", before: "58% - 72% (Visitors leave quickly)", after: "25% - 38% (High visitor engagement)" },
    { metric: "Conversion Rate", before: "0.8% - 1.5% (Low lead volume)", after: "3.8% - 6.2% (Double/Triple lead inflow)" },
    { metric: "SEO Metadata Setup", before: "Missing titles & image alt tags", after: "Fully-optimized structural index schema" },
    { metric: "Lead Quality", before: "High spam & unqualified submissions", after: "Clean, pre-qualified forms & leads" },
    { metric: "Google PageSpeed Score", before: "34 - 55 / 100", after: "95 - 100 / 100 (Perfect rating)" },
    { metric: "Custom Branding Style", before: "Generic template / Outdated look", after: "Premium glassmorphic modern design" },
    { metric: "Content Management (CMS)", before: "Requires developer for minor text edits", after: "Easy dashboard CMS to edit in seconds" },
    { metric: "Security Protection", before: "Vulnerable contact forms & outdated plugins", after: "SSL secured, anti-spam layers configured" },
    { metric: "Analytics tracking parameters", before: "Basic pageviews (GA4 misconfigured)", after: "Granular conversion event tracking" },
    { metric: "Tech Stack Scalability", before: "Monolithic, bloated template code", after: "Modular component React/Next.js architecture" },
    { metric: "Navigation Interface", before: "Confusing menu layout", after: "Intuitive UX menus & clear CTA flows" },
    { metric: "Layout Shift (CLS)", before: "Jumpy banners & moving columns", after: "Zero shift during asynchronous asset load" },
    { metric: "Accessibility compliance", before: "Contrast issues & no screen-reader support", after: "WCAG/ADA compliant structure" },
    { metric: "Server & Hosting reliability", before: "Frequent downtime (cheap shared hosting)", after: "99.99% uptime edge-cached servers" },
    { metric: "Image weight compressions", before: "Raw uncompressed PNGs & JPEGs", after: "Next-gen WebP & SVG vector assets" },
    { metric: "Pixel Tag tracking integrations", before: "Missing FB / LinkedIn API tracking", after: "Server-side Conversion API connected" },
    { metric: "Maintenance difficulty", before: "Constant plugins break website structure", after: "Robust code with low dependency overhead" }
  ];

  // Section 8: KPI Cards (6 cards)
  const kpis = [
    { emoji: "📈", title: "SEO Visibility", items: ["Up to +140% organic reach", "Top page keywords rank", "Rich schema listings"] },
    { emoji: "💰", title: "Conversions Boost", items: ["Averaging 3.8% to 6.2%", "Dynamic CTA triggers", "Lead forms optimized"] },
    { emoji: "🤖", title: "Lead Automation", items: ["Automated CRM syncs", "WhatsApp lead capture", "Email trigger sequences"] },
    { emoji: "🎨", title: "UX Excellence", items: ["0.1s input latency", "Heatmap tested flows", "Premium glassmorphism"] },
    { emoji: "⚡", title: "Web Performance", items: ["PageSpeed score > 95", "Next-gen image formats", "Global Edge CDN cache"] },
    { emoji: "🛠️", title: "Tech Architecture", items: ["Next.js SSR / SSG", "Zero code bloat", "Secure REST API routes"] }
  ];

  // Section 9: Portfolio Showcases
  const portfolioProjects = [
    {
      img: "/workspace_techlab.webp",
      tag: "SaaS / Product Design",
      title: "Zenith Flow SaaS Dashboard",
      stats: ["2.8 Weeks Delivery", "+180% Signups", "Next.js & Rest APIs"],
      techs: ["React", "Next.js", "Express.js", "PostgreSQL"]
    },
    {
      img: "/workspace_collab.webp",
      tag: "E-Commerce / Custom Shopify",
      title: "Aura Luxe Jewelry Shop",
      stats: ["4 Weeks Delivery", "+24% Avg Order Value", "Headless Checkout"],
      techs: ["Headless Shopify", "Tailwind CSS", "React", "Vercel"]
    },
    {
      img: "/workspace_boardroom.webp",
      tag: "Corporate / Brand Strategy",
      title: "Apex Global Consulting Portal",
      stats: ["3 Weeks Delivery", "-45% Bounce Rate", "Headless CMS Active"],
      techs: ["Next.js", "Sanity CMS", "Sass", "AWS Server"]
    }
  ];

  // Section 11: Testimonials
  const testimonials = [
    {
      text: "Working with Digital Marketing TenX completely transformed our online presence. Our page load speeds dropped from 4.8 seconds to under half a second, and our sales conversion rate doubled in the first 30 days. They are true masters of Next.js and high-performance layouts.",
      author: "Elena Rostova",
      role: "Marketing Director at Zenflow SaaS",
      stars: 5
    },
    {
      text: "We needed a website design that looked premium and established our authority in enterprise consulting. They built a custom portal with a seamless Headless CMS that our marketing team can update in seconds. High-performing, fast, and gorgeous.",
      author: "Vikram Malhotra",
      role: "Managing Director at Apex Global",
      stars: 5
    },
    {
      text: "Our e-commerce store load speed was hurting our sales. TenX's redesign and conversion optimization increased our average order value by 24% and built a seamless checkout experience. Highly recommend their website design service!",
      author: "Jessica Mercer",
      role: "Founder of Aura Luxe",
      stars: 5
    }
  ];

  // Section 13: FAQ data
  const faqs = [
    {
      q: "How much does a website design and development project cost in Hyderabad?",
      a: "The cost depends on your business requirements, website size, features, and functionality. At Digital Marketing TenX, we provide affordable and customized website design solutions with transparent pricing."
    },
    {
      q: "How long does it take to build a business website?",
      a: "Most business websites are completed within 2–6 weeks, depending on the project scope, number of pages, and custom features required."
    },
    {
      q: "Will my website be SEO-friendly and mobile responsive?",
      a: "Yes. Every website we build is fully responsive, SEO-friendly, fast-loading, and optimized to perform well across desktops, tablets, and mobile devices."
    },
    {
      q: "Can you redesign my existing website?",
      a: "Absolutely. We redesign outdated websites into modern, high-performance websites with improved user experience, better speed, stronger SEO, and higher conversion potential."
    },
    {
      q: "Why choose Digital Marketing TenX as your Website Design and Development Company in Hyderabad?",
      a: "We combine creative design, modern development technologies, SEO best practices, and conversion-focused strategies to build websites that help businesses generate more leads, improve search rankings, and grow online."
    }
  ];

  return (
    <div className="web-design-page">
      <Header />

      <main>
        {/* SECTION 1: HERO */}
        <section className="w-hero-section">
          <div className="w-grid-bg"></div>
          <div className="w-glow w-glow-orange" style={{ top: "-10%", left: "-10%" }}></div>
          <div className="w-glow w-glow-purple" style={{ bottom: "5%", right: "-10%" }}></div>
          
          <div className="w-grid-content w-hero-grid">
            <div className="w-hero-content">
              <span className="badge-premium">WEBSITE DESIGN & DEVELOPMENT SERVICES</span>
              <h1>
                Website Design and Development Company in Hyderabad
              </h1>
              <p>
                At Digital Marketing TenX, we are a trusted Website Design and Development Company in Hyderabad delivering custom, responsive, SEO-friendly, and high-performance websites for startups, SMEs, and enterprises. From business websites and WordPress development to eCommerce stores and AI-powered web solutions, we build websites that attract visitors, generate qualified leads, and drive long-term business growth.
              </p>
              <div className="w-hero-buttons">
                <button className="btn-primary" onClick={() => window.open("https://wa.me/919392251739", "_blank")}>
                  Get Free Consultation
                </button>
                <Link href="/services" className="btn-primary" style={{background: "#ff5722", color: "#fff", border: "none"}}>
                  Explore Services
                </Link>
              </div>
            </div>

            {/* Right Side Visual Devices */}
            {/* Right Side Visual Image */}
            <div className="w-hero-visual-container" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Image src="/website-hero.webp" alt="Website Design Hero" width={800} height={500} style={{ width: "100%", height: "auto", borderRadius: "16px", boxShadow: "0 20px 40px rgba(0,0,0,0.15)", display: "block" }} />
            </div>
          </div>
        </section>

        {/* SECTION 1.5: HERO FEATURES BOTTOM BAR */}
        <section className="w-hero-bottom-bar-section">
          <div className="w-grid-content">
            <div className="w-hero-bottom-bar">
              <div className="w-bar-item">
                <div className="w-bar-icon rocket">🚀</div>
                <div className="w-bar-info">
                  <h4>SEO Optimized</h4>
                  <p>Built for higher rankings and better visibility</p>
                </div>
              </div>
              <div className="w-bar-item">
                <div className="w-bar-icon phone">📱</div>
                <div className="w-bar-info">
                  <h4>Fully Responsive</h4>
                  <p>Perfect experience on every device</p>
                </div>
              </div>
              <div className="w-bar-item">
                <div className="w-bar-icon bolt">⚡</div>
                <div className="w-bar-info">
                  <h4>Lightning Fast</h4>
                  <p>Optimized for speed and performance</p>
                </div>
              </div>
              <div className="w-bar-item">
                <div className="w-bar-icon target">🎯</div>
                <div className="w-bar-info">
                  <h4>Conversion Focused</h4>
                  <p>Designed to turn visitors into customers</p>
                </div>
              </div>
              <div className="w-bar-item">
                <div className="w-bar-icon shield">🛡️</div>
                <div className="w-bar-info">
                  <h4>Secure & Reliable</h4>
                  <p>Advanced security for complete peace of mind</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: TIMELINE PROCESS (Moved Below Hero) */}
        <section className="w-section w-section-white">
          <div className="w-grid-content">
            <div className="w-title-centered">
              <span className="eyebrow">Our Website Design Process</span>
              <h2>Our Website Design & Development Process</h2>
              <p>
                From strategy to launch, we follow a proven process to create websites that are visually stunning, technically strong, and built to generate business results.
              </p>
            </div>

            <div className="w-process-cards-grid">
              {processSteps.map((step, idx) => (
                <div className="w-process-card" key={idx}>
                  <div className="w-process-badge">{step.num}</div>
                  <div className="w-process-card-content">
                    <h3>{step.title}</h3>
                    <p>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 2: WHY INVEST IN A PROFESSIONAL WEBSITE */}
        <section className="w-section" style={{ padding: "60px 0", background: "#fff" }}>
          <div className="w-grid-content">
            <div className="w-title-centered" style={{ maxWidth: "900px", margin: "0 auto" }}>
              <span className="eyebrow" style={{ marginBottom: "8px", display: "inline-block" }}>WHY INVEST IN A PROFESSIONAL WEBSITE</span>
              <h2 style={{ fontSize: "2.5rem", margin: "0 auto 16px", lineHeight: "1.2" }}>Why Your Business Needs a Professional Website</h2>
              <div style={{ textAlign: "center", color: "var(--w-text-muted)", fontSize: "1.1rem", lineHeight: "1.7", maxWidth: "850px", margin: "0 auto 24px" }}>
                <p>
                  Your website is your most valuable digital asset, helping build trust, strengthen your brand, and convert visitors into customers. At Digital Marketing TenX, we design and develop fast, SEO-friendly, mobile-responsive websites tailored to your business goals. Our custom solutions drive more leads, engagement, and long-term business growth.
                </p>
              </div>
            </div>

            <div className="w-title-centered" style={{ marginTop: "16px", marginBottom: "24px" }}>
              <h2 style={{ fontSize: "2rem" }}>Key Benefits</h2>
            </div>

            <div className="w-key-benefits-grid">
              <div className="w-benefit-card">
                <div className="w-benefit-icon" style={{ background: "rgba(37, 99, 235, 0.1)", color: "#2563eb" }}>🎯</div>
                <h3>Conversion-Focused Design</h3>
                <p>Every page is strategically designed to encourage visitors to take action, whether it's making an inquiry, booking a service, or completing a purchase.</p>
              </div>
              <div className="w-benefit-card">
                <div className="w-benefit-icon" style={{ background: "rgba(124, 58, 237, 0.1)", color: "#7c3aed" }}>📱</div>
                <h3>Mobile-First Experience</h3>
                <p>Your website will work seamlessly across smartphones, tablets, laptops, and desktops, ensuring an excellent user experience on every device.</p>
              </div>
              <div className="w-benefit-card">
                <div className="w-benefit-icon" style={{ background: "rgba(16, 185, 129, 0.1)", color: "#10b981" }}>🔍</div>
                <h3>SEO-Ready Structure</h3>
                <p>As an experienced Web Design Company in Hyderabad, we build websites with clean code, proper site architecture, schema markup, and SEO-friendly URLs.</p>
              </div>
              <div className="w-benefit-card">
                <div className="w-benefit-icon" style={{ background: "rgba(255, 107, 0, 0.1)", color: "#ff5722" }}>⚡</div>
                <h3>Lightning-Fast Performance</h3>
                <p>Fast-loading websites improve user experience, reduce bounce rates, and help achieve better rankings on Google.</p>
              </div>
              <div className="w-benefit-card">
                <div className="w-benefit-icon" style={{ background: "rgba(236, 72, 153, 0.1)", color: "#be185d" }}>🛡️</div>
                <h3>Secure & Reliable</h3>
                <p>We implement SSL certificates, security best practices, and reliable hosting recommendations to keep your website safe and secure.</p>
              </div>
              <div className="w-benefit-card">
                <div className="w-benefit-icon" style={{ background: "rgba(14, 165, 233, 0.1)", color: "#0ea5e9" }}>📝</div>
                <h3>Easy Content Management</h3>
                <p>Whether it's WordPress or a custom CMS, you can easily update content, images, blogs, and pages without technical knowledge.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: EVERYTHING YOUR BUSINESS WEBSITE NEEDS */}
        <section className="w-section w-section-white">
          <div className="w-grid-content">
            <div className="w-title-centered" style={{ maxWidth: "800px", margin: "0 auto" }}>
              <span className="eyebrow" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(124, 58, 237, 0.08)", color: "var(--w-accent-purple)", padding: "6px 16px", borderRadius: "30px", fontWeight: "700", fontSize: "0.85rem", letterSpacing: "1px", marginBottom: "20px" }}>
                ⭐ WEBSITE FEATURES
              </span>
              <h2 style={{ fontSize: "3rem", fontWeight: "900", color: "#0f172a", marginBottom: "24px", lineHeight: "1.2" }}>
                Everything Your Business<br />
                <span style={{ color: "#7c3aed" }}>Website</span> <span style={{ color: "#ff5722" }}>Needs</span>
              </h2>
              <p style={{ color: "#475569", fontSize: "1.1rem", lineHeight: "1.6", margin: "0 auto 40px" }}>
                Build a website that is fast, secure, SEO-ready, and designed to generate leads. Every website we develop includes essential features that improve user experience, search visibility, and business growth.
              </p>
            </div>

            {/* Sub-heading: DESIGN & USER EXPERIENCE */}
            <div className="w-feature-group-heading">
              <span className="line"></span>
              <span className="dot"></span>
              <h3>DESIGN & USER EXPERIENCE</h3>
              <span className="dot"></span>
              <span className="line"></span>
            </div>

            <div className="w-features-card-grid">
              <div className="w-f-card">
                <div className="w-f-icon-wrap" style={{ background: "rgba(255, 107, 0, 0.1)" }}>
                  <span style={{ fontSize: "40px" }}>🎨</span>
                </div>
                <h4>Custom Website Design</h4>
                <p>Unique designs created specifically for your business and brand identity.</p>
              </div>
              <div className="w-f-card">
                <div className="w-f-icon-wrap" style={{ background: "rgba(124, 58, 237, 0.1)" }}>
                  <span style={{ fontSize: "40px" }}>📱</span>
                </div>
                <h4>Responsive Web Design</h4>
                <p>Perfect user experience across desktop, tablet, and mobile devices.</p>
              </div>
              <div className="w-f-card">
                <div className="w-f-icon-wrap" style={{ background: "rgba(16, 185, 129, 0.1)" }}>
                  <span style={{ fontSize: "40px" }}>🎯</span>
                </div>
                <h4>Landing Page Design</h4>
                <p>High-converting landing pages built for campaigns and lead generation.</p>
              </div>
              <div className="w-f-card">
                <div className="w-f-icon-wrap" style={{ background: "rgba(37, 99, 235, 0.1)" }}>
                  <span style={{ fontSize: "40px" }}>🏢</span>
                </div>
                <h4>Corporate Business Websites</h4>
                <p>Professional websites designed to build trust and grow your business.</p>
              </div>
            </div>

            {/* Sub-heading: DEVELOPMENT & PERFORMANCE */}
            <div className="w-feature-group-heading" style={{ marginTop: "60px" }}>
              <span className="line orange"></span>
              <span className="dot orange"></span>
              <h3 style={{ color: "#ff5722" }}>DEVELOPMENT & PERFORMANCE</h3>
              <span className="dot orange"></span>
              <span className="line orange"></span>
            </div>

            <div className="w-features-card-grid">
              <div className="w-f-card">
                <div className="w-f-icon-wrap" style={{ background: "rgba(37, 99, 235, 0.1)" }}>
                  <span style={{ fontSize: "40px", color: "#2563eb", fontWeight: "900", fontFamily: "serif" }}>W</span>
                </div>
                <h4>WordPress Development</h4>
                <p>Easy-to-manage WordPress websites with powerful customization options.</p>
              </div>
              <div className="w-f-card">
                <div className="w-f-icon-wrap" style={{ background: "rgba(255, 107, 0, 0.1)" }}>
                  <span style={{ fontSize: "40px" }}>⚡</span>
                </div>
                <h4>Speed Optimization</h4>
                <p>Lightning-fast loading speeds for better user experience and SEO.</p>
              </div>
              <div className="w-f-card">
                <div className="w-f-icon-wrap" style={{ background: "rgba(16, 185, 129, 0.1)" }}>
                  <span style={{ fontSize: "40px" }}>🔒</span>
                </div>
                <h4>SSL Security Configuration</h4>
                <p>Protect customer data with secure HTTPS encryption.</p>
              </div>
              <div className="w-f-card">
                <div className="w-f-icon-wrap" style={{ background: "rgba(124, 58, 237, 0.1)" }}>
                  <span style={{ fontSize: "40px" }}>⚙️</span>
                </div>
                <h4>Easy Admin Dashboard</h4>
                <p>Manage content, images, blogs, and pages without technical knowledge.</p>
              </div>
            </div>

            {/* Bottom CTA Banner */}
            <div className="w-f-cta-banner">
              <div className="w-f-cta-left">
                <span className="w-f-cta-icon">🚀</span>
                <p><strong>Everything you need to build a powerful online presence</strong> and achieve your business goals.</p>
              </div>
              <div className="w-f-cta-right">
                <button className="btn-primary" onClick={() => window.open("https://wa.me/919392251739", "_blank")}>
                  Get Free Consultation →
                </button>
                <Link href="#portfolio" className="btn-outline">
                  View Our Portfolio →
                </Link>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 6: FEATURES CHECKLIST */}
        <section className="w-section w-section-light">
          <div className="w-grid-content">
            <div className="w-title-centered">
              <span className="eyebrow">Quality Benchmarks</span>
              <h2>Our Strict Quality Verification Parameters</h2>
              <p>
                Every project goes through a rigorous checklists to satisfy global standards of accessibility, code compliance, and loading velocity.
              </p>
            </div>

            <div className="w-features-checklist-grid">
              {featuresChecklist.map((feat, idx) => (
                <div className="w-feature-check-card" key={idx}>
                  <div className="w-feature-check-icon">{feat.emoji}</div>
                  <span>{feat.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 7: TECHNOLOGY STACK */}
        <section className="w-section w-section-white">
          <div className="w-grid-content">
            <div className="w-title-centered" style={{ maxWidth: "800px" }}>
              <span className="eyebrow">MODERN DEVELOPMENT STACK</span>
              <h2>Technologies We Use to Build Fast, Secure & SEO-Friendly Websites</h2>
              <p>
                At Digital Marketing TenX, we use modern, reliable, and industry-leading technologies to build secure, scalable, and high-performing websites. We choose the right technology stack based on your business goals to deliver the best results.
              </p>
            </div>

            <div className="w-tech-categories-grid">
              {techCategories.map((category, catIdx) => (
                <div className={`w-tech-category ${category.title === 'DATABASE' ? 'db-category' : ''}`} key={catIdx}>
                  <div className="w-tech-category-header">
                    <span className="w-tech-category-icon">{category.icon}</span>
                    <h4>{category.title}</h4>
                  </div>
                  <div className="w-tech-items-grid">
                    {category.items.map((tech, idx) => (
                      <div className="w-tech-logo-card" key={idx}>
                        <div className="w-tech-logo-wrapper">
                          <img src={tech.logo} alt={`${tech.title} logo`} width="60" height="60" />
                        </div>
                        <h3>{tech.title}</h3>
                        <p>{tech.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="w-tech-banner">
              <div className="w-tech-banner-icon">🚀</div>
              <div className="w-tech-banner-content">
                <h4>The Right Technology. The Right Solution. The Right Results.</h4>
                <p>We combine the best tools and frameworks to build websites that are fast, secure, SEO-friendly and built to grow your business.</p>
              </div>
              <button className="btn-primary" onClick={() => window.open("https://wa.me/919392251739", "_blank")}>
                Get Free Consultation →
              </button>
            </div>
          </div>
        </section>

        {/* SECTION 8: BEFORE VS AFTER BUSINESS IMPACT */}
        <section className="w-section w-section-light">
          <div className="w-grid-content">
            <div className="w-title-centered">
              <span className="eyebrow">Performance Metrics Comparison</span>
              <h2>Transforming Digital Metrics: Before vs After</h2>
              <p>
                See how replacing a standard template site with our custom Next.js layout structures improves all commercial acquisition indicators.
              </p>
            </div>

            <div className="w-before-after-grid">
              {/* 20-Point Table */}
              <div className="w-table-wrapper">
                <table className="w-comparison-table">
                  <thead>
                    <tr>
                      <th>Assessment Parameter</th>
                      <th className="before">Before Our Redesign</th>
                      <th className="after">After Custom Next.js Launch</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonTable.map((row, idx) => (
                      <tr key={idx}>
                        <td><strong>{idx + 1}. {row.metric}</strong></td>
                        <td className="before-val">{row.before}</td>
                        <td className="after-val">{row.after}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* KPI Impact Cards */}
              <div className="w-title-centered" style={{ marginTop: "40px", marginBottom: "32px" }}>
                <span className="eyebrow">Granular Value Additions</span>
                <h2>6 Primary Channels of Business Value</h2>
              </div>
              <div className="w-kpi-grid">
                {kpis.map((kpi, idx) => (
                  <div className="w-kpi-card w-glass-card" key={idx}>
                    <div className="w-kpi-emoji">{kpi.emoji}</div>
                    <h3>{kpi.title}</h3>
                    <ul>
                      {kpi.items.map((item, itemIdx) => (
                        <li key={itemIdx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 9: PORTFOLIO SHOWCASES */}
        <section className="w-section w-section-white" id="portfolio">
          <div className="w-grid-content">
            <div className="w-title-centered" style={{ maxWidth: "800px" }}>
              <span className="eyebrow">OUR CLIENT SUCCESS STORIES</span>
              <h2>Real Client Websites Delivering Measurable Business Growth</h2>
              <p>
                Explore websites we've designed and developed for real clients across multiple industries. As a trusted Website Design and Development Company in Hyderabad, we create responsive, SEO-friendly, and conversion-focused websites that help businesses strengthen their online presence, generate qualified leads, and achieve measurable growth.
              </p>
            </div>

            <div className="w-portfolio-grid">
              {portfolioProjects.map((proj, idx) => (
                <div className="w-project-card w-glass-card" key={idx}>
                  <div className="w-project-img-frame" style={{ position: "relative" }}>
                    <Image 
                      src={proj.img} 
                      alt={proj.title} 
                      fill
                      style={{ objectFit: "cover" }} 
                    />
                  </div>
                  <span className="w-project-tag">{proj.tag}</span>
                  <h3>{proj.title}</h3>
                  
                  <div className="w-project-stats-row">
                    {proj.stats.map((stat, statIdx) => (
                      <span className="w-proj-stat" key={statIdx}>{stat}</span>
                    ))}
                  </div>

                  <div className="w-project-tech-logos">
                    {proj.techs.map((tech, techIdx) => (
                      <span className="w-project-tech-tag" key={techIdx}>
                        {techIdx > 0 && " • "} {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 10: RESULTS STATS */}


        {/* SECTION 11: TESTIMONIALS (REMOVED) */}



        {/* SECTION 12.5: PRICING */}
        <PricingTable 
          title="Website Design Packages"
          subtitle="Professional, responsive, SEO-friendly websites designed to turn visitors into customers."
          serviceName="Website Design"
          serviceId="website-design"
          packages={[
            { id: "basic", name: "Basic", price: "₹10,000" },
            { id: "growth", name: "Growth", price: "₹20,000", popular: true },
            { id: "premium", name: "Premium", price: "₹30,000+" }
          ]}
        />

        {/* SECTION 13: FAQ ACCORDION */}
        <section className="w-section w-section-light">
          <div className="w-grid-content">
            <div className="w-title-centered" style={{ maxWidth: "800px" }}>
              <span className="eyebrow">❓ FREQUENTLY ASKED QUESTIONS</span>
              <h2>Frequently Asked Questions About Website Design & Development</h2>
              <p>
                Find answers to common questions about our website design and development services, timelines, pricing, technologies, SEO, and post-launch support.
              </p>
            </div>

            <div className="seo-faq-accordion">
              {faqs.map((faq, idx) => (
                <div key={idx} className={`seo-faq-item ${openFaqIndex === idx ? "open" : ""}`}>
                  <button className="seo-faq-question-btn" onClick={() => toggleFaq(idx)}>
                    <span>{faq.q}</span>
                    <svg className="chevron-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9"></polyline>
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

        {/* SECTION 14: FINAL CTA */}
        <section className="cta-section">
          <div className="cta-card-wrapper">
            <div className="cta-grid-bg"></div>
            <div className="cta-card-content">
              <h2>Ready to Build a High-Performance Website?</h2>
              <p>
                Whether you're launching a new business or upgrading your existing website, Digital Marketing TenX creates responsive, SEO-friendly, and conversion-focused websites that help your business grow.
              </p>
              <div className="cta-card-buttons">
                <button className="btn-primary" onClick={() => window.open("https://wa.me/919392251739", "_blank")}>
                  📅 Book Free Consultation
                </button>
                <button className="btn-outline" onClick={() => window.open("mailto:info@digitalmarketingtenx.com")}>
                  ▶ Contact Us
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
