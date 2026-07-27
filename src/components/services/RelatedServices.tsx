import React from 'react';

export default function RelatedServices({ data }: { data: any }) {
  if (!data) return null;
  return (
    <section className="py-16 bg-white text-slate-900 border-b border-slate-100">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-bold mb-8 text-center text-slate-800">Related Services</h2>
        <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
          <p className="text-slate-500 text-center mb-4">Content for RelatedServices will be rendered here.</p>
          <pre className="mt-4 p-4 bg-slate-900 text-slate-300 rounded overflow-x-auto text-sm">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      </div>
    </section>
  );
}
