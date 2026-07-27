"use client";

import { useState } from "react";
import { FAQSchema } from "@/components/schema/SchemaComponents";

const faqs = [
  {
    q: "What services does Digital Marketing TenX offer?",
    a: "Digital Marketing TenX provides complete digital marketing solutions, including SEO, Google Ads, performance marketing, social media marketing, website design and development, e-commerce development, and AI-powered marketing solutions."
  },
  {
    q: "How long does it take to see results from SEO services?",
    a: "SEO results depend on your website, competition, industry, and strategy. Most businesses may start seeing noticeable improvements within 3 to 6 months with consistent SEO efforts."
  },
  {
    q: "Do you offer Google Ads PPC management?",
    a: "Yes. We provide Google Ads and PPC management services, including campaign strategy, keyword research, ad creation, conversion tracking, optimization, and performance monitoring."
  },
  {
    q: "How much does professional website design and development cost?",
    a: "Website design and development costs vary based on the project scope, features, technology, and business requirements. Contact our team for a customized quote based on your goals."
  },
  {
    q: "Why is Local SEO important for my business?",
    a: "Local SEO helps your business appear in Google Search and Maps when nearby customers search for your products or services. It can improve local visibility, website traffic, calls, enquiries, and customer visits."
  },
  {
    q: "How can a digital marketing agency help my business grow?",
    a: "A digital marketing agency can help your business increase online visibility, attract targeted traffic, generate qualified leads, improve conversions, and build long-term digital growth through data-driven strategies."
  },
  {
    q: "Do you provide digital marketing services for startups and small businesses?",
    a: "Yes. We provide customized digital marketing solutions for startups, small businesses, local businesses, e-commerce brands, and established companies based on their goals and budget."
  },
  {
    q: "How do you measure digital marketing performance?",
    a: "We measure performance using relevant metrics such as website traffic, keyword rankings, leads, conversions, cost per lead, return on ad spend, and other business-specific KPIs."
  }
];

export default function SEOContent() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      {/* FAQ Schema Injection */}
      <FAQSchema faqs={faqs.map(f => ({ question: f.q, answer: f.a }))} />

      <section className="seo-section">
        <div className="ga-wrap">
          <div className="seo-grid">
            
            {/* Left: FAQs Accordion */}
            <div className="seo-faqs-col">
              <div className="sec-title">
                <span className="eyebrow">💡 Help Desk</span>
                <h2>Frequently Asked Questions About Digital Marketing Services in Hyderabad</h2>
                <p>Everything you need to know about our digital marketing, SEO, PPC ads, and web development models.</p>
              </div>

              <div className="seo-faq-accordion">
                {faqs.map((faq, idx) => (
                  <div key={idx} className={`seo-faq-item ${openIndex === idx ? "open" : ""}`}>
                    <button 
                      id={`faq-btn-${idx}`}
                      className="seo-faq-question-btn" 
                      onClick={() => toggleFaq(idx)}
                      aria-expanded={openIndex === idx}
                      aria-controls={`faq-answer-${idx}`}
                    >
                      <span>{faq.q}</span>
                      <svg className="chevron-icon" width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    <div 
                      id={`faq-answer-${idx}`}
                      className="seo-faq-answer"
                      role="region"
                      aria-labelledby={`faq-btn-${idx}`}
                    >
                      <p>{faq.a}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
