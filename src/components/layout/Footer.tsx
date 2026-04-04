"use client";
import React from "react";
import Link from "next/link";
import { Facebook, Instagram, ArrowRight, Code, Heart, Phone, Mail } from "lucide-react";
import BrandLogo from "@/components/ui/BrandLogo";

// Custom TikTok Icon
const TikTokIcon = ({ size = 18, className }: { size?: number, className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="relative w-full bg-[#020202] text-white pt-32 pb-8 z-10 overflow-hidden">

      {/* =====================================================================
          🔥 GLOWING HORIZON
      ===================================================================== */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-zoom-red to-transparent opacity-80 shadow-[0_0_40px_#E63946] z-20"></div>

      <div className="absolute top-0 left-0 w-full h-[400px] z-0 pointer-events-none perspective-[500px] overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [transform:rotateX(60deg)_translateY(-100px)_scale(1.5)] opacity-30 origin-top"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#020202] via-transparent to-[#020202]"></div>
      </div>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[200px] bg-zoom-red/10 rounded-[100%] blur-[80px] animate-pulse-slow mix-blend-screen pointer-events-none z-0"></div>

      {/* GIANT WATERMARK */}
      <div className="absolute bottom-0 left-0 w-full pointer-events-none select-none overflow-hidden flex justify-center items-end z-0">
        <h1 className="text-[18vw] font-black text-white/[0.02] leading-[0.75] tracking-tighter">
          ALNIAZ
        </h1>
      </div>

      {/* MAIN CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 flex flex-col h-full justify-between">

          {/* GRID SYSTEM */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-y-12 md:gap-x-8 mb-16">

             {/* BRAND SECTION */}
             <div className="md:col-span-12 lg:col-span-4 flex flex-col items-start">

                {/* LOGO */}
                <div className="mb-6">
                   <BrandLogo />
                </div>

                <div className="mb-8 max-w-md">
                   <span className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-zoom-yellow tracking-widest uppercase mb-3">
                     Est. 2026
                   </span>
                   <p className="text-gray-400 text-lg leading-relaxed">
                     Redefining the fueling experience.
                     <span className="text-white font-bold ml-1">The New Era is Here.</span>
                   </p>
                </div>

                {/* --- SOCIAL ICONS (LINKS UPDATED) --- */}
                <div className="flex gap-3">

                  {/* FACEBOOK */}
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300
                     bg-[#1877F2] border-[#1877F2] text-white shadow-[0_0_15px_rgba(24,119,242,0.5)]
                     md:bg-white/5 md:border-white/10 md:text-gray-400 md:shadow-none
                     md:hover:bg-[#1877F2] md:hover:border-[#1877F2] md:hover:text-white md:hover:-translate-y-1 md:hover:shadow-[0_0_20px_rgba(24,119,242,0.6)]">
                    <Facebook size={18} />
                  </a>

                  {/* INSTAGRAM */}
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300
                     bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 border-transparent text-white shadow-[0_0_15px_rgba(236,72,153,0.5)]
                     md:bg-white/5 md:border-white/10 md:text-gray-400 md:bg-none md:shadow-none
                     md:hover:bg-gradient-to-tr md:hover:from-yellow-400 md:hover:via-red-500 md:hover:to-purple-500 md:hover:text-white md:hover:-translate-y-1 md:hover:shadow-[0_0_20px_rgba(236,72,153,0.6)]">
                    <Instagram size={18} />
                  </a>

                  {/* TIKTOK */}
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300
                     bg-white border-white text-black shadow-[0_0_15px_rgba(255,255,255,0.4)]
                     md:bg-white/5 md:border-white/10 md:text-gray-400 md:shadow-none
                     md:hover:bg-white md:hover:border-white md:hover:text-black md:hover:-translate-y-1 md:hover:shadow-[0_0_20px_rgba(255,255,255,0.5)]">
                    <TikTokIcon size={18} />
                  </a>

                   {/* GMAIL */}
                   <a
                    href="mailto:#"
                    className="w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300
                     bg-[#EA4335] border-[#EA4335] text-white shadow-[0_0_15px_rgba(234,67,53,0.5)]
                     md:bg-white/5 md:border-white/10 md:text-gray-400 md:shadow-none
                     md:hover:bg-[#EA4335] md:hover:border-[#EA4335] md:hover:text-white md:hover:-translate-y-1 md:hover:shadow-[0_0_20px_rgba(234,67,53,0.6)]">
                    <Mail size={18} />
                  </a>

                </div>
             </div>

             {/* EXPLORE LINKS */}
             <div className="md:col-span-4 lg:col-span-3">
               <h4 className="text-lg font-bold text-white mb-8 flex items-center gap-2">
                 <span className="w-2 h-2 rounded-full bg-zoom-red shadow-[0_0_10px_#E63946]" /> Explore
               </h4>
               <ul className="space-y-3">
                  {[
                    {name: 'Home', href: '/'},
                    {name: 'Daily Rates', href: '/rates'},
                    {name: 'Services', href: '/services'},
                    {name: 'Contact Support', href: '/contact'}
                  ].map((link) => (
                    <li key={link.name}>
                      <Link href={link.href} className="group flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-all cursor-pointer">
                        <span className="text-gray-400 font-medium group-hover:text-white transition-colors">{link.name}</span>
                        <ArrowRight size={16} className="text-zoom-red opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      </Link>
                    </li>
                  ))}
               </ul>
             </div>

             {/* FACILITIES & CONTACT */}
             <div className="md:col-span-8 lg:col-span-5">
               <h4 className="text-lg font-bold text-white mb-8 flex items-center gap-2">
                 <span className="w-2 h-2 rounded-full bg-zoom-yellow shadow-[0_0_10px_#FFD166]" /> Premium Facilities
               </h4>

               <div className="flex flex-wrap gap-2 md:gap-3 mb-8">
                  {[
                    'Fuel Card', 'Restaurent', 'Go Mini Mart',
                    'Masjid', 'Green Garden',
                    'Tyre Shop', 'Lounge'
                  ].map((item, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white/5 border border-white/10 text-[10px] md:text-xs text-gray-400 font-bold uppercase tracking-wider hover:bg-white hover:text-black hover:scale-105 transition-all duration-300 cursor-default"
                    >
                      {item}
                    </span>
                  ))}
               </div>

               {/* --- CONTACT BOX --- */}
               <div className="bg-zinc-900/80 p-5 rounded-2xl border border-white/5 flex flex-col sm:flex-row gap-5 backdrop-blur-md shadow-2xl relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-zoom-red/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10 flex items-center gap-4">
                     <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center shrink-0">
                        <Phone size={20} className="text-green-500" />
                     </div>
                     <div>
                        <span className="block text-[10px] text-gray-500 uppercase tracking-wider">24/7 Helpline</span>
                        <span className="text-xl font-bold text-white">0311 0000000</span>
                     </div>
                  </div>
               </div>
             </div>

          </div>

          {/* BOTTOM BAR */}
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
             <div className="flex flex-col md:flex-row gap-4 md:gap-8 text-xs text-gray-400 font-medium text-center md:text-left">
               <p>© 2026 Alniaz Petroleum. All rights reserved.</p>
               <div className="flex gap-4 justify-center">
                 <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
                 <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
               </div>
             </div>

             {/* --- DEVELOPER CREDIT --- */}
             <div className="group relative cursor-pointer">

               {/* 1. Glow Effect */}
               <div className="absolute -inset-1 bg-gradient-to-r from-zoom-red via-purple-500 to-zoom-yellow rounded-full blur transition duration-500
                   opacity-60                                    /* Mobile: ON */
                   md:opacity-0 md:group-hover:opacity-75        /* Desktop: OFF -> ON */
               "/>

               <div className="relative flex items-center gap-2 px-5 py-2 bg-black rounded-full border border-white/10">
                  <Code size={14} className="text-gray-500 group-hover:text-white transition-colors" />
                  <span className="text-xs text-gray-500 font-medium group-hover:text-gray-300">Developed by</span>

                  {/* Name Text */}
                  <span className="text-xs font-black bg-clip-text text-transparent transition-all
                    bg-gradient-to-r from-zoom-yellow to-zoom-red   /* Mobile: Gradient */
                    md:text-white md:bg-none                        /* Desktop: White (Clean) */
                    md:group-hover:text-transparent md:group-hover:bg-gradient-to-r md:group-hover:from-zoom-yellow md:group-hover:to-zoom-red /* Desktop Hover: Gradient */
                  ">
                    M Hamza Waqar
                  </span>
                  <Heart size={10} className="text-zoom-red animate-pulse" />
               </div>
             </div>
          </div>
      </div>
    </footer>
  );
}
