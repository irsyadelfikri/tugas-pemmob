import * as SQLite from 'expo-sqlite';

export const db =
  SQLite.openDatabaseSync(
    'panduan_akademik.db'
  );

export const initDatabase =
  () => {

    db.execSync(`
      CREATE TABLE IF NOT EXISTS mahasiswa (
        id INTEGER PRIMARY KEY NOT NULL,
        nama TEXT,
        nim TEXT,
        semester TEXT
      );
    `);

    console.log(
      'Database berhasil dibuat'
    );
  };

export const tambahMahasiswaDummy = () => {
  db.runSync(
    `INSERT INTO mahasiswa
    (nama, nim, semester)
    VALUES (?, ?, ?)`,
    [
      'Irsyadel Fikri',
      '233510591',
      '6',
    ]
  );

  console.log(
    'Data berhasil ditambahkan'
  );
};

export const tampilkanMahasiswa = () => {

  const hasil =
    db.getAllSync(
      'SELECT * FROM mahasiswa'
    );

  console.log(hasil);
};

export const initMataKuliahTable =
  () => {

    db.execSync(`
      CREATE TABLE IF NOT EXISTS mata_kuliah (
        id TEXT PRIMARY KEY NOT NULL,
        nama TEXT,
        kode TEXT,
        sks TEXT,
        dosen TEXT,
        catatan TEXT
      );
    `);

    console.log(
      'Tabel mata_kuliah berhasil dibuat'
    );
  };

export const simpanMataKuliahCache =
  (mataKuliah) => {

    db.runSync(
      `
      INSERT OR REPLACE INTO mata_kuliah
      (
        id,
        nama,
        kode,
        sks,
        dosen,
        catatan
      )
      VALUES (?, ?, ?, ?, ?, ?)
      `,
      [
        mataKuliah.id,
        mataKuliah.nama,
        mataKuliah.kode,
        mataKuliah.sks,
        mataKuliah.dosen,
        mataKuliah.catatan,
      ]
    );

    console.log(
      'Cache SQLite disimpan'
    );
  };

export const tampilkanCacheMataKuliah =
  () => {

    const hasil =
      db.getAllSync(
        'SELECT * FROM mata_kuliah'
      );

    console.log(
      'CACHE SQLITE:',
      hasil
    );
  };