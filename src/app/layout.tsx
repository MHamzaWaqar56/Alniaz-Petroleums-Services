import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Preloader from "@/components/ui/Preloader";

import Providers from "@/components/Providers";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
});

export const viewport: Viewport = {
  themeColor: "#E63946",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  // ✅ Note: Production ma isko apni real domain se badal lena
  metadataBase: new URL("https://alniaz-petroleums-services.vercel.app/"),
  title: {
    default: "Alniaz Petroleums | Fueling Your Journey",
    template: "%s | Alniaz Petroleums"
  },
  description: "Official website of Alniaz Petroleums, Chichawatni. Check daily petrol & diesel rates, premium car services, and experience 100% pure quality fuel.",
  keywords: [
    "Alniaz Petroleum", "Petrol Pump Chichawatni", "Diesel Price Chichawatni",
    "Fuel Station Pakistan", "Alniaz Petroleum Rates", "Car Wash Chichawatni",
    "Oil Change Service", "Pure Fuel"
  ],
  authors: [{ name: "Alniaz Petroleum", url: "https://alniazpetroleum.com" }],
  creator: "Alniaz Petroleum Team",
  category: "Automotive",
  other: {
    "geo.region": "PK-PB",
    "geo.placename": "Chichawatni",
    "geo.position": "30.54175, 72.71799",
    "ICBM": "30.54175, 72.71799"
  },
  icons: {
    icon: "/logo-icon.svg?v=2",
    shortcut: "/logo-icon.svg?v=2",
    apple: "/logo-icon.svg?v=2",
  },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: "https://alniaz-petroleums-services.vercel.app/",
    title: "Alniaz Petroleums | Premium Fuel Station",
    description: "Check today's fuel rates and our premium services in Chichawatni.",
    siteName: "Alniaz Petroleums",
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: "Alniaz Petroleum Station" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alniaz Petroleums | Fueling Your Journey",
    description: "Daily rates, premium services, and quality assurance.",
  },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
  verification: { google: "google-site-verification-code-here" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} font-sans bg-black text-white antialiased flex flex-col min-h-screen selection:bg-red-600 selection:text-white`}>

        {/* ✅ WRAPPED EVERYTHING CORRECTLY */}
        <Providers>

          {/* Preloader */}
          <Preloader />

          {/* Navbar */}
          <Navbar />

          {/* Main Content */}
          <div className="flex-grow w-full relative z-10">
            {children}
          </div>

          {/* Footer */}
          <Footer />

        </Providers>

      </body>
    </html>
  );
}
