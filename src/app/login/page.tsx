'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from './login.module.css';

export default function LoginPage() {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  return (
    <main className={styles.main}>
      {/* Background */}
      <div className={styles.bg} aria-hidden="true">
        <div className={styles.bgBlob1} />
        <div className={styles.bgBlob2} />
      </div>

      {/* Logo */}
      <Link href="/" className={styles.logo}>
        <div className={styles.logoIcon}>
          <Image src="/brand-icon.png" alt="Logo" width={28} height={28} />
        </div>
        <span className={styles.logoText}>Vibe<span className="gradient-text">Walls</span></span>
      </Link>

      <motion.div
        className={styles.card}
        initial={{ opacity: 0, y: 32, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Tab Toggle */}
        <div className={styles.tabs} role="tablist">
          <button
            className={`${styles.tab} ${mode === 'login' ? styles.tabActive : ''}`}
            onClick={() => setMode('login')}
            role="tab"
            aria-selected={mode === 'login'}
            id="tab-login"
          >
            Sign In
          </button>
          <button
            className={`${styles.tab} ${mode === 'signup' ? styles.tabActive : ''}`}
            onClick={() => setMode('signup')}
            role="tab"
            aria-selected={mode === 'signup'}
            id="tab-signup"
          >
            Sign Up
          </button>
        </div>

        <h1 className={styles.title}>
          {mode === 'login' ? 'Welcome back 👋' : 'Join VibeWalls ✨'}
        </h1>
        <p className={styles.subtitle}>
          {mode === 'login'
            ? 'Sign in to access your collection and downloads.'
            : 'Create your account to upload and discover wallpapers.'}
        </p>

        {/* Google OAuth */}
        <button className={styles.googleBtn} id="google-oauth" type="button">
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continue with Google
        </button>

        <div className={styles.divider}><span>or continue with email</span></div>

        {/* Form */}
        <form className={styles.form} onSubmit={e => e.preventDefault()}>
          {mode === 'signup' && (
            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor="auth-name">Full Name</label>
              <input
                id="auth-name"
                type="text"
                className={styles.input}
                placeholder="Your name"
                value={name}
                onChange={e => setName(e.target.value)}
                autoComplete="name"
              />
            </div>
          )}

          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="auth-email">Email Address</label>
            <input
              id="auth-email"
              type="email"
              className={styles.input}
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          <div className={styles.fieldGroup}>
            <div className={styles.labelRow}>
              <label className={styles.label} htmlFor="auth-password">Password</label>
              {mode === 'login' && <a href="#" className={styles.forgot}>Forgot password?</a>}
            </div>
            <input
              id="auth-password"
              type="password"
              className={styles.input}
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            />
          </div>

          <motion.button
            type="submit"
            className={styles.submitBtn}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            id="auth-submit"
          >
            {mode === 'login' ? 'Sign In' : 'Create Account'}
          </motion.button>
        </form>

        <p className={styles.switchMode}>
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button className={styles.switchBtn} onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}>
            {mode === 'login' ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </motion.div>
    </main>
  );
}
