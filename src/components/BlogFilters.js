"use client";

import { useState } from "react";
import * as gtag from "@/lib/gtag";

export default function BlogFilters({ categories = [], authors = [], tags = [], onChange }) {
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("");

  function update(field, value) {
    const next = { q, category, [field]: value };
    if (field === "q") setQ(value);
    if (field === "category") {
      // Toggle category off if clicked again
      const newValue = category === value ? "" : value;
      setCategory(newValue);
      next.category = newValue;
      
      gtag.event("blog_category_click", { category: newValue || "All" });
    }
    onChange?.(next);
  }

  return (
    <div className="blog-filters-premium">
      <div className="bf-search-container">
        <svg className="bf-search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
        </svg>
        <input
          aria-label="Search articles"
          className="bf-search-input"
          placeholder="Search by title, category, or tags..."
          value={q}
          onChange={(e) => update("q", e.target.value)}
        />
      </div>

      <div className="bf-categories-pills">
        <button
          className={`pill-btn ${category === "" ? "active" : ""}`}
          onClick={() => update("category", "")}
        >
          All
        </button>
        {categories.map((c) => (
          <button
            key={c}
            className={`pill-btn ${category === c ? "active" : ""}`}
            onClick={() => update("category", c)}
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}
