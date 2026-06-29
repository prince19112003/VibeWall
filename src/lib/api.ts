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
  { id: 'nature', label: 'Nature', icon: '❋' },
  { id: 'marvel', label: 'Marvel', icon: '⚡' },
  { id: 'cartoon', label: 'Cartoon', icon: '✏️' },
  { id: 'pokemon', label: 'Pokemon', icon: '🐾' },
  { id: 'sci-fi', label: 'Sci-Fi', icon: '🛸' },
  { id: 'aesthetic', label: 'Aesthetic', icon: '🌸' },
  { id: 'abstract', label: 'Abstract', icon: '◈' },
  { id: 'cyberpunk', label: 'Cyberpunk', icon: '⬡' },
  { id: 'minimalist', label: 'Minimalist', icon: '◻' },
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

// ================= FALLBACK MOCK DATA =================
export const MOCK_PROFILES: Profile[] = [
  {
    id: 'artist-1',
    username: 'nature_explorer',
    full_name: 'Sarah Jenkins',
    avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    bio: 'Photographer capture raw natural landscapes and golden hours.',
    is_verified: true,
    follower_count: 14200
  },
  {
    id: 'artist-2',
    username: 'geek_creator',
    full_name: 'Alex Rivera',
    avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
    bio: 'Cosplay enthusiast, toy photographer, and sci-fi digital artist.',
    is_verified: true,
    follower_count: 8900
  },
  {
    id: 'artist-3',
    username: 'aesthetic_vibes',
    full_name: 'Elena Rostova',
    avatar_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    bio: 'Minimalism, pastel colors, and relaxing aesthetics.',
    is_verified: false,
    follower_count: 3100
  }
];

