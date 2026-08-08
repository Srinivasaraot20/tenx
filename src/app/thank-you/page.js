import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Link from "next/link";
import "./thank-you.css";

export const metadata = {
  title: "Thank You | Digital Marketing TenX",
  description: "Thank you for contacting Digital Marketing TenX. We have received your consultation request and our team will get back to you shortly.",
};

export default function ThankYouPage() {
  return (
    <>
      <Header />
      <main className="ty-main">
        <div className="ty-grid-overlay"></div>
        <div className="ty-card">
          
          {/* Animated Success Checkmark */}
          <div className="ty-icon-wrapper">
            <svg viewBox="0 0 52 52" className="ty-checkmark">
              <path d="M14.1 27.2l7.1 7.2 16.7-16.8" />
            </svg>
          </div>

          <h1 className="ty-title">Thank You!</h1>
          
          <p className="ty-subtitle">
            Your consultation request has been successfully submitted.
          </p>

          <p className="ty-desc">
            We have registered your details in our CRM, and our team of Google & Meta certified experts will review your website and requirements. We will contact you via your preferred method within <strong>2 hours</strong> during business hours to schedule your strategy call.
          </p>

          {/* SLA Next Steps */}
          <div className="ty-steps-box">
            <h4 className="ty-steps-title">What Happens Next?</h4>
            
            <div className="ty-step-item">
              <div className="ty-step-num">1</div>
              <div className="ty-step-text">
                <strong>Initial Audit</strong>
                We analyze your domain, SEO metrics, and competitor strategies.
              </div>
            </div>
            
            <div className="ty-step-item">
              <div className="ty-step-num">2</div>
              <div className="ty-step-text">
                <strong>Introduction Call</strong>
                We discuss your project details and confirm strategic opportunities.
              </div>
            </div>
            
            <div className="ty-step-item">
              <div className="ty-step-num">3</div>
              <div className="ty-step-text">
                <strong>Growth Proposal</strong>
                We deliver a transparent blueprint with action items and ROI estimates.
              </div>
            </div>

          </div>

          <div className="ty-btn-group">
            <Link href="/" className="ty-btn-primary">
              Home Page
            </Link>
            <Link href="/services" className="ty-btn-secondary">
              Browse Services
            </Link>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

