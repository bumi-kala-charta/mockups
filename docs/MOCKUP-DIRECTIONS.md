# Tiga alternatif landing page BKC

**Tanggal:** 14 September 2026 · **Status:** mockup interaktif dengan konten contoh

Ketiga alternatif memakai PRD sebagai konteks informasi dan design system BKC sebagai acuan visual wajib. Perbedaannya terletak pada komposisi, urutan penekanan, dan cara pembaca menjelajahi isi. Data dan fungsi inti sengaja dibuat setara agar perbandingannya bermakna.

| Aspek | Atlas | Observatorium | Ruang |
| --- | --- | --- | --- |
| Fokus | Cerita pekerjaan dan pengetahuan | Hubungan lokasi, data, dan pekerjaan | Pertemuan, belajar, dan komunitas |
| Kesan awal | Editorial, lapang, terukur | Teknis, imersif, tenang | Terbuka, hangat, ekspresif |
| Hero | Headline besar di kiri, bidang kontur di kanan | Headline melebar di atas peta Nusantara | Headline terpusat di bidang hijau dengan motif orbit |
| Tipografi | Kontras skala judul dengan metadata yang ringkas | Judul besar, angka dan metadata mono | Kalimat besar dan pendek, penekanan pada ritme bacaan |
| Aktivitas | Tiga kartu mandiri | Baris horizontal yang terstruktur | Accordion dengan uraian dan visual |
| Portofolio | Grid editorial tiga kolom | Register kartu pada permukaan gelap | Dua kolom lebar dengan ruang cerita lebih besar |
| Pengetahuan | Daftar publikasi dengan nomor dan waktu baca | Tiga modul publikasi terstruktur | Satu esai unggulan dengan daftar bacaan pendamping |
| Komunitas | Kartu diskusi berdampingan dengan prinsip | Band ruang belajar dengan mark dan orbit | Bagian kegiatan yang luas dengan tiga format pertemuan |
| Cocok bila | BKC ingin menyeimbangkan profil, portofolio, dan pengetahuan | BKC ingin kompetensi geospasial terasa paling dominan | BKC ingin komunitas dan semangat berbagi terasa paling dekat |

## Rekomendasi desain

Atlas merupakan titik awal paling seimbang untuk cakupan PRD: profil, karya, peta, serta pustaka memperoleh penekanan yang jelas. Observatorium memberi identitas paling kuat pada konteks geospasial. Ruang paling sesuai jika BKC ingin mendahulukan rasa keterbukaan dan kegiatan bersama.

Rekomendasi ini adalah penilaian desain, bukan hasil uji pengguna. Tidak ada alternatif yang ditetapkan sebagai desain final.

## Aset dan aturan yang dipertahankan

- Emblem resmi BKC pada header/footer, tanpa recolor atau rekonstruksi.
- Mark tupai dari berkas resmi; warna mengikuti varian yang disediakan DS.
- IBM Plex Sans dan IBM Plex Mono yang disajikan dari aset lokal.
- Palet hijau BKC, oranye sebagai aksen, paper, putih, dan ink.
- Kontur dari plate asli DS dan orbit dari CSS pola DS. Keduanya tidak bercampur pada satu permukaan.
- Tombol pill, radius kartu, jarak berbasis kelipatan 4 px, hover singkat, dan fokus keyboard.
- Ikon Lucide melalui wrapper BKC, tanpa emoji atau gambar ilustrasi pengganti.

Teks yang berada di atas kontur menggunakan permukaan atau warna yang tetap terbaca. Shade hijau, teks metadata, dan warna terpilih menyesuaikan hasil pemeriksaan kontras. Konten yang belum resmi dinyatakan sebagai contoh; nama orang, testimoni, dan klaim keberhasilan tidak dibuat-buat.

## Bagian yang dapat dicoba

1. Beralih alternatif melalui bilah eksplorasi atau galeri.
2. Memfilter enam karya menjadi proyek, riset, atau kegiatan.
3. Memilih titik peta melalui marker atau daftar dan melihat catatan terkait.
4. Membuka publikasi dari peta, lalu pekerjaan terkait, dan kembali ke peta.
5. Memperbesar/mengembalikan skala peta ilustratif.
6. Membuka profil, detail contoh kegiatan, dan simulasi percakapan kolaborasi.
7. Mengubah topik kolaborasi tanpa mengirim informasi.
8. Memakai menu ponsel serta accordion aktivitas pada Ruang.

Peta memakai geometri publik Natural Earth yang disimpan bersama dependency build. Browser tidak memanggil tile eksternal. Semua screenshot berasal dari render halaman yang sama, bukan gambar konsep yang terpisah dari implementasi.

## Batas tahap ini

Konten demo belum merepresentasikan rekam kerja resmi BKC. Belum ada halaman detail permanen, publikasi PDF asli, CMS, formulir pengiriman, atau data WebGIS produksi. Ketika arah desain dipilih, schema dan pipeline konten pada PRD menjadi dasar mengganti data demo dan membangun halaman detail yang dapat diindeks.
