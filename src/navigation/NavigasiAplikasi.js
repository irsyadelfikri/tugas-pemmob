import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import NavigasiStack from './NavigasiStack';

export default function NavigasiAplikasi() {
  return (
    <NavigationContainer>
      <NavigasiStack />
    </NavigationContainer>
  );
}