# VibeWalls — Manual Setup & Deployment Guide
## Everything you need to do YOURSELF (step by step)

> This guide covers everything that cannot be automated — account creation, API keys, database setup, and going live.

---

## 🔴 STEP 1 — Supabase Setup (Database + Storage + Auth)

### 1.1 Create Account
1. Go to **https://supabase.com**
2. Sign up with GitHub or Google (free)
3. Click **"New Project"**
4. Give it a name: `vibewalls`
5. Set a strong database password (save it somewhere safe)
6. Choose region closest to India: **Singapore (ap-southeast-1)**
7. Click **"Create new project"** — wait ~2 minutes

### 1.2 Get Your API Keys
1. In your project → go to **Settings → API**
2. Copy the following and save them:
   - **Project URL** → this is your `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public key** → this is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role secret key** → this is your `SUPABASE_SERVICE_ROLE_KEY` (**NEVER expose this to frontend**)

### 1.3 Create the Database Tables
Go to **SQL Editor** in Supabase and run each block:

```sql
-- USERS TABLE
create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  username text unique not null,
  full_name text,
  avatar_url text,
  bio text,
  is_verified boolean default false,
  follower_count integer default 0,
  created_at timestamptz default now()
);

-- WALLPAPERS TABLE
create table public.wallpapers (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  artist_id uuid references public.profiles(id) on delete cascade,
  original_url text not null,
  preview_url text,
  thumbnail_url text,
  width integer,
  height integer,
  file_size bigint,
  resolution text,
  color_palette text[],
  tags text[],
  category text,
  downloads integer default 0,
  likes integer default 0,
  is_premium boolean default false,
  is_approved boolean default false,
  created_at timestamptz default now()
);

-- LIKES TABLE
create table public.likes (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  wallpaper_id uuid references public.wallpapers(id) on delete cascade,
  created_at timestamptz default now(),
  unique(user_id, wallpaper_id)
);

-- FOLLOWS TABLE
create table public.follows (
  id uuid default gen_random_uuid() primary key,
  follower_id uuid references public.profiles(id) on delete cascade,
  following_id uuid references public.profiles(id) on delete cascade,
  created_at timestamptz default now(),
  unique(follower_id, following_id)
);

-- COLLECTIONS TABLE
create table public.collections (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  name text not null,
  description text,
  wallpaper_ids uuid[],
  is_public boolean default true,
  created_at timestamptz default now()
);
```

### 1.4 Enable Row Level Security (RLS)
Run this in SQL Editor:

```sql
-- Enable RLS
alter table public.profiles enable row level security;
alter table public.wallpapers enable row level security;
alter table public.likes enable row level security;
alter table public.follows enable row level security;
alter table public.collections enable row level security;

-- Profiles: anyone can read, only owner can update
create policy "Profiles are public" on profiles for select using (true);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);

-- Wallpapers: approved ones are public
create policy "Approved wallpapers are public" on wallpapers for select using (is_approved = true);
create policy "Artists can insert their own" on wallpapers for insert with check (auth.uid() = artist_id);

-- Likes: public read, auth write
create policy "Likes are public" on likes for select using (true);
create policy "Auth users can like" on likes for insert with check (auth.uid() = user_id);
create policy "Users can unlike own likes" on likes for delete using (auth.uid() = user_id);
```

### 1.5 Create Storage Bucket
1. Go to **Storage** in Supabase
2. Click **"New bucket"**
3. Name: `wallpapers`
4. Set to **Public**
5. Click **"Create bucket"**
6. Go to **Policies** → Add policy → Allow authenticated users to upload

### 1.6 Enable Google OAuth
1. Go to **Authentication → Providers → Google**
2. Toggle **"Enable Google Provider"**
3. You need a Google Cloud OAuth client:
   - Go to **https://console.cloud.google.com**
   - Create project → Enable Google+ API
   - Go to **Credentials → Create OAuth 2.0 Client ID**
   - Application type: **Web application**
   - Authorized redirect URIs: `https://YOUR_PROJECT.supabase.co/auth/v1/callback`
