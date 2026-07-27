import Image from "next/image";
import Link from "next/link";

export default function Services() {
  const services = [
    {
      icon: "/website-design.webp",
      title: "Website Design & Development",
      desc: "Build fast, responsive, and conversion-focused websites designed to create a better user experience and support business growth.",
      bgColor: "#eef2ff",
      href: "/services/website-design",
    },
    {
      icon: "/google-ads.webp",
      title: "Google Ads",
      desc: "Reach customers actively searching for your products or services with targeted Google Ads and PPC campaigns focused on qualified leads and measurable results.",
      bgColor: "#fff5ee",
      href: "/services/google-ads",
    },
    {
      icon: "/seo.webp",
      title: "SEO",
      desc: "Improve your search visibility, attract organic traffic, and reach more potential customers with strategic SEO services in Hyderabad.",
      bgColor: "#f0fdf4",
      href: "/seo-services",
    },
    {
      icon: "/smm.webp",
      title: "Social Media Marketing",
      desc: "Build your brand presence, engage your audience, and generate business opportunities through strategic social media marketing campaigns.",
      bgColor: "#fdf4ff",
      href: "/services/social-media-marketing",
    },
    {
      icon: "/e-commerce.webp",
      title: "E-Commerce Marketing",
      desc: "Grow your online store with e-commerce marketing strategies designed to improve product visibility, traffic, conversions, and sales.",
      bgColor: "#f0fdf4",
      href: "/services#e-commerce",
    },
    {
      icon: "/whatsapp-automation.webp",
      title: "WhatsApp Automation",
      desc: "Connect with customers faster through WhatsApp automation, personalized communication, lead follow-ups, and business process automation.",
      bgColor: "#f0fff4",
      href: "/services/whatsapp-automation",
    }
  ];

  return (
    <section className="services">
      <div className="sec-header">
        <span className="eyebrow">+ OUR SERVICES</span>
        <h2>Digital Marketing Services We Offer in Hyderabad</h2>
        <p>"As a full-service digital marketing agency in Hyderabad, we provide integrated solutions to help businesses increase visibility, attract the right audience, generate leads, and grow online."</p>
      </div>
      <div className="services-grid">
        {services.map((svc, idx) => (
          <Link href={svc.href} className="svc-card" key={idx} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
            <div className="svc-icon" style={{ backgroundColor: svc.bgColor }}>
              <Image 
                src={svc.icon} 
                alt="" 
                width={32} 
                height={32} 
                style={{ objectFit: "contain", width: "auto", height: "auto" }}
              />
            </div>
            <h3>{svc.title}</h3>
            <p>{svc.desc}</p>
            <span className="arrow">→</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
