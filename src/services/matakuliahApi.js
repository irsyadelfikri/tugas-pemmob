import { api } from './api';

export const getMataKuliahServer =
  async () => {

    let percobaan = 0;

    while (percobaan < 3) {

      try {

        const response =
          await api.get('/posts');

        return response.data;

      } catch (error) {

        percobaan++;

        console.log(
          `Percobaan ke-${percobaan} gagal`
        );

        if (
          percobaan === 3
        ) {

          throw error;

        }

      }

    }

  };

export const postMataKuliahServer =
  async (mataKuliah) => {

    const response =
      await api.post(
        '/posts',
        mataKuliah
      );

    return response.data;
  };