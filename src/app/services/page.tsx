"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Sparkles, ShoppingBag, Trees, Users, CreditCard, Moon } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: "01",
    title: "Prayer Area",
    category: "Spirituality",
    desc: "Never miss a prayer. Clean, peaceful Masjid with fresh water Wudu facilities.",
    image: "/assets/mosque.jpeg",
    icon: <Moon className="text-white" size={28} />,
    color: "from-emerald-600 to-emerald-900",
  },
  {
    id: "02",
    title: "Fuel Card",
    category: "Corporate",
    desc: "Join our loyalty program. Exclusive discounts and cashless payments.",
    image: "/assets/card.jpg",
    icon: <CreditCard className="text-white" size={28} />,
    color: "from-blue-600 to-blue-900",
  },
  {
    id: "03",
    title: "Elite Staff",
    category: "Hospitality",
    desc: "Staff trained to serve with respect. We build relationships, not just fill tanks.",
    image: "/assets/staff.png",
    icon: <Users className="text-white" size={28} />,
    color: "from-purple-600 to-purple-900",
  },
  {
    id: "04",
    title: "Green Garden",
    category: "Relaxation",
    desc: "Take a break in our lush green waiting area. Fresh air and peaceful environment.",
    image: "/assets/garden.jpeg",
    icon: <Trees className="text-white" size={28} />,
    color: "from-green-600 to-green-900",
  },
  {
    id: "05",
    title: "Go Mini Mart",
    category: "Tuck Shop",
    desc: "Premium store with imported snacks, drinks, and car accessories. Open 24/7.",
    image: "/assets/shop.jpeg",
    icon: <ShoppingBag className="text-white" size={28} />,
    color: "from-red-600 to-red-900",
  },
  {
    id: "06",
    title: "Car Wash",
    category: "Detailing",
    desc: "Automatic foam wash and detailing. High-quality wax for long-lasting shine.",
    image: "/assets/restaurent.jpeg",
    icon: <Sparkles className="text-white" size={28} />,
    color: "from-yellow-600 to-yellow-800",
  },
];

export default function ServicesPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(1);
  const [progressWidth, setProgressWidth] = useState(0);

  useEffect(() => {
    const slider = sliderRef.current;
    const container = containerRef.current;
    if (!slider || !container) return;

    let ctx = gsap.context(() => {
      const getScrollAmount = () => {
        let racesWidth = slider.scrollWidth;
        return -(racesWidth - window.innerWidth);
      };

      const tween = gsap.to(slider, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          end: () => `+=${slider.scrollWidth - window.innerWidth}`,
          onUpdate: (self) => {
            setProgressWidth(self.progress * 100);
            const totalSlides = services.length;
            const current = Math.min(Math.ceil(self.progress * totalSlides), totalSlides);
            setActiveSlide(current || 1);
          }
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="bg-zinc-950 overflow-x-hidden text-white">

      {/* Intro Section - Added pt-32 for Tablet Header Clearance */}
      <section className="min-h-[90vh] flex flex-col items-center justify-center relative z-10 px-6 text-center pt-32 pb-10">
        <p className="text-zoom-red font-bold tracking-[0.3em] text-xs uppercase mb-4 animate-pulse">
          Premium Facilities
        </p>
        <h1 className="text-5xl md:text-8xl font-black text-white leading-none mb-6">
          OUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-zoom-yellow to-zoom-red">SERVICES</span>
        </h1>
        <p className="text-gray-300 text-sm md:text-lg max-w-lg mx-auto bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-md">
          Explore the 5-star experience at Alniaz Petroleum.
        </p>
        <div className="mt-10 animate-bounce text-white/50">
          <ArrowRight className="rotate-90" size={28} />
        </div>
      </section>

      {/* Horizontal Scroll Area */}
      {/* FIX: pt-24 md:pt-32 add kia taake card header k neechay na chupay */}
      <section ref={containerRef} className="h-screen relative overflow-hidden bg-black pt-20 md:pt-32 lg:pt-0">

        <div ref={sliderRef} className="flex h-full w-max">
          {services.map((service, index) => (
            <div key={index} className="w-screen h-full flex items-center justify-center p-4 md:p-8 lg:p-24 flex-shrink-0 relative">

              {/* Responsive Card Layout */}
              {/* FIX: Tablet (md) par height 60vh kar di taake fit aye */}
              <div className="w-full max-w-6xl h-[75vh] md:h-[60vh] lg:h-[70vh] grid grid-rows-[45%_55%] md:grid-rows-1 md:grid-cols-2 bg-zinc-900 rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl relative z-10 group">

                {/* Text Side */}
                <div className={`p-6 md:p-10 lg:p-12 flex flex-col justify-center bg-gradient-to-br ${service.color} relative overflow-hidden order-2 md:order-1`}>

                  {/* Big Number */}
                  <span className="absolute -bottom-6 -right-6 md:-bottom-10 md:-left-6 text-[8rem] md:text-[10rem] lg:text-[15rem] font-black text-white/10 select-none leading-none z-0">
                    {service.id}
                  </span>

                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4 md:mb-6">
                       <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/30 shadow-lg">
                         {service.icon}
                       </div>
                       <span className="inline-block px-3 py-1 bg-black/20 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest text-white/80 border border-white/10">
                         {service.category}
                       </span>
                    </div>

                    <h2 className="text-3xl md:text-4xl lg:text-6xl font-black text-white mb-3 md:mb-6 uppercase leading-tight">
                      {service.title}
                    </h2>

                    <p className="text-white/90 text-sm md:text-base lg:text-lg font-medium leading-relaxed max-w-md line-clamp-4 md:line-clamp-none">
                      {service.desc}
                    </p>
                  </div>
                </div>

                {/* Image Side */}
                <div className="relative h-full w-full overflow-hidden order-1 md:order-2">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    priority={index < 2}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/60 to-transparent" />
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* --- FIXED PROGRESS INDICATOR --- */}
        <div className="absolute bottom-6 md:bottom-10 left-0 w-full px-6 md:px-24 z-50 pointer-events-none">
          <div className="flex items-center gap-4 max-w-6xl mx-auto">
            <div className="bg-black/80 backdrop-blur-xl border border-white/10 px-3 py-1.5 md:px-4 md:py-2 rounded-full font-mono text-lg md:text-2xl font-bold flex items-baseline gap-1 text-white shadow-lg">
              <span>{activeSlide < 10 ? `0${activeSlide}` : activeSlide}</span>
              <span className="text-gray-500 text-xs md:text-sm">/ 0{services.length}</span>
            </div>
            <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden relative shadow-inner">
              <div
                className="h-full bg-zoom-red relative transition-all duration-100 ease-out shadow-[0_0_15px_#E63946]"
                style={{ width: `${progressWidth}%` }}
              >
                 <div className="absolute right-0 top-0 bottom-0 w-2 bg-white blur-[1px]" />
              </div>
            </div>
            <div className="hidden sm:block bg-black/80 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-full shadow-lg">
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-zoom-red">
                {services[activeSlide - 1]?.title}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Spacer */}
      <div className="h-[20vh] bg-black"></div>
    </main>
  );
}
