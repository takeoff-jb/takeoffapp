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
          required
        />

        <TextInput
          placeholder="Where do you want to go?"
          onChangeText={state => this.setState({ state })}
          style={styles.stateInput}
          required
        />

        <Button
          onPress={() => {
            fetch(
              `https://ridb.recreation.gov/api/v1/recareas?state=${
                this.state.state
              }&activity=${this.state.activity}&limit=50`,
              {
                method: 'GET',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  apikey: 'E988373257A048189740F92931B253E1'
                }
              }
            )
              .then(res => res.json())
              .then(data => data.RECDATA)
              .then(info => {
                if (info.length > 0) {
                  return info.filter(option => {
                    return (
                      option.GEOJSON &&
                      option.RecAreaDescription &&
                      option.RecAreaName
                    );
                  });
                }
              })
              .then(finalResult => {
                console.log(finalResult);
                finalResult
                  ? this.props.navigation.navigate('MapPage', { finalResult })
                  : Alert.alert('Nothing to do here...', 'Try Again');
              });
          }}
          title="Let's go!"
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
