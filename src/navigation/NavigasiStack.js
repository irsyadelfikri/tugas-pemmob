import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LayarSplash from '../Screens/Splash/LayarSplash';
import NavigasiDrawer from './NavigasiDrawer';
import LayarDetailMataKuliah from '../Screens/MataKuliah/LayarDetailMataKuliah';
import LayarTentang from '../Screens/Tentang/LayarTentang';
import LayarEditMataKuliah from '../Screens/MataKuliah/LayarEditMataKuliah';

const Stack = createNativeStackNavigator();

export default function NavigasiStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Splash"
        component={LayarSplash}
      />

      <Stack.Screen
        name="Utama"
        component={NavigasiDrawer}
      />
      <Stack.Screen
        name="DetailMataKuliah"
        component={LayarDetailMataKuliah}
      />
      <Stack.Screen
        name="EditMataKuliah"
         component={LayarEditMataKuliah}
      />
      <Stack.Screen
        name="Tentang"
        component={LayarTentang}
    />
    </Stack.Navigator>
  );
}