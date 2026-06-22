import React, {
  createContext,
  useState,
  useEffect,
} from 'react';

import {
  simpanData,
  ambilData,
} from '../storage/asyncStorage';

export const MahasiswaContext =
  createContext();

export const MahasiswaProvider = ({
  children,
}) => {

  const [mahasiswa, setMahasiswa] =
    useState({
      nama: 'Irsyadel Fikri',
      nim: '233510591',
      semester: '6',
      programStudi:
        'Teknik Informatika',
    });

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadMahasiswa();
  }, []);

  const loadMahasiswa = async () => {
    try {

      const data =
        await ambilData(
          'data_mahasiswa'
        );

      if (data) {
        setMahasiswa(data);
      }

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const updateMahasiswa =
    async (dataBaru) => {

      setMahasiswa(dataBaru);

      await simpanData(
        'data_mahasiswa',
        dataBaru
      );
    };

  return (
    <MahasiswaContext.Provider
      value={{
        mahasiswa,
        loading,
        updateMahasiswa,
      }}
    >
      {children}
    </MahasiswaContext.Provider>
  );
};