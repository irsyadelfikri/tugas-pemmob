import {
  getMataKuliahServer,
  postMataKuliahServer,
} from '../../services/matakuliahApi';

import React, {
  useContext,
  useState,
  useEffect,
} from 'react';

import { Card } from 'react-native-paper';

import {
  View,
  Text,
  FlatList,
  Button,
  Modal,
  TextInput,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';

import {
  MataKuliahContext,
} from '../../context/MataKuliahContext';

import NetInfo from
  '@react-native-community/netinfo';

import {
  requestNotificationPermission,
  kirimNotifikasi,
} from '../../services/notificationService';

export default function LayarMataKuliah({
  navigation,
}) {

  const {
    mataKuliah,
    loading,
    error,
    tambahMataKuliah,
    syncMataKuliahServer,
  } = useContext(
    MataKuliahContext
  );

  const [modalVisible, setModalVisible] =
    useState(false);

  const [nama, setNama] =
    useState('');

  const [kode, setKode] =
    useState('');

  const [sks, setSks] =
    useState('');

  const [dosen, setDosen] =
    useState('');

  const [catatan, setCatatan] =
    useState('');

  const [kataKunci, setKataKunci] =
    useState('');

  const [filterSks, setFilterSks] =
    useState('Semua');

  const [refreshing, setRefreshing] =
    useState(false);

  const [isOnline, setIsOnline] =
    useState(true);

  const [syncLoading, setSyncLoading] =
    useState(false);

  useEffect(() => {
    requestNotificationPermission();

  const unsubscribe =
    NetInfo.addEventListener(
      state => {

        setIsOnline(
          state.isConnected
        );

      }
    );

  return () =>
    unsubscribe();

}, []);
  const simpanMataKuliah = async () => {

    if (
      !nama ||
      !kode ||
      !sks ||
      !dosen
    ) {
      alert('Semua data wajib diisi');
      return;
    }

    const dataBaru = {
      id: Date.now().toString(),
      nama,
      kode,
      sks,
      dosen,
      catatan,
    };

    await tambahMataKuliah(dataBaru);
const response =
  await postMataKuliahServer(
    dataBaru
  );

console.log(
  'POST SERVER:',
  response
);
    setNama('');
    setKode('');
    setSks('');
    setDosen('');
    setCatatan('');

    setModalVisible(false);
  };

const syncFromServer = async () => {

  try {

    setSyncLoading(true);

    const data =
      await getMataKuliahServer();

    const dataServer =
      data.slice(0, 5).map(
        item => ({
          id: `server-${item.id}`,
          nama: item.title,
          kode: `IF${item.id}`,
          sks: '3',
          dosen: 'Dosen Server',
          catatan: 'Data dari API',
        })
      );

    await syncMataKuliahServer(
      dataServer
    );

    alert(
      `Berhasil sync ${dataServer.length} data`
    );

  } catch (error) {

    console.log(error);

    alert(
      'Gagal mengambil data dari server'
    );

  } finally {

    setSyncLoading(false);

  }
};

const handleRefresh = async () => {

  try {

    setRefreshing(true);

    await syncFromServer();

  } catch (error) {

    console.log(
      'REFRESH ERROR:',
      error
    );

  } finally {

    setRefreshing(false);

  }

};

useEffect(() => {

  const autoSync =
    async () => {

      try {

        await syncFromServer();

      } catch (error) {

        console.log(
          'Auto Sync Gagal'
        );

      }

    };

  autoSync();

}, []);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text>Memuat data...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text>Terjadi kesalahan</Text>
      </View>
    );
  }

  const mataKuliahFilter =
  mataKuliah.filter(item => {

    const cocokNama =
      item.nama
        .toLowerCase()
        .includes(
          kataKunci.toLowerCase()
        );

    const cocokSks =
      filterSks === 'Semua'
        ? true
        : item.sks === filterSks;

    return (
      cocokNama &&
      cocokSks
    );
  });
  const renderItem = ({ item }) => (
    <Card
      style={{
        marginBottom: 15,
      }}
      onPress={() =>
        navigation.navigate(
          'DetailMataKuliah',
          {
            mataKuliah: item,
          }
        )
      }
    >
      <Card.Content>

        <Text
          style={{
            fontSize: 22,
            fontWeight: 'bold',
          }}
        >
          {item.nama}
        </Text>

        <Text>Kode: {item.kode}</Text>
        <Text>SKS: {item.sks}</Text>
        <Text>Dosen: {item.dosen}</Text>

      </Card.Content>
    </Card>
  );

  return (
  <View
    style={{
      flex: 1,
      padding: 15,
    }}
  >
  <View
  style={{
    marginBottom: 10,
  }}
>
  <Text
    style={{
      fontWeight: 'bold',
      color:
        isOnline
          ? 'green'
          : 'red',
    }}
  >
    {
      isOnline
        ? '🟢 Online'
        : '🔴 Offline'
    }
    
  </Text>
</View>
    {
  syncLoading && (
    <View
      style={{
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <ActivityIndicator
        size="small"
      />

      <Text
        style={{
          marginLeft: 10,
        }}
      >
        Sedang sinkronisasi data...
      </Text>
    </View>
  )
}
    <TextInput
      placeholder="Cari Mata Kuliah..."
      value={kataKunci}
      onChangeText={setKataKunci}
      style={{
        borderWidth: 1,
        padding: 10,
        marginBottom: 10,
        borderRadius: 10,
      }}
    />

    <Text
      style={{
        marginBottom: 10,
        color: 'gray',
      }}
    >
      Filter SKS: {filterSks}
    </Text>

    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
      }}
    >
      <Button
        title="Semua"
        onPress={() =>
          setFilterSks('Semua')
        }
      />

      <Button
        title="2 SKS"
        onPress={() =>
          setFilterSks('2')
        }
      />

      <Button
        title="3 SKS"
        onPress={() =>
          setFilterSks('3')
        }
      />

      <Button
        title="4 SKS"
        onPress={() =>
          setFilterSks('4')
        }
      />
    </View>

    <View
      style={{
        marginBottom: 15,
      }}
    >
      <Button
        title="Reset Filter"
        onPress={() => {
          setKataKunci('');
          setFilterSks('Semua');
        }}
      />
    </View>

    <Text
      style={{
        fontWeight: 'bold',
        marginBottom: 10,
      }}
    >
      Total Mata Kuliah:
      {' '}
      {mataKuliahFilter.length}
    </Text>

    {
      mataKuliahFilter.length === 0 ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontSize: 18,
              color: 'gray',
            }}
          >
            Tidak ada mata kuliah yang cocok
          </Text>

          <Text
            style={{
              color: 'gray',
              marginTop: 10,
            }}
          >
            Coba ubah kata kunci pencarian atau filter
          </Text>
        </View>
      ) : (
        <FlatList
          data={mataKuliahFilter}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
            />
        }
      />
      )
    }

    <View
  style={{
    marginBottom: 15,
  }}
