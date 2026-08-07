export default function WhyUs() {
  const points = [
    {
      num: "01",
      title: "Data-Driven Strategies",
      desc: "We use data, analytics, and market insights to make smarter marketing decisions that drive measurable business results.",
      bg: "#fff5ee",
      badgeColor: "#ff5722",
      badgeBg: "#fff5ee",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ff5722" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      )
    },
    {
      num: "02",
      title: "AI-Powered Systems",
      desc: "We use AI tools and automation to improve efficiency, streamline marketing processes, and support faster business growth.",
      bg: "#eff6ff",
      badgeColor: "#1d4ed8",
      badgeBg: "#eff6ff",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1d4ed8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
          <circle cx="12" cy="12" r="4" />
        </svg>
      )
    },
    {
      num: "03",
      title: "Transparent Reporting",
      desc: "Get clear, accurate, and easy-to-understand performance reports with complete visibility into your marketing campaigns.",
      bg: "#eff6ff",
      badgeColor: "#1d4ed8",
      badgeBg: "#eff6ff",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1d4ed8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      )
    },
    {
      num: "04",
      title: "Dedicated Growth Team",
      desc: "Work with a dedicated team of digital marketing professionals focused on your business goals and long-term growth.",
      bg: "#f0fdf4",
      badgeColor: "#15803d",
      badgeBg: "#f0fdf4",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#15803d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M9 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M13 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <circle cx="17" cy="7" r="3" />
        </svg>
      )
    },
    {
      num: "05",
      title: "Proven ROI",
      desc: "We focus on measurable performance and strategies designed to improve leads, conversions, revenue, and overall return on investment.",
      bg: "#fffbeb",
      badgeColor: "#92400e",
      badgeBg: "#fffbeb",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
          <polyline points="17 6 23 6 23 12" />
        </svg>
      )
    },
    {
      num: "06",
      title: "Fast Response Times",
      desc: "Get quick communication, timely updates, and fast action when your business needs support.",
      bg: "#fdf2f8",
      badgeColor: "#db2777",
      badgeBg: "#fdf2f8",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#db2777" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      )
    },
    {
      num: "07",
      title: "Monthly Strategy Reviews",
      desc: "We regularly review performance, analyze data, and refine strategies to improve results and support continuous business growth.",
      bg: "#f5f3ff",
      badgeColor: "#7c3aed",
      badgeBg: "#f5f3ff",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      )
    },
    {
      num: "08",
      title: "Data Security & Privacy",
      desc: "We protect your business data and marketing information with secure processes and responsible data-handling practices.",
      bg: "#eff6ff",
      badgeColor: "#2563eb",
      badgeBg: "#eff6ff",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      )
    }
  ];

  return (
    <section className="why" style={{ padding: "60px 24px", background: "#fdfdfd" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center" }}>
        
        {/* Eyebrow Choice with Lines */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "12px" }}>
          <div style={{ width: "40px", height: "2px", background: "#ff5722" }}></div>
          <span className="eyebrow" style={{ color: "#ff5722", fontSize: "12px", fontWeight: "700", letterSpacing: "2px", textTransform: "uppercase" }}>
            WHY BUSINESSES CHOOSE US
          </span>
          <div style={{ width: "40px", height: "2px", background: "#ff5722" }}></div>
        </div>

        {/* Title */}
        <h2 style={{ fontSize: "36px", fontWeight: "800", color: "#0f172a", margin: "0 0 12px 0", textAlign: "center" }}>
          Why Businesses <span style={{ color: "#ff5722" }}>Partner</span> With Digital Marketing TenX
        </h2>

        {/* Subtitle */}
        <p style={{ fontSize: "16px", color: "#64748b", maxWidth: "800px", textAlign: "center", margin: "0 0 32px 0", lineHeight: "1.6" }}>
          We combine data-driven strategy, AI-powered technology, and digital marketing expertise to help businesses achieve measurable results and sustainable growth.
        </p>

        {/* Comparison Table */}
        <div style={{ width: "100%", maxWidth: "800px", marginBottom: "48px", overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff", borderRadius: "12px", overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
            <thead>
              <tr style={{ background: "#f8fafc", borderBottom: "2px solid #e2e8f0" }}>
                <th style={{ padding: "16px", textAlign: "left", color: "#0f172a", fontWeight: "700" }}>Feature</th>
                <th style={{ padding: "16px", textAlign: "center", color: "#ff5722", fontWeight: "800" }}>Digital TenX</th>
                <th style={{ padding: "16px", textAlign: "center", color: "#64748b", fontWeight: "600" }}>Traditional Agencies</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                <td style={{ padding: "16px", color: "#334155" }}>Marketing Approach</td>
                <td style={{ padding: "16px", textAlign: "center", color: "#15803d", fontWeight: "600" }}>Data & AI-Driven</td>
                <td style={{ padding: "16px", textAlign: "center", color: "#94a3b8" }}>Guesswork</td>
              </tr>
              <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                <td style={{ padding: "16px", color: "#334155" }}>Reporting</td>
                <td style={{ padding: "16px", textAlign: "center", color: "#15803d", fontWeight: "600" }}>100% Transparent</td>
                <td style={{ padding: "16px", textAlign: "center", color: "#94a3b8" }}>Vague & Confusing</td>
              </tr>
              <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                <td style={{ padding: "16px", color: "#334155" }}>Primary Focus</td>
                <td style={{ padding: "16px", textAlign: "center", color: "#15803d", fontWeight: "600" }}>Measurable ROI</td>
                <td style={{ padding: "16px", textAlign: "center", color: "#94a3b8" }}>Vanity Metrics</td>
              </tr>
              <tr>
                <td style={{ padding: "16px", color: "#334155" }}>Campaign Strategy</td>
                <td style={{ padding: "16px", textAlign: "center", color: "#15803d", fontWeight: "600" }}>Customized</td>
                <td style={{ padding: "16px", textAlign: "center", color: "#94a3b8" }}>One-Size-Fits-All</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Grid Container */}
        <div className="why-grid-layout" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: "24px", width: "100%" }}>
          
          {points.map((pt) => (
            <div key={pt.num} className="why-card-custom" style={{
              background: "#ffffff",
              border: "1px solid #f1f5f9",
              borderRadius: "16px",
              padding: "28px 24px",
              boxShadow: "0 10px 30px rgba(15, 23, 42, 0.015)",
              position: "relative",
              display: "flex",
              alignItems: "center",
              gap: "20px",
              transition: "all 0.3s ease"
            }}>
              {/* Top right Badge */}
              <div style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                background: pt.badgeBg,
                color: pt.badgeColor,
                fontSize: "11px",
                fontWeight: "800",
                width: "28px",
                height: "22px",
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>{pt.num}</div>

              {/* Icon Circle */}
              <div style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                background: pt.bg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0
              }}>
                {pt.icon}
              </div>

              {/* Text Area */}
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <h3 style={{ margin: "0", fontSize: "18px", fontWeight: "800", color: "#0f172a" }}>{pt.title}</h3>
                <p style={{ margin: "0", fontSize: "14px", color: "#64748b", lineHeight: "1.5" }}>{pt.desc}</p>
              </div>
            </div>
          ))}

          {/* Card 09 - CTA Card */}
          <div className="why-card-custom" style={{
            background: "#fffaf7",
            border: "1px solid #ffe3d1",
            borderRadius: "16px",
            padding: "28px 24px",
            boxShadow: "0 10px 30px rgba(255, 107, 0, 0.02)",
            position: "relative",
            display: "flex",
            alignItems: "center",
            gap: "20px",
            transition: "all 0.3s ease"
          }}>
            {/* Top right Badge */}
            <div style={{
              position: "absolute",
              top: "16px",
              right: "16px",
              background: "#fff5ee",
              color: "#ff5722",
              fontSize: "11px",
              fontWeight: "800",
              width: "28px",
              height: "22px",
              borderRadius: "6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>{ "09" }</div>

            {/* Solid Orange Rocket Icon Circle */}
            <div style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: "#ff5722",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4.5 16.5c-1.5 1.25-2.5 3.5-2.5 3.5s2.25-1 3.5-2.5M12 12l-8 8" />
                <path d="M12 2s-1 7-1 9c0 2 1 3 3 3s3-1 3-3c0-2-1-9-1-9z" />
                <path d="M9 15h6" />
              </svg>
            </div>

            {/* CTA Content */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "100%" }}>
              <h3 style={{ margin: "0", fontSize: "18px", fontWeight: "800", color: "#0f172a" }}>Ready to Scale?</h3>
              <p style={{ margin: "0", fontSize: "14px", color: "#64748b", lineHeight: "1.5" }}>
                Join growing businesses that trust Digital Marketing TenX for strategic digital growth and measurable results.
              </p>
              <a href="/contact" style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                background: "#ff5722",
                color: "#ffffff",
                fontSize: "13px",
                fontWeight: "700",
                textDecoration: "none",
                padding: "8px 16px",
                borderRadius: "8px",
                width: "fit-content",
                boxShadow: "0 4px 10px rgba(255, 107, 0, 0.15)",
                transition: "all 0.2s ease"
              }}
              className="why-cta-btn"
              >
                <span>👉 Let’s Grow Together</span>
                <span>→</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
