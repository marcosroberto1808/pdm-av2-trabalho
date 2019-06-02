import React from 'react';
// import { TabNavigator } from 'react-navigation';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo';

import tabBarIcon from './tabBarIcon';

const createScreen = ({ icon, colors, title }) => {
  return class SomeScreen extends React.Component {
    static navigationOptions = {
      tabBarIcon: tabBarIcon(icon),
    };

    render() {
      return (
        <LinearGradient style={styles.container} colors={colors}>
          <Text style={styles.text}>{title}</Text>
        </LinearGradient>
      );
    }
  };
};

export const First = createScreen({
  icon: 'photo-album',
  colors: ['#F0FF19', '#00ff00'],
  title: 'Screen 1',
});

export const Second = createScreen({
  icon: 'inbox',
  colors: ['#ffad73', '#ff6666', '#ff0000'],
  title: 'Screen 2',
});

export const Third = createScreen({
  icon: 'favorite',
  colors: ['#4c669f', '#3b5998', '#192f6a'],
  title: 'You will not learn anything from this video',
});

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    padding: 8,
  },
  text: {
    fontSize: 36,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
  },
});
