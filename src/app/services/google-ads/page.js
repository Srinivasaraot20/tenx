"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { openWhatsAppQuote } from "@/lib/whatsappQuote";
import PricingTable from "@/components/services/PricingTable";
import "./google-ads.css";

function getIncludedIcon(title, color) {
  switch (title) {
    case "Keyword Research":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      );
    case "Campaign Setup":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4.5 16.5c-1.5 1.26-2 2.5-2 3.5 1-.5 2.5-1 3.5-2.5" />
          <path d="M12 2C6.5 2 2 6.5 2 12c0 2.5 1 4.5 2.5 6l11.5-11.5c-1.5-1.5-3.5-2.5-6-2.5z" />
          <path d="M22 2s-3.5 1-6 2.5L20 10.5C21.5 8 22 2 22 2z" />
        </svg>
      );
    case "Ad Copywriting":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
        </svg>
      );
    case "Bid Strategy":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      );
    case "Audience Segments":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case "Landing Page Audit":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <line x1="9" y1="9" x2="15" y2="9" />
          <line x1="9" y1="13" x2="15" y2="13" />
          <line x1="9" y1="17" x2="11" y2="17" />
        </svg>
      );
    case "Conversion Tracking":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      );
    case "A/B Ad Testing":
      return (
        <span style={{ fontSize: "11px", fontWeight: "900", color: color }}>A B</span>
      );
    case "Negative Keywords":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="8" y1="12" x2="16" y2="12" />
        </svg>
      );
    case "Quality Score Boost":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
          <polyline points="17 6 23 6 23 12" />
        </svg>
      );
    case "Shopping Feed Setup":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
      );
    case "Dynamic Remarketing":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
        </svg>
      );
    case "Ad Extensions & Assets":
    case "Call Extension":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      );
    case "Monthly Reporting":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      );
    case "Budget Pacing":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="16" rx="2" ry="2" />
          <line x1="12" y1="4" x2="12" y2="20" />
          <line x1="2" y1="12" x2="22" y2="12" />
        </svg>
      );
    case "Competitor Analysis":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case "Location Targeting":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      );
    case "Ad Schedule":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      );
    case "YouTube Creative":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 11.54a29 29 0 0 0 .46 5.12 2.78 2.78 0 0 0 1.95 1.96c1.71.46 8.59.46 8.59.46s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96 29 29 0 0 0 .46-5.12 29 29 0 0 0-.46-5.12z" />
          <polygon points="9.75 15.02 15.5 11.54 9.75 8.07 9.75 15.02" />
        </svg>
      );
    case "Dedicated Manager":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      );
    default:
      return null;
  }
}

function getWorkflowStepIcon(idx, color) {
  switch (idx) {
    case 0:
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
        </svg>
      );
    case 1:
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="9" y1="9" x2="15" y2="9" /><line x1="9" y1="13" x2="15" y2="13" /><line x1="9" y1="17" x2="13" y2="17" />
        </svg>
      );
    case 2:
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      );
    case 3:
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
        </svg>
      );
    case 4:
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
        </svg>
      );
    case 5:
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      );
    case 6:
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="2" y1="10" x2="22" y2="10" /><line x1="6" y1="6" x2="6" y2="6" /><line x1="10" y1="6" x2="10" y2="6" />
        </svg>
      );
    case 7:
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4.5 16.5c-1.5 1.26-2 2.5-2 3.5 1-.5 2.5-1 3.5-2.5" />
          <path d="M12 2C6.5 2 2 6.5 2 12c0 2.5 1 4.5 2.5 6l11.5-11.5c-1.5-1.5-3.5-2.5-6-2.5z" />
          <path d="M22 2s-3.5 1-6 2.5L20 10.5C21.5 8 22 2 22 2z" />
        </svg>
      );
    case 8:
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      );
    case 9:
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
        </svg>
      );
    default:
      return null;
  }
}

function getWhyProcessIcon(title, color) {
  switch (title) {
    case "Data-Driven":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" /><path d="M12 2v10l8 4" />
        </svg>
      );
    case "Fast Execution":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      );
    case "ROI Focused":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
        </svg>
      );
    case "Transparent":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      );
    case "Expert Team":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case "Continuous Growth":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      );
    default:
      return null;
  }
}



function getServiceIcon(title, color) {
  switch (title) {
    case "Search Ads":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      );
    case "Display Ads":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      );
    case "Performance Max":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4.5 16.5c-1.5 1.26-2 2.5-2 3.5 1-.5 2.5-1 3.5-2.5" />
          <path d="M12 2C6.5 2 2 6.5 2 12c0 2.5 1 4.5 2.5 6l11.5-11.5c-1.5-1.5-3.5-2.5-6-2.5z" />
          <path d="M22 2s-3.5 1-6 2.5L20 10.5C21.5 8 22 2 22 2z" />
        </svg>
      );
    case "Shopping Ads":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
      );
    case "YouTube Ads":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 11.54a29 29 0 0 0 .46 5.12 2.78 2.78 0 0 0 1.95 1.96c1.71.46 8.59.46 8.59.46s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96 29 29 0 0 0 .46-5.12 29 29 0 0 0-.46-5.12z" />
          <polygon points="9.75 15.02 15.5 11.54 9.75 8.07 9.75 15.02" />
        </svg>
      );
    case "Remarketing":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
        </svg>
      );
    case "Local Service Ads":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      );
    case "Call-Only Ads":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      );
    case "Discovery Ads":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
        </svg>
      );
    case "Demand Gen":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      );
    default:
      return null;
  }
}

function AnimatedCounter({ value, suffix = "", duration = 1800 }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting && !hasAnimated) setHasAnimated(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [hasAnimated]);
  useEffect(() => {
    if (!hasAnimated) return;
    let start = 0;
    const end = parseFloat(value);
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(parseFloat(start.toFixed(1)));
    }, 16);
    return () => clearInterval(timer);
  }, [hasAnimated, value, duration]);
  return <span ref={ref}>{count}{suffix}</span>;
}

