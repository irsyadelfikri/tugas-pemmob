import React, { useEffect } from 'react';
import {
  View,
  Text,
  Image,
} from 'react-native';

export default function LayarSplash({ navigation }) {

  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Utama');
    }, 2000);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
      }}
    >
      <Image
        source={require('../../../assets/images/Picture1.png')}
        style={{
          width: 180,
          height: 180,
          resizeMode: 'contain',
        }}
      />

      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          marginTop: 20,
          textAlign: 'center',
        }}
      >
        Panduan Akademik Mahasiswa
      </Text>

      <Text
        style={{
          marginTop: 10,
          fontSize: 16,
          color: '#666',
        }}
      >
        Universitas Islam Riau
      </Text>
    </View>
  );
}