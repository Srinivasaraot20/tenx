"use client";

import { useState } from "react";
import * as gtag from "@/lib/gtag";

export default function Newsletter({ id = "blog-newsletter" }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email) {
      setStatus("error");
      setErrorMessage("Email is required.");
      return;
    }
    
    setStatus("sending");
    setErrorMessage("");

    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      
      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setEmail("");
        
        fetch("/api/analytics", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ event: "newsletter_signup", email, ok: true }),
        }).catch(() => {});
        
        // GA4 tracking
        gtag.event({
          action: "newsletter_subscribe",
          category: "Engagement",
          label: "Footer Newsletter Form",
          value: 1
        });
        
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="newsletter-card" id={id}>
      <div className="newsletter-icon">📬</div>
      <h3>Never Miss a Marketing Insight</h3>
      <p>Get weekly tips, SEO updates, business insights, and free resources delivered to your inbox.</p>
      
      <form className="newsletter-form relative" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={status === "sending" || status === "success"}
          aria-label="Email address"
        />
        <button className="btn-primary whitespace-nowrap" disabled={status === "sending" || status === "success"} type="submit">
          {status === "sending" ? "Subscribing…" : "Subscribe"}
        </button>
      </form>

      {status === "success" && (
        <div className="newsletter-success mt-3 text-sm text-green-600 font-medium bg-green-50 border border-green-200 p-3 rounded-lg text-left">
          ✅ Thank you for subscribing! You'll receive our latest marketing tips and updates.
        </div>
      )}
      
      {status === "error" && (
        <div className="newsletter-error mt-3 text-sm text-red-600 font-medium bg-red-50 border border-red-200 p-3 rounded-lg text-left">
          ⚠️ {errorMessage}
        </div>
      )}

      <ul className="newsletter-benefits mt-4">
        <li>✓ Weekly Tips</li>
        <li>✓ SEO Updates</li>
        <li>✓ Business Insights</li>
        <li>✓ Free Resources</li>
      </ul>
    </div>
  );
}
