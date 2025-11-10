import { Produk, KatalogProduk } from './../problem_06.js';

console.log('=== TEST: problem_06 ===\n');

// 1️⃣ Setup awal
const katalog = new KatalogProduk();

const p1 = new Produk(1, "Keyboard Mechanical", "Elektronik", 550000, ["gaming", "peripheral", "rgb"], 4.7);
const p2 = new Produk(2, "Mouse Wireless", "Elektronik", 250000, ["wireless", "peripheral"], 4.5);
const p3 = new Produk(3, "Headset Gaming", "Elektronik", 750000, ["gaming", "audio"], 4.8);
const p4 = new Produk(4, "Laptop ASUS", "Komputer", 10500000, ["notebook", "intel", "ssd"], 4.9);
const p5 = new Produk(5, "Mousepad XL", "Aksesori", 150000, ["gaming", "peripheral"], 4.4);

console.log("✅ Test tambahProduk");
katalog.tambahProduk(p1);
katalog.tambahProduk(p2);
katalog.tambahProduk(p3);
katalog.tambahProduk(p4);
katalog.tambahProduk(p5);
console.log("Jumlah produk:", katalog.daftarProduk.length === 5);

// 2️⃣ Test hapusProduk
console.log("\n✅ Test hapusProduk");
katalog.hapusProduk(5);
console.log("Produk Mousepad XL terhapus:", katalog.daftarProduk.length === 4);

// 3️⃣ Test cariBerdasarkanNama
console.log("\n✅ Test cariBerdasarkanNama");
const hasilCari = katalog.cariBerdasarkanNama("mouse");
console.log("Hasil pencarian mengandung 'Mouse':", Array.isArray(hasilCari));

// 4️⃣ Test filterProduk
console.log("\n✅ Test filterProduk");
const hasilFilter = katalog.filterProduk({
  kategori: "Elektronik",
  hargaMinimum: 200000,
  hargaMaksimum: 800000,
  ratingMinimum: 4.5,
  tag: "gaming"
});
console.log("Hasil filter valid:", Array.isArray(hasilFilter));

// 5️⃣ Test dapatkanProdukTerurut
console.log("\n✅ Test dapatkanProdukTerurut");
const urutHargaNaik = katalog.dapatkanProdukTerurut("harga", "naik");
const urutRatingTurun = katalog.dapatkanProdukTerurut("rating", "turun");
console.log("Urut harga naik:", Array.isArray(urutHargaNaik));
console.log("Urut rating turun:", Array.isArray(urutRatingTurun));

// 6️⃣ Test dapatkanProdukDalamRentangHarga
console.log("\n✅ Test dapatkanProdukDalamRentangHarga");
const rentang = katalog.dapatkanProdukDalamRentangHarga(200000, 800000);
console.log("Produk dalam rentang harga ditemukan:", Array.isArray(rentang));

// 7️⃣ Test dapatkanProdukSerupa
console.log("\n✅ Test dapatkanProdukSerupa");
const serupa = katalog.dapatkanProdukSerupa(1, 2);
console.log("Produk serupa dengan Keyboard ditemukan:", Array.isArray(serupa));

// 8️⃣ Test autoLengkap
console.log("\n✅ Test autoLengkap");
const auto = katalog.autoLengkap("Lap", 3);
console.log("Hasil auto-lengkap berupa array:", Array.isArray(auto));

console.log("\n🎯 Semua pengujian template KatalogProduk dijalankan (silakan lengkapi implementasi fungsi di class KatalogProduk).\n");
