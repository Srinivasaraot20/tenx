import Link from "next/link";

export default function ArticleCTA() {
  return (
    <section className="article-cta">
      <div className="article-cta-inner">
        <h2>Need Help Growing Your Business?</h2>
        <p>
          Partner with Digital Marketing TenX — your trusted Digital Marketing Agency
          in Hyderabad for SEO, Google Ads, website design, and more.
        </p>
        <div className="article-cta-buttons">
          <Link href="/contact" className="btn-primary">
            Book Free Consultation
          </Link>
          <Link href="/contact" className="btn-outline">
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
