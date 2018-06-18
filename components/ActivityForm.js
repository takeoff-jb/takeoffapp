import React, { Component } from 'react';
import {
  StyleSheet,
  ImageBackground,
  Alert,
  Picker,
  Text,
  View
} from 'react-native';
import { Button } from 'react-native-elements';
import { createStackNavigator } from 'react-navigation';
import { availActivities, stateList } from '../utils/activityList';
import Icon from 'react-native-vector-icons/FontAwesome';

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
      <ImageBackground
        source={require('../utils/mountain-background.jpeg')}
        style={styles.container}>
        <View style={styles.activityForm}>
          <View style={styles.pickerCard}>
            <Text style={styles.activityTitle}>What do you want to do?</Text>
            <Picker
              selectedValue={this.state.activity}
              onValueChange={itemValue =>
                this.setState({ activity: itemValue })
              }
              style={styles.picker}>
              <Picker.Item label="Select an activity..." value="0" />
              {availActivities.map(activ => {
                return <Picker.Item key={activ} label={activ} value={activ} />;
              })}
            </Picker>
          </View>
          <View style={styles.pickerCard}>
            <Text style={styles.activityTitle}>Where we heading?</Text>
            <Picker
              selectedValue={this.state.state}
              onValueChange={itemValue => this.setState({ state: itemValue })}
              style={styles.picker}>
              <Picker.Item label="Select a state..." value="0" />
              {Object.keys(stateList).map((state, i) => {
                return (
                  <Picker.Item
                    key={state}
                    label={stateList[state]}
                    value={state}
                  />
                );
              })}
            </Picker>
          </View>

          <Icon.Button
            name="plane"
            size={40}
            backgroundColor="grey"
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
            }}>
            LET'S GO
          </Icon.Button>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  activityForm: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '16%'
  },
  pickerCard: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: 500,
    height: 500,
    borderRadius: 30,
    margin: 20,
    opacity: 0.8
  },
  activityTitle: {
    height: 40,
    fontSize: 40,
    textAlign: 'center'
  },
  picker: {
    width: 200,
    backgroundColor: 'white',
    borderColor: 'black'
  }
});
