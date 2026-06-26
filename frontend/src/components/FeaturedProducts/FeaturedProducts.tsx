"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Star } from 'lucide-react';
import styles from './FeaturedProducts.module.css';

interface FeaturedProductItem {
  id: string;
  name: string;
  priceRange: string;
  rating: number;
  imageUrl: string;
}

const FEATURED_PRODUCTS: FeaturedProductItem[] = [
  {
    id: 'featured-ring-1',
    name: 'The Sinead Ring 18kt Diamond Yellow Gold Ring',
    priceRange: '$250 – $256',
    rating: 4.0,
    imageUrl: '/images/featured_ring_1.png'
  },
  {
    id: 'featured-earring-1',
    name: 'Beautiful Diamond Ximena Earring Rose Gold',
    priceRange: '$140 – $230',
    rating: 4.0,
    imageUrl: '/images/featured_earring_1.png'
  },
  {
    id: 'featured-earring-2',
    name: 'Beautiful Diamond Stud Eulla Earring Rose Gold',
    priceRange: '$210 – $300',
    rating: 4.0,
    imageUrl: '/images/featured_earring_2.png'
  },
  {
    id: 'featured-bangle-1',
    name: 'Beautiful Diamond Gold Bangle',
    priceRange: '$190 – $210',
    rating: 4.0,
    imageUrl: '/images/featured_bangle_1.png'
  }
];

export default function FeaturedProducts() {
  const router = useRouter();

  const handleProductClick = (id: string) => {
    router.push(`/product/${id}`);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const floorRating = Math.floor(rating);
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          size={14}
          fill={i <= floorRating ? "var(--accent-gold)" : "none"}
          stroke="var(--accent-gold)"
        />
      );
    }
    return stars;
  };

  return (
    <section className={styles.section}>
      <div className="container">
        {/* Section Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>Featured Products</h2>
          <p className={styles.subtitle}>
            There are many variations of passages of lorem Ipsum available
          </p>
        </div>

        {/* Products Grid */}
        <div className={styles.grid}>
          {FEATURED_PRODUCTS.map((product) => (
            <div 
              key={product.id} 
              className={styles.card}
              onClick={() => handleProductClick(product.id)}
            >
              {/* Image Container */}
              <div className={styles.imageContainer}>
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className={styles.image} 
                />
              </div>

              {/* Product Info details */}
              <div className={styles.details}>
                <h3 className={styles.productName}>{product.name}</h3>
                
                <div className={styles.starsContainer}>
                  {renderStars(product.rating)}
                </div>
                
                <div className={styles.priceContainer}>
                  <span className={styles.price}>{product.priceRange}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
