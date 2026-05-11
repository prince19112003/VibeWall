'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { getWallpapers, type Wallpaper } from '@/lib/api';
import styles from './Tournament.module.css';

export default function TournamentSection() {
  const [timeLeft, setTimeLeft] = useState({ days: 3, hours: 14, mins: 42, secs: 10 });
  const [topWallpapers, setTopWallpapers] = useState<Wallpaper[]>([]);

  useEffect(() => {
    async function loadTopArt() {
      const all = await getWallpapers();
      const top3 = [...all].sort((a, b) => (b.downloads || 0) - (a.downloads || 0)).slice(0, 3);
      setTopWallpapers(top3);
    }
    loadTopArt();

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.secs > 0) return { ...prev, secs: prev.secs - 1 };
        if (prev.mins > 0) return { ...prev, mins: prev.mins - 1, secs: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, mins: 59, secs: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className={styles.tournament} id="tournament">
      <div className="container">
        <div className={styles.wrapper}>
          {/* Header */}
          <div className={styles.header}>
            <div className={styles.info}>
              <motion.span 
                className={styles.tag}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                🏆 LIVE TOURNAMENT
              </motion.span>
              <h2 className={styles.title}>Wallpaper of the <span className="gradient-text">Week</span></h2>
              <p className={styles.desc}>The most downloaded wallpaper this week wins exclusive rewards and global recognition!</p>
              
              {/* Rewards Mention */}
              <div className={styles.rewardsRow}>
                <div className={styles.rewardCard}>
                  <div className={styles.rewardIcon}>📜</div>
                  <div className={styles.rewardText}>
                    <strong>Official Gold Certificate</strong>
                    <span>Premium verifiable certificate</span>
                  </div>
                </div>
                <div className={styles.rewardCard}>
                  <div className={styles.rewardIcon}>👑</div>
                  <div className={styles.rewardText}>
                    <strong>Champion Badge</strong>
                    <span>Displayed on your profile</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Countdown */}
            <div className={styles.timer}>
              <p className={styles.timerLabel}>Ends in:</p>
              <div className={styles.timeRow}>
                <div className={styles.timeBox}>
                  <span className={styles.timeNum}>{timeLeft.days}</span>
                  <span className={styles.timeUnit}>d</span>
                </div>
                <span className={styles.timeDots}>:</span>
                <div className={styles.timeBox}>
                  <span className={styles.timeNum}>{timeLeft.hours}</span>
                  <span className={styles.timeUnit}>h</span>
                </div>
                <span className={styles.timeDots}>:</span>
                <div className={styles.timeBox}>
                  <span className={styles.timeNum}>{timeLeft.mins}</span>
                  <span className={styles.timeUnit}>m</span>
                </div>
                <span className={styles.timeDots}>:</span>
                <div className={styles.timeBox}>
                  <span className={styles.timeNum}>{timeLeft.secs}</span>
                  <span className={styles.timeUnit}>s</span>
                </div>
              </div>
            </div>
          </div>

          {/* Leaderboard Grid */}
          <div className={styles.leaderboard}>
            {topWallpapers.map((item, index) => (
              <motion.div 
                key={item.id}
                className={styles.contenderCard}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className={styles.rankBadge} data-rank={index + 1}>
                  {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                </div>
                <div className={styles.imgWrap}>
                  <Image src={item.preview_url || item.original_url} alt={item.title} fill className={styles.img} />
                </div>
                <div className={styles.cardInfo}>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p className={styles.cardArtist}>by {item.artist?.full_name || item.artist?.username}</p>
                  <div className={styles.cardStats}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="7,10 12,15 17,10"/>
                      <line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                    <span>{(item.downloads || 0).toLocaleString()} downloads</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <div className={styles.cta}>
            <a href="/upload" className="btn-primary" id="enter-tournament">
              🚀 Upload &amp; Enter Contest
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
