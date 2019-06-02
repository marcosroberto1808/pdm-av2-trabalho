import React from 'react';
import { createAppContainer } from 'react-navigation';


import { View } from 'react-native';
import Navigator from './src/navigators/Navigator1';

console.disableYellowBox = true;

const App = createAppContainer(Navigator);

export default () => (
  <View style={{ flex: 1, marginTop: 20 }}>
    <App />
  </View>
);