"use client";
import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Car, Truck, Fuel, Gauge, Zap, Edit3, Calculator, Info } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function FuelCalculator() {
  // --- STATE (INPUTS) ---
  const [distance, setDistance] = useState<number | string>("");
  const [mileage, setMileage] = useState<number | string>("");
  const [fuelType, setFuelType] = useState<"petrol" | "diesel">("petrol");

  // --- STATE (RESULTS) ---
  const [finalCost, setFinalCost] = useState(0);
  const [finalLiters, setFinalLiters] = useState("0");

  // DATABASE RATES
  const [rates, setRates] = useState({ petrol: 0, diesel: 0 });

  // --- API FETCHING ---
  useEffect(() => {
    const fetchRates = async () => {
      try {
        const res = await fetch("/api/fuels");
        const data = await res.json();
        let pPrice = 0;
        let dPrice = 0;
        data.forEach((item: any) => {
          const name = item.name.toLowerCase();
          if (name.includes("petrol")) pPrice = item.price;
          if (name.includes("diesel")) dPrice = item.price;
        });
        setRates({ petrol: pPrice, diesel: dPrice });
      } catch (error) { console.error("Failed to load rates"); }
    };
    fetchRates();
  }, []);

  const currentPrice = fuelType === "petrol" ? rates.petrol : rates.diesel;

  // --- CALCULATION FUNCTION ---
  const handleCalculate = () => {
    const distNum = Number(distance) || 0;
    const milNum = Number(mileage) || 1;

    const calculatedCost = Math.round((distNum / milNum) * currentPrice);
    const calculatedLiters = (distNum / milNum).toFixed(1);

    setFinalCost(calculatedCost);
    setFinalLiters(calculatedLiters);
  };

  // Dynamic Theme Colors
  const themeColor = fuelType === "petrol" ? "text-zoom-red" : "text-zoom-yellow";
  const borderTheme = fuelType === "petrol" ? "border-zoom-red" : "border-zoom-yellow";
  const focusBorder = fuelType === "petrol" ? "focus-within:border-zoom-red" : "focus-within:border-zoom-yellow";
  const shadowTheme = fuelType === "petrol" ? "shadow-red-900/50" : "shadow-yellow-900/50";
  const btnTheme = fuelType === "petrol" ? "bg-zoom-red hover:bg-red-700" : "bg-zoom-yellow hover:bg-yellow-500 text-black";

  const containerRef = useRef(null);
  const numberRef = useRef(null);

  // --- ANIMATIONS ---
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".calc-element", {
        y: 50, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 80%" }
      });

      gsap.to(numberRef.current, {
        innerText: finalCost,
        duration: 1.5,
        snap: { innerText: 1 },
        ease: "power4.out"
      });

    }, containerRef);
    return () => ctx.revert();
  }, [finalCost]);

  // Handle Enter Key
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleCalculate();
  };

  return (
    <section ref={containerRef} className="py-16 md:py-24 bg-[#050505] relative overflow-hidden flex items-center justify-center">

      {/* BACKGROUND EFFECTS */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[800px] md:h-[800px] rounded-full blur-[80px] md:blur-[120px] opacity-20 transition-colors duration-700 ${fuelType === "petrol" ? "bg-red-600" : "bg-yellow-600"}`} />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>

      <div className="max-w-6xl w-full mx-auto px-4 md:px-6 relative z-10">

        {/* HEADER SECTION */}
        <div className="text-center mb-10 md:mb-16 calc-element">
          <span className={`inline-block px-3 py-1 md:px-4 md:py-1 rounded-full border bg-black/50 backdrop-blur-md text-xs md:text-sm font-bold tracking-[0.2em] uppercase mb-4 transition-colors duration-500 ${borderTheme} ${themeColor}`}>
            Trip Planner
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-white leading-tight mb-6">
            SMART <span className={`transition-colors duration-500 ${themeColor}`}>CALCULATOR</span>
          </h2>

          {/* INSTRUCTION LINE */}
          <div className="max-w-2xl mx-auto bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm flex gap-3 md:gap-4 items-start text-left">
             <div className={`p-1.5 md:p-2 rounded-full bg-black/50 ${themeColor} shrink-0`}>
               <Info size={18} className="md:w-[20px] md:h-[20px]" />
             </div>
             <p className="text-gray-400 text-xs sm:text-sm md:text-base leading-relaxed">
               Simply enter your estimated <span className="text-white font-bold">Trip Distance (KM)</span> and your vehicle's <span className="text-white font-bold">Fuel Average</span> below.
               We will calculate the exact cost based on today's <span className={`font-bold ${themeColor}`}>Live Rates</span>.
             </p>
          </div>
        </div>

        {/* MAIN UI DASHBOARD */}
        <div className="grid lg:grid-cols-2 gap-10 md:gap-12 items-center">

          {/* LEFT: CONTROLS PANEL */}
          <div className="calc-element bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] md:rounded-[2.5rem] p-6 sm:p-8 md:p-12 shadow-2xl relative overflow-hidden group">

            {/* 1. Fuel Switcher */}
            <div className="flex bg-black/40 p-1 md:p-1.5 rounded-xl md:rounded-2xl mb-6 md:mb-8 border border-white/5">
              <button
                onClick={() => setFuelType("petrol")}
                className={`flex-1 py-3 md:py-4 rounded-lg md:rounded-xl flex items-center justify-center gap-2 text-xs sm:text-sm md:text-base font-bold uppercase tracking-wider transition-all duration-500 ${fuelType === "petrol" ? "bg-zoom-red text-white shadow-lg shadow-red-900/40" : "text-gray-500 hover:text-white"}`}
              >
                <Car size={16} className="md:w-[20px] md:h-[20px]" /> Petrol
              </button>
              <button
                onClick={() => setFuelType("diesel")}
                className={`flex-1 py-3 md:py-4 rounded-lg md:rounded-xl flex items-center justify-center gap-2 text-xs sm:text-sm md:text-base font-bold uppercase tracking-wider transition-all duration-500 ${fuelType === "diesel" ? "bg-zoom-yellow text-black shadow-lg shadow-yellow-900/40" : "text-gray-500 hover:text-white"}`}
              >
                <Truck size={16} className="md:w-[20px] md:h-[20px]" /> Diesel
              </button>
            </div>

            {/* 2. Inputs */}
            <div className="space-y-4 md:space-y-6 mb-6 md:mb-8">
              {/* Distance Input */}
              <div>
                <label className="text-gray-400 font-bold uppercase text-[10px] md:text-xs tracking-widest flex items-center gap-2 mb-2 md:mb-3">
                  <Gauge size={16} className={`md:w-[18px] md:h-[18px] ${themeColor}`} /> Total Distance
                </label>
                <div className={`group flex items-center bg-black/50 border rounded-xl md:rounded-2xl px-4 py-3 md:px-6 md:py-4 transition-all duration-300 ${focusBorder} border-white/10 hover:border-white/20`}>
                  <input
                    type="number"
                    value={distance}
                    onChange={(e) => setDistance(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full bg-transparent text-2xl md:text-3xl font-black text-white outline-none placeholder-gray-700"
                    placeholder="0"
                  />
                  <span className="text-gray-500 font-bold text-xs md:text-sm tracking-wider">KM</span>
                  <Edit3 size={14} className="text-gray-600 ml-3 md:ml-4 group-hover:text-white transition-colors md:w-[16px] md:h-[16px]" />
                </div>
              </div>

              {/* Mileage Input */}
              <div>
                <label className="text-gray-400 font-bold uppercase text-[10px] md:text-xs tracking-widest flex items-center gap-2 mb-2 md:mb-3">
                  <Fuel size={16} className={`md:w-[18px] md:h-[18px] ${themeColor}`} /> Car Average (Mileage)
                </label>
                <div className={`group flex items-center bg-black/50 border rounded-xl md:rounded-2xl px-4 py-3 md:px-6 md:py-4 transition-all duration-300 ${focusBorder} border-white/10 hover:border-white/20`}>
                  <input
                    type="number"
                    value={mileage}
                    onChange={(e) => setMileage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full bg-transparent text-2xl md:text-3xl font-black text-white outline-none placeholder-gray-700"
                    placeholder="0"
                  />
                  <span className="text-gray-500 font-bold text-xs md:text-sm tracking-wider">KM/L</span>
                  <Edit3 size={14} className="text-gray-600 ml-3 md:ml-4 group-hover:text-white transition-colors md:w-[16px] md:h-[16px]" />
                </div>
              </div>
            </div>

            {/* 3. CALCULATE BUTTON */}
            <button
              onClick={handleCalculate}
              className={`w-full py-4 md:py-5 rounded-xl md:rounded-2xl font-black text-base md:text-lg uppercase tracking-widest flex items-center justify-center gap-2 md:gap-3 transition-all transform active:scale-95 shadow-xl ${btnTheme}`}
            >
               <Calculator size={20} className="md:w-[24px] md:h-[24px]" /> Calculate Cost
            </button>

          </div>

          {/* RIGHT: THE CORE (RESULT) */}
          <div className="calc-element relative flex justify-center items-center py-8 lg:py-0">

             {/* Spinning Rings (Resized for mobile) */}
             <div className={`absolute inset-0 border-[2px] border-dashed rounded-full animate-[spin_10s_linear_infinite] opacity-20 transition-colors duration-500 ${borderTheme} scale-90 md:scale-100`} />
             <div className={`absolute inset-4 border-[1px] border-dotted rounded-full animate-[spin_15s_linear_infinite_reverse] opacity-20 transition-colors duration-500 ${borderTheme} scale-90 md:scale-100`} />

             {/* Main Circle (Dynamic Size: Mobile 280px -> Tablet 350px -> Desktop 450px) */}
             <div className={`w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[450px] md:h-[450px] rounded-full bg-[#0a0a0a] border-4 flex flex-col items-center justify-center relative overflow-hidden shadow-[0_0_50px_-10px_rgba(0,0,0,0.5)] transition-colors duration-500 ${borderTheme} ${shadowTheme}`}>

                {/* Liquid Wave Animation */}
                <div className={`absolute bottom-0 left-0 w-full bg-gradient-to-t opacity-20 transition-all duration-1000 ${fuelType === 'petrol' ? 'from-red-900 to-red-600' : 'from-yellow-900 to-yellow-600'}`}
                     style={{ height: `${Math.min((finalCost / 5000) * 100, 100)}%`, transition: 'height 1.5s cubic-bezier(0.4, 0, 0.2, 1)' }}
                >
                  <div className="absolute top-0 left-0 w-full h-10 bg-white/10 blur-xl" />
                </div>

                <div className="relative z-10 text-center">
                   <p className="text-gray-500 font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] text-[10px] md:text-xs mb-2 md:mb-4">Total Estimated Cost</p>

                   <div className="flex items-baseline justify-center gap-1 mb-1 md:mb-2">
                     <span className="text-lg md:text-2xl text-gray-500 font-bold">Rs</span>
                     {/* ANIMATED NUMBER (Font Size Scaling) */}
                     <span ref={numberRef} className={`text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter transition-colors duration-500 ${themeColor}`}>
                       0
                     </span>
                   </div>

                   {/* Stats Pills */}
                   <div className="flex gap-2 md:gap-3 justify-center mt-4 md:mt-6">
                      <div className="bg-white/5 border border-white/10 px-3 py-1.5 md:px-4 md:py-2 rounded-lg backdrop-blur-md">
                        <span className="block text-[8px] md:text-[10px] text-gray-400 uppercase tracking-wider">Fuel Needed</span>
                        <span className="text-base md:text-xl font-bold text-white">{finalLiters} <span className="text-[10px] md:text-xs font-normal text-gray-500">L</span></span>
                      </div>
                      <div className="bg-white/5 border border-white/10 px-3 py-1.5 md:px-4 md:py-2 rounded-lg backdrop-blur-md">
                         <span className="block text-[8px] md:text-[10px] text-gray-400 uppercase tracking-wider">Live Rate</span>
                         <span className="text-base md:text-xl font-bold text-white">
                           {currentPrice === 0 ? <span className="animate-pulse">...</span> : currentPrice}
                           <span className="text-[10px] md:text-xs font-normal text-gray-500 ml-1">PKR</span>
                         </span>
                      </div>
                   </div>
                </div>

                <div className={`absolute bottom-0 w-full h-20 md:h-32 bg-gradient-to-t from-black to-transparent opacity-80`} />
             </div>

             <div className={`absolute -bottom-4 md:-bottom-6 bg-[#0a0a0a] border px-4 py-2 md:px-6 md:py-3 rounded-full flex items-center gap-2 shadow-xl transition-colors duration-500 ${borderTheme}`}>
                <Zap size={14} className={`fill-current md:w-[18px] md:h-[18px] ${themeColor}`} />
                <span className="text-white font-bold text-xs md:text-sm tracking-wide">Live Database Rates</span>
             </div>

          </div>

        </div>
      </div>
    </section>
  );
}