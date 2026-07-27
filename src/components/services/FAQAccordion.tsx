"use client";

import React, { useState } from 'react';
import { FAQ } from '../../types/service';
import { ChevronDown } from 'lucide-react';

export default function FAQAccordion({ data }: { data?: FAQ[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!data || data.length === 0) return null;

  return (
    <section className="py-24 bg-slate-50 relative">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <div className="text-center mb-16">
          <span className="text-blue-600 font-semibold tracking-wider uppercase text-sm mb-3 block">Got Questions?</span>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">Frequently Asked Questions</h2>
          <p className="text-lg text-slate-600">Everything you need to know about our enterprise e-commerce solutions, timelines, and infrastructure.</p>
        </div>

        <div className="space-y-4">
          {data.map((faq, idx) => (
            <div 
              key={idx} 
              className={`bg-white border rounded-2xl overflow-hidden transition-all duration-300 ${openIndex === idx ? 'border-blue-200 shadow-md ring-1 ring-blue-50' : 'border-slate-200 hover:border-slate-300 shadow-sm'}`}
            >
              <button
                className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none group"
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              >
                <span className={`text-lg font-semibold pr-8 ${openIndex === idx ? 'text-blue-700' : 'text-slate-800 group-hover:text-blue-600 transition-colors'}`}>
                  {faq.question}
                </span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${openIndex === idx ? 'bg-blue-100 text-blue-600 rotate-180' : 'bg-slate-50 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-500'}`}>
                  <ChevronDown size={20} />
                </div>
              </button>
              
              <div 
                className={`transition-all duration-300 ease-in-out ${openIndex === idx ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="px-6 pb-6 pt-0 text-slate-600 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
