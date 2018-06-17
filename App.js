import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import ActivityForm from './components/ActivityForm.js';
import { createStackNavigator } from 'react-navigation';
import Home from './components/Home';
import MapPage from './components/MapPage';
import ActivityPage from './components/ActivityPage.js';

const RootNavigator = createStackNavigator({
  Main: {
    screen: Home,
    navigationOptions: {
      headerTitle: 'HOME'
    }
  },
  ActivityForm: {
    screen: ActivityForm,
    navigationOptions: {
      headerTitle: 'LETS GO SOMEWHERE'
    }
  },
  MapPage: {
    screen: MapPage,
    navigationOptions: {
      headerTitle: 'MAP'
    }
  },
  ActivityPage: {
    screen: ActivityPage,
    navigationOptions: {
      headerTitle: 'Activity Page'
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
