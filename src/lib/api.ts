import { supabase } from './supabase';

export interface Wallpaper {
  id: string;
  title: string;
  description?: string;
  artist_id: string;
  original_url: string;
  preview_url: string;
  thumbnail_url: string;
  width: number;
  height: number;
  resolution: string;
  category: string;
  downloads: number;
  likes: number;
  is_premium: boolean;
  is_approved: boolean;
  created_at: string;
  artist?: Profile;
}

export const CATEGORIES = [
  { id: 'all', label: 'All', icon: '✦' },
  { id: 'abstract', label: 'Abstract', icon: '◈' },
  { id: 'nature', label: 'Nature', icon: '❋' },
  { id: 'cyberpunk', label: 'Cyberpunk', icon: '⬡' },
  { id: 'minimalist', label: 'Minimalist', icon: '◻' },
  { id: 'anime', label: 'Anime', icon: '⬟' },
  { id: 'ai-art', label: 'AI Art', icon: '◈' },
  { id: 'space', label: 'Space', icon: '✧' },
  { id: 'architecture', label: 'Architecture', icon: '⬛' },
];

export interface Profile {
  id: string;
  username: string;
  full_name?: string;
  avatar_url?: string;
  bio?: string;
  is_verified: boolean;
  follower_count: number;
}

// Fetch all approved wallpapers
export async function getWallpapers(category?: string, limit = 20) {
  let query = supabase
    .from('wallpapers')
    .select('*, artist:profiles(*)')
    .eq('is_approved', true)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (category && category !== 'All') {
    query = query.eq('category', category);
  }

  const { data, error } = await query;
  if (error) {
    console.error('Error fetching wallpapers:', error);
    return [];
  }
  return data as Wallpaper[];
}

// Fetch trending wallpapers (most liked)
export async function getTrendingWallpapers(limit = 10) {
  const { data, error } = await supabase
    .from('wallpapers')
    .select('*, artist:profiles(*)')
    .eq('is_approved', true)
    .order('likes', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching trending:', error);
    return [];
  }
  return data as Wallpaper[];
}

// Fetch a single artist profile
export async function getArtistProfile(username: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('username', username)
    .single();

  if (error) {
    console.error('Error fetching artist:', error);
    return null;
  }
  return data as Profile;
}

// Fetch wallpapers by artist ID
export async function getUserWallpapers(artistId: string) {
  const { data, error } = await supabase
    .from('wallpapers')
    .select('*, artist:profiles(*)')
    .eq('artist_id', artistId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching user wallpapers:', error);
    return [];
  }
  return data as Wallpaper[];
}

// Like a wallpaper
export async function likeWallpaper(wallpaperId: string, userId: string) {
  const { error } = await supabase
    .from('likes')
    .insert({ user_id: userId, wallpaper_id: wallpaperId });

  if (error) {
    if (error.code === '23505') return { success: true, alreadyLiked: true }; // Unique constraint
    throw error;
  }

  // Increment like count in wallpapers table
  const { error: incError } = await supabase.rpc('increment_likes', { wp_id: wallpaperId });
  if (incError) console.error('Error incrementing likes:', incError);

  return { success: true };
}

// Update profile
export async function updateProfile(userId: string, updates: Partial<Profile>) {
  const { error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId);

  if (error) throw error;
  return { success: true };
}

// Fetch a single wallpaper by ID
export async function getWallpaperById(id: string) {
  const { data, error } = await supabase
    .from('wallpapers')
    .select('*, artist:profiles(*)')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching wallpaper:', error);
    return null;
  }
  return data as Wallpaper;
}

// Fetch all artists
export async function getArtists() {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .order('is_verified', { ascending: false });

  if (error) {
    console.error('Error fetching artists:', error);
    return [];
  }
  return data as Profile[];
}
