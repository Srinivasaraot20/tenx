import { ARTICLES } from "@/data/articles";
import { CATEGORIES } from "@/data/categories";

export const SITE_URL = "https://digitalmarketingtenx.com";

export function getArticleBySlug(slug) {
  return ARTICLES.find((a) => a.slug === slug);
}

export function getArticlesByCategory(category) {
  return ARTICLES.filter((a) => a.category === category);
}

export function getCategoryCount(categoryName) {
  return ARTICLES.filter((a) => a.category === categoryName).length;
}

export function getFeaturedArticle() {
  return ARTICLES.find((a) => a.featured) || ARTICLES[0];
}

export function getRelatedArticles(article, limit = 4) {
  return ARTICLES.filter(
    (a) =>
      a.id !== article.id &&
      (a.category === article.category ||
        a.tags?.some((t) => article.tags?.includes(t)))
  ).slice(0, limit);
}

export function getAuthorArticles(authorId, limit = 3) {
  return ARTICLES.filter((a) => a.authorId === authorId).slice(0, limit);
}

export function getAllTags() {
  const tags = new Set();
  ARTICLES.forEach((a) => a.tags?.forEach((t) => tags.add(t)));
  return [...tags].sort();
}

export function filterArticles(articles, filters = {}) {
  let items = [...articles];
  const q = (filters.q || "").toLowerCase().trim();

  if (q) {
    items = items.filter(
      (a) =>
        `${a.title} ${a.summary} ${a.tags?.join(" ") || ""}`
          .toLowerCase()
          .includes(q)
    );
  }
  if (filters.category) {
    items = items.filter((a) => a.category === filters.category);
  }
  if (filters.author) {
    items = items.filter((a) => a.author === filters.author);
  }
  if (filters.tag) {
    items = items.filter((a) => a.tags?.includes(filters.tag));
  }

  switch (filters.sort) {
    case "popular":
    case "views":
      items.sort((a, b) => (b.views || 0) - (a.views || 0));
      break;
    case "trending":
      items.sort((a, b) => (b.trendingScore || 0) - (a.trendingScore || 0));
      break;
    case "updated":
      items.sort(
        (a, b) =>
          new Date(b.updatedAt || b.date) - new Date(a.updatedAt || a.date)
      );
      break;
    case "reading":
      items.sort(
        (a, b) => parseInt(a.readingTime, 10) - parseInt(b.readingTime, 10)
      );
      break;
    default:
      items.sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  return items;
}

export function buildBlogPostingSchema(article, author) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    image: [`${SITE_URL}${article.image}`],
    datePublished: article.date,
    dateModified: article.updatedAt || article.date,
    author: {
      "@type": "Person",
      name: author?.name || article.author,
      jobTitle: author?.role,
    },
    publisher: {
      "@type": "Organization",
      name: "Digital Marketing TenX",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.webp`,
      },
    },
    description: article.summary,
    articleSection: article.category,
    keywords: article.tags?.join(", "),
    wordCount: article.wordCount,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${article.slug}`,
    },
  };
}

export function buildBreadcrumbSchema(article) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${SITE_URL}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: `${SITE_URL}/blog/${article.slug}`,
      },
    ],
  };
}

export function buildFaqSchema(faqs = []) {
  if (!faqs.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function getTrendingSidebar() {
  const byViews = [...ARTICLES].sort((a, b) => b.views - a.views).slice(0, 5);
  const editorsPick = ARTICLES.filter((a) => a.editorsPick).slice(0, 4);
  const popularWeek = [...ARTICLES]
    .sort((a, b) => b.trendingScore - a.trendingScore)
    .slice(0, 5);
  const newest = [...ARTICLES]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return { byViews, editorsPick, popularWeek, newest };
}

export function getCategoryCards() {
  return CATEGORIES.map((cat) => ({
    ...cat,
    count: getCategoryCount(cat.name),
  }));
}

