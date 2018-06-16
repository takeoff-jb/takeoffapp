import React, { Component } from 'react';
import { StyleSheet, View, Button, Alert, Picker, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { availActivities, stateList } from '../utils/activityList';

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
        <Text style={styles.activityInput}>What do you want to do?</Text>
        <Picker
          selectedValue={this.state.activity}
          onValueChange={itemValue => this.setState({ activity: itemValue })}>
          {availActivities.map(activ => {
            return <Picker.Item key={activ} label={activ} value={activ} />;
          })}
        </Picker>
        <Text style={styles.stateInput}>Where we heading?</Text>
        <Picker
          selectedValue={this.state.state}
          onValueChange={itemValue => this.setState({ state: itemValue })}>
          {Object.keys(stateList).map((state, i) => {
            return (
              <Picker.Item key={state} label={stateList[state]} value={state} />
            );
          })}
        </Picker>

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
    fontSize: 40,
    textAlign: 'center'
  },
  stateInput: {
    height: 100,
    fontSize: 40,
    textAlign: 'center'
  }
});
