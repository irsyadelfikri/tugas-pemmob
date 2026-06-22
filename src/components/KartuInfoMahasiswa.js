import React from 'react';
import { View, Text } from 'react-native';
import { Card } from 'react-native-paper';

export default function KartuInfoMahasiswa({ mahasiswa }) {
  return (
    <Card
      style={{
        marginTop: 15,
        marginBottom: 15,
      }}
    >
      <Card.Content>

        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 10,
          }}
        >
          👤 {mahasiswa.nama}
        </Text>

        <Text>NIM : {mahasiswa.nim}</Text>
        <Text>Program Studi : {mahasiswa.programStudi}</Text>
        <Text>Semester : {mahasiswa.semester}</Text>

      </Card.Content>
    </Card>
  );
}