// ── SVG ICONS ──
const IconCheck = ({ size = 14, color = "#34A853" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const IconX = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#EA4335" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const IconArrow = ({ size = 12 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);
const IconStar = ({ size = 12, color = "#FBBC05" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke={color} strokeWidth="1">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const services = [
  { title: "Search Ads", desc: "Capture high-intent buyers the moment they search for your products or services on Google.", benefits: ["Instant top placement", "Pay per click only", "Keyword targeting"], color: "#4285F4", bg: "rgba(66,133,244,0.1)" },
  { title: "Display Ads", desc: "Reach audiences across millions of Google partner websites with stunning visual banner ads.", benefits: ["Brand awareness", "Visual storytelling", "Audience targeting"], color: "#EA4335", bg: "rgba(234,67,53,0.1)" },
  { title: "Performance Max", desc: "AI-powered campaigns that run across all Google channels automatically to maximize conversions.", benefits: ["All-channel reach", "AI optimization", "Smart bidding"], color: "#34A853", bg: "rgba(52,168,83,0.1)" },
  { title: "Shopping Ads", desc: "Show product listings with images, prices and reviews directly in search results.", benefits: ["Product showcase", "High purchase intent", "Visual CTR boost"], color: "#FBBC05", bg: "rgba(251,188,5,0.15)" },
  { title: "YouTube Ads", desc: "Engage audiences with compelling video ads on the world's #2 search engine and largest video platform.", benefits: ["Video storytelling", "Massive reach", "Skip-ad analytics"], color: "#FF0000", bg: "rgba(255,0,0,0.08)" },
  { title: "Remarketing", desc: "Re-engage visitors who've interacted with your brand before and bring them back to convert.", benefits: ["Warm audience", "Higher CVR", "Custom audiences"], color: "#7c3aed", bg: "rgba(124,58,237,0.1)" },
  { title: "Local Service Ads", desc: "Appear at the very top of local searches with a trusted Google Guaranteed badge.", benefits: ["Google Guaranteed", "Local dominance", "Call leads"], color: "#0f9d58", bg: "rgba(15,157,88,0.1)" },
  { title: "Call-Only Ads", desc: "Drive phone calls directly from Google search results — perfect for service businesses.", benefits: ["Direct calls", "Mobile-first", "High intent"], color: "#a13c00", bg: "rgba(255,107,0,0.1)" },
  { title: "Discovery Ads", desc: "Reach people browsing YouTube feed, Gmail Promotions and Google Discover at key moments.", benefits: ["Native-style ads", "Intent signals", "Visual formats"], color: "#1a73e8", bg: "rgba(26,115,232,0.1)" },
  { title: "Demand Gen", desc: "Immersive, visually rich campaigns designed to generate demand on Google's most engaging platforms.", benefits: ["Brand building", "Lookalike audiences", "Rich creatives"], color: "#d946ef", bg: "rgba(217,70,239,0.1)" },
];

const included = [
  { title: "Keyword Research", desc: "Deep competitor & intent-based keyword analysis", bg: "#f0f4ff", color: "#4285F4" },
  { title: "Campaign Setup", desc: "Full campaign architecture & ad group structure", bg: "#fff8f0", color: "#a13c00" },
  { title: "Ad Copywriting", desc: "High-converting headlines & descriptions", bg: "#f0fdf4", color: "#34A853" },
  { title: "Bid Strategy", desc: "ROAS-focused automated and manual bid management", bg: "#faf5ff", color: "#7c3aed" },
  { title: "Audience Segments", desc: "In-market, remarketing & custom intent audiences", bg: "#fff0f0", color: "#EA4335" },
  { title: "Landing Page Audit", desc: "CRO recommendations for higher conversions", bg: "#f0f4ff", color: "#4285F4" },
  { title: "Conversion Tracking", desc: "GA4, GTM & phone call conversion setup", bg: "#fff8f0", color: "#a13c00" },
  { title: "A/B Ad Testing", desc: "Continuous ad variant testing & winner scaling", bg: "#f0fdf4", color: "#34A853" },
  { title: "Negative Keywords", desc: "Ongoing irrelevant traffic blocking & savings", bg: "#faf5ff", color: "#7c3aed" },
  { title: "Quality Score Boost", desc: "Ad relevance & landing page experience fixes", bg: "#fff0f0", color: "#EA4335" },
  { title: "Shopping Feed Setup", desc: "Google Merchant Center integration & feed health", bg: "#f0f4ff", color: "#4285F4" },
  { title: "Dynamic Remarketing", desc: "Product-level re-targeting with user behavior", bg: "#fff8f0", color: "#a13c00" },
  { title: "Ad Extensions & Assets", desc: "Phone call assets and call-focused ad setup", bg: "#f0fdf4", color: "#34A853" },
  { title: "Monthly Reporting", desc: "Transparent performance dashboard & insights", bg: "#faf5ff", color: "#7c3aed" },
  { title: "Budget Pacing", desc: "Daily budget monitoring & smart pacing control", bg: "#fff0f0", color: "#EA4335" },
  { title: "Competitor Analysis", desc: "Auction insights & competitor ad intelligence", bg: "#f0f4ff", color: "#4285F4" },
  { title: "Location Targeting", desc: "Hyper-local or national geo-targeting strategy", bg: "#fff8f0", color: "#a13c00" },
  { title: "Ad Schedule", desc: "Day-parting & peak-hour bid adjustments", bg: "#f0fdf4", color: "#34A853" },
  { title: "YouTube Creative", desc: "Video ad script & creative brief support", bg: "#faf5ff", color: "#7c3aed" },
  { title: "Dedicated Manager", desc: "Certified expert managing your account daily", bg: "#fff0f0", color: "#EA4335" },
];

const workflowSteps = [
  { title: "Discovery & Goal Setting", desc: "We understand your business, revenue targets, audience, and competitors.", color: "#7c3aed", bg: "#faf5ff" },
  { title: "Account Audit", desc: "We review your existing Google Ads account, tracking, and performance.", color: "#a13c00", bg: "#fff8f0" },
  { title: "Keyword Strategy", desc: "We research and prioritize high-intent commercial keywords.", color: "#34A853", bg: "#f0fdf4" },
  { title: "Campaign Architecture", desc: "We build a structured campaign setup with precise targeting.", color: "#4285F4", bg: "#f0f4ff" },
  { title: "Ad Copy Creation", desc: "We create compelling ad copy designed to drive clicks and conversions.", color: "#EA4335", bg: "#fff0f0" },
  { title: "Conversion Setup", desc: "We configure GA4, GTM, conversion tracking, and import conversions.", color: "#7c3aed", bg: "#faf5ff" },
  { title: "Landing Page CRO", desc: "We review landing pages and recommend improvements for better conversions.", color: "#34A853", bg: "#f0fdf4" },
  { title: "Launch & Monitor", desc: "We launch campaigns and closely monitor initial performance.", color: "#a13c00", bg: "#fff8f0" },
  { title: "Optimization Sprints", desc: "We continuously optimize bids, targeting, keywords, and ad performance.", color: "#4285F4", bg: "#f0f4ff" },
  { title: "Monthly Reporting", desc: "We provide transparent performance reports and ongoing growth insights.", color: "#7c3aed", bg: "#faf5ff" },
];

const whyTenx = [
  { title: "Google Certified", desc: "Our team holds active Google Ads & Analytics certifications.", color: "#4285F4", bg: "rgba(66,133,244,0.1)" },
  { title: "AI Bid Management", desc: "Smart algorithms optimizing bids every hour to hit your ROAS targets.", color: "#EA4335", bg: "rgba(234,67,53,0.1)" },
  { title: "Daily Monitoring", desc: "24/7 campaign watchdogs catching anomalies before they cost you.", color: "#34A853", bg: "rgba(52,168,83,0.1)" },
  { title: "Transparent Reporting", desc: "Real-time dashboard. No jargon, just clear revenue-linked KPIs.", color: "#FBBC05", bg: "rgba(251,188,5,0.15)" },
  { title: "Landing Page CRO", desc: "We don't just drive clicks — we optimize the full funnel to conversion.", color: "#7c3aed", bg: "rgba(124,58,237,0.1)" },
  { title: "Advanced Segmentation", desc: "Laser-targeted campaigns for each audience segment and intent level.", color: "#a13c00", bg: "rgba(255,107,0,0.1)" },
  { title: "Budget Guardian", desc: "Zero-waste budget management — every rupee mapped to a conversion goal.", color: "#0f9d58", bg: "rgba(15,157,88,0.1)" },
  { title: "Data-Driven Decisions", desc: "Every optimization backed by statistical significance, not gut feel.", color: "#1a73e8", bg: "rgba(26,115,232,0.1)" },
  { title: "Rapid A/B Testing", desc: "Continuous copy and creative experimentation to always beat your control.", color: "#d946ef", bg: "rgba(217,70,239,0.1)" },
  { title: "Dedicated POC", desc: "One senior account manager with full context owns your growth journey.", color: "#EA4335", bg: "rgba(234,67,53,0.1)" },
];

const beforeList = [
  "Wasted budget on irrelevant clicks", "Low Quality Scores (3–4 avg)", "Generic broad match keywords", "No conversion tracking setup", "One-size-fits-all ad copy",
  "No remarketing campaigns", "High CPC with low ROAS", "No negative keyword list", "Campaigns running 24/7 without schedule", "No competitor intelligence",
  "Poor landing page experience", "Zero A/B testing", "Monthly reporting with no insights", "No audience segmentation",
];

const afterList = [
  "Every click mapped to a revenue goal", "Quality Scores of 8–10 across campaigns", "Tight SKAG keyword architecture", "Full GA4 + GTM conversion tracking", "3–5 headline variants per ad group",
  "Dynamic remarketing for every visitor", "4.8x average ROAS across clients", "800+ negative keywords managed", "Smart day-parting for peak performance", "Weekly Auction Insights review",
  "Optimized landing pages with CRO fixes", "Continuous split-testing sprints", "Real-time performance dashboard", "20+ custom audience segments",
];

const results = [
  { num: "4.8", suffix: "x", label: "Average ROAS", sub: "Across all active client accounts" },
  { num: "42", suffix: "%", label: "Lower CPC Achieved", sub: "vs. client baseline on takeover" },
  { num: "215", suffix: "%", label: "More Qualified Leads", sub: "Average 6-month growth" },
  { num: "8.7", suffix: "%", label: "Average CTR", sub: "vs. 3.2% industry benchmark" },
  { num: "38", suffix: "%", label: "Higher Conversion Rate", sub: "After landing page CRO" },
  { num: "99", suffix: "%", label: "Tracking Accuracy", sub: "GA4 + GTM setup guarantee" },
];

const industries = [
  { title: "Real Estate", desc: "High-value buyer & seller leads", color: "#4285F4", bg: "rgba(66,133,244,0.1)" },
  { title: "Healthcare", desc: "Patient acquisition campaigns", color: "#34A853", bg: "rgba(52,168,83,0.1)" },
  { title: "Education", desc: "Student enrollment & course leads", color: "#FBBC05", bg: "rgba(251,188,5,0.15)" },
  { title: "E-Commerce", desc: "Shopping & Performance Max ROI", color: "#EA4335", bg: "rgba(234,67,53,0.1)" },
  { title: "Restaurants", desc: "Local foot traffic & delivery orders", color: "#a13c00", bg: "rgba(255,107,0,0.1)" },
  { title: "Construction", desc: "Project & contractor lead gen", color: "#7c3aed", bg: "rgba(124,58,237,0.1)" },
  { title: "Technology", desc: "SaaS trials, demos & B2B leads", color: "#1a73e8", bg: "rgba(26,115,232,0.1)" },
  { title: "Finance", desc: "Loan, insurance & investment leads", color: "#0f9d58", bg: "rgba(15,157,88,0.1)" },
  { title: "Automotive", desc: "Dealership visits & test drive leads", color: "#EA4335", bg: "rgba(234,67,53,0.1)" },
  { title: "Travel", desc: "Booking intent targeting at scale", color: "#d946ef", bg: "rgba(217,70,239,0.1)" },
];

const ecosystem = [
  {
    name: "Google Ads",
    logo: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.9 3L8.7 15.2C8.2 16 8.2 17 8.7 17.8L12.3 24C12.8 24.8 13.7 25 14.5 24.5C15.3 24 15.5 23.1 15 22.3L11.4 16.1L18.6 3.9C19.1 3.1 18.9 2.2 18.1 1.7C17.3 1.2 16.4 1.4 15.9 3Z" fill="#FBBC05"/>
        <path d="M2.9 24.5C3.7 25 4.6 24.8 5.1 24L15 7.4L12.6 3.4L1.7 21.7C1.2 22.5 1.4 23.4 2.2 23.9C2.4 24.1 2.6 24.3 2.9 24.5Z" fill="#4285F4"/>
        <path d="M15 7.4L5.1 24C5.6 24.8 6.5 25 7.3 24.5L18.2 18.2C19 17.7 19.2 16.8 18.7 16L15 7.4Z" fill="#34A853"/>
      </svg>
    ),
    bg: "#e8f0fe"
  },
  {
    name: "Google Analytics 4",
    logo: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 19.5A1.5 1.5 0 0 1 4.5 18v-4A1.5 1.5 0 0 1 6 12.5a1.5 1.5 0 0 1 1.5 1.5v4A1.5 1.5 0 0 1 6 19.5z" fill="#F9AB00" />
        <path d="M12 19.5a1.5 1.5 0 0 1-1.5-1.5V9A1.5 1.5 0 0 1 12 7.5a1.5 1.5 0 0 1 1.5 1.5v9A1.5 1.5 0 0 1 12 19.5z" fill="#E8710A" />
        <path d="M18 19.5a1.5 1.5 0 0 1-1.5-1.5V4A1.5 1.5 0 0 1 18 2.5a1.5 1.5 0 0 1 1.5 1.5v14a1.5 1.5 0 0 1-1.5 1.5z" fill="#EA4335" />
      </svg>
    ),
    bg: "#e6f4ea"
  },
  {
    name: "Google Tag Manager",
    logo: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="6" fill="#4285F4" opacity="0.15" />
        <path d="M12 4L4 12l8 8 8-8L12 4zm0 3.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9z" fill="#4285F4" />
        <circle cx="12" cy="12" r="2" fill="#ffffff" />
      </svg>
    ),
    bg: "#fce8e6"
  },
  {
    name: "Merchant Center",
    logo: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="6" fill="#4285F4" />
        <path d="M17 9h-2V7a3 3 0 0 0-6 0v2H7a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2zm-6-2a1 1 0 0 1 2 0v2h-2V7zm6 10H7v-6h10v6z" fill="#ffffff" />
      </svg>
    ),
    bg: "#fef7e0"
  },
  {
    name: "Search Console",
    logo: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="#34A853" strokeWidth="2" />
        <path d="M12 22a10 10 0 0 1-10-10h4a6 6 0 0 0 12 0h4a10 10 0 0 1-10 10z" fill="#4285F4" />
        <path d="M12 6v6l3.5 3.5" stroke="#EA4335" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    bg: "#e8f0fe"
  },
  {
    name: "Keyword Planner",
    logo: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="6" fill="#a855f7" opacity="0.15" />
        <path d="M8 12a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm6.5-6.5L21 11l-3.5 3.5-3.5-3.5 3.5-3.5z" fill="#a855f7" />
        <path d="M11 13.5l4.5-4.5" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    bg: "#f3e8fd"
  },
  {
    name: "Looker Studio",
    logo: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" fill="#4285F4" opacity="0.15" />
        <circle cx="12" cy="8" r="3" fill="#4285F4" />
        <circle cx="8" cy="15" r="3" fill="#1a73e8" />
        <circle cx="16" cy="15" r="3" fill="#1557b0" />
        <line x1="12" y1="8" x2="8" y2="15" stroke="#4285F4" strokeWidth="2" />
        <line x1="12" y1="8" x2="16" y2="15" stroke="#4285F4" strokeWidth="2" />
        <line x1="8" y1="15" x2="16" y2="15" stroke="#4285F4" strokeWidth="2" />
      </svg>
    ),
    bg: "#e6f4ea"
  },
  {
    name: "Google Business",
    logo: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 10h16v10H4V10z" fill="#4285F4" />
        <path d="M2 10l10-6 10 6" stroke="#ea4335" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M8 14h8" stroke="#ffffff" strokeWidth="2" />
        <path d="M12 11v6" stroke="#ffffff" strokeWidth="2" />
      </svg>
    ),
    bg: "#fce8e6"
  },
  {
    name: "Microsoft Clarity",
    logo: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 20h20L12 2z" fill="#0078d4" opacity="0.2" />
        <path d="M12 2L2 20h10V2z" fill="#0078d4" />
        <path d="M12 2l10 18H12V2z" fill="#50e6ff" />
      </svg>
    ),
    bg: "#e8f0fe"
  },
  {
    name: "Hotjar",
    logo: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.66 9.53a9 9 0 0 0-7.07-8.5 7.45 7.45 0 0 0-2.6 1.18c-3.18 2.22-4.14 6.5-2.2 9.77a7.5 7.5 0 0 0 10.3 3c4.54-2.62 5.08-7.3 1.57-5.45z" fill="#a13c00" />
        <path d="M12 22a5 5 0 0 0 5-5c0-2.5-3-5.5-5-5.5s-5 3-5 5.5a5 5 0 0 0 5 2z" fill="#EA4335" />
      </svg>
    ),
    bg: "#fef7e0"
  },
  {
    name: "SEMrush",
    logo: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="12" r="6" fill="#a13c00" />
        <path d="M16 12h-8M16 12l-4-4M16 12l-4 4" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
        <path d="M10 6L3 12l7 6" stroke="#a13c00" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    bg: "#f3e8fd"
  },
  {
    name: "Ahrefs",
    logo: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="6" fill="#0056b3" />
        <text x="12" y="17" fill="#ffffff" fontSize="16" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">a</text>
      </svg>
    ),
    bg: "#e6f4ea"
  },
  {
    name: "CallRail",
    logo: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" fill="#4285F4" />
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="#ffffff" strokeWidth="2.2" fill="none" transform="scale(0.6) translate(8, 8)" />
      </svg>
    ),
    bg: "#fce8e6"
  },
  {
    name: "Meta Pixel",
    logo: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.2 8C5.4 8 3 10 3 12s2.4 4 5.2 4c1.8 0 3.3-.8 4.8-2.6 1.5 1.8 3 2.6 4.8 2.6 2.8 0 5.2-2 5.2-4s-2.4-4-5.2-4c-1.8 0-3.3.8-4.8 2.6C11.5 8.8 10 8 8.2 8zm0 2c1.2 0 2.2.8 3.3 2.2-1.1 1.4-2.1 2.2-3.3 2.2C6.4 14.4 5 13.4 5 12s1.4-2.4 3.2-2.4zm7.6 0c1.8 0 3.2 1 3.2 2.4s-1.4 2.4-3.2 2.4c-1.2 0-2.2-.8-3.3-2.2 1.1-1.4 2.1-2.2 3.3-2.2z" fill="#0064e0" />
      </svg>
    ),
    bg: "#e8f0fe"
  }
];

