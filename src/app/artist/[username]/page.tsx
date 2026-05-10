'use client';

import { useState, use } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar/Navbar';
import WallpaperCard from '@/components/WallpaperCard/WallpaperCard';
import { MOCK_WALLPAPERS } from '@/lib/mockData';
import styles from './artist.module.css';
import Link from 'next/link';

export default function ArtistPage({ params }: { params: Promise<{ username: string }> }) {
  const resolvedParams = use(params);
  const username = resolvedParams.username;
  const artistWallpapers = MOCK_WALLPAPERS.filter(w => w.artist.username === username);
  const artist = artistWallpapers[0]?.artist ?? {
    name: username,
    username: username,
    avatar: `https://picsum.photos/seed/${username}/200/200`,
    verified: false,
  };
  const [following, setFollowing] = useState(false);

  const totalDownloads = artistWallpapers.reduce((a, w) => a + w.downloads, 0);
  const totalLikes = artistWallpapers.reduce((a, w) => a + w.likes, 0);

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        {/* Cover Banner */}
        <div className={styles.cover}>
          <Image
            src={artistWallpapers[0]?.imageUrl ?? `https://picsum.photos/seed/${params.username}cover/1920/600`}
            alt="Cover"
            fill
            className={styles.coverImg}
          />
          <div className={styles.coverOverlay} />
        </div>

        <div className="container">
          {/* Profile Row */}
          <motion.div
            className={styles.profile}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className={styles.avatarWrap}>
              <Image src={artist.avatar} alt={artist.name} width={100} height={100} className={styles.avatar} />
              {artist.verified && (
                <div className={styles.verifiedBadge} aria-label="Verified artist">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
              )}
            </div>

            <div className={styles.profileInfo}>
              <h1 className={styles.name}>
                {artist.name}
                {artist.verified && <span className="badge badge-gold" style={{ marginLeft: 10 }}>✓ Verified</span>}
              </h1>
              <p className={styles.username}>@{artist.username}</p>
            </div>

            <div className={styles.profileActions}>
              <motion.button
                className={following ? 'btn-ghost' : 'btn-primary'}
                onClick={() => setFollowing(!following)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                id="artist-follow"
              >
                {following ? '✓ Following' : '+ Follow'}
              </motion.button>
            </div>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            className={styles.statsBar}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {[
              { label: 'Global Rank', value: '#42', accent: true },
              { label: 'Wallpapers', value: artistWallpapers.length },
              { label: 'Downloads', value: totalDownloads.toLocaleString() },
              { label: 'XP Points', value: '12,450', xp: true },
            ].map(stat => (
              <div className={styles.statItem} key={stat.label}>
                <span className={`${styles.statValue} ${stat.accent ? styles.rankValue : ''} ${stat.xp ? styles.xpValue : ''}`}>
                  {stat.value}
                </span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </motion.div>

          <div className={styles.gameGrid}>
            {/* Achievement Shelf */}
            <motion.section 
              className={styles.achievementShelf}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className={styles.subTitle}>🏆 Achievements</h3>
              <div className={styles.badgeGrid}>
                <div className={styles.achievementBadge} title="First Uploaded Wallpaper">
                  <span className={styles.badgeIcon}>🌱</span>
                  <span className={styles.badgeName}>Origin</span>
                </div>
                <div className={styles.achievementBadge} title="Reached 10K Downloads">
                  <span className={styles.badgeIcon}>🔥</span>
                  <span className={styles.badgeName}>Popular</span>
                </div>
                <div className={styles.achievementBadge} title="Tournament Winner">
                  <span className={styles.badgeIcon}>👑</span>
                  <span className={styles.badgeName}>Champion</span>
                </div>
                <div className={styles.achievementBadge} title="Elite Content Creator">
                  <span className={styles.badgeIcon}>💎</span>
                  <span className={styles.badgeName}>Elite</span>
                </div>
              </div>
            </motion.section>

            {/* Trophy Room */}
            <motion.section 
              className={styles.trophyRoom}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className={styles.subTitle}>✨ Trophy Room</h3>
              <div className={styles.trophyList}>
                <div className={styles.trophyCard}>
                  <div className={styles.medal}>🥇</div>
                  <div className={styles.trophyInfo}>
                    <p className={styles.trophyTitle}>Weekly Tournament #24</p>
                    <Link href="/certificate" className={styles.viewCert}>View Certificate</Link>
                  </div>
                </div>
                <div className={styles.trophyCard}>
                  <div className={styles.medal}>🥈</div>
                  <div className={styles.trophyInfo}>
                    <p className={styles.trophyTitle}>Cyberpunk Contest</p>
                    <span className={styles.certLocked}>Finalist</span>
                  </div>
                </div>
              </div>
            </motion.section>
          </div>

          {/* Wallpapers Grid */}
          <section className={styles.gallery}>
            <h2 className={styles.sectionTitle}>
              {artistWallpapers.length > 0 ? (
                <>Wallpapers by <span className="gradient-text">{artist.name}</span></>
              ) : (
                'No wallpapers yet'
              )}
            </h2>

            {artistWallpapers.length > 0 ? (
              <div className={styles.masonryGrid}>
                {artistWallpapers.map((w, i) => (
                  <WallpaperCard key={w.id} wallpaper={w} index={i} />
                ))}
              </div>
            ) : (
              <div className={styles.empty}>
                <span className={styles.emptyIcon}>🖼️</span>
                <p>This artist hasn&apos;t uploaded any wallpapers yet.</p>
                <a href="/explore" className="btn-ghost">Explore Others</a>
              </div>
            )}
          </section>
        </div>
      </main>
    </>
  );
}
