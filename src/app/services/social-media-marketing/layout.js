export const metadata = {
  keywords: [
    "Social Media Marketing Services",
    "Social Media Agency",
    "Instagram Marketing",
    "Facebook Marketing",
    "Social Media Advertising",
    "Social Media Marketing Company",
    "Instagram Marketing Services",
    "Facebook Advertising Agency",
    "Social Media Management Company",
    "Business Social Media Marketing",
    "Social Media Lead Generation",
    "Best Social Media Marketing Agency",
    "Social Media Growth Services",

    "Social Media Marketing Company",
    "Instagram Marketing Agency",
    "Facebook Advertising Experts",
    "Social Media Management Services",
    "Business Social Media Marketing",
    "Social Media Lead Generation Company",
    "Social Media Growth Strategies",
    "Professional Social Media Campaigns",
    "Brand Promotion Through Social Media",
    "Social Media Marketing for Small Businesses",
    "Instagram Ads Management",
    "Facebook Ads Management",
    "LinkedIn Marketing Services",
    "Social Media Content Marketing",
    "Social Media Marketing Agency In Hyderabad",
    "Best Social Media Marketing Agency In Hyderabad",
    "Social Media Marketing Company In Hyderabad",
    "Best Social Media Marketing Company In Hyderabad",
    "Top Social Media Marketing Agency In Hyderabad",
    "Top Social Media Marketing Company In Hyderabad",
    "Social Media Marketing Services In Hyderabad",
    "Best Social Media Marketing Services In Hyderabad",
    "Professional Social Media Marketing Services In Hyderabad",
    "Social Media Marketing Experts In Hyderabad",
    "Social Media Management Company In Hyderabad",
    "Best Social Media Management Company In Hyderabad",
    "Social Media Management Services In Hyderabad",
    "Social Media Marketing Agency Near Me",
    "Social Media Marketing Company Near Me",
    "Affordable Social Media Marketing Services In Hyderabad",
    "Social Media Marketing For Small Businesses",
    "Social Media Marketing For Startups",
    "Social Media Marketing For E-Commerce Businesses",
    "Social Media Marketing For Local Businesses",
    "Instagram Marketing Agency In Hyderabad",
    "Best Instagram Marketing Agency In Hyderabad",
    "Instagram Marketing Services In Hyderabad",
    "Instagram Management Services In Hyderabad",
    "Instagram Marketing Company In Hyderabad",
    "Facebook Marketing Agency In Hyderabad",
    "Best Facebook Marketing Agency In Hyderabad",
    "Facebook Marketing Services In Hyderabad",
    "Facebook Advertising Agency In Hyderabad",
    "Facebook Ads Management In Hyderabad",
    "LinkedIn Marketing Agency In Hyderabad",
    "LinkedIn Marketing Services In Hyderabad",
    "LinkedIn Social Media Marketing Agency In Hyderabad",
    "YouTube Marketing Agency In Hyderabad",
    "YouTube Marketing Services In Hyderabad",
    "Social Media Advertising Agency In Hyderabad",
    "Social Media Advertising Services In Hyderabad",
    "Social Media Ads Agency In Hyderabad",
    "Social Media Campaign Management In Hyderabad",
    "Social Media Content Creation Services In Hyderabad",
    "Social Media Content Marketing Agency In Hyderabad",
    "Social Media Branding Agency In Hyderabad",
    "Social Media Brand Management In Hyderabad",
    "Social Media Lead Generation Agency In Hyderabad",
    "Social Media Lead Generation Services In Hyderabad",
    "Social Media Strategy Services In Hyderabad",
    "Social Media Growth Services In Hyderabad",
    "Social Media Promotion Services In Hyderabad",
    "Social Media Optimization Services In Hyderabad",
    "Social Media Marketing For Lead Generation",
    "Social Media Marketing For Business Growth",
    "Social Media Marketing For Brand Awareness",
    "Social Media Marketing For E-Commerce",
    "Top Rated Social Media Marketing Agency In Hyderabad",
    "Leading Social Media Marketing Company In Hyderabad",
    "Creative Social Media Marketing Agency In Hyderabad",
    "Result Driven Social Media Marketing Agency In Hyderabad",
    "ROI Focused Social Media Marketing Agency In Hyderabad"
],

  title: "Best Social Media Marketing Services in Hyderabad | TenX",
  description: "Grow your brand with the best social media marketing services in Hyderabad. Expert Instagram, Facebook, LinkedIn & paid social campaigns that drive leads.",
  alternates: {
    canonical: "https://www.digitalmarketingtenx.com/services/social-media-marketing",
  },
  openGraph: {
    title: "Best Social Media Marketing Services in Hyderabad | TenX",
    description: "Grow your brand with the best social media marketing services in Hyderabad. Expert Instagram, Facebook, LinkedIn & paid social campaigns that drive leads.",
    url: "https://www.digitalmarketingtenx.com/services/social-media-marketing",
    type: "website",
    images: [
      {
        url: "https://www.digitalmarketingtenx.com/social-media-marketing-dashboard.webp",
        width: 1200,
        height: 630,
        alt: "Professional Social Media Marketing Dashboard",
      },
    ],
  },
};

export default function SocialMediaMarketingLayout({ children }) {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Social Media Marketing Services",
    "serviceType": "Social Media Management and Advertising",
    "provider": {
      "@type": "Organization",
      "name": "Digital Marketing TenX",
      "url": "https://www.digitalmarketingtenx.com",
      "logo": "https://www.digitalmarketingtenx.com/logo.webp"
    },
    "description": "Professional social media management, creative content creation, brand awareness campaigns, and paid social ads management on Instagram, Facebook, LinkedIn, TikTok, and YouTube.",
    "areaServed": {
      "@type": "Place",
      "name": "Hyderabad, Telangana, India"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Social Media Marketing Packages",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Organic Social Media Management"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Paid Social Ads Management"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Content Strategy and Creation"
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
        "name": "Social Media Marketing",
        "item": "https://www.digitalmarketingtenx.com/services/social-media-marketing"
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How long does social media marketing take to show results?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Organic growth and brand authority typically show noticeable momentum in 3 to 6 months. However, paid social media advertising campaigns (like Meta Ads or LinkedIn Ads) can drive immediate traffic, leads, and sales within the first week of launch."
        }
      },
      {
        "@type": "Question",
        "name": "Which social media platform is best for my business?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "It depends on your audience. B2B companies find LinkedIn and Twitter/X highly effective. B2C brands, retail, and local services thrive on Instagram, Facebook, and TikTok. We perform a competitor analysis to identify where your customers are most active."
        }
      },
      {
        "@type": "Question",
        "name": "Do you create the content for our posts?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we handle the entire content creation workflow: content calendar planning, custom graphic design, copywriting, Reels/Shorts video editing, and caption writing. Everything is sent to you for approval before scheduling."
        }
      },
      {
        "@type": "Question",
        "name": "How much do your social media marketing packages cost?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our pricing is transparent and depends on the scope of management (number of platforms, posting frequency, creative types) and ad budget. We customize our packages to deliver the highest ROI for your startup or enterprise. Contact us for a free strategy proposal."
        }
      },
      {
        "@type": "Question",
        "name": "Can social media marketing help with lead generation?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. Through organic click-funnels, lead magnets, bio optimizations, and highly targeted lead generation ads (with Meta instant forms or custom landing pages), we capture high-quality leads directly from social feeds."
        }
      }
    ]
  };

  return (
    <>
      <head>
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
      </head>
      {children}
    </>
  );
}

