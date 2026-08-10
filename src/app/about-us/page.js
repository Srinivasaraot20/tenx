"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import "./about.css";

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

export default function AboutUsPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const toggleFaq = (idx) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  const coreValues = [
    { title: "💡 Innovation First", desc: "We embrace innovation, AI-powered technology, and evolving digital trends to create smarter marketing strategies that help businesses stay ahead of the competition." },
    { title: "🔍 Complete Transparency", desc: "We believe in honest communication, clear reporting, and measurable performance. Every campaign comes with complete visibility, so you always know how your marketing investment is performing." },
    { title: "🤝 Integrity & Trust", desc: "We build long-term relationships through honesty, accountability, and ethical marketing practices. Your business goals become our priority from day one." },
    { title: "📈 Results That Matter", desc: "We focus on meaningful business outcomes, including qualified leads, higher conversions, increased revenue, and sustainable long-term growth." },
    { title: "🎯 Customer-Centric Approach", desc: "Every business is unique. We create customized digital marketing strategies based on your goals, target audience, and industry to maximize your return on investment." },
    { title: "🌱 Continuous Growth", desc: "Digital marketing evolves every day, and so do we. Through continuous learning, optimization, and innovation, we help businesses adapt, grow, and achieve lasting success." }
  ];

  const whyChooseUs = [
    { title: "Data-Driven Strategies", desc: "Every marketing decision is backed by research, analytics, and performance insights to help your business achieve measurable growth and maximize ROI." },
    { title: "AI-Powered Marketing", desc: "We leverage AI tools and automation to optimize campaigns, improve efficiency, and deliver smarter digital marketing solutions." },
    { title: "Experienced Digital Experts", desc: "Our team of SEO specialists, Google Ads experts, web developers, and social media marketers work together to deliver results that matter." },
    { title: "Transparent Communication", desc: "We believe in complete transparency with clear reporting, regular updates, and measurable campaign performance at every stage." },
    { title: "Customized Growth Solutions", desc: "Every business is unique. We create tailored digital marketing strategies based on your goals, industry, and target audience." },
    { title: "Results-Focused Approach", desc: "We focus on generating qualified leads, increasing conversions, improving brand visibility, and driving long-term business growth." }
  ];

  const expertise = [
    { title: "Search Engine Optimization (SEO)", desc: "Improve your search rankings, increase organic traffic, and attract customers actively searching for your products and services." },
    { title: "Google Ads Management", desc: "Drive qualified leads and maximize ROI with data-driven Google Ads campaigns tailored to your business goals." },
    { title: "Social Media Marketing", desc: "Build brand awareness, engage your audience, and generate high-quality leads through strategic social media marketing." },
    { title: "Website Design & Development", desc: "Create fast, responsive, and user-friendly websites that deliver exceptional user experiences and higher conversions." },
    { title: "AI-Powered Marketing Solutions", desc: "Leverage AI tools and automation to streamline marketing processes, improve efficiency, and accelerate business growth." },
    { title: "Branding & Creative Design", desc: "Strengthen your brand identity with creative designs, compelling visuals, and consistent brand messaging across digital platforms." }
  ];

  const team = [
    { title: "Collaborative Teamwork", desc: "We work together to create customized digital marketing strategies that align with your business goals." },
    { title: "Strategic Planning", desc: "Every successful campaign begins with in-depth research, market analysis, and a clear growth strategy." },
    { title: "Creative Innovation", desc: "Our team combines creativity with technology to develop engaging campaigns that strengthen your brand." },
    { title: "AI & Digital Innovation", desc: "We leverage AI-powered tools and automation to improve efficiency, campaign performance, and customer engagement." },
    { title: "Client Success", desc: "Your success is our success. We build long-term partnerships focused on measurable business growth and lasting results." },
    { title: "Continuous Learning", desc: "Digital marketing evolves every day, and our team continuously learns, adapts, and innovates to keep your business ahead of the competition." }
  ];

  const faqs = [
    { q: "Why choose Digital Marketing TenX?", a: "Digital Marketing TenX is a trusted digital marketing company in Hyderabad offering SEO, Google Ads, social media marketing, website development, and AI-powered marketing solutions. We create customized strategies that help businesses generate qualified leads, improve online visibility, and achieve measurable growth." },
    { q: "What digital marketing services do you offer?", a: "We provide SEO, Google Ads (PPC), social media marketing, website design and development, WordPress development, e-commerce solutions, performance marketing, content marketing, branding, and AI-powered digital marketing services." },
    { q: "Do you work with startups and small businesses?", a: "Yes. We work with startups, small businesses, SMEs, and established enterprises across various industries by creating customized digital marketing strategies based on their goals and budget." },
    { q: "How do you measure the success of a campaign?", a: "We track key performance indicators (KPIs) such as website traffic, keyword rankings, lead generation, conversion rates, return on investment (ROI), and customer engagement to ensure every campaign delivers measurable results." },
    { q: "What makes Digital Marketing TenX different from other agencies?", a: "Our team combines industry expertise, AI-powered tools, data-driven strategies, transparent reporting, and continuous optimization to deliver sustainable business growth instead of focusing only on vanity metrics." },
    { q: "How can I get started with Digital Marketing TenX?", a: "Simply contact our team for a free consultation. We'll understand your business goals, analyze your current digital presence, and recommend a customized digital marketing strategy tailored to your needs." }
  ];

  return (
    <>
      <Header />
      <main className="about-main">
        {/* 1. Hero Section */}
        <section className="about-hero-new">
          <div className="about-hero-container">
            <div className="about-hero-left">
              <h2 className="about-hero-title">Top Digital Marketing Company in Hyderabad Driving Real <span style={{color: "#ff5722"}}>Growth.</span></h2>
              <p className="hero-desc">
                Digital Marketing TenX is a top digital marketing company in Hyderabad, helping businesses grow through SEO, Google Ads, social media marketing, web development, and AI-powered digital strategies. We combine data, creativity, and technology to drive measurable growth and long-term business success.
              </p>
              

              

              <p className="hero-objective">
                Every campaign is built around measurable business objectives, ensuring transparency, continuous optimization, and sustainable digital growth.
              </p>

              <div className="hero-cta-group">
                <Link href="/contact" className="btn-primary">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: "8px"}}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  Book Free Consultation
                </Link>
                <Link href="/services" className="btn-outline" style={{borderColor: "#ff5722", color: "#ff5722"}}>
                  Explore Services
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginLeft: "8px"}}><polyline points="9 18 15 12 9 6"/></svg>
                </Link>
              </div>
            </div>

            <div className="about-hero-right">
              <div className="hero-3d-graphic">
                
                <div className="chart-container-3d">
                  <div className="chart-bar-3d bar-1"></div>
                  <div className="chart-bar-3d bar-2"></div>
                  <div className="chart-bar-3d bar-3"></div>
                  <div className="chart-bar-3d bar-4"></div>
                  <div className="chart-bar-3d bar-5 orange"></div>
                  
                  <svg className="trend-arrow" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M15,80 Q50,65 85,25" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
                    <polygon points="80,18 90,20 86,28" fill="white" />
                  </svg>
                </div>


                <div className="graphic-footer-icons">
                  <div className="dashed-line"></div>
                  <div className="gf-icon-wrap">
                     <div className="gf-icon-circle"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1d4ed8" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></div>
                     <span>SEO</span>
                  </div>
                  <div className="gf-icon-wrap">
                     <div className="gf-icon-circle"><Image src="/google-ads.webp" alt="Ads" width={24} height={24} /></div>
                     <span>Google Ads</span>
                  </div>
                  <div className="gf-icon-wrap">
                     <div className="gf-icon-circle"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2.5"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg></div>
                     <span>Social Media</span>
                  </div>
                  <div className="gf-icon-wrap">
                     <div className="gf-icon-circle"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1d4ed8" strokeWidth="2.5"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg></div>
                     <span>Web Development</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Trusted / Results Focused */}
        <section className="about-approach">
          <div className="sec-header">
            <span className="eyebrow">TRUSTED BY GROWING BUSINESSES</span>
            <h2>Results-Focused Approach</h2>
            <p>Data-driven strategies built around your business goals. Helping businesses build stronger digital presence and achieve measurable growth.</p>
          </div>
          <div className="approach-grid" style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px", maxWidth: "1200px", margin: "0 auto", padding: "0 20px"}}>
            <div className="approach-card" style={{padding: "24px", background: "#f8fafc", borderRadius: "14px", border: "1px solid #eee"}}>
              <h3 style={{fontSize: "1.2rem", fontWeight: "700", marginBottom: "10px", color: "#0f172a"}}>Full-Funnel Marketing</h3>
              <p style={{color: "#475569", fontSize: "0.95rem"}}>From awareness to conversion, we build strategies for every stage of your customer journey.</p>
            </div>
            <div className="approach-card" style={{padding: "24px", background: "#f8fafc", borderRadius: "14px", border: "1px solid #eee"}}>
              <h3 style={{fontSize: "1.2rem", fontWeight: "700", marginBottom: "10px", color: "#0f172a"}}>AI-Powered Efficiency</h3>
              <p style={{color: "#475569", fontSize: "0.95rem"}}>We use AI and automation to improve speed, insights, and marketing performance.</p>
            </div>
            <div className="approach-card" style={{padding: "24px", background: "#f8fafc", borderRadius: "14px", border: "1px solid #eee"}}>
              <h3 style={{fontSize: "1.2rem", fontWeight: "700", marginBottom: "10px", color: "#0f172a"}}>Transparent Communication</h3>
              <p style={{color: "#475569", fontSize: "0.95rem"}}>Clear updates, honest reporting, and complete visibility into your campaigns.</p>
            </div>
            <div className="approach-card" style={{padding: "24px", background: "#f8fafc", borderRadius: "14px", border: "1px solid #eee"}}>
              <h3 style={{fontSize: "1.2rem", fontWeight: "700", marginBottom: "10px", color: "#0f172a"}}>Long-Term Growth</h3>
              <p style={{color: "#475569", fontSize: "0.95rem"}}>We focus on sustainable strategies that create lasting business growth.</p>
            </div>
          </div>
        </section>

        {/* 3. Our Story */}
        <section className="about-story" style={{padding: "var(--space-fluid-section-py) var(--space-fluid-section-px)", background: "#fff"}}>
          <div className="sec-title-centered" style={{ maxWidth: "800px", margin: "0 auto 40px", textAlign: "center" }}>
            <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: "900", color: "#0f172a", letterSpacing: "-1px" }}>About Digital Marketing TenX</h1>
          </div>
          <div className="story-container" style={{maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "60px", alignItems: "center"}}>
            <div className="story-image-wrap" style={{position: "relative", width: "100%", borderRadius: "24px", overflow: "hidden"}}>
              <Image 
                src="/marketing.webp" 
                alt="Digital Marketing Agency" 
                width={600} 
                height={500} 
                style={{width: "100%", height: "auto", objectFit: "contain", borderRadius: "24px"}} 
              />
            </div>
            <div className="story-content">
              <h2 style={{ fontSize: "clamp(1.1rem, 2vw, 1.4rem)", fontWeight: "bold", color: "#0f172a", marginBottom: "20px", lineHeight: "1.2", whiteSpace: "nowrap" }}>Our Story — A Performance Marketing Agency</h2>
              <p style={{color: "#475569", fontSize: "1.05rem", lineHeight: "1.7", marginBottom: "16px"}}>
                Digital Marketing TenX was founded in 2021 with a clear vision, to help businesses achieve sustainable growth through data-driven digital marketing. As a top digital marketing company in Hyderabad, we focus on strategies that generate qualified leads, increase brand visibility, and deliver measurable business results.
              </p>
              <p style={{color: "#475569", fontSize: "1.05rem", lineHeight: "1.7", marginBottom: "16px"}}>
                Our team of digital marketing experts specializes in SEO, Google Ads, social media marketing, website development, performance marketing, and AI-powered solutions. Every strategy is tailored to your business goals, ensuring maximum ROI and long-term success.
              </p>
              <p style={{color: "#475569", fontSize: "1.05rem", lineHeight: "1.7"}}>
                Today, we proudly partner with startups, SMEs, and established brands across various industries, helping them build a stronger online presence and stay ahead in the ever-evolving digital landscape through innovative and results-driven marketing solutions.
              </p>
            </div>
          </div>
        </section>

        {/* 4. Mission & Vision */}
        <section className="about-mission" style={{padding: "var(--space-fluid-section-py) var(--space-fluid-section-px)", background: "#f8fafc"}}>
          <div className="mission-vision-grid" style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "40px", maxWidth: "1000px", margin: "0 auto"}}>
            <div className="mv-card" style={{padding: "40px", background: "#fff", borderRadius: "14px", boxShadow: "0 4px 12px rgba(0,0,0,0.02)"}}>
              <h3 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: "800", color: "#0f172a", marginBottom: "16px" }}>Our Mission</h3>
              <p style={{color: "#475569", fontSize: "1.05rem", lineHeight: "1.7"}}>
                Our mission is to help businesses of all sizes achieve sustainable growth through innovative digital marketing strategies. We deliver data-driven SEO, Google Ads, social media marketing, website development, and AI-powered solutions that increase online visibility, generate quality leads, and maximize return on investment (ROI).
              </p>
            </div>
            <div className="mv-card" style={{padding: "40px", background: "#fff", borderRadius: "14px", boxShadow: "0 4px 12px rgba(0,0,0,0.02)"}}>
              <h3 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: "800", color: "#0f172a", marginBottom: "16px" }}>Our Vision</h3>
              <p style={{color: "#475569", fontSize: "1.05rem", lineHeight: "1.7"}}>
                Our vision is to become one of the top digital marketing companies in Hyderabad, empowering businesses with innovative technology, transparent partnerships, and performance-driven marketing solutions. We strive to help brands build a strong digital presence, stay ahead of the competition, and achieve long-term success in the evolving digital landscape.
              </p>
            </div>
          </div>
        </section>

        {/* 5. Core Values */}
        <section className="about-values" style={{padding: "var(--space-fluid-section-py) var(--space-fluid-section-px)", background: "#fff"}}>
          <div className="sec-header">
            <span className="eyebrow">OUR CORE VALUES</span>
            <h2>The Values That Drive Our Success</h2>
            <p style={{ maxWidth: "850px", margin: "0 auto", lineHeight: "1.8", color: "#475569", fontSize: "1.1rem" }}>
              At Digital Marketing TenX, our core values drive every strategy and client partnership. We combine <strong>innovation, transparency, and integrity</strong> to deliver measurable results. These principles empower us to create digital solutions for <strong>sustainable business growth.</strong>
            </p>
          </div>
          <div className="values-grid" style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px", maxWidth: "1200px", margin: "0 auto"}}>
            {coreValues.map((cv, idx) => (
              <div key={idx} className="value-card" style={{padding: "32px", background: "#f8fafc", borderRadius: "14px", border: "1px solid #eee"}}>
                <h3 style={{fontSize: "1.25rem", fontWeight: "800", color: "#0f172a", marginBottom: "12px"}}>{cv.title}</h3>
                <p style={{color: "#475569", fontSize: "1rem", lineHeight: "1.6"}}>{cv.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Why Choose Us (Premium White Theme) */}
        <section className="about-why-choose" style={{padding: "var(--space-fluid-section-py) var(--space-fluid-section-px)", background: "#fff", color: "#0f172a"}}>
          <div className="why-choose-container" style={{maxWidth: "1200px", margin: "0 auto"}}>
            
            <div className="sec-title-centered" style={{textAlign: "center", maxWidth: "1000px", margin: "0 auto 50px"}}>
              <span className="eyebrow" style={{ display: "inline-block", marginBottom: "16px" }}>WHY CHOOSE US</span>
              <h2 style={{ marginBottom: "20px" }}>Why Businesses Choose Digital Marketing TenX</h2>
              <p style={{color: "#475569", fontSize: "1.1rem", lineHeight: "1.7", margin: "0 auto"}}>
                Businesses choose Digital Marketing TenX because we combine <strong>strategy, creativity, technology, and data</strong> to deliver measurable results. As a trusted digital marketing company in Hyderabad, we create customized marketing solutions that help businesses <strong>increase visibility, generate qualified leads, and achieve sustainable long-term growth.</strong>
              </p>
            </div>



            <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "50px", alignItems: "start"}}>
              <div className="why-choose-left">
                <div className="why-list-grid" style={{display: "grid", gridTemplateColumns: "1fr", gap: "16px"}}>
                {whyChooseUs.map((item, idx) => {
                  const icons = ["📊", "🤖", "👨‍💻", "🔍", "⚙️", "📈"];
                  return (
                    <div key={idx} className="why-item" style={{
                      background: "#fff", 
                      padding: "24px", 
                      borderRadius: "14px", 
                      border: "1px solid #eee",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.02)",
                      display: "flex",
                      gap: "16px",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      cursor: "pointer"
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.08)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.03)'; }}
                    >
                      <div className="why-icon" style={{
                        width: "48px", height: "48px", borderRadius: "14px", background: "rgba(59,130,246,0.05)", 
                        display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", flexShrink: 0
                      }}>
                        {icons[idx]}
                      </div>
                      <div>
                        <h3 style={{fontSize: "1.15rem", fontWeight: "700", color: "#0f172a", marginBottom: "6px"}}>{item.title}</h3>
                        <p style={{color: "#64748b", fontSize: "0.95rem", lineHeight: "1.5", margin: 0}}>{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="why-choose-right" style={{position: "sticky", top: "100px", display: "flex", flexDirection: "column", gap: "24px"}}>
              {/* Trust Box Redesign */}
              <div className="trust-box" style={{
                background: "#f8fafc", 
                padding: "40px", 
                borderRadius: "24px", 
                border: "1px solid #eee",
                boxShadow: "0 20px 40px -10px rgba(0,0,0,0.05)",
                position: "relative",
                overflow: "hidden"
              }}>
                <div style={{position: "absolute", top: "-50px", right: "-50px", width: "150px", height: "150px", background: "rgba(255,107,0,0.1)", filter: "blur(40px)", borderRadius: "50%", zIndex: 0}}></div>
                <div style={{position: "absolute", bottom: "-50px", left: "-50px", width: "150px", height: "150px", background: "rgba(59,130,246,0.1)", filter: "blur(40px)", borderRadius: "50%", zIndex: 0}}></div>
                
                <h3 style={{fontSize: "1.5rem", fontWeight: "800", marginBottom: "24px", color: "#0f172a", position: "relative", zIndex: 1}}>
                  Why Businesses Trust Us
                </h3>
                
                <ul style={{listStyle: "none", padding: "0", margin: "0 0 32px 0", position: "relative", zIndex: 1}}>
                  {['Client-First Approach', 'Tailored Marketing Strategies', 'AI-Driven Innovation', 'Experienced Digital Marketing Team', 'Transparent Communication', 'Long-Term Growth Partnership'].map((item, i) => (
                    <li key={i} style={{marginBottom: "16px", fontSize: "1.05rem", display: "flex", alignItems: "center", gap: "12px", color: "#475569", fontWeight: "500"}}>
                      <span style={{display: "flex", alignItems: "center", justifyContent: "center", width: "24px", height: "24px", background: "#dbeafe", color: "#2563eb", borderRadius: "50%", fontSize: "0.8rem", flexShrink: 0}}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                
                <hr style={{borderColor: "#e2e8f0", margin: "32px 0", position: "relative", zIndex: 1}} />
                
                <h3 style={{fontSize: "1.3rem", fontWeight: "800", marginBottom: "20px", color: "#0f172a", position: "relative", zIndex: 1}}>
                  Our Commitment to Excellence
                </h3>
                
                <ul style={{listStyle: "none", padding: "0", margin: "0", position: "relative", zIndex: 1}}>
                  {['Quality-Driven Solutions', 'Honest & Transparent Reporting', 'Continuous Learning & Innovation', 'Customer-Centric Approach', 'Ethical Digital Marketing Practices', 'Performance-Focused Execution'].map((item, i) => (
                    <li key={i} style={{marginBottom: "16px", fontSize: "1.05rem", display: "flex", alignItems: "center", gap: "12px", color: "#475569", fontWeight: "500"}}>
                      <span style={{display: "flex", alignItems: "center", justifyContent: "center", width: "24px", height: "24px", background: "#ffedd5", color: "#ea580c", borderRadius: "50%", fontSize: "0.8rem", flexShrink: 0}}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
          </div>
        </section>

        {/* 7. Our Expertise */}
        <section className="about-expertise" style={{padding: "var(--space-fluid-section-py) var(--space-fluid-section-px)", background: "#f8fafc"}}>
          <div className="sec-header">
            <span className="eyebrow">OUR EXPERTISE</span>
            <h2>Our Digital Marketing Expertise</h2>
            <p style={{ maxWidth: "900px", margin: "0 auto", color: "#475569", fontSize: "1.1rem", lineHeight: "1.7" }}>
              We combine <strong>strategy, creativity, technology, and data</strong> to deliver comprehensive digital marketing solutions that help businesses <strong>increase visibility, generate qualified leads, and achieve sustainable growth.</strong>
            </p>
          </div>
          <div className="expertise-grid" style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px", maxWidth: "1200px", margin: "0 auto"}}>
            {expertise.map((exp, idx) => (
              <div key={idx} className="expertise-card" style={{padding: "32px", background: "#fff", borderRadius: "14px", boxShadow: "0 4px 12px rgba(0,0,0,0.02)"}}>
                <h3 style={{fontSize: "1.25rem", fontWeight: "800", color: "#0f172a", marginBottom: "12px"}}>{exp.title}</h3>
                <p style={{color: "#475569", fontSize: "1rem", lineHeight: "1.6"}}>{exp.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 8. Our Team & Culture */}
        <section className="about-team" style={{padding: "var(--space-fluid-section-py) var(--space-fluid-section-px)", background: "#fff"}}>
          <div className="sec-header">
            <span className="eyebrow">OUR TEAM & CULTURE</span>
            <h2>The People Behind Your Digital Success</h2>
            <p style={{ maxWidth: "950px", margin: "0 auto", color: "#475569", fontSize: "1.1rem", lineHeight: "1.7" }}>
              At Digital Marketing TenX, our strength lies in <strong>our people</strong>. Our team of digital marketing strategists, SEO specialists, Google Ads experts, web developers, designers, and content creators work together to deliver <strong>innovative solutions that help businesses achieve sustainable growth.</strong>
            </p>
          </div>
          <div className="team-grid" style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px", maxWidth: "1200px", margin: "0 auto"}}>
            {team.map((t, idx) => (
              <div key={idx} className="team-card" style={{padding: "32px", background: "#f8fafc", borderRadius: "14px", border: "1px solid #eee"}}>
                <h3 style={{fontSize: "1.25rem", fontWeight: "800", color: "#0f172a", marginBottom: "12px"}}>{t.title}</h3>
                <p style={{color: "#475569", fontSize: "1rem", lineHeight: "1.6"}}>{t.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 9. Founder Message */}
        <section className="about-founder" style={{padding: "var(--space-fluid-section-py) var(--space-fluid-section-px)", background: "#fff"}}>
          <div className="founder-container" style={{maxWidth: "800px", margin: "0 auto"}}>
            <div className="sec-header">
              <span className="eyebrow">OUR FOUNDER</span>
              <h2>A Message From Our Founder</h2>
            </div>
            
            <div className="founder-message" style={{color: "#475569", fontSize: "1.1rem", lineHeight: "1.8"}}>
              <p style={{marginBottom: "20px"}}>
                At Digital Marketing TenX, we started with one simple goal, to help businesses grow through honest, transparent, and result-driven digital marketing. From day one, our focus has never been just on increasing website traffic or running campaigns. Our mission has always been to create strategies that generate real business growth, qualified leads, and long-term success.
              </p>
              <p style={{marginBottom: "20px"}}>
                As the digital landscape continues to evolve, and with <a href="https://www.hubspot.com/marketing-statistics" target="_blank" rel="noopener noreferrer" style={{color: "#ff5722", textDecoration: "underline", fontWeight: "600"}}>industry statistics</a> showing that generating traffic and leads is the top challenge for marketers, we embrace innovation, data-driven decision-making, and AI-powered solutions to deliver measurable results for every client. We believe every business is unique, which is why we take the time to understand your goals before building customized marketing strategies.
              </p>
              <p style={{marginBottom: "20px"}}>
                Our greatest achievement is the trust our clients place in us. Every project we undertake is treated as a long-term partnership built on transparency, accountability, and continuous improvement.
              </p>
              <p style={{marginBottom: "32px"}}>
                Thank you for considering Digital Marketing TenX as your digital growth partner. We look forward to helping your business achieve sustainable success in today's competitive digital world.
              </p>
              
              <div style={{ marginTop: "24px" }}>
                <h4 style={{fontSize: "1.25rem", fontWeight: "800", color: "#0f172a", marginBottom: "4px"}}>Anil Kumar</h4>
                <p style={{fontSize: "0.95rem", color: "#64748b", margin: 0}}>Founder, Digital Marketing TenX</p>
              </div>
            </div>
          </div>
        </section>

        {/* 10. FAQs */}
        <section className="about-faqs" style={{padding: "var(--space-fluid-section-py) var(--space-fluid-section-px)", background: "#fff"}}>
          <div className="sec-header">
            <span className="eyebrow">FREQUENTLY ASKED QUESTIONS</span>
            <h2>Frequently Asked Questions About Digital Marketing Services</h2>
            <p style={{color: "#475569", fontSize: "1.05rem", lineHeight: "1.7"}}>
              Find answers to the most common questions about Digital Marketing TenX, our digital marketing services, and how we help businesses achieve sustainable online growth.
            </p>
          </div>
          <div className="seo-faq-accordion" style={{maxWidth: "800px", margin: "0 auto"}}>
            {faqs.map((faq, idx) => (
              <div key={idx} className={`seo-faq-item ${openFaqIndex === idx ? "open" : ""}`}>
                <button 
                  id={`faq-btn-${idx}`}
                  className="seo-faq-question-btn" 
                  onClick={() => toggleFaq(idx)}
                  aria-expanded={openFaqIndex === idx}
                  aria-controls={`faq-answer-${idx}`}
                >
                  <h3 style={{ fontSize: "inherit", fontWeight: "inherit", margin: 0, padding: 0 }}>{faq.q}</h3>
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
        </section>

        {/* 11. Final CTA */}
        <section className="cta-section">
          <div className="cta-card-wrapper">
            <div className="cta-grid-bg"></div>
            <div className="cta-card-content">
              <h2>Ready to Grow Your Business Online?</h2>
              <p>
                Partner with Digital Marketing TenX and let our experienced team help you increase visibility, generate qualified leads, and achieve sustainable business growth with customized digital marketing solutions.
              </p>
              <div className="cta-card-buttons">
                <Link href="/contact" className="btn-primary">
                  Get Free Consultation
                </Link>
                <Link href="/contact" className="btn-outline">
                  Contact Our Team
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}

