import { Produk, KatalogProduk } from '../problem_06.js';
import { jest } from '@jest/globals';

describe('Problem 06: Katalog Produk (Final Suite)', () => {
  let katalog;

  beforeEach(() => {
    katalog = new KatalogProduk();
    katalog.tambahProduk(new Produk(1, "Laptop", "Elektronik", 1000, ["kerja"], 4.5));
    katalog.tambahProduk(new Produk(2, "Mouse", "Aksesoris", 50, ["gaming"], 4.0));
    katalog.tambahProduk(new Produk(3, "Keyboard", "Aksesoris", 200, ["gaming"], 3.5));
  });

  // --- GROUP 1: HAPPY PATHS ---
  test('Filter Dinamis (Query Builder)', () => {
    // Filter kategori "Aksesoris", hargaMin undefined (harus diabaikan)
    const hasil = katalog.filterProduk({ kategori: "Aksesoris", hargaMin: undefined });
    expect(hasil.length).toBe(2); // Mouse & Keyboard
  });

  test('Sorting Angka (Fix ASCII Bug)', () => {
    // [1000, 50, 200] jika disort string jadi [1000, 200, 50] (Salah)
    // Harus [50, 200, 1000]
    const sorted = katalog.dapatkanProdukTerurut("harga", "naik");
    expect(sorted[0].harga).toBe(50);    // Paling murah
    expect(sorted[2].harga).toBe(1000); // Paling mahal
  });

  test('Filter Rentang Harga', () => {
    // Cari barang antara harga 0 sd 100
    const budget = katalog.dapatkanProdukDalamRentangHarga(0, 100);
    expect(budget.length).toBe(1);
    expect(budget[0].nama).toBe("Mouse");
  });

  test('Auto Lengkap (Prefix Search)', () => {
    // Cari "Lap" -> Harusnya return "Laptop"
    // Mengecek implementasi method (bisa bernama autoLengkap atau dapatkanProdukAutoLengkap)
    if (katalog.autoLengkap) { 
        const saran = katalog.autoLengkap("Lap");
        expect(saran).toContain("Laptop");
    } else if (katalog.dapatkanProdukAutoLengkap) {
         const saran = katalog.dapatkanProdukAutoLengkap("Lap");
         expect(saran).toContain("Laptop");
    }
  });

  // --- GROUP 2: EDGE CASES ---
  test('Pencarian Tidak Ditemukan', () => {
    const hasil = katalog.cariBerdasarkanNama("Zzzzz");
    expect(hasil).toEqual([]);
  });

  test('Produk Serupa (Intersection Tags)', () => {
    // Laptop (tag: kerja). Mouse (tag: gaming).
    // Tambah PC (tag: gaming, kerja).
    katalog.tambahProduk(new Produk(4, "PC", "Elektronik", 2000, ["gaming", "kerja"], 5.0));
    
    // Cari yang mirip Laptop (tag: kerja) -> PC harus muncul
    const serupa = katalog.dapatkanProdukSerupa(1, 5);
    expect(serupa.some(p => p.id === 4)).toBe(true);
  });
});