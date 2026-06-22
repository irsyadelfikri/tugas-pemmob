import React, {
  createContext,
  useState,
  useEffect,
} from 'react';

import {
  simpanData,
  ambilData,
} from '../storage/asyncStorage';

import {
  simpanMataKuliahCache,
  tampilkanCacheMataKuliah,
} from '../storage/sqlite';

export const MataKuliahContext =
  createContext();

export const MataKuliahProvider = ({
  children,
}) => {

  const [mataKuliah, setMataKuliah] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(null);

  useEffect(() => {
    loadMataKuliah();
  }, []);

  const loadMataKuliah = async () => {

    try {

      const data =
        await ambilData(
          'mata_kuliah'
        );

      if (data) {
        setMataKuliah(data);
      }

    } catch (err) {

      setError(
        err.message
      );

    } finally {

      setLoading(false);

    }
  };

  const tambahMataKuliah = async (
    mataKuliahBaru
  ) => {

    try {

      const dataBaru = [
        ...mataKuliah,
        mataKuliahBaru,
      ];

      setMataKuliah(dataBaru);

      await simpanData(
        'mata_kuliah',
        dataBaru
      );

      simpanMataKuliahCache(
        mataKuliahBaru
      );
      tampilkanCacheMataKuliah();
    } catch (err) {

      setError(
        err.message
      );

    }
  };

const syncMataKuliahServer = async (
  dataServer
) => {

  try {

    const dataGabung = [
      ...mataKuliah,
      ...dataServer,
    ];

    const dataUnik =
      dataGabung.filter(
        (
          item,
          index,
          self
        ) =>
          index ===
          self.findIndex(
            m =>
              m.id === item.id
          )
      );

    setMataKuliah(
      dataUnik
    );

    await simpanData(
      'mata_kuliah',
      dataUnik
    );

  } catch (err) {

    setError(
      err.message
    );

  }
};

  const hapusMataKuliah = async (
    id
  ) => {

    try {

      const dataBaru =
        mataKuliah.filter(
          item =>
            item.id !== id
        );

      setMataKuliah(dataBaru);

      await simpanData(
        'mata_kuliah',
        dataBaru
      );

    } catch (err) {

      setError(
        err.message
      );

    }
  };

  const editMataKuliah = async (
    dataEdit
  ) => {

    try {

      const dataBaru =
        mataKuliah.map(
          item =>
            item.id ===
            dataEdit.id
              ? dataEdit
              : item
        );

      setMataKuliah(dataBaru);

      await simpanData(
        'mata_kuliah',
        dataBaru
      );

    } catch (err) {

      setError(
        err.message
      );

    }
  };

  return (
    <MataKuliahContext.Provider
      value={{
        mataKuliah,
        loading,
        error,
        tambahMataKuliah,
        editMataKuliah,
        hapusMataKuliah,
        syncMataKuliahServer,
    }}
    >
      {children}
    </MataKuliahContext.Provider>
  );
};