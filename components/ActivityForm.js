import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Button, Alert } from 'react-native';

export default class ActivityForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activity: ''
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
  }
});
