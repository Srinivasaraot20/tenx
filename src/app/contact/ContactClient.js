"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import * as gtag from "@/lib/gtag";
import { servicePricing } from "../../config/pricing";
import "./contact.css";

export default function ContactClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const serviceId = searchParams ? searchParams.get("service") : null;
  const packageId = searchParams ? searchParams.get("package") : null;

  const [selectedPackageInfo, setSelectedPackageInfo] = useState(null);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    companyName: "",
    serviceRequired: "",
    message: ""
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [faqActiveIndex, setFaqActiveIndex] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox" && name === "agreePrivacy") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    // Clear validation error on change
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  useEffect(() => {
    if (serviceId && packageId && servicePricing[serviceId]) {
      const serviceData = servicePricing[serviceId];
      const packageData = serviceData.packages[packageId];
      if (packageData) {
        setSelectedPackageInfo({
          serviceName: serviceData.title,
          packageName: packageData.name,
          price: packageData.price,
          period: packageData.period || ""
        });
        
        const serviceKeyMap = {
          "seo": "SEO",
          "google-ads": "Google Ads",
          "website-design": "Website Design",
          "social-media": "Social Media Marketing",
          "ecommerce": "E-Commerce Marketing",
          "whatsapp-automation": "WhatsApp Automation"
        };
        
        const key = serviceKeyMap[serviceId];
        if (key) {
          setFormData(prev => ({
            ...prev,
            serviceRequired: key,
            message: `[Selected Package: ${serviceData.title} - ${packageData.name} (${packageData.price}${packageData.period || ""})]\n\n`
          }));
        }
      }
    }
  }, [serviceId, packageId]);



  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^\+?[0-9\s-]{10,15}$/.test(formData.phone.replace(/\s+/g, ""))) {
      newErrors.phone = "Please enter a valid phone number (10-15 digits).";
    }
    if (!formData.serviceRequired) {
      newErrors.serviceRequired = "Please select a service.";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Track validation error
      gtag.event("contact_form_error", { error_type: "validation", form_name: "contact_page_form" });

      // Scroll to first error
      const firstErrorKey = Object.keys(validationErrors)[0];
      const errorElement = document.getElementsByName(firstErrorKey)[0];
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    gtag.event("contact_form_start", { form_name: "contact_page_form" });
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      const res = await response.json();

        if (response.status === 201 || res.success) {
          gtag.event("contact_form_success", { form_name: "contact_page_form" });
          setFormData({
          fullName: "", companyName: "", email: "", phone: "", serviceRequired: "", message: ""
        });
        setShowSuccessModal(true);
      } else {
        gtag.event("contact_form_error", { error_type: "api_error", error_message: res.message, form_name: "contact_page_form" });
        setErrors({ form: res.message || "Failed to submit request." });
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (error) {
      gtag.event("contact_form_error", { error_type: "network_error", form_name: "contact_page_form" });
      setErrors({ form: "Network error. Please try again later." });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    setIsSubmitting(false);
  };

  const handleModalClose = () => {
    setShowSuccessModal(false);
    // Redirect to Thank You page
    router.push("/thank-you");
  };

  const toggleFaq = (index) => {
    setFaqActiveIndex(faqActiveIndex === index ? null : index);
  };

  const triggerConsultation = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("trigger-consultation-modal"));
    }
  };

  const faqs = [
    { q: "How quickly will you respond?", a: "We usually respond within 24 business hours." },
    { q: "Do you offer free consultations?", a: "Yes, we provide a free consultation for every new enquiry." },
    { q: "Do you work with businesses across India?", a: "Yes, we serve clients throughout India." },
    { q: "Can I request a custom marketing package?", a: "Yes, all our services can be customized." },
    { q: "Do you provide monthly reports?", a: "Yes, we provide detailed performance reports for ongoing projects." }
  ];

  const whatsappHref = selectedPackageInfo 
    ? `https://wa.me/919392251739?text=${encodeURIComponent(`Hi Digital Marketing TenX,\n\nI'm interested in your ${selectedPackageInfo.serviceName}.\n\nPackage: ${selectedPackageInfo.packageName}\nPrice: ${selectedPackageInfo.price}${selectedPackageInfo.period}\n\nPlease share more details.`)}`
    : "https://wa.me/919392251739";

  return (
    <div className="contact-page-content">
      {/* 1. HERO SECTION */}
      <section className="con-hero">
        <div className="con-floating-item item-1"></div>
        <div className="con-floating-item item-2"></div>
        <div className="con-wrap">
          <div className="con-hero-grid">
            <div className="con-hero-content">
              <span className="con-hero-eyebrow">CONTACT US</span>
              <h1>Let's <span style={{ color: "#ff5722" }}>Grow</span> Your Business Together</h1>
              <p>
                Have a project in mind? Get in touch with Digital Marketing TenX for expert SEO, Google Ads, Social Media Marketing, Website Design, and WhatsApp Automation services.
              </p>
              
              <div className="what-happens-next" style={{ marginTop: "24px", padding: "20px", background: "#f8fafc", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                <h3 style={{ fontSize: "1.1rem", fontWeight: "700", marginBottom: "12px", color: "#0f172a" }}>What Happens Next?</h3>
                <ul style={{ listStyleType: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                  <li style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "0.95rem", color: "#475569" }}>
                    <span style={{ background: "#e0f2fe", color: "#0369a1", fontWeight: "bold", padding: "2px 8px", borderRadius: "6px" }}>1</span>
                    <span><strong>Submit Your Request:</strong> Fill out the form or WhatsApp us. We respond within 2 hours from our Hyderabad office.</span>
                  </li>
                  <li style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "0.95rem", color: "#475569" }}>
                    <span style={{ background: "#e0f2fe", color: "#0369a1", fontWeight: "bold", padding: "2px 8px", borderRadius: "6px" }}>2</span>
                    <span><strong>Free Audit:</strong> Our team reviews your current <Link href="/services" style={{color: "#ff5722", textDecoration: "underline"}}>marketing services</Link> and digital presence.</span>
                  </li>
                  <li style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "0.95rem", color: "#475569" }}>
                    <span style={{ background: "#e0f2fe", color: "#0369a1", fontWeight: "bold", padding: "2px 8px", borderRadius: "6px" }}>3</span>
                    <span><strong>Growth Strategy Session:</strong> Jump on a free call to discuss a tailored roadmap. <Link href="/about-us" style={{color: "#ff5722", textDecoration: "underline"}}>Learn more about us</Link>.</span>
                  </li>
                </ul>
              </div>

              <div className="con-hero-buttons" style={{ marginTop: "30px" }}>
                <button onClick={triggerConsultation} className="con-btn-primary">
                  📅 Book a Free Consultation
                </button>
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="con-btn-secondary">
                  💬 Chat with Our Experts on WhatsApp
                </a>
              </div>
            </div>

            {/* Coded Graphic Illustration */}
            <div className="con-hero-graphic-box">
              <img 
                src="/con-hero.webp" 
                alt="Contact Digital Marketing TenX" 
                className="con-hero-main-graphic"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. CONTACT INFORMATION CARDS */}
      <section className="con-section con-section-white">
        <div className="con-wrap">
          <div className="con-info-grid">
            
            {/* Card 1: Head Office */}
            <div className="con-info-card">
              <div className="con-card-icon-box">📍</div>
              <h3>Head Office</h3>
              <p className="con-office-address">
                Level 4, Gumidelli Towers, 39 to 44, Old Patigadda, Prakash Nagar, Begumpet, Hyderabad, Telangana 500016
              </p>
              <div className="con-card-actions">
                <a 
                  href="https://maps.google.com/?q=Gumidelli+Towers+Begumpet+Hyderabad" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="con-btn-primary"
                  onClick={() => gtag.event("get_directions_click", { location: "head_office" })}
                >
                  📍 Get Directions
                </a>
              </div>
            </div>

            {/* Card 2: Nandyal Branch */}
            <div className="con-info-card">
              <div className="con-card-icon-box">📍</div>
              <h3>Branch Office @ Nandyal</h3>
              <p className="con-office-address">
                H. No. 26-516D, Railway Station Rd,<br />
                Opp. LIC Office, Nandyal,<br />
                Andhra Pradesh - 518502
              </p>
              <div className="con-card-actions">
                <a 
                  href="https://maps.google.com/?q=26-516D+Railway+Station+Rd+Nandyal" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="con-btn-primary"
                  onClick={() => gtag.event("get_directions_click", { location: "nandyal_branch" })}
                >
                  📍 Get Directions
                </a>
              </div>
            </div>

            

            

            {/* Card 5: Phone */}
            <div className="con-info-card">
              <div className="con-card-icon-box">📞</div>
              <h3>Phone</h3>
              <p>
                Call or text our customer support lines for direct assistance and quick setup advice.
              </p>
              <p style={{ fontSize: "16px", fontWeight: 800, color: "var(--con-text-dark)" }}>
                +91 93922 51739
              </p>
              <div className="con-card-actions">
                <a href="tel:+919392251739" className="con-btn-primary" onClick={() => gtag.event("phone_click", { phone_number: "+919392251739", button_location: "contact_page_card" })}>Call Now</a>
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="con-btn-secondary" onClick={() => gtag.event("whatsapp_click", { button_location: "contact_page_card" })}>WhatsApp</a>
              </div>
            </div>

            {/* Card 3: Email & Business Details */}
            <div className="con-info-card">
              <div className="con-card-icon-box">✉️</div>
              <h3>Email & Support</h3>
              <p>
                Send us your business details or RFP document. Our team answers within 2 hours.
              </p>
              <p style={{ fontSize: "14px", fontWeight: 700, color: "var(--con-text-dark)" }}>
                info@digitalmarketingtenx.com
              </p>
              <div className="con-card-actions">
                <a href="mailto:info@digitalmarketingtenx.com" className="con-btn-primary" onClick={() => gtag.event("email_click", { email_address: "info@digitalmarketingtenx.com", button_location: "contact_page_card" })}>Send Email</a>
                <a href="https://www.digitalmarketingtenx.com" target="_blank" rel="noopener noreferrer" className="con-btn-secondary" onClick={() => gtag.event("website_click", { destination: "digitalmarketingtenx.com" })}>Visit Website</a>
              </div>
            </div>

          </div>

          {/* Business Hours Banner */}
          <div className="con-info-card" style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", padding: "20px 30px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ fontSize: "20px" }}>🕒</span>
              <strong style={{ color: "var(--con-text-dark)" }}>Business Hours:</strong>
              <span style={{ fontSize: "14px", color: "var(--con-text-muted)" }}>Mon - Sat: 9:30 AM - 6:30 PM | Sun: Closed</span>
            </div>
            <span style={{ fontSize: "12px", color: "var(--con-primary)", fontWeight: 700 }}>Local Time: Hyderabad, India (GMT+5:30)</span>
          </div>

        </div>
      </section>


      {/* 4. CONTACT FORM */}
      <section className="con-section con-section-white" id="inquiry-form">
        <div className="con-wrap">
          <div className="con-form-container">
            <h3>Request a Free Consultation</h3>

            {selectedPackageInfo && (
              <div style={{
                background: "var(--con-light)",
                border: "1px solid var(--con-primary)",
                borderRadius: "12px",
                padding: "20px",
                marginBottom: "30px",
                display: "flex",
                flexDirection: "column",
                gap: "8px"
              }}>
                <div style={{ fontSize: "14px", color: "var(--con-text-muted)", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                  Selected Service
                </div>
                <div style={{ fontSize: "20px", fontWeight: "700", color: "var(--con-text-dark)" }}>
                  {selectedPackageInfo.serviceName}
                </div>
                <div style={{ display: "flex", alignItems: "baseline", gap: "10px", marginTop: "4px", flexWrap: "wrap" }}>
                  <span style={{ fontSize: "18px", fontWeight: "600", color: "var(--con-primary)" }}>{selectedPackageInfo.packageName} Package</span>
                  <span style={{ fontSize: "18px", fontWeight: "800", color: "var(--con-text-dark)" }}>
                    {selectedPackageInfo.price}<span style={{ fontSize: "14px", fontWeight: "600", color: "var(--con-text-muted)" }}>{selectedPackageInfo.period}</span>
                  </span>
                </div>
              </div>
            )}
            
            {errors.form && (
              <div className="p-3 mb-4 text-sm font-medium text-red-800 bg-red-100 rounded-lg">
                ⚠️ {errors.form}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="con-form-grid">
                {/* Full Name */}
                <div className="con-form-group con-form-group-full">
                  <label htmlFor="fullName">Full Name <span>*</span></label>
                  <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="John Doe" />
                  {errors.fullName && <span style={{ color: "#ef4444", fontSize: "11px" }}>{errors.fullName}</span>}
                </div>

                {/* Phone */}
                <div className="con-form-group">
                  <label htmlFor="phone">Phone Number <span>*</span></label>
                  <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+91 98765 43210" />
                  {errors.phone && <span style={{ color: "#ef4444", fontSize: "11px" }}>{errors.phone}</span>}
                </div>

                {/* Email */}
                <div className="con-form-group">
                  <label htmlFor="email">Email Address <span>*</span></label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="john@example.com" />
                  {errors.email && <span style={{ color: "#ef4444", fontSize: "11px" }}>{errors.email}</span>}
                </div>

                {/* Company Name */}
                <div className="con-form-group">
                  <label htmlFor="companyName">Company Name (Optional)</label>
                  <input type="text" id="companyName" name="companyName" value={formData.companyName} onChange={handleInputChange} placeholder="Acme Corporation" />
                </div>

                {/* Service Required */}
                <div className="con-form-group">
                  <label htmlFor="serviceRequired">Service Required <span>*</span></label>
                  <select id="serviceRequired" name="serviceRequired" value={formData.serviceRequired} onChange={handleInputChange}>
                    <option value="">Select Service</option>
                    <option value="SEO">SEO Services</option>
                    <option value="Google Ads">Google Ads</option>
                    <option value="Social Media Marketing">Social Media Marketing</option>
                    <option value="Website Design">Website Design</option>
                    <option value="WhatsApp Automation">WhatsApp Automation</option>
                    <option value="Branding">Branding</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.serviceRequired && <span style={{ color: "#ef4444", fontSize: "11px" }}>{errors.serviceRequired}</span>}
                </div>

                {/* Message */}
                <div className="con-form-group con-form-group-full">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" name="message" rows="4" value={formData.message} onChange={handleInputChange} placeholder="How can we help you?"></textarea>
                </div>
              </div>

              {/* Form Action Buttons */}
              <div className="con-form-actions">
                <button type="submit" className="btn-submit" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting Inquiry..." : "🚀 Submit Inquiry"}
                </button>
                <button type="button" onClick={triggerConsultation} className="btn-consult">
                  📅 Book Strategy Call
                </button>
              </div>

            </form>
          </div>
        </div>
      </section>

      {/* SUCCESS MODAL POPUP */}
      {showSuccessModal && (
        <div className="con-modal-overlay">
          <div className="con-modal-card">
            <div className="con-modal-success-icon">✓</div>
            <h3>Inquiry Submitted!</h3>
            <p>
              Thank you for contacting Digital Marketing TenX. Your consultation request has been submitted successfully.
            </p>
            <p style={{ fontSize: "13px", color: "var(--con-text-muted)", margin: "10px 0 15px" }}>
              Our team of experts will review your requirements and contact you shortly via your preferred communication method.
            </p>
            <button onClick={handleModalClose} className="con-btn-primary" style={{ padding: "10px 24px" }}>
              Proceed
            </button>
          </div>
        </div>
      )}

      {/* 7. WHY CONTACT US SECTION */}
      <section className="con-section con-section-light">
        <div className="con-wrap">
          <div className="con-title-center">
            <span className="con-eyebrow">🛡️ Partnering with TenX</span>
            <h2>Why Choose Digital Marketing TenX?</h2>
            <p>We work as your dedicated marketing department to maximize your return on ad spend and sales.</p>
          </div>

          <div className="con-why-grid">
            
            <div className="con-why-card">
              <div className="con-why-icon" style={{ background: "rgba(16, 185, 129, 0.08)", color: "#10b981" }}>📅</div>
              <h4>Free Consultation</h4>
              <p style={{ fontSize: "12.5px", color: "var(--con-text-muted)", margin: 0 }}>Get a complimentary strategy plan session.</p>
            </div>

            <div className="con-why-card">
              <div className="con-why-icon" style={{ background: "rgba(37, 99, 235, 0.08)", color: "#2563eb" }}>📈</div>
              <h4>Custom Growth Strategy</h4>
              <p style={{ fontSize: "12.5px", color: "var(--con-text-muted)", margin: 0 }}>Tailored campaigns optimized for your specific goals.</p>
            </div>

            <div className="con-why-card">
              <div className="con-why-icon" style={{ background: "rgba(255, 107, 0, 0.08)", color: "var(--con-orange)" }}>🎓</div>
              <h4>Experienced Marketing Experts</h4>
              <p style={{ fontSize: "12.5px", color: "var(--con-text-muted)", margin: 0 }}>Google, Meta, and Hubspot certified staff.</p>
            </div>

            <div className="con-why-card">
              <div className="con-why-icon" style={{ background: "rgba(124, 58, 237, 0.08)", color: "#7c3aed" }}>💎</div>
              <h4>Transparent Pricing</h4>
              <p style={{ fontSize: "12.5px", color: "var(--con-text-muted)", margin: 0 }}>No hidden retainer charges or setup fees.</p>
            </div>

            <div className="con-why-card">
              <div className="con-why-icon" style={{ background: "rgba(13, 148, 136, 0.08)", color: "#0d9488" }}>⚡</div>
              <h4>Fast Response Time</h4>
              <p style={{ fontSize: "12.5px", color: "var(--con-text-muted)", margin: 0 }}>Average response time of under 2 hours.</p>
            </div>

            <div className="con-why-card">
              <div className="con-why-icon" style={{ background: "rgba(225, 29, 72, 0.08)", color: "#e11d48" }}>📞</div>
              <h4>Dedicated Support</h4>
              <p style={{ fontSize: "12.5px", color: "var(--con-text-muted)", margin: 0 }}>24/7 Slack & WhatsApp support access.</p>
            </div>

          </div>
        </div>
      </section>

      {/* SERVICES WE CAN HELP WITH */}
      <section className="con-section con-section-white">
        <div className="con-wrap">
          <div className="con-title-center">
            <span className="con-eyebrow">🚀 OUR EXPERTISE</span>
            <h2>Services We Can Help With</h2>
            <p>Comprehensive digital marketing solutions tailored to grow your business.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginTop: '40px' }}>
            {[
              { name: "Website Design", icon: "/website-design.webp" },
              { name: "Google Ads", icon: "/google-ads.webp" },
              { name: "SEO", icon: "/seo.webp" },
              { name: "Social Media Marketing", icon: "/smm.webp" },
              { name: "E-Commerce Marketing", icon: "/e-commerce.webp" },
              { name: "WhatsApp Automation", icon: "/whatsapp-automation.webp" }
            ].map(service => (
              <div key={service.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '30px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', fontWeight: 700, fontSize: '18px', color: '#0f172a', textAlign: 'center', transition: 'all 0.3s ease' }}>
                <img src={service.icon} alt={service.name} style={{ width: '40px', height: '40px', marginBottom: '16px', objectFit: 'contain' }} />
                {service.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. OUR SERVICE AREAS */}
      <section className="con-section con-section-light">
        <div className="con-wrap">
          <div className="con-title-center">
            <span className="con-eyebrow">🌐 SERVICE REGIONS</span>
            <h2>Our Service Areas</h2>
            <p>While serving clients locally in Hyderabad, we support online stores and businesses globally.</p>
          </div>

          <div className="con-areas-cloud">
            <span className="con-area-tag">Hyderabad</span>
            <span className="con-area-tag">Secunderabad</span>
            <span className="con-area-tag">Begumpet</span>
            <span className="con-area-tag">Hitech City</span>
            <span className="con-area-tag">Madhapur</span>
            <span className="con-area-tag">Gachibowli</span>
            <span className="con-area-tag">Kondapur</span>
            <span className="con-area-tag">Jubilee Hills</span>
            <span className="con-area-tag">Banjara Hills</span>
            <span className="con-area-tag">Vijayawada</span>
            <span className="con-area-tag">Guntur</span>
            <span className="con-area-tag">Visakhapatnam</span>
            <span className="con-area-tag">Warangal</span>
            <span className="con-area-tag">Telangana</span>
            <span className="con-area-tag">Andhra Pradesh</span>
            <span className="con-area-tag">Pan India</span>
            <span className="con-area-tag">Worldwide Remote Services</span>
          </div>
        </div>
      </section>

      {/* GOOGLE MAP */}
      <section style={{ width: '100%', height: '400px', background: '#eee' }}>
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.6666687000003!2d78.4664!3d17.4447!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb90a187a41295%3A0xe54e63b368739cf9!2sGumidelli%20Towers!5e0!3m2!1sen!2sin!4v1624800000000!5m2!1sen!2sin" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen="" 
          loading="lazy"
          title="Google Maps Location - Digital Marketing TenX"
        ></iframe>
      </section>

      {/* 10. FAQ SECTION */}
      <section className="con-section con-section-white">
        <div className="con-wrap">
          <div className="con-title-center">
            <span className="con-eyebrow">❓ Got Questions?</span>
            <h2>Frequently Asked Questions</h2>
            <p>Clear, straightforward answers about scheduling, working together, and local services.</p>
          </div>

          <div className="seo-faq-accordion" style={{ maxWidth: "800px", margin: "24px auto 0" }}>
            {faqs.map((faq, i) => (
              <div key={i} className={`seo-faq-item ${faqActiveIndex === i ? "open" : ""}`}>
                <button className="seo-faq-question-btn" onClick={() => toggleFaq(i)}>
                  <h3 style={{ fontSize: "inherit", fontWeight: "inherit", margin: 0, padding: 0 }}>{faq.q}</h3>
                  <svg className="chevron-icon" width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <div 
                  className="seo-faq-answer"
                  style={{ maxHeight: faqActiveIndex === i ? "200px" : "0" }}
                >
                  <p>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. CTA BANNER */}
      <section className="cta-section" style={{ padding: "80px 40px" }}>
        <div className="cta-card-wrapper">
          <div className="cta-grid-bg"></div>
          
          {/* Floating Icons Removed */}

          <div className="cta-card-content">
            <h2>Ready to Grow Your Business?</h2>
            <p>
              Book your free consultation today and discover how our digital marketing experts can help you generate more leads, increase sales, and maximize ROI.
            </p>
            <div className="cta-card-buttons">
              <button className="btn-primary" onClick={triggerConsultation}>
                📅 Book Free Consultation
              </button>
              <a href="tel:+919392251739" className="btn-outline">
                Call Now
              </a>
              <a href="https://wa.me/919392251739" target="_blank" rel="noopener noreferrer" className="btn-outline">
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

