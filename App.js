import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Home, Detalhes, AddItems, EditItems } from './src/screens';

const App = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        title: 'Home'
      }
    },
    Detalhes: {
      screen: Detalhes,
      navigationOptions: {
        title: 'Detalhes do produto'
      }
    },
    AddItems: {
      screen: AddItems,
      navigationOptions: {
        title: 'Adicionar produto'
      }
    },
    EditItems: {
      screen: EditItems,
      navigationOptions: {
        title: 'Editar produto'
      }
    }
  },
  {
    initialRouteName: 'Home'
  }
);

export default createAppContainer(App);