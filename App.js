import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import ActivityForm from './components/ActivityForm.js';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.parent}>
        <Text style={styles.title}> Hello World </Text>
        <ActivityForm />
      </View>
    );
  }
}

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
