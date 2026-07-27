const fs = require('fs');
const path = require('path');

const componentsDir = path.join('c:', 'Users', 'ASUS', 'Downloads', 'ten', 'src', 'components', 'services');

if (!fs.existsSync(componentsDir)) {
  fs.mkdirSync(componentsDir, { recursive: true });
}

const components = [
  'TrustedBy', 'ServiceOverview', 'ProblemsWeSolve', 'OurServicesGrid', 
  'IndustriesWeServe', 'ProcessTimeline', 'WhyChooseUs', 'TechStack', 
  'FeaturesGrid', 'CaseStudies', 'PortfolioShowcase', 'TestimonialsSlider', 
  'PricingTable', 'FAQAccordion', 'RelatedServices', 'CallToAction', 
  'ContactForm', 'BusinessOutcomes', 'CapabilitiesMatrix', 'EngagementModels', 
  'SecurityCompliance', 'GlobalDeliveryModel'
];

components.forEach(comp => {
  const filePath = path.join(componentsDir, comp + '.tsx');
  if (!fs.existsSync(filePath)) {
    const template = `import React from 'react';

export default function ${comp}({ data }: { data: any }) {
  if (!data) return null;
  return (
    <section className="py-16 bg-white text-slate-900 border-b border-slate-100">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-bold mb-8 text-center text-slate-800">${comp.replace(/([A-Z])/g, ' $1').trim()}</h2>
        <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
          <p className="text-slate-500 text-center mb-4">Content for ${comp} will be rendered here.</p>
          <pre className="mt-4 p-4 bg-slate-900 text-slate-300 rounded overflow-x-auto text-sm">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      </div>
    </section>
  );
}
`;
    fs.writeFileSync(filePath, template);
    console.log('Created ' + comp + '.tsx');
  }
});
