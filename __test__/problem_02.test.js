import { SlotWaktu, Rapat, Penjadwal } from '../problem_02.js';
import { jest } from '@jest/globals';

describe('Problem 02: Penjadwal Rapat (Final Suite)', () => {
  let slot1, slot2, slot3, penjadwal;

  beforeEach(() => {
    // Slot 1: 09:00 - 10:00
    slot1 = new SlotWaktu(new Date("2025-01-01T09:00"), new Date("2025-01-01T10:00"));
    // Slot 2: 09:30 - 10:30 (Overlap dengan Slot 1)
    slot2 = new SlotWaktu(new Date("2025-01-01T09:30"), new Date("2025-01-01T10:30"));
    // Slot 3: 10:00 - 11:00 (Berurutan dengan Slot 1)
    slot3 = new SlotWaktu(new Date("2025-01-01T10:00"), new Date("2025-01-01T11:00"));
    
    penjadwal = new Penjadwal();
  });

  // --- GROUP 1: HAPPY PATHS ---
  test('Jadwal Optimal (Greedy Algorithm)', () => {
    // Skenario: R1 (09-10), R2 (09:30-10:30), R3 (10-11)
    // Optimal: R1 dan R3 (Total 2 rapat)
    const r1 = new Rapat(1, "A", slot1, 1, []);
    const r2 = new Rapat(2, "B", slot2, 1, []);
    const r3 = new Rapat(3, "C", slot3, 1, []);
    
    const hasil = penjadwal.jadwalOptimal([r1, r2, r3]);
    expect(hasil.length).toBe(2);
    expect(hasil.some(r => r.id === 2)).toBe(false); // R2 harus dibuang
  });

  test('Cari Slot Alternatif saat Konflik', () => {
    const r1 = new Rapat(1, "Existing", slot1, 1, []); // 09-10
    penjadwal.daftarRapat.push(r1);

    const rKonflik = new Rapat(2, "Baru", slot2, 1, []); // 09:30-10:30
    
    // Harus menyarankan slot setelah 10:00
    const alternatif = penjadwal.cariSlotAlternatif(rKonflik, r1);
    expect(alternatif.length).toBeGreaterThan(0);
    expect(alternatif[0].mulai.getTime()).toBeGreaterThanOrEqual(slot1.selesai.getTime());
  });

  // --- GROUP 2: EDGE CASES & VALIDATION ---
  test('Validasi: Waktu Mulai > Selesai (Throw Error)', () => {
    expect(() => {
      new SlotWaktu(new Date("2025-01-01T10:00"), new Date("2025-01-01T09:00"));
    }).toThrow(); 
  });

  test('Boundary: Overlap tepat di menit akhir', () => {
    // 09:00-10:00 vs 10:00-11:00 TIDAK boleh dianggap overlap
    expect(slot1.tumpangTindih(slot3)).toBe(false);
  });

  test('Cari Slot Tersedia (Iterasi Waktu)', () => {
    penjadwal.daftarRapat = [new Rapat(1, "A", slot1, 1, []), new Rapat(2, "C", slot3, 1, [])];
    // Cari slot 30 menit antara 11:00 - 12:00
    const tersedia = penjadwal.cariSlotTersedia(1, new Date("2025-01-01"), 30);
    expect(tersedia.length).toBeGreaterThan(0);
  });
});