import React from "react";
import "./ServiceHero.css";

export default function ServiceHero({ leftContent, rightContent, bottomContent }) {
  return (
    <section className="service-hero">
      <div className="service-hero-grid-bg" />
      <div style={{ position: "absolute", top: "-80px", right: "20%", width: "500px", height: "500px", borderRadius: "50%", background: "rgba(66,133,244,0.05)", filter: "blur(90px)", pointerEvents: "none" }} />
      
      <div className="service-hero-container">
        <div className="service-hero-grid">
          {/* Left */}
          <div>
            {leftContent}
          </div>

          {/* Right — Image */}
          <div className="service-hero-visual">
            <div className="service-hero-img-wrap">
              {rightContent}
            </div>
          </div>
        </div>

        {bottomContent}
      </div>
    </section>
  );
}

