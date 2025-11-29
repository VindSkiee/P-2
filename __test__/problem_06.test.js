import { Produk, KatalogProduk } from '../problem_06.js';
import { jest } from '@jest/globals';

describe('Problem 06: Katalog Produk', () => {
  let katalog;

  beforeEach(() => {
    katalog = new KatalogProduk();
    katalog.tambahProduk(new Produk(1, "Laptop", "Elek", 1000, ["kerja"], 4.5));
    katalog.tambahProduk(new Produk(2, "Mouse", "Aks", 50, ["gaming"], 4.0));
    katalog.tambahProduk(new Produk(3, "Keyboard", "Aks", 200, ["gaming"], 3.5));
  });

  // --- HAPPY PATHS ---
  test('Tambah dan Hapus Produk', () => {
    katalog.hapusProduk(2);
    expect(katalog.daftarProduk.length).toBe(2);
    expect(katalog.daftarProduk.find(p => p.id === 2)).toBeUndefined();
  });

  test('Cari dan Filter', () => {
    const hasil = katalog.cariBerdasarkanNama("Lap");
    expect(hasil.length).toBe(1);
    
    const filter = katalog.filterProduk({ kategori: "Elek" });
    expect(filter.length).toBe(1);
  });

  test('Sorting', () => {
    const sorted = katalog.dapatkanProdukTerurut("harga", "naik");
    expect(sorted[0].harga).toBe(50); // Mouse
    expect(sorted[2].harga).toBe(1000); // Laptop
  });

  // --- EDGE CASES ---
  test('Edge Case: Filter Undefined', () => {
    const hasil = katalog.filterProduk({}); // Filter kosong
    expect(hasil.length).toBe(3); // Harusnya return semua
  });

  test('Edge Case: Sorting String vs Number', () => {
    // Pastikan 1000 tidak dianggap lebih kecil dari 200 (lexicographical sort)
    const sorted = katalog.dapatkanProdukTerurut("harga", "naik");
    expect(sorted[0].harga).toBe(50);
    expect(sorted[1].harga).toBe(200);
    expect(sorted[2].harga).toBe(1000);
  });
});