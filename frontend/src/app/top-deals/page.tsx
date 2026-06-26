"use client";

import React from 'react';
import Link from 'next/link';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import QuickView from '../../components/QuickView/QuickView';
import { ChevronRight } from 'lucide-react';
import styles from './top-deals.module.css';

interface DealCategory {
  name: string;
  imageUrl: string;
  link: string;
}

const DEALS_CATEGORIES: DealCategory[] = [
  {
    name: 'Diamond Ring',
    imageUrl: '/images/featured_ring_1.png',
    link: '/shop?subcategory=Diamond Rings'
  },
  {
    name: 'Hoops Earring',
    imageUrl: '/images/products/earrings_hoop_1.png',
    link: '/shop?subcategory=Hoops Earring'
  },
  {
    name: 'Studs Earring',
    imageUrl: '/images/featured_earring_1.png',
    link: '/shop?subcategory=Mamuli Earring'
  },
  {
    name: 'Antique Bangle',
    imageUrl: '/images/featured_bangle_1.png',
    link: '/shop?subcategory=Antique Bangle'
  },
  {
    name: 'Drops Earring',
    imageUrl: '/images/category_drops_earring.png',
    link: '/shop?subcategory=Drops Earring'
  },
  {
    name: 'Gold Rings',
    imageUrl: '/images/category_rose_gold_rings.png',
    link: '/shop?subcategory=Gold Rings'
  },
  {
    name: 'Choker',
    imageUrl: '/images/category_flower_necklace.png',
    link: '/shop?subcategory=Choker'
  },
  {
    name: 'Rose Gold Ring',
    imageUrl: '/images/category_cocktail_rings.png',
    link: '/shop?subcategory=Rose Gold Rings'
  }
];

export default function TopDealsPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Header component */}
      <Header />

      {/* Main content flow */}
      <main style={{ flex: '1', backgroundColor: '#FFFFFF' }}>
        
        {/* Banner with Breadcrumb */}
        <section className={styles.shopBanner}>
          <div className={styles.bannerOverlay}>
            <div className={styles.bannerContent}>
              <nav className={styles.breadcrumb} aria-label="Breadcrumb">
                <Link href="/">Home</Link>
                <ChevronRight size={12} className={styles.separator} />
                <span className={styles.activeCrumb}>Top Deals</span>
              </nav>
              <h1 className={styles.bannerTitle}>Top Deals</h1>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.titleSection}>
              <h2 className={styles.mainTitle}>Shop By</h2>
            </div>
            
            <div className={styles.grid}>
              {DEALS_CATEGORIES.map((category, idx) => (
                <Link 
                  href={category.link} 
                  key={`${category.name}-${idx}`} 
                  className={styles.card}
                >
                  <div className={styles.imageWrapper}>
                    <img 
                      src={category.imageUrl} 
                      alt={category.name} 
                      className={styles.cardImage} 
                    />
                  </div>
                  <div className={styles.info}>
                    <h3 className={styles.label}>{category.name}</h3>
                    <span className={styles.exploreLink}>Explore Collection</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* Footer component */}
      <Footer />

      {/* Floating detail view dialog */}
      <QuickView />
    </div>
  );
}
