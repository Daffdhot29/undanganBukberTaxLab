import React, { useRef, useEffect, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import Ramadhan from "../img/Ramadhan.mp3";

const Backsound = () => {
  const audioRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // ========================================
    // AUTO-PLAY DENGAN FALLBACK
    // ========================================
    const playAudio = () => {
      audio.play()
        .catch(() => {
          const handleClick = () => {
            audio.play().catch(console.error);
            document.removeEventListener('click', handleClick);
          };
          document.addEventListener('click', handleClick, { once: true });
        });
    };

    const timer = setTimeout(playAudio, 1000);
    
    // ========================================
    // SYNC AUDIO MUTED STATE DENGAN REACT STATE
    // ========================================
    const handleVolumeChange = () => {
      setIsMuted(audio.muted);
    };

    audio.addEventListener('volumechange', handleVolumeChange);
    
    // ========================================
    // PAGE VISIBILITY API - PAUSE/RESUME AUDIO
    // ========================================
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (!audio.paused) {
          audio.pause();
        }
      } else {
        if (!audio.muted && audio.paused) {
          audio.play().catch(() => {});
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // ========================================
    // CLEANUP
    // ========================================
    return () => {
      clearTimeout(timer);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      audio.pause();
      audio.removeEventListener('volumechange', handleVolumeChange);
    };
  }, []);

  // Toggle mute state
  const toggleMute = () => {
    setIsMuted(prev => !prev);
  };

  return (
    <>
      {/* AUDIO ELEMENT - BINDER MUTED STATE */}
      <audio
        ref={audioRef}
        src={Ramadhan}
        loop
        preload="auto"
        muted={isMuted}
        className="hidden"
      />

      {/* VOLUME BUTTON - POJOK KANAN ATAS */}
      <button
        onClick={toggleMute}
        className="fixed top-4 right-4 z-50 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-all duration-300 hover:scale-105 active:scale-95"
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? (
          <VolumeX size={24} className="text-[#E2725B]" />
        ) : (
          <Volume2 size={24} className="text-[#E2725B]" />
        )}
      </button>
    </>
  );
};

export default Backsound;