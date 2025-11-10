export class Produk {
  constructor(id, nama, kategori, harga, tag, rating) {
    this.id = id;
    this.nama = nama;
    this.kategori = kategori;
    this.harga = harga;
    this.tag = tag; // array berisi label/kata kunci produk
    this.rating = rating;
  }
}

export class KatalogProduk {
  constructor() {
    this.daftarProduk = [];
  }

  // initial state: daftarProduk kosong atau sudah berisi beberapa produk
  // final state: produk baru ditambahkan ke dalam daftarProduk
  tambahProduk(produk) {
    
  }

  // initial state: daftarProduk berisi beberapa produk dengan id unik
  // final state: produk dengan id tertentu dihapus dari daftarProduk
  hapusProduk(idProduk) {
    
  }

  // initial state: daftarProduk berisi produk dengan berbagai nama
  // final state: mengembalikan daftar produk yang nama-nya mengandung kata kunci tertentu
  cariBerdasarkanNama(kueri) {
    
  }

  // initial state: daftarProduk berisi produk dengan kategori, harga, rating, dan tag berbeda
  // final state: mengembalikan daftar produk yang sesuai dengan kriteria filter yang diberikan
  filterProduk(kriteria) {
    // kriteria: { kategori, hargaMinimum, hargaMaksimum, ratingMinimum, tag }
    
  }

  // initial state: daftarProduk berisi produk dengan atribut harga, rating, dan nama
  // final state: mengembalikan daftar produk yang sudah diurutkan berdasarkan atribut tertentu
  dapatkanProdukTerurut(urutBerdasarkan, urutan) {
    // urutBerdasarkan: 'harga' | 'rating' | 'nama'
    // urutan: 'naik' atau 'turun'
    
  }

  // initial state: daftarProduk berisi produk dengan berbagai harga
  // final state: mengembalikan daftar produk yang berada dalam rentang harga tertentu
  dapatkanProdukDalamRentangHarga(minimum, maksimum) {
    
  }

  // initial state: daftarProduk berisi produk dengan berbagai kategori dan tag
  // final state: mengembalikan daftar produk yang mirip dengan produk tertentu berdasarkan tag atau kategori
  dapatkanProdukSerupa(idProduk, batas) {
    
  }

  // initial state: daftarProduk berisi produk dengan berbagai nama
  // final state: mengembalikan daftar nama produk yang dimulai dengan prefix tertentu (auto-complete)
  autoLengkap(prefix, batas) {
    
  }
}
