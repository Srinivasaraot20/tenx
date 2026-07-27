import Link from "next/link";

export default function BlogCategories({ categories = [], onSelect }) {
  return (
    <section className="blog-categories-section">
      <div className="section-header">
        <h2>Browse by Category</h2>
        <p>Explore expert insights across digital marketing, business strategy, and digital services.</p>
      </div>
      <div className="blog-categories-grid">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            className="category-card"
            onClick={() => onSelect?.(cat.name)}
          >
            <span className="category-icon">{cat.icon}</span>
            <h3>{cat.name}</h3>
            <p>{cat.description}</p>
            <span className="category-count">{cat.count} articles</span>
          </button>
        ))}
      </div>
    </section>
  );
}
