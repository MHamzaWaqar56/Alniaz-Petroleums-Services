"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { MapPin, Calendar, Activity } from "lucide-react";
import BrandLogo from "@/components/ui/BrandLogo"; // ✅ Import Logo Component

export default function Preloader() {
  const containerRef = useRef(null);
  const [show, setShow] = useState(true);
  const [particleData, setParticleData] = useState<any[]>([]);

  // --- 1. GENERATE PARTICLES (Client Side Only) ---
  useEffect(() => {
    const generatedParticles = Array.from({ length: 20 }).map((_, i) => ({
      left: Math.random() * 100,
      width: Math.random() * 4 + 2,
      height: Math.random() * 40 + 10,
      color: i % 2 === 0 ? '#E63946' : '#FFB703',
      opacity: Math.random() * 0.5 + 0.1,
      delay: Math.random() * 0.5
    }));
    setParticleData(generatedParticles);
  }, []);

  // --- 2. GSAP ANIMATION SEQUENCE ---
  useEffect(() => {
    if (particleData.length === 0) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.to(containerRef.current, {
            yPercent: -100,
            duration: 0.8,
            ease: "power4.inOut",
            onComplete: () => setShow(false)
          });
        }
      });

      // A. Status Text Cycle
      const statuses = ["SYSTEM CHECK...", "CALIBRATING PUMPS...", "CHECKING DENSITY...", "READY TO FUEL"];
      const statusBox = document.getElementById("status-text");

      statuses.forEach((text, i) => {
        setTimeout(() => {
          if(statusBox) statusBox.innerText = text;
        }, i * 800);
      });

      // B. Main Animations
      tl.to(".liquid-mask", {
        height: "100%",
        duration: 3,
        ease: "power2.inOut"
      })
      .to(".progress-bar-fill", {
        width: "100%",
        duration: 3,
        ease: "power2.inOut"
      }, "<")
      .to({ val: 0 }, {
        val: 100,
        duration: 3,
        ease: "power2.inOut",
        onUpdate: function() {
          const el = document.getElementById("loader-counter");
          if (el) el.innerText = Math.round(this.targets()[0].val).toString().padStart(2, '0');
        }
      }, "<");

    }, containerRef);

    return () => ctx.revert();
  }, [particleData]);

  if (!show) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center text-white overflow-hidden font-sans"
    >

      {/* --- BACKGROUND DECORATION --- */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
         <div className="absolute left-6 md:left-20 h-full w-[1px] bg-white/10" />
         <div className="absolute right-6 md:right-20 h-full w-[1px] bg-white/10" />
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] md:bg-[size:60px_60px]" />
         <div className="absolute inset-0 bg-radial-gradient(circle at center, transparent 0%, #050505 90%)" />
      </div>

      {/* --- PARTICLES --- */}
      {particleData.map((p, i) => (
        <div
          key={i}
          className="absolute bottom-0 rounded-full animate-float-up z-0"
          style={{
            left: `${p.left}%`,
            width: `${p.width}px`,
            height: `${p.height}px`,
            backgroundColor: p.color,
            opacity: p.opacity,
            animationDuration: `${Math.random() * 2 + 2}s`,
            animationDelay: `${Math.random()}s`
          }}
        />
      ))}

      {/* --- MAIN CONTENT WRAPPER --- */}
      <div className="relative z-30 flex flex-col items-center justify-between h-full w-full max-w-7xl px-6 py-8 md:py-20">

        {/* TOP: STATUS BAR */}
        <div className="w-full flex justify-between items-start">
           <div className="hidden md:flex flex-col gap-1 text-[10px] text-gray-500 font-mono">
              <span>LAT: 30.54179° N</span>
              <span>LNG: 72.71709° E</span>
           </div>

           <div className="flex items-center gap-3 bg-white/5 px-4 md:px-6 py-2 rounded-full border border-white/10 backdrop-blur-md shadow-lg mx-auto md:mx-0">
              <Activity size={14} className="text-green-500 animate-pulse" />
              <span id="status-text" className="text-[10px] md:text-xs font-mono font-bold text-green-400 tracking-widest min-w-[140px] text-center">
                INITIALIZING...
              </span>
           </div>

           <div className="hidden md:flex flex-col gap-1 text-[10px] text-gray-500 font-mono text-right">
              <span>VOL: 220V</span>
              <span>HZ: 50/60</span>
           </div>
        </div>


        {/* CENTER: LOGO & GIANT TYPOGRAPHY */}
        <div className="relative w-full text-center my-auto flex flex-col items-center gap-4 md:gap-8">

          {/* ✅ 1. NEW LOGO ADDED HERE */}
          <div className="relative z-50 animate-pulse-slow drop-shadow-[0_0_20px_rgba(255,183,3,0.3)]">
            {/* Using scale to make it bigger without changing the component code */}
            <div className="scale-125 md:scale-[2.0]">
               <BrandLogo showText={false} />
            </div>
          </div>

          <div className="relative">
             {/* GHOST TEXT */}
             <div className="relative text-transparent stroke-text select-none opacity-20 leading-[0.85] md:leading-[0.85]">
                <h1 className="text-[12vw] md:text-[10vw] font-black tracking-tighter">ALNIAZ</h1>
                <h2 className="text-[7vw] md:text-[6vw] font-bold tracking-[0.2em] ml-1">PETROLEUM</h2>
             </div>

             {/* FILL TEXT (Animated) */}
             <div className="liquid-mask absolute bottom-0 left-0 w-full h-0 overflow-hidden transition-all flex flex-col items-center justify-end pb-[1%] md:pb-[1.5%]">
                <div className="leading-[0.85] md:leading-[0.85] text-center">
                   <h1 className="text-[12vw] md:text-[10vw] font-black tracking-tighter text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                     ALNIAZ
                   </h1>
                   <h2 className="text-[7vw] md:text-[6vw] font-bold tracking-[0.2em] text-zoom-yellow drop-shadow-[0_0_20px_rgba(255,183,3,0.4)] ml-1">
                     PETROLEUM
                   </h2>
                </div>
             </div>
          </div>
        </div>


        {/* BOTTOM: DASHBOARD & COUNTER */}
        <div className="w-full">
           {/* Progress Line */}
           <div className="w-full h-[2px] bg-white/10 mb-6 relative overflow-hidden rounded-full">
              <div className="progress-bar-fill absolute top-0 left-0 h-full w-0 bg-gradient-to-r from-zoom-red to-zoom-yellow shadow-[0_0_10px_#E63946]" />
           </div>

           {/* Info Grid */}
           <div className="grid grid-cols-2 md:grid-cols-3 items-end gap-6">
              <div className="text-left">
                 <div className="flex items-center gap-2 mb-1 text-gray-500">
                    <MapPin size={12} />
                    <p className="text-[10px] uppercase tracking-widest">Location</p>
                 </div>
                 <p className="text-white font-bold text-xs md:text-sm">CHICHAWATNI, PK</p>
              </div>

              <div className="col-span-2 md:col-span-1 order-first md:order-none text-center mb-6 md:mb-0">
                 <div className="inline-flex items-start">
                   <span id="loader-counter" className="text-6xl md:text-8xl font-black text-white leading-none">00</span>
                   <span className="text-lg md:text-2xl text-zoom-red font-bold mt-2">%</span>
                 </div>
              </div>

              <div className="text-right">
                 <div className="flex items-center justify-end gap-2 mb-1 text-gray-500">
                    <p className="text-[10px] uppercase tracking-widest">Est. Year</p>
                    <Calendar size={12} />
                 </div>
                 <p className="text-white font-bold text-xs md:text-sm">2026</p>
              </div>
           </div>
        </div>

      </div>

      <style jsx>{`
        .stroke-text {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.2);
        }
        @keyframes floatUp {
          from { transform: translateY(100vh); opacity: 0; }
          50% { opacity: 0.8; }
          to { transform: translateY(-20vh); opacity: 0; }
        }
        .animate-float-up {
          animation: floatUp linear infinite;
        }
      `}</style>
    </div>
  );
}