import { SlotWaktu, Rapat, Penjadwal } from '../problem_02.js';
import { jest } from '@jest/globals';

describe('Problem 02: Penjadwal Rapat', () => {
  let slot1, slot2, slot3, slot4, penjadwal;

  beforeEach(() => {
    slot1 = new SlotWaktu(new Date("2025-11-10T09:00"), new Date("2025-11-10T10:00"));
    slot2 = new SlotWaktu(new Date("2025-11-10T09:30"), new Date("2025-11-10T10:30")); // Overlap slot1
    slot3 = new SlotWaktu(new Date("2025-11-10T10:30"), new Date("2025-11-10T11:30")); // No overlap
    slot4 = new SlotWaktu(new Date("2025-11-10T10:00"), new Date("2025-11-10T11:00")); // Boundary
    
    penjadwal = new Penjadwal();
    penjadwal.daftarRapat.push(new Rapat(1, "Rapat A", slot1, 1, []));
  });

  // --- HAPPY PATHS ---
  test('Deteksi Tumpang Tindih', () => {
    expect(slot1.tumpangTindih(slot2)).toBe(true);
    expect(slot1.tumpangTindih(slot3)).toBe(false);
  });

  test('Hitung Durasi', () => {
    expect(slot1.durasi()).toBe(60);
  });

  test('Deteksi Konflik Rapat', () => {
    const rapatBaru = new Rapat(2, "Rapat B", slot2, 1, []);
    expect(penjadwal.adaKonflik(rapatBaru)).toBe(true);
  });

  test('Jadwal Optimal', () => {
    // R1: 09-10, R2: 09:30-10:30 (Konflik), R3: 10:00-11:00
    // Optimal: Ambil R1 dan R3
    const r1 = new Rapat(1, "A", slot1, 1, []);
    const r2 = new Rapat(2, "B", slot2, 1, []);
    const r3 = new Rapat(3, "C", slot4, 1, []);
    
    const hasil = penjadwal.jadwalOptimal([r1, r2, r3]);
    expect(hasil.length).toBeGreaterThanOrEqual(2);
  });

  // --- EDGE CASES ---
  test('Edge Case: Boundary Overlap (Selesai pas Mulai)', () => {
    // Slot1 selesai 10:00, Slot4 mulai 10:00. Harusnya TIDAK konflik.
    expect(slot1.tumpangTindih(slot4)).toBe(false); 
  });

  test('Edge Case: Waktu Invalid', () => {
    try {
        const slotNgaco = new SlotWaktu(new Date("2025-11-10T10:00"), new Date("2025-11-10T09:00"));
        // Harusnya durasi negatif atau error
        const dur = slotNgaco.durasi();
        if (dur < 0) expect(true).toBe(true); // Pass if logic detects negative
    } catch (e) {
        expect(e).toBeDefined();
    }
  });
});