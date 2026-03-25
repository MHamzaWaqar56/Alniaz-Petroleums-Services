"use client";
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ArrowLeft, Fuel, TriangleAlert } from "lucide-react";

export default function NotFound() {
  const containerRef = useRef(null);
  const gaugeRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // 1. 404 Text Float Animation
      gsap.to(".error-text", {
        y: -15,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });

      // 2. Needle Drop Animation (Full to Empty)
      gsap.fromTo(gaugeRef.current,
        { rotate: 45 }, // Full
        { rotate: -45, duration: 2, ease: "elastic.out(1, 0.5)", delay: 0.5 } // Empty
      );

      // 3. Glitch Effect on Text
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 3 });
      tl.to(".glitch-text", { skewX: 20, duration: 0.1 })
        .to(".glitch-text", { skewX: -20, duration: 0.1 })
        .to(".glitch-text", { skewX: 0, duration: 0.1 });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main
      ref={containerRef}
      className="h-screen w-full bg-[#020202] flex flex-col items-center justify-center relative overflow-hidden text-white"
    >

      {/* BACKGROUND EFFECTS */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-zoom-red/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-zoom-yellow/5 rounded-full blur-[150px]" />

      {/* CONTENT */}
      <div className="relative z-10 text-center">

        {/* WARNING BADGE */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-zoom-red/10 border border-zoom-red/30 rounded-full text-zoom-red font-bold text-sm tracking-widest uppercase mb-6 animate-pulse">
           <TriangleAlert size={16} />
           <span>Dead End</span>
        </div>

        {/* GIANT 404 WITH GAUGE */}
        <div className="error-text relative flex items-center justify-center gap-4 text-[10rem] md:text-[15rem] font-black leading-none select-none">
          <span className="text-white text-stroke">4</span>

          {/* THE FUEL GAUGE (Acting as '0') */}
          <div className="relative w-[140px] h-[140px] md:w-[200px] md:h-[200px] border-[10px] border-white/10 rounded-full flex items-center justify-center bg-zinc-900 shadow-2xl">
             <div className="absolute bottom-6 font-bold text-gray-500 text-sm">E &nbsp; • &nbsp; F</div>
             <Fuel size={40} className="text-white/20 absolute top-10" />

             {/* The Needle */}
             <div
               ref={gaugeRef}
               className="w-1 h-16 md:h-24 bg-zoom-red origin-bottom absolute bottom-1/2 translate-y-1/2 shadow-[0_0_15px_red]"
               style={{ borderRadius: "50% 50% 0 0" }}
             />
             <div className="w-4 h-4 bg-white rounded-full absolute" />
          </div>

          <span className="text-white text-stroke">4</span>
        </div>

        {/* MESSAGE */}
        <h2 className="glitch-text text-3xl md:text-5xl font-bold text-white mb-4 mt-4">
          LOOKS LIKE YOU'RE <span className="text-zoom-yellow">LOST</span>
        </h2>
        <p className="text-gray-400 text-lg max-w-lg mx-auto mb-10 leading-relaxed">
          The page you are looking for has run out of fuel or doesn't exist. Let's get you back to the main station.
        </p>

        {/* BACK BUTTON */}
        <Link
          href="/"
          className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-bold text-lg rounded-full hover:bg-zoom-red hover:text-white hover:scale-105 transition-all shadow-xl shadow-white/10 hover:shadow-red-900/50"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

      </div>

      <style jsx>{`
        .text-stroke {
          -webkit-text-stroke: 2px rgba(255,255,255,0.1);
          color: transparent;
        }
      `}</style>

    </main>
  );
}