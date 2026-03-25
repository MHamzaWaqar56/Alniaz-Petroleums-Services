import React from "react";
import connectDB from "@/lib/db";
import Fuel from "@/models/Fuel";

// ✅ یہ دو لائنز ورسل کو مجبور کریں گی کہ ہر وزٹ پر نیا ڈیٹا دکھائے
export const dynamic = "force-dynamic";
export const revalidate = 0;

// Database se data lanay wala function
async function getFuelRates() {
  try {
    await connectDB();
    // updatedAt: -1 ensures latest update is considered
    const rates = await Fuel.find({}).sort({ createdAt: 1 });
    return JSON.parse(JSON.stringify(rates));
  } catch (error) {
    console.error("Rates fetch error:", error);
    return [];
  }
}

export default async function RatesPage() {
  const fuels = await getFuelRates();

  const today = new Date().toLocaleDateString('en-PK', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <main className="bg-zoom-dark min-h-screen text-white pt-24 md:pt-32 pb-12 md:pb-20 selection:bg-zoom-red selection:text-white overflow-hidden relative">

      {/* BACKGROUND EFFECTS */}
      <div className="absolute inset-0 pointer-events-none">
         <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[300px] md:w-[800px] h-[300px] md:h-[800px] bg-zoom-red opacity-10 blur-[100px] md:blur-[150px] rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">

        {/* --- HEADER SECTION --- */}
        <div className="text-center mb-10 md:mb-16">

          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 md:px-5 md:py-2 rounded-full bg-white/5 border border-white/10 mb-6 md:mb-8 backdrop-blur-md shadow-lg">
            <span className="relative flex h-2.5 w-2.5 md:h-3 md:w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-full w-full bg-green-500"></span>
            </span>
            <span className="text-[10px] md:text-xs font-bold text-gray-200 uppercase tracking-[0.2em]">
              Official OGRA Approved
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-black mb-4 md:mb-6 uppercase tracking-tighter drop-shadow-2xl">
            Daily <span className="text-transparent bg-clip-text bg-gradient-to-r from-zoom-red to-red-500">Rates</span>
          </h1>

          {/* Styled Paragraph Block */}
          <div className="max-w-3xl mx-auto bg-zinc-900/50 border border-white/10 rounded-2xl p-4 md:p-6 backdrop-blur-sm">
            <p className="text-gray-300 text-sm md:text-lg leading-relaxed font-medium">
              We ensure complete transparency with our valued customers. Below are the official
              <span className="text-white font-bold"> Government Approved Fuel Rates </span>
              updated for today.
            </p>

            {/* Date Display */}
            <div className="mt-4 pt-4 border-t border-white/10 flex justify-center items-center gap-2">
              <svg className="w-4 h-4 md:w-5 md:h-5 text-zoom-red" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              <p className="text-xs md:text-sm font-mono text-gray-400">
                Last Updated: <span className="text-zoom-red font-bold">{today}</span>
              </p>
            </div>
          </div>
        </div>

        {/* --- 🔴 TICKER SECTION --- */}
        <div className="w-full bg-zoom-red border-y border-red-800 py-2 md:py-3 mb-10 md:mb-16 overflow-hidden relative shadow-[0_0_30px_rgba(230,57,70,0.3)] z-20">
          <div className="whitespace-nowrap flex animate-marquee items-center">
             <span className="mx-2 md:mx-4 text-white font-bold text-xs md:text-lg uppercase tracking-wider flex items-center gap-2 md:gap-4">
               🚨 Pure Fuel Guaranteed • High Accuracy Meters • Open 24/7 Service • Visit Alniaz Petroleum •
             </span>
             <span className="mx-2 md:mx-4 text-white font-bold text-xs md:text-lg uppercase tracking-wider flex items-center gap-2 md:gap-4">
               🚨 Pure Fuel Guaranteed • High Accuracy Meters • Open 24/7 Service • Visit Alniaz Petroleum •
             </span>
          </div>
        </div>

        {/* --- RATES CARDS --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 justify-center max-w-5xl mx-auto">
          {fuels.length === 0 ? (
            <div className="col-span-full text-center py-24 bg-white/5 rounded-[2rem] border border-white/10">
              <div className="inline-block animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-zoom-red mb-4"></div>
              <p className="text-gray-300 font-bold text-lg uppercase tracking-widest">Fetching Live Rates...</p>
            </div>
          ) : (
            fuels.map((fuel: any) => {

              const isDiesel = fuel.name.toLowerCase().includes("diesel");
              const accentColor = isDiesel ? "text-zoom-yellow" : "text-zoom-red";
              const borderColor = isDiesel ? "hover:border-zoom-yellow/60" : "hover:border-zoom-red/60";
              const shadowColor = isDiesel ? "hover:shadow-[0_0_50px_-10px_rgba(255,215,0,0.3)]" : "hover:shadow-[0_0_50px_-10px_rgba(230,57,70,0.3)]";
              const iconBg = isDiesel ? "bg-yellow-500/20" : "bg-red-500/20";
              const iconColor = isDiesel ? "text-yellow-400" : "text-red-400";

              return (
                <div key={fuel._id} className="group relative">
                  <div className={`relative bg-[#121212] p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border border-white/10 h-full flex flex-col items-center justify-between overflow-hidden transition-all duration-500 hover:-translate-y-2 ${borderColor} ${shadowColor}`}>

                    <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

                    <div className="w-full flex justify-between items-start mb-6 md:mb-8 z-10 border-b border-white/10 pb-4 md:pb-6">
                      <div className="flex items-center gap-3 md:gap-4">
                         <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center ${iconBg} ${iconColor} shadow-lg`}>
                           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 md:w-7 md:h-7"><path d="M3 22v-8a2 2 0 0 1 2-2h2.5"/><path d="M11.5 14a2.5 2.5 0 0 0-5 0"/><path d="M14 14h2.5a2 2 0 0 1 2 2v8"/><path d="M18.5 14a2.5 2.5 0 0 0-5 0"/><path d="M7.5 12h5"/><path d="M3 16h18"/></svg>
                         </div>
                         <div>
                            <p className="text-[10px] md:text-xs text-gray-500 font-bold uppercase tracking-wider mb-0.5 md:mb-1">Fuel Type</p>
                            <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-wide leading-none">{fuel.name}</h3>
                         </div>
                      </div>

                      <div className={`px-3 py-1 md:px-4 md:py-1.5 rounded-lg text-[9px] md:text-[10px] font-bold uppercase tracking-widest border ${
                        fuel.status === 'available'
                        ? "bg-green-500/10 text-green-400 border-green-500/20"
                        : "bg-red-500/10 text-red-400 border-red-500/20"
                      }`}>
                        {fuel.status === 'available' ? "● In Stock" : "● Out"}
                      </div>
                    </div>

                    <div className="bg-black border border-white/10 rounded-2xl md:rounded-3xl p-6 md:p-8 w-full mb-6 md:mb-8 relative shadow-[inset_0_2px_10px_rgba(0,0,0,1)]">
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-gray-500 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em]">Current Price</p>
                        <p className="text-gray-600 text-[9px] md:text-[10px] font-mono">PKR / LITER</p>
                      </div>

                      <div className="flex justify-end items-baseline gap-1 md:gap-2">
                        <span className={`${accentColor} text-2xl md:text-3xl font-bold font-mono self-start mt-2 md:mt-4`}>Rs.</span>
                        <span className="text-5xl md:text-7xl lg:text-8xl font-mono font-bold text-white tracking-tighter drop-shadow-2xl">
                           {Math.floor(fuel.price)}
                           <span className={`text-2xl md:text-4xl ${accentColor} font-normal ml-0.5 md:ml-1`}>
                            {(fuel.price % 1).toFixed(2).substring(1)}
                          </span>
                        </span>
                      </div>
                    </div>

                    <div className="w-full grid grid-cols-2 gap-3 md:gap-4 z-10">
                      <div className="bg-white/5 rounded-2xl p-3 md:p-4 border border-white/5 hover:bg-white/10 transition">
                        <p className="text-[9px] md:text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5 md:mb-1">Previous Rate</p>
                        <p className="text-white font-mono text-lg md:text-xl font-bold">Rs. {fuel.prevPrice}</p>
                      </div>

                      <div className={`rounded-2xl p-3 md:p-4 border flex flex-col justify-center items-end transition ${
                         fuel.price > fuel.prevPrice
                         ? "bg-red-500/5 border-red-500/20"
                         : fuel.price < fuel.prevPrice
                           ? "bg-green-500/5 border-green-500/20"
                           : "bg-gray-800/50 border-gray-700/30"
                      }`}>
                         {fuel.price > fuel.prevPrice ? (
                           <>
                             <p className="text-red-400 font-black text-xs md:text-sm flex items-center gap-1 uppercase">Hike <span className="text-base md:text-lg">↗</span></p>
                             <p className="text-[9px] md:text-[10px] text-red-400/60 font-bold uppercase tracking-wider">Trending Up</p>
                           </>
                         ) : fuel.price < fuel.prevPrice ? (
                           <>
                             <p className="text-green-400 font-black text-xs md:text-sm flex items-center gap-1 uppercase">Drop <span className="text-base md:text-lg">↘</span></p>
                             <p className="text-[9px] md:text-[10px] text-green-400/60 font-bold uppercase tracking-wider">Trending Down</p>
                           </>
                         ) : (
                           <>
                             <p className="text-gray-300 font-black text-xs md:text-sm uppercase">Stable</p>
                             <p className="text-[9px] md:text-[10px] text-gray-500 font-bold uppercase tracking-wider">No Change</p>
                           </>
                         )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="max-w-4xl mx-auto mt-16 md:mt-20 mb-10">
          <div className="bg-zinc-900 border-l-4 border-zoom-red p-4 md:p-6 rounded-r-xl flex flex-col md:flex-row gap-4 md:gap-6 items-start shadow-xl">
             <div className="bg-zoom-red/10 p-2 md:p-3 rounded-full text-zoom-red shrink-0">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 md:w-6 md:h-6"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
             </div>
             <div>
               <h4 className="text-white font-bold text-base md:text-lg mb-2 uppercase tracking-wide">Important Notice</h4>
               <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
                 Fuel rates are subject to change as per notifications from the <span className="text-gray-200 font-semibold">OGRA</span>.
                 While we strive to update our website immediately, please confirm the final rate at the pump station counter.
                 We ensure 100% accurate measurements and purity in every drop.
               </p>
             </div>
          </div>
        </div>

      </div>
    </main>
  );
}