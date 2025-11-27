import { SlotWaktu, Rapat, Penjadwal } from './../problem_02.js';

function assert(condition, message) {
    if (condition) console.log(`✅ [PASS] ${message}`);
    else console.error(`❌ [FAIL] ${message}`);
}

console.log('=== TEST: problem_02 (Penjadwal) ===\n');

// Setup Data
const slot1 = new SlotWaktu(new Date("2025-11-10T09:00"), new Date("2025-11-10T10:00"));
const slot2 = new SlotWaktu(new Date("2025-11-10T09:30"), new Date("2025-11-10T10:30"));
const slot3 = new SlotWaktu(new Date("2025-11-10T10:30"), new Date("2025-11-10T11:30"));
const rapat1 = new Rapat(1, "Rapat Tim", slot1, 1, ["A"]);
const penjadwal = new Penjadwal();
penjadwal.daftarRapat.push(rapat1);

console.log("--- Happy Path ---");
assert(slot1.tumpangTindih(slot2) === true, "Deteksi tumpang tindih overlap");
assert(slot1.tumpangTindih(slot3) === false, "Deteksi tidak tumpang tindih");
assert(slot1.durasi() === 60, "Hitung durasi menit benar");
assert(penjadwal.adaKonflik(new Rapat(2, "X", slot2, 1, ["B"])) === true, "Deteksi konflik jadwal");

console.log("\n⚠️ TEST EDGE CASES & NEGATIVE SCENARIOS ⚠️");

// 1. Invalid Date Logic (Start > End)
try {
    const slotNgaco = new SlotWaktu(new Date("2025-11-10T10:00"), new Date("2025-11-10T09:00"));
    // Jika class memvalidasi di constructor atau method durasi:
    const d = slotNgaco.durasi(); 
    if (d < 0) assert(false, "Durasi tidak boleh negatif!");
    else assert(true, "Handling invalid date (pass if no crash, but logic suspect)");
} catch (e) {
    assert(true, "Sistem throw error untuk invalid date (Good)");
}

// 2. Boundary Overlap (Rapat A selesai 10:00, Rapat B mulai 10:00) -> Harusnya TIDAK konflik
// Slot 1: 09:00 - 10:00. Slot A: 10:00 - 11:00
const slotBatas = new SlotWaktu(new Date("2025-11-10T10:00"), new Date("2025-11-10T11:00"));
assert(slot1.tumpangTindih(slotBatas) === false, "Boundary touch (10:00) seharusnya TIDAK tumpang tindih");

// 3. Empty Optimization
const opt = penjadwal.jadwalOptimal([]);
assert(Array.isArray(opt) && opt.length === 0, "Optimasi input kosong harus return array kosong");

console.log("\n=== SELESAI TESTING ===");