"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Droplet, Mail, Trash2, User, Phone, Calendar,
  LogOut, Loader2, Save, Menu, X, Quote
} from "lucide-react";

export default function AdminPage() {
  const { status } = useSession();
  const router = useRouter();

  // --- STATES ---
  const [activeTab, setActiveTab] = useState<'rates' | 'messages'>('rates');
  const [fuels, setFuels] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // --- FETCH DATA ---
  const fetchFuels = async () => {
    try {
      const res = await fetch(`/api/fuels?t=${Date.now()}`, { cache: 'no-store' });
      const data = await res.json();
      if (Array.isArray(data)) setFuels(data);
    } catch (error) { console.error("Fuel Fetch Error:", error); }
  };

  const fetchMessages = async () => {
    try {
      const res = await fetch(`/api/contact?t=${Date.now()}`, { cache: 'no-store' });
      const data = await res.json();
      if (Array.isArray(data)) setMessages(data);
    } catch (error) { console.error("Message Fetch Error:", error); }
  };

  useEffect(() => {
    if (status === "authenticated") {
        Promise.all([fetchFuels(), fetchMessages()]).then(() => setLoading(false));
    }
  }, [status]);

  // --- ACTIONS ---
  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
        signOut({ callbackUrl: "/login" });
    }
  };

  const handleRateUpdate = async (id: string, newPrice: number, newStatus: string) => {
    if (!newPrice || isNaN(newPrice)) {
        alert("Please enter a valid price.");
        return;
    }

    setUpdating(id);
    try {
      const res = await fetch("/api/fuels", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, price: newPrice, status: newStatus }),
      });

      if (res.ok) {
        await fetchFuels();
        alert("✅ Rate Updated Successfully!");
      } else {
        alert("❌ Update failed on server. Check logs.");
      }
    } catch (error) {
        alert("❌ Network error. Please try again.");
    } finally {
        setUpdating(null);
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if(!confirm("Delete this message permanently?")) return;
    try {
      const res = await fetch(`/api/contact?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setMessages(messages.filter((m: any) => m._id !== id));
      }
    } catch (error) { alert("Error deleting message"); }
  };

  if (status === "loading" || (status === "authenticated" && loading)) {
    return (
      <div className="min-h-screen bg-[#09090b] flex items-center justify-center">
        <Loader2 className="animate-spin text-red-600 w-10 h-10" />
      </div>
    );
  }

  if (status === "unauthenticated") {
    router.push("/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans flex relative overflow-hidden">

      {/* MOBILE MENU OVERLAY */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 md:hidden backdrop-blur-md" onClick={() => setMobileMenuOpen(false)} />
      )}

      {/* SIDEBAR */}
      <aside className={`fixed top-0 left-0 h-screen w-72 bg-[#0c0c0e] border-r border-white/5 p-6 z-50 transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} md:sticky`}>
        <div className="flex justify-end md:hidden mb-6">
            <button onClick={() => setMobileMenuOpen(false)} className="text-zinc-400 hover:text-white p-2 border border-white/10 rounded-lg"><X /></button>
        </div>
        <nav className="space-y-3 mt-10 md:mt-32">
            <button
                onClick={() => { setActiveTab('rates'); setMobileMenuOpen(false); }}
                className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all font-bold tracking-wide ${activeTab === 'rates' ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-900/20' : 'text-zinc-500 hover:bg-white/5 hover:text-white'}`}
            >
                <Droplet size={20} /> Fuel Rates
            </button>
            <button
                onClick={() => { setActiveTab('messages'); setMobileMenuOpen(false); }}
                className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all font-bold tracking-wide ${activeTab === 'messages' ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-900/20' : 'text-zinc-500 hover:bg-white/5 hover:text-white'}`}
            >
                <Mail size={20} /> Messages
                {messages.length > 0 && <span className="ml-auto bg-white text-red-600 text-xs font-black px-2 py-0.5 rounded-full shadow-sm">{messages.length}</span>}
            </button>
        </nav>
        <div className="absolute bottom-8 left-6 right-6">
            <button onClick={handleLogout} className="flex items-center justify-center gap-3 text-zinc-500 hover:text-red-500 transition-colors text-sm font-bold uppercase tracking-widest w-full py-3 border border-zinc-800 rounded-xl hover:border-red-500/30 hover:bg-red-500/5 group">
                <LogOut size={16} className="group-hover:-translate-x-1 transition-transform" /> Logout
            </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 w-full relative h-screen overflow-y-auto bg-[#050505]">
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
         <div className="absolute top-[-20%] left-[50%] -translate-x-1/2 w-[800px] h-[800px] bg-red-600/10 blur-[150px] rounded-full pointer-events-none" />

         <div className="p-6 md:p-12 max-w-7xl mx-auto pt-32 md:pt-40 pb-20 relative z-10">
            <div className="flex flex-col items-center justify-center text-center mb-20 relative">
                <button onClick={() => setMobileMenuOpen(true)} className="absolute left-0 top-2 md:hidden p-3 bg-zinc-900/80 backdrop-blur rounded-xl text-white border border-white/10 hover:border-red-500/50 transition-colors">
                    <Menu />
                </button>
                <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
                    <p className="text-zinc-400 text-[10px] font-black uppercase tracking-[0.2em]">Admin Control Panel</p>
                </div>
                <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter text-white drop-shadow-2xl mb-2">
                    {activeTab === 'rates' ? 'Fuel Prices' : 'Inbox Messages'}
                </h1>
            </div>

            {/* --- RATES SECTION --- */}
            {activeTab === 'rates' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {fuels.map((fuel: any) => {
                const isDiesel = fuel.name.toLowerCase().includes("diesel");
                const isHighOctane = fuel.name.toLowerCase().includes("octane");
                let textColor = isDiesel ? "text-yellow-500" : isHighOctane ? "text-blue-500" : "text-red-500";
                let btnColor = isDiesel ? "bg-yellow-600 hover:bg-yellow-500 text-black" : isHighOctane ? "bg-blue-600 hover:bg-blue-500 text-white" : "bg-red-600 hover:bg-red-500 text-white";

                return (
                    <div key={fuel._id} className="bg-[#121214] border border-white/5 rounded-[32px] p-6 shadow-2xl transition-all group hover:-translate-y-2">
                        <div className="flex justify-between items-start mb-8 relative z-10">
                            <h3 className={`text-2xl font-black italic uppercase ${textColor}`}>{fuel.name}</h3>
                            <div className={`w-3 h-3 rounded-full ${fuel.status === 'available' ? "bg-green-500 shadow-[0_0_10px_green]" : "bg-red-500 shadow-[0_0_10px_red]"}`} />
                        </div>
                        <div className="space-y-6">
                            <div>
                                <label className="text-[10px] text-zinc-400 uppercase font-bold block mb-2">Price Per Liter</label>
                                <input
                                    type="number"
                                    id={`price-${fuel._id}`}
                                    defaultValue={fuel.price}
                                    className="w-full bg-[#18181b] border border-white/5 rounded-2xl py-4 px-4 text-2xl font-black text-white outline-none focus:border-red-500/50"
                                />
                            </div>
                            <div>
                                <label className="text-[10px] text-zinc-400 uppercase font-bold block mb-2">Status</label>
                                <select
                                    id={`status-${fuel._id}`}
                                    defaultValue={fuel.status}
                                    className="w-full bg-[#18181b] border border-white/5 rounded-2xl py-4 px-4 text-sm font-bold text-white outline-none"
                                >
                                    <option value="available">Available</option>
                                    <option value="unavailable">Unavailable</option>
                                </select>
                            </div>
                        </div>
                        <button
                            onClick={() => {
                                const p = document.getElementById(`price-${fuel._id}`) as HTMLInputElement;
                                const s = document.getElementById(`status-${fuel._id}`) as HTMLSelectElement;
                                handleRateUpdate(fuel._id, Number(p.value), s.value);
                            }}
                            disabled={updating === fuel._id}
                            className={`w-full mt-8 py-5 rounded-2xl font-black uppercase text-xs flex items-center justify-center gap-3 transition-all ${btnColor} shadow-lg`}
                        >
                            {updating === fuel._id ? <Loader2 className="animate-spin w-4 h-4" /> : <Save className="w-4 h-4" />}
                            {updating === fuel._id ? "Saving..." : "Update Price"}
                        </button>
                    </div>
                )
                })}
            </div>
            )}

            {/* --- MESSAGES SECTION (PREMIUM DESIGN UPGRADE) --- */}
            {activeTab === 'messages' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {messages.length === 0 ? (
                <div className="md:col-span-2 py-32 text-center text-zinc-500 border-2 border-dashed border-zinc-900 rounded-[32px] flex flex-col items-center justify-center gap-4">
                     <div className="w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-600">
                        <Mail size={32} />
                     </div>
                     <p className="font-bold uppercase tracking-widest text-sm">Inbox is empty</p>
                </div>
                ) : (
                messages.map((msg: any) => (
                    <div key={msg._id} className="relative group bg-[#0e0e10] border border-white/5 p-6 md:p-8 rounded-[24px] hover:border-red-500/30 hover:shadow-[0_0_30px_-10px_rgba(220,38,38,0.1)] transition-all duration-300">

                        {/* Header: Avatar, Name & Delete */}
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 group-hover:bg-red-600 group-hover:text-white transition-all shadow-inner">
                                    <User size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white text-lg md:text-xl leading-tight mb-1">{msg.name}</h3>
                                    <span className="text-[10px] md:text-xs text-zinc-500 font-mono flex items-center gap-1.5 uppercase tracking-wide">
                                        <Calendar size={10} /> {new Date(msg.createdAt).toLocaleString()}
                                    </span>
                                </div>
                            </div>
                            <button
                                onClick={() => handleDeleteMessage(msg._id)}
                                className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-zinc-900 text-zinc-500 hover:bg-red-500/10 hover:text-red-500 hover:scale-110 transition-all border border-white/5"
                                title="Delete Message"
                            >
                                <Trash2 size={16}/>
                            </button>
                        </div>

                        {/* Contact Details Badges */}
                        <div className="flex flex-wrap gap-2 mb-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900/80 border border-white/5 text-[11px] md:text-xs text-zinc-300 font-medium">
                                <Mail size={12} className="text-blue-500" /> {msg.email}
                            </div>
                            {msg.phone && (
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900/80 border border-white/5 text-[11px] md:text-xs text-zinc-300 font-medium">
                                    <Phone size={12} className="text-green-500" /> {msg.phone}
                                </div>
                            )}
                        </div>

                        {/* Message Content */}
                        <div className="relative bg-black/40 rounded-2xl p-5 md:p-6 border border-white/5 group-hover:border-white/10 transition-colors">
                            <Quote className="absolute top-4 left-4 text-white/5 w-6 h-6 md:w-8 md:h-8 -scale-x-100" />
                            <p className="relative z-10 text-zinc-300 text-sm md:text-base leading-relaxed pl-2 font-medium">
                                {msg.message}
                            </p>
                        </div>

                    </div>
                ))
                )}
            </div>
            )}
         </div>
      </main>
    </div>
  );
}