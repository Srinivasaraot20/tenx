import BlogHero from "@/components/BlogHero";
import FeaturedArticle from "@/components/FeaturedArticle";
import Newsletter from "@/components/Newsletter";
import BlogList from "@/components/BlogList";
import BookmarksPanel from "@/components/BookmarksPanel";
import SidebarTrending from "@/components/SidebarTrending";
import RelatedServices from "@/components/RelatedServices";
import CTA from "@/components/CTA";
import { ARTICLES } from "@/data/articles";
import { getFeaturedArticle, getCategoryCards, getTrendingSidebar } from "@/lib/blog";
import "./blog.css";

export const metadata = {
  title: "Top Digital Marketing Agency in India | Digital TenX",
  description: "Explore expert digital marketing blogs, SEO tips, PPC, social media, AI marketing insights, and proven strategies from Digital Marketing TenX across India.",
  keywords: [
    "Digital Marketing Blog",
    "SEO Blog",
    "Google Ads",
    "AI Marketing",
    "Performance Marketing",
    "Website Development",
    "Social Media Marketing",
    "Lead Generation",
    "Content Marketing",
    "Digital Marketing Agency Hyderabad",
  ],
  alternates: {
    canonical: "https://digitalmarketingtenx.com/blog",
  },
  openGraph: {
    title: "Digital Marketing Blog | Digital Marketing TenX",
    description: "Read expert articles on SEO, Google Ads, AI marketing, website development, social media marketing, and business growth strategies.",
    type: "website",
    url: "https://digitalmarketingtenx.com/blog",
    images: [
      {
        url: "https://digitalmarketingtenx.com/images/blog-og.jpg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Marketing Blog | Digital Marketing TenX",
    description: "Expert blogs on SEO, Google Ads, AI Marketing, Social Media, Performance Marketing, and Website Development.",
  },
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
};

export default function BlogPage() {
  const featured = getFeaturedArticle();
  const categoryCards = getCategoryCards();
  const trending = getTrendingSidebar();

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Digital Marketing TenX Blog",
    description: "Expert digital marketing, SEO, and business growth insights",
    url: "https://digitalmarketingtenx.com/blog",
    publisher: {
      "@type": "Organization",
      name: "Digital Marketing TenX",
      logo: { "@type": "ImageObject", url: "https://digitalmarketingtenx.com/logo.webp" },
    },
    blogPost: ARTICLES.slice(0, 10).map((a) => ({
      "@type": "BlogPosting",
      headline: a.title,
      url: `https://digitalmarketingtenx.com/blog/${a.slug}`,
      datePublished: a.date,
      author: { "@type": "Person", name: a.author },
    })),
  };

  return (
    <main className="blog-page-container">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <BlogHero />

      <section className="blog-wrap">
        <div className="blog-main">

          <BlogList initialArticles={ARTICLES} categoryCards={categoryCards} />
        </div>

        <aside className="blog-sidebar">
          <SidebarTrending data={trending} />
          <div id="blog-newsletter">
            <Newsletter />
          </div>
          <BookmarksPanel />
        </aside>
      </section>

      <section className="blog-seo-content" style={{ padding: "60px 20px", maxWidth: "1200px", margin: "0 auto", color: "#333", lineHeight: "1.8" }}>
        <h2 style={{ fontSize: "2rem", marginBottom: "20px", color: "#111" }}>Welcome to the Digital Marketing TenX Blog</h2>
        <p style={{ marginBottom: "16px", fontSize: "1.1rem" }}>
          In the fast-paced world of online business, staying updated with the latest digital marketing trends is crucial for sustainable growth. 
          At the Digital Marketing TenX blog, we are dedicated to bringing you the most actionable, data-driven strategies from industry experts. 
          Whether you are looking to boost your organic search rankings, optimize your Google Ads campaigns, or build a loyal audience on social media, 
          our comprehensive guides and expert insights have you covered.
        </p>
        <p style={{ marginBottom: "16px", fontSize: "1.1rem" }}>
          Our mission is to decode the complexities of digital marketing and provide you with clear, step-by-step tutorials that yield measurable results. 
          We understand that every business is unique, which is why our articles cover a wide range of topics—from local SEO techniques tailored for specific cities, 
          to broader performance marketing strategies designed for e-commerce scaling. By reading our blog, you will gain exclusive insights into the algorithms that power search engines, 
          social media networks, and online advertising platforms, empowering you to make informed decisions that drive qualified traffic and maximize your Return on Investment (ROI).
        </p>
        <p style={{ fontSize: "1.1rem" }}>
          We also focus on emerging technologies like AI marketing, automation, and advanced data analytics, ensuring that your business is always prepared for the future. 
          Bookmark this page and subscribe to our newsletter to ensure you never miss out on our latest content. Dive into our expertly crafted articles, 
          explore detailed case studies, and discover the tools you need to stay ahead of the competition. Let Digital Marketing TenX be your trusted 
          companion on the journey to digital excellence.
        </p>
      </section>

      <RelatedServices />
      <CTA />
    

      </main>
  );
}

