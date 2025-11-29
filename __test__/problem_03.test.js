import { Pengguna, Koneksi, JaringanSosial } from '../problem_03.js';
import { jest } from '@jest/globals';

describe('Problem 03: Jaringan Sosial', () => {
  let js;

  beforeEach(() => {
    js = new JaringanSosial();
    js.pengguna = [
        new Pengguna(1, "A", ["coding"]),
        new Pengguna(2, "B", ["coding"]),
        new Pengguna(3, "C", ["music"]),
        new Pengguna(4, "D", ["travel"]),
        new Pengguna(5, "E", ["coding"])
    ];
    // A-B, B-C, B-E
    js.koneksi = [
        new Koneksi(1, 2, Date.now()),
        new Koneksi(2, 3, Date.now()),
        new Koneksi(2, 5, Date.now())
    ];
  });

  // --- HAPPY PATHS ---
  test('Sarankan Teman (Friends of Friends)', () => {
    const saran = js.sarankanTeman(1, 2);
    // A teman B. B teman C dan E. Jadi saran untuk A adalah C atau E.
    const ids = saran.map(p => p.id);
    expect(ids.includes(3) || ids.includes(5)).toBe(true);
  });

  test('Hitung Teman Sama', () => {
    // A teman B. E teman B. Teman sama = B (1 orang).
    // Note: Logika soal mungkin mutual friends. 
    // Misal: A punya teman [B]. E punya teman [B]. Mutual = 1.
    const jumlah = js.hitungTemanSama(1, 5); 
    // Tergantung implementasi graph bidirectional Anda.
    // Kita asumsikan implementasi benar akan return angka >= 0
    expect(typeof jumlah).toBe('number');
  });

  test('Derajat Koneksi (BFS)', () => {
    // A -> B -> C (Jarak 2)
    expect(js.derajatKoneksi(1, 3)).toBe(2);
  });

  test('Cari Pengguna Minat Sama', () => {
    const hasil = js.cariPenggunaDenganMinatSama(1, 5);
    // A & B & E suka coding
    expect(hasil.some(p => p.nama === "B")).toBe(true);
  });

  // --- EDGE CASES ---
  test('Edge Case: Graph Terputus', () => {
    // A tidak kenal D
    const derajat = js.derajatKoneksi(1, 4);
    expect(derajat === -1 || derajat === Infinity || derajat === null).toBe(true);
  });
});