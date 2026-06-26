"use client";

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './Testimonials.module.css';

const TESTIMONIALS = [
  {
    id: 1,
    title: "“Great Product Price Delivery Perfect”",
    quote: "The point of using lorem Ipsum is that it has a more is normal they always wash up well no matter how many versions of lorem Ipsum.",
    author: "Augusta Wind",
    role: "Founder",
    imageUrl: "/images/client_augusta.png"
  },
  {
    id: 2,
    title: "“Impressive Quality, & Reliable”",
    quote: "The point of using lorem Ipsum is that it has a more is normal they always wash up well no matter how many versions of lorem Ipsum.",
    author: "John Doe",
    role: "Manager",
    imageUrl: "/images/client_john.png"
  },
  {
    id: 3,
    title: "“Reliable Product, Consistently Delivers.”",
    quote: "The point of using lorem Ipsum is that it has a more is normal they always wash up well no matter how many versions of lorem Ipsum.",
    author: "Reema Ghurde",
    role: "CEO",
    imageUrl: "/images/client_reema.png"
  },
  {
    id: 4,
    title: "“Outstanding Service, Highly Recommend!”",
    quote: "The point of using lorem Ipsum is that it has a more is normal they always wash up well no matter how many versions of lorem Ipsum.",
    author: "Clara Nett",
    role: "VP of Operations",
    imageUrl: "/images/client_clara.png"
  },
  {
    id: 5,
    title: "“Exquisite Selection & Fast Delivery”",
    quote: "The point of using lorem Ipsum is that it has a more is normal they always wash up well no matter how many versions of lorem Ipsum.",
    author: "Albert Ross",
    role: "Director",
    imageUrl: "/images/client_albert.png"
  }
];

export default function Testimonials() {
  const [visibleCards, setVisibleCards] = useState(3);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleCards(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => 
      Math.min(prev + 1, TESTIMONIALS.length - visibleCards)
    );
  };

  const showArrows = TESTIMONIALS.length > visibleCards;

  return (
    <section className={styles.section}>
      <div className="container">
        {/* Section Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>What Our Clients Say</h2>
          <p className={styles.subtitle}>
            There are many variations of passages of lorem Ipsum available
          </p>
        </div>

        {/* Slider Wrapper */}
        <div className={styles.sliderWrapper}>
          {showArrows && (
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`${styles.arrowBtn} ${styles.prevBtn}`}
              aria-label="Previous Testimonial"
            >
              <ChevronLeft size={20} />
            </button>
          )}

          <div className={styles.viewport}>
            <div
              className={styles.track}
              style={{
                transform: `translateX(-${currentIndex * (100 / visibleCards)}%)`,
                width: `${(TESTIMONIALS.length / visibleCards) * 100}%`
              }}
            >
              {TESTIMONIALS.map((item) => (
                <div
                  key={item.id}
                  className={styles.cardWrapper}
                  style={{ width: `${100 / TESTIMONIALS.length}%` }}
                >
                  <div className={styles.card}>
                    <h3 className={styles.cardTitle}>{item.title}</h3>
                    <p className={styles.quoteText}>{item.quote}</p>
                    <div className={styles.authorBlock}>
                      <div className={styles.avatarWrapper}>
                        <img
                          src={item.imageUrl}
                          alt={item.author}
                          className={styles.avatar}
                        />
                      </div>
                      <div className={styles.authorInfo}>
                        <span className={styles.authorName}>{item.author}</span>
                        <span className={styles.authorRole}>{item.role}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {showArrows && (
            <button
              onClick={handleNext}
              disabled={currentIndex >= TESTIMONIALS.length - visibleCards}
              className={`${styles.arrowBtn} ${styles.nextBtn}`}
              aria-label="Next Testimonial"
            >
              <ChevronRight size={20} />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
