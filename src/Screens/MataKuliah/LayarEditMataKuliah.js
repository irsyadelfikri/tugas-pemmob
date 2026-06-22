import React, {
  useState,
  useContext,
} from 'react';

import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
} from 'react-native';

import {
  MataKuliahContext,
} from '../../context/MataKuliahContext';

export default function LayarEditMataKuliah({
  route,
  navigation,
}) {

  const { mataKuliah } =
    route.params;

  const {
    editMataKuliah,
  } = useContext(
    MataKuliahContext
  );

  const [nama, setNama] =
    useState(mataKuliah.nama);

  const [kode, setKode] =
    useState(mataKuliah.kode);

  const [sks, setSks] =
    useState(
      String(mataKuliah.sks)
    );

  const [dosen, setDosen] =
    useState(mataKuliah.dosen);

  const [catatan, setCatatan] =
    useState(
      mataKuliah.catatan || ''
    );

  const handleSimpan = async () => {

    if (
      !nama ||
      !kode ||
      !sks ||
      !dosen
    ) {
      Alert.alert(
        'Error',
        'Semua data wajib diisi'
      );
      return;
    }

    const dataEdit = {
      ...mataKuliah,
      nama,
      kode,
      sks,
      dosen,
      catatan,
    };

    await editMataKuliah(
      dataEdit
    );

    Alert.alert(
      'Berhasil',
      'Mata kuliah berhasil diperbarui',
      [
        {
          text: 'OK',
          onPress: () =>
            navigation.goBack(),
        },
      ]
    );
  };

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
          marginBottom: 20,
        }}
      >
        Edit Mata Kuliah
      </Text>

      <TextInput
        placeholder="Nama Mata Kuliah"
        value={nama}
        onChangeText={setNama}
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 10,
        }}
      />

      <TextInput
        placeholder="Kode"
        value={kode}
        onChangeText={setKode}
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 10,
        }}
      />

      <TextInput
        placeholder="SKS"
        value={sks}
        onChangeText={setSks}
        keyboardType="numeric"
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 10,
        }}
      />

      <TextInput
        placeholder="Dosen"
        value={dosen}
        onChangeText={setDosen}
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 10,
        }}
      />

      <TextInput
        placeholder="Catatan"
        value={catatan}
        onChangeText={setCatatan}
        multiline
        style={{
          borderWidth: 1,
          padding: 10,
          height: 100,
          marginBottom: 20,
        }}
      />

      <Button
        title="Simpan Perubahan"
        onPress={handleSimpan}
      />

    </View>
  );
}