const STATIC_WALLPAPERS: Wallpaper[] = [
  // NATURE (4 wallpapers)
  {
    id: 'nature-1',
    title: 'Deep Green Forest Path',
    description: 'A serene pathway winding through a lush green sunlit forest.',
    artist_id: 'artist-1',
    original_url: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=1200',
    preview_url: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=800',
    thumbnail_url: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=400',
    width: 3840, height: 2160, resolution: '4K',
    category: 'nature', downloads: 1240, likes: 380, is_premium: false, is_approved: true,
    created_at: new Date().toISOString(), artist: MOCK_PROFILES[0]
  },
  {
    id: 'nature-2',
    title: 'Misty Mountain Sunrise',
    description: 'Mountain peaks surrounded by clouds under soft sunrise light.',
    artist_id: 'artist-1',
    original_url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1200',
    preview_url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=800',
    thumbnail_url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=400',
    width: 3840, height: 2560, resolution: '8K',
    category: 'nature', downloads: 2890, likes: 950, is_premium: true, is_approved: true,
    created_at: new Date().toISOString(), artist: MOCK_PROFILES[0]
  },
  {
    id: 'nature-3',
    title: 'Lush Waterfall Valley',
    description: 'A beautiful waterfall cascading into a green valley basin.',
    artist_id: 'artist-1',
    original_url: 'https://images.unsplash.com/photo-1472214222555-d404758b1c42?q=80&w=1200',
    preview_url: 'https://images.unsplash.com/photo-1472214222555-d404758b1c42?q=80&w=800',
    thumbnail_url: 'https://images.unsplash.com/photo-1472214222555-d404758b1c42?q=80&w=400',
    width: 1920, height: 1200, resolution: '4K',
    category: 'nature', downloads: 850, likes: 210, is_premium: false, is_approved: true,
    created_at: new Date().toISOString(), artist: MOCK_PROFILES[0]
  },
  {
    id: 'nature-4',
    title: 'Majestic Green Hills',
    description: 'Endless rolling green hills under a bright clear sky.',
    artist_id: 'artist-1',
    original_url: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=1200',
    preview_url: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=800',
    thumbnail_url: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=400',
    width: 2560, height: 1600, resolution: '4K',
    category: 'nature', downloads: 1450, likes: 420, is_premium: false, is_approved: true,
    created_at: new Date().toISOString(), artist: MOCK_PROFILES[0]
  },

  // MARVEL (3 wallpapers)
  {
    id: 'marvel-1',
    title: 'Spiderman Cosplay Action',
    description: 'High-detail Spiderman action figure shot in a realistic city environment.',
    artist_id: 'artist-2',
    original_url: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=1200',
    preview_url: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=800',
    thumbnail_url: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=400',
    width: 1920, height: 1200, resolution: '4K',
    category: 'marvel', downloads: 3500, likes: 1100, is_premium: false, is_approved: true,
    created_at: new Date().toISOString(), artist: MOCK_PROFILES[1]
  },
  {
    id: 'marvel-2',
    title: 'Iron Man Crimson Helmet',
    description: 'Metallic finish of the classic Iron Man helmet with glowing eyes.',
    artist_id: 'artist-2',
    original_url: 'https://images.unsplash.com/photo-1608889175123-8ee362201f81?q=80&w=1200',
    preview_url: 'https://images.unsplash.com/photo-1608889175123-8ee362201f81?q=80&w=800',
    thumbnail_url: 'https://images.unsplash.com/photo-1608889175123-8ee362201f81?q=80&w=400',
    width: 3840, height: 2160, resolution: '8K',
    category: 'marvel', downloads: 4200, likes: 1300, is_premium: true, is_approved: true,
    created_at: new Date().toISOString(), artist: MOCK_PROFILES[1]
  },
  {
    id: 'marvel-3',
    title: 'Captain America Star Shield',
    description: 'Vibrant colors of the iconic vibranium shield in the snow.',
    artist_id: 'artist-2',
    original_url: 'https://images.unsplash.com/photo-1620336655055-088d06e36bf0?q=80&w=1200',
    preview_url: 'https://images.unsplash.com/photo-1620336655055-088d06e36bf0?q=80&w=800',
    thumbnail_url: 'https://images.unsplash.com/photo-1620336655055-088d06e36bf0?q=80&w=400',
    width: 2560, height: 1440, resolution: '4K',
    category: 'marvel', downloads: 2100, likes: 640, is_premium: false, is_approved: true,
    created_at: new Date().toISOString(), artist: MOCK_PROFILES[1]
  },

  // CARTOON (3 wallpapers)
  {
    id: 'cartoon-1',
    title: 'Vibrant Graffiti Cartoon Mural',
    description: 'Explosion of street art graffiti featuring playful cartoon characters.',
    artist_id: 'artist-2',
    original_url: 'https://images.unsplash.com/photo-1560942485-b2a11cc13456?q=80&w=1200',
    preview_url: 'https://images.unsplash.com/photo-1560942485-b2a11cc13456?q=80&w=800',
    thumbnail_url: 'https://images.unsplash.com/photo-1560942485-b2a11cc13456?q=80&w=400',
    width: 1920, height: 1080, resolution: '4K',
    category: 'cartoon', downloads: 1540, likes: 450, is_premium: false, is_approved: true,
    created_at: new Date().toISOString(), artist: MOCK_PROFILES[1]
  },
  {
    id: 'cartoon-2',
    title: 'Anime Retro Bedroom Vibe',
    description: 'Classic pixelated cartoon bedroom layout with nostalgic vibes.',
    artist_id: 'artist-3',
    original_url: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=1200',
    preview_url: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=800',
    thumbnail_url: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=400',
    width: 2560, height: 1440, resolution: '4K',
    category: 'cartoon', downloads: 3100, likes: 890, is_premium: false, is_approved: true,
    created_at: new Date().toISOString(), artist: MOCK_PROFILES[2]
  },
  {
    id: 'cartoon-3',
    title: 'Vibrant Pop Character Face',
    description: 'High contrast pop art color portrait of a cartoon figure.',
    artist_id: 'artist-2',
    original_url: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=1200',
    preview_url: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=800',
    thumbnail_url: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=400',
    width: 3840, height: 2160, resolution: '8K',
    category: 'cartoon', downloads: 980, likes: 290, is_premium: true, is_approved: true,
    created_at: new Date().toISOString(), artist: MOCK_PROFILES[1]
  },

  // POKEMON (3 wallpapers)
  {
    id: 'pokemon-1',
    title: 'Pikachu Cosplay Miniature',
    description: 'Cute miniature Pikachu toy set up in a tiny forest setting.',
    artist_id: 'artist-2',
    original_url: 'https://images.unsplash.com/photo-1601445638532-3c6f6c3aa1d6?q=80&w=1200',
    preview_url: 'https://images.unsplash.com/photo-1601445638532-3c6f6c3aa1d6?q=80&w=800',
    thumbnail_url: 'https://images.unsplash.com/photo-1601445638532-3c6f6c3aa1d6?q=80&w=400',
    width: 1920, height: 1080, resolution: '4K',
    category: 'pokemon', downloads: 2700, likes: 780, is_premium: false, is_approved: true,
    created_at: new Date().toISOString(), artist: MOCK_PROFILES[1]
  },
  {
    id: 'pokemon-2',
    title: 'Pocket Monster Cards Setup',
    description: 'Vibrant arrangement of vintage holographic Pokemon trading cards.',
    artist_id: 'artist-2',
    original_url: 'https://images.unsplash.com/photo-1613771404721-1f92d799e4d4?q=80&w=1200',
    preview_url: 'https://images.unsplash.com/photo-1613771404721-1f92d799e4d4?q=80&w=800',
    thumbnail_url: 'https://images.unsplash.com/photo-1613771404721-1f92d799e4d4?q=80&w=400',
    width: 3840, height: 2160, resolution: '8K',
    category: 'pokemon', downloads: 1890, likes: 620, is_premium: true, is_approved: true,
    created_at: new Date().toISOString(), artist: MOCK_PROFILES[1]
  },
  {
    id: 'pokemon-3',
    title: 'Gamer Anime Setup Vibe',
    description: 'A glowing retro console setup adorned with small pocket monster figures.',
    artist_id: 'artist-3',
    original_url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200',
    preview_url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800',
    thumbnail_url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=400',
    width: 2560, height: 1440, resolution: '4K',
    category: 'pokemon', downloads: 1400, likes: 410, is_premium: false, is_approved: true,
    created_at: new Date().toISOString(), artist: MOCK_PROFILES[2]
  },

  // SCI-FI (4 wallpapers)
  {
    id: 'scifi-1',
    title: 'Cyberpunk Neon Hologram',
    description: 'Vibrant futuristic HUD and glowing neon visual patterns.',
    artist_id: 'artist-2',
    original_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200',
    preview_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800',
    thumbnail_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=400',
    width: 1920, height: 1200, resolution: '4K',
    category: 'sci-fi', downloads: 2200, likes: 670, is_premium: false, is_approved: true,
    created_at: new Date().toISOString(), artist: MOCK_PROFILES[1]
  },
  {
    id: 'scifi-2',
    title: 'Planetary Data Networks',
    description: 'Beautiful abstract digital grid covering a blue planet in orbit.',
    artist_id: 'artist-2',
    original_url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200',
    preview_url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800',
    thumbnail_url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=400',
    width: 3840, height: 2160, resolution: '8K',
    category: 'sci-fi', downloads: 3900, likes: 1200, is_premium: true, is_approved: true,
    created_at: new Date().toISOString(), artist: MOCK_PROFILES[1]
  },
  {
    id: 'scifi-3',
    title: 'Orbiting Space Station',
    description: 'Human spaceship station looking down on the Earth from space.',
    artist_id: 'artist-2',
    original_url: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1200',
    preview_url: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=800',
    thumbnail_url: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=400',
    width: 2560, height: 1600, resolution: '4K',
    category: 'sci-fi', downloads: 1500, likes: 480, is_premium: false, is_approved: true,
    created_at: new Date().toISOString(), artist: MOCK_PROFILES[1]
  },
  {
    id: 'scifi-4',
    title: 'Futuristic Sci-Fi Mega Ring',
    description: 'Golden hour shot of a huge cosmic circular structural rings.',
    artist_id: 'artist-2',
    original_url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1200',
    preview_url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=800',
    thumbnail_url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=400',
    width: 3840, height: 2560, resolution: '8K',
    category: 'sci-fi', downloads: 3100, likes: 920, is_premium: true, is_approved: true,
    created_at: new Date().toISOString(), artist: MOCK_PROFILES[1]
  },

  // AESTHETIC (3 wallpapers)
  {
    id: 'aesthetic-1',
    title: 'Golden Hour Palm Beach',
    description: 'Relaxing views of gentle ocean waves and palm trees silhouette during sunset.',
    artist_id: 'artist-3',
    original_url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200',
    preview_url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800',
    thumbnail_url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=400',
    width: 1920, height: 1080, resolution: '4K',
    category: 'aesthetic', downloads: 4100, likes: 1500, is_premium: false, is_approved: true,
    created_at: new Date().toISOString(), artist: MOCK_PROFILES[2]
  },
  {
    id: 'aesthetic-2',
    title: 'Vaporwave Neon Leaves',
    description: 'Warm purple neon light shining on green tropical monster leaves.',
    artist_id: 'artist-3',
    original_url: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=1200',
    preview_url: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=800',
    thumbnail_url: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=400',
    width: 2560, height: 1600, resolution: '4K',
    category: 'aesthetic', downloads: 2600, likes: 810, is_premium: false, is_approved: true,
    created_at: new Date().toISOString(), artist: MOCK_PROFILES[2]
  },
  {
    id: 'aesthetic-3',
    title: 'Minimal Black & Gold Fluid',
    description: 'Elegant swirls of black liquid and shiny golden vein highlights.',
    artist_id: 'artist-3',
    original_url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1200',
    preview_url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800',
    thumbnail_url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=400',
    width: 3840, height: 2160, resolution: '8K',
    category: 'aesthetic', downloads: 3300, likes: 990, is_premium: true, is_approved: true,
    created_at: new Date().toISOString(), artist: MOCK_PROFILES[2]
  }
];

