'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar/Navbar';
import { getArtists, type Profile } from '@/lib/api';
import styles from './artists.module.css';

// Collect unique artists from mock data
export default function ArtistsPage() {
  const [artists, setArtists] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function loadArtists() {
      const data = await getArtists();
      setArtists(data);
      setLoading(false);
    }
    loadArtists();
  }, []);

  const filtered = useMemo(() =>
    artists.filter(a =>
      (a.full_name || a.username).toLowerCase().includes(search.toLowerCase()) ||
      a.username.toLowerCase().includes(search.toLowerCase())
    ), [search, artists]);

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className="container">
          <motion.div
            className={styles.header}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className={styles.title}>Top <span className="gradient-text">Artists</span></h1>
            <p className={styles.subtitle}>Discover the creative minds behind VibeWalls' best wallpapers.</p>
          </motion.div>

          {/* Search */}
          <motion.div
            className={styles.searchWrap}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              type="text"
              placeholder="Search artists by name..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className={styles.searchInput}
              id="artists-search"
              aria-label="Search artists"
            />
          </motion.div>

          {/* Artists Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={search}
              className={styles.grid}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {filtered.map((artist, i) => (
                <motion.a
                  key={artist.id}
                  href={`/artist/${artist.username}`}
                  className={styles.artistCard}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  whileHover={{ y: -4 }}
                >
                  <div className={styles.avatarWrap}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={artist.avatar_url || '/default-avatar.png'} alt={artist.username} className={styles.avatar} />
                    {artist.is_verified && (
                      <div className={styles.verifiedBadge} aria-label="Verified">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="#fff">
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                      </div>
                    )}
                  </div>
                  <h3 className={styles.artistName}>{artist.full_name || artist.username}</h3>
                  <p className={styles.artistUsername}>@{artist.username}</p>
                  <div className={styles.artistStats}>
                    <span>Artist</span>
                    <span>·</span>
                    <span>{artist.is_verified ? 'Verified' : 'Community'}</span>
                  </div>
                  {artist.is_verified && <span className={styles.verifiedTag}>✓ Verified Artist</span>}
                </motion.a>
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <motion.div className={styles.empty} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <span className={styles.emptyIcon}>👤</span>
              <p>No artists found for "{search}"</p>
              <button className="btn-ghost" onClick={() => setSearch('')}>Clear search</button>
            </motion.div>
          )}
        </div>
      </main>
    </>
  );
}
