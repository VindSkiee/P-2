import { Kontak, PengelolaKontak } from '../problem_01.js';
import { jest } from '@jest/globals';

describe('Problem 01: Pengelola Kontak (Final Suite)', () => {
  let pengelola;

  beforeEach(() => {
    pengelola = new PengelolaKontak();
    pengelola.daftarKontak = [
      new Kontak(1, "Andi", "andi@mail.com", "0811", "TechCorp", ["client", "vip"]),
      new Kontak(2, "Budi", "budi@mail.com", "0812", "Innova", ["supplier"]),
      new Kontak(3, "Cindy", "cindy@mail.com", "0813", "Alpha", ["partner", "client"]),
      new Kontak(4, "Andika", "andika@mail.com", "0814", "Beta", ["client"]),
    ];
  });

  // --- GROUP 1: HAPPY PATHS (Fungsi Utama) ---
  test('Cari berdasarkan awalan nama (Prefix)', () => {
    const hasil = pengelola.cariBerdasarkanAwalanNama("An");
    expect(hasil.length).toBe(2); // Andi, Andika
    expect(hasil[0].nama).toMatch(/^An/);
  });

  test('Cari nama serupa (Levenshtein Distance)', () => {
    // "Andy" ke "Andi" jaraknya 1
    const hasil = pengelola.cariNamaSerupa("Andy", 1);
    expect(hasil.some(k => k.nama === "Andi")).toBe(true);
  });

  test('Temukan Duplikat (Case Insensitive)', () => {
    // Menambah "ANDI" (huruf besar semua) padahal "Andi" sudah ada
    pengelola.daftarKontak.push(new Kontak(99, "ANDI", "diff@mail.com", "000", "X", []));
    
    const duplikat = pengelola.temukanDuplikat();
    expect(duplikat.length).toBeGreaterThan(0);
    expect(duplikat.some(k => k.nama.toUpperCase() === "ANDI")).toBe(true);
  });

  test('Dapatkan Saran (Limit Result)', () => {
    pengelola.daftarKontak.push(new Kontak(6, "AndiX", "", "", "", []));
    pengelola.daftarKontak.push(new Kontak(7, "AndiY", "", "", "", []));
    
    const saran = pengelola.dapatkanSaran("Andi", 2); // Limit 2
    expect(saran.length).toBe(2);
  });

  // --- GROUP 2: EDGE CASES & VALIDATION ---
  test('Validasi Input: Cari dengan input kosong atau null', () => {
    expect(pengelola.cariBerdasarkanAwalanNama("")).toEqual([]);
    expect(pengelola.cariBerdasarkanAwalanNama(null)).toEqual([]);
  });

  test('Validasi Levenshtein: Jarak 0 (Exact Match)', () => {
    const hasil = pengelola.cariNamaSerupa("Budi", 0);
    expect(hasil.length).toBe(1);
    expect(hasil[0].nama).toBe("Budi");
  });
});