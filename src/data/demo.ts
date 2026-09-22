/** Fictional editorial content for layout exploration. Coordinates represent cities, not BKC work sites. */
export const projects = [
  { id: 'pesisir', number: '01', kind: 'Riset', title: 'Membaca perubahan pesisir', place: 'Semarang, Jawa Tengah', coordinates: [110.42, -6.97], year: '2026', topic: 'Penginderaan jauh', description: 'Menelusuri perubahan garis pantai dari waktu ke waktu. Menghubungkan citra satelit, pengamatan lapangan, dan cerita dari pesisir.', result: 'Seri peta perubahan dan catatan metodologi', publication: 'Garis pantai yang terus bergerak', format: 'Paper', read: '8 menit', className: 'coastal' },
  { id: 'partisipatif', number: '02', kind: 'Proyek', title: 'Peta yang tumbuh bersama warga', place: 'Kulon Progo, DI Yogyakarta', coordinates: [110.16, -7.85], year: '2026', topic: 'Pemetaan partisipatif', description: 'Menyusun pengetahuan ruang bersama warga. Jalan kecil, sumber air, dan tempat yang berarti menjadi bagian dari peta yang bisa dibaca bersama.', result: 'Atlas desa dan dokumentasi proses', publication: 'Siapa yang bercerita di dalam peta?', format: 'Esai', read: '6 menit', className: 'village' },
  { id: 'kanopi', number: '03', kind: 'Riset', title: 'Menakar ruang hijau kota', place: 'Bandung, Jawa Barat', coordinates: [107.61, -6.91], year: '2025', topic: 'Analisis spasial', description: 'Membaca hubungan antara tutupan vegetasi dan lingkungan perkotaan melalui data geospasial. Sebuah contoh eksplorasi tentang kota yang lebih nyaman.', result: 'Peta tematik dan infografis', publication: 'Ruang hijau, dilihat dari atas', format: 'Infografis', read: '4 menit', className: 'canopy' },
  { id: 'kampung', number: '04', kind: 'Kegiatan', title: 'Merawat ingatan sebuah kampung', place: 'Makassar, Sulawesi Selatan', coordinates: [119.41, -5.14], year: '2026', topic: 'Diskusi terbuka', description: 'Ruang pertemuan untuk bertukar cerita tentang tempat. Peserta mengenali ingatan kolektif dan mendokumentasikannya melalui sketsa peta.', result: 'Catatan diskusi dan peta cerita', publication: 'Tempat, ingatan, dan sebuah peta', format: 'Esai', read: '5 menit', className: 'village' },
  { id: 'sungai', number: '05', kind: 'Proyek', title: 'Mengikuti jejak aliran sungai', place: 'Pontianak, Kalimantan Barat', coordinates: [109.34, -0.03], year: '2025', topic: 'Survei dan pemetaan', description: 'Contoh dokumentasi wilayah sungai yang menggabungkan pengukuran lapangan, data elevasi, dan penyusunan informasi spasial.', result: 'Peta dasar dan catatan lapangan', publication: 'Membaca sungai dari datanya', format: 'Paper', read: '7 menit', className: 'coastal' },
  { id: 'gnss', number: '06', kind: 'Kegiatan', title: 'Mengenal bumi lewat pengukuran', place: 'Palu, Sulawesi Tengah', coordinates: [119.87, -0.90], year: '2026', topic: 'Kelas lapangan', description: 'Contoh kelas pengantar GNSS untuk mahasiswa dan praktisi. Belajar menyiapkan pengamatan, membaca hasil, dan menjelaskan ketelitiannya.', result: 'Modul belajar dan catatan pengamatan', publication: 'Satu titik, banyak pertanyaan', format: 'Infografis', read: '4 menit', className: 'canopy' },
] as const;

export const activities = [
  { number: '01', name: 'Proyek', label: 'Dari kebutuhan menjadi peta', description: 'Survei, pemetaan, dan analisis geospasial untuk menjawab persoalan di lapangan.', icon: 'map', tags: ['Survei GNSS', 'Fotogrametri', 'WebGIS'] },
  { number: '02', name: 'Riset', label: 'Ruang untuk bertanya lebih jauh', description: 'Menguji metode dan membaca perubahan bumi melalui data, pengamatan, dan diskusi.', icon: 'scan', tags: ['Penginderaan jauh', 'Analisis spasial'] },
  { number: '03', name: 'Kegiatan', label: 'Pengetahuan yang dibagikan', description: 'Belajar bersama lewat kelas lapangan, diskusi terbuka, dan pertemuan lintas disiplin.', icon: 'users', tags: ['Kelas', 'Diskusi', 'Pemetaan bersama'] },
] as const;

export const values = [
  { title: 'Berpijak pada data', description: 'Menjelaskan sumber, metode, dan batas ketelitian dengan terbuka.' },
  { title: 'Dikerjakan bersama', description: 'Mempertemukan sudut pandang dan pengalaman yang berbeda.' },
  { title: 'Dibagikan kembali', description: 'Mengubah hasil pekerjaan menjadi pengetahuan yang dapat dipelajari.' },
];

export const explorations = [
  { slug: 'atlas', number: '01', name: 'Atlas', descriptor: 'Editorial & cartographic', title: 'Sebuah atlas untuk cerita BKC.', description: 'Tipografi besar, susunan editorial yang lapang, dan lanskap kontur sebagai karakter utama.', tags: ['Putih & hijau', 'Editorial', 'Kontur'] },
  { slug: 'observatorium', number: '02', name: 'Observatorium', descriptor: 'Immersive & precise', title: 'Melihat BKC dari perspektif spasial.', description: 'Permukaan gelap, data yang terstruktur, dan peta Indonesia yang menjadi pusat pengalaman.', tags: ['Ink & hijau', 'Imersif', 'Peta'] },
  { slug: 'ruang', number: '03', name: 'Ruang', descriptor: 'Open & community-led', title: 'Tempat bertemu dan bertukar pengetahuan.', description: 'Komposisi terbuka, hierarki yang ramah, dan susunan cerita untuk mendekatkan BKC dengan pembaca.', tags: ['Paper & hijau', 'Komunitas', 'Cerita'] },
];
