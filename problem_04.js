export class Mahasiswa {
  constructor(id, nama, jurusan) {
    this.id = id;
    this.nama = nama;
    this.jurusan = jurusan;
    this.nilai = new Map(); // key: kodeMataKuliah, value: skor
  }
}

export class MataKuliah {
  constructor(kode, nama, sks) {
    this.kode = kode;
    this.nama = nama;
    this.sks = sks;
  }
}

export class AnalisisKinerjaMahasiswa {
  constructor() {
    this.daftarMahasiswa = [];
    this.daftarMataKuliah = [];
  }

  // initial state: daftarMahasiswa kosong atau berisi beberapa objek Mahasiswa
  // final state: objek Mahasiswa baru ditambahkan ke daftarMahasiswa
  tambahMahasiswa(mahasiswa) {
    
  }

  // initial state: daftarMataKuliah kosong atau berisi beberapa objek MataKuliah
  // final state: objek MataKuliah baru ditambahkan ke daftarMataKuliah
  tambahMataKuliah(mataKuliah) {
    
  }

  // initial state: Mahasiswa dan MataKuliah sudah terdaftar, belum ada nilai untuk kombinasi tertentu
  // final state: nilai mahasiswa untuk mata kuliah tertentu tersimpan di Map nilai
  catatNilai(idMahasiswa, kodeMataKuliah, skor) {
    
  }

  // initial state: daftarMahasiswa sudah memiliki nilai di berbagai mata kuliah
  // final state: mengembalikan daftar n mahasiswa dengan nilai tertinggi (berdasarkan GPA)
  dapatkanMahasiswaTerbaik(jumlah) {
    
  }

  // initial state: daftarMahasiswa sudah memiliki GPA atau nilai per mata kuliah
  // final state: mengembalikan daftar mahasiswa dengan GPA di antara minGPA dan maxGPA
  cariMahasiswaBerdasarkanRentangGPA(minGPA, maxGPA) {
    
  }

  // initial state: setiap mahasiswa memiliki nilai untuk mata kuliah tertentu
  // final state: mengembalikan statistik (rata-rata, median, modus, dan standar deviasi) untuk satu mata kuliah
  dapatkanStatistikMataKuliah(kodeMataKuliah) {
    
  }

  // initial state: daftarMahasiswa sudah memiliki nilai dan GPA
  // final state: mengembalikan peringkat (ranking) dari mahasiswa dengan id tertentu
  dapatkanPeringkatMahasiswa(idMahasiswa) {
    
  }

  // initial state: daftarMahasiswa berisi berbagai jurusan dan nilai
  // final state: mengembalikan laporan rekap nilai dan statistik berdasarkan satu jurusan
  dapatkanLaporanJurusan(jurusan) {
    
  }
}
