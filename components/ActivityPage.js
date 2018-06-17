import React, { Component } from 'react';
import {
  ScrollView,
  Picker,
  Text,
  StyleSheet,
  View,
  PixelRatio
} from 'react-native';

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
      .then(weather => this.setState({...this.prevState, weather }));
  }

  render() {
    console.log(this.state);
    const selected = this.props.navigation.state.params.act;
    return (
      <ScrollView>
        <View style={styles.line}>
          <Text style={styles.title}>{selected.RecAreaName}</Text>
          <Text style={styles.description}>
            {selected.RecAreaDescription.replace(/(<([^>]+)>)/g, '')}
          </Text>
          <Text style={styles.description}>
            {selected.RecAreaDirections.replace(/(<([^>]+)>)/g, '')}
          </Text>
          <Text style={styles.description}>
            {selected.RecAreaEmail.replace(/(<([^>]+)>)/g, '')}
          </Text>
          <Text style={styles.description}>
            {selected.RecAreaPhone.replace(/(<([^>]+)>)/g, '')}
          </Text>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    textAlign: 'center'
  },
  description: {
    fontSize: 15,
    padding: 10
  },
  line: {
    borderBottomColor: 'black',
    borderBottomWidth: 1 / PixelRatio.get()
  }
});
