import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata = {
  title: "Digital Marketing Agency in Khammam | TenX",
  description: "Best Digital Marketing Agency in Khammam. We provide SEO, Google Ads, Social Media Marketing, and Website Design.",
  keywords: [
    "Digital Marketing Agency in Khammam",
    "SEO Services in Khammam",
    "Website Design Company Khammam",
    "Google Ads Agency Khammam",
    "Social Media Marketing Khammam",
    "Local SEO Services Khammam",
    "Online Marketing Company Khammam",
    "Digital Marketing Experts Khammam",
    "Business Marketing Services Khammam"
],
  alternates: {
    canonical: "https://digitalmarketingtenx.com/khammam"
  }
};

export default function LocationPage() {
  return (
    <>
      <Header />
      <main style={{ padding: '140px 20px', textAlign: 'center', minHeight: '60vh', maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '20px' }}>Digital Marketing Agency in Khammam</h1>
        <p style={{ fontSize: '18px', color: '#64748b', lineHeight: '1.6' }}>
          Welcome to our Khammam location page. We are a leading digital marketing agency providing result-driven SEO, web design, PPC, and social media marketing services.
        </p>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

