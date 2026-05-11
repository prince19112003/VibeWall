'use client';

import { useState, useEffect, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar/Navbar';
import WallpaperCard from '@/components/WallpaperCard/WallpaperCard';
import { getArtistProfile, getUserWallpapers, type Wallpaper, type Profile } from '@/lib/api';
import styles from './artist.module.css';

export default function ArtistPage({ params }: { params: Promise<{ username: string }> }) {
  const resolvedParams = use(params);
  const username = resolvedParams.username;
  
  const [artist, setArtist] = useState<Profile | null>(null);
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>([]);
  const [loading, setLoading] = useState(true);
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    async function loadArtistData() {
      setLoading(true);
      const profileData = await getArtistProfile(username);
      if (profileData) {
        setArtist(profileData);
        const walls = await getUserWallpapers(profileData.id);
        setWallpapers(walls);
      }
      setLoading(false);
    }
    loadArtistData();
  }, [username]);

  const totalDownloads = wallpapers.reduce((a, w) => a + (w.downloads || 0), 0);
  const totalLikes = wallpapers.reduce((a, w) => a + (w.likes || 0), 0);

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        {/* Cover Banner */}
        <div className={styles.cover}>
          <Image
            src={wallpapers[0]?.preview_url || wallpapers[0]?.original_url || `https://picsum.photos/seed/${username}cover/1920/600`}
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
            {artist && (
              <>
                <div className={styles.avatarWrap}>
                  <Image 
                    src={artist.avatar_url || '/default-avatar.png'} 
                    alt={artist.username} 
                    width={100} 
                    height={100} 
                    className={styles.avatar} 
                  />
                  {artist.is_verified && (
                    <div className={styles.verifiedBadge} aria-label="Verified artist">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    </div>
                  )}
                </div>

                <div className={styles.profileInfo}>
                  <h1 className={styles.name}>
                    {artist.full_name || artist.username}
                    {artist.is_verified && <span className="badge badge-gold" style={{ marginLeft: 10 }}>✓ Verified</span>}
                  </h1>
                  <p className={styles.username}>@{artist.username}</p>
                </div>
              </>
            )}

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
              { label: 'Global Rank', value: artist?.is_verified ? '#42' : 'Newbie', accent: true },
              { label: 'Wallpapers', value: wallpapers.length },
              { label: 'Downloads', value: totalDownloads.toLocaleString() },
              { label: 'Likes Received', value: totalLikes.toLocaleString(), xp: true },
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
              {wallpapers.length > 0 ? (
                <>Wallpapers by <span className="gradient-text">{artist?.full_name || artist?.username}</span></>
              ) : (
                'No wallpapers yet'
              )}
            </h2>

            {wallpapers.length > 0 ? (
              <div className={styles.masonryGrid}>
                {wallpapers.map((w, i) => (
                  <WallpaperCard key={w.id} wallpaper={w} index={i} />
                ))}
              </div>
            ) : (
              <div className={styles.empty}>
                <span className={styles.emptyIcon}>🖼️</span>
                <p>This artist hasn&apos;t uploaded any wallpapers yet.</p>
                <a href="/" className="btn-ghost">Explore Others</a>
              </div>
            )}
          </section>
        </div>
      </main>
    </>
  );
}
