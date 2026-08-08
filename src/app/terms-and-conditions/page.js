import TermsAndConditionsClient from "./TermsAndConditionsClient";

export const metadata = {
  title: "Terms & Conditions | Digital Marketing TenX | Service Agreement",
  description: "Read the Terms & Conditions of Digital Marketing TenX to understand our service policies, payment terms, user responsibilities, and legal agreements.",
  alternates: {
    canonical: "https://www.digitalmarketingtenx.com/terms-and-conditions"
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function TermsAndConditionsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.digitalmarketingtenx.com/terms-and-conditions#webpage",
        "url": "https://www.digitalmarketingtenx.com/terms-and-conditions",
        "name": "Terms & Conditions | Digital Marketing TenX",
        "description": "Read the Terms & Conditions of Digital Marketing TenX to understand our service policies, payment terms, user responsibilities, and legal agreements.",
        "breadcrumb": {
          "@id": "https://www.digitalmarketingtenx.com/terms-and-conditions#breadcrumb"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.digitalmarketingtenx.com/terms-and-conditions#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.digitalmarketingtenx.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Terms & Conditions",
            "item": "https://www.digitalmarketingtenx.com/terms-and-conditions"
          }
        ]
      },
      {
        "@type": "Organization",
        "@id": "https://www.digitalmarketingtenx.com/#organization",
        "name": "Digital Marketing TenX",
        "url": "https://www.digitalmarketingtenx.com/",
        "logo": "https://www.digitalmarketingtenx.com/logo.webp",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Level 4, Gumidelli Towers, Sardar Patel Road, Begumpet",
          "addressLocality": "Hyderabad",
          "addressRegion": "Telangana",
          "postalCode": "500016",
          "addressCountry": "IN"
        },
        "telephone": "+919392251739"
      },
      {
        "@type": "TermsOfService",
        "@id": "https://www.digitalmarketingtenx.com/terms-and-conditions#terms",
        "isPartOf": {
          "@id": "https://www.digitalmarketingtenx.com/terms-and-conditions#webpage"
        },
        "name": "Terms & Conditions",
        "url": "https://www.digitalmarketingtenx.com/terms-and-conditions",
        "about": {
          "@id": "https://www.digitalmarketingtenx.com/#organization"
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TermsAndConditionsClient />
    </>
  );
}

