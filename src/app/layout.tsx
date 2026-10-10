import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { Suspense } from "react";
import TodayMarket from "./components/TodayMarket";
import Marquee from "./components/Marquee";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSerifBengali = Noto_Serif_Bengali({
  subsets: ["latin", "bengali"],
});

export const metadata: Metadata = {
  title: "Bazar Express",
  description: "আজকের বাজারের দাম এক নজরে",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      data-theme="light"
      lang="bn"
      className={`${geistSans.variable} ${geistMono.variable} ${notoSerifBengali.className} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Suspense fallback={null}>
          <Navbar />
        </Suspense>

        <Marquee />

        <main className="flex-1">{children}</main>

       <Footer></Footer>
      </body>
    </html>
  );
}
