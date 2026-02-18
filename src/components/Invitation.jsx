import React, { useState, useEffect, useRef } from "react";
import { Calendar, MapPin, Shirt, ArrowUpRight, X, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import BajuWanita from "../img/BajuWanita.png";
import BajuWanita2 from "../img/BajuWanita2.png";
import BajuWanita3 from "../img/BajuWanita3.png";
import BajuPria from "../img/BajuPria.png";
import BajuPria2 from "../img/BajuPria2.png";
import BajuPria3 from "../img/BajuPria3.png";
import Tax from "../img/Tax.png";

const COLORS = {
  terracotta: "#E2725B",
  terracottaDark: "#C85A46",
  terracottaLight: "#F5A693",
  terracottaDeep: "#A04438",
  bgLight: "#FFF8F5",
  bgPaper: "#FDF5F0",
  bgEnvelope: "#D48A7A",
  gold: "#D4AF37",
  goldDark: "#B8860B",
  textDark: "#4A352A",
  textMedium: "#6D554A",
  textLight: "#8B7368",
  white: "#FFFFFF",
  grayLight: "#F5F0EB",
  gray: "#E8E0D8",
};

// --- HELPER COMPONENT UNTUK SLIDER HALUS ---
const SmoothSlider = ({ imageList, currentIndex, altText }) => {
  return (
    <div className="relative w-full h-36 sm:h-32 flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="popLayout">
        <motion.img
          key={currentIndex} // Key penting agar Framer Motion tahu gambar berubah
          src={imageList[currentIndex]}
          alt={altText}
          initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute w-full h-full object-contain mx-auto"
        />
      </AnimatePresence>
    </div>
  );
};

const AnimatedCard = ({ children, className = "" }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.intersectionRatio > 0.3);
      },
      { threshold: [0, 0.3, 0.6, 1.0] },
    );

    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
        opacity: { duration: 0.4 },
      }}
      className={`relative ${className}`}
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#E2725B]/30 via-[#C85A46]/30 to-[#E2725B]/30 rounded-2xl opacity-40 blur-sm pointer-events-none"></div>
      <div className="absolute -inset-1 bg-gradient-to-r from-[#E2725B]/10 via-transparent to-[#E2725B]/10 rounded-2xl opacity-30 pointer-events-none"></div>
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4/5 h-2 bg-gradient-to-t from-black/10 to-transparent rounded-full blur-md pointer-events-none"></div>
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

