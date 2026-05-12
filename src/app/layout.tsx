import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "Frozeria — Sistem Stok Opname",
  description: "Sistem Manajemen Stok Makanan Beku",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body className={`${outfit.variable} font-outfit bg-[#F4F7FF] text-slate-900 min-h-screen flex antialiased`}>
        <Sidebar />
        <main className="flex-1 ml-[260px] min-h-screen flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
