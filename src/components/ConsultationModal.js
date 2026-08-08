"use client";

import { useEffect, useState } from "react";
import * as gtag from "@/lib/gtag";

export default function ConsultationModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [leadId, setLeadId] = useState("");
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    email: "",
    phone: "",
    whatsapp: "",
    website: "",
    location: "",
    businessType: "",
    industry: "",
    companySize: "",
    monthlyRevenue: "",
    services: [], // Array for multiple services
    goals: [], // Array for multiple goals
    budget: "",
    timeline: "",
    projectDescription: "",
    contactMethod: "",
    contactTime: "",
    consentPrivacy: false,
    consentCommunication: false
  });

  // Check custom event to open the modal
  useEffect(() => {
    const handleTriggerModal = (e) => {
      // Load saved draft
      const savedDraft = localStorage.getItem("ten_consultation_form_draft");
      if (savedDraft) {
        try {
          const parsed = JSON.parse(savedDraft);
          setFormData((prev) => ({ ...prev, ...parsed }));
        } catch (err) {
          console.error("Failed to parse form draft:", err);
        }
      }

      // Pre-select service if passed
      if (e.detail && e.detail.service) {
        setFormData((prev) => {
          const serviceName = e.detail.service;
          const currentServices = prev.services.includes(serviceName)
            ? prev.services
            : [...prev.services, serviceName];
          return { ...prev, services: currentServices };
        });
      }

      // Pre-fill message if passed
      if (e.detail && e.detail.message) {
        setFormData((prev) => ({ ...prev, projectDescription: e.detail.message }));
      }

      setIsOpen(true);
      setCurrentStep(1);
      setIsSuccess(false);
    };

    window.addEventListener("trigger-consultation-modal", handleTriggerModal);
    return () => window.removeEventListener("trigger-consultation-modal", handleTriggerModal);
  }, []);

  // Save form draft to localStorage on change
  useEffect(() => {
    if (isOpen) {
      localStorage.setItem("ten_consultation_form_draft", JSON.stringify(formData));
    }
  }, [formData, isOpen]);

  // Handle scroll lock on body
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("modal-open-lock");
    } else {
      document.body.classList.remove("modal-open-lock");
    }
    return () => document.body.classList.remove("modal-open-lock");
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    setErrors({});
  };

  // Handle Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen && !isSubmitting) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isSubmitting]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));

    // Clear inline error if field value is updated
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name] : "" }));
    }
  };

  const handleCheckboxGroupChange = (field, value) => {
    setFormData((prev) => {
      const currentValues = prev[field];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];
      return { ...prev, [field]: newValues };
    });
  };

  // Step Validation logic
  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = "Full Name is required";
      if (!formData.email.trim()) {
        newErrors.email = "Email Address is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Invalid email format";
      }
      if (!formData.phone.trim()) {
        newErrors.phone = "Phone Number is required";
      } else if (!/^\+?[0-9\s-]{8,15}$/.test(formData.phone.replace(/\s+/g, ""))) {
        newErrors.phone = "Invalid phone number format";
      }
      if (formData.website.trim() && !/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(formData.website)) {
        newErrors.website = "Invalid Website URL format";
      }
    } else if (step === 2) {
      if (!formData.businessType) newErrors.businessType = "Please select your Business Type";
    } else if (step === 3) {
      if (!formData.budget) newErrors.budget = "Please select a budget range";
      if (!formData.timeline) newErrors.timeline = "Please select a project timeline";
      if (!formData.projectDescription.trim()) newErrors.projectDescription = "Project Description is required";
    } else if (step === 4) {
      if (!formData.contactMethod) newErrors.contactMethod = "Please select your preferred contact method";
      if (!formData.consentPrivacy) newErrors.consentPrivacy = "You must agree to the Privacy Policy";
      if (!formData.consentCommunication) newErrors.consentCommunication = "You must consent to communications";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBackStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(4)) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          referrer: document.referrer || window.location.href,
        })
      });

      const json = await response.json();

      if (!response.ok || !json.success) {
        throw new Error(json.error || "Failed to submit request.");
      }

      const generatedId = json.consultationId;
      setLeadId(generatedId);

      // Analytics integrations
      gtag.event({
        action: "consultation_form_submit",
        category: "Lead Generation",
        label: generatedId,
        value: 1
      });
      if (window.fbq) {
        window.fbq("track", "Lead", {
          content_name: "Consultation Form",
          content_category: formData.services.join(", "),
          value: 0.00,
          currency: "INR"
        });
      }
      if (window.dataLayer) {
        window.dataLayer.push({
          event: "consultationLeadSubmit",
          leadId: generatedId,
          servicesCount: formData.services.length
        });
      }

      setIsSuccess(true);
      localStorage.removeItem("ten_consultation_form_draft");

      // Redirect visitor to WhatsApp with pre-filled summary
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      const whatsappText = `Hello Digital Marketing TenX Team 👋\n\nI just submitted a consultation request (ID: ${generatedId}). Here are my project details:\n\n━━━━━━━━━━━━━━━━━━\n\n👤 Name: ${formData.name}\n🏢 Company: ${formData.companyName || "N/A"}\n📞 Phone: ${formData.phone}\n💬 WhatsApp: ${formData.whatsapp || "N/A"}\n📧 Email: ${formData.email}\n🌐 Website: ${formData.website || "N/A"}\n📍 Location: ${formData.location || "N/A"}\n💼 Business Type: ${formData.businessType || "N/A"}\n🏭 Industry: ${formData.industry || "N/A"}\n👥 Company Size: ${formData.companySize || "N/A"}\n💰 Monthly Revenue: ${formData.monthlyRevenue || "N/A"}\n📌 Services Interested: ${formData.services.join(", ") || "N/A"}\n🎯 Marketing Goals: ${formData.goals.join(", ") || "N/A"}\n💸 Budget: ${formData.budget}\n⌛ Timeline: ${formData.timeline}\n📞 Preferred Contact: ${formData.contactMethod} (${formData.contactTime || "Anytime"})\n📝 Project Description: ${formData.projectDescription}\n\n━━━━━━━━━━━━━━━━━━\n\nPlease contact me. Thank you!`;

      const encodedText = encodeURIComponent(whatsappText);
      const whatsappNumber = "919392251739"; // Replace with actual business number if different
      
      const redirectUrl = isMobile
        ? `https://wa.me/${whatsappNumber}?text=${encodedText}`
        : `https://web.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedText}`;

      // Open WhatsApp in new window
      setTimeout(() => {
        window.open(redirectUrl, "_blank");
      }, 1000);

    } catch (error) {
      console.error("Submission failed:", error);
      alert(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="con-modal-overlay" onClick={handleClose}>
          <div className="con-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="con-modal-close" onClick={handleClose} disabled={isSubmitting}>
              ✕
            </button>

            {!isSuccess ? (
              <>
                <div className="con-modal-header">
                  <h2>📅 Book Free Consultation</h2>
                  <p>Scale Your Business 10X. Tell us about your goals and launch a roadmap.</p>
                </div>

                {/* Progress Indicators */}
                <div className="con-progress-wrapper">
                  <div className="con-progress-steps">
                    <div className="con-progress-line">
                      <div 
                        className="con-progress-line-fill" 
                        style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
                      />
                    </div>
                    {[
                      { step: 1, label: "Profile" },
                      { step: 2, label: "Business" },
                      { step: 3, label: "Goals" },
                      { step: 4, label: "Consent" }
                    ].map((s) => (
                      <div 
                        key={s.step} 
                        className={`con-progress-step ${currentStep === s.step ? "active" : ""} ${currentStep > s.step ? "completed" : ""}`}
                      >
                        <div className="con-step-num">{s.step}</div>
                        <span className="con-step-label">{s.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <form className="con-modal-form" onSubmit={handleSubmit}>
                  {/* STEP 1: PERSONAL INFORMATION */}
                  {currentStep === 1 && (
                    <div className="con-step-section">
                      <div className="con-form-row">
                        <div className={`con-form-group ${errors.name ? "has-error" : ""}`}>
                          <label>Full Name *</label>
                          <input 
                            type="text" 
                            name="name" 
                            value={formData.name} 
                            onChange={handleInputChange} 
                            placeholder="John Doe"
                          />
                          {errors.name && <span className="con-error-text">{errors.name}</span>}
                        </div>
                        <div className="con-form-group">
                          <label>Company Name</label>
                          <input 
                            type="text" 
                            name="companyName" 
                            value={formData.companyName} 
                            onChange={handleInputChange} 
                            placeholder="e.g. Acme Corporation"
                          />
                        </div>
                      </div>

                      <div className="con-form-row" style={{ marginTop: "16px" }}>
                        <div className={`con-form-group ${errors.email ? "has-error" : ""}`}>
                          <label>Email Address *</label>
                          <input 
                            type="email" 
                            name="email" 
                            value={formData.email} 
                            onChange={handleInputChange} 
                            placeholder="john@company.com"
                          />
                          {errors.email && <span className="con-error-text">{errors.email}</span>}
                        </div>
                        <div className={`con-form-group ${errors.phone ? "has-error" : ""}`}>
                          <label>Phone Number *</label>
                          <input 
                            type="tel" 
                            name="phone" 
                            value={formData.phone} 
                            onChange={handleInputChange} 
                            placeholder="e.g. +91 98765 43210"
                          />
                          {errors.phone && <span className="con-error-text">{errors.phone}</span>}
                        </div>
                      </div>

                      <div className="con-form-row" style={{ marginTop: "16px" }}>
                        <div className="con-form-group">
                          <label>WhatsApp Number</label>
                          <input 
                            type="tel" 
                            name="whatsapp" 
                            value={formData.whatsapp} 
                            onChange={handleInputChange} 
                            placeholder="Optional"
                          />
                        </div>
                        <div className={`con-form-group ${errors.website ? "has-error" : ""}`}>
                          <label>Website URL</label>
                          <input 
                            type="text" 
                            name="website" 
                            value={formData.website} 
                            onChange={handleInputChange} 
                            placeholder="www.yourcompany.com"
                          />
                          {errors.website && <span className="con-error-text">{errors.website}</span>}
                        </div>
                      </div>

                      <div className="con-form-group" style={{ marginTop: "16px" }}>
                        <label>Business Location (City / Country)</label>
                        <input 
                          type="text" 
                          name="location" 
                          value={formData.location} 
                          onChange={handleInputChange} 
                          placeholder="e.g. Hyderabad, India"
                        />
                      </div>
                    </div>
                  )}

                  {/* STEP 2: BUSINESS INFORMATION */}
                  {currentStep === 2 && (
                    <div className="con-step-section">
                      <div className="con-form-row">
                        <div className={`con-form-group ${errors.businessType ? "has-error" : ""}`}>
                          <label>Business Type *</label>
                          <select 
                            name="businessType" 
                            value={formData.businessType} 
                            onChange={handleInputChange}
                          >
                            <option value="">-- Select Type --</option>
                            <option value="Startup">Startup</option>
                            <option value="Small Business">Small Business</option>
                            <option value="Enterprise">Enterprise</option>
                            <option value="E-commerce">E-commerce</option>
                            <option value="Healthcare">Healthcare</option>
                            <option value="Real Estate">Real Estate</option>
                            <option value="Education">Education</option>
                            <option value="Finance">Finance</option>
                            <option value="Restaurant">Restaurant</option>
                            <option value="Technology">Technology</option>
                            <option value="Construction">Construction</option>
                            <option value="Other">Other</option>
                          </select>
                          {errors.businessType && <span className="con-error-text">{errors.businessType}</span>}
                        </div>
                        <div className="con-form-group">
                          <label>Industry</label>
                          <input 
                            type="text" 
                            name="industry" 
                            value={formData.industry} 
                            onChange={handleInputChange} 
                            placeholder="e.g. Fintech, SaaS"
                          />
                        </div>
                      </div>

                      <div className="con-form-row" style={{ marginTop: "16px" }}>
                        <div className="con-form-group">
                          <label>Company Size</label>
                          <select 
                            name="companySize" 
                            value={formData.companySize} 
                            onChange={handleInputChange}
                          >
                            <option value="">-- Select Size --</option>
                            <option value="1-10 Employees">1-10 Employees</option>
                            <option value="11-50 Employees">11-50 Employees</option>
                            <option value="51-200 Employees">51-200 Employees</option>
                            <option value="200+ Employees">200+ Employees</option>
                          </select>
                        </div>
                        <div className="con-form-group">
                          <label>Monthly Revenue (Optional)</label>
                          <input 
                            type="text" 
                            name="monthlyRevenue" 
                            value={formData.monthlyRevenue} 
                            onChange={handleInputChange} 
                            placeholder="e.g. ₹5,00,000"
                          />
                        </div>
                      </div>

                      <div className="con-form-group" style={{ marginTop: "20px" }}>
                        <label>Services Interested In</label>
                        <div className="con-grid-selection">
                          {[
                            "Website Design", "Website Development", "SEO", "Local SEO", 
                            "Technical SEO", "Google Ads", "Meta Ads", "Social Media Marketing", 
                            "WhatsApp Automation", "AI Automation", "Branding", "UI/UX Design"
                          ].map((srv) => (
                            <div 
                              key={srv} 
                              className={`con-selection-item ${formData.services.includes(srv) ? "selected" : ""}`}
                              onClick={() => handleCheckboxGroupChange("services", srv)}
                            >
                              <input 
                                type="checkbox" 
                                checked={formData.services.includes(srv)}
                                readOnly
                              />
                              {srv}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 3: MARKETING GOALS & PROJECT DETAILS */}
                  {currentStep === 3 && (
                    <div className="con-step-section">
                      <div className="con-form-group">
                        <label>Primary Marketing Goals</label>
                        <div className="con-grid-selection">
                          {[
                            "Generate More Leads", "Increase Website Traffic", "Improve SEO Rankings", 
                            "Increase Brand Awareness", "Grow Social Media", "Increase Online Sales", 
                            "Improve Conversion Rate", "Build Website", "Launch Ads", "Marketing Consultation"
                          ].map((goal) => (
                            <div 
                              key={goal} 
                              className={`con-selection-item ${formData.goals.includes(goal) ? "selected" : ""}`}
                              onClick={() => handleCheckboxGroupChange("goals", goal)}
                            >
                              <input 
                                type="checkbox" 
                                checked={formData.goals.includes(goal)}
                                readOnly
                              />
                              {goal}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="con-form-row" style={{ marginTop: "20px" }}>
                        <div className={`con-form-group ${errors.budget ? "has-error" : ""}`}>
                          <label>Estimated Project Budget *</label>
                          <select 
                            name="budget" 
                            value={formData.budget} 
                            onChange={handleInputChange}
                          >
                            <option value="">-- Select Budget --</option>
                            <option value="Under ₹25K">Under ₹25K</option>
                            <option value="₹25K–50K">₹25K–50K</option>
                            <option value="₹50K–1L">₹50K–1L</option>
                            <option value="₹1L–5L">₹1L–5L</option>
                            <option value="₹5L+">₹5L+</option>
                          </select>
                          {errors.budget && <span className="con-error-text">{errors.budget}</span>}
                        </div>
                        <div className={`con-form-group ${errors.timeline ? "has-error" : ""}`}>
                          <label>Required Timeline *</label>
                          <select 
                            name="timeline" 
                            value={formData.timeline} 
                            onChange={handleInputChange}
                          >
                            <option value="">-- Select Timeline --</option>
                            <option value="Immediately">Immediately</option>
                            <option value="Within 1 Week">Within 1 Week</option>
                            <option value="Within 1 Month">Within 1 Month</option>
                            <option value="Flexible">Flexible</option>
                          </select>
                          {errors.timeline && <span className="con-error-text">{errors.timeline}</span>}
                        </div>
                      </div>

                      <div className={`con-form-group ${errors.projectDescription ? "has-error" : ""}`} style={{ marginTop: "16px" }}>
                        <label>Project Description *</label>
                        <textarea 
                          name="projectDescription" 
                          value={formData.projectDescription} 
                          onChange={handleInputChange} 
                          placeholder="Please describe your business goals and marketing needs..."
                        />
                        {errors.projectDescription && <span className="con-error-text">{errors.projectDescription}</span>}
                      </div>
                    </div>
                  )}

                  {/* STEP 4: CONTACT PREFERENCE & CONSENT */}
                  {currentStep === 4 && (
                    <div className="con-step-section">
                      <div className="con-form-row">
                        <div className={`con-form-group ${errors.contactMethod ? "has-error" : ""}`}>
                          <label>Preferred Contact Method *</label>
                          <select 
                            name="contactMethod" 
                            value={formData.contactMethod} 
                            onChange={handleInputChange}
                          >
                            <option value="">-- Select Method --</option>
                            <option value="WhatsApp">WhatsApp</option>
                            <option value="Phone Call">Phone Call</option>
                            <option value="Email">Email</option>
                            <option value="Google Meet">Google Meet</option>
                            <option value="Zoom">Zoom</option>
                          </select>
                          {errors.contactMethod && <span className="con-error-text">{errors.contactMethod}</span>}
                        </div>
                        <div className="con-form-group">
                          <label>Preferred Contact Time</label>
                          <input 
                            type="text" 
                            name="contactTime" 
                            value={formData.contactTime} 
                            onChange={handleInputChange} 
                            placeholder="e.g. Weekdays 3 PM - 6 PM"
                          />
                        </div>
                      </div>

                      <div className="con-consent-group" style={{ marginTop: "24px" }}>
                        <label className={`con-consent-item ${errors.consentPrivacy ? "has-error" : ""}`}>
                          <input 
                            type="checkbox" 
                            name="consentPrivacy" 
                            checked={formData.consentPrivacy} 
                            onChange={handleInputChange}
                          />
                          <span>I agree to the Privacy Policy *</span>
                        </label>
                        {errors.consentPrivacy && <span className="con-error-text" style={{ marginLeft: "25px" }}>{errors.consentPrivacy}</span>}

                        <label className={`con-consent-item ${errors.consentCommunication ? "has-error" : ""}`}>
                          <input 
                            type="checkbox" 
                            name="consentCommunication" 
                            checked={formData.consentCommunication} 
                            onChange={handleInputChange}
                          />
                          <span>I agree to receive communications from Digital Marketing TenX *</span>
                        </label>
                        {errors.consentCommunication && <span className="con-error-text" style={{ marginLeft: "25px" }}>{errors.consentCommunication}</span>}
                      </div>
                    </div>
                  )}

                  {/* FORM NAVIGATION BUTTONS */}
                  <div className="con-nav-buttons">
                    <button 
                      type="button" 
                      className="con-btn-back" 
                      onClick={handleBackStep}
                      disabled={currentStep === 1 || isSubmitting}
                    >
                      ← Back
                    </button>

                    {currentStep < 4 ? (
                      <button 
                        type="button" 
                        className="con-btn-next" 
                        onClick={handleNextStep}
                      >
                        Next Step →
                      </button>
                    ) : (
                      <button 
                        type="submit" 
                        className="con-btn-submit" 
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "⏳ Processing Request..." : "🚀 Book Free Consultation"}
                      </button>
                    )}
                  </div>
                </form>
              </>
            ) : (
              <div className="wa-success-state">
                <div className="wa-success-icon">✓</div>
                <h3>Lead Generated Successfully! (ID: {leadId})</h3>
                <p style={{ maxWidth: "460px", margin: "0 auto", fontSize: "14.5px" }}>
                  Thank you! Your consultation request has been submitted successfully. Our team will contact you shortly.
                </p>
                <p style={{ color: "#22c55e", fontWeight: "700", marginTop: "10px" }}>
                  Redirection to WhatsApp in progress...
                </p>
                <button 
                  onClick={handleClose}
                  className="btn-outline"
                  style={{ width: "auto", padding: "10px 24px", marginTop: "16px" }}
                >
                  Close Window
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

