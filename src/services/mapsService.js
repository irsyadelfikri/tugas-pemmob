import { Linking } from 'react-native';

export const bukaMaps = () => {
  Linking.openURL(
    'https://www.google.com/maps/search/?api=1&query=Universitas+Islam+Riau'
  );
};