const caseStudies = [
  {
    tag: "E-Commerce · Fashion", title: "3.1x ROAS in 90 Days",
    desc: "Fashion brand struggling with 1.2x ROAS, high CPCs and no Shopping campaigns. We overhauled their account architecture end-to-end.",
    challenge: "Wasted 60% of budget on broad match terms with zero conversion tracking.",
    strategy: "Implemented Performance Max + Shopping with product feed optimisation and SKAG search structure.",
    metrics: [{ val: "3.1x", lbl: "ROAS" }, { val: "↓48%", lbl: "CPC" }, { val: "+320%", lbl: "Revenue" }],
  },
  {
    tag: "Healthcare · Clinic", title: "215 Patient Leads / Month",
    desc: "Multi-specialty clinic needed a steady pipeline of qualified appointment bookings. Starting from zero Google Ads presence.",
    challenge: "No digital advertising history, relying entirely on referrals and walk-ins.",
    strategy: "Built local search campaigns + call-only ads + remarketing to website visitors with appointment intent.",
    metrics: [{ val: "215", lbl: "Leads/Mo" }, { val: "₹180", lbl: "CPL" }, { val: "8.4%", lbl: "CTR" }],
  },
  {
    tag: "Real Estate · Developer", title: "₹2.4Cr Revenue Generated",
    desc: "Residential project launch targeting high-net-worth buyers in a competitive market with 6-week sales window.",
    challenge: "High ticket purchase with long consideration cycle and fierce competitive bidding environment.",
    strategy: "Layered search + YouTube video ads + remarketing funnel with bespoke landing page per ad variant.",
    metrics: [{ val: "₹2.4Cr", lbl: "Revenue" }, { val: "4.6x", lbl: "ROAS" }, { val: "68", lbl: "Bookings" }],
  },
  {
    tag: "SaaS · B2B Tech", title: "Cost Per Trial Down 61%",
    desc: "Series-A SaaS burning $18k/month with no clear attribution model and a 9% trial-to-paid conversion rate.",
    challenge: "Siloed campaigns with no audience segmentation, overlapping keywords and no negative keyword strategy.",
    strategy: "Rebuilt with audience exclusions, competitor bidding strategy, RSA testing and CRM-connected conversion tracking.",
    metrics: [{ val: "↓61%", lbl: "Cost/Trial" }, { val: "4.8x", lbl: "ROAS" }, { val: "+180%", lbl: "Trials" }],
  },
];

