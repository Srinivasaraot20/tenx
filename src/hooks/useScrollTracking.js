"use client";

import { useEffect, useRef } from "react";
import * as gtag from "@/lib/gtag";

export default function useScrollTracking(pageName = "Unknown Page") {
  const tracked = useRef(new Set());

  useEffect(() => {
    // Reset tracked set when page changes if this is reused
    tracked.current.clear();
    
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Calculate scroll percentage
          const scrollTop = window.scrollY || document.documentElement.scrollTop;
          const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
          
          // Prevent division by zero on very short pages
          if (scrollHeight > 0) {
            const scrollPercent = (scrollTop / scrollHeight) * 100;

            const trackScroll = (percent, eventName) => {
              if (scrollPercent >= percent && !tracked.current.has(percent)) {
                tracked.current.add(percent);
                gtag.event(eventName, {
                  page_name: pageName
                });
              }
            };

            trackScroll(25, "scroll_25");
            trackScroll(50, "scroll_50");
            trackScroll(75, "scroll_75");
            trackScroll(100, "scroll_100");
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Check immediately on load in case the page is short
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pageName]);

  return null;
}

