"use client";

import { useCallback } from "react";
import * as gtag from "@/lib/gtag";

export default function CTA({
  title = "Let's Grow Your Business Together",
  description = "Partner with Digital Marketing TenX and experience predictable, data-driven revenue and traffic growth.",
  primaryText = "📅 Book Free Consultation",
  secondaryText = "💬 Contact Us",
  onPrimaryClick,
  onSecondaryClick
}) {
  const handleConsultation = useCallback(() => {
    window.dispatchEvent(new CustomEvent("trigger-consultation-modal"));
  }, []);

  const handlePrimaryClick = () => {
    gtag.event({
      action: "cta_button_click",
      category: "Engagement",
      label: title,
    });
    if (onPrimaryClick) {
      onPrimaryClick();
    } else {
      handleConsultation();
    }
  };

  return (
    <section className="cta-section">
      <div className="cta-card-wrapper">
        <div className="cta-grid-bg"></div>
        
        <div className="cta-card-content">
          <h2>{title}</h2>
          <p>
            {description}
          </p>
          <div className="cta-card-buttons">
            <button className="btn-primary" onClick={handlePrimaryClick}>
              {primaryText}
            </button>
            {onSecondaryClick ? (
              <button className="btn-outline" onClick={onSecondaryClick}>
                {secondaryText}
              </button>
            ) : (
              <a href="/contact" className="btn-outline">
                {secondaryText}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
