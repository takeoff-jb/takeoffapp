import React, { Component } from 'react';
import { ScrollView, Text, StyleSheet, View, PixelRatio } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Micon from 'react-native-vector-icons/MaterialCommunityIcons';
import { weatherIcon } from '../utils/utils';
import { toASCII } from 'punycode';

export default class ActivityPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static getDerivedStateFromProps(props, state) {
    if (props !== state) return props.navigation.state.params.act;
  }

  componentDidMount() {
    // console.log(this.state.GEOJSON.COORDINATES[1])
    //excludes will reduce data pull for faster querties
    //grabbing array daily has a length of 7
    // index 0 is tmr, index 1 is the day after tmr.. etc etc
    fetch(
      `https://api.darksky.net/forecast/ecbebdfa202e18e146a5b2d3cbd6140e/${
        this.state.GEOJSON.COORDINATES[1]
      },${this.state.GEOJSON.COORDINATES[0]}?exclude=minutely,hourly,flags`
    )
      .then(data => {
        return data.json();
      })
      .then(weather => this.setState({ ...this.prevState, weather }));
  }

  render() {
    console.log(this.state);
    if (!this.state.weather) return null;
    const selected = this.props.navigation.state.params.act;
    const currentWeather = this.state.weather.currently;
    const dailyWeather = this.state.weather.daily.data;

    const thisWeekWeather = dailyWeather.map(dayWeather => {
      return (
        <View key={dayWeather.time}>
          <Micon
            size={50}
            style={{ color: 'steelblue' }}
            name={weatherIcon(dayWeather.icon)}
          />
          <Text>
            High : {dayWeather.temperatureHigh}
            {String.fromCharCode(176)}
          </Text>
          <Text>
            Low : {dayWeather.temperatureLow}
            {String.fromCharCode(176)}
          </Text>
        </View>
      );
    });
    return (
      <ScrollView style={styles.container}>
        <View style={styles.line}>
          <Text style={styles.title}>{selected.RecAreaName}</Text>

          {selected.RecAreaDescription ? (
            <Text style={styles.details}>
              <Icon name="quote-left" size={50} color="black" />{' '}
              {selected.RecAreaDescription.replace(/(<([^>]+)>)/g, '')}{' '}
              <Icon name="quote-right" size={50} color="black" />
            </Text>
          ) : (
            ''
          )}

          {selected.RecAreaDirections ? (
            <Text style={styles.details}>
              <Icon name="car" size={50} color="black" />{' '}
              {selected.RecAreaDirections.replace(/(<([^>]+)>)/g, '')}
            </Text>
          ) : (
            ''
          )}

          {selected.RecAreaEmail ? (
            <Text style={styles.details}>
              <Icon name="envelope" size={50} color="black" />{' '}
              {selected.RecAreaEmail.replace(/(<([^>]+)>)/g, '')}
            </Text>
          ) : (
            ''
          )}

          {selected.RecAreaPhone || selected.RecAreaPhone === {} ? (
            <Text style={styles.details}>
              <Icon name="phone" size={50} color="black" />{' '}
              {selected.RecAreaPhone.replace(/(<([^>]+)>)/g, '')}
            </Text>
          ) : (
            ''
          )}
        </View>
        <Text style={styles.title}> Current Weather </Text>
        <View
          style={{
            marginTop: 12,
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-around'
          }}
        >
          <Text style={styles.details}>
            {' '}
            <Micon size={50} name={weatherIcon(currentWeather.icon)} />{' '}
            {currentWeather.icon} Current Temperature:{' '}
            {currentWeather.temperature}
            {String.fromCharCode(176)}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >
          {thisWeekWeather}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30
  },
  title: {
    fontSize: 50,
    textAlign: 'center'
  },
  details: {
    fontSize: 25,
    padding: 40
  },
  line: {
    borderBottomColor: 'black',
    borderBottomWidth: 1 / PixelRatio.get()
  }
});
