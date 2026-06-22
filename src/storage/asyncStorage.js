import AsyncStorage from '@react-native-async-storage/async-storage';

// Simpan data
export const simpanData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    console.log('Gagal menyimpan data:', error);
  }
};

// Ambil data
export const ambilData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.log('Gagal mengambil data:', error);
    return null;
  }
};

// Hapus satu data
export const hapusData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log('Gagal menghapus data:', error);
  }
};

// Hapus semua data aplikasi
export const hapusSemuaData = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.log('Gagal menghapus semua data:', error);
  }
};