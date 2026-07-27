"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { openWhatsAppQuote } from "@/lib/whatsappQuote";
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
    { name: "Lead Generation", title: "Automated Lead Capturing & Scoring", desc: "Capture cold traffic from search, social ads, and offline print media directly into a qualified WhatsApp database.", items: ["Custom greeting sequences", "Automated budget/sector screening", "Live dashboard notification alerts", "Immediate CRM contact updates"] },
    { name: "E-Commerce", title: "Cart Recovery & Order Notifications", desc: "Boost store checkouts and improve retention rates by re-engaging abandoned cart users directly on their mobile screens.", items: ["Automated abandoned cart coupons", "Live order dispatch alerts", "Interactive product catalog sheets", "Automated customer review requests"] },
    { name: "Healthcare", title: "Appointment Booking & Medical Reminders", desc: "Automate patient scheduling, reduce no-shows, and deliver test reports securely over WhatsApp.", items: ["Automated calendar slots booking", "Reports download PDFs delivery", "Pre-appointment prep guidelines", "Doctor availability checks"] },
    { name: "Real Estate", title: "Qualified Buyer Triage & Listings", desc: "Handle property queries, share catalog brochures, and qualify buyers automatically before agent visits.", items: ["Property catalog PDFs delivery", "Buyer budget & location screening", "Automated site visit scheduling", "New listings alerts broadcasting"] },
    { name: "Education", title: "Admissions Intake & Course Info", desc: "Nurture students, answer fee inquiries, and automate admission forms collections.", items: ["Course syllabus brochures sharing", "Fee schedule tables delivery", "Interview slots scheduling", "Documents upload collection"] }
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
    { q: "What is the WhatsApp Business API?", a: "The WhatsApp Business API is a developer platform designed for medium and large companies to automate conversations, connect CRM systems, and send bulk notification broadcasts at scale. It requires approval from Meta and utilizes authorized API servers." },
    { q: "How is it different from the standard WhatsApp Business App?", a: "The standard app is free for small local businesses, limited to 1 user or few connected devices, and does not support custom database CRM integrations, multi-agent chatbots, or automated broadcast campaigns. The API removes these limits and enables advanced workflow automation." },
    { q: "Do my messages need to be approved by Meta?", a: "Only business-initiated outbound template messages (like broadcasts, payment reminders, or shipping updates) require prior approval from Meta. Inbound replies or user-initiated conversations can be fully custom without template approval." },
    { q: "Can my phone number get blocked?", a: "By using the official Meta WhatsApp Business API and complying with Meta's guidelines (permission-based messaging, high-quality template updates), your number remains secure from blocks. We handle the entire compliance routing setup." },
    { q: "Can we integrate this with HubSpot or Zoho CRM?", a: "Yes, we integrate WhatsApp API flows directly with major CRMs (HubSpot, Zoho, Salesforce) and sheets. This allows your team to view chat histories and update lead status directly inside your CRM." },
    { q: "Can a human agent take over a chatbot conversation?", a: "Absolutely. Our triage systems are built for seamless agent handover. Whenever a user requests a human agent or answers a complex support query, the system instantly alerts your support team and assigns the chat to a live inbox." },
    { q: "Is there a limit to the number of broadcast messages we can send?", a: "Meta categorizes API accounts into messaging tiers starting at 1,000 unique customers per day, scaling up to 10,000, 100,000, and unlimited. The tier automatically upgrades based on message volume and quality scores." },
    { q: "Do you provide a custom team inbox dashboard?", a: "Yes, we build a multi-agent shared team inbox dashboard. This allows your sales, support, and billing teams to log in simultaneously, manage chats, assign tickets, and view analytics reports." },
    { q: "Can we automate appointment bookings?", a: "Yes, we integrate the API with scheduling engines (Google Calendar, Calendly). The chatbot checks real-time availability, displays slots, books appointments, and triggers follow-up reminders." },
    { q: "How do WhatsApp conversation charges work?", a: "Meta charges on a 24-hour conversation window basis. The pricing varies by region and category (Marketing, Utility, Authentication, Service). We will audit your usage and set up the most cost-efficient structure." },
    { q: "Can we send catalogs, images, and PDF proposals?", a: "Yes. The API supports rich media attachments including high-res product catalogs, images, PDF brochures, video guides, and interactive buttons." },
    { q: "Is the data secure and GDPR compliant?", a: "Yes. All conversations are end-to-end encrypted through Meta API routing. We follow secure customer database structures and permission-based opt-in flows to ensure compliance with GDPR and local data privacy laws." },
    { q: "Do you build custom chatbots using AI?", a: "Yes, we build custom AI chatbots powered by OpenAI's GPT models. We train the AI on your business database, FAQ lists, and product catalogs to provide highly accurate, human-like answers." },
    { q: "Can we integrate this with Shopify or WooCommerce?", a: "Yes, we integrate WhatsApp flows directly with Shopify and WooCommerce to trigger automated alerts for abandoned carts, order status updates, and tracking details." },
    { q: "How long does the setup process take?", a: "Setting up the API, getting Meta credentials approved, and launching basic greeting/routing flows typically takes 7 to 10 business days. Custom AI database chatbots require 2 to 3 weeks." },
    { q: "Do you assist in getting the green verified checkmark?", a: "Yes, we assist in submitting your business profile to Meta for verification. Meta reviews factors like brand authority, search index listings, and API usage history to grant the official green checkmark badge." },
    { q: "Can we set up automated payment reminders?", a: "Yes, the system can monitor unpaid invoice deadlines in your billing software and automatically broadcast reminders along with payment gateway links." },
    { q: "Can we run WhatsApp campaigns for festivals and promotions?", a: "Yes, you can broadcast promotional offers, coupon codes, and festival greetings to customers who have opted-in to receive updates." },
    { q: "What analytics metrics can we track?", a: "Our dashboard reports real-time statistics for message delivery rates, read rates, click-through rates, average customer response times, chatbot conversion rates, and agent metrics." },
    { q: "Do you offer monthly maintenance and optimization?", a: "Yes, we offer ongoing maintenance packages. We update template scripts, audit conversation charges to optimize costs, retrain AI chatbot models, and update CRM integrations monthly." }
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
                WhatsApp Automation Services in Hyderabad<br />
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
                <div className="wa-flow-icon-circle" style={{ backgroundColor: "#dcfce7", color: "#16a34a" }}>✔</div>
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
                  <div className="wa-why-card-icon" style={{ backgroundColor: "#fdf2f8", color: "#ec4899" }}>🎯</div>
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
                  <div className="wa-benefit-icon" style={{ backgroundColor: "#fdf2f8", color: "#ec4899" }}>📈</div>
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
              <span className="eyebrow">Industry Applications</span>
              <h2>Tailored Use Cases for Every Sector</h2>
              <p>
                Explore how different business categories utilize WhatsApp workflows to optimize lead qualification and updates.
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
                Our API integrations link WhatsApp directly with your sales, marketing, support, and billing apps.
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

              {/* Right Column: Central Hub */}
              <div className="wa-hub-card wa-glass-card">
                <div className="wa-hub-header">
                  <div className="wa-hub-header-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                  </div>
                  <div className="wa-hub-header-info">
                    <h3>Central Communication Hub</h3>
                    <p>One unified API connection routing WhatsApp to all your cloud software stacks.</p>
                  </div>
                </div>

                <div className="wa-hub-diagram-wrapper">
                  {/* Dynamic Dotted Lines using responsive percentage coordinates */}
                  <svg className="wa-hub-svg-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <line x1="50" y1="50" x2="50" y2="15" stroke="rgba(16, 185, 129, 0.2)" strokeWidth="0.6" strokeDasharray="1.5 1.5" />
                    <line x1="50" y1="50" x2="82" y2="30" stroke="rgba(16, 185, 129, 0.2)" strokeWidth="0.6" strokeDasharray="1.5 1.5" />
                    <line x1="50" y1="50" x2="82" y2="70" stroke="rgba(16, 185, 129, 0.2)" strokeWidth="0.6" strokeDasharray="1.5 1.5" />
                    <line x1="50" y1="50" x2="50" y2="85" stroke="rgba(16, 185, 129, 0.2)" strokeWidth="0.6" strokeDasharray="1.5 1.5" />
                    <line x1="50" y1="50" x2="18" y2="70" stroke="rgba(16, 185, 129, 0.2)" strokeWidth="0.6" strokeDasharray="1.5 1.5" />
                    <line x1="50" y1="50" x2="18" y2="30" stroke="rgba(16, 185, 129, 0.2)" strokeWidth="0.6" strokeDasharray="1.5 1.5" />
                  </svg>

                  {/* Center Node: WhatsApp */}
                  <div className="wa-hub-node-center">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="30" height="30">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.632 3.977 14.159 2.95 11.53 2.95c-5.439 0-9.863 4.372-9.867 9.802-.001 1.73.457 3.415 1.328 4.922l-1.02 3.722 3.821-.99c1.5.82 3.03 1.25 4.54 1.25zM17.5 13.9c-.3-.15-1.78-.88-2.06-.98-.28-.1-.49-.15-.69.15-.2.3-.77.98-.95 1.18-.18.2-.36.23-.66.08-.3-.15-1.27-.47-2.42-1.5-1-.89-1.67-2-1.87-2.35-.2-.3-.02-.47.13-.62.14-.13.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.07-.15-.69-1.65-.95-2.27-.25-.62-.53-.53-.73-.54-.19-.01-.41-.01-.63-.01-.22 0-.58.08-.88.4-.3.32-1.15 1.12-1.15 2.73s1.17 3.16 1.33 3.38c.16.22 2.3 3.52 5.58 4.94.78.34 1.39.54 1.86.69.78.25 1.5.21 2.06.13.62-.09 1.78-.73 2.03-1.43.25-.7.25-1.29.17-1.43-.08-.14-.28-.23-.58-.38z"/>
                    </svg>
                  </div>

                  {/* Outer Nodes */}
                  <div className="wa-hub-node node-crm">
                    <span className="wa-node-label">CRM</span>
                    <div className="wa-node-icon purple">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                      </svg>
                    </div>
                  </div>

                  <div className="wa-hub-node node-marketing">
                    <div className="wa-node-icon orange">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                      </svg>
                    </div>
                    <span className="wa-node-label">Marketing</span>
                  </div>

                  <div className="wa-hub-node node-support">
                    <div className="wa-node-icon blue">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
                        <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
                      </svg>
                    </div>
                    <span className="wa-node-label">Support</span>
                  </div>

                  <div className="wa-hub-node node-billing">
                    <div className="wa-node-icon purple">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <rect x="2" y="5" width="20" height="14" rx="2" ry="2"></rect>
                        <line x1="2" y1="10" x2="22" y2="10"></line>
                      </svg>
                    </div>
                    <span className="wa-node-label">Billing</span>
                  </div>

                  <div className="wa-hub-node node-analytics">
                    <span className="wa-node-label">Analytics</span>
                    <div className="wa-node-icon green">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="18" y1="20" x2="18" y2="10"></line>
                        <line x1="12" y1="20" x2="12" y2="4"></line>
                        <line x1="6" y1="20" x2="6" y2="14"></line>
                      </svg>
                    </div>
                  </div>

                  <div className="wa-hub-node node-automation">
                    <span className="wa-node-label">Automation</span>
                    <div className="wa-node-icon orange">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <circle cx="12" cy="12" r="3"></circle>
                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Footer Trusted by */}
                <div className="wa-hub-trust-footer">
                  <div className="wa-hub-trust-text">
                    <span className="wa-hub-check-badge">✔</span>
                    <span>Trusted by 500+ businesses worldwide</span>
                  </div>
                  <div className="wa-hub-avatars">
                    <div className="wa-avatar-circle a1"></div>
                    <div className="wa-avatar-circle a2"></div>
                    <div className="wa-avatar-circle a3"></div>
                    <div className="wa-avatar-circle a4"></div>
                    <div className="wa-avatar-plus">+500</div>
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
              <span className="eyebrow">Ready-to-Use Solutions</span>
              <h2>Pre-configured Conversation Templates</h2>
              <p>
                Swipe through our pre-built notification sequences designed for instant customer engagement.
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
              <span className="eyebrow">Enterprise Security</span>
              <h2>Security & Compliance parameters</h2>
              <p>
                All message routing and contact data integrations follow global security guidelines.
              </p>
            </div>

            <div className="wa-security-grid">
              {/* Left Column Security Cards */}
              <div className="wa-security-cards">
                <div className="wa-security-card wa-glass-card">
                  <div className="wa-sec-icon">🔒</div>
                  <h3>End-to-End Encryption</h3>
                  <p>All message data routed through the official Meta API utilizes strict encryption.</p>
                </div>
                <div className="wa-security-card wa-glass-card">
                  <div className="wa-sec-icon">🇪🇺</div>
                  <h3>GDPR Compliant</h3>
                  <p>Permission-based opt-in templates protect client contact database information.</p>
                </div>
                <div className="wa-security-card wa-glass-card">
                  <div className="wa-sec-icon">☁</div>
                  <h3>99.9% Server Uptime</h3>
                  <p>Hosted on highly redundant cloud networks to guarantee round-the-clock message delivery.</p>
                </div>
                <div className="wa-security-card wa-glass-card">
                  <div className="wa-sec-icon">🛡</div>
                  <h3>Official API Verified</h3>
                  <p>Official WhatsApp Business profiles prevent spam filtering or block risks.</p>
                </div>
              </div>

              {/* Right Column Shield graphic */}
              <div className="wa-security-visual">
                <div className="wa-security-shield-icon">✔</div>
                <h3>Enterprise Security Certified</h3>
                <p>Your database and marketing contacts are fully protected.</p>
                <div className="wa-compliance-check">GDPR compliant</div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 11 & 12 REMOVED */}

        {/* SECTION 13: FAQ ACCORDION */}
        <section className="seo-section">
          <div className="ga-wrap">
            <div className="seo-grid">
              <div className="seo-faqs-col">
                <div className="sec-title">
                  <span className="eyebrow">Got Questions?</span>
                  <h2>Frequently Asked Inquiries About WhatsApp API</h2>
                  <p>
                    Find comprehensive answers to setup requirements, message costs, and CRM connections.
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
              <h2>Ready to Automate Your Customer Communication?</h2>
              <p>
                Transform customer engagement with intelligent WhatsApp automation that saves time, increases conversions, and scales your business.
              </p>
              <div className="cta-card-buttons">
                <button className="btn-primary" onClick={() => window.dispatchEvent(new CustomEvent("trigger-consultation-modal", { detail: { service: "WhatsApp Automation" } }))}>
                  📅 Book Free Consultation
                </button>
                <button className="btn-outline" onClick={() => openWhatsAppQuote("WhatsApp Automation – Live Demo")}>
                  ▶ Schedule Live Demo
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
