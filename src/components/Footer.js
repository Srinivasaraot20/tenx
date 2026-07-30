"use client";

import Image from "next/image";
import Link from "next/link";
import * as gtag from "@/lib/gtag";

export default function Footer() {
  return (
    <>
      <footer>
        <div className="footer-brand">
          <Link href="/" className="logo" style={{ marginBottom: "12px" }}>
            <Image
              src="/logo.webp"
              alt="Digital Marketing TenX Logo"
              width={56}
              height={56}
              className="logo-img-file footer-logo"
            />
            <span className="brand-name footer-brand-name">
              Digital Marketing <span className="brand-highlight">TenX</span>
            </span>
          </Link>
          <p>Transform your digital presence with AI-powered marketing, high-performance web solutions, and intelligent automation that increase traffic, generate qualified leads, and accelerate business growth.</p>
          <div className="social-links">
            <a href="https://www.facebook.com/profile.php?id=61590692422833" target="_blank" rel="noopener noreferrer" aria-label="f - Facebook" onClick={() => gtag.event("social_click", { platform: "facebook", button_location: "footer" })}>f</a>
            <a href="https://www.instagram.com/digitalmarketingtenx?utm_source=qr&igsh=MW5zcmVoOWhlZ3M3ag==" target="_blank" rel="noopener noreferrer" aria-label="IG - Instagram" onClick={() => gtag.event("social_click", { platform: "instagram", button_location: "footer" })}>📸</a>
            <a href="https://linkedin.com/in/digitalmarketing-tenx-8278b440b" target="_blank" rel="noopener noreferrer" aria-label="in - LinkedIn" onClick={() => gtag.event("social_click", { platform: "linkedin", button_location: "footer" })}>in</a>
            <a href="https://x.com/DigitalTenx9" target="_blank" rel="noopener noreferrer" aria-label="X - Twitter" onClick={() => gtag.event("social_click", { platform: "twitter", button_location: "footer" })}>✕</a>
            <a href="https://medium.com/@digitalmarketingtenx" target="_blank" rel="noopener noreferrer" aria-label="M - Medium" onClick={() => gtag.event("social_click", { platform: "medium", button_location: "footer" })}>M</a>
            <a href="https://www.quora.com/profile/DIGITAL-MARKEING-TEN-X" target="_blank" rel="noopener noreferrer" aria-label="Q - Quora" onClick={() => gtag.event("social_click", { platform: "quora", button_location: "footer" })}>Q</a>
          </div>
        </div>
        <div>
          <h3>Company</h3>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about-us">About Us</Link></li>
            <li><Link href="/contact">Contact Us</Link></li>
            <li style={{ marginTop: "15px" }}>
              <Link 
                href="/admin/login" 
                style={{ 
                  display: "inline-flex", 
                  alignItems: "center",
                  padding: "6px 14px", 
                  background: "rgba(255,255,255,0.1)", 
                  color: "#fff", 
                  borderRadius: "6px", 
                  fontSize: "14px", 
                  fontWeight: "600",
                  transition: "background 0.2s"
                }}
                onMouseOver={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.2)"}
                onMouseOut={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
              >
                🔒 Admin Login
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3>Services</h3>
          <ul>
            <li><Link href="/seo-services">SEO</Link></li>
            <li><Link href="/services/google-ads">Google Ads</Link></li>
            <li><Link href="/services/e-commerce-marketing">E-commerce Marketing</Link></li>
            <li><Link href="/services/social-media-marketing">Social Media Marketing</Link></li>
            <li><Link href="/services/website-design">Website Design</Link></li>
            <li><Link href="/services/whatsapp-automation">WhatsApp Automation</Link></li>
          </ul>
        </div>
        <div className="footer-resources">
          <h3>Resources</h3>
          <ul>
            <li><Link href="/blog">Blog</Link></li>
            <li><a href="#">Case Studies</a></li>
            <li><a href="#">Marketing Guides</a></li>
          </ul>
        </div>
        <div className="footer-legal">
          <h3>Legal</h3>
          <ul>
            <li><Link href="/privacy-policy">Privacy Policy</Link></li>
            <li><Link href="/terms-and-conditions">Terms &amp; Conditions</Link></li>
          </ul>
        </div>
        <div className="footer-contact">
          <h3>Contact</h3>
          <div className="contact-item">
            <a href="tel:+919392251739" className="footer-contact-link" onClick={() => gtag.event("phone_click", { phone_number: "+919392251739", button_location: "footer" })}><span>📞</span><span>+91 93922 51739</span></a>
          </div>
          <div className="footer-contact-item">
            <a href="mailto:info@digitalmarketingtenx.com" className="footer-contact-link" onClick={() => gtag.event("email_click", { email_address: "info@digitalmarketingtenx.com", button_location: "footer" })}><span>📧</span><span>info@digitalmarketingtenx.com</span></a>
          </div>
          <div className="contact-item"><span>📍</span><span>Regus Level 4, Gumidelli Towers, Begumpet, Hyderabad - 500016</span></div>
        </div>
      </footer>
      <div className="footer-bottom">
        © Digital Marketing TenX. All Rights Reserved.
      </div>
    </>
  );
}