>
  <Button
    title="Sync from Server"
    onPress={syncFromServer}
  />
</View>
<View
  style={{
    marginBottom: 15,
  }}
>
  <Button
  title="Test Notifikasi"
  onPress={() =>
    kirimNotifikasi(
      'EduGuide',
      'Notifikasi berhasil dikirim'
    )
  }
/>
</View>

<View
  style={{
    marginBottom: 15,
  }}
>
  <Button
    title="Tambah Mata Kuliah"
    onPress={() =>
      setModalVisible(true)
    }
  />
</View>

      <Modal
        visible={modalVisible}
        animationType="slide"
      >
        <View
          style={{
            flex: 1,
            padding: 20,
            justifyContent: 'center',
          }}
        >

          <Text
            style={{
              fontSize: 24,
              fontWeight: 'bold',
              marginBottom: 20,
            }}
          >
            Tambah Mata Kuliah
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
            placeholder="Kode Mata Kuliah"
            value={kode}
            onChangeText={setKode}
            style={{
              borderWidth: 1,
              padding: 10,
              marginBottom: 10,
            }}
          />

          <TextInput
            placeholder="Jumlah SKS"
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
            placeholder="Nama Dosen"
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
              marginBottom: 20,
              height: 80,
            }}
          />

          <Button
            title="Simpan"
            onPress={simpanMataKuliah}
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
                setModalVisible(false)
              }
            />
          </View>

        </View>
      </Modal>

    </View>
  );
}