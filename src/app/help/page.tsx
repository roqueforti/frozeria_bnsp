import { Metadata } from "next";
import { BookOpen, Package, Settings, Tags, Terminal, User, Phone, Mail, MapPin, GraduationCap } from "lucide-react";

export const metadata: Metadata = { title: "Bantuan — Frozeria" };

export default function HelpPage() {
  const guides = [
    {
      icon: Package,
      iconBg: "#EEF2FF",
      iconColor: "#4F46E5",
      accentColor: "#4F46E5",
      title: "1. Menambah Barang Baru",
      steps: [
        "Buka halaman Dashboard melalui menu navigasi kiri.",
        'Klik tombol "+ Tambah Barang" di pojok kanan atas tabel.',
        "Isi semua kolom — Nama, Kategori, Stok, dan Harga wajib diisi.",
        "Upload foto barang dengan klik area foto atau drag-and-drop.",
        'Klik "Simpan Data" untuk menyimpan ke database.',
      ],
    },
    {
      icon: Settings,
      iconBg: "#ECFDF5",
      iconColor: "#059669",
      accentColor: "#059669",
      title: "2. Update Stok Barang",
      steps: [
        "Pada Dashboard, cari barang yang ingin diupdate.",
        "Klik ikon pensil (Edit) pada baris barang tersebut.",
        'Ubah nilai pada kolom "Jumlah Stok" sesuai kondisi terkini.',
        'Klik "Simpan Data" untuk menyimpan perubahan.',
      ],
    },
    {
      icon: Tags,
      iconBg: "#F5F3FF",
      iconColor: "#7C3AED",
      accentColor: "#7C3AED",
      title: "3. Mengelola Kategori",
      steps: [
        'Buka menu "Kategori" di sidebar kiri.',
        'Klik "+ Tambah Kategori" untuk membuat pengelompokkan baru.',
        "Isi nama dan deskripsi opsional, lalu simpan.",
        'Catatan: Menghapus kategori tidak menghapus barang — barang menjadi "Tidak Berkategori".',
      ],
    },
  ];

  const devInfo = [
    { icon: User, label: "Nama Lengkap", value: "Hilman Zahrawa Budiarto" },
    { icon: GraduationCap, label: "NIM", value: "2241760051" },
    { icon: GraduationCap, label: "Kelas", value: "SIB 4C" },
    { icon: Phone, label: "No. Telepon", value: "085806003234" },
    { icon: Mail, label: "Email", value: "budiarto3788@gmail.com" },
    { icon: MapPin, label: "Alamat", value: "Jl. Candi Bajang Ratu No. 12 A" },
  ];

  return (
    <div className="p-8 w-full animate-fade-up">
      <div className="mb-7">
        <p className="text-xs font-bold uppercase tracking-widest text-indigo-500 mb-1">Pusat Bantuan</p>
        <h1 className="text-2xl font-bold text-slate-900">Panduan Penggunaan</h1>
        <p className="text-slate-500 mt-1 text-sm">Pelajari cara menggunakan sistem Frozeria secara efektif.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Guides */}
        <div className="lg:col-span-3 space-y-4">
          {guides.map(({ icon: Icon, iconBg, iconColor, accentColor, title, steps }) => (
            <div
              key={title}
              className="card p-6 card-hover transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group"
            >
              {/* Decorative background glow */}
              <div
                className="absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-300"
                style={{ background: accentColor, filter: 'blur(20px)' }}
              />

              <div className="flex items-center gap-4 mb-5">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-sm"
                  style={{ background: iconBg, border: `1px solid ${accentColor}20` }}
                >
                  <Icon size={20} style={{ color: iconColor }} />
                </div>
                <h2 className="text-lg font-bold text-slate-800">{title}</h2>
              </div>

              <ol className="space-y-3">
                {steps.map((step, j) => (
                  <li key={j} className="flex gap-3 text-sm text-slate-600 items-start">
                    <span className="flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold bg-slate-100 text-slate-500 mt-0.5 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                      {j + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          ))}

          {/* Tips */}
          <div className="card p-6 card-hover transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group">
            {/* Glow */}
            <div
              className="absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-300"
              style={{ background: "#F59E0B", filter: 'blur(20px)' }}
            />

            <div className="flex items-center gap-4 mb-5">
              <div className="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center border border-amber-100 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-sm">
                <Terminal size={20} className="text-amber-600" />
              </div>
              <h2 className="text-lg font-bold text-slate-800">Tips & Informasi</h2>
            </div>

            <div className="space-y-3">
              {[
                ["Enter di search", "Langsung mencari barang tanpa klik tombol Cari"],
                ["Dropdown Kategori", "Filter cepat berdasarkan kategori produk"],
                ["Badge Menipis/Habis", "Muncul otomatis jika stok di bawah stok minimum"],
              ].map(([key, val]) => (
                <div key={key} className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-sm transition-all">
                  <span className="text-sm text-slate-600 font-medium">{val}</span>
                  <kbd className="px-2.5 py-1 rounded-lg text-xs font-mono text-slate-600 bg-white border border-slate-200 shadow-sm">{key}</kbd>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Developer Card */}
        <div className="lg:col-span-2">
          <div className="card overflow-hidden sticky top-8 card-hover transition-all duration-300 hover:-translate-y-1">
            {/* Card Header */}
            <div className="p-6 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #4F46E5, #7C3AED)" }}>
              <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white opacity-5" />
              <div className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full bg-white opacity-5" />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mb-4 border border-white/30">
                  <User size={26} className="text-white" />
                </div>
                <p className="text-indigo-200 text-xs font-bold uppercase tracking-widest mb-1">Developer</p>
                <h2 className="text-xl font-bold text-white">Informasi Pengembang</h2>
              </div>
            </div>

            {/* Info List */}
            <div className="p-6 space-y-4 bg-white">
              {devInfo.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon size={14} className="text-indigo-500" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{label}</p>
                    <p className="text-sm font-semibold text-slate-800 mt-0.5">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-indigo-50 border-t border-indigo-100">
              <p className="text-xs text-indigo-400 text-center leading-relaxed">
                Asesmen Sertikom BNSP DIPA 2026<br />
                Politeknik Negeri Malang — Teknologi Informasi
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
