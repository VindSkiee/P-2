export class SlotWaktu {
  constructor(mulai, selesai) {
    this.mulai = mulai;   // Objek Date
    this.selesai = selesai; // Objek Date
  }

  // initial state: dua slot waktu sudah diketahui (this dan other)
  // final state: mengembalikan true jika kedua slot waktu saling tumpang tindih (overlap)
  tumpangTindih(denganSlotLain) {
    let mulaiA = this.mulai.getTime();
    let selesaiA = this.selesai.getTime();
    let mulaiB = denganSlotLain.mulai.getTime();
    let selesaiB = denganSlotLain.selesai.getTime();

    if (mulaiA < selesaiB && selesaiA > mulaiB) {
      return true;
    } else {
      return false;
    }
  }

  // initial state: slot waktu memiliki waktu mulai dan selesai yang valid
  // final state: mengembalikan durasi waktu (dalam menit atau jam) antara mulai dan selesai
  durasi() {
    let start = this.mulai.getTime();
    let end = this.selesai.getTime();
    let selisih = end - start; // milidetik

    let menit = Math.floor(selisih / 60000);
    return menit;
  }
}

export class Rapat {
  constructor(id, judul, slotWaktu, idRuang, peserta) {
    this.id = id;
    this.judul = judul;
    this.slotWaktu = slotWaktu; // Objek SlotWaktu
    this.idRuang = idRuang;
    this.peserta = peserta; // Array nama/id peserta
  }
}

export class RuangRapat {
  constructor(id, nama, kapasitas) {
    this.id = id;
    this.nama = nama;
    this.kapasitas = kapasitas;
  }
}

export class Penjadwal {
  constructor() {
    this.daftarRapat = [];
    this.daftarRuang = [];
  }

  // initial state: daftarRapat sudah berisi beberapa rapat dengan slot waktu tertentu
  // final state: mengembalikan true jika rapat baru memiliki konflik waktu dengan rapat lain di ruang yang sama
  adaKonflik(rapat) {
    for (let i = 0; i < this.daftarRapat.length; i++) {
      let r = this.daftarRapat[i];

      if (r.idRuang === rapat.idRuang) {

        let overlap = r.slotWaktu.tumpangTindih(rapat.slotWaktu);

        if (overlap) {
          return true;
        }
      }
    }

    return false;
  }

  // initial state: daftarRapat berisi rapat-rapat di berbagai ruang dan waktu
  // final state: mengembalikan daftar slot waktu kosong (tidak terpakai) pada tanggal dan durasi tertentu di ruang yang diminta
  cariSlotTersedia(idRuang, tanggal, durasi) {
    let hasil = [];

    let rapatDiRuang = [];
    for (let i = 0; i < this.daftarRapat.length; i++) {
      if (this.daftarRapat[i].idRuang === idRuang) {
        rapatDiRuang.push(this.daftarRapat[i]);
      }
    }

    for (let i = 0; i < rapatDiRuang.length; i++) {
      for (let j = 0; j < rapatDiRuang.length - 1; j++) {
        if (rapatDiRuang[j].slotWaktu.mulai.getTime() >
            rapatDiRuang[j + 1].slotWaktu.mulai.getTime()) {
          
          let temp = rapatDiRuang[j];
          rapatDiRuang[j] = rapatDiRuang[j + 1];
          rapatDiRuang[j + 1] = temp;
        }
      }
    }

    let mulaiHari = new Date(tanggal);
    mulaiHari.setHours(8, 0, 0, 0);

    let selesaiHari = new Date(tanggal);
    selesaiHari.setHours(17, 0, 0, 0);

    let durasiMs = durasi * 60000;

    if (rapatDiRuang.length > 0) {
      let pertama = rapatDiRuang[0].slotWaktu.mulai.getTime();
      if (pertama - mulaiHari.getTime() >= durasiMs) {
        hasil.push(new SlotWaktu(new Date(mulaiHari), new Date(pertama)));
      }
    } else {
      let slotEnd = new Date(mulaiHari.getTime() + durasiMs);
      if (slotEnd.getTime() <= selesaiHari.getTime()) {
        hasil.push(new SlotWaktu(new Date(mulaiHari), slotEnd));
      }
      return hasil;
    }

    for (let i = 0; i < rapatDiRuang.length - 1; i++) {
      let endA = rapatDiRuang[i].slotWaktu.selesai.getTime();
      let startB = rapatDiRuang[i + 1].slotWaktu.mulai.getTime();

      if (startB - endA >= durasiMs) {
        hasil.push(new SlotWaktu(new Date(endA), new Date(startB)));
      }
    }

    let lastEnd = rapatDiRuang[rapatDiRuang.length - 1].slotWaktu.selesai.getTime();
    if (selesaiHari.getTime() - lastEnd >= durasiMs) {
      hasil.push(new SlotWaktu(new Date(lastEnd), new Date(lastEnd + durasiMs)));
    }

    return hasil;
  }

