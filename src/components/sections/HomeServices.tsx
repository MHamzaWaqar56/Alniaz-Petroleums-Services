"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ShoppingBag, Trees, Users, Sparkles, CreditCard, Moon, ArrowRight } from "lucide-react";

// Services Data
const services = [
  { id: "01", title: "Prayer Area", category: "Spirituality", description: "A clean and peaceful Masjid with fresh water Wudu facility.", image: "/assets/mosque.jpeg", icon: Moon, link: "/services" },
  { id: "02", title: "Fuel Card", category: "Corporate", description: "Exclusive discounts and expense management for fleets.", image: "/assets/card.jpg", icon: CreditCard, link: "/services" },
  { id: "03", title: "Elite Staff", category: "Hospitality", description: "Respectful, honest, and trained staff ready to serve.", image: "/assets/staff.png", icon: Users, link: "/services" },
  { id: "04", title: "Green Garden", category: "Relaxation", description: "A peaceful green area to sit and relax while you wait.", image: "/assets/garden.jpeg", icon: Trees, link: "/services" },
  { id: "05", title: "Go Mini Mart", category: "Tuck Shop", description: "Cold drinks, snacks, and travel essentials open 24/7.", image: "/assets/shop.jpeg", icon: ShoppingBag, link: "/services" },
  { id: "06", title: "RESTAURANT", category: "FOOD & BEVERAGE", description: "Enjoy delicious meals in a cozy environment.", image: "/assets/restaurent.jpeg", icon: Sparkles, link: "/services" },
];

