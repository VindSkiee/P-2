import { Produk, TransaksiStok, PengelolaInventaris } from '../problem_05.js';
import { jest } from '@jest/globals';

describe('Problem 05: Inventaris (Final Suite)', () => {
  let sistem;

  beforeEach(() => {
    sistem = new PengelolaInventaris();
    // Item A: Stok 10, Max 20
    sistem.produk.push(new Produk(1, "Item A", "Kat", 10, 2, 20));
  });

  // --- GROUP 1: HAPPY PATHS ---
  test('Update Stok Banyak (Batch)', () => {
    sistem.perbaruiStokBanyak([{ idProduk: 1, stokBaru: 15 }]);
    expect(sistem.produk[0].stokSekarang).toBe(15);
  });

  test('Produk di Bawah Threshold %', () => {
    // Stok 10 dari Max 20 = 50%.
    // Cari yg di bawah 60% -> Item A harusnya masuk.
    const kritis = sistem.produkDiBawahThreshold(60);
    expect(kritis.length).toBe(1);
    expect(kritis[0].nama).toBe("Item A");
  });

  test('Prediksi Restock (Rata-rata Penggunaan)', () => {
    const today = new Date();
    const yesterday = new Date(today); yesterday.setDate(today.getDate() - 1);
    
    // Keluar 2 kemarin, Keluar 2 hari ini -> Avg = 2/hari
    sistem.transaksi.push(new TransaksiStok(1, "KELUAR", 2, yesterday));
    sistem.transaksi.push(new TransaksiStok(1, "KELUAR", 2, today));
    
    const prediksi = sistem.prediksiTanggalRestock(1);
    expect(new Date(prediksi) > new Date()).toBe(true);
  });

  // --- GROUP 2: EDGE CASES (CRITICAL) ---
  test('Cegah Stok Negatif (Throw Error)', () => {
    expect(() => {
        // Memaksa stok jadi -5
        sistem.perbaruiStokBanyak([{ idProduk: 1, stokBaru: -5 }]);
    }).toThrow();
  });

  test('Validasi ID Produk Tidak Ada', () => {
     expect(() => {
        sistem.perbaruiStokBanyak([{ idProduk: 999, stokBaru: 10 }]);
    }).toThrow();
  });
});