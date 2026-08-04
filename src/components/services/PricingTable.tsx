"use client";
import React from 'react';
import { useRouter } from 'next/navigation';

export interface PricingPackage {
  id?: string;
  name: string;
  price: string;
  period?: string;
  popular?: boolean;
  features?: string[];
}

interface PricingTableProps {
  title: string;
  subtitle: string;
  packages: PricingPackage[];
  serviceName: string;
  serviceId?: string;
}

export default function PricingTable({ title, subtitle, packages, serviceName, serviceId }: PricingTableProps) {
  const router = useRouter();

  if (!packages || packages.length === 0) return null;

  const handleGetStarted = (pkg: PricingPackage) => {
    if (serviceId && pkg.id) {
      router.push(`/contact?service=${serviceId}&package=${pkg.id}`);
    } else {
      const periodString = pkg.period ? pkg.period : "";
      const message = `Hi, I would like to book a consultation for ${serviceName} - ${pkg.name} Package (${pkg.price}${periodString}).`;
      
      // Trigger existing consultation modal as fallback
      window.dispatchEvent(
        new CustomEvent("trigger-consultation-modal", { 
          detail: { service: serviceName, message: message } 
        })
      );
    }
  };

  return (
    <section className="py-20 bg-slate-50 border-t border-b border-slate-100">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <div className="text-center mb-16 reveal-element">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">{title}</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => {
            const isPopular = pkg.popular;
            
            return (
              <div 
                key={index}
                className={`relative flex flex-col p-8 rounded-2xl bg-white transition-all duration-300 hover:shadow-xl reveal-element ${
                  isPopular 
                    ? 'border-2 border-blue-600 shadow-lg md:-translate-y-2' 
                    : 'border border-slate-200 shadow-sm'
                }`}
              >
                {isPopular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold uppercase tracking-wide">
                    Most Popular
                  </div>
                )}
                
                <div className="text-center mb-8 mt-2">
                  <h3 className="text-xl font-semibold text-slate-800 mb-4">{pkg.name}</h3>
                  <div className="flex items-end justify-center gap-1">
                    <span className="text-4xl font-bold text-slate-900">{pkg.price}</span>
                    {pkg.period && (
                      <span className="text-slate-500 font-medium mb-1">{pkg.period}</span>
                    )}
                  </div>
                </div>

                {pkg.features && pkg.features.length > 0 && (
                  <ul className="mb-8 space-y-4 flex-grow">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span className="text-slate-600 text-sm leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {!pkg.features && <div className="flex-grow"></div>}

                <button
                  onClick={() => handleGetStarted(pkg)}
                  className={`w-full py-4 rounded-xl font-semibold text-base transition-colors ${
                    isPopular
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                  }`}
                >
                  Get Started
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