const faqs = [
  { q: "How much budget do I need to start Google Ads?", a: "We recommend a minimum monthly ad spend of ₹30,000–₹50,000 to gather enough data for optimization. For competitive industries like real estate or finance, ₹1L+ delivers faster results. Our management fee is separate from your ad spend." },
  { q: "How long before I see results from Google Ads?", a: "Most clients see meaningful data within the first 2–4 weeks. Optimization cycles run every week, and by month 2–3, campaigns are typically hitting target ROAS. Immediate clicks start within hours of launch." },
  { q: "Do you manage Google Ads for small businesses?", a: "Absolutely. We serve businesses of all sizes — from local service providers spending ₹20,000/month to enterprise e-commerce brands at ₹10L+/month. Our strategy scales to your budget." },
  { q: "What makes TenX different from other Google Ads agencies?", a: "We're a certified Google Ads Partner with a data-first approach. Every decision is backed by analytics, not assumptions. We own conversion tracking, landing page performance and creative testing — not just click management." },
  { q: "Will I have access to my Google Ads account?", a: "Yes, always. Your account stays in your name. We operate as managers, not owners. Full transparency is non-negotiable — you can view every change, every spend and every result in real time." },
  { q: "Do you also create the landing pages?", a: "Yes. Our team includes CRO specialists who can design, build and A/B test landing pages specifically for your campaigns. This is often the difference between a 2x and 6x ROAS." },
  { q: "What reporting do I receive?", a: "You get a real-time Looker Studio dashboard plus a detailed monthly PDF report covering impressions, clicks, CTR, conversions, CPC, ROAS, and strategic recommendations for the next period." },
];

function getIndustryIcon(title, color) {
  switch (title) {
    case "Real Estate":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      );
    case "Healthcare":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <line x1="12" y1="8" x2="12" y2="16" />
          <line x1="8" y1="12" x2="16" y2="12" />
        </svg>
      );
    case "Education":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
        </svg>
      );
    case "E-Commerce":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
      );
    case "Restaurants":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
          <path d="M7 2v20" />
          <path d="M21 15V2v0a5 5 0 0 0-5 5v8c0 1.1.9 2 2 2h3z" />
          <path d="M18 22V15" />
        </svg>
      );
    case "Construction":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      );
    case "Technology":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="2" y1="20" x2="22" y2="20" />
          <line x1="12" y1="17" x2="12" y2="20" />
        </svg>
      );
    case "Finance":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
          <polyline points="17 6 23 6 23 12" />
        </svg>
      );
    case "Automotive":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
          <circle cx="7" cy="17" r="2" />
          <circle cx="17" cy="17" r="2" />
          <path d="M5 17h10" />
        </svg>
      );
    case "Travel":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
          <path d="M2 12h20" />
        </svg>
      );
    default:
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      );
  }
}

