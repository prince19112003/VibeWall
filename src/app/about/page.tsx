'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar/Navbar';
import styles from './about.module.css';

export default function AboutPage() {
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

          <section className={styles.hero}>
            <h1 className={styles.title}>
              About <span className="gradient-text">VibeWalls</span>
            </h1>
            <p className={styles.subtitle}>
              We are a premium, community-driven wallpaper platform celebrating creators, digital art, and aesthetic workspaces.
            </p>
          </section>

          <div className={styles.grid}>
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>Our Vision</h2>
              <p className={styles.cardText}>
                VibeWalls was founded on the idea that our digital environments reflect our inner creative space. Your screens deserve to be customized with artwork that truly inspires you.
              </p>
              <p className={styles.cardText}>
                We empower artists by giving them a premium home to display their work, build global fanbases, and earn direct support.
              </p>
            </div>

            <div className={styles.card}>
              <h2 className={styles.cardTitle}>Why VibeWalls?</h2>
              <p className={styles.cardText}>
                ✦ <strong>Zero Compression:</strong> We believe in original quality. All wallpapers are served in true 4K and 8K resolution.
              </p>
              <p className={styles.cardText}>
                ✦ <strong>Live Mockups:</strong> Test any wallpaper on phone and desktop mockups instantly inside the web page before downloading.
              </p>
              <p className={styles.cardText}>
                ✦ <strong>Weekly Contests:</strong> Cast your votes in live weekly community tournaments to reward the finest art.
              </p>
            </div>
          </div>

          <section className={styles.teamSection}>
            <h2 className={styles.sectionTitle}>Meet the Founders</h2>
            <div className={styles.teamGrid}>
              <div className={styles.memberCard}>
                <div className={styles.memberAvatar}>👑</div>
                <h3 className={styles.memberName}>Prince</h3>
                <p className={styles.memberRole}>Co-Founder & Lead Developer</p>
              </div>

              <div className={styles.memberCard}>
                <div className={styles.memberAvatar}>🎨</div>
                <h3 className={styles.memberName}>Saksham</h3>
                <p className={styles.memberRole}>Co-Founder & UI/UX Director</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
