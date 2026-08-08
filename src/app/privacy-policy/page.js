import PrivacyPolicyClient from "./PrivacyPolicyClient";

export const metadata = {
  title: "Privacy Policy | Digital Marketing TenX | Data Protection & Privacy",
  description: "Learn how Digital Marketing TenX collects, uses, stores, and protects your personal information. Read our Privacy Policy for transparency and data security.",
  alternatives: {
    canonical: "https://www.digitalmarketingtenx.com/privacy-policy"
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function PrivacyPolicyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.digitalmarketingtenx.com/privacy-policy#webpage",
        "url": "https://www.digitalmarketingtenx.com/privacy-policy",
        "name": "Privacy Policy | Digital Marketing TenX",
        "description": "Learn how Digital Marketing TenX collects, uses, stores, and protects your personal information.",
        "breadcrumb": {
          "@id": "https://www.digitalmarketingtenx.com/privacy-policy#breadcrumb"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.digitalmarketingtenx.com/privacy-policy#breadcrumb",
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
            "name": "Privacy Policy",
            "item": "https://www.digitalmarketingtenx.com/privacy-policy"
          }
        ]
      },
      {
        "@type": "Organization",
        "@id": "https://www.digitalmarketingtenx.com/#organization",
        "name": "Digital Marketing TenX",
        "url": "https://www.digitalmarketingtenx.com/",
        "logo": "https://www.digitalmarketingtenx.com/logo.webp"
      },
      {
        "@type": "PrivacyPolicy",
        "@id": "https://www.digitalmarketingtenx.com/privacy-policy#policy",
        "isPartOf": {
          "@id": "https://www.digitalmarketingtenx.com/privacy-policy#webpage"
        },
        "name": "Privacy Policy",
        "url": "https://www.digitalmarketingtenx.com/privacy-policy",
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
      <PrivacyPolicyClient />
    </>
  );
}

