import Link from "next/link";
import Image from "next/image";
import { RELATED_SERVICES } from "@/data/categories";

export default function RelatedServices({ services }) {
  const items = services
    ? RELATED_SERVICES.filter((s) => services.includes(s.title))
    : RELATED_SERVICES;

  return (
    <section className="related-services-section">
      <div className="section-header">
        <h2>Related Services</h2>
        <p>Grow faster with our expert digital marketing services in Hyderabad.</p>
      </div>
      <div className="related-services-grid">
        {items.map((service) => (
          <Link key={service.href} href={service.href} className="service-card">
            <Image
              src={service.icon}
              alt={service.title}
              width={48}
              height={48}
              className="service-icon"
            />
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <span className="service-cta">Learn More →</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
