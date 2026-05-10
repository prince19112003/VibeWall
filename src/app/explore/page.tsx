'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar/Navbar';
import WallpaperCard from '@/components/WallpaperCard/WallpaperCard';
import { MOCK_WALLPAPERS, CATEGORIES } from '@/lib/mockData';
import styles from './explore.module.css';

const SORT_OPTIONS = ['Trending', 'Newest', 'Most Downloaded', 'Most Liked'] as const;

export default function ExplorePage() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState<typeof SORT_OPTIONS[number]>('Trending');

  const filtered = useMemo(() => {
    let list = MOCK_WALLPAPERS.filter(w => {
      const matchCat = activeCategory === 'all' || w.category === activeCategory;
      const matchQ = !query || w.title.toLowerCase().includes(query.toLowerCase()) || w.tags.some(t => t.includes(query.toLowerCase()));
      return matchCat && matchQ;
    });

    if (sortBy === 'Most Downloaded') list = [...list].sort((a, b) => b.downloads - a.downloads);
    if (sortBy === 'Most Liked') list = [...list].sort((a, b) => b.likes - a.likes);
    if (sortBy === 'Newest') list = [...list].reverse();
    return list;
  }, [query, activeCategory, sortBy]);

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className="container">
          {/* Header */}
          <motion.div
            className={styles.header}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className={styles.title}>
              Explore <span className="gradient-text">All Wallpapers</span>
            </h1>
            <p className={styles.subtitle}>Search, filter, and find your perfect aesthetic.</p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            className={styles.searchWrap}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
          >
            <svg className={styles.searchIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              type="text"
              placeholder="Search by title, tag, color..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className={styles.searchInput}
              id="explore-search"
              aria-label="Search wallpapers"
            />
            {query && (
              <button className={styles.searchClear} onClick={() => setQuery('')} aria-label="Clear search">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 6 6 18M6 6l12 12"/>
                </svg>
              </button>
            )}
          </motion.div>

          {/* Filters Row */}
          <div className={styles.filtersRow}>
            {/* Categories */}
            <div className={styles.categoryScroll} role="tablist">
              {CATEGORIES.map((cat, i) => (
                <motion.button
                  key={cat.id}
                  className={`pill ${activeCategory === cat.id ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat.id)}
                  role="tab"
                  aria-selected={activeCategory === cat.id}
                  id={`explore-cat-${cat.id}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span aria-hidden="true">{cat.icon}</span>
                  {cat.label}
                </motion.button>
              ))}
            </div>

            {/* Sort Select */}
            <div className={styles.sortWrap}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="21" y1="6" x2="3" y2="6"/><line x1="15" y1="12" x2="3" y2="12"/><line x1="9" y1="18" x2="3" y2="18"/>
              </svg>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as typeof SORT_OPTIONS[number])}
                className={styles.sortSelect}
                id="explore-sort"
                aria-label="Sort wallpapers"
              >
                {SORT_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
          </div>

          {/* Results count */}
          <AnimatePresence mode="wait">
            <motion.p
              key={`${query}-${activeCategory}`}
              className={styles.resultsCount}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              aria-live="polite"
            >
              {filtered.length === 0
                ? 'No wallpapers found. Try a different search.'
                : <><strong>{filtered.length}</strong> wallpapers found</>
              }
            </motion.p>
          </AnimatePresence>

          {/* Grid */}
          <AnimatePresence mode="wait">
            {filtered.length > 0 ? (
              <motion.div
                key={`${query}-${activeCategory}-${sortBy}`}
                className={styles.masonryGrid}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {filtered.map((w, i) => (
                  <WallpaperCard key={w.id} wallpaper={w} index={i} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                className={styles.empty}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <span className={styles.emptyIcon} aria-hidden="true">🔍</span>
                <h3>No results found</h3>
                <p>Try adjusting your search or filters</p>
                <button className="btn-ghost" onClick={() => { setQuery(''); setActiveCategory('all'); }}>
                  Clear filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </>
  );
}
