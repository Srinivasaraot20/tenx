"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Phone number is too short").max(20, "Phone number is too long"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(2, "Subject is required"),
  message: z.string().min(5, "Message must be at least 5 characters"),
});

export default function BlogEnquiryForm({ blogTitle, blogUrl }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [utmParams, setUtmParams] = useState({ source: "", medium: "", campaign: "" });
  const [sourcePage, setSourcePage] = useState("");

  useEffect(() => {
    // Capture UTM params and source URL on mount
    const searchParams = new URLSearchParams(window.location.search);
    setUtmParams({
      source: searchParams.get("utm_source") || "",
      medium: searchParams.get("utm_medium") || "",
      campaign: searchParams.get("utm_campaign") || "",
    });
    setSourcePage(window.location.href);
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      subject: blogTitle ? `Enquiry: ${blogTitle}` : "",
      message: "",
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    const payload = {
      ...data,
      blogTitle,
      blogUrl,
      sourcePage,
      utmSource: utmParams.source,
      utmMedium: utmParams.medium,
      utmCampaign: utmParams.campaign,
    };

    try {
      const response = await fetch("/api/blog-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        reset();
      } else {
        setSubmitStatus("error");
        console.error("Submission failed:", result.errors || result.message);
      }
    } catch (error) {
      setSubmitStatus("error");
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="blog-enquiry-form-wrapper"
      style={{
        background: "linear-gradient(to bottom right, #5b21b6, #0ea5e9)",
        borderRadius: "12px",
        padding: "24px",
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)",
        marginTop: "32px",
        marginBottom: "32px",
        fontFamily: "system-ui, -apple-system, sans-serif"
      }}
    >
      <h3 style={{ fontSize: "2rem", fontWeight: "700", marginBottom: "20px", color: "white" }}>
        Enquiry Now
      </h3>

      {submitStatus === "success" ? (
        <div style={{ padding: "16px", background: "#dcfce7", color: "#166534", borderRadius: "4px", fontWeight: "500" }}>
          Thank you! Your enquiry has been received. Our team will contact you shortly.
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          
          <div>
            <input
              id="fullName"
              type="text"
              placeholder="Name"
              {...register("fullName")}
              style={{
                width: "100%", padding: "12px 16px", borderRadius: "4px", border: "none", fontSize: "1rem", outline: "none", color: "#374151", backgroundColor: "white", boxSizing: "border-box"
              }}
            />
            {errors.fullName && <span style={{ fontSize: "0.8rem", color: "#fca5a5", display: "block", marginTop: "4px" }}>{errors.fullName.message}</span>}
          </div>

          <div>
            <div style={{ display: "flex", boxSizing: "border-box" }}>
              <div style={{ padding: "12px 8px 12px 16px", borderRadius: "4px 0 0 4px", border: "none", borderRight: "1px solid #e5e7eb", backgroundColor: "white", fontSize: "1rem", display: "flex", alignItems: "center", gap: "8px", color: "#374151", boxSizing: "border-box" }}>
                <span style={{ fontSize: "1.2rem", lineHeight: 1 }}>🇮🇳</span>
                <span>+91 ▾</span>
              </div>
              <input
                id="phone"
                type="tel"
                placeholder="Phone Number"
                {...register("phone")}
                style={{
                  flex: 1, padding: "12px 16px", borderRadius: "0 4px 4px 0", border: "none", fontSize: "1rem", outline: "none", color: "#374151", backgroundColor: "white", boxSizing: "border-box", minWidth: 0
                }}
              />
            </div>
            {errors.phone && <span style={{ fontSize: "0.8rem", color: "#fca5a5", display: "block", marginTop: "4px" }}>{errors.phone.message}</span>}
          </div>

          <div>
            <input
              id="email"
              type="email"
              placeholder="Email"
              {...register("email")}
              style={{
                width: "100%", padding: "12px 16px", borderRadius: "4px", border: "none", fontSize: "1rem", outline: "none", color: "#374151", backgroundColor: "white", boxSizing: "border-box"
              }}
            />
            {errors.email && <span style={{ fontSize: "0.8rem", color: "#fca5a5", display: "block", marginTop: "4px" }}>{errors.email.message}</span>}
          </div>

          <input type="hidden" {...register("subject")} />

          <div>
            <textarea
              id="message"
              rows="4"
              placeholder="Your Message"
              {...register("message")}
              style={{
                width: "100%", padding: "12px 16px", borderRadius: "4px", border: "none", fontSize: "1rem", outline: "none", resize: "vertical", color: "#374151", backgroundColor: "white", boxSizing: "border-box"
              }}
            ></textarea>
            {errors.message && <span style={{ fontSize: "0.8rem", color: "#fca5a5", display: "block", marginTop: "4px" }}>{errors.message.message}</span>}
          </div>

          {submitStatus === "error" && (
            <div style={{ fontSize: "0.875rem", color: "#fca5a5" }}>
              Something went wrong. Please try again later.
            </div>
          )}

          <div style={{ display: "flex", justifyContent: "flex-start", marginTop: "4px" }}>
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                padding: "10px 24px",
                backgroundColor: isSubmitting ? "#9ca3af" : "#be123c",
                color: "white",
                fontSize: "1rem",
                fontWeight: "500",
                border: "1px solid #4c0519",
                borderRadius: "4px",
                cursor: isSubmitting ? "not-allowed" : "pointer",
                transition: "opacity 0.2s",
                opacity: isSubmitting ? 0.7 : 1,
              }}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

