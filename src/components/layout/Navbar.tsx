"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight, Phone, Mail, MapPin, Sparkles } from "lucide-react";
import BrandLogo from "@/components/ui/BrandLogo";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Daily Rates", href: "/rates" },
  { name: "Services", href: "/services" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isHidden, setIsHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();

  // --- SMART SCROLL LOGIC ---
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // --- REUSABLE 1234 ANIMATION LOGIC ---
  const RotatingLink = ({ link, mobile = false, onClick }: { link: any, mobile?: boolean, onClick?: () => void }) => {
    const isActive = pathname === link.href;
    return (
      <Link
        href={link.href}
        onClick={onClick}
        className={`relative group flex items-center justify-center overflow-hidden rounded-full font-bold tracking-wide transition-all
          ${mobile
            ? "w-full py-4 text-xl border border-white/5 bg-white/5 mb-4"
            : "px-6 py-2.5 text-sm"
          }
        `}
      >
        {/* Animated Border Layer */}
        <div className="absolute inset-[-200%] bg-[conic-gradient(from_0deg,transparent_0_100deg,#FFC107_100deg_140deg,transparent_140deg_280deg,#E63946_280deg_320deg,transparent_320deg_360deg)] group-hover:bg-[conic-gradient(from_0deg,#FFC107_0_180deg,#E63946_180deg_360deg)] animate-[spin_4s_linear_infinite] group-hover:animate-[spin_1s_linear_infinite]" />

        {/* Inner Mask */}
        <div className={`absolute inset-[1.5px] rounded-full z-10 transition-colors ${mobile ? "bg-[#0F0F0F]" : "bg-black"}`} />

        {/* Text Layer */}
        <span className={`relative z-20 transition-colors duration-300 ${isActive ? "text-white" : "text-gray-400 group-hover:text-white"}`}>
          {link.name}
        </span>

        {/* Active Dot */}
        {isActive && <div className="absolute bottom-1.5 w-1.5 h-1.5 bg-white rounded-full z-20 shadow-[0_0_10px_white]" />}
      </Link>
    );
  };

  return (
    <>
      <nav
        className={`fixed left-0 w-full flex justify-center z-50 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]
        ${isHidden ? "-translate-y-[150%]" : "translate-y-0"}
        ${isScrolled ? "top-4" : "top-0"}
        `}
      >
        <div
          className={`
            relative flex items-center justify-between transition-all duration-500 ease-out
            ${
              isScrolled
                ? "w-[95%] md:w-[85%] max-w-5xl bg-black/80 backdrop-blur-xl border border-white/10 rounded-full py-2 px-6 shadow-[0_8px_40px_-10px_rgba(0,0,0,0.5)]"
                : "w-full bg-gradient-to-b from-black/80 to-transparent py-4 px-8 border-b border-white/5 backdrop-blur-sm"
            }
          `}
        >
          {/* LOGO */}
          <Link href="/" className="relative z-20 hover:opacity-90 transition-opacity">
            <BrandLogo showText={true} />
          </Link>

          {/* --- DESKTOP NAV --- */}
          <div className="hidden md:flex items-center gap-4">
            {navLinks.map((link) => (
              <RotatingLink key={link.name} link={link} />
            ))}
          </div>

          {/* --- RIGHT SIDE ACTIONS --- */}
          <div className="flex items-center gap-3 relative z-20">

            {/* --- GOOGLE MAPS BUTTON (Replaced Contact Button) --- */}
            <a
              href="https://maps.app.goo.gl/cYiRyx8dgsPEkZHNA"
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden lg:flex relative group items-center justify-center px-6 py-2.5 rounded-full font-bold text-sm transition-all shadow-xl hover:shadow-[0_0_50px_-10px_rgba(230,57,70,0.6)] active:scale-95 overflow-hidden`}
            >
              {/* 1. Background Gradient (Magma) */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#D00000] to-[#E63946] group-hover:from-[#9D0208] group-hover:to-[#D00000] transition-all duration-500" />

              {/* 2. Electric Border */}
              <div className="absolute inset-0 rounded-full border border-white/20" />
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white to-transparent opacity-50 animate-[shimmer_2s_infinite]" />

              {/* 3. Inner Glow */}
              <div className="absolute inset-0 bg-zoom-red blur-xl opacity-0 group-hover:opacity-50 animate-pulse transition-opacity duration-500" />

              {/* 4. Content */}
              <span className="relative z-10 text-white flex items-center gap-2 group-hover:gap-3 transition-all">
                <MapPin size={16} className="text-yellow-300 animate-bounce" />
                <span className="tracking-widest uppercase text-xs">Open Map</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </a>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2.5 bg-white/5 border border-white/10 rounded-full text-white active:scale-90 transition-transform hover:bg-white/10"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* --- MOBILE DRAWER --- */}
      <div
        className={`fixed inset-0 z-[60] flex justify-end transition-all duration-500 ${
          mobileMenuOpen ? "visible" : "invisible"
        }`}
      >
        {/* Backdrop */}
        <div
          onClick={() => setMobileMenuOpen(false)}
          className={`absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-500 ${
            mobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* The Drawer */}
        <div
          className={`relative w-[85%] max-w-[400px] h-full bg-[#0a0a0a] border-l border-white/10 flex flex-col p-8 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Close Button & Logo */}
          <div className="flex justify-between items-center mb-12">
            <div className="scale-75 origin-left">
              <BrandLogo showText={false} />
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 bg-white/5 rounded-full text-white hover:bg-zoom-red transition-colors hover:rotate-90 duration-300"
            >
              <X size={24} />
            </button>
          </div>

          {/* Links */}
          <div className="flex flex-col justify-center flex-1">
            {navLinks.map((link, i) => (
              <div
                key={link.name}
                style={{ transitionDelay: `${i * 50}ms`, opacity: mobileMenuOpen ? 1 : 0, transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(20px)' }}
                className="transition-all duration-500"
              >
                 <RotatingLink link={link} mobile={true} onClick={() => setMobileMenuOpen(false)} />
              </div>
            ))}
          </div>

          {/* Bottom Info */}
          <div className="mt-auto pt-8 border-t border-white/10 space-y-4">
            <div className="flex items-center gap-4 text-gray-400">
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-zoom-red">
                <Phone size={16} />
              </div>
              <span className="text-sm font-medium">+92 311 4660084</span>
            </div>
            <div className="flex items-center gap-4 text-gray-400">
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-zoom-red">
                <Mail size={16} />
              </div>
              <span className="text-sm font-medium">
                infoalniazpetroleum@gmail.com
              </span>
            </div>

            {/* ✅ MOBILE GOOGLE MAPS BUTTON (Replaces Check Rates) */}
            <a
              href="https://maps.app.goo.gl/cYiRyx8dgsPEkZHNA"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-4 flex items-center justify-center gap-2 w-full py-4 bg-[#E63946] text-white font-bold rounded-xl uppercase tracking-widest shadow-lg shadow-red-900/30 active:scale-95 transition-transform"
            >
               <MapPin size={20} className="text-white" /> Open Location Map
            </a>
          </div>
        </div>
      </div>
    </>
  );
}