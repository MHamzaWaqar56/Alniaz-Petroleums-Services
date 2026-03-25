import React from "react";

export default function PrivacyPolicy() {
  return (
    <main className="bg-[#050505] min-h-screen text-white pt-32 pb-20 px-6 relative z-20">

      {/* Background Texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-20" />

      <div className="max-w-4xl mx-auto relative z-10">
        <h1 className="text-4xl md:text-6xl font-black mb-8 text-zoom-red">PRIVACY POLICY</h1>

        <div className="space-y-8 text-gray-300 leading-relaxed text-sm md:text-base">
          <section>
            <h2 className="text-xl font-bold text-white mb-3">1. Information We Collect</h2>
            <p>
              At Alniaz Petroleum, we respect your privacy. We only collect information necessary to improve our services, such as when you contact us via our website or sign up for updates.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">2. How We Use Your Data</h2>
            <p>
              Any personal data provided is used strictly for communication purposes. We do not sell, trade, or rent your personal identification information to others.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">3. Security</h2>
            <p>
              We adopt appropriate data collection, storage, and processing practices and security measures to protect against unauthorized access to your personal information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">4. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at <span className="text-zoom-red font-bold">info@alniazpetroleum.com</span>.
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