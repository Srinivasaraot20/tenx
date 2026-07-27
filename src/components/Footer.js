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
            <picture>
              <source srcSet="/logo.webp" type="image/webp" />
              <img 
                src="/logo.webp" 
                alt="Digital Marketing TenX" 
                width={56} 
                height={56} 
                className="logo-img-file footer-logo" 
              />
            </picture>
            <span className="brand-name footer-brand-name">
              Digital Marketing <span className="brand-highlight">TenX</span>
            </span>
          </Link>
          <p>Transform your digital presence with AI-powered marketing, high-performance web solutions, and intelligent automation that increase traffic, generate qualified leads, and accelerate business growth.</p>
          <div className="social-links">
            <a href="https://www.facebook.com/profile.php?id=61590692422833" target="_blank" rel="noopener noreferrer" aria-label="Facebook">f</a>
            <a href="https://www.instagram.com/digitalmarketingtenx?utm_source=qr&igsh=MW5zcmVoOWhlZ3M3ag==" target="_blank" rel="noopener noreferrer" aria-label="Instagram">📸</a>
            <a href="https://linkedin.com/in/digitalmarketing-tenx-8278b440b" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">in</a>
            <a href="https://x.com/DigitalTenx9" target="_blank" rel="noopener noreferrer" aria-label="X">✕</a>
            <a href="https://medium.com/@digitalmarketingtenx" target="_blank" rel="noopener noreferrer" aria-label="Medium">M</a>
            <a href="https://www.quora.com/profile/DIGITAL-MARKEING-TEN-X" target="_blank" rel="noopener noreferrer" aria-label="Quora">Q</a>
          </div>
        </div>
        <div>
          <h4>Company</h4>
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
          <h4>Services</h4>
          <ul>
            <li><Link href="/seo-services">SEO</Link></li>
            <li><Link href="/services/google-ads">Google Ads</Link></li>
            <li><Link href="/services/e-commerce-marketing">E-commerce Marketing</Link></li>
            <li><Link href="/services/social-media-marketing">Social Media Marketing</Link></li>
            <li><Link href="/services/website-design">Website Design</Link></li>
            <li><Link href="/services/whatsapp-automation">WhatsApp Automation</Link></li>
          </ul>
        </div>
        <div>
          <h4>Resources</h4>
          <ul>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Case Studies</a></li>
            <li><a href="#">Marketing Guides</a></li>
          </ul>
          <h4 style={{ marginTop: "20px" }}>Legal</h4>
          <ul>
            <li><Link href="/privacy-policy">Privacy Policy</Link></li>
            <li><Link href="/terms-and-conditions">Terms &amp; Conditions</Link></li>
          </ul>
        </div>
        <div>
          <h4>Contact</h4>
          <div className="contact-item">
            <a href="tel:+919392251739" className="footer-contact-link" onClick={() => gtag.event({ action: "phone_call_click", category: "Contact", label: "Footer Phone" })}><span>📞</span><span>+91 93922 51739</span></a>
          </div>
          <div className="footer-contact-item">
            <a href="mailto:info@digitalmarketingtenx.com" className="footer-contact-link" onClick={() => gtag.event({ action: "email_click", category: "Contact", label: "Footer Email" })}><span>📧</span><span>info@digitalmarketingtenx.com</span></a>
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
