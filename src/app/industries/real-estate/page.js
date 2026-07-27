import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata = {
  title: "Digital Marketing for Real Estate Agents in Hyderabad | TenX",
  description: "Generate high-quality property leads and increase site visits with TenX's real estate digital marketing services in Hyderabad. SEO, Facebook Ads, and Google Ads.",
};

export default function RealEstatePage() {
  return (
    <>
      <Header />
      <main>
        <section className="hero-section" style={{ padding: "100px 20px", textAlign: "center", backgroundColor: "#f8f9fa" }}>
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <span style={{ color: "#ff6b00", fontWeight: "bold", textTransform: "uppercase" }}>Industry Spotlight</span>
            <h1 style={{ fontSize: "3rem", margin: "20px 0" }}>Digital Marketing for Real Estate Agents in Hyderabad</h1>
            <p style={{ fontSize: "1.2rem", color: "#555", marginBottom: "30px" }}>
              Generate high-quality property leads, increase site visits, and boost sales with AI-powered Real Estate SEO, Facebook Ads for Builders, and localized Google Ads campaigns tailored for the Hyderabad market.
            </p>
            <CTA />
          </div>
        </section>
        
        <section style={{ padding: "60px 20px", maxWidth: "1000px", margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontSize: "2.5rem", marginBottom: "40px" }}>Our Real Estate Marketing Services</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "30px" }}>
            <div style={{ padding: "30px", border: "1px solid #eee", borderRadius: "12px", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
              <h3 style={{ fontSize: "1.5rem", marginBottom: "15px" }}>Local SEO for Realtors</h3>
              <p style={{ color: "#666", lineHeight: "1.6" }}>Rank at the top of Google for terms like "best real estate agent in Hyderabad" and dominate the local map pack to capture high-intent buyers searching in your micro-markets.</p>
            </div>
            <div style={{ padding: "30px", border: "1px solid #eee", borderRadius: "12px", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
              <h3 style={{ fontSize: "1.5rem", marginBottom: "15px" }}>Google & Facebook Ads</h3>
              <p style={{ color: "#666", lineHeight: "1.6" }}>Target specific demographics, income levels, and interests. We create high-converting property landing pages to turn ad clicks into qualified, ready-to-buy leads.</p>
            </div>
            <div style={{ padding: "30px", border: "1px solid #eee", borderRadius: "12px", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
              <h3 style={{ fontSize: "1.5rem", marginBottom: "15px" }}>WhatsApp Lead Automation</h3>
              <p style={{ color: "#666", lineHeight: "1.6" }}>Instantly engage with property inquiries 24/7. Send automated brochures, schedule site visits, and nurture leads directly on WhatsApp using our CRM integration.</p>
            </div>
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
