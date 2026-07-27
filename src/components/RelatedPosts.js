import ArticleCard from "./ArticleCard";

export default function RelatedPosts({ posts = [] }) {
  if (!posts.length) return null;

  return (
    <section className="related-posts">
      <h2>Related Posts</h2>
      <div className="related-grid">
        {posts.slice(0, 6).map((p) => (
          <ArticleCard key={p.id} article={p} compact />
        ))}
      </div>
    </section>
  );
}
