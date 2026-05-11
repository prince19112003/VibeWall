'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar/Navbar';
import WallpaperCard from '@/components/WallpaperCard/WallpaperCard';
import TournamentSection from '@/components/Tournament/TournamentSection';
import LivePreview from '@/components/LivePreview/LivePreview';
import { CATEGORIES } from '@/lib/mockData';
import { getWallpapers, type Wallpaper } from '@/lib/api';
import styles from './page.module.css';

// Feature 4: Pick "Wallpaper of the Day" — deterministic using today's date
function getDailyWallpaper() {
  const today = new Date();
  const dayIndex = (today.getFullYear() * 365 + today.getMonth() * 30 + today.getDate()) % MOCK_WALLPAPERS.length;
  return MOCK_WALLPAPERS[dayIndex];
}

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState<'trending' | 'newest' | 'downloads'>('trending');
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>([]);
  const [dailyWall, setDailyWall] = useState<Wallpaper | null>(null);
  const [previewWall, setPreviewWall] = useState<Wallpaper | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const data = await getWallpapers();
      setWallpapers(data);
      
      if (data.length > 0) {
        // Deterministic Daily Vibe from real data
        const today = new Date();
        const index = (today.getFullYear() * 365 + today.getMonth() * 30 + today.getDate()) % data.length;
        setDailyWall(data[index]);
      }
      setLoading(false);
    }
    loadData();
  }, []);

  const filtered = useMemo(() => {
    let list = activeCategory === 'all'
      ? wallpapers
      : wallpapers.filter(w => w.category === activeCategory);

    if (sortBy === 'downloads') list = [...list].sort((a, b) => (b.downloads || 0) - (a.downloads || 0));
    if (sortBy === 'trending') list = [...list].sort((a, b) => (b.likes || 0) - (a.likes || 0));
    return list;
  }, [activeCategory, sortBy, wallpapers]);

  return (
    <>
      <Navbar />

      <main className={styles.main}>
        {/* ============ HERO ============ */}
        <section className={styles.hero} aria-label="Hero section">
          <div className="container">
            <motion.div className={styles.heroContent}
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
              <motion.div className={styles.heroBadge}
                initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}>
                <span className={styles.heroBadgeDot} aria-hidden="true" />
                Community-Driven Wallpaper Platform
              </motion.div>

              <motion.h1 className={styles.heroTitle}
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
                Discover Walls That
                <br />
                <span className="gradient-text">Speak Your Vibe</span>
              </motion.h1>

              <motion.p className={styles.heroSubtitle}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.6 }}>
                Explore millions of stunning 4K &amp; 8K wallpapers crafted by the world&apos;s best artists.
                Download free, upload yours, and build your perfect aesthetic.
              </motion.p>

              <motion.div className={styles.heroActions}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}>
                <button className="btn-primary" id="hero-explore"
                  onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                  </svg>
                  <span>Explore Wallpapers</span>
                </button>
                <a href="/upload" className="btn-ghost" id="hero-upload">Upload Your Art</a>
              </motion.div>

              {/* Stats */}
              <motion.div className={styles.heroStats}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }} aria-label="Platform statistics">
                {[
                  { value: '50K+', label: 'Wallpapers' },
                  { value: '8K', label: 'Max Resolution' },
                  { value: '120K+', label: 'Artists' },
                  { value: '2M+', label: 'Downloads' },
                ].map(stat => (
                  <div className={styles.statItem} key={stat.label}>
                    <span className={styles.statValue}>{stat.value}</span>
                    <span className={styles.statLabel}>{stat.label}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div className={styles.scrollIndicator}
            animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12l7 7 7-7"/>
            </svg>
          </motion.div>
        </section>

        {/* ============ FEATURE 4: DAILY VIBE ============ */}
        <section className={styles.dailySection} aria-label="Wallpaper of the day">
          <div className="container">
            {dailyWall && (
              <motion.div
                className={styles.dailyCard}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7 }}
              >
                {/* Background image */}
                <div className={styles.dailyBg}>
                  <Image 
                    src={dailyWall.preview_url || dailyWall.original_url} 
                    alt="" 
                    fill 
                    className={styles.dailyBgImg} 
                    aria-hidden="true" 
                    sizes="100vw"
                    priority
                  />
                  <div className={styles.dailyOverlay} />
                </div>

                <div className={styles.dailyContent}>
                  <div className={styles.dailyBadge}>
                    <span className={styles.dailyDot} />
                    ✦ Vibe of the Day
                  </div>
                  <h2 className={styles.dailyTitle}>{dailyWall.title}</h2>
                  <p className={styles.dailyArtist}>by {dailyWall.artist?.username || 'VibeWalls Artist'}</p>
                  <div className={styles.dailyStats}>
                    <span>⬇ {dailyWall.downloads.toLocaleString()}</span>
                    <span>♥ {dailyWall.likes.toLocaleString()}</span>
                    <span>📐 {dailyWall.resolution}</span>
                  </div>
                  <div className={styles.dailyActions}>
                    <Link href={`/wallpaper/${dailyWall.id}`} className="btn-primary" id="daily-view">
                      View &amp; Download
                    </Link>
                    <button className="btn-ghost" onClick={() => setPreviewWall(dailyWall)}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>
                      </svg>
                      Live Preview
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </section>

        <div id="tournament">
          <TournamentSection />
        </div>

        {/* ============ GALLERY SECTION ============ */}
        <section className={styles.gallerySection} id="gallery" aria-label="Wallpaper gallery">
          <div className="container">
            {/* Controls Row */}
            <div className={styles.controls}>
              <div className={styles.categoryScroll} role="tablist" aria-label="Filter by category">
                {CATEGORIES.map((cat, i) => (
                  <motion.button key={cat.id}
                    className={`pill ${activeCategory === cat.id ? 'active' : ''}`}
                    onClick={() => setActiveCategory(cat.id)} role="tab"
                    aria-selected={activeCategory === cat.id} id={`cat-${cat.id}`}
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.4 }}
                    whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                    <span aria-hidden="true">{cat.icon}</span>{cat.label}
                  </motion.button>
                ))}
              </div>

              {/* Sort */}
              <div className={styles.sortRow}>
                <span className={styles.sortLabel}>Sort:</span>
                {(['trending', 'newest', 'downloads'] as const).map(s => (
                  <button key={s}
                    className={`${styles.sortBtn} ${sortBy === s ? styles.sortActive : ''}`}
                    onClick={() => setSortBy(s)} id={`sort-${s}`} aria-pressed={sortBy === s}>
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Results count */}
            <motion.p className={styles.resultsCount} key={activeCategory}
              initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }} aria-live="polite">
              Showing <strong>{filtered.length}</strong> wallpapers
              {activeCategory !== 'all' && ` in ${CATEGORIES.find(c => c.id === activeCategory)?.label}`}
            </motion.p>

            {/* Masonry Grid */}
            <AnimatePresence mode="wait">
              <motion.div key={activeCategory} className={styles.masonryGrid}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }} role="feed" aria-label="Wallpaper grid">
                {filtered.map((wallpaper, index) => (
                  <WallpaperCard 
                    key={wallpaper.id} 
                    wallpaper={wallpaper} 
                    index={index} 
                    onPreview={setPreviewWall}
                  />
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Load More */}
            <motion.div className={styles.loadMoreWrap} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              <button className="btn-ghost" id="load-more" style={{ padding: '12px 32px' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7,10 12,15 17,10"/>
                </svg>
                Load More Wallpapers
              </button>
            </motion.div>
          </div>
        </section>

        {/* ============ CTA SECTION ============ */}
        <section className={styles.ctaSection} aria-label="Call to action">
          <div className="container">
            <motion.div className={styles.ctaCard}
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
              <div className={styles.ctaGlow} aria-hidden="true" />
              <div className={styles.ctaContent}>
                <h2 className={styles.ctaTitle}>
                  Are You an Artist?
                  <br />
                  <span className="gradient-text">Share Your Work With Millions</span>
                </h2>
                <p className={styles.ctaText}>
                  Join 120,000+ creators. Upload your wallpapers, build your fanbase,
                  and earn from every download. The premium community is waiting for you.
                </p>
                <div className={styles.ctaActions}>
                  <a href="/upload" className="btn-primary" id="cta-upload">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17,8 12,3 7,8"/>
                      <line x1="12" y1="3" x2="12" y2="15"/>
                    </svg>
                    <span>Start Uploading — It&apos;s Free</span>
                  </a>
                  <a href="/artists" className="btn-ghost" id="cta-artists">Browse Top Artists</a>
                </div>
              </div>

              <div className={styles.ctaFeatures}>
                {[
                  { icon: '💰', title: '70% Revenue', desc: 'You keep 70% of every sale' },
                  { icon: '🌍', title: 'Global Reach', desc: 'Millions of art lovers worldwide' },
                  { icon: '🛡️', title: 'Protected', desc: 'Your work, copyright protected' },
                ].map(feat => (
                  <div className={styles.ctaFeature} key={feat.title}>
                    <span className={styles.ctaFeatureIcon} aria-hidden="true">{feat.icon}</span>
                    <div>
                      <strong className={styles.ctaFeatureTitle}>{feat.title}</strong>
                      <p className={styles.ctaFeatureDesc}>{feat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ============ FOOTER ============ */}
        <footer className={styles.footer} role="contentinfo">
          <div className="container">
            <div className={styles.footerContent}>
              <div className={styles.footerBrand}>
                <span className={styles.footerLogo}>
                  Vibe<span className="gradient-text">Walls</span>
                </span>
                <p className={styles.footerTagline}>The premium wallpaper community.</p>
              </div>
              <nav className={styles.footerLinks} aria-label="Footer navigation">
                {['Discover', 'Explore', 'Artists', 'Upload', 'Pro', 'About', 'Privacy', 'Terms'].map(link => (
                  <a key={link} href="#" className={styles.footerLink}>{link}</a>
                ))}
              </nav>
            </div>
            <div className={styles['glow-line']} aria-hidden="true" />
            <p className={styles.copyright}>© 2026 VibeWalls. Made with ♥ for the creative community.</p>
          </div>
        </footer>
        {/* Live Preview Modal */}
        {previewWall && (
          <LivePreview 
            isOpen={!!previewWall} 
            onClose={() => setPreviewWall(null)} 
            imageUrl={previewWall.preview_url || previewWall.original_url} 
            title={previewWall.title} 
          />
        )}
      </main>
    </>
  );
}
