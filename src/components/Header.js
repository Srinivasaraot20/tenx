"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as gtag from "@/lib/gtag";

const serviceMenuItems = [
  {
    title: "Website Design",
    href: "/services/website-design",
    icon: "/website-design.webp",
  },
  {
    title: "Google Ads",
    href: "/services/google-ads",
    icon: "/google-ads.webp",
  },
  {
    title: "SEO",
    href: "/seo-services",
    icon: "/seo.webp",
  },
  {
    title: "Social Media Marketing",
    href: "/services/social-media-marketing",
    icon: "/smm.webp",
  },
  {
    title: "E-Commerce Marketing",
    href: "/services/e-commerce-marketing",
    icon: "/e-commerce.webp",
  },
  {
    title: "WhatsApp Automation",
    href: "/services/whatsapp-automation",
    icon: "/whatsapp-automation.webp",
  }
];

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [isDesktopDropdownOpen, setIsDesktopDropdownOpen] = useState(false);
  const dropdownTimeoutRef = useRef(null);

  const handleMouseEnterDesktop = useCallback(() => {
    if (window.innerWidth >= 1024) {
      if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
      setIsDesktopDropdownOpen(true);
    }
  }, []);

  const handleMouseLeaveDesktop = useCallback(() => {
    if (window.innerWidth >= 1024) {
      dropdownTimeoutRef.current = setTimeout(() => {
        setIsDesktopDropdownOpen(false);
      }, 200); // 200ms delay before closing
    }
  }, []);

  // Lock scroll when drawer is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add("drawer-open");
    } else {
      document.body.classList.remove("drawer-open");
    }
    return () => {
      document.body.classList.remove("drawer-open");
    };
  }, [isMobileMenuOpen]);

  const handleLinkClick = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const toggleAccordion = useCallback((e) => {
    e.preventDefault();
    setIsAccordionOpen((prev) => !prev);
  }, []);

  return (
    <>
      <nav className="header-nav">
        <Link href="/" className="logo" onClick={handleLinkClick}>
          <Image
            src="/logo.webp"
            alt="Digital Marketing TenX Logo"
            width={56}
            height={56}
            className="logo-img-file"
            priority
          />
          <span className="brand-name">
            Digital Marketing <span className="brand-highlight">TenX</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="nav-links desktop-only-flex">
          <Link href="/" className={pathname === "/" ? "active" : ""}>
            Home
          </Link>
          <Link href="/about-us" className={pathname === "/about-us" ? "active" : ""}>
            About Us
          </Link>
          
          <div 
            className={`nav-item-dropdown ${isDesktopDropdownOpen ? "open" : ""}`}
            onMouseEnter={handleMouseEnterDesktop}
            onMouseLeave={handleMouseLeaveDesktop}
          >
            <Link 
              href="/services"
              className={`services-dropdown-btn ${pathname.startsWith("/services") ? "active" : ""}`}
            >
              Services 
              <svg className="chevron-icon" width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: "4px" }}>
                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>

            <div className="services-list-dropdown" style={{ minWidth: "220px", padding: "8px" }}>
              <div className="dropdown-arrow-pointer"></div>
              {serviceMenuItems.map((item, index) => (
                <Link 
                  key={index} 
                  href={item.href} 
                  className="dropdown-list-item" 
                  style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 12px", borderRadius: "6px" }} 
                  onClick={handleLinkClick}
                >
                  {item.icon && (
                    <div className="dropdown-item-icon-wrap" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "24px", height: "24px", minWidth: "24px", borderRadius: "6px", backgroundColor: "#f8fafc", border: "1px solid #f1f5f9" }}>
                      <Image 
                        src={item.icon} 
                        alt="" 
                        width={14} 
                        height={14} 
                        style={{ objectFit: "contain", width: "auto", height: "auto" }}
                      />
                    </div>
                  )}
                  <span className="dropdown-list-text" style={{ fontSize: "13.5px", fontWeight: "600", color: "#1e293b" }}>{item.title}</span>
                </Link>
              ))}
            </div>
          </div>



          <Link href="/blog" className={pathname.startsWith('/blog') ? 'active' : ''} onClick={handleLinkClick}>Blog</Link>
          <Link href="/contact">Contact</Link>
          
        </div>

        <button className="btn-primary desktop-only-btn" onClick={() => {
          gtag.event({ action: "book_consultation_click", category: "Engagement", label: "Header Button" });
          window.dispatchEvent(new CustomEvent("trigger-consultation-modal"));
        }}>📅 Book Free Consultation</button>

        {/* Hamburger Menu Trigger */}
        <button 
          className={`hamburger-btn mobile-tablet-only ${isMobileMenuOpen ? "open" : ""}`} 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      </nav>

      {/* Backdrop Blur Overlay */}
      {isMobileMenuOpen && (
        <div className="drawer-overlay" onClick={handleLinkClick}></div>
      )}

      {/* Slide-out Drawer */}
      <div className={`ga-mobile-drawer ${isMobileMenuOpen ? "open" : ""}`}>
        <div className="drawer-header">
          <div className="logo">
            <Image src="/logo.webp" alt="TenX Logo" width={40} height={40} />
            <span className="brand-name" style={{ fontWeight: 800, fontSize: "15px" }}>TenX Menu</span>
          </div>
          <button className="drawer-close-btn" onClick={handleLinkClick}>✕</button>
        </div>

        <div className="drawer-content">
          {/* Search bar inside drawer */}
          <div className="drawer-search">
            <input type="text" placeholder="Search services..." />
            <span>🔍</span>
          </div>

          <div className="drawer-menu">
            <Link href="/" className={pathname === "/" ? "active" : ""} onClick={handleLinkClick}>
              Home
            </Link>
            <Link href="/about-us" className={pathname === "/about-us" ? "active" : ""} onClick={handleLinkClick}>
              About Us
            </Link>

            {/* Accordion dropdown for Services */}
            <div className="drawer-accordion">
              <div className="drawer-accordion-btn" style={{ padding: 0 }}>
                <Link 
                  href="/services" 
                  onClick={handleLinkClick} 
                  className={pathname.startsWith("/services") ? "active" : ""}
                  style={{ textDecoration: 'none', color: 'inherit', flexGrow: 1, padding: '8px 0', display: 'flex', alignItems: 'center' }}
                >
                  Services
                </Link>
                <button 
                  onClick={toggleAccordion}
                  aria-label="Toggle Services Menu"
                  style={{ background: 'none', border: 'none', padding: '8px 10px', margin: '-8px -10px -8px 0', cursor: 'pointer', display: 'flex', alignItems: 'center', color: 'inherit' }}
                >
                  <svg className={`chevron-icon ${isAccordionOpen ? "rotated" : ""}`} width="12" height="8" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>

              <div className={`drawer-accordion-content ${isAccordionOpen ? "expanded" : ""}`}>
                {serviceMenuItems.map((item, index) => (
                  <Link 
                    key={index}
                    href={item.href} 
                    className="drawer-accordion-sublink"
                    style={{ display: "flex", alignItems: "center", gap: "10px" }}
                    onClick={handleLinkClick}
                  >
                    {item.icon && (
                      <Image 
                        src={item.icon} 
                        alt="" 
                        width={14} 
                        height={14} 
                        style={{ objectFit: "contain", width: "auto", height: "auto" }}
                      />
                    )}
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>



            <Link href="/blog" onClick={handleLinkClick} className={pathname.startsWith('/blog') ? 'active' : ''}>Blog</Link>
            <Link href="/contact" onClick={handleLinkClick}>Contact</Link>

          </div>

          {/* Contact quick actions */}
          <div className="drawer-actions">
            <button className="btn-primary w-full" onClick={() => { 
              gtag.event({ action: "book_consultation_click", category: "Engagement", label: "Mobile Menu Button" });
              handleLinkClick(); 
              window.dispatchEvent(new CustomEvent("trigger-consultation-modal")); 
            }}>📅 Book Free Consultation</button>
            <a href="tel:+919392251739" className="action-link phone-action" onClick={() => gtag.event({ action: "phone_call_click", category: "Contact", label: "Mobile Menu Phone" })}>
              <span className="icon">📞</span>
              <span>+91 93922 51739</span>
            </a>
            <a href="https://wa.me/919392251739" className="action-link whatsapp-action" target="_blank" rel="noopener noreferrer" onClick={() => {
              gtag.event({ action: "whatsapp_click", category: "Contact", label: "Mobile Menu WhatsApp" });
              handleLinkClick();
            }}>
              💬 WhatsApp Chat
            </a>
          </div>

          {/* Social icons */}
          <div className="drawer-socials">
            <a href="https://www.facebook.com/profile.php?id=61590692422833" target="_blank" rel="noopener noreferrer" aria-label="Facebook">FB</a>
            <a href="https://x.com/DigitalTenx9" target="_blank" rel="noopener noreferrer" aria-label="X">X</a>
            <a href="https://linkedin.com/in/digitalmarketing-tenx-8278b440b" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">LN</a>
            <a href="https://www.instagram.com/digitalmarketingtenx?utm_source=qr&igsh=MW5zcmVoOWhlZ3M3ag==" target="_blank" rel="noopener noreferrer" aria-label="Instagram">IG</a>
          </div>
        </div>
      </div>
    </>
  );
}
