'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar/Navbar';
import styles from './upload.module.css';

const CATEGORIES = ['Abstract', 'Nature', 'Cyberpunk', 'Minimalist', 'Anime', 'AI Art', 'Space', 'Architecture', 'Other'];

export default function UploadPage() {
  const [dragOver, setDragOver] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [isPremium, setIsPremium] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    setFileName(file.name);
    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!preview || !title || !category) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <>
        <Navbar />
        <main className={styles.main}>
          <div className="container">
            <motion.div
              className={styles.successCard}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            >
              <div className={styles.successIcon} aria-hidden="true">🎉</div>
              <h2 className={styles.successTitle}>Wallpaper Submitted!</h2>
              <p className={styles.successText}>
                Your wallpaper is under review. It will be live within 24 hours once approved by our team.
              </p>
              <div className={styles.successActions}>
                <button className="btn-primary" onClick={() => { setSubmitted(false); setPreview(null); setTitle(''); setCategory(''); setTags(''); }}>
                  <span>Upload Another</span>
                </button>
                <a href="/" className="btn-ghost">Back to Home</a>
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
        <div className="container">
          <motion.div
            className={styles.header}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className={styles.title}>Upload Your <span className="gradient-text">Wallpaper</span></h1>
            <p className={styles.subtitle}>Share your art with millions. Earn 70% of every download.</p>
          </motion.div>

          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <div className={styles.formGrid}>
              {/* Left – Drop zone */}
              <motion.div
                className={styles.left}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15, duration: 0.5 }}
              >
                <label
                  className={`${styles.dropZone} ${dragOver ? styles.dragActive : ''} ${preview ? styles.hasPreview : ''}`}
                  onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                  htmlFor="file-upload"
                  aria-label="Upload image file"
                >
                  {preview ? (
                    <div className={styles.previewWrap}>
                      <Image src={preview} alt="Preview" fill className={styles.previewImg} />
                      <div className={styles.previewOverlay}>
                        <span className={styles.changeLabel}>Click to change</span>
                      </div>
                    </div>
                  ) : (
                    <div className={styles.dropContent}>
                      <div className={styles.dropIcon} aria-hidden="true">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                          <polyline points="17,8 12,3 7,8"/>
                          <line x1="12" y1="3" x2="12" y2="15"/>
                        </svg>
                      </div>
                      <h3 className={styles.dropTitle}>Drag &amp; Drop your wallpaper</h3>
                      <p className={styles.dropSub}>or click to browse</p>
                      <p className={styles.dropHint}>PNG, JPG, WEBP · Max 50MB · Min 1920×1080</p>
                    </div>
                  )}
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    className={styles.fileInput}
                    onChange={e => { if (e.target.files?.[0]) handleFile(e.target.files[0]); }}
                  />
                </label>
                {fileName && <p className={styles.fileName}>{fileName}</p>}
              </motion.div>

              {/* Right – Metadata */}
              <motion.div
                className={styles.right}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                {/* Title */}
                <div className={styles.fieldGroup}>
                  <label className={styles.label} htmlFor="wp-title">Wallpaper Title *</label>
                  <input
                    id="wp-title"
                    type="text"
                    className={styles.input}
                    placeholder="e.g. Neon Cityscape at Midnight"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    required
                    maxLength={80}
                  />
                </div>

                {/* Category */}
                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Category *</label>
                  <div className={styles.categoryGrid} role="radiogroup" aria-label="Select category">
                    {CATEGORIES.map(cat => (
                      <button
                        key={cat}
                        type="button"
                        className={`${styles.catBtn} ${category === cat ? styles.catActive : ''}`}
                        onClick={() => setCategory(cat)}
                        id={`cat-upload-${cat.toLowerCase()}`}
                        aria-pressed={category === cat}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div className={styles.fieldGroup}>
                  <label className={styles.label} htmlFor="wp-tags">Tags <span className={styles.optional}>(optional)</span></label>
                  <input
                    id="wp-tags"
                    type="text"
                    className={styles.input}
                    placeholder="neon, city, night, dark (comma separated)"
                    value={tags}
                    onChange={e => setTags(e.target.value)}
                  />
                </div>

                {/* Premium Toggle */}
                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Monetization</label>
                  <div className={styles.toggleRow}>
                    <div className={styles.toggleInfo}>
                      <p className={styles.toggleTitle}>Lock as Premium</p>
                      <p className={styles.toggleDesc}>Users watch an ad to download your original quality file. You earn 70%.</p>
                    </div>
                    <button
                      type="button"
                      className={`${styles.toggle} ${isPremium ? styles.toggleOn : ''}`}
                      onClick={() => setIsPremium(!isPremium)}
                      role="switch"
                      aria-checked={isPremium}
                      id="premium-toggle"
                      aria-label="Toggle premium mode"
                    >
                      <span className={styles.toggleThumb} />
                    </button>
                  </div>
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={!preview || !title || !category}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  id="upload-submit"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="17,8 12,3 7,8"/>
                    <line x1="12" y1="3" x2="12" y2="15"/>
                  </svg>
                  Submit for Review
                </motion.button>

                <p className={styles.disclaimer}>
                  By uploading, you confirm this is your original work and you agree to our community guidelines.
                </p>
              </motion.div>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
