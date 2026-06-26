"use client";

import React from 'react';
import { Truck, PiggyBank, Percent, Headphones } from 'lucide-react';
import styles from './Services.module.css';

const SERVICES = [
  {
    icon: <Truck size={36} strokeWidth={1.5} />,
    title: "Worldwide Shipping",
    desc: "For all Orders Over $100"
  },
  {
    icon: <PiggyBank size={36} strokeWidth={1.5} />,
    title: "Money Back Guarantee",
    desc: "Guarante With In 30 Days"
  },
  {
    icon: <Percent size={36} strokeWidth={1.5} />,
    title: "Offers And Discounts",
    desc: "Back Returns In 7 Days"
  },
  {
    icon: <Headphones size={36} strokeWidth={1.5} />,
    title: "24/7 Support Services",
    desc: "Contact us Anytime"
  }
];

export default function Services() {
  const [scrollProgress, setScrollProgress] = React.useState(0);
  const gridRef = React.useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (gridRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = gridRef.current;
      const totalScroll = scrollWidth - clientWidth;
      const progress = totalScroll > 0 ? (scrollLeft / totalScroll) * 100 : 0;
      setScrollProgress(progress);
    }
  };

  return (
    <section className={styles.section}>
      <div className="container">
        <div 
          ref={gridRef}
          onScroll={handleScroll}
          className={styles.grid}
        >
          {SERVICES.map((srv, idx) => (
            <div key={idx} className={styles.item}>
              <div className={styles.iconWrapper}>{srv.icon}</div>
              <div className={styles.info}>
                <h4 className={styles.title}>{srv.title}</h4>
                <p className={styles.desc}>{srv.desc}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Slider Progress Bar for Mobile */}
        <div className={styles.progressBarWrapper}>
          <div 
            className={styles.progressBar} 
            style={{ left: `${scrollProgress * 0.7}%` }} 
          />
        </div>
      </div>
    </section>
  );
}
