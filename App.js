import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import ActivityForm from './components/ActivityForm.js';
import { createStackNavigator } from 'react-navigation';
import Home from './components/Home';

const RootNavigator = createStackNavigator({
  Main: {
    screen: Home,
    navigationOptions: {
      headerTitle: 'Home'
    }
  },
  ActivityForm: {
    screen: ActivityForm,
    navigationOptions: {
      headerTitle: "Let's go Somewhere"
    }
  }
});

export default RootNavigator;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    flexDirection: 'column'
  },
  title: {
    fontSize: 20,
    paddingTop: 50
  }
});
