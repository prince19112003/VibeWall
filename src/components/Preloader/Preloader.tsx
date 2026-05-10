'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './Preloader.module.css';

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div 
          className={styles.overlay}
          exit={{ 
            opacity: 0,
            scale: 1.1,
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
        >
          {/* Animated Background Elements */}
          <div className={styles.noise} />
          <div className={styles.nebula} />
          
          <div className={styles.content}>
            <motion.div 
              className={styles.logoWrapper}
              initial={{ opacity: 0, scale: 0.5, rotateY: -30 }}
              animate={{ 
                opacity: 1, 
                scale: [1, 1.05, 1],
                rotateY: [0, 5, 0],
                y: [0, -10, 0]
              }}
              transition={{ 
                opacity: { duration: 0.8 },
                scale: { repeat: Infinity, duration: 4, ease: "easeInOut" },
                rotateY: { repeat: Infinity, duration: 3, ease: "easeInOut" },
                y: { repeat: Infinity, duration: 5, ease: "easeInOut" }
              }}
            >
              <div className={styles.logoGlow} />
              <div className={styles.logoIcon}>
                <Image 
                  src="/icon.png" 
                  alt="VibeWalls" 
                  width={140} 
                  height={140} 
                  priority
                  className={styles.mainImg}
                />
              </div>
            </motion.div>

            {/* Minimal Progress Bar */}
            <div className={styles.progressTrack}>
              <motion.div 
                className={styles.progressBar}
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 2.2, ease: "circIn" }}
              />
            </div>
          </div>

          {/* Floating Particles (CSS only for performance) */}
          <div className={styles.particles}>
            {[...Array(12)].map((_, i) => (
              <div key={i} className={styles.particle} />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
