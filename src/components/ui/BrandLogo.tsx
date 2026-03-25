import React from "react";

interface LogoProps {
  className?: string;
  showText?: boolean;
  variant?: "light" | "dark"; // Light for dark backgrounds, Dark for white backgrounds
}

export default function BrandLogo({ className = "", showText = true, variant = "light" }: LogoProps) {
  const textColor = variant === "light" ? "text-white" : "text-black";
  const subTextColor = variant === "light" ? "text-gray-400" : "text-gray-600";

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>

      {/* --- THE ICON (SVG) --- */}
      <div className="relative w-12 h-12 md:w-14 md:h-14 shrink-0 filter drop-shadow-lg hover:scale-105 transition-transform duration-300">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* DEFINITIONS FOR GRADIENTS */}
          <defs>
            <linearGradient id="goldGradient" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFD166" />
              <stop offset="50%" stopColor="#FFB703" />
              <stop offset="100%" stopColor="#FB8500" />
            </linearGradient>
            <linearGradient id="redGradient" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FF5A5F" />
              <stop offset="100%" stopColor="#E63946" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* 1. OUTER DROP SHAPE (Golden) */}
          <path
            d="M50 2 C50 2 15 35 15 65 C15 84.33 30.67 100 50 100 C69.33 100 85 84.33 85 65 C85 35 50 2 50 2 Z"
            fill="url(#goldGradient)"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="2"
          />

          {/* 2. INNER SHAPE (Forming the W and Lightning) */}
          {/* Ye shape drop ke andar cut lagayegi jo 'W' jaisa dikhega */}
          <path
            d="M50 25 L60 45 L80 45 L62 60 L68 85 L50 65 L32 85 L38 60 L20 45 L40 45 L50 25 Z"
            fill="#020202"
            opacity="0.9"
          />

          {/* 3. CENTER CORE (Red Energy) */}
          <circle cx="50" cy="65" r="8" fill="url(#redGradient)" filter="url(#glow)" />
        </svg>
      </div>

      {/* --- THE TEXT --- */}
      {showText && (
        <div className="flex flex-col justify-center">
          <h1 className={`text-xl md:text-2xl font-black tracking-wide leading-none ${textColor} uppercase`} style={{ fontFamily: 'var(--font-montserrat)' }}>
            ALNIAZ
          </h1>
          <div className="flex items-center gap-1.5 leading-none mt-1">
            <span className={`text-[9px] md:text-[10px] font-bold tracking-[0.2em] ${subTextColor} uppercase`}>
              Petroleum
            </span>
            <span className="w-1 h-1 rounded-full bg-zoom-red"></span>
            <span className="text-[8px] md:text-[9px] font-bold text-zoom-yellow tracking-widest uppercase">
              Chichawatni
            </span>
          </div>
        </div>
      )}
    </div>
  );
}