"use client";
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { Droplet, ArrowRight, MapPin } from "lucide-react";

export default function Hero() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // 1. Background Zoom
      gsap.to(".hero-bg-img", {
        scale: 1.15,
        duration: 15,
        ease: "none",
        repeat: -1,
        yoyo: true,
      });

      // 2. 3D Text Reveal
      tl.from(".word-reveal", {
        y: 50,
        rotationX: -90,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        transformOrigin: "50% 50% -50px",
        ease: "power4.out",
      });

      // 3. Fade Elements
      tl.from(".fade-up", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      }, "-=0.8");

      // 4. Buttons Entry
      tl.from(".hero-btn", {
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "elastic.out(1, 0.6)",
        clearProps: "all"
      }, "-=0.5");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // MAGNETIC BUTTON LOGIC
  const handleMagneticMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const btn = e.currentTarget;
    const { left, top, width, height } = btn.getBoundingClientRect();
    const x = e.clientX - (left + width / 2);
    const y = e.clientY - (top + height / 2);

    gsap.to(btn, {
      x: x * 0.2,
      y: y * 0.2,
      duration: 0.5,
      ease: "power3.out"
    });
  };

  const handleMagneticLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, { x: 0, y: 0, duration: 1, ease: "elastic.out(1, 0.3)" });
  };

  return (
    <section ref={containerRef} className="relative w-full h-[100dvh] min-h-[700px] overflow-hidden bg-black perspective-1000">

      {/* 1. BACKGROUND LAYER */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Dark Overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-[#050505] z-20" />

        {/* Ambient Glows */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#E63946]/20 rounded-full blur-[120px] animate-pulse z-10" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#FFC107]/10 rounded-full blur-[120px] animate-pulse z-10" />

        <div className="w-full h-full relative overflow-hidden">
            <Image
            src="/assets/hero-bg.jpeg"
            alt="Alniaz Petroleums Chichawatni"
            fill
            priority
            className="hero-bg-img object-cover object-center"
            />
        </div>
      </div>

      {/* 2. CONTENT LAYER */}
      {/* FIXES APPLIED:
         - pt-32 md:pt-48: Padding Top barha dia taake Header k neechay na chupay.
         - justify-center: Content vertically center rahay.
      */}
      <div className="relative z-30 w-full h-full flex flex-col items-center justify-center px-4 md:px-6 pt-32 pb-20 md:pt-48 md:pb-32">

        <div className="text-center max-w-7xl mx-auto flex flex-col items-center w-full">

            {/* Location Badge (Responsive Fix) */}
            <div className="fade-up mb-6 md:mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md shadow-lg shadow-black/50">
                <MapPin size={14} className="text-[#E63946] shrink-0" />
                <span className="text-[10px] md:text-xs font-bold text-gray-200 tracking-[0.15em] uppercase text-center">
                  Bypass Road • Chichawatni
                </span>
              </div>
            </div>

            {/* MAIN TITLE (Sizing Reduced) */}
            <div className="mb-8 md:mb-10 perspective-text w-full">
              <h1 className="font-black text-white leading-[0.95] tracking-tighter">
                {/* 1. ALNIAZ */}
                <div className="overflow-hidden py-1">
                  <span className="word-reveal inline-block drop-shadow-2xl text-4xl sm:text-6xl md:text-7xl lg:text-8xl">
                    ALNIAZ
                  </span>
                </div>

                {/* 2. PETROLEUM */}
                <div className="overflow-hidden py-1">
                  <span className="word-reveal inline-block text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
                    PETROLEUM
                  </span>
                </div>

                {/* 3. CHICHAWATNI (Highlighted) */}
                <div className="overflow-hidden py-2 mt-2">
                  <span className="word-reveal inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#E63946] via-red-500 to-[#FFC107] font-[900] tracking-wide scale-105 transform origin-center drop-shadow-[0_0_30px_rgba(230,57,70,0.5)] text-4xl sm:text-6xl md:text-7xl lg:text-8xl">
                    CHICHAWATNI
                  </span>
                </div>
              </h1>
            </div>

            {/* Description */}
            <p className="fade-up text-sm sm:text-base md:text-lg text-gray-300 max-w-xs sm:max-w-lg md:max-w-2xl mx-auto mb-10 md:mb-12 font-medium leading-relaxed px-4">
              The most trusted fuel station in <span className="text-white font-bold underline decoration-[#FFC107] underline-offset-4">Chichawatni</span>.
              Pure quality, accurate measurement, and premium service.
            </p>

            {/* BUTTONS (Sizing Fixed + Color Fixed) */}
            <div className="fade-up flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-sm md:max-w-none relative z-40">

              {/* Red Button */}
              <Link
                href="/rates"
                onMouseMove={handleMagneticMove}
                onMouseLeave={handleMagneticLeave}
                className="hero-btn relative group w-full sm:w-auto px-8 py-3.5 bg-[#E63946] text-white font-bold text-sm md:text-base rounded-full overflow-hidden shadow-[0_10px_30px_rgba(230,57,70,0.4)] transition-all hover:shadow-[0_15px_40px_rgba(230,57,70,0.6)] active:scale-95 flex justify-center items-center"
              >
                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out" />

                <span className="relative z-10 flex items-center gap-2">
                  Check Fuel Rates <Droplet size={16} className="fill-white" />
                </span>
              </Link>

              {/* Outline Button */}
              <Link
                href="/services"
                onMouseMove={handleMagneticMove}
                onMouseLeave={handleMagneticLeave}
                className="hero-btn relative group w-full sm:w-auto px-8 py-3.5 bg-white/5 backdrop-blur-md border border-white/20 text-white font-bold text-sm md:text-base rounded-full overflow-hidden hover:bg-white hover:text-black transition-all active:scale-95 flex justify-center items-center"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Our Services <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </div>
        </div>

      </div>

      {/* 3. SCROLL HINT */}
      {/* Positioned Absolutely at bottom center */}
      <div className="fade-up absolute bottom-8 left-1/2 -translate-x-1/2 z-30 opacity-70 pointer-events-none">
        <div className="w-[20px] h-[35px] md:w-[26px] md:h-[42px] border-2 border-white/30 rounded-full flex justify-center p-1.5 shadow-[0_0_15px_rgba(0,0,0,0.5)] bg-black/20 backdrop-blur-sm">
            <div className="w-1 md:w-1.5 h-1 md:h-1.5 bg-white rounded-full animate-bounce" />
        </div>
      </div>

      <style jsx>{`
        .perspective-text {
          perspective: 1000px;
        }
      `}</style>

    </section>
  );
}
