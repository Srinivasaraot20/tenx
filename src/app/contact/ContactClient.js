"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "./contact.css";

export default function ContactClient() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    email: "",
    phone: "",
    whatsApp: "",
    website: "",
    businessLocation: "",
    businessType: "",
    industry: "",
    services: {
      seo: false,
      googleAds: false,
      websiteDesign: false,
      socialMedia: false,
      ecommerce: false,
      whatsappAutomation: false,
      aiAutomation: false,
    },
    budget: "",
    timeline: "",
    projectDescription: "",
    contactMethod: "Email",
    agreePrivacy: false,
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

  const handleServiceCheckboxChange = (serviceKey) => {
    setFormData((prev) => ({
      ...prev,
      services: {
        ...prev.services,
        [serviceKey]: !prev.services[serviceKey],
      },
    }));
  };

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
    if (!formData.agreePrivacy) {
      newErrors.agreePrivacy = "You must agree to the Privacy Policy.";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Scroll to first error
      const firstErrorKey = Object.keys(validationErrors)[0];
      const errorElement = document.getElementsByName(firstErrorKey)[0];
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

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
        setFormData({
          fullName: "", companyName: "", email: "", phone: "", whatsApp: "",
          website: "", businessLocation: "", businessType: "", industry: "",
          services: { seo: false, googleAds: false, websiteDesign: false, socialMedia: false, ecommerce: false, whatsappAutomation: false, aiAutomation: false },
          budget: "", timeline: "", projectDescription: "", contactMethod: "Email", agreePrivacy: false
        });
        setShowSuccessModal(true);
      } else {
        setErrors({ form: res.message || "Failed to submit request." });
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (error) {
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
    {
      q: "Do you offer free consultation?",
      a: "Yes! We offer a completely free, 30-minute growth strategy consultation. During this session, our digital marketing experts will analyze your current online presence, identify gaps, and provide actionable recommendations to increase your traffic and sales. There are no obligations."
    },
    {
      q: "How quickly do you respond?",
      a: "We respond to all contact form inquiries and emails within 2 hours during business hours (Monday to Saturday). For urgent matters, you can reach out directly via WhatsApp for instant communication with our team."
    },
    {
      q: "Do you provide remote services?",
      a: "Yes, absolutely! While our main branch is in Hyderabad, we serve clients globally. We utilize Google Meet, Zoom, Slack, and detailed real-time reporting dashboards to collaborate seamlessly with businesses worldwide."
    },
    {
      q: "Do you work with international clients?",
      a: "Yes. Digital Marketing TenX works with e-commerce stores, B2B brands, and service businesses across India, North America, Europe, the Middle East, and Southeast Asia. We align our campaign strategies with target local market behaviors."
    },
    {
      q: "Can we visit your office?",
      a: "Of course! Our physical office is located at Level 4, Gumidelli Towers, Begumpet, Hyderabad. We recommend scheduling an appointment in advance via our contact form or phone call so we can prepare for your visit."
    },
    {
      q: "How do I schedule a meeting?",
      a: "You can schedule a meeting by submitting the contact form, clicking the 'Book Free Consultation' button to trigger our calendar scheduler, or messaging us directly on WhatsApp. We will confirm a time slot that works for you."
    },
    {
      q: "Do you provide website audits?",
      a: "Yes, we do. We provide comprehensive, manual website audits covering SEO ranking factors, mobile responsiveness, page speed optimization, checkout funnel checkout leaks, and conversion rate optimization (CRO) opportunities."
    },
    {
      q: "How much do your services cost?",
      a: "Our pricing depends on the project scope, services selected, and target milestones. We offer flexible, value-based monthly retainers and project-based pricing structures designed to optimize your return on investment (ROI). All proposals are fully transparent with zero hidden fees."
    }
  ];

  return (
    <div className="contact-page-content">
      {/* 1. HERO SECTION */}
      <section className="con-hero">
        <div className="con-floating-item item-1"></div>
        <div className="con-floating-item item-2"></div>
        <div className="con-wrap">
          <div className="con-hero-grid">
            <div className="con-hero-content">
              <span className="con-hero-eyebrow">📞 Contact Digital Marketing TenX</span>
              <h1>Your Growth Journey <span>Starts Here</span></h1>
              <p>
                Every successful business begins with the right strategy. At Digital Marketing TenX, we combine creativity, technology, AI, and performance marketing to help businesses increase visibility, generate qualified leads, and achieve long-term growth.
              </p>
              <p>
                Whether you're a startup, local business, e-commerce brand, healthcare provider, educational institution, or enterprise, we're ready to create a tailored digital marketing strategy designed around your goals.
              </p>
              <p>Let's build something extraordinary together.</p>
              <div className="con-hero-buttons">
                <button onClick={triggerConsultation} className="con-btn-primary">
                  📅 Book a Free Consultation
                </button>
                <a href="https://wa.me/919392251739" target="_blank" rel="noopener noreferrer" className="con-btn-secondary">
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
                <a href="tel:+919392251739" className="con-btn-primary">Call Now</a>
                <a href="https://wa.me/919392251739" target="_blank" rel="noopener noreferrer" className="con-btn-secondary">WhatsApp</a>
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
                <a href="mailto:info@digitalmarketingtenx.com" className="con-btn-primary">Send Email</a>
                <a href="https://digitalmarketingtenx.com" target="_blank" rel="noopener noreferrer" className="con-btn-secondary">Visit Website</a>
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

      {/* 3. INTERACTIVE GOOGLE MAP */}
      <section className="con-section con-section-light" style={{ paddingTop: 0 }}>
        <div className="con-wrap">
          <div className="con-map-container">
            <iframe 
              className="con-map-iframe"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.6666687000003!2d78.4664!3d17.4447!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb90a187a41295%3A0xe54e63b368739cf9!2sGumidelli%20Towers!5e0!3m2!1sen!2sin!4v1624800000000!5m2!1sen!2sin" 
              allowFullScreen="" 
              loading="lazy"
              title="Google Maps Location - Digital Marketing TenX Begumpet Office"
            ></iframe>
          </div>
        </div>
      </section>

      {/* 4. CONTACT FORM */}
      <section className="con-section con-section-white" id="inquiry-form">
        <div className="con-wrap">
          <div className="con-form-container">
            <h3>Request a Free Consultation</h3>
            
            {errors.form && (
              <div className="p-3 mb-4 text-sm font-medium text-red-800 bg-red-100 rounded-lg">
                ⚠️ {errors.form}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="con-form-grid">
                
                {/* Full Name */}
                <div className="con-form-group">
                  <label htmlFor="fullName">Full Name <span>*</span></label>
                  <input 
                    type="text" 
                    id="fullName" 
                    name="fullName"
                    value={formData.fullName} 
                    onChange={handleInputChange}
                    placeholder="John Doe"
                  />
                  {errors.fullName && <span style={{ color: "#ef4444", fontSize: "11px" }}>{errors.fullName}</span>}
                </div>

                {/* Company Name */}
                <div className="con-form-group">
                  <label htmlFor="companyName">Company Name</label>
                  <input 
                    type="text" 
                    id="companyName" 
                    name="companyName"
                    value={formData.companyName} 
                    onChange={handleInputChange}
                    placeholder="Acme Corporation"
                  />
                </div>

                {/* Email */}
                <div className="con-form-group">
                  <label htmlFor="email">Email Address <span>*</span></label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email"
                    value={formData.email} 
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                  />
                  {errors.email && <span style={{ color: "#ef4444", fontSize: "11px" }}>{errors.email}</span>}
                </div>

                {/* Phone */}
                <div className="con-form-group">
                  <label htmlFor="phone">Phone Number <span>*</span></label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone"
                    value={formData.phone} 
                    onChange={handleInputChange}
                    placeholder="+91 98765 43210"
                  />
                  {errors.phone && <span style={{ color: "#ef4444", fontSize: "11px" }}>{errors.phone}</span>}
                </div>

                {/* WhatsApp */}
                <div className="con-form-group">
                  <label htmlFor="whatsApp">WhatsApp Number</label>
                  <input 
                    type="tel" 
                    id="whatsApp" 
                    name="whatsApp"
                    value={formData.whatsApp} 
                    onChange={handleInputChange}
                    placeholder="+91 98765 43210"
                  />
                </div>

                {/* Website */}
                <div className="con-form-group">
                  <label htmlFor="website">Website URL</label>
                  <input 
                    type="url" 
                    id="website" 
                    name="website"
                    value={formData.website} 
                    onChange={handleInputChange}
                    placeholder="https://example.com"
                  />
                </div>

                {/* Business Location */}
                <div className="con-form-group">
                  <label htmlFor="businessLocation">Business Location</label>
                  <input 
                    type="text" 
                    id="businessLocation" 
                    name="businessLocation"
                    value={formData.businessLocation} 
                    onChange={handleInputChange}
                    placeholder="e.g. Hyderabad, India"
                  />
                </div>

                {/* Business Type */}
                <div className="con-form-group">
                  <label htmlFor="businessType">Business Type</label>
                  <select 
                    id="businessType" 
                    name="businessType"
                    value={formData.businessType} 
                    onChange={handleInputChange}
                  >
                    <option value="">Select Business Type</option>
                    <option value="Ecommerce">E-Commerce Store</option>
                    <option value="B2B">B2B SaaS / Services</option>
                    <option value="Local">Local Business / Shop</option>
                    <option value="Enterprise">Enterprise Brand</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Industry */}
                <div className="con-form-group">
                  <label htmlFor="industry">Industry</label>
                  <input 
                    type="text" 
                    id="industry" 
                    name="industry"
                    value={formData.industry} 
                    onChange={handleInputChange}
                    placeholder="e.g. Retail, Healthcare, Tech"
                  />
                </div>

                {/* Budget */}
                <div className="con-form-group">
                  <label htmlFor="budget">Monthly Marketing Budget</label>
                  <select 
                    id="budget" 
                    name="budget"
                    value={formData.budget} 
                    onChange={handleInputChange}
                  >
                    <option value="">Select Budget Range</option>
                    <option value="Under 25k">Under ₹25,000 /mo</option>
                    <option value="25k-50k">₹25,000 - ₹50,000 /mo</option>
                    <option value="50k-1L">₹50,000 - ₹1,00,000 /mo</option>
                    <option value="1L-5L">₹1,00,000 - ₹5,00,000 /mo</option>
                    <option value="Over 5L">Over ₹5,00,000 /mo</option>
                  </select>
                </div>

                {/* Timeline */}
                <div className="con-form-group">
                  <label htmlFor="timeline">Desired Project Start</label>
                  <select 
                    id="timeline" 
                    name="timeline"
                    value={formData.timeline} 
                    onChange={handleInputChange}
                  >
                    <option value="">Select Start Timeline</option>
                    <option value="Immediate">Immediate (Within 1 week)</option>
                    <option value="1-2 Weeks">1 - 2 Weeks</option>
                    <option value="1 Month">Within 1 month</option>
                    <option value="Flexible">Flexible / Just researching</option>
                  </select>
                </div>

                {/* Preferred Contact Method */}
                <div className="con-form-group">
                  <label htmlFor="contactMethod">Preferred Contact Method</label>
                  <select 
                    id="contactMethod" 
                    name="contactMethod"
                    value={formData.contactMethod} 
                    onChange={handleInputChange}
                  >
                    <option value="Email">Email</option>
                    <option value="Phone">Phone Call</option>
                    <option value="WhatsApp">WhatsApp Message</option>
                    <option value="Google Meet">Google Meet Call</option>
                  </select>
                </div>

                {/* Services Interested In Checkboxes */}
                <div className="con-form-group con-form-group-full" style={{ marginTop: "10px" }}>
                  <span className="con-checkbox-title">Services Interested In</span>
                  <div className="con-checkbox-grid">
                    <label className="con-checkbox-label">
                      <input 
                        type="checkbox" 
                        checked={formData.services.seo} 
                        onChange={() => handleServiceCheckboxChange("seo")}
                      />
                      SEO Optimization
                    </label>
                    <label className="con-checkbox-label">
                      <input 
                        type="checkbox" 
                        checked={formData.services.googleAds} 
                        onChange={() => handleServiceCheckboxChange("googleAds")}
                      />
                      Google Ads PPC
                    </label>
                    <label className="con-checkbox-label">
                      <input 
                        type="checkbox" 
                        checked={formData.services.websiteDesign} 
                        onChange={() => handleServiceCheckboxChange("websiteDesign")}
                      />
                      Website Design
                    </label>
                    <label className="con-checkbox-label">
                      <input 
                        type="checkbox" 
                        checked={formData.services.socialMedia} 
                        onChange={() => handleServiceCheckboxChange("socialMedia")}
                      />
                      Social Media Marketing
                    </label>
                    <label className="con-checkbox-label">
                      <input 
                        type="checkbox" 
                        checked={formData.services.ecommerce} 
                        onChange={() => handleServiceCheckboxChange("ecommerce")}
                      />
                      E-Commerce Marketing
                    </label>
                    <label className="con-checkbox-label">
                      <input 
                        type="checkbox" 
                        checked={formData.services.whatsappAutomation} 
                        onChange={() => handleServiceCheckboxChange("whatsappAutomation")}
                      />
                      WhatsApp Automation
                    </label>
                    <label className="con-checkbox-label">
                      <input 
                        type="checkbox" 
                        checked={formData.services.aiAutomation} 
                        onChange={() => handleServiceCheckboxChange("aiAutomation")}
                      />
                      AI Powered Solutions
                    </label>
                  </div>
                </div>

                {/* Project Description */}
                <div className="con-form-group con-form-group-full" style={{ marginTop: "10px" }}>
                  <label htmlFor="projectDescription">Project Description / Requirements</label>
                  <textarea 
                    id="projectDescription" 
                    name="projectDescription"
                    rows="4"
                    value={formData.projectDescription} 
                    onChange={handleInputChange}
                    placeholder="Briefly describe your business goals, target audience, and what you would like to achieve..."
                  ></textarea>
                </div>

                {/* Privacy Policy Checkbox */}
                <div className="con-form-group con-form-group-full con-privacy-group">
                  <label className="con-checkbox-label" htmlFor="agreePrivacy">
                    <input 
                      type="checkbox" 
                      id="agreePrivacy"
                      name="agreePrivacy"
                      checked={formData.agreePrivacy} 
                      onChange={handleInputChange}
                    />
                    I agree to the <Link href="/privacy-policy" style={{ color: "var(--con-primary)", fontWeight: 700 }}>Privacy Policy</Link> and consent to being contacted. <span>*</span>
                  </label>
                  {errors.agreePrivacy && <span style={{ color: "#ef4444", fontSize: "11px" }}>{errors.agreePrivacy}</span>}
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
            <h2>Why Contact Us</h2>
            <p>We work as your dedicated marketing department to maximize your return on ad spend and sales.</p>
          </div>

          <div className="con-why-grid">
            
            <div className="con-why-card">
              <div className="con-why-icon" style={{ background: "rgba(16, 185, 129, 0.08)", color: "#10b981" }}>⚡</div>
              <h4>Fast Response</h4>
              <p style={{ fontSize: "12.5px", color: "var(--con-text-muted)", margin: 0 }}>Average response time of under 2 hours.</p>
            </div>

            <div className="con-why-card">
              <div className="con-why-icon" style={{ background: "rgba(37, 99, 235, 0.08)", color: "#2563eb" }}>🎓</div>
              <h4>Certified Experts</h4>
              <p style={{ fontSize: "12.5px", color: "var(--con-text-muted)", margin: 0 }}>Google, Meta, and Hubspot certified staff.</p>
            </div>

            <div className="con-why-card">
              <div className="con-why-icon" style={{ background: "rgba(255, 107, 0, 0.08)", color: "var(--con-orange)" }}>📅</div>
              <h4>Free Consultation</h4>
              <p style={{ fontSize: "12.5px", color: "var(--con-text-muted)", margin: 0 }}>Get a complimentary strategy plan session.</p>
            </div>

            <div className="con-why-card">
              <div className="con-why-icon" style={{ background: "rgba(124, 58, 237, 0.08)", color: "#7c3aed" }}>💎</div>
              <h4>Transparent Pricing</h4>
              <p style={{ fontSize: "12.5px", color: "var(--con-text-muted)", margin: 0 }}>No hidden retainer charges or setup fees.</p>
            </div>

            <div className="con-why-card">
              <div className="con-why-icon" style={{ background: "rgba(13, 148, 136, 0.08)", color: "#0d9488" }}>📞</div>
              <h4>Dedicated Support</h4>
              <p style={{ fontSize: "12.5px", color: "var(--con-text-muted)", margin: 0 }}>24/7 Slack & WhatsApp support access.</p>
            </div>

            <div className="con-why-card">
              <div className="con-why-icon" style={{ background: "rgba(225, 29, 72, 0.08)", color: "#e11d48" }}>📈</div>
              <h4>Results Driven</h4>
              <p style={{ fontSize: "12.5px", color: "var(--con-text-muted)", margin: 0 }}>Focusing strictly on generating more profits.</p>
            </div>

            <div className="con-why-card">
              <div className="con-why-icon" style={{ background: "rgba(14, 165, 233, 0.08)", color: "#0ea5e9" }}>🤖</div>
              <h4>AI Powered Solutions</h4>
              <p style={{ fontSize: "12.5px", color: "var(--con-text-muted)", margin: 0 }}>Integrating smart CRM marketing automation.</p>
            </div>

            <div className="con-why-card">
              <div className="con-why-icon" style={{ background: "rgba(245, 158, 11, 0.08)", color: "#f59e0b" }}>💵</div>
              <h4>ROI Focused Strategies</h4>
              <p style={{ fontSize: "12.5px", color: "var(--con-text-muted)", margin: 0 }}>Campaigns optimized for maximum search sales.</p>
            </div>

          </div>
        </div>
      </section>

      {/* 8. OFFICE GALLERY */}
      <section className="con-section con-section-white">
        <div className="con-wrap">
          <div className="con-title-center">
            <span className="con-eyebrow">🏢 Hyderabad Workspace</span>
            <h2>Our Office Gallery</h2>
            <p>Take a virtual look inside our premium Begumpet workspace designed for collaboration and client meetings.</p>
          </div>

          <div className="con-gallery-slider">
            
            <div className="con-gallery-item">
              <img src="/office_reception.webp" alt="Digital Marketing TenX Office Reception Lobby" />
              <div className="con-gallery-caption">Office Reception Area</div>
            </div>

            <div className="con-gallery-item">
              <img src="/office_meeting.webp" alt="Digital Marketing TenX Conference Meeting Boardroom" />
              <div className="con-gallery-caption">Meeting Conference Room</div>
            </div>

            <div className="con-gallery-item">
              <img src="/office_workspace.webp" alt="Digital Marketing TenX Open Collaborative Workspace" />
              <div className="con-gallery-caption">Collaborative Workspace</div>
            </div>

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
                  <span>{faq.q}</span>
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
