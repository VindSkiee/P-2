import { Produk, KatalogProduk } from './../problem_06.js';

function assert(condition, message) {
    if (condition) console.log(`✅ [PASS] ${message}`);
    else console.error(`❌ [FAIL] ${message}`);
}

console.log('=== TEST: problem_06 (Katalog) ===\n');

const katalog = new KatalogProduk();
// Harga: 500 (Murah), 10000 (Mahal)
katalog.tambahProduk(new Produk(1, "A", "Elek", 500, ["tag"], 4.5));
katalog.tambahProduk(new Produk(2, "B", "Elek", 10000, ["tag"], 4.0));

console.log("--- Happy Path ---");
assert(katalog.daftarProduk.length === 2, "Tambah produk sukses");
assert(katalog.cariBerdasarkanNama("A").length === 1, "Cari nama sukses");

console.log("\n⚠️ TEST EDGE CASES & NEGATIVE SCENARIOS ⚠️");

// 1. Undefined Filter (Partial Object)
// User cuma kirim kategori, harga dll undefined. Kode Naif suka crash disini karena akses property of undefined.
try {
    const filter = katalog.filterProduk({ kategori: "Elek" }); 
    assert(filter.length === 2, "Filter partial object harus jalan");
} catch (e) {
    assert(false, "Sistem crash saat filter tidak lengkap!");
}

// 2. Numeric Sorting Bug (10000 vs 500)
// Kalau pakai sorting string default, "10000" < "500". Harus numeric sort.
const sorted = katalog.dapatkanProdukTerurut("harga", "naik");
assert(sorted[0].id === 1 && sorted[1].id === 2, "Sorting harga harus numerik (500 < 10000)");

// 3. Auto complete limit
const auto = katalog.autoLengkap("Z", 5);
assert(Array.isArray(auto) && auto.length === 0, "Autocomplete tidak ketemu return array kosong");

console.log("\n=== SELESAI TESTING ===");