import { Kontak, PengelolaKontak } from './../problem_01.js';

console.log("=== TEST: problem_01 ===\n");

// Inisialisasi data
const pengelola = new PengelolaKontak();
pengelola.daftarKontak = [
  new Kontak(1, "Andi", "andi@mail.com", "0811", "TechCorp", ["client", "vip"]),
  new Kontak(2, "Budi", "budi@mail.com", "0812", "Innova", ["supplier"]),
  new Kontak(3, "Cindy", "cindy@mail.com", "0813", "Alpha", ["partner", "client"]),
  new Kontak(4, "Andika", "andi@mail.com", "0814", "Beta", ["client"]),
  new Kontak(5, "Anita", "anita@mail.com", "0815", "TechCorp", ["vip"]),
];

// 1️⃣ Test cariBerdasarkanAwalanNama
console.log("\n1️⃣ cariBerdasarkanAwalanNama('An'):");
console.log(pengelola.cariBerdasarkanAwalanNama("An"));

// 2️⃣ Test cariNamaSerupa
console.log("\n2️⃣ cariNamaSerupa('Andy', 2):");
console.log(pengelola.cariNamaSerupa("Andy", 2));

// 3️⃣ Test temukanDuplikat
console.log("\n3️⃣ temukanDuplikat():");
console.log(pengelola.temukanDuplikat());

// 4️⃣ Test dapatkanSaran
console.log("\n4️⃣ dapatkanSaran('in', 3):");
console.log(pengelola.dapatkanSaran("in", 3));

// 5️⃣ Test dapatkanKontakBerdasarkanTag
console.log("\n5️⃣ dapatkanKontakBerdasarkanTag(['client'], false):");
console.log(pengelola.dapatkanKontakBerdasarkanTag(["client"], false));

console.log("\n5️⃣(b) dapatkanKontakBerdasarkanTag(['client','vip'], true):");
console.log(pengelola.dapatkanKontakBerdasarkanTag(["client", "vip"], true));

console.log("\n=== SELESAI TESTING ===");