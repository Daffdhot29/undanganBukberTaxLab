import { useNavigate } from "react-router-dom";
import Template from "../img/Template.png";
import { Sparkles } from "lucide-react";

function Home() {
  const navigate = useNavigate();

  return (
    // UBAH DISINI: bg-transparent agar kurma di belakang terlihat
    <div className="relative flex items-center justify-center min-h-screen px-4 bg-transparent font-sans overflow-hidden">
      
      {/* Background Pattern - Tetap ada tapi transparan (opacity rendah) */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#C86B4A_1px,transparent_1px)] [background-size:20px_20px]"></div>
      
      {/* Card Wrapper */}
      <div className="relative w-full max-w-[380px] bg-[#FDFCF0]/95 backdrop-blur-sm rounded-[2.5rem] overflow-hidden shadow-2xl shadow-[#8B3E2F]/10 border-[8px] border-white ring-1 ring-[#EADBC8] text-center pb-12 transition-all duration-500 hover:shadow-orange-900/20 group">
        
        {/* Decorative Inner Border */}
        <div className="absolute inset-3 rounded-[2rem] border border-[#C86B4A]/20 pointer-events-none z-50"></div>

        {/* Header Image Section */}
        <div className="relative h-72 w-full mb-2 overflow-hidden">
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#8B3E2F]/10 to-transparent z-10 mix-blend-multiply" />
          
          <img
            src={Template}
            alt="Bukber 2026"
            className="w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-105"
          />
          
          {/* Masking Bawah */}
          <div className="absolute -bottom-1 left-0 right-0 h-24 bg-gradient-to-t from-[#FDFCF0] via-[#FDFCF0]/90 to-transparent z-20" />
        </div>

        {/* Content Section */}
        <div className="px-8 relative z-30 -mt-10">
          
          {/* Ornamen Sparkle */}
          <div className="flex justify-center mb-4">
            <div className="bg-[#FDFCF0] p-2 rounded-full shadow-sm border border-[#C86B4A]/10">
               <Sparkles size={20} className="text-[#C86B4A] animate-pulse" />
            </div>
          </div>

          <div className="space-y-2 mb-10">
            <p className="text-[#C86B4A] font-serif italic text-sm tracking-wider opacity-80">
              Undangan Resmi
            </p>
            <h1 className="text-4xl font-serif font-bold text-[#8B3E2F] leading-tight drop-shadow-sm">
              Buka Puasa <br />
              <span className="text-[#C86B4A] text-3xl font-normal italic">
                Bersama
              </span>
            </h1>
            
            {/* Divider */}
            <div className="flex items-center justify-center gap-2 mt-4 opacity-50">
              <div className="h-[1px] w-8 bg-[#8B3E2F]"></div>
              <p className="text-[#8B3E2F] font-semibold text-[11px] tracking-[0.3em] uppercase">
                Ramadhan 1447H
              </p>
              <div className="h-[1px] w-8 bg-[#8B3E2F]"></div>
            </div>
          </div>
          
          {/* Button Section */}
          <div className="flex justify-center px-2">
            <button
              onClick={() => navigate("/Invitation")}
              className="relative overflow-hidden w-full max-w-[260px] group/btn bg-gradient-to-r from-[#C86B4A] to-[#A04438] text-white py-4 px-8 
                          rounded-full font-bold text-sm tracking-[0.15em] uppercase shadow-lg shadow-[#C86B4A]/30
                          hover:shadow-xl hover:shadow-[#C86B4A]/40 hover:-translate-y-1 active:scale-95 transition-all duration-300"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Buka Undangan
              </span>
              {/* Efek Kilau */}
              <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform skew-x-12 transition-all duration-700 group-hover/btn:left-[100%]" />
            </button>
          </div>

          {/* Footer Quote */}
          <div className="mt-10 space-y-1">
            <p className="text-[#8B3E2F]/40 text-[10px] uppercase tracking-widest font-medium">
              Tax Laboratory
            </p>
            <p className="text-[#C86B4A]/60 text-[10px] italic font-serif">
              "Menyambung kasih, berbagi berkah"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;