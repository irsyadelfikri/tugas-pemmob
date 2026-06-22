import React from 'react';
import { View, Text } from 'react-native';
import { Card } from 'react-native-paper';

export default function LayarTentang() {
  return (
    <View
      style={{
        flex: 1,
        padding: 20,
      }}
    >
      <Card>
        <Card.Content>

          <Text
            style={{
              fontSize: 24,
              fontWeight: 'bold',
              marginBottom: 15,
            }}
          >
            📚 Panduan Akademik Mahasiswa
          </Text>

          <Text>Versi 1.0</Text>

          <Text
            style={{
              marginTop: 15,
            }}
          >
            Aplikasi ini membantu mahasiswa
            mengakses informasi akademik
            seperti data mahasiswa,
            mata kuliah, dan layanan akademik.
          </Text>

        </Card.Content>
      </Card>
    </View>
  );
}