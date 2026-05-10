'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import styles from './Preloader.module.css';

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div 
          className={styles.overlay}
          exit={{ 
            y: '-100%',
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
        >
          <div className={styles.content}>
            <motion.div 
              className={styles.logo}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className={styles.logoIcon}>
                <Image src="/icon.png" alt="VibeWalls" width={48} height={48} style={{ borderRadius: '12px' }} />
              </div>
              <h1 className={styles.logoText}>Vibe<span className="gradient-text">Walls</span></h1>
            </motion.div>
            
            <div className={styles.track}>
              <motion.div 
                className={styles.bar}
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            </div>
            <motion.p 
              className={styles.status}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              Curating Premium Walls...
            </motion.p>
          </div>
          
          {/* Decorative Rings */}
          <div className={styles.ring1} />
          <div className={styles.ring2} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
