import "./admin.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import HeaderAdmin from "@/components/HeaderAdmin";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DFGS Admin",
  description: "DTA32 Flash Game Site",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <HeaderAdmin />
        {children}
      </body>
    </html>
  );
}
