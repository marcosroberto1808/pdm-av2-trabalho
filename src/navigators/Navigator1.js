import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { Home, Detalhes, AddItems, EditItems, SearchItems, UserCart, UserProfile } from '../shared';
import tabBarIcon from '../shared/tabBarIcon';

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
  tabBarOptions: { showLabel: false }
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


export default createBottomTabNavigator({
  HomeStack,
  SearchItemsStack,
  UserCartStack,
  AddItemsStack,
  DetalhesStack,
  EditItemsStack,
  UserProfileStack,
},
  {
    initialRouteName: 'HomeStack',
    tabBarOptions: {
      // // //' - Label and icon color of the active tab.'
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
