const fs = require('fs');
let content = fs.readFileSync('src/app/services/e-commerce-marketing/ECommerceMarketingClient.js', 'utf8');

const replacements = [
  {
    from: "<h2>Why E-Commerce Marketing Matters</h2>",
    to: "<h2>Why Your Business Needs E-Commerce Marketing</h2>"
  },
  {
    from: "Without a strategic approach to e-commerce marketing, your store will struggle to stand out in a saturated market. We help you build a reliable revenue engine that scales profitably.",
    to: "Grow your online store with data-driven e-commerce marketing strategies that attract high-intent shoppers, increase conversions, improve customer retention, and maximize revenue."
  },
  {
    from: "<h2>Comprehensive E-Commerce Services</h2>",
    to: "<h2>Our E-Commerce Marketing Services</h2>"
  },
  {
    from: "Our certified specialists deploy full-funnel marketing strategies to drive traffic, convert window-shoppers, and maximize lifetime value (LTV) for your e-commerce brand.",
    to: "We provide end-to-end e-commerce marketing services to help online stores increase traffic, improve conversions, maximize revenue, and retain customers across every stage of the buying journey."
  },
  {
    from: "<h2>Our E-Commerce Growth Process</h2>",
    to: "<h2>Our E-Commerce Marketing Process</h2>"
  },
  {
    from: "We don’t just throw budget at ads. We deploy a systematic, tested e-commerce growth framework that scales your store profitably.",
    to: "Our proven e-commerce marketing process helps increase traffic, improve conversions, optimize ad performance, and maximize revenue for your online store."
  },
  {
    from: "Whether you use Shopify or a custom node/react backend, we integrate directly and optimize for maximum search and ad sales.",
    to: "We optimize leading e-commerce platforms including Shopify, WooCommerce, Magento, BigCommerce, OpenCart, Wix, Squarespace, and custom-built online stores."
  },
  {
    from: "<span className=\"ecom-eyebrow\">📢 Omnichannel Mastery</span>",
    to: "<span className=\"ecom-eyebrow\">📢 OUR MARKETING CHANNELS</span>"
  },
  {
    from: "<h2>Marketing Channels That Drive ROAS</h2>",
    to: "<h2>Multi-Channel E-Commerce Marketing Solutions</h2>"
  },
  {
    from: "We don't rely on a single source of traffic. We build a cohesive omnichannel strategy that meets your customers wherever they browse, search, and socialize.",
    to: "Reach customers across Google Shopping, Meta Ads, Performance Max, Email, SMS, and social commerce channels with integrated campaigns designed to maximize sales and revenue."
  },
  {
    from: "<span className=\"ecom-eyebrow\">📈 Proven Impact</span>",
    to: "<span className=\"ecom-eyebrow\">📈 BUSINESS RESULTS</span>"
  },
  {
    from: "<h2>Real Business Outcomes</h2>",
    to: "<h2>Business Growth Outcomes You Can Expect</h2>"
  },
  {
    from: "When you partner with Digital Marketing TenX, you aren't just buying clicks—you're investing in measurable, scalable business growth.",
    to: "Our data-driven e-commerce marketing strategies help increase sales, improve ROAS, reduce acquisition costs, and maximize long-term customer value."
  },
  {
    from: "<h2>Why Choose TenX For Your E-Commerce Store?</h2>",
    to: "<h2>Why Choose Digital Marketing TenX for E-Commerce Growth</h2>"
  },
  {
    from: "We act as an extension of your business, bringing technical expertise, creative firepower, and a relentless focus on bottom-line revenue.",
    to: "We combine performance marketing, conversion optimization, AI-powered automation, and data-driven strategies to help e-commerce businesses increase sales, improve ROAS, and achieve sustainable growth."
  },
  {
    from: "<h2>Ready to Dominate Your Niche?</h2>",
    to: "<h2>Ready to Grow Your Online Store with Expert E-Commerce Marketing?</h2>"
  },
  {
    from: "Stop losing sales to your competitors. Let our e-commerce marketing experts build a scalable growth engine for your brand.",
    to: "Grow your online store with data-driven E-Commerce Marketing Services in Hyderabad. Book a free consultation with our experts and discover strategies to increase traffic, conversions, and revenue."
  }
];

replacements.forEach(r => {
  if(content.includes(r.from)) {
    content = content.replace(r.from, r.to);
  } else {
    console.log("Could not find:", r.from);
  }
});

// For whyChooseUs array
const newWhyChooseUs = `  const whyChooseUs = [
    { title: "Certified E-Commerce Experts", desc: "Our certified specialists manage Google Shopping, Meta Ads, Performance Max, and e-commerce campaigns using proven growth strategies." },
    { title: "Data-Driven Strategy", desc: "Every campaign is optimized using real-time analytics, customer behavior, and conversion data to maximize performance." },
    { title: "AI-Powered Automation", desc: "Automate customer journeys, email marketing, remarketing, and campaign optimization with AI-powered tools." },
    { title: "Continuous Campaign Optimization", desc: "We continuously optimize ads, audiences, bidding strategies, and creatives to improve ROI and reduce acquisition costs." },
    { title: "Transparent Performance Reporting", desc: "Receive detailed monthly reports covering sales, ROAS, conversions, revenue, and campaign performance." },
    { title: "Dedicated Account Manager", desc: "Work with a dedicated e-commerce marketing expert who provides regular updates, strategic guidance, and ongoing support." },
    { title: "Conversion-Focused Strategy", desc: "Every campaign is built to increase conversions, improve customer acquisition, and maximize customer lifetime value—not just clicks." },
    { title: "Scalable E-Commerce Growth", desc: "Our growth strategies scale with your business, helping you expand revenue across multiple marketing channels." }
  ];`;

content = content.replace(/const whyChooseUs = \[[\s\S]*?\];/m, newWhyChooseUs);

// For services array, remove the last card (WhatsApp & SMS Recovery)
content = content.replace(/,\s*{\s*title:\s*"WhatsApp & SMS Recovery"[\s\S]*?}/m, "");

fs.writeFileSync('src/app/services/e-commerce-marketing/ECommerceMarketingClient.js', content);
console.log("Done");
