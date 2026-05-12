"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";

export default function CategoryForm({ initialData }: { initialData?: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    description: initialData?.description || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = initialData ? `/api/categories/${initialData.id}` : "/api/categories";
      const method = initialData ? "PUT" : "POST";
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData) });
      if (res.ok) { router.push("/categories?message=" + (initialData ? "updated" : "added")); router.refresh(); }
      else alert("Terjadi kesalahan saat menyimpan data.");
    } catch { alert("Terjadi kesalahan server."); }
    finally { setLoading(false); }
  };

  const inputClass = "input-base w-full px-4 py-3 rounded-xl text-sm";
  const labelClass = "block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2";

  return (
    <div className="p-8 w-full animate-fade-up">
      <div className="mb-7 flex items-center gap-4">
        <Link href="/categories">
          <button className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-all shadow-sm">
            <ArrowLeft size={18} className="text-slate-500" />
          </button>
        </Link>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-indigo-500 mb-0.5">Kategori</p>
          <h1 className="text-2xl font-bold text-slate-900">{initialData ? "Edit Kategori" : "Tambah Kategori"}</h1>
        </div>
      </div>

      <div className="card p-8 card-hover transition-all duration-300 hover:-translate-y-0.5">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className={labelClass}>Nama Kategori <span className="text-red-500">*</span></label>
            <input className={inputClass} name="name" value={formData.name} onChange={handleChange} required placeholder="Ayam, Sapi, Seafood..." />
          </div>
          <div>
            <label className={labelClass}>Deskripsi <span className="text-slate-400 normal-case tracking-normal font-normal">(Opsional)</span></label>
            <textarea className={`${inputClass} min-h-[120px] resize-none`} name="description" value={formData.description} onChange={handleChange}
              placeholder="Penjelasan mengenai kategori ini..." />
          </div>
          <div className="flex gap-3 pt-2">
            <Link href="/categories">
              <button type="button" className="px-5 py-2.5 rounded-xl text-sm font-medium border border-slate-200 text-slate-600 bg-white hover:bg-slate-50 transition-all">
                Batal
              </button>
            </Link>
            <button type="submit" disabled={loading}
              className="btn-primary flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all">
              <Save size={16} />
              {loading ? "Menyimpan..." : "Simpan Kategori"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
