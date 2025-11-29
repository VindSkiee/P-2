import { Kontak, PengelolaKontak } from '../problem_01.js';
import { jest } from '@jest/globals';

describe('Problem 01: Pengelola Kontak', () => {
  let pengelola;

  beforeEach(() => {
    pengelola = new PengelolaKontak();
    pengelola.daftarKontak = [
      new Kontak(1, "Andi", "andi@mail.com", "0811", "TechCorp", ["client", "vip"]),
      new Kontak(2, "Budi", "budi@mail.com", "0812", "Innova", ["supplier"]),
      new Kontak(3, "Cindy", "cindy@mail.com", "0813", "Alpha", ["partner", "client"]),
      new Kontak(4, "Andika", "andika@mail.com", "0814", "Beta", ["client"]),
      new Kontak(5, "Anita", "anita@mail.com", "0815", "TechCorp", ["vip"]),
    ];
  });

  // --- HAPPY PATHS (Manual Anda) ---
  test('Cari berdasarkan awalan nama', () => {
    const hasil = pengelola.cariBerdasarkanAwalanNama("An");
    expect(hasil.length).toBe(3); // Andi, Andika, Anita
  });

  test('Cari nama serupa (Fuzzy)', () => {
    const hasil = pengelola.cariNamaSerupa("Andy", 2);
    expect(hasil.some(k => k.nama === "Andi")).toBe(true);
  });

  test('Temukan duplikat', () => {
    pengelola.daftarKontak.push(new Kontak(6, "Andi", "duplicate@mail.com", "000", "X", []));
    const hasil = pengelola.temukanDuplikat();
    expect(hasil.length).toBeGreaterThan(0);
  });

  test('Dapatkan saran nama', () => {
    const saran = pengelola.dapatkanSaran("in", 3);
    expect(saran.length).toBeGreaterThan(0);
  });

  test('Filter berdasarkan Tag', () => {
    const hasil = pengelola.dapatkanKontakBerdasarkanTag(["client"], false);
    expect(hasil.length).toBeGreaterThanOrEqual(2);
  });

  // --- EDGE CASES (Tambahan Skripsi) ---
  test('Edge Case: Input Kosong pada Fuzzy Search', () => {
    const hasil = pengelola.cariNamaSerupa("", 2);
    expect(Array.isArray(hasil)).toBe(true); // Jangan crash
  });

  test('Edge Case: Case Insensitivity', () => {
    const hasil = pengelola.cariBerdasarkanAwalanNama("an"); // huruf kecil
    expect(hasil.length).toBe(3);
  });
});