'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './WallpaperCard.module.css';

export interface Wallpaper {
  id: string;
  title: string;
  imageUrl: string;
  width: number;
  height: number;
  artist: {
    name: string;
    username: string;
    avatar: string;
    verified: boolean;
  };
  tags: string[];
  downloads: number;
  likes: number;
  resolution: string;
  category: string;
  isPremium?: boolean;
}

interface WallpaperCardProps {
  wallpaper: Wallpaper;
  index?: number;
}

function formatNumber(n: number): string {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
  return n.toString();
}

export default function WallpaperCard({ wallpaper, index = 0 }: WallpaperCardProps) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <motion.article
      className={styles.card}
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.5,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      layout
      aria-label={`Wallpaper: ${wallpaper.title}`}
    >
      <Link href={`/wallpaper/${wallpaper.id}`} className={styles.imageLink} tabIndex={-1} aria-hidden="true">
        {/* Skeleton */}
        {!imgLoaded && (
          <div className={`${styles.skeleton} skeleton`} style={{ aspectRatio: `${wallpaper.width}/${wallpaper.height}` }} />
        )}

        {/* Image */}
        <div
          className={styles.imageWrapper}
          style={{
            aspectRatio: `${wallpaper.width}/${wallpaper.height}`,
            opacity: imgLoaded ? 1 : 0,
            transition: 'opacity 0.4s ease',
          }}
        >
          <Image
            src={wallpaper.imageUrl}
            alt={wallpaper.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={styles.image}
            onLoad={() => setImgLoaded(true)}
            priority={index < 4}
          />
        </div>

        {/* Premium Badge */}
        {wallpaper.isPremium && (
          <div className={styles.premiumBadge} aria-label="Premium wallpaper">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 1L9 9H1l6.5 5.5L5 22l7-5 7 5-2.5-7.5L23 9h-8L12 1z"/>
            </svg>
            Premium
          </div>
        )}

        {/* Resolution Badge */}
        <div className={styles.resBadge}>{wallpaper.resolution}</div>

        {/* Hover Overlay */}
        <div className={styles.overlay} aria-hidden="true">
          <div className={styles.overlayContent}>
            <div className={styles.downloadHint}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7,10 12,15 17,10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Download
            </div>
          </div>
        </div>
      </Link>

      {/* Card Footer */}
      <div className={styles.footer}>
        {/* Artist Info */}
        <Link href={`/artist/${wallpaper.artist.username}`} className={styles.artistInfo}>
          <div className={styles.avatarWrap}>
            <Image
              src={wallpaper.artist.avatar}
              alt={wallpaper.artist.name}
              width={26}
              height={26}
              className={styles.avatar}
            />
          </div>
          <div className={styles.artistMeta}>
            <span className={styles.artistName}>
              {wallpaper.artist.name}
              {wallpaper.artist.verified && (
                <svg className={styles.verifiedIcon} width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-label="Verified artist">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              )}
            </span>
          </div>
        </Link>

        {/* Actions */}
        <div className={styles.actions}>
          <button
            className={`${styles.actionBtn} ${liked ? styles.liked : ''}`}
            onClick={() => setLiked(!liked)}
            aria-label={liked ? 'Unlike' : 'Like'}
            title={liked ? 'Unlike' : 'Like'}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill={liked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
            <span>{formatNumber(wallpaper.likes + (liked ? 1 : 0))}</span>
          </button>

          <button
            className={`${styles.actionBtn} ${saved ? styles.saved : ''}`}
            onClick={() => setSaved(!saved)}
            aria-label={saved ? 'Unsave' : 'Save'}
            title={saved ? 'Remove from collection' : 'Save to collection'}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill={saved ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
            </svg>
          </button>
        </div>
      </div>
    </motion.article>
  );
}
