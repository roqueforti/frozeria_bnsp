"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Search, Plus, Eye, Pencil, Trash2, ChevronDown, CheckIcon, AlertCircle, X } from "lucide-react";

type Product = any;
type Category = any;

export function DashboardClient({
  initialProducts,
  categories,
  initialQuery,
  initialCategory,
}: {
  initialProducts: Product[];
  categories: Category[];
  initialQuery: string;
  initialCategory: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [q, setQ] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory || "all");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteName, setDeleteName] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "added" | "updated" | "deleted" | "error" } | null>(null);

  useEffect(() => {
    const message = searchParams.get("message");
    if (message) {
      if (message === "added") {
        setToast({ message: "Data berhasil ditambahkan!", type: "added" });
      } else if (message === "updated") {
        setToast({ message: "Data berhasil diupdate!", type: "updated" });
      }
      
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.delete("message");
      router.replace(`/?${newParams.toString()}`);
      
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [searchParams, router]);

  const updateFilters = (newQ: string, newCat: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (newQ) params.set("q", newQ); else params.delete("q");
    if (newCat && newCat !== "all") params.set("category", newCat); else params.delete("category");
    router.push(`/?${params.toString()}`);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/products/${deleteId}`, { method: "DELETE" });
      if (res.ok) {
        router.refresh();
        setToast({ message: "Data berhasil dihapus!", type: "deleted" });
        setTimeout(() => setToast(null), 3000);
      } else {
        setToast({ message: "Gagal menghapus data.", type: "error" });
        setTimeout(() => setToast(null), 3000);
      }
    } catch {
      setToast({ message: "Terjadi kesalahan server.", type: "error" });
      setTimeout(() => setToast(null), 3000);
    } finally {
      setIsDeleting(false);
      setDeleteId(null);
      setDeleteName("");
    }
  };

  const StockBadge = ({ product }: { product: any }) => {
    if (product.stock === 0) return <span className="badge-empty inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold">Habis</span>;
    if (product.stock < product.minStock) return <span className="badge-low inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold">Menipis</span>;
    return <span className="badge-ok inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold">Tersedia</span>;
  };

  return (
    <>
      {toast && (
        <div className="fixed top-4 right-4 z-50 animate-fade-down">
          <div className={`px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 ${
            toast.type === "added" ? "bg-emerald-50 border border-emerald-100 text-emerald-700" :
            toast.type === "updated" ? "bg-blue-50 border border-blue-100 text-blue-700" :
            toast.type === "deleted" ? "bg-rose-50 border border-rose-100 text-rose-700" :
            "bg-red-50 border border-red-100 text-red-700"
          }`}>
            {toast.type === "added" && <CheckIcon size={18} />}
            {toast.type === "updated" && <Pencil size={18} />}
            {toast.type === "deleted" && <Trash2 size={18} />}
            {toast.type === "error" && <AlertCircle size={18} />}
            <p className="text-sm font-medium">{toast.message}</p>
            <button onClick={() => setToast(null)} className="ml-auto text-slate-400 hover:text-slate-600">
              <X size={14} />
            </button>
          </div>
        </div>
      )}
      <div className="card overflow-hidden card-hover transition-all duration-300 hover:-translate-y-0.5">
        {/* Toolbar */}
        <div className="px-5 py-4 flex flex-col sm:flex-row gap-3 items-center justify-between border-b border-slate-100 bg-slate-50/60">
          <form
            onSubmit={(e) => { e.preventDefault(); updateFilters(q, category); }}
            className="flex gap-2 w-full sm:max-w-xs"
          >
            <div className="relative flex-1">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                className="input-base w-full pl-9 pr-4 py-2 rounded-xl text-sm"
                placeholder="Cari nama barang..."
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </div>
            <button type="submit" className="px-4 py-2 rounded-xl text-sm font-medium bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all">
              Cari
            </button>
          </form>

          <div className="flex gap-2 w-full sm:w-auto">
            <div className="relative">
              <select
                className="input-base appearance-none pl-3 pr-8 py-2 rounded-xl text-sm cursor-pointer"
                value={category}
                onChange={(e) => { setCategory(e.target.value); updateFilters(q, e.target.value); }}
              >
                <option value="all">Semua Kategori</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>

            <Link href="/products/add">
              <button className="btn-primary flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all">
                <Plus size={16} />
                Tambah Barang
              </button>
            </Link>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50/80">
              <tr className="border-b border-slate-100">
                {["Nama Barang", "Kategori", "Stok", "Status", "Harga Jual", "Aksi"].map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {initialProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-16 text-center text-slate-400">
                    <div className="flex flex-col items-center gap-2">
                      <Search size={28} className="opacity-30" />
                      <p className="font-medium">Tidak ada barang ditemukan</p>
                    </div>
                  </td>
                </tr>
              ) : initialProducts.map((product) => (
                <tr key={product.id} className="table-row-hover transition-colors group">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      {product.photoUrl ? (
                        <img
                          src={product.photoUrl}
                          alt={product.name}
                          className="w-10 h-10 rounded-xl object-cover border border-slate-200 flex-shrink-0"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center text-sm font-bold text-indigo-600 bg-indigo-50 border border-indigo-100">
                          {product.name[0]}
                        </div>
                      )}
                      <span className="font-semibold text-slate-800">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    {product.category ? (
                      <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                        {product.category.name}
                      </span>
                    ) : (
                      <span className="text-slate-400 italic text-xs">—</span>
                    )}
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`font-bold ${product.stock === 0 ? "text-red-600" : product.stock < product.minStock ? "text-amber-600" : "text-slate-800"}`}>
                      {product.stock}
                    </span>
                    <span className="text-slate-400 text-xs ml-1">{product.unit}</span>
                  </td>
                  <td className="px-5 py-3.5"><StockBadge product={product} /></td>
                  <td className="px-5 py-3.5 font-mono text-sm font-semibold text-slate-700">
                    Rp {Number(product.sellPrice).toLocaleString("id-ID")}
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1">
                      <Link href={`/products/${product.id}`}>
                        <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all">
                          <Eye size={15} />
                        </button>
                      </Link>
                      <Link href={`/products/${product.id}/edit`}>
                        <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-all">
                          <Pencil size={15} />
                        </button>
                      </Link>
                      <button
                        onClick={() => { setDeleteId(product.id); setDeleteName(product.name); }}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-5 py-3 border-t border-slate-100 bg-slate-50/40">
          <p className="text-xs text-slate-400">{initialProducts.length} barang ditampilkan</p>
        </div>
      </div>

      {/* Delete Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(15,23,42,0.5)", backdropFilter: "blur(4px)" }}>
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-7" style={{ border: "1px solid #FEE2E2" }}>
            <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center mb-5">
              <Trash2 size={22} className="text-red-500" />
            </div>
            <h2 className="text-lg font-bold text-slate-900 mb-2">Konfirmasi Hapus</h2>
            <p className="text-slate-500 text-sm mb-6">
              Hapus <span className="font-semibold text-slate-800">"{deleteName}"</span> secara permanen dari sistem?
            </p>
            <div className="flex gap-3">
              <button onClick={() => { setDeleteId(null); setDeleteName(""); }}
                className="flex-1 py-2.5 rounded-xl text-sm font-medium border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all">
                Batal
              </button>
              <button onClick={confirmDelete} disabled={isDeleting}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition-all"
                style={{ background: "linear-gradient(135deg, #EF4444, #DC2626)", boxShadow: "0 2px 8px rgba(239,68,68,0.3)" }}>
                {isDeleting ? "Menghapus..." : "Ya, Hapus"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
