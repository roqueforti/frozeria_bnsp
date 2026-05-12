import { Metadata } from "next";
import prisma from "@/lib/prisma";
import { DashboardClient } from "./DashboardClient";
import { Package, AlertTriangle, XCircle, TrendingUp } from "lucide-react";

export const metadata: Metadata = { title: "Dashboard — Frozeria" };
export const dynamic = "force-dynamic";

export default async function DashboardPage(props: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const q = typeof searchParams?.q === "string" ? searchParams.q : "";
  const category = typeof searchParams?.category === "string" ? searchParams.category : "";

  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });

  const productsRaw = await prisma.product.findMany({
    where: {
      name: { contains: q, mode: "insensitive" },
      ...(category ? { categoryId: category } : {}),
    },
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  const products = productsRaw.map((p) => ({
    ...p,
    sellPrice: p.sellPrice.toNumber(),
    buyPrice: p.buyPrice.toNumber(),
  }));

  const all = await prisma.product.findMany({ select: { stock: true, minStock: true } });
  const totalItems = all.length;
  const lowStock = all.filter((p) => p.stock > 0 && p.stock < 20).length;
  const outOfStock = all.filter((p) => p.stock === 0).length;
  const totalStock = all.reduce((s, p) => s + p.stock, 0);

  const stats = [
    {
      label: "Total Jenis Barang",
      value: totalItems,
      icon: Package,
      color: "#4F46E5",
      lightColor: "#EEF2FF",
      borderColor: "#C7D2FE",
    },
    {
      label: "Total Stok",
      value: totalStock.toLocaleString("id-ID"),
      icon: TrendingUp,
      color: "#0891B2",
      lightColor: "#ECFEFF",
      borderColor: "#A5F3FC",
    },
    {
      label: "Stok Menipis (< 20)",
      value: lowStock + outOfStock,
      icon: AlertTriangle,
      color: "#D97706",
      lightColor: "#FFFBEB",
      borderColor: "#FDE68A",
    },
    {
      label: "Stok Habis (= 0)",
      value: outOfStock,
      icon: XCircle,
      color: "#DC2626",
      lightColor: "#FFF1F2",
      borderColor: "#FECACA",
    },
  ];

  return (
    <div className="p-8 animate-fade-up">
      {/* Header */}
      <div className="mb-7">
        <p className="text-xs font-bold uppercase tracking-widest text-indigo-500 mb-1">Selamat datang</p>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard Stok Frozeria</h1>
        <p className="text-slate-500 mt-1 text-sm">Pantau ketersediaan barang dan pergerakan stok secara real-time.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {stats.map(({ label, value, icon: Icon, color, lightColor, borderColor }) => (
          <div
            key={label}
            className="card p-6 card-hover transition-all duration-300 hover:-translate-y-1.5 relative overflow-hidden group cursor-pointer"
          >
            {/* Decorative background glow */}
            <div 
              className="absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-300"
              style={{ background: color, filter: 'blur(20px)' }}
            />
            
            <div className="flex flex-col h-full justify-between">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-sm"
                style={{ background: lightColor, border: `1px solid ${borderColor}` }}
              >
                <Icon size={22} style={{ color }} />
              </div>
              
              <div>
                <p className="text-3xl font-bold text-slate-900 mb-0.5 font-outfit">{value}</p>
                <p className="text-xs font-semibold text-slate-500 tracking-wide">{label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Table Card */}
      <DashboardClient
        initialProducts={products}
        categories={categories}
        initialQuery={q}
        initialCategory={category}
      />
    </div>
  );
}
