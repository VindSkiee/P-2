import { Pengguna, Koneksi, JaringanSosial } from './../problem_03.js';

function assert(condition, message) {
    if (condition) console.log(`✅ [PASS] ${message}`);
    else console.error(`❌ [FAIL] ${message}`);
}

console.log('=== TEST: problem_03 (Jaringan Sosial) ===\n');

const js = new JaringanSosial();
// 1 -> 2 -> 3
// 4 (Terisolasi)
js.pengguna.push(
  new Pengguna(1, "A", ["coding"]),
  new Pengguna(2, "B", ["coding"]),
  new Pengguna(3, "C", ["music"]),
  new Pengguna(4, "D", ["travel"]) 
);
js.koneksi.push(new Koneksi(1, 2, Date.now()), new Koneksi(2, 3, Date.now()));

console.log("--- Happy Path ---");
assert(js.derajatKoneksi(1, 2) === 1, "Derajat koneksi langsung adalah 1");
assert(js.derajatKoneksi(1, 3) === 2, "Derajat koneksi via teman adalah 2");

console.log("\n⚠️ TEST EDGE CASES & NEGATIVE SCENARIOS ⚠️");

// 1. No Connection (Graph Terputus)
const path = js.derajatKoneksi(1, 4);
assert(path === -1 || path === Infinity, "Derajat koneksi terputus harus -1 atau Infinity");

// 2. Self Connection
const selfPath = js.derajatKoneksi(1, 1);
assert(selfPath === 0, "Derajat ke diri sendiri harus 0");

// 3. Invalid ID
try {
    const invalidUser = js.sarankanTeman(999, 1);
    assert(Array.isArray(invalidUser) && invalidUser.length === 0, "ID tidak ditemukan harus return array kosong/handle error");
} catch (e) {
    assert(true, "Error handling untuk ID 999 berjalan");
}

console.log("\n=== SELESAI TESTING ===");