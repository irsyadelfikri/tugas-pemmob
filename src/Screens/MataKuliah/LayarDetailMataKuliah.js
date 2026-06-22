import {
  MahasiswaContext,
} from '../../context/MahasiswaContext';
import React, { useContext } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { hubungiDosen } from '../../services/phoneService';
import { kirimEmail } from '../../services/emailService';
import { bukaMaps } from '../../services/mapsService';
import { bagikanMataKuliah } from '../../services/shareService';

import {
  MataKuliahContext,
} from '../../context/MataKuliahContext';

export default function LayarDetailMataKuliah({
  route,
  navigation,
}) {

  const { mataKuliah } = route.params;

  const {
    mahasiswa,
    updateMahasiswa,
  } = useContext(
    MahasiswaContext
  );

  const {
    hapusMataKuliah,
  } = useContext(
    MataKuliahContext
  );

  const handleDaftar = () => {
  Alert.alert(
    'Berhasil',
    `Anda berhasil mendaftar mata kuliah ${mataKuliah.nama}`,
    [
      {
        text: 'OK',
        onPress: async () => {

          await updateMahasiswa({
            ...mahasiswa,
            mataKuliahDipilih:
              mataKuliah.nama,
          });

          navigation.reset({
            index: 0,
            routes: [
              {
                name: 'Utama',
              },
            ],
          });
        },
      },
    ]
  );
};

  const handleHapus = () => {
    Alert.alert(
      'Konfirmasi',
      `Hapus mata kuliah ${mataKuliah.nama}?`,
      [
        {
          text: 'Batal',
          style: 'cancel',
        },
        {
          text: 'Hapus',
          style: 'destructive',
          onPress: async () => {

            await hapusMataKuliah(
              mataKuliah.id
            );

            navigation.goBack();
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        padding: 20,
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          marginBottom: 20,
        }}
      >
        Detail Mata Kuliah
      </Text>

      <View
        style={{
          backgroundColor: '#ffffff',
          padding: 20,
          borderRadius: 15,
          elevation: 4,
          marginBottom: 20,
        }}
      >
        <Text
          style={{
            fontSize: 22,
            fontWeight: 'bold',
            marginBottom: 15,
          }}
        >
          📚 {mataKuliah.nama}
        </Text>

        <Text
          style={{
            fontSize: 16,
            marginBottom: 8,
          }}
        >
          Kode : {mataKuliah.kode}
        </Text>

        <Text
          style={{
            fontSize: 16,
            marginBottom: 8,
          }}
        >
          SKS : {mataKuliah.sks}
        </Text>

        <Text
          style={{
            fontSize: 16,
          }}
        >
          Dosen : {mataKuliah.dosen}
        </Text>
      </View>

      <View style={{ marginTop: 20 }}>
        <Button
          title="Daftar Mata Kuliah"
          onPress={handleDaftar}
        />
      </View>

      <View style={{ marginTop: 10 }}>
        <Button
          title="Hubungi Dosen"
          onPress={hubungiDosen}
        />
      </View>

      <View style={{ marginTop: 10 }}>
        <Button
          title="Kirim Email"
          onPress={kirimEmail}
        />
      </View>

      <View style={{ marginTop: 10 }}>
        <Button
          title="Lihat di Google Maps"
          onPress={bukaMaps}
        />
      </View>

      <View style={{ marginTop: 10 }}>
        <Button
          title="Bagikan Mata Kuliah"
          onPress={() =>
            bagikanMataKuliah(
              mataKuliah.nama
            )
          }
        />
      </View>

      <View style={{ marginTop: 10 }}>
        <Button
          title="Edit Mata Kuliah"
          onPress={() =>
            navigation.navigate(
              'EditMataKuliah',
            {
              mataKuliah,
            }
          )
     }
  />
      </View>

      <View style={{ marginTop: 10 }}>
        <Button
          title="Hapus Mata Kuliah"
          color="red"
          onPress={handleHapus}
        />
      </View>

    </SafeAreaView>
  );
}