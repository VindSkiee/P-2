export class Kontak {
  constructor(id, nama, email, telepon, perusahaan, tag) {
    this.id = id;
    this.nama = nama;
    this.email = email;
    this.telepon = telepon;
    this.perusahaan = perusahaan;
    this.tag = tag; // Array berisi label/kategori kontak
  }
}

export class PengelolaKontak {
  constructor() {
    this.daftarKontak = [];
  }

  // initial state: daftarKontak berisi beberapa kontak dengan berbagai nama
  // final state: mengembalikan daftar kontak yang namanya diawali dengan prefix tertentu
  cariBerdasarkanAwalanNama(prefix) {
    
  }

  // initial state: daftarKontak berisi beberapa kontak dengan nama berbeda
  // final state: mengembalikan daftar kontak yang memiliki kemiripan nama dengan query tertentu (berdasarkan jarak Levenshtein)
  cariNamaSerupa(kueri, jarakMaksimum) {
    
  }

  // initial state: daftarKontak berisi beberapa kontak dengan nama dan email yang mungkin berulang
  // final state: mengembalikan daftar kontak yang terdeteksi sebagai duplikat berdasarkan nama atau email
  temukanDuplikat() {
    
  }

  // initial state: daftarKontak berisi beberapa kontak dengan berbagai nama
  // final state: mengembalikan daftar saran nama kontak berdasarkan potongan nama (partialName) dengan batas jumlah tertentu
  dapatkanSaran(namaParsial, batas) {
    
  }

  // initial state: daftarKontak berisi beberapa kontak dengan tag yang berbeda
  // final state: mengembalikan daftar kontak yang memiliki tag sesuai dengan kriteria (semua atau salah satu)
  dapatkanKontakBerdasarkanTag(tag, cocokSemua) {
    // cocokSemua: true = semua tag harus cocok (AND)
    // cocokSemua: false = minimal satu tag cocok (OR)
    
  }
}