export default function HomeServices() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // 🔥 FIX IS HERE: Added <any> to allow Timer assignment
  const timerRef = useRef<any>(null);

  // --- AUTO PLAY LOGIC ---
  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % services.length);
      }, 3500);
    }
    return () => clearInterval(timerRef.current);
  }, [isPaused]);

  return (
    <section className="py-16 md:py-24 bg-black text-white relative z-20 overflow-hidden">

      {/* HEADER SECTION */}
      <div className="max-w-7xl mx-auto px-6 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
           <span className="text-[#E63946] font-bold tracking-[0.2em] uppercase mb-2 block text-xs md:text-sm animate-pulse">
             Premium Facilities
           </span>
           <h2 className="text-4xl md:text-5xl font-bold leading-tight">
             Beyond Just <span className="text-gray-500">Fueling</span>
           </h2>
        </div>

        <Link href="/services" className="group hidden md:flex items-center gap-3 px-8 py-4 rounded-full border border-white/20 bg-white/5 backdrop-blur-md hover:bg-white hover:text-black transition-all duration-300">
          <span className="font-bold text-sm tracking-wide uppercase">View Full Services</span>
          <div className="bg-white text-black p-1 rounded-full group-hover:bg-black group-hover:text-white transition-colors">
            <ArrowRight size={14} />
          </div>
        </Link>
      </div>

      {/* --- THE GALLERY --- */}
      <div
        className="max-w-[1400px] mx-auto px-4"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="flex flex-col lg:flex-row gap-4 w-full lg:h-[600px]">

          {services.map((service, index) => {
            const isActive = activeIndex === index;

            return (
              <div
                key={service.id}
                onClick={() => setActiveIndex(index)}
                onMouseEnter={() => setActiveIndex(index)}
                className={`
                  relative overflow-hidden rounded-2xl lg:rounded-[2rem] border border-white/10 bg-zinc-900 cursor-pointer
                  transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]
                  w-full ${isActive ? "h-[400px]" : "h-[80px]"}
                  lg:h-full lg:w-auto
                  ${isActive ? "lg:flex-[3.5] border-white/40 shadow-[0_0_30px_rgba(0,0,0,0.5)]" : "lg:flex-[1] border-white/5 grayscale hover:grayscale-0"}
                `}
              >

                {/* 1. PROGRESS BAR */}
                {isActive && !isPaused && (
                    <div className="absolute top-0 left-0 h-[3px] bg-[#E63946] z-50 animate-progress origin-left w-full" />
                )}

                {/* 2. BACKGROUND IMAGE */}
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className={`object-cover transition-transform duration-1000 ease-out ${isActive ? "scale-110" : "scale-100 opacity-40"}`}
                />

                <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent transition-opacity duration-500 ${isActive ? "opacity-90" : "opacity-70"}`} />

                {/* NUMBERING */}
                <div className={`absolute top-4 right-6 md:top-6 md:right-8 z-20 transition-all duration-700 ${isActive ? "scale-100 opacity-100" : "scale-90 opacity-60"}`}>
                   <span
                     className="text-5xl md:text-7xl font-black italic tracking-tighter"
                     style={{
                        WebkitTextStroke: isActive ? "0px" : "1px rgba(255,255,255,0.4)",
                        color: isActive ? "transparent" : "transparent",
                        backgroundImage: isActive ? "linear-gradient(135deg, #FFC107 0%, #E63946 100%)" : "none",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        filter: isActive ? "drop-shadow(0 0 15px rgba(230, 57, 70, 0.5))" : "none"
                     }}
                   >
                     {service.id}
                   </span>
                </div>


                {/* COLLAPSED TEXT (Desktop) */}
                <div className={`hidden lg:block absolute bottom-12 left-8 -rotate-90 origin-left whitespace-nowrap z-10 transition-all duration-300 ${isActive ? "opacity-0 translate-y-10" : "opacity-100 translate-y-0"}`}>
                   <h3 className="text-xl font-bold tracking-wider uppercase text-white/50">{service.title}</h3>
                </div>

                {/* COLLAPSED TEXT (Mobile) */}
                <div className={`lg:hidden absolute top-1/2 -translate-y-1/2 left-6 z-10 transition-all duration-300 ${isActive ? "opacity-0 -translate-x-10" : "opacity-100 translate-x-0"}`}>
                   <h3 className="text-xl font-bold tracking-wider uppercase text-white">{service.title}</h3>
                   <span className="text-xs text-[#E63946] font-bold">Tap to expand</span>
                </div>

                {/* EXPANDED CONTENT AREA */}
                <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full flex flex-col justify-end z-20 overflow-hidden">

                   {/* Icon */}
                   <div className={`mb-4 transition-all duration-500 ${isActive ? "translate-y-0 opacity-100 delay-200" : "translate-y-8 opacity-0"}`}>
                     <div className="bg-[#E63946] w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center shadow-lg shadow-red-900/50">
                       <service.icon size={24} className="text-white" />
                     </div>
                   </div>

                   {/* Title & Category */}
                   <div className={`transition-all duration-500 ${isActive ? "translate-y-0 opacity-100 delay-300" : "translate-y-8 opacity-0"}`}>
                      <p className="text-[#FFC107] font-bold uppercase tracking-widest text-[10px] md:text-xs mb-2">{service.category}</p>
                      <h3 className="text-3xl md:text-5xl font-black uppercase leading-[0.9] mb-4 text-white">{service.title}</h3>
                   </div>

                   {/* Description & Link */}
                   <div className={`transition-all duration-500 ${isActive ? "translate-y-0 opacity-100 delay-[400ms]" : "translate-y-8 opacity-0"}`}>
                     <p className="text-gray-300 text-sm md:text-lg leading-relaxed max-w-md line-clamp-3">
                       {service.description}
                     </p>

                     <Link href={service.link} className="mt-6 flex items-center gap-2 text-sm font-bold text-white border-b border-white/30 pb-1 w-fit hover:border-[#E63946] hover:text-[#E63946] transition-colors">
                       <span>Explore Facility</span>
                       <ArrowUpRight size={16} />
                     </Link>
                   </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>

      <style jsx global>{`
        @keyframes progress {
            from { width: 0%; }
            to { width: 100%; }
        }
        .animate-progress {
            animation: progress 3.5s linear forwards;
        }
      `}</style>
    </section>
  );
}
