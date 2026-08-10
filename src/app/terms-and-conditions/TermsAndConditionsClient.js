"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "../legal.css";

const termsSections = [
  {
    id: "introduction",
    title: "1. Introduction",
    icon: "📜",
    content: [
      "Welcome to Digital Marketing TenX. These Terms & Conditions govern your use of our website (digitalmarketingtenx.com) and the professional digital marketing services we provide. By engaging our services or accessing our website, you confirm that you have read, understood, and agreed to be bound by these Terms.",
      "Digital Marketing TenX is a full-service digital marketing agency headquartered at Regus Begumpet, Level 4, Gumidelli Towers, Sardar Patel Road, Begumpet, Hyderabad, Telangana – 500016, India. We provide services including SEO, Google Ads Management, Social Media Marketing, Website Design & Development, WhatsApp Automation, E-Commerce Marketing, and AI-Powered Marketing Solutions."
    ]
  },
  {
    id: "acceptance",
    title: "2. Acceptance of Terms",
    icon: "✅",
    content: [
      "By submitting a contact form, signing a service agreement, making a payment, or using any feature of our website, you legally agree to these Terms & Conditions.",
      "If you do not agree to any part of these Terms, you must discontinue use of our website and services immediately. We reserve the right to modify these Terms at any time with prior notice via email or prominent website notification. Continued use after notification constitutes your acceptance of modified Terms."
    ]
  },
  {
    id: "services",
    title: "3. Services",
    icon: "⚙️",
    content: [
      "Digital Marketing TenX offers a comprehensive suite of digital marketing services:",
      "• SEO (Search Engine Optimization) – On-page, off-page, and technical SEO strategies",
      "• Google Ads Management – Search, Display, Shopping, and Remarketing campaigns",
      "• Social Media Marketing – Content creation and paid advertising across Facebook, Instagram, LinkedIn, and YouTube",
      "• Website Design & Development – Custom responsive websites built for performance and conversion",
      "• WhatsApp Automation – Bulk messaging, chatbot flows, and customer communication systems",
      "• E-Commerce Marketing – Product listing optimization, catalog ads, and D2C growth strategies",
      "• AI-Powered Marketing Solutions – Automated lead generation, AI content tools, and analytics dashboards",
      "Service scope, deliverables, timelines, and pricing are agreed upon individually via signed project proposals or service agreements."
    ]
  },
  {
    id: "payments",
    title: "4. Payments",
    icon: "💳",
    content: [
      "All service fees are quoted in Indian Rupees (INR) unless explicitly stated otherwise. Payment terms are defined in the individual project proposal or service agreement.",
      "Standard Payment Terms:",
      "• Monthly Retainer Services: 100% advance payment required before commencement of each monthly cycle.",
      "• Project-Based Work: 50% advance at project kickoff, 50% on final delivery or milestone completion.",
      "• Google / Meta Ad Budgets: Ad spend is separate from agency management fees and must be maintained directly by the client in their respective ad accounts.",
      "Invoices are issued digitally via email. Payments are accepted via Bank Transfer (NEFT/RTGS/IMPS), UPI, or payment links. Late payments beyond 7 days may attract a 2% monthly penalty on outstanding balances."
    ]
  },
  {
    id: "refund",
    title: "5. Refund Policy",
    icon: "🔄",
    content: [
      "Digital marketing is a performance-based service that involves planning, resource allocation, and campaign execution efforts that begin immediately upon project kickoff. Therefore:",
      "• No Refunds on Commenced Work: Once a project has been initiated and resources have been allocated, payments are non-refundable.",
      "• Advance Payments: If a client cancels before any work begins (within 24 hours of payment), 80% of the advance may be refunded after deducting processing fees.",
      "• Milestone-Based Projects: Refunds apply only to uncompleted milestones. Completed milestones are non-refundable.",
      "• Ad Spend: Amounts spent on Google Ads, Meta Ads, or other third-party advertising platforms are non-refundable under any circumstances.",
      "Refund requests must be submitted in writing to info@digitalmarketingtenx.com and will be evaluated within 10 business days."
    ]
  },
  {
    id: "delivery",
    title: "6. Project Delivery",
    icon: "🚀",
    content: [
      "Project timelines are estimates based on standard workflows and are subject to client responsiveness. Delays caused by late content submission, delayed approvals, or scope changes are not the responsibility of Digital Marketing TenX.",
      "Standard Delivery Timelines (estimates only):",
      "• SEO Strategy Report: 5–7 business days",
      "• Website Design & Development: 3–6 weeks depending on complexity",
      "• Social Media Content Calendar: 7–10 business days",
      "• Google Ads Campaign Setup: 3–5 business days",
      "• WhatsApp Automation Flows: 7–14 business days",
      "All deliverables will be reviewed by the client with a feedback window of 3–5 business days. Projects enter final delivery status after client approval."
    ]
  },
  {
    id: "responsibilities",
    title: "7. Client Responsibilities",
    icon: "🤝",
    content: [
      "To ensure successful campaign outcomes, clients agree to:",
      "• Provide accurate business information, brand assets, login credentials, and access to ad accounts within 48 hours of project kickoff.",
      "• Review and approve content, creatives, and strategies within the agreed feedback window.",
      "• Ensure ad budgets are maintained at the agreed levels in Google, Meta, and other platforms.",
      "• Communicate change requests formally via email or WhatsApp with a minimum 5-business-day implementation window.",
      "• Maintain open communication with the assigned account manager for timely project progression.",
      "Failure to provide required access or approvals may result in project delays for which Digital Marketing TenX bears no responsibility."
    ]
  },
  {
    id: "ip",
    title: "8. Intellectual Property",
    icon: "©️",
    content: [
      "All creative assets, campaign structures, strategy documents, SEO reports, and website code developed by Digital Marketing TenX remain the intellectual property of Digital Marketing TenX until full and final payment is received.",
      "Upon complete payment of all dues:",
      "• Website designs, graphic assets, and custom code are transferred to the client.",
      "• Ad campaign structures, keyword lists, and audience targeting configurations remain the proprietary methodology of Digital Marketing TenX.",
      "Clients may not reproduce, resell, or distribute our strategy frameworks, proposals, or methodology documents without written permission. Pre-existing third-party assets (fonts, stock images, plugins) remain subject to their respective license agreements."
    ]
  },
  {
    id: "usage",
    title: "9. Website Usage",
    icon: "🌐",
    content: [
      "By using digitalmarketingtenx.com you agree to the following usage conditions:",
      "• You will not attempt to breach or circumvent any security features of the website.",
      "• You will not upload, transmit, or distribute any malware, spyware, or harmful scripts.",
      "• You will not scrape, crawl, or use automated bots to harvest data from our website.",
      "• You will not impersonate Digital Marketing TenX staff, brand identity, or business registration.",
      "• All form submissions must be genuine business inquiries. Spam or test submissions may result in IP blocking.",
      "We reserve the right to restrict or terminate website access for any user who violates these usage conditions without prior notice."
    ]
  },
  {
    id: "liability",
    title: "10. Liability & Governing Law",
    icon: "⚖️",
    content: [
      "Digital Marketing TenX does not guarantee specific rankings, traffic volumes, conversion rates, or revenue outcomes from digital marketing campaigns. Results vary based on industry competition, ad budgets, market seasonality, and client product quality.",
      "Limitation of Liability:",
      "• Our liability is limited to the total fees paid by the client for the specific service in dispute.",
      "• We are not liable for losses caused by algorithm updates, platform policy changes, or market shifts beyond our control.",
      "• We are not responsible for third-party platform outages (Google, Meta, WhatsApp) that may affect campaign delivery.",
      "These Terms are governed by the laws of Telangana, India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Hyderabad, Telangana."
    ]
  },
  {
    id: "contact",
    title: "11. Contact Information",
    icon: "📞",
    content: [
      "For any queries regarding these Terms & Conditions, please reach out to us:",
      "Company: Digital Marketing TenX",
      "Address: Regus Begumpet, Level 4, Gumidelli Towers, Sardar Patel Road, Begumpet, Hyderabad, Telangana – 500016, India",
      "Phone: +91 93922 51739",
      "Email: info@digitalmarketingtenx.com",
      "Website: https://digitalmarketingtenx.com",
      "Business Hours: Monday – Saturday, 9:00 AM – 6:30 PM IST"
    ]
  }
];

