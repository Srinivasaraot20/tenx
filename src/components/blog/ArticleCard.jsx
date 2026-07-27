import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './ArticleCard.module.css';

export default function ArticleCard({ article }) {
  const { slug, title, excerpt, featured_image, category, views, published_at } = article;
  return (
    <Link href={`/blog/${slug}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        {featured_image && (
          <Image src={featured_image} alt={title} width={400} height={250} className={styles.image} />
        )}
      </div>
      <div className={styles.content}>
        <span className={styles.category}>{category}</span>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.excerpt}>{excerpt}</p>
        <div className={styles.meta}>
          <span>{new Date(published_at).toLocaleDateString()}</span>
          <span>{views} views</span>
        </div>
      </div>
    </Link>
  );
}
