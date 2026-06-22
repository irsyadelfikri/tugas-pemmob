import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import NavigasiTabBawah from './NavigasiTabBawah';

import LayarTentang from '../Screens/Tentang/LayarTentang';
import LayarPengaturan from '../Screens/Pengaturan/LayarPengaturan';

const Drawer =
  createDrawerNavigator();

export default function NavigasiDrawer() {
  return (
    <Drawer.Navigator>

      <Drawer.Screen
        name="Menu Utama"
        component={NavigasiTabBawah}
      />

      <Drawer.Screen
        name="Tentang"
        component={LayarTentang}
      />

      <Drawer.Screen
        name="Pengaturan"
        component={LayarPengaturan}
      />

    </Drawer.Navigator>
  );
}