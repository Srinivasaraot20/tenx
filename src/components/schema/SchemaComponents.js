import React from 'react';

// Reusable component to safely render JSON-LD scripts
export function JsonLd({ schema }) {
  if (!schema) return null;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// 1. Organization Schema
export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Digital Marketing TenX",
    "url": "https://www.digitalmarketingtenx.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.digitalmarketingtenx.com/logo.jpeg"
    },
    "description": "Digital Marketing TenX is a results-driven digital marketing agency in Hyderabad helping businesses improve their online visibility, generate qualified leads, and achieve sustainable growth.",
    "foundingDate": "2023",
    "email": "grow@digitalmarketingtenx.com",
    "telephone": "+91-93922-51739",
    "sameAs": [
      "https://www.linkedin.com/company/digital-marketing-ten-x/",
      "https://www.instagram.com/digital_marketing_tenx/",
      "https://www.facebook.com/digitalmarketingtenx",
      "https://x.com/digitalmtenx",
      "https://www.quora.com/profile/DIGITAL-MARKEING-TEN-X"
    ],
    "brand": {
      "@type": "Brand",
      "name": "Digital Marketing TenX"
    }
  };
  return <JsonLd schema={schema} />;
}

// 2. LocalBusiness Schema
export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Digital Marketing TenX (Hyderabad Branch)",
    "image": "https://www.digitalmarketingtenx.com/logo.jpeg",
    "telephone": "+91-93922-51739",
    "email": "grow@digitalmarketingtenx.com",
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
    "url": "https://www.digitalmarketingtenx.com",
    "priceRange": "₹₹",
    "areaServed": {
      "@type": "City",
      "name": "Hyderabad"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "09:00",
      "closes": "19:00"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Digital Marketing Services",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "SEO Services" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Google Ads" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Social Media Marketing" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Website Development" } }
      ]
    }
  };
  return <JsonLd schema={schema} />;
}

// 3. WebSite & 12. SearchAction Schema
export function WebSiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Digital Marketing TenX",
    "url": "https://www.digitalmarketingtenx.com",
    "publisher": {
      "@type": "Organization",
      "name": "Digital Marketing TenX"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.digitalmarketingtenx.com/?search={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };
  return <JsonLd schema={schema} />;
}

// 4. WebPage & 5. Breadcrumb Schema
export function PageSchema({ title, description, url, breadcrumbs = [] }) {
  const fullUrl = `https://www.digitalmarketingtenx.com${url}`;
  
  const webpageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": title,
    "url": fullUrl,
    "description": description
  };

  const breadcrumbSchema = breadcrumbs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": `https://www.digitalmarketingtenx.com${crumb.url}`
    }))
  } : null;

  return (
    <>
      <JsonLd schema={webpageSchema} />
      {breadcrumbSchema && <JsonLd schema={breadcrumbSchema} />}
    </>
  );
}

// 6. Service Schema
export function ServiceSchema({ name, description, serviceType }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": name,
    "description": description,
    "serviceType": serviceType || name,
    "provider": {
      "@type": "LocalBusiness",
      "name": "Digital Marketing TenX"
    },
    "areaServed": {
      "@type": "City",
      "name": "Hyderabad"
    }
  };
  return <JsonLd schema={schema} />;
}

// 7. FAQ Schema
export function FAQSchema({ faqs }) {
  if (!faqs || faqs.length === 0) return null;
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
  return <JsonLd schema={schema} />;
}

// 8. Article Schema (Blog)
export function ArticleSchema({ headline, description, image, authorName, datePublished, dateModified, url }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": headline,
    "description": description,
    "image": image ? (image.startsWith('http') ? image : `https://www.digitalmarketingtenx.com${image}`) : "https://www.digitalmarketingtenx.com/og-image.webp",
    "author": {
      "@type": "Person",
      "name": authorName || "Digital Marketing TenX Expert"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Digital Marketing TenX",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.digitalmarketingtenx.com/logo.jpeg"
      }
    },
    "datePublished": datePublished,
    "dateModified": dateModified || datePublished,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.digitalmarketingtenx.com${url}`
    }
  };
  return <JsonLd schema={schema} />;
}

// 9. ContactPage Schema
export function ContactPageSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Digital Marketing TenX",
    "description": "Get in touch with Digital Marketing TenX for SEO, Google Ads, and Digital Marketing Services in Hyderabad.",
    "url": "https://www.digitalmarketingtenx.com/contact",
    "mainEntity": {
      "@type": "LocalBusiness",
      "name": "Digital Marketing TenX",
      "telephone": "+91-93922-51739",
      "email": "grow@digitalmarketingtenx.com"
    }
  };
  return <JsonLd schema={schema} />;
}

