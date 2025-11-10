// Kelas Produk
export class Produk {
  constructor(id, nama, kategori, stokSekarang, stokMin, stokMax) {
    this.id = id;                // ID unik produk
    this.nama = nama;            // Nama produk
    this.kategori = kategori;    // Kategori produk
    this.stokSekarang = stokSekarang; // Jumlah stok saat ini
    this.stokMin = stokMin;      // Stok minimum
    this.stokMax = stokMax;      // Stok maksimum
  }
}

// Kelas Transaksi Stok
export class TransaksiStok {
  constructor(idProduk, tipe, jumlah, waktu) {
    this.idProduk = idProduk; // ID produk
    this.tipe = tipe;         // "MASUK" atau "KELUAR"
    this.jumlah = jumlah;     // Jumlah produk yang ditransaksikan
    this.waktu = waktu;       // Timestamp transaksi
  }
}

// Kelas Pengelola Inventaris
export class PengelolaInventaris {
  constructor() {
    this.produk = [];        // Daftar semua produk
    this.transaksi = [];     // Daftar semua transaksi
  }

  // initial state: produk berisi daftar produk dengan stok berbeda
  // final state: mengembalikan daftar produk dengan stok terendah, terbatas sesuai limit
  produkStokRendah(batas) {
    // implementasi logika di sini
  }

  // initial state: produk berisi produk dengan stok maksimum berbeda
  // final state: mengembalikan produk yang stoknya di bawah threshold % dari stok maksimum
  produkDiBawahThreshold(persentase) {
    // implementasi logika di sini
  }

  // initial state: transaksi berisi daftar semua transaksi
  // final state: mengembalikan daftar transaksi produk tertentu dalam rentang tanggal
  riwayatTransaksi(idProduk, tanggalMulai, tanggalAkhir) {
    // implementasi logika di sini
  }

  // initial state: transaksi berisi sejarah penggunaan produk
  // final state: memprediksi tanggal kapan produk harus direstock berdasarkan rata-rata penggunaan
  prediksiTanggalRestock(idProduk) {
    // implementasi logika di sini
  }

  // initial state: produk berisi daftar produk
  // final state: memperbarui stok beberapa produk sekaligus
  perbaruiStokBanyak(pembaruan) {
    // pembaruan: Array of {idProduk, stokBaru}
  }
}
