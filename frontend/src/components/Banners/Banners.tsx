"use client";

import React from 'react';
import styles from './Banners.module.css';

export default function Banners() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.grid}>
          {/* Left Column: Rings Banner */}
          <div className={`${styles.banner} ${styles.leftBanner}`}>
            <img 
              src="/images/banner_rings.png" 
              alt="Yellow Gold & Diamond Ring" 
              className={styles.image} 
            />
            <div className={`${styles.overlay} ${styles.alignRight}`}>
              <div className={styles.textBlock}>
                <span className={styles.subtitle}>Diamond Rings</span>
                <h3 className={styles.title}>
                  Yellow Gold & <br /> Diamond Ring
                </h3>
                <a href="#featured-section" className={styles.link}>
                  SHOP NOW
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Stacked Banners */}
          <div className={styles.rightStack}>
            {/* Top Right: Bracelet Banner */}
            <div className={`${styles.banner} ${styles.rightBannerTop}`}>
              <img 
                src="/images/banner_bracelet_684.png" 
                alt="Infinity Diamond Bracelet" 
                className={styles.image} 
              />
              <div className={`${styles.overlay} ${styles.alignRight}`}>
                <div className={styles.textBlock}>
                  <span className={styles.subtitle}>Diamond Bracelets</span>
                  <h3 className={styles.title}>
                    Infinity Diamond <br /> Bracelet
                  </h3>
                  <a href="#featured-section" className={styles.link}>
                    SHOP NOW
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom Right: Pendant Banner */}
            <div className={`${styles.banner} ${styles.rightBannerBottom}`}>
              <img 
                src="/images/banner_pendant.png" 
                alt="Teardrop Diamond Pendant" 
                className={styles.image} 
              />
              <div className={`${styles.overlay} ${styles.alignLeft}`}>
                <div className={styles.textBlock}>
                  <span className={styles.subtitle}>Diamond Pendant</span>
                  <h3 className={styles.title}>
                    Teardrop Diamond <br /> Pendant
                  </h3>
                  <a href="#featured-section" className={styles.link}>
                    SHOP NOW
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
