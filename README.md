# Frozeria - Sistem Manajemen Stok Opname

Dokumentasi lengkap mengenai aplikasi Frozeria, yang dibangun untuk memenuhi tugas ujian praktek sertifikasi BNSP 2026.

## 🚀 Teknologi yang Digunakan

Aplikasi ini dibangun menggunakan teknologi modern berbasis full-stack JavaScript/TypeScript:

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router) - Framework React untuk produksi.
- **Bahasa Pemrograman**: [TypeScript](https://www.typescriptlang.org/) - Memberikan keamanan tipe data.
- **Database**: [PostgreSQL](https://www.postgresql.org/) - Database relasional untuk menyimpan data produk dan kategori.
- **ORM**: [Prisma](https://www.prisma.io/) - Memudahkan interaksi dengan database menggunakan TypeScript.
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) - Framework CSS berbasis utilitas untuk desain kustom yang cepat.
- **Icons**: [Lucide React](https://lucide.dev/) - Set icon yang bersih dan konsisten.

## ✨ Fitur Utama

Aplikasi ini memiliki fitur lengkap sesuai dengan permintaan soal ujian:

1. **Dashboard**: Menampilkan ringkasan statistik (Total Barang, Stok Rendah, Total Kategori) dan tabel daftar barang.
2. **Pencarian & Filter**: Cari barang berdasarkan nama (tekan Enter atau klik 'Cari') dan filter berdasarkan kategori.
3. **Manajemen Produk (CRUD)**:
   * Tambah barang baru dengan upload foto.
   * Edit informasi barang dan update stok.
   * Lihat detail barang lengkap dengan foto.
   * Hapus barang dengan modal konfirmasi.
4. **Manajemen Kategori**: Tambah, edit, dan hapus kategori produk.
5. **Halaman Bantuan**: Panduan penggunaan sistem bagi staf dan informasi pengembang.

## 🎨 Desain Sistem

Aplikasi ini menggunakan tema **"Ice Fresh"** dengan dominasi warna putih, abu-abu lembut, dan aksen Indigo/Biru. Desainnya dibuat premium dengan sentuhan:
- **Glow Effects**: Pendaran warna lembut di pojok card untuk indikator visual.
- **Micro-animations**: Efek melayang (`hover:-translate-y-1`) dan transisi halus pada tombol dan card.
- **Responsive Layout**: Tampilan yang rapi di berbagai ukuran layar.

## 🛠️ Cara Menjalankan Project

Ikuti langkah-langkah berikut untuk menjalankan project ini di komputer lokal Anda:

### 1. Prasyarat
- Node.js versi 18 atau lebih baru.
- Database PostgreSQL yang sedang berjalan.

### 2. Instalasi
Clone repository ini atau ekstrak folder project, lalu jalankan:
```bash
npm install
```

### 3. Konfigurasi Environment
Buat file `.env` di root project (jika belum ada) dan sesuaikan URL koneksi database Anda:
```env
DATABASE_URL="postgresql://postgres:password123@localhost:5432/frozeria_db?schema=public"
```

### 4. Sinkronisasi Database
Jalankan perintah berikut untuk membuat tabel di database Anda berdasarkan skema Prisma:
```bash
npx prisma db push
```

### 5. Jalankan Server Development
Jalankan perintah berikut untuk memulai server lokal:
```bash
npm run dev
```
Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

---
*Dibuat untuk Asesmen Sertikom BNSP DIPA 2026 - Politeknik Negeri Malang*
