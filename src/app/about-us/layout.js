export const metadata = {
  keywords: [
  "Digital Marketing Company",
  "Marketing Experts",
  "Digital Marketing Team",
  "Online Marketing Agency",
  "Growth Marketing Company",
  "Trusted Digital Marketing Company",
  "Experienced Digital Marketing Team",
  "Digital Marketing Professionals",
  "Customer Focused Marketing Agency",
  "Business Growth Experts",
  "Performance Driven Marketing Company",
  "Full Service Digital Marketing Agency",

  "Meet Our Digital Marketing Experts",
  "Trusted Digital Marketing Company in India",
  "Experienced SEO and Marketing Professionals",
  "Our Mission in Digital Marketing",
  "Why Choose Our Digital Marketing Agency",
  "Customer Focused Marketing Solutions",
  "Helping Businesses Grow Online",
  "Performance Driven Digital Marketing Team",
  "Expert Team for Online Business Growth",
  "Professional Internet Marketing Company",
  "Innovative Digital Marketing Solutions",
  "Your Trusted Digital Growth Partner",
  "Marketing Experts with Proven Results",

  "Who Is the Best Digital Marketing Company",
  "Experienced Digital Marketing Professionals",
  "Trusted Online Marketing Experts",
  "Why Choose a Digital Marketing Agency",
  "Digital Marketing Team with Industry Experience",
  "Company Specializing in Digital Marketing Services",
  "Professional Digital Marketing Consultants",
  "Digital Marketing Agency with Expert Team",
  "Marketing Experts for Business Growth",
  "Trusted Digital Marketing Partner",
  "Reliable Digital Marketing Company",
  "Award-Winning Digital Marketing Professionals",
  "Experienced SEO and Marketing Specialists",
  "Business Growth Experts in Digital Marketing",
  "Digital Strategy Experts for Businesses",
  "Online Marketing Consultants Near Me",
  "Digital Branding Experts",
  "Results-Driven Marketing Professionals",
  "Digital Marketing Company Profile",
  "Learn About Our Digital Marketing Agency",

  "About Our Digital Marketing Company",
  "About Our Marketing Team",
  "About Digital Marketing Experts",
  "Leading Digital Marketing Agency",
  "Top Digital Marketing Company in India",
  "Best Online Marketing Company",
  "Professional Marketing Agency",
  "SEO and Digital Marketing Experts",
  "Business Growth Through Digital Marketing",
  "Digital Growth Partner",
  "Internet Marketing Professionals",
  "Digital Business Growth Experts",
  "Digital Marketing Solutions Provider",
  "Business Focused Marketing Agency",
  "Digital Marketing Company for Businesses",
  "Marketing Consultants for Businesses",
  "Digital Marketing Specialists",
  "Digital Strategy and Branding Experts",
  "Trusted Business Marketing Experts",
  "Experienced Online Marketing Team",
  "Digital Marketing Agency with Proven Results",
  "Results Focused Digital Marketing Company",
  "Business Marketing Solutions",
  "Digital Marketing Leadership Team",
  "Marketing Innovation Experts",
  "Customer Success Driven Marketing Agency",
  "Digital Marketing Excellence",
  "Strategic Digital Marketing Company",
  "Professional SEO Consultants",
  "Digital Transformation Marketing Experts"
],

  title: "Top Digital Marketing Companies in Hyderabad | Digital TenX",
  description: "Digital Marketing TenX is a top digital marketing company in Hyderabad offering SEO, Google Ads, social media marketing, web development. Get started today!",
  alternates: {
    canonical: "https://digitalmarketingtenx.com/about-us",
  },
  openGraph: {
    title: "Top Digital Marketing Companies in Hyderabad | Digital TenX",
    description: "Digital Marketing TenX is a top digital marketing company in Hyderabad offering SEO, Google Ads, social media marketing, web development. Get started today!",
    url: "https://digitalmarketingtenx.com/about-us",
    type: "website",
    images: [
      {
        url: "https://digitalmarketingtenx.com/og-image.webp",
        width: 1200,
        height: 630,
        alt: "About Digital Marketing TenX",
      },
    ],
  },
};

export default function AboutLayout({ children }) {
  const aboutPageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "mainEntity": {
      "@type": "Organization",
      "name": "Digital Marketing TenX",
      "url": "https://digitalmarketingtenx.com",
      "logo": "https://digitalmarketingtenx.com/logo.webp",
      "description": "AI-Powered Full-Service Digital Marketing Agency & SEO Experts based in Hyderabad, Telangana.",
      "telephone": "+91-93922-51739",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Level 4, Gumidelli Towers, Begumpet",
        "addressLocality": "Hyderabad",
        "addressRegion": "Telangana",
        "postalCode": "500016",
        "addressCountry": "IN"
      },
      "knowsAbout": [
        "Search Engine Optimization (SEO)",
        "Google Ads",
        "Meta Ads",
        "Social Media Marketing",
        "Website Development",
        "Next.js",
        "React",
        "AI Automation",
        "WhatsApp Business API",
        "Performance Marketing",
        "Conversion Rate Optimization"
      ],
      "certification": [
        "Google Ads Certified Professionals",
        "Certified SEO Experts"
      ]
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://digitalmarketingtenx.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "About Us",
        "item": "https://digitalmarketingtenx.com/about-us"
      }
    ]
  };

  const faqDataSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is Digital Marketing TenX, and what makes you different?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Digital Marketing TenX is a premium, technology-driven agency. We combine performance marketing, SEO, AI automation, and high-performance development to help brands achieve 10X growth. Unlike traditional agencies, we take a data-first, ROI-focused approach and utilize advanced AI tools to automate workflows and optimize results."
        }
      },
      {
        "@type": "Question",
        "name": "Do you only work with large enterprises?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No, we partner with startups, local businesses, healthcare brands, educational institutions, and mid-market enterprises. Our growth frameworks are scalable and tailored specifically to your business size, budget, and growth stage."
        }
      },
      {
        "@type": "Question",
        "name": "How does AI automation fit into digital marketing?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We use AI automation to optimize ad targeting, generate data-driven content at scale, automate lead nurturing on platforms like WhatsApp and email, and streamline workflow processes. This decreases client customer acquisition costs and increases conversion rates."
        }
      },
      {
        "@type": "Question",
        "name": "What digital marketing channels do you specialize in?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We specialize in Search Engine Optimization (SEO), Google PPC Ads, Meta (Facebook & Instagram) Ads, TikTok Advertising, Social Media Management, WhatsApp Marketing Automation, and custom High-Conversion Web Development."
        }
      },
      {
        "@type": "Question",
        "name": "How do you measure campaign success?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We focus on bottom-line business metrics: leads generated, sales conversions, customer acquisition cost (CAC), return on ad spend (ROAS), and net lifetime value. We provide transparent live dashboards so you can see your growth in real time."
        }
      }
    ]
  };

  return (
    <>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqDataSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      </head>
      {children}
    </>
  );
}
