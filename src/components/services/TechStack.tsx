import React from 'react';

export default function TechStack({ data }: { data?: any }) {
  if (!data || data.length === 0) return null;

  // Handle both string[] (old schema) and TechCategory[] (new detailed schema)
  const isCategorized = typeof data[0] === 'object' && data[0] !== null;

  return (
    <section className="py-24 bg-white relative border-t border-slate-100">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">Enterprise Technology Stack</h2>
          <p className="text-lg text-slate-600">Built with modern, scalable, and secure technologies trusted by industry leaders globally.</p>
        </div>

        {isCategorized ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {data.map((category: any, idx: number) => (
              <div key={idx} className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                  {category.category}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {category.technologies.map((tech: any, tIdx: number) => (
                    <div key={tIdx} className="flex flex-col items-center justify-center p-4 bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                      {/* Using a placeholder for icons based on the prompt name */}
                      <div className="w-10 h-10 mb-3 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 font-bold text-xs uppercase tracking-tighter">
                        {tech.name.substring(0, 2)}
                      </div>
                      <span className="text-xs font-semibold text-slate-700 text-center">{tech.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-4">
            {data.map((tech: string, idx: number) => (
              <div key={idx} className="px-6 py-3 bg-slate-50 border border-slate-200 rounded-full text-slate-700 font-medium">
                {tech}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
