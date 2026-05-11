'use client';

import { useState, useEffect, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar/Navbar';
import { getWallpaperById, getWallpapers, type Wallpaper } from '@/lib/api';
import styles from './wallpaper.module.css';

export default function WallpaperDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [wallpaper, setWallpaper] = useState<Wallpaper | null>(null);
  const [related, setRelated] = useState<Wallpaper[]>([]);
  const [loading, setLoading] = useState(true);

  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  // Feature 1: Device Preview
  const [previewDevice, setPreviewDevice] = useState<'none' | 'phone' | 'desktop'>('none');

  // Feature 5: Mini Image Editor
  const [editorOpen, setEditorOpen] = useState(false);
  const [brightness, setBrightness] = useState(100);
  const [blur, setBlur] = useState(0);
  const [saturation, setSaturation] = useState(100);

  const imgFilter = `brightness(${brightness}%) saturate(${saturation}%) blur(${blur}px)`;

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const wall = await getWallpaperById(id);
      if (wall) {
        setWallpaper(wall);
        const all = await getWallpapers();
        const similar = all.filter(w => w.id !== wall.id && w.category === wall.category).slice(0, 4);
        setRelated(similar);
      }
      setLoading(false);
    }
    loadData();
  }, [id]);

  if (loading) return <div className="loader-container"><div className="loader"></div></div>;
  if (!wallpaper) return <div>Wallpaper not found</div>;

  const resolutions = [
    { label: 'Original', sublabel: `${wallpaper.resolution} · Full Quality`, free: false, icon: '⭐' },
    { label: 'Desktop HD', sublabel: '1920 × 1080', free: true, icon: '🖥️' },
    { label: 'Mobile', sublabel: '1080 × 1920', free: true, icon: '📱' },
    { label: 'Tablet', sublabel: '2048 × 1536', free: true, icon: '📐' },
  ];

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        {/* ── Hero Image ── */}
        <section className={styles.hero}>
          <div className={styles.heroBg}>
            <Image src={wallpaper.original_url} alt="" fill className={styles.heroBgImg} aria-hidden="true" />
            <div className={styles.heroBgOverlay} />
          </div>
          <motion.div
            className={styles.heroImage}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: imgLoaded ? 1 : 0, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={wallpaper.original_url}
              alt={wallpaper.title}
              width={1920}
              height={1080}
              className={styles.mainImage}
              style={{ filter: imgFilter }}
              onLoad={() => setImgLoaded(true)}
              priority
            />
          </motion.div>
        </section>

        {/* ── Details ── */}
        <div className="container">
          <motion.div
            className={styles.detailsGrid}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className={styles.info}>
              <div className={styles.tags}>
                {wallpaper.is_premium && <span className="badge badge-gold">⭐ Premium</span>}
                <span className="badge badge-purple">{wallpaper.resolution}</span>
                <span className="badge badge-pink">{wallpaper.category}</span>
              </div>

              <h1 className={styles.title}>{wallpaper.title}</h1>

              {/* Artist */}
              <div className={styles.artistCard}>
                <div className={styles.artistAvatar}>
                  <img src={wallpaper.artist?.avatar_url || '/default-avatar.png'} alt={wallpaper.artist?.full_name || 'Artist'} className={styles.avatarImg} />
                </div>
                <div>
                  <h3 className={styles.artistName}>{wallpaper.artist?.full_name || wallpaper.artist?.username}</h3>
                  <p className={styles.artistHandle}>@{wallpaper.artist?.username}</p>
                </div>
                <button className={`btn-ghost ${styles.followBtn}`} onClick={e => e.preventDefault()}>Follow</button>
              </div>

              {/* Stats */}
              <div className={styles.stats}>
                <div className={styles.statBox}>
                  <span className={styles.statNum}>{wallpaper.downloads.toLocaleString()}</span>
                  <span className={styles.statLbl}>Downloads</span>
                </div>
                <div className={styles.statBox}>
                  <span className={styles.statNum}>{wallpaper.likes.toLocaleString()}</span>
                  <span className={styles.statLbl}>Likes</span>
                </div>
                <div className={styles.statBox}>
                  <span className={styles.statNum}>{wallpaper.resolution}</span>
                  <span className={styles.statLbl}>Resolution</span>
                </div>
              </div>

              {/* Tags */}
              <div className={styles.tagList}>
                <span className={styles.tag}>#{wallpaper.category.toLowerCase()}</span>
                {wallpaper.description?.split(' ').filter(t => t.startsWith('#')).map(tag => (
                  <span key={tag} className={styles.tag}>{tag}</span>
                ))}
              </div>

              {/* ── FEATURE 1: Device Preview ── */}
              <div className={styles.devicePreviewRow}>
                <span className={styles.deviceLabel}>Preview on:</span>
                <div className={styles.deviceBtns}>
                  {(['none', 'phone', 'desktop'] as const).map(d => (
                    <button
                      key={d}
                      className={`${styles.deviceBtn} ${previewDevice === d ? styles.deviceBtnActive : ''}`}
                      onClick={() => setPreviewDevice(d)}
                      id={`preview-${d}`}
                    >
                      {d === 'none' && '✕ Off'}
                      {d === 'phone' && '📱 Phone'}
                      {d === 'desktop' && '🖥️ Desktop'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Device Mockup */}
              <AnimatePresence>
                {previewDevice !== 'none' && (
                  <motion.div
                    className={styles.deviceMockupWrap}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className={previewDevice === 'phone' ? styles.phoneMockup : styles.desktopMockup}>
                      <div className={previewDevice === 'phone' ? styles.phoneScreen : styles.desktopScreen}>
                        {previewDevice === 'phone' && (
                          <div className={styles.phoneNotch} />
                        )}
                        {previewDevice === 'desktop' && (
                          <div className={styles.desktopTopBar}>
                            <span className={styles.desktopDot} style={{ background: '#ff5f57' }} />
                            <span className={styles.desktopDot} style={{ background: '#ffbd2e' }} />
                            <span className={styles.desktopDot} style={{ background: '#28c840' }} />
                          </div>
                        )}
                        <Image
                          src={wallpaper.preview_url || wallpaper.original_url}
                          alt={wallpaper.title}
                          fill
                          className={styles.mockupImg}
                          style={{ filter: imgFilter }}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ── FEATURE 5: Mini Image Editor ── */}
              <div className={styles.editorToggle}>
                <button
                  className={`${styles.editorBtn} ${editorOpen ? styles.editorBtnActive : ''}`}
                  onClick={() => setEditorOpen(!editorOpen)}
                  id="editor-toggle"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 19.07a10 10 0 0 1 0-14.14"/>
                  </svg>
                  {editorOpen ? 'Close Editor' : '✨ Adjust Image'}
                </button>
                {(brightness !== 100 || blur !== 0 || saturation !== 100) && (
                  <button className={styles.resetBtn} onClick={() => { setBrightness(100); setBlur(0); setSaturation(100); }}>
                    Reset
                  </button>
                )}
              </div>

              <AnimatePresence>
                {editorOpen && (
                  <motion.div
                    className={styles.editor}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.35 }}
                  >
                    <div className={styles.sliderRow}>
                      <label className={styles.sliderLabel}>
                        <span>☀️ Brightness</span>
                        <span className={styles.sliderValue}>{brightness}%</span>
                      </label>
                      <input type="range" min={30} max={200} value={brightness}
                        onChange={e => setBrightness(Number(e.target.value))}
                        className={styles.slider} id="slider-brightness" />
                    </div>
                    <div className={styles.sliderRow}>
                      <label className={styles.sliderLabel}>
                        <span>🎨 Saturation</span>
                        <span className={styles.sliderValue}>{saturation}%</span>
                      </label>
                      <input type="range" min={0} max={200} value={saturation}
                        onChange={e => setSaturation(Number(e.target.value))}
                        className={styles.slider} id="slider-saturation" />
                    </div>
                    <div className={styles.sliderRow}>
                      <label className={styles.sliderLabel}>
                        <span>💧 Blur</span>
                        <span className={styles.sliderValue}>{blur}px</span>
                      </label>
                      <input type="range" min={0} max={10} step={0.5} value={blur}
                        onChange={e => setBlur(Number(e.target.value))}
                        className={styles.slider} id="slider-blur" />
                    </div>
                    <p className={styles.editorNote}>💡 Blur helps icon readability on lockscreen</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Actions */}
              <div className={styles.actions}>
                <motion.button
                  className={styles.downloadBtn}
                  onClick={() => setShowDownloadModal(true)}
                  id="wallpaper-download"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7,10 12,15 17,10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                  Download Wallpaper
                </motion.button>

                <button className={`btn-icon ${liked ? styles.likedIcon : ''}`}
                  onClick={() => setLiked(!liked)} aria-label={liked ? 'Unlike' : 'Like'}
                  style={{ width: '48px', height: '48px' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill={liked ? '#ec4899' : 'none'} stroke={liked ? '#ec4899' : 'currentColor'} strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                </button>

                <button className={`btn-icon ${saved ? styles.savedIcon : ''}`}
                  onClick={() => setSaved(!saved)} aria-label={saved ? 'Unsave' : 'Save'}
                  style={{ width: '48px', height: '48px' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill={saved ? 'var(--accent-primary)' : 'none'} stroke={saved ? 'var(--accent-primary)' : 'currentColor'} strokeWidth="2">
                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>

          {/* ── Related ── */}
          {related.length > 0 && (
            <section className={styles.related}>
              <h2 className={styles.relatedTitle}>More from <span className="gradient-text">{wallpaper.category}</span></h2>
              <div className={styles.relatedGrid}>
                {related.map((w, i) => (
                  <motion.div key={w.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                    <Link href={`/wallpaper/${w.id}`} className={styles.relatedCard}>
                      <Image src={w.preview_url || w.original_url} alt={w.title} width={400} height={250} className={styles.relatedImg} />
                      <div className={styles.relatedOverlay}>
                        <span className={styles.relatedCardTitle}>{w.title}</span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* ── Download Modal ── */}
        {showDownloadModal && (
          <motion.div className={styles.modalOverlay} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            onClick={() => setShowDownloadModal(false)}>
            <motion.div className={styles.modal} initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              onClick={e => e.stopPropagation()} role="dialog" aria-label="Download options">
              <div className={styles.modalHeader}>
                <h3 className={styles.modalTitle}>Choose Resolution</h3>
                <button className="btn-icon" onClick={() => setShowDownloadModal(false)} aria-label="Close">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M18 6 6 18M6 6l12 12"/>
                  </svg>
                </button>
              </div>
              <div className={styles.modalOptions}>
                {resolutions.map((res, i) => (
                  <motion.button key={res.label} className={`${styles.resOption} ${!res.free ? styles.premiumOption : ''}`}
                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    id={`download-${res.label.toLowerCase().replace(' ', '-')}`}>
                    <span className={styles.resIcon}>{res.icon}</span>
                    <div className={styles.resInfo}>
                      <span className={styles.resLabel}>{res.label}</span>
                      <span className={styles.resSub}>{res.sublabel}</span>
                    </div>
                    {res.free ? <span className={styles.resFree}>FREE</span> : <span className={styles.resAd}>Watch Ad</span>}
                  </motion.button>
                ))}
              </div>
              <p className={styles.modalNote}>
                💡 Go <strong>Pro for ₹99/mo</strong> to skip ads and download everything in one click.
              </p>
            </motion.div>
          </motion.div>
        )}
      </main>
    </>
  );
}
