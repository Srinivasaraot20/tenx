<<<<<<< HEAD
import React from "react";
import Link from "next/link";

export default function DigitalGrowthFramework() {
  const steps = [
    {
      num: "01",
      title: "Strategy",
      subtitle: "Start With a Clear Direction",
      desc: "We understand your business, target audience, competitors, and growth objectives to create a digital marketing strategy tailored to your goals.",
      bg: "#fff5ee",
      color: "#a13c00"
    },
    {
      num: "02",
      title: "Technology",
      subtitle: "Use Smarter Tools & AI-Powered Solutions",
      desc: "We use modern digital marketing tools, AI-powered solutions, analytics, and automation to improve efficiency, identify opportunities, and make smarter marketing decisions.",
      bg: "#eff6ff",
      color: "#1d4ed8"
    },
    {
      num: "03",
      title: "Execution",
      subtitle: "Turn Strategy Into Action",
      desc: "From SEO and Google Ads to social media marketing, website development, content, and performance marketing, we execute strategies designed to connect your business with the right audience.",
      bg: "#f0fdf4",
      color: "#15803d"
    },
    {
      num: "04",
      title: "Optimization",
      subtitle: "Measure, Learn & Improve",
      desc: "We track performance, analyze data, and continuously optimize campaigns and strategies to improve visibility, leads, conversions, and overall marketing performance.",
      bg: "#fdf2f8",
      color: "#db2777"
    }
  ];

  return (
    <section style={{ padding: "80px 24px", background: "#f8fafc" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px" }}>
          <div style={{ width: "40px", height: "2px", background: "#a13c00" }}></div>
          <span style={{ color: "#a13c00", fontSize: "12px", fontWeight: "700", letterSpacing: "2px", textTransform: "uppercase" }}>
            OUR DIGITAL GROWTH FRAMEWORK
          </span>
          <div style={{ width: "40px", height: "2px", background: "#a13c00" }}></div>
        </div>

        <h2 style={{ fontSize: "36px", fontWeight: "900", color: "#0f172a", margin: "0 0 24px 0", textAlign: "center", lineHeight: "1.2" }}>
          A Smarter Approach to Digital Growth
        </h2>

        <div style={{ maxWidth: "800px", textAlign: "center", margin: "0 auto 56px" }}>
          <p style={{ fontSize: "16px", color: "#475569", lineHeight: "1.7", marginBottom: "16px" }}>
            Digital growth is not about using one marketing channel in isolation. It requires the right strategy, the right technology, consistent execution, and continuous improvement.
          </p>
          <p style={{ fontSize: "16px", color: "#475569", lineHeight: "1.7" }}>
            At Digital Marketing TenX, we combine data-driven strategy, AI-powered technology, creative execution, and performance optimization to help businesses build a stronger online presence and achieve sustainable growth.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px", width: "100%", marginBottom: "64px" }}>
          {steps.map((step, idx) => (
            <div key={idx} className="dgf-step-card" style={{
              background: "#fff",
              borderRadius: "20px",
              padding: "32px 24px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.03)",
              border: "1px solid #f1f5f9",
              position: "relative",
              overflow: "hidden"
            }}>
              <div style={{ position: "relative", zIndex: "1" }}>
                <div style={{ 
                  display: "inline-flex", 
                  alignItems: "center", 
                  justifyContent: "center", 
                  background: step.bg, 
                  color: step.color,
                  padding: "6px 12px",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: "800",
                  marginBottom: "16px"
                }}>
                  {step.title}
                </div>
                <h3 style={{ fontSize: "20px", fontWeight: "800", color: "#0f172a", marginBottom: "12px", lineHeight: "1.3" }}>
                  {step.subtitle}
                </h3>
                <p style={{ fontSize: "15px", color: "#64748b", lineHeight: "1.6", margin: "0" }}>
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ 
          background: "#fff", 
          padding: "32px", 
          borderRadius: "16px", 
          border: "1px solid #e2e8f0", 
          width: "100%", 
          maxWidth: "800px",
          textAlign: "center",
          boxShadow: "0 4px 20px rgba(0,0,0,0.02)",
          marginBottom: "40px"
        }}>
          <div style={{ fontSize: "16px", fontWeight: "800", color: "#a13c00", marginBottom: "16px", letterSpacing: "1px" }}>
            Strategy <span style={{color: "#cbd5e1"}}>→</span> Technology <span style={{color: "#cbd5e1"}}>→</span> Execution <span style={{color: "#cbd5e1"}}>→</span> Optimization
          </div>
          <p style={{ fontSize: "18px", fontWeight: "600", color: "#334155", margin: "0" }}>
            One connected framework. Smarter digital decisions. Sustainable business growth.
          </p>
        </div>

        <Link href="/contact" className="btn-primary" style={{ padding: "14px 32px", fontSize: "16px" }}>
          Build Your Growth Strategy →
        </Link>
      </div>
    </section>
  );
}
=======
import React from "react";
import Link from "next/link";

export default function DigitalGrowthFramework() {
  const steps = [
    {
      num: "01",
      title: "Strategy",
      subtitle: "Start With a Clear Direction",
      desc: "We understand your business, target audience, competitors, and growth objectives to create a digital marketing strategy tailored to your goals.",
      bg: "#fff5ee",
      color: "#a13c00"
    },
    {
      num: "02",
      title: "Technology",
      subtitle: "Use Smarter Tools & AI-Powered Solutions",
      desc: "We use modern digital marketing tools, AI-powered solutions, analytics, and automation to improve efficiency, identify opportunities, and make smarter marketing decisions.",
      bg: "#eff6ff",
      color: "#1d4ed8"
    },
    {
      num: "03",
      title: "Execution",
      subtitle: "Turn Strategy Into Action",
      desc: "From SEO and Google Ads to social media marketing, website development, content, and performance marketing, we execute strategies designed to connect your business with the right audience.",
      bg: "#f0fdf4",
      color: "#15803d"
    },
    {
      num: "04",
      title: "Optimization",
      subtitle: "Measure, Learn & Improve",
      desc: "We track performance, analyze data, and continuously optimize campaigns and strategies to improve visibility, leads, conversions, and overall marketing performance.",
      bg: "#fdf2f8",
      color: "#db2777"
    }
  ];

  return (
    <section style={{ padding: "80px 24px", background: "#f8fafc" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px" }}>
          <div style={{ width: "40px", height: "2px", background: "#a13c00" }}></div>
          <span style={{ color: "#a13c00", fontSize: "12px", fontWeight: "700", letterSpacing: "2px", textTransform: "uppercase" }}>
            OUR DIGITAL GROWTH FRAMEWORK
          </span>
          <div style={{ width: "40px", height: "2px", background: "#a13c00" }}></div>
        </div>

        <h2 style={{ fontSize: "36px", fontWeight: "900", color: "#0f172a", margin: "0 0 24px 0", textAlign: "center", lineHeight: "1.2" }}>
          A Smarter Approach to Digital Growth
        </h2>

        <div style={{ maxWidth: "800px", textAlign: "center", margin: "0 auto 56px" }}>
          <p style={{ fontSize: "16px", color: "#475569", lineHeight: "1.7", marginBottom: "16px" }}>
            Digital growth is not about using one marketing channel in isolation. It requires the right strategy, the right technology, consistent execution, and continuous improvement.
          </p>
          <p style={{ fontSize: "16px", color: "#475569", lineHeight: "1.7" }}>
            At Digital Marketing TenX, we combine data-driven strategy, AI-powered technology, creative execution, and performance optimization to help businesses build a stronger online presence and achieve sustainable growth.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px", width: "100%", marginBottom: "64px" }}>
          {steps.map((step, idx) => (
            <div key={idx} className="dgf-step-card" style={{
              background: "#fff",
              borderRadius: "20px",
              padding: "32px 24px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.03)",
              border: "1px solid #f1f5f9",
              position: "relative",
              overflow: "hidden"
            }}>
              <div style={{ position: "relative", zIndex: "1" }}>
                <div style={{ 
                  display: "inline-flex", 
                  alignItems: "center", 
                  justifyContent: "center", 
                  background: step.bg, 
                  color: step.color,
                  padding: "6px 12px",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: "800",
                  marginBottom: "16px"
                }}>
                  {step.title}
                </div>
                <h3 style={{ fontSize: "20px", fontWeight: "800", color: "#0f172a", marginBottom: "12px", lineHeight: "1.3" }}>
                  {step.subtitle}
                </h3>
                <p style={{ fontSize: "15px", color: "#64748b", lineHeight: "1.6", margin: "0" }}>
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ 
          background: "#fff", 
          padding: "32px", 
          borderRadius: "16px", 
          border: "1px solid #e2e8f0", 
          width: "100%", 
          maxWidth: "800px",
          textAlign: "center",
          boxShadow: "0 4px 20px rgba(0,0,0,0.02)",
          marginBottom: "40px"
        }}>
          <div style={{ fontSize: "16px", fontWeight: "800", color: "#a13c00", marginBottom: "16px", letterSpacing: "1px" }}>
            Strategy <span style={{color: "#cbd5e1"}}>→</span> Technology <span style={{color: "#cbd5e1"}}>→</span> Execution <span style={{color: "#cbd5e1"}}>→</span> Optimization
          </div>
          <p style={{ fontSize: "18px", fontWeight: "600", color: "#334155", margin: "0" }}>
            One connected framework. Smarter digital decisions. Sustainable business growth.
          </p>
        </div>

        <Link href="/contact" className="btn-primary" style={{ padding: "14px 32px", fontSize: "16px" }}>
          Build Your Growth Strategy →
        </Link>
      </div>
    </section>
  );
}
>>>>>>> a818dd5d9a09b0322ab486fdaec230887474cbad
