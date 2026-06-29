'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar/Navbar';
import styles from '../policy.module.css';

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.container}>
          <Link href="/" className={styles.backBtn}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12,19 5,12 12,5" />
            </svg>
            <span>Back to Home</span>
          </Link>

          <div className={styles.card}>
            <h1 className={styles.title}>Terms of Service</h1>
            <p className={styles.lastUpdated}>Last Updated: June 30, 2026</p>

            <div className={styles.section}>
              <p className={styles.text}>
                Welcome to VibeWalls. By accessing our platform, you agree to comply with and be bound by the following Terms of Service.
              </p>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>1. Upload Guidelines</h2>
              <p className={styles.text}>
                As an artist uploading content to VibeWalls:
              </p>
              <ul className={styles.list}>
                <li className={styles.listItem}>You must own the full copyright to the wallpaper or have explicit permission to distribute it.</li>
                <li className={styles.listItem}>You may not upload content that is illegal, offensive, violent, or violates third-party intellectual property.</li>
                <li className={styles.listItem}>Auto-approved testing files are subject to removal if they do not meet community standards.</li>
              </ul>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>2. Download License</h2>
              <p className={styles.text}>
                All wallpapers downloaded from VibeWalls are licensed for personal, non-commercial use on personal screens only. Redistribution or commercial resale is strictly prohibited.
              </p>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>3. Account Termination</h2>
              <p className={styles.text}>
                We reserve the right to suspend accounts or remove uploaded wallpapers at our discretion if terms are breached.
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