const faqs = [
  {
    q: "Are digital marketing results guaranteed?",
    a: "No. Digital marketing results depend on many factors including market competition, ad budget, product quality, and seasonal trends. We guarantee professional strategy execution and transparent reporting, but cannot guarantee specific rankings, traffic, or revenue outcomes."
  },
  {
    q: "Can I cancel my monthly retainer mid-cycle?",
    a: "Yes, you can cancel with 30 days written notice. However, fees for the current billing cycle are non-refundable as resources have already been allocated. Cancellation becomes effective from the next billing cycle after notice."
  },
  {
    q: "Who owns the website built by Digital Marketing TenX?",
    a: "Upon full and final payment, all website design, custom code, and graphic assets are transferred to you (the client). However, our proprietary frameworks, strategy methodologies, and templated structures remain our intellectual property."
  },
  {
    q: "How does SEO work under the Terms & Conditions?",
    a: "Our Terms explain that SEO services are delivered as part of the agreed project scope. SEO campaign deliverables, timelines, and reporting cadence are defined in the service agreement to ensure transparency and measurable performance."
  },
  {
    q: "What SEO services are included in your service agreement?",
    a: "SEO services may include keyword research, on-page optimization, technical SEO audits, content optimization, link building, and performance tracking. The exact scope is agreed upon in writing before the campaign begins."
  },
  {
    q: "Can I request changes to my SEO strategy after signing the agreement?",
    a: "Yes. Change requests to SEO strategy, content direction, or campaign priorities are handled through the revision process described in the Terms. Some changes may affect timelines and require written approval or additional fees."
  }
];

