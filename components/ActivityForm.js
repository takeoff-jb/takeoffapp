import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Button, Alert } from 'react-native';
import { createStackNavigator } from 'react-navigation';

export default class ActivityForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activity: '',
      state: ''
    };
  }

  render() {
    return (
      <View style={styles.activityForm}>
        <TextInput
          placeholder="What do you want to do?"
          onChangeText={activity => this.setState({ activity })}
          style={styles.activityInput}
        />

        <TextInput
          placeholder="Where do you want to go?"
          onChangeText={state => this.setState({ state })}
          style={styles.stateInput}
        />

        <Button
          onPress={() => {
            Alert.alert('Lets go to the map');
          }}
          title="Let's Go!"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  activityForm: {
    flex: 1,
    paddingTop: 100,
    padding: 10
  },
  activityInput: {
    height: 100,
    fontSize: 40
  },
  stateInput: {
    height: 100,
    fontSize: 40
  }
});
