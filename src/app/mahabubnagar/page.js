import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata = {
  title: "Digital Marketing Agency in Mahabubnagar | TenX",
  description: "Best Digital Marketing Agency in Mahabubnagar. We provide SEO, Google Ads, Social Media Marketing, and Website Design.",
  keywords: [
    "Digital Marketing Agency in Mahabubnagar",
    "SEO Services Mahabubnagar",
    "Website Design Mahabubnagar",
    "Google Ads Agency Mahabubnagar",
    "Social Media Marketing Mahabubnagar",
    "Local SEO Company Mahabubnagar",
    "Online Marketing Mahabubnagar",
    "Business Growth Agency Mahabubnagar"
],
  alternates: {
    canonical: "https://digitalmarketingtenx.com/mahabubnagar"
  }
};

export default function LocationPage() {
  return (
    <>
      <Header />
      <main style={{ padding: '140px 20px', textAlign: 'center', minHeight: '60vh', maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '20px' }}>Digital Marketing Agency in Mahabubnagar</h1>
        <p style={{ fontSize: '18px', color: '#64748b', lineHeight: '1.6' }}>
          Welcome to our Mahabubnagar location page. We are a leading digital marketing agency providing result-driven SEO, web design, PPC, and social media marketing services.
        </p>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
