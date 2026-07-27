import React from 'react';
import Link from 'next/link';
import { ArrowRight, Phone } from 'lucide-react';

export default function CallToAction({ data }: { data: any }) {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-slate-900 z-0"></div>
      
      {/* Decorative premium enterprise background */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600 rounded-full blur-[120px]"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600 rounded-full blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-5xl text-center">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
          Ready to Build the Future of Your Online Business?
        </h2>
        
        <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
          Partner with OCTADECENT to launch, scale, and transform your e-commerce platform with enterprise-grade architecture and world-class digital innovation.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link 
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-bold rounded-xl text-blue-700 bg-white hover:bg-blue-50 transition-all shadow-xl hover:scale-105 duration-300"
          >
            Book Free Consultation
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
          <Link 
            href="/contact?proposal=true"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-bold rounded-xl text-white bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-sm transition-all"
          >
            Request a Proposal
          </Link>
          <a 
            href="tel:+1234567890"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-bold rounded-xl text-white hover:text-blue-200 transition-colors"
          >
            <Phone className="mr-2 w-5 h-5" />
            Talk to an Expert
          </a>
        </div>
        
        <div className="mt-16 pt-10 border-t border-white/10 flex flex-wrap justify-center gap-8 opacity-70">
          <span className="flex items-center gap-2 text-white font-medium"><div className="w-2 h-2 rounded-full bg-green-400"></div> ISO 27001 Certified</span>
          <span className="flex items-center gap-2 text-white font-medium"><div className="w-2 h-2 rounded-full bg-green-400"></div> PCI-DSS Compliant</span>
          <span className="flex items-center gap-2 text-white font-medium"><div className="w-2 h-2 rounded-full bg-green-400"></div> Enterprise Grade SLA</span>
        </div>
      </div>
    </section>
  );
}
