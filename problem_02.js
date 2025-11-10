export class SlotWaktu {
  constructor(mulai, selesai) {
    this.mulai = mulai;   // Objek Date
    this.selesai = selesai; // Objek Date
  }

  // initial state: dua slot waktu sudah diketahui (this dan other)
  // final state: mengembalikan true jika kedua slot waktu saling tumpang tindih (overlap)
  tumpangTindih(denganSlotLain) {
    
  }

  // initial state: slot waktu memiliki waktu mulai dan selesai yang valid
  // final state: mengembalikan durasi waktu (dalam menit atau jam) antara mulai dan selesai
  durasi() {
    
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
    
  }

  // initial state: daftarRapat berisi rapat-rapat di berbagai ruang dan waktu
  // final state: mengembalikan daftar slot waktu kosong (tidak terpakai) pada tanggal dan durasi tertentu di ruang yang diminta
  cariSlotTersedia(idRuang, tanggal, durasi) {
    
  }

  // initial state: daftar rapat dan daftar ruang sudah diketahui
  // final state: menjadwalkan rapat-rapat ke ruang yang paling optimal dengan meminimalkan konflik waktu
  jadwalOptimal(daftarRapat) {
    
  }

  // initial state: daftarRapat berisi beberapa rapat dengan konflik waktu tertentu
  // final state: mengembalikan daftar alternatif waktu yang memungkinkan rapat diatur ulang tanpa konflik
  cariSlotAlternatif(rapat, rapatBerkonflik) {
    
  }

  // initial state: daftarRapat berisi rapat-rapat dengan waktu mulai dan selesai
  // final state: mengembalikan daftar rapat yang berlangsung dalam rentang waktu tertentu
  dapatkanRapatDalamRentang(tanggalMulai, tanggalSelesai) {
    
  }
}
