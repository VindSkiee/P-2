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
    this.daftarMahasiswa.push(mahasiswa);
  }

  // initial state: daftarMataKuliah kosong atau berisi beberapa objek MataKuliah
  // final state: objek MataKuliah baru ditambahkan ke daftarMataKuliah
  tambahMataKuliah(mataKuliah) {
    this.daftarMataKuliah.push(mataKuliah);
  }

  // initial state: Mahasiswa dan MataKuliah sudah terdaftar, belum ada nilai untuk kombinasi tertentu
  // final state: nilai mahasiswa untuk mata kuliah tertentu tersimpan di Map nilai
  catatNilai(idMahasiswa, kodeMataKuliah, skor) {
    for (let i = 0; i < this.daftarMahasiswa.length; i++) {
      let m = this.daftarMahasiswa[i];
      if (m.id === idMahasiswa) {
        m.nilai.set(kodeMataKuliah, skor);
        break;
      }
    }
  }

  hitungGPA(mahasiswa) {
    if (mahasiswa.nilai.size === 0) return 0;

    let totalSkorSKS = 0;
    let totalSKS = 0;

    for (let i = 0; i < this.daftarMataKuliah.length; i++) {
      let mk = this.daftarMataKuliah[i];
      if (mahasiswa.nilai.has(mk.kode)) {
        let nilai = mahasiswa.nilai.get(mk.kode);
        totalSkorSKS += nilai * mk.sks;
        totalSKS += mk.sks;
      }
    }

    if (totalSKS === 0) return 0;
    return totalSkorSKS / totalSKS;
  }

  // initial state: daftarMahasiswa sudah memiliki nilai di berbagai mata kuliah
  // final state: mengembalikan daftar n mahasiswa dengan nilai tertinggi (berdasarkan GPA)
  dapatkanMahasiswaTerbaik(jumlah) {
    let arr = this.daftarMahasiswa.map(m => ({
      mahasiswa: m,
      gpa: this.hitungGPA(m)
    }));

    arr.sort((a, b) => b.gpa - a.gpa);

    return arr.slice(0, jumlah).map(x => x.mahasiswa);
  }

  // initial state: daftarMahasiswa sudah memiliki GPA atau nilai per mata kuliah
  // final state: mengembalikan daftar mahasiswa dengan GPA di antara minGPA dan maxGPA
  cariMahasiswaBerdasarkanRentangGPA(minGPA, maxGPA) {
    let hasil = [];

    for (let i = 0; i < this.daftarMahasiswa.length; i++) {
      let m = this.daftarMahasiswa[i];
      let gpa = this.hitungGPA(m);

      if (gpa >= minGPA && gpa <= maxGPA) {
        hasil.push(m);
      }
    }

    return hasil;
  }

  // initial state: setiap mahasiswa memiliki nilai untuk mata kuliah tertentu
  // final state: mengembalikan statistik (mean, median, modus, dan standar deviasi) untuk satu mata kuliah
  dapatkanStatistikMataKuliah(kodeMataKuliah) {
    let nilaiList = [];

    for (let i = 0; i < this.daftarMahasiswa.length; i++) {
      let m = this.daftarMahasiswa[i];
      if (m.nilai.has(kodeMataKuliah)) {
        nilaiList.push(m.nilai.get(kodeMataKuliah));
      }
    }

    if (nilaiList.length === 0) {
      return {
        mean: 0,
        median: 0,
        modus: 0,
        standarDeviasi: 0
      };
    }

    let total = 0;
    for (let i = 0; i < nilaiList.length; i++) {
      total += nilaiList[i];
    }
    let rata = total / nilaiList.length;

    nilaiList.sort((a, b) => a - b);
    let median = 0;
    let mid = Math.floor(nilaiList.length / 2);
    if (nilaiList.length % 2 === 0) {
      median = (nilaiList[mid - 1] + nilaiList[mid]) / 2;
    } else {
      median = nilaiList[mid];
    }

    let frek = {};
    let modus = nilaiList[0];
    let maxFrek = 1;
    for (let i = 0; i < nilaiList.length; i++) {
      let v = nilaiList[i];
      if (!frek[v]) frek[v] = 0;
      frek[v]++;

      if (frek[v] > maxFrek) {
        maxFrek = frek[v];
        modus = v;
      }
    }

    let selisihTotal = 0;
    for (let i = 0; i < nilaiList.length; i++) {
      selisihTotal += Math.pow(nilaiList[i] - rata, 2);
    }
    let standarDeviasi = Math.sqrt(selisihTotal / nilaiList.length);

    return {
      mean: rata,
      median: median,
      modus: modus,
      standarDeviasi: standarDeviasi
    };
  }

  // initial state: daftarMahasiswa sudah memiliki nilai dan GPA
  // final state: mengembalikan peringkat (ranking) dari mahasiswa dengan id tertentu
  dapatkanPeringkatMahasiswa(idMahasiswa) {
    let arr = [];

    for (let i = 0; i < this.daftarMahasiswa.length; i++) {
      let m = this.daftarMahasiswa[i];
      arr.push({
        id: m.id,
        gpa: this.hitungGPA(m)
      });
    }

    arr.sort((a, b) => b.gpa - a.gpa);

    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id === idMahasiswa) {
        return i + 1;
      }
    }

    return -1;
  }

  // initial state: daftarMahasiswa berisi berbagai jurusan dan nilai
  // final state: mengembalikan laporan rekap nilai dan statistik berdasarkan satu jurusan
  dapatkanLaporanJurusan(jurusan) {
    let hasil = [];

    for (let i = 0; i < this.daftarMahasiswa.length; i++) {
      let m = this.daftarMahasiswa[i];
      if (m.jurusan === jurusan) {
        hasil.push({
          mahasiswa: m,
          gpa: this.hitungGPA(m)
        });
      }
    }

    return hasil;
  }
}