// Read from Local Storage if present, otherwise initialize with STATIC_WALLPAPERS
export const getLocalWallpapers = (): Wallpaper[] => {
  if (typeof window === 'undefined') return STATIC_WALLPAPERS;
  const stored = localStorage.getItem('vw_local_wallpapers');
  if (!stored) {
    localStorage.setItem('vw_local_wallpapers', JSON.stringify(STATIC_WALLPAPERS));
    return STATIC_WALLPAPERS;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return STATIC_WALLPAPERS;
  }
};

export const saveLocalWallpapers = (list: Wallpaper[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('vw_local_wallpapers', JSON.stringify(list));
  }
};

const MOCK_WALLPAPERS = STATIC_WALLPAPERS; 

// Helper to determine if using placeholder URL
function isDummyConnection() {
  return !process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes('dummy-supabase-project');
}

// Fetch all approved wallpapers
export async function getWallpapers(category?: string, limit = 20) {
  if (isDummyConnection()) {
    const approved = getLocalWallpapers().filter(w => w.is_approved);
    const list = category && category !== 'all' 
      ? approved.filter(w => w.category.toLowerCase() === category.toLowerCase())
      : approved;
    return list.slice(0, limit);
  }

  try {
    let query = supabase
      .from('wallpapers')
      .select('*, artist:profiles(*)')
      .eq('is_approved', true)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (category && category !== 'All' && category !== 'all') {
      query = query.eq('category', category);
    }

    const { data, error } = await query;
    if (error) {
      console.warn('Supabase error, falling back to mock data:', error.message);
      return getLocalWallpapers().filter(w => w.is_approved);
    }
    return (data as Wallpaper[]) || getLocalWallpapers().filter(w => w.is_approved);
  } catch (err) {
    console.warn('Network error fetching wallpapers, falling back to mock data.');
    return getLocalWallpapers().filter(w => w.is_approved);
  }
}

