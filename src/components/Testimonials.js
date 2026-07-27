export default function Testimonials() {
  const testimonials = [
    {
      type: "card",
      stars: "★★★★★",
      text: "Amazing team! They understand our needs and deliver results beyond expectations. Highly recommended.",
      avatar: "N",
      avatarColor: "#3b5998",
      name: "Neha Patel",
      role: "Healthcare Clinic"
    },
    {
      type: "card",
      stars: "★★★★★",
      text: "WhatsApp Automation saved us hours of manual follow-ups. Our conversion rate boosted by 40% in weeks.",
      avatar: "V",
      avatarColor: "#10b981",
      name: "Vikram Rao",
      role: "E-commerce Brand"
    },
    {
      type: "card",
      stars: "★★★★★",
      text: "Their Google Ads strategy helped us scale our admissions during peak admission season. Highly recommended.",
      avatar: "A",
      avatarColor: "#f59e0b",
      name: "Amit Verma",
      role: "Edu Group Director"
    }
  ];

  const doubleList = [...testimonials, ...testimonials];

  return (
    <section className="testimonials reveal-element">
      <div className="process-header" style={{ marginBottom: "36px" }}>
        <div className="process-eyebrow">
          <span className="eyebrow-line"></span>
          TESTIMONIALS
          <span className="eyebrow-line"></span>
        </div>
        <h2 className="process-title">
          What Our <span className="highlight-work">Clients Say</span>
        </h2>
        <p className="process-subtitle">
          Real feedback from healthcare clinics, education brands, and e-commerce stores scaling with us.
        </p>
      </div>
      <div className="testimonials-track-container">
        <div className="testimonials-track">
          {doubleList.map((item, idx) => {
            if (item.type === "video") {
              return (
                <div className="testi-video" key={idx}>
                  <div className="play-btn">▶</div>
                </div>
              );
            }
            return (
              <div className="testi-card" key={idx}>
                <div className="google-badge">
                  <div className="g-logo">G</div>
                  <span style={{ fontSize: "12px", fontWeight: "700", color: "#555" }}>Google</span>
                </div>
                <div className="testi-stars">{item.stars}</div>
                <p className="testi-text">{item.text}</p>
                <div className="testi-user">
                  <div 
                    className="testi-avatar" 
                    style={item.avatarColor ? { backgroundColor: item.avatarColor } : {}}
                  >
                    {item.avatar}
                  </div>
                  <div>
                    <div className="testi-name">{item.name}</div>
                    <div className="testi-role">{item.role}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
