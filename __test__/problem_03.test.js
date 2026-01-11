import { Pengguna, Koneksi, JaringanSosial } from '../problem_03.js';
import { jest } from '@jest/globals';

describe('Problem 03: Jaringan Sosial (Final Suite)', () => {
  let js;

  beforeEach(() => {
    js = new JaringanSosial();
    js.pengguna = [
        new Pengguna(1, "A", ["coding"]),
        new Pengguna(2, "B", ["coding"]),
        new Pengguna(3, "C", ["music"]),
        new Pengguna(4, "D", ["travel"]), // User Terisolasi
    ];
    js.koneksi = [
        new Koneksi(1, 2, Date.now()), // A-B
        new Koneksi(2, 3, Date.now()), // B-C
    ];
  });

  // --- GROUP 1: HAPPY PATHS ---
  test('Shortest Path (BFS Algorithm)', () => {
    // Jarak A ke C adalah 2 (A -> B -> C)
    expect(js.derajatKoneksi(1, 3)).toBe(2);
  });

  test('Minat Sama (Intersection Himpunan)', () => {
    // A dan B sama-sama suka "coding"
    const hasil = js.cariPenggunaDenganMinatSama(1, 5);
    expect(hasil.some(u => u.id === 2)).toBe(true);
    expect(hasil.some(u => u.id === 3)).toBe(false);
  });

  // --- GROUP 2: EDGE CASES ---
  test('Graph Terputus (Disconnected)', () => {
    // A dan D tidak punya jalur koneksi
    const jarak = js.derajatKoneksi(1, 4);
    expect(jarak).toBe(-1); // Atau Infinity (sesuai implementasi)
  });

  test('User Tidak Ditemukan', () => {
    expect(() => js.sarankanTeman(99, 5)).not.toThrow();
    expect(js.sarankanTeman(99, 5)).toEqual([]);
  });
});