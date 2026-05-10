'use client';

import Navbar from '@/components/Navbar/Navbar';
import Certificate from '@/components/Certificate/Certificate';

export default function CertificatePage() {
  return (
    <>
      <Navbar />
      <Certificate 
        artistName="Alex Rivera"
        wallpaperTitle="Neon Cityscape at Midnight"
        rank="Champion of the Week"
        date="May 2026"
        winnerId="VW-2026-084"
      />
    </>
  );
}
