'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './Preloader.module.css';

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 5 seconds to allow the full 'Legendary' animation to play out
    const timer = setTimeout(() => setLoading(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div 
          className={styles.overlay}
          key="loader"
          exit={{ 
            opacity: 0,
            filter: 'brightness(2) blur(20px)',
            transition: { duration: 1, ease: "easeInOut" } 
          }}
        >
          {/* 1. Gooey Liquid Blobs */}
          <div className={styles.liquidWrapper}>
            <div className={`${styles.blob} ${styles.purpleBlob}`} />
            <div className={`${styles.blob} ${styles.goldBlob}`} />
          </div>

          {/* 2. Legendary Shockwave */}
          <div className={styles.shockwave} />

          {/* 3. Reveal Flash */}
          <div className={styles.revealFlash} />

          {/* SVG Filter for the "Gooey" effect */}
          <svg style={{ display: 'none' }}>
            <defs>
              <filter id="goo">
                <feGaussianBlur in="SourceGraphic" stdDeviation="20" result="blur" />
                <feColorMatrix 
                  in="blur" 
                  mode="matrix" 
                  values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 30 -15" 
                  result="goo" 
                />
                <feComposite in="SourceGraphic" in2="goo" operator="atop" />
              </filter>
            </defs>
          </svg>
          
          <div className={styles.content}>
            {/* 4. Glass Shield for Logo */}
            <div className={styles.logoFrame}>
              <div className={styles.logoAura} />
              <Image 
                src="/brand-icon.png" 
                alt="VibeWalls" 
                width={160} 
                height={160} 
                priority
                className={styles.mainImg}
              />
            </div>

            {/* 5. Animated Energy Bar */}
            <div className={styles.progressBar}>
              <motion.div 
                className={styles.progressFill}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 4.5, ease: "easeInOut" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