// Fetch trending wallpapers (most liked)
export async function getTrendingWallpapers(limit = 10) {
  if (isDummyConnection()) {
    return [...getLocalWallpapers()]
      .filter(w => w.is_approved)
      .sort((a, b) => b.likes - a.likes)
      .slice(0, limit);
  }

  try {
    const { data, error } = await supabase
      .from('wallpapers')
      .select('*, artist:profiles(*)')
      .eq('is_approved', true)
      .order('likes', { ascending: false })
      .limit(limit);

    if (error) {
      console.warn('Supabase error, falling back to mock trending:', error.message);
      return getLocalWallpapers().filter(w => w.is_approved);
    }
    return (data as Wallpaper[]) || getLocalWallpapers().filter(w => w.is_approved);
  } catch (err) {
    console.warn('Network error, falling back to mock trending.');
    return getLocalWallpapers().filter(w => w.is_approved);
  }
}

// Fetch a single artist profile
export async function getArtistProfile(username: string) {
  if (isDummyConnection()) {
    return MOCK_PROFILES.find(p => p.username.toLowerCase() === username.toLowerCase()) || MOCK_PROFILES[0];
  }

  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('username', username)
      .single();

    if (error) {
      console.warn('Supabase error, falling back to mock profile:', error.message);
      return MOCK_PROFILES.find(p => p.username.toLowerCase() === username.toLowerCase()) || MOCK_PROFILES[0];
    }
    return data as Profile;
  } catch (err) {
    return MOCK_PROFILES.find(p => p.username.toLowerCase() === username.toLowerCase()) || MOCK_PROFILES[0];
  }
}

