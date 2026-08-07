import React from "react";

export default function Process() {
  const steps = [
    {
      num: "01",
      title: "Discovery",
      desc: "We understand your business, goals, target audience, competitors, and current digital marketing challenges.",
      class: "step-orange",
      color: "#ff5722",
      bgColor: "rgba(255, 107, 0, 0.06)",
      circleIcon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
      ),
      cardIcon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
      )
    },
    {
      num: "02",
      title: "Strategy",
      desc: "We create a customized digital marketing strategy based on your objectives, audience, industry, and available opportunities.",
      class: "step-red",
      color: "#ef4444",
      bgColor: "rgba(239, 68, 68, 0.06)",
      circleIcon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
      ),
      cardIcon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/><path d="M15 3v18"/><path d="M3 9h18"/><path d="M3 15h18"/></svg>
      )
    },
    {
      num: "03",
      title: "Execution",
      desc: "Our team implements SEO, paid advertising, content, social media, website, and other marketing campaigns.",
      class: "step-purple",
      color: "#8b5cf6",
      bgColor: "rgba(139, 92, 246, 0.06)",
      circleIcon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4.5c1.4-1.4 4.5-2 4.5-2"/><path d="M12 15v5s3.03-.55 4.5-2c1.4-1.4 2-4.5 2-4.5"/></svg>
      ),
      cardIcon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="12" x="3" y="4" rx="2" ry="2"/><line x1="2" y1="20" x2="22" y2="20"/><line x1="12" y1="16" x2="12" y2="20"/></svg>
      )
    },
    {
      num: "04",
      title: "Analysis",
      desc: "We monitor important performance metrics, analyze campaign data, and identify opportunities for improvement.",
      class: "step-blue",
      color: "#1d4ed8",
      bgColor: "rgba(59, 130, 246, 0.06)",
      circleIcon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
      ),
      cardIcon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>
      )
    },
    {
      num: "05",
      title: "Scaling",
      desc: "We optimize successful strategies, improve performance, and scale campaigns to support long-term business growth.",
      class: "step-green",
      color: "#10b981",
      bgColor: "rgba(16, 185, 129, 0.06)",
      circleIcon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
      ),
      cardIcon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34"/><path d="M12 2a6 6 0 0 1 6 6v5a6 6 0 0 1-6 6 6 6 0 0 1-6-6V8a6 6 0 0 1 6-6z"/></svg>
      )
    }
  ];

  return (
    <section className="process">
      <div className="process-header">
        <div className="process-eyebrow">
          <span className="eyebrow-line"></span>
          OUR PROCESS
          <span className="eyebrow-line"></span>
        </div>
        <h2 className="process-title">
          How We <span className="highlight-work">Work</span>
        </h2>
        <p className="process-subtitle">
          Our digital marketing process combines research, strategy, execution, analysis, and continuous optimization to help businesses achieve sustainable online growth.
        </p>
      </div>

      <div className="process-steps-container">
        <div className="process-timeline-line"></div>
        <div className="process-steps">
          {steps.map((step, idx) => (
            <React.Fragment key={idx}>
              <div className={`proc-step-card-wrap ${step.class}`}>
                <div className="proc-circle">
                  {step.circleIcon}
                </div>
                <div className="proc-card">
                  <div className="proc-num-badge">{step.num}</div>
                  <h3>{step.title}</h3>
                  <div className="proc-title-line" style={{ backgroundColor: step.color }}></div>
                  <p>{step.desc}</p>
                  <div className="proc-card-bottom-icon" style={{ backgroundColor: step.bgColor, color: step.color }}>
                    {step.cardIcon}
                  </div>
                </div>
              </div>
              {idx < steps.length - 1 && (
                <div className="proc-connector-arrow" style={{ color: step.color }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
