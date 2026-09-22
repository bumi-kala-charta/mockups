/** Dummy company profile. Replace with approved BKC copy before publication. */
import { values } from './demo';

export const company = {
  introduction: 'Bumi Kala Charta adalah komunitas dan konsultansi geospasial yang berbasis di Bandung. Kami mempertemukan mahasiswa, praktisi, peneliti, dan mitra untuk memahami ruang melalui geodesi dan geomatika.',
  story: 'Kami berangkat dari percakapan sederhana: bagaimana pengetahuan tentang bumi bisa lebih dekat dengan kehidupan sehari-hari? Dari sana, BKC menjadi tempat untuk mengerjakan proyek, membuka pertanyaan riset, dan belajar bersama di lapangan.',
  belief: 'Bagi kami, peta bukan akhir sebuah pekerjaan. Ia adalah awal percakapan yang lebih baik tentang tempat, orang-orang di dalamnya, dan masa depan yang ingin dibangun bersama.',
  vision: 'Menjadi ruang kolaborasi geospasial yang menghubungkan ketelitian ilmu, pengetahuan lokal, dan kepedulian terhadap bumi untuk masa depan yang lebih baik.',
  facts: [
    { label: 'Identitas', value: 'Bumi Kala Charta' },
    { label: 'Basis', value: 'Bandung, Indonesia' },
    { label: 'Fokus', value: 'Geodesi & geomatika' },
    { label: 'Bentuk praktik', value: 'Komunitas & konsultansi' },
  ],
};

export const missions = [
  { title: 'Menghasilkan pemahaman yang dapat dipercaya.', description: 'Mengolah pengukuran dan data geospasial dengan metode yang terukur, terdokumentasi, dan sesuai kebutuhan wilayah.' },
  { title: 'Mempertemukan ilmu dan pengalaman.', description: 'Membuka kolaborasi lintas disiplin serta melibatkan pengetahuan masyarakat dalam membaca persoalan ruang.' },
  { title: 'Membuat pengetahuan lebih mudah diakses.', description: 'Membagikan metode, temuan, dan pengalaman melalui publikasi, kelas, serta percakapan yang terbuka.' },
  { title: 'Menumbuhkan praktik yang bertanggung jawab.', description: 'Mempertimbangkan manfaat, keterbatasan data, dan dampak setiap pekerjaan bagi manusia serta lingkungan.' },
];

export const companyValues = [
  { ...values[0], icon: 'crosshair', practice: 'Sumber dicatat. Ketelitian dijelaskan. Asumsi dinyatakan.' },
  { ...values[1], icon: 'users', practice: 'Mendengar kebutuhan mitra dan memberi ruang pada perspektif lokal.' },
  { ...values[2], icon: 'book', practice: 'Dokumentasi menjadi bahan belajar yang bisa digunakan kembali.' },
  { title: 'Terus ingin tahu', description: 'Menjaga keberanian untuk bertanya, menguji, dan memperbaiki cara kerja.', icon: 'compass', practice: 'Setiap temuan membuka pertanyaan dan percobaan berikutnya.' },
  { title: 'Peduli pada konteks', description: 'Memahami bahwa setiap wilayah memiliki cerita dan kebutuhan yang berbeda.', icon: 'globe', practice: 'Metode mengikuti persoalan, bukan sekadar mengikuti perangkat.' },
  { title: 'Bertanggung jawab', description: 'Merawat kepercayaan, data, dan dampak dari setiap keputusan.', icon: 'check', practice: 'Penggunaan data disepakati dan batas hasil disampaikan dengan jelas.' },
];

export const capabilities = [
  { number: '01', title: 'Survei & pemetaan', icon: 'map', description: 'Mengenali kondisi wilayah melalui pengukuran lapangan dan penyusunan informasi spasial.', tags: ['Survei GNSS', 'Fotogrametri', 'Peta dasar'], output: 'Peta dasar, model elevasi, dokumentasi survei' },
  { number: '02', title: 'Riset & analisis geospasial', icon: 'scan', description: 'Membaca pola serta perubahan wilayah untuk membantu menjawab pertanyaan yang tepat.', tags: ['Citra satelit', 'Analisis spasial', 'WebGIS'], output: 'Peta tematik, kajian wilayah, visualisasi data' },
  { number: '03', title: 'Belajar & berbagi', icon: 'users', description: 'Mempertemukan pengetahuan teknis dengan pengalaman melalui ruang belajar bersama.', tags: ['Kelas lapangan', 'Diskusi', 'Pendampingan'], output: 'Modul belajar, lokakarya, catatan pengetahuan' },
];

