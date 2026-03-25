import React from "react";

export default function TermsOfService() {
  return (
    <main className="bg-[#050505] min-h-screen text-white pt-32 pb-20 px-6 relative z-20">

      {/* Background Texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-20" />

      <div className="max-w-4xl mx-auto relative z-10">
        <h1 className="text-4xl md:text-6xl font-black mb-8 text-zoom-yellow">TERMS OF SERVICE</h1>

        <div className="space-y-8 text-gray-300 leading-relaxed text-sm md:text-base">
          <section>
            <h2 className="text-xl font-bold text-white mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing and using the Alniaz Petroleum website, you accept and agree to be bound by the terms and provision of this agreement.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">2. Services</h2>
            <p>
              Alniaz Petroleum provides fuel rates and service information for informational purposes. While we strive for accuracy, rates are subject to change per OGRA regulations.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">3. Intellectual Property</h2>
            <p>
              All content, logos, and graphics on this site are the property of Alniaz Petroleum and are protected by copyright laws.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">4. Limitation of Liability</h2>
            <p>
              Alniaz Petroleum shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use our services.
            </p>
          </section>

          <p className="text-xs text-gray-500 mt-10 border-t border-white/10 pt-4">
            Last Updated: January 2026
          </p>
        </div>
      </div>
    </main>
  );
}