import Link from "next/link";

export default function ArticleTags({ tags = [] }) {
  if (!tags.length) return null;

  return (
    <div className="article-tags">
      <span className="tags-label">Tags:</span>
      {tags.map((tag) => (
        <Link key={tag} href={`/blog?tag=${encodeURIComponent(tag)}`} className="tag-pill">
          {tag}
        </Link>
      ))}
    </div>
  );
}
