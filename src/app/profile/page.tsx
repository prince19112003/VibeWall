'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar/Navbar';
import WallpaperCard from '@/components/WallpaperCard/WallpaperCard';
import { useAuth } from '@/context/AuthContext';
import { getUserWallpapers, updateProfile, type Wallpaper, type Profile } from '@/lib/api';
import styles from './profile.module.css';

export default function ProfilePage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  // Form states
  const [fullName, setFullName] = useState('');
  const [bio, setBio] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/');
      return;
    }

    if (user) {
      async function loadUserData() {
        setLoading(true);
        // We get initial profile from user metadata or fetch it
        if (!user) return;
        const { data: profileData } = await (await import('@/lib/supabase')).supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (profileData) {
          setProfile(profileData);
          setFullName(profileData.full_name || '');
          setBio(profileData.bio || '');
          setUsername(profileData.username || '');
          
          const walls = await getUserWallpapers(user.id);
          setWallpapers(walls);
        }
        setLoading(false);
      }
      loadUserData();
    }
  }, [user, authLoading, router]);

  const handleSave = async () => {
    if (!user) return;
    try {
      setSaving(true);
      await updateProfile(user.id, {
        full_name: fullName,
        bio: bio,
        username: username
      });
      setProfile(prev => prev ? { ...prev, full_name: fullName, bio, username } : null);
      setIsEditing(false);
    } catch (err) {
      console.error('Failed to update profile:', err);
      alert('Error updating profile. Username might already be taken.');
    } finally {
      setSaving(false);
    }
  };

  if (loading || authLoading) {
    return <div className="loader-container"><div className="loader"></div></div>;
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
          >
            <div className={styles.profileRow}>
              <div className={styles.avatarWrap}>
                <Image 
                  src={user?.user_metadata.avatar_url || '/default-avatar.png'} 
                  alt="Avatar" 
                  width={120} 
                  height={120} 
                  className={styles.avatar} 
                />
              </div>
              
              <div className={styles.info}>
                {isEditing ? (
                  <div className={styles.editForm}>
                    <input 
                      type="text" 
                      value={fullName} 
                      onChange={e => setFullName(e.target.value)} 
                      placeholder="Full Name"
                      className={styles.input}
                    />
                    <input 
                      type="text" 
                      value={username} 
                      onChange={e => setUsername(e.target.value)} 
                      placeholder="Username"
                      className={styles.input}
                    />
                    <textarea 
                      value={bio} 
                      onChange={e => setBio(e.target.value)} 
                      placeholder="Write a short bio..."
                      className={styles.textarea}
                    />
                    <div className={styles.editActions}>
                      <button className="btn-primary" onClick={handleSave} disabled={saving}>
                        {saving ? 'Saving...' : 'Save Changes'}
                      </button>
                      <button className="btn-ghost" onClick={() => setIsEditing(false)}>Cancel</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h1 className={styles.name}>{profile?.full_name || user?.user_metadata.full_name}</h1>
                    <p className={styles.username}>@{profile?.username || 'user'}</p>
                    <p className={styles.bio}>{profile?.bio || 'No bio yet. Tell the world about your vibe!'}</p>
                    <button className="btn-ghost" onClick={() => setIsEditing(true)}>Edit Profile</button>
                  </>
                )}
              </div>

              <div className={styles.stats}>
                <div className={styles.statItem}>
                  <span className={styles.statVal}>{wallpapers.length}</span>
                  <span className={styles.statLab}>Wallpapers</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statVal}>{wallpapers.reduce((a, w) => a + (w.likes || 0), 0)}</span>
                  <span className={styles.statLab}>Total Likes</span>
                </div>
              </div>
            </div>
          </motion.div>

          <section className={styles.gallery}>
            <h2 className={styles.sectionTitle}>Your <span className="gradient-text">Creations</span></h2>
            {wallpapers.length > 0 ? (
              <div className={styles.grid}>
                {wallpapers.map((w, i) => (
                  <WallpaperCard key={w.id} wallpaper={w} index={i} />
                ))}
              </div>
            ) : (
              <div className={styles.empty}>
                <p>You haven&apos;t uploaded any wallpapers yet.</p>
                <Link href="/upload" className="btn-primary">Upload First Art</Link>
              </div>
            )}
          </section>
        </div>
      </main>
    </>
  );
}

import Link from 'next/link';
