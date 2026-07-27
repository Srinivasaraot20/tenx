import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import WhatsAppButton from "@/components/WhatsAppButton";


export const metadata = {
  title: "Healthcare Digital Marketing Company in Hyderabad | TenX",
  description: "Get more patients and increase appointment bookings with TenX's healthcare digital marketing services in Hyderabad. SEO for clinics, Google Ads, and local SEO.",
};

export default function HealthcarePage() {
  return (
    <>
      <Header />
      <main>
        <section className="hero-section" style={{ padding: "100px 20px", textAlign: "center", backgroundColor: "#f8f9fa" }}>
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <span style={{ color: "#34A853", fontWeight: "bold", textTransform: "uppercase" }}>Industry Spotlight</span>
            <h1 style={{ fontSize: "3rem", margin: "20px 0" }}>Healthcare Digital Marketing Company in Hyderabad</h1>
            <p style={{ fontSize: "1.2rem", color: "#555", marginBottom: "30px" }}>
              Drive more patient appointments, build trust, and grow your clinic's online visibility with HIPAA-compliant digital marketing, Local SEO, and highly targeted Google Ads for healthcare professionals.
            </p>
            <CTA />
          </div>
        </section>
        
        <section style={{ padding: "60px 20px", maxWidth: "1000px", margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontSize: "2.5rem", marginBottom: "40px" }}>Our Healthcare Marketing Services</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "30px" }}>
            <div style={{ padding: "30px", border: "1px solid #eee", borderRadius: "12px", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
              <h3 style={{ fontSize: "1.5rem", marginBottom: "15px" }}>SEO for Clinics & Hospitals</h3>
              <p style={{ color: "#666", lineHeight: "1.6" }}>Optimize your Google Business Profile and website to appear in "near me" searches when patients are actively looking for specialists and treatments in your area.</p>
            </div>
            <div style={{ padding: "30px", border: "1px solid #eee", borderRadius: "12px", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
              <h3 style={{ fontSize: "1.5rem", marginBottom: "15px" }}>Patient Acquisition Ads</h3>
              <p style={{ color: "#666", lineHeight: "1.6" }}>Run precision-targeted Google Ads to capture patients searching for specific procedures (e.g., dental implants, IVF, dermatology) to maximize your return on ad spend.</p>
            </div>
            <div style={{ padding: "30px", border: "1px solid #eee", borderRadius: "12px", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
              <h3 style={{ fontSize: "1.5rem", marginBottom: "15px" }}>Online Reputation Management</h3>
              <p style={{ color: "#666", lineHeight: "1.6" }}>Build patient trust by automating review collection on Google and Practo, actively managing your online reputation to stand out among local competitors.</p>
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
