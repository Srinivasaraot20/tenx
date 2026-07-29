export default function Challenges() {
  const challenges = [
    "Low search engine visibility",
    "Outdated or slow websites",
    "Inconsistent online presence",
    "Poor lead generation",
    "High advertising costs",
    "Low conversion rates",
    "Lack of marketing data and insights"
  ];

  const solutions = [
    "SEO and local search optimization",
    "Conversion-focused website development",
    "Google Ads and PPC campaigns",
    "Social media marketing",
    "Performance marketing",
    "Analytics and conversion tracking",
    "Marketing automation"
  ];

  return (
    <section className="challenges" style={{ padding: "60px 24px", background: "#fdfdfd" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        
        {/* Centered Header Section */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <h2 style={{ fontSize: "36px", fontWeight: "800", color: "#0f172a", marginBottom: "12px", lineHeight: "1.2" }}>
            Digital Marketing Challenges We Help Businesses Solve
          </h2>
          <p style={{ fontSize: "16px", color: "#64748b", maxWidth: "680px", margin: "0 auto", lineHeight: "1.6" }}>
            Helping Businesses Scale with Data-Driven Digital Marketing Solutions
          </p>
          <div style={{ width: "50px", height: "3px", borderRadius: "2px", background: "#a13c00", margin: "16px auto 0" }}></div>
        </div>

        {/* 2-Column Comparison Wrap */}
        <div className="chal-wrap" style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: "24px", alignItems: "center", maxWidth: "900px", margin: "0 auto" }}>
          
          {/* Challenges Box */}
          <div className="chal-box red" style={{ height: "100%" }}>
            <h3 style={{ fontSize: "16px", fontWeight: "800", color: "#dc2626", marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px" }}>
              <span>⚠️</span> Common Business Challenges
            </h3>
            {challenges.map((item, idx) => (
              <div className="chal-item" key={idx} style={{ fontSize: "14px", marginBottom: "12px" }}>
                <span className="dot bad">✕</span> {item}
              </div>
            ))}
          </div>

          {/* VS Badge */}
          <div className="vs-badge" style={{ zIndex: 2 }}>VS</div>

          {/* Solutions Box */}
          <div className="chal-box green" style={{ height: "100%" }}>
            <h3 style={{ fontSize: "16px", fontWeight: "800", color: "#15803d", marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px" }}>
              <span>✅</span> Our Growth Solutions
            </h3>
            {solutions.map((item, idx) => (
              <div className="chal-item" key={idx} style={{ fontSize: "14px", marginBottom: "12px" }}>
                <span className="dot good">✓</span> {item}
              </div>
            ))}
          </div>

        </div>

        

      </div>
    </section>
  );
}