  // initial state: daftar rapat dan daftar ruang sudah diketahui
  // final state: menjadwalkan rapat-rapat ke ruang yang paling optimal dengan meminimalkan konflik waktu
  jadwalOptimal(daftarRapat) {
    let hasil = [];

    for (let i = 0; i < daftarRapat.length; i++) {
      let r = daftarRapat[i];

      let ditempatkan = false;
      for (let j = 0; j < this.daftarRuang.length; j++) {

        r.idRuang = this.daftarRuang[j].id;

        let konflik = false;
        for (let k = 0; k < hasil.length; k++) {
          if (hasil[k].idRuang === r.idRuang &&
              hasil[k].slotWaktu.tumpangTindih(r.slotWaktu)) {
            konflik = true;
            break;
          }
        }

        if (!konflik) {
          hasil.push(r);
          ditempatkan = true;
          break;
        }
      }

      if (!ditempatkan) {
        console.log("Rapat " + r.judul + " tidak bisa dijadwalkan.");
      }
    }

    return hasil;
  }

  // initial state: daftarRapat berisi beberapa rapat dengan konflik waktu tertentu
  // final state: mengembalikan daftar alternatif waktu yang memungkinkan rapat diatur ulang tanpa konflik
  cariSlotAlternatif(rapat, rapatBerkonflik) {
    let alternatif = [];

    for (let i = 30; i <= 180; i += 30) {

      let waktuBaruMulai = new Date(rapat.slotWaktu.mulai.getTime() + i * 60000);
      let waktuBaruSelesai = new Date(rapat.slotWaktu.selesai.getTime() + i * 60000);

      let slotBaru = new SlotWaktu(waktuBaruMulai, waktuBaruSelesai);

      let konflik = false;

      for (let j = 0; j < this.daftarRapat.length; j++) {
        let r = this.daftarRapat[j];

        if (r.idRuang === rapat.idRuang) {
          if (slotBaru.tumpangTindih(r.slotWaktu)) {
            konflik = true;
            break;
          }
        }
      }

      if (!konflik) {
        alternatif.push(slotBaru);
      }
    }

    return alternatif;
  }

  // initial state: daftarRapat berisi rapat-rapat dengan waktu mulai dan selesai
  // final state: mengembalikan daftar rapat yang berlangsung dalam rentang waktu tertentu
  dapatkanRapatDalamRentang(tanggalMulai, tanggalSelesai) {
    let hasil = [];

    let mulai = tanggalMulai.getTime();
    let selesai = tanggalSelesai.getTime();

    for (let i = 0; i < this.daftarRapat.length; i++) {
      let rapat = this.daftarRapat[i];
      let start = rapat.slotWaktu.mulai.getTime();
      let end = rapat.slotWaktu.selesai.getTime();

      if (start >= mulai && end <= selesai) {
        hasil.push(rapat);
      }
    }

    return hasil;
  }
}
