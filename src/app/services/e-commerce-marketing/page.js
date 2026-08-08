import ECommerceMarketingClient from "./ECommerceMarketingClient";

export const metadata = {
  title: "Best E-Commerce Marketing Services in Hyderabad | TenX",
  description: "Boost online sales with our e-commerce marketing services in Hyderabad. We help Shopify, WooCommerce, and D2C brands grow traffic, sales, and ROI.",
  alternates: {
    canonical: "https://www.digitalmarketingtenx.com/services/e-commerce-marketing",
  },
  openGraph: {
    title: "Best E-Commerce Marketing Services in Hyderabad | TenX",
    description: "Boost online sales with our e-commerce marketing services in Hyderabad. We help Shopify, WooCommerce, and D2C brands grow traffic, sales, and ROI.",
    url: "https://www.digitalmarketingtenx.com/services/e-commerce-marketing",
    siteName: "Digital Marketing TenX",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://www.digitalmarketingtenx.com/og-image.webp",
        width: 1200,
        height: 630,
        alt: "E-Commerce Marketing Services - Digital Marketing TenX",
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "E-Commerce Marketing Services | Scale Shopify & WooCommerce | TenX",
    description: "Accelerate your online store sales with Digital Marketing TenX. Premium Shopify marketing, WooCommerce SEO, Google Shopping PMax campaigns, and Klaviyo email flows.",
    images: ["https://www.digitalmarketingtenx.com/og-image.webp"],
  }
};

