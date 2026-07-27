import ContactClient from "./ContactClient";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { PageSchema, ContactPageSchema, LocalBusinessSchema, FAQSchema } from "@/components/schema/SchemaComponents";

// Export metadata for Google & Bing search engines + OpenGraph social cards
export const metadata = {
  keywords: [
    "Contact Digital Marketing Agency",
    "Get Digital Marketing Consultation",
    "Contact SEO Experts",
    "Request Digital Marketing Services",
    "Marketing Agency Contact",
    "Contact the Best Digital Marketing Agency",
    "Book a Free Digital Marketing Consultation",
    "Get SEO Services for Your Business",
    "Contact Google Ads Experts",
    "Hire a Digital Marketing Agency",
    "Request Website Design Services",
    "Get a Free Marketing Strategy Call",
    "Speak with Digital Marketing Experts",
    "Start Your Digital Marketing Project",
    "Contact Online Marketing Specialists",

    "Contact the Best Digital Marketing Agency",
    "Schedule a Free Digital Marketing Consultation",
    "Talk to SEO and Google Ads Experts",
    "Request a Website Marketing Proposal",
    "Hire a Professional Marketing Agency",
    "Get a Free Website Audit",
    "Book Your Digital Marketing Strategy Session",
    "Contact Experts for Business Growth",
    "Start Your Online Marketing Journey",
    "Request a Free SEO Consultation",
    "Speak With Our Marketing Team",
    "Get Personalized Digital Marketing Solutions",
    "contact digital marketing agency today",
    "book a free digital marketing consultation",
    "request a free SEO audit",
    "get a quote for digital marketing services",
    "talk to a digital marketing expert",
    "schedule a marketing strategy call",
    "contact SEO specialists near me",
    "get a website marketing consultation",
    "free online marketing consultation",
    "contact website development experts",
    "request digital marketing pricing",
    "get business marketing support",
    "hire a digital marketing consultant",
    "contact branding experts today",
    "speak with SEO professionals",
    "request a Google Ads consultation",
    "ask about social media marketing services",
    "connect with digital marketing experts",
    "marketing agency contact information",
    "start your digital marketing project"
],

  title: "Contact Digital Marketing TenX | Digital Marketing Agency in Hyderabad",
  description: "Contact Digital Marketing TenX for expert SEO, Google Ads, Website Development, Social Media Marketing, AI Automation, and E-Commerce Marketing. Visit our Hyderabad office or book a free consultation today.",
  alternates: {
    canonical: "https://digitalmarketingtenx.com/contact",
  },
  openGraph: {
    title: "Contact Digital Marketing TenX | Digital Marketing Agency in Hyderabad",
    description: "Contact Digital Marketing TenX for expert SEO, Google Ads, Website Development, Social Media Marketing, AI Automation, and E-Commerce Marketing. Visit our Hyderabad office or book a free consultation today.",
    url: "https://digitalmarketingtenx.com/contact",
    type: "website",
    images: [
      {
        url: "https://digitalmarketingtenx.com/logo.webp",
        width: 300,
        height: 300,
        alt: "Digital Marketing TenX",
      },
    ],
  },
};

export default function ContactPage() {
  const faqs = [
    {
      q: "Do you offer free consultation?",
      a: "Yes! We offer a completely free, 30-minute growth strategy consultation. During this session, our digital marketing experts will analyze your current online presence, identify gaps, and provide actionable recommendations to increase your traffic and sales. There are no obligations."
    },
    {
      q: "How quickly do you respond?",
      a: "We respond to all contact form inquiries and emails within 2 hours during business hours (Monday to Saturday). For urgent matters, you can reach out directly via WhatsApp for instant communication with our team."
    },
    {
      q: "Do you provide remote services?",
      a: "Yes, absolutely! While our main branch is in Hyderabad, we serve clients globally. We utilize Google Meet, Zoom, Slack, and detailed real-time reporting dashboards to collaborate seamlessly with businesses worldwide."
    },
    {
      q: "Do you work with international clients?",
      a: "Yes. Digital Marketing TenX works with e-commerce stores, B2B brands, and service businesses across India, North America, Europe, the Middle East, and Southeast Asia. We align our campaign strategies with target local market behaviors."
    },
    {
      q: "Can we visit your office?",
      a: "Of course! Our physical office is located at Level 4, Gumidelli Towers, Begumpet, Hyderabad. We recommend scheduling an appointment in advance via our contact form or phone call so we can prepare for your visit."
    },
    {
      q: "How do I schedule a meeting?",
      a: "You can schedule a meeting by submitting the contact form, clicking the 'Book Free Consultation' button to trigger our calendar scheduler, or messaging us directly on WhatsApp. We will confirm a time slot that works for you."
    },
    {
      q: "Do you provide website audits?",
      a: "Yes, we do. We provide comprehensive, manual website audits covering SEO ranking factors, mobile responsiveness, page speed optimization, checkout funnel leaks, and conversion rate optimization (CRO) opportunities."
    },
    {
      q: "How much do your services cost?",
      a: "Our pricing depends on the project scope, services selected, and target milestones. We offer flexible, value-based monthly retainers and project-based pricing structures designed to optimize your return on investment (ROI). All proposals are fully transparent with zero hidden fees."
    }
  ];

  return (
    <>
      <PageSchema 
        title={metadata.title} 
        description={metadata.description}
        url="/contact"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Contact Us", url: "/contact" }
        ]}
      />
      <ContactPageSchema />
      <FAQSchema faqs={faqs.map(f => ({ question: f.q, answer: f.a }))} />

      <Header />
      <main>
        <ContactClient />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
