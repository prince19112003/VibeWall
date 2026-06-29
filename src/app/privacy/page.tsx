'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar/Navbar';
import styles from '../policy.module.css';

export default function PrivacyPage() {
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
            <h1 className={styles.title}>Privacy Policy</h1>
            <p className={styles.lastUpdated}>Last Updated: June 30, 2026</p>

            <div className={styles.section}>
              <p className={styles.text}>
                At VibeWalls, we respect your privacy and are committed to protecting any personal information you share with us. This Privacy Policy explains how we collect, use, and protect your data.
              </p>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>1. Information We Collect</h2>
              <p className={styles.text}>
                We collect information to provide a better community experience. This includes:
              </p>
              <ul className={styles.list}>
                <li className={styles.listItem}><strong>Account Information:</strong> If you sign in via Google OAuth, we receive your email, full name, and avatar URL.</li>
                <li className={styles.listItem}><strong>User Activity:</strong> Details of wallpapers you upload, download, like, or save to collections.</li>
                <li className={styles.listItem}><strong>Device Details:</strong> Anonymized metrics for device preview resolutions and platform performance.</li>
              </ul>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>2. How We Use Information</h2>
              <p className={styles.text}>
                Your data helps us personalize your feed, display artist stats accurately (like total download and like counts), and secure our systems from abuse (spam uploads or downloads).
              </p>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>3. Contact Us</h2>
              <p className={styles.text}>
                If you have any questions about this Privacy Policy, feel free to contact the VibeWalls team at support@vibewalls.co.
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
