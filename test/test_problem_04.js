import { Mahasiswa, MataKuliah, AnalisisKinerjaMahasiswa } from './../problem_04.js';

console.log('=== TEST: problem_04 ===\n');

// 1️⃣ Buat instance utama dan data awal
const sistem = new AnalisisKinerjaMahasiswa();

const mhs1 = new Mahasiswa(1, "Arvind", "Informatika");
const mhs2 = new Mahasiswa(2, "Budi", "Informatika");
const mhs3 = new Mahasiswa(3, "Citra", "Sistem Informasi");

const mk1 = new MataKuliah("IF101", "Algoritma", 3);
const mk2 = new MataKuliah("IF102", "Basis Data", 3);
const mk3 = new MataKuliah("SI201", "Manajemen Proyek", 2);

console.log("✅ Test tambahMahasiswa & tambahMataKuliah (sebelum implementasi)");
sistem.tambahMahasiswa(mhs1);
sistem.tambahMahasiswa(mhs2);
sistem.tambahMahasiswa(mhs3);

sistem.tambahMataKuliah(mk1);
sistem.tambahMataKuliah(mk2);
sistem.tambahMataKuliah(mk3);

console.log("Jumlah mahasiswa:", sistem.daftarMahasiswa.length === 3);
console.log("Jumlah mata kuliah:", sistem.daftarMataKuliah.length === 3);

// 2️⃣ Catat nilai mahasiswa
console.log("\n✅ Test catatNilai");
sistem.catatNilai(1, "IF101", 85);
sistem.catatNilai(1, "IF102", 90);
sistem.catatNilai(2, "IF101", 75);
sistem.catatNilai(2, "IF102", 70);
sistem.catatNilai(3, "SI201", 88);

console.log("Nilai Arvind Algoritma:", mhs1.nilai.get("IF101") === 85);
console.log("Nilai Budi Basis Data:", mhs2.nilai.get("IF102") === 70);

// 3️⃣ Test dapatkanMahasiswaTerbaik
console.log("\n✅ Test dapatkanMahasiswaTerbaik");
const top = sistem.dapatkanMahasiswaTerbaik(2);
console.log("Mahasiswa terbaik ditemukan:", Array.isArray(top));
console.log("Jumlah hasil <= 2:", top.length <= 2);

// 4️⃣ Test cariMahasiswaBerdasarkanRentangGPA
console.log("\n✅ Test cariMahasiswaBerdasarkanRentangGPA");
const rentang = sistem.cariMahasiswaBerdasarkanRentangGPA(2.5, 4.0);
console.log("Mahasiswa dalam rentang GPA ditemukan:", Array.isArray(rentang));

// 5️⃣ Test dapatkanStatistikMataKuliah
console.log("\n✅ Test dapatkanStatistikMataKuliah");
const statistik = sistem.dapatkanStatistikMataKuliah("IF101");
console.log("Statistik mata kuliah berupa object:", typeof statistik === "object");

// 6️⃣ Test dapatkanPeringkatMahasiswa
console.log("\n✅ Test dapatkanPeringkatMahasiswa");
const peringkat = sistem.dapatkanPeringkatMahasiswa(1);
console.log("Peringkat berupa angka:", typeof peringkat === "number");

// 7️⃣ Test dapatkanLaporanJurusan
console.log("\n✅ Test dapatkanLaporanJurusan");
const laporan = sistem.dapatkanLaporanJurusan("Informatika");
console.log("Laporan jurusan berupa object:", typeof laporan === "object");

console.log("\n🎯 Semua pengujian template dijalankan (silakan lengkapi implementasi fungsi di class AnalisisKinerjaMahasiswa).\n");
