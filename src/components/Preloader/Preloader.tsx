'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import styles from './Preloader.module.css';

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1200); // Faster splash screen (1.2 seconds)
    return () => clearTimeout(timer);
  }, [pathname]); // Re-trigger on route changes (back button, link clicks)

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div 
          className={styles.overlay}
          key="loader"
          exit={{ 
            opacity: 0,
            transition: { duration: 0.4, ease: "easeInOut" } 
          }}
        >
          {/* 1. Optimized Liquid Blobs */}
          <div className={styles.liquidWrapper}>
            <div className={`${styles.blob} ${styles.purpleBlob}`} />
            <div className={`${styles.blob} ${styles.goldBlob}`} />
          </div>

          {/* 2. Optimized Shockwave */}
          <div className={styles.shockwave} />

          {/* 3. Reveal Flash */}
          <div className={styles.revealFlash} />

          {/* SVG Filter: Optimized stdDeviation for Butter-Smooth performance */}
          <svg style={{ visibility: 'hidden', position: 'absolute', width: 0, height: 0 }}>
            <defs>
              <filter id="goo">
                <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                <feColorMatrix 
                  in="blur" 
                  mode="matrix" 
                  values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" 
                  result="goo" 
                />
                <feComposite in="SourceGraphic" in2="goo" operator="atop" />
              </filter>
            </defs>
          </svg>
          
          <div className={styles.content}>
            {/* 4. Optimized Logo Frame */}
            <div className={styles.logoFrame}>
              <div className={styles.logoAura} />
              <Image 
                src="/brand-icon.png" 
                alt="VibeWalls" 
                width={140} 
                height={140} 
                priority
                className={styles.mainImg}
              />
            </div>

            {/* 5. Progress Bar */}
            <div className={styles.progressBar}>
              <motion.div 
                className={styles.progressFill}
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.9, ease: "easeInOut" }} // Faster progress bar fill
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