// Fetch wallpapers by artist ID
export async function getUserWallpapers(artistId: string) {
  if (isDummyConnection()) {
    return getLocalWallpapers().filter(w => w.artist_id === artistId);
  }

  try {
    const { data, error } = await supabase
      .from('wallpapers')
      .select('*, artist:profiles(*)')
      .eq('artist_id', artistId)
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Supabase error, falling back to artist mock wallpapers:', error.message);
      return getLocalWallpapers().filter(w => w.artist_id === artistId);
    }
    return (data as Wallpaper[]) || [];
  } catch (err) {
    return getLocalWallpapers().filter(w => w.artist_id === artistId);
  }
}



// Update profile
export async function updateProfile(userId: string, updates: Partial<Profile>) {
  if (isDummyConnection()) {
    return { success: true };
  }

  try {
    const { error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId);

    if (error) throw error;
    return { success: true };
  } catch (err) {
    return { success: true };
  }
}

// Fetch a single wallpaper by ID
export async function getWallpaperById(id: string) {
  if (isDummyConnection()) {
    return getLocalWallpapers().find(w => w.id === id) || getLocalWallpapers()[0];
  }

  try {
    const { data, error } = await supabase
      .from('wallpapers')
      .select('*, artist:profiles(*)')
      .eq('id', id)
      .single();

    if (error) {
      console.warn('Supabase error, falling back to mock wallpaper details:', error.message);
      return getLocalWallpapers().find(w => w.id === id) || getLocalWallpapers()[0];
    }
    return data as Wallpaper;
  } catch (err) {
    return getLocalWallpapers().find(w => w.id === id) || getLocalWallpapers()[0];
  }
}

// Fetch all artists
export async function getArtists() {
  if (isDummyConnection()) {
    return MOCK_PROFILES;
  }

  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('is_verified', { ascending: false });

    if (error) {
      console.warn('Supabase error, falling back to mock artists list:', error.message);
      return MOCK_PROFILES;
    }
    return (data as Profile[]) || MOCK_PROFILES;
  } catch (err) {
    return MOCK_PROFILES;
  }
}

