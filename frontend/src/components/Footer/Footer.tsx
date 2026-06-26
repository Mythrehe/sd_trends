"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Moon, Sun, ChevronUp, MapPin, Phone, Mail } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import styles from './Footer.module.css';

export default function Footer() {
  const { theme, toggleTheme } = useStore();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<{ success: boolean | null; message: string }>({ success: null, message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setStatus({ success: false, message: 'Please enter a valid email address.' });
      return;
    }

    setLoading(true);
    setStatus({ success: null, message: '' });

    try {
      const res = await fetch('http://localhost:5000/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await res.json();
      if (res.ok) {
        setStatus({ success: true, message: data.message });
        setEmail('');
      } else {
        setStatus({ success: false, message: data.error || 'Subscription failed.' });
      }
    } catch (err) {
      console.error(err);
      setStatus({ success: false, message: 'Server is currently offline. Please try again later.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer id="newsletter" className={styles.footer}>
      {/* Upper Newsletter Subscription */}
      <div className={styles.newsletterSection}>
        <div className={styles.newsletterContainer}>
          <div className={styles.newsletterLeft}>
            <h2 className={styles.newsTitle}>Subscribe To Our Newsletter</h2>
            <p className={styles.newsSubtitle}>
              Subscribe to our latest newsletter to get news about special discounts.
            </p>
            <form className={styles.form} onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder="Email"
                className={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                required
              />
              <button 
                type="submit" 
                className={styles.subBtn}
                disabled={loading}
              >
                {loading ? 'SUBSCRIBING...' : 'SUBSCRIBE'}
              </button>
            </form>

            {status.success === true && (
              <p className={styles.successMsg}>{status.message}</p>
            )}
            {status.success === false && (
              <p className={styles.errorMsg}>{status.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Lower Footer Content */}
      <div className="container">
        <div className={styles.lowerFooterContent}>
          {/* Middle Columns */}
          <div className={styles.columns}>
            {/* Column 1: About Our Store */}
            <div className={styles.col}>
              <h3 className={styles.colTitle}>About Our Store</h3>
              <p className={styles.aboutText}>
                Welcome to our store, where we pride ourselves on provuding exceptional products and unparalleled customer service our store style, and innovation
              </p>
              <div className={styles.appBadges}>
                <a href="#app-store" className={styles.appBadgeBtn} onClick={(e) => e.preventDefault()}>
                  <svg className={styles.appIcon} viewBox="0 0 24 24" width="16" height="16">
                    <path fill="currentColor" d="M18.71,19.5C17.88,20.74,17,21.95,15.66,22c-1.31.05-1.72-.73-3.22-.73s-2,.71-3.25.75c-1.35.05-2.31-1.28-3.15-2.5C4.38,17,3.12,12.06,4.8,9.15c.84-1.45,2.32-2.37,3.94-2.4s3.15,1.12,4.14,1.12,2.15-1.12,4.52-1c1,.05,3.77.41,5.55,3a10.62,10.62,0,0,1-3.21,5.27A7.12,7.12,0,0,0,22,20.25a.25.25,0,0,1-.25.25A7.54,7.54,0,0,1,18.71,19.5M15.94,4.17A5.07,5.07,0,0,0,17.2,1a.26.26,0,0,0-.29-.29,5.2,5.2,0,0,0-3.32,1.75,4.8,4.8,0,0,0-1.29,3.11c0,.22.06.27.24.27A5.25,5.25,0,0,0,15.94,4.17Z"/>
                  </svg>
                  <div className={styles.appBtnTexts}>
                    <span className={styles.appBtnSub}>Download on the</span>
                    <span className={styles.appBtnMain}>App Store</span>
                  </div>
                </a>
                <a href="#google-play" className={styles.appBadgeBtn} onClick={(e) => e.preventDefault()}>
                  <svg className={styles.appIcon} viewBox="0 0 24 24" width="16" height="16">
                    <path fill="currentColor" d="M3,5.27V18.73a1,1,0,0,0,1.57.82l10.9-7.27a1,1,0,0,0,0-1.64L4.57,4.45A1,1,0,0,0,3,5.27ZM17.15,12l-1.92,1.28L13.12,12l2.11-1.28ZM20.73,11.18,18.84,10l-1.92,1.28,1.92,1.28,1.89-1.18A1,1,0,0,0,20.73,11.18Z"/>
                  </svg>
                  <div className={styles.appBtnTexts}>
                    <span className={styles.appBtnSub}>ANDROID APP ON</span>
                    <span className={styles.appBtnMain}>Google Play</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className={styles.col}>
              <h3 className={styles.colTitle}>Quick Links</h3>
              <ul className={styles.linksList}>
                <li><Link href="/contact-us">Contact Us</Link></li>
                <li><a href="#" onClick={(e) => e.preventDefault()}>Shipping</a></li>
                <li><a href="#" onClick={(e) => e.preventDefault()}>Sitemap</a></li>
                <li><Link href="/faqs">FAQs</Link></li>
                <li><a href="#" onClick={(e) => e.preventDefault()}>Store Us</a></li>
                <li><a href="#" onClick={(e) => e.preventDefault()}>About Us</a></li>
              </ul>
            </div>

            {/* Column 3: Services */}
            <div className={styles.col}>
              <h3 className={styles.colTitle}>Services</h3>
              <ul className={styles.linksList}>
                <li><a href="#" onClick={(e) => e.preventDefault()}>Order Status</a></li>
                <li><a href="#" onClick={(e) => e.preventDefault()}>Terms Conditions</a></li>
                <li><a href="#" onClick={(e) => e.preventDefault()}>Policy For Sellers</a></li>
                <li><a href="#" onClick={(e) => e.preventDefault()}>Policy For Buyers</a></li>
                <li><a href="#" onClick={(e) => e.preventDefault()}>Shipping & Refund</a></li>
                <li><a href="#" onClick={(e) => e.preventDefault()}>Wholesale Policy</a></li>
              </ul>
            </div>

            {/* Column 4: Your Account */}
            <div className={styles.col}>
              <h3 className={styles.colTitle}>Your Account</h3>
              <ul className={styles.linksList}>
                <li><a href="#" onClick={(e) => e.preventDefault()}>Checkout</a></li>
                <li><a href="#" onClick={(e) => e.preventDefault()}>Press</a></li>
                <li><a href="#" onClick={(e) => e.preventDefault()}>Careers</a></li>
                <li><a href="#" onClick={(e) => e.preventDefault()}>Delivery</a></li>
                <li><a href="#" onClick={(e) => e.preventDefault()}>Service</a></li>
                <li><a href="#" onClick={(e) => e.preventDefault()}>Sitemap</a></li>
              </ul>
            </div>

            {/* Column 5: Contact Us */}
            <div className={styles.col}>
              <h3 className={styles.colTitle}>Contact Us</h3>
              <ul className={styles.contactDetailsList}>
                <li className={styles.contactItem}>
                  <MapPin size={16} className={styles.contactIcon} />
                  <span>60 29th Street San Francisco, 507- Union Trade Center, United States America - 94110</span>
                </li>
                <li className={styles.contactItem}>
                  <Phone size={16} className={styles.contactIcon} />
                  <span>(+91) 0123-456-789</span>
                </li>
                <li className={styles.contactItem}>
                  <Phone size={16} className={styles.contactIcon} />
                  <span>(+91) 9876-543-210</span>
                </li>
                <li className={styles.contactItem}>
                  <Mail size={16} className={styles.contactIcon} />
                  <span>demo@example.com</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className={styles.bottomBar}>
            {/* Theme Toggle (Pill Capsule Switcher) */}
            <div className={styles.themeToggleWrapper}>
              <button 
                onClick={toggleTheme} 
                className={styles.themeSwitch}
                aria-label="Switch Theme Mode"
              >
                <div className={`${styles.switchHandle} ${theme === 'dark' ? styles.switchDark : styles.switchLight}`}>
                  {theme === 'dark' ? <Moon size={12} fill="currentColor" /> : <Sun size={12} fill="currentColor" />}
                </div>
              </button>
            </div>

            {/* Scroll to Top Terracotta Button */}
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className={styles.scrollToTop}
              aria-label="Scroll to Top"
            >
              <ChevronUp size={20} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
