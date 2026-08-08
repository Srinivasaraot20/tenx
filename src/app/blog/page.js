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
    canonical: "https://www.digitalmarketingtenx.com/blog",
  },
  openGraph: {
    title: "Digital Marketing Blog | Digital Marketing TenX",
    description: "Read expert articles on SEO, Google Ads, AI marketing, website development, social media marketing, and business growth strategies.",
    type: "website",
    url: "https://www.digitalmarketingtenx.com/blog",
    images: [
      {
        url: "https://www.digitalmarketingtenx.com/images/blog-og.jpg",
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
    url: "https://www.digitalmarketingtenx.com/blog",
    publisher: {
      "@type": "Organization",
      name: "Digital Marketing TenX",
      logo: { "@type": "ImageObject", url: "https://www.digitalmarketingtenx.com/logo.webp" },
    },
    blogPost: ARTICLES.slice(0, 10).map((a) => ({
      "@type": "BlogPosting",
      headline: a.title,
      url: `https://www.digitalmarketingtenx.com/blog/${a.slug}`,
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
          <FeaturedArticle article={featured} />
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

      <RelatedServices />
      <CTA />
    

      </main>
  );
}

