"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { Quote } from "lucide-react";

const owners = [
  { id: 0, name: "Hamza Bhatti", role: "Web Developer", image: "/assets/ownerone.png" },
  { id: 1, name: "Ch Shafqat", role: "CEO", image: "/assets/ownertwo.png" },
  { id: 2, name: "Jawad Rana", role: "Director", image: "/assets/owner3.png" },
  { id: 3, name: "Mian Ahmad", role: "General Manager", image: "/assets/ownerfour.png" },
];

export default function OwnersGroup() {
  const containerRef = useRef(null);
  const wheelRef = useRef(null);
  const centerRef = useRef(null);

  // State management using Refs to prevent animation glitches
  const activeIndexRef = useRef(0);
  const rotationCount = useRef(0); // To keep track of total rotation
  const [displayIndex, setDisplayIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {

      const runSequence = () => {
        const currentIdx = activeIndexRef.current;
        const nextIdx = (currentIdx + 1) % owners.length;

        // --- ANIMATION SEQUENCE ---
        const tl = gsap.timeline({
          onComplete: () => {
            // Restart sequence after delay
            gsap.delayedCall(2.5, runSequence);
          }
        });

        // 1. RETURN TO WHEEL (Center image goes back to Top)
        // Center ghayab
        tl.to(centerRef.current, { scale: 0.5, opacity: 0, duration: 0.5, ease: "back.in(1.7)" })
          // Wheel k Top par wapis show
          .to(`.wheel-item-${currentIdx}`, { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }, "<");

        // 2. ROTATION (Rotate Wheel to bring Next Item to Top)
        // Hum Counter-Clockwise (-90) ghuma rahe hain taake Right wala item Top per aye
        rotationCount.current -= 1;
        const nextAngle = rotationCount.current * 90;

        tl.to(wheelRef.current, {
          rotation: nextAngle,
          duration: 1.2,
          ease: "power4.inOut",
        }, "+=0.1");

        // Counter Rotate Images (Taake wo ulti na hon)
        tl.to(".owner-mini-inner", {
          rotation: -nextAngle,
          duration: 1.2,
          ease: "power4.inOut",
        }, "<");

        // 3. UPDATE DATA (Behind the scenes)
        tl.call(() => {
          activeIndexRef.current = nextIdx;
          setDisplayIndex(nextIdx);
        });

        // 4. EXTRACTION (New Top Item goes to Center)
        // Wheel k Top se ghayab
        tl.to(`.wheel-item-${nextIdx}`, { scale: 0, opacity: 0, duration: 0.5, ease: "back.in(1.7)" })
          // Center ma show
          .to(centerRef.current, { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }, "<");

      };

      // Start loop after initial delay
      gsap.delayedCall(2, runSequence);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 md:py-32 bg-[#050505] relative overflow-hidden flex flex-col items-center min-h-[850px]">

      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900/30 via-[#050505] to-[#050505]" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 brightness-100 contrast-150 mix-blend-overlay"></div>

      {/* HEADER */}
      <div className="text-center z-10 relative px-4 mb-16 md:mb-24">
        <span className="text-zoom-red font-bold tracking-[0.3em] uppercase text-xs md:text-sm mb-4 block animate-pulse">
          Leadership & Vision
        </span>
        <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-8">
          Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-zoom-red to-red-800">Command</span>
        </h2>
        <div className="relative inline-block max-w-2xl mx-auto bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
           <Quote className="absolute -top-3 -left-3 text-zoom-red w-8 h-8 rotate-180 bg-[#050505] p-1 rounded-full" />
           <p className="text-gray-300 text-sm md:text-lg font-medium italic leading-relaxed">
             &quot;Leadership is the capacity to translate vision into reality. We lead with integrity, ensuring quality in every drop.&quot;
           </p>
           <Quote className="absolute -bottom-3 -right-3 text-zoom-red w-8 h-8 bg-[#050505] p-1 rounded-full" />
        </div>
      </div>

      {/* === ORBIT SYSTEM === */}
      {/* Desktop Radius: 300px | Mobile Radius: 140px */}
      <div
        className="relative w-full flex items-center justify-center mt-10 perspective-1000"
        style={{ "--orbit-radius": "300px", "--orbit-radius-mobile": "140px" } as React.CSSProperties}
      >

         {/* Visual Rings */}
         <div className="absolute w-[280px] h-[280px] md:w-[600px] md:h-[600px] border border-white/5 rounded-full" />
         <div className="absolute w-[280px] h-[280px] md:w-[600px] md:h-[600px] border border-dashed border-white/10 rounded-full animate-[spin_60s_linear_infinite]" />

         {/* === ROTATING WHEEL === */}
         <div ref={wheelRef} className="absolute inset-0 flex items-center justify-center z-20">
            {owners.map((owner, index) => {

              // Index 0 ko Top (-90deg) per set kia.
              const initialAngle = (index * 90) - 90;

              // Initial State: 0 wala Active ha (Center ma ha), to Wheel se ghayab hoga.
              const isInitiallyActive = index === 0;

              return (
                <div
                  key={owner.id}
                  className={`wheel-item-${index} absolute flex flex-col items-center justify-center`}
                  style={{
                    transform: `rotate(${initialAngle}deg) translate(var(--orbit-radius)) rotate(${-initialAngle}deg)`,
                    opacity: isInitiallyActive ? 0 : 1, // Active wala ghayab (Hidden)
                    // Note: 'transformScale' removed to fix build error. Opacity handles visibility.
                  }}
                >
                  {/* CSS Mobile Override */}
                  <style jsx>{`
                    @media (max-width: 768px) {
                      .wheel-item-${index} {
                        transform: rotate(${initialAngle}deg) translate(var(--orbit-radius-mobile)) rotate(${-initialAngle}deg) !important;
                      }
                    }
                  `}</style>

                  {/* Image Container (For Counter Rotation) */}
                  <div className="owner-mini-inner">
                    <div className="w-16 h-16 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-white/20 bg-zinc-900 shadow-2xl grayscale opacity-70">
                      <Image
                        src={owner.image}
                        alt={owner.name}
                        fill
                        className="object-cover object-top"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
         </div>

         {/* === CENTER HUB (Active Display) === */}
         <div ref={centerRef} className="relative z-30 w-[300px] h-[300px] md:w-[500px] md:h-[500px] flex items-center justify-center">

            {/* Glow */}
            <div className="absolute inset-0 bg-zoom-red/10 rounded-full blur-[80px] animate-pulse pointer-events-none" />

            <div className="flex flex-col items-center text-center">

               {/* Big Image */}
               <div className="relative w-40 h-40 md:w-64 md:h-64 rounded-full border-[6px] border-zoom-red p-1 shadow-[0_0_80px_-20px_rgba(230,57,70,0.6)] bg-black mb-8">
                 <div className="w-full h-full relative rounded-full overflow-hidden">
                    <Image
                        src={owners[displayIndex].image}
                        alt={owners[displayIndex].name}
                        fill
                        className="object-cover object-top"
                    />
                 </div>
               </div>

               {/* Text Card */}
               <div className="bg-zinc-900/80 backdrop-blur-xl border border-white/10 px-8 py-4 md:px-10 md:py-6 rounded-3xl shadow-2xl">
                 <h3 className="text-xl md:text-4xl font-black text-white uppercase tracking-tight leading-none mb-3">
                   {owners[displayIndex].name}
                 </h3>
                 <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-zoom-red to-transparent mb-3 opacity-50" />
                 <p className="text-xs md:text-sm font-bold text-zoom-yellow uppercase tracking-[0.3em]">
                   {owners[displayIndex].role}
                 </p>
               </div>

            </div>
         </div>

      </div>
    </section>
  );
}
