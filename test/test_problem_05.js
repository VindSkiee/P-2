import { Produk, TransaksiStok, PengelolaInventaris } from './../problem_05.js';

console.log('=== TEST: problem_05 ===\n');

// 1️⃣ Buat instance utama & data produk awal
const sistem = new PengelolaInventaris();

const p1 = new Produk(1, "Kabel LAN", "Elektronik", 10, 5, 50);
const p2 = new Produk(2, "Adaptor 12V", "Elektronik", 3, 2, 30);
const p3 = new Produk(3, "Router Wi-Fi", "Jaringan", 1, 3, 20);
const p4 = new Produk(4, "CCTV Hikvision", "Keamanan", 20, 5, 40);

sistem.produk.push(p1, p2, p3, p4);

console.log("✅ Produk berhasil ditambahkan:", sistem.produk.length === 4);

// 2️⃣ Test produk stok rendah
console.log("\n✅ Test produkStokRendah");
const stokRendah = sistem.produkStokRendah(2);
console.log("Mengembalikan array:", Array.isArray(stokRendah));
console.log("Maksimal 2 produk:", stokRendah.length <= 2);

// 3️⃣ Test produk di bawah threshold stok maksimum
console.log("\n✅ Test produkDiBawahThreshold");
const bawahThreshold = sistem.produkDiBawahThreshold(20); // contoh 20%
console.log("Hasil berupa array:", Array.isArray(bawahThreshold));

// 4️⃣ Tambah transaksi contoh
console.log("\n✅ Menambahkan transaksi stok");
const t1 = new TransaksiStok(1, "KELUAR", 5, new Date("2025-11-01"));
const t2 = new TransaksiStok(1, "KELUAR", 3, new Date("2025-11-05"));
const t3 = new TransaksiStok(1, "MASUK", 10, new Date("2025-11-08"));
const t4 = new TransaksiStok(2, "KELUAR", 2, new Date("2025-11-03"));
const t5 = new TransaksiStok(3, "KELUAR", 1, new Date("2025-11-07"));

sistem.transaksi.push(t1, t2, t3, t4, t5);

console.log("Transaksi berhasil ditambahkan:", sistem.transaksi.length === 5);

// 5️⃣ Test riwayat transaksi
console.log("\n✅ Test riwayatTransaksi");
const riwayat = sistem.riwayatTransaksi(1, new Date("2025-11-01"), new Date("2025-11-07"));
console.log("Hasil berupa array:", Array.isArray(riwayat));
console.log("Transaksi dalam rentang:", riwayat.every(t => t.idProduk === 1));

// 6️⃣ Test prediksi tanggal restock
console.log("\n✅ Test prediksiTanggalRestock");
const prediksi = sistem.prediksiTanggalRestock(1);
console.log("Prediksi berupa Date atau null:", prediksi instanceof Date || prediksi === null);

// 7️⃣ Test perbaruiStokBanyak
console.log("\n✅ Test perbaruiStokBanyak");
sistem.perbaruiStokBanyak([
  { idProduk: 1, stokBaru: 25 },
  { idProduk: 3, stokBaru: 5 },
]);
const produkDiperbarui = sistem.produk.find(p => p.id === 1).stokSekarang === 25;
console.log("Stok produk berhasil diperbarui:", produkDiperbarui);

console.log("\n🎯 Semua pengujian template PengelolaInventaris dijalankan (silakan lengkapi implementasi fungsi di class PengelolaInventaris).\n");
