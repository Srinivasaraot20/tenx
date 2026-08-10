import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata = {
  title: "Digital Marketing Agency in Hyderabad | TenX",
  description: "Best Digital Marketing Agency in Hyderabad. We provide SEO, Google Ads, Social Media Marketing, and Website Design.",
  keywords: [
    "Digital Marketing Agency in Hyderabad",
    "SEO Services Hyderabad",
    "Google Ads Agency Hyderabad",
    "Website Design Company Hyderabad",
    "Social Media Marketing Hyderabad",
    "Best Digital Marketing Agency in Hyderabad",
    "Affordable SEO Services in Hyderabad",
    "Google Ads Company Hyderabad",
    "Website Development Company Hyderabad",
    "Local SEO Company Hyderabad",
    "Performance Marketing Agency Hyderabad",
    "Digital Marketing Experts Hyderabad",
    "Online Marketing Company Hyderabad",
    "Small Business Digital Marketing Hyderabad",
    "Lead Generation Company Hyderabad"
],
  alternates: {
    canonical: "https://digitalmarketingtenx.com/hyderabad"
  }
};

export default function LocationPage() {
  return (
    <>
      <Header />
      <main style={{ padding: '140px 20px', textAlign: 'center', minHeight: '60vh', maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '20px' }}>Digital Marketing Agency in Hyderabad</h1>
        <p style={{ fontSize: '18px', color: '#64748b', lineHeight: '1.6' }}>
          Welcome to our Hyderabad location page. We are a leading digital marketing agency providing result-driven SEO, web design, PPC, and social media marketing services.
        </p>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

