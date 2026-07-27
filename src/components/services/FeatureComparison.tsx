import React from 'react';
import { Check, X } from 'lucide-react';

interface Metric {
  name: string;
  traditional: string;
  modern: string;
}

interface FeatureComparisonData {
  title: string;
  metrics: Metric[];
}

export default function FeatureComparison({ data }: { data?: FeatureComparisonData }) {
  if (!data || !data.metrics) return null;

  return (
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">{data.title}</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">See why enterprise brands are migrating to modern headless commerce architectures to maintain their competitive edge.</p>
        </div>

        <div className="overflow-hidden rounded-3xl border border-slate-200 shadow-sm bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] text-left border-collapse">
              <thead>
                <tr>
                  <th className="py-6 px-8 bg-slate-50 border-b border-slate-200 w-1/3">
                    <span className="text-sm uppercase tracking-wider font-semibold text-slate-500">Capability</span>
                  </th>
                  <th className="py-6 px-8 bg-slate-50 border-b border-r border-slate-200 border-l w-1/3">
                    <span className="text-lg font-bold text-slate-700">Traditional Commerce</span>
                    <p className="text-sm text-slate-500 font-normal mt-1">Legacy monolithic platforms</p>
                  </th>
                  <th className="py-6 px-8 bg-blue-50 border-b border-blue-100 w-1/3 relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-blue-600"></div>
                    <span className="text-lg font-bold text-blue-900 flex items-center gap-2">
                      Modern Commerce
                      <span className="bg-blue-600 text-white text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full font-bold">Recommended</span>
                    </span>
                    <p className="text-sm text-blue-700/80 font-normal mt-1">OCTADECENT Architecture</p>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.metrics.map((metric, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="py-5 px-8 font-medium text-slate-900">{metric.name}</td>
                    <td className="py-5 px-8 text-slate-600 border-l border-r border-slate-100 flex items-start gap-3">
                      <X className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                      <span>{metric.traditional}</span>
                    </td>
                    <td className="py-5 px-8 text-blue-900 bg-blue-50/30 font-medium flex items-start gap-3">
                      <Check className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                      <span>{metric.modern}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
