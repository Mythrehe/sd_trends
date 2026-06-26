"use client";

import React, { useState, useEffect } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import styles from './LatestProducts.module.css';

const LATEST_IDS = [
  "ring-solitaire",
  "ring-emerald",
  "ring-rose-gold",
  "ring-casual-thomas",
  "necklace-sapphire",
  "earrings-halo",
  "bracelet-tennis",
  "earrings-hoops"
];

const FALLBACK_PRODUCTS = [
  {
    id: "ring-solitaire",
    name: "Real Diamond Jewellery Gold Diamond Ring",
    category: "rings",
    price: 300,
    originalPrice: 660,
    priceRange: "$300 - $660",
    isNew: true,
    isBestSeller: true,
    isFeatured: true,
    rating: 4.0,
    reviewCount: 42,
    images: [
      "/images/products/ring_solitaire_1.png",
      "/images/products/ring_solitaire_2.png"
    ],
    description: "An exquisite round brilliant cut diamond claw-set in an elegant yellow gold band. A timeless symbol of your commitment."
  },
  {
    id: "ring-emerald",
    name: "The Sinead Ring 18kt Diamond Yellow Gold Ring",
    category: "rings",
    price: 250,
    originalPrice: 256,
    priceRange: "$250 - $256",
    isNew: true,
    isBestSeller: true,
    isFeatured: true,
    rating: 5.0,
    reviewCount: 18,
    images: [
      "/images/products/ring_emerald_1.png",
      "/images/products/ring_emerald_2.png"
    ],
    description: "Inspired by royal vintage aesthetics, this beautiful floral-shaped ring features a cluster of diamonds on an 18kt yellow gold leaf band."
  },
  {
    id: "ring-rose-gold",
    name: "Erina Solitaire Ring Kisna White Gold Ring",
    category: "rings",
    price: 280,
    originalPrice: 295,
    customBadge: "-5%",
    timer: "85d : 10h : 29m : 18s",
    isNew: true,
    isBestSeller: false,
    isFeatured: true,
    rating: 4.0,
    reviewCount: 29,
    images: [
      "/images/products/ring_rose_1.png",
      "/images/products/ring_rose_2.png"
    ],
    description: "A striking halo diamond stud setting on a split white gold shank. Modern luxury meets classical diamond jewelry."
  },
  {
    id: "ring-casual-thomas",
    name: "Casual Thomas Diamond Ring Yellow Gold",
    category: "rings",
    price: 140,
    originalPrice: 270,
    priceRange: "$140 - $270",
    customBadge: "-5%",
    isNew: true,
    isBestSeller: false,
    isFeatured: true,
    rating: 5.0,
    reviewCount: 14,
    images: [
      "/images/products/ring_casual_1.png",
      "/images/products/ring_casual_2.png"
    ],
    description: "A clean square-cluster diamond ring in solid gold for casual and everyday luxury."
  },
  {
    id: "necklace-sapphire",
    name: "Teardrop Royal Sapphire Pendant",
    category: "necklaces",
    price: 750,
    originalPrice: 850,
    rating: 4.6,
    reviewCount: 15,
    images: [
      "/images/products/necklace_sapphire_1.png",
      "/images/products/necklace_sapphire_2.png"
    ],
    description: "A deep blue teardrop sapphire sits inside a halo of round brilliant diamonds, suspended from a delicate 14k white gold cable chain."
  },
  {
    id: "earrings-halo",
    name: "Diamond Halo Stud Earrings",
    category: "earrings",
    price: 1150,
    originalPrice: 1350,
    rating: 4.9,
    reviewCount: 33,
    images: [
      "/images/products/earrings_halo_1.png",
      "/images/products/earrings_halo_2.png"
    ],
    description: "Timeless platinum stud earrings featuring two brilliant-cut center diamonds surrounded by a halo of micro-pave diamonds."
  },
  {
    id: "bracelet-tennis",
    name: "Luxury Diamond Tennis Bracelet",
    category: "bracelets",
    price: 3800,
    originalPrice: 4200,
    rating: 5.0,
    reviewCount: 19,
    images: [
      "/images/products/bracelet_tennis_1.png",
      "/images/products/bracelet_tennis_2.png"
    ],
    description: "A classic continuous line of individually claw-set round brilliant diamonds totaling 5 carats, set in a flexible 18k white gold bracelet."
  },
  {
    id: "earrings-hoops",
    name: "Gold Twist Hoop Earrings",
    category: "earrings",
    price: 450,
    originalPrice: 450,
    rating: 4.7,
    reviewCount: 51,
    images: [
      "/images/products/earrings_hoop_1.png",
      "/images/products/earrings_hoop_2.png"
    ],
    description: "Chic, everyday hoop earrings styled with a double-helix twist pattern in polished 18k yellow gold. Lightweight yet statement-making."
  }
];

export default function LatestProducts() {
  const [products, setProducts] = useState(FALLBACK_PRODUCTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('http://localhost:5000/api/products');
        if (res.ok) {
          const data = await res.json();
          // Filter to match only our 4 latest ring IDs in the exact order
          const filtered = LATEST_IDS.map(id => data.find(p => p.id === id)).filter(Boolean);
          if (filtered.length > 0) {
            setProducts(filtered);
          }
        }
      } catch (err) {
        console.error("Failed to fetch latest products, using fallback data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>Latest Products</h2>
          <p className={styles.subtitle}>
            There are many variations of passages of lorem Ipsum available
          </p>
        </div>
        <div className={styles.grid}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} hideBadges={true} />
          ))}
        </div>
      </div>
    </section>
  );
}
