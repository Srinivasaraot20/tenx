import SEOServicesClient from "./SEOServicesClient";

export const metadata = {
  title: "Best SEO Services in Hyderabad | Digital Marketing TenX",
  description: "Get the best SEO services in Hyderabad with data-driven strategies, technical SEO, content optimization, and link building to grow your rankings and traffic.",
  keywords: [
    "Top SEO Agency in Hyderabad",
    "SEO Services in Hyderabad",
    "SEO Company in Hyderabad",
    "SEO Experts in Hyderabad",
    "SEO Agency in Hyderabad",
    "Affordable SEO Services in Hyderabad",
    "Local SEO Services in Hyderabad",
    "Technical SEO Services in Hyderabad"
  ],
  alternates: {
    canonical: "https://www.digitalmarketingtenx.com/seo-services"
  },
  openGraph: {
    title: "Best SEO Services in Hyderabad | Digital Marketing TenX",
    description: "Get the best SEO services in Hyderabad with data-driven strategies, technical SEO, content optimization, and link building to grow your rankings and traffic.",
    url: "https://www.digitalmarketingtenx.com/seo-services",
    type: "website",
    images: [
      {
        url: "https://www.digitalmarketingtenx.com/logo.webp",
        width: 1200,
        height: 630,
        alt: "Digital Marketing TenX SEO Services"
      }
    ]
  }
};

export default function SEOServicesPage() {
  return <SEOServicesClient />;
}

