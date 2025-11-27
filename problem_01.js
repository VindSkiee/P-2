export class Kontak {
  constructor(id, nama, email, telepon, perusahaan, tag) {
    this.id = id;
    this.nama = nama;
    this.email = email;
    this.telepon = telepon;
    this.perusahaan = perusahaan;
    this.tag = tag;
  }
}

export class PengelolaKontak {
  constructor() {
    this.daftarKontak = [];
  }

  // initial state: daftarKontak berisi beberapa kontak dengan berbagai nama
  // final state: mengembalikan daftar kontak yang namanya diawali dengan prefix tertentu
  cariBerdasarkanAwalanNama(prefix) {
    let hasil = [];

    for (let i = 0; i < this.daftarKontak.length; i++) {
      let nama = this.daftarKontak[i].nama.toLowerCase();
      let awalan = prefix.toLowerCase();

      if (nama.startsWith(awalan)) {
        hasil.push(this.daftarKontak[i]);
      }
    }

    return hasil;
  }

  // initial state: daftarKontak berisi beberapa kontak dengan nama berbeda
  // final state: mengembalikan daftar kontak yang memiliki kemiripan nama dengan query tertentu (berdasarkan jarak Levenshtein)
  cariNamaSerupa(kueri, jarakMaksimum) {
    let hasil = [];
    let kueriLower = kueri.toLowerCase();

    for (let i = 0; i < this.daftarKontak.length; i++) {
      let namaKontak = this.daftarKontak[i].nama.toLowerCase();

      let a = kueriLower;
      let b = namaKontak;
      let matrix = [];

      for (let x = 0; x <= a.length; x++) {
        matrix[x] = [x];
      }
      for (let y = 0; y <= b.length; y++) {
        matrix[0][y] = y;
      }

      // Mengisi matrix
      for (let x = 1; x <= a.length; x++) {
        for (let y = 1; y <= b.length; y++) {
          let biaya = (a[x - 1] === b[y - 1]) ? 0 : 1;

          matrix[x][y] = Math.min(
            matrix[x - 1][y] + 1,
            matrix[x][y - 1] + 1,
            matrix[x - 1][y - 1] + biaya
          );
        }
      }

      let jarak = matrix[a.length][b.length];

      if (jarak <= jarakMaksimum) {
        hasil.push(this.daftarKontak[i]);
      }
    }

    return hasil;
  }

  // initial state: daftarKontak berisi beberapa kontak dengan nama dan email yang mungkin berulang
  // final state: mengembalikan daftar kontak yang terdeteksi sebagai duplikat berdasarkan nama atau email
  temukanDuplikat() {
    let duplikat = [];

    for (let i = 0; i < this.daftarKontak.length; i++) {
      for (let j = i + 1; j < this.daftarKontak.length; j++) {
        let a = this.daftarKontak[i];
        let b = this.daftarKontak[j];

        if (
          a.nama.toLowerCase() === b.nama.toLowerCase() ||
          a.email.toLowerCase() === b.email.toLowerCase()
        ) {
          if (!duplikat.includes(a)) duplikat.push(a);
          if (!duplikat.includes(b)) duplikat.push(b);
        }
      }
    }

    return duplikat;
  }

  // initial state: daftarKontak berisi beberapa kontak dengan berbagai nama
  // final state: mengembalikan daftar saran nama kontak berdasarkan potongan nama (partialName) dengan batas jumlah tertentu
  dapatkanSaran(namaParsial, batas) {
    let hasil = [];
    let parsial = namaParsial.toLowerCase();

    for (let i = 0; i < this.daftarKontak.length; i++) {
      let nama = this.daftarKontak[i].nama.toLowerCase();

      if (nama.includes(parsial)) {
        hasil.push(this.daftarKontak[i]);
      }

      if (hasil.length === batas) break;
    }

    return hasil;
  }

  // initial state: daftarKontak berisi beberapa kontak dengan tag yang berbeda
  // final state: mengembalikan daftar kontak yang memiliki tag sesuai dengan kriteria (semua atau salah satu)
  dapatkanKontakBerdasarkanTag(tag, cocokSemua) {
    // cocokSemua: true = semua tag harus cocok (AND)
    // cocokSemua: false = minimal satu tag cocok (OR)
    let hasil = [];

    for (let i = 0; i < this.daftarKontak.length; i++) {
      let kontak = this.daftarKontak[i];
      let tagKontak = kontak.tag.map(t => t.toLowerCase());
      let cocok = false;

      if (cocokSemua) {
        cocok = true;
        for (let j = 0; j < tag.length; j++) {
          if (!tagKontak.includes(tag[j].toLowerCase())) {
            cocok = false;
            break;
          }
        }
      } else {
        for (let j = 0; j < tag.length; j++) {
          if (tagKontak.includes(tag[j].toLowerCase())) {
            cocok = true;
            break;
          }
        }
      }

      if (cocok) hasil.push(kontak);
    }

    return hasil;
  }
}
