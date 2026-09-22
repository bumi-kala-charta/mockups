# bkc-web-mockup

Tiga mockup interaktif untuk Bumi Kala Charta, dibangun dengan Astro dan aset asli design system BKC. PRD awal tetap tersimpan di [docs/PRD-BKC.md](docs/PRD-BKC.md).

## Empat hero dengan animasi

Tambahan terbaru: [galeri hero](http://127.0.0.1:4321/heroes/). Masing-masing berisi navigasi dan satu hero; tiga mockup full page sebelumnya tetap tersedia.

| Alternatif | Preview | Eksplorasi |
| --- | --- | --- |
| 01 · Kontur | [Buka Kontur](http://127.0.0.1:4321/heroes/kontur/) | Editorial putih, pemindaian kontur resmi, pilihan Bentang/Detail |
| 02 · Orbit | [Buka Orbit](http://127.0.0.1:4321/heroes/orbit/) | Bidang hijau imersif, motif orbit BKC, mark tupai diam di pusat |
| 03 · Sinyal | [Buka Sinyal](http://127.0.0.1:4321/heroes/sinyal/) | Bumi ASCII dari geometri Natural Earth, berputar melalui Canvas |
| 04 · Indeks | [Buka Indeks](http://127.0.0.1:4321/heroes/indeks/) | Tipografi editorial besar dan tiga fokus praktik yang dipilih manual |

Tombol **Jeda animasi** ada di toolbar setiap hero dan pilihannya disimpan selama sesi tab. Pengaturan `prefers-reduced-motion` selalu diutamakan. Bumi ASCII memiliki frame HTML statis untuk kondisi JavaScript tidak tersedia. Animasi dekoratif tidak memuat informasi yang wajib ditunggu.

Perintah QA tambahan: `npm run qa:heroes`. Keterangan desain ada di `docs/HERO-DIRECTIONS.md`; screenshot dan hasil pemeriksaan berada di `docs/heroes/`. Screenshot hanya merekam satu frame; buka preview untuk melihat gerak.

## Membuka mockup

Jalankan dari direktori proyek:

```powershell
npm ci
npm run dev -- --port 4321
```

Buka [galeri ketiga alternatif](http://127.0.0.1:4321/), atau langsung:

| Alternatif | URL | Pendekatan |
| --- | --- | --- |
| 01 · Atlas | [Buka Atlas](http://127.0.0.1:4321/atlas/) | Editorial putih dengan bidang kontur, komposisi asimetris, dan pustaka berbentuk daftar |
| 02 · Observatorium | [Buka Observatorium](http://127.0.0.1:4321/observatorium/) | Tampilan ink, peta Nusantara besar, register karya, dan metadata geospasial |
| 03 · Ruang | [Buka Ruang](http://127.0.0.1:4321/ruang/) | Hero hijau besar, identitas komunitas, aktivitas accordion, dan publikasi editorial |

Astro 7 menjalankan development server sebagai proses latar. Gunakan `npx astro dev status`, `npx astro dev logs`, dan `npx astro dev stop` untuk mengelolanya. Jika port sudah digunakan, ikuti alamat yang dilaporkan Astro atau pilih port lain.

## Isi dan interaksi

Ketiga mockup memiliki halaman company profile tersendiri, diakses melalui **Tentang BKC**, tautan pada ringkasan profil, footer, atau galeri:

| Atlas | Observatorium | Ruang |
| --- | --- | --- |
| [Company profile Atlas](http://127.0.0.1:4321/atlas/tentang/) | [Company profile Observatorium](http://127.0.0.1:4321/observatorium/tentang/) | [Company profile Ruang](http://127.0.0.1:4321/ruang/tentang/) |

Profil memuat cerita dan identitas, visi, empat misi, enam nilai beserta penerapannya, bidang kerja dan keluaran, proses kolaborasi, linimasa, susunan peran tim, kategori mitra, FAQ, serta kontak dummy. Semua konten profil berasal dari `src/data/company.ts`. Atlas menggunakan susunan editorial berkontur, Observatorium menggunakan register gelap dan instrumen koordinat, sedangkan Ruang menggunakan hero hijau bermotif orbit dan kartu yang lebih lembut. Pergantian alternatif dari halaman profil tetap membuka profil alternatif tujuan.

Linimasa, susunan tim, dan alamat surel merupakan contoh. FAQ serta daftar isi berfungsi tanpa JavaScript; dialog kolaborasi merupakan simulasi. Jalankan `npm run qa:profiles` untuk memeriksa ketiga profil pada lima lebar layar, tautan antarhalaman, navigasi, keyboard, aksesibilitas otomatis, dan konten tanpa JavaScript. Screenshot dan hasil pemeriksaan tersimpan di `docs/company-profiles/`.

Setiap alternatif memiliki hero, profil, proyek/riset/kegiatan, enam pekerjaan contoh, peta, pengetahuan, ruang belajar, kategori kolaborator, CTA kolaborasi, dan footer.

- Filter portofolio mengubah kartu serta jumlah hasil.
- Filter peta menyelaraskan marker, daftar lokasi, dan panel pekerjaan.
- Marker dan daftar sama-sama dapat memilih lokasi. Zoom dan reset memperagakan navigasi peta.
- Detail pekerjaan terhubung dengan pembaca publikasi, lalu dapat kembali ke lokasi di peta.
- Native dialog mendukung Escape, penutupan melalui backdrop, dan pengembalian fokus.
- Dialog kolaborasi memiliki pilihan topik yang mengubah panduan percakapan. Tidak mengirim data.
- Menu ponsel dan accordion pada Ruang berfungsi.

## Design system wajib

Aset asli disalin dari `D:\Project\Work\Bumi Kala Charta\Dev\bkc-ds`, commit `332eaf0dbd1addf89781dc29f6e9e794016fd4bc`, ke `public/bkc/`. Snapshot berisi stylesheet, token, logo/emblem, mark tupai, kontur, serta font IBM Plex Sans dan IBM Plex Mono.

Komponen Astro mengadaptasi komposisi dan aturan dari `ui_kits/website/HomeScreen.jsx`, `Shared.jsx`, serta pedoman `Logo`, `Button`, dan `ContourField`. Komponen React dan bundle demonstrasi DS tidak dimuat. Ikon Lucide memakai wrapper `Icon.astro`, stroke 1,6 px, serta dirender saat build.

Warna, font, radius, pola, dan state dasar menggunakan token BKC. Skala huruf hero diperluas untuk eksplorasi landing page. Shade hijau yang lebih gelap digunakan untuk pasangan teks putih yang membutuhkan kontras lebih tinggi. Penyesuaian semantik berada di stylesheet website; berkas snapshot DS tidak diedit.

Tidak menggunakan foto stok, foto buatan AI, logo rekaan, nama orang rekaan, atau testimoni rekaan. Kategori kolaborator bersifat ilustratif. Sampul karya memakai kontur resmi dan tipografi BKC.

## Status mockup

Ini adalah eksplorasi UI, bukan rilis produksi. Pekerjaan, publikasi, keluaran, agenda, dan rumusan nilai adalah contoh. Koordinat merepresentasikan kota untuk demonstrasi, bukan lokasi pekerjaan resmi BKC. Seluruh halaman memiliki `noindex,nofollow`.

Peta mockup memakai geometri Natural Earth melalui `world-atlas`, diproyeksikan saat build dengan `d3-geo` dan dirender sebagai SVG. Peta bisa dibuka tanpa koneksi tile atau API eksternal. Leaflet tetap rekomendasi dalam PRD untuk WebGIS produksi; mockup ini tidak menerapkan basemap, pan, batas administrasi rinci, atau akurasi pengukuran GIS produksi. Angka skala peta diberi label indikatif.

Data contoh berasal dari `src/data/demo.ts`. Tidak ada backend, database, pengiriman formulir, pendaftaran, atau unduhan publikasi asli. Tanpa JavaScript, konten ringkasan tetap terbaca; filter, detail dialog, dan peta interaktif membutuhkan JavaScript. Halaman detail permanen serta alur editorial Content Collections pada PRD merupakan pekerjaan implementasi berikutnya.

## Build dan pemeriksaan

```powershell
npm run check
npm run build
npm run preview -- --port 4321
```

`npm run qa` menjalankan pemeriksaan browser menggunakan Chrome yang terpasang. Default URL adalah `http://127.0.0.1:4321`; ganti melalui environment variable `BKC_PREVIEW_URL` bila diperlukan. Pemeriksaan mencakup seluruh alternatif pada desktop/mobile, filter, relasi peta–publikasi, dialog, menu, gambar rusak, overflow, serta pemindaian aksesibilitas otomatis. Hasil dan screenshot tersimpan di `docs/mockups/`.

Pemeriksaan otomatis tidak menggantikan audit aksesibilitas manual. Screenshot merupakan dokumentasi visual; halaman interaktif adalah artefak utama. Konten contoh dan desain bisa diedit tanpa mengubah PRD.

## Struktur utama

```text
src/pages/                 Galeri, landing page, company profile, hero
src/components/            Komponen DS, peta, kartu, dialog
src/styles/                Style bersama + style per alternatif
src/scripts/interactions.ts
src/data/demo.ts           Satu sumber data contoh
src/data/company.ts        Konten dummy company profile
src/components/profile/    Hero per arah + isi company profile
public/bkc/                Snapshot aset & token design system
public/mockup-previews/    Thumbnail hasil render aktual
docs/PRD-BKC.md             PRD awal
docs/MOCKUP-DIRECTIONS.md   Catatan perbandingan desain
docs/mockups/              Screenshot dan hasil QA
scripts/qa.mjs             Pemeriksaan browser
```

## Sumber

- [Design system BKC](https://github.com/bumi-kala-charta/design-system): aset serta identitas BKC. Hak merek dan aset BKC tetap milik pemiliknya.
- [World Atlas](https://github.com/topojson/world-atlas): geometri Natural Earth; data Natural Earth berada dalam domain publik. Atribusi juga tampil pada peta.
- [Lucide](https://lucide.dev/guide/astro): ikon dengan lisensi ISC.
- Font IBM Plex yang tersedia dalam DS menggunakan SIL Open Font License sesuai dokumentasi DS.
