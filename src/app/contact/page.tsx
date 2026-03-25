"use client";
import React, { useState } from "react";
import { MapPin, Phone, Mail, Send, Facebook, Instagram, ArrowRight, Loader2, CheckCircle } from "lucide-react";

const TikTokIcon = ({ size = 18, className }: { size?: number, className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: ""
  });

  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", phone: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Submission Error:", error);
      setStatus("error");
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] pt-24 pb-12 md:pt-32 md:pb-20 relative overflow-hidden text-white selection:bg-zoom-red selection:text-white">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:30px_30px] md:bg-[size:40px_40px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-zoom-red/5 rounded-full blur-[100px] md:blur-[150px]" />
      <div className="absolute bottom-0 left-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-zoom-yellow/5 rounded-full blur-[100px] md:blur-[150px]" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-10 md:mb-16 animate-fade-in">
          <span className="text-zoom-red font-bold tracking-[0.2em] md:tracking-[0.3em] uppercase text-xs md:text-sm mb-2 md:mb-4 block">
            We are here for you
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-black mb-4 md:mb-6 leading-tight">
            CONTACT <span className="text-transparent text-stroke">SUPPORT</span>
          </h1>
          <p className="text-gray-400 text-sm md:text-lg max-w-xl md:max-w-2xl mx-auto leading-relaxed">
            Visit our flagship station in <span className="text-white font-bold border-b border-zoom-yellow">Chichawatni</span> or reach out digitally. We respond within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-start">
          <div className="space-y-4 md:space-y-6 animate-slide-up order-2 lg:order-1">

            <div className="group relative overflow-hidden p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] bg-zinc-900 border border-white/10 hover:border-zoom-red transition-all duration-300 shadow-xl">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none">
                 <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] animate-[spin_4s_linear_infinite]" />
              </div>
              <div className="relative z-10 flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left">
                 <div className="w-14 h-14 md:w-16 md:h-16 bg-zoom-red rounded-2xl flex items-center justify-center shadow-[0_0_20px_#E63946] shrink-0">
                   <MapPin size={28} className="text-white md:w-8 md:h-8" />
                 </div>
                 <div>
                   <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Alniaz Petroleum Chichawatni</h3>
                   <p className="text-gray-300 text-sm md:text-base font-medium leading-relaxed mb-4">
                     Bypass Road, Chichawatni, Pakistan,<br />
                     Tehsil Chichawatni, Dist Sahiwal.
                   </p>
                   <a
                     href="https://maps.app.goo.gl/cYiRyx8dgsPEkZHNA"  
                     target="_blank"
                     rel="noopener noreferrer"
                     className="inline-flex items-center gap-2 px-4 py-2 md:px-5 md:py-2.5 bg-white text-black font-bold rounded-full text-xs md:text-sm hover:scale-105 transition-transform"
                   >
                     Open in Google Maps <ArrowRight size={14} />
                   </a>
                 </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              <div className="group p-5 md:p-6 rounded-[1.5rem] md:rounded-[2rem] bg-zinc-900 border border-white/10 hover:border-zoom-yellow transition-all duration-300">
                 <div className="w-10 h-10 md:w-12 md:h-12 bg-zoom-yellow/10 border border-zoom-yellow/30 rounded-xl flex items-center justify-center mb-4 text-zoom-yellow group-hover:scale-110 transition-transform">
                    <Phone size={20} className="md:w-6 md:h-6" />
                 </div>
                 <h3 className="text-base md:text-lg font-bold text-white mb-1">Call Us 24/7</h3>
                 <p className="text-white font-mono text-base md:text-lg font-bold">0311 4660084</p>
              </div>

              <div className="group p-5 md:p-6 rounded-[1.5rem] md:rounded-[2rem] bg-zinc-900 border border-white/10 hover:border-blue-500 transition-all duration-300">
                 <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-500/10 border border-blue-500/30 rounded-xl flex items-center justify-center mb-4 text-blue-500 group-hover:scale-110 transition-transform">
                    <Mail size={20} className="md:w-6 md:h-6" />
                 </div>
                 <h3 className="text-base md:text-lg font-bold text-white mb-1">Email Us</h3>
                 <p className="text-white font-medium text-sm md:text-base break-all leading-tight">
                   infoalniazpetroleum@gmail.com
                 </p>
              </div>
            </div>

            <div className="p-5 md:p-6 rounded-[1.5rem] md:rounded-[2rem] bg-gradient-to-r from-zinc-900 to-zinc-800 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
               <span className="font-bold text-gray-400 text-sm md:text-base">Follow Updates</span>
               <div className="flex gap-3">
                 {/* Facebook Link */}
                 <a
                   href="#"
                   target="_blank"
                   rel="noopener noreferrer"
                   className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center border transition-all duration-300 bg-[#1877F2] border-[#1877F2] text-white shadow-[0_0_15px_rgba(24,119,242,0.5)] md:bg-black md:border-white/20 md:text-white md:shadow-none md:hover:bg-[#1877F2] md:hover:border-[#1877F2] md:hover:text-white md:hover:-translate-y-1 md:hover:shadow-[0_0_20px_rgba(24,119,242,0.6)]">
                   <Facebook size={18} className="md:w-5 md:h-5" />
                 </a>

                 {/* Instagram Link */}
                 <a
                   href="#"
                   target="_blank"
                   rel="noopener noreferrer"
                   className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center border transition-all duration-300 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 border-transparent text-white shadow-[0_0_15px_rgba(236,72,153,0.5)] md:bg-black md:border-white/20 md:text-white md:bg-none md:shadow-none md:hover:bg-gradient-to-tr md:hover:from-yellow-400 md:hover:via-red-500 md:hover:to-purple-500 md:hover:text-white md:hover:-translate-y-1 md:hover:shadow-[0_0_20px_rgba(236,72,153,0.6)]">
                   <Instagram size={18} className="md:w-5 md:h-5" />
                 </a>

                 {/* TikTok Link */}
                 <a
                   href="#"
                   target="_blank"
                   rel="noopener noreferrer"
                   className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center border transition-all duration-300 bg-white border-white text-black shadow-[0_0_15px_rgba(255,255,255,0.4)] md:bg-black md:border-white/20 md:text-white md:shadow-none md:hover:bg-white md:hover:border-white md:hover:text-black md:hover:-translate-y-1 md:hover:shadow-[0_0_20px_rgba(255,255,255,0.5)]">
                   <TikTokIcon size={18} className="md:w-5 md:h-5" />
                 </a>

                 {/* Gmail Link */}
                 <a
                   href="mailto:#"
                   className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center border transition-all duration-300 bg-[#EA4335] border-[#EA4335] text-white shadow-[0_0_15px_rgba(234,67,53,0.5)] md:bg-black md:border-white/20 md:text-white md:shadow-none md:hover:bg-[#EA4335] md:hover:border-[#EA4335] md:hover:text-white md:hover:-translate-y-1 md:hover:shadow-[0_0_20px_rgba(234,67,53,0.6)]">
                   <Mail size={18} className="md:w-5 md:h-5" />
                 </a>
               </div>
            </div>
          </div>

          <div className="bg-zinc-900/80 backdrop-blur-xl border border-white/10 p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl relative overflow-hidden animate-fade-in-delayed order-1 lg:order-2">
            <div className="absolute top-0 left-0 w-full h-1 md:h-1.5 bg-gradient-to-r from-zoom-red via-zoom-yellow to-zoom-red" />
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 md:mb-8">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                <div className="group">
                  <label className="text-[10px] md:text-xs font-bold text-gray-400 uppercase ml-3 mb-1.5 md:mb-2 block group-focus-within:text-white transition-colors">Name</label>
                  <input type="text" name="name" required placeholder="Your Name" value={formData.name} onChange={handleChange}
                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 md:px-5 md:py-4 text-sm md:text-base text-white focus:border-white focus:bg-white/5 outline-none transition-all placeholder:text-gray-600"
                  />
                </div>
                <div className="group">
                  <label className="text-[10px] md:text-xs font-bold text-gray-400 uppercase ml-3 mb-1.5 md:mb-2 block group-focus-within:text-white transition-colors">Phone</label>
                  <input type="text" name="phone" placeholder="+92..." value={formData.phone} onChange={handleChange}
                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 md:px-5 md:py-4 text-sm md:text-base text-white focus:border-white focus:bg-white/5 outline-none transition-all placeholder:text-gray-600"
                  />
                </div>
              </div>
              <div className="group">
                <label className="text-[10px] md:text-xs font-bold text-gray-400 uppercase ml-3 mb-1.5 md:mb-2 block group-focus-within:text-white transition-colors">Email</label>
                <input type="email" name="email" required placeholder="you@example.com" value={formData.email} onChange={handleChange}
                  className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 md:px-5 md:py-4 text-sm md:text-base text-white focus:border-white focus:bg-white/5 outline-none transition-all placeholder:text-gray-600"
                />
              </div>
              <div className="group">
                <label className="text-[10px] md:text-xs font-bold text-gray-400 uppercase ml-3 mb-1.5 md:mb-2 block group-focus-within:text-white transition-colors">Message</label>
                <textarea name="message" rows={4} required placeholder="Type your message here..." value={formData.message} onChange={handleChange}
                  className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 md:px-5 md:py-4 text-sm md:text-base text-white focus:border-white focus:bg-white/5 outline-none transition-all placeholder:text-gray-600 resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={status === "sending" || status === "success"}
                className={`w-full font-bold text-base md:text-lg py-3 md:py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg
                  ${status === "success"
                    ? "bg-green-500 text-white cursor-default"
                    : status === "error"
                    ? "bg-red-600 text-white"
                    : "bg-zoom-red text-white hover:bg-red-700 hover:scale-[1.02] active:scale-95 shadow-red-900/20"
                  }
                  disabled:opacity-80 disabled:hover:scale-100
                `}
              >
                {status === "sending" ? (
                  <>Sending... <Loader2 size={18} className="animate-spin" /></>
                ) : status === "success" ? (
                  <>Message Sent! <CheckCircle size={18} /></>
                ) : status === "error" ? (
                  <>Failed. Try Again.</>
                ) : (
                  <>Send Message <Send size={18} className="group-hover:translate-x-1 transition-transform" /></>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
      <style jsx>{`
        .text-stroke { -webkit-text-stroke: 1px rgba(255,255,255,0.3); color: transparent; }
        @media (max-width: 768px) { .text-stroke { -webkit-text-stroke: 0.5px rgba(255,255,255,0.3); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fadeIn 0.8s ease-out forwards; }
        .animate-slide-up { animation: fadeIn 0.8s ease-out 0.2s forwards; opacity: 0; animation-fill-mode: forwards; }
        .animate-fade-in-delayed { animation: fadeIn 0.8s ease-out 0.4s forwards; opacity: 0; animation-fill-mode: forwards; }
      `}</style>
    </main>
  );
}