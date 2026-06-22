import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import LayarBeranda from '../Screens/Beranda/LayarBeranda';
import LayarMataKuliah from '../Screens/MataKuliah/LayarMataKuliah';
import LayarProfil from '../Screens/Profil/LayarProfil';

const Tab = createBottomTabNavigator();

export default function NavigasiTabBawah() {
  return (
    <Tab.Navigator
  screenOptions={({ route }) => ({
    headerShown: false,

    tabBarIcon: ({ color, size }) => {
      let iconName;

      if (route.name === 'Beranda') {
        iconName = 'home';
      } else if (route.name === 'Mata Kuliah') {
        iconName = 'book';
      } else if (route.name === 'Profil') {
        iconName = 'person';
      }

      return (
        <Ionicons
          name={iconName}
          size={size}
          color={color}
        />
      );
    },
  })}
>
      <Tab.Screen
        name="Beranda"
        component={LayarBeranda}
      />

      <Tab.Screen
        name="Mata Kuliah"
        component={LayarMataKuliah}
      />

      <Tab.Screen
        name="Profil"
        component={LayarProfil}
      />
    </Tab.Navigator>
  );
}