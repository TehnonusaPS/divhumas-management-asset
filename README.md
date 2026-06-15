# 🛡️ Sistem Manajemen Aset — Divhumas Polri

> Platform terpadu untuk pengelolaan dan pemantauan aset Divisi Hubungan Masyarakat Kepolisian Negara Republik Indonesia.

![Laravel](https://img.shields.io/badge/Laravel-12.x-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)
![Inertia.js](https://img.shields.io/badge/Inertia.js-3.x-9553E9?style=for-the-badge&logo=inertia&logoColor=white)
![React](https://img.shields.io/badge/React-19.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-18-336791?style=for-the-badge&logo=postgresql&logoColor=white)
![PHP](https://img.shields.io/badge/PHP-8.2+-777BB4?style=for-the-badge&logo=php&logoColor=white)

---

## 📋 Daftar Isi

- [Stack Teknologi](#-stack-teknologi)
- [Prasyarat](#-prasyarat)
- [Struktur Proyek](#-struktur-proyek)
- [Cara Setup (Clone dari Git)](#-cara-setup-clone-dari-git)
- [Menjalankan Aplikasi](#-menjalankan-aplikasi)
- [Cara Membuat Halaman Baru](#-cara-membuat-halaman-baru)
- [Cara Passing Data dari Laravel ke React](#-cara-passing-data-dari-laravel-ke-react)
- [Navigasi dengan Inertia Link](#-navigasi-dengan-inertia-link)
- [Konvensi & Struktur Folder](#-konvensi--struktur-folder)
- [Perintah Artisan yang Sering Dipakai](#-perintah-artisan-yang-sering-dipakai)
- [Troubleshooting](#-troubleshooting)

---

## 🔧 Stack Teknologi

| Layer | Teknologi | Versi |
|---|---|---|
| Backend | Laravel | 12.x |
| Frontend Bridge | Inertia.js | 3.x |
| Frontend UI | React | 19.x |
| Build Tool | Vite | 8.x |
| Database | PostgreSQL | 18 |
| PHP | PHP | 8.2+ (disarankan 8.5) |
| Package Manager | Composer + npm | Latest |

### Bagaimana Inertia.js Bekerja?

```
Browser Request
     │
     ▼
Laravel Router (web.php)
     │
     ▼
Controller / Closure
     │  Inertia::render('NamaHalaman', ['data' => $data])
     ▼
Inertia Middleware (HandleInertiaRequests)
     │
     ▼
app.blade.php  ◄──── Root HTML template (hanya dimuat sekali)
     │
     ▼
app.jsx (createInertiaApp)
     │
     ▼
resources/js/Pages/NamaHalaman.jsx  ◄──── React Component
```

> **Intinya:** Laravel menangani routing & data, Inertia menjadi jembatan, React merender UI. Tidak ada API JSON yang perlu dibuat!

---

## ✅ Prasyarat

Pastikan sudah terinstal di komputer Anda:

| Software | Versi Minimum | Cara Cek |
|---|---|---|
| PHP | **8.2+** (proyek ini pakai 8.5) | `php -v` |
| Composer | 2.x | `composer -V` |
| Node.js | 20.x+ | `node -v` |
| npm | 10.x+ | `npm -v` |
| PostgreSQL | 14+ (proyek ini: 18) | Lihat pgAdmin atau `psql --version` |
| Git | Latest | `git --version` |

---

## 📁 Struktur Proyek

```
divhumas-management-asset/
├── app/
│   └── Http/
│       └── Middleware/
│           └── HandleInertiaRequests.php   ← Inertia middleware (shared data)
├── resources/
│   ├── css/
│   │   └── app.css                         ← Global CSS
│   ├── js/
│   │   ├── app.jsx                         ← Entry point Inertia + React
│   │   ├── bootstrap.js                    ← Axios & CSRF setup
│   │   ├── Pages/                          ← ⭐ Semua halaman React di sini
│   │   │   ├── Welcome.jsx                 ← Landing page
│   │   │   ├── Auth/
│   │   │   │   ├── Login.jsx
│   │   │   │   └── Register.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── Components/                     ← Komponen UI yang dapat digunakan ulang
│   │   └── Layouts/                        ← Layout wrapper (Navbar, Sidebar, dll)
│   └── views/
│       └── app.blade.php                   ← Root HTML, jangan diubah isinya
├── routes/
│   └── web.php                             ← Semua route web didefinisikan di sini
├── public/
│   └── images/                             ← Aset gambar statis (logo, dll)
├── vite.config.js                          ← Konfigurasi Vite + React plugin
└── .env                                    ← Konfigurasi environment (JANGAN di-commit!)
```

---

## 🚀 Cara Setup (Clone dari Git)

Ikuti langkah-langkah berikut **secara berurutan** setelah melakukan `git clone`:

### Langkah 1 — Clone Repository

```bash
git clone https://github.com/TehnonusaPS/divhumas-management-asset.git
cd divhumas-management-asset
```

### Langkah 2 — Install PHP Dependencies

```bash
composer install
```

### Langkah 3 — Buat File Environment

```bash
cp .env.example .env
php artisan key:generate
```

### Langkah 4 — Konfigurasi Database

Buka file `.env` dan sesuaikan pengaturan database:

```dotenv
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=manajement-asset
DB_USERNAME=postgres
DB_PASSWORD=root
```

> ⚠️ **Penting:** Buat database `manajement-asset` terlebih dahulu di PostgreSQL sebelum migrasi!
>
> Cara membuat database via psql:
> ```bash
> psql -U postgres -c 'CREATE DATABASE "manajement-asset";'
> ```
> Atau buat via pgAdmin secara manual.

### Langkah 5 — Jalankan Migrasi

```bash
php artisan migrate
```

Jika muncul error tabel `sessions` tidak ada, jalankan:

```bash
php artisan session:table
php artisan migrate
```

### Langkah 6 — Install Node.js Dependencies

```bash
npm install
```

### Langkah 7 — Build Aset Frontend

```bash
# Untuk production (build sekali)
npm run build

# Atau untuk development (dengan hot-reload)
npm run dev
```

---

## ▶️ Menjalankan Aplikasi

Buka **dua terminal** secara bersamaan:

**Terminal 1 — Backend Laravel:**
```bash
php artisan serve
```
Akses aplikasi di: **http://127.0.0.1:8000**

**Terminal 2 — Frontend Vite (Hot-Reload):**
```bash
npm run dev
```

> 💡 **Catatan penting:**
> - Selalu akses aplikasi melalui **http://127.0.0.1:8000**, bukan `localhost:5173`
> - Port `5173` adalah Vite HMR server — bekerja di background untuk hot-reload otomatis
> - Kedua terminal **harus berjalan bersamaan** saat development
> - Jika ingin jalankan sekaligus dalam 1 perintah: `composer run dev`

---

## 📄 Cara Membuat Halaman Baru

Membuat halaman baru di Inertia.js + React hanya butuh **3 langkah**:

### Langkah 1 — Buat file React di folder `Pages/`

```jsx
// resources/js/Pages/ContohHalaman.jsx

import { Head, Link } from '@inertiajs/react';

export default function ContohHalaman({ judul, data }) {
    return (
        <>
            <Head title="Contoh Halaman" />

            <div>
                <h1>{judul}</h1>
                <ul>
                    {data.map((item) => (
                        <li key={item.id}>{item.nama}</li>
                    ))}
                </ul>

                <Link href="/">Kembali ke Beranda</Link>
            </div>
        </>
    );
}
```

### Langkah 2 — Buat route di `routes/web.php`

```php
use Inertia\Inertia;

Route::get('/contoh', function () {
    return Inertia::render('ContohHalaman', [
        'judul' => 'Ini Halaman Contoh',
        'data'  => [
            ['id' => 1, 'nama' => 'Aset A'],
            ['id' => 2, 'nama' => 'Aset B'],
        ],
    ]);
})->name('contoh');
```

### Langkah 3 — Akses di browser

```
http://127.0.0.1:8000/contoh
```

---

## 📦 Cara Passing Data dari Laravel ke React

### Via Route / Closure

```php
// routes/web.php
Route::get('/aset', function () {
    return Inertia::render('Aset/Index', [
        'asets' => Aset::all(),
        'total' => Aset::count(),
    ]);
});
```

### Via Controller

```php
// app/Http/Controllers/AsetController.php
use Inertia\Inertia;

class AsetController extends Controller
{
    public function index()
    {
        return Inertia::render('Aset/Index', [
            'asets' => Aset::paginate(10),
        ]);
    }
}
```

### Menerima di React Component

```jsx
// resources/js/Pages/Aset/Index.jsx
export default function Index({ asets, total }) {
    return (
        <div>
            <p>Total Aset: {total}</p>
            {asets.data.map(aset => (
                <div key={aset.id}>{aset.nama}</div>
            ))}
        </div>
    );
}
```

### Shared Data (tersedia di semua halaman)

Data yang selalu dibutuhkan di semua halaman (seperti info user login) didefinisikan di:

```php
// app/Http/Middleware/HandleInertiaRequests.php

public function share(Request $request): array
{
    return array_merge(parent::share($request), [
        'auth' => [
            'user' => $request->user(),
        ],
        // Tambahkan shared data lain di sini
        'flash' => [
            'success' => $request->session()->get('success'),
            'error'   => $request->session()->get('error'),
        ],
    ]);
}
```

Mengakses shared data di React:

```jsx
import { usePage } from '@inertiajs/react';

export default function NamaKomponen() {
    const { auth, flash } = usePage().props;

    return (
        <div>
            <p>Halo, {auth.user?.name}</p>
            {flash.success && <div className="alert">{flash.success}</div>}
        </div>
    );
}
```

---

## 🔗 Navigasi dengan Inertia Link

Selalu gunakan `<Link>` dari Inertia (bukan `<a href>`), agar navigasi terjadi tanpa full page reload:

```jsx
import { Link } from '@inertiajs/react';

// ✅ Benar — menggunakan Inertia Link
<Link href="/dashboard">Dashboard</Link>
<Link href={route('aset.index')}>Daftar Aset</Link>

// ❌ Hindari — menyebabkan full page reload
<a href="/dashboard">Dashboard</a>
```

### Navigasi Programatik (dari JavaScript)

```jsx
import { router } from '@inertiajs/react';

// Redirect setelah aksi
router.visit('/dashboard');
router.visit(route('aset.index'));

// Dengan method HTTP tertentu
router.post('/aset', { nama: 'Laptop' });
router.put('/aset/1', { nama: 'Laptop Baru' });
router.delete('/aset/1');
```

---

## 🗂️ Konvensi & Struktur Folder

### Penamaan File React Pages

| Jenis | Lokasi | Contoh |
|---|---|---|
| Halaman utama | `Pages/NamaHalaman.jsx` | `Pages/Dashboard.jsx` |
| Halaman bersarang | `Pages/Modul/NamaHalaman.jsx` | `Pages/Aset/Index.jsx` |
| Layout | `Layouts/NamaLayout.jsx` | `Layouts/MainLayout.jsx` |
| Komponen reusable | `Components/NamaKomponen.jsx` | `Components/Button.jsx` |

### Cara Menggunakan Layout

```jsx
// resources/js/Layouts/MainLayout.jsx
export default function MainLayout({ children, title }) {
    return (
        <div>
            <header>
                <h1>Divhumas Polri — {title}</h1>
            </header>
            <main>{children}</main>
            <footer>© 2025 Divhumas Polri</footer>
        </div>
    );
}
```

```jsx
// resources/js/Pages/Dashboard.jsx
import MainLayout from '@/Layouts/MainLayout';

export default function Dashboard() {
    return (
        <MainLayout title="Dashboard">
            <h2>Selamat Datang!</h2>
        </MainLayout>
    );
}

// Cara alternatif menggunakan persistent layout
Dashboard.layout = (page) => <MainLayout title="Dashboard">{page}</MainLayout>;
```

---

## 🛠️ Perintah Artisan yang Sering Dipakai

```bash
# Jalankan server development
php artisan serve

# Buat migration baru
php artisan make:migration create_asets_table

# Jalankan migrasi
php artisan migrate

# Rollback migrasi terakhir
php artisan migrate:rollback

# Buat model + migration + controller sekaligus
php artisan make:model Aset -mc

# Buat controller resource
php artisan make:controller AsetController --resource

# Lihat semua route
php artisan route:list

# Clear semua cache (jalankan ini jika ada perilaku aneh)
php artisan cache:clear
php artisan view:clear
php artisan route:clear
php artisan config:clear

# Seeder database
php artisan db:seed
```

---

## 🔍 Troubleshooting

### ❌ Error: `Class "Inertia\Inertia" not found`
```bash
composer require inertiajs/inertia-laravel
```

### ❌ Error: `relation "sessions" does not exist`
```bash
php artisan session:table
php artisan migrate
```

### ❌ Error: `axios` tidak ditemukan saat `npm run build`
```bash
npm install axios
npm run build
```

### ❌ Halaman blank / React tidak merender
Pastikan `resources/views/app.blade.php` ada dan berisi:
```blade
@viteReactRefresh
@vite(['resources/css/app.css', 'resources/js/app.jsx'])
@inertia
```

### ❌ Error `PDO::MYSQL_ATTR_SSL_CA` deprecated (PHP 8.5)
File `config/database.php` sudah diperbaiki. Jika masih muncul warning, ini hanya *deprecation notice*, bukan error fatal, dan tidak memengaruhi fungsi aplikasi.

### ❌ Perubahan JSX tidak ter-refresh otomatis
Pastikan `npm run dev` sedang berjalan di terminal terpisah.

### ❌ `npm run build` gagal setelah pull terbaru
```bash
npm install        # install dependensi yang mungkin bertambah
npm run build
```

---

## 🤝 Alur Kerja Tim (Git Workflow)

```bash
# Sebelum mulai bekerja, selalu pull terbaru
git pull origin main

# Buat branch baru untuk fitur/perbaikan
git checkout -b feat/nama-fitur

# Setelah selesai coding
git add .
git commit -m "feat: deskripsi perubahan"
git push origin feat/nama-fitur

# Buat Pull Request ke main di GitHub
```

> ⚠️ **Jangan pernah commit file `.env`!** File `.env` sudah masuk `.gitignore`.
> Setiap anggota tim harus membuat file `.env` sendiri berdasarkan `.env.example`.

---

## 📚 Referensi

| Dokumentasi | Link |
|---|---|
| Laravel 12 | https://laravel.com/docs/12.x |
| Inertia.js | https://inertiajs.com |
| React | https://react.dev |
| Vite | https://vitejs.dev |
| PostgreSQL | https://www.postgresql.org/docs |

---

<p align="center">
  Dibuat dengan ❤️ oleh Tim Divhumas Polri
</p>
