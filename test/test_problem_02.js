import { SlotWaktu, Rapat, Penjadwal } from './../problem_02.js';

console.log('=== TEST: problem_02 ===\n');

// Buat beberapa objek dasar
const slot1 = new SlotWaktu(new Date("2025-11-10T09:00"), new Date("2025-11-10T10:00"));
const slot2 = new SlotWaktu(new Date("2025-11-10T09:30"), new Date("2025-11-10T10:30"));
const slot3 = new SlotWaktu(new Date("2025-11-10T10:30"), new Date("2025-11-10T11:30"));

// 1️⃣ Test tumpang tindih
console.log("✅ Test tumpangTindih:", slot1.tumpangTindih(slot2) === true);
console.log("✅ Test tidak tumpangTindih:", slot1.tumpangTindih(slot3) === false);

// 2️⃣ Test durasi
console.log("✅ Durasi 60 menit:", slot1.durasi() === 60);

// 3️⃣ Test adaKonflik
const rapat1 = new Rapat(1, "Rapat Tim", slot1, 1, ["A", "B"]);
const rapat2 = new Rapat(2, "Rapat Klien", slot2, 1, ["C"]);
const penjadwal = new Penjadwal();
penjadwal.daftarRapat.push(rapat1);
console.log("✅ Ada konflik waktu:", penjadwal.adaKonflik(rapat2) === true);

// 4️⃣ Test cariSlotTersedia
const rapat3 = new Rapat(3, "Rapat Siang", slot3, 1, ["D"]);
penjadwal.daftarRapat.push(rapat3);
const slotKosong = penjadwal.cariSlotTersedia(1, new Date("2025-11-10"), 30);
console.log("✅ Slot tersedia terdeteksi:", slotKosong.length > 0);

// 5️⃣ Test jadwalOptimal
const rapat4 = new Rapat(4, "Rapat Baru", new SlotWaktu(new Date("2025-11-10T13:00"), new Date("2025-11-10T14:00")), 1, ["E"]);
console.log("✅ Jadwal optimal menambah rapat baru:", penjadwal.jadwalOptimal([rapat4]).length === 1);

// 6️⃣ Test cariSlotAlternatif
const alternatif = penjadwal.cariSlotAlternatif(rapat2, rapat1);
console.log("✅ Alternatif slot dihasilkan:", alternatif.length === 3);

// 7️⃣ Test dapatkanRapatDalamRentang
const hasilRentang = penjadwal.dapatkanRapatDalamRentang(new Date("2025-11-10T08:00"), new Date("2025-11-10T12:00"));
console.log("✅ Rapat dalam rentang waktu ditemukan:", hasilRentang.length >= 2);

console.log("\n🎯 Semua pengujian selesai dijalankan.\n");