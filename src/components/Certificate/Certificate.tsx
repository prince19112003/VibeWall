'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from './Certificate.module.css';

interface CertificateProps {
  artistName: string;
  wallpaperTitle: string;
  rank: string;
  date: string;
  winnerId: string;
}

export default function Certificate({ 
  artistName = "Alex Rivera", 
  wallpaperTitle = "Neon Cityscape at Midnight", 
  rank = "Champion of the Week", 
  date = "May 2026",
  winnerId = "VW-2026-084"
}: CertificateProps) {
  return (
    <div className={styles.container}>
      {/* Background Aura / Flame Effect */}
      <div className={styles.flameAura} />
      
      <motion.div 
        className={styles.certificate}
        initial={{ opacity: 0, scale: 0.9, filter: 'brightness(0) blur(20px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'brightness(1) blur(0px)' }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Flame Particles */}
        <div className={styles.fireContainer}>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <motion.div 
              key={i}
              className={styles.spark}
              animate={{ 
                y: [-20, -100], 
                x: [0, (i % 2 === 0 ? 30 : -30)],
                opacity: [0, 1, 0],
                scale: [0, 1, 0]
              }}
              transition={{ 
                duration: 2 + (i * 0.3), 
                repeat: Infinity, 
                delay: i * 0.4 
              }}
            />
          ))}
        </div>

        {/* Static Premium Borders (Visible in Download) */}
        <div className={styles.goldFoilBorder} />
        <div className={styles.innerBorder} />
        
        {/* Content */}
        <div className={styles.content}>
          <div className={styles.header}>
            <div className={styles.logo}>
              <div className={styles.logoIcon}>
                <Image src="/brand-icon.png" alt="Logo" width={40} height={40} style={{ borderRadius: '8px' }} />
              </div>
              <span className={styles.logoText}>VibeWalls <span className={styles.official}>OFFICIAL</span></span>
            </div>
          </div>

          <div className={styles.mainBody}>
            <h4 className={styles.subTitle}>CERTIFICATE OF EXCELLENCE</h4>
            <div className={styles.dividerLine} />
            <h1 className={styles.presentedTo}>PROUDLY PRESENTED TO</h1>
            <h2 className={styles.artistName}>{artistName}</h2>
            
            <p className={styles.statement}>
              For achieving the title of <strong className={styles.highlight}>{rank}</strong> with the stunning wallpaper creation titled 
              <br />
              <span className={styles.wpTitle}>"{wallpaperTitle}"</span>
            </p>
          </div>

          <div className={styles.footer}>
            <div className={styles.signGroup}>
              <div className={styles.signature}>VibeWalls Team</div>
              <div className={styles.signLine} />
              <p className={styles.signLabel}>Authorized Curator</p>
            </div>

            <div className={styles.seal}>
              <div className={styles.sealInner}>
                <span className={styles.sealYear}>2026</span>
              </div>
            </div>

            <div className={styles.signGroup}>
              <div className={styles.id}>{winnerId}</div>
              <div className={styles.signLine} />
              <p className={styles.signLabel}>Certificate ID</p>
            </div>
          </div>
        </div>

        {/* Golden Shine Overlay (Animated but subtle) */}
        <div className={styles.shineOverlay} />
      </motion.div>

      {/* Action Buttons */}
      <motion.div 
        className={styles.actions}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <button className="btn-primary" onClick={() => window.print()}>
          📥 Download PDF / Print
        </button>
        <button className="btn-ghost">
          🔥 Share Victory
        </button>
      </motion.div>
    </div>
  );
}
