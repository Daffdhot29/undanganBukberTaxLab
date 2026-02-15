import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import KurmaImg from '../img/Kurma.png'; // Pastikan file ini ada!

const FallingDatesBg = () => {
  // 1. Membuat data acak untuk setiap butir kurma agar jatuhnya tidak seragam
  // useMemo agar data ini tidak dibuat ulang setiap kali render (performansi)
  const dateItems = useMemo(() => {
    const items = [];
    // Jumlah kurma yang jatuh (ubah angka 20 sesuai selera keramaian)
    for (let i = 0; i < 20; i++) {
      items.push({
        id: i,
        // Posisi horizontal acak (0% - 100% layar)
        xPos: Math.random() * 100, 
        // Delay awal acak biar nggak jatuh barengan (0s - 15s)
        delay: Math.random() * 15, 
        // Durasi jatuh acak (makin kecil makin cepat) (15s - 30s)
        duration: Math.random() * 15 + 15, 
        // Ukuran acak (20px - 45px)
        size: Math.random() * 25 + 20, 
        // Rotasi awal acak
        initialRotation: Math.random() * 360,
      });
    }
    return items;
  }, []);

  return (
    // Container fixed di belakang layar
    // z-0 agar di belakang konten utama tapi di depan background warna dasar
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {dateItems.map((item) => (
        <motion.img
          key={item.id}
          src={KurmaImg}
          alt="falling date"
          className="absolute opacity-40" // Opacity rendah biar jadi background subtle
          style={{
            left: `${item.xPos}%`,
            width: `${item.size}px`,
            top: -50, // Mulai sedikit di atas layar
          }}
          // State awal animasi
          initial={{ 
            y: -100, 
            rotate: item.initialRotation 
          }}
          // State akhir animasi (jatuh sampai bawah layar + rotasi)
          animate={{ 
            y: '110vh', 
            rotate: item.initialRotation + 360 + Math.random() * 360 // Rotasi tambahan saat jatuh
          }}
          // Konfigurasi transisi
          transition={{
            duration: item.duration,
            delay: item.delay,
            ease: 'linear', // Kecepatan konstan biar kayak jatuh beneran
            repeat: Infinity, // LOOPING TAK TERBATAS
            repeatType: "loop"
          }}
        />
      ))}
      
      {/* Optional: Overlay gradient tipis biar kurmanya makin nge-blend sama background */}
       <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#F5EFE6]/20 z-10"></div>
    </div>
  );
};

export default FallingDatesBg;