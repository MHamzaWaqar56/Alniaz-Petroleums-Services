import Hero from "@/components/sections/Hero";
import FuelCalculator from "@/components/sections/FuelCalculator";
import HomeServices from "@/components/sections/HomeServices";
import About from "@/components/sections/About";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import OwnersGroup from "@/components/sections/OwnersGroup";

export const dynamic = "force-dynamic";

// Database Imports
import connectDB from "@/lib/db";
import Fuel from "@/models/Fuel";

async function getFuelRates() {
  try {
    await connectDB();
    const rates = await Fuel.find({}).sort({ updatedAt: -1 });
    return JSON.parse(JSON.stringify(rates));
  } catch (error) {
    console.error("Rates fetch error:", error);
    return [];
  }
}

export default async function Home() {
  const fuels = await getFuelRates();

  const today = new Date().toLocaleDateString('en-PK', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <main className="bg-zoom-dark min-h-screen text-white selection:bg-zoom-red selection:text-white overflow-x-hidden">

      <Hero />

      {/* --- 🔴 RUNNING TICKER --- */}
      <div className="bg-zoom-red py-2 md:py-3 overflow-hidden relative z-30 shadow-[0_0_20px_rgba(230,57,70,0.4)] border-y border-red-800">
        <div className="whitespace-nowrap flex animate-marquee">
          <span className="mx-2 md:mx-4 text-white font-bold text-xs md:text-sm lg:text-lg uppercase tracking-wider flex items-center gap-2">
            🚨 Live Updates: Official Fuel Rates Released • High Quality Fuel Guaranteed • Open 24/7 • Visit Alniaz Petroleums Today •
          </span>
          <span className="mx-2 md:mx-4 text-white font-bold text-xs md:text-sm lg:text-lg uppercase tracking-wider flex items-center gap-2">
            🚨 Live Updates: Official Fuel Rates Released • High Quality Fuel Guaranteed • Open 24/7 • Visit Alniaz Petroleums Today •
          </span>
        </div>
      </div>

      {/* --- RATES SECTION --- */}
      <section className="relative py-12 md:py-20 lg:py-24 px-4 md:px-8 lg:px-12 bg-zoom-dark overflow-hidden">

        {/* BACKGROUND GLOW */}
        <div className="absolute inset-0 pointer-events-none">
           <div className="absolute -top-10 -left-10 md:-top-20 md:-left-20 w-[200px] md:w-[500px] h-[200px] md:h-[500px] bg-zoom-red opacity-10 blur-[80px] md:blur-[120px] rounded-full"></div>
           <div className="absolute top-1/2 -right-10 md:-right-20 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-zoom-yellow opacity-5 blur-[100px] md:blur-[150px] rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">

          {/* Header */}
          <div className="text-center mb-10 md:mb-16">
            <span className="text-zoom-red font-mono text-[10px] md:text-sm tracking-[0.2em] md:tracking-[0.3em] uppercase mb-2 block animate-pulse">
              Official Government Rates
            </span>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white uppercase tracking-tighter mb-4 drop-shadow-xl">
              Fuel <span className="text-zoom-red">Prices</span>
            </h2>
            <div className="inline-block bg-white/5 backdrop-blur-sm rounded-full px-4 py-1.5 md:px-6 md:py-2 border border-white/10 shadow-lg">
              <p className="text-gray-300 text-xs md:text-sm font-medium">📅 Updated: {today}</p>
            </div>
          </div>

          {/* Cards Grid - 🔥 TABLET FIX: grid-cols-1 for md, grid-cols-2 for lg */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 justify-center max-w-5xl mx-auto">
            {fuels.length === 0 ? (
              <p className="text-center col-span-full text-gray-500 animate-pulse text-sm md:text-base">Loading System...</p>
            ) : (
              fuels.map((fuel: any) => {

                const isDiesel = fuel.name.toLowerCase().includes("diesel");
                const accentColor = isDiesel ? "text-zoom-yellow" : "text-zoom-red";
                const borderColor = isDiesel ? "hover:border-zoom-yellow/60" : "hover:border-zoom-red/60";
                const shadowColor = isDiesel ? "hover:shadow-[0_0_30px_-10px_rgba(255,215,0,0.3)]" : "hover:shadow-[0_0_30px_-10px_rgba(230,57,70,0.3)]";

                return (
                  <div key={fuel._id} className="group relative">

                    {/* Card Container */}
                    <div className={`relative bg-zoom-gray/80 backdrop-blur-md p-6 md:p-10 rounded-[2rem] border border-white/10 h-full flex flex-col items-center justify-between overflow-hidden transition-all duration-500 hover:-translate-y-2 ${borderColor} ${shadowColor}`}>

                      {/* Card Header */}
                      <div className="w-full flex justify-between items-center mb-6 z-10 border-b border-white/10 pb-4">
                        <div className="flex items-center gap-3">
                           {/* Icon for visual appeal on Tablet */}
                           <div className={`w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center ${isDiesel ? 'bg-zoom-yellow/10' : 'bg-zoom-red/10'}`}>
                              <div className={`w-3 h-3 md:w-4 md:h-4 rounded-full ${isDiesel ? 'bg-zoom-yellow' : 'bg-zoom-red'}`} />
                           </div>
                           <h3 className="text-xl md:text-3xl font-bold text-white uppercase tracking-wider">{fuel.name}</h3>
                        </div>

                        {/* Status Dot */}
                        <div className={`px-3 py-1 rounded-full border text-[10px] md:text-xs font-bold uppercase ${
                          fuel.status === 'available'
                          ? "bg-green-500/10 border-green-500/20 text-green-400"
                          : "bg-red-500/10 border-red-500/20 text-red-400"
                        }`}>
                           {fuel.status === 'available' ? 'In Stock' : 'Out of Stock'}
                        </div>
                      </div>

                      {/* DIGITAL METER DISPLAY */}
                      <div className="bg-black/60 border border-white/5 rounded-2xl p-6 md:p-8 w-full mb-8 relative shadow-inner">
                        <p className="text-right text-gray-500 text-[10px] md:text-xs font-mono mb-2 uppercase tracking-widest">Price Per Liter</p>

                        <div className="flex justify-end items-baseline gap-2">
                          {/* Symbol */}
                          <span className={`${accentColor} text-lg md:text-3xl font-bold font-mono self-start mt-2 md:mt-4`}>Rs.</span>

                          {/* Price Number - Optimized for Tablet */}
                          <span className="text-5xl md:text-7xl lg:text-7xl font-mono font-bold text-white tracking-tighter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                             {Math.floor(fuel.price)}
                             <span className={`text-3xl md:text-4xl lg:text-5xl ${accentColor} font-normal ml-1`}>
                              {(fuel.price % 1).toFixed(2).substring(1)}
                            </span>
                          </span>
                        </div>
                      </div>

                      {/* Footer Stats */}
                      <div className="w-full flex justify-between items-center bg-white/5 rounded-xl p-3 md:p-5 z-10 border border-white/5">
                        <div className="text-left">
                          <p className="text-[10px] md:text-xs text-gray-400 uppercase tracking-wider mb-1">Previous Rate</p>
                          <p className="text-gray-200 font-mono text-base md:text-xl font-bold">Rs. {fuel.prevPrice}</p>
                        </div>

                        <div className="text-right">
                           {fuel.price > fuel.prevPrice ? (
                             <span className="text-red-400 text-[10px] md:text-sm font-bold flex items-center gap-1 bg-red-500/10 px-3 py-1.5 rounded-full border border-red-500/20">
                               ▲ <span className="hidden sm:inline">INCREASED</span><span className="sm:hidden">UP</span>
                             </span>
                           ) : fuel.price < fuel.prevPrice ? (
                             <span className="text-green-400 text-[10px] md:text-sm font-bold flex items-center gap-1 bg-green-500/10 px-3 py-1.5 rounded-full border border-green-500/20">
                               ▼ <span className="hidden sm:inline">DECREASED</span><span className="sm:hidden">DOWN</span>
                             </span>
                           ) : (
                             <span className="text-gray-400 text-[10px] md:text-sm font-bold bg-white/10 px-3 py-1.5 rounded-full">
                               ● STABLE
                             </span>
                           )}
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* --- OTHER SECTIONS --- */}
      <WhyChooseUs />
      <FuelCalculator />
      <HomeServices />
      <OwnersGroup />
      <About />
    </main>
  );
}
