# BKC — empat eksplorasi hero

14 September 2026. Tambahan pada PRD dan tiga mockup full page; lingkup baru hanya navigasi + hero. Tidak mengubah PRD, arsitektur Astro statis, atau pilihan editorial melalui berkas GitHub.

## Membandingkan arah

| Arah | Kesan pertama | Komposisi | Gerak / interaksi |
| --- | --- | --- | --- |
| Kontur | Hangat, terbuka, dekat dengan lapangan | Headline besar di putih dan lembar topografi hijau | Kontur bergeser perlahan, garis pindai bergerak; Bentang/Detail mengganti kepadatan aset kontur |
| Orbit | Identitas kuat, saling terhubung | Bidang hijau penuh, teks besar, instrumen orbit luas | Garis graticule dan penanda orbital bergerak; mark tupai asli tetap diam |
| Sinyal | Analitis, teknis, penasaran | Ink, tipografi Sans, bingkai pengamatan Mono, bola bumi ASCII | Daratan Natural Earth diterjemahkan menjadi karakter Canvas dan diputar; kursor terminal berdenyut perlahan |
| Indeks | Editorial, terarah, mengajak eksplorasi | Headline lebar, atlas hijau, indeks tiga lini kerja | Reveal tipografi, pemindai peta; pilihan manual Kerja lapangan/Riset/Ruang belajar memperbarui peta, copy, dan CTA |

Keempat halaman: `/heroes/kontur/`, `/heroes/orbit/`, `/heroes/sinyal/`, `/heroes/indeks/`. Galeri perbandingan ada di `/heroes/`. CTA mengarah ke bagian relevan pada mockup full page yang sudah tersedia.

## Hubungan dengan design system

- Snapshot DS pada `public/bkc/` dipakai apa adanya: token warna, ukuran/radius, IBM Plex Sans dan Mono, emblem, mark tupai, serta motif kontur/orbit.
- Emblem navigasi selalu memakai `logo-emblem.png`. Mark di hero memakai varian yang disediakan, tanpa recolor, distorsi, rekonstruksi, atau rotasi logo.
- Kontur memakai plate resmi DS; orbit memakai `.bkc-orbit` resmi. Keduanya tidak digabungkan pada satu bidang visual.
- Hijau memimpin; oranye terbatas pada satu CTA utama. Tidak menggunakan gradien, foto stok, foto AI, nama orang/testimoni rekaan, atau font tambahan.
- Ukuran display diperluas untuk eksplorasi hero. Teks putih kecil memakai bidang hijau yang lebih gelap agar terbaca; token DS tidak diedit.
- Instruksi terbaru pengguna meminta animasi, termasuk kemungkinan ASCII. Ini sengaja memperluas aturan gerak default DS yang biasanya melarang autoplay/loop. Penyesuaian berlaku pada empat hero ini; halaman sebelumnya tidak diberi loop baru.
- Bumi ASCII dan atlas adalah visualisasi geometri Natural Earth, bukan ilustrasi logo BKC atau klaim pengukuran lapangan. Kontur sintetis diberi penanda. Tidak ada statistik proyek atau presisi alat yang direkayasa.

## Perilaku gerak

Satu tombol jeda mengendalikan semua animasi hero. State tersimpan di `sessionStorage`, sehingga berpindah alternatif dalam tab yang sama mempertahankan pilihan. Header dan CTA tetap bisa digunakan saat animasi dijeda. Indeks yang dipilih manual tetap memperbarui konten.

`prefers-reduced-motion: reduce` membuat dekorasi statis dan menonaktifkan tombol pemutar dengan label yang menjelaskan status. Headline serta isi panel tetap terlihat, termasuk ketika halaman pertama kali dibuka dalam keadaan jeda. Tidak ada teks pokok yang menunggu carousel atau efek ketik selesai.

Render ASCII dibatasi maksimal 24 frame/detik, memakai land mask ringkas 8,1 KB yang disampling sebelumnya. Renderer berhenti saat tab tersembunyi atau globe di luar viewport. Ukuran Canvas mengikuti viewport, dengan pixel ratio maksimal 2. Tidak membutuhkan WebGL, API peta, tile eksternal, atau backend.

Tanpa JavaScript, headline, copy, CTA, pola CSS, dan frame ASCII statis tetap tersedia. Pergantian kepadatan/indeks serta kontrol jeda membutuhkan JavaScript; mode tanpa JavaScript memakai dekorasi statis.

## Batas mockup

Copy adalah eksplorasi editorial. Hubungan kategori dan framing atlas membantu menilai UI, bukan menunjukkan cakupan pekerjaan BKC yang sudah diverifikasi. Koordinat Bandung merupakan referensi kota WGS 84. Atribusi geometri tampil pada visual.

Seluruh halaman menggunakan `noindex,nofollow`. Tidak ada pengumpulan data, formulir terkirim, database, atau publikasi ke hosting.

## Verifikasi

`npm run check`, `npm run build`, dan `npm run qa:heroes` memeriksa tipe/build serta perilaku browser. Pemeriksaan hero mencakup lebar 360, 390, 768, 1024, 1440 px; screenshot desktop/mobile; satu h1; gambar dan anchor; axe WCAG A/AA desktop/mobile; kemajuan frame, jeda, persistensi pilihan; reduced motion; pilihan kepadatan/indeks; dan fallback tanpa JavaScript.

Hasil aktual disimpan pada `docs/heroes/qa-results.json`. Pemeriksaan otomatis melengkapi inspeksi visual dan tidak merupakan sertifikasi aksesibilitas penuh.

## Sumber

- Design system lokal: `D:\Project\Work\Bumi Kala Charta\Dev\bkc-ds`, snapshot commit `332eaf0dbd1addf89781dc29f6e9e794016fd4bc`.
- [BKC Design System](https://github.com/bumi-kala-charta/design-system).
- [World Atlas](https://github.com/topojson/world-atlas), geometri Natural Earth domain publik.
