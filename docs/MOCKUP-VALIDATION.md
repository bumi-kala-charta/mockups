# Pemeriksaan mockup BKC

**Tanggal:** 14 September 2026

## Hasil

- `npm run check`: 0 error, 0 warning, 0 hint.
- `npm run build`: berhasil menghasilkan galeri dan tiga landing page statis.
- Pemeriksaan browser pada hasil build: Atlas, Observatorium, dan Ruang pada 1.440 × 1.000 serta 390 × 844 px. Seluruh alur yang diuji berhasil.
- Axe WCAG 2 A/AA dan 2.1 AA: 0 temuan otomatis pada enam tampilan tersebut. Ini bukan pernyataan bahwa audit WCAG manual lengkap telah dilakukan.
- Tidak ada error JavaScript atau gambar gagal dimuat dalam pemeriksaan browser.
- Pemeriksaan tambahan pada 360, 768, dan 1.024 px untuk keempat halaman: tidak ada overflow horizontal halaman, gambar rusak, atau anchor yang kehilangan tujuan.
- 26 berkas token/aset DS yang disalin cocok byte demi byte dengan sumber lokal. Penyesuaian website disimpan terpisah dari snapshot DS.

## Interaksi yang diperiksa

Filter portofolio; filter peta; pemilihan lokasi; peta ke publikasi; publikasi ke pekerjaan; pekerjaan kembali ke lokasi; zoom dan reset; dialog kolaborasi; pilihan topik; penutupan dengan Escape; menu mobile; accordion Ruang.

Screenshot desktop penuh, mobile penuh, hero, peta, dan contoh detail diperiksa untuk komposisi, keterbacaan, serta pemakaian identitas. Perbaikan mencakup kontras metadata, teks di atas kontur, nama aksesibel tombol galeri, spasi pada heading responsif, dan ukuran CTA di layar 360 px.

## Artefak

- `docs/mockups/qa-results.json`: hasil pemeriksaan alur serta aksesibilitas pada hasil build.
- `docs/mockups/layout-results.json`: hasil pemeriksaan lebar 360, 768, dan 1.024 px.
- `docs/mockups/alternatives-overview.png`: perbandingan hero ketiga alternatif.
- `docs/mockups/fullpage-overview.png`: perbandingan keseluruhan halaman.
- `docs/mockups/{atlas,observatorium,ruang}-{desktop,mobile}.png`: screenshot masing-masing halaman penuh.

## Batas

Pemeriksaan dilakukan dengan Chrome. Peta merupakan mockup vektor lokal dan tidak menerapkan layanan tile, pan, atau operasi GIS produksi. Publikasi dan pekerjaan memakai data contoh; dialog detail memerlukan JavaScript. Tidak ada pesan yang dikirim, akun yang dibuat, atau deployment publik.
