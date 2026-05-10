import type { Metadata } from "next";
import Preloader from '@/components/Preloader/Preloader';
import "./globals.css";

export const metadata: Metadata = {
  title: "VibeWalls — Premium Wallpaper Community",
  description: "Discover, download and share stunning 4K & 8K wallpapers. A premium community platform for wallpaper artists and enthusiasts.",
  keywords: "wallpaper, 4K wallpaper, HD wallpaper, desktop wallpaper, phone wallpaper, community, artists",
  openGraph: {
    title: "VibeWalls — Premium Wallpaper Community",
    description: "Discover, download and share stunning 4K & 8K wallpapers.",
    type: "website",
  },
  icons: {
    icon: '/brand-icon.png',
    shortcut: '/brand-icon.png',
    apple: '/brand-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Preloader />
        <div className="noise-overlay" aria-hidden="true" />
        <div className="bg-blobs" aria-hidden="true">
          <div className="bg-blob bg-blob-1" />
          <div className="bg-blob bg-blob-2" />
          <div className="bg-blob bg-blob-3" />
        </div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          {children}
        </div>
      </body>
    </html>
  );
}
