"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Plus, Pencil, Trash2, Tags, Package, CheckIcon, AlertCircle, X } from "lucide-react";

export function CategoryClient({ initialCategories }: { initialCategories: any[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteName, setDeleteName] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "added" | "updated" | "deleted" | "error" } | null>(null);

  useEffect(() => {
    const message = searchParams.get("message");
    if (message) {
      if (message === "added") {
        setToast({ message: "Kategori berhasil ditambahkan!", type: "added" });
      } else if (message === "updated") {
        setToast({ message: "Kategori berhasil diupdate!", type: "updated" });
      }
      
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.delete("message");
      router.replace(`/categories?${newParams.toString()}`);
      
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [searchParams, router]);

  const confirmDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/categories/${deleteId}`, { method: "DELETE" });
      if (res.ok) {
        router.refresh();
        setToast({ message: "Kategori berhasil dihapus!", type: "deleted" });
        setTimeout(() => setToast(null), 3000);
      } else {
        setToast({ message: "Gagal menghapus kategori.", type: "error" });
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

  const colors = ["#4F46E5","#0891B2","#7C3AED","#DB2777","#059669","#D97706"];

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
        <div className="px-5 py-4 flex items-center justify-between border-b border-slate-100 bg-slate-50/60">
          <div className="flex items-center gap-2">
            <Tags size={16} className="text-slate-400" />
            <h2 className="font-semibold text-slate-700">Daftar Kategori</h2>
            <span className="ml-2 px-2 py-0.5 rounded-full text-xs font-bold text-indigo-600 bg-indigo-50 border border-indigo-100">
              {initialCategories.length}
            </span>
          </div>
          <Link href="/categories/add">
            <button className="btn-primary flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all">
              <Plus size={15} />
              Tambah Kategori
            </button>
          </Link>
        </div>

        <table className="w-full text-sm">
          <thead className="bg-slate-50/80 border-b border-slate-100">
            <tr>
              {["Kategori", "Deskripsi", "Jumlah Barang", "Aksi"].map((h) => (
                <th key={h} className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {initialCategories.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-5 py-16 text-center text-slate-400">
                  <div className="flex flex-col items-center gap-2">
                    <Tags size={28} className="opacity-30" />
                    <p className="font-medium">Belum ada kategori</p>
                  </div>
                </td>
              </tr>
            ) : initialCategories.map((cat, i) => {
              const color = colors[i % colors.length];
              return (
                <tr key={cat.id} className="table-row-hover transition-colors group">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: color }}>
                        <Tags size={18} className="text-white" />
                      </div>
                      <span className="font-semibold text-slate-800">{cat.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-slate-500 text-sm max-w-xs truncate">
                    {cat.description || <span className="italic text-slate-300">—</span>}
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1.5">
                      <Package size={13} className="text-slate-400" />
                      <span className="font-semibold text-slate-700">{cat._count?.products || 0}</span>
                      <span className="text-slate-400 text-xs">barang</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1">
                      <Link href={`/categories/${cat.id}/edit`}>
                        <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-all">
                          <Pencil size={15} />
                        </button>
                      </Link>
                      <button onClick={() => { setDeleteId(cat.id); setDeleteName(cat.name); }}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Delete Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(15,23,42,0.4)", backdropFilter: "blur(4px)" }}>
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-7 border border-red-100">
            <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center mb-5">
              <Trash2 size={22} className="text-amber-500" />
            </div>
            <h2 className="text-lg font-bold text-slate-900 mb-2">Hapus Kategori?</h2>
            <p className="text-slate-500 text-sm mb-3">
              Anda akan menghapus <span className="font-semibold text-slate-800">"{deleteName}"</span>.
            </p>
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-100 mb-6">
              <p className="text-amber-700 text-xs">⚠ Barang dalam kategori ini tidak terhapus, tapi statusnya menjadi "Tidak Berkategori".</p>
            </div>
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
