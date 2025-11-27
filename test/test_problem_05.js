import { Produk, TransaksiStok, PengelolaInventaris } from './../problem_05.js';

function assert(condition, message) {
    if (condition) console.log(`✅ [PASS] ${message}`);
    else console.error(`❌ [FAIL] ${message}`);
}

console.log('=== TEST: problem_05 (Inventaris) ===\n');

const sistem = new PengelolaInventaris();
const p1 = new Produk(1, "A", "Kat", 10, 2, 20); // Stok 10
sistem.produk.push(p1);

console.log("--- Happy Path ---");
sistem.perbaruiStokBanyak([{ idProduk: 1, stokBaru: 15 }]);
assert(sistem.produk[0].stokSekarang === 15, "Update stok berhasil");

console.log("\n⚠️ TEST EDGE CASES & NEGATIVE SCENARIOS ⚠️");

// 1. Stok Negatif (CRITICAL)
// Coba paksa update stok jadi negatif
try {
    sistem.perbaruiStokBanyak([{ idProduk: 1, stokBaru: -5 }]);
    // Cek apakah stok berubah jadi -5?
    if (sistem.produk[0].stokSekarang < 0) {
        assert(false, "Sistem MEMBIARKAN stok negatif! (Logic Flaw)");
    } else {
        assert(true, "Sistem menolak/membiarkan stok tetap positif");
    }
} catch (e) {
    assert(true, "Sistem throw error untuk stok negatif (Good)");
}

// 2. Prediksi Tanpa Data
const prediksi = sistem.prediksiTanggalRestock(1); // Belum ada transaksi keluar
assert(prediksi === null, "Prediksi harus null jika tidak ada data histori");

// 3. Transaksi Produk Tidak Dikenal
try {
    const res = sistem.riwayatTransaksi(999, new Date(), new Date());
    assert(Array.isArray(res) && res.length === 0, "Transaksi ID gaib return array kosong");
} catch (e) {
    assert(true, "Handled error");
}

console.log("\n=== SELESAI TESTING ===");