function getWhyIcon(title, color) {
  switch (title) {
    case "Google Certified":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    case "AI Bid Management":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <rect x="9" y="9" width="6" height="6" />
          <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3" />
        </svg>
      );
    case "Daily Monitoring":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      );
    case "Transparent Reporting":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      );
    case "Landing Page CRO":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <line x1="3" y1="9" x2="21" y2="9" />
          <path d="m9 14 2 2 4-4" />
        </svg>
      );
    case "Advanced Segmentation":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      );
    case "Budget Guardian":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="6" width="20" height="12" rx="2" />
          <circle cx="12" cy="12" r="2" />
          <path d="M6 12h.01M18 12h.01" />
        </svg>
      );
    case "Data-Driven Decisions":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
          <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
        </svg>
      );
    case "Rapid A/B Testing":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2h12M16 2v5.5a8 8 0 0 1 2 5.5v5a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-5a8 8 0 0 1 2-5.5V2" />
          <path d="M6 14h12" />
        </svg>
      );
    case "Dedicated POC":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      );
    default:
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      );
  }
}

export default function GoogleAdsPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);

  const renderWorkflowVisual = (stepIdx) => {
    switch (stepIdx) {
      case 0:
        return (
          <div className="ga-console-panel">
            <div className="ga-console-grid">
              <div className="ga-console-item">
                <span className="ga-console-lbl">Target ROAS Target</span>
                <span className="ga-console-val text-blue">4.5x</span>
              </div>
              <div className="ga-console-item">
                <span className="ga-console-lbl">CPL Threshold</span>
                <span className="ga-console-val text-green">₹180</span>
              </div>
              <div className="ga-console-item">
                <span className="ga-console-lbl">Allocated Budget</span>
                <span className="ga-console-val">₹50K/mo</span>
              </div>
            </div>
            <div className="ga-console-progress-track">
              <div className="ga-console-track-lbl">Strategic Alignment Status</div>
              <div className="ga-console-bar-fill blue" style={{ width: "100%" }}>ACTIVE / SYNCD</div>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="ga-console-panel">
            <div className="ga-audit-list">
              <div className="ga-audit-item red">
                <span>Wasted Ad Spend</span>
                <strong>42.5%</strong>
              </div>
              <div className="ga-audit-item yellow">
                <span>Quality Score Average</span>
                <strong>4.2 / 10</strong>
              </div>
              <div className="ga-audit-item red">
                <span>Conversion Tracking</span>
                <strong>CRITICAL FAULT</strong>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="ga-console-panel">
            <div className="ga-keyword-map">
              <div className="ga-kw-row">
                <span className="ga-kw-pill phrase">"google ads agency"</span>
                <span className="ga-kw-stat">12.4K Searches</span>
              </div>
              <div className="ga-kw-row">
                <span className="ga-kw-pill exact">[google ads expert]</span>
                <span className="ga-kw-stat">5.8K Searches</span>
              </div>
              <div className="ga-kw-row">
                <span className="ga-kw-pill negative">-free -jobs</span>
                <span className="ga-kw-stat text-red">BLOCKED</span>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="ga-console-panel">
            <div className="ga-tree">
              <div className="ga-tree-node campaign">📂 Search_LeadGen_2026</div>
              <div className="ga-tree-node adgroup" style={{ marginLeft: "20px" }}>📁 AG_GoogleAds_Exact</div>
              <div className="ga-tree-node keyword" style={{ marginLeft: "40px" }}>🔑 [google ads agency]</div>
              <div className="ga-tree-node adgroup" style={{ marginLeft: "20px" }}>📁 AG_GoogleAds_Phrase</div>
              <div className="ga-tree-node keyword" style={{ marginLeft: "40px" }}>🔑 "google ads expert"</div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="ga-console-panel">
            <div className="ga-ad-preview">
              <div className="ga-ad-url">www.tenx.co/services/google-ads</div>
              <div className="ga-ad-title">Scale Google Ads to 10x | Certified Partner Agency</div>
              <div className="ga-ad-desc">Maximize your conversion value with AI-driven bid management. Access daily live reporting.</div>
              <div className="ga-ad-strength">
                <span>Ad Strength:</span>
                <strong className="text-green">Excellent</strong>
              </div>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="ga-console-panel">
            <div className="ga-gtm-tags">
              <div className="ga-gtm-row success">
                <span className="ga-gtm-badge">CONNECTED</span>
                <span>GA4 Purchase Event</span>
              </div>
              <div className="ga-gtm-row success">
                <span className="ga-gtm-badge">CONNECTED</span>
                <span>GTM Form Submit Trigger</span>
              </div>
              <div className="ga-gtm-row success">
                <span className="ga-gtm-badge">CONNECTED</span>
                <span>CallRail Track Initiated</span>
              </div>
            </div>
          </div>
        );
      case 6:
        return (
          <div className="ga-console-panel">
            <div className="ga-cro-rows">
              <div className="ga-cro-variant">
                <span>Variant A (Original)</span>
                <div className="ga-cro-bar"><div className="ga-cro-fill" style={{ width: "35%", background: "#64748b" }} /></div>
                <span>2.3% CVR</span>
              </div>
              <div className="ga-cro-variant winner">
                <span className="text-green">Variant B (Optimized)</span>
                <div className="ga-cro-bar"><div className="ga-cro-fill" style={{ width: "85%", background: "#10b981" }} /></div>
                <strong className="text-green">5.1% CVR 🎉</strong>
              </div>
            </div>
          </div>
        );
      case 7:
        return (
          <div className="ga-pipeline">
            {[
              ["Search Brand", "87%", "#4285F4", "Active"],
              ["Search Non-Brand", "73%", "#EA4335", "Active"],
              ["Shopping Campaign", "65%", "#34A853", "Active"],
              ["Remarketing", "52%", "#7c3aed", "Active"],
              ["YouTube Awareness", "38%", "#FF0000", "Paused"],
              ["Performance Max", "29%", "#FBBC05", "Draft"],
            ].map(([label, pct, color, status]) => (
              <div key={label} className="ga-pipeline-row">
                <span className="ga-pipeline-label">{label}</span>
                <div className="ga-pipeline-bar">
                  <div className="ga-pipeline-fill" style={{ width: pct, background: color }} />
                </div>
                <span className="ga-pipeline-val">{pct}</span>
                <span className={`ga-pipeline-status ${status === "Active" ? "ga-ps-active" : status === "Paused" ? "ga-ps-paused" : "ga-ps-draft"}`}>{status}</span>
              </div>
            ))}
          </div>
        );
      case 8:
        return (
          <div className="ga-console-panel">
            <div className="ga-sprints">
              <div className="ga-sprint-act positive">
                <span>📈 Bid Adjustments</span>
                <strong>+12% on high-performance segments</strong>
              </div>
              <div className="ga-sprint-act negative">
                <span>🛑 Negative Sync</span>
                <strong>Wasted keywords auto-archived</strong>
              </div>
            </div>
          </div>
        );
      case 9:
        return (
          <div className="ga-console-panel">
            <div className="ga-report-box">
              <div className="ga-report-metrics">
                <div className="ga-rm-item">
                  <span>Spend</span>
                  <strong>₹50K</strong>
                </div>
                <div className="ga-rm-item text-green">
                  <span>ROAS</span>
                  <strong>4.8x</strong>
                </div>
                <div className="ga-rm-item text-green">
                  <span>Convs</span>
                  <strong>+38%</strong>
                </div>
              </div>
              <div className="ga-report-status">Looker Studio Dashboard generated & shared.</div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="ga-page">
      <Header />

      {/* ── 1. HERO ── */}
      <section className="ga-hero">
        <div className="ga-grid-bg" />
        <div style={{ position: "absolute", top: "-80px", right: "20%", width: "500px", height: "500px", borderRadius: "50%", background: "rgba(66,133,244,0.05)", filter: "blur(90px)", pointerEvents: "none" }} />
        
        <div className="ga-hero-container">
          <div className="ga-hero-grid">
            {/* Left */}
            <div>
              <div className="ga-hero-badge anim-fade-in-up delay-1">
                <span style={{ color: "#FBBC05" }}>★</span> Google Premier Partner · Certified Specialists
              </div>
              <h1 className="anim-fade-in-up delay-2">
                Turn Google Searches Into <span className="ga-text-orange">Real</span> <span className="ga-text-purple">Revenue.</span>
              </h1>
              <p className="anim-fade-in-up delay-3">Digital Marketing TenX provides performance-focused Google Ads services in Hyderabad, helping businesses reach high-intent customers, reduce wasted ad spend, and generate measurable growth through data-driven PPC campaigns.</p>
              
              <div className="ga-hero-btns anim-fade-in-up delay-4">
                <Link href="/contact" className="ga-btn-orange">
                  📅 Get a Free Google Ads Consultation
                </Link>
                <Link href="/contact" className="ga-btn-orange">
                  🚀 Start Your Campaign
                </Link>
              </div>
            </div>

            {/* Right — Hero Image */}
            <div className="ga-hero-visual anim-scale-in delay-5">
              <div className="ga-hero-img-wrap">
                <Image
                  src="/google ads hero.webp"
                  alt="Best Google Ads Services in Hyderabad | Digital Marketing TenX"
                  width={700}
                  height={500}
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "cover",
                    display: "block",
                    borderRadius: "16px",
                    boxShadow: "0 24px 80px rgba(66,133,244,0.18), 0 8px 32px rgba(0,0,0,0.12)"
                  }}
                  priority
                />

              </div>
            </div>
          </div>



          {/* Features attributes row */}
          <div className="ga-features-attributes-row">
            <div className="ga-attrib-item">
              <div className="ga-attrib-logo-wrap">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.24 10.285V13.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.866-3.577-7.866-7.989 0-4.412 3.536-7.989 7.866-7.989 2.465 0 4.118 1.025 5.057 1.926l2.424-2.333C17.962 1.635 15.347 1 12.24 1 5.48 1 0 6.48 0 13.24s5.48 12.24 12.24 12.24c7.057 0 11.751-4.957 11.751-11.957 0-.807-.087-1.42-.193-1.957l-11.558-.281z" />
                </svg>
              </div>
              <div className="ga-attrib-info">
                <span className="ga-attrib-title">Google Ads Expertise</span>
                <span className="ga-attrib-desc">Certified expertise to manage and optimize Google Ads campaigns for better performance</span>
              </div>
            </div>

            <div className="ga-attrib-item">
              <div className="ga-attrib-icon-wrap" style={{ color: "#34A853" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
                </svg>
              </div>
              <div className="ga-attrib-info">
                <span className="ga-attrib-title">Data-Driven Strategy</span>
                <span className="ga-attrib-desc">Every campaign decision is backed by data, insights, and performance analysis</span>
              </div>
            </div>

            <div className="ga-attrib-item">
              <div className="ga-attrib-icon-wrap" style={{ color: "#7c3aed" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="6" />
                  <circle cx="12" cy="12" r="2" />
                </svg>
              </div>
              <div className="ga-attrib-info">
                <span className="ga-attrib-title">Conversion Focused</span>
                <span className="ga-attrib-desc">Campaigns built to attract relevant traffic and drive meaningful conversions</span>
              </div>
            </div>

            <div className="ga-attrib-item">
              <div className="ga-attrib-icon-wrap" style={{ color: "#a855f7" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
              </div>
              <div className="ga-attrib-info">
                <span className="ga-attrib-title">Daily Optimization</span>
                <span className="ga-attrib-desc">We continuously monitor and optimize campaigns to improve performance and efficiency</span>
              </div>
            </div>

            <div className="ga-attrib-item">
              <div className="ga-attrib-icon-wrap" style={{ color: "#a13c00" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <div className="ga-attrib-info">
                <span className="ga-attrib-title">No Lock-In Contracts</span>
                <span className="ga-attrib-desc">Stay with us because of the results—not because of long-term contracts</span>
              </div>
            </div>
          </div>


        </div>
      </section>


      {/* ── 2. WHY GOOGLE ADS ── */}
      <section className="ga-section ga-section-light ga-why-google-ads-section">
        <div className="ga-wrap">
          <div className="ga-why-grid-layout" style={{ display: "block" }}>
            
            {/* Why Google Ads Content */}
            <div className="ga-why-ads-right-content">
                            <div className="ga-why-badge-pill">
                ⭐ WHY GOOGLE ADS?
              </div>
              <h2>
                The Highest-Intent Traffic Channel<br />
                <span className="ga-on-text">on</span> <span className="ga-earth-text">Earth</span>
              </h2>
              <p className="ga-why-description-p">
                Reach customers at the exact moment they are searching for products or services like yours. Google Ads puts your business in front of high-intent audiences who are ready to take action.
              </p>

              {/* Feature Pipeline Cards */}
              <div className="ga-pipeline-features-grid">
                
                <div className="ga-feature-pipeline-card">
                  <div className="ga-pipeline-card-icon-dot blue">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4285F4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4.5 16.5c-1.5 1.26-2 2.5-2 3.5 1-.5 2.5-1 3.5-2.5" />
                      <path d="M12 2C6.5 2 2 6.5 2 12c0 2.5 1 4.5 2.5 6l11.5-11.5c-1.5-1.5-3.5-2.5-6-2.5z" />
                      <path d="M22 2s-3.5 1-6 2.5L20 10.5C21.5 8 22 2 22 2z" />
                    </svg>
                  </div>
                  <h4>Instant Visibility</h4>
                  <p>Go live quickly and reach potential customers when they are actively searching.</p>
                </div>

                <div className="ga-feature-pipeline-card">
                  <div className="ga-pipeline-card-icon-dot green">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#34A853" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <circle cx="12" cy="12" r="6" />
                      <circle cx="12" cy="12" r="2" />
                    </svg>
                  </div>
                  <h4>High Purchase Intent</h4>
                  <p>Reach people actively searching for the products or services you offer.</p>
                </div>

                <div className="ga-feature-pipeline-card">
                  <div className="ga-pipeline-card-icon-dot blue">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1a73e8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <h4>Precise Targeting</h4>
                  <p>Target the right audience based on keywords, location, interests, and intent.</p>
                </div>

                <div className="ga-feature-pipeline-card">
                  <div className="ga-pipeline-card-icon-dot orange">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a13c00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="20" x2="18" y2="10" />
                      <line x1="12" y1="20" x2="12" y2="4" />
                      <line x1="6" y1="20" x2="6" y2="14" />
                    </svg>
                  </div>
                  <h4>Measurable Results</h4>
                  <p>Track clicks, conversions, leads, and campaign performance with clear data.</p>
                </div>

                <div className="ga-feature-pipeline-card">
                  <div className="ga-pipeline-card-icon-dot purple">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                      <polyline points="17 6 23 6 23 12" />
                    </svg>
                  </div>
                  <h4>Scalable Growth</h4>
                  <p>Scale your budget as your campaigns grow and generate more conversions.</p>
                </div>

                <div className="ga-feature-pipeline-card">
                  <div className="ga-pipeline-card-icon-dot red">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#EA4335" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <h4>24/7 Campaigns</h4>
                  <p>Reach potential customers and generate leads around the clock with always-on campaigns.</p>
                </div>

                <div className="ga-feature-pipeline-card">
                  <div className="ga-pipeline-card-icon-dot yellow">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FBBC05" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </div>
                  <h4>Fast Lead Generation</h4>
                  <p>Connect with high-intent customers and generate qualified leads faster.</p>
                </div>

                <div className="ga-feature-pipeline-card">
                  <div className="ga-pipeline-card-icon-dot green">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#34A853" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="1" x2="12" y2="23" />
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </div>
                  <h4>Higher ROI</h4>
                  <p>Maximize your advertising budget with optimized campaigns that focus on delivering more leads, sales, and conversions while reducing wasted ad spend.</p>
                </div>
              </div>



            </div>

          </div>
        </div>
      </section>

      {/* ── 3. SERVICES ── */}
      <section className="ga-section ga-section-white">
        <div className="ga-wrap">
          <div className="ga-title-center">
            <div className="ga-services-eyebrow-capsule">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: "6px" }}>
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>
              OUR GOOGLE ADS SERVICES
            </div>
            <h2>Every Google Ads Format. <span className="ga-mastered-gradient-text">Mastered.</span></h2>
            <p>From Search to Performance Max, Shopping to YouTube — we run the full Google Ads ecosystem to capture every stage of your customer's journey.</p>
          </div>
          <div className="ga-services-grid">
            {services.map(s => (
              <div key={s.title} className="ga-svc-card" style={{ "--svc-theme-color": s.color }}>
                <div className="ga-svc-card-content">
                  <div className="ga-svc-icon" style={{ background: s.bg }}>
                    <div className="ga-svc-icon-inner-circle" style={{ borderColor: s.color }}>
                      {getServiceIcon(s.title, s.color)}
                    </div>
                  </div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                  <div className="ga-svc-benefits">
                    {s.benefits.map(b => (
                      <div key={b} className="ga-svc-benefit">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={s.color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginRight: "8px" }}>
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        {b}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. INCLUDED ── */}
      <section className="ga-section ga-section-light ga-included-section">
        <div className="ga-wrap">
          <div className="ga-title-center">
            <div className="ga-included-eyebrow-capsule">
              <span style={{ color: "#a13c00", marginRight: "6px" }}>✦</span>
              WHAT'S INCLUDED
            </div>
            <h2>Everything We Do to Maximize Your <span className="ga-text-orange">Google</span> <span className="ga-text-purple">Ads</span></h2>
            <p>From strategy to optimization — we handle every detail so you get better results, lower costs, and more conversions.</p>
          </div>
          
          <div className="ga-included-grid">
            {included.map((it, idx) => (
              <div key={it.title} className="ga-inc-card" style={{ "--inc-theme-color": it.color }}>
                <div className="ga-inc-card-top-row">
                  <span className="ga-inc-card-number">{String(idx + 1).padStart(2, "0")}</span>
                  <div className="ga-inc-icon-wrap" style={{ background: it.bg, borderColor: it.color + "40" }}>
                    {getIncludedIcon(it.title, it.color)}
                  </div>
                </div>
                <h4>{it.title}</h4>
                <p>{it.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. WORKFLOW ── */}
      <section className="ga-section ga-section-white" style={{ paddingBottom: "40px" }}>
        <div className="ga-wrap">
          <div className="ga-title-center">
            <div className="ga-process-eyebrow">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: "6px" }}><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="9" y1="3" x2="9" y2="21" /></svg>
              OUR PROCESS
            </div>
            <h2><span className="ga-text-orange-gradient">10-Step</span> Campaign Launch Framework</h2>
            <p>A proven, repeatable process that takes your Google Ads campaigns from strategy to high-performing campaigns in <span className="ga-text-purple-bold">under 14 days.</span></p>
          </div>
          
          <div className="ga-workflow-wrap">
            {/* Left Col: Steps List */}
            <div className="ga-workflow-steps">
              <div className="ga-wf-steps-connector-line" />
              {workflowSteps.map((step, i) => (
                <div
                  key={i}
                  className={`ga-wf-step${activeStep === i ? " active" : ""}`}
                  onClick={() => setActiveStep(i)}
                  style={{ "--step-theme-color": step.color }}
                >
                  <div className="ga-wf-step-dot" style={{ background: step.color }} />
                  <div className="ga-wf-step-icon-wrap" style={{ background: step.bg, borderColor: step.color + "30" }}>
                    {getWorkflowStepIcon(i, step.color)}
                  </div>
                  <span className="ga-wf-step-num-label">{String(i + 1).padStart(2, "0")}</span>
                  <div className="ga-wf-content">
                    <h4>{step.title}</h4>
                    <p>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Col: Dashboard Visuals & Features Stack */}
            <div className="ga-workflow-visuals-col">
              <div className="ga-workflow-visual">
                <div className="ga-wv-header">
                  <span className="ga-wv-title">Campaign Pipeline Status</span>
                  <div className="ga-wv-live">
                    <div className="ga-dash-live-dot" style={{ width: "6px", height: "6px" }} />
                    LIVE
                  </div>
                </div>
                
                <div className="ga-pipeline">
                  {[
                    ["Search Brand", "87%", "#4285F4", "Active"],
                    ["Search Non-Brand", "72%", "#EA4335", "Active"],
                    ["Shopping Campaign", "68%", "#34A853", "Active"],
                    ["Remarketing", "56%", "#7c3aed", "Active"],
                    ["YouTube Awareness", "38%", "#FF0000", "Paused"],
                    ["Performance Max", "29%", "#FBBC05", "Draft"],
                  ].map(([label, pct, color, status]) => (
                    <div key={label} className="ga-pipeline-row">
                      <span className="ga-pipeline-label">{label}</span>
                      <div className="ga-pipeline-bar">
                        <div className="ga-pipeline-fill" style={{ width: pct, background: color }} />
                      </div>
                      <span className="ga-pipeline-val">{pct}</span>
                      <span className={`ga-pipeline-status ${status === "Active" ? "ga-ps-active" : status === "Paused" ? "ga-ps-paused" : status === "Draft" ? "ga-ps-draft" : ""}`}>{status}</span>
                    </div>
                  ))}
                </div>

                <div className="ga-wf-active-detail-panel">
                  <div className="ga-wf-active-circle" style={{ background: workflowSteps[activeStep].color }}>
                    <span className="ga-wf-active-circle-lbl">STEP</span>
                    <span className="ga-wf-active-circle-num">{String(activeStep + 1).padStart(2, "0")}</span>
                  </div>
                  <div className="ga-wf-active-detail-info">
                    <h4>{workflowSteps[activeStep].title}</h4>
                    <p>{workflowSteps[activeStep].desc}</p>
                  </div>
                </div>
              </div>

              {/* Why Our Process Works Feature Grid */}
              <div className="ga-why-process-works-card">
                <h3>
                  <span className="ga-sparkle-icon">✦</span>
                  Why Our Process Works
                </h3>
                <div className="ga-why-process-grid">
                  {[
                    { title: "Data-Driven", desc: "Every step backed by data & proven tactics.", color: "#7c3aed" },
                    { title: "Fast Execution", desc: "Launch high-performing campaigns in under 14 days.", color: "#a13c00" },
                    { title: "ROI Focused", desc: "Built to maximize leads, sales & profitability.", color: "#34A853" },
                    { title: "Transparent", desc: "Clear reporting & real-time performance visibility.", color: "#4285F4" },
                    { title: "Expert Team", desc: "Google Ads certified specialists managing your campaigns.", color: "#EA4335" },
                    { title: "Continuous Growth", desc: "Constant optimization to scale what works.", color: "#7c3aed" }
                  ].map((feat, idx) => (
                    <div key={idx} className="ga-why-process-feat-box">
                      <div className="ga-wp-feat-icon-circle" style={{ color: feat.color, background: feat.color + "0d", borderColor: feat.color + "20" }}>
                        {getWhyProcessIcon(feat.title, feat.color)}
                      </div>
                      <div className="ga-wp-feat-content">
                        <h4>{feat.title}</h4>
                        <p>{feat.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Strategy to Success ribbon banner */}
          <div className="ga-process-bottom-banner">
            <div className="ga-pbb-left">
              <div className="ga-pbb-icon-wrap">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              <div className="ga-pbb-text">
                <h4>From Strategy to Success — We Handle Everything</h4>
                <p>You focus on your business. We focus on your Google Ads performance.</p>
              </div>
            </div>
            <Link href="/contact" className="ga-pbb-btn">
              📅 Book a Free Consultation
            </Link>
          </div>
        </div>
      </section>


      {/* ── 7. WHY TENX ── */}
      <section className="ga-section ga-section-white" style={{ paddingTop: "20px" }}>
        <div className="ga-wrap">
          <div className="ga-title-center">
            <div className="ga-eyebrow">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
              Why TenX
            </div>
            <h2>10 Reasons Brands Choose TenX for Google Ads</h2>
            <p>We combine certified expertise, AI-powered tooling and a relentless focus on measurable revenue — not vanity metrics.</p>
          </div>
          <div className="ga-why-tenx-grid">
            {whyTenx.map(w => (
              <div key={w.title} className="ga-wt-card">
                <div className="ga-wt-icon" style={{ background: w.bg }}>
                  {getWhyIcon(w.title, w.color)}
                </div>
                <h4>{w.title}</h4>
                <p>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. BEFORE VS AFTER ── */}
      <section className="ga-section ga-section-light">
        <div className="ga-wrap">
          <div className="ga-title-center">
            <div className="ga-eyebrow">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>
              Transformation
            </div>
            <h2>Before TenX vs After TenX</h2>
            <p>The difference between a poorly managed Google Ads account and a TenX-optimized one is the difference between burning budget and printing revenue.</p>
          </div>
          <div className="ga-bva-wrap">
            <div className="ga-bva-panel before">
              <div className="ga-bva-panel-header">
                <IconX size={16} /> Without TenX — Wasted Potential
              </div>
              <div className="ga-bva-list">
                {beforeList.map(item => (
                  <div key={item} className="ga-bva-item"><IconX size={14} />{item}</div>
                ))}
              </div>
            </div>
            <div className="ga-bva-panel after">
              <div className="ga-bva-panel-header">
                <IconCheck size={16} color="#34A853" /> With TenX — Revenue Machine
              </div>
              <div className="ga-bva-list">
                {afterList.map(item => (
                  <div key={item} className="ga-bva-item"><IconCheck size={14} />{item}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ── 10. INDUSTRIES ── */}
      <section className="ga-section ga-section-light">
        <div className="ga-wrap">
          <div className="ga-title-center">
            <div className="ga-eyebrow">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
              Industries
            </div>
            <h2>We've Driven Growth Across 10+ Industries</h2>
            <p>Whether you're a local service provider or a national e-commerce brand, we have battle-tested Google Ads strategies for your industry.</p>
          </div>
          <div className="ga-industries-grid">
            {industries.map(ind => (
              <div key={ind.title} className="ga-industry-card">
                <div className="ga-industry-icon" style={{ background: ind.bg }}>
                  {getIndustryIcon(ind.title, ind.color)}
                </div>
                <h4>{ind.title}</h4>
                <p>{ind.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 11. ECOSYSTEM ── */}
      <section className="ga-section ga-section-white">
        <div className="ga-wrap">
          <div className="ga-title-center">
            <div className="ga-eyebrow">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
              Tech Stack
            </div>
            <h2>The Google Ecosystem — Fully Integrated</h2>
            <p>We connect every tool in the Google marketing stack to create a seamless, data-driven advertising engine.</p>
          </div>
          <div className="ga-ecosystem-grid">
            {ecosystem.map(e => (
              <div key={e.name} className="ga-eco-card">
                <div className="ga-eco-logo" style={{ background: e.bg }}>{e.logo}</div>
                <div className="ga-eco-name">{e.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 12.5: PRICING */}
      <PricingTable 
        title="Google Ads Management Packages"
        subtitle="Reach high-intent customers and maximize your advertising ROI with professionally managed Google Ads campaigns."
        serviceName="Google Ads"
        serviceId="google-ads"
        packages={[
          { id: "basic", name: "Basic", price: "₹7,000", period: "/month" },
          { id: "growth", name: "Growth", price: "₹12,000", period: "/month", popular: true },
          { id: "premium", name: "Premium", price: "₹20,000+", period: "/month" }
        ]}
      />

      {/* ── 13. FAQ ── */}
      <section className="seo-section">
        <div className="ga-wrap">
          <div className="ga-title-center">
            <div className="ga-eyebrow">
              💡 HELP DESK
            </div>
            <h2>Frequently Asked Questions</h2>
            <p>Everything you need to know before trusting us with your Google Ads budget.</p>
          </div>
          <div className="seo-faq-accordion" style={{ maxWidth: "800px", margin: "0 auto" }}>
            {faqs.map((faq, i) => (
              <div key={i} className={`seo-faq-item ${openFaq === i ? "open" : ""}`}>
                <button 
                  className="seo-faq-question-btn" 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  <span>{faq.q}</span>
                  <svg className="chevron-icon" width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <div className="seo-faq-answer">
                  <p>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 14. FINAL CTA ── */}
      <div className="ga-cta-section">
        <div className="ga-cta-card">
          <div className="ga-cta-glow-1" />
          <div className="ga-cta-glow-2" />

          

          <div className="ga-cta-content">
            <div className="ga-cta-badge">
              <IconStar size={12} color="#FBBC05" /> Ready to Grow?
            </div>
            <h2>Get a Free Google Ads Audit — No Commitment</h2>
            <p>Our experts will analyse your current account, identify wasted spend and map out an actionable growth roadmap — completely free, no strings attached.</p>
            <div className="ga-cta-btns">
              <Link href="/contact" className="btn-primary" style={{ padding: "14px 28px", fontSize: "15px", fontWeight: 700, borderRadius: "10px", display: "inline-flex", alignItems: "center", gap: "8px" }}>
                📅 Book Consultation
              </Link>
              <Link href="/contact" className="btn-outline-orange" style={{ padding: "14px 28px", fontSize: "15px", fontWeight: 700, borderRadius: "10px", display: "inline-flex", alignItems: "center", gap: "8px" }}>
                ✉️ Contact Email Us
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}

