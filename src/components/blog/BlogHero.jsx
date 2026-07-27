import React from 'react';
import Image from 'next/image';
import styles from './BlogHero.module.css';

export default function BlogHero({ title, subtitle, backgroundImage }) {
  return (
    <section className={styles.hero} style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className={styles.overlay} />
      <div className={styles.content}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>
        <button className={styles.cta}>Explore Articles</button>
        <button className={styles.ctaSecondary}>Subscribe Newsletter</button>
      </div>
    </section>
  );
}
