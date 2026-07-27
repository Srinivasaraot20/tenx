import ArticleDetail from "@/components/ArticleDetail";
import { ARTICLES } from "@/data/articles";
import { AUTHORS } from "@/data/authors";
import RelatedPosts from "@/components/RelatedPosts";
import Comments from "@/components/Comments";
import RelatedServices from "@/components/RelatedServices";
import CTA from "@/components/CTA";
import BlogEnquiryForm from "@/components/BlogEnquiryForm";
import {
  getArticleBySlug,
  getRelatedArticles,
  buildBlogPostingSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
  SITE_URL,
} from "@/lib/blog";
import "../article.css";

export async function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "Article Not Found" };

  return {
    title: article.metaTitle || article.title,
    description: article.metaDescription || article.summary,
    alternates: {
      canonical: `${SITE_URL}/blog/${article.slug}`,
    },
    openGraph: {
      title: article.metaTitle || article.title,
      description: article.metaDescription || article.summary,
      url: `${SITE_URL}/blog/${article.slug}`,
      type: "article",
      publishedTime: article.date,
      modifiedTime: article.updatedAt || article.date,
      authors: [article.author],
      images: [{ url: `${SITE_URL}${article.image}`, width: 1200, height: 630, alt: article.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.metaTitle || article.title,
      description: article.metaDescription || article.summary,
      images: [`${SITE_URL}${article.image}`],
    },
    keywords: article.tags,
  };
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return <main><p>Article not found.</p></main>;

  const author = AUTHORS.find((x) => x.id === article.authorId) || { name: article.author };
  const related = getRelatedArticles(article, 6);

  const schemas = [
    buildBlogPostingSchema(article, author),
    buildBreadcrumbSchema(article),
    buildFaqSchema(article.faqs),
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: article.title,
      description: article.summary,
      url: `${SITE_URL}/blog/${article.slug}`,
    },
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: author.name,
      jobTitle: author.role,
      description: author.bio,
      worksFor: { "@type": "Organization", name: "Digital Marketing TenX" },
    },
  ].filter(Boolean);

  return (
    <main className="blog-article-page">
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <ArticleDetail article={article} author={author} />

      <div className="article-supplement">
        <div className="article-supplement-main">
          <RelatedPosts posts={related} />
          <Comments articleId={article.id} />
        </div>
        <aside className="article-supplement-sidebar">
          <BlogEnquiryForm blogTitle={article.title} blogUrl={`${SITE_URL}/blog/${article.slug}`} />
        </aside>
      </div>

      <RelatedServices services={article.relatedServices} />
      <CTA />
    </main>
  );
}
