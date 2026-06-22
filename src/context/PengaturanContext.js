import React, {
  createContext,
  useState,
  useEffect,
} from 'react';

import {
  simpanData,
  ambilData,
} from '../storage/asyncStorage';

export const PengaturanContext =
  createContext();

export const PengaturanProvider = ({
  children,
}) => {

  const [pengaturan,
    setPengaturan] =
    useState({
      darkMode: false,
      notifikasi: true,
    });

  const [loading,
    setLoading] =
    useState(true);

  useEffect(() => {
    loadPengaturan();
  }, []);

  const loadPengaturan =
    async () => {
      try {

        const data =
          await ambilData(
            'pengaturan'
          );

        if (data) {
          setPengaturan(data);
        }

      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  const updatePengaturan =
    async (dataBaru) => {

      setPengaturan(dataBaru);

      await simpanData(
        'pengaturan',
        dataBaru
      );
    };

  return (
    <PengaturanContext.Provider
      value={{
        pengaturan,
        loading,
        updatePengaturan,
      }}
    >
      {children}
    </PengaturanContext.Provider>
  );
};