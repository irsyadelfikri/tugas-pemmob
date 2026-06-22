import { Linking } from 'react-native';

export const kirimEmail = () => {
  Linking.openURL(
    'mailto:dosen@kampus.ac.id?subject=Konsultasi Mata Kuliah'
  );
};