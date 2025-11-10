// Kelas Pengguna
export class Pengguna {
  constructor(id, nama, minat) {
    this.id = id;            // ID unik pengguna
    this.nama = nama;        // Nama pengguna
    this.minat = minat;      // Array berisi minat pengguna
  }
}

// Kelas Koneksi
export class Koneksi {
  constructor(idPengguna1, idPengguna2, waktu) {
    this.idPengguna1 = idPengguna1; // ID pengguna pertama
    this.idPengguna2 = idPengguna2; // ID pengguna kedua
    this.waktu = waktu;             // Timestamp koneksi dibuat
  }
}

// Kelas Jaringan Sosial
export class JaringanSosial {
  constructor() {
    this.pengguna = [];     // Daftar semua pengguna
    this.koneksi = [];      // Daftar semua koneksi antar pengguna
  }

  // initial state: pengguna berisi daftar pengguna dengan beberapa koneksi
  // final state: mengembalikan daftar saran teman untuk pengguna tertentu, terbatas sesuai limit
  sarankanTeman(idPengguna, batas) {
    // implementasi logika di sini
  }

  // initial state: pengguna berisi daftar teman masing-masing pengguna
  // final state: mengembalikan jumlah teman yang sama antara dua pengguna
  hitungTemanSama(idPengguna1, idPengguna2) {
    // implementasi logika di sini
  }

  // initial state: pengguna berisi graph koneksi
  // final state: mengembalikan derajat koneksi antara dua pengguna
  derajatKoneksi(idPengguna1, idPengguna2) {
    // implementasi logika di sini
  }

  // initial state: pengguna berisi daftar minat masing-masing pengguna
  // final state: mengembalikan daftar pengguna yang memiliki minat sama, terbatas sesuai limit
  cariPenggunaDenganMinatSama(idPengguna, batas) {
    // implementasi logika di sini
  }

  // initial state: pengguna berisi daftar semua pengguna dan koneksi mereka
  // final state: mengembalikan daftar pengguna yang paling banyak memiliki koneksi, terbatas sesuai limit
  penggunaPalingTerhubung(batas) {
    // implementasi logika di sini
  }
}