const FullInvitationContent = ({ isVisible }) => {
  const listBajuWanita = [BajuWanita, BajuWanita2, BajuWanita3];
  const listBajuPria = [BajuPria, BajuPria2, BajuPria3];

  const [idxWanita, setIdxWanita] = useState(0);
  const [idxPria, setIdxPria] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIdxWanita((prev) => (prev + 1) % listBajuWanita.length);
      setIdxPria((prev) => (prev + 1) % listBajuPria.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [listBajuWanita.length, listBajuPria.length]);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isExpired, setIsExpired] = useState(false);
  const targetDate = new Date(2026, 2, 7, 16, 0, 0).getTime();

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      if (distance < 0) {
        clearInterval(timer);
        setIsExpired(true);
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div
      className={`w-full transition-opacity duration-1000 delay-500 ${isVisible ? "opacity-100 visible" : "opacity-0 invisible h-0 overflow-hidden"}`}
    >
      {/* HERO SECTION */}
      <div className="relative flex flex-col items-center text-center pb-16 pt-8">
        <div className="absolute top-0 left-[5%] w-12 sm:w-16 animate-bounce opacity-80 duration-[3000ms]">
          <img
            src="/Assets/Bulan.png"
            alt="Bulan"
            className="w-full"
            onError={(e) => (e.target.style.display = "none")}
          />
        </div>
        <div className="absolute top-[-10px] right-[5%] w-12 sm:w-16 animate-bounce opacity-80 duration-[3000ms] delay-1000">
          <img
            src="/Assets/Bulan.png"
            alt="Bulan"
            className="w-full"
            onError={(e) => (e.target.style.display = "none")}
          />
        </div>

        <p className="text-[#E2725B] tracking-[0.15em] font-semibold text-xs sm:text-sm mb-4 uppercase">
          Undangan Resmi
        </p>
        <h1 className="text-4xl sm:text-6xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#E2725B] to-[#C85A46] mb-8 drop-shadow-sm leading-tight">
          Buka Puasa <br /> Bersama
        </h1>

        {/* COUNTDOWN */}
        {!isExpired ? (
          <div className="flex flex-wrap justify-center gap-3 sm:gap-6 mb-10">
            {Object.entries(timeLeft).map(([unit, value]) => (
              <div
                key={unit}
                className="bg-white/80 border border-[#E2725B]/20 p-3 sm:p-5 rounded-xl shadow-md min-w-[75px] sm:min-w-[100px] flex flex-col items-center"
              >
                <span className="text-2xl sm:text-4xl font-bold text-[#E2725B] font-serif">
                  {value < 10 ? `0${value}` : value}
                </span>
                <span className="text-[10px] sm:text-xs uppercase tracking-wider text-gray-500 mt-1 font-semibold">
                  {unit}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="mb-10 text-xl font-bold text-[#E2725B]">
            Acara Telah Dimulai!
          </div>
        )}
      </div>

      {/* CARDS SECTION */}
      <div className="space-y-10 sm:space-y-12 px-2 sm:px-6 pb-20">
        {/* TANGGAL & WAKTU - DENGAN FITUR GOOGLE CALENDAR */}
        <AnimatedCard className="bg-white/80 backdrop-blur-sm border border-[#E2725B]/10 rounded-2xl sm:rounded-3xl p-5 md:p-7 shadow-lg relative overflow-hidden group">
          {/* Dekorasi Cahaya Halus saat Hover */}
          <div className="absolute -inset-0 bg-gradient-to-tr from-[#E2725B]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

          <div className="relative mb-6 pb-4">
            <h2 className="text-2xl md:text-3xl font-serif text-center text-[#E2725B] font-bold relative z-10 pt-2">
              Tanggal & Waktu
            </h2>
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#E2725B]/30 to-transparent"></div>
          </div>

          <div className="space-y-4 relative z-10">
            {/* Baris Tanggal */}
            <div className="flex items-start gap-4 p-3 bg-white/50 rounded-xl border border-[#E2725B]/10 hover:border-[#E2725B]/30 transition-all duration-300 shadow-sm">
              <div className="w-10 h-10 bg-[#E2725B]/10 rounded-full flex items-center justify-center flex-shrink-0 border border-[#E2725B]/20">
                <Calendar size={18} className="text-[#E2725B]" />
              </div>
              <div>
                <p className="text-[#8B7368] text-xs sm:text-sm mb-1 font-medium uppercase tracking-wider">
                  Hari/Tanggal
                </p>
                <p className="font-bold text-base sm:text-lg text-[#4A352A]">
                  Sabtu, 07 Maret 2026
                </p>
              </div>
            </div>

            {/* Baris Waktu */}
            <div className="flex items-start gap-4 p-3 bg-white/50 rounded-xl border border-[#E2725B]/10 hover:border-[#E2725B]/30 transition-all duration-300 shadow-sm">
              <div className="w-10 h-10 bg-[#E2725B]/10 rounded-full flex items-center justify-center flex-shrink-0 border border-[#E2725B]/20">
                <Clock size={18} className="text-[#E2725B]" />
              </div>
              <div>
                <p className="text-[#8B7368] text-xs sm:text-sm mb-1 font-medium uppercase tracking-wider">
                  Waktu
                </p>
                <p className="font-bold text-base sm:text-lg text-[#4A352A]">
                  16.30 WIB - Selesai
                </p>
              </div>
            </div>

            {/* TOMBOL ADD TO CALENDAR */}
            <motion.a
              href="https://www.google.com/calendar/render?action=TEMPLATE&text=Buka+Puasa+Bersama+Tax+Laboratory&dates=20260307T090000Z/20260307T140000Z&details=Acara+Buka+Puasa+Bersama+Tax+Laboratory.+Jangan+lupa+datang+ya!&location=Acses+Cafe+%26+Rawon+Sengkel,+Jl.+Akses+UI,+Depok" 
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-2 w-full mt-4 py-3 bg-[#E2725B]/10 hover:bg-[#E2725B] text-[#E2725B] hover:text-white rounded-xl border border-[#E2725B]/20 transition-all duration-300 font-bold text-sm"
            >
              <ArrowUpRight size={16} />
              SIMPAN KE GOOGLE CALENDAR
            </motion.a>
          </div>
        </AnimatedCard>

        {/* LOKASI - TERRACOTTA */}

        <AnimatedCard className="bg-white/80 backdrop-blur-sm border border-[#E2725B]/10 rounded-2xl sm:rounded-3xl p-5 md:p-7 shadow-lg relative overflow-hidden">
          {/* HEADER DENGAN ORNAMENT */}

          <div className="relative mb-6 pb-4">
            <h2 className="text-2xl md:text-3xl font-serif text-center text-[#E2725B] font-bold relative z-10 pt-2">
              Lokasi Acara
            </h2>

            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#E2725B]/30 to-transparent"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex flex-col items-center text-center justify-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-[#E2725B]/20 to-[#C85A46]/20 rounded-full flex items-center justify-center shadow-md border-2 border-[#E2725B]/20">
                <MapPin size={32} className="text-[#E2725B]" />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-bold text-[#4A352A]">
                 Acses cafe
                </h3>

                <p className="text-gray-600 text-sm sm:text-base px-2">
                  Jl. Akses UI No.43, Tugu, Kec. Cimanggis, Kota Depok, Jawa Barat 16451
                </p>
              </div>

              
              <a
                href="https://maps.app.goo.gl/QEz13ij84zkqzBdw8" // Ganti dengan link lokasi spesifik Anda
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#E2725B] to-[#C85A46] text-white rounded-full text-sm font-bold hover:shadow-lg hover:scale-105 transition-all duration-300 shadow-md border-2 border-[#E2725B]/20"
              >
                <ArrowUpRight size={16} />
                Buka di Google Maps
              </a>
            </div>

            <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200 h-64 w-full relative">
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10 pointer-events-none"></div>

              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.3011117944143!2d106.84034849999999!3d-6.3550537!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ed9d664ed2df%3A0x13009659ced43945!2sAcses%20cafe%26Rawon%20sengkel!5e0!3m2!1sid!2sid!4v1771394363179!5m2!1sid!2sid" 
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale hover:grayscale-0 transition-all duration-500"
                title="Acses Cafe"
              >
              </iframe>
            </div>
          </div>
        </AnimatedCard>

        {/* DRESSCODE SECTION - PREMIUM LOOK */}
        <AnimatedCard className="bg-white/90 backdrop-blur-md border border-[#E2725B]/10 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          {/* Header dengan Ornamen Garis Estetik */}
          <div className="relative mb-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="h-[1px] w-8 sm:w-12 bg-gradient-to-r from-transparent to-[#E2725B]"></div>
              <Shirt size={20} className="text-[#E2725B] opacity-70" />
              <div className="h-[1px] w-8 sm:w-12 bg-gradient-to-l from-transparent to-[#E2725B]"></div>
            </div>
            <h2 className="text-2xl md:text-3xl font-serif text-[#E2725B] font-bold tracking-wide">
              Dresscode
            </h2>
            <p className="text-[10px] sm:text-xs text-[#8B7368] uppercase tracking-[0.2em] mt-1 font-medium">
              Ketentuan Pakaian
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {/* KOLOM WANITA */}
            <div className="group relative">
              <div className="bg-gradient-to-b from-[#E2725B]/5 to-transparent rounded-2xl p-5 border border-[#E2725B]/10 group-hover:border-[#E2725B]/30 transition-all duration-500 shadow-sm hover:shadow-md">
                {/* Gender Icon Badge */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white border border-[#E2725B]/20 px-4 py-1 rounded-full shadow-sm z-20">
                  <span className="text-[#E2725B] text-xs font-bold flex items-center gap-2">
                    <span className="text-lg">♀</span> WANITA
                  </span>
                </div>

                {/* Image Slider Container */}
                <div className="bg-white/60 backdrop-blur-sm border border-white rounded-xl p-3 mb-4 shadow-inner overflow-hidden mt-2">
                  <div className="bg-gradient-to-br from-gray-50 to-white rounded-lg">
                    <SmoothSlider
                      imageList={listBajuWanita}
                      currentIndex={idxWanita}
                      altText="Dresscode Wanita"
                    />
                  </div>
                </div>

                {/* Label Deskripsi */}
                <div className="text-center">
                  <span className="inline-block px-3 py-1 bg-[#E2725B] text-white text-[10px] sm:text-xs rounded-md font-bold tracking-wider shadow-sm mb-1">
                    GAMIS
                  </span>
                  <p className="text-[10px] text-[#8B7368] italic mt-1">
                    Sopan & Menutup Aurat
                  </p>
                </div>
              </div>
            </div>

            {/* KOLOM LAKI-LAKI */}
            <div className="group relative">
              <div className="bg-gradient-to-b from-[#C85A46]/5 to-transparent rounded-2xl p-5 border border-[#C85A46]/10 group-hover:border-[#C85A46]/30 transition-all duration-500 shadow-sm hover:shadow-md">
                {/* Gender Icon Badge */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white border border-[#C85A46]/20 px-4 py-1 rounded-full shadow-sm z-20">
                  <span className="text-[#C85A46] text-xs font-bold flex items-center gap-2">
                    <span className="text-lg">♂</span> LAKI-LAKI
                  </span>
                </div>

                {/* Image Slider Container */}
                <div className="bg-white/60 backdrop-blur-sm border border-white rounded-xl p-3 mb-4 shadow-inner overflow-hidden mt-2">
                  <div className="bg-gradient-to-br from-gray-50 to-white rounded-lg">
                    <SmoothSlider
                      imageList={listBajuPria}
                      currentIndex={idxPria}
                      altText="Dresscode Pria"
                    />
                  </div>
                </div>

                {/* Label Deskripsi */}
                <div className="text-center">
                  <span className="inline-block px-3 py-1 bg-[#C85A46] text-white text-[10px] sm:text-xs rounded-md font-bold tracking-wider shadow-sm mb-1">
                    BAJU KOKO
                  </span>
                  <p className="text-[10px] text-[#8B7368] italic mt-1">
                    Warna Bebas, Rapi & Bersih
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Aksen Dekoratif Pojok (Opsional) */}
          <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-[#E2725B]/5 rounded-full blur-2xl"></div>
          <div className="absolute -top-6 -left-6 w-20 h-20 bg-[#C85A46]/5 rounded-full blur-2xl"></div>
        </AnimatedCard>

        {/* RSVP - PREMIUM INTERACTIVE CARD */}
        <AnimatedCard className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#E2725B] via-[#C85A46] to-[#A04438] p-8 md:p-12 text-center text-white shadow-[0_20px_50px_rgba(226,114,91,0.3)] border border-white/20">
          {/* 1. Background Ornaments (Efek Tekstur & Floating) */}
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/islamic-exercise.png')] pointer-events-none"></div>

          {/* Dekorasi Cahaya (Glow) */}
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-black/20 rounded-full blur-3xl pointer-events-none"></div>

          {/* 2. Floating Icons (Animasi melayang halus) */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-10 right-10 opacity-20 hidden sm:block"
          >
            <Clock size={40} />
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute bottom-10 left-10 opacity-20 hidden sm:block"
          >
            <MapPin size={40} />
          </motion.div>

          <div className="relative z-10">
            {/* Icon Header */}
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl">
                <Shirt className="text-white w-8 h-8" />
              </div>
            </div>

            <h2 className="text-3xl md:text-4xl font-serif mb-4 font-bold tracking-tight">
              Konfirmasi Kehadiran
            </h2>

            <div className="w-20 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent mx-auto mb-6"></div>

            <p className="text-white/80 mb-10 max-w-md mx-auto text-sm sm:text-lg leading-relaxed font-light">
              Agar kami dapat mempersiapkan hidangan dengan baik, mohon
              kesediaan Anda untuk mengisi form kehadiran.
            </p>

            {/* 3. Button RSVP dengan Efek Pop-up & Shine */}
            <motion.a
              href="https://forms.gle/KLioAGFnh4zPKDCEA" // GANTI DENGAN LINK GFORM KAMU
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative inline-flex items-center gap-3 bg-white text-[#C85A46] px-10 py-5 rounded-full text-lg font-bold shadow-[0_10px_30px_rgba(0,0,0,0.2)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.3)] transition-all duration-300 overflow-hidden"
            >
              {/* Efek Kilau (Shine Effect) */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none"></div>

              <Calendar
                size={22}
                className="group-hover:rotate-12 transition-transform duration-300"
              />
              <span>ISI FORM KEHADIRAN</span>
            </motion.a>

            <p className="mt-6 text-white/60 text-[10px] sm:text-xs tracking-[0.2em] uppercase font-bold">
              Paling lambat: Jumat, 27 Februari 2026
            </p>
          </div>

          {/* Inline Style untuk Animasi Shimmer */}
          <style>{`
    @keyframes shimmer {
      100% { transform: translateX(100%); }
    }
  `}</style>
        </AnimatedCard>
        {/* FOOTER */}
        <AnimatedCard className="text-center text-xs text-gray-500 pt-8 pb-6 relative">
          <p className="font-serif font-medium tracking-wider text-[#E2725B]">
            TAX LABORATORY © 2026
          </p>
          <p className="mt-3 opacity-70 text-[#C85A46]">
            Created with ♥ for Ramadan 1447 H
          </p>
        </AnimatedCard>
      </div>
    </div>
  );
};

const Invitation = () => {
  const [isFlapOpen, setIsFlapOpen] = useState(false);
  const [isLetterVisible, setIsLetterVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleOpenEnvelope = () => {
    if (!isFlapOpen) {
      setIsFlapOpen(true);
      setTimeout(() => {
        setIsLetterVisible(true);
      }, 300);
    }
  };

  const handleExpandLetter = () => {
    setIsExpanded(true);
  };

  const handleClose = (e) => {
    e.stopPropagation();
    setIsExpanded(false);
  };

  return (
    // UBAH DISINI: bg-transparent agar kurma di belakang terlihat, z-10 agar di atas kurma
    <div className="flex flex-col items-center justify-center min-h-[100dvh] bg-transparent font-sans px-4 overflow-hidden relative pb-12 z-10">
      {/* Background Pattern - Terracotta subtle */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/terracotta.png')]"
        style={{
          backgroundImage: `radial-gradient(circle at 10% 20%, rgba(226, 114, 91, 0.05) 0%, rgba(226, 114, 91, 0) 20%)`,
        }}
      ></div>

      <p
        className={`text-[#E2725B] font-serif tracking-[0.2em] text-[10px] sm:text-xs uppercase z-40 transition-all duration-500 mb-6 sm:mb-8 ${isFlapOpen ? "opacity-0 -translate-y-4" : "opacity-100 animate-pulse"}`}
      >
        Ketuk amplop untuk membuka
      </p>

      {/* --- WRAPPER AMPLOP SCALING --- */}
      <div
        className={`relative transform transition-transform duration-500 ease-out scale-[0.75] sm:scale-[0.85] md:scale-100 2xl:scale-110 ${isExpanded ? "z-50" : ""}`}
      >
        {/* --- BODY AMPLOP --- */}
        <div
          className={`relative w-[330px] h-[220px] transition-all duration-700 ease-in-out ${isExpanded ? "" : "bg-[#5D291F] cursor-pointer hover:scale-105"}`}
          onClick={handleOpenEnvelope}
        >
          {/* KERTAS SURAT - TERRACOTTA */}
          <div
            className={`bg-[#FFF8F5] shadow-2xl text-[#4A352A] flex flex-col items-center transition-all duration-[1000ms] ease-[cubic-bezier(0.25,0.8,0.25,1)] relative overflow-hidden 
      ${
        isExpanded
          ? "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 " +
            "w-[105vw] h-[95vh] " + // UKURAN MOBILE (Hampir Full Screen)
            "sm:w-[94vw] sm:h-[94vh] " + // UKURAN PC (Tetap Portrait, Gak Melar)
            "z-50 rounded-2xl overflow-hidden cursor-default border border-white/50 scale-100 opacity-100"
          : "absolute left-1/2 -translate-x-1/2 w-[90%] h-[88%] rounded-sm p-4 cursor-default " +
            (isLetterVisible
              ? "-translate-y-[200px] scale-[1.10] sm:-translate-y-[150px] sm:scale-100 z-50 opacity-100"
              : "bottom-2 translate-y-0 z-0 opacity-0 pointer-events-none")
      }`}
          >
            {/* PAPER TEXTURE BACKGROUND */}
            <div className="absolute inset-0 opacity-3 bg-[url('image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PHBhdGggZD0iTTAgMGgyMHYyMEgweiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0wIDBoMjB2MkgweiIgZmlsbD0iI2ZmZiIgb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')]" />

            {/* CORNER DECORATIONS */}
            <div className="absolute top-4 left-4 w-3 h-3 border-t-2 border-l-2 border-[#E2725B]/30 rounded-tl-lg"></div>
            <div className="absolute top-4 right-4 w-3 h-3 border-t-2 border-r-2 border-[#E2725B]/30 rounded-tr-lg"></div>
            <div className="absolute bottom-4 left-4 w-3 h-3 border-b-2 border-l-2 border-[#E2725B]/30 rounded-bl-lg"></div>
            <div className="absolute bottom-4 right-4 w-3 h-3 border-b-2 border-r-2 border-[#E2725B]/30 rounded-br-lg"></div>

            {/* SUBTLE PATTERN OVERLAY */}
            <div className="absolute inset-0 opacity-3 bg-[url('https://www.transparenttextures.com/patterns/escheresque.png')]" />

            <button
              onClick={handleClose}
              className={`absolute top-4 right-4 z-50 text-[#E2725B] bg-white/50 hover:bg-[#E2725B] hover:text-white p-2 rounded-full transition-all duration-500 shadow-sm ${isExpanded ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            >
              <X size={24} />
            </button>

            <div
              className={`w-full h-full overflow-y-auto scrollbar-hide ${isExpanded ? "p-0" : "p-2 flex flex-col justify-between overflow-hidden"}`}
            >
              <div
                className={`border-[3px] border-double border-[#E2725B]/30 pointer-events-none transition-all duration-1000 ${isExpanded ? "w-full min-h-full rounded-none p-4 sm:p-8 pointer-events-auto" : "absolute inset-2 border-[2px]"}`}
              >
                <div
                  className={`flex flex-col items-center text-center transition-all duration-500 ${isExpanded ? "hidden" : "block mt-2"}`}
                >
                  <p className="text-[10px] sm:text-xs text-[#E2725B] tracking-[0.3em] uppercase font-serif mb-2">
                    Undangan Resmi
                  </p>
                  <h1 className="font-serif font-bold text-[#C85A46] leading-none text-xl sm:text-3xl">
                    Buka Puasa
                  </h1>
                  <p className="text-[#E2725B] font-serif text-[10px] sm:text-sm italic">
                    Ramadan 1447 H
                  </p>
                </div>

                <div
  className={`text-center space-y-3 mt-auto mb-5 transition-all duration-300 pointer-events-auto ${isExpanded ? "hidden" : "block"}`}
>
  {/* LABEL TAX LABORATORY - UKURAN SEDANG & ELEGAN */}
  <div className="bg-[#E2725B]/8 px-5 py-1.5 inline-block rounded-md mb-0.5 border border-[#E2725B]/15">
    <p className="font-bold text-[#4A352A] text-[11px] sm:text-sm tracking-widest uppercase">
      Tax Laboratory
    </p>
  </div>

  {/* BUTTON BUKA DETAIL - UKURAN PAS UNTUK JEMPOL */}
  <button
    onClick={(e) => {
      e.stopPropagation();
      handleExpandLetter();
    }}
    className={`relative z-40 bg-[#E2725B] text-white text-[11px] sm:text-xs font-bold py-3 px-8 rounded-full shadow-lg hover:bg-[#C85A46] cursor-pointer transition-all active:scale-95 ${
      isLetterVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
    }`}
  >
    BUKA DETAIL
  </button>
</div>  
                <FullInvitationContent isVisible={isExpanded} />
              </div>
            </div>
          </div>

          {/* --- ELEMEN AMPLOP VISUAL --- */}
          {/* KIRI - KANAN (Terracotta Medium) */}
          <div className="absolute top-0 left-0 w-0 h-0 border-l-[160px] border-l-[#C85A46] border-t-[110px] border-t-transparent border-b-[110px] border-b-transparent rounded-l-md z-20 pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-0 h-0 border-r-[160px] border-r-[#C85A46] border-t-[110px] border-t-transparent border-b-[110px] border-b-transparent rounded-r-md z-20 pointer-events-none"></div>

          {/* BAWAH (Terracotta Dark - #A04438) */}
          <div className="absolute bottom-0 left-0 w-full h-0 border-b-[120px] border-b-[#A04438] border-l-[160px] border-l-transparent border-r-[160px] border-r-transparent rounded-b-md z-30 pointer-events-none shadow-md"></div>

          {/* ATAS (FLAP) - DYNAMIC COLOR */}
          {/* Logic: Kalau tutup = #A04438 (sama kayak bawah), Kalau buka = #D48A7A (lebih terang) */}
          <div
            className={`absolute top-0 left-0 w-full h-0 border-t-[130px] border-l-[160px] border-l-transparent border-r-[160px] border-r-transparent origin-top transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] 
            ${isFlapOpen ? "border-t-[#D48A7A] rotate-x-180 z-0" : "border-t-[#A04438] z-40"}`}
          >
            {/* Shadow overlay saat tertutup */}
            {!isFlapOpen && (
              <div className="absolute -top-[130px] -left-[160px] w-full h-full bg-black/10 clip-path-triangle pointer-events-none"></div>
            )}
          </div>

          {/* LOGO TENGAH */}
          <div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-[#D4AF37] rounded-full shadow-lg border-[3px] border-[#B8860B]/40 flex items-center justify-center z-50 transition-all duration-500 ${isFlapOpen ? "opacity-0 scale-50" : "opacity-100 scale-100"}`}
          >
            <div
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-[#D4AF37] rounded-full shadow-lg border-[3px] border-[#B8860B]/40 flex items-center justify-center z-50 transition-all duration-500 overflow-hidden ${
                isFlapOpen ? "opacity-0 scale-50" : "opacity-100 scale-100"
              }`}
            >
              {/* Gunakan tag img di sini */}
              <img
                src={Tax}
                alt="Logo Seal"
                className="w-full h-full object-cover rounded-full p-1.5" // p-1.5 biar ada jarak sedikit dari border emasnya
              />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .clip-path-triangle { clip-path: polygon(50% 100%, 0 0, 100% 0); }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default Invitation;
