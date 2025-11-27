import { Kontak, PengelolaKontak } from './../problem_01.js';

function assert(condition, message) {
    if (condition) console.log(`✅ [PASS] ${message}`);
    else console.error(`❌ [FAIL] ${message}`);
}

console.log("=== TEST: problem_01 (Kontak) ===\n");

// Setup Data
const pengelola = new PengelolaKontak();
pengelola.daftarKontak = [
  new Kontak(1, "Andi", "andi@mail.com", "0811", "TechCorp", ["client", "vip"]),
  new Kontak(2, "Budi", "budi@mail.com", "0812", "Innova", ["supplier"]),
  new Kontak(3, "Cindy", "cindy@mail.com", "0813", "Alpha", ["partner", "client"]),
  new Kontak(4, "Andika", "andika@mail.com", "0814", "Beta", ["client"]),
  new Kontak(5, "Anita", "anita@mail.com", "0815", "TechCorp", ["vip"]),
];

console.log("--- Happy Path ---");
// 1. Prefix
const hasilPrefix = pengelola.cariBerdasarkanAwalanNama("An");
assert(hasilPrefix.length === 3, "Cari prefix 'An' harus return 3 kontak");

// 2. Fuzzy Search
const hasilFuzzy = pengelola.cariNamaSerupa("Andy", 2);
assert(hasilFuzzy.some(k => k.nama === "Andi"), "Fuzzy 'Andy' harus menemukan 'Andi'");

// 3. Duplikat (Simulasi duplikat)
pengelola.daftarKontak.push(new Kontak(6, "Andi", "duplicate@mail.com", "000", "X", []));
const hasilDuplikat = pengelola.temukanDuplikat();
assert(hasilDuplikat.length > 0, "Harus menemukan duplikat nama 'Andi'");

// 4. Suggestion
const saran = pengelola.dapatkanSaran("in", 3);
assert(saran.length > 0, "Harus ada saran nama mengandung 'in'");

// 5. Tags
const hasilTag = pengelola.dapatkanKontakBerdasarkanTag(["client"], false);
assert(hasilTag.length >= 3, "Filter tag client harus ada hasil");

console.log("\n⚠️ TEST EDGE CASES & NEGATIVE SCENARIOS ⚠️");

// 6. Case Insensitive Search
const hasilKecil = pengelola.cariBerdasarkanAwalanNama("an"); // huruf kecil
assert(hasilKecil.length === 3, "Prefix search harus case-insensitive ('an' == 'An')");

// 7. Not Found
const hasilZoro = pengelola.cariNamaSerupa("Zoro", 1);
assert(Array.isArray(hasilZoro) && hasilZoro.length === 0, "Search yg tidak ketemu harus return array kosong, bukan null/error");

// 8. Empty Input Fuzzy
try {
    const emptyFuzzy = pengelola.cariNamaSerupa("", 2);
    assert(Array.isArray(emptyFuzzy), "Input kosong pada fuzzy search harus aman");
} catch (e) {
    console.log(`ℹ️ Info: Sistem throw error pada empty input (${e.message}) - Diterima sebagai validasi.`);
}

// 9. Invalid Tag Input
const tagInvalid = pengelola.dapatkanKontakBerdasarkanTag([], true);
assert(Array.isArray(tagInvalid), "Input tag array kosong harus return array (kosong/semua) tanpa crash");

console.log("\n=== SELESAI TESTING ===");