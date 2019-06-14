import * as React from 'react';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { Home, Detalhes, AddItems, EditItems, SearchItems, UserCart, UserProfile, LoginPage } from '../screens';
import tabBarIcon from '../screens/tabBarIcon';
import { FontAwesome } from '@expo/vector-icons';

// https://reactnavigation.org/docs/en/bottom-tab-navigator.html

const HomeStack = createStackNavigator({
        Home: Home,
});
HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: tabBarIcon('home'),

}

const AddItemsStack = createStackNavigator({
  AddItems: AddItems,
});
AddItemsStack.navigationOptions = {
  tabBarLabel: 'Adicionar',
  tabBarIcon: tabBarIcon('add-circle-outline'),
}

const DetalhesStack = createStackNavigator({
  Detalhes: Detalhes,
});
DetalhesStack.navigationOptions = {
  tabBarLabel: 'Detalhes',
  tabBarIcon: tabBarIcon('inbox'),
}

const EditItemsStack = createStackNavigator({
  EditItems: EditItems,
});
EditItemsStack.navigationOptions = {
  tabBarLabel: 'Editar',
  tabBarIcon: tabBarIcon('edit'),
}

const SearchItemsStack = createStackNavigator({
  SearchItems: SearchItems,
});
SearchItemsStack.navigationOptions = {
  tabBarLabel: 'Pesquisar',
  tabBarIcon: tabBarIcon('search'),

}

const UserCartStack = createStackNavigator({
  UserCart: UserCart,
});
UserCartStack.navigationOptions = {
  tabBarLabel: 'Carrinho',
  tabBarIcon: tabBarIcon('shopping-cart'),
}

const UserProfileStack = createStackNavigator({
  UserProfile: UserProfile,
});
UserProfileStack.navigationOptions = {
  tabBarLabel: 'Perfil',
  tabBarIcon: tabBarIcon('account-box'),
}

const LoginPageStack = createStackNavigator({
  LoginPage: LoginPage,
});

LoginPageStack.navigationOptions = {
  tabBarLabel: 'Login',
  tabBarIcon: ({ tintColor }) => (
    <FontAwesome
    style={{ backgroundColor: 'transparent' }}
    name='facebook-official'
    color={tintColor}
    size={24}
  />
  ),
}

export default createBottomTabNavigator({
  Home: {
    screen: HomeStack,
  },
  SearchItemsStack,
  UserCartStack,
  AddItemsStack,
  DetalhesStack,
  EditItemsStack,
  UserProfileStack,
  LoginPageStack: {
    screen: LoginPageStack,
    navigationOptions: {
      tabBarVisible: false,
      // tabBarIcon: false,
      // tabBarLabel: false,
      
    },
  },
},
  {
    initialRouteName: 'LoginPageStack',
    tabBarOptions: {
      // // //' - Label and icon color of the active tab.'npm
      activeTintColor: 'orange',
      // // //' - Background color of the active tab.'
      // activeBackgroundColor: 'green',
      // // //' - Label and icon color of the inactive tab.'
      // inactiveTintColor: 'blue',
      // // //' - Background color of the inactive tab.'
      // inactiveBackgroundColor: 'yellow',
      // // //' - Style object for the tab bar.'
      // style: { borderWidth: 2, borderColor: 'purple' },
      // // //' - Style object for the tab label.'
      // labelStyle: { fontWeight: 'bold' },
      // // //' - Style object for the tab.'
      // tabStyle: { paddingBottom: 16 },
      // // //' - Whether to show label for tab, default is true.'
      // showLabel: false,
      // // //' - Whether to show icon for tab, default is true.'
      // showIcon: false,
    },

  }
);