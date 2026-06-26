"use client";

import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Sun, Moon } from 'lucide-react';
import styles from './ThemeToggle.module.css';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useStore();

  return (
    <button 
      className={styles.themeSwitch} 
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
    >
      <div className={styles.switchContainer}>
        <div className={styles.thumb}>
          {theme === 'dark' ? (
            <Moon size={12} className={styles.thumbIcon} />
          ) : (
            <Sun size={12} className={styles.thumbIcon} />
          )}
        </div>
        <div className={styles.iconSlot}>
          {theme === 'dark' ? (
            <Sun size={14} className={styles.toggleIcon} />
          ) : (
            <Moon size={14} className={styles.toggleIcon} />
          )}
        </div>
      </div>
    </button>
  );
}
