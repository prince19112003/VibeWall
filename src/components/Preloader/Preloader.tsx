'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';
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
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ 
                opacity: 1, 
                scale: [1, 1.1, 1],
              }}
              transition={{ 
                opacity: { duration: 0.5 },
                scale: { repeat: Infinity, duration: 2, ease: "easeInOut" }
              }}
            >
              <div className={styles.logoIcon}>
                <Image src="/icon.png" alt="VibeWalls" width={120} height={120} style={{ borderRadius: '24px' }} />
              </div>
            </motion.div>
            
            <div className={styles.track}>
              <motion.div 
                className={styles.bar}
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            </div>
          </div>
          
          {/* Decorative Rings */}
          <div className={styles.ring1} />
          <div className={styles.ring2} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
