import { Mahasiswa, MataKuliah, AnalisisKinerjaMahasiswa } from './../problem_04.js';

function assert(condition, message) {
    if (condition) console.log(`✅ [PASS] ${message}`);
    else console.error(`❌ [FAIL] ${message}`);
}

console.log('=== TEST: problem_04 (Analisis Kinerja) ===\n');

const sistem = new AnalisisKinerjaMahasiswa();
const mhs1 = new Mahasiswa(1, "A", "IF");
const mk1 = new MataKuliah("IF1", "Algo", 3);
sistem.tambahMahasiswa(mhs1);
sistem.tambahMataKuliah(mk1);
sistem.catatNilai(1, "IF1", 100);

console.log("--- Happy Path ---");
assert(sistem.dapatkanMahasiswaTerbaik(1).length === 1, "Get Top 1 berhasil");
assert(sistem.dapatkanStatistikMataKuliah("IF1").mean === 100, "Statistik Mean benar");

console.log("\n⚠️ TEST EDGE CASES & NEGATIVE SCENARIOS ⚠️");

// 1. Request Lebih dari Total Data
const topN = sistem.dapatkanMahasiswaTerbaik(100); 
assert(topN.length === 1, "Request top 100 tapi cuma ada 1 data, harus return 1 (no crash)");

// 2. Statistik Mata Kuliah Kosong (Division by Zero Risk)
const mk2 = new MataKuliah("IF2", "Kosong", 3);
sistem.tambahMataKuliah(mk2);
const stats = sistem.dapatkanStatistikMataKuliah("IF2");
// Cek apakah mean NaN atau 0 atau null, yang penting jangan crash
assert(stats.mean === 0 || isNaN(stats.mean) || stats === null, "Statistik data kosong aman (tidak crash)");

// 3. Peringkat Mahasiswa Tidak Ada
const rank = sistem.dapatkanPeringkatMahasiswa(999);
assert(rank === -1 || rank === 0 || rank === null, "Peringkat ID gaib harus -1/null");

console.log("\n=== SELESAI TESTING ===");