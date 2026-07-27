import Image from "next/image";

export default function About() {
  return (
    <section className="about" style={{ padding: "60px 24px", background: "#fff" }}>
      <div className="about-text" style={{ maxWidth: "1100px", margin: "0 auto", width: "100%", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
        
        {/* Centered ABOUT US with lines */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "12px" }}>
          <div style={{ width: "40px", height: "2px", background: "#ff6b00" }}></div>
          <span className="eyebrow" style={{ color: "#ff6b00", fontSize: "12px", fontWeight: "700", letterSpacing: "2px", textTransform: "uppercase" }}>
            ABOUT US
          </span>
          <div style={{ width: "40px", height: "2px", background: "#ff6b00" }}></div>
        </div>

        {/* Heading */}
        <h2 style={{ fontSize: "36px", fontWeight: "800", color: "#0f172a", margin: "0", lineHeight: "1.25" }}>
          Your Trusted Digital Marketing Partner in Hyderabad
        </h2>

        {/* Small Underbar */}
        <div style={{ width: "50px", height: "3px", borderRadius: "2px", background: "#ff6b00", margin: "16px 0 20px" }}></div>

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
              position: "absolute",
              top: "16px",
              right: "16px",
              background: "#ff6b00",
              color: "#fff",
              fontSize: "11px",
              fontWeight: "800",
              width: "28px",
              height: "22px",
              borderRadius: "6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>01</div>
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
              <Image 
                src="/feat-data-driven.webp" 
                alt="Data Driven Strategies" 
                width={56}
                height={56}
                style={{ objectFit: "contain" }}
              />
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
              position: "absolute",
              top: "16px",
              right: "16px",
              background: "#ec4899",
              color: "#fff",
              fontSize: "11px",
              fontWeight: "800",
              width: "28px",
              height: "22px",
              borderRadius: "6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>02</div>
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
              <Image 
                src="/feat-creative-solutions.webp" 
                alt="Creative Marketing Solutions" 
                width={56}
                height={56}
                style={{ objectFit: "contain" }}
              />
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
              position: "absolute",
              top: "16px",
              right: "16px",
              background: "#3b82f6",
              color: "#fff",
              fontSize: "11px",
              fontWeight: "800",
              width: "28px",
              height: "22px",
              borderRadius: "6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>03</div>
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
              <Image 
                src="/feat-business-growth.webp" 
                alt="Business Growth Focused" 
                width={56}
                height={56}
                style={{ objectFit: "contain" }}
              />
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
              position: "absolute",
              top: "16px",
              right: "16px",
              background: "#7c3aed",
              color: "#fff",
              fontSize: "11px",
              fontWeight: "800",
              width: "28px",
              height: "22px",
              borderRadius: "6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>04</div>
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
              <Image 
                src="/feat-expert-team.webp" 
                alt="Dedicated Expert Team" 
                width={56}
                height={56}
                style={{ objectFit: "contain" }}
              />
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
