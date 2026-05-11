'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar/Navbar';
import WallpaperCard from '@/components/WallpaperCard/WallpaperCard';
import { getWallpapers, type Wallpaper } from '@/lib/api';
import styles from './feed.module.css';

// Simulated "followed" artists — in production this would come from user auth
const FOLLOWED_ARTISTS = ['alexrivera', 'priyaart', 'cosmoslab'];

const TABS = ['Following', 'Trending', 'Recent'] as const;

export default function FeedPage() {
  const [activeTab, setActiveTab] = useState<'Following' | 'Trending' | 'Recent'>('Trending');
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const data = await getWallpapers();
      setWallpapers(data);
      setLoading(false);
    }
    loadData();
  }, []);

  const feedWallpapers = useMemo(() => {
    if (activeTab === 'Trending') {
      return [...wallpapers].sort((a, b) => (b.likes || 0) - (a.likes || 0));
    }
    if (activeTab === 'Recent') {
      return [...wallpapers].sort((a, b) => new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime()).slice(0, 8);
    }
    if (activeTab === 'Following') {
      return wallpapers.filter(w => w.artist && FOLLOWED_ARTISTS.includes(w.artist.username));
    }
    return wallpapers;
  }, [activeTab, wallpapers]);

  const followedArtists = [...new Map(
    wallpapers
      .filter(w => w.artist && FOLLOWED_ARTISTS.includes(w.artist.username))
      .map(w => [w.artist?.username, w.artist])
  ).values()].filter(Boolean);

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
            {followedArtists.map(a => a && (
              <a key={a.username} href={`/artist/${a.username}`} className={styles.followingChip}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={a.avatar_url || '/default-avatar.png'} alt={a.full_name || a.username} className={styles.chipAvatar} />
                <span>{a.full_name || a.username}</span>
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
                {tab === 'Recent' && '✨ '}
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
