"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShieldCheck, Star, Users } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef(null);

  const paragraphText = "At Alniaz Petroleum, we believe in purity. Our fuel is tested daily to ensure your engine runs smoother and lasts longer. Under the new management, we are bringing technology and transparency together.";
  const words = paragraphText.split(" ");

  useEffect(() => {
    const ctx = gsap.context(() => {

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        }
      });

      // 1. Heading (Fade Up)
      tl.fromTo(".about-heading",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );

      // 2. Typing Effect
      tl.to(".typing-word", {
        opacity: 1,
        y: 0,
        duration: 0.3,
        stagger: 0.03,
        ease: "power2.out",
      }, "-=0.4");

      // 3. Cards Animation
      tl.to(".feature-card", {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.2,
        ease: "back.out(1.2)"
      }, "<+=0.5");

      // 4. Image Parallax
      gsap.to(".about-img-container", {
        y: -30,
        scrollTrigger: {
          trigger: containerRef.current,
          scrub: 1,
        }
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-20 md:py-32 bg-zinc-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 md:gap-20 items-center">

          {/* IMAGE SIDE */}
          <div className="about-img-container relative order-2 lg:order-1">
            <div className="absolute inset-0 bg-[#E63946] transform translate-x-3 translate-y-3 md:translate-x-4 md:translate-y-4 rounded-[2rem]" />

            {/* --- FIX IS HERE (Mobile Logic) --- */}
            {/* grayscale-0     -> Mobile per NO Grayscale (Color dikhega)
                md:grayscale    -> Desktop per Grayscale start hoga
                md:hover:grayscale-0 -> Desktop per Hover krne se Color hoga
            */}
            <div className="relative h-[400px] md:h-[600px] w-full rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl grayscale-0 md:grayscale md:hover:grayscale-0 transition-all duration-700 group">
               <Image
                 src="/assets/about.jpg"
                 alt="Alniaz Petroleum"
                 fill
                 className="object-cover transition-transform duration-700 group-hover:scale-105"
               />
            </div>

            <div className="absolute -bottom-6 -left-2 md:bottom-10 md:-left-10 bg-[#FFC107] text-black p-6 md:p-8 rounded-2xl shadow-xl border-4 border-black z-20">
               <span className="block text-3xl md:text-5xl font-black whitespace-nowrap">ALNIAZ </span>
               <span className="font-bold uppercase tracking-wider text-xs md:text-sm block mt-1">Name Of Quality</span>
            </div>
          </div>

          {/* TEXT SIDE */}
          <div className="about-content order-1 lg:order-2">

             {/* Heading */}
             <div className="about-heading opacity-0">
                <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
                  FUELING <span className="text-gray-600">LIVES,</span> <br />
                  NOT JUST <span className="text-[#E63946]">CARS.</span>
                </h2>
             </div>

             {/* Typing Paragraph */}
             <div className="text-gray-400 text-base md:text-lg leading-relaxed mb-10 min-h-[120px]">
               {words.map((word, i) => (
                 <span
                    key={i}
                    className="typing-word opacity-0 translate-y-2 inline-block mr-1.5 will-change-transform"
                 >
                   {word}
                 </span>
               ))}
             </div>

             {/* Feature Cards */}
             <div className="space-y-4 md:space-y-6">
               {[
                 { icon: ShieldCheck, title: "100% Pure Quantity", text: "Digital calibration checks every morning." },
                 { icon: Star, title: "Premium Service", text: "Trained staff to serve you with a smile." },
                 { icon: Users, title: "Community First", text: "Fair prices and honest dealings." }
               ].map((item, i) => (
                 <div
                    key={i}
                    // Cards per hover logic sirf Desktop (md) k liye rakhi hai taake mobile clean rahe
                    className="feature-card opacity-0 translate-y-8 flex items-start gap-4 p-4 bg-white/5 rounded-xl border border-white/5 md:hover:border-[#E63946]/50 md:hover:bg-white/10 transition-colors duration-300 group cursor-default"
                 >
                    <div className="p-3 bg-black rounded-lg text-white group-hover:text-[#E63946] transition-colors">
                        <item.icon size={24} />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-lg mb-1">{item.title}</h4>
                      <p className="text-gray-500 text-sm">{item.text}</p>
                    </div>
                 </div>
               ))}
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}