4. Copy **Client ID** and **Client Secret** into Supabase Google provider settings

---

## 🔴 STEP 2 — Cloudinary Setup (Image Optimization + CDN)

### 2.1 Create Account
1. Go to **https://cloudinary.com**
2. Sign up free
3. Go to **Dashboard**
4. Copy these values:
   - **Cloud name** → `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
   - **API Key** → `CLOUDINARY_API_KEY`
   - **API Secret** → `CLOUDINARY_API_SECRET`

### 2.2 Create Upload Preset
1. Go to **Settings → Upload → Upload Presets**
2. Click **"Add upload preset"**
3. Name: `vibewalls_uploads`
4. Signing mode: **Unsigned** (for frontend uploads)
5. Folder: `wallpapers/`
6. Set transformations:
   - Auto format: ✅
   - Auto quality: ✅
7. Save

---

## 🔴 STEP 3 — Environment Variables Setup

### 3.1 Create `.env.local` in the project root
Create file at: `C:\Users\princ\.gemini\antigravity\scratch\vibewalls\.env.local`

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=vibewalls_uploads

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

> ⚠️ NEVER commit `.env.local` to Git. The `.gitignore` already excludes it.

---

## 🔴 STEP 4 — Install Backend Libraries
Run this command in the vibewalls project folder:

```bash
npm install @supabase/supabase-js @supabase/ssr next-cloudinary
```

---

## 🔴 STEP 5 — Deploy to Vercel

### 5.1 Push Code to GitHub
1. Create a repository on GitHub.
2. Run these commands:
```bash
cd C:\Users\princ\.gemini\antigravity\scratch\vibewalls
git init
git add .
git commit -m "feat: VibeWalls initial build"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/vibewalls.git
git push -u origin main
```

### 5.2 Deploy on Vercel
1. Go to **https://vercel.com**
2. Sign up / Login with GitHub
3. Click **"Add New Project"**
4. Import your `vibewalls` GitHub repository
5. Framework: **Next.js** (auto-detected)
6. Click **"Environment Variables"** → Add all variables from `.env.local`.
7. Click **"Deploy"**
8. Wait ~2 minutes → Your site is LIVE 🎉

### 5.3 Update Supabase Redirect URLs
After deploying, go to:
**Supabase → Authentication → URL Configuration**
- Add your Vercel URL to **"Redirect URLs"**: `https://vibewalls.vercel.app/**`

---

## 🔴 STEP 6 — Custom Domain (Optional, ~₹1000/year)

1. Buy domain at **GoDaddy / Namecheap / Google Domains** (search `vibewalls.com`)
2. In Vercel → Go to your project → **Settings → Domains**
3. Add your custom domain
4. Copy the DNS records Vercel gives you
5. Go to your domain registrar → DNS settings → Add those records
6. Wait 24–48 hours → Done!

---

## 🔴 STEP 7 — Google AdSense (Monetization, Phase 2)

> Apply only after you have ~50–100 real wallpapers and some traffic.

1. Go to **https://adsense.google.com**
2. Sign up with your Google account
3. Add your website URL
4. Copy the AdSense script they give you
5. Paste it in `src/app/layout.tsx` inside the `<head>` tag
6. Wait for Google to review (1–2 weeks)
7. Once approved, create **Display Ads** and paste ad units.

---

## ✅ Summary Checklist

| Task | Platform | Time |
|---|---|---|
| Create Supabase project + tables | supabase.com | 20 min |
| Enable Google OAuth | console.cloud.google.com | 15 min |
| Create Cloudinary account + preset | cloudinary.com | 10 min |
| Set up `.env.local` file | Local | 5 min |
| Push to GitHub | github.com | 5 min |
| Deploy on Vercel | vercel.com | 10 min |
| Add env variables to Vercel | vercel.com | 5 min |
| Buy custom domain (optional) | namecheap.com | 10 min |
| Apply for AdSense (after traffic) | adsense.google.com | 15 min |

**Total time: ~1.5 hours to go fully live. Cost: ₹0 (until significant traffic).**
