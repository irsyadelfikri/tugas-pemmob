import { Share } from 'react-native';

export const bagikanMataKuliah = async (namaMataKuliah) => {
  try {
    await Share.share({
      message: `Saya memilih mata kuliah ${namaMataKuliah}`,
    });
  } catch (error) {
    console.log(error);
  }
};