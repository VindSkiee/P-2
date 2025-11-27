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
    this.daftarProduk.push(produk);
  }

  // initial state: daftarProduk berisi beberapa produk dengan id unik
  // final state: produk dengan id tertentu dihapus dari daftarProduk
  hapusProduk(idProduk) {
    this.daftarProduk = this.daftarProduk.filter((p) => p.id !== idProduk);
  }

  // initial state: daftarProduk berisi produk dengan berbagai nama
  // final state: mengembalikan daftar produk yang nama-nya mengandung kata kunci tertentu
  cariBerdasarkanNama(kueri) {
    const lower = kueri.toLowerCase();
    return this.daftarProduk.filter((p) =>
      p.nama.toLowerCase().includes(lower)
    );
  }

  // initial state: daftarProduk berisi produk dengan kategori, harga, rating, dan tag berbeda
  // final state: mengembalikan daftar produk yang sesuai dengan kriteria filter yang diberikan
  filterProduk(kriteria) {
    return this.daftarProduk.filter((p) => {
      const cocokKategori = kriteria.kategori
        ? p.kategori === kriteria.kategori
        : true;
      const cocokMin = kriteria.hargaMinimum
        ? p.harga >= kriteria.hargaMinimum
        : true;
      const cocokMax = kriteria.hargaMaksimum
        ? p.harga <= kriteria.hargaMaksimum
        : true;
      const cocokRating = kriteria.ratingMinimum
        ? p.rating >= kriteria.ratingMinimum
        : true;
      const cocokTag = kriteria.tag ? p.tag.includes(kriteria.tag) : true;

      return cocokKategori && cocokMin && cocokMax && cocokRating && cocokTag;
    });
  }

  // initial state: daftarProduk berisi produk dengan atribut harga, rating, dan nama
  // final state: mengembalikan daftar produk yang sudah diurutkan berdasarkan atribut tertentu
  dapatkanProdukTerurut(urutBerdasarkan, urutan) {
    // urutBerdasarkan: 'harga' | 'rating' | 'nama'
    // urutan: 'naik' atau 'turun'
    const hasil = [...this.daftarProduk];

    hasil.sort((a, b) => {
      let nilaiA = a[urutBerdasarkan];
      let nilaiB = b[urutBerdasarkan];

      if (nilaiA < nilaiB) return urutan === "naik" ? -1 : 1;
      if (nilaiA > nilaiB) return urutan === "naik" ? 1 : -1;
      return 0;
    });

    return hasil;
  }

  // initial state: daftarProduk berisi produk dengan berbagai harga
  // final state: mengembalikan daftar produk yang berada dalam rentang harga tertentu
  dapatkanProdukDalamRentangHarga(minimum, maksimum) {
    return this.daftarProduk.filter(
      (p) => p.harga >= minimum && p.harga <= maksimum
    );
  }

  // initial state: daftarProduk berisi produk dengan berbagai kategori dan tag
  // final state: mengembalikan daftar produk yang mirip dengan produk tertentu berdasarkan tag atau kategori
  dapatkanProdukSerupa(idProduk, batas) {
    const target = this.daftarProduk.find((p) => p.id === idProduk);
    if (!target) return [];

    const hitungSkor = (p1, p2) => {
      let skor = 0;

      if (p1.kategori === p2.kategori) skor += 2;

      p1.tag.forEach((tag) => {
        if (p2.tag.includes(tag)) skor += 1;
      });

      return skor;
    };

    return this.daftarProduk
      .filter((p) => p.id !== idProduk)
      .map((p) => ({ p, skor: hitungSkor(target, p) }))
      .sort((a, b) => b.skor - a.skor)
      .slice(0, batas)
      .map((o) => o.p);
  }

  // initial state: daftarProduk berisi produk dengan berbagai nama
  // final state: mengembalikan daftar nama produk yang dimulai dengan prefix tertentu (auto-complete)
  autoLengkap(prefix, batas) {
    const lower = prefix.toLowerCase();

    const kandidat = this.daftarProduk.filter((p) =>
      p.nama.toLowerCase().includes(lower)
    );

    if (kandidat.length === 0) return [];

    const hasil = kandidat.map((p) => {
      const nama = p.nama.toLowerCase();
      const a = lower;
      const b = nama;

      const dp = Array.from({ length: a.length + 1 }, () =>
        Array(b.length + 1).fill(0)
      );

      for (let i = 0; i <= a.length; i++) dp[i][0] = i;
      for (let j = 0; j <= b.length; j++) dp[0][j] = j;

      for (let i = 1; i <= a.length; i++) {
        for (let j = 1; j <= b.length; j++) {
          const cost = a[i - 1] === b[j - 1] ? 0 : 1;
          dp[i][j] = Math.min(
            dp[i - 1][j] + 1,
            dp[i][j - 1] + 1,
            dp[i - 1][j - 1] + cost
          );
        }
      }

      return { nama: p.nama, distance: dp[a.length][b.length] };
    });

    return hasil
      .sort((a, b) => a.distance - b.distance)
      .slice(0, batas)
      .map((r) => r.nama);
  }
}
