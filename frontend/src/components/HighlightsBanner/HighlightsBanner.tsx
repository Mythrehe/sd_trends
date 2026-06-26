"use client";

import React from 'react';
import styles from './HighlightsBanner.module.css';

export default function HighlightsBanner() {
  return (
    <section className={styles.section}>
      <div className="container h-full">
        <div className={styles.content}>
          <div className={styles.textBlock}>
            <span className={styles.subtitle}>This Week’s Highlights</span>
            <h2 className={styles.title}>
              Drop Cut Blue Necklace <br /> With Earrings Set
            </h2>
            <p className={styles.description}>
              Awesome Products For The Dynamic Urban Lifestyle
            </p>
            <a href="#categories" className={styles.btn}>
              Shop Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
