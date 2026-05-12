# Dokumentasi Teknis & Arsitektur Aplikasi Frozeria

Dokumen ini menjelaskan secara mendalam tentang teknologi, struktur folder, alur data, dan konsep arsitektur yang digunakan dalam aplikasi Frozeria untuk membantu Anda memahami cara kerja aplikasi secara menyeluruh.

---

## 📦 1. Penjelasan Dependensi (package.json)

Aplikasi ini menggunakan beberapa pustaka (library) utama yang tercantum di `package.json`:

### Dependensi Utama (Dependencies):
- **`next`**: Framework utama yang kita gunakan (Next.js 15). Menangani routing, rendering, dan API.
- **`react` & `react-dom`**: Pustaka inti untuk membangun antarmuka pengguna (UI).
- **`@prisma/client` & `prisma`**: ORM (Object-Relational Mapping) yang menjembatani kode TypeScript kita dengan database PostgreSQL.
- **`pg`**: Driver untuk menghubungkan aplikasi Node.js dengan database PostgreSQL.
- **`lucide-react`**: Sumber icon yang digunakan di seluruh aplikasi (seperti icon keranjang, pensil, hapus, dll).
- **`tailwindcss`**: Framework CSS untuk mendesain tampilan dengan cepat menggunakan class utilitas.

---

## 🌐 2. Cara Kerja Next.js (App Router)

Aplikasi ini menggunakan **Next.js App Router** (fitur terbaru dari Next.js).

### Konsep Routing:
Routing di Next.js berbasis folder di dalam direktori `src/app`. Setiap folder yang memiliki file `page.tsx` akan otomatis menjadi halaman web.
- `src/app/page.tsx` -> Mengakses `http://localhost:3000/` (Dashboard)
- `src/app/categories/page.tsx` -> Mengakses `http://localhost:3000/categories`
- `src/app/products/[id]/page.tsx` -> Mengakses detail produk berdasarkan ID (Dynamic Route).

### Server vs Client Components:
1. **Server Components (Default)**: Kode dijalankan di server. Bagus untuk mengambil data dari database karena lebih cepat dan aman. Contoh: `src/app/page.tsx`.
2. **Client Components**: Menggunakan direktif `"use client"` di baris paling atas. Kode dijalankan di browser. Digunakan untuk halaman yang butuh interaksi pengguna seperti klik tombol, state, atau efek animasi. Contoh: `DashboardClient.tsx`.

---

## 🔄 3. Alur Aplikasi & Alur Data (Flow)

### A. Alur Menampilkan Data (Read):
1. Pengguna membuka halaman Dashboard.
2. File `src/app/page.tsx` (Server Component) berjalan di server.
3. Kode tersebut memanggil `prisma.product.findMany()` untuk mengambil data barang dari PostgreSQL.
4. Data yang didapat dikirimkan ke komponen `DashboardClient` sebagai properti (`props`).
5. Halaman dikirim ke browser pengguna sudah dalam keadaan berisi data.

### B. Alur Mengubah Data (Create/Update/Delete):
1. Pengguna mengisi form dan klik tombol "Simpan" di halaman Tambah Barang.
2. Komponen React (Client) menangkap data tersebut dan melakukan request `fetch` (HTTP POST/PUT) ke API internal Next.js (misalnya ke `/api/products`).
3. File API di server (`src/app/api/products/route.ts`) menerima data tersebut.
4. API memanggil Prisma (`prisma.product.create()`) untuk menyimpannya ke database PostgreSQL.
5. Setelah sukses, browser diperintahkan untuk me-refresh halaman agar data terbaru muncul.

---

## 📂 4. Lokasi File & Pemetaan Konsep MVC

Meskipun Next.js tidak secara ketat menggunakan pola MVC (Model-View-Controller) tradisional, kita bisa memetakan konsep tersebut di aplikasi ini:

### 1. Model (Data & Database)
- **Lokasi**: `prisma/schema.prisma`
- **Penjelasan**: Di file ini kita mendefinisikan struktur tabel database kita (Tabel `Product` dan `Category`). Prisma menggunakan file ini untuk membuat tabel di PostgreSQL.

### 2. View (Tampilan)
- **Lokasi**: File-file `page.tsx` dan komponen di dalam folder `src/app`.
- **Penjelasan**: Ini adalah kode HTML & CSS (JSX) yang dilihat oleh pengguna. Contohnya tampilan tabel, card, dan form.

### 3. Controller (Logika Bisnis)
Di Next.js, peran Controller dibagi menjadi dua:
- **Server Actions / API Routes**: Berada di dalam folder `src/app/api/`. Ini adalah tempat logika untuk menerima request, memproses data, dan memasukkannya ke database.
- **Logika di Server Components**: Pada file `page.tsx`, sebelum mengembalikan tampilan, terdapat kode untuk mengambil data dari database. Ini juga berfungsi sebagai controller mini.

### Pengaturan Penting Lainnya:
- **`.env`**: Menyimpan variabel lingkungan seperti `DATABASE_URL`. Jangan pernah membagikan file ini ke publik karena berisi password database.
- **`src/lib/prisma.ts`**: File konfigurasi untuk memastikan kita hanya memiliki satu koneksi (instance) Prisma yang berjalan, agar tidak membebani database.

---
*Dokumen ini dibuat untuk membantu Hilman Zahrawa Budiarto memahami arsitektur aplikasi Frozeria.*
