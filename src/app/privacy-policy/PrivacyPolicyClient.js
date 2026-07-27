"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "../legal.css";

export default function PrivacyPolicyClient() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState("introduction");
  const [copied, setCopied] = useState(false);
  const [faqActive, setFaqActive] = useState(null);

  const privacySections = [
    {
      id: "introduction",
      title: "1. Introduction",
      icon: "⚖️",
      content: `Welcome to Digital Marketing TenX. Your privacy, security, and trust are of paramount importance to us. This Privacy Policy document outlines how we collect, handle, process, and protect your personal, business, and website data. By accessing our website (digitalmarketingtenx.com) or procuring our digital marketing services, you agree to the collection and use of information in accordance with this policy. We ensure that your data is processed transparently, securely, and in strict compliance with the Information Technology Act of India and international guidelines like GDPR.`
    },
    {
      id: "collect",
      title: "2. Information We Collect",
      icon: "📋",
      content: `We collect various types of information to provide and improve our services to you:
- **Personal Information**: Full Name, Email Address, Phone Number, WhatsApp Number, and preferred contact coordinates submitted via our contact forms.
- **Business Information**: Company Name, Website URL, business type, industry sectors, monthly marketing budgets, project timelines, and description of requirements.
- **Website Usage Data**: IP Addresses, browser configurations, operating systems, session logs, clickstream paths, and page views gathered via cookies.
- **Analytics & Marketing Data**: Audience demographics, search query matches, ad conversion metrics, and tracking cookie data used to measure campaign performance.`
    },
    {
      id: "use",
      title: "3. How We Use Information",
      icon: "⚙️",
      content: `Digital Marketing TenX processes your collected data for specific, lawful purposes:
- **Lead Generation & Onboarding**: Evaluating marketing requirements to prepare customized strategies and quotes.
- **Customer Communications**: Sending contract updates, scheduled appointment triggers, response follow-ups, and newsletters.
- **Project Delivery & Management**: Coordinating SEO campaigns, Google Shopping campaigns, Web Development milestones, and social media schedules.
- **Website Optimization & Diagnostics**: Troubleshooting display bugs, improving form validation flows, and optimizing PageSpeed loads.
- **Analytics & Performance Tracking**: Measuring conversion statistics, evaluating target keywords behavior, and monitoring return on ad spend (ROAS).`
    },
    {
      id: "cookies",
      title: "4. Cookies Policy",
      icon: "🍪",
      content: `We utilize cookie files (small text files saved on your browser) to track user sessions and preserve layouts:
- **Necessary Cookies**: Essential to run contact forms, validation structures, and secure account sessions.
- **Analytics Cookies**: Google Analytics tracking cookies to measure traffic patterns and user pathways.
- **Marketing Cookies**: Meta Pixel and Google Ads conversion tracking cookies to display personalized ads and retarget website visitors.
- **Preference Cookies**: Custom theme adjustments and layout choices. You can modify your browser settings to reject cookies, though some form sections may lose functional states.`
    },
    {
      id: "security",
      title: "5. Data Security",
      icon: "🛡️",
      content: `We implement enterprise-grade security controls to shield your data from unauthorized access or disclosures:
- **SSL Encryption**: All web transactions, form inputs, and communication payloads are encrypted using standard HTTPS protocol with SSL certificates.
- **Secure Server Environments**: Hosted on modern secure cloud infrastructure with firewalls, entry monitoring, and access restrictors.
- **Access Controls**: Access to lead lists and business profiles is strictly limited to authorized marketing managers under non-disclosure contracts.
- **Regular Monitoring & Backups**: Daily database backups and security vulnerability sweeps to neutralize potential injection attacks.`
    },
    {
      id: "third-party",
      title: "6. Third-Party Services",
      icon: "🔗",
      content: `We integrate with certified third-party service providers to power specific modules on our website:
- **Google Workspace & Analytics**: Audience tracking, page diagnostics, and business emails.
- **Google Maps & Google Ads API**: Embedding our Begumpet office coordinates and monitoring campaign triggers.
- **Meta Pixel**: Measuring conversion rates for Facebook and Instagram campaign routes.
- **WhatsApp Web & API Redirects**: Facilitating direct chats and strategy consultations.
- **Local Storage API**: Saving lead backup records locally on your browser.
All third-party services maintain individual privacy frameworks. We do not sell or rent customer data to external data brokers.`
    },
    {
      id: "rights",
      title: "7. User Rights",
      icon: "🔑",
      content: `Depending on your regional jurisdiction (such as GDPR rules in Europe or IT Act criteria in India), you hold individual rights over your personal data:
- **Right to Access**: Request a digital copy of all lead files or profiles stored in our CRM.
- **Right to Rectification**: Correct any typos or updated phone and WhatsApp numbers in our logs.
- **Right to Deletion**: Request that we permanently delete your records, emails, and database coordinates.
- **Right to Consent Withdrawal**: Disable cookies or opt out of newsletter subscription links.
To trigger any request, email our compliance officer at privacy@digitalmarketingtenx.com.`
    },
    {
      id: "contact",
      title: "8. Contact Information",
      icon: "📞",
      content: `If you have any questions, clarifications, or complaints regarding this privacy framework, contact us:
- **Company Name**: Digital Marketing TenX
- **Address**: Level 4, Gumidelli Towers, 39 to 44, Old Patigadda,<br />Prakash Nagar, Begumpet,<br />Hyderabad, Telangana 500016
- **Phone Number**: +91 93922 51739
- **Support Email**: info@digitalmarketingtenx.com
- **Website URL**: https://digitalmarketingtenx.com`
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };
    window.addEventListener("scroll", handleScroll);

    // Active Section Observer
    const sections = document.querySelectorAll(".legal-card");
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -55% 0px",
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((s) => observer.observe(s));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      sections.forEach((s) => observer.unobserve(s));
    };
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Privacy Policy | Digital Marketing TenX",
        url: window.location.href
      });
    } else {
      handleCopyLink();
    }
  };

  const filteredSections = privacySections.filter(
    (sec) =>
      sec.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sec.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const faqs = [
    {
      q: "Is Digital Marketing TenX GDPR Compliant?",
      a: "Yes. While our headquarters is located in Hyderabad, India, we work with global clients and strictly enforce GDPR principles. This includes providing the right to data access, rectification, portability, and complete data erasure upon request."
    },
    {
      q: "Do you sell my data to third parties?",
      a: "Never. We do not sell, rent, trade, or share client leads, website visitor records, or contact data with external marketing networks, databases, or ad brokers. Your data is used exclusively to facilitate our direct communication and campaign optimization."
    },
    {
      q: "How secure is the information collected through forms?",
      a: "Our website is secured via standard HTTPS encryption using 256-bit SSL certificates. Any information submitted via our forms is protected in transit and stored on firewalled, access-controlled cloud database platforms."
    },
    {
      q: "How does Digital Marketing TenX protect client data in SEO campaigns?",
      a: "We protect SEO campaign data using secure storage, limited access controls, and encrypted communications. Our team treats campaign analytics, keyword research, and client site details as confidential information."
    },
    {
      q: "What information is collected for SEO and digital marketing services?",
      a: "We collect only the data necessary to deliver effective SEO, Google Ads, and website marketing services. This may include business details, website analytics, campaign tracking metrics, and contact information for communication."
    },
    {
      q: "Can I request deletion of my data from your marketing systems?",
      a: "Yes. You can request deletion, correction, or export of your personal data at any time. We respond to data subject requests in line with GDPR-style transparency and privacy best practices."
    }
  ];

  return (
    <div className="legal-page-content">
      <Header />

      {/* Reading Progress Indicator */}
      <div className="legal-progress-container">
        <div className="legal-progress-bar" style={{ width: `${scrollProgress}%` }}></div>
      </div>

      {/* Hero Section */}
      <section className="legal-hero">
        <div className="legal-wrap">
          <div className="legal-hero-grid">
            <div className="legal-hero-content">
              <span className="legal-hero-eyebrow">🔒 Legal Information</span>
              <h1>Privacy Policy</h1>
              <p>
                Your privacy and security are our top priorities. At <strong>Digital Marketing TenX</strong>, we are committed to protecting your personal information through secure data practices and complete transparency. This Privacy Policy explains how we collect, use, store, and safeguard your information when you use our website and services, while maintaining compliance with applicable privacy regulations.
              </p>
            </div>
            <div className="legal-hero-graphic-box">
              <picture>
                <img 
                  src="/privacy_hero.webp" 
                  alt="Privacy Shield and Lock Graphic" 
                  className="legal-hero-graphic"
                />
              </picture>
            </div>
          </div>
        </div>
      </section>

      {/* Breadcrumb Navigation */}
      <div className="legal-wrap" style={{ marginTop: "30px", padding: "0 40px" }}>
        <div className="legal-breadcrumb">
          <Link href="/">Home</Link>
          <span className="separator">/</span>
          <span className="current">Privacy Policy</span>
        </div>
      </div>

      {/* Main Layout Section */}
      <section className="legal-section" style={{ paddingTop: "10px" }}>
        <div className="legal-wrap">
          
          <div className="legal-content-grid">
            
            {/* Left Column Sticky Sidebar */}
            <aside className="legal-sidebar">
              
              {/* Document Search */}
              <div className="legal-search-wrapper">
                <span className="legal-search-icon">🔍</span>
                <input 
                  type="text" 
                  placeholder="Search policy..." 
                  className="legal-search-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="legal-toc-title">Table of Contents</div>
              <ul className="legal-toc-list">
                {privacySections.map((sec) => {
                  const isVisible = filteredSections.some((f) => f.id === sec.id);
                  return (
                    <li key={sec.id} style={{ display: isVisible ? "block" : "none" }}>
                      <a 
                        href={`#${sec.id}`}
                        className={`legal-toc-link ${activeSection === sec.id ? "active" : ""}`}
                        onClick={(e) => {
                          e.preventDefault();
                          document.getElementById(sec.id)?.scrollIntoView({ behavior: "smooth" });
                          setActiveSection(sec.id);
                        }}
                      >
                        {sec.title}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </aside>

            {/* Right Column Content Main Column */}
            <div className="legal-main-body">
              {filteredSections.length > 0 ? (
                filteredSections.map((sec) => (
                  <div key={sec.id} id={sec.id} className="legal-card">
                    <h2>
                      <span>{sec.icon}</span>
                      {sec.title.split(". ")[1] || sec.title}
                    </h2>
                    <div 
                      dangerouslySetInnerHTML={{ 
                        __html: sec.content
                          .replace(/- \*\*(.*?)\*\*(.*?)\n/g, "<li><strong>$1</strong>$2</li>")
                          .replace(/\n/g, "<br />")
                      }} 
                      style={{ fontSize: "14.5px", lineHeight: "1.7", color: "var(--leg-text-dark)" }}
                    />
                  </div>
                ))
              ) : (
                <div className="legal-card" style={{ textAlign: "center", padding: "60px 20px" }}>
                  <span style={{ fontSize: "36px" }}>🔍</span>
                  <h3>No matches found</h3>
                  <p style={{ color: "var(--leg-text-light)", fontSize: "13px", marginTop: "10px" }}>
                    Try searching for another keyword like "GDPR", "Cookies", or "SSL".
                  </p>
                </div>
              )}
            </div>

          </div>

        </div>
      </section>

      {/* Trust Section */}
      <section className="legal-section legal-trust-section">
        <div className="legal-wrap">
          <div className="legal-trust-layout">
            <div className="legal-trust-content">
              <h2>Why Your Data Is Safe</h2>
              <p>
                We execute state-of-the-art security, encryption, and operational practices to keep your marketing lists, audits, and business assets fully protected.
              </p>
              <picture>
                <img 
                  src="/secure_trust.webp" 
                  alt="Secure Cloud Shield Illustration" 
                  className="legal-trust-badge-img"
                />
              </picture>
            </div>
            <div className="legal-trust-grid">
              
              <div className="legal-trust-card">
                <div className="legal-trust-card-icon">🔒</div>
                <h4>SSL Protected</h4>
                <p>256-bit encryption blocks sniffing scripts in transit.</p>
              </div>

              <div className="legal-trust-card">
                <div className="legal-trust-card-icon">🇪🇺</div>
                <h4>GDPR Ready</h4>
                <p>Enforce data rights for access, portability, and deletes.</p>
              </div>

              <div className="legal-trust-card">
                <div className="legal-trust-card-icon">💳</div>
                <h4>Secure Payments</h4>
                <p>Integrates certified PCI-DSS transaction gateways.</p>
              </div>

              <div className="legal-trust-card">
                <div className="legal-trust-card-icon">🔑</div>
                <h4>Encrypted Storage</h4>
                <p>Passwords and profiles are secured with cryptographic hashes.</p>
              </div>

              <div className="legal-trust-card">
                <div className="legal-trust-card-icon">💬</div>
                <h4>Private Communication</h4>
                <p>Direct chats and emails run via secure corporate domains.</p>
              </div>

              <div className="legal-trust-card">
                <div className="legal-trust-card-icon">☁️</div>
                <h4>Trusted Infrastructure</h4>
                <p>Hosted on enterprise cloud clusters with auto-scaling security.</p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Privacy Policy FAQ Section – home page style */}
      <section className="seo-section">
        <div className="ga-wrap" style={{ maxWidth: "860px", margin: "0 auto" }}>
          <div className="sec-title" style={{ textAlign: "center", marginBottom: "8px" }}>
            <span className="eyebrow">💡 Help Desk</span>
            <h2>Privacy FAQs</h2>
            <p>Common questions about how we collect, store, and protect your data.</p>
          </div>
          <div className="seo-faq-accordion">
            {faqs.map((faq, i) => (
              <div key={i} className={`seo-faq-item ${faqActive === i ? "open" : ""}`}>
                <button className="seo-faq-question-btn" onClick={() => setFaqActive(faqActive === i ? null : i)}>
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

      {/* Need Help Contact Card – home page cta-card style */}
      <section className="cta-section">
        <div className="cta-card-wrapper">
          <div className="cta-grid-bg"></div>

          {/* Floating deco icons */}
          <div className="cta-deco-icon cta-deco-1">
            <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="#ff6b00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
          </div>
          <div className="cta-deco-icon cta-deco-2">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ff6b00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.92 12a2 2 0 0 1 2-2.18h3"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <div className="cta-deco-icon cta-deco-3">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#b0c4de" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </div>
          <div className="cta-deco-icon cta-deco-4">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="9" stroke="#64748b" strokeWidth="2"/>
              <path d="M12 8v4l3 3" stroke="#ff6b00" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>

          <div className="cta-card-content">
            <h2>Need Help?</h2>
            <p>
              Have questions about our privacy practices, cookie settings, or data security policies? Our team is here to help you.
            </p>
            <div className="cta-card-buttons">
              <a href="/contact" className="btn-primary-filled">▶ Contact Us</a>
              <a href="mailto:info@digitalmarketingtenx.com" className="btn-secondary-outlined">Email Support</a>
              <a href="tel:+919392251739" className="btn-secondary-outlined">📞 Call Us</a>
            </div>
          </div>
        </div>
      </section>

      {/* Ready to Grow CTA Section */}
      <section className="con-section" style={{ background: "#ffffff", padding: "60px 40px" }}>
        <div className="legal-wrap">
          <div className="cta-card-wrapper" style={{ margin: 0 }}>
            {/* Background elements */}
            <div className="cta-grid-bg"></div>
            <div className="cta-shape cta-shape-1"></div>
            <div className="cta-shape cta-shape-2"></div>
            <div className="cta-shape cta-shape-3"></div>
            <div className="cta-shape cta-shape-4"></div>

            <div className="cta-card-content" style={{ zIndex: 10 }}>
              <h2>Ready to Grow Your Business?</h2>
              <p>
                Let’s implement custom, data-driven marketing frameworks to attract shoppers and amplify your ROI.
              </p>
              <div className="cta-actions" style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                <Link href="/contact" className="btn-primary">
                  Book Free Consultation
                </Link>
                <Link href="/services" className="btn-outline" style={{ color: "#ff6b00", borderColor: "#ff6b00" }}>
                  Explore Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
