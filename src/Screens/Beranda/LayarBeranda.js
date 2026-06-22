import React, {
  useContext,
} from 'react';

import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import {
  MahasiswaContext,
} from '../../context/MahasiswaContext';

import KartuInfoMahasiswa from '../../components/KartuInfoMahasiswa';

export default function LayarBeranda({
  navigation,
}) {

  const {
    mahasiswa,
    loading,
  } = useContext(
    MahasiswaContext
  );

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text>Memuat...</Text>
      </View>
    );
  }

  const mataKuliahDipilih =
    mahasiswa.mataKuliahDipilih ||
    'Belum ada';

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          marginBottom: 10,
        }}
      >
        Selamat Datang
      </Text>

      <KartuInfoMahasiswa
        mahasiswa={mahasiswa}
      />

      <View
        style={{
          marginTop: 25,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 10,
          }}
        >
          Menu Cepat
        </Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent:
              'space-between',
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor:
                '#ffffff',
              width: '30%',
              padding: 15,
              borderRadius: 10,
              alignItems: 'center',
              elevation: 3,
            }}
            onPress={() =>
              navigation.navigate(
                'Mata Kuliah'
              )
            }
          >
            <Text
              style={{
                fontSize: 22,
              }}
            >
              📚
            </Text>

            <Text>
              Mata Kuliah
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor:
                '#ffffff',
              width: '30%',
              padding: 15,
              borderRadius: 10,
              alignItems: 'center',
              elevation: 3,
            }}
            onPress={() =>
              navigation.navigate(
                'Profil'
              )
            }
          >
            <Text
              style={{
                fontSize: 22,
              }}
            >
              👤
            </Text>

            <Text>
              Profil
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor:
                '#ffffff',
              width: '30%',
              padding: 15,
              borderRadius: 10,
              alignItems: 'center',
              elevation: 3,
            }}
            onPress={() =>
              navigation.navigate(
                'Tentang'
              )
            }
          >
            <Text
              style={{
                fontSize: 22,
              }}
            >
              ℹ️
            </Text>

            <Text>
              Tentang
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          marginTop: 25,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 10,
          }}
        >
          Mata Kuliah Dipilih
        </Text>

        <View
          style={{
            backgroundColor:
              '#ffffff',
            padding: 15,
            borderRadius: 10,
            elevation: 3,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
            }}
          >
            📚 {mataKuliahDipilih}
          </Text>
        </View>
      </View>

    </View>
  );
}