// Upload wallpaper (sets is_approved: false by default for review)
export async function uploadWallpaper(wallpaper: Partial<Wallpaper>) {
  if (isDummyConnection()) {
    const list = getLocalWallpapers();
    const newWallpaper: Wallpaper = {
      id: `wall-${Date.now()}`,
      title: wallpaper.title || 'Untitled',
      description: wallpaper.description || '',
      artist_id: wallpaper.artist_id || 'artist-1',
      original_url: wallpaper.original_url || '',
      preview_url: wallpaper.preview_url || '',
      thumbnail_url: wallpaper.thumbnail_url || '',
      width: wallpaper.width || 1920,
      height: wallpaper.height || 1080,
      resolution: wallpaper.resolution || '4K',
      category: (wallpaper.category || 'other').toLowerCase(),
      downloads: 0,
      likes: 0,
      is_premium: !!wallpaper.is_premium,
      is_approved: false, // Under review!
      created_at: new Date().toISOString(),
      artist: MOCK_PROFILES.find(p => p.id === wallpaper.artist_id) || MOCK_PROFILES[0]
    };
    list.unshift(newWallpaper);
    saveLocalWallpapers(list);
    return { success: true, data: newWallpaper };
  }

  try {
    const { data, error } = await supabase
      .from('wallpapers')
      .insert({ ...wallpaper, is_approved: false }) // Go to review
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (err: any) {
    console.error('Database upload insert failed:', err);
    throw err;
  }
}

// Fetch all wallpapers under review
export async function getPendingWallpapers() {
  if (isDummyConnection()) {
    return getLocalWallpapers().filter(w => !w.is_approved);
  }

  try {
    const { data, error } = await supabase
      .from('wallpapers')
      .select('*, artist:profiles(*)')
      .eq('is_approved', false)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Wallpaper[];
  } catch (err) {
    console.warn('Supabase fetch pending error, falling back to local storage review list');
    return getLocalWallpapers().filter(w => !w.is_approved);
  }
}

// Approve a wallpaper
export async function approveWallpaper(id: string) {
  if (isDummyConnection()) {
    const list = getLocalWallpapers();
    const index = list.findIndex(w => w.id === id);
    if (index !== -1) {
      list[index].is_approved = true;
      saveLocalWallpapers(list);
    }
    return { success: true };
  }

  try {
    const { error } = await supabase
      .from('wallpapers')
      .update({ is_approved: true })
      .eq('id', id);

    if (error) throw error;
    return { success: true };
  } catch (err) {
    console.error('Approve error:', err);
    throw err;
  }
}

// Reject a wallpaper (delete it)
export async function rejectWallpaper(id: string) {
  if (isDummyConnection()) {
    const list = getLocalWallpapers();
    const filtered = list.filter(w => w.id !== id);
    saveLocalWallpapers(filtered);
    return { success: true };
  }
  try {
    const { error } = await supabase
      .from('wallpapers')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { success: true };
  } catch (err) {
    console.error('Reject error:', err);
    throw err;
  }
}

// Toggle artist verification status (for admin panel)
export async function toggleArtistVerification(artistId: string, currentStatus: boolean) {
  if (isDummyConnection()) {
    // In dummy mode, MOCK_PROFILES is static, so we modify the in-memory array directly
    const index = MOCK_PROFILES.findIndex(p => p.id === artistId);
    if (index !== -1) {
      MOCK_PROFILES[index].is_verified = !currentStatus;
    }
    return { success: true, newStatus: !currentStatus };
  }

  try {
    const { error } = await supabase
      .from('profiles')
      .update({ is_verified: !currentStatus })
      .eq('id', artistId);

    if (error) throw error;
    return { success: true, newStatus: !currentStatus };
  } catch (err) {
    console.error('Error toggling verification:', err);
    throw err;
  }
}



// Unlike a wallpaper (decrement likes)
export async function unlikeWallpaper(id: string): Promise<number> {
  if (isDummyConnection()) {
    const list = getLocalWallpapers();
    const index = list.findIndex(w => w.id === id);
    if (index !== -1) {
      list[index].likes = Math.max(0, (list[index].likes || 0) - 1);
      saveLocalWallpapers(list);
      return list[index].likes;
    }
    return 0;
  }

  try {
    const { data } = await supabase
      .from('wallpapers')
      .select('likes')
      .eq('id', id)
      .single();

    const newLikes = Math.max(0, (data?.likes || 0) - 1);
    await supabase.from('wallpapers').update({ likes: newLikes }).eq('id', id);
    return newLikes;
  } catch (err) {
    console.error('Unlike error:', err);
    throw err;
  }
}

// Trigger a file download for a wallpaper image
export function downloadWallpaperFile(url: string, filename: string) {
  // Use fetch + blob for same-origin, fallback to window.open
  fetch(url, { mode: 'cors' })
    .then(res => res.blob())
    .then(blob => {
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    })
    .catch(() => {
      // Fallback: open in new tab
      window.open(url, '_blank');
    });
}


// Like a wallpaper (increment likes)
export async function likeWallpaper(id: string): Promise<number> {
  if (isDummyConnection()) {
    const list = getLocalWallpapers();
    const index = list.findIndex(w => w.id === id);
    if (index !== -1) {
      list[index].likes = (list[index].likes || 0) + 1;
      saveLocalWallpapers(list);
      return list[index].likes;
    }
    return 0;
  }

  try {
    const { data } = await supabase
      .from('wallpapers')
      .select('likes')
      .eq('id', id)
      .single();

    const newLikes = (data?.likes || 0) + 1;
    await supabase.from('wallpapers').update({ likes: newLikes }).eq('id', id);
    return newLikes;
  } catch (err) {
    console.error('Like error:', err);
    throw err;
  }
}
