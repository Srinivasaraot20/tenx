import React from 'react';
import { HeroSectionData } from '../../types/service';
import Link from 'next/link';
import { ArrowRight, ShoppingCart, BarChart3, ShieldCheck } from 'lucide-react';

interface Props {
  data: HeroSectionData;
}

export default function HeroSection({ data }: Props) {
  return (
    <section className="relative w-full bg-white text-slate-900 overflow-hidden py-24 lg:py-32 border-b border-slate-100">
      {/* Premium subtle background decoration */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-50 via-white to-white opacity-80"></div>
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-[100px]"></div>
        <div className="absolute top-40 -left-20 w-[500px] h-[500px] bg-purple-100/30 rounded-full blur-[80px]"></div>
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEgMWgydjJIMUMxeiIgZmlsbD0iI2YxZjViOSIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+')] opacity-50"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 md:px-6 flex flex-col items-center text-center max-w-5xl">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-semibold mb-8 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
          Enterprise Grade Commerce
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-8 text-slate-900">
          {data.headline.split(',').map((part, i) => (
            <React.Fragment key={i}>
              {part}{i !== data.headline.split(',').length - 1 && ','}
              {i === 0 && <br className="hidden md:block" />}
            </React.Fragment>
          ))}
        </h1>
        
        <p className="text-lg md:text-xl text-slate-600 mb-12 max-w-3xl leading-relaxed">
          {data.supportingText}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link 
            href={data.primaryCta.link}
            className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-600/30"
          >
            {data.primaryCta.label}
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
          <Link 
            href={data.secondaryCta.link}
            className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-xl text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"
          >
            {data.secondaryCta.label}
          </Link>
        </div>
        
        {/* Floating UI Elements matching prompt */}
        <div className="relative w-full h-[120px] mt-16 max-w-4xl hidden md:block">
           <div className="absolute top-0 left-0 bg-white p-4 rounded-xl shadow-xl border border-slate-100 flex items-center gap-3 animate-[float_4s_ease-in-out_infinite]">
             <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600"><ShoppingCart size={20} /></div>
             <div className="text-left">
               <div className="text-sm font-semibold text-slate-900">New Order</div>
               <div className="text-xs text-slate-500">Just now • $1,249.00</div>
             </div>
           </div>

           <div className="absolute top-10 right-10 bg-white p-4 rounded-xl shadow-xl border border-slate-100 flex items-center gap-3 animate-[float_5s_ease-in-out_infinite_reverse]">
             <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600"><BarChart3 size={20} /></div>
             <div className="text-left">
               <div className="text-sm font-semibold text-slate-900">+45% Sales</div>
               <div className="text-xs text-slate-500">Compared to last week</div>
             </div>
           </div>

           <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-white p-3 px-5 rounded-full shadow-lg border border-slate-100 flex items-center gap-2 animate-[float_6s_ease-in-out_infinite]">
             <ShieldCheck size={18} className="text-emerald-500" />
             <span className="text-sm font-medium text-slate-700">Payment Processed Successfully</span>
           </div>
        </div>

        <div className="mt-16 md:mt-8 pt-8 border-t border-slate-100 w-full flex flex-col items-center">
          <p className="text-sm text-slate-400 font-medium uppercase tracking-widest mb-6">Trusted by Enterprise Leaders</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Trust badges placeholder */}
            <div className="flex items-center gap-2 text-xl font-black text-slate-800 tracking-tighter">OCTA<span className="text-blue-600">CLOUD</span></div>
            <div className="flex items-center gap-2 text-xl font-bold text-slate-800">Global<span className="font-light">Commerce</span></div>
            <div className="flex items-center gap-2 text-xl font-serif italic text-slate-800">LuxeRetail</div>
            <div className="flex items-center gap-2 text-xl font-bold text-slate-800 tracking-widest">AERODYN</div>
          </div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
      `}} />
    </section>
  );
}
