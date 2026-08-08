"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { openWhatsAppQuote } from "@/lib/whatsappQuote";
import PricingTable from "@/components/services/PricingTable";
import "./whatsapp-automation.css";

// Reusable Animated Counter component for stats
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

export default function WhatsAppAutomationPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [activeCaseTab, setActiveCaseTab] = useState(0);
  const [activeTemplateIndex, setActiveTemplateIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setVisibleCards(1);
      } else if (window.innerWidth <= 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(3);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const maxIndex = Math.max(0, 10 - visibleCards); // 10 is templates.length
    if (activeTemplateIndex > maxIndex) {
      setActiveTemplateIndex(maxIndex);
    }
  }, [visibleCards, activeTemplateIndex]);

  const handlePrevTemplate = () => {
    setActiveTemplateIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNextTemplate = () => {
    setActiveTemplateIndex((prev) => Math.min(10 - visibleCards, prev + 1));
  };

  const toggleFaq = (idx) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  // Simulated live message chat notifications list for Hero mockup
  const [heroMessages, setHeroMessages] = useState([
    { id: 1, type: "incoming", text: "Hi, I'm interested in your website design services.", time: "10:30 AM" },
    { id: 2, type: "outgoing", text: "Hello! Welcome to Digital Marketing TenX. How can we help you today? Please reply with:\n1. View Pricing\n2. Book Strategy Call\n3. Talk to Agent", time: "10:30 AM" }
  ]);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setHeroMessages(prev => [
        ...prev,
        { id: 3, type: "incoming", text: "2. Book Strategy Call", time: "10:31 AM" }
      ]);
    }, 3000);

    const timer2 = setTimeout(() => {
      setHeroMessages(prev => [
        ...prev,
        { id: 4, type: "outgoing", text: "Great! Let's get you booked. Click the link below to select a time for your free 10X growth strategy consultation:\n[Book Free Consultation]", time: "10:31 AM" }
      ]);
    }, 5500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  // 14 Features What's Included list
  const deliverables = [
    { title: "Official WhatsApp Business API", icon: "🌐", desc: "Access the green verified checkmark profile and connect directly through Meta API servers without risk of phone number blocking." },
    { title: "Inbound Lead Capture Automation", icon: "🎯", desc: "Auto-trigger qualified custom greeting flows instantly whenever a new prospect messages your WhatsApp number from ads or search." },
    { title: "Broadcast Promotional Campaigns", icon: "📣", desc: "Broadcast personalized promotional templates, discount coupons, or newsletter updates to custom customer database segments in bulk." },
    { title: "Instant Automated Replies", icon: "⚡", desc: "Build keyword-triggered auto-replies to resolve repetitive customer inquiries about catalog, office hours, or locations instantly." },
    { title: "Appointment & Booking Reminders", icon: "📅", desc: "Send automated scheduling confirmation alerts and follow-up templates directly integrated with Google Calendar or Calendly." },
    { title: "Bi-Directional CRM Integrations", icon: "🔌", desc: "Sync contact data and active chat logs in real-time to Salesforce, HubSpot, Zoho CRM, or custom central databases." },
    { title: "Sales funnel workflows", icon: "⏳", desc: "Create multi-stage lead scoring paths on WhatsApp to guide cold visitors into scheduled sales phone consultations." },
    { title: "Customer Support Automation", icon: "🛠️", desc: "Deploy intelligent triage chatbots to answer support queries and seamlessly transfer complex cases to human agents." },
    { title: "Intelligent Chatbot Integration", icon: "🤖", desc: "Deploy advanced chatbot scripts trained on your business database to provide personalized answers 24 hours a day." },
    { title: "Rich Media Attachments", icon: "📁", desc: "Send catalogs, brochures, PDF proposals, image proofs, and video walk-throughs automatically to capture user interest." },
    { title: "Order Placement Alerts", icon: "📦", desc: "Notify clients automatically with status updates, delivery tracking tracking URLs, and custom receipt bills." },
    { title: "Payment Settlement Reminders", icon: "💳", desc: "Automate unpaid payment collections by broadcasting billing reminders along with secure UPI or credit gateway links." }
  ];

  // 8 steps workflow data
  const processSteps = [
    { num: "01", title: "Customer Starts Conversation", desc: "Customers connect with your business through WhatsApp, your website, QR codes, Facebook Ads, or Instagram Ads to begin their journey.", response: "Hi, I want to learn more about your services." },
    { num: "02", title: "Instant Welcome Message", desc: "An automated greeting welcomes customers and presents interactive menu options.", response: "Hello! Welcome to TenX. Please reply with: 1. Services, 2. Book Call." },
    { num: "03", title: "Lead Qualification", desc: "The chatbot asks relevant questions to identify customer requirements and qualify leads.", response: "Got it! May I know your monthly marketing budget? (A: <10k, B: 10k-50k, C: 50k+)" },
    { num: "04", title: "CRM Integration", desc: "Customer details are automatically synced with your CRM for seamless lead management.", response: "Lead information saved: Budget: 50k+, Sector: E-commerce. Status: High-Intent." },
    { num: "05", title: "Sales Team Assignment", desc: "Qualified leads are instantly assigned to the right sales representative.", response: "Alert sent to agent Vikram Malhotra: New high-intent lead assigned." },
    { num: "06", title: "Appointment Booking", desc: "Customers can schedule calls, demos, or appointments directly through WhatsApp.", response: "Great! Tap to book your growth strategy session: [calendly.com/tenx-call]" },
    { num: "07", title: "Automated Follow-Ups", desc: "Automated reminders and personalized follow-up messages keep leads engaged.", response: "Reminder: Your free growth consultation call starts in 1 hour. Tap to join: [Link]" },
    { num: "08", title: "Lead Conversion", desc: "Convert qualified leads into customers with a streamlined WhatsApp automation workflow.", response: "Welcome onboard! Your onboarding file has been created. Click to access: [Client portal]" }
  ];

  // Industry-specific tabs data
  const caseTabs = [
    { name: "🏥 Healthcare", title: "Appointment Booking & Medical Reminders", desc: "Automate patient scheduling, reduce no-shows, and deliver test reports securely over WhatsApp.", items: ["Automated calendar slots booking", "Reports download PDFs delivery", "Pre-appointment prep guidelines", "Doctor availability checks"] },
    { name: "🏢 Real Estate", title: "Qualified Buyer Triage & Listings", desc: "Handle property queries, share catalog brochures, and qualify buyers automatically before agent visits.", items: ["Property catalog PDFs delivery", "Buyer budget & location screening", "Automated site visit scheduling", "New listings alerts broadcasting"] },
    { name: "🎓 Education", title: "Admissions Intake & Course Info", desc: "Nurture students, answer fee inquiries, and automate admission forms collections.", items: ["Course syllabus brochures sharing", "Fee schedule tables delivery", "Interview slots scheduling", "Documents upload collection"] },
    { name: "🛒 E-Commerce", title: "Cart Recovery & Order Notifications", desc: "Boost store checkouts and improve retention rates by re-engaging abandoned cart users directly on their mobile screens.", items: ["Automated abandoned cart coupons", "Live order dispatch alerts", "Interactive product catalog sheets", "Automated customer review requests"] },
    { name: "💼 Professional Services", title: "Automated Lead Capturing & Support", desc: "Capture cold traffic, schedule consultations, and provide instant support for your professional service firm.", items: ["Custom greeting sequences", "Automated budget/sector screening", "Consultation slot scheduling", "Immediate CRM contact updates"] }
  ];

  // 10 Automation Templates previews
  const templates = [
    { id: 1, name: "Welcome Sequence", header: "Greetings Workflow", msg: "Hello {Name}! Welcome to TenX. We help brands scale 10X faster. Tap below to choose an option:\n1. 📂 View Portfolio\n2. 📅 Book consultation\n3. 💬 Talk to Agent" },
    { id: 2, name: "Appointment Reminder", header: "Schedule Alert", msg: "Hi {Name}, your 10X Growth strategy call starts in 1 hour. Representative Vikram is looking forward to speaking with you. Click to join:\n[Join Google Meet]" },
    { id: 3, name: "Abandoned Cart", header: "Cart Recovery", msg: "Hey {Name}! We noticed you left some items in your cart. Use code WHATSAPP10 at checkout to get a flat 10% discount on your order:\n[Complete Order Now]" },
    { id: 4, name: "Feedback Request", header: "Customer CSAT", msg: "Hi {Name}, thank you for choosing TenX! How would you rate your onboarding experience today?\n⭐⭐⭐⭐⭐ Excellent\n⭐⭐⭐⭐ Good\n⭐⭐ average" },
    { id: 5, name: "Order Confirmation", header: "Delivery Updates", msg: "Success! Your order #{OrderID} has been packaged and is ready to ship. Track your edge delivery route live here:\n[Track Delivery URL]" },
    { id: 6, name: "Support Ticket", header: "Help Desk", msg: "Hi {Name}, your support ticket #{TicketID} has been successfully assigned to agent Sarah. We will resolve your query within 30 minutes." },
    { id: 7, name: "Payment Reminder", header: "Billing Alert", msg: "Dear {Name}, a friendly reminder that invoice #{InvID} for ₹14,999 is due tomorrow. Click here to settle via secure UPI:\n[Pay via UPI Link]" },
    { id: 8, name: "Newsletter", header: "Growth Insights", msg: "Hi {Name}, our latest case study is live! Read how we helped Aura Luxe achieve a +24% average order value using custom Web structures:\n[Read Case Study]" },
    { id: 9, name: "Festival Campaign", header: "Festival Offers", msg: "Happy Diwali {Name}! 🪔 Celebrate with our growth plans. Get 15% off all website design and ads management services today only:\n[Claim Diwali Offer]" },
    { id: 10, name: "Referral Campaign", header: "Share & Earn", msg: "Hey {Name}, share the gift of growth! Refer a business contact to TenX and get a ₹5,000 credit when they sign up for our services:\n[Refer Partner]" }
  ];

  // 6 Case Studies data
  const caseStudies = [
    { tag: "Healthcare", title: "Apex Medical Center Clinics", desc: "No-show rates dropped from 22% to 4.5% using automated WhatsApp slot updates.", problem: "Patients forgot appointment slots, causing empty slots and lost clinic revenue.", solution: "Integrated clinic database with WhatsApp API to send auto confirmations and 1-hour reminders.", results: ["-80% No-Show Rates", "+15% Doctor Efficiency", "₹4.2 Lakh/mo Recovered"] },
    { tag: "E-Commerce", title: "Aura Luxe Fashion Shop", desc: "Recovered 32% of abandoned checkouts via personalized discount broadcasts.", problem: "High shopping cart checkout drop-off rate on custom e-commerce store.", solution: "Triggered cart abandonment follow-up texts with a flat 10% discount coupon code 30 minutes after session end.", results: ["32% Cart Recovery Rate", "+18% Revenue Lift", "4.8X Ad Spend Return"] },
    { tag: "Real Estate", title: "Zenith Heights Properties", desc: "Qualified 1,200+ property buyers without manual sales calls.", problem: "Sales team wasted 70% of phone call hours speaking with unqualified, cold leads.", solution: "Deployed a buyer triage chatbot to screen budget, timeframe, and location interests before human handoff.", results: ["1,200+ Qualified Leads", "92% Agent Time Saved", "+25% Sales Conversion"] }
  ];

  // 20 accordion FAQ questions
  const faqs = [
    { q: "1. What Are WhatsApp Automation Services?", a: "WhatsApp Automation Services automate customer conversations, instant replies, lead generation, follow-ups, and support using the official WhatsApp Business API." },
    { q: "2. How Does WhatsApp Business Automation Work?", a: "It uses AI chatbots and automated workflows to respond instantly, qualify leads, schedule appointments, and connect with your CRM." },
    { q: "3. Can WhatsApp Automation Generate More Leads?", a: "Yes. It captures, qualifies, and nurtures leads automatically, helping increase conversions and improve customer engagement." },
    { q: "4. Can You Integrate WhatsApp With My CRM?", a: "Yes. We integrate WhatsApp with HubSpot, Zoho CRM, Salesforce, Shopify, WooCommerce, Google Sheets, and more." },
    { q: "5. Why Choose Digital Marketing TenX for WhatsApp Automation Services in Hyderabad?", a: "We deliver customized WhatsApp automation, AI chatbots, CRM integrations, and lead generation solutions to help businesses grow faster." }
  ];

  const integrationTools = [
    {
      name: "HubSpot",
      logo: (
        <svg viewBox="0 0 24 24" width="32" height="32" fill="#ff7a59">
          <path d="M21.368 11.237a3.522 3.522 0 0 0-3.197-2.073V5.556c0-.986-.8-1.785-1.786-1.785h-3.612a3.526 3.526 0 1 0-3.32 0H5.84a1.786 1.786 0 0 0-1.786 1.785v3.608a3.526 3.526 0 1 0 0 3.32v3.61c0 .986.8 1.786 1.786 1.786h3.612a3.524 3.524 0 1 0 3.32 0h3.612c.986 0 1.786-.8 1.786-1.786v-3.608a3.526 3.526 0 0 0 3.197-2.073zM11.26 2.5a1.263 1.263 0 1 1 0 2.526 1.263 1.263 0 0 1 0-2.526zm-7.734 8.76a1.263 1.263 0 1 1 2.526 0 1.263 1.263 0 0 1-2.526 0zm7.734 10.24a1.263 1.263 0 1 1 0-2.526 1.263 1.263 0 0 1 0 2.526zm5.99-6.444H6.756a.715.715 0 0 1-.714-.714V7.556c0-.395.32-.714.714-.714h2.518a3.522 3.522 0 0 0 2.99 0h2.518c.394 0 .714.32.714.714v1.233a3.52 3.52 0 0 0-2.052 3.197c0 1.547 1.004 2.858 2.392 3.322a3.527 3.527 0 0 0 3.23.013v1.238c0 .395-.32.714-.714.714zm1.263-2.316a1.263 1.263 0 1 1 0-2.526 1.263 1.263 0 0 1 0 2.526z"/>
        </svg>
      )
    },
    {
      name: "Salesforce",
      logo: (
        <svg viewBox="0 0 24 24" width="32" height="32" fill="#00a1e0">
          <path d="M18.8 8c-.6 0-1.1.2-1.6.5C16.4 5.3 13.5 3.3 10 3.3c-4.2 0-7.7 3.1-8.3 7.2C.7 11.2 0 12.3 0 13.6c0 2 1.6 3.7 3.7 3.7h15.1c2.1 0 3.7-1.6 3.7-3.7 0-2-1.6-3.7-3.7-3.7-1-.1-1.9-1.9-1.9-1.9z"/>
        </svg>
      )
    },
    {
      name: "Zoho CRM",
      logo: (
        <svg viewBox="0 0 100 100" width="32" height="32">
          <rect x="5" y="5" width="40" height="40" fill="#E21B26" rx="6" />
          <rect x="55" y="5" width="40" height="40" fill="#39A935" rx="6" />
          <rect x="5" y="55" width="40" height="40" fill="#0072BC" rx="6" />
          <rect x="55" y="55" width="40" height="40" fill="#F8A51D" rx="6" />
        </svg>
      )
    },
    {
      name: "Google Sheets",
      logo: (
        <svg viewBox="0 0 24 24" width="32" height="32" fill="#0F9D58">
          <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm0-4H8V8h8v2zm-3-4V3.5L18.5 9H13z"/>
        </svg>
      )
    },
    {
      name: "Google Calendar",
      logo: (
        <svg viewBox="0 0 24 24" width="32" height="32">
          <rect x="3" y="3" width="18" height="18" rx="3" fill="#4285F4" />
          <path d="M3 8.5h18" stroke="#FFF" strokeWidth="1.5" />
          <text x="12" y="18" fill="#FFF" fontSize="9.5" fontWeight="900" textAnchor="middle" fontFamily="'Inter', sans-serif">31</text>
        </svg>
      )
    },
    {
      name: "Zapier",
      logo: (
        <svg viewBox="0 0 24 24" width="32" height="32" fill="#FF4F00">
          <path d="M12 0L8.8 8.8L0 12L8.8 15.2L12 24L15.2 15.2L24 12L15.2 8.8z"/>
        </svg>
      )
    },
    {
      name: "Make.com",
      logo: (
        <svg viewBox="0 0 24 24" width="32" height="32" fill="#7C3AED">
          <rect x="5" y="4" width="3" height="16" rx="1.5" />
          <rect x="10.5" y="4" width="3" height="16" rx="1.5" />
          <rect x="16" y="4" width="3" height="16" rx="1.5" />
        </svg>
      )
    },
    {
      name: "Shopify",
      logo: (
        <svg viewBox="0 0 24 24" width="32" height="32" fill="#96bf48">
          <path d="M19 6.5h-3v-1a2.5 2.5 0 0 0-5 0v1H8c-1.1 0-2 .9-2 2l1.5 12c.1.9.9 1.5 1.8 1.5h9.4c.9 0 1.7-.6 1.8-1.5L21 8.5c0-1.1-.9-2-2-2zm-6.5-1c0-.55.45-1 1-1s1 .45 1 1v1h-2v-1zM12 18c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z"/>
        </svg>
      )
    },
    {
      name: "WooCommerce",
      logo: (
        <svg viewBox="0 0 24 24" width="32" height="32" fill="#96588a">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11c0 1.66-1.34 3-3 3h-4c-1.66 0-3-1.34-3-3v-2c0-1.66 1.34-3 3-3h4c1.66 0 3 1.34 3 3v2z"/>
        </svg>
      )
    },
    {
      name: "OpenAI",
      logo: (
        <svg viewBox="0 0 24 24" width="32" height="32" fill="#000">
          <path d="M21.7 11.4c0-.7-.4-1.4-1.1-1.7.1-.4.1-.7.1-1.1 0-1.7-1.4-3.1-3.1-3.1-.4 0-.8.1-1.1.2-.4-.9-1.3-1.5-2.3-1.5-1.5 0-2.8 1.1-3 2.6-.4-.3-.9-.4-1.4-.4-1.7 0-3.1 1.4-3.1 3.1 0 .2 0 .4.1.6C6.1 10.4 5.3 11 5 12c-.3.8-.3 1.7.1 2.5.1.2.3.4.4.6-.2.4-.3.9-.3 1.4 0 1.7 1.4 3.1 3.1 3.1.4 0 .9-.1 1.3-.3.4.7 1.2 1.2 2.1 1.2 1 0 1.9-.6 2.2-1.5.3.1.7.2 1 .2 1.7 0 3.1-1.4 3.1-3.1 0-.4-.1-.8-.3-1.2.9-.4 1.5-1.3 1.5-2.3 0-.4 0-.8-.2-1.1.8-.4 1.2-1.1 1.2-2z"/>
        </svg>
      )
    }
  ];

  return (
    <div className="wa-page-container">
      <Header />

      <main>
        {/* SECTION 1: HERO */}
        <section className="wa-hero-section">
          <div className="wa-grid-bg"></div>
          <div className="wa-glow wa-glow-green-left"></div>
          <div className="wa-glow wa-glow-purple-right" style={{ bottom: "-10%", right: "-10%" }}></div>

          <div className="wa-hero-grid">
            <div className="wa-hero-content">
              <span className="wa-badge-premium">💬 AI-Powered WhatsApp Automation</span>
              <h1>
                WhatsApp Automation<br />
                Services in Hyderabad<br />
                That <span className="wa-text-green">Convert More Customers</span>
              </h1>
              <p>
                Automate customer conversations, generate qualified leads, send instant replies, and streamline follow-ups with our WhatsApp Automation Services in Hyderabad. Our AI-powered WhatsApp Business Automation, WhatsApp Chatbot Services, and WhatsApp API Solutions help businesses improve customer engagement, increase sales, and deliver faster support. 
              </p>
              
              <div className="wa-hero-buttons">
                <button className="btn-primary" onClick={() => window.dispatchEvent(new CustomEvent("trigger-consultation-modal", { detail: { service: "WhatsApp Automation" } }))}>
                  📅 Book Free Consultation
                </button>
                <button className="btn-outline" onClick={() => openWhatsAppQuote("WhatsApp Automation – Live Demo")}>
                  ▶ Request Live Demo
                </button>
              </div>


            </div>

            {/* Right Side Visual Phone Mockup & widgets */}
            <div className="wa-hero-visual">
              <div className="wa-phone-mockup">
                <div className="wa-phone-header">
                  <div className="wa-phone-avatar">TenX</div>
                  <div className="wa-phone-status">
                    <span className="wa-phone-name">DM TenX Assistant</span>
                    <span className="wa-phone-active">online • verified API</span>
                  </div>
                </div>
                
                <div className="wa-phone-body">
                  {heroMessages.map(msg => (
                    <div key={msg.id} className={`wa-chat-bubble ${msg.type}`}>
                      <span style={{ whiteSpace: "pre-line" }}>{msg.text}</span>
                      <span className="wa-chat-time">{msg.time}</span>
                    </div>
                  ))}
                  {heroMessages.length < 4 && (
                    <div className="wa-chat-bubble incoming wa-chat-typing">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  )}
                </div>
              </div>

              {/* Floating Widgets */}
              <div className="wa-floating-hero-card delivered">
                <div className="wa-flow-icon-circle" style={{ backgroundColor: "#dcfce7", color: "#15803d" }}>✔</div>
                <div className="wa-flow-text-info">
                  <h5>Campaign Broadcast</h5>
                  <p>98.4% Message Read Rate</p>
                </div>
              </div>

              <div className="wa-floating-hero-card leads">
                <div className="wa-flow-icon-circle" style={{ backgroundColor: "#dbeafe", color: "#2563eb" }}>⚡</div>
                <div className="wa-flow-text-info">
                  <h5>New Lead Capture</h5>
                  <p>HubSpot Sync Complete</p>
                </div>
              </div>

              <div className="wa-floating-hero-card booking">
                <div className="wa-flow-icon-circle" style={{ backgroundColor: "#f3e8ff", color: "#7c3aed" }}>📅</div>
                <div className="wa-flow-text-info">
                  <h5>Call Booked</h5>
                  <p>Tomorrow at 11:00 AM</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: WHY WHATSAPP AUTOMATION */}
        <section className="wa-section wa-section-light">
          <div className="wa-grid-content">
            <div className="wa-title-centered">
              <span className="eyebrow">WHY WHATSAPP AUTOMATION MATTERS</span>
              <h2>Why Businesses Need WhatsApp Automation</h2>
              <p>
                Improve customer engagement, automate conversations, generate qualified leads, and provide instant support with WhatsApp Automation Services in Hyderabad. AI-powered WhatsApp Business Automation helps businesses respond faster, convert more customers, and streamline sales.
              </p>
            </div>

            <div className="wa-why-grid">
              {/* Left Column Journey comparison */}
              <div className="wa-comparison-panel">
                <div className="wa-compare-column">
                  <div>
                    <div className="wa-compare-title red">
                      <span>❌</span> Manual Customer Communication (Slow & Costly)
                    </div>
                    <div className="wa-compare-item">
                      <span>🕒</span> Customers wait hours for replies, resulting in lost leads and sales.
                    </div>
                    <div className="wa-compare-item" style={{ marginTop: "10px" }}>
                      <span>📂</span> Manual follow-ups are inconsistent, causing missed business opportunities.
                    </div>
                  </div>

                  <div style={{ borderTop: "1px solid var(--wa-border)", paddingTop: "20px" }}>
                    <div className="wa-compare-title green">
                      <span>✔</span> AI-Powered WhatsApp Automation (Fast & Smart)
                    </div>
                    <div className="wa-compare-item">
                      <span>⚡</span> Instant automated replies engage customers within seconds.
                    </div>
                    <div className="wa-compare-item" style={{ marginTop: "10px" }}>
                      <span>🤖</span> AI-powered chatbots qualify leads, answer FAQs, and schedule appointments automatically.
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column Features cards */}
              <div className="wa-why-cards-grid">
                <div className="wa-why-card wa-glass-card">
                  <div className="wa-why-card-icon" style={{ backgroundColor: "#f0fdf4", color: "#10b981" }}>🕒</div>
                  <h3>24/7 Customer Support</h3>
                  <p>Provide instant responses anytime using AI-powered WhatsApp Business Automation.</p>
                </div>
                <div className="wa-why-card wa-glass-card">
                  <div className="wa-why-card-icon" style={{ backgroundColor: "#eff6ff", color: "#2563eb" }}>⚡</div>
                  <h3>Instant Replies</h3>
                  <p>Respond to customer inquiries in seconds and improve conversion rates.</p>
                </div>
                <div className="wa-why-card wa-glass-card">
                  <div className="wa-why-card-icon" style={{ backgroundColor: "#fdf2f8", color: "#be185d" }}>🎯</div>
                  <h3>Smart Lead Qualification</h3>
                  <p>Automatically qualify leads and collect customer information using interactive WhatsApp flows.</p>
                </div>
                <div className="wa-why-card wa-glass-card">
                  <div className="wa-why-card-icon" style={{ backgroundColor: "#fef3c7", color: "#d97706" }}>💬</div>
                  <h3>Personalized Messaging</h3>
                  <p>Send personalized offers, reminders, updates, and follow-ups based on customer behavior.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: AUTOMATION WORKFLOW */}
        <section className="wa-section wa-section-white">
          <div className="wa-grid-content">
            <div className="wa-title-centered">
              <span className="eyebrow">HOW WHATSAPP AUTOMATION WORKS</span>
              <h2>How Our WhatsApp Automation Process Works</h2>
              <p>
                See how our AI-powered WhatsApp Automation Services guide customers from their first message to lead qualification, CRM integration, appointment booking, and successful conversions.
              </p>
            </div>

            <div className="wa-workflow-diagram-wrap">
              <div className="wa-workflow-flow">
                {processSteps.map((step, idx) => (
                  <div 
                    key={idx} 
                    className={`wa-workflow-step-card ${activeStep === idx ? "active" : ""}`}
                    onClick={() => setActiveStep(idx)}
                  >
                    <span className="wa-step-num">{step.num}</span>
                    <span className="wa-step-icon">
                      {idx === 0 && "💬"}
                      {idx === 1 && "👋"}
                      {idx === 2 && "📝"}
                      {idx === 3 && "🔌"}
                      {idx === 4 && "👥"}
                      {idx === 5 && "📅"}
                      {idx === 6 && "🔔"}
                      {idx === 7 && "🏆"}
                    </span>
                    <h4>{step.title}</h4>
                    <p>{step.desc}</p>
                  </div>
                ))}
              </div>

              {/* Step details visual board */}
              <div className="wa-workflow-details-board">
                <div className="wa-workflow-details-text">
                  <h3>Step {processSteps[activeStep].num}: {processSteps[activeStep].title}</h3>
                  <p>{processSteps[activeStep].desc}</p>
                </div>
                <div className="wa-workflow-details-visual">
                  <div className="wa-simulated-msg">
                    <span style={{ fontWeight: "700", display: "block", fontSize: "7px", color: "var(--wa-accent-green)", marginBottom: "4px" }}>TenX System Reply:</span>
                    <span style={{ whiteSpace: "pre-line" }}>{processSteps[activeStep].response}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: WHAT'S INCLUDED */}
        <section className="wa-section wa-section-light">
          <div className="wa-grid-content">
            <div className="wa-title-centered">
              <span className="eyebrow">WHATSAPP AUTOMATION FEATURES</span>
              <h2>Complete WhatsApp Automation Solutions for Your Business</h2>
              <p>
                Automate customer conversations, lead generation, sales, support, and follow-ups with our comprehensive WhatsApp Automation Services in Hyderabad. Our AI-powered solutions help businesses save time, improve customer engagement, and increase conversions.
              </p>
            </div>

            <div className="wa-included-grid">
              {deliverables.map((del, idx) => (
                <div className="wa-inc-card wa-glass-card" key={idx}>
                  <div className="wa-inc-icon-wrapper" style={{ backgroundColor: "#f0fdf4", color: "#10b981" }}>
                    {del.icon}
                  </div>
                  <div className="wa-inc-content">
                    <h3>{del.title}</h3>
                    <p>{del.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 5: BUSINESS BENEFITS */}
        <section className="wa-section wa-section-white">
          <div className="wa-grid-content">
            <div className="wa-title-centered">
              <span className="eyebrow">Why It Matters</span>
              <h2>Benefits That Drive Real Business Growth</h2>
              <p>
                Automate customer conversations, reduce manual work, respond instantly, and generate more qualified leads with AI-powered WhatsApp automation.
              </p>
            </div>

            <div className="wa-benefits-grid">
              {/* Left Column Benefits list */}
              <div className="wa-benefits-list">
                <div className="wa-benefit-card wa-glass-card">
                  <div className="wa-benefit-icon" style={{ backgroundColor: "#f0fdf4", color: "#10b981" }}>⚡</div>
                  <h3>Faster Response Time</h3>
                  <p>Replies sent in under 5 seconds, capturing hot leads instantly.</p>
                </div>
                <div className="wa-benefit-card wa-glass-card">
                  <div className="wa-benefit-icon" style={{ backgroundColor: "#eff6ff", color: "#2563eb" }}>😊</div>
                  <h3>Better Customer Experience</h3>
                  <p>Deliver answers, catalog brochures, and reports instantly.</p>
                </div>
                <div className="wa-benefit-card wa-glass-card">
                  <div className="wa-benefit-icon" style={{ backgroundColor: "#fdf2f8", color: "#be185d" }}>📈</div>
                  <h3>Higher Lead Conversion</h3>
                  <p>Qualify and nurture contacts automatically for higher conversions.</p>
                </div>
                <div className="wa-benefit-card wa-glass-card">
                  <div className="wa-benefit-icon" style={{ backgroundColor: "#fef3c7", color: "#d97706" }}>📂</div>
                  <h3>Reduced Manual Work</h3>
                  <p>Save up to 80% of agent time on routing and qualification calls.</p>
                </div>
              </div>

              {/* Right Column dashboard graphics */}
              <div className="wa-benefits-visual">
                <div className="wa-metrics-graph-title">Average Reply Latency</div>
                
                <div className="wa-graph-bars-wrapper">
                  <div className="wa-graph-bar-row">
                    <span className="wa-graph-lbl">Manual Email</span>
                    <div className="wa-graph-bar-outer">
                      <div className="wa-graph-bar-inner orange" style={{ width: "90%" }}></div>
                    </div>
                    <span className="wa-graph-val">4.5 Hrs</span>
                  </div>
                  <div className="wa-graph-bar-row">
                    <span className="wa-graph-lbl">Manual Chat</span>
                    <div className="wa-graph-bar-outer">
                      <div className="wa-graph-bar-inner orange" style={{ width: "65%" }}></div>
                    </div>
                    <span className="wa-graph-val">38 Mins</span>
                  </div>
                  <div className="wa-graph-bar-row">
                    <span className="wa-graph-lbl">TenX Auto API</span>
                    <div className="wa-graph-bar-outer">
                      <div className="wa-graph-bar-inner green" style={{ width: "8%" }}></div>
                    </div>
                    <span className="wa-graph-val">3 Secs</span>
                  </div>
                </div>

                <div className="wa-metrics-graph-title" style={{ marginTop: "40px" }}>Lead Conversion Lift</div>
                
                <div className="wa-graph-bars-wrapper">
                  <div className="wa-graph-bar-row">
                    <span className="wa-graph-lbl">Without Automation</span>
                    <div className="wa-graph-bar-outer">
                      <div className="wa-graph-bar-inner orange" style={{ width: "30%" }}></div>
                    </div>
                    <span className="wa-graph-val">3.2%</span>
                  </div>
                  <div className="wa-graph-bar-row">
                    <span className="wa-graph-lbl">With WhatsApp API</span>
                    <div className="wa-graph-bar-outer">
                      <div className="wa-graph-bar-inner green" style={{ width: "95%" }}></div>
                    </div>
                    <span className="wa-graph-val">9.6%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: USE CASES */}
        <section className="wa-section wa-section-light">
          <div className="wa-grid-content">
            <div className="wa-title-centered">
              <span className="eyebrow">USE CASES BY INDUSTRY</span>
              <h2>WhatsApp Automation Solutions for Every Industry</h2>
              <p>
                Discover how businesses across different industries use WhatsApp Automation Services to generate leads, automate customer communication, and improve conversions.
              </p>
            </div>

            <div className="wa-cases-wrapper">
              {/* Left Column Sidebar */}
              <div className="wa-cases-sidebar">
                {caseTabs.map((tab, idx) => (
                  <button 
                    key={idx} 
                    className={`wa-case-tab-btn ${activeCaseTab === idx ? "active" : ""}`}
                    onClick={() => setActiveCaseTab(idx)}
                  >
                    {tab.name}
                  </button>
                ))}
              </div>

              {/* Right Column Card content */}
              <div className="wa-case-detail-card wa-glass-card">
                <div className="wa-case-detail-text">
                  <h3>{caseTabs[activeCaseTab].title}</h3>
                  <p>{caseTabs[activeCaseTab].desc}</p>
                  
                  <h4>Key Workflow Capabilities:</h4>
                  <ul className="wa-case-detail-list">
                    {caseTabs[activeCaseTab].items.map((item, itemIdx) => (
                      <li key={itemIdx}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="wa-case-detail-visual">
                  <div className="wa-simulated-msg" style={{ background: "#fff" }}>
                    <span style={{ fontWeight: "700", display: "block", fontSize: "7px", color: "var(--wa-accent-blue)", marginBottom: "4px" }}>Industry Template Flow:</span>
                    <span>{activeCaseTab === 0 && "Hi {Name}! Tap below to confirm your marketing budget slot."}</span>
                    <span>{activeCaseTab === 1 && "Alert: You left items in your cart. Checkout now for 10% off: [Link]"}</span>
                    <span>{activeCaseTab === 2 && "Hi Patient, your medical reports are ready. Click below to download PDF: [Link]"}</span>
                    <span>{activeCaseTab === 3 && "Hi! View properties in your budget. Tap to download brochure: [Brochure Link]"}</span>
                    <span>{activeCaseTab === 4 && "Admission slots open! Check the MBA program syllabus details here: [Syllabus Link]"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: INTEGRATIONS */}
        <section className="wa-section wa-section-white">
          <div className="wa-grid-content">
            <div className="wa-title-centered">
              <span className="eyebrow">Seamless Connections</span>
              <h2>Works Seamlessly with Your Existing Tools</h2>
              <p>
                Integrate WhatsApp Business Automation with HubSpot, Zoho CRM, Salesforce, Shopify, Google Sheets, and 100+ business tools to automate communication and improve team productivity.
              </p>
            </div>

            <div className="wa-integrations-layout">
              {/* Left Column: Logos & Features */}
              <div className="wa-integrations-left">
                <span className="wa-int-badge">🔌 100+ POWERFUL INTEGRATIONS</span>
                
                <div className="wa-integrations-grid">
                  {integrationTools.map((tool, idx) => (
                    <div className="wa-integration-logo-card" key={idx}>
                      <div className="wa-int-logo-wrapper">
                        {tool.logo}
                      </div>
                      <h4>{tool.name}</h4>
                      <span className="wa-int-status">
                        Connected
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="wa-int-check">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </span>
                    </div>
                  ))}
                </div>

                {/* Features Row */}
                <div className="wa-integrations-features-grid">
                  <div className="wa-int-feat-card">
                    <div className="wa-int-feat-icon purple">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
                        <path d="M2 12h20"></path>
                      </svg>
                    </div>
                    <div className="wa-int-feat-text">
                      <h4>Easy Integration</h4>
                      <p>Connect in minutes with no complex setup.</p>
                    </div>
                  </div>
                  
                  <div className="wa-int-feat-card">
                    <div className="wa-int-feat-icon green">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                      </svg>
                    </div>
                    <div className="wa-int-feat-text">
                      <h4>Secure & Reliable</h4>
                      <p>Enterprise-grade security and 99.99% uptime.</p>
                    </div>
                  </div>

                  <div className="wa-int-feat-card">
                    <div className="wa-int-feat-icon orange">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"></path>
                      </svg>
                    </div>
                    <div className="wa-int-feat-text">
                      <h4>Real-time Sync</h4>
                      <p>Data flows instantly across all your platforms.</p>
                    </div>
                  </div>

                  <div className="wa-int-feat-card">
                    <div className="wa-int-feat-icon blue">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                      </svg>
                    </div>
                    <div className="wa-int-feat-text">
                      <h4>Scale Without Limits</h4>
                      <p>Built to handle millions of messages effortlessly.</p>
                    </div>
                  </div>
                </div>
              </div>


            </div>
          </div>
        </section>

        {/* SECTION 8: AUTOMATION TEMPLATES */}
        <section className="wa-section wa-section-light">
          <div className="wa-grid-content">
            <div className="wa-title-centered">
              <span className="eyebrow">READY-TO-USE AUTOMATION FLOWS</span>
              <h2>Pre-Built WhatsApp Automation Templates</h2>
              <p>
                Launch proven WhatsApp automation workflows for lead generation, customer support, appointment booking, sales, and follow-ups without building everything from scratch.
              </p>
            </div>

            <div className="wa-templates-carousel-wrapper">
              <button 
                className="wa-slider-arrow prev" 
                onClick={handlePrevTemplate} 
                disabled={activeTemplateIndex === 0}
                aria-label="Previous template"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>

              <div className="wa-templates-slider-container">
                <div 
                  className="wa-templates-slider" 
                  style={{ "--active-index": activeTemplateIndex }}
                >
                  {templates.map(tmpl => (
                    <div className="wa-template-slide-card wa-glass-card" key={tmpl.id}>
                      <span className="wa-cs-tag">{tmpl.header}</span>
                      <h3>{tmpl.name}</h3>
                      <div className="wa-template-chat-mockup">
                        <div className="wa-chat-bubble outgoing" style={{ fontSize: "9.5px", width: "100%", maxWidth: "100%" }}>
                          <span style={{ whiteSpace: "pre-line" }}>{tmpl.msg}</span>
                        </div>
                        <div className="wa-tmpl-buttons-row">
                          <div className="wa-tmpl-btn">🚀 Trigger Test Message</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button 
                className="wa-slider-arrow next" 
                onClick={handleNextTemplate} 
                disabled={activeTemplateIndex >= templates.length - visibleCards}
                aria-label="Next template"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>

            <div className="wa-slider-nav">
              {Array.from({ length: Math.max(1, templates.length - visibleCards + 1) }).map((_, idx) => (
                <button 
                  key={idx}
                  className={`wa-slider-dot ${activeTemplateIndex === idx ? "active" : ""}`} 
                  onClick={() => setActiveTemplateIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                ></button>
              ))}
            </div>
          </div>
        </section>


        {/* SECTION 10: SECURITY & COMPLIANCE */}
        <section className="wa-section wa-section-light">
          <div className="wa-grid-content">
            <div className="wa-title-centered">
              <span className="eyebrow">ENTERPRISE-GRADE SECURITY</span>
              <h2>Secure, Reliable & Compliant WhatsApp Automation</h2>
              <p>
                Protect customer conversations with enterprise-grade security, official WhatsApp Business API, encrypted messaging, and industry-standard compliance.
              </p>
            </div>

            <div className="wa-security-grid">
              {/* Left Column Security Cards */}
              <div className="wa-security-cards">
                <div className="wa-security-card wa-glass-card">
                  <div className="wa-sec-icon">🔒</div>
                  <h3>End-to-End Encryption</h3>
                  <p>Every customer conversation is securely encrypted to ensure complete privacy and data protection.</p>
                </div>
                <div className="wa-security-card wa-glass-card">
                  <div className="wa-sec-icon">🇪🇺</div>
                  <h3>GDPR & Data Privacy Compliance</h3>
                  <p>Customer information is handled securely using global privacy standards and consent-based messaging.</p>
                </div>
                <div className="wa-security-card wa-glass-card">
                  <div className="wa-sec-icon">☁</div>
                  <h3>99.9% Platform Uptime</h3>
                  <p>Experience reliable message delivery with enterprise cloud infrastructure and uninterrupted availability.</p>
                </div>
                <div className="wa-security-card wa-glass-card">
                  <div className="wa-sec-icon">🛡</div>
                  <h3>Official WhatsApp Business API</h3>
                  <p>Built using Meta's official WhatsApp Business API for secure messaging, verified accounts, and scalable automation.</p>
                </div>
              </div>

              {/* Right Column Shield graphic */}
              <div className="wa-security-visual">
                <div className="wa-security-shield-icon">✔</div>
                <h3>Enterprise-Level Security</h3>
                <p>Your customer data, conversations, and business communications remain protected through secure infrastructure, encrypted messaging, and trusted WhatsApp Business API technology.</p>
                <div className="wa-compliance-check">Official & Secure</div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 11 & 12 REMOVED */}

        {/* SECTION 12.5: PRICING */}
        <PricingTable 
          title="WhatsApp Automation Packages"
          subtitle="Automate customer communication, lead follow-ups, notifications, and support with scalable WhatsApp solutions."
          serviceName="WhatsApp Automation"
          serviceId="whatsapp-automation"
          packages={[
            { id: "basic", name: "Basic", price: "₹4,999", period: "/month" },
            { id: "growth", name: "Growth", price: "₹9,999", period: "/month", popular: true },
            { id: "premium", name: "Premium", price: "₹19,999+", period: "/month" }
          ]}
        />

        {/* SECTION 13: FAQ ACCORDION */}
        <section className="seo-section">
          <div className="ga-wrap">
            <div className="seo-grid">
              <div className="seo-faqs-col">
                <div className="sec-title">
                  <span className="eyebrow">FREQUENTLY ASKED QUESTIONS</span>
                  <h2>Frequently Asked Questions About WhatsApp Automation Services</h2>
                  <p>
                    Find answers to common questions about WhatsApp Business Automation, API integration, chatbots, CRM connectivity, pricing, and business automation.
                  </p>
                </div>

                <div className="seo-faq-accordion">
                  {faqs.map((faq, idx) => (
                    <div key={idx} className={`seo-faq-item ${openFaqIndex === idx ? "open" : ""}`}>
                      <button 
                        id={`faq-btn-${idx}`}
                        className="seo-faq-question-btn" 
                        onClick={() => toggleFaq(idx)}
                        aria-expanded={openFaqIndex === idx}
                        aria-controls={`faq-answer-${idx}`}
                      >
                        <span>{faq.q}</span>
                        <svg className="chevron-icon" width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                      <div 
                        id={`faq-answer-${idx}`}
                        className="seo-faq-answer"
                        role="region"
                        aria-labelledby={`faq-btn-${idx}`}
                      >
                        <p>{faq.a}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 14: FINAL CTA */}
        <section className="cta-section">
          <div className="cta-card-wrapper">
            <div className="cta-grid-bg"></div>
            <div className="cta-card-content">
              <h2>Ready to Grow Your Business with WhatsApp Automation?</h2>
              <p>
                Automate customer conversations, capture more leads, and improve response times with our WhatsApp Automation Services in Hyderabad. Let our experts build a solution tailored to your business.
              </p>
              <div className="cta-card-buttons">
                <button className="btn-primary" onClick={() => window.dispatchEvent(new CustomEvent("trigger-consultation-modal", { detail: { service: "WhatsApp Automation" } }))}>
                  📅 Get Free Consultation
                </button>
                <button className="btn-outline" onClick={() => openWhatsAppQuote("WhatsApp Automation – Live Demo")}>
                  ▶ Book A Live Demo
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

