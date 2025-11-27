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

export class TransaksiStok {
  constructor(idProduk, tipe, jumlah, waktu) {
    this.idProduk = idProduk; // ID produk
    this.tipe = tipe;         // "MASUK" atau "KELUAR"
    this.jumlah = jumlah;     // Jumlah produk yang ditransaksikan
    this.waktu = waktu;       // Timestamp transaksi
  }
}

export class PengelolaInventaris {
  constructor() {
    this.produk = [];        // Daftar semua produk
    this.transaksi = [];     // Daftar semua transaksi
  }

  // initial state: produk berisi daftar produk dengan stok berbeda
  // final state: mengembalikan daftar produk dengan stok terendah, terbatas sesuai limit
  produkStokRendah(batas) {
    let list = [];

    for (let i = 0; i < this.produk.length; i++) {
      let p = this.produk[i];
      list.push({ produk: p, stok: p.stokSekarang });
    }

    list.sort((a, b) => a.stok - b.stok);

    let hasil = [];
    for (let i = 0; i < batas && i < list.length; i++) {
      hasil.push(list[i].produk);
    }

    return hasil;
  }

  // initial state: produk berisi produk dengan stok maksimum berbeda
  // final state: mengembalikan produk yang stoknya di bawah threshold % dari stok maksimum
  produkDiBawahThreshold(persentase) {
    let hasil = [];

    for (let i = 0; i < this.produk.length; i++) {
      let p = this.produk[i];

      let batas = p.stokMax * (persentase / 100);

      if (p.stokSekarang < batas) {
        hasil.push(p);
      }
    }

    return hasil;
  }

  // initial state: transaksi berisi daftar semua transaksi
  // final state: mengembalikan daftar transaksi produk tertentu dalam rentang tanggal
  riwayatTransaksi(idProduk, tanggalMulai, tanggalAkhir) {
    let hasil = [];

    for (let i = 0; i < this.transaksi.length; i++) {
      let t = this.transaksi[i];

      if (t.idProduk === idProduk) {
        if (t.waktu >= tanggalMulai && t.waktu <= tanggalAkhir) {
          hasil.push(t);
        }
      }
    }

    return hasil;
  }

  // initial state: transaksi berisi sejarah penggunaan produk
  // final state: memprediksi tanggal kapan produk harus direstock berdasarkan rata-rata penggunaan
  prediksiTanggalRestock(idProduk) {
    let produk = null;
    for (let i = 0; i < this.produk.length; i++) {
      if (this.produk[i].id === idProduk) {
        produk = this.produk[i];
        break;
      }
    }

    if (!produk) return null;

    let totalKeluar = 0;
    let jumlahHari = 0;

    let tanggalPertama = null;
    let tanggalTerakhir = null;

    for (let i = 0; i < this.transaksi.length; i++) {
      let t = this.transaksi[i];

      if (t.idProduk === idProduk && t.tipe === "KELUAR") {
        totalKeluar += t.jumlah;

        if (tanggalPertama === null || t.waktu < tanggalPertama) {
          tanggalPertama = t.waktu;
        }
        if (tanggalTerakhir === null || t.waktu > tanggalTerakhir) {
          tanggalTerakhir = t.waktu;
        }
      }
    }

    if (tanggalPertama === null || tanggalTerakhir === null) {
      return null;
    }

    let selisihMs = tanggalTerakhir - tanggalPertama;
    jumlahHari = selisihMs / (1000 * 60 * 60 * 24);

    if (jumlahHari <= 0) return null;

    let rata = totalKeluar / jumlahHari;

    if (rata <= 0) return null;

    let sisa = produk.stokSekarang;
    let hariTersisa = sisa / rata;

    let tanggal = new Date();
    tanggal.setDate(tanggal.getDate() + Math.floor(hariTersisa));

    return tanggal;
  }

  // initial state: produk berisi daftar produk
  // final state: memperbarui stok beberapa produk sekaligus
  perbaruiStokBanyak(pembaruan) {
    for (let i = 0; i < pembaruan.length; i++) {
      let upd = pembaruan[i];

      for (let j = 0; j < this.produk.length; j++) {
        let p = this.produk[j];

        if (p.id === upd.idProduk) {
          p.stokSekarang = upd.stokBaru;
          break;
        }
      }
    }
  }
}
