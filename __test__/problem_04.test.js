import { Mahasiswa, MataKuliah, AnalisisKinerjaMahasiswa } from '../problem_04.js';
import { jest } from '@jest/globals';

describe('Problem 04: Analisis Kinerja Mahasiswa (Final Suite)', () => {
  let sistem;

  beforeEach(() => {
    sistem = new AnalisisKinerjaMahasiswa();
    sistem.tambahMahasiswa(new Mahasiswa(1, "Arvind", "IF"));
    sistem.tambahMahasiswa(new Mahasiswa(2, "Budi", "IF"));
    sistem.tambahMataKuliah(new MataKuliah("MK1", "Algo", 3));
  });

  // --- GROUP 1: HAPPY PATHS ---
  test('Hitung Mean Statistik', () => {
    sistem.catatNilai(1, "MK1", 90);
    sistem.catatNilai(2, "MK1", 80);
    const stats = sistem.dapatkanStatistikMataKuliah("MK1");
    expect(stats.mean).toBe(85);
  });

  test('Dapatkan Peringkat Mahasiswa', () => {
    sistem.catatNilai(1, "MK1", 90); // Ranking 1
    sistem.catatNilai(2, "MK1", 80); // Ranking 2
    
    expect(sistem.dapatkanPeringkatMahasiswa(1)).toBe(1);
    expect(sistem.dapatkanPeringkatMahasiswa(2)).toBe(2);
  });

  test('Laporan Jurusan', () => {
    const laporan = sistem.dapatkanLaporanJurusan("IF");
    expect(laporan.length).toBe(2);
    expect(laporan[0]).toHaveProperty("gpa");
  });

  // --- GROUP 2: EDGE CASES ---
  test('Division by Zero (Data Kosong)', () => {
    // Belum ada nilai masuk
    const stats = sistem.dapatkanStatistikMataKuliah("MK1");
    expect(stats.mean).toBe(0); // Handle safe return
  });

  test('Median Ganjil vs Genap', () => {
    // Test logika array index ganjil/genap
    sistem.tambahMahasiswa(new Mahasiswa(3, "C", "IF"));
    sistem.catatNilai(1, "MK1", 10);
    sistem.catatNilai(2, "MK1", 20);
    sistem.catatNilai(3, "MK1", 30);
    
    const stats = sistem.dapatkanStatistikMataKuliah("MK1");
    expect(stats.median).toBe(20);
  });
});