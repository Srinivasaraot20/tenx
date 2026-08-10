export async function GET() {
  const content = `# Digital Marketing TenX

> Accelerate your business with Digital Marketing TenX in Hyderabad. Premium SEO services, Google Ads PPC management, social media marketing, and custom web development.

Digital Marketing TenX is a leading digital marketing agency focused on delivering ROI-driven solutions for businesses and startups. We offer end-to-end digital marketing solutions to help brands grow their online presence.

## Overview

- [Home](https://digitalmarketingtenx.com/): The central hub for Digital Marketing TenX, offering an overview of our ROI-driven digital marketing solutions in Hyderabad.
- [About](https://digitalmarketingtenx.com/about): Information on our agency's mission, our team of marketing experts, and our core values for driving business growth.

## Services

- [Google Ads](https://digitalmarketingtenx.com/services/google-ads): Expert PPC management and Google Ads services designed to maximize return on ad spend (ROAS) and drive immediate leads.
- [E-Commerce Marketing](https://digitalmarketingtenx.com/services/e-commerce-marketing): Specialized marketing strategies for e-commerce brands to increase sales, reduce cart abandonment, and scale revenue.
- [WhatsApp Automation](https://digitalmarketingtenx.com/services/whatsapp-automation): Implement automated WhatsApp marketing workflows for enhanced customer engagement, support, and lead nurturing.

## Blog & Insights

- [Blog Home](https://digitalmarketingtenx.com/blog): A comprehensive resource library featuring our latest articles on digital marketing strategies and industry insights.
- [Performance Max (Tag)](https://digitalmarketingtenx.com/blog?tag=Performance%20Max): Articles focused on Google's Performance Max campaigns and automated bidding strategies.
- [Conversion Rate Optimization Guide](https://digitalmarketingtenx.com/blog/conversion-rate-optimization-guide): A comprehensive guide on turning website visitors into paying customers through UX and A/B testing (CRO).
- [How to Improve Website SEO](https://digitalmarketingtenx.com/blog/how-to-improve-website-seo): Actionable strategies for on-page, off-page, and technical Search Engine Optimization to increase organic visibility.
- [Ecommerce Marketing Tips 2026](https://digitalmarketingtenx.com/blog/ecommerce-marketing-tips-2026): Advanced trends and tactics tailored specifically for e-commerce growth in 2026.
- [Website Performance Optimization (Core Web Vitals)](https://digitalmarketingtenx.com/blog/website-performance-optimization-core-web-vitals): Technical guide on optimizing page speed and Google Core Web Vitals for better search rankings.
- [Lead Generation Strategies 2026](https://digitalmarketingtenx.com/blog/lead-generation-strategies-2026): Innovative approaches to capture and nurture high-quality B2B and B2C leads.
- [Digital Marketing Trends 2026](https://digitalmarketingtenx.com/blog/digital-marketing-trends-2026): A forward-looking analysis of the marketing landscape, including AI, voice search, and automation.
- [Brand Positioning Guide](https://digitalmarketingtenx.com/blog/brand-positioning-guide): Strategic advice on differentiating your brand and establishing market authority.
- [AI in Digital Marketing 2026 Playbook](https://digitalmarketingtenx.com/blog/ai-in-digital-marketing-2026-playbook): How to leverage Artificial Intelligence for content creation, analytics, and personalization.
- [Google Ads vs Facebook Ads](https://digitalmarketingtenx.com/blog/google-ads-vs-facebook-ads): A detailed comparison to help businesses choose the right advertising platform for their goals.
- [How to Scale Your Business with Digital Marketing](https://digitalmarketingtenx.com/blog/how-to-scale-your-business-with-digital-marketing): A strategic roadmap for utilizing digital channels to sustainably scale business operations.
- [Small Business Marketing Guide](https://digitalmarketingtenx.com/blog/small-business-marketing-guide): Cost-effective marketing tactics and growth hacks tailored for small and local businesses.
- [Local SEO Guide Hyderabad](https://digitalmarketingtenx.com/blog/local-seo-guide-hyderabad): Specific tactics for dominating local search results and Google Business Profiles in the Hyderabad market.
- [What is Digital Marketing](https://digitalmarketingtenx.com/blog/what-is-digital-marketing): A foundational overview of digital marketing channels, methodologies, and terminology.

## Legal

- [Privacy Policy](https://digitalmarketingtenx.com/privacy-policy): Details on how Digital Marketing TenX collects, uses, and protects user data.
- [Terms and Conditions](https://digitalmarketingtenx.com/terms-and-conditions): The legal agreements and terms governing the use of our digital marketing services and website.
- [LLMs.txt](https://digitalmarketingtenx.com/llms.txt): This file; providing AI models with a structured, machine-readable map of our core knowledge base.
`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}

