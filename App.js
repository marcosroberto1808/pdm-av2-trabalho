import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Home, Detalhes, AddItems, EditItems, ImageUpload, Loader } from './src/screens';

console.disableYellowBox = true;
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
    },
    ImageUpload: {
      screen: ImageUpload,
      navigationOptions: {
        title: 'Enviar foto'
      }
    },
    Loader: {
      screen: Loader,
      navigationOptions: {
        title: 'Carregando foto'
      }
    }

  },
  {
    initialRouteName: 'Home'
  }
);

export default createAppContainer(App);
