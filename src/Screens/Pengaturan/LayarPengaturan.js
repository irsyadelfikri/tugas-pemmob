import React, {
  useContext,
} from 'react';

import {
  View,
  Text,
  Switch,
} from 'react-native';

import {
  PengaturanContext,
} from '../../context/PengaturanContext';

export default function LayarPengaturan() {

  const {
    pengaturan,
    loading,
    updatePengaturan,
  } = useContext(
    PengaturanContext
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

  const toggleDarkMode =
    async () => {

      await updatePengaturan({
        ...pengaturan,
        darkMode:
          !pengaturan.darkMode,
      });
    };

  const toggleNotifikasi =
    async () => {

      await updatePengaturan({
        ...pengaturan,
        notifikasi:
          !pengaturan.notifikasi,
      });
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
        Pengaturan
      </Text>

      <View
        style={{
          flexDirection: 'row',
          justifyContent:
            'space-between',
          alignItems: 'center',
          marginBottom: 20,
        }}
      >
        <Text
          style={{
            fontSize: 18,
          }}
        >
          🌙 Dark Mode
        </Text>

        <Switch
          value={
            pengaturan.darkMode
          }
          onValueChange={
            toggleDarkMode
          }
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent:
            'space-between',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            fontSize: 18,
          }}
        >
          🔔 Notifikasi
        </Text>

        <Switch
          value={
            pengaturan.notifikasi
          }
          onValueChange={
            toggleNotifikasi
          }
        />
      </View>

    </View>
  );
}