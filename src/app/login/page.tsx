"use client";

import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react"; // useSession ایڈ کیا ہے
import { useRouter } from "next/navigation";
import BrandLogo from "@/components/ui/BrandLogo";
import { Lock, Loader2, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { status } = useSession(); // سیشن اسٹیٹس چیک کرنے کے لیے

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 1. اگر یوزر پہلے سے لاگ ان ہے، تو اسے لاگ ان پیج پر رکنے مت دو
  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/admin/dashboard");
    }
  }, [status, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // 2. سائن ان کی درخواست بھیجیں
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false, // پیج ری لوڈ ہونے سے روکیں
      });

      if (res?.error) {
        setError("Invalid email or password!");
        setLoading(false);
      } else {
        // ✅ 3. PRODUCTION FIX (The Magic Step):
        // Router کو ریفریش کریں تاکہ وہ Middleware سے نیا ٹوکن لے سکے
        router.refresh();

        // 4. تھوڑا سا انتظار کر کے زبردستی ڈیش بورڈ پر بھیجیں
        // (window.location سب سے محفوظ طریقہ ہے کیونکہ یہ پورا پیج لوڈ کرتا ہے)
        setTimeout(() => {
          window.location.href = "/admin/dashboard";
        }, 500); // 500ms کا وقفہ دیا تاکہ کوکیز سیٹ ہو سکیں
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  // اگر یوزر پہلے سے لاگ ان ہے تو لوڈر دکھائیں (تاکہ جھٹکا نہ لگے)
  if (status === "authenticated") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Loader2 className="animate-spin text-red-600 w-10 h-10" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden selection:bg-red-500/30">

      {/* --- BACKGROUND GLOW EFFECTS --- */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-red-900/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-yellow-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* --- LOGIN CARD --- */}
      <div className="w-full max-w-md p-8 md:p-10 bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-2xl shadow-2xl relative z-10">

        {/* LOGO HEADER */}
        <div className="flex flex-col items-center mb-10 scale-90">
            <BrandLogo showText={true} />
            <div className="mt-6 flex flex-col items-center gap-1">
              <h2 className="text-xl font-bold text-white tracking-widest uppercase font-montserrat">
                Admin Portal
              </h2>
              <p className="text-zinc-500 text-xs font-medium tracking-wide uppercase">
                Authorized Access Only
              </p>
            </div>
        </div>

        {/* LOGIN FORM */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-xs font-medium flex items-center justify-center gap-2 animate-pulse">
              <AlertCircle size={14} />
              {error}
            </div>
          )}

          {/* Email Input */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest ml-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black/40 border border-zinc-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all placeholder:text-zinc-700"
              placeholder="admin@example.com"
              required
            />
          </div>

          {/* Password Input */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest ml-1">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/40 border border-zinc-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all placeholder:text-zinc-700 pl-10"
                placeholder="••••••••"
                required
              />
              <Lock className="w-4 h-4 text-zinc-600 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 text-white font-bold py-3.5 rounded-lg transition-all transform active:scale-[0.98] shadow-[0_4px_20px_rgba(220,38,38,0.2)] hover:shadow-[0_4px_25px_rgba(220,38,38,0.4)] flex items-center justify-center gap-2 text-sm tracking-wide uppercase"
          >
            {loading ? <Loader2 className="animate-spin w-4 h-4" /> : "Access Dashboard"}
          </button>
        </form>
      </div>

      {/* Footer Text */}
      <div className="absolute bottom-6 text-zinc-800 text-[10px] font-medium tracking-widest uppercase">
        Alniaz Petroleums &copy; {new Date().getFullYear()}
      </div>
    </div>
  );
}
