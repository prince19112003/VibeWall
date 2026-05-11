'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import styles from './LivePreview.module.css';

interface LivePreviewProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  title: string;
}

export default function LivePreview({ isOpen, onClose, imageUrl, title }: LivePreviewProps) {
  const [device, setDevice] = useState<'mobile' | 'desktop'>('mobile');

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div 
            className={styles.modal}
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className={styles.header}>
              <div>
                <h3 className={styles.title}>Live Wallpaper Preview</h3>
                <p className={styles.subtitle}>{title}</p>
              </div>
              <button className={styles.closeBtn} onClick={onClose}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>

            {/* Device Switcher */}
            <div className={styles.switcher}>
              <button 
                className={`${styles.switchBtn} ${device === 'mobile' ? styles.active : ''}`}
                onClick={() => setDevice('mobile')}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>
                </svg>
                Mobile
              </button>
              <button 
                className={`${styles.switchBtn} ${device === 'desktop' ? styles.active : ''}`}
                onClick={() => setDevice('desktop')}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
                </svg>
                Desktop
              </button>
            </div>

            {/* Preview Area */}
            <div className={styles.previewArea}>
              <div className={`${styles.deviceFrame} ${styles[device]}`}>
                <div className={styles.screen}>
                  <Image 
                    src={imageUrl} 
                    alt="Wallpaper Preview" 
                    fill 
                    className={styles.previewImg} 
                    sizes={device === 'mobile' ? '300px' : '800px'}
                  />
                  
                  {/* Fake UI Overlays */}
                  {device === 'mobile' ? (
                    <div className={styles.mobileUI}>
                      <div className={styles.time}>12:45</div>
                      <div className={styles.date}>Monday, May 11</div>
                      <div className={styles.bottomBar} />
                    </div>
                  ) : (
                    <div className={styles.desktopUI}>
                      <div className={styles.dock}>
                        {[1,2,3,4,5].map(i => <div key={i} className={styles.dockIcon} />)}
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Physical details */}
                <div className={styles.bezel} />
                {device === 'mobile' && <div className={styles.notch} />}
              </div>
            </div>

            {/* Footer Actions */}
            <div className={styles.footer}>
              <button className="btn-primary" onClick={onClose} style={{ width: '100%', justifyContent: 'center' }}>
                Looks Great, Close Preview
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
