"use client";

import React, { useEffect, useState, useRef } from 'react';
import { BusinessStatistic } from '../../types/service';

function AnimatedCounter({ value }: { value: string }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.5 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    return () => observer.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;

    const numericPart = parseInt(value.replace(/[^0-9]/g, ""), 10) || 0;
    if (numericPart === 0) {
      setCount(value as any);
      return;
    }

    let startTimestamp: number | null = null;
    const duration = 2000;
    
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Easing function for smoother animation (easeOutQuart)
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeProgress * numericPart));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [hasAnimated, value]);

  const suffix = value.replace(/[0-9]/g, "");
  
  return (
    <span ref={elementRef}>
      {count}{suffix}
    </span>
  );
}

export default function BusinessStatistics({ data }: { data?: BusinessStatistic[] }) {
  if (!data || data.length === 0) return null;
  
  return (
    <section className="py-20 bg-gradient-to-b from-white to-slate-50 border-b border-slate-100 relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">Impact at Scale</h2>
          <p className="text-lg text-slate-600">Delivering measurable business outcomes through high-performance digital commerce infrastructure.</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-10">
          {data.map((stat, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100 hover:shadow-md hover:border-blue-100 transition-all duration-300 group">
              <div className="text-4xl md:text-5xl font-black text-blue-600 mb-3 tracking-tighter group-hover:scale-105 transition-transform origin-left">
                <AnimatedCounter value={stat.value} />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">{stat.label}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
