import { Metadata } from "next";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Pencil, Package, MapPin, Box, Scale, Tag, Calendar, DollarSign, TrendingUp } from "lucide-react";

export const metadata: Metadata = { title: "Detail Barang — Frozeria" };
export const dynamic = "force-dynamic";

export default async function ProductDetailPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const product = await prisma.product.findUnique({ where: { id }, include: { category: true } });
  if (!product) notFound();

  const stockStatus =
    product.stock === 0
      ? { label: "Stok Habis", bg: "#FEE2E2", color: "#B91C1C", border: "#FECACA" }
      : product.stock < product.minStock
      ? { label: "Stok Menipis", bg: "#FEF3C7", color: "#B45309", border: "#FDE68A" }
      : { label: "Tersedia", bg: "#DCFCE7", color: "#15803D", border: "#BBF7D0" };

  const margin =
    product.buyPrice > 0
      ? (((Number(product.sellPrice) - Number(product.buyPrice)) / Number(product.buyPrice)) * 100).toFixed(1)
      : "0";

  return (
    <div className="p-8 max-w-5xl mx-auto animate-fade-up">
      {/* Header */}
      <div className="mb-7 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/">
            <button className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-all shadow-sm">
              <ArrowLeft size={18} className="text-slate-500" />
            </button>
          </Link>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-indigo-500 mb-0.5">Detail Produk</p>
            <h1 className="text-2xl font-bold text-slate-900">{product.name}</h1>
          </div>
        </div>
        <Link href={`/products/${product.id}/edit`}>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all"
            style={{ background: "linear-gradient(135deg, #10B981, #059669)", boxShadow: "0 2px 8px rgba(16,185,129,0.3)" }}>
            <Pencil size={15} />
            Edit Barang
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Photo */}
        <div className="space-y-4">
          <div className="card overflow-hidden card-hover transition-all duration-300 hover:-translate-y-1">
            {product.photoUrl ? (
              <img src={product.photoUrl} alt={product.name} className="w-full aspect-square object-cover" />
            ) : (
              <div className="aspect-square flex flex-col items-center justify-center bg-slate-50">
                <Package size={52} className="text-slate-300 mb-3" />
                <p className="text-slate-400 text-sm">Tidak ada foto</p>
              </div>
            )}
          </div>

          {/* Status */}
          <div className="card p-4 text-center card-hover transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group">
            {/* Decorative background glow */}
            <div 
              className="absolute -right-4 -top-4 w-16 h-16 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-300"
              style={{ background: stockStatus.color, filter: 'blur(15px)' }}
            />
            <div className="relative z-10">
              <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: stockStatus.color }}>Status</p>
              <p className="text-lg font-bold" style={{ color: stockStatus.color }}>{stockStatus.label}</p>
            </div>
          </div>

          {/* Category */}
          <div className="card p-4 card-hover transition-all duration-300 hover:-translate-y-1">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
              <Tag size={11} /> Kategori
            </p>
            <p className="font-semibold text-slate-800">
              {product.category?.name || <span className="text-slate-400 italic">Tidak Berkategori</span>}
            </p>
          </div>
        </div>

        {/* Info */}
        <div className="lg:col-span-2 space-y-4">
          {/* Stock Cards */}
          <div className="grid grid-cols-3 gap-4">
            <div className="card p-4 card-hover transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 w-16 h-16 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-300" style={{ background: "#4F46E5", filter: 'blur(15px)' }} />
              <div className="relative z-10">
                <div className="flex items-center gap-1.5 mb-1">
                  <Box size={12} className="text-slate-400" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Stok</span>
                </div>
                <p className="text-2xl font-bold text-indigo-600">{product.stock}</p>
                <p className="text-xs text-slate-400">{product.unit}</p>
              </div>
            </div>
            <div className="card p-4 card-hover transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 w-16 h-16 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-300" style={{ background: "#64748B", filter: 'blur(15px)' }} />
              <div className="relative z-10">
                <div className="flex items-center gap-1.5 mb-1">
                  <Scale size={12} className="text-slate-400" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Min. Stok</span>
                </div>
                <p className="text-2xl font-bold text-slate-700">{product.minStock}</p>
                <p className="text-xs text-slate-400">{product.unit}</p>
              </div>
            </div>
            <div className="card p-4 card-hover transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 w-16 h-16 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-300" style={{ background: "#10B981", filter: 'blur(15px)' }} />
              <div className="relative z-10">
                <div className="flex items-center gap-1.5 mb-1">
                  <TrendingUp size={12} className="text-slate-400" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Margin</span>
                </div>
                <p className="text-2xl font-bold text-emerald-600">{margin}%</p>
                <p className="text-xs text-slate-400">Keuntungan</p>
              </div>
            </div>
          </div>

          {/* Prices */}
          <div className="card p-6 card-hover transition-all duration-300 hover:-translate-y-1">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 pb-3 border-b border-slate-100 flex items-center gap-1.5">
              <DollarSign size={12} /> Informasi Harga
            </h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-xs text-slate-400 mb-1">Harga Jual</p>
                <p className="text-xl font-bold text-indigo-600">Rp {Number(product.sellPrice).toLocaleString("id-ID")}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 mb-1">Harga Beli</p>
                <p className="text-xl font-bold text-slate-700">Rp {Number(product.buyPrice).toLocaleString("id-ID")}</p>
              </div>
            </div>
          </div>

          {/* Specs */}
          <div className="card p-6 card-hover transition-all duration-300 hover:-translate-y-1">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 pb-3 border-b border-slate-100">
              Spesifikasi
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 rounded-xl bg-slate-50">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1"><Scale size={10} /> Berat / Ukuran</p>
                <p className="text-sm font-semibold text-slate-800">{product.weightSize || "—"}</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1"><MapPin size={10} /> Lokasi Simpan</p>
                <p className="text-sm font-semibold text-slate-800">{product.storageLocation || "—"}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="card p-6 card-hover transition-all duration-300 hover:-translate-y-1">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 pb-3 border-b border-slate-100">Deskripsi</h2>
            <p className="text-slate-600 text-sm leading-relaxed">{product.description || "Tidak ada deskripsi."}</p>
          </div>

          {/* Meta */}
          <div className="flex items-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1.5"><Calendar size={11} />
              {new Date(product.createdAt).toLocaleDateString("id-ID", { year: "numeric", month: "long", day: "numeric" })}
            </span>
            <span>•</span>
            <span className="font-mono text-[10px]">{product.id}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
