"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import styles from './faqs.module.css';

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const faqData = [
    {
      question: "How can you help?",
      answer: "We offer bespoke design services for engagement rings and fine jewelry. You can collaborate with our master gemologists to select custom diamonds, metals, and settings to create your perfect piece."
    },
    {
      question: "What is a return policy?",
      answer: "We offer a 30-day complimentary return or exchange window for all unworn jewelry items in their original packaging, accompanied by their certification. Please note that custom-designed pieces and engraved items are final sale."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, Express), PayPal, Apple Pay, Google Pay, and bank wire transfers. We also offer flexible financing options through Affirm."
    },
    {
      question: "Do you sell gift cards?",
      answer: "Yes, we offer both digital and physical gift cards ranging from $50 to $2,000. Digital gift cards are delivered immediately via email, while physical cards are shipped in our signature gift box."
    },
    {
      question: "Are your diamonds ethically sourced?",
      answer: "Absolutely. All SD Trends diamonds are 100% ethically sourced in strict compliance with the Kimberley Process, ensuring they are conflict-free. We provide GIA or IGI certifications with all solitaire pieces."
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />

      <main style={{ flex: '1' }}>
        {/* Breadcrumb Banner */}
        <section className={styles.banner}>
          <div className={styles.bannerOverlay}></div>
          <div className={styles.bannerContent}>
            <div className={styles.breadcrumb}>
              <Link href="/">Home</Link> / <span>FAQs</span>
            </div>
            <h1 className={styles.bannerTitle}>FAQs</h1>
          </div>
        </section>

        {/* Main FAQ Content Grid */}
        <section className={styles.mainSection}>
          <div className="container">
            <div className={styles.grid}>
              
              {/* Left Column: Heading & Illustration */}
              <div className={styles.leftColumn}>
                <span className={styles.subtitle}>FAQs</span>
                <h2 className={styles.title}>Frequently Asked Question</h2>
                <p className={styles.description}>
                  Have questions about our fine jewelry? Find answers to frequently asked questions about orders, shipping, customization, and care.
                </p>
                <div className={styles.illustrationWrapper}>
                  <img 
                    src="/images/faq_illustration.png" 
                    alt="FAQ Illustration" 
                    className={styles.illustration}
                  />
                </div>
              </div>

              {/* Right Column: FAQ List */}
              <div className={styles.rightColumn}>
                {faqData.map((faq, index) => {
                  const isOpen = openIndex === index;
                  return (
                    <div key={index} className={styles.faqItem}>
                      <button 
                        className={styles.faqQuestionButton}
                        onClick={() => toggleIndex(index)}
                        aria-expanded={isOpen}
                      >
                        <h3 className={styles.faqQuestion}>{faq.question}</h3>
                        <span className={styles.faqIcon}>
                          {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                        </span>
                      </button>
                      
                      <div className={`${styles.faqAnswerWrapper} ${isOpen ? styles.answerOpen : ''}`}>
                        <p className={styles.faqAnswer}>{faq.answer}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
