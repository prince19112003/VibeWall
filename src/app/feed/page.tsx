'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar/Navbar';
import WallpaperCard from '@/components/WallpaperCard/WallpaperCard';
import { MOCK_WALLPAPERS } from '@/lib/mockData';
import styles from './feed.module.css';

// Simulated "followed" artists — in production this would come from user auth
const FOLLOWED_ARTISTS = ['alexrivera', 'priyaart', 'cosmoslab'];

const TABS = ['Following', 'Trending', 'New Today'] as const;

export default function FeedPage() {
  const [activeTab, setActiveTab] = useState<typeof TABS[number]>('Following');

  const feedWallpapers = useMemo(() => {
    if (activeTab === 'Following') {
      return MOCK_WALLPAPERS.filter(w => FOLLOWED_ARTISTS.includes(w.artist.username));
    }
    if (activeTab === 'Trending') {
      return [...MOCK_WALLPAPERS].sort((a, b) => b.likes - a.likes);
    }
    if (activeTab === 'New Today') {
      return [...MOCK_WALLPAPERS].reverse().slice(0, 8);
    }
    return MOCK_WALLPAPERS;
  }, [activeTab]);

  const followedArtists = [...new Map(
    MOCK_WALLPAPERS
      .filter(w => FOLLOWED_ARTISTS.includes(w.artist.username))
      .map(w => [w.artist.username, w.artist])
  ).values()];

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className="container">
          {/* Header */}
          <motion.div className={styles.header}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className={styles.title}>Your <span className="gradient-text">Feed</span></h1>
            <p className={styles.subtitle}>Wallpapers from artists you follow — curated just for you.</p>
          </motion.div>

          {/* Following bar */}
          <motion.div className={styles.followingBar}
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <span className={styles.followingLabel}>Following:</span>
            {followedArtists.map(a => (
              <a key={a.username} href={`/artist/${a.username}`} className={styles.followingChip}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={a.avatar} alt={a.name} className={styles.chipAvatar} />
                <span>{a.name}</span>
              </a>
            ))}
            <a href="/artists" className={styles.discoverBtn}>+ Discover Artists</a>
          </motion.div>

          {/* Tabs */}
          <div className={styles.tabs}>
            {TABS.map(tab => (
              <button
                key={tab}
                className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ''}`}
                onClick={() => setActiveTab(tab)}
                id={`feed-tab-${tab.toLowerCase().replace(' ', '-')}`}
              >
                {tab === 'Following' && '👥 '}
                {tab === 'Trending' && '🔥 '}
                {tab === 'New Today' && '✨ '}
                {tab}
              </button>
            ))}
          </div>

          {/* Grid */}
          <AnimatePresence mode="wait">
            {feedWallpapers.length > 0 ? (
              <motion.div
                key={activeTab}
                className={styles.masonryGrid}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {feedWallpapers.map((w, i) => (
                  <WallpaperCard key={w.id} wallpaper={w} index={i} />
                ))}
              </motion.div>
            ) : (
              <motion.div className={styles.empty}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <span className={styles.emptyIcon}>👥</span>
                <h3>No wallpapers yet</h3>
                <p>Follow some artists to see their work here!</p>
                <a href="/artists" className="btn-primary" id="feed-discover">Discover Artists</a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </>
  );
}
