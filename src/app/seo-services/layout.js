export const metadata = {
  keywords: [
    "SEO Services",
    "SEO Company",
    "Search Engine Optimization",
    "Organic SEO",
    "Technical SEO",
    "Best SEO Services in India",
    "Affordable SEO Services",
    "Local SEO Services",
    "Technical SEO Services",
    "On Page SEO Services",
    "Off Page SEO Services",
    "SEO Agency for Small Business",
    "Website SEO Optimization",
    "SEO for Business Growth",
    "Professional SEO Company",

    "SEO Services",
    "Best SEO Services for Small Businesses",
    "Affordable SEO Company in India",
    "Complete Website SEO Optimization",
    "On Page and Off Page SEO Services",
    "Technical SEO Audit Services",
    "Local SEO Services for Business Growth",
    "SEO Services That Increase Organic Traffic",
    "SEO Experts for Business Websites",
    "Professional Search Engine Optimization Services",
    "SEO Company for Lead Generation",
    "Monthly SEO Packages for Businesses",
    "Website Ranking Improvement Services",
    "SEO Solutions for E-commerce Websites",
    "Google Search Ranking Optimization",
    "White Hat SEO Services"
],

  title: "SEO Services & Search Engine Optimization Company | Digital Marketing TenX",
  description: "Rank higher on Google, increase organic visibility, and drive long-term business growth with white-hat SEO services from Digital Marketing TenX. Request your free SEO audit today.",
  alternates: {
    canonical: "https://digitalmarketingtenx.com/seo-services",
  },
  openGraph: {
    title: "SEO Services & Search Engine Optimization Company | Digital Marketing TenX",
    description: "Rank higher on Google, increase organic visibility, and drive long-term business growth with white-hat SEO services from Digital Marketing TenX. Request your free SEO audit today.",
    url: "https://digitalmarketingtenx.com/seo-services",
    type: "website",
    images: [
      {
        url: "https://digitalmarketingtenx.com/seo-dashboard.webp",
        width: 1200,
        height: 630,
        alt: "Enterprise SEO Dashboard & Organic Growth Services",
      },
    ],
  },
};

export default function SEOServicesLayout({ children }) {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Enterprise SEO Services & Organic Growth",
    "serviceType": "Search Engine Optimization (SEO)",
    "provider": {
      "@type": "Organization",
      "name": "Digital Marketing TenX",
      "url": "https://digitalmarketingtenx.com",
      "logo": "https://digitalmarketingtenx.com/logo.webp"
    },
    "description": "Premium white-hat SEO services including Technical SEO, On-Page optimization, Off-Page Link Building, Local SEO, Keyword Research, and analytics reporting to drive organic rankings and sales.",
    "areaServed": [
      {
        "@type": "Place",
        "name": "Hyderabad, Telangana, India"
      },
      {
        "@type": "Place",
        "name": "Andhra Pradesh, India"
      },
      {
        "@type": "Country",
        "name": "India"
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "SEO Packages",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Technical SEO Audit & Speed Optimization"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "On-Page Content & Heading Optimization"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "High-Authority Link Building & Off-Page Outreach"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Local SEO & Google Business Profile Management"
          }
        }
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
        "name": "Services",
        "item": "https://digitalmarketingtenx.com/services"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "SEO Services",
        "item": "https://digitalmarketingtenx.com/seo-services"
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is SEO and why is it important?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SEO (Search Engine Optimization) is the process of optimizing a website to increase its visibility in search engines like Google when people search for products or services related to your business. It is important because organic search is one of the primary sources of digital traffic, and higher rankings lead to increased brand credibility, free traffic, and consistent leads."
        }
      },
      {
        "@type": "Question",
        "name": "How long does it take to see results from SEO?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SEO is a compounding organic marketing asset. While minor technical fixes and indexing updates can yield ranking improvements within weeks, substantial ranking changes on competitive keywords and a steady increase in organic traffic typically require 3 to 6 months of persistent optimization."
        }
      },
      {
        "@type": "Question",
        "name": "Is SEO better than Google Ads?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SEO and Google Ads (PPC) complement each other. Google Ads delivers instant traffic and leads but stops when your budget runs out. SEO provides sustainable, long-term organic traffic that continues to flow without paying per click. For maximum ROI, businesses should combine both channels: using PPC for immediate leads and SEO for long-term compounding growth."
        }
      },
      {
        "@type": "Question",
        "name": "How much do SEO services cost?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The cost of SEO services depends on the competitiveness of your industry, the current status of your website, and the scope of work. Digital Marketing TenX offers custom SEO plans starting from affordable local packages up to comprehensive enterprise campaigns, tailored specifically to your marketing budget and ROI expectations."
        }
      },
      {
        "@type": "Question",
        "name": "Do you guarantee number 1 rankings on Google?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No ethical SEO agency guarantees specific ranking positions, as search algorithms change constantly and are controlled solely by search engines like Google. However, we guarantee best-practice white-hat methodologies, transparent reporting, and a data-driven strategy that historically achieves top-tier results and measurable organic traffic growth for our clients."
        }
      }
    ]
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "SEO Services - Digital Marketing TenX",
    "description": "Rank higher on Google and scale your business with enterprise-grade SEO Services from Digital Marketing TenX.",
    "url": "https://digitalmarketingtenx.com/seo-services"
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Digital Marketing TenX (SEO Company Hyderabad)",
    "image": "https://digitalmarketingtenx.com/logo.webp",
    "telephone": "+91-93922-51739",
    "email": "grow@digitalmarketingtenx.com",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Level 4, Gumidelli Towers, Begumpet",
      "addressLocality": "Hyderabad",
      "addressRegion": "Telangana",
      "postalCode": "500016",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "17.4447",
      "longitude": "78.4664"
    },
    "url": "https://digitalmarketingtenx.com/seo-services",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "09:00",
      "closes": "19:00"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      {children}
    </>
  );
}
