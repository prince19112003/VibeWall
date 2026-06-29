'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar/Navbar';
import { 
  getPendingWallpapers, 
  approveWallpaper, 
  rejectWallpaper, 
  Wallpaper,
  getArtists,
  toggleArtistVerification,
  Profile,
  getLocalWallpapers
} from '@/lib/api';
import styles from './admin.module.css';
export default function AdminPanel() {
  const [mounted, setMounted] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [passkey, setPasskey] = useState('');
  const [error, setError] = useState('');

  const [activeTab, setActiveTab] = useState<'moderation' | 'analytics' | 'users'>('moderation');
  
  const [pending, setPending] = useState<Wallpaper[]>([]);
  const [artists, setArtists] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  // Analytics State
  const [stats, setStats] = useState({ totalWallpapers: 0, totalDownloads: 0, revenue: 0 });

  useEffect(() => {
    setMounted(true);
    if (sessionStorage.getItem('admin_unlocked') === 'true') {
      setIsUnlocked(true);
    }
  }, []);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (passkey === 'admin123') {
      setIsUnlocked(true);
      sessionStorage.setItem('admin_unlocked', 'true');
      setError('');
    } else {
      setError('Invalid passkey. Access denied.');
      setPasskey('');
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const pendingData = await getPendingWallpapers();
      setPending(pendingData);

      const artistList = await getArtists();
      setArtists(artistList);

      // Mock Analytics Computation from local cache
      const allWalls = getLocalWallpapers();
      const approved = allWalls.filter(w => w.is_approved);
      const totalDowns = approved.reduce((acc, curr) => acc + (curr.downloads || 0), 0);
      setStats({
        totalWallpapers: approved.length,
        totalDownloads: totalDowns,
        revenue: Math.floor(totalDowns * 0.05) // Mock $0.05 per download
      });

    } catch (e) {
      console.error('Failed to fetch admin data', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isUnlocked) {
      fetchData();
    }
  }, [isUnlocked]);

  const handleApprove = async (id: string) => {
    try {
      await approveWallpaper(id);
      setPending(prev => prev.filter(w => w.id !== id));
      // update analytics silently
      setStats(s => ({ ...s, totalWallpapers: s.totalWallpapers + 1 }));
    } catch (e) {
      console.error('Failed to approve wallpaper', e);
    }
  };

  const handleReject = async (id: string) => {
    try {
      await rejectWallpaper(id);
      setPending(prev => prev.filter(w => w.id !== id));
    } catch (e) {
      console.error('Failed to reject wallpaper', e);
    }
  };

  const handleToggleVerification = async (artistId: string, currentStatus: boolean) => {
    try {
      // optimistic update
      setArtists(prev => prev.map(a => a.id === artistId ? { ...a, is_verified: !currentStatus } : a));
      await toggleArtistVerification(artistId, currentStatus);
    } catch (e) {
      console.error('Failed to toggle verification', e);
      // revert on error
      setArtists(prev => prev.map(a => a.id === artistId ? { ...a, is_verified: currentStatus } : a));
    }
  };
  if (!mounted) {
    return (
      <>
        <Navbar />
        <main className={styles.main}>
          <div className={styles.container} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
            <span className="loader">Verifying Access...</span>
          </div>
        </main>
      </>
    );
  }

  if (!isUnlocked) {
    return (
      <>
        <Navbar />
        <main className={styles.main}>
          <div className={styles.container} style={{ display: 'flex', justifyContent: 'center' }}>
            <motion.div 
              className={styles.lockScreen}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <div className={styles.lockCard}>
                <div className={styles.lockIcon} aria-hidden="true">🔒</div>
                <h2 className={styles.lockTitle}>Admin Dashboard</h2>
                <p className={styles.lockText}>Enter your passkey to access secure facilities.</p>
                
                <form onSubmit={handleUnlock}>
                  <input 
                    type="password" 
                    className={styles.passInput}
                    placeholder="••••••••"
                    value={passkey}
                    onChange={(e) => setPasskey(e.target.value)}
                    autoFocus
                  />
                  {error && <p className={styles.errorText}>{error}</p>}
                  <button type="submit" className={styles.unlockBtn}>Unlock Dashboard</button>
                </form>
              </div>
            </motion.div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.container}>
          <header className={styles.header}>
            <h1 className={styles.title}>Vibe<span className="gradient-text">Admin</span></h1>
            <p className={styles.subtitle}>Manage wallpapers, view analytics, and control artists.</p>
          </header>

          <div className={styles.tabs} role="tablist">
            <button 
              role="tab"
              aria-selected={activeTab === 'moderation'}
              className={`${styles.tabBtn} ${activeTab === 'moderation' ? styles.tabActive : ''}`}
              onClick={() => setActiveTab('moderation')}
            >
              Queue ({pending.length})
            </button>
            <button 
              role="tab"
              aria-selected={activeTab === 'analytics'}
              className={`${styles.tabBtn} ${activeTab === 'analytics' ? styles.tabActive : ''}`}
              onClick={() => setActiveTab('analytics')}
            >
              Analytics
            </button>
            <button 
              role="tab"
              aria-selected={activeTab === 'users'}
              className={`${styles.tabBtn} ${activeTab === 'users' ? styles.tabActive : ''}`}
              onClick={() => setActiveTab('users')}
            >
              Artists
            </button>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <span className="loader">Loading Dashboard...</span>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              {/* MODERATION TAB */}
              {activeTab === 'moderation' && (
                <motion.div 
                  key="moderation"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {pending.length === 0 ? (
                    <div className={styles.emptyState}>
                      <div className={styles.emptyIcon}>✨</div>
                      <h2 className={styles.emptyTitle}>Queue Clean!</h2>
                      <p className={styles.emptyText}>No wallpapers are pending moderation right now.</p>
                    </div>
                  ) : (
                    <div className={styles.grid}>
                      <AnimatePresence>
                        {pending.map(wall => (
                          <motion.div 
                            key={wall.id}
                            className={styles.card}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, x: -100 }}
                            layout
                          >
                            <div className={styles.imageWrapper}>
                              <Image 
                                src={wall.preview_url} 
                                alt={wall.title} 
                                fill 
                                sizes="(max-width: 768px) 100vw, 350px"
                                className={styles.img} 
                              />
                            </div>
                            
                            <div className={styles.meta}>
                              <h3 className={styles.cardTitle}>{wall.title}</h3>
                              <div className={styles.details}>
                                <span className={styles.badge}>{wall.category}</span>
                                <span className={styles.badge}>{wall.resolution}</span>
                                {wall.is_premium && (
                                  <span className={`${styles.badge} ${styles.premiumBadge}`}>Premium</span>
                                )}
                              </div>
                              <div className={styles.artistRow}>
                                <Image 
                                  src={wall.artist?.avatar_url || 'https://api.dicebear.com/7.x/bottts/svg?seed=Vibe'} 
                                  alt="Artist avatar" 
                                  width={24} height={24} 
                                  className={styles.avatar}
                                />
                                <span className={styles.artistName}>by @{wall.artist?.username || 'unknown'}</span>
                              </div>
                            </div>
        
                            <div className={styles.actions}>
                              <button className={styles.btnApprove} onClick={() => handleApprove(wall.id)}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                                <span>Approve</span>
                              </button>
                              <button className={styles.btnReject} onClick={() => handleReject(wall.id)}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                                <span>Reject</span>
                              </button>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  )}
                </motion.div>
              )}

              {/* ANALYTICS TAB */}
              {activeTab === 'analytics' && (
                <motion.div 
                  key="analytics"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <div className={styles.analyticsGrid}>
                    <div className={styles.statCard}>
                      <span className={styles.statLabel}>Active Wallpapers</span>
                      <span className={styles.statValue}>{stats.totalWallpapers}</span>
                      <span className={styles.statChange}>+12% this week</span>
                    </div>
                    <div className={styles.statCard}>
                      <span className={styles.statLabel}>Total Downloads</span>
                      <span className={styles.statValue}>{(stats.totalDownloads / 1000).toFixed(1)}k</span>
                      <span className={styles.statChange}>+5.4% this week</span>
                    </div>
                    <div className={styles.statCard}>
                      <span className={styles.statLabel}>Registered Artists</span>
                      <span className={styles.statValue}>{artists.length}</span>
                      <span className={styles.statChange}>+2 new artists</span>
                    </div>
                    <div className={styles.statCard}>
                      <span className={styles.statLabel}>Est. Revenue</span>
                      <span className={styles.statValue}>${stats.revenue.toLocaleString()}</span>
                      <span className={styles.statChange}>+18% this month</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* USERS TAB */}
              {activeTab === 'users' && (
                <motion.div 
                  key="users"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <div className={styles.userList}>
                    {artists.map(artist => (
                      <div key={artist.id} className={styles.userRow}>
                        <div className={styles.userInfo}>
                          <Image 
                            src={artist.avatar_url || 'https://api.dicebear.com/7.x/bottts/svg?seed=Vibe'}
                            alt={artist.username}
                            width={48} height={48}
                            className={styles.userAvatar}
                          />
                          <div>
                            <div className={styles.userName}>
                              @{artist.username}
                              {artist.is_verified && (
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="#3b82f6">
                                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="currentColor"/>
                                </svg>
                              )}
                            </div>
                            <div className={styles.userBio}>{artist.follower_count.toLocaleString()} followers</div>
                          </div>
                        </div>
                        <button 
                          className={`${styles.verifyBtn} ${artist.is_verified ? styles.verified : ''}`}
                          onClick={() => handleToggleVerification(artist.id, artist.is_verified)}
                        >
                          {artist.is_verified ? 'Verified' : 'Verify Artist'}
                        </button>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </main>
    </>
  );
}
