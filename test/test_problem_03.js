import { Pengguna, Koneksi, JaringanSosial } from './../problem_03.js';

console.log('=== TEST: problem_03 ===\n');

// Inisialisasi data awal
const js = new JaringanSosial();

// Tambah pengguna
js.pengguna.push(
  new Pengguna(1, "Arvind", ["coding", "musik", "fitness"]),
  new Pengguna(2, "Bima", ["coding", "game"]),
  new Pengguna(3, "Citra", ["musik", "design"]),
  new Pengguna(4, "Dewi", ["travel", "fitness"]),
  new Pengguna(5, "Eka", ["coding", "fitness", "game"]),
  new Pengguna(6, "Farhan", ["design", "coding"])
);

// Tambah koneksi (bidirectional)
js.koneksi.push(
  new Koneksi(1, 2, Date.now()),
  new Koneksi(2, 3, Date.now()),
  new Koneksi(3, 4, Date.now()),
  new Koneksi(2, 5, Date.now()),
  new Koneksi(5, 6, Date.now())
);

// 1️⃣ Test sarankanTeman
const saran = js.sarankanTeman(1, 3);
console.log("✅ Saran teman untuk Arvind:", saran.map(p => p.nama));

// 2️⃣ Test hitungTemanSama
const temanSama = js.hitungTemanSama(2, 3);
console.log("✅ Jumlah teman sama antara Bima dan Citra:", temanSama);

// 3️⃣ Test derajatKoneksi
const derajat = js.derajatKoneksi(1, 6);
console.log("✅ Derajat koneksi Arvind → Farhan:", derajat);

// 4️⃣ Test cariPenggunaDenganMinatSama
const minatSama = js.cariPenggunaDenganMinatSama(1, 3);
console.log("✅ Pengguna dengan minat mirip Arvind:", minatSama.map(p => p.nama));

// 5️⃣ Test penggunaPalingTerhubung
const topTerhubung = js.penggunaPalingTerhubung(2);
console.log("✅ Pengguna paling terhubung:", topTerhubung.map(p => p.nama));

console.log("\n🎯 Semua pengujian selesai dijalankan.\n");