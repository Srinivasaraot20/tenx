"use client";

import { useEffect, useState } from "react";
import ConsultationModal from "./ConsultationModal";
import * as gtag from "@/lib/gtag";

export default function WhatsAppButton() {
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setShowScrollBtn(window.scrollY > 300);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleWhatsAppClick = () => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Professionally pre-filled template message
    const whatsappMessage = `Hello Digital Marketing TenX Team 👋

I'm interested in your services. Please find my details below:

━━━━━━━━━━━━━━━━━━

👤 Name: 
🏢 Company: 
📞 Phone: 
📧 Email: 
🌐 Website: 
📌 Service Required: [Website Design / SEO / Google Ads / Social Media Marketing / E-Commerce Marketing / WhatsApp Automation / Other]
📝 Short Message: 

━━━━━━━━━━━━━━━━━━

Page: ${window.location.href}
Source: Website
Date: ${new Date().toLocaleDateString()}
Time: ${new Date().toLocaleTimeString()}

Please contact me. Thank you!`;

    const encodedText = encodeURIComponent(whatsappMessage);
    const whatsappNumber = "919392251739";
    
    const targetUrl = isMobile
      ? `https://wa.me/${whatsappNumber}?text=${encodedText}`
      : `https://web.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedText}`;

    // Track analytics click
    gtag.event("whatsapp_click", { button_location: "floating" });
    if (window.fbq) {
      window.fbq("track", "Contact", {
        content_name: "Floating WhatsApp Button"
      });
    }

    console.log("Floating WhatsApp Button clicked. Redirecting to:", targetUrl);
    window.open(targetUrl, "_blank");
  };

  return (
    <>
      <div className="float-btns">
        <button 
          onClick={handleWhatsAppClick}
          className="float-btn wa" 
          aria-label="Chat on WhatsApp"
          style={{ border: "none", outline: "none" }}
        >
          <span className="wa-tooltip">Chat with Us on WhatsApp</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.403.002 9.803-4.381 9.806-9.761.002-2.605-1.01-5.053-2.85-6.897C16.388 2.103 13.943 1.09 11.35 1.09 5.945 1.09 1.548 5.47 1.546 10.854c-.001 1.562.415 3.09 1.202 4.454L1.758 20.6l5.526-1.439c.003-.002.006-.003.009-.004-.009-.011.666-.395.894-.403zm12.383-6.602c-.31-.156-1.838-.908-2.126-1.012-.29-.104-.501-.156-.712.156-.211.314-.818 1.012-1.003 1.222-.185.21-.37.234-.68.079-.31-.156-1.31-.483-2.495-1.539-.922-.822-1.544-1.838-1.725-2.15-.18-.31-.019-.478.135-.632.14-.138.31-.362.466-.543.156-.181.208-.31.31-.517.104-.207.052-.389-.026-.544-.078-.156-.712-1.713-.976-2.348-.258-.622-.52-.538-.712-.548-.184-.01-.396-.012-.607-.012-.211 0-.555.08-.846.398-.289.314-1.107 1.084-1.107 2.645 0 1.561 1.135 3.07 1.294 3.278.158.207 2.23 3.407 5.4 4.773.755.325 1.343.519 1.803.666.758.241 1.448.207 1.993.126.607-.09 1.838-.75 2.097-1.448.259-.698.259-1.294.182-1.418-.078-.124-.29-.197-.6-.353z" />
          </svg>
        </button>
        <button 
          className="float-btn up" 
          onClick={scrollToTop}
          style={{ 
            opacity: showScrollBtn ? 1 : 0, 
            pointerEvents: showScrollBtn ? "auto" : "none",
            border: "none",
            outline: "none"
          }}
          aria-label="Scroll to Top"
        >
          ↑
        </button>
      </div>
      <ConsultationModal />
    </>
  );
}
