import Image from "next/image";
import { ChartNoAxesColumnIncreasing, Lightbulb, Rocket, Users } from "lucide-react";

export default function About() {
  return (
    <section className="about" style={{ padding: "60px 24px", background: "#fff" }}>
      <div className="about-text" style={{ maxWidth: "1100px", margin: "0 auto", width: "100%", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
        
        {/* Centered ABOUT US with lines */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "12px" }}>
          <div style={{ width: "40px", height: "2px", background: "#a13c00" }}></div>
          <span className="eyebrow" style={{ color: "#a13c00", fontSize: "12px", fontWeight: "700", letterSpacing: "2px", textTransform: "uppercase" }}>
            ABOUT US
          </span>
          <div style={{ width: "40px", height: "2px", background: "#a13c00" }}></div>
        </div>

        {/* Heading */}
        <h2 style={{ fontSize: "36px", fontWeight: "800", color: "#0f172a", margin: "0", lineHeight: "1.25" }}>
          Your Trusted Digital Marketing Partner in Hyderabad
        </h2>

        {/* Small Underbar */}
        <div style={{ width: "50px", height: "3px", borderRadius: "2px", background: "#a13c00", margin: "16px 0 20px" }}></div>

        {/* Paragraph */}
        <p style={{ fontSize: "15px", color: "#64748b", lineHeight: "1.8", marginBottom: "16px", maxWidth: "900px" }}>
          Digital Marketing TenX is a digital marketing company in Hyderabad helping businesses build stronger online visibility and achieve measurable growth. We combine search engine optimization, paid advertising, social media marketing, website development, and data-driven strategies to create customized digital marketing solutions for businesses of all sizes.
        </p>
        <p style={{ fontSize: "15px", color: "#64748b", lineHeight: "1.8", marginBottom: "48px", maxWidth: "900px" }}>
          Whether you are a startup looking to build your online presence, a local business aiming to attract more customers, or an established brand seeking scalable growth, our digital marketing experts in Hyderabad create strategies aligned with your goals, audience, and industry.
        </p>

        {/* Responsive Features Grid */}
        <div className="about-features-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(480px, 1fr))", gap: "24px", width: "100%", textAlign: "left" }}>
          
          {/* Card 01 */}
          <div className="about-card" style={{
            background: "#ffffff",
            border: "1px solid #f1f5f9",
            borderRadius: "16px",
            padding: "28px 24px",
            boxShadow: "0 10px 30px rgba(15, 23, 42, 0.02)",
            position: "relative",
            display: "flex",
            alignItems: "center",
            gap: "20px"
          }}>

            <div style={{
              width: "90px",
              height: "90px",
              borderRadius: "50%",
              background: "#fff5ee",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              position: "relative"
            }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#a13c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 3v18h18" />
                <path d="M18 9l-5 5-4-4-6 6" />
              </svg>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <h3 style={{ margin: "0", fontSize: "18px", fontWeight: "800", color: "#0f172a" }}>Data-Driven Strategies</h3>
              <p style={{ margin: "0", fontSize: "14px", color: "#64748b", lineHeight: "1.5" }}>
                We use research, analytics, and performance data to build marketing strategies focused on measurable business outcomes.
              </p>
            </div>
          </div>

          {/* Card 02 */}
          <div className="about-card" style={{
            background: "#ffffff",
            border: "1px solid #f1f5f9",
            borderRadius: "16px",
            padding: "28px 24px",
            boxShadow: "0 10px 30px rgba(15, 23, 42, 0.02)",
            position: "relative",
            display: "flex",
            alignItems: "center",
            gap: "20px"
          }}>

            <div style={{
              width: "90px",
              height: "90px",
              borderRadius: "50%",
              background: "#fdf2f8",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              position: "relative"
            }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#be185d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a7 7 0 0 0-7 7c0 2 1 3 2 4l1 3h8l1-3c1-1 2-2 2-4a7 7 0 0 0-7-7z" />
                <path d="M9 21h6" />
                <path d="M12 11v-4" />
              </svg>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <h3 style={{ margin: "0", fontSize: "18px", fontWeight: "800", color: "#0f172a" }}>Creative Marketing Solutions</h3>
              <p style={{ margin: "0", fontSize: "14px", color: "#64748b", lineHeight: "1.5" }}>
                We combine creativity and technology to develop campaigns that connect brands with the right audience.
              </p>
            </div>
          </div>

          {/* Card 03 */}
          <div className="about-card" style={{
            background: "#ffffff",
            border: "1px solid #f1f5f9",
            borderRadius: "16px",
            padding: "28px 24px",
            boxShadow: "0 10px 30px rgba(15, 23, 42, 0.02)",
            position: "relative",
            display: "flex",
            alignItems: "center",
            gap: "20px"
          }}>

            <div style={{
              width: "90px",
              height: "90px",
              borderRadius: "50%",
              background: "#eff6ff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              position: "relative"
            }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#1d4ed8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4.5 16.5c-1.5 1.25-2.5 3.5-2.5 3.5s2.25-1 3.5-2.5M12 12l-8 8" />
                <path d="M12 2s-1 7-1 9c0 2 1 3 3 3s3-1 3-3c0-2-1-9-1-9z" />
                <path d="M9 15h6" />
              </svg>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <h3 style={{ margin: "0", fontSize: "18px", fontWeight: "800", color: "#0f172a" }}>Business Growth Focused</h3>
              <p style={{ margin: "0", fontSize: "14px", color: "#64748b", lineHeight: "1.5" }}>
                Our strategies are designed to improve visibility, generate qualified leads, increase conversions, and support long-term growth.
              </p>
            </div>
          </div>

          {/* Card 04 */}
          <div className="about-card" style={{
            background: "#ffffff",
            border: "1px solid #f1f5f9",
            borderRadius: "16px",
            padding: "28px 24px",
            boxShadow: "0 10px 30px rgba(15, 23, 42, 0.02)",
            position: "relative",
            display: "flex",
            alignItems: "center",
            gap: "20px"
          }}>

            <div style={{
              width: "90px",
              height: "90px",
              borderRadius: "50%",
              background: "#f5f3ff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              position: "relative"
            }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M9 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M13 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <circle cx="17" cy="7" r="3" />
              </svg>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <h3 style={{ margin: "0", fontSize: "18px", fontWeight: "800", color: "#0f172a" }}>Dedicated Expert Team</h3>
              <p style={{ margin: "0", fontSize: "14px", color: "#64748b", lineHeight: "1.5" }}>
                Our team works closely with businesses to plan, execute, monitor, and continuously improve digital marketing campaigns.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

