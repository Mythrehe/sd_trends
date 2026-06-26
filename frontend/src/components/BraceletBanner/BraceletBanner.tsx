"use client";

import React from 'react';
import styles from './BraceletBanner.module.css';

export default function BraceletBanner() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.textBlock}>
            <span className={styles.subtitle}>Diamond Bracelets</span>
            <h2 className={styles.title}>
              Rose Gold With Diamond <br /> Hotsell Bracelet
            </h2>
            <a href="#featured-section" className={styles.link}>
              Shop Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
