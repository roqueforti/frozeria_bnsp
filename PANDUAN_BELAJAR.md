# Panduan Belajar & Persiapan Asesmen BNSP 2026

Dokumen ini disusun untuk membantu Anda mempersiapkan diri menghadapi sesi observasi langsung dengan Asesor pada ujian sertifikasi BNSP Skema Pemrograman Software Komputer, berdasarkan kriteria yang ada di soal.

## 📋 1. Pemahaman Skenario (Frozeria)
Asesor akan menilai apakah Anda paham konteks aplikasi yang Anda buat.
- **Apa itu Frozeria?** Toko makanan beku (frozen food) yang membutuhkan sistem pencatatan stok (stok opname).
- **Mengapa aplikasi ini penting?** Untuk memantau barang yang menipis atau habis agar toko tidak kehabisan stok, serta mengelola harga beli dan jual.

## 🔍 2. Checklist Kesesuaian Soal & Cara Demo
Saat demo, tunjukkan fitur-fitur ini kepada asesor. Berikut adalah poin-poin yang diminta di soal dan cara mendemokannya:

### A. Halaman & Tampilan (Wajib Ditunjukkan)
1. **Dashboard (Daftar Barang)**
   * **Cara Demo**: Tunjukkan halaman utama. Jelaskan bahwa ada card ringkasan di atas (Stok Menipis, Total Produk, dll) dan tabel barang di bawah.
2. **Detail Barang**
   * **Cara Demo**: Klik nama barang atau tombol lihat detail untuk melihat rincian barang beserta fotonya.
3. **Konfirmasi Hapus (Modal)**
   * **Cara Demo**: Klik tombol 'Hapus' pada salah satu barang di tabel. Tunjukkan bahwa muncul pop-up (modal) konfirmasi, bukan langsung terhapus.
4. **Tambah/Edit Barang**
   * **Cara Demo**: Klik "+ Tambah Barang" atau ikon pensil (Edit). Tunjukkan form isian dan fitur preview upload foto.
5. **Kategori**
   * **Cara Demo**: Buka menu Kategori di sidebar. Tunjukkan daftar kategori yang tersedia.
6. **Tambah/Edit Kategori**
   * **Cara Demo**: Klik "+ Tambah Kategori" atau edit kategori yang ada untuk menunjukkan formnya.
7. **Bantuan**
   * **Cara Demo**: Buka menu Bantuan. Tunjukkan panduan penggunaan dan **Informasi Pengembang** yang berisi nama dan data diri Anda.

### B. Ketentuan Fitur (Instruksi Kerja)
- **Pencarian**: Ketik nama barang di search bar, tekan Enter atau klik tombol 'Cari'. Tunjukkan bahwa tabel menyaring data sesuai kata kunci.
- **Filter Kategori**: Pilih salah satu kategori di dropdown. Tunjukkan bahwa tabel hanya menampilkan barang dengan kategori tersebut.

## 💡 3. Potensi Pertanyaan Asesor & Cara Menjawab
Berikut adalah beberapa pertanyaan teknis yang sering ditanyakan asesor dan cara menjawabnya berdasarkan project ini:

**Q: Mengapa memilih menggunakan Next.js?**
> *A: Saya menggunakan Next.js karena merupakan framework modern berbasis React yang mendukung Server-Side Rendering (SSR). Ini membuat aplikasi lebih cepat, interaktif, dan terstruktur dengan baik.*

**Q: Bagaimana cara kerja fitur pencarian di aplikasi ini?**
> *A: Pencarian dilakukan di sisi server. Ketika pengguna menekan Enter atau tombol Cari, query dikirim ke URL sebagai parameter. Next.js membaca parameter tersebut dan meminta Prisma untuk mengambil data dari database yang namanya mengandung kata kunci tersebut (menggunakan opsi `contains` dan `insensitive`).*

**Q: Bagaimana Anda menghubungkan aplikasi dengan database?**
> *A: Saya menggunakan Prisma ORM. Konfigurasi koneksi database disimpan di file `.env`. Prisma memudahkan query ke database tanpa harus menulis SQL manual dan memastikan tipe data yang aman.*

**Q: Bagaimana cara Anda menangani upload foto?**
> *A: Pada form produk, saya menggunakan fitur FileReader di JavaScript untuk membaca file gambar yang diupload pengguna dan mengubahnya menjadi format Base64 untuk disimpan dan ditampilkan sebagai preview.*

**Q: Di mana Anda menulis logika untuk modal konfirmasi hapus?**
> *A: Logikanya ada di komponen `DashboardClient.tsx`. Saya menggunakan state React untuk melacak apakah modal harus tampil atau tidak, serta menyimpan ID barang yang akan dihapus.*

## 🚀 4. Tips Sukses Saat Ujian Asesmen
- **Tenang dan Percaya Diri**: Aplikasi Anda sudah memiliki UI yang sangat bagus (premium) melebihi standar aplikasi ujian pada umumnya. Ini nilai plus yang besar!
- **Fokus pada Soal**: Jika asesor meminta menunjukkan fitur tertentu (misal: pencarian), langsung demonstrasikan tanpa ragu.
- **Gunakan Istilah yang Tepat**: Sebutkan istilah seperti *Component*, *State*, *ORM*, *Database Relasional*, *Client Component*, dan *Server Component*.

---
*Semoga sukses dalam asesmen sertifikasi BNSP!*
