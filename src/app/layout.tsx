import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Elite Estates | Discover Your Next Extraordinary Home",
  description: "Curated luxury properties with immersive 3D virtual tours, AI-powered natural language search, and direct agent concierge connectivity. Experience real estate reimagined.",
  keywords: ["luxury real estate", "virtual tours", "3d staging", "mansions", "penthouses", "aspen chalet", "malibu home"],
};

import { GlobalProvider } from "@/context/GlobalContext";
import AppContent from "@/components/AppContent";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} h-full antialiased`}
      style={{ scrollBehavior: 'smooth' }}
    >
      <body className="min-h-full flex flex-col bg-zinc-50 dark:bg-black text-black dark:text-zinc-50 transition-colors duration-300">
        <GlobalProvider>
          <AppContent>{children}</AppContent>
        </GlobalProvider>
      </body>
    </html>
  );
}