export const workflow = [
  { title: 'Dengarkan', description: 'Memahami pertanyaan, konteks tempat, dan harapan mitra.' },
  { title: 'Rancang', description: 'Menyepakati lingkup, metode, keluaran, dan tahapan kerja.' },
  { title: 'Telusuri', description: 'Mengumpulkan data, menguji kualitas, dan membaca temuannya.' },
  { title: 'Bagikan', description: 'Menyampaikan hasil, mendokumentasikan proses, dan berefleksi.' },
];

export const milestones = [
  { year: '2022', title: 'Berawal dari percakapan', description: 'Lingkar belajar kecil bertemu untuk bertukar catatan tentang geodesi, geomatika, dan pengalaman lapangan.' },
  { year: '2023', title: 'Melangkah ke lapangan', description: 'Gagasan mulai diuji melalui eksplorasi pemetaan bersama dan dokumentasi metode sederhana.' },
  { year: '2024', title: 'Membuka ruang kolaborasi', description: 'Praktik proyek dan riset berkembang bersama rekan lintas disiplin serta komunitas lokal.' },
  { year: '2026', title: 'Membagikan lebih banyak', description: 'Pengetahuan dirangkai menjadi publikasi dan program belajar untuk menjangkau lebih banyak perspektif.' },
];

export const team = [
  { number: '01', title: 'Tim Geospasial', role: 'Survei & pengolahan data', description: 'Menjaga ketelitian pengukuran, kualitas data, dan kejelasan hasil pemetaan.', icon: 'map' },
  { number: '02', title: 'Tim Riset', role: 'Analisis & pengembangan metode', description: 'Menghubungkan pertanyaan wilayah dengan metode, kajian, dan temuan yang relevan.', icon: 'scan' },
  { number: '03', title: 'Tim Pengetahuan', role: 'Publikasi & ruang belajar', description: 'Mengubah pengalaman menjadi bacaan, materi belajar, dan percakapan bersama.', icon: 'book' },
  { number: '04', title: 'Tim Kolaborasi', role: 'Kemitraan & koordinasi', description: 'Merawat hubungan mitra dan memastikan proses kerja berjalan saling terbuka.', icon: 'users' },
];

export const partners = ['Komunitas & warga', 'Kampus & peneliti', 'Lembaga publik', 'Organisasi & pelaku usaha'];

export const questions = [
  { question: 'Siapa yang dapat berkolaborasi dengan BKC?', answer: 'Kami terbuka untuk komunitas, mahasiswa, peneliti, lembaga publik, dan pelaku usaha yang memiliki pertanyaan tentang ruang. Bentuk kerja sama dapat berupa proyek, riset bersama, atau kegiatan belajar.' },
  { question: 'Apakah semua kegiatan berlokasi di Bandung?', answer: 'Bandung menjadi titik berangkat kami. Lingkup wilayah, kebutuhan kunjungan lapangan, dan format pertemuan disepakati sesuai konteks setiap kolaborasi.' },
  { question: 'Apa yang perlu disiapkan untuk memulai proyek?', answer: 'Mulai dengan gambaran lokasi, persoalan yang ingin dijawab, data yang sudah tersedia, serta keluaran dan waktu yang diharapkan. Detail metode dan lingkup pekerjaan dapat dirumuskan bersama.' },
  { question: 'Apakah harus memiliki latar belakang geospasial?', answer: 'Tidak. Ruang belajar dan kolaborasi dapat mempertemukan beragam latar belakang. Pengalaman setempat, pertanyaan yang baik, dan kemauan untuk belajar sama berharganya dengan kemampuan teknis.' },
];
