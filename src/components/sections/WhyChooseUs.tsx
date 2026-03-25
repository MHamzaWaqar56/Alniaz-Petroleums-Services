"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShieldCheck, Gauge, Zap, Users, Star, Car } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: <ShieldCheck size={40} className="text-white" />,
    title: "100% Pure Fuel",
    desc: "Direct supply from company depots. We perform daily density tests to ensure zero mixing.",
    color: "from-blue-500 to-blue-900",
    border: "group-hover:border-blue-500",
    shadow: "group-hover:shadow-blue-500/20"
  },
  {
    icon: <Gauge size={40} className="text-white" />,
    title: "Digital Accuracy",
    desc: "Our dispensers are digitally calibrated. You get exactly the quantity you pay for, down to the last drop.",
    color: "from-zoom-red to-red-900",
    border: "group-hover:border-zoom-red",
    shadow: "group-hover:shadow-red-500/20"
  },
  {
    icon: <Zap size={40} className="text-white" />,
    title: "24/7 Power Backup",
    desc: "Heavy-duty generators ensure uninterrupted service. Rain or load-shedding, we are always OPEN.",
    color: "from-zoom-yellow to-yellow-800",
    border: "group-hover:border-zoom-yellow",
    shadow: "group-hover:shadow-yellow-500/20"
  }
];

export default function WhyChooseUs() {
  const containerRef = useRef(null);
  const headerLineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%", // Jab section screen k 80% hissay par aye
        }
      });

      // 1. Header Animation (Top se neechay aye ga)
      tl.from(".section-header", {
        y: -50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      // 2. Line Animation (Zero se full width hogi)
      tl.fromTo(headerLineRef.current,
        { width: "0%" },
        { width: "6rem", duration: 1, ease: "power2.inOut" } // 6rem = w-24
      );

      // 3. Cards Opening Animation (Stack -> Spread)
      // Initial State: Teeno cards center ma aik dosray k uper hon gay (scale 0.5)
      // Final State: Apni apni jaga par fail jayen gay.

      const cards = document.querySelectorAll(".feature-card");

      // Step A: Set Initial CSS (JS se set kr rahay hen taake animation smooth ho)
      gsap.set(cards, {
        y: 100,
        opacity: 0,
        scale: 0.8,
        x: 0 // Sab center ma hon
      });

      // Step B: Animate to Final Position
      gsap.to(cards, {
        y: 0,
        x: 0, // Grid apni position khud sambhal lega
        opacity: 1,
        scale: 1,
        duration: 1.2,
        stagger: 0.2, // Aik k baad aik khulay ga
        ease: "back.out(1.7)", // Thora bounce effect
        scrollTrigger: {
          trigger: ".cards-grid",
          start: "top 85%",
        }
      });

      // 4. Stats Animation
      const statElements = document.querySelectorAll(".stat-number");
      statElements.forEach((el) => {
        const targetValue = el.getAttribute("data-target");

        // Special case for decimal (99.9)
        const isDecimal = targetValue?.includes(".");
        const endVal = parseFloat(targetValue || "0");

        gsap.to(el, {
          innerText: endVal,
          duration: 3,
          snap: { innerText: isDecimal ? 0.1 : 1 }, // Agar decimal ha to 0.1 k gap se barhay
          scrollTrigger: {
            trigger: ".stats-strip",
            start: "top 90%",
          }
        });
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 bg-[#0a0a0a] relative overflow-hidden">

      {/* Background Glows */}
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-zoom-red/5 rounded-full blur-[150px] -translate-y-1/2 animate-pulse" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px] animate-pulse" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* HEADER */}
        <div className="text-center mb-20 section-header">
          <span className="text-gray-500 font-bold tracking-[0.3em] uppercase text-sm mb-4 block">
            The Alniaz Standard
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
            BUILT ON <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">TRUST</span>
          </h2>
          {/* Animated Line */}
          <div ref={headerLineRef} className="h-1 bg-zoom-red mx-auto mt-6 rounded-full" />
        </div>

        {/* CARDS GRID */}
        <div className="cards-grid grid md:grid-cols-3 gap-8 mb-24">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`feature-card group relative p-8 rounded-[2rem] bg-zinc-900/80 border border-white/10 backdrop-blur-xl transition-all duration-500 hover:-translate-y-3 ${feature.border} ${feature.shadow} hover:shadow-2xl overflow-hidden`}
            >
              {/* Hover Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

              <div className="relative z-10">
                {/* Floating Icon */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500 animate-float`}>
                  {feature.icon}
                </div>

                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed group-hover:text-gray-200 transition-colors">
                  {feature.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* STATS STRIP */}
        <div className="stats-strip bg-gradient-to-r from-zinc-900 to-black border border-white/10 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row justify-between items-center gap-10 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-white/10 shadow-2xl">

           <div className="flex-1 flex flex-col items-center text-center px-4 w-full">
              <Car size={32} className="text-zoom-red mb-4" />
              <h4 className="text-5xl font-black text-white mb-2 flex items-center">
                <span className="stat-number" data-target="1500">0</span>+
              </h4>
              <p className="text-gray-400 text-sm uppercase tracking-widest font-bold">Daily Vehicles</p>
           </div>

           <div className="flex-1 flex flex-col items-center text-center px-4 w-full pt-8 md:pt-0">
              <Users size={32} className="text-zoom-yellow mb-4" />
              <h4 className="text-5xl font-black text-white mb-2 flex items-center">
                <span className="stat-number" data-target="25">0</span>k+
              </h4>
              <p className="text-gray-400 text-sm uppercase tracking-widest font-bold">Loyal Customers</p>
           </div>

           {/* 99.9% FIX HERE */}
           <div className="flex-1 flex flex-col items-center text-center px-4 w-full pt-8 md:pt-0">
              <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                      <Star key={i} size={24} className="text-yellow-500 fill-yellow-500" />
                  ))}
              </div>
              <h4 className="text-5xl font-black text-white mb-2 flex items-center">
                <span className="stat-number" data-target="99.9">0</span>%
              </h4>
              <p className="text-gray-400 text-sm uppercase tracking-widest font-bold">Customer Satisfaction</p>
           </div>

        </div>

      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}