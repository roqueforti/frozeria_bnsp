import { Metadata } from "next";
import prisma from "@/lib/prisma";
import { CategoryClient } from "./CategoryClient";
import { Tags } from "lucide-react";

export const metadata: Metadata = { title: "Kategori — Frozeria" };
export const dynamic = "force-dynamic";

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    include: { _count: { select: { products: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-8 min-h-screen">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <Tags size={14} className="text-indigo-500" />
          <span className="text-xs font-semibold uppercase tracking-widest text-indigo-600">Manajemen</span>
        </div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Kategori Produk</h1>
        <p className="text-slate-600 mt-1.5 text-sm">Kelola pengelompokkan barang untuk filter yang lebih mudah.</p>
      </div>
      <CategoryClient initialCategories={categories} />
    </div>
  );
}
