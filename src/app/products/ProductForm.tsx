"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, ImagePlus } from "lucide-react";

export default function ProductForm({
  categories,
  initialData,
}: {
  categories: any[];
  initialData?: any;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(initialData?.photoUrl || "");
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    categoryId: initialData?.categoryId || "",
    stock: initialData?.stock || 0,
    minStock: initialData?.minStock || 20,
    unit: initialData?.unit || "pcs",
    sellPrice: initialData?.sellPrice || 0,
    buyPrice: initialData?.buyPrice || 0,
    weightSize: initialData?.weightSize || "",
    storageLocation: initialData?.storageLocation || "",
    description: initialData?.description || "",
    photoUrl: initialData?.photoUrl || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdjust = (name: "stock" | "minStock", amount: number) => {
    setFormData((prev) => ({
      ...prev,
      [name]: Math.max(0, (Number(prev[name]) || 0) + amount),
    }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
        setFormData((prev) => ({ ...prev, photoUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = initialData ? `/api/products/${initialData.id}` : "/api/products";
      const method = initialData ? "PUT" : "POST";
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData) });
      if (res.ok) { router.push("/?message=" + (initialData ? "updated" : "added")); router.refresh(); }
      else alert("Terjadi kesalahan saat menyimpan data.");
    } catch { alert("Terjadi kesalahan server."); }
    finally { setLoading(false); }
  };

  const inputClass = "input-base w-full px-4 py-2.5 rounded-xl text-sm";
  const labelClass = "block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2";

  return (
    <div className="p-8 w-full animate-fade-up">
      {/* Header */}
      <div className="mb-7 flex items-center gap-4">
        <Link href="/">
          <button className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-all shadow-sm">
            <ArrowLeft size={18} className="text-slate-500" />
          </button>
        </Link>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-indigo-500 mb-0.5">
            {initialData ? "Edit" : "Tambah"}
          </p>
          <h1 className="text-2xl font-bold text-slate-900">
            {initialData ? "Edit Barang" : "Tambah Barang Baru"}
          </h1>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* Photo Column */}
          <div>
            <div className="card p-5 sticky top-8 card-hover transition-all duration-300 hover:-translate-y-0.5">
              <p className={labelClass}>Foto Barang</p>
              <div
                className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group border-2 border-dashed border-slate-200 hover:border-indigo-400 transition-colors bg-slate-50"
              >
                {photoPreview ? (
                  <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400">
                    <ImagePlus size={36} className="mb-3 opacity-40" />
                    <p className="text-sm font-medium">Klik untuk upload</p>
                    <p className="text-xs mt-1 opacity-60">PNG, JPG, WEBP</p>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <p className="text-white text-sm font-semibold">Ganti Foto</p>
                </div>
                <input type="file" accept="image/*" onChange={handlePhotoUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
              </div>
              <div className="mt-4 p-3 rounded-xl bg-indigo-50 border border-indigo-100">
                <p className="text-xs text-indigo-600">Tips: Gunakan foto rasio 1:1 untuk tampilan terbaik.</p>
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div className="lg:col-span-2 space-y-5">

            <div className="card p-6 card-hover transition-all duration-300 hover:-translate-y-0.5">
              <h2 className="text-sm font-bold text-slate-700 mb-4 pb-3 border-b border-slate-100">Informasi Dasar</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className={labelClass}>Nama Barang <span className="text-red-500">*</span></label>
                  <input className={inputClass} name="name" value={formData.name} onChange={handleChange} required placeholder="Contoh: Ayam Nugget Crispy" />
                </div>
                <div>
                  <label className={labelClass}>Kategori</label>
                  <select className={inputClass} name="categoryId" value={formData.categoryId} onChange={handleChange}>
                    <option value="">Pilih Kategori</option>
                    {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Satuan</label>
                  <input className={inputClass} name="unit" value={formData.unit} onChange={handleChange} placeholder="pcs, pack, kg..." />
                </div>
              </div>
            </div>

            <div className="card p-6 card-hover transition-all duration-300 hover:-translate-y-0.5">
              <h2 className="text-sm font-bold text-slate-700 mb-4 pb-3 border-b border-slate-100">Stok & Harga</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Jumlah Stok <span className="text-red-500">*</span></label>
                  <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100">
                    <button type="button" onClick={() => handleAdjust("stock", -1)} className="px-4 py-2.5 bg-slate-50 hover:bg-slate-100 transition-colors text-slate-600 font-medium border-r border-slate-200">-</button>
                    <input type="number" value={formData.stock} onChange={handleChange} name="stock" className="w-full text-center py-2.5 bg-white focus:outline-none text-sm font-semibold" required min="0" />
                    <button type="button" onClick={() => handleAdjust("stock", 1)} className="px-4 py-2.5 bg-slate-50 hover:bg-slate-100 transition-colors text-slate-600 font-medium border-l border-slate-200">+</button>
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Stok Minimum</label>
                  <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100">
                    <button type="button" onClick={() => handleAdjust("minStock", -1)} className="px-4 py-2.5 bg-slate-50 hover:bg-slate-100 transition-colors text-slate-600 font-medium border-r border-slate-200">-</button>
                    <input type="number" value={formData.minStock} onChange={handleChange} name="minStock" className="w-full text-center py-2.5 bg-white focus:outline-none text-sm font-semibold" min="0" />
                    <button type="button" onClick={() => handleAdjust("minStock", 1)} className="px-4 py-2.5 bg-slate-50 hover:bg-slate-100 transition-colors text-slate-600 font-medium border-l border-slate-200">+</button>
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Harga Beli (Rp)</label>
                  <input className={inputClass} type="number" name="buyPrice" value={formData.buyPrice} onChange={handleChange} min="0" />
                </div>
                <div>
                  <label className={labelClass}>Harga Jual (Rp)</label>
                  <input className={inputClass} type="number" name="sellPrice" value={formData.sellPrice} onChange={handleChange} min="0" />
                </div>
              </div>
            </div>

            <div className="card p-6 card-hover transition-all duration-300 hover:-translate-y-0.5">
              <h2 className="text-sm font-bold text-slate-700 mb-4 pb-3 border-b border-slate-100">Detail Tambahan</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Berat / Ukuran</label>
                  <input className={inputClass} name="weightSize" value={formData.weightSize} onChange={handleChange} placeholder="500 gram" />
                </div>
                <div>
                  <label className={labelClass}>Lokasi Simpan</label>
                  <input className={inputClass} name="storageLocation" value={formData.storageLocation} onChange={handleChange} placeholder="Rak A-3" />
                </div>
                <div className="col-span-2">
                  <label className={labelClass}>Deskripsi</label>
                  <textarea className={`${inputClass} min-h-[100px] resize-none`} name="description" value={formData.description} onChange={handleChange} placeholder="Tambahkan keterangan..." />
                </div>
              </div>
            </div>

            <div className="flex gap-3 justify-end">
              <Link href="/">
                <button type="button" className="px-5 py-2.5 rounded-xl text-sm font-medium border border-slate-200 text-slate-600 bg-white hover:bg-slate-50 transition-all">
                  Batal
                </button>
              </Link>
              <button type="submit" disabled={loading}
                className="btn-primary flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all">
                <Save size={16} />
                {loading ? "Menyimpan..." : "Simpan Data"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
