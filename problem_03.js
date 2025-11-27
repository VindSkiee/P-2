export class Pengguna {
  constructor(id, nama, minat) {
    this.id = id;            // ID unik pengguna
    this.nama = nama;        // Nama pengguna
    this.minat = minat;      // Array berisi minat pengguna
  }
}

export class Koneksi {
  constructor(idPengguna1, idPengguna2, waktu) {
    this.idPengguna1 = idPengguna1; // ID pengguna pertama
    this.idPengguna2 = idPengguna2; // ID pengguna kedua
    this.waktu = waktu;             // Timestamp koneksi dibuat
  }
}

export class JaringanSosial {
  constructor() {
    this.pengguna = [];     // Daftar semua pengguna
    this.koneksi = [];      // Daftar semua koneksi antar pengguna
  }

  // initial state: pengguna berisi daftar pengguna dengan beberapa koneksi
  // final state: mengembalikan daftar saran teman untuk pengguna tertentu, terbatas sesuai limit
  sarankanTeman(idPengguna, batas) {
    let hasil = [];
    let sudahTeman = [];

    // cari teman yang sudah terhubung
    for (let i = 0; i < this.koneksi.length; i++) {
      let k = this.koneksi[i];
      if (k.idPengguna1 === idPengguna) {
        sudahTeman.push(k.idPengguna2);
      } else if (k.idPengguna2 === idPengguna) {
        sudahTeman.push(k.idPengguna1);
      }
    }

    // usulkan yang bukan teman
    for (let i = 0; i < this.pengguna.length; i++) {
      let p = this.pengguna[i];

      if (p.id !== idPengguna && !sudahTeman.includes(p.id)) {
        hasil.push(p);
      }
    }

    // batasi hasil
    return hasil.slice(0, batas);
  }

  // initial state: pengguna berisi daftar teman masing-masing pengguna
  // final state: mengembalikan jumlah teman yang sama antara dua pengguna
  hitungTemanSama(idPengguna1, idPengguna2) {
    let teman1 = [];
    let teman2 = [];

    // ambil teman pengguna 1
    for (let i = 0; i < this.koneksi.length; i++) {
      let k = this.koneksi[i];
      if (k.idPengguna1 === idPengguna1) teman1.push(k.idPengguna2);
      if (k.idPengguna2 === idPengguna1) teman1.push(k.idPengguna1);
    }

    // ambil teman pengguna 2
    for (let i = 0; i < this.koneksi.length; i++) {
      let k = this.koneksi[i];
      if (k.idPengguna1 === idPengguna2) teman2.push(k.idPengguna2);
      if (k.idPengguna2 === idPengguna2) teman2.push(k.idPengguna1);
    }

    // hitung yang sama
    let jumlah = 0;
    for (let i = 0; i < teman1.length; i++) {
      if (teman2.includes(teman1[i])) {
        jumlah++;
      }
    }

    return jumlah;
  }

  // initial state: pengguna berisi graph koneksi
  // final state: mengembalikan derajat koneksi antara dua pengguna
  derajatKoneksi(idPengguna1, idPengguna2) {
    for (let i = 0; i < this.koneksi.length; i++) {
      let k = this.koneksi[i];
      if (
        (k.idPengguna1 === idPengguna1 && k.idPengguna2 === idPengguna2) ||
        (k.idPengguna1 === idPengguna2 && k.idPengguna2 === idPengguna1)
      ) {
        return 1;
      }
    }

    // cek teman dari teman (degree 2)
    let teman1 = [];
    for (let i = 0; i < this.koneksi.length; i++) {
      let k = this.koneksi[i];
      if (k.idPengguna1 === idPengguna1) teman1.push(k.idPengguna2);
      if (k.idPengguna2 === idPengguna1) teman1.push(k.idPengguna1);
    }

    for (let i = 0; i < teman1.length; i++) {
      let t = teman1[i];
      for (let j = 0; j < this.koneksi.length; j++) {
        let k = this.koneksi[j];
        if (
          (k.idPengguna1 === t && k.idPengguna2 === idPengguna2) ||
          (k.idPengguna2 === t && k.idPengguna1 === idPengguna2)
        ) {
          return 2;
        }
      }
    }

    return -1;
  }

  // initial state: pengguna berisi daftar minat masing-masing pengguna
  // final state: mengembalikan daftar pengguna yang memiliki minat sama, terbatas sesuai limit
  cariPenggunaDenganMinatSama(idPengguna, batas) {
    let penggunaTarget = null;

    // cari pengguna target
    for (let i = 0; i < this.pengguna.length; i++) {
      if (this.pengguna[i].id === idPengguna) {
        penggunaTarget = this.pengguna[i];
        break;
      }
    }

    let hasil = [];

    // cari yang punya minat sama
    for (let i = 0; i < this.pengguna.length; i++) {
      let p = this.pengguna[i];

      if (p.id !== idPengguna) {
        for (let j = 0; j < p.minat.length; j++) {
          if (penggunaTarget.minat.includes(p.minat[j])) {
            hasil.push(p);
            break;
          }
        }
      }
    }

    return hasil.slice(0, batas);
  }

  // initial state: pengguna berisi daftar semua pengguna dan koneksi mereka
  // final state: mengembalikan daftar pengguna yang paling banyak memiliki koneksi, terbatas sesuai limit
  penggunaPalingTerhubung(batas) {
    let hitung = {};

    // hitung koneksi
    for (let i = 0; i < this.koneksi.length; i++) {
      let k = this.koneksi[i];

      if (!hitung[k.idPengguna1]) hitung[k.idPengguna1] = 0;
      if (!hitung[k.idPengguna2]) hitung[k.idPengguna2] = 0;

      hitung[k.idPengguna1]++;
      hitung[k.idPengguna2]++;
    }

    // ubah ke array
    let arr = [];
    for (let id in hitung) {
      arr.push({ id: Number(id), jumlah: hitung[id] });
    }

    // sort sederhana
    arr.sort((a, b) => b.jumlah - a.jumlah);

    // ambil datanya
    let hasil = [];
    for (let i = 0; i < arr.length && i < batas; i++) {
      for (let j = 0; j < this.pengguna.length; j++) {
        if (this.pengguna[j].id === arr[i].id) {
          hasil.push(this.pengguna[j]);
          break;
        }
      }
    }

    return hasil;
  }
}
