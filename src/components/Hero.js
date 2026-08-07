"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import * as gtag from "@/lib/gtag";

function Counter({ end, duration = 1500, suffix = "" }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined" || !window.IntersectionObserver) {
      setHasAnimated(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = elementRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;

    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeProgress = progress * (2 - progress);
      setCount(Math.floor(easeProgress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [hasAnimated, end, duration]);

  return <span ref={elementRef}>{count}{suffix}</span>;
}

export default function Hero() {
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <h1 className="">
            <span style={{ color: "#000", WebkitTextFillColor: "#000", background: "none" }}>AI-Powered</span><br />
            Digital Marketing Agency in Hyderabad
          </h1>
          <p className="">
            Digital Marketing TenX is a results-driven digital marketing agency in Hyderabad helping businesses improve their online visibility, generate qualified leads, and achieve sustainable growth. From SEO and Google Ads to social media marketing, website development, and performance marketing, we create data-driven strategies tailored to your business goals.
          </p>
          <div style={{ backgroundColor: "#f9f9ff", padding: "16px", borderRadius: "8px", marginBottom: "24px", borderLeft: "4px solid var(--primary)", textAlign: "left", fontSize: "0.95rem", color: "#334155" }}>
            <strong>Summary - End-to-End Digital Marketing Solutions for Business Growth:</strong> We provide comprehensive digital marketing services, including SEO, paid ads, and web development, to help businesses scale.
          </div>
          <div className="hero-btns">
            <button className="btn-primary" onClick={() => {
              gtag.event("book_consultation_click", { button_location: "hero_section" });
              window.dispatchEvent(new CustomEvent("trigger-consultation-modal"));
            }}>📅 Book a Free Consultation</button>
            <Link href="/services" className="btn-primary" onClick={() => gtag.event("service_cta_click", { service_name: "all_services", button_location: "hero_section" })}>Explore Our Services</Link>
          </div>
          <div className="hero-trust" style={{ marginTop: "1rem", fontSize: "0.9rem", color: "#666", fontWeight: "600" }}>
            SEO • Google Ads • Web Development • Social Media Marketing • Performance Marketing
          </div>
        </div>

        <div className="hero-visual">
          <div className="globe-wrap">
            <Image 
              src="/mark.webp" 
              alt="Digital Marketing Megaphone" 
              width={700} 
              height={700} 
              className="globe-img"
              priority
              fetchPriority="high"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>


    </>
  );
}

