"use client";

import { useCallback } from "react";
import * as gtag from "@/lib/gtag";

export default function CTA({
  eyebrow = "⭐ READY TO GROW?",
  title = "Get a Free Google Ads Audit — No Commitment",
  description = "Our experts will analyse your current account, identify wasted spend and map out an actionable growth roadmap — completely free, no strings attached.",
  primaryText = "📅 Book Consultation",
  secondaryText = "✉️ Contact Email Us",
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
        <div className="cta-card-content">
          {eyebrow && <span className="cta-eyebrow">{eyebrow}</span>}
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

