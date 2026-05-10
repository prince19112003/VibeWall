'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './Preloader.module.css';

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    // Generate particles only on client to avoid hydration mismatch
    const newParticles = [...Array(15)].map(() => ({
      delay: `${Math.random() * 2}s`,
      x: `${Math.random() * 100}%`,
      y: `${Math.random() * 100}%`
    }));
    setParticles(newParticles);

    const timer = setTimeout(() => setLoading(false), 3000);
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
            transition: { duration: 0.8, ease: "easeInOut" } 
          }}
        >
          {/* Energy Portal Background */}
          <div className={styles.portal} />
          <div className={styles.scanline} />
          
          <div className={styles.content}>
            {/* The Materializing Logo */}
            <motion.div 
              className={styles.logoContainer}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              transition={{ delay: 0.5, duration: 1, ease: [0.33, 1, 0.68, 1] }}
            >
              <motion.div 
                className={styles.logoFrame}
                animate={{ 
                  boxShadow: [
                    "0 0 20px rgba(245, 158, 11, 0.2)",
                    "0 0 60px rgba(245, 158, 11, 0.5)",
                    "0 0 20px rgba(245, 158, 11, 0.2)"
                  ]
                }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <Image 
                  src="/icon.png" 
                  alt="VibeWalls" 
                  width={150} 
                  height={150} 
                  priority
                  className={styles.mainImg}
                />
              </motion.div>
            </motion.div>

            {/* Unique Energy Bar */}
            <div className={styles.energyBarWrap}>
              <motion.div 
                className={styles.energyLevel}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 2.5, ease: "easeInOut" }}
              />
              <div className={styles.energyGlow} />
            </div>
          </div>

          {/* Sucking Particles Effect */}
          <div className={styles.vortex}>
            {particles.map((p, i) => (
              <div key={i} className={styles.particle} style={{
                '--delay': p.delay,
                '--x': p.x,
                '--y': p.y
              } as any} />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
