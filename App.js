import React, {
  useEffect,
} from 'react';

import NavigasiAplikasi from './src/navigation/NavigasiAplikasi';

import {
  MahasiswaProvider,
} from './src/context/MahasiswaContext';

import {
  MataKuliahProvider,
} from './src/context/MataKuliahContext';

import {
  PengaturanProvider,
} from './src/context/PengaturanContext';

import {
  initDatabase,
  initMataKuliahTable,
  tampilkanCacheMataKuliah,
} from './src/storage/sqlite';

export default function App() {

  useEffect(() => {

    initDatabase();

    initMataKuliahTable();

    tampilkanCacheMataKuliah();

  }, []); 

  return (
    <PengaturanProvider>
      <MahasiswaProvider>
        <MataKuliahProvider>
          <NavigasiAplikasi />
        </MataKuliahProvider>
      </MahasiswaProvider>
    </PengaturanProvider>
  );
}