import React, {
  useContext,
  useState,
} from 'react';

import {
  View,
  Text,
  Button,
  Modal,
  TextInput,
} from 'react-native';

import {
  MahasiswaContext,
} from '../../context/MahasiswaContext';

import KartuInfoMahasiswa
from '../../components/KartuInfoMahasiswa';

export default function LayarProfil() {

  const {
    mahasiswa,
    loading,
    updateMahasiswa,
  } = useContext(
    MahasiswaContext
  );

  const [modalVisible,
    setModalVisible] =
    useState(false);

  const [nama, setNama] =
    useState(mahasiswa.nama);

  const [nim, setNim] =
    useState(mahasiswa.nim);

  const [semester,
    setSemester] =
    useState(mahasiswa.semester);

  const [programStudi,
    setProgramStudi] =
    useState(
      mahasiswa.programStudi
    );

  if (loading) {
    return (
      <Text>Memuat...</Text>
    );
  }

  const handleSimpan =
    async () => {

      const dataBaru = {
        nama,
        nim,
        semester,
        programStudi,
      };

      await updateMahasiswa(
        dataBaru
      );

      setModalVisible(false);
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
        Profil Mahasiswa
      </Text>

      <KartuInfoMahasiswa
        mahasiswa={mahasiswa}
      />

      <Button
        title="Edit Profil"
        onPress={() =>
          setModalVisible(true)
        }
      />

      <Modal
        visible={modalVisible}
        animationType="slide"
      >
        <View
          style={{
            flex: 1,
            padding: 20,
            justifyContent:
              'center',
          }}
        >

          <Text
            style={{
              fontSize: 24,
              fontWeight: 'bold',
              marginBottom: 20,
            }}
          >
            Edit Profil
          </Text>

          <TextInput
            placeholder="Nama"
            value={nama}
            onChangeText={setNama}
            style={{
              borderWidth: 1,
              padding: 10,
              marginBottom: 10,
            }}
          />

          <TextInput
            placeholder="NIM"
            value={nim}
            onChangeText={setNim}
            style={{
              borderWidth: 1,
              padding: 10,
              marginBottom: 10,
            }}
          />

          <TextInput
            placeholder="Semester"
            value={semester}
            onChangeText={
              setSemester
            }
            style={{
              borderWidth: 1,
              padding: 10,
              marginBottom: 10,
            }}
          />

          <TextInput
            placeholder="Program Studi"
            value={programStudi}
            onChangeText={
              setProgramStudi
            }
            style={{
              borderWidth: 1,
              padding: 10,
              marginBottom: 20,
            }}
          />

          <Button
            title="Simpan"
            onPress={
              handleSimpan
            }
          />

          <View
            style={{
              marginTop: 10,
            }}
          >
            <Button
              title="Batal"
              color="red"
              onPress={() =>
                setModalVisible(
                  false
                )
              }
            />
          </View>

        </View>
      </Modal>

    </View>
  );
}