export default function Page() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.digitalmarketingtenx.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Services",
        "item": "https://www.digitalmarketingtenx.com/services"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "E-Commerce Marketing",
        "item": "https://www.digitalmarketingtenx.com/services/e-commerce-marketing"
      }
    ]
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "E-Commerce Marketing Services",
    "serviceType": "E-Commerce Growth and PPC Management",
    "provider": {
      "@type": "Organization",
      "name": "Digital Marketing TenX",
      "url": "https://www.digitalmarketingtenx.com",
      "logo": "https://www.digitalmarketingtenx.com/logo.webp"
    },
    "areaServed": [
      { "@type": "City", "name": "Hyderabad" },
      { "@type": "City", "name": "Vijayawada" },
      { "@type": "City", "name": "Guntur" },
      { "@type": "State", "name": "Telangana" },
      { "@type": "State", "name": "Andhra Pradesh" }
    ],
    "description": "Enterprise-grade digital marketing services for e-commerce stores. Includes Shopify SEO, WooCommerce performance optimization, Google Shopping ads, Performance Max campaigns, and Klaviyo flows."
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How much do your e-commerce marketing services cost?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our pricing is customized based on your store's current size, monthly ad spend, and growth goals. We offer flexible packages including retainer models, performance-based models, and combined models. Contact us for a custom proposal after we conduct your free store audit."
        }
      },
      {
        "@type": "Question",
        "name": "Which e-commerce platform is best for marketing integrations?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "While we work with Shopify, WooCommerce, Magento, BigCommerce, and custom builds, Shopify is generally the easiest to scale due to its native integrations with Meta, Google Merchant Center, Klaviyo, and major shipping providers. However, we optimize and scale stores on any platform."
        }
      },
      {
        "@type": "Question",
        "name": "What is ROAS and why is it important?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "ROAS stands for Return on Ad Spend. It measures the gross revenue generated for every rupee spent on advertising (Revenue / Ad Spend). For example, a 5x ROAS means that for every ₹1,000 spent on ads, your store generates ₹5,000 in sales. It is the primary metric we optimize to ensure your ads are highly profitable."
        }
      },
      {
        "@type": "Question",
        "name": "What are Performance Max (PMax) campaigns?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Performance Max is a goal-based campaign type in Google Ads that allows advertisers to access all Google Ads inventory (Search, YouTube, Display, Discover, Gmail, and Google Maps) from a single campaign. We use advanced audience signals, conversion tracking, and high-quality creative assets to make PMax highly profitable for online stores."
        }
      },
      {
        "@type": "Question",
        "name": "How long before we start seeing results?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Typically, conversion tracking fixes and search/shopping campaign setups yield immediate search visibility improvements within 7-14 days. Performance scaling and consistent ROAS improvements usually require 30 to 90 days as Google's AI and Meta's pixel learn your customer buying patterns."
        }
      },
      {
        "@type": "Question",
        "name": "Do you manage Shopify marketing and SEO specifically?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we are Shopify growth experts. We manage everything from Shopify SEO (speed optimization, metadata, schema markup, product feed sync) to paid ad setups, app integrations, and custom checkout CRO strategies."
        }
      },
      {
        "@type": "Question",
        "name": "Do you optimize WooCommerce stores for marketing?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. WooCommerce stores often require specialized technical SEO and speed optimization to handle high traffic. We set up WP-Rocket, optimize product databases, build XML feeds, and integrate WooCommerce with Klaviyo and GA4."
        }
      },
      {
        "@type": "Question",
        "name": "Do you create shopping ads and manage product feeds?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, product feed management is critical for Google Shopping success. We optimize product titles, descriptions, custom labels, Google product categories, and resolve Google Merchant Center suspensions or disapproved items."
        }
      },
      {
        "@type": "Question",
        "name": "Can you help improve our store's conversion rate?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, driving traffic is only half the battle. We conduct comprehensive Conversion Rate Optimization (CRO) audits, set up heatmaps, optimize checkout flows, design high-converting product pages, and implement cart abandonment recovery systems to turn more visitors into buyers."
        }
      },
      {
        "@type": "Question",
        "name": "What platforms do you run e-commerce ads on?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We run highly profitable campaigns on Google (Shopping, Search, PMax, YouTube), Meta (Facebook & Instagram Shopping), Pinterest, and marketplace networks like Amazon Ads depending on where your target audience searches."
        }
      },
      {
        "@type": "Question",
        "name": "How e-commerce email and SMS marketing work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We design and deploy automated retention sequences ('flows') in Klaviyo, Mailchimp, or Omnisend. These include Welcome Series, Abandoned Cart Recovery, Browse Abandonment, Win-back campaigns, and VIP customer loyalty rewards."
        }
      },
      {
        "@type": "Question",
        "name": "How do you track store conversions accurately in 2026?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We implement advanced server-side tracking using Meta Conversions API (CAPI) and Google Tag Manager server-side containers. This bypasses browser ad-blockers and iOS privacy updates to provide 100% accurate data attribution."
        }
      },
      {
        "@type": "Question",
        "name": "Do you manage Magento marketing campaigns?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we manage enterprise-level Magento (Adobe Commerce) marketing campaigns. Magento stores benefit greatly from our technical SEO audits, custom XML feed builders, and advanced search filters optimization."
        }
      },
      {
        "@type": "Question",
        "name": "What is AOV and how do you increase it?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "AOV is Average Order Value. We increase your AOV by implementing smart product bundling, automated cross-sell/upsell widgets at checkout, free shipping thresholds, and volume discounts."
        }
      },
      {
        "@type": "Question",
        "name": "Do you offer weekly optimization and reporting?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, our certified experts optimize your accounts weekly (bids, keywords, negative matches, ad creatives). We provide a live, transparent Looker Studio dashboard so you can monitor sales, spend, and ROAS in real-time, plus we host weekly sync calls."
        }
      },
      {
        "@type": "Question",
        "name": "Is there a contract or minimum commitment?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We work on rolling monthly agreements as we believe in keeping our clients through excellent results, not lock-in contracts. However, we recommend a minimum window of 3 months to fully optimize campaigns and establish a baseline ROAS."
        }
      }
    ]
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Digital Marketing TenX (E-Commerce Branch)",
    "image": "https://www.digitalmarketingtenx.com/logo.webp",
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
    "url": "https://www.digitalmarketingtenx.com/services/e-commerce-marketing"
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <ECommerceMarketingClient />
    </>
  );
}

