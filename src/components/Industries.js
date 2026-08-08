export default function Industries() {
  const industries = [
    { icon: "🏠", title: "Real Estate", desc: "Generate qualified property leads and close more deals." },
    { icon: "❤️", title: "Healthcare", desc: "Increase patient appointments and grow your practice." },
    { icon: "🎓", title: "Education", desc: "Boost student admissions and increase inquiries." },
    { icon: "🛍️", title: "E-commerce", desc: "Increase store footfall and boost online sales." },
    { icon: "✈️", title: "Travel & Hospitality", desc: "Get more bookings and grow your brand presence." },
    { icon: "🤝", title: "Professional Services", desc: "Generate quality leads for your service business." },
    { icon: "🚀", title: "Startups", desc: "Accelerate your growth with data-driven marketing." },
    { icon: "💰", title: "Finance", desc: "Get more leads and increase customer trust." },
  ];

  return (
    <section className="industries">
      <div className="sec-header">
        <span className="eyebrow">INDUSTRIES WE SERVE</span>
        <h2>Digital Marketing Solutions for Different Industries</h2>
        <p style={{ maxWidth: "800px", margin: "16px auto 0", color: "#64748b", lineHeight: "1.6" }}>
          Every industry has different customers, challenges, and growth opportunities. Our digital marketing strategies are customized to help businesses reach the right audience and achieve measurable results.
        </p>
      </div>
      <div className="ind-grid">
        {industries.map((ind, idx) => (
          <div className="ind-card" key={idx}>
            <span className="ind-icon">{ind.icon}</span>
            <h3>{ind.title}</h3>
            <p>{ind.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

