import React, { Component } from 'react';
import { ScrollView, Text, StyleSheet, View, PixelRatio } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

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
    // console.log(this.state);
    const selected = this.props.navigation.state.params.act;
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
