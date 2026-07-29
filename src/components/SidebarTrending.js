import Link from "next/link";

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-IN", { month: "short", day: "numeric" });
}

function TrendList({ title, items }) {
  if (!items?.length) return null;
  return (
    <div className="trend-block">
      <h4>{title}</h4>
      <ul>
        {items.map((it) => (
          <li key={it.id} className="trend-item">
            <Link href={`/blog/${it.slug}`}>{it.title}</Link>
            <div className="trend-meta">
              {it.views?.toLocaleString()} views · {formatDate(it.date)}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function SidebarTrending({ data }) {
  return null;
}
