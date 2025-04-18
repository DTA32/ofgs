import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s - DFGS",
    default: "DFGS",
  },
  description: "DTA32 Flash Game Site",
};

export default function RootLayout({children}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
    <body
      className={`${inter.className} bg-cream-light min-h-screen flex flex-col`}
    >
    <Navbar/>
    {children}
    <Footer />
    </body>
    </html>
  );
}