export default function TermsAndConditionsClient() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState("introduction");
  const [copied, setCopied] = useState(false);
  const [faqActive, setFaqActive] = useState(null);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          if (totalHeight > 0) {
            const progress = (window.scrollY / totalHeight) * 100;
            setScrollProgress(progress);
          }
          ticking = false;
        });
        ticking = true;
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

  const handlePrint = () => window.print();

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: "Terms & Conditions | Digital Marketing TenX", url: window.location.href });
    } else {
      handleCopyLink();
    }
  };

  const filteredSections = termsSections.filter(
    (sec) =>
      sec.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sec.content.join(" ").toLowerCase().includes(searchQuery.toLowerCase())
  );

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
              <span className="legal-hero-eyebrow">📄 Legal Information</span>
              <h1>Terms &amp; Conditions</h1>
              <p>
                Our Terms & Conditions outline the rules, responsibilities, and expectations for using Digital Marketing TenX's services. They cover important information regarding project scope, payments, revisions, intellectual property, confidentiality, cancellations, and legal obligations. By using our website or engaging our services, you acknowledge and agree to these terms, helping us maintain a transparent, secure, and professional partnership.
              </p>
            </div>
            <div className="legal-hero-graphic-box">
              <picture>
                <img
                  src="/terms_hero.webp"
                  alt="Legal Contract and Scales of Justice Graphic"
                  className="legal-hero-graphic"
                />
              </picture>
            </div>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="legal-wrap" style={{ marginTop: "30px", padding: "0 40px" }}>
        <div className="legal-breadcrumb">
          <Link href="/">Home</Link>
          <span className="separator">/</span>
          <span className="current">Terms &amp; Conditions</span>
        </div>
      </div>

      {/* Main Content Section */}
      <section className="legal-section" style={{ paddingTop: "10px" }}>
        <div className="legal-wrap">

          {/* Metadata Bar */}

          <div className="legal-content-grid">

            {/* Sticky Sidebar */}
            <aside className="legal-sidebar">
              <div className="legal-search-wrapper">
                <span className="legal-search-icon">🔍</span>
                <input
                  type="text"
                  placeholder="Search terms..."
                  className="legal-search-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="legal-toc-title">Table of Contents</div>
              <ul className="legal-toc-list">
                {termsSections.map((sec) => {
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

            {/* Right Content Column */}
            <div className="legal-main-body">
              {filteredSections.length > 0 ? (
                filteredSections.map((sec) => (
                  <div key={sec.id} id={sec.id} className="legal-card">
                    <h2>
                      <span>{sec.icon}</span>
                      {sec.title.split(". ").slice(1).join(". ") || sec.title}
                    </h2>
                    {sec.content.map((paragraph, i) => (
                      <p key={i} style={{ marginBottom: "12px" }}>
                        {paragraph}
                      </p>
                    ))}
                  </div>
                ))
              ) : (
                <div className="legal-card" style={{ textAlign: "center", padding: "60px 20px" }}>
                  <span style={{ fontSize: "36px" }}>🔍</span>
                  <h3 style={{ marginTop: "12px", color: "var(--leg-navy)" }}>No matches found</h3>
                  <p style={{ color: "var(--leg-text-light)", fontSize: "13px", marginTop: "10px" }}>
                    Try searching for terms like "payment", "refund", or "delivery".
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
              <h2>Why Work With Us</h2>
              <p>
                We operate with full transparency, defined deliverables, and professional accountability. Your business growth is protected by clear terms and fair policies.
              </p>
              <picture>
                <img
                  src="/secure_trust.webp"
                  alt="Secure Digital Business Agreement Illustration"
                  className="legal-trust-badge-img"
                />
              </picture>
            </div>
            <div className="legal-trust-grid">
              <div className="legal-trust-card">
                <div className="legal-trust-card-icon">📝</div>
                <h4>Clear Agreements</h4>
                <p>Every project starts with a defined scope, timeline, and deliverables document.</p>
              </div>
              <div className="legal-trust-card">
                <div className="legal-trust-card-icon">💰</div>
                <h4>Transparent Pricing</h4>
                <p>No hidden charges. All fees are discussed and documented before commencement.</p>
              </div>
              <div className="legal-trust-card">
                <div className="legal-trust-card-icon">📊</div>
                <h4>Monthly Reports</h4>
                <p>Detailed performance reports every month with full campaign transparency.</p>
              </div>
              <div className="legal-trust-card">
                <div className="legal-trust-card-icon">🛡️</div>
                <h4>IP Protection</h4>
                <p>All assets are legally transferred to you upon full payment completion.</p>
              </div>
              <div className="legal-trust-card">
                <div className="legal-trust-card-icon">🤝</div>
                <h4>Dedicated Manager</h4>
                <p>A dedicated account manager for seamless communication and project tracking.</p>
              </div>
              <div className="legal-trust-card">
                <div className="legal-trust-card-icon">⚡</div>
                <h4>Agile Execution</h4>
                <p>Fast campaign setups with structured processes and quality checkpoints.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Terms FAQ – home page style */}
      <section className="seo-section">
        <div className="ga-wrap" style={{ maxWidth: "860px", margin: "0 auto" }}>
          <div className="sec-title" style={{ textAlign: "center", marginBottom: "8px" }}>
            <span className="eyebrow">💡 Help Desk</span>
            <h2>Terms FAQs</h2>
            <p>Common questions about our service agreements, payments, and policies.</p>
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

          <div className="cta-deco-icon cta-deco-1">
            <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="#ff5722" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
          </div>
          <div className="cta-deco-icon cta-deco-2">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ff5722" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="#64748b" strokeWidth="2"/>
              <polyline points="14 2 14 8 20 8" stroke="#64748b" strokeWidth="2"/>
              <line x1="16" y1="13" x2="8" y2="13" stroke="#ff5722" strokeWidth="2"/>
              <line x1="16" y1="17" x2="8" y2="17" stroke="#ff5722" strokeWidth="2"/>
            </svg>
          </div>

          <div className="cta-card-content">
            <h2>Need Clarification?</h2>
            <p>
              Questions about our Terms & Conditions, payment policies, or service agreements? Our team is ready to help.
            </p>
            <div className="cta-card-buttons">
              <a href="/contact" className="btn-primary-filled">&#9654; Contact Us</a>
              <a href="mailto:info@digitalmarketingtenx.com" className="btn-secondary-outlined">Email Support</a>
              <a
                href="https://wa.me/919392251739"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary-outlined"
              >
